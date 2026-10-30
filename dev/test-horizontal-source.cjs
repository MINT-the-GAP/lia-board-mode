'use strict';
// Source-level safety checks: no DOM/browser or network is involved.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const modules = new Map();
function load(name) {
  if (name === './state') return { ROOT_WIN: {}, CONTENT_DOC: {} };
  if (modules.has(name)) return modules.get(name);
  const filename = path.join(__dirname, '../src', name.replace(/^\.\//, '') + '.ts');
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const moduleObject = { exports: {} };
  vm.runInNewContext(compiled.outputText, {
    module: moduleObject, exports: moduleObject.exports, require: load,
  }, { filename });
  modules.set(name, moduleObject.exports);
  return moduleObject.exports;
}
const { expandEvaluation: expand, sourceMatchesSnapshot: matches } = load('./horizontalQuizCompatibility');
const markup = '<div data-snapshot-eval="1" style="display:none;"></div>';
let checks = 0;
function check(name, source, expected) {
  assert.equal(expand(source, markup), expected, name);
  checks++;
}
for (const call of ['@Auswertung', '@Auswertung()', '@Auswertung(Send)', '@Auswertung(F12;Tab;Time;Send)']) {
  check('standalone ' + call, 'Before\n' + call + '\nAfter', 'Before\n' + markup + '\nAfter');
}
const literal = [
  'Inline @Auswertung(Send) example',
  '\\@Auswertung(Send)',
  '> @Auswertung(Send)',
  '- @Auswertung(Send)',
  '    @Auswertung(Send)',
  '\t@Auswertung(Send)',
  '@Auswertung(Send) trailing prose',
  '@Auswertung(`Send`)',
  '`@Auswertung(Send)`',
].join('\n');
check('author examples/unsupported calls remain literal', literal, literal);
const fences = [
  '````markdown', '```', '@Auswertung(Send)', '````',
  '~~~ markdown', '@Auswertung(Send)', '~~~',
  '@Auswertung(Send)',
].join('\n');
check('both fence types and shorter closers', fences,
  fences.slice(0, fences.lastIndexOf('@Auswertung(Send)')) + markup);
const inline = [
  'Example ``begins', '@Auswertung(Send)', '` still inside', '`` ends',
  '@Auswertung(Send)',
].join('\n');
check('multiline inline code with exact delimiter length', inline,
  inline.slice(0, inline.lastIndexOf('@Auswertung(Send)')) + markup);
const comments = [
  '<!-- ignored', '@Auswertung(Send)', '-->',
  '`<!--` literal marker', '@Auswertung(Send)',
  '<!-- @Auswertung(Send) -->',
].join('\n');
check('comments preserve their code but inline-code comment marker does not start a comment',
  comments, comments.replace('\n@Auswertung(Send)\n<!--', '\n' + markup + '\n<!--'));
for (const tag of ['pre', 'code', 'script', 'style', 'textarea', 'template', 'xmp', 'iframe', 'noembed', 'noframes']) {
  const raw = '<' + tag + '>\n@Auswertung(Send)\n</' + tag + '>\n@Auswertung(Send)';
  check('raw HTML ' + tag, raw, raw.slice(0, raw.lastIndexOf('@Auswertung(Send)')) + markup);
}
const originalQuiz = '@Auswertung(Send)\n\n<!-- horizontal-quiz -->\n- [( )] First\n- [(X)] Second\n- [( )] Third\n';
check('original authored quiz markers and answers survive normalization',
  originalQuiz, originalQuiz.replace('@Auswertung(Send)', markup));

const firstCode = '\n@Auswertung(Send)\n\n<!-- horizontal-quiz -->\n- [( )] A\n- [(X)] B\n\n';
const secondCode = '\nSecond body\n';
const source = '<!--\nversion: 0.1.0\n-->\n# First\n' + firstCode + '## Second\n' + secondCode;
const model = { sections: [
  { title: [{ Chars: 'First' }], indentation: 1, code: firstCode },
  { title: [{ Chars: 'Second' }], indentation: 2, code: secondCode },
]};
function matched(name, text, snapshot, expected) {
  assert.equal(matches(text, snapshot), expected, name);
  checks++;
}
matched('exact authored sections', source, model, true);
matched('BOM and CRLF normalization', '\uFEFF' + source.replace(/\n/g, '\r\n'), model, true);
matched('stale body', source.replace('Second body', 'New body'), model, false);
matched('stale title', source.replace('## Second', '## Changed'), model, false);
matched('changed heading depth', source.replace('## Second', '### Second'), model, false);
matched('new authored section', source + '\n## Third\nAdditional body', model, false);
matched('unsupported rich cached heading', source, { sections: [
  { ...model.sections[0], title: [{ Bold: 'First' }] }, model.sections[1],
]}, false);
matched('generated/mismatched section count', source, { sections: model.sections.slice(0, 1) }, false);
const codeWithHeading = '\n```markdown\n## Fenced example\n@Auswertung(Send)\n```\n';
matched('fenced heading remains part of its actual section',
  '# First\n' + codeWithHeading, { sections: [{ title: [{ Chars: 'First' }], indentation: 1, code: codeWithHeading }] }, true);
console.log('Passed ' + checks + ' horizontal quiz source safety checks.');
