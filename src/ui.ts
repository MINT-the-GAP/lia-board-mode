// UI lifecycle: overlay/panel/button creation, positioning, and presentation-only visibility.

import {
  ROOT_WIN, ROOT_DOC, CONTENT_DOC,
  BTN_ID, PANEL_ID, SLIDER_ID, TITLE_ID, OVERLAY_ID, INLINE_SLOT_ID,
  VOICE_TOGGLE_BTN_ID, HEADER_TOGGLE_BTN_ID,
  clamp, clearPosTimers
} from "./state";
import {
  getViewport, isNightlyNavigationHidden,
  shouldUseTFFNightlyStackDock, shouldUseInlineStripDock, ensureInlineDockSlot,
  getDockTarget, getTFFTOCButtonRect, getToolbarHeader
} from "./toolbar";
import { detectLanguage, getFontSizeLabel } from "./i18n";

let voiceCollapsedPref = true;
let headerCollapsedPref = false;

export function ensureUI(onCreated?: () => void): void {
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
    const initialLabel = getFontSizeLabel();
    btn.setAttribute("aria-label", initialLabel);
    btn.setAttribute("title", initialLabel);
    btn.innerHTML = `<span class="tffA-small">A</span><span class="tffA-big">A</span>`;
    overlay.appendChild(btn);
  }

  let created = false;
  let panel = ROOT_DOC.getElementById(PANEL_ID);
  if (!panel) {
    panel = ROOT_DOC.createElement("div");
    panel.id = PANEL_ID;
    const initialLabel = getFontSizeLabel();
    panel.innerHTML =
      `<div id="${TITLE_ID}">${initialLabel}</div>` +
      `<input id="${SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="${initialLabel}" />`;
    ROOT_DOC.body.appendChild(panel);
    created = true;
  }

  let voiceBtn = ROOT_DOC.getElementById(VOICE_TOGGLE_BTN_ID);
  if (!voiceBtn) {
    voiceBtn = ROOT_DOC.createElement("button");
    voiceBtn.id = VOICE_TOGGLE_BTN_ID;
    (voiceBtn as HTMLButtonElement).type = "button";
    voiceBtn.setAttribute("aria-label", "Vorleseleiste ausfahren");
    voiceBtn.setAttribute("title", "Vorleseleiste ausfahren");
    voiceBtn.textContent = "▲";
    ROOT_DOC.body.appendChild(voiceBtn);
    created = true;
  }

  let headerBtn = ROOT_DOC.getElementById(HEADER_TOGGLE_BTN_ID);
  if (!headerBtn) {
    headerBtn = ROOT_DOC.createElement("button");
    headerBtn.id = HEADER_TOGGLE_BTN_ID;
    (headerBtn as HTMLButtonElement).type = "button";
    headerBtn.setAttribute("aria-label", "Headerband einklappen");
    headerBtn.setAttribute("title", "Headerband einklappen");
    headerBtn.setAttribute("aria-expanded", "true");
    headerBtn.textContent = "▲";
    ROOT_DOC.body.appendChild(headerBtn);
  }

  if (created && onCreated) onCreated();
}

function hasVoiceCollapsedClass(): boolean {
  return ROOT_DOC.documentElement.classList.contains("lia-tff-voice-collapsed");
}

function setVoiceCollapsedClass(collapsed: boolean): void {
  const root = ROOT_DOC.documentElement;
  if (root.classList.contains("lia-tff-voice-collapsed") !== collapsed) {
    root.classList.toggle("lia-tff-voice-collapsed", collapsed);
  }
}

function updateVoiceToggleButtonLabel(): void {
  const btn = ROOT_DOC.getElementById(VOICE_TOGGLE_BTN_ID) as HTMLButtonElement | null;
  if (!btn) return;

  const collapsed = voiceCollapsedPref;
  const expectedText = String.fromCodePoint(collapsed ? 0x25B2 : 0x25BC);
  const expectedLabel = collapsed
    ? 'Vorleseleiste ausfahren'
    : 'Vorleseleiste einklappen';
  if (
    btn.textContent === expectedText &&
    btn.getAttribute('aria-label') === expectedLabel &&
    btn.getAttribute('title') === expectedLabel
  ) return;
  btn.textContent = collapsed ? "▲" : "▼";
  const label = collapsed ? "Vorleseleiste ausfahren" : "Vorleseleiste einklappen";
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", label);
}

function isWidePresentationMode(mode: string): boolean {
  if (mode !== "presentation" && mode !== "slides") return false;

  const vv = ROOT_WIN.visualViewport;
  const w = vv ? vv.width : (ROOT_DOC.documentElement.clientWidth || 0);
  return w >= 1001;
}

export function toggleVoiceFooterCollapsed(): void {
  voiceCollapsedPref = !voiceCollapsedPref;
  setVoiceCollapsedClass(voiceCollapsedPref);
  updateVoiceToggleButtonLabel();
}

export function syncVoiceFooterToggle(mode: string): void {
  const btn = ROOT_DOC.getElementById(VOICE_TOGGLE_BTN_ID) as HTMLButtonElement | null;
  if (!btn) return;

  btn.onclick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleVoiceFooterCollapsed();
  };

  const show = isWidePresentationMode(mode);
  btn.style.display = show ? "flex" : "none";

  if (!show) {
    setVoiceCollapsedClass(false);
    updateVoiceToggleButtonLabel();
    return;
  }

  // Re-apply persisted preference in case external DOM updates removed the class.
  if (hasVoiceCollapsedClass() !== voiceCollapsedPref) {
    setVoiceCollapsedClass(voiceCollapsedPref);
  }

  updateVoiceToggleButtonLabel();
}

function focusWithoutScrolling(element: HTMLElement): void {
  try {
    element.focus({ preventScroll: true });
  } catch (e) {
    element.focus();
  }
}

function setHeaderCollapsedClass(collapsed: boolean): void {
  if (collapsed) {
    const toolbar = getToolbarHeader();
    const active = ROOT_DOC.activeElement;
    const toggle = ROOT_DOC.getElementById(HEADER_TOGGLE_BTN_ID) as HTMLElement | null;
    if (toolbar && active && toolbar.contains(active) && toggle) {
      focusWithoutScrolling(toggle);
    }
  }

  const roots = [ROOT_DOC.documentElement];
  if (CONTENT_DOC !== ROOT_DOC) roots.push(CONTENT_DOC.documentElement);
  for (const root of roots) {
    if (root.classList.contains("lia-tff-header-collapsed") !== collapsed) {
      root.classList.toggle("lia-tff-header-collapsed", collapsed);
    }
  }
}

function updateHeaderToggleButtonLabel(): void {
  const btn = ROOT_DOC.getElementById(HEADER_TOGGLE_BTN_ID) as HTMLButtonElement | null;
  if (!btn) return;

  const collapsed = headerCollapsedPref;
  const expectedText = String.fromCodePoint(collapsed ? 0x25BC : 0x25B2);
  const expectedLabel = collapsed
    ? "Headerband ausfahren"
    : "Headerband einklappen";
  const expectedExpanded = collapsed ? "false" : "true";
  if (
    btn.textContent === expectedText &&
    btn.getAttribute("aria-label") === expectedLabel &&
    btn.getAttribute("title") === expectedLabel &&
    btn.getAttribute("aria-expanded") === expectedExpanded
  ) return;

  btn.textContent = collapsed ? "▼" : "▲";
  btn.setAttribute("aria-label", expectedLabel);
  btn.setAttribute("title", expectedLabel);
  btn.setAttribute("aria-expanded", expectedExpanded);
}

export function toggleHeaderBandCollapsed(): void {
  headerCollapsedPref = !headerCollapsedPref;
  setHeaderCollapsedClass(headerCollapsedPref);
  if (headerCollapsedPref) {
    ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    clearPosTimers();
  }
  updateHeaderToggleButtonLabel();
  positionHeaderBandToggle();
}

export function positionHeaderBandToggle(): void {
  const btn = ROOT_DOC.getElementById(HEADER_TOGGLE_BTN_ID) as HTMLElement | null;
  if (!btn) return;

  let top = 0;
  if (!headerCollapsedPref) {
    const toolbar = getToolbarHeader();
    if (toolbar) {
      try {
        const rect = toolbar.getBoundingClientRect();
        if (isFinite(rect.bottom)) top = Math.max(0, rect.bottom);
      } catch (e) { }
    }
  }

  const expectedTop = `${Math.round(top)}px`;
  if (
    btn.style.getPropertyValue("top") !== expectedTop ||
    btn.style.getPropertyPriority("top") !== "important"
  ) {
    btn.style.setProperty("top", expectedTop, "important");
  }
}

export function syncHeaderBandToggle(mode: string): void {
  const btn = ROOT_DOC.getElementById(HEADER_TOGGLE_BTN_ID) as HTMLButtonElement | null;
  if (!btn) return;

  btn.onclick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleHeaderBandCollapsed();
  };

  const toolbar = getToolbarHeader();
  const show = isWidePresentationMode(mode) && !!toolbar;

  const controls = toolbar && toolbar.id;
  if (controls && btn.getAttribute("aria-controls") !== controls) {
    btn.setAttribute("aria-controls", controls);
  } else if (!controls && btn.hasAttribute("aria-controls")) {
    btn.removeAttribute("aria-controls");
  }

  if (!show) {
    setHeaderCollapsedClass(false);
    if (ROOT_DOC.activeElement === btn) {
      const fallback = toolbar?.querySelector<HTMLElement>(
        '#lia-btn-toc, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (fallback && fallback !== btn) {
        focusWithoutScrolling(fallback);
      } else {
        btn.blur();
      }
    }
    btn.style.display = "none";
    positionHeaderBandToggle();
    updateHeaderToggleButtonLabel();
    return;
  }

  btn.style.display = "flex";

  // Re-apply the preference if LiaScript replaced the root element's classes.
  setHeaderCollapsedClass(headerCollapsedPref);

  positionHeaderBandToggle();
  updateHeaderToggleButtonLabel();
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
    if (ROOT_DOC.body.classList.contains("lia-tff-panel-open")) {
      ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    }
    (panel as HTMLElement).style.display = "none";
    clearPosTimers();
  }

  return show;
}

// =========================================================
// i18n label sync
// =========================================================

let cachedLang: string | null = null;

/**
 * Updates the "Font Size" panel title, button aria-label, and slider
 * aria-label whenever the course language changes.
 * Only touches the DOM when the language has actually changed.
 */
export function syncFontSizeLabel(): void {
  try {
    const lang = detectLanguage();
    if (lang === cachedLang) return;
    cachedLang = lang;

    const label = getFontSizeLabel();

    const title = ROOT_DOC.getElementById(TITLE_ID);
    if (title) title.textContent = label;

    const btn = ROOT_DOC.getElementById(BTN_ID);
    if (btn) {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }

    const slider = ROOT_DOC.getElementById(SLIDER_ID);
    if (slider) slider.setAttribute("aria-label", label);
  } catch (e) { }
}
