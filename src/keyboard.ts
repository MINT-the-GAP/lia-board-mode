// Shared guards for document-level keyboard shortcuts.

const EDITABLE_SELECTOR = [
  'input',
  'textarea',
  'select',
  'option',
  '[role=textbox]',
  '.ace_editor',
  '.monaco-editor',
  '.CodeMirror',
  '.cm-editor'
].join(', ');

function isElement(value: EventTarget | null): value is Element {
  return !!value && typeof (value as Element).matches === 'function';
}

function eventPathElements(event: Event): Element[] {
  try {
    const path = event.composedPath();
    if (path.length) return path.filter(isElement);
  } catch (_) { }

  const elements: Element[] = [];
  const target = event.target as (EventTarget & { parentElement?: Element | null }) | null;
  let element = isElement(target) ? target : target?.parentElement || null;

  while (element) {
    elements.push(element);
    element = element.parentElement;
  }

  return elements;
}

export function eventPathMatches(event: Event, selector: string): boolean {
  return eventPathElements(event).some(element => element.matches(selector));
}

export function isEditableKeyboardEvent(event: KeyboardEvent): boolean {
  return eventPathElements(event).some(element => {
    if (element.matches(EDITABLE_SELECTOR)) return true;
    if ((element as HTMLElement).isContentEditable) return true;

    const contentEditable = element.getAttribute('contenteditable');
    return contentEditable !== null &&
      contentEditable.trim().toLowerCase() !== 'false';
  });
}
