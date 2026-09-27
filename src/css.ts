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
  try {
    const style = doc.documentElement.style;
    if (style.getPropertyValue(k) !== v || style.getPropertyPriority(k)) {
      style.setProperty(k, v);
    }
  } catch (e) { }
}

let cachedAccent: string | null = null;
let cachedAccentKey: string | null = null;

function accentThemeKey(doc: Document): string {
  return [doc.documentElement, doc.body].map(el => {
    if (!el) return "";
    return [
      Array.from(el.classList).filter(name => !name.startsWith("lia-tff-")).sort().join(" "),
      el.getAttribute("data-theme"), el.getAttribute("data-bs-theme")
    ].join("|");
  }).join("|");
}

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
    // The temporary measurement must not look like newly rendered course UI
    // to the document observer.
    probe.id = "lia-tff-accent-probe-v2";
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
  const key = [mode, accentThemeKey(ROOT_DOC), accentThemeKey(CONTENT_DOC),
    ROOT_WIN.matchMedia?.("(prefers-color-scheme: dark)").matches].join("|");
  if (key === cachedAccentKey && cachedAccent) {
    setVar(ROOT_DOC, "--lia-tff-accent", cachedAccent);
    if (CONTENT_DOC !== ROOT_DOC) setVar(CONTENT_DOC, "--lia-tff-accent", cachedAccent);
    return;
  }

  const acc =
    getLiaAccentColor(ROOT_DOC) ||
    getLiaAccentColor(CONTENT_DOC) ||
    "rgb(11,95,255)";

  cachedAccent = acc;
  cachedAccentKey = key;

  setVar(ROOT_DOC, "--lia-tff-accent", acc);
  if (CONTENT_DOC !== ROOT_DOC) setVar(CONTENT_DOC, "--lia-tff-accent", acc);
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

/* LiaScript reserves the fixed header height on the slide container itself. */
html.lia-tff-header-collapsed[data-lia-mode="presentation"] .lia-slide > .lia-slide__container,
html.lia-tff-header-collapsed[data-lia-mode="slides"] .lia-slide > .lia-slide__container{
  margin-block-start: 0 !important;
}

html.lia-tff-header-collapsed[data-lia-mode="slides"] .lia-canvas.lia-mode--slides .lia-slide{
  height: 100vh !important;
}

html[data-lia-mode="presentation"] body,
html[data-lia-mode="slides"] body{
  margin: 0 !important;
  overflow-x: hidden !important;
}

/* Reserve the vertical scrollbar on the element that actually scrolls. This
   keeps responsive content at one width while animation steps change the
   amount of overflow. */
html[data-lia-mode="presentation"] .lia-slide__container,
html[data-lia-mode="slides"] .lia-slide__container{
  scrollbar-gutter: stable;
}

/* Older engines have no gutter reservation. A permanently allocated classic
   scrollbar is the closest non-clipping fallback and keeps manual scrolling. */
@supports not (scrollbar-gutter: stable){
  html[data-lia-mode="presentation"] .lia-slide__container,
  html[data-lia-mode="slides"] .lia-slide__container{
    overflow-y: scroll !important;
  }
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  box-sizing: border-box !important;

  /* LiaScript shrinks its canvas while the TOC or another side panel is open. */
  width: min(
    var(--lia-tff-maxw),
    calc(100% - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  max-width: min(
    var(--lia-tff-maxw),
    calc(100% - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
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

/* LiaScript's 2rem list indent stays fixed when only the content font grows.
   Use the list's own font size so markers and wrapped lines keep their space. */
html[data-lia-mode="presentation"] main .lia-list--unordered,
html[data-lia-mode="presentation"] main .lia-list--ordered,
html[data-lia-mode="slides"] main .lia-list--unordered,
html[data-lia-mode="slides"] main .lia-list--ordered{
  padding-inline-start: 2em;
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

const LAST_LINE_VISIBLE_FRACTION = 0.40;
const EXIT_TUNE_EPSILON_PX = 1;
const EXIT_TUNE_HYSTERESIS_PX = 2.5;
const EXIT_CACHE_LIMIT = 8;

interface ExitSpaceCacheEntry {
  spacer: number;
}

// A main element is one rendered slide. Each slide keeps independent values
// for the presentation/slides viewports in which it has been measured.
const exitSpaceCache = new WeakMap<HTMLElement, Map<string, ExitSpaceCacheEntry>>();
const pendingSpacerResize = new WeakMap<Element, number>();

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

function finiteCssPx(value: string): number {
  const parsed = parseFloat(value || "");
  return isFinite(parsed) ? parsed : 0;
}

function viewportCacheKey(
  mode: string,
  scroller: HTMLElement,
  scrollerRect: DOMRect
): string {
  const halfPixel = (value: number): number => Math.round(value * 2) / 2;
  return [
    mode,
    Math.round(CONTENT_WIN.innerWidth),
    Math.round(CONTENT_WIN.innerHeight),
    halfPixel(scroller.clientWidth),
    halfPixel(scroller.clientHeight),
    halfPixel(scrollerRect.top)
  ].join("|");
}

/**
 * Measures the end of real DOM content in the scroller's scroll coordinate
 * system. The main element's own scrollHeight is deliberately not used: it
 * contains main::after and would feed the generated spacer back into its input.
 */
function getNaturalContentEnd(
  scroller: HTMLElement,
  content: HTMLElement,
  scrollerRect: DOMRect,
  contentRect: DOMRect
): number {
  const contentStyle = CONTENT_WIN.getComputedStyle(content);
  const scrollOriginTop = scrollerRect.top + scroller.clientTop;
  const contentTop = contentRect.top - scrollOriginTop + scroller.scrollTop;
  let flowBottom = finiteCssPx(contentStyle.paddingTop);

  // Direct children define the normal-flow extent of LiaScript's main. Their
  // boxes are unaffected by the generated ::after spacer. Include a positive
  // trailing margin because it otherwise sits between the child and ::after.
  for (const child of Array.from(content.children) as HTMLElement[]) {
    const rect = child.getBoundingClientRect();
    if (!rect.width && !rect.height) continue;
    const style = CONTENT_WIN.getComputedStyle(child);
    if (style.display === "none" || style.position === "fixed") continue;
    flowBottom = Math.max(
      flowBottom,
      rect.bottom - contentRect.top + Math.max(0, finiteCssPx(style.marginBottom))
    );
  }

  flowBottom += finiteCssPx(contentStyle.paddingBottom) +
    finiteCssPx(contentStyle.borderBottomWidth);
  return Math.max(0, contentTop + flowBottom);
}

function stableSpacer(rawSpacer: number, previous: number | null, maximum: number): number {
  const clamped = clamp(rawSpacer, 0, maximum);
  if (previous == null) {
    return rawSpacer < EXIT_TUNE_HYSTERESIS_PX
      ? 0
      : Math.round(clamped * 2) / 2;
  }

  // Crossing zero is intentionally asymmetric. A cached spacer only turns off
  // after real content exceeds the target by the hysteresis amount; a zero
  // spacer only turns on after the same positive margin has been crossed.
  if (previous <= EXIT_TUNE_EPSILON_PX) {
    if (rawSpacer < EXIT_TUNE_HYSTERESIS_PX) return 0;
  } else if (rawSpacer > -EXIT_TUNE_HYSTERESIS_PX && clamped <= EXIT_TUNE_EPSILON_PX) {
    return Math.min(previous, EXIT_TUNE_HYSTERESIS_PX);
  }

  if (Math.abs(clamped - previous) <= EXIT_TUNE_HYSTERESIS_PX) return previous;
  return Math.round(clamped * 2) / 2;
}

function rememberSpacerResize(content: HTMLElement, scroller?: HTMLElement): void {
  pendingSpacerResize.set(content, CONTENT_WIN.performance.now());
  if (scroller) pendingSpacerResize.set(scroller, CONTENT_WIN.performance.now());
}

/** Returns true once for a prompt ResizeObserver notification caused by us. */
export function consumeSlideExitSpaceResize(target: Element): boolean {
  const writtenAt = pendingSpacerResize.get(target);
  if (writtenAt == null) return false;
  pendingSpacerResize.delete(target);
  return CONTENT_WIN.performance.now() - writtenAt < 250;
}

/**
 * Adapts extra slide scroll-space so only ~40% of the last rendered text line
 * remains visible at max scroll across different responsive LiaScript layouts.
 */
export function syncSlideExitSpace(mode: string): void {
  if (mode !== "presentation" && mode !== "slides") {
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
        const shown = (cs.display !== "none" && cs.visibility !== "hidden") ? 1 : 0;
        const active = el.querySelector("main.lia-slide__content:not([hidden]),main:not([hidden])") ? 1 : 0;
        return { el, r, score: shown * active * visScore };
      })
      .sort((a, b) => b.score - a.score);

    const scroller = (scored[0] && scored[0].score > 0)
      ? scored[0].el
      : containers
          .sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0];

    if (!scroller) return;

    const content = (
      scroller.querySelector("main.lia-slide__content:not([hidden])") ||
      scroller.querySelector("main:not([hidden])") ||
      CONTENT_DOC.querySelector("main.lia-slide__content:not([hidden])") ||
      CONTENT_DOC.querySelector("main:not([hidden])")
    ) as HTMLElement | null;
    if (!content) return;

    // Read phase. No style is changed until every geometry value is captured.
    const scrollerRect = scroller.getBoundingClientRect();
    const visibleScrollerHeight = Math.max(
      0,
      Math.min(scrollerRect.bottom, vpH) - Math.max(scrollerRect.top, 0)
    );
    const currentExitVar = CONTENT_WIN.getComputedStyle(content)
      .getPropertyValue("--lia-tff-slide-exit-space");
    const currentExitPx = parseLenToPx(currentExitVar, CONTENT_WIN.innerHeight);

    // Some test shells and transient LiaScript renders leave the container at
    // intrinsic height. A spacer would enlarge that container instead of adding
    // scroll range, so disable it until the real bounded scroller is present.
    const intrinsicScroller =
      scroller.scrollHeight <= scroller.clientHeight + EXIT_TUNE_EPSILON_PX &&
      scroller.clientHeight > visibleScrollerHeight + EXIT_TUNE_EPSILON_PX;
    if (intrinsicScroller) {
      if (currentExitPx > EXIT_TUNE_EPSILON_PX) {
        content.style.setProperty("--lia-tff-slide-exit-space", "0px");
        // An intrinsic container changes size together with main.
        rememberSpacerResize(content, scroller);
      }
      return;
    }

    const lineRect = getLastTextLineRect(content);
    if (!lineRect) return;
    const contentRect = content.getBoundingClientRect();
    const naturalEnd = getNaturalContentEnd(scroller, content, scrollerRect, contentRect);
    const scrollOriginTop = scrollerRect.top + scroller.clientTop;
    const lineTopInScrollContent = lineRect.top - scrollOriginTop + scroller.scrollTop;
    const desiredScrollHeight = scroller.clientHeight + lineTopInScrollContent +
      ((1 - LAST_LINE_VISIBLE_FRACTION) * Math.max(2, lineRect.height));
    const rawSpacer = desiredScrollHeight - naturalEnd;
    const key = viewportCacheKey(mode, scroller, scrollerRect);
    let cache = exitSpaceCache.get(content);
    if (!cache) {
      cache = new Map<string, ExitSpaceCacheEntry>();
      exitSpaceCache.set(content, cache);
    }
    const previous = cache.get(key);
    const targetSpacer = stableSpacer(
      rawSpacer,
      previous?.spacer ?? null,
      scroller.clientHeight * 1.25
    );

    cache.delete(key);
    cache.set(key, { spacer: targetSpacer });
    while (cache.size > EXIT_CACHE_LIMIT) {
      const oldest = cache.keys().next().value as string | undefined;
      if (oldest == null) break;
      cache.delete(oldest);
    }

    // Write phase. One changed custom property is the only layout mutation.
    if (Math.abs(currentExitPx - targetSpacer) > EXIT_TUNE_EPSILON_PX) {
      content.style.setProperty("--lia-tff-slide-exit-space", `${targetSpacer.toFixed(2)}px`);
      rememberSpacerResize(content);
    }
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

#lia-tff-header-toggle-v2{
  position: fixed !important;
  right: 5% !important;
  top: 0 !important;
  /* Below LiaScript's header (100) and its menus, above slide content. */
  z-index: 99 !important;
  width: 28px !important;
  height: 24px !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid color-mix(in srgb, var(--lia-tff-accent) 40%, #8a8f98) !important;
  border-top: 0 !important;
  border-radius: 0 0 8px 8px !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 14%, #2e3035) !important;
  color: #e9edf4 !important;
  font-size: 12px !important;
  line-height: 1 !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#lia-tff-header-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 22%, #2e3035) !important;
}

#lia-tff-header-toggle-v2:focus,
#lia-tff-header-toggle-v2:focus-visible{
  outline: none !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lia-tff-accent) 40%, transparent) !important;
}

/* Match the light interface while keeping the existing dark tabs unchanged. */
body:not(.lia-tff-dark) #lia-tff-voice-toggle-v2,
body:not(.lia-tff-dark) #lia-tff-header-toggle-v2{
  border-color: color-mix(in srgb, var(--lia-tff-accent) 25%, #adb3bc) !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 8%, #fff) !important;
  color: #2e3035 !important;
}

body:not(.lia-tff-dark) #lia-tff-voice-toggle-v2:hover,
body:not(.lia-tff-dark) #lia-tff-header-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 16%, #fff) !important;
}

@media (min-width: 1001px){
  html.lia-tff-header-collapsed #lia-toolbar-nav,
  html.lia-tff-header-collapsed header.lia-header{
    min-height: 0 !important;
    max-height: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border-width: 0 !important;
    overflow: hidden !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    box-shadow: none !important;
  }

  html.lia-tff-header-collapsed .lia-slide > .lia-slide__container{
    margin-block-start: 0 !important;
  }

  html.lia-tff-header-collapsed .lia-canvas.lia-mode--slides .lia-slide{
    height: 100vh !important;
  }
}

/* The inline and collapsed docks share layout-viewport coordinates with
   lia-marker. A fixed child bypasses its overlay viewport translation. */
html[data-lia-tff-marker-dock] #lia-hl-ui-overlay-v1 > #lia-hl-btn{
  position: fixed !important;
  left: var(--lia-tff-marker-left) !important;
  top: var(--lia-tff-marker-top) !important;
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
  width: var(--lia-tff-inline-width, 46px) !important;
  min-width: var(--lia-tff-inline-width, 46px) !important;
  max-width: var(--lia-tff-inline-width, 46px) !important;
  height: 34px !important;
  min-height: 34px !important;
  box-sizing: border-box !important;
  padding-right: 2px !important;
  overflow: visible !important;
  flex: 0 0 var(--lia-tff-inline-width, 46px) !important;
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
  #lia-tff-voice-toggle-v2,
  #lia-tff-header-toggle-v2{ display: none !important; }
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
