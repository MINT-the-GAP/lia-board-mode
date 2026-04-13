// Event wiring: button/slider listeners, MutationObserver, storage events, and reposition bursts.

import { ROOT_WIN, ROOT_DOC, CONTENT_DOC, SETTINGS_KEY, FONT_KEY, PANEL_ID, BTN_ID, SLIDER_ID, I, clearPosTimers } from "./state";
import { positionOverlayButton, positionPanel } from "./ui";
import { getToolbarHeader } from "./toolbar";
import { setPresFontPx } from "./font";
import { clamp } from "./state";

function runPositionNow(): void {
  positionOverlayButton();
  positionPanel();
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

function initToolbarResizeObserver(): void {
  if (typeof ResizeObserver === "undefined") return;
  try {
    const ro = new ResizeObserver(() => runPositionNow());
    const toolbar = getToolbarHeader();
    if (toolbar) {
      ro.observe(toolbar);
    } else {
      // Toolbar not in DOM yet — wait for it
      const mo = new MutationObserver(() => {
        const t = getToolbarHeader();
        if (t) { ro.observe(t); mo.disconnect(); }
      });
      mo.observe(ROOT_DOC.documentElement, { childList: true, subtree: true });
    }
  } catch (e) { }
}

export function wireOnce(): void {
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
  if (!btn || !slider) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    ROOT_DOC.body.classList.toggle("lia-tff-panel-open");
    positionPanel();
  });

  ROOT_DOC.addEventListener("click", (e) => {
    if (!ROOT_DOC.body.classList.contains("lia-tff-panel-open")) return;
    const t = e.target as Element | null;
    if (t && t.closest && (t.closest("#" + PANEL_ID) || t.closest("#" + BTN_ID))) return;
    ROOT_DOC.body.classList.remove("lia-tff-panel-open");
  }, true);

  ROOT_DOC.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    }
  });

  ROOT_WIN.addEventListener("resize", () => { positionOverlayButton(); positionPanel(); });
  if (ROOT_WIN.visualViewport) {
    ROOT_WIN.visualViewport.addEventListener("resize", () => { positionOverlayButton(); positionPanel(); });
    ROOT_WIN.visualViewport.addEventListener("scroll", () => { positionOverlayButton(); positionPanel(); });
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
    makeObserver().observe(ROOT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  try {
    makeObserver().observe(CONTENT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  ROOT_WIN.addEventListener("storage", function (e) {
    if (!e) return;
    if (e.key === SETTINGS_KEY || e.key === FONT_KEY) tickFn();
  });

  ROOT_WIN.setInterval(() => { if (I.__alive) tickFn(); }, 5000);

  initToolbarResizeObserver();
}
