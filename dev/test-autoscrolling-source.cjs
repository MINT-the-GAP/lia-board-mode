'use strict';

// Run with: node dev/test-autoscrolling-source.cjs
// Exercise authored-source cases without fetching a course or loading a browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const filename = path.join(__dirname, '../src/autoscrollingSource.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
});
const moduleObject = { exports: {} };
vm.runInNewContext(compiled.outputText, {
  module: moduleObject,
  exports: moduleObject.exports,
}, { filename });
const parse = moduleObject.exports.parseAutoscrollingSource;

const cases = [
  {
    name: 'keeps each slide position and only records explicit switches',
    source: ['# First', '@autoscrolling(off)', '## Inherited', '## Resume', '@autoscrolling(on)'],
    expected: [{ line: 0, enabled: false }, { line: 2 }, { line: 3, enabled: true }],
  },
  {
    name: 'uses the final explicit switch on a slide',
    source: ['# First', '@autoscrolling(off)', '@autoscrolling(on)'],
    expected: [{ line: 0, enabled: true }],
  },
  {
    name: 'ignores definitions and aliases inside the document header',
    source: ['<!--', '@alias: @autoscrolling(off)', '# Example heading', '-->', '# First', '@alias', '## Second'],
    expected: [{ line: 4 }, { line: 6 }],
  },
  {
    name: 'ignores switches and headings in multiline comments',
    source: ['# First', '<!--', '@autoscrolling(off)', '## Example', '-->', '## Second'],
    expected: [{ line: 0 }, { line: 5 }],
  },
  {
    name: 'ignores inline comment examples but accepts a trailing comment',
    source: ['# First', '<!-- @autoscrolling(on) -->', '@autoscrolling(off) <!-- switch -->', '## Second'],
    expected: [{ line: 0, enabled: false }, { line: 3 }],
  },
  {
    name: 'ignores fenced Markdown examples',
    source: ['# First', '```markdown', '# Example', '@autoscrolling(off)', '```', '## Second'],
    expected: [{ line: 0 }, { line: 5 }],
  },
  {
    name: 'does not close a long backtick fence with a shorter fence',
    source: ['# First', '````markdown', '```', '@autoscrolling(off)', '# Example', '````', '## Second'],
    expected: [{ line: 0 }, { line: 6 }],
  },
  {
    name: 'handles tilde fences with language info and indentation',
    source: ['# First', '  ~~~~ markdown', '@autoscrolling(off)', '## Example', '  ~~~~', '## Second'],
    expected: [{ line: 0 }, { line: 5 }],
  },
  {
    name: 'ignores space-indented and tab-indented code',
    source: ['# First', '    @autoscrolling(off)', '\t@autoscrolling(on)', '    ## Example', '## Second'],
    expected: [{ line: 0 }, { line: 4 }],
  },
  {
    name: 'ignores inline code and surrounding explanatory text',
    source: ['# First', '`@autoscrolling(off)`', 'Text @autoscrolling(off)', '@autoscrolling(on) is an example.', '## Second'],
    expected: [{ line: 0 }, { line: 4 }],
  },
  {
    name: 'does not create a standalone switch by removing inline code',
    source: ['# First', '`x`@autoscrolling(off)', '@autoscrolling(off) `example`', '## Second'],
    expected: [{ line: 0 }, { line: 3 }],
  },
  {
    name: 'ignores multiline inline-code examples',
    source: ['# First', '``example', '@autoscrolling(off)', '# Example', '``', '## Second'],
    expected: [{ line: 0 }, { line: 5 }],
  },
  {
    name: 'does not open an HTML comment from inside inline code',
    source: ['# First', '`<!--`', '@autoscrolling(off)', '## Second'],
    expected: [{ line: 0, enabled: false }, { line: 3 }],
  },
  {
    name: 'ignores escaped macros and headings',
    source: ['# First', '\\@autoscrolling(off)', '\\# Example', '## Second'],
    expected: [{ line: 0 }, { line: 3 }],
  },
  {
    name: 'ignores blockquote and list examples',
    source: ['# First', '> @autoscrolling(off)', '- @autoscrolling(off)', '> ## Example', '## Second'],
    expected: [{ line: 0 }, { line: 4 }],
  },
  {
    name: 'ignores preformatted HTML and script bodies',
    source: ['# First', '<pre>', '@autoscrolling(off)', '# Example', '</pre>', '<script>', '@autoscrolling(on)', '</script>', '## Second'],
    expected: [{ line: 0 }, { line: 8 }],
  },
  {
    name: 'preserves zero-based lines with BOM and Windows line endings',
    source: '\uFEFF# First\r\n@autoscrolling(OFF)\r\n## Second',
    expected: [{ line: 0, enabled: false }, { line: 2 }],
  },
  {
    name: 'accepts case-insensitive literal arguments and ordinary indentation',
    source: ['# First', '   @autoscrolling( OFF )', '## Second', '@autoscrolling(On)'],
    expected: [{ line: 0, enabled: false }, { line: 2, enabled: true }],
  },
  {
    name: 'does not inherit an inferred switch across a dynamic argument',
    source: ['# First', '@autoscrolling(off)', '## Dynamic', '@autoscrolling(@value)', '## Third'],
    expected: null,
  },
  {
    name: 'rejects unsupported direct arguments conservatively',
    source: ['# First', '@autoscrolling(true)', '## Second'],
    expected: null,
  },
  {
    name: 'does not let an unmatched heading backtick hide the slide body',
    source: ['# `Literal', '@autoscrolling(off)', '## Second'],
    expected: [{ line: 0, enabled: false }, { line: 2 }],
  },
  {
    name: 'has no source index for a document without slide headings',
    source: ['<!-- metadata -->', '@autoscrolling(off)'],
    expected: null,
  },
];

for (const test of cases) {
  const source = Array.isArray(test.source) ? test.source.join('\n') : test.source;
  // Normalize the VM objects before asserting to avoid realm-prototype differences.
  const actual = JSON.parse(JSON.stringify(parse(source)));
  assert.deepEqual(actual, test.expected, test.name);
}

console.log(`PASS: ${cases.length} autoscrolling source cases`);
