'use strict';
// Run after npm run build. Uses an existing Playwright/Chrome installation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const repository = path.resolve(__dirname, '..');
const scenarios = [];
for (const viewport of [
  { width: 960, height: 850 },
  { width: 1920, height: 1080 }
]) {
  for (const mode of ['presentation', 'slides']) {
    for (const autoscrolling of ['off', 'on']) {
      scenarios.push({ viewport, mode, autoscrolling, liveEditor: null });
    }
  }
}
for (const mode of ['presentation', 'slides']) {
  for (const autoscrolling of ['off', 'on']) {
    scenarios.push({
      viewport: { width: 960, height: 850 },
      mode,
      autoscrolling,
      liveEditor: 'narrow'
    });
  }
}

(async () => {
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || 'chrome',
    headless: true
  });
  const results = [];
  try {
    for (const scenario of scenarios) {
      const page = await browser.newPage({ viewport: scenario.viewport });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('http://board-animation.test/**', async route => {
        const requested = decodeURIComponent(new URL(route.request().url()).pathname);
        const file = path.resolve(repository, '.' + requested);
        const relative = path.relative(repository, file);
        if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(file)) {
          await route.fulfill({ status: 404, body: 'Not found' });
          return;
        }
        await route.fulfill({
          contentType: path.extname(file) === '.js' ? 'text/javascript' : 'text/html',
          body: fs.readFileSync(file)
        });
      });

      const query = new URLSearchParams({
        mode: scenario.mode,
        autoscrolling: scenario.autoscrolling,
        ...(scenario.liveEditor ? { liveEditor: scenario.liveEditor } : {})
      });
      try {
        await page.goto(
          'http://board-animation.test/dev/preview-animation-layout-test.html?' + query
        );
        await page.waitForFunction(
          () => ['pass', 'fail'].includes(document.body.dataset.animationLayoutTest),
          null,
          { timeout: 20000 }
        );
        const details = JSON.parse(
          await page.locator('#animation-layout-result').textContent()
        );
        results.push({
          ...scenario,
          pass: details.pass && errors.length === 0,
          errors,
          ...(details.pass ? {} : { details })
        });
      } catch (error) {
        results.push({ ...scenario, pass: false, errors, error: String(error) });
      } finally {
        await page.close();
      }
    }

    console.log(JSON.stringify({
      pass: results.every(result => result.pass),
      results
    }, null, 2));
    assert.ok(
      results.every(result => result.pass),
      'Animation layout regression failed'
    );
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
