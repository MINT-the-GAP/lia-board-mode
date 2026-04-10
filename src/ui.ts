// UI lifecycle: overlay/panel/button creation, positioning, and presentation-only visibility.

import {
  ROOT_WIN, ROOT_DOC,
  BTN_ID, PANEL_ID, SLIDER_ID, TITLE_ID, OVERLAY_ID, INLINE_SLOT_ID,
  clamp, clearPosTimers
} from "./state";
import {
  getViewport, isNightlyNavigationHidden,
  shouldUseTFFNightlyStackDock, shouldUseInlineStripDock, ensureInlineDockSlot,
  getDockTarget, getTFFTOCButtonRect
} from "./toolbar";

export function ensureUI(): void {
  let overlay = ROOT_DOC.getElementById(OVERLAY_ID);
  if (!overlay) {
    overlay = ROOT_DOC.createElement("div");
    overlay.id = OVERLAY_ID;
    ROOT_DOC.body.appendChild(overlay);
  }

  let btn = ROOT_DOC.getElementById(BTN_ID);
  if (!btn) {
    btn = ROOT_DOC.createElement("button");
    btn.id = BTN_ID;
    (btn as HTMLButtonElement).type = "button";
    btn.setAttribute("aria-label", "Font size");
    btn.innerHTML = `<span class="tffA-small">A</span><span class="tffA-big">A</span>`;
    overlay.appendChild(btn);
  }

  let panel = ROOT_DOC.getElementById(PANEL_ID);
  if (!panel) {
    panel = ROOT_DOC.createElement("div");
    panel.id = PANEL_ID;
    panel.innerHTML =
      `<div id="${TITLE_ID}">Font size</div>` +
      `<input id="${SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="Font size" />`;
    ROOT_DOC.body.appendChild(panel);
  }
}

export function placeButtonInCorrectHost(): void {
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const overlay = ROOT_DOC.getElementById(OVERLAY_ID);
  if (!btn || !overlay) return;

  const slot = ROOT_DOC.getElementById(INLINE_SLOT_ID);

  if (shouldUseTFFNightlyStackDock()) {
    if (btn.parentNode !== overlay) overlay.appendChild(btn);
    if (slot && slot.parentNode) slot.parentNode.removeChild(slot);
    (overlay as HTMLElement).style.left = "0px";
    (overlay as HTMLElement).style.top = "0px";
    (btn as HTMLElement).style.left = "";
    (btn as HTMLElement).style.top = "";
    return;
  }

  if (shouldUseInlineStripDock()) {
    const inlineSlot = ensureInlineDockSlot();
    if (inlineSlot && btn.parentNode !== inlineSlot) {
      inlineSlot.appendChild(btn);
    }
    (overlay as HTMLElement).style.left = "0px";
    (overlay as HTMLElement).style.top = "0px";
    (btn as HTMLElement).style.left = "";
    (btn as HTMLElement).style.top = "";
    return;
  }

  if (btn.parentNode !== overlay) overlay.appendChild(btn);
  if (slot && slot.parentNode) slot.parentNode.removeChild(slot);
}

export function positionOverlayButton(): void {
  const btn = ROOT_DOC.getElementById(BTN_ID) as HTMLElement | null;
  const overlay = ROOT_DOC.getElementById(OVERLAY_ID) as HTMLElement | null;
  if (!btn || !overlay) return;

  placeButtonInCorrectHost();

  if (shouldUseInlineStripDock()) return;

  const vp = getViewport();
  const pad = 8;
  const gap = 8;

  const defaultBtnSize = isNightlyNavigationHidden() ? 22 : 34;
  let bw = defaultBtnSize, bh = defaultBtnSize;
  try {
    const r = btn.getBoundingClientRect();
    if (r && r.width > 6 && r.height > 6) { bw = r.width; bh = r.height; }
  } catch (e) { }

  let left = pad;
  let top = pad;

  if (shouldUseTFFNightlyStackDock()) {
    const tocRect = getTFFTOCButtonRect();
    if (tocRect) {
      const stackGap = 6;
      left = tocRect.left + (tocRect.width - bw) / 2;
      top = tocRect.bottom + stackGap;
    }
  } else {
    const dock = getDockTarget();

    if (dock && dock.rect) {
      const r = dock.rect;
      if (dock.kind === "highlight" || dock.kind === "toolbar-row" || dock.kind === "toc-button") {
        left = r.right + gap;
        top = r.top + (r.height - bh) / 2;
      } else if (dock.kind === "toc-open-slot" || dock.kind === "virtual-highlight-slot") {
        left = r.left;
        top = r.top;
      }
    }
  }

  left = clamp(left, pad, vp.w - bw - pad);
  top = clamp(top, pad, vp.h - bh - pad);

  overlay.style.left = `${Math.round(vp.ox)}px`;
  overlay.style.top = `${Math.round(vp.oy)}px`;
  btn.style.left = `${Math.round(left)}px`;
  btn.style.top = `${Math.round(top)}px`;
}

let panelSize: { w: number; h: number } | null = null;

function measurePanel(panel: HTMLElement): { w: number; h: number } {
  if (panelSize) return panelSize;

  const prevD = panel.style.display;
  const prevV = panel.style.visibility;
  const prevL = panel.style.left;
  const prevT = panel.style.top;

  panel.style.display = "block";
  panel.style.visibility = "hidden";
  panel.style.left = "-9999px";
  panel.style.top = "-9999px";

  const w = panel.offsetWidth || 240;
  const h = panel.offsetHeight || 90;

  panel.style.display = prevD;
  panel.style.visibility = prevV;
  panel.style.left = prevL;
  panel.style.top = prevT;

  panelSize = { w, h };
  return panelSize;
}

export function positionPanel(): void {
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const panel = ROOT_DOC.getElementById(PANEL_ID) as HTMLElement | null;
  if (!btn || !panel) return;

  if (!ROOT_DOC.body.classList.contains("lia-tff-panel-open")) return;

  const r = btn.getBoundingClientRect();
  const vp = getViewport();
  const sz = measurePanel(panel);

  const gap = 10;
  const pad = 8;

  let left = r.left;
  let top = r.bottom + gap;

  left = clamp(left, pad, vp.w - sz.w - pad);

  if (top + sz.h + pad > vp.h) {
    top = r.top - gap - sz.h;
  }

  top = clamp(top, pad, vp.h - sz.h - pad);

  panel.style.left = `${Math.round(left + vp.ox)}px`;
  panel.style.top = `${Math.round(top + vp.oy)}px`;
}

const TFF_HIDE_MAX_W = 680;
const TFF_HIDE_MIN_DIM = 520;

function isSmallScreen(): boolean {
  try {
    const vv = ROOT_WIN.visualViewport;
    const w = vv ? vv.width : (ROOT_DOC.documentElement.clientWidth || 9999);
    const h = vv ? vv.height : (ROOT_DOC.documentElement.clientHeight || 9999);
    const minDim = Math.min(w, h);
    return (w <= TFF_HIDE_MAX_W) || (minDim <= TFF_HIDE_MIN_DIM);
  } catch (e) {
    return false;
  }
}

export function setPresentationOnlyVisibility(mode: string): boolean {
  const isPres = (mode === "presentation");
  const small = isSmallScreen();
  const show = isPres && !small;

  const btn = ROOT_DOC.getElementById(BTN_ID) as HTMLElement | null;
  const panel = ROOT_DOC.getElementById(PANEL_ID);

  if (btn) btn.style.display = show ? "inline-flex" : "none";

  if (!show && panel) {
    ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    (panel as HTMLElement).style.display = "none";
    clearPosTimers();
  }

  return show;
}
