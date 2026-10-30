// Compatibility for LiaScript 2.5.0's macro-position bug. Keep authored quiz
// syntax and native vector state. Never try to repair the rendered quiz DOM.
import { ROOT_WIN, CONTENT_DOC } from './state';
import { parseAutoscrollingSource } from './autoscrollingSource';

const EVAL_MARKUP = '<div data-snapshot-eval="1" style="display:none;"></div>';
const DB_MODULE = '86RH7'; // LiaScript 2.5.0's Database service; verify its shape.
type Event = { reply: boolean; track: [string, number][]; service: string;
  message: { cmd: string; param: any } };
type Database = { PORT: string; handle: (event: Event) => unknown };
type Section = { title: { Chars?: string }[]; code: string; indentation: number };
type Snapshot = { readme: string; version: number; sections: Section[];
  definition: { version: string; macro: Record<string, string>; resources: unknown[]; onload: string };
  [key: string]: any };

function request(cmd: string, param: unknown, reply = false): Event {
  return { reply, track: [], service: 'db', message: { cmd, param } };
}

function courseUrl(): string | null {
  try {
    let value = new URL(CONTENT_DOC.URL).search.slice(1);
    if (!/^https?:\/\//i.test(value)) value = decodeURIComponent(value);
    if (!/^https?:\/\//i.test(value)) return null;
    const url = new URL(value);
    if (url.hash || url.searchParams.has('submission')) return null;
    return url.href;
  } catch { return null; }
}

function isSubmission(url: string): boolean {
  try {
    return /submission(?:=|%3d)/i.test(CONTENT_DOC.URL) ||
      !!ROOT_WIN.sessionStorage.getItem('__lia_freeze_v2__:' + url);
  } catch { return true; }
}

function database(): Database | null {
  const host = ROOT_WIN as unknown as Record<string, any>;
  for (const name of Object.keys(host).filter(name => /^parcelRequire/.test(name))) {
    try {
      if (typeof host[name] !== 'function') continue;
      const service = host[name](DB_MODULE)?.default;
      if (service?.PORT === 'db' && typeof service.handle === 'function') return service;
    } catch { /* A different Parcel bundle is not the LiaScript database. */ }
  }
  return null;
}

export function sourceMatchesSnapshot(source: string, model: Snapshot): boolean {
  const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const slides = parseAutoscrollingSource(normalized);
  if (!slides || slides.length !== model.sections.length) return false;
  const lines = normalized.split('\n');
  return slides.every((slide, index) => {
    const section = model.sections[index];
    // Be conservative about generated/rich headings and preprocessed source.
    if (!section.title.every(node => typeof node.Chars === 'string')) return false;
    const heading = lines[slide.line].match(/^ {0,3}(#{1,6})[ \t]*/)!;
    if (heading[1].length !== section.indentation) return false;
    const title = lines[slide.line].slice(heading[0].length).trim();
    const code = lines.slice(slide.line + 1, slides[index + 1]?.line).join('\n');
    return title === section.title.map(node => node.Chars).join('').trim() &&
      code.trim() === section.code.trim();
  });
}

export function expandEvaluation(code: string, markup: string): string {
  let comment = false;
  let inlineCode = 0;
  let fence: { char: string; length: number } | null = null;
  let rawTag: string | null = null;
  return code.split('\n').map(line => {
    if (fence) {
      const close = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (close && close[1][0] === fence.char && close[1].length >= fence.length) fence = null;
      return line;
    }
    if (rawTag) {
      if (new RegExp('</' + rawTag + '\\s*>', 'i').test(line)) rawTag = null;
      return line;
    }
    if (!comment && !inlineCode) {
      const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (open) { fence = { char: open[1][0], length: open[1].length }; return line; }
      const raw = line.match(/^ {0,3}<(pre|code|script|style|textarea|template|xmp|iframe|noembed|noframes)(?:[\s>])/i);
      if (raw) {
        if (!new RegExp('</' + raw[1] + '\\s*>', 'i').test(line)) rawTag = raw[1];
        return line;
      }
      if (/^@Auswertung(?:\([A-Za-z0-9; \t]*\))?[ \t]*$/.test(line)) return markup;
    }
    for (let pos = 0; pos < line.length;) {
      if (comment) {
        const end = line.indexOf('-->', pos);
        if (end < 0) break;
        pos = end + 3;
        comment = false;
      } else if (line[pos] === '`') {
        const start = pos;
        while (line[pos] === '`') pos++;
        const length = pos - start;
        if (inlineCode === length) inlineCode = 0;
        else if (!inlineCode) inlineCode = length;
      } else if (inlineCode) {
        pos++;
      } else if (line.startsWith('<!--', pos)) {
        comment = true;
        pos += 4;
      } else if (line[pos] === '\\') {
        pos += 2;
      } else {
        pos++;
      }
    }
    return line;
  }).join('\n');
}

function inertBody(code: string, macros: Record<string, string>, seen = new Set<string>()): boolean {
  if (/<script\b|\bon\w+\s*=|@\[|^\s*```[^\n]*@/im.test(code)) return false;
  for (const match of code.matchAll(/(?:^|[^\w\\])@([A-Za-z][\w.-]*)/g)) {
    const name = match[1];
    if (seen.has(name)) continue;
    seen.add(name);
    if (macros[name] && !inertBody(macros[name], macros, seen)) return false;
  }
  return true;
}

function pristine(): boolean {
  for (const input of Array.from(CONTENT_DOC.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'main input:not([type=hidden]):not([type=range]):not([type=button]):not([type=submit]):not([type=reset]):not([type=color]),main textarea'))) {
    if (input instanceof HTMLInputElement && /^(radio|checkbox)$/.test(input.type)) {
      if (input.checked) return false;
    } else if (input.value.trim()) return false;
  }
  if (Array.from(CONTENT_DOC.querySelectorAll<HTMLSelectElement>('main select')).some(select => select.selectedIndex > 0)) return false;
  return !CONTENT_DOC.querySelector('main .lia-quiz.solved,main .lia-quiz.failed');
}

function malformed(): boolean {
  return !!CONTENT_DOC.querySelector('.lia-quiz[horizontal-quiz] .lia-quiz');
}

async function savedAnswers(db: Database, sections: Set<number>): Promise<boolean> {
  for (const table of ['quiz', 'survey', 'task', 'code']) {
    const event = request('load_all', table);
    await db.handle(event);
    const records = event.message.param;
    // Unknown protocol: leave the course alone.
    if (!Array.isArray(records)) return true;
    if (records.some(record => sections.has(record.id) && record.data != null)) return true;
  }
  return false;
}

export function initHorizontalQuizCompatibility(): void {
  const lia = (ROOT_WIN as any).LIA;
  if (lia?.version !== '2.5.0' || typeof lia.send !== 'function') return;
  const url = courseUrl();
  if (!url || isSubmission(url)) return;
  let interacted = false;
  let pending = false;
  let finished = false;
  const stopEvents = new AbortController();
  const interaction = (event: globalThis.Event) => {
    const target = event.target as Element | null;
    if (target?.closest?.('main')) interacted = true;
  };
  for (const type of ['pointerdown', 'keydown', 'input', 'change']) {
    CONTENT_DOC.addEventListener(type, interaction, { capture: true, signal: stopEvents.signal });
  }
  const observer = new MutationObserver(() => { void attempt(); });
  observer.observe(CONTENT_DOC.documentElement, { childList: true, subtree: true });

  function finish(): void {
    finished = true;
    observer.disconnect();
    stopEvents.abort();
  }

  async function attempt(): Promise<void> {
    if (pending || finished || !malformed()) return;
    if (interacted || !pristine()) { finish(); return; }
    pending = true;
    const controller = new AbortController();
    const deadline = ROOT_WIN.setTimeout(() => controller.abort(), 4000);
    let releaseStore = () => {};
    try {
      const db = database();
      if (!db) return;
      const response = await fetch(url!, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) return;
      const source = await response.text();
      const header = source.match(/^\s*<!--[\s\S]*?-->/)?.[0] || '';
      const version = header.match(/^\s*version:[ \t]*([^\s]+)/m)?.[1] || '0.0.1';
      const major = Number(version.split('.')[0]);
      if (!Number.isInteger(major)) return;
      let original: Snapshot | null = null;
      for (let tries = 0; tries < 8; tries++) {
        const event = request('index_restore', { url, version: major });
        await db.handle(event);
        if (Array.isArray(event.message.param?.sections)) {
          original = event.message.param; break;
        }
        await new Promise(resolve => ROOT_WIN.setTimeout(resolve, 50));
      }
      if (!original || original.readme !== url || original.definition?.version !== version ||
          original.definition.macro?.Auswertung?.trim() !== EVAL_MARKUP ||
          !sourceMatchesSnapshot(source, original)) return;

      const model: Snapshot = JSON.parse(JSON.stringify(original));
      const affected = new Set<number>();
      model.sections.forEach((section, index) => {
        if (!section.code.includes('horizontal-quiz')) return;
        const normalized = expandEvaluation(section.code, EVAL_MARKUP);
        if (normalized !== section.code) { section.code = normalized; affected.add(index); }
      });
      if (!affected.size) return;
      // No re-execution of active body scripts, including scripts from macros.
      if (!original.sections.every(section => inertBody(section.code, original!.definition.macro))) return;
      if (major > 0 && await savedAnswers(db, affected)) return;
      if (interacted || !pristine() || courseUrl() !== url || isSubmission(url!) || !malformed()) return;

      // Native onload scripts are queued until resources finish, with a
      // 250ms drain timer. Let that original initialization finish first.
      let idleSince = 0;
      for (let tries = 0; tries < 80; tries++) {
        if (lia.eventSemaphore === 0) {
          if (!idleSince) idleSince = Date.now();
          if (Date.now() - idleSince >= 350) break;
        } else idleSince = 0;
        await new Promise(resolve => ROOT_WIN.setTimeout(resolve, 50));
      }
      if (!idleSince || Date.now() - idleSince < 350 || lia.eventSemaphore !== 0 ||
          interacted || !pristine() || courseUrl() !== url || isSubmission(url!)) return;

      // Already initialized resources must not run again. Do not persist this
      // transport-only definition or normalized source to LiaScript's cache.
      model.definition.resources = [];
      model.definition.onload = '';
      const signature = JSON.stringify(model.sections);
      const originalHandle = db.handle;
      const wrapped = function(this: Database, event: Event) {
        if (event.message.cmd === 'index_store' && event.message.param?.readme === url &&
            JSON.stringify(event.message.param.sections) === signature) {
          releaseStore();
          return;
        }
        return originalHandle.call(this, event);
      };
      releaseStore = () => {
        if (db.handle === wrapped) db.handle = originalHandle;
      };
      db.handle = wrapped;
      finish();
      lia.send(request('index_restore', model, true));
      // No timeout: even a delayed metadata event must never persist the
      // transport-only definition. The handler removes itself on that event.
    } catch (error) {
      releaseStore();
      console.warn('[lia-board-mode] Horizontal quiz compatibility skipped.', error);
    } finally {
      ROOT_WIN.clearTimeout(deadline);
      finish();
    }
  }
  void attempt();
}
