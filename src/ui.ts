// UI lifecycle: overlay/panel/button creation, positioning, and presentation-only visibility.

import {
  ROOT_WIN, ROOT_DOC, CONTENT_DOC,
  BTN_ID, PANEL_ID, SLIDER_ID, TITLE_ID, OVERLAY_ID, INLINE_SLOT_ID,
  VOICE_TOGGLE_BTN_ID, HEADER_TOGGLE_BTN_ID,
  clamp
} from "./state";
import {
  getViewport, getLayoutViewport, Viewport, isNightlyNavigationHidden,
  shouldUseTFFNightlyStackDock, shouldUseInlineStripDock, ensureInlineDockSlot,
  getDockTarget, getTFFTOCButtonRect, getToolbarHeader
} from "./toolbar";
import { detectLanguage, getFontSizeLabel } from "./i18n";

let voiceCollapsedPref = true;
let headerCollapsedPref = false;

function setStyle(el: HTMLElement, name: string, value: string): void {
  if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value);
}

let positionFrame: number | null = null;

/** Every event path shares one geometry pass per frame in ROOT_DOC coordinates. */
export function requestPositionUpdate(): void {
  if (positionFrame !== null) return;
  positionFrame = ROOT_WIN.requestAnimationFrame(() => {
    positionFrame = null;
    const viewport = getViewport();
    positionOverlayButton(viewport);
    positionPanel(viewport);
    positionHeaderBandToggle();
  });
}

export function cancelPositionUpdate(): void {
  if (positionFrame === null) return;
  ROOT_WIN.cancelAnimationFrame(positionFrame);
  positionFrame = null;
}

export function ensureUI(onCreated?: () => void): void {
  let created = false;
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
    const small = ROOT_DOC.createElement("span");
    small.className = "tffA-small";
    small.textContent = "A";
    const big = ROOT_DOC.createElement("span");
    big.className = "tffA-big";
    big.textContent = "A";
    btn.appendChild(small);
    btn.appendChild(big);
    overlay.appendChild(btn);
    created = true;
  }

  let panel = ROOT_DOC.getElementById(PANEL_ID);
  if (!panel) {
    panel = ROOT_DOC.createElement("div");
    panel.id = PANEL_ID;
    const initialLabel = getFontSizeLabel();

    const title = ROOT_DOC.createElement("div");
    title.id = TITLE_ID;
    title.textContent = initialLabel;

    const slider = ROOT_DOC.createElement("input");
    slider.id = SLIDER_ID;
    slider.type = "range";
    slider.min = "14";
    slider.max = "48";
    slider.step = "1";
    slider.value = "24";
    slider.setAttribute("aria-label", initialLabel);

    panel.appendChild(title);
    panel.appendChild(slider);
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

  return ROOT_WIN.matchMedia
    ? ROOT_WIN.matchMedia("(min-width: 1001px)").matches
    : getLayoutViewport().w >= 1001;
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
  setStyle(btn, "display", show ? "flex" : "none");

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
  }
  updateHeaderToggleButtonLabel();
  requestPositionUpdate();
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
    setStyle(btn, "display", "none");
    requestPositionUpdate();
    updateHeaderToggleButtonLabel();
    return;
  }

  setStyle(btn, "display", "flex");

  // Re-apply the preference if LiaScript replaced the root element's classes.
  setHeaderCollapsedClass(headerCollapsedPref);

  requestPositionUpdate();
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
    return;
  }

  if (shouldUseInlineStripDock()) {
    const inlineSlot = ensureInlineDockSlot();
    if (inlineSlot && btn.parentNode !== inlineSlot) {
      inlineSlot.appendChild(btn);
    }
    setStyle(overlay as HTMLElement, "left", "0px");
    setStyle(overlay as HTMLElement, "top", "0px");
    setStyle(btn as HTMLElement, "left", "");
    setStyle(btn as HTMLElement, "top", "");
    return;
  }

  if (btn.parentNode !== overlay) overlay.appendChild(btn);
  if (slot && slot.parentNode) slot.parentNode.removeChild(slot);
}

export function positionOverlayButton(vp = getViewport()): void {
  const btn = ROOT_DOC.getElementById(BTN_ID) as HTMLElement | null;
  const overlay = ROOT_DOC.getElementById(OVERLAY_ID) as HTMLElement | null;
  if (!btn || !overlay) return;

  placeButtonInCorrectHost();

  const root = ROOT_DOC.documentElement;
  const stackDock = shouldUseTFFNightlyStackDock();
  const marker = ROOT_DOC.querySelector<HTMLElement>("#lia-hl-ui-overlay-v1 > #lia-hl-btn");
  const markerStyle = marker ? ROOT_WIN.getComputedStyle(marker) : null;
  const btnStyle = ROOT_WIN.getComputedStyle(btn);
  const shared = !!marker && btnStyle.display !== "none" && btnStyle.visibility !== "hidden" &&
    btn.offsetWidth > 0 && btn.offsetHeight > 0 && marker!.offsetWidth > 0 && marker!.offsetHeight > 0 &&
    markerStyle?.display !== "none" && markerStyle?.visibility !== "hidden";
  const sharedStack = stackDock && shared;
  const inline = shouldUseInlineStripDock();
  const sharedInline = inline && shared;
  const tocRect = getTFFTOCButtonRect();
  const sharedFloating = !stackDock && !inline && shared && !!tocRect;
  if (!sharedStack && !sharedInline && !sharedFloating && root.hasAttribute("data-lia-tff-marker-dock")) {
    root.removeAttribute("data-lia-tff-marker-dock");
  }
  const markerWidth = shared ? (marker!.offsetWidth || (stackDock ? 22 : 40)) : 0;
  const markerHeight = shared ? (marker!.offsetHeight || (stackDock ? 22 : 40)) : 0;
  setStyle(root, "--lia-tff-inline-width", sharedInline ? `${46 + markerWidth + 8}px` : "46px");
  if (inline) {
    if (sharedInline) {
      // Reserve space in the actual toolbar: TOC -> marker -> font. The inline
      // pair follows the layout together when the user pans the magnified crop.
      const r = btn.getBoundingClientRect();
      setMarkerPosition(r.left - 8 - markerWidth, r.top + (r.height - markerHeight) / 2, "inline");
    }
    return;
  }

  const pad = 8;
  const gap = 8;

  const defaultBtnSize = isNightlyNavigationHidden() ? 22 : 34;
  let bw = defaultBtnSize, bh = defaultBtnSize;
  try {
    const r = btn.getBoundingClientRect();
    if (r && r.width > 6 && r.height > 6) { bw = r.width; bh = r.height; }
  } catch (e) { }

  if (sharedFloating) {
    // LiaScript can mount the TOC button in the open sidebar, outside the
    // header. Anchor both floating controls there, never to the marker's last
    // independent placement (which may still belong to the previous frame).
    const groupWidth = markerWidth + gap + bw;
    const groupHeight = Math.max(markerHeight, bh);
    const left = clamp(tocRect!.right + gap, vp.ox + pad, vp.ox + vp.w - groupWidth - pad);
    const top = clamp(tocRect!.top + (tocRect!.height - groupHeight) / 2,
      vp.oy + pad, vp.oy + vp.h - groupHeight - pad);
    setStyle(overlay, "left", "0px");
    setStyle(overlay, "top", "0px");
    setStyle(btn, "left", `${left + markerWidth + gap}px`);
    setStyle(btn, "top", `${top + (groupHeight - bh) / 2}px`);
    setMarkerPosition(left, top + (groupHeight - markerHeight) / 2, "floating");
    return;
  }

  let left = vp.ox + pad;
  let top = vp.oy + pad;

  if (stackDock) {
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

  // In mini navigation, board-mode owns TOC -> font -> marker. Reserve the
  // complete stack and expose fixed layout coordinates to the legacy marker.
  const stackWidth = Math.max(bw, sharedStack ? markerWidth : 0);
  const stackHeight = bh + (sharedStack ? 6 + markerHeight : 0);
  left = clamp(left, vp.ox + pad, vp.ox + vp.w - stackWidth - pad);
  top = clamp(top, vp.oy + pad, vp.oy + vp.h - stackHeight - pad);

  // Keep the overlay origin at layout (0,0). Offsets enter only the bounds;
  // DOMRect coordinates must never receive the visual offset a second time.
  setStyle(overlay, "left", "0px");
  setStyle(overlay, "top", "0px");
  setStyle(btn, "left", `${left}px`);
  setStyle(btn, "top", `${top}px`);
  if (sharedStack) {
    setMarkerPosition(left + (bw - markerWidth) / 2, top + bh + 6, "stack");
  }
}

function setMarkerPosition(left: number, top: number, dock: "inline" | "stack" | "floating"): void {
  const root = ROOT_DOC.documentElement;
  setStyle(root, "--lia-tff-marker-left", `${left}px`);
  setStyle(root, "--lia-tff-marker-top", `${top}px`);
  if (root.getAttribute("data-lia-tff-marker-dock") !== dock) root.setAttribute("data-lia-tff-marker-dock", dock);
}

export function positionPanel(vp: Viewport = getViewport()): void {
  const btn = ROOT_DOC.getElementById(BTN_ID);
  const panel = ROOT_DOC.getElementById(PANEL_ID) as HTMLElement | null;
  if (!btn || !panel || !ROOT_DOC.body.classList.contains("lia-tff-panel-open")) return;

  const r = btn.getBoundingClientRect();
  // The panel is open now: read its current size after font/language/layout changes.
  const w = panel.offsetWidth;
  const h = panel.offsetHeight;
  const gap = 10;
  const pad = 8;
  const left = clamp(r.left, vp.ox + pad, vp.ox + vp.w - w - pad);
  let top = r.bottom + gap;
  if (top + h + pad > vp.oy + vp.h) top = r.top - gap - h;
  top = clamp(top, vp.oy + pad, vp.oy + vp.h - h - pad);

  setStyle(panel, "left", `${left}px`);
  setStyle(panel, "top", `${top}px`);
}

const TFF_HIDE_MAX_W = 680;
const TFF_HIDE_MIN_DIM = 520;

function isSmallScreen(): boolean {
  try {
    if (ROOT_WIN.matchMedia) {
      return ROOT_WIN.matchMedia("(max-width: 680px), (max-height: 520px)").matches;
    }
    const { w, h } = getLayoutViewport();
    return w <= TFF_HIDE_MAX_W || Math.min(w, h) <= TFF_HIDE_MIN_DIM;
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

  if (btn) setStyle(btn, "display", show ? "inline-flex" : "none");

  if (!show && panel) {
    if (ROOT_DOC.body.classList.contains("lia-tff-panel-open")) {
      ROOT_DOC.body.classList.remove("lia-tff-panel-open");
    }
    setStyle(panel as HTMLElement, "display", "none");
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
