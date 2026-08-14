// Shared runtime environment, per-document instance state, and common utilities.

// =========================================================
// Root/Content (iframe-safe)
// =========================================================
function isLiaScriptShell(doc: Document): boolean {
  try {
    return !!doc.querySelector(
      '#lia-toolbar-nav, .lia-canvas, #lia-toc, header.lia-header'
    );
  } catch (e) {
    return false;
  }
}

function isLiveEditorPreview(win: Window): boolean {
  try {
    return win.frameElement?.id === 'liascript-preview';
  } catch (e) {
    return false;
  }
}

export function getRootWindow(): Window {
  let current: Window = window;
  let nearestParent: Window | null = null;

  // The LiveEditor wraps the complete preview in another iframe. Stop at the
  // nearest LiaScript shell so preview controls never leak into the editor.
  while (true) {
    try {
      if (isLiveEditorPreview(current) || isLiaScriptShell(current.document)) {
        return current;
      }

      const parent = current.parent;
      if (!parent || parent === current) break;

      // Verify same-origin access before using the parent as a candidate.
      void parent.document.documentElement;
      if (!nearestParent) nearestParent = parent;
      current = parent;
    } catch (e) {
      break;
    }
  }

  // Keep the legacy single-iframe setup when no known shell marker exists,
  // but do not escape past that closest host.
  return nearestParent || window;
}

export const ROOT_WIN = getRootWindow();
export const ROOT_DOC = ROOT_WIN.document;
export const CONTENT_WIN = window;
export const CONTENT_DOC = document;

// =========================================================
// Per-Document Instance (import multiple times => no collision)
// =========================================================
const REGKEY = "__LIA_TFF_REG_V2__";

export interface Registry {
  instances: Record<string, Instance>;
}
export interface Instance {
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
export const REG: Registry = (ROOT_WIN as any)[REGKEY];

export const DOC_ID =
  (CONTENT_DOC.baseURI || CONTENT_WIN.location.href || "") +
  "::" +
  (CONTENT_DOC.title || "");

export let I: Instance = null!;

export function initInstance(): boolean {
  if ((REG.instances[DOC_ID] as any)?.__alive) return false;
  I = {
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
  REG.instances[DOC_ID] = I;
  return true;
}

// =========================================================
// Shared constants
// =========================================================
export const SETTINGS_KEY = "settings";
export const FONT_KEY = "lia-tff-font-px-v2";

export const OVERLAY_ID = "lia-tff-overlay-v2";
export const BTN_ID = "lia-tff-btn-v2";
export const PANEL_ID = "lia-tff-panel-v2";
export const SLIDER_ID = "lia-tff-slider-v2";
export const TITLE_ID = "lia-tff-title-v2";
export const INLINE_SLOT_ID = "lia-tff-inline-slot-v2";
export const VOICE_TOGGLE_BTN_ID = "lia-tff-voice-toggle-v2";

export function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

export function clearPosTimers(): void {
  try {
    if (!I.posTimers) I.posTimers = [];
    while (I.posTimers.length) {
      ROOT_WIN.clearTimeout(I.posTimers.pop()!);
    }
  } catch (e) { }
}
