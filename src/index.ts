// Entry point: guards against double-init, runs tick() on each frame, and wires all observers.

import { initInstance, I, ROOT_WIN } from "./state";
import { detectMode, applyModeAttr, safeGetSettingsRaw } from "./mode";
import { ensureContentCSS, ensureRootCSS, syncAccent } from "./css";
import { applyFontLogic, syncSliderToCurrent } from "./font";
import { syncNightlyMiniMode, toolbarSignature } from "./toolbar";
import {
  ensureUI, placeButtonInCorrectHost,
  setPresentationOnlyVisibility, positionOverlayButton, positionPanel
} from "./ui";
import { burstRepositionThrottled, wireOnce, initEvents } from "./events";
import { initModeOnly } from "./modeOnly";

(function () {
  if (!initInstance()) return;

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
  initEvents(tick);
  tick();
  initModeOnly(() => I.lastMode ?? "unknown");
})();
