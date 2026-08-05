// Entry point: guards against double-init, runs tick() on each frame, and wires all observers.

import { initPresenterSupport, syncPresenterSupport } from './presenter';
import { initReverseNavigation, syncReverseNavigation } from './reverseNavigation';

import { syncAutoscrolling } from "./autoscrolling";

import { initInstance, I, ROOT_WIN } from "./state";
import { detectMode, applyModeAttr, safeGetSettingsRaw } from "./mode";
import { ensureContentCSS, ensureRootCSS, syncAccent, syncDarkMode, syncSlideExitSpace } from "./css";
import { applyFontLogic, syncSliderToCurrent } from "./font";
import { syncNightlyMiniMode, toolbarSignature } from "./toolbar";
import {
  ensureUI,
  setPresentationOnlyVisibility, positionOverlayButton, positionPanel,
  syncFontSizeLabel, syncVoiceFooterToggle
} from "./ui";
import { burstRepositionThrottled, wireOnce, initEvents } from "./events";
import { initModeOnly, applyModeOnlyNow } from "./modeOnly";

(function () {
  if (!initInstance()) return;
  initReverseNavigation();
  initPresenterSupport();

  // =========================================================
  // Main tick
  // =========================================================
  function tick(): void {
    syncAutoscrolling();
    syncReverseNavigation(detectMode());
    syncPresenterSupport(detectMode());
    if (I.ticking) return;
    I.ticking = true;

    ROOT_WIN.requestAnimationFrame(() => {
      try {
        ensureContentCSS();
        ensureRootCSS();

        const settingsRaw = safeGetSettingsRaw();
        const mode = detectMode();
        applyModeAttr(mode);

        syncAccent(mode);
        syncDarkMode();

        ensureUI(wireOnce);
        syncNightlyMiniMode();
        const show = setPresentationOnlyVisibility(mode);
        syncVoiceFooterToggle(mode);

        const showChanged = (I.lastShow === null) ? true : (show !== I.lastShow);
        I.lastShow = show;

        const sig = toolbarSignature();
        const sigChanged = !!(sig && sig !== I.lastToolbarSig);
        I.lastToolbarSig = sig || I.lastToolbarSig;

        if (!show && sigChanged) {
          I.pendingReposition = true;
        }

        positionOverlayButton();

        const modeOrSettingsChanged = (mode !== I.lastMode) || (settingsRaw !== I.lastSettingsRaw);

        if (modeOrSettingsChanged) {
          applyFontLogic(mode);
          applyModeOnlyNow(mode);
          I.lastMode = mode;
          I.lastSettingsRaw = settingsRaw;
        }

        const needBurst = showChanged || sigChanged || modeOrSettingsChanged || I.pendingReposition;

        syncSlideExitSpace(mode);

        if (needBurst) {
          I.pendingReposition = false;
          burstRepositionThrottled();
        }

        syncSliderToCurrent();
        syncFontSizeLabel();
        if (show) positionPanel();

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
