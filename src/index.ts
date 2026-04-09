(function () {

  // =========================================================
  // Root/Content (iframe-safe)
  // =========================================================
  function getRootWindow(): Window {
    let w: Window = window;
    try { while (w.parent && w.parent !== w) w = w.parent; } catch (e) { }
    return w;
  }

  const ROOT_WIN = getRootWindow();
  const ROOT_DOC = ROOT_WIN.document;

  const CONTENT_WIN = window;
  const CONTENT_DOC = document;

  // =========================================================
  // Per-Document Instance (import multiple times => no collision)
  // =========================================================
  const REGKEY = "__LIA_TFF_REG_V2__";
  interface Registry {
    instances: Record<string, Instance>;
  }
  interface Instance {
    __alive: boolean;
    ticking: boolean;
    lastMode: string | null;
    lastSettingsRaw: string | null;
    posTimers: number[];
    lastShow: boolean | null;
    lastToolbarSig: string | null;
    lastBurstAt: number;
    pendingReposition: boolean;
  }
  (ROOT_WIN as any)[REGKEY] = (ROOT_WIN as any)[REGKEY] || { instances: {} };
  const REG: Registry = (ROOT_WIN as any)[REGKEY];

  const DOC_ID =
    (CONTENT_DOC.baseURI || CONTENT_WIN.location.href || "") +
    "::" +
    (CONTENT_DOC.title || "");

  if ((REG.instances[DOC_ID] as any)?.__alive) return;

  const I: Instance = REG.instances[DOC_ID] = {
    __alive: true,
    ticking: false,
    lastMode: null,
    lastSettingsRaw: null,
    posTimers: [],
    lastShow: null,
    lastToolbarSig: null,
    lastBurstAt: 0,
    pendingReposition: false
  };

  // =========================================================
  // Reposition sequence (toolbar/layout sets itself with a delay)
  // =========================================================
  function clearPosTimers(): void {
    try {
      if (!I.posTimers) I.posTimers = [];
      while (I.posTimers.length) {
        ROOT_WIN.clearTimeout(I.posTimers.pop()!);
      }
    } catch (e) { }
  }

  function runPositionNow(): void {
    positionOverlayButton();
    positionPanel();
  }

  function scheduleRepositionBurst(): void {
    clearPosTimers();

    runPositionNow();
    ROOT_WIN.requestAnimationFrame(() => {
      ROOT_WIN.requestAnimationFrame(() => runPositionNow());
    });

    const delays = [40, 120, 260, 520];
    for (const ms of delays) {
      I.posTimers.push(ROOT_WIN.setTimeout(() => { runPositionNow(); }, ms));
    }

    try {
      if (ROOT_DOC.fonts && ROOT_DOC.fonts.ready) {
        ROOT_DOC.fonts.ready.then(() => runPositionNow());
      }
    } catch (e) { }
  }

  // =========================================================
  // Helpers: CSS Injection (import-safe)
  // =========================================================
  function ensureStyle(doc: Document, id: string, css: string): void {
    try {
      if (!doc) return;
      const old = doc.getElementById(id);
      if (old) return;
      const st = doc.createElement("style");
      st.id = id;
      st.textContent = css;
      (doc.head || doc.documentElement).appendChild(st);
    } catch (e) { }
  }

  // =========================================================
  // Mode detection (Lia settings in localStorage)
  // =========================================================
  const SETTINGS_KEY = "settings";
  const FONT_KEY = "lia-tff-font-px-v2";

  function norm(x: unknown): string { return String(x == null ? "" : x).toLowerCase(); }

  function safeGetSettingsRaw(): string | null {
    try { return localStorage.getItem(SETTINGS_KEY); }
    catch (e) { return null; }
  }

  function findModeInJson(obj: unknown): string | null {
    const seen = new Set<object>();

    function walk(v: unknown): string | null {
      if (v == null) return null;

      if (typeof v === "string") {
        const s = norm(v);
        if (s.includes("presentation")) return "presentation";
        if (s.includes("slides")) return "slides";
        if (s.includes("textbook") || s.includes("book")) return "textbook";
        return null;
      }

      if (typeof v !== "object") return null;
      if (seen.has(v as object)) return null;
      seen.add(v as object);

      for (const k in (v as Record<string, unknown>)) {
        if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
        const key = norm(k);
        if (key === "mode" || key === "view" || key === "layout" || key === "format") {
          const m = walk((v as Record<string, unknown>)[k]);
          if (m) return m;
        }
      }

      for (const k in (v as Record<string, unknown>)) {
        if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
        const m = walk((v as Record<string, unknown>)[k]);
        if (m) return m;
      }

      return null;
    }

    return walk(obj);
  }

  function detectMode(): string {
    const raw = safeGetSettingsRaw();
    if (!raw) return "unknown";

    try {
      const obj = JSON.parse(raw);
      return findModeInJson(obj) || "unknown";
    } catch (e) {
      const s = norm(raw);
      if (s.includes("presentation")) return "presentation";
      if (s.includes("slides")) return "slides";
      if (s.includes("textbook") || s.includes("book")) return "textbook";
      return "unknown";
    }
  }

  function applyModeAttr(mode: string): void {
    try { CONTENT_DOC.documentElement.dataset.liaMode = mode; } catch (e) { }
  }

  // =========================================================
  // Theme Accent color sync
  // =========================================================
  function getLiaAccentColor(doc: Document | null): string | null {
    try {
      const d = doc || document;
      const body = d.body || d.documentElement;

      const existing = d.querySelector(".lia-btn") as HTMLElement | null;
      if (existing) {
        const bg = getComputedStyle(existing).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
      }

      const probe = d.createElement("button");
      probe.className = "lia-btn";
      probe.type = "button";
      probe.textContent = "x";
      probe.style.position = "absolute";
      probe.style.left = "-9999px";
      probe.style.top = "-9999px";
      probe.style.visibility = "hidden";
      body.appendChild(probe);

      const bg = getComputedStyle(probe).backgroundColor;
      probe.remove();

      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    } catch (e) { }
    return null;
  }

  function setVar(doc: Document, k: string, v: string): void {
    try { doc.documentElement.style.setProperty(k, v); } catch (e) { }
  }

  function syncAccent(): void {
    const acc =
      getLiaAccentColor(ROOT_DOC) ||
      getLiaAccentColor(CONTENT_DOC) ||
      "rgb(11,95,255)";

    setVar(ROOT_DOC, "--lia-tff-accent", acc);
    setVar(CONTENT_DOC, "--lia-tff-accent", acc);
  }

  // =========================================================
  // CSS: Presentation width + font var
  // =========================================================
  const CONTENT_STYLE_ID = "lia-tff-style-content-v2";
  const CONTENT_CSS = `
:root{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 15px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 15px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 15px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 15px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="presentation"] body,
html[data-lia-mode="slides"] body{
  margin: 0 !important;
  overflow-x: hidden !important;
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  box-sizing: border-box !important;

  width: min(
    var(--lia-tff-maxw),
    calc(100vw - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  max-width: min(
    var(--lia-tff-maxw),
    calc(100vw - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  margin-left: var(--lia-tff-left-gap) !important;
  margin-right: var(--lia-tff-right-gap) !important;

  padding-left: var(--lia-tff-pad-left) !important;
  padding-right: var(--lia-tff-pad-right) !important;
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  font-size: var(--lia-tff-font) !important;
}
`;

  function ensureContentCSS(): void {
    ensureStyle(CONTENT_DOC, CONTENT_STYLE_ID, CONTENT_CSS);
  }

  // =========================================================
  // Font logic (auto 18/24/32) + slider override (presentation only)
  // =========================================================
  const PRES_PX = [18, 24, 32];

  function pxToStep0to2(px: number): number {
    if (px <= 17) return 0;
    if (px <= 19) return 1;
    return 2;
  }

  function getMainFontPx(): number {
    const main = CONTENT_DOC.querySelector("main") || CONTENT_DOC.documentElement;
    const fs = parseFloat(getComputedStyle(main).fontSize || "16");
    return isNaN(fs) ? 16 : fs;
  }

  function getSavedFontPx(): number | null {
    try {
      const v = localStorage.getItem(FONT_KEY);
      if (!v) return null;
      const n = parseInt(v, 10);
      return isFinite(n) ? n : null;
    } catch (e) {
      return null;
    }
  }

  function clamp(n: number, a: number, b: number): number { return Math.max(a, Math.min(b, n)); }

  function setPresFontPx(px: number | null): void {
    setVar(CONTENT_DOC, "--lia-tff-font", px == null ? "unset" : (px + "px"));
  }

  let sampling = false;

  function applyFontLogic(mode: string): void {
    const isPres = (mode === "presentation");
    const isPresLike = isPres || (mode === "slides");

    if (!isPresLike) {
      setPresFontPx(null);
      return;
    }

    if (isPres) {
      const saved = getSavedFontPx();
      if (saved != null) {
        setPresFontPx(clamp(saved, 14, 48));
        return;
      }
    }

    if (sampling) return;
    sampling = true;

    setPresFontPx(null);

    CONTENT_WIN.requestAnimationFrame(function () {
      CONTENT_WIN.requestAnimationFrame(function () {
        const step = pxToStep0to2(getMainFontPx());
        setPresFontPx(PRES_PX[step]);
        sampling = false;
      });
    });
  }

  // =========================================================
  // Root UI (Overlay)
  // =========================================================
  const ROOT_STYLE_ID = "lia-tff-style-root-v2";
  const OVERLAY_ID = "lia-tff-overlay-v2";
  const BTN_ID = "lia-tff-btn-v2";
  const PANEL_ID = "lia-tff-panel-v2";
  const SLIDER_ID = "lia-tff-slider-v2";
  const TITLE_ID = "lia-tff-title-v2";
  const INLINE_SLOT_ID = "lia-tff-inline-slot-v2";

  const ROOT_CSS = `
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#${OVERLAY_ID}{
  position: fixed !important;
  z-index: 99999980 !important;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none !important;
}

#${BTN_ID}{
  pointer-events: auto !important;
  position: absolute !important;
  width: 34px !important;
  height: 34px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 0 !important;
  background: transparent !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#${INLINE_SLOT_ID}{
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  width: 46px !important;
  min-width: 46px !important;
  max-width: 46px !important;
  height: 34px !important;
  min-height: 34px !important;
  box-sizing: border-box !important;
  padding-right: 2px !important;
  overflow: visible !important;
  flex: 0 0 46px !important;
  pointer-events: none !important;
}

#${INLINE_SLOT_ID} > #${BTN_ID}{
  position: relative !important;
  left: auto !important;
  top: auto !important;
  margin: 0 !important;
}

body.lia-navigation--hidden #lia-toolbar-nav .lia-header__left{
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  width: 46px !important;
  min-width: 46px !important;
  gap: 6px !important;
  overflow: visible !important;
}

body.lia-navigation--hidden #lia-tff-btn-v2{
  width: 22px !important;
  height: 22px !important;
}

body.lia-tff-nightly-mini #${BTN_ID}{
  width: 22px !important;
  height: 22px !important;
  border-radius: 6px !important;
}

body.lia-tff-nightly-mini #${BTN_ID} .tffA-small{
  left: 0px !important;
  top: 2px !important;
  font-size: 15px !important;
}

body.lia-tff-nightly-mini #${BTN_ID} .tffA-big{
  left: 5px !important;
  top: -2px !important;
  font-size: 18px !important;
}

#${BTN_ID}:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 12%, transparent) !important;
}
#${BTN_ID}:active{
  background: color-mix(in srgb, var(--lia-tff-accent) 18%, transparent) !important;
}
#${BTN_ID}:focus,
#${BTN_ID}:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

#${BTN_ID} .tffA-small,
#${BTN_ID} .tffA-big{
  position: absolute !important;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}

#${BTN_ID} .tffA-small{
  left: 2px !important;
  top: 3px !important;
  font-size: 24px !important;
  color: var(--lia-tff-accent) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.25) !important;
  opacity: .95 !important;
}

#${BTN_ID} .tffA-big{
  left: 10px !important;
  top: -2px !important;
  font-size: 30px !important;
  color: #fff !important;
  text-shadow: 0 2px 3px rgba(0,0,0,.45) !important;
  opacity: .98 !important;
}

#${PANEL_ID}{
  position: fixed !important;
  z-index: 99999979 !important;
  width: 240px !important;
  padding: 12px 14px !important;
  display: none !important;
  border-radius: 14px !important;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent) !important;
  background: color-mix(in srgb, rgba(0, 0, 0, 0.65) 65%, transparent) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 16px 42px rgba(0,0,0,.18) !important;
}

body.lia-tff-panel-open #${PANEL_ID}{
  display: block !important;
}

#${TITLE_ID}{
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  margin: 0 0 10px 0 !important;
  letter-spacing: .2px !important;
}

#${PANEL_ID} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}
`;

  function ensureRootCSS(): void {
    ensureStyle(ROOT_DOC, ROOT_STYLE_ID, ROOT_CSS);
  }

  function ensureUI(): void {
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
      btn.type = "button";
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

  // =========================================================
  // Toolbar helpers
  // =========================================================
  function getToolbarHeader(): Element | null {
    return ROOT_DOC.querySelector("header#lia-toolbar-nav") ||
      ROOT_DOC.querySelector("#lia-toolbar-nav") ||
      ROOT_DOC.querySelector("header.lia-header");
  }

  function getToolbarLeftContainer(): Element | null {
    const header = getToolbarHeader();
    if (!header) return null;
    return header.querySelector(".lia-header__left") || header;
  }

  function getViewport() {
    const vv = ROOT_WIN.visualViewport;
    if (vv) {
      return { w: vv.width, h: vv.height, ox: vv.offsetLeft || 0, oy: vv.offsetTop || 0 };
    }
    const de = ROOT_DOC.documentElement;
    return { w: de.clientWidth, h: de.clientHeight, ox: 0, oy: 0 };
  }

  function getVisibleRect(el: Element | null): DOMRect | null {
    if (!el) return null;
    try {
      const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
      if (!cs || cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return null;

      const r = el.getBoundingClientRect();
      if (!r || r.width < 6 || r.height < 6) return null;

      const vp = getViewport();
      if (r.right < 0 || r.bottom < 0 || r.left > vp.w || r.top > vp.h) return null;

      return r;
    } catch (e) {
      return null;
    }
  }

  function getRectLoose(el: Element | null): DOMRect | null {
    if (!el) return null;
    try {
      const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
      if (!cs) return null;
      if (cs.display === "none" || cs.visibility === "hidden") return null;

      const r = el.getBoundingClientRect();
      if (!r || r.width < 2 || r.height < 2) return null;

      const vp = getViewport();
      if (r.right < 0 || r.bottom < 0 || r.left > vp.w || r.top > vp.h) return null;

      return r;
    } catch (e) {
      return null;
    }
  }

  function isSaneTopLeftRect(r: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number } | null): boolean {
    if (!r) return false;
    const vp = getViewport();
    if (!isFinite(r.left) || !isFinite(r.top) || !isFinite(r.right) || !isFinite(r.bottom)) return false;
    if (r.width < 6 || r.height < 6) return false;
    if (r.top < -20 || r.top > 220) return false;
    if (r.left < -20) return false;
    if (r.left > vp.w * 0.60) return false;
    if (r.right > vp.w + 120) return false;
    if (r.bottom > vp.h + 120) return false;
    return true;
  }

  function isNightlyNavigationHidden(): boolean {
    const canvas = ROOT_DOC.querySelector(".lia-canvas");
    return !!(canvas && canvas.classList.contains("lia-navigation--hidden"));
  }

  function syncNightlyMiniMode(): void {
    try {
      if (!ROOT_DOC.body) return;
      ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini", isNightlyNavigationHidden());
    } catch (e) { }
  }

  function getTFFTOCButton(): Element | null {
    const byId = ROOT_DOC.getElementById("lia-btn-toc");
    if (byId) return byId;

    const host = getToolbarLeftContainer();
    if (!host) return null;

    const btns = Array.from(host.querySelectorAll("button,[role='button'],a"));
    return btns.find(b => {
      const t = (
        (b.getAttribute("aria-label") || "") + " " +
        (b.getAttribute("title") || "") + " " +
        (b.textContent || "")
      ).toLowerCase();

      return (
        t.includes("inhaltsverzeichnis") ||
        t.includes("table of contents") ||
        t.includes("contents")
      );
    }) || null;
  }

  function getTFFTOCButtonRect(): DOMRect | null {
    const tocBtn = getTFFTOCButton();
    if (!tocBtn) return null;
    try {
      const r = tocBtn.getBoundingClientRect();
      if (!r || r.width < 6 || r.height < 6) return null;
      return r;
    } catch (e) {
      return null;
    }
  }

  function shouldUseTFFNightlyStackDock(): boolean {
    const canvas = ROOT_DOC.querySelector(".lia-canvas");
    if (!canvas) return false;
    return canvas.classList.contains("lia-navigation--hidden") &&
      canvas.classList.contains("lia-mode--presentation");
  }

  function shouldUseInlineStripDock(): boolean {
    if (shouldUseTFFNightlyStackDock()) return false;
    const host = getToolbarLeftContainer();
    const tocBtn = getTFFTOCButton();
    return !!(host && tocBtn && host.contains(tocBtn));
  }

  function ensureInlineDockSlot(): Element | null {
    const host = getToolbarLeftContainer();
    const tocBtn = getTFFTOCButton();

    if (!host || !tocBtn || !host.contains(tocBtn)) return null;

    let slot = ROOT_DOC.getElementById(INLINE_SLOT_ID);
    if (!slot) {
      slot = ROOT_DOC.createElement("div");
      slot.id = INLINE_SLOT_ID;
    }

    if (slot.parentNode !== host || slot.previousElementSibling !== tocBtn) {
      tocBtn.insertAdjacentElement("afterend", slot);
    }

    return slot;
  }

  function placeButtonInCorrectHost(): void {
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

  function getHighlightRect(): ({ left: number; top: number; right: number; bottom: number; width: number; height: number } & { isSynthetic?: boolean }) | DOMRect | null {
    const btn = ROOT_DOC.getElementById("lia-hl-btn");
    if (!btn) return null;

    let r: DOMRect | null = null;
    try { r = btn.getBoundingClientRect(); } catch (e) { r = null; }

    if (isSaneTopLeftRect(r)) return r;

    const leftC = getToolbarLeftContainer() || btn.parentElement || getToolbarHeader();
    if (!leftC) return null;

    const c = getVisibleRect(leftC);
    if (!c) return null;

    const bw = Math.max(34, (btn as HTMLElement).offsetWidth || 0);
    const bh = Math.max(34, (btn as HTMLElement).offsetHeight || 0);
    const ox = (btn as HTMLElement).offsetLeft || 0;
    const oy = typeof (btn as HTMLElement).offsetTop === "number"
      ? (btn as HTMLElement).offsetTop
      : Math.max(0, (c.height - bh) / 2);

    const synthetic = {
      left: c.left + ox,
      top: c.top + oy,
      right: c.left + ox + bw,
      bottom: c.top + oy + bh,
      width: bw,
      height: bh
    };

    if (isSaneTopLeftRect(synthetic)) return synthetic;

    return {
      left: c.left + 8,
      top: c.top + Math.max(0, (c.height - 34) / 2),
      right: c.left + 8 + 34,
      bottom: c.top + Math.max(0, (c.height - 34) / 2) + 34,
      width: 34,
      height: 34
    };
  }

  function isTOCOpen(): boolean {
    const toc = ROOT_DOC.getElementById("lia-toc");
    if (!toc) return false;
    return toc.classList.contains("lia-toc--open");
  }

  function getTOCButtonRect(): DOMRect | null {
    return getVisibleRect(ROOT_DOC.getElementById("lia-btn-toc"));
  }

  function getToolbarBandRect(): DOMRect | null {
    const leftC = getToolbarLeftContainer();
    const leftR = getVisibleRect(leftC);
    if (leftR) return leftR;
    return getVisibleRect(getToolbarHeader());
  }

  function getVirtualHighlightSlotRect(): { left: number; top: number; right: number; bottom: number; width: number; height: number } | null {
    const band = getToolbarBandRect();
    if (!band) return null;

    const size = 34;
    const insetLeft = 8;

    return {
      left: band.left + insetLeft,
      top: band.top + (band.height - size) / 2,
      right: band.left + insetLeft + size,
      bottom: band.top + (band.height - size) / 2 + size,
      width: size,
      height: size
    };
  }

  type Peer = { el: Element; r: DOMRect };
  type DockTarget = {
    kind: string;
    rect: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number };
    peers: Peer[];
  };

  function getStableLeftToolbarPeers(): Peer[] {
    const vp = getViewport();
    const leftC = getToolbarLeftContainer();
    if (!leftC) return [];

    const out: Peer[] = [];
    const els = Array.from(leftC.querySelectorAll("button,[role='button'],a"));

    for (const el of els) {
      if (!el || el.id === BTN_ID) continue;
      const r = getVisibleRect(el);
      if (!r) continue;
      if (r.top > 220) continue;
      if (r.left > vp.w * 0.60) continue;
      if (r.width > 220 || r.height > 100) continue;
      out.push({ el, r });
    }

    out.sort((a, b) => (a.r.left - b.r.left) || (a.r.top - b.r.top));

    if (!out.length) return out;

    const baseMidY = out[0].r.top + out[0].r.height / 2;
    const yTol = Math.max(20, out[0].r.height * 0.9);

    return out.filter(p => {
      const midY = p.r.top + p.r.height / 2;
      return Math.abs(midY - baseMidY) <= yTol;
    });
  }

  function getTOCDockSlot(): DockTarget | null {
    const gap = 8;
    const pad = 8;

    const toc = ROOT_DOC.getElementById("lia-toc");
    const tocBtn = ROOT_DOC.getElementById("lia-btn-toc");
    const tocBtnRect = getRectLoose(tocBtn);
    const nightly = isNightlyNavigationHidden();
    const size = nightly ? 22 : 34;

    if (!tocBtnRect) return null;

    if (nightly) {
      const left = tocBtnRect.left + (tocBtnRect.width - size) / 2;
      const top = tocBtnRect.bottom + gap;

      return {
        kind: "toc-open-slot",
        rect: {
          left: Math.max(pad, left),
          top: Math.max(pad, top),
          right: Math.max(pad, left) + size,
          bottom: Math.max(pad, top) + size,
          width: size,
          height: size
        },
        peers: [{ el: tocBtn!, r: tocBtnRect }]
      };
    }

    if (toc && toc.classList.contains("lia-toc--open")) {
      const left = tocBtnRect.right + gap;
      const top = tocBtnRect.top + (tocBtnRect.height - size) / 2;

      return {
        kind: "toc-open-slot",
        rect: {
          left,
          top: Math.max(pad, top),
          right: left + size,
          bottom: Math.max(pad, top) + size,
          width: size,
          height: size
        },
        peers: [{ el: tocBtn!, r: tocBtnRect }]
      };
    }

    return {
      kind: "toc-button",
      rect: tocBtnRect,
      peers: [{ el: tocBtn!, r: tocBtnRect }]
    };
  }

  function getDockTarget(): DockTarget | null {
    const hlRect = getHighlightRect();
    if (hlRect) {
      return {
        kind: "highlight",
        rect: hlRect as DOMRect,
        peers: [{ el: ROOT_DOC.getElementById("lia-hl-btn")!, r: hlRect as DOMRect }]
      };
    }

    const peers = getStableLeftToolbarPeers();
    if (peers.length) {
      let rightMost = peers[0].r;
      for (const p of peers) {
        if (p.r.right > rightMost.right) rightMost = p.r;
      }
      return { kind: "toolbar-row", rect: rightMost, peers };
    }

    const tocDock = getTOCDockSlot();
    if (tocDock) return tocDock;

    const virtualRect = getVirtualHighlightSlotRect();
    if (virtualRect) {
      return { kind: "virtual-highlight-slot", rect: virtualRect, peers: [] };
    }

    return null;
  }

  function toolbarSignature(): string | null {
    try {
      const vp = getViewport();
      const dock = getDockTarget();

      if (!dock) {
        return [Math.round(vp.w), Math.round(vp.h), Math.round(vp.ox), Math.round(vp.oy), "none"].join("|");
      }

      const r = dock.rect;
      const count = dock.peers ? dock.peers.length : 0;

      return [
        Math.round(vp.w), Math.round(vp.h), Math.round(vp.ox), Math.round(vp.oy),
        dock.kind,
        Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom),
        Math.round(r.width), Math.round(r.height),
        count
      ].join("|");
    } catch (e) {
      return null;
    }
  }

  function positionOverlayButton(): void {
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
        const stackPitch = 28;
        const stackIndex = 0;
        left = tocRect.left + (tocRect.width - bw) / 2;
        top = tocRect.bottom + stackGap + stackIndex * stackPitch;
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

  function measurePanel(panel: HTMLElement): { w: number; h: number } {
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

    return { w, h };
  }

  function positionPanel(): void {
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

  // =========================================================
  // Visibility
  // =========================================================
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

  function setPresentationOnlyVisibility(mode: string): boolean {
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

  function syncSliderToCurrent(): void {
    const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
    if (!slider) return;

    const min = parseInt(slider.min || "14", 10);
    const max = parseInt(slider.max || "48", 10);

    const saved = getSavedFontPx();
    if (saved != null) {
      slider.value = String(clamp(saved, min, max));
      return;
    }

    const v = getComputedStyle(CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim();
    const n = parseInt(v, 10);
    if (isFinite(n)) slider.value = String(clamp(n, min, max));
  }

  function burstRepositionThrottled(): void {
    const now = Date.now();
    if (now - (I.lastBurstAt || 0) < 120) return;
    I.lastBurstAt = now;
    scheduleRepositionBurst();
  }

  // =========================================================
  // Event wiring
  // =========================================================
  function wireOnce(): void {
    const btn = ROOT_DOC.getElementById(BTN_ID);
    const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
    if (!btn || !slider) return;

    if (!(btn as any).__liaTffWired) {
      (btn as any).__liaTffWired = true;

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
    }

    if (!(slider as any).__liaTffWired) {
      (slider as any).__liaTffWired = true;

      slider.addEventListener("input", () => {
        const min = parseInt(slider.min || "14", 10);
        const max = parseInt(slider.max || "48", 10);
        const v = clamp(parseInt(slider.value || "24", 10), min, max);
        try { localStorage.setItem(FONT_KEY, String(v)); } catch (e) { }
        setPresFontPx(v);
      });
    }
  }

  // =========================================================
  // Main tick
  // =========================================================
  function tick(): void {
    if (I.ticking) return;
    I.ticking = true;

    ROOT_WIN.requestAnimationFrame(() => {
      try {
        ensureContentCSS();
        ensureRootCSS();

        const settingsRaw = safeGetSettingsRaw();
        const mode = detectMode();
        applyModeAttr(mode);

        syncAccent();

        ensureUI();
        syncNightlyMiniMode();
        placeButtonInCorrectHost();
        const show = setPresentationOnlyVisibility(mode);

        const showChanged = (I.lastShow === null) ? true : (show !== I.lastShow);
        I.lastShow = show;

        const sig = toolbarSignature();
        const sigChanged = !!(sig && sig !== I.lastToolbarSig);
        I.lastToolbarSig = sig || I.lastToolbarSig;

        if (!show && sigChanged) {
          I.pendingReposition = true;
        }

        positionOverlayButton();
        if (show) positionPanel();

        const modeOrSettingsChanged = (mode !== I.lastMode) || (settingsRaw !== I.lastSettingsRaw);

        if (modeOrSettingsChanged) {
          applyFontLogic(mode);
          I.lastMode = mode;
          I.lastSettingsRaw = settingsRaw;
        }

        const needBurst = showChanged || sigChanged || modeOrSettingsChanged || I.pendingReposition;

        if (needBurst) {
          I.pendingReposition = false;
          burstRepositionThrottled();
        }

        syncSliderToCurrent();
        if (show) positionPanel();

        wireOnce();

      } finally {
        I.ticking = false;
      }
    });
  }

  // =========================================================
  // Observers + startup
  // =========================================================
  try {
    const mo = new MutationObserver(() => tick());
    mo.observe(ROOT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  try {
    const mo2 = new MutationObserver(() => tick());
    mo2.observe(CONTENT_DOC.documentElement, { childList: true, subtree: true, attributes: true });
  } catch (e) { }

  ROOT_WIN.addEventListener("storage", function (e) {
    if (!e) return;
    if (e.key === SETTINGS_KEY || e.key === FONT_KEY) tick();
  });

  tick();
  ROOT_WIN.setInterval(() => { if (I.__alive) tick(); }, 350);

  // =========================================================
  // Mode-only CSS: data-lia-only attribute support
  // =========================================================
  (function () {
    const STYLE_ID = "__LIA_MODE_ONLY_STYLE_V01__";
    const MODE_CSS = `
[data-lia-only]{ display: block; }

html[data-lia-mode="slides"] [data-lia-only]:not([data-lia-only="slides"]){
  display: none !important;
}
html[data-lia-mode="presentation"] [data-lia-only]:not([data-lia-only="presentation"]){
  display: none !important;
}
html[data-lia-mode="textbook"] [data-lia-only]:not([data-lia-only="textbook"]){
  display: none !important;
}
`;

    function ensureModeStyle(doc: Document): void {
      try {
        const head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
        if (!head) return;
        if (doc.getElementById(STYLE_ID)) return;

        const style = doc.createElement("style");
        style.id = STYLE_ID;
        style.type = "text/css";
        style.appendChild(doc.createTextNode(MODE_CSS));
        head.appendChild(style);
      } catch (e) { }
    }

    function normM(x: unknown): string { return String(x ?? "").trim().toLowerCase(); }

    function mapModeToken(x: string): string | null {
      const s = normM(x);
      if (s === "book") return "textbook";
      if (s === "hearing") return "presentation";
      if (s === "visibility") return "slides";
      if (s === "textbook" || s === "presentation" || s === "slides") return s;
      if (s.includes("textbook") || s.includes("lehrbuch")) return "textbook";
      if (s.includes("presentation") || s.includes("präsent")) return "presentation";
      if (s.includes("slides") || s.includes("folien")) return "slides";
      return null;
    }

    function modeFromActiveTopbarIcon(doc: Document): string | null {
      const icons = Array.from(doc.querySelectorAll(".material-icons, i.material-icons, span.material-icons"));

      function isActive(btn: Element): boolean {
        const ap = normM(btn.getAttribute("aria-pressed"));
        const as_ = normM(btn.getAttribute("aria-selected"));
        const cls = normM(btn.className);
        return ap === "true" || as_ === "true" || cls.includes("active") || cls.includes("selected") || cls.includes("mdc-icon-button--on");
      }

      let best: { mode: string; score: number } | null = null;
      for (const ic of icons) {
        const key = normM(ic.textContent);
        const m = mapModeToken(key);
        if (!m) continue;

        const btn = ic.closest("button,[role='button'],a");
        const r = (btn || ic).getBoundingClientRect();
        const vw = (doc.defaultView as Window).innerWidth || 1200;

        let score = 0;
        if (r.top < 140) score += 200;
        if (r.left > vw * 0.55) score += 200;
        if (btn && isActive(btn)) score += 1000;

        if (!best || score > best.score) best = { mode: m, score };
      }
      return best ? best.mode : null;
    }

    function modeFromWrapperAttrs(doc: Document): string | null {
      const cand = [
        doc.querySelector("#app"),
        doc.querySelector("main"),
        doc.querySelector(".markdown-body"),
        doc.body,
        doc.documentElement
      ].filter(Boolean) as Element[];

      for (const el of cand) {
        const blob = [
          el.getAttribute && el.getAttribute("data-mode"),
          el.getAttribute && el.getAttribute("data-view"),
          el.getAttribute && el.getAttribute("mode"),
          el.className,
          el.id
        ].map(v => String(v || "")).join(" ");
        const m = mapModeToken(blob);
        if (m) return m;
      }
      return null;
    }

    function modeFromURL(win: Window): string | null {
      const q = normM(win.location.search) + "&" + normM(win.location.hash);
      return mapModeToken(q);
    }

    function modeFromStorage(win: Window): string | null {
      const stores = [win.sessionStorage, win.localStorage].filter(Boolean);
      for (const stor of stores) {
        try {
          for (let i = 0; i < stor.length; i++) {
            const k = stor.key(i);
            const v = stor.getItem(k!);
            const m = mapModeToken((k || "") + " " + (v || ""));
            if (m) return m;
          }
        } catch (e) { }
      }
      return null;
    }

    function detectModeForDoc(doc: Document): string | null {
      const win = doc.defaultView as Window;
      return (
        modeFromActiveTopbarIcon(doc) ||
        modeFromWrapperAttrs(doc) ||
        modeFromURL(win) ||
        modeFromStorage(win)
      );
    }

    function collectDocsSameOrigin(): Document[] {
      const docs = new Set<Document>();
      function add(d: Document): void { try { if (d && d.documentElement) docs.add(d); } catch (e) { } }

      try {
        let w: Window = window;
        for (let i = 0; i < 12; i++) {
          add(w.document);
          if (!w.parent || w.parent === w) break;
          w = w.parent;
        }
      } catch (e) { }

      for (const d of Array.from(docs)) {
        try {
          d.querySelectorAll("iframe").forEach(fr => {
            try { add(fr.contentDocument!); } catch (e) { }
          });
        } catch (e) { }
      }

      return Array.from(docs);
    }

    function applyModeOnly(): void {
      const docs = collectDocsSameOrigin();

      const sectionDocs = docs.filter(d => {
        try { return !!d.querySelector("[data-lia-only]"); } catch (e) { return false; }
      });

      const targetSectionDocs = sectionDocs.length ? sectionDocs : [document];

      for (const d of targetSectionDocs) {
        ensureModeStyle(d);
      }

      let mode: string | null = null;
      for (const d of docs) {
        mode = detectModeForDoc(d);
        if (mode) break;
      }
      if (!mode) mode = "unknown";

      const valid = (mode === "slides" || mode === "presentation" || mode === "textbook");
      for (const d of targetSectionDocs) {
        try {
          if (valid) d.documentElement.setAttribute("data-lia-mode", mode!);
          else d.documentElement.removeAttribute("data-lia-mode");
        } catch (e) { }
      }
    }

    applyModeOnly();
    setTimeout(applyModeOnly, 50);
    setTimeout(applyModeOnly, 250);
    setTimeout(applyModeOnly, 1000);

    document.addEventListener("click", () => setTimeout(applyModeOnly, 0), true);
    window.addEventListener("hashchange", applyModeOnly, true);
    window.addEventListener("popstate", applyModeOnly, true);
  })();

})();
