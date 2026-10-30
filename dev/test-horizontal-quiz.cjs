'use strict';
// Regression for the original horizontal-quiz syntax after an inert macro.
// Run after npm run build, with Chrome and PLAYWRIGHT_MODULE available.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const repository = path.resolve(__dirname, '..');
const base = 'https://raw.githubusercontent.com/codex-local-test/lia-board-mode/main/';
const courseUrl = base + 'dev/horizontal-quiz-course.md';
const scriptUrl = base + 'dev/horizontal-counter.js';
const source = fs.readFileSync(path.join(__dirname, 'horizontal-quiz-course.md'), 'utf8');
const resources = new Map([
  [base + 'README.md', ['README.md', 'text/plain; charset=utf-8']],
  [base + 'dist/index.js', ['dist/index.js', 'text/javascript; charset=utf-8']],
]);
const artifactDir = path.join(process.env.TEMP || process.env.TMP || __dirname, 'horizontal-quiz-original-regression');

async function runDeployment(browser, deployment) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [], checks = [], sourceResponses = [];
  page.on('pageerror', error => errors.push(error.message));
  const marked = () => page.locator('main:not([hidden]) .lia-quiz[horizontal-quiz]');
  const state = index => marked().nth(index).locator('input').evaluateAll(nodes => nodes.map(node => node.checked));
  async function waitForRepair() {
    await page.waitForFunction(() => {
      const main = document.querySelector('main:not([hidden])');
      if (!main) return false;
      const marked = [...main.querySelectorAll('.lia-quiz[horizontal-quiz]')];
      return main.querySelectorAll('.lia-quiz').length === 8 &&
        main.querySelectorAll('.lia-quiz .lia-quiz').length === 0 &&
        marked.length === 6 && marked.every(quiz =>
          quiz.querySelectorAll(':scope > .lia-quiz__answers > .lia-label').length === 5) &&
        main.querySelectorAll(':scope > .lia-annot-shell').length === 1;
    }, null, { timeout: 30000 });
  }
  async function checkCounters() {
    const counters = await page.evaluate(() => ({
      onload: window.__hqOnload,
      resource: window.__hqResource,
      annotationShells: document.querySelectorAll('main > .lia-annot-shell').length,
    }));
    assert.deepEqual(counters, { onload: 1, resource: 1, annotationShells: 1 },
      'Runtime repair must preserve the annotation overlay and execute resources/onload once');
  }
  async function checkCache() {
    return page.evaluate(async url => {
      const requests = Object.keys(window).filter(key => /^parcelRequire/.test(key))
        .map(key => window[key]).filter(req => typeof req === 'function');
      let db;
      for (const req of requests) {
        try {
          const candidate = req('86RH7').default;
          if (typeof candidate?.handle === 'function') { db = candidate; break; }
        } catch {}
      }
      if (!db) throw Error('Official 2.5.0 cache service unavailable to regression check');
      const event = { reply: false, track: [], service: 'db', message: {
        cmd: 'index_restore', param: { url, version: 0 },
      }};
      await db.handle(event);
      const model = event.message.param;
      const code = model.sections?.map(section => section.code).join('\n') || '';
      return {
        containsMacro: code.includes('@Auswertung(Send)'),
        containsExpandedMarker: code.includes('<div data-snapshot-eval="1" style="display:none;"></div>'),
        sectionCount: model.sections?.length,
        resources: model.definition?.resources?.length,
        onload: model.definition?.onload,
        originalSyntax: code.includes('<!-- horizontal-quiz -->') && code.includes('- [(X)] Hervorragend'),
      };
    }, courseUrl);
  }
  async function closeToc() {
    if (await page.locator('#lia-toc.lia-toc--open').count()) {
      await page.locator('#lia-btn-toc').click();
      await page.waitForFunction(() => !document.getElementById('lia-toc')?.classList.contains('lia-toc--open'));
    }
  }
  async function checkGeometry(width) {
    await page.setViewportSize({ width, height: 1080 });
    await closeToc();
    await page.waitForTimeout(200);
    const geometry = await marked().evaluateAll(quizzes => quizzes.map(quiz => {
      const answers = quiz.querySelector(':scope > .lia-quiz__answers');
      const labels = [...answers.querySelectorAll(':scope > .lia-label')];
      return {
        direction: getComputedStyle(answers).flexDirection,
        boxes: labels.map(label => {
          const box = label.getBoundingClientRect();
          return { top: box.top, width: box.width, height: box.height };
        }),
      };
    }));
    for (const row of geometry) {
      assert.equal(row.direction, width > 760 ? 'row' : 'column');
      assert.ok(row.boxes.every(box => box.width > 0 && box.height > 0));
      if (width > 760) {
        assert.ok(row.boxes.every(box => Math.abs(box.top - row.boxes[0].top) < 1));
        assert.ok(row.boxes.every(box => Math.abs(box.width - row.boxes[0].width) < 1));
      } else {
        assert.ok(row.boxes.every((box, index) => !index || box.top > row.boxes[index - 1].top));
      }
    }
    await page.screenshot({ path: path.join(artifactDir, deployment + '-' + width + '.png'), fullPage: true });
    checks.push(width + 'px native original-syntax layout');
  }

  try {
    await context.route('**/*', async route => {
      const url = route.request().url();
      if (url === courseUrl) {
        sourceResponses.push(source);
        return route.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', body: source,
          headers: { 'access-control-allow-origin': '*' } });
      }
      if (url === scriptUrl) return route.fulfill({
        status: 200, contentType: 'text/javascript; charset=utf-8',
        body: [
          'window.__hqResource = (window.__hqResource || 0) + 1;',
          '(() => {',
          '  const refresh = () => {',
          '    const main = document.querySelector(\"main:not([hidden])\");',
          '    if (!main) return;',
          '    main.classList.add(\"lia-annot-host\");',
          '    let shell = main.querySelector(\":scope > .lia-annot-shell\");',
          '    if (!shell) {',
          '      shell = document.createElement(\"div\");',
          '      shell.className = \"lia-annot-shell\";',
          '      shell.setAttribute(\"aria-hidden\", \"true\");',
          '    }',
          '    const header = main.querySelector(\":scope > header\");',
          '    main.insertBefore(shell, header?.nextSibling || main.firstChild);',
          '  };',
          '  window.__LIA_ANNOTATION__ = { refresh };',
          '  window.setInterval(refresh, 100);',
          '  for (const delay of [0, 80, 250, 700]) setTimeout(refresh, delay);',
          '})();',
        ].join('\n'),
        headers: { 'access-control-allow-origin': '*' },
      });
      const resource = resources.get(url);
      if (resource) return route.fulfill({
        status: 200, contentType: resource[1], body: fs.readFileSync(path.join(repository, resource[0])),
        headers: { 'access-control-allow-origin': '*' },
      });
      if (url.startsWith('https://liascript.github.io/' + deployment + '/')) return route.continue();
      return route.abort();
    });
    await page.goto('https://liascript.github.io/' + deployment + '/?' + courseUrl, {
      waitUntil: 'domcontentloaded', timeout: 45000,
    });
    await waitForRepair();
    await checkCounters();
    checks.push('Annotation overlay preserved across runtime rebuild');
    assert.equal(await page.locator('main').count(), 2, 'Repair must not duplicate course sections');
    assert.equal(await page.locator('main:not([hidden]) .lia-quiz-matrix tbody tr').count(), 8);
    assert.equal(await page.locator('main:not([hidden]) .lia-quiz-text').count(), 1);
    checks.push('Eight independent native quizzes, six original vector blocks');

    const cached = await checkCache();
    assert.equal(cached.containsMacro, true, 'Cached author source retains @Auswertung(Send)');
    assert.equal(cached.containsExpandedMarker, false, 'Transport normalization must not overwrite cached source');
    assert.equal(cached.originalSyntax, true);
    assert.equal(cached.sectionCount, 2);
    assert.ok(cached.resources >= 2, 'Cached resource definitions remain intact');
    assert.ok(cached.onload.includes('__hqOnload'), 'Cached onload definition remains intact');
    assert.ok(sourceResponses.length >= 1 && sourceResponses.every(response => response === source));
    checks.push('Author source/cache preserved; resources and onload execute once');

    await checkGeometry(1920);
    await checkGeometry(640);

    for (let question = 0; question < 6; question++) {
      const inputs = marked().nth(question).locator(':scope > .lia-quiz__answers > .lia-label > input');
      const isMultiple = question === 4;
      for (let choice = 0; choice < 5; choice++) {
        await inputs.nth(choice).click();
        const expected = Array(5).fill(false);
        if (isMultiple) expected.fill(true, 0, choice + 1);
        else expected[choice] = true;
        assert.deepEqual(await state(question), expected, 'Native answer updates independently');
      }
    }
    checks.push('Every original radio/checkbox remains interactive on mobile');

    await marked().nth(0).locator('input').nth(0).click();
    await marked().nth(0).locator('.lia-quiz__check').click();
    await page.waitForFunction(() =>
      document.querySelector('main:not([hidden]) .lia-quiz[horizontal-quiz]')?.classList.contains('solved'));
    const multiple = marked().nth(4);
    for (const index of [1, 3, 4]) await multiple.locator('input').nth(index).click();
    assert.deepEqual(await state(4), [true, false, true, false, false]);
    await multiple.locator('.lia-quiz__check').click();
    await page.waitForFunction(() =>
      [...document.querySelectorAll('main:not([hidden]) .lia-quiz[horizontal-quiz]')][4]?.classList.contains('solved'));
    checks.push('Native single- and multiple-choice evaluation');

    const beforeNavigation = await Promise.all(Array.from({ length: 6 }, (_, index) => state(index)));
    await page.locator('#lia-btn-next').click();
    await page.waitForFunction(() => document.querySelector('main:not([hidden]) header')?.textContent.includes('Return check'));
    await page.locator('#lia-btn-prev').click();
    await waitForRepair();
    const afterNavigation = await Promise.all(Array.from({ length: 6 }, (_, index) => state(index)));
    assert.deepEqual(afterNavigation, beforeNavigation);
    await checkCounters();
    const cacheAfter = await checkCache();
    assert.deepEqual(cacheAfter, cached, 'Navigation must leave the authored cached model intact');
    checks.push('Answer state survives navigation without duplicate resources');
    assert.equal(errors.length, 0, errors.join('\n'));
    const result = { deployment, version: await page.evaluate(() => LIA.version), checks, errors,
      sourceResponses: sourceResponses.length, cached };
    fs.writeFileSync(path.join(artifactDir, deployment + '-result.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(JSON.stringify({ deployment, checks, errors,
      visibleText: (await page.locator('body').innerText()).slice(-7000) }));
    throw error;
  } finally { await context.close(); }
}
(async () => {
  fs.mkdirSync(artifactDir, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const deployment of (process.env.HORIZONTAL_QUIZ_DEPLOYMENTS || 'course').split(',')) {
      await runDeployment(browser, deployment);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
