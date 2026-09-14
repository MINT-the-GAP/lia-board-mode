'use strict';
// Existing layout fixtures plus native keyboard interaction against built dist.
// Run after npm run build. Uses an existing Playwright/Chrome installation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const repository = path.resolve(__dirname, '..');
const fixtures = [
  ['preview-header-collapse-test.html', 'header-collapse-result', 'headerCollapseTest'],
  ['preview-presenter-test.html', 'presenter-result', 'presenterTest'],
  ['preview-live-editor-layout-test.html', 'live-editor-layout-result', 'liveEditorLayoutTest'],
  ['preview-toc-layout-test.html', 'result', 'tocLayoutTest'],
];
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const results = [];
  try {
    for (const [fixture, resultId, flag] of fixtures) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('http://board-layout.test/**', async route => {
        const requested = decodeURIComponent(new URL(route.request().url()).pathname);
        const file = path.resolve(repository, '.' + requested);
        const relative = path.relative(repository, file);
        if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(file)) {
          await route.fulfill({ status: 404, body: 'Not found' });
          return;
        }
        await route.fulfill({
          contentType: path.extname(file) === '.js' ? 'text/javascript' : 'text/html',
          body: fs.readFileSync(file),
        });
      });
      try {
        await page.goto('http://board-layout.test/dev/' + fixture);
        await page.waitForFunction(flag => ['pass', 'fail'].includes(document.body.dataset[flag]), flag, { timeout: 12000 });
        const details = JSON.parse(await page.locator('#' + resultId).textContent());
        results.push({ fixture, pass: details.pass && errors.length === 0, errors, ...(details.pass ? {} : { details }) });
        if (fixture === 'preview-header-collapse-test.html' && details.pass) {
          await page.locator('#lia-tff-header-toggle-v2').focus();
          await page.keyboard.press('Enter');
          await page.waitForFunction(() => !document.documentElement.classList.contains('lia-tff-header-collapsed'));
          await page.keyboard.press('Space');
          await page.waitForFunction(() => document.documentElement.classList.contains('lia-tff-header-collapsed'));
          await page.keyboard.press('Enter');
          await page.evaluate(() => {
            localStorage.setItem('settings', JSON.stringify({ mode: 'presentation', language: 'de' }));
            window.dispatchEvent(new StorageEvent('storage', { key: 'settings' }));
          });
          await page.locator('#lia-tff-btn-v2').click();
          await page.waitForFunction(() => document.body.classList.contains('lia-tff-panel-open'));
          const slider = page.locator('#lia-tff-slider-v2');
          const before = Number(await slider.inputValue());
          await slider.focus();
          await page.keyboard.press(before < 48 ? 'ArrowRight' : 'ArrowLeft');
          const expected = before < 48 ? before + 1 : before - 1;
          await page.waitForFunction(expected =>
            document.getElementById('lia-tff-slider-v2').value === String(expected) &&
            localStorage.getItem('lia-tff-font-px-v2') === String(expected) &&
            document.documentElement.style.getPropertyValue('--lia-tff-font') === expected + 'px', expected);
          await page.locator('#lia-tff-btn-v2').focus();
          await page.keyboard.press('Escape');
          await page.waitForFunction(() => !document.body.classList.contains('lia-tff-panel-open'));
          results.push({ fixture: 'native keyboard: header Enter/Space, font slider arrows, panel Escape', pass: true });
        }
      } catch (error) {
        results.push({ fixture, pass: false, error: String(error), errors });
      } finally {
        await page.close();
      }
    }
    console.log(JSON.stringify({ pass: results.every(result => result.pass), results }, null, 2));
    assert.ok(results.every(result => result.pass), 'Layout preview regression failed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
