// Course-wide, slide-ordered switch for LiaScript's automatic effect scrolling.

import { CONTENT_DOC } from './state';
import { parseAutoscrollingSource, type AutoscrollingSourceSlide } from './autoscrollingSource';

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
  settings: Map<Element, boolean | null>;
}

let courseState: CourseAutoscrollingState | null = null;

interface CourseSource {
  url: string | null;
  slides: AutoscrollingSourceSlide[] | null;
  pending: Promise<void> | null;
}

let courseSource: CourseSource | null = null;

function courseSourceUrl(doc: Document): string | null {
  try {
    // Both the web interpreter and Alt-L put the course URL directly after ?.
    let source = new URL(doc.URL).search.slice(1);
    if (!/^https?:\/\//i.test(source)) source = decodeURIComponent(source);
    if (!/^https?:\/\//i.test(source)) return null;
    const url = new URL(source);
    url.hash = '';
    return url.href;
  } catch (e) {
    return null;
  }
}

function sourceForCourse(doc: Document): CourseSource {
  const url = courseSourceUrl(doc);
  if (courseSource?.url === url) return courseSource;

  const source: CourseSource = { url, slides: null, pending: null };
  courseSource = source;
  courseState = null;
  if (!url) return source;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  source.pending = (async () => {
    try {
      // Alt-L reloads the whole page on save, often on a later slide. Read the
      // current file instead of persisting switches from an older revision.
      const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
      if (response.ok) source.slides = parseAutoscrollingSource(await response.text());
    } catch (e) {
      // Uploaded/inaccessible courses still use the rendered-marker cache.
    } finally {
      clearTimeout(timeout);
      source.pending = null;
    }
  })();
  return source;
}

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
      settings: new Map<Element, boolean | null>()
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
    } else if (slide === activeMain && slide.children.length > 1) {
      // A rendered body without a marker is authoritative too. A header-only
      // intermediate render must not erase a previously observed switch.
      state.settings.set(slide, null);
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
  const source = sourceForCourse(doc);
  const state = stateForCourse(doc, main);
  refreshCourseSettings(state, main);

  // Only use a source index when its slide structure agrees with LiaScript.
  // Macro-generated headings or other unsupported syntax fall back to DOM.
  const sourceSlides = source.slides?.length === state.slides.length &&
    state.slides.every((slide, index) => {
      const heading = slide.querySelector('header [ondblclick]');
      const line = heading?.getAttribute('ondblclick')?.match(/LIA\.lineGoto\((\d+)\)/);
      return !line || Number(line[1]) === source.slides![index].line;
    }) ? source.slides : null;

  const activeIndex = state.slides.indexOf(main);
  let enabled = globalSetting(doc);

  for (let index = 0; index <= activeIndex; index += 1) {
    const observed = state.settings.get(state.slides[index]);
    const setting = observed === undefined ? sourceSlides?.[index].enabled : observed;
    if (setting != null) enabled = setting;
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
    const scroll = (): void => {
      const activeMain = this.closest('main:not([hidden])') ||
        activeSlide(this.ownerDocument);
      if (
        activeMain &&
        !settingForCoursePosition(this.ownerDocument, activeMain)
      ) return;

      if (arg === undefined) original.call(this);
      else original.call(this, arg);
    };
    const source = sourceForCourse(this.ownerDocument);
    if (source.pending) {
      // A fast first click must not race the source lookup on a fresh entry.
      void source.pending.then(() => {
        if (this.isConnected && this.closest('main:not([hidden])')) scroll();
      });
    } else {
      scroll();
    }
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
 * Guards every element seen as an active LiaScript effect target. The guard
 * stays attached after focus moves because a delayed scroll may retain the
 * stale element reference. The last seen macro on the current or a preceding
 * slide defines the course-wide state at that point.
 * LiaScript assigns the id `focused` before scheduling its automatic scroll,
 * so the existing mutation observer installs the guard before it runs.
 */
export function syncAutoscrolling(): void {
  sourceForCourse(CONTENT_DOC);
  const target = activeEffectTarget(CONTENT_DOC);
  const main = target?.closest('main:not([hidden])') ||
    activeSlide(CONTENT_DOC);

  if (main) settingForCoursePosition(CONTENT_DOC, main);
  if (target) guardTarget(target);
}
