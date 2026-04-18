// CSS injection helpers, theme accent sync, and the CONTENT/ROOT stylesheet constants.

import {
  ROOT_DOC, CONTENT_DOC,
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
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
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

export function ensureContentCSS(): void {
  ensureStyle(CONTENT_DOC, CONTENT_STYLE_ID, CONTENT_CSS);
}

// =========================================================
// CSS: Root overlay UI
// =========================================================
const ROOT_STYLE_ID = "lia-tff-style-root-v2";
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
  background: #fff !important;
  box-shadow: 0 4px 20px rgba(0,0,0,.12) !important;
}

body.lia-tff-panel-open #${PANEL_ID}{
  display: block !important;
}

#${TITLE_ID}{
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
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
`;

export function ensureRootCSS(): void {
  ensureStyle(ROOT_DOC, ROOT_STYLE_ID, ROOT_CSS);
}
