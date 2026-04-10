// data-lia-only attribute support: hides content blocks that don't match the current mode.

// =========================================================
// Mode-only CSS: data-lia-only attribute support
// =========================================================

const STYLE_ID = "__LIA_MODE_ONLY_STYLE_V01__";
const MODE_CSS = `
[data-lia-only]{ display: block; }

html[data-lia-mode="slides"] [data-lia-only]:not([data-lia-only="slides"]){
  display: none !important;
}
html[data-lia-mode="presentation"] [data-lia-only]:not([data-lia-only="presentation"]){
  display: none !important;
}
html[data-lia-mode="textbook"] [data-lia-only]:not([data-lia-only="textbook"]){
  display: none !important;
}
`;

function ensureModeStyle(doc: Document): void {
  try {
    const head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    if (!head) return;
    if (doc.getElementById(STYLE_ID)) return;

    const style = doc.createElement("style");
    style.id = STYLE_ID;
    style.appendChild(doc.createTextNode(MODE_CSS));
    head.appendChild(style);
  } catch (e) { }
}

function normM(x: unknown): string { return String(x ?? "").trim().toLowerCase(); }

function mapModeToken(x: string): string | null {
  const s = normM(x);
  if (s === "book") return "textbook";
  if (s === "hearing") return "presentation";
  if (s === "visibility") return "slides";
  if (s === "textbook" || s === "presentation" || s === "slides") return s;
  if (s.includes("textbook") || s.includes("lehrbuch")) return "textbook";
  if (s.includes("presentation") || s.includes("präsent")) return "presentation";
  if (s.includes("slides") || s.includes("folien")) return "slides";
  return null;
}

function modeFromActiveTopbarIcon(doc: Document): string | null {
  const icons = Array.from(doc.querySelectorAll(".material-icons, i.material-icons, span.material-icons"));

  function isActive(btn: Element): boolean {
    const ap = normM(btn.getAttribute("aria-pressed"));
    const as_ = normM(btn.getAttribute("aria-selected"));
    const cls = normM(btn.className);
    return ap === "true" || as_ === "true" || cls.includes("active") || cls.includes("selected") || cls.includes("mdc-icon-button--on");
  }

  let best: { mode: string; score: number } | null = null;
  for (const ic of icons) {
    const key = normM(ic.textContent);
    const m = mapModeToken(key);
    if (!m) continue;

    const btn = ic.closest("button,[role='button'],a");
    const r = (btn || ic).getBoundingClientRect();
    const vw = (doc.defaultView as Window).innerWidth || 1200;

    let score = 0;
    if (r.top < 140) score += 200;
    if (r.left > vw * 0.55) score += 200;
    if (btn && isActive(btn)) score += 1000;

    if (!best || score > best.score) best = { mode: m, score };
  }
  return best ? best.mode : null;
}

function modeFromWrapperAttrs(doc: Document): string | null {
  const cand = [
    doc.querySelector("#app"),
    doc.querySelector("main"),
    doc.querySelector(".markdown-body"),
    doc.body,
    doc.documentElement
  ].filter(Boolean) as Element[];

  for (const el of cand) {
    const blob = [
      el.getAttribute && el.getAttribute("data-mode"),
      el.getAttribute && el.getAttribute("data-view"),
      el.getAttribute && el.getAttribute("mode"),
      el.className,
      el.id
    ].map(v => String(v || "")).join(" ");
    const m = mapModeToken(blob);
    if (m) return m;
  }
  return null;
}

function modeFromURL(win: Window): string | null {
  const q = normM(win.location.search) + "&" + normM(win.location.hash);
  return mapModeToken(q);
}

function modeFromStorage(win: Window): string | null {
  const stores = [win.sessionStorage, win.localStorage].filter(Boolean);
  for (const stor of stores) {
    try {
      for (let i = 0; i < stor.length; i++) {
        const k = stor.key(i);
        const v = stor.getItem(k!);
        const m = mapModeToken((k || "") + " " + (v || ""));
        if (m) return m;
      }
    } catch (e) { }
  }
  return null;
}

function detectModeForDoc(doc: Document): string | null {
  const win = doc.defaultView as Window;
  return (
    modeFromActiveTopbarIcon(doc) ||
    modeFromWrapperAttrs(doc) ||
    modeFromURL(win) ||
    modeFromStorage(win)
  );
}

function collectDocsSameOrigin(): Document[] {
  const docs = new Set<Document>();
  function add(d: Document): void { try { if (d && d.documentElement) docs.add(d); } catch (e) { } }

  try {
    let w: Window = window;
    for (let i = 0; i < 12; i++) {
      add(w.document);
      if (!w.parent || w.parent === w) break;
      w = w.parent;
    }
  } catch (e) { }

  for (const d of Array.from(docs)) {
    try {
      d.querySelectorAll("iframe").forEach(fr => {
        try { add(fr.contentDocument!); } catch (e) { }
      });
    } catch (e) { }
  }

  return Array.from(docs);
}

function applyModeOnly(mode: string): void {
  const docs = collectDocsSameOrigin();

  const sectionDocs = docs.filter(d => {
    try { return !!d.querySelector("[data-lia-only]"); } catch (e) { return false; }
  });

  const targetSectionDocs = sectionDocs.length ? sectionDocs : [document];

  for (const d of targetSectionDocs) {
    ensureModeStyle(d);
  }

  // Fall back to DOM-based detection only when the caller has no authoritative mode.
  let resolved = mode;
  if (resolved === "unknown") {
    for (const d of docs) {
      const m = detectModeForDoc(d);
      if (m) { resolved = m; break; }
    }
  }

  const valid = (resolved === "slides" || resolved === "presentation" || resolved === "textbook");
  for (const d of targetSectionDocs) {
    try {
      if (valid) d.documentElement.setAttribute("data-lia-mode", resolved);
      else d.documentElement.removeAttribute("data-lia-mode");
    } catch (e) { }
  }
}

export function initModeOnly(getMode: () => string): void {
  const run = () => applyModeOnly(getMode());

  run();
  setTimeout(run, 50);
  setTimeout(run, 250);
  setTimeout(run, 1000);

  document.addEventListener("click", () => setTimeout(run, 0), true);
  window.addEventListener("hashchange", run, true);
  window.addEventListener("popstate", run, true);
}
