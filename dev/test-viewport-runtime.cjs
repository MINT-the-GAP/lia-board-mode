// Integration checks against the official LiaScript runtime and pinned lia-marker.
// Run after npm run build; PLAYWRIGHT_MODULE can point to an existing installation.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const repository = path.resolve(__dirname, '..');
const base = 'https://raw.githubusercontent.com/codex-local-test/lia-board-mode/main/';
const markerRevision = 'ed3da1236c5582c4083f2951fdaa4f83dfc97484';
const course = `<!--
language: de
mode: Presentation
import: ${base}README.md
        https://raw.githubusercontent.com/MINT-the-GAP/lia-marker/${markerRevision}/README.md
-->
# Viewport integration

Font and marker share their toolbar.

## Second slide

Font size survives slide navigation.
`;
const pause = page => page.waitForTimeout(150);
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const deadline = setTimeout(() => void browser.close(), 90000);
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, hasTouch: true });
    await context.route(base + '**', async route => {
      const name = route.request().url().slice(base.length).split('?')[0];
      const body = name === 'viewport.md' ? course :
        ['README.md', 'dist/index.js'].includes(name) ? fs.readFileSync(path.join(repository, name)) : null;
      if (body === null) return route.abort();
      await route.fulfill({ status: 200, headers: { 'access-control-allow-origin': '*' },
        contentType: name.endsWith('.js') ? 'text/javascript' : 'text/plain', body });
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.setDefaultTimeout(15000);
    await page.goto('https://liascript.github.io/nightly/?' + base + 'viewport.md', { waitUntil: 'domcontentloaded', timeout: 30000 });
    try {
      await page.waitForFunction(() => document.documentElement.getAttribute('data-lia-tff-marker-dock') === 'floating');
    } catch (error) {
      console.error(await page.evaluate(() => ({ title: document.title,
        dock: document.documentElement.getAttribute('data-lia-tff-marker-dock'),
        markerParent: document.getElementById('lia-hl-btn')?.parentElement?.id,
        fontParent: document.getElementById('lia-tff-btn-v2')?.parentElement?.id,
        tocParent: document.getElementById('lia-btn-toc')?.parentElement?.className })), errors);
      throw error;
    }
    const cdp = await context.newCDPSession(page);
    const read = () => page.evaluate(() => {
      const rect = id => { const r = document.getElementById(id).getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
      return {
        font: rect('lia-tff-btn-v2'), marker: rect('lia-hl-btn'), panel: rect('lia-tff-panel-v2'),
        dock: document.documentElement.getAttribute('data-lia-tff-marker-dock'),
        fontDisplay: getComputedStyle(document.getElementById('lia-tff-btn-v2')).display,
        header: getComputedStyle(document.getElementById('lia-tff-header-toggle-v2')).display,
        voice: getComputedStyle(document.getElementById('lia-tff-voice-toggle-v2')).display,
        panelOpen: document.body.classList.contains('lia-tff-panel-open'),
        vv: { x: visualViewport.offsetLeft, y: visualViewport.offsetTop, w: visualViewport.width, h: visualViewport.height, scale: visualViewport.scale },
      };
    });
    const close = (a, b, label) => assert.ok(Math.abs(a - b) < 1, `${label}: ${a} vs ${b}`);
    const checks = [];
    await page.locator('#lia-tff-btn-v2').click();
    for (const scale of [1, 1.5, 2, 3]) {
      await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: scale });
      await pause(page);
      const r = await read();
      assert.equal(r.dock, 'floating');
      close(r.font.left - r.marker.right, 8, 'floating gap');
      assert.notEqual(r.fontDisplay, 'none');
      assert.notEqual(r.header, 'none');
      assert.notEqual(r.voice, 'none');
      assert.ok(r.panelOpen);
    }
    checks.push('Real marker floating TOC dock and open font panel across native page scales 1/1.5/2/3');
    await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
    await page.locator('#lia-btn-toc').evaluate(button => button.click());
    await page.waitForFunction(() => !document.getElementById('lia-toc').classList.contains('lia-toc--open'));
    await page.waitForTimeout(350);
    await page.locator('#lia-tff-btn-v2').evaluate(button => button.click());
    await pause(page);
    const inline = await read();
    assert.ok(['inline', 'floating'].includes(inline.dock));
    close(inline.font.left - inline.marker.right, 8, 'real gap after TOC close');
    checks.push('Native TOC close preserves the shared marker/font dock');
    await page.evaluate(() => {
      document.querySelector('.lia-canvas').classList.add('lia-navigation--hidden');
      window.dispatchEvent(new Event('resize'));
    });
    await page.waitForFunction(() => document.documentElement.getAttribute('data-lia-tff-marker-dock') === 'stack');
    for (const scale of [3, 2, 1]) {
      await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: scale });
      await pause(page);
      const r = await read();
      close(r.marker.top - r.font.bottom, 6, 'stack gap');
      close(r.font.left + r.font.width / 2, r.marker.left + r.marker.width / 2, 'stack center');
      assert.ok(r.panelOpen);
      assert.ok(r.marker.bottom <= r.vv.y + r.vv.h - 7);
    }
    checks.push('Real marker mini stack retains 6px gap across native page scales 3/2/1');
    await page.evaluate(() => {
      const slider = document.getElementById('lia-tff-slider-v2');
      slider.value = '31'; slider.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.lia-canvas').classList.remove('lia-navigation--hidden');
      window.dispatchEvent(new Event('resize'));
      document.getElementById('lia-btn-next').click();
    });
    await page.waitForFunction(() => Array.from(document.querySelectorAll('main:not([hidden]) header')).some(e => e.textContent.includes('Second slide')));
    await pause(page);
    assert.equal(await page.locator('#lia-tff-slider-v2').inputValue(), '31');
    assert.equal(await page.evaluate(() => localStorage.getItem('lia-tff-font-px-v2')), '31');
    checks.push('Font input and native slide navigation preserve 31px');
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ markerRevision, passed: checks.length, checks,
      touchCoverage: 'Chrome native page-scale emulation with real LiaScript/marker; no physical pinch or Safari' }));
    await context.close();
  } finally { clearTimeout(deadline); await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
