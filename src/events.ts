// Event wiring: relevant DOM changes and a shared frame scheduler for geometry.

import {
  ROOT_WIN, ROOT_DOC, CONTENT_DOC, SETTINGS_KEY, FONT_KEY, PANEL_ID, BTN_ID,
  SLIDER_ID, OVERLAY_ID, VOICE_TOGGLE_BTN_ID, HEADER_TOGGLE_BTN_ID, clamp
} from "./state";
import { requestPositionUpdate, cancelPositionUpdate } from "./ui";
import { getToolbarHeader } from "./toolbar";
import { setPresFontPx } from "./font";
import { isEditableKeyboardEvent } from "./keyboard";

const teardown = new AbortController();
const observers: { disconnect(): void }[] = [];
let tickUI: (() => void) | null = null;
let refreshResizeTargets = (): void => {};

/** Releases every document/window listener and observer this module attached. */
export function disposeEvents(): void {
  teardown.abort();
  cancelPositionUpdate();
  tickUI = null;
  while (observers.length) {
    try { observers.pop()!.disconnect(); } catch (e) { /* already gone */ }
  }
}

function initLayoutResizeObserver(tickFn: () => void): void {
  if (typeof ResizeObserver === "undefined") return;
  try {
    let targets = new Set<Element>();
    const ro = new ResizeObserver(entries => {
      requestPositionUpdate();
      // A font change or newly loaded content can change slide geometry without
      // a DOM attribute change. Recalculate its scroll spacer after that layout.
      if (entries.some(entry => entry.target.matches("main,.lia-slide__container"))) tickFn();
    });
    observers.push(ro);
    refreshResizeTargets = () => {
      const next = new Set<Element>();
      const toolbar = getToolbarHeader();
      if (toolbar) next.add(toolbar);
      for (const main of Array.from(CONTENT_DOC.querySelectorAll("main:not([hidden])"))) {
        next.add(main);
        const scroller = main.closest(".lia-slide__container");
        if (scroller) next.add(scroller);
      }
      for (const old of targets) if (!next.has(old)) ro.unobserve(old);
      for (const target of next) if (!targets.has(target)) ro.observe(target);
      targets = next;
    };
    refreshResizeTargets();
  } catch (e) { }
}

let wired = false;
const wiredButtons = new WeakSet<Element>();
const wiredSliders = new WeakSet<Element>();

// Element listeners must be reattached when LiaScript replaces a control;
// document/window listeners are shared and stay wired only once.
export function wireOnce(): void {
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
  if (btn && !wiredButtons.has(btn)) {
    wiredButtons.add(btn);
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      ROOT_DOC.body.classList.toggle("lia-tff-panel-open");
      requestPositionUpdate();
    }, { signal: teardown.signal });
  }
  if (slider && !wiredSliders.has(slider)) {
    wiredSliders.add(slider);
    slider.addEventListener("input", () => {
      const min = parseInt(slider.min || "14", 10);
      const max = parseInt(slider.max || "48", 10);
      const v = clamp(parseInt(slider.value || "24", 10), min, max);
      try { localStorage.setItem(FONT_KEY, String(v)); } catch (e) { }
      setPresFontPx(v);
      tickUI?.();
      requestPositionUpdate();
    }, { signal: teardown.signal });
  }
  if (wired) return;
  wired = true;

  ROOT_DOC.addEventListener("click", e => {
    if (!ROOT_DOC.body.classList.contains("lia-tff-panel-open")) return;
    const t = e.target as Element | null;
    if (t?.closest?.("#" + PANEL_ID + ",#" + BTN_ID + ",#" + VOICE_TOGGLE_BTN_ID)) return;
    ROOT_DOC.body.classList.remove("lia-tff-panel-open");
  }, { capture: true, signal: teardown.signal });

  ROOT_DOC.addEventListener("keydown", e => {
    if (isEditableKeyboardEvent(e)) return;
    if (e.key === "Escape") ROOT_DOC.body.classList.remove("lia-tff-panel-open");
  }, { signal: teardown.signal });

  // A visual viewport change is geometry only. It never changes responsive
  // visibility, the chosen presentation mode, or the user's band preferences.
  if (ROOT_WIN.visualViewport) {
    ROOT_WIN.visualViewport.addEventListener("resize", requestPositionUpdate, { signal: teardown.signal });
    ROOT_WIN.visualViewport.addEventListener("scroll", requestPositionUpdate, { signal: teardown.signal });
  }
  ROOT_DOC.addEventListener("scroll", requestPositionUpdate, { capture: true, passive: true, signal: teardown.signal });
}

const SHELL_SELECTOR = "#app,.lia-canvas,.lia-slide,.lia-slide__container,main,#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination";
const CONTROL_CONTEXT = "#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination";
const MARKER_SELECTOR = "#lia-hl-ui-overlay-v1,#lia-hl-btn";
const STRUCTURAL_SELECTOR = SHELL_SELECTOR + ",#focused,[data-lia-tff-autoscrolling]," + MARKER_SELECTOR;
const OWN_UI_SELECTOR = '[id^="lia-tff-"],#__LIA_MODE_ONLY_STYLE_V01__';
const REQUIRED_UI_IDS = new Set([OVERLAY_ID, BTN_ID, PANEL_ID, SLIDER_ID, VOICE_TOGGLE_BTN_ID, HEADER_TOGGLE_BTN_ID]);
const WATCHED_ATTRIBUTES = [
  "class", "id", "hidden", "lang", "data-theme", "data-bs-theme", "data-mode", "data-view", "mode",
  "aria-expanded", "aria-checked", "aria-selected", "aria-pressed", "aria-hidden", "data-lia-tff-autoscrolling"
];

function elementFor(node: Node): Element | null {
  return node.nodeType === 1 ? node as Element : node.parentElement;
}

function layoutClasses(value: string | null): string {
  return (value || "").split(/\s+/).filter(name => name && (
    !name.startsWith("lia-tff-") || name === "lia-tff-header-collapsed" || name === "lia-tff-voice-collapsed"
  )).sort().join(" ");
}

function isRelevantMutation(record: MutationRecord): boolean {
  const target = elementFor(record.target);
  if (!target) return false;
  if (target.closest(OWN_UI_SELECTOR)) {
    return record.type === "childList" && Array.from(record.removedNodes).some(node => {
      const element = elementFor(node);
      return !!element && REQUIRED_UI_IDS.has(element.id) && !ROOT_DOC.getElementById(element.id);
    });
  }

  if (record.type === "attributes") {
    const attr = record.attributeName;
    if (attr === "class" && layoutClasses(record.oldValue) === layoutClasses(target.getAttribute("class"))) return false;
    if (attr === "id") {
      // Autoscrolling installs its guard synchronously before LiaScript's
      // deferred scrollIntoView call. Do not defer this case to a later frame.
      if (target.id === "focused" || record.oldValue === "focused") return true;
    }
    if (attr === "data-lia-tff-autoscrolling") return true;
    if (target === target.ownerDocument.documentElement || target === target.ownerDocument.body) return true;
    if (target.matches(SHELL_SELECTOR + "," + MARKER_SELECTOR) || target.closest(CONTROL_CONTEXT)) return true;
    if (attr === "aria-checked" || attr === "aria-selected" || attr === "aria-pressed") return true;
    return !!target.closest(".lia-effect,.lia-effect__content");
  }

  const changed = [...Array.from(record.addedNodes), ...Array.from(record.removedNodes)];
  // Ignore our probe, style insertion, label updates and button reparenting.
  // A removed control that was not reattached does need ensureUI() again.
  const external = changed.filter(node => {
    const element = elementFor(node);
    if (!element?.closest(OWN_UI_SELECTOR)) return true;
    return !!element.id && REQUIRED_UI_IDS.has(element.id) && !ROOT_DOC.getElementById(element.id);
  });
  if (!external.length) return false;
  if (external.some(node => {
    const element = elementFor(node);
    return !!element && REQUIRED_UI_IDS.has(element.id) && !ROOT_DOC.getElementById(element.id);
  })) return true;
  if (target.closest(CONTROL_CONTEXT)) return true;
  // Plain text counters inside a slide do not affect toolbar state. A real
  // size change is covered by ResizeObserver; element changes can introduce
  // slide settings and still need the synchronous autoscrolling update.
  if (target.closest("main")) return external.some(node => node.nodeType === 1);
  return external.some(node => {
    const element = elementFor(node);
    return !!element && (element.matches(STRUCTURAL_SELECTOR) || !!element.querySelector(STRUCTURAL_SELECTOR));
  });
}

export function initEvents(tickFn: () => void): void {
  tickUI = tickFn;
  initLayoutResizeObserver(tickFn);
  const docs = ROOT_DOC === CONTENT_DOC ? [ROOT_DOC] : [ROOT_DOC, CONTENT_DOC];
  for (const doc of docs) {
    try {
      const mo = new MutationObserver(records => {
        if (!records.some(isRelevantMutation)) return;
        refreshResizeTargets();
        tickFn();
      });
      observers.push(mo);
      mo.observe(doc.documentElement, {
        childList: true, subtree: true, attributes: true,
        attributeFilter: WATCHED_ATTRIBUTES, attributeOldValue: true
      });
    } catch (e) { }

    const win = doc.defaultView;
    if (!win) continue;
    let layoutSize = `${doc.documentElement.clientWidth}|${doc.documentElement.clientHeight}`;
    win.addEventListener("resize", () => {
      requestPositionUpdate();
      const size = `${doc.documentElement.clientWidth}|${doc.documentElement.clientHeight}`;
      if (size === layoutSize) return;
      layoutSize = size;
      tickFn();
    }, { signal: teardown.signal });
    win.addEventListener("orientationchange", tickFn, { signal: teardown.signal });
    win.addEventListener("storage", e => {
      if (e.key === SETTINGS_KEY || e.key === FONT_KEY || e.key === null) tickFn();
    }, { signal: teardown.signal });
    win.addEventListener("hashchange", tickFn, { signal: teardown.signal });
    win.addEventListener("focus", tickFn, { signal: teardown.signal });
    doc.addEventListener("visibilitychange", () => {
      if (doc.visibilityState === "visible") tickFn();
    }, { signal: teardown.signal });
  }

  for (const query of ["(max-width: 680px)", "(max-height: 520px)", "(min-width: 1001px)", "(prefers-color-scheme: dark)"]) {
    try {
      ROOT_WIN.matchMedia(query).addEventListener("change", tickFn, { signal: teardown.signal });
    } catch (e) { }
  }
}
