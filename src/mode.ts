// Mode detection from localStorage and DOM; writes data-lia-mode to the content document.

import { CONTENT_DOC, SETTINGS_KEY } from "./state";

export function norm(x: unknown): string { return String(x == null ? "" : x).toLowerCase(); }

export function safeGetSettingsRaw(): string | null {
  try { return localStorage.getItem(SETTINGS_KEY); }
  catch (e) { return null; }
}

export function findModeInJson(obj: unknown): string | null {
  const seen = new Set<object>();
  const PRIORITY = new Set(["mode", "view", "layout", "format"]);

  function walk(v: unknown): string | null {
    if (v == null) return null;

    if (typeof v === "string") {
      const s = norm(v);
      if (s.includes("presentation")) return "presentation";
      if (s.includes("slides")) return "slides";
      if (s.includes("textbook") || s.includes("book")) return "textbook";
      return null;
    }

    if (typeof v !== "object") return null;
    if (seen.has(v as object)) return null;
    seen.add(v as object);

    const rec = v as Record<string, unknown>;
    const rest: string[] = [];

    for (const k in rec) {
      if (!Object.prototype.hasOwnProperty.call(rec, k)) continue;
      if (PRIORITY.has(norm(k))) {
        const m = walk(rec[k]);
        if (m) return m;
      } else {
        rest.push(k);
      }
    }

    for (const k of rest) {
      const m = walk(rec[k]);
      if (m) return m;
    }

    return null;
  }

  return walk(obj);
}

export function detectMode(): string {
  const raw = safeGetSettingsRaw();
  if (!raw) return "unknown";

  try {
    const obj = JSON.parse(raw);
    return findModeInJson(obj) || "unknown";
  } catch (e) {
    const s = norm(raw);
    if (s.includes("presentation")) return "presentation";
    if (s.includes("slides")) return "slides";
    if (s.includes("textbook") || s.includes("book")) return "textbook";
    return "unknown";
  }
}

export function applyModeAttr(mode: string): void {
  try { CONTENT_DOC.documentElement.dataset.liaMode = mode; } catch (e) { }
}
