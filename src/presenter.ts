// Presenter-remote navigation and a root-document blackout overlay.

import { CONTENT_DOC, ROOT_DOC } from './state';
import { detectMode } from './mode';
import { armReverseEntry, cancelReverseEntry } from './reverseNavigation';

export const PRESENTER_BLACKOUT_ID = 'lia-tff-presenter-blackout-v1';

const BLACKOUT_ACTIVE_ATTR = 'data-lia-tff-presenter-blackout';
const NEXT_BUTTON_ID = 'lia-btn-next';
const PREVIOUS_BUTTON_ID = 'lia-btn-prev';

type PresenterAction = 'next' | 'previous' | 'toggle-blackout' | 'close-blackout';

let initialized = false;
let blackoutActive = false;

function documents(): Document[] {
  return ROOT_DOC === CONTENT_DOC
    ? [CONTENT_DOC]
    : [CONTENT_DOC, ROOT_DOC];
}

function normalizedMode(mode: string): string {
  return String(mode || '').trim().toLowerCase();
}

function presenterMode(mode: string): boolean {
  const normalized = normalizedMode(mode);
  return normalized === 'presentation' || normalized === 'slides';
}

function currentMode(): string {
  const detected = detectMode();
  if (detected !== 'unknown') return detected;
  return CONTENT_DOC.documentElement.dataset.liaMode || 'unknown';
}

function setImportant(
  element: HTMLElement,
  property: string,
  value: string
): void {
  if (
    element.style.getPropertyValue(property) !== value ||
    element.style.getPropertyPriority(property) !== 'important'
  ) {
    element.style.setProperty(property, value, 'important');
  }
}

function ensureBlackoutOverlay(): HTMLElement | null {
  let overlay = ROOT_DOC.getElementById(PRESENTER_BLACKOUT_ID) as HTMLElement | null;

  if (!overlay) {
    if (!ROOT_DOC.body) return null;
    overlay = ROOT_DOC.createElement('div');
    overlay.id = PRESENTER_BLACKOUT_ID;
    ROOT_DOC.body.appendChild(overlay);
  }

  if (overlay.getAttribute('aria-hidden') !== 'true') {
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (overlay.getAttribute('role') !== 'presentation') {
    overlay.setAttribute('role', 'presentation');
  }

  setImportant(overlay, 'position', 'fixed');
  setImportant(overlay, 'inset', '0px');
  setImportant(overlay, 'width', '100vw');
  setImportant(overlay, 'height', '100vh');
  setImportant(overlay, 'margin', '0px');
  setImportant(overlay, 'padding', '0px');
  setImportant(overlay, 'border', '0px');
  setImportant(overlay, 'background', 'rgb(0, 0, 0)');
  setImportant(overlay, 'opacity', '1');
  setImportant(overlay, 'pointer-events', 'auto');
  setImportant(overlay, 'cursor', 'none');
  setImportant(overlay, 'z-index', '2147483647');

  const shouldBeHidden = !blackoutActive;
  if (overlay.hidden !== shouldBeHidden) overlay.hidden = shouldBeHidden;
  const state = blackoutActive ? 'on' : 'off';
  if (overlay.dataset.state !== state) overlay.dataset.state = state;

  return overlay;
}

function setBlackout(active: boolean): void {
  blackoutActive = active;

  const root = ROOT_DOC.documentElement;
  if (root.hasAttribute(BLACKOUT_ACTIVE_ATTR) !== active) {
    root.toggleAttribute(BLACKOUT_ACTIVE_ATTR, active);
  }

  if (active) {
    ROOT_DOC.body?.classList.remove('lia-tff-panel-open');
  }

  ensureBlackoutOverlay();
}

function actionFor(event: KeyboardEvent): PresenterAction | null {
  if (blackoutActive && event.key === 'Escape') return 'close-blackout';
  if (
    event.defaultPrevented ||
    event.isComposing ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  ) return null;

  if (!event.shiftKey && (event.key === 'PageDown' || event.code === 'PageDown')) {
    return 'next';
  }
  if (!event.shiftKey && (event.key === 'PageUp' || event.code === 'PageUp')) {
    return 'previous';
  }
  if (!event.shiftKey && (event.key === '.' || event.code === 'Period')) {
    return 'toggle-blackout';
  }
  if (
    event.code === 'KeyB' ||
    String(event.key || '').toLowerCase() === 'b'
  ) {
    return 'toggle-blackout';
  }

  return null;
}

function blockedTarget(target: EventTarget | null): boolean {
  const candidate = target as Element | null;
  if (!candidate || typeof candidate.closest !== 'function') return false;

  return !!candidate.closest(
    'input, textarea, select, option, ' +
    '[contenteditable]:not([contenteditable=false]), [role=textbox], ' +
    '.ace_editor, .monaco-editor, .CodeMirror, .cm-editor, ' +
    'dialog, [role=dialog], .lia-modal'
  );
}

function blockingModalOpen(): boolean {
  return documents().some(doc => !!doc.querySelector(
    '.lia-modal, dialog[open], [role=dialog][aria-modal=true]'
  ));
}

function navigationButton(id: string): HTMLElement | null {
  for (const doc of documents()) {
    const candidates = Array.from(
      doc.querySelectorAll<HTMLElement>('#' + id)
    );

    for (const candidate of candidates) {
      const main = candidate.closest('main');
      if (main?.hasAttribute('hidden')) continue;
      if (candidate.closest('[inert]')) continue;
      if (candidate.matches(':disabled, [aria-disabled=true], .is-disabled')) {
        continue;
      }
      if (typeof candidate.click === 'function') return candidate;
    }
  }

  return null;
}

function triggerNavigation(id: string): boolean {
  const button = navigationButton(id);
  if (!button) return false;
  button.click();
  return true;
}

function handlePresenterKey(event: KeyboardEvent): void {
  const action = actionFor(event);
  if (!action) return;

  const closingBlackout = blackoutActive &&
    (action === 'toggle-blackout' || action === 'close-blackout');

  if (action !== 'close-blackout' && !presenterMode(currentMode())) return;
  if (!closingBlackout && (blockedTarget(event.target) || blockingModalOpen())) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();

  // Holding a hardware button must not race through slides or flicker blackout.
  if (event.repeat) return;

  if (action === 'next') {
    cancelReverseEntry();
    triggerNavigation(NEXT_BUTTON_ID);
  } else if (action === 'previous') {
    armReverseEntry();
    if (!triggerNavigation(PREVIOUS_BUTTON_ID)) cancelReverseEntry();
  } else if (action === 'close-blackout') {
    setBlackout(false);
  } else {
    setBlackout(!blackoutActive);
  }
}

export function initPresenterSupport(): void {
  if (initialized) return;
  initialized = true;

  ensureBlackoutOverlay();
  for (const doc of documents()) {
    doc.addEventListener('keydown', handlePresenterKey, true);
  }
}

export function syncPresenterSupport(mode: string): void {
  ensureBlackoutOverlay();
  if (blackoutActive && !presenterMode(mode)) setBlackout(false);
}
