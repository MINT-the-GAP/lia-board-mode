'use strict';
// DOM update regression checks without a network connection or a server.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/authorComments.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const deadline = setTimeout(() => { void browser.close(); }, 20000);
  try {
    const page = await browser.newPage();
    await page.setContent('<main class="lia-slide__content"><h1>DOM probe</h1><p id="text">Before §:- hidden -:§ After</p><p id="other">Other text</p></main>');
    await page.evaluate(code => {
      const exports = {};
      new Function('exports', 'require', code)(exports, name => {
        if (name !== './state') throw new Error(name);
        return { CONTENT_DOC: document, ROOT_DOC: document };
      });
      window.authorComments = exports;
      window.commentDisposer = exports.initAuthorComments();
      window.originalTextNode = document.getElementById('text').firstChild;
    }, compiled);
    const checks = await page.evaluate(async () => {
      const passed = [];
      const check = (condition, label) => { if (!condition) throw new Error(label); passed.push(label); };
      const tick = () => new Promise(resolve => setTimeout(resolve, 0));
      const text = document.getElementById('text');
      const scope = document.querySelector('main');
      check(text.textContent === 'Before  After', 'inline region removed');
      document.getElementById('other').textContent = 'Updated';
      await tick();
      check(text.textContent === 'Before  After', 'unrelated updates do not resurrect comments');
      check(text.firstChild === window.originalTextNode, 'original text node preserved');
      text.firstChild.data = 'Before §:- unterminated After';
      await tick();
      check(text.textContent.includes('unterminated') && scope.hasAttribute('data-lia-board-comment-error'), 'editing to missing closer restores literal region');
      text.firstChild.data = 'Before §:- changed -:§ After';
      await tick();
      check(text.textContent === 'Before  After' && !scope.hasAttribute('data-lia-board-comment-error'), 'editing to valid region clears error');
      text.firstChild.data = 'Before  After';
      document.getElementById('other').textContent = 'Updated again';
      await tick();
      check(text.textContent === 'Before  After' && !scope.hasAttribute('data-lia-board-comment-error'), 'external text equal to masked output replaces saved original');
      text.innerHTML = 'Before §:- <b>bold hidden</b><br><div style="height:40px;background:red"></div> -:§ After';
      await tick();
      check(!text.innerText.includes('hidden'), 'new formatted nodes inside a region hide');
      check(getComputedStyle(text.querySelector('br')).display === 'none', 'enclosed line break hides');
      check(getComputedStyle(text.querySelector('div')).display === 'none', 'enclosed empty visual element hides');
      text.innerHTML = 'Before<br>After <img alt="outside" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==">';
      await tick();
      check(getComputedStyle(text.querySelector('br')).display !== 'none' && getComputedStyle(text.querySelector('img')).display !== 'none', 'outside line breaks and images preserved');
      text.innerHTML = '§:- only comment -:§';
      await tick();
      check(getComputedStyle(text).display === 'none', 'comment-only paragraph has no layout');
      text.textContent = 'Visible again';
      await tick();
      check(getComputedStyle(text).display !== 'none' && text.innerText === 'Visible again', 'reused paragraph becomes visible after edit');
      text.innerHTML = 'Example <code>§:- literal -:§</code> <input value="§:- editable -:§">';
      await tick();
      check(text.querySelector('code').textContent === '§:- literal -:§' && text.querySelector('input').value === '§:- editable -:§', 'code and input values remain literal');
      text.textContent = '§:- outer §:- inner -:§ end -:§ Next §:- hide me -:§';
      await tick();
      check(text.textContent.includes('outer') && text.textContent.includes('inner') && !text.textContent.includes('hide me') && scope.hasAttribute('data-lia-board-comment-error'), 'invalid nested region stays literal while independent region hides');
      window.commentDisposer();
      text.textContent = '§:- observer stopped -:§';
      await tick();
      check(text.textContent.includes('observer stopped'), 'disposer stops observation');
      return passed;
    });
    assert.equal(checks.length, 15);
    console.log(JSON.stringify({ passed: checks.length, checks }));
  } finally { clearTimeout(deadline); await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
