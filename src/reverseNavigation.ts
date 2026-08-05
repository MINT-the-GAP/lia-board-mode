// Opens a slide at its last animation step when it is entered backwards.

import { CONTENT_DOC, ROOT_DOC, ROOT_WIN } from './state';
import { detectMode } from './mode';

const NEXT_BUTTON_ID = 'lia-btn-next';
const PREVIOUS_BUTTON_ID = 'lia-btn-prev';
const COUNTER_SELECTOR = '.lia-pagination__current';
const INTENT_TIMEOUT_MS = 2500;
const POLL_INTERVAL_MS = 25;
const TARGET_RESET_SETTLE_MS = 250;
const ZERO_EFFECT_SETTLE_MS = 750;

interface NavigationState {
  doc: Document;
  slide: number;
  visible: number;
  effects: number;
}

interface ReverseEntryIntent {
  fromSlide: number;
  targetSlide: number;
  sawTargetReset: boolean;
  targetZeroSince: number | null;
  awaitingVisible: number | null;
  zeroEffectsSince: number | null;
  deadline: number;
}

let initialized = false;
let advancingInternally = false;
let pending: ReverseEntryIntent | null = null;
let pollTimer: number | null = null;

function documents(): Document[] {
  return ROOT_DOC === CONTENT_DOC
    ? [CONTENT_DOC]
    : [CONTENT_DOC, ROOT_DOC];
}

function normalizedMode(mode: string): string {
  return String(mode || '').trim().toLowerCase();
}

function presentationMode(mode: string): boolean {
  const normalized = normalizedMode(mode);
  return normalized === 'presentation' || normalized === 'slides';
}

function currentMode(): string {
  const detected = detectMode();
  if (detected !== 'unknown') return detected;
  return CONTENT_DOC.documentElement.dataset.liaMode || 'unknown';
}

function readNavigationState(): NavigationState | null {
  for (const doc of documents()) {
    const counters = Array.from(
      doc.querySelectorAll<HTMLElement>(COUNTER_SELECTOR)
    );

    for (const counter of counters) {
      if (counter.closest('[hidden], [inert]')) continue;

      const pagination = counter.closest('.lia-pagination');
      if (!pagination?.querySelector('#' + PREVIOUS_BUTTON_ID)) continue;

      const text = String(counter.textContent || '').trim();
      const match = text.match(
        /^\s*(\d+)(?:\s*\(\s*(\d+)\s*\/\s*(\d+)\s*\))?\s*$/
      );
      if (!match) continue;

      const slide = Number(match[1]);
      const visible = match[2] == null ? 0 : Number(match[2]);
      const effects = match[3] == null ? 0 : Number(match[3]);
      if (
        !Number.isInteger(slide) ||
        !Number.isInteger(visible) ||
        !Number.isInteger(effects) ||
        slide < 1 ||
        visible < 0 ||
        effects < 0 ||
        visible > effects
      ) continue;

      return { doc, slide, visible, effects };
    }
  }

  return null;
}

function navigationButton(doc: Document, id: string): HTMLElement | null {
  const orderedDocs = [doc, ...documents().filter(candidate => candidate !== doc)];

  for (const candidateDoc of orderedDocs) {
    const candidates = Array.from(
      candidateDoc.querySelectorAll<HTMLElement>('#' + id)
    );

    for (const candidate of candidates) {
      if (candidate.closest('[hidden], [inert]')) continue;
      if (candidate.matches(':disabled, [aria-disabled=true], .is-disabled')) {
        continue;
      }
      if (typeof candidate.click === 'function') return candidate;
    }
  }

  return null;
}

function clearPoll(): void {
  if (pollTimer == null) return;
  ROOT_WIN.clearTimeout(pollTimer);
  pollTimer = null;
}

export function cancelReverseEntry(): void {
  pending = null;
  clearPoll();
}

function schedulePoll(): void {
  if (!pending || pollTimer != null) return;
  pollTimer = ROOT_WIN.setTimeout(() => {
    pollTimer = null;
    syncReverseNavigation(currentMode());
    if (pending) schedulePoll();
  }, POLL_INTERVAL_MS);
}

function blockedTarget(target: EventTarget | null): boolean {
  const candidate = target as Element | null;
  if (!candidate || typeof candidate.closest !== 'function') return false;

  return !!candidate.closest(
    'input, textarea, select, option, ' +
    '[contenteditable]:not([contenteditable=false]), [role=textbox], ' +
    '.ace_editor, .monaco-editor, .CodeMirror, .cm-editor'
  );
}

function blockingModalOpen(): boolean {
  return documents().some(doc => !!doc.querySelector(
    '.lia-modal, dialog[open], [role=dialog][aria-modal=true]'
  ));
}

export function armReverseEntry(): void {
  if (!presentationMode(currentMode()) || blockingModalOpen()) {
    cancelReverseEntry();
    return;
  }

  const state = readNavigationState();
  if (!state || state.visible !== 0 || state.slide <= 1) {
    cancelReverseEntry();
    return;
  }

  pending = {
    fromSlide: state.slide,
    targetSlide: state.slide - 1,
    sawTargetReset: false,
    targetZeroSince: null,
    awaitingVisible: null,
    zeroEffectsSince: null,
    deadline: Date.now() + INTENT_TIMEOUT_MS
  };
  schedulePoll();
}

function triggerNext(state: NavigationState): boolean {
  const button = navigationButton(state.doc, NEXT_BUTTON_ID);
  if (!button) return false;

  advancingInternally = true;
  try {
    button.click();
  } finally {
    advancingInternally = false;
  }
  return true;
}

function triggerPrevious(state: NavigationState): boolean {
  const button = navigationButton(state.doc, PREVIOUS_BUTTON_ID);
  if (!button) return false;
  button.click();
  return true;
}

function handleNavigationKey(event: KeyboardEvent): void {
  const key = String(event.key || '');
  const lowerKey = key.toLowerCase();
  const plainArrowPrevious =
    key === 'ArrowLeft' &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    !event.shiftKey;
  const previousShortcut =
    event.altKey && event.shiftKey && lowerKey === 'p';
  const next =
    key === 'ArrowRight' ||
    (event.altKey && event.shiftKey && lowerKey === 'n');

  if (next) {
    cancelReverseEntry();
    return;
  }
  if (
    event.isComposing ||
    blockedTarget(event.target) ||
    blockingModalOpen()
  ) return;
  if (plainArrowPrevious && event.repeat && pending) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  if (plainArrowPrevious) {
    const state = readNavigationState();
    const atSlideBoundary =
      presentationMode(currentMode()) &&
      !!state &&
      state.visible === 0 &&
      state.slide > 1;

    if (!atSlideBoundary || !state) {
      cancelReverseEntry();
      return;
    }

    // LiaScript handles ArrowLeft in a bubble listener. At the section
    // boundary we take over once so root- and iframe-focused keys behave alike.
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.repeat) return;

    armReverseEntry();
    if (!triggerPrevious(state)) cancelReverseEntry();
    return;
  }

  if (!event.repeat && previousShortcut) armReverseEntry();
}

function handleNavigationClick(event: MouseEvent): void {
  if (advancingInternally) return;

  const candidate = event.target as Element | null;
  if (!candidate || typeof candidate.closest !== 'function') return;

  if (candidate.closest('#' + PREVIOUS_BUTTON_ID)) {
    armReverseEntry();
  } else if (pending) {
    // A TOC jump or any other user action must not inherit an old intent.
    cancelReverseEntry();
  }
}

export function initReverseNavigation(): void {
  if (initialized) return;
  initialized = true;

  for (const doc of documents()) {
    doc.addEventListener('keydown', handleNavigationKey, true);
    doc.addEventListener('click', handleNavigationClick, true);
  }
}

export function syncReverseNavigation(mode: string): void {
  if (!pending) return;
  if (!presentationMode(mode === 'unknown' ? currentMode() : mode)) {
    cancelReverseEntry();
    return;
  }
  if (blockingModalOpen()) {
    cancelReverseEntry();
    return;
  }
  if (Date.now() > pending.deadline) {
    cancelReverseEntry();
    return;
  }

  const state = readNavigationState();
  if (!state) {
    schedulePoll();
    return;
  }

  if (state.slide === pending.fromSlide) {
    schedulePoll();
    return;
  }
  if (state.slide !== pending.targetSlide) {
    cancelReverseEntry();
    return;
  }

  if (!pending.sawTargetReset) {
    // LiaScript can briefly render the target slide's old state before it
    // resets a revisited section to step zero.
    if (state.visible !== 0) {
      pending.targetZeroSince = null;
      schedulePoll();
      return;
    }
    if (pending.targetZeroSince == null) {
      pending.targetZeroSince = Date.now();
    }
    if (Date.now() - pending.targetZeroSince < TARGET_RESET_SETTLE_MS) {
      schedulePoll();
      return;
    }
    pending.sawTargetReset = true;
  }

  if (pending.awaitingVisible != null) {
    if (state.visible < pending.awaitingVisible) {
      schedulePoll();
      return;
    }
    pending.awaitingVisible = null;
    pending.deadline = Date.now() + INTENT_TIMEOUT_MS;
  }

  if (state.effects === 0) {
    if (pending.zeroEffectsSince == null) {
      pending.zeroEffectsSince = Date.now();
    }
    if (Date.now() - pending.zeroEffectsSince < ZERO_EFFECT_SETTLE_MS) {
      schedulePoll();
      return;
    }
    cancelReverseEntry();
    return;
  }

  pending.zeroEffectsSince = null;
  if (state.visible >= state.effects) {
    cancelReverseEntry();
    return;
  }

  pending.awaitingVisible = state.visible + 1;
  if (triggerNext(state)) {
    pending.deadline = Date.now() + INTENT_TIMEOUT_MS;
  } else {
    pending.awaitingVisible = null;
  }
  schedulePoll();
}
