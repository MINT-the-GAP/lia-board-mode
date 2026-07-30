// CSS injection helpers, theme accent sync, and the CONTENT/ROOT stylesheet constants.

import {
  ROOT_WIN, ROOT_DOC, CONTENT_WIN, CONTENT_DOC, clamp,
  OVERLAY_ID, BTN_ID, PANEL_ID, TITLE_ID, INLINE_SLOT_ID
} from "./state";

export function ensureStyle(doc: Document, id: string, css: string): void {
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

export function setVar(doc: Document, k: string, v: string): void {
  try { doc.documentElement.style.setProperty(k, v); } catch (e) { }
}

let cachedAccent: string | null = null;
let cachedAccentMode: string | null = null;

function getLiaAccentColor(doc: Document | null): string | null {
  try {
    const d = doc || document;
    const body = d.body || d.documentElement;

    const win = d.defaultView as Window;

    const existing = d.querySelector(".lia-btn") as HTMLElement | null;
    if (existing) {
      const bg = win.getComputedStyle(existing).backgroundColor;
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

    const bg = win.getComputedStyle(probe).backgroundColor;
    probe.remove();

    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
  } catch (e) { }
  return null;
}

export function syncAccent(mode: string): void {
  if (mode === cachedAccentMode && cachedAccent) {
    setVar(ROOT_DOC, "--lia-tff-accent", cachedAccent);
    setVar(CONTENT_DOC, "--lia-tff-accent", cachedAccent);
    return;
  }

  const acc =
    getLiaAccentColor(ROOT_DOC) ||
    getLiaAccentColor(CONTENT_DOC) ||
    "rgb(11,95,255)";

  cachedAccent = acc;
  cachedAccentMode = mode;

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
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
}

/* Collapsible TTS footer (mode 1/2): hidden by default until user expands. */
html.lia-tff-voice-collapsed[data-lia-mode="presentation"] .lia-responsive-voice,
html.lia-tff-voice-collapsed[data-lia-mode="slides"] .lia-responsive-voice{
  min-height: 0 !important;
  max-height: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
  opacity: 0 !important;
}

html[data-lia-mode="presentation"] .lia-responsive-voice,
html[data-lia-mode="slides"] .lia-responsive-voice{
  transition: max-height .2s ease, opacity .2s ease, padding .2s ease;
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

/* Reliable scroll spacer only on real slide content nodes. */
html[data-lia-mode="presentation"] .lia-slide__container > main.lia-slide__content::after,
html[data-lia-mode="slides"] .lia-slide__container > main.lia-slide__content::after{
  content: "";
  display: block;
  height: var(--lia-tff-slide-exit-space);
  pointer-events: none;
}

/* Opt-in horizontal layout for LiaScript single-/multiple-choice answers. */
@media (min-width: 761px){
  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers{
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    width: 100% !important;
    margin-inline: 0 !important;
    padding-inline: 0 !important;
    gap: 0 !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label{
    box-sizing: border-box !important;
    display: flex !important;
    flex: 1 1 0 !important;
    position: relative !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: .5rem clamp(.5rem, 1.4vw, 1.2rem) !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label + .lia-label::before,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label + .lia-label::before{
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 2px;
    background: rgb(var(--color-highlight));
    pointer-events: none;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label > span,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label > span{
    min-width: 0 !important;
    overflow-wrap: anywhere;
  }
}
`;

export function ensureContentCSS(): void {
  ensureStyle(CONTENT_DOC, CONTENT_STYLE_ID, CONTENT_CSS);
}

let lastExitTuneKey: string | null = null;
let lastExitTuneScroller: HTMLElement | null = null;
let lastExitTuneContent: HTMLElement | null = null;
const LAST_LINE_VISIBLE_FRACTION = 0.40;
const EXIT_TUNE_EPSILON_PX = 1;

function parseLenToPx(v: string, vh: number): number {
  const s = String(v || "").trim().toLowerCase();
  if (!s) return 0;
  if (s.endsWith("px")) {
    const n = parseFloat(s.slice(0, -2));
    return isFinite(n) ? n : 0;
  }
  if (s.endsWith("vh")) {
    const n = parseFloat(s.slice(0, -2));
    return isFinite(n) ? (vh * n / 100) : 0;
  }
  const n = parseFloat(s);
  return isFinite(n) ? n : 0;
}

function getLastTextLineRect(root: Element): DOMRect | null {
  const all = Array.from(root.querySelectorAll("*")) as HTMLElement[];

  for (let i = all.length - 1; i >= 0; i--) {
    const el = all[i];
    if (!el) continue;

    const txt = (el.textContent || "").trim();
    if (!txt) continue;

    const cs = CONTENT_WIN.getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;

    try {
      const range = CONTENT_DOC.createRange();
      range.selectNodeContents(el);
      const rects = Array.from(range.getClientRects());

      for (let j = rects.length - 1; j >= 0; j--) {
        const r = rects[j];
        if (!r || r.width < 4 || r.height < 2) continue;
        return r;
      }
    } catch (e) { }
  }

  return null;
}

/**
 * Adapts extra slide scroll-space so only ~40% of the last rendered text line
 * remains visible at max scroll across different responsive LiaScript layouts.
 */
export function syncSlideExitSpace(mode: string): void {
  if (mode !== "presentation" && mode !== "slides") {
    lastExitTuneKey = null;
    lastExitTuneScroller = null;
    lastExitTuneContent = null;
    return;
  }

  try {
    const containers = Array.from(CONTENT_DOC.querySelectorAll(".lia-slide__container")) as HTMLElement[];
    if (!containers.length) return;

    const vpH = CONTENT_WIN.innerHeight || 1000;
    const scored = containers
      .filter(el => el.clientHeight > 80)
      .map(el => {
        const cs = CONTENT_WIN.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const visH = Math.max(0, Math.min(r.bottom, vpH) - Math.max(r.top, 0));
        const visScore = visH * Math.max(1, r.width);
        const overflow = Math.max(0, el.scrollHeight - el.clientHeight);
        const shown = (cs.display !== "none" && cs.visibility !== "hidden") ? 1 : 0;
        return { el, r, score: shown * (visScore + overflow * 10) };
      })
      .sort((a, b) => b.score - a.score);

    const scroller = (scored[0] && scored[0].score > 0)
      ? scored[0].el
      : containers
          .sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0];

    if (!scroller) return;

    const content = (scroller.querySelector("main.lia-slide__content") ||
      CONTENT_DOC.querySelector("main.lia-slide__content") ||
      CONTENT_DOC.querySelector("main")) as HTMLElement | null;
    if (!content) return;

    // The spacer is the output of this calculation. Remove it from the
    // signature so changing the output cannot invalidate the cache itself.
    const currentExitVar = CONTENT_WIN.getComputedStyle(CONTENT_DOC.documentElement)
      .getPropertyValue('--lia-tff-slide-exit-space');
    const currentExitPx = parseLenToPx(currentExitVar, CONTENT_WIN.innerHeight);

    const key = [
      mode,
      Math.round(CONTENT_WIN.innerWidth),
      Math.round(CONTENT_WIN.innerHeight),
      Math.round(scroller.clientHeight),
      Math.round(scroller.scrollHeight - currentExitPx),
      Math.round(scroller.getBoundingClientRect().top),
      Math.round(content.clientWidth),
      Math.round(content.scrollHeight - currentExitPx)
    ].join("|");
    // A clamped or quantized layout is still a completed measurement.
    if (
      scroller === lastExitTuneScroller &&
      content === lastExitTuneContent &&
      key === lastExitTuneKey
    ) return;

    for (let pass = 0; pass < 3; pass++) {
      const lineRect = getLastTextLineRect(content);
      if (!lineRect) break;

      const scrollerRect = scroller.getBoundingClientRect();
      const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      const lineTopAtMax =
        lineRect.top - Math.max(0, maxScrollTop - scroller.scrollTop);
      const targetTop =
        scrollerRect.top - ((1 - LAST_LINE_VISIBLE_FRACTION) * Math.max(2, lineRect.height));

      const currVar = CONTENT_WIN.getComputedStyle(CONTENT_DOC.documentElement)
        .getPropertyValue("--lia-tff-slide-exit-space");
      const currPx = parseLenToPx(currVar, CONTENT_WIN.innerHeight);

      const delta = lineTopAtMax - targetTop;
      const absErr = Math.abs(delta);
      if (absErr <= EXIT_TUNE_EPSILON_PX) break;

      const newPx = clamp(currPx + delta, 0, scroller.clientHeight * 1.25);
      if (Math.abs(newPx - currPx) < EXIT_TUNE_EPSILON_PX) break;

      setVar(CONTENT_DOC, "--lia-tff-slide-exit-space", `${newPx.toFixed(2)}px`);

      // Force style/layout flush before next pass.
      void content.offsetHeight;
    }

    lastExitTuneKey = key;
    lastExitTuneScroller = scroller;
    lastExitTuneContent = content;
  } catch (e) { }
}

// =========================================================
// CSS: Root overlay UI
// =========================================================
const ROOT_STYLE_ID = "lia-tff-style-root-v2";
const ROOT_CSS = `
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#lia-tff-voice-toggle-v2{
  position: fixed !important;
  right: 5% !important;
  bottom: 0 !important;
  z-index: 99999982 !important;
  width: 28px !important;
  height: 24px !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid color-mix(in srgb, var(--lia-tff-accent) 40%, #8a8f98) !important;
  border-bottom: 0 !important;
  border-radius: 8px 8px 0 0 !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 14%, #2e3035) !important;
  color: #e9edf4 !important;
  font-size: 12px !important;
  line-height: 1 !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#lia-tff-voice-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 22%, #2e3035) !important;
}

#lia-tff-voice-toggle-v2:focus,
#lia-tff-voice-toggle-v2:focus-visible{
  outline: none !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lia-tff-accent) 40%, transparent) !important;
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
  display: none;
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
  width: 220px !important;
  padding: 14px 16px 16px !important;
  display: none !important;
  border-radius: 12px !important;
  border: 2px solid var(--lia-tff-accent) !important;
  background: var(--tff-panel-bg, #fff) !important;
  color: var(--tff-panel-fg, #111) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,.15) !important;
}

body.lia-tff-panel-open #${PANEL_ID}{
  display: block !important;
}

body.lia-tff-dark #${PANEL_ID}{
  --tff-panel-bg: #252830;
  --tff-panel-fg: #e4e6eb;
}

#${TITLE_ID}{
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  color: var(--lia-tff-accent) !important;
  margin: 0 0 12px 0 !important;
}

#${PANEL_ID} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
  cursor: pointer !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}

@media (max-width: 1000px){
  #lia-tff-voice-toggle-v2{ display: none !important; }
}
`;

export function ensureRootCSS(): void {
  ensureStyle(ROOT_DOC, ROOT_STYLE_ID, ROOT_CSS);
}

// =========================================================
// Dark-mode detection + class sync
// =========================================================

let cachedDark: boolean | null = null;

function detectDarkMode(): boolean {
  // 1. Explicit app-level theme attributes — highest priority, overrides system pref
  try {
    const html = ROOT_DOC.documentElement;
    const body = ROOT_DOC.body;
    // LiaScript explicit light variant overrides OS preference
    if (
      html.classList.contains("lia-variant-light") ||
      html.getAttribute("data-bs-theme") === "light" ||
      html.getAttribute("data-theme") === "light" ||
      body.getAttribute("data-bs-theme") === "light" ||
      body.getAttribute("data-theme") === "light"
    ) return false;
    if (
      html.classList.contains("lia-variant-dark") ||
      html.getAttribute("data-bs-theme") === "dark" ||
      html.getAttribute("data-theme") === "dark" ||
      html.classList.contains("dark") ||
      html.classList.contains("lia-theme-dark") ||
      body.getAttribute("data-bs-theme") === "dark" ||
      body.getAttribute("data-theme") === "dark" ||
      body.classList.contains("dark") ||
      body.classList.contains("lia-theme-dark")
    ) return true;
  } catch (e) { }

  // 2. System preference
  try {
    if (ROOT_WIN.matchMedia && ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }
  } catch (e) { }

  // 3. Luminosity fallback: skip transparent backgrounds (rgba(0,0,0,0) reads as black but isn't dark)
  try {
    const bg = ROOT_WIN.getComputedStyle(ROOT_DOC.body).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const m = bg.match(/\d+/g);
      if (m && m.length >= 3) {
        const lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
        if (lum < 0.45) return true;
      }
    }
  } catch (e) { }

  return false;
}

/**
 * Detects whether dark mode is active and toggles the helper class
 * `lia-tff-dark` on ROOT_DOC.body so that CSS dark-mode overrides take effect.
 * Only touches the DOM when the state actually changes.
 */
export function syncDarkMode(): void {
  try {
    if (!ROOT_DOC.body) return;
    const dark = detectDarkMode();
    if (dark === cachedDark) return;
    cachedDark = dark;
    ROOT_DOC.body.classList.toggle("lia-tff-dark", dark);
  } catch (e) { }
}
