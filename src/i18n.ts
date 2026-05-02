// Internationalization: language detection and translated UI labels.
// Language source: CONTENT_DOC html[lang] (set by LiaScript from the course "language:" header).

import { ROOT_DOC, CONTENT_DOC, SETTINGS_KEY } from "./state";

// ---------------------------------------------------------------------------
// Translation dictionary – "Font Size" in supported LiaScript languages
// ---------------------------------------------------------------------------
const FONT_SIZE_I18N: Record<string, string> = {
  ar: "حجم الخط",
  bg: "Размер на шрифта",
  cs: "Velikost písma",
  da: "Skriftstørrelse",
  de: "Schriftgröße",
  el: "Μέγεθος γραμματοσειράς",
  en: "Font Size",
  es: "Tamaño de fuente",
  fa: "اندازه قلم",
  fi: "Fonttikoko",
  fr: "Taille de police",
  hr: "Veličina fonta",
  hu: "Betűméret",
  it: "Dimensione carattere",
  ja: "フォントサイズ",
  ko: "글꼴 크기",
  nl: "Lettergrootte",
  pl: "Rozmiar czcionki",
  pt: "Tamanho da fonte",
  ro: "Dimensiunea fontului",
  ru: "Размер шрифта",
  sk: "Veľkosť písma",
  sv: "Teckenstorlek",
  tr: "Yazı tipi boyutu",
  uk: "Розмір шрифту",
  zh: "字体大小",
};

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------

/**
 * Detects the active course language.
 *
 * Priority:
 * 1. html[lang] of CONTENT_DOC – LiaScript sets this attribute from the
 *    course "language:" YAML header at runtime.
 * 2. html[lang] of ROOT_DOC – fallback for single-document setups.
 * 3. "language" / "lang" field in the LiaScript settings JSON
 *    (localStorage["settings"]).
 * 4. Default: "en".
 */
export function detectLanguage(): string {
  // 1. CONTENT_DOC html[lang]
  try {
    const lang = CONTENT_DOC.documentElement.lang;
    if (lang && lang.length >= 2) return lang.toLowerCase().slice(0, 2);
  } catch (e) { }

  // 2. ROOT_DOC html[lang]
  try {
    const lang = ROOT_DOC.documentElement.lang;
    if (lang && lang.length >= 2) return lang.toLowerCase().slice(0, 2);
  } catch (e) { }

  // 3. LiaScript settings JSON
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      const l = (obj as Record<string, unknown>)?.language
             ?? (obj as Record<string, unknown>)?.lang;
      if (l && typeof l === "string" && l.length >= 2)
        return l.toLowerCase().slice(0, 2);
    }
  } catch (e) { }

  return "en";
}

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/** Returns the "Font Size" label translated to the current course language. */
export function getFontSizeLabel(): string {
  const lang = detectLanguage();
  return FONT_SIZE_I18N[lang] ?? FONT_SIZE_I18N["en"];
}
