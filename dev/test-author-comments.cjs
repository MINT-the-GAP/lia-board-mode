'use strict';

/*
 * Run after npm run build: node dev/test-author-comments.cjs
 * Requires an existing Playwright installation (PLAYWRIGHT_MODULE) and Chrome.
 * Uses official course/nightly runtimes and routes local README, bundle and
 * fixture without an HTTP server. Checks display only, not prior parsing.
 * COMMENT_DEPLOYMENTS can select course or nightly while investigating.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const repository = path.resolve(__dirname, '..');
const base = 'https://raw.githubusercontent.com/codex-local-test/lia-board-mode/main/';
const courseUrl = base + 'dev/author-comments-course.md';
const errorAttribute = 'data-lia-board-comment-error';
const resources = new Map([
  [base + 'README.md', ['README.md', 'text/plain; charset=utf-8']],
  [base + 'dist/index.js', ['dist/index.js', 'text/javascript; charset=utf-8']],
  [courseUrl, ['dev/author-comments-course.md', 'text/plain; charset=utf-8']],
]);

async function checkDeployment(browser, deployment) {
  const context = await browser.newContext({ viewport: { width: 1365, height: 1000 } });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const warnings = [];
  const errors = [];
  page.on('console', message => {
    if (message.type() === 'warning') warnings.push(message.text());
  });
  page.on('pageerror', error => errors.push(error.message));
  const results = [];
  const visibleText = () => page.locator('body').innerText();
  const waitForTitle = title => page.waitForFunction(expected =>
    Array.from(document.querySelectorAll('main:not([hidden]) header'))
      .some(header => header.textContent.trim() === expected), title);
  const settleComments = () => page.waitForFunction(() =>
    !/ACHIDDEN/.test(document.body.innerText));

  async function checkGoodSlide(label, allSlides = false) {
    await settleComments();
    const text = await visibleText();
    for (const marker of ['ACVISIBLESTART', 'INLINEBEFORE', 'INLINEAFTER',
      'BLOCKBEFORE', 'BLOCKAFTER', 'ACVISIBLEEND', 'ACEXAMPLEINLINE', 'ACEXAMPLEFENCED']) {
      assert.ok(text.includes(marker), label + ': ' + marker + ' must remain visible');
    }
    assert.ok(text.includes('§:- ACEXAMPLEINLINE -:§'), label + ': inline code must preserve delimiters');
    assert.ok(text.includes('§:- ACEXAMPLEFENCED -:§'), label + ': fenced code must preserve delimiters');
    assert.doesNotMatch(text, /ACHIDDEN/, label + ': comment text must stay hidden');
    if (!allSlides) {
      assert.equal(await page.locator('.lia-slide__content[' + errorAttribute + ']:visible').count(), 0,
        label + ': valid comments must not report errors');
    }
    results.push(label);
  }

  async function changeMode(mode) {
    const selector = '#lia-mode-' + mode.toLowerCase();
    // Native mode options remain in the DOM when the settings menu is closed.
    await page.locator(selector).evaluate(element => element.click());
    await page.waitForFunction(expected =>
      JSON.parse(localStorage.getItem('settings') || '{}').mode?.toLowerCase() === expected.toLowerCase(), mode);
    await settleComments();
  }

  async function nextSlide(title) {
    await page.locator('#lia-btn-next').click();
    await waitForTitle(title);
    await settleComments();
  }

  try {
    await context.route(base + '**', async route => {
      const resource = resources.get(route.request().url().split('?')[0]);
      if (!resource) return route.abort('failed');
      const [filename, contentType] = resource;
      await route.fulfill({
        status: 200, contentType,
        headers: { 'access-control-allow-origin': '*' },
        body: fs.readFileSync(path.join(repository, filename)),
      });
    });
    await page.goto('https://liascript.github.io/' + deployment + '/?' + courseUrl, {
      waitUntil: 'domcontentloaded', timeout: 30000,
    });
    await waitForTitle('Author comments');
    await checkGoodSlide('Presentation: inline, adjacent, multiline, styled, edge and code examples');
    await changeMode('Slides');
    await checkGoodSlide('Slides: native mode change');
    await changeMode('Textbook');
    await checkGoodSlide('Textbook: native mode change', true);
    await changeMode('Presentation');
    await waitForTitle('Author comments');
    await checkGoodSlide('Presentation: mode round trip');

    await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
    await waitForTitle('Author comments');
    await checkGoodSlide('Reload: imported template initializes again');

    await nextSlide('Missing closer');
    let text = await visibleText();
    for (const marker of ['ACMISSINGBEFORE', '§:- ACMISSINGLITERAL', 'ACMISSINGAFTER']) {
      assert.ok(text.includes(marker), 'Missing closer must preserve ' + marker);
    }
    await page.locator('.lia-slide__content[' + errorAttribute + ']:visible').first().waitFor({ state: 'attached' });
    results.push('Missing closer: text remains visible and slide reports error');

    await nextSlide('Nested markers');
    text = await visibleText();
    for (const marker of ['ACNESTEDBEFORE', 'ACNESTEDOUTER', 'ACNESTEDINNER',
      'ACNESTEDOUTEREND', 'ACNESTEDAFTER']) {
      assert.ok(text.includes(marker), 'Nested region must preserve ' + marker);
    }
    await page.locator('.lia-slide__content[' + errorAttribute + ']:visible').first().waitFor({ state: 'attached' });
    assert.doesNotMatch(text, /ACHIDDENAFTERNESTED/, 'Later independent valid region must still hide');
    results.push('Nested markers: malformed text remains visible, independent valid comment hides');

    await nextSlide('Return check');
    text = await visibleText();
    assert.ok(text.includes('ACRETURNBEFORE') && text.includes('ACRETURNAFTER'));
    assert.doesNotMatch(text, /ACHIDDEN/);
    results.push('Navigation: later slide initializes comments');
    for (const title of ['Nested markers', 'Missing closer', 'Author comments']) {
      await page.locator('#lia-btn-prev').click();
      await waitForTitle(title);
      await settleComments();
    }
    await checkGoodSlide('Back navigation: comments hide after Elm recreates slide');
    assert.ok(warnings.some(message => /comment|Kommentar|§:-/i.test(message)),
      'Malformed regions must produce diagnostic warning');
    assert.equal(errors.length, 0, 'Unexpected runtime errors: ' + errors.join('; '));
    console.log(JSON.stringify({ deployment, passed: results.length, checks: results }));
  } catch (error) {
    console.error(JSON.stringify({ deployment, completed: results, warnings, errors,
      visibleText: await visibleText().catch(() => '(page closed)') }));
    throw error;
  } finally {
    await context.close();
  }
}

async function run() {
  let chromium;
  try {
    ({ chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright'));
  } catch {
    throw new Error('Set PLAYWRIGHT_MODULE to an existing Playwright installation.');
  }
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, timeout: 20000,
  });
  // Closing the owned browser cancels pending waits; finally releases it even
  // after assertion failures. No detached server or child helper is started.
  const deadline = setTimeout(() => {
    console.error('Author comment test exceeded the 90-second suite limit.');
    void browser.close();
  }, 90000);
  try {
    for (const deployment of (process.env.COMMENT_DEPLOYMENTS || 'course,nightly').split(',')) {
      assert.ok(['course', 'nightly'].includes(deployment), 'Use course and/or nightly deployments');
      await checkDeployment(browser, deployment);
    }
  } finally {
    clearTimeout(deadline);
    await browser.close();
  }
}

run().catch(error => { console.error(error); process.exitCode = 1; });

