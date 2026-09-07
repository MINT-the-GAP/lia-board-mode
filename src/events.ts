// Event wiring: button/slider listeners, MutationObserver, storage events, and reposition bursts.

import { ROOT_WIN, ROOT_DOC, CONTENT_DOC, SETTINGS_KEY, FONT_KEY, PANEL_ID, BTN_ID, SLIDER_ID, VOICE_TOGGLE_BTN_ID, I, clearPosTimers } from "./state";
import { positionOverlayButton, positionPanel, positionHeaderBandToggle } from "./ui";
import { getToolbarHeader } from "./toolbar";
import { setPresFontPx } from "./font";
import { clamp } from "./state";
import { isEditableKeyboardEvent } from "./keyboard";

function runPositionNow(): void {
  positionOverlayButton();
  positionPanel();
  positionHeaderBandToggle();
}

export function scheduleRepositionBurst(): void {
  clearPosTimers();
  ROOT_WIN.requestAnimationFrame(() => {
    runPositionNow();
    ROOT_WIN.requestAnimationFrame(() => runPositionNow());
  });
}

export function burstRepositionThrottled(): void {
  const now = Date.now();
  if (now - (I.lastBurstAt || 0) < 120) return;
  I.lastBurstAt = now;
  scheduleRepositionBurst();
}

// Every long-lived listener and observer registers here so a single teardown
// call can release them. ROOT_DOC/ROOT_WIN outlive individual macro nodes, so
// without this the SPA accumulates handlers on every re-render.
const teardown = new AbortController();
const observers: { disconnect(): void }[] = [];

/** Releases every document/window listener and observer this module attached. */
export function disposeEvents(): void {
  teardown.abort();
  while (observers.length) {
    try { observers.pop()!.disconnect(); } catch (e) { /* already gone */ }
  }
}

function initToolbarResizeObserver(): void {
  if (typeof ResizeObserver === "undefined") return;
  try {
    const ro = new ResizeObserver(() => runPositionNow());
    observers.push(ro);
    const toolbar = getToolbarHeader();
    if (toolbar) {
      ro.observe(toolbar);
    } else {
      // Toolbar not in DOM yet — wait for it
      const mo = new MutationObserver(() => {
        const t = getToolbarHeader();
        if (t) { ro.observe(t); mo.disconnect(); }
      });
      observers.push(mo);
      mo.observe(ROOT_DOC.documentElement, { childList: true, subtree: true });
    }
  } catch (e) { }
}

// ensureUI() calls this whenever it recreates the panel or voice button, which
// can happen more than once per document. The element listeners below die with
// their element, but the ROOT_DOC/ROOT_WIN ones would stack, so wire only once.
let wired = false;

export function wireOnce(): void {
  if (wired) return;
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
  if (!btn || !slider) return;
  wired = true;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    ROOT_DOC.body.classList.toggle("lia-tff-panel-open");
    positionPanel();
  });

  ROOT_DOC.addEventListener("click", (e) => {
    if (!ROOT_DOC.body.classList.contains("lia-tff-panel-open")) return;
    const t = e.target as Element | null;
    if (t && t.closest && (t.closest("#" + PANEL_ID) || t.closest("#" + BTN_ID) || t.closest("#" + VOICE_TOGGLE_BTN_ID))) return;
    ROOT_DOC.body.classList.remove("lia-tff-panel-open");
  }, { capture: true, signal: teardown.signal });

  ROOT_DOC.addEventListener("keydown", (e) => {
    if (isEditableKeyboardEvent(e)) return;
    if (e.key === "Escape") {
      ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    }
  }, { signal: teardown.signal });

  ROOT_WIN.addEventListener("resize", runPositionNow, { signal: teardown.signal });
  if (ROOT_WIN.visualViewport) {
    ROOT_WIN.visualViewport.addEventListener("resize", runPositionNow, { signal: teardown.signal });
    ROOT_WIN.visualViewport.addEventListener("scroll", runPositionNow, { signal: teardown.signal });
  }

  slider.addEventListener("input", () => {
    const min = parseInt(slider.min || "14", 10);
    const max = parseInt(slider.max || "48", 10);
    const v = clamp(parseInt(slider.value || "24", 10), min, max);
    try { localStorage.setItem(FONT_KEY, String(v)); } catch (e) { }
    setPresFontPx(v);
  });
}

export function initEvents(tickFn: () => void): void {
  // Exclude attributes we write ourselves to avoid a feedback loop.
  const IGNORED_ATTRS = new Set(["style", "data-lia-mode"]);

  function makeObserver(): MutationObserver {
    return new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "attributes" && r.attributeName && IGNORED_ATTRS.has(r.attributeName)) continue;
        tickFn();
        return;
      }
    });
  }

  try {
    const mo = makeObserver();
    observers.push(mo);
    mo.observe(ROOT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  try {
    const mo = makeObserver();
    observers.push(mo);
    mo.observe(CONTENT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  ROOT_WIN.addEventListener("storage", function (e) {
    if (!e) return;
    if (e.key === SETTINGS_KEY || e.key === FONT_KEY) tickFn();
  }, { signal: teardown.signal });

  // Re-evaluate the wide-screen band toggles immediately at their breakpoint.
  ROOT_WIN.addEventListener("resize", tickFn, { signal: teardown.signal });
  if (ROOT_WIN.visualViewport) {
    ROOT_WIN.visualViewport.addEventListener("resize", tickFn, { signal: teardown.signal });
  }

  const pollId = ROOT_WIN.setInterval(() => { if (I.__alive) tickFn(); }, 5000);
  observers.push({ disconnect: () => ROOT_WIN.clearInterval(pollId) });

  try {
    ROOT_WIN.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => tickFn(), { signal: teardown.signal });
  } catch (e) { }

  initToolbarResizeObserver();
}
