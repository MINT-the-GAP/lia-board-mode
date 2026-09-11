// Conservative source fallback for slides that LiaScript has not rendered yet.

export interface AutoscrollingSourceSlide {
  /** Zero-based source line of the slide heading, as used by LiaScript. */
  line: number;
  enabled?: boolean;
}

/**
 * Reads direct, standalone @autoscrolling(on|off) calls in ordinary Markdown.
 * This deliberately does not expand macros, imports, scripts, or HTML output.
 * Only the rendered DOM can provide those settings reliably. An unsupported
 * direct autoscrolling call disables this fallback instead of inheriting an
 * older value across a switch whose result we cannot determine.
 */
export function parseAutoscrollingSource(
  source: string
): AutoscrollingSourceSlide[] | null {
  const slides: AutoscrollingSourceSlide[] = [];
  const lines = source.replace(/^\uFEFF/, '').split(/\r\n?|\n/);
  let comment = false;
  let fence: { character: string; length: number } | null = null;
  let inlineCodeLength = 0;
  let rawTag: string | null = null;

  for (let line = 0; line < lines.length; line += 1) {
    const original = lines[line];

    if (fence) {
      const closing = original.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (
        closing &&
        closing[1][0] === fence.character &&
        closing[1].length >= fence.length
      ) fence = null;
      continue;
    }

    if (rawTag) {
      if (new RegExp(`</${rawTag}\\s*>`, 'i').test(original)) rawTag = null;
      continue;
    }

    // Indented code cannot contain a top-level authored switch or heading.
    // Continue scanning an already open comment/code span so it can close.
    if (!comment && !inlineCodeLength && /^(?: {4}|[ \t]*\t)/.test(original)) {
      continue;
    }

    if (!comment && !inlineCodeLength) {
      const opening = original.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (opening && (opening[1][0] !== '`' || !opening[2].includes('`'))) {
        fence = { character: opening[1][0], length: opening[1].length };
        continue;
      }

      const rawOpening = original.match(
        /^ {0,3}<(pre|code|script|style|textarea|xmp|iframe|noembed|noframes|template)(?:[\s>])/i
      );
      if (rawOpening) {
        const tag = rawOpening[1].toLowerCase();
        if (!new RegExp(`</${tag}\\s*>`, 'i').test(original)) rawTag = tag;
        continue;
      }
    }

    const beganInsideCode = inlineCodeLength > 0;
    let hadInlineCode = beganInsideCode;
    let visible = '';
    for (let index = 0; index < original.length;) {
      if (comment) {
        const end = original.indexOf('-->', index);
        if (end < 0) break;
        visible += ' '.repeat(end + 3 - index);
        index = end + 3;
        comment = false;
      } else if (inlineCodeLength) {
        if (original[index] === '`') {
          const start = index;
          while (original[index] === '`') index += 1;
          if (index - start === inlineCodeLength) inlineCodeLength = 0;
          visible += ' '.repeat(index - start);
        } else {
          visible += ' ';
          index += 1;
        }
      } else if (original.startsWith('<!--', index)) {
        comment = true;
        visible += '    ';
        index += 4;
      } else if (original[index] === '\\' && index + 1 < original.length) {
        // Retain escaped text so an escaped macro/heading never becomes one.
        visible += original.slice(index, index + 2);
        index += 2;
      } else if (original[index] === '`') {
        const start = index;
        while (original[index] === '`') index += 1;
        inlineCodeLength = index - start;
        hadInlineCode = true;
        visible += ' '.repeat(inlineCodeLength);
      } else {
        visible += original[index];
        index += 1;
      }
    }

    if (beganInsideCode) continue;

    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(original) && /^ {0,3}#{1,6}(?:[ \t]+|$)/.test(visible)) {
      slides.push({ line });
      // An unmatched backtick in an ATX heading is literal, not a span that
      // continues into the slide body.
      inlineCodeLength = 0;
      continue;
    }

    if (hadInlineCode || !slides.length || !/^ {0,3}@autoscrolling\b/i.test(original)) continue;
    if (!/^ {0,3}@autoscrolling\([^\r\n]*\)[ \t]*$/i.test(visible)) continue;

    const macro = visible.match(/^ {0,3}@autoscrolling\(\s*(on|off)\s*\)[ \t]*$/i);
    if (!macro) return null;
    slides[slides.length - 1].enabled = macro[1].toLowerCase() === 'on';
  }

  return slides.length ? slides : null;
}
