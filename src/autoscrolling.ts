// Course-wide, slide-ordered switch for LiaScript's automatic effect scrolling.

import { CONTENT_DOC } from './state';

export const AUTOSCROLLING_MARKER_ATTR = 'data-lia-tff-autoscrolling';

const GUARD_KEY = '__LIA_TFF_AUTOSCROLLING_GUARD_V2__';
const MARKER_SELECTOR = `[${AUTOSCROLLING_MARKER_ATTR}]`;

type ScrollIntoViewMethod = Element['scrollIntoView'];

interface AutoscrollingGuard {
  wrappedScrollIntoView: ScrollIntoViewMethod;
}

interface CourseAutoscrollingState {
  doc: Document;
  root: Element;
  slides: Element[];
  settings: Map<Element, boolean>;
}

let courseState: CourseAutoscrollingState | null = null;

function parseAutoscrolling(value: string | null): boolean {
  return String(value || '').trim().toLowerCase() !== 'off';
}

function sameSlides(left: Element[], right: Element[]): boolean {
  return left.length === right.length &&
    left.every((slide, index) => slide === right[index]);
}

function stateForCourse(
  doc: Document,
  main: Element
): CourseAutoscrollingState {
  const root = main.parentElement || main;
  const directMains = root === main
    ? [main]
    : Array.from(root.children).filter(child => child.localName === 'main');
  const slides = directMains.includes(main) ? directMains : [main];

  if (
    !courseState ||
    courseState.doc !== doc ||
    courseState.root !== root ||
    !sameSlides(courseState.slides, slides)
  ) {
    courseState = {
      doc,
      root,
      slides,
      settings: new Map<Element, boolean>()
    };
  }

  return courseState;
}

function markersForSlide(slide: Element): Element[] {
  return Array.from(slide.querySelectorAll(MARKER_SELECTOR))
    .filter(marker => marker.closest('main') === slide);
}

function refreshCourseSettings(
  state: CourseAutoscrollingState,
  activeMain: Element
): void {
  for (const slide of state.slides) {
    const markers = markersForSlide(slide);
    const lastMarker = markers[markers.length - 1];

    if (lastMarker) {
      state.settings.set(
        slide,
        parseAutoscrolling(
          lastMarker.getAttribute(AUTOSCROLLING_MARKER_ATTR)
        )
      );
    } else if (slide === activeMain) {
      // The active body is fully rendered, so absence means no override.
      state.settings.delete(slide);
    }
    // Hidden LiaScript slides may contain only their header. Keep their cache.
  }
}

function globalSetting(doc: Document): boolean {
  let enabled = true;

  for (const marker of Array.from(doc.querySelectorAll(MARKER_SELECTOR))) {
    if (!marker.closest('main')) {
      enabled = parseAutoscrolling(marker.getAttribute(AUTOSCROLLING_MARKER_ATTR));
    }
  }

  return enabled;
}

function settingForCoursePosition(doc: Document, main: Element): boolean {
  const state = stateForCourse(doc, main);
  refreshCourseSettings(state, main);

  const activeIndex = state.slides.indexOf(main);
  let enabled = globalSetting(doc);

  for (let index = 0; index <= activeIndex; index += 1) {
    const setting = state.settings.get(state.slides[index]);
    if (setting !== undefined) enabled = setting;
  }

  return enabled;
}

function activeEffectTarget(doc: Document): HTMLElement | null {
  return Array.from(doc.querySelectorAll<HTMLElement>('#focused'))
    .find(element => element.closest('main:not([hidden])')) || null;
}

function activeSlide(doc: Document): Element | null {
  return doc.querySelector('main.lia-slide__content:not([hidden])') ||
    doc.querySelector('main:not([hidden])');
}

function guardTarget(target: HTMLElement): void {
  const guarded = target as HTMLElement & Record<string, unknown>;
  const storedGuard = guarded[GUARD_KEY];
  const guard = storedGuard && typeof storedGuard === 'object'
    ? storedGuard as AutoscrollingGuard
    : null;
  if (guard && target.scrollIntoView === guard.wrappedScrollIntoView) return;

  const original = target.scrollIntoView as ScrollIntoViewMethod;
  if (typeof original !== 'function') return;

  const wrapped: ScrollIntoViewMethod = function (
    this: HTMLElement,
    arg?: boolean | ScrollIntoViewOptions
  ): void {
    const activeMain = this.closest('main:not([hidden])');
    if (
      this.id === 'focused' &&
      activeMain &&
      !settingForCoursePosition(this.ownerDocument, activeMain)
    ) return;

    if (arg === undefined) original.call(this);
    else original.call(this, arg);
  };

  try {
    Object.defineProperty(target, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: wrapped
    });
    if (guard) {
      guard.wrappedScrollIntoView = wrapped;
    } else {
      Object.defineProperty(target, GUARD_KEY, {
        configurable: true,
        value: { wrappedScrollIntoView: wrapped } satisfies AutoscrollingGuard
      });
    }
  } catch (e) { }
}

/**
 * Guards only the active LiaScript effect target. The last seen macro on the
 * current or a preceding slide defines the course-wide state at that point.
 * LiaScript assigns the id `focused` before scheduling its automatic scroll,
 * so the existing mutation observer installs the guard before it runs.
 */
export function syncAutoscrolling(): void {
  const target = activeEffectTarget(CONTENT_DOC);
  const main = target?.closest('main:not([hidden])') ||
    activeSlide(CONTENT_DOC);

  if (main) settingForCoursePosition(CONTENT_DOC, main);
  if (target) guardTarget(target);
}
