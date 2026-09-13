// Presentation-only author comments. LiaScript has already parsed the source.
// Keep its DOM nodes in place so subsequent Elm updates retain their indices.
import { CONTENT_DOC, ROOT_DOC } from './state';

const OPEN = '§:-';
const CLOSE = '-:§';
const HIDDEN = 'data-lia-board-comment-hidden';
const ERROR = 'data-lia-board-comment-error';
const SCOPE = '.lia-slide__content';
const STYLE_ID = 'lia-board-author-comments-style';
const OPAQUE = 'pre,code,kbd,samp,script,style,textarea,input,select,button,svg,math,canvas,img,video,audio,iframe,object,embed,hr,.ace_editor,.katex,lia-formula,[contenteditable]:not([contenteditable="false"])';
const BLOCK = /^(P|DIV|SECTION|ARTICLE|ASIDE|HEADER|FOOTER|H[1-6]|LI|UL|OL|BLOCKQUOTE|TABLE|TR|TD|TH|FIGURE|FIGCAPTION|BR)$/;

interface CommentRange { start: number; end: number }
interface Unit { node: Text | Element; start: number; end: number; source: string; opaque: boolean }

export function findAuthorComments(source: string): { ranges: CommentRange[]; errors: string[] } {
  const ranges: CommentRange[] = [];
  const errors = new Set<string>();
  let start = -1;
  let depth = 0;
  let nested = false;
  for (let index = 0; index < source.length;) {
    if (source.startsWith(OPEN, index)) {
      if (!depth) { start = index; nested = false; }
      else { nested = true; errors.add('Kommentare dürfen nicht verschachtelt werden.'); }
      depth += 1;
      index += OPEN.length;
    } else if (source.startsWith(CLOSE, index)) {
      if (!depth) errors.add('Kommentarende -:§ ohne Beginn §:-.');
      else if (--depth === 0 && !nested) ranges.push({ start, end: index + CLOSE.length });
      index += CLOSE.length;
    } else index += 1;
  }
  if (depth) errors.add('Kommentar nicht geschlossen: -:§ fehlt auf dieser Folie.');
  return { ranges, errors: Array.from(errors) };
}

export function initAuthorComments(): () => void {
  const originals = new WeakMap<Text, { source: string; written: string }>();
  const watchers = new Map<Document, MutationObserver>();
  const hidden = new Map<Document, Set<Element>>();
  const diagnostics = new WeakMap<Element, string>();
  let disposed = false;

  function collect(scope: Element): { source: string; units: Unit[] } {
    const units: Unit[] = [];
    let source = '';
    function visit(node: Node): void {
      if (node.nodeType === 3) {
        const text = node as Text;
        const previous = originals.get(text);
        const value = previous && text.data === previous.written ? previous.source : text.data;
        units.push({ node: text, start: source.length, end: source.length + value.length, source: value, opaque: false });
        source += value;
      } else if (node.nodeType === 1) {
        const element = node as Element;
        if (element.matches(OPAQUE) || !element.hasChildNodes()) {
          units.push({ node: element, start: source.length, end: source.length + 1, source: '\uFFFC', opaque: true });
          source += '\uFFFC';
          return;
        }
        const block = BLOCK.test(element.tagName);
        if (block) source += '\n';
        element.childNodes.forEach(visit);
        if (block) source += '\n';
      }
    }
    scope.childNodes.forEach(visit);
    return { source, units };
  }

  function processScope(scope: Element, hiddenElements: Set<Element>): void {
    const { source, units } = collect(scope);
    const { ranges, errors } = findAuthorComments(source);
    const candidates = new Set<Element>();
    const hide = (element: Element): void => {
      element.setAttribute(HIDDEN, '');
      hiddenElements.add(element);
    };
    const parents = (node: Node): void => {
      for (let parent = node.parentElement; parent && parent !== scope; parent = parent.parentElement) candidates.add(parent);
    };
    let firstRange = 0;
    for (const unit of units) {
      while (firstRange < ranges.length && ranges[firstRange].end <= unit.start) firstRange += 1;
      let cursor = unit.start;
      let visible = '';
      let covered = false;
      for (let index = firstRange; index < ranges.length && ranges[index].start < unit.end; index += 1) {
        const range = ranges[index];
        const from = Math.max(unit.start, range.start);
        const to = Math.min(unit.end, range.end);
        visible += unit.source.slice(cursor - unit.start, from - unit.start);
        cursor = to;
        covered = true;
      }
      visible += unit.source.slice(cursor - unit.start);
      if (unit.opaque) {
        if (covered) { hide(unit.node as Element); parents(unit.node); }
      } else {
        const text = unit.node as Text;
        if (text.data !== visible) text.data = visible;
        if (covered) {
          originals.set(text, { source: unit.source, written: visible });
          parents(text);
        } else originals.delete(text);
      }
    }
    const depth = (element: Element): number => {
      let count = 0;
      for (let parent = element.parentElement; parent; parent = parent.parentElement) count += 1;
      return count;
    };
    // Hide only containers emptied by a comment, preserving adjacent images,
    // controls, text, and the original tree of nodes owned by Elm.
    for (const element of Array.from(candidates).sort((a, b) => depth(b) - depth(a))) {
      const empty = Array.from(element.childNodes).every(node =>
        node.nodeType === 8 ||
        (node.nodeType === 3 && !node.textContent?.trim()) ||
        (node.nodeType === 1 && (hiddenElements.has(node as Element) || (node as Element).tagName === 'BR'))
      );
      if (empty) hide(element);
    }
    const message = errors.length ? 'Kommentarfehler: ' + errors.join(' ') : '';
    if (message) scope.setAttribute(ERROR, message);
    else scope.removeAttribute(ERROR);
    if (message && diagnostics.get(scope) !== message) console.warn('[lia-board-mode] ' + message);
    diagnostics.set(scope, message);
  }

  function scan(doc: Document): void {
    const observer = watchers.get(doc);
    observer?.disconnect();
    try {
      const hiddenElements = hidden.get(doc)!;
      hiddenElements.forEach(element => element.removeAttribute(HIDDEN));
      hiddenElements.clear();
      doc.querySelectorAll(SCOPE).forEach(scope => {
        if (!scope.parentElement?.closest(SCOPE)) processScope(scope, hiddenElements);
      });
    } finally {
      if (!disposed) observer?.observe(doc.documentElement, { childList: true, subtree: true, characterData: true });
    }
  }

  function attach(doc: Document): void {
    if (disposed || watchers.has(doc) || !doc.documentElement) return;
    if (!doc.getElementById(STYLE_ID)) {
      const style = doc.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `[${HIDDEN}]{display:none!important;}[${ERROR}]::before{content:attr(${ERROR});display:block;padding:.6em;margin-bottom:1em;border:2px solid #b45309;color:inherit;font:inherit;}`;
      (doc.head || doc.documentElement).appendChild(style);
    }
    const observer = new MutationObserver(records => {
      let changed = false;
      for (const record of records) {
        if (record.type === 'characterData') originals.delete(record.target as Text);
        const element = record.target.nodeType === 1 ? record.target as Element : record.target.parentElement;
        if (element?.closest(SCOPE)) changed = true;
        if (record.type === 'childList') {
          record.addedNodes.forEach(node => {
            if (node.nodeType === 1 && ((node as Element).matches(SCOPE) || (node as Element).querySelector(SCOPE))) changed = true;
          });
        }
      }
      if (changed) scan(doc);
    });
    watchers.set(doc, observer);
    hidden.set(doc, new Set());
    scan(doc);
  }

  [ROOT_DOC, CONTENT_DOC].forEach(attach);
  const dispose = (): void => {
    disposed = true;
    watchers.forEach(observer => observer.disconnect());
    watchers.clear();
    hidden.clear();
  };
  ROOT_DOC.defaultView?.addEventListener('pagehide', event => {
    if (!(event as PageTransitionEvent).persisted) dispose();
  }, { once: true });
  return dispose;
}
