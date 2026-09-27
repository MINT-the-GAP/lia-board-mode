// Font size logic: auto-boost (18/24/32 px), localStorage persistence, and slider sync.

import { CONTENT_WIN, CONTENT_DOC, FONT_KEY, SLIDER_ID, ROOT_DOC, clamp } from "./state";
import { setVar } from "./css";

const PRES_PX = [18, 24, 32];

function pxToStep0to2(px: number): number {
  if (px <= 17) return 0;
  if (px <= 19) return 1;
  return 2;
}

function getMainFontPx(): number {
  const main = CONTENT_DOC.querySelector("main") || CONTENT_DOC.documentElement;
  const fs = parseFloat(CONTENT_WIN.getComputedStyle(main).fontSize || "16");
  return isNaN(fs) ? 16 : fs;
}

export function getSavedFontPx(): number | null {
  try {
    const v = localStorage.getItem(FONT_KEY);
    if (!v) return null;
    const n = parseInt(v, 10);
    return isFinite(n) ? n : null;
  } catch (e) {
    return null;
  }
}

export function setPresFontPx(px: number | null): void {
  setVar(CONTENT_DOC, "--lia-tff-font", px == null ? "unset" : (px + "px"));
}

let sampledMain: Element | null = null;
let sampledBaseFontPx: number | null = null;

function getAutoPresentationFontPx(): number {
  const main = CONTENT_DOC.querySelector("main") || CONTENT_DOC.documentElement;
  const currentVar = CONTENT_WIN.getComputedStyle(CONTENT_DOC.documentElement)
    .getPropertyValue("--lia-tff-font").trim();

  // A non-numeric value means board-mode is not currently overriding the
  // source font. Sample it synchronously and keep the result for mode switches
  // where the current presentation value would otherwise contaminate it.
  if (sampledMain !== main || sampledBaseFontPx == null) {
    if (!isFinite(parseFloat(currentVar))) {
      sampledMain = main;
      sampledBaseFontPx = getMainFontPx();
    }
  }

  const base = sampledBaseFontPx == null ? getMainFontPx() : sampledBaseFontPx;
  return PRES_PX[pxToStep0to2(base)];
}

export function applyFontLogic(mode: string): void {
  const isPres = (mode === "presentation");
  const isPresLike = isPres || (mode === "slides");

  if (!isPresLike) {
    setPresFontPx(null);
    sampledMain = null;
    sampledBaseFontPx = null;
    return;
  }

  const autoPx = getAutoPresentationFontPx();

  if (isPres) {
    const saved = getSavedFontPx();
    if (saved != null) {
      setPresFontPx(clamp(saved, 14, 48));
      return;
    }
  }

  // The final value is written in the current rendering frame. In particular,
  // do not expose an intermediate `unset` frame before the auto size appears.
  setPresFontPx(autoPx);
}

export function syncSliderToCurrent(): void {
  const slider = ROOT_DOC.getElementById(SLIDER_ID) as HTMLInputElement | null;
  if (!slider) return;

  const min = parseInt(slider.min || "14", 10);
  const max = parseInt(slider.max || "48", 10);

  const saved = getSavedFontPx();
  if (saved != null) {
    slider.value = String(clamp(saved, min, max));
    return;
  }

  const v = CONTENT_WIN.getComputedStyle(CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim();
  const n = parseInt(v, 10);
  if (isFinite(n)) slider.value = String(clamp(n, min, max));
}
