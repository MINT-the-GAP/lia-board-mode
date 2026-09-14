'use strict';
/*
 * Run: node dev/test-viewport-dom.cjs
 * Uses PLAYWRIGHT_MODULE (existing installation) and Chrome/BROWSER_CHANNEL.
 * Deterministic tests mock VisualViewport but use real Chromium layout.
 * CDP tests use the native viewport and emulated touch, not physical hardware.
 * No downloads or requests to external sites.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const src = path.join(__dirname, '../src');
const sources = Object.fromEntries(fs.readdirSync(src).filter(file => file.endsWith('.ts')).map(file => [
  './' + file.slice(0, -3),
  ts.transpileModule(fs.readFileSync(path.join(src, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText,
]));
const checks = [];
function check(condition, label, details) {
  assert.ok(condition, label + (details ? ': ' + JSON.stringify(details) : ''));
  checks.push(label);
}
const close = (a, b) => Math.abs(a - b) <= 1.1;
const ids = { button: 'lia-tff-btn-v2', panel: 'lia-tff-panel-v2', header: 'lia-tff-header-toggle-v2', voice: 'lia-tff-voice-toggle-v2' };
const html = `<!doctype html><html lang="de"><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
html,body { margin:0; width:100%; height:100%; font:16px sans-serif; }
.lia-canvas,.lia-slide { min-height:100%; }
#lia-toolbar-nav { position:fixed; top:0; left:0; width:100%; height:56px; background:white; z-index:10; }
.lia-header__left { display:flex; align-items:center; gap:8px; height:56px; padding-left:12px; }
.lia-btn { width:36px; height:36px; border:0; background:rgb(11,95,255); }
.lia-slide__container { padding-top:70px; } main { min-height:1800px; }
.lia-responsive-voice { position:fixed; bottom:0; left:0; width:100%; height:48px; background:#eee; }
#lia-hl-ui-overlay-v1 { position:fixed; width:0; height:0; }
#lia-hl-btn { position:absolute; width:22px; height:22px; left:20px; top:80px; }
body.fixture-mini #lia-btn-toc { position:fixed; left:18px; top:18px; width:22px; height:22px; }
</style></head><body><div class="lia-canvas lia-mode--presentation"><div class="lia-slide">
<header id="lia-toolbar-nav"><div class="lia-header__left"><button class="lia-btn" id="lia-btn-toc" aria-label="Inhaltsverzeichnis">TOC</button><button class="lia-btn" id="settings">S</button></div></header>
<nav id="lia-toc"></nav><div class="lia-slide__container"><main class="lia-slide__content" id="focused"><h1>Viewport regression</h1><p id="text">Slide text</p><input id="editor" value="editable"></main></div>
<footer class="lia-responsive-voice">Voice controls</footer></div></div></body></html>`;

async function createFixture(browser, { embedded = false, mock = true, mobile = false } = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.route('http://viewport.test/**', route => route.fulfill({ contentType: 'text/html', body: html }));
  await page.goto('http://viewport.test/');
  await page.evaluate(({ mock }) => {
    localStorage.setItem('settings', JSON.stringify({ mode: 'presentation', language: 'de' }));
    localStorage.setItem('lia-tff-font-px-v2', '24');
    if (mock) {
      const viewport = new EventTarget();
      Object.assign(viewport, { width: 1280, height: 900, offsetLeft: 0, offsetTop: 0, scale: 1 });
      Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
      window.setTestViewport = (values, event = 'resize') => {
        Object.assign(viewport, values);
        viewport.dispatchEvent(new Event(event));
      };
    }
    const originalRAF = window.requestAnimationFrame.bind(window);
    window.rafCalls = 0;
    window.requestAnimationFrame = callback => { window.rafCalls++; return originalRAF(callback); };
  }, { mock });
  let content = page;
  if (embedded) {
    await page.evaluate(() => {
      document.querySelector('main').remove();
      const frame = document.createElement('iframe');
      frame.id = 'course-content';
      frame.style.cssText = 'position:absolute;left:150px;top:120px;width:750px;height:600px;border:0';
      frame.srcdoc = '<html><body><main class="lia-slide__content" id="focused"><h1>Embedded slide</h1><p id="text">Slide text</p></main></body></html>';
      document.querySelector('.lia-slide__container').appendChild(frame);
    });
    content = await (await page.$('#course-content')).contentFrame();
    await content.waitForSelector('main');
  }
  await content.evaluate(sources => {
    const cache = {};
    function load(name) {
      if (cache[name]) return cache[name].exports;
      if (!sources[name]) throw new Error('Unknown source module: ' + name);
      const module = { exports: {} };
      cache[name] = module;
      new Function('exports', 'require', 'module', sources[name] + '\n//# sourceURL=' + name + '.js')(module.exports, load, module);
      return module.exports;
    }
    window.boardTest = { load };
    load('./index');
  }, sources);
  await page.waitForFunction(() => document.getElementById('lia-tff-btn-v2')?.style.display === 'inline-flex');
  await page.waitForTimeout(160);
  return { context, page, content, errors };
}
async function settle(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve)))));
}
async function snapshot(page) {
  return page.evaluate(ids => {
    const rect = element => { const r = element.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
    const result = {};
    for (const [name, id] of Object.entries(ids)) {
      const element = document.getElementById(id);
      result[name] = { ...rect(element), display: getComputedStyle(element).display, parent: element.parentElement.id };
    }
    result.toc = rect(document.getElementById('lia-btn-toc'));
    const marker = document.getElementById('lia-hl-btn');
    if (marker) result.marker = rect(marker);
    const vv = visualViewport;
    result.viewport = { width: vv.width, height: vv.height, left: vv.offsetLeft, top: vv.offsetTop, scale: vv.scale };
    result.layoutWidth = document.documentElement.clientWidth;
    result.classes = document.documentElement.className;
    result.panelOpen = document.body.classList.contains('lia-tff-panel-open');
    return result;
  }, ids);
}
function contained(rect, viewport) {
  return rect.left >= viewport.left + 7 && rect.top >= viewport.top + 7 &&
    rect.right <= viewport.left + viewport.width - 7 && rect.bottom <= viewport.top + viewport.height - 7;
}
async function directVisibility(content) {
  await content.evaluate(() => {
    const ui = boardTest.load('./ui');
    ui.setPresentationOnlyVisibility('presentation');
    ui.syncHeaderBandToggle('presentation');
    ui.syncVoiceFooterToggle('presentation');
  });
}
async function setMode(page, content, mode) {
  await content.evaluate(mode => {
    localStorage.setItem('settings', JSON.stringify({ mode }));
    boardTest.load('./state').ROOT_WIN.dispatchEvent(new StorageEvent('storage', { key: 'settings' }));
  }, mode);
  await settle(page);
}

async function deterministic(browser, embedded) {
  const { page, content, context, errors } = await createFixture(browser, { embedded });
  const prefix = embedded ? 'embedded: ' : 'same document: ';
  try {
    const baseline = await snapshot(page);
    check(baseline.button.display !== 'none' && baseline.header.display === 'flex' && baseline.voice.display === 'flex', prefix + 'wide layout controls visible', baseline);
    check(baseline.button.parent === 'lia-tff-inline-slot-v2', prefix + 'inline font slot follows navigation');
    await page.evaluate(() => {
      window.addTestMarker = () => {
        const overlay = document.createElement('div');
        overlay.id = 'lia-hl-ui-overlay-v1';
        const marker = document.createElement('button');
        marker.id = 'lia-hl-btn'; marker.textContent = 'M';
        marker.style.width = '40px'; marker.style.height = '40px';
        overlay.appendChild(marker); document.body.appendChild(overlay);
        window.updateStaleMarker = () => {
          overlay.style.left = visualViewport.offsetLeft + 'px';
          overlay.style.top = visualViewport.offsetTop + 'px';
          marker.style.left = '27px';
          marker.style.top = '90px';
        };
        updateStaleMarker();
      };
      addTestMarker();
    });
    await settle(page);
    let inline = await snapshot(page);
    check(close(inline.marker.right + 8, inline.button.left) && close(inline.marker.top + inline.marker.height / 2, inline.button.top + inline.button.height / 2), prefix + 'late marker insertion reserves an inline slot before font', inline);
    await page.evaluate(() => document.getElementById('lia-hl-ui-overlay-v1').remove());
    await settle(page);
    check(close((await snapshot(page)).button.left, baseline.button.left), prefix + 'marker removal releases its inline slot');
    await page.evaluate(() => addTestMarker());
    await settle(page);

    await page.locator('#lia-tff-btn-v2').click();
    await settle(page);
    for (const width of [1000, 679, 519, 400]) {
      await page.evaluate(width => setTestViewport({ width, height: 350, scale: 1280 / width }), width);
      await directVisibility(content);
      await settle(page);
      const state = await snapshot(page);
      check(state.button.display === baseline.button.display && state.header.display === baseline.header.display && state.voice.display === baseline.voice.display && state.classes === baseline.classes && state.panelOpen, prefix + `visual width ${width} does not change responsive state`, state);
    }
    await page.evaluate(() => setTestViewport({ width: 600, height: 450, offsetLeft: 300, offsetTop: 140, scale: 2 }, 'scroll'));
    await settle(page);
    let state = await snapshot(page);
    check(contained(state.panel, state.viewport), prefix + 'open inline panel remains inside the panned viewport', state);
    check(close(state.marker.right + 8, state.button.left), prefix + 'panned inline marker retains the font anchor outside visual bounds', state);
    const visibleAnchors = await content.evaluate(() => {
      const { ROOT_DOC } = boardTest.load('./state');
      const toolbar = boardTest.load('./toolbar');
      const visible = ROOT_DOC.createElement('div');
      visible.style.cssText = 'position:fixed;left:750px;top:200px;width:30px;height:30px';
      const outside = ROOT_DOC.createElement('div');
      outside.style.cssText = 'position:fixed;left:30px;top:30px;width:30px;height:30px';
      ROOT_DOC.body.append(visible, outside);
      const result = { visible: !!toolbar.getVisibleRect(visible), outside: !!toolbar.getVisibleRect(outside) };
      visible.remove(); outside.remove();
      return result;
    });
    check(visibleAnchors.visible && !visibleAnchors.outside, prefix + 'anchor visibility uses offset visual bounds', visibleAnchors);

    // Simulate the current marker's stale/double-offset positioning writes.
    // Board mode owns the TOC -> font -> marker mini stack through its CSS
    // contract. The fixture deliberately does not fix the follower itself.
    await page.evaluate(() => {
      document.body.classList.add('fixture-mini');
      document.querySelector('.lia-canvas').classList.add('lia-navigation--hidden');
      const marker = document.getElementById('lia-hl-btn');
      marker.style.width = '22px'; marker.style.height = '22px';
    });
    await settle(page);
    for (const [offsetLeft, offsetTop] of [[0, 0], [160, 100], [300, 220], [320, 245]]) {
      await page.evaluate(values => {
        setTestViewport({ width: 600, height: 450, ...values }, 'scroll');
        updateStaleMarker();
      }, { offsetLeft, offsetTop });
      await settle(page);
      state = await snapshot(page);
      check(state.button.display !== 'none' && state.panelOpen && contained(state.button, state.viewport) && contained(state.panel, state.viewport), prefix + `mini stack and panel stay visible at pan ${offsetLeft}/${offsetTop}`, state);
      check(close(state.marker.left, state.button.left) && close(state.marker.top, state.button.bottom + 6), prefix + `marker remains below font at pan ${offsetLeft}/${offsetTop}`, state);
      if (!offsetLeft) check(close(state.button.left, state.toc.left) && close(state.button.top, state.toc.bottom + 6), prefix + 'TOC owns the mini stack anchor', state);
    }
    await page.evaluate(() => setTestViewport({ width: 1280, height: 900, offsetLeft: 0, offsetTop: 0, scale: 1 }));
    await settle(page);
    const frameCalls = await content.evaluate(() => {
      const root = boardTest.load('./state').ROOT_WIN;
      boardTest.load('./ui').cancelPositionUpdate();
      const before = root.rafCalls;
      for (let i = 0; i < 30; i++) {
        boardTest.load('./ui').requestPositionUpdate();
        root.visualViewport.dispatchEvent(new Event('scroll'));
        root.visualViewport.dispatchEvent(new Event('resize'));
      }
      return root.rafCalls - before;
    });
    check(frameCalls === 1, prefix + 'position requests and viewport events share one animation frame', { frameCalls });
    await settle(page);
    await page.locator('#lia-tff-slider-v2').evaluate(slider => { slider.value = '37'; slider.dispatchEvent(new Event('input', { bubbles: true })); });
    await settle(page);
    const font = await content.evaluate(() => ({ stored: localStorage.getItem('lia-tff-font-px-v2'), value: getComputedStyle(document.documentElement).getPropertyValue('--lia-tff-font').trim(), actual: getComputedStyle(document.querySelector('main')).fontSize }));
    check(font.stored === '37' && font.value === '37px' && font.actual === '37px', prefix + 'slider changes and persists the content font', font);
    await content.evaluate(() => {
      const main = document.querySelector('main');
      const replacement = main.cloneNode(false);
      replacement.innerHTML = '<h1>Next slide</h1><p id="text">New content</p>';
      main.replaceWith(replacement);
    });
    await settle(page);
    check(await content.evaluate(() => getComputedStyle(document.querySelector('main')).fontSize === '37px'), prefix + 'replacement slide retains font size');
    await page.keyboard.press('Escape');
    check(!(await snapshot(page)).panelOpen, prefix + 'Escape closes the font panel');
    await page.evaluate(() => { document.body.classList.remove('fixture-mini'); document.querySelector('.lia-canvas').classList.remove('lia-navigation--hidden'); });
    await settle(page);
    await page.locator('#lia-tff-header-toggle-v2').focus();
    await page.keyboard.press('Enter');
    await settle(page);
    check((await snapshot(page)).classes.includes('lia-tff-header-collapsed'), prefix + 'keyboard activates header toggle');
    check(await page.evaluate(() => !document.documentElement.hasAttribute('data-lia-tff-marker-dock')), prefix + 'collapsed header releases the hidden inline marker contract');
    await page.evaluate(() => setTestViewport({ width: 500, height: 360, offsetLeft: 100, offsetTop: 50, scale: 2.56 }));
    await directVisibility(content);
    await settle(page);
    check((await snapshot(page)).classes.includes('lia-tff-header-collapsed'), prefix + 'pinch preserves collapsed header preference');
    await page.locator('#lia-tff-header-toggle-v2').evaluate(button => button.click());
    await settle(page);
    await page.locator('#lia-tff-voice-toggle-v2').evaluate(button => button.click());
    await settle(page);
    check(!(await snapshot(page)).classes.includes('lia-tff-voice-collapsed'), prefix + 'voice bar toggle remains functional');
    for (const [width, height, showFont, showBands] of [[650, 900, false, false], [900, 650, true, false], [1100, 500, false, true], [1280, 900, true, true]]) {
      await page.evaluate(values => setTestViewport({ width: values.width, height: values.height, offsetLeft: 0, offsetTop: 0, scale: 1 }), { width, height });
      await page.setViewportSize({ width, height });
      await settle(page);
      state = await snapshot(page);
      check((state.button.display !== 'none') === showFont && (state.header.display !== 'none') === showBands && (state.voice.display !== 'none') === showBands, prefix + `real resize/orientation ${width}x${height} changes layout`, state);
    }
    await setMode(page, content, 'slides');
    state = await snapshot(page);
    check(state.button.display === 'none' && state.header.display === 'flex' && state.voice.display === 'flex', prefix + 'slides mode retains header and voice functions');
    await setMode(page, content, 'textbook');
    state = await snapshot(page);
    check(state.button.display === 'none' && state.header.display === 'none' && state.voice.display === 'none', prefix + 'textbook mode hides presentation controls');
    await setMode(page, content, 'presentation');
    await page.waitForTimeout(180);
    const idle = await content.evaluate(async () => {
      const root = boardTest.load('./state').ROOT_DOC;
      const ui = boardTest.load('./ui');
      const css = boardTest.load('./css');
      let ownMutations = 0; const targets = {}; const samples = [];
      const observer = new root.defaultView.MutationObserver(records => { ownMutations += records.length; samples.push(...records.slice(0, 1).map(r => ({ old: r.oldValue, current: r.target.getAttribute("style") }))); for (const record of records) { const key = record.target.id || record.target.tagName; targets[key] = (targets[key] || 0) + 1; } });
      observer.observe(root.documentElement, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
      for (const node of root.querySelectorAll('[id^="lia-tff-"]')) observer.observe(node, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
      for (let i = 0; i < 10; i++) {
        css.syncAccent('presentation');
        ui.setPresentationOnlyVisibility('presentation');
        ui.syncVoiceFooterToggle('presentation');
        ui.syncHeaderBandToggle('presentation');
        ui.requestPositionUpdate();
      }
      await new Promise(resolve => setTimeout(resolve, 300));
      observer.disconnect();
      return { ownMutations, targets, samples: samples.slice(0, 6) };
    });
    check(idle.ownMutations === 0, prefix + 'unchanged CSS/position updates write no styles and cause no observer cycles', { idle });

    await page.waitForTimeout(100);
    const unrelatedFrames = await content.evaluate(async () => {
      const root = boardTest.load('./state').ROOT_WIN;
      const text = document.getElementById('text');
      const before = root.rafCalls;
      for (let i = 0; i < 30; i++) {
        text.title = String(i);
        text.dataset.counter = String(i);
        text.style.color = i % 2 ? 'red' : 'blue';
      }
      await new Promise(resolve => setTimeout(resolve, 80));
      return root.rafCalls - before;
    });
    check(unrelatedFrames === 0, prefix + 'unrelated course attributes do not trigger global positioning', { unrelatedFrames });
    check(errors.length === 0, prefix + 'no browser exceptions', errors);
  } finally { await context.close(); }
}

async function floatingFixture(browser, embedded) {
  const { page, context, errors } = await createFixture(browser, { embedded });
  const prefix = embedded ? 'embedded floating: ' : 'same document floating: ';
  try {
    await page.evaluate(() => {
      const toc = document.getElementById('lia-btn-toc');
      document.body.appendChild(toc);
      toc.style.cssText = 'position:fixed;left:700px;top:180px;width:36px;height:36px';
      const overlay = document.createElement('div');
      overlay.id = 'lia-hl-ui-overlay-v1';
      const marker = document.createElement('button');
      marker.id = 'lia-hl-btn'; marker.textContent = 'M';
      marker.style.cssText = 'width:40px;height:40px;left:10px;top:10px';
      overlay.appendChild(marker); document.body.appendChild(overlay);
    });
    await settle(page);
    await page.locator('#lia-tff-btn-v2').click();
    await settle(page);
    for (const [offsetLeft, offsetTop] of [[0, 0], [300, 140], [600, 350]]) {
      await page.evaluate(values => {
        setTestViewport({ width: 600, height: 450, ...values, scale: 2 }, 'scroll');
        const marker = document.getElementById('lia-hl-btn');
        const overlay = document.getElementById('lia-hl-ui-overlay-v1');
        overlay.style.left = values.offsetLeft + 'px';
        overlay.style.top = values.offsetTop + 'px';
        marker.style.left = (values.offsetLeft + 100) + 'px';
        marker.style.top = (values.offsetTop + 100) + 'px';
      }, { offsetLeft, offsetTop });
      await settle(page);
      const state = await snapshot(page);
      const dock = await page.evaluate(() => document.documentElement.getAttribute('data-lia-tff-marker-dock'));
      check(dock === 'floating' && state.button.parent === 'lia-tff-overlay-v2', prefix + 'external TOC selects the floating marker contract at ' + offsetLeft + '/' + offsetTop, state);
      check(contained(state.button, state.viewport) && contained(state.marker, state.viewport) && contained(state.panel, state.viewport) && state.panelOpen, prefix + 'floating group and panel stay inside pan ' + offsetLeft + '/' + offsetTop, state);
      check(close(state.marker.right + 8, state.button.left) && close(state.marker.top + state.marker.height / 2, state.button.top + state.button.height / 2), prefix + 'fresh TOC geometry keeps marker before font despite stale marker writes at ' + offsetLeft + '/' + offsetTop, state);
    }
    check(errors.length === 0, prefix + 'no browser exceptions', errors);
  } finally { await context.close(); }
}


async function nativeViewport(browser) {
  const { page, content, context, errors } = await createFixture(browser, { mock: false, mobile: true });
  try {
    const session = await context.newCDPSession(page);
    await page.evaluate(() => {
      document.body.classList.add('fixture-mini');
      document.querySelector('.lia-canvas').classList.add('lia-navigation--hidden');
      const overlay = document.createElement('div');
      overlay.id = 'lia-hl-ui-overlay-v1';
      const marker = document.createElement('button');
      marker.id = 'lia-hl-btn'; marker.textContent = 'M';
      overlay.appendChild(marker); document.body.appendChild(overlay);
      window.writeNativeMarkerOffsets = () => {
        overlay.style.left = visualViewport.offsetLeft + 'px';
        overlay.style.top = visualViewport.offsetTop + 'px';
        marker.style.left = '27px'; marker.style.top = '90px';
      };
      visualViewport.addEventListener('scroll', writeNativeMarkerOffsets);
      visualViewport.addEventListener('resize', writeNativeMarkerOffsets);
    });
    await settle(page);

    await page.locator('#lia-tff-btn-v2').click();
    const baseline = await snapshot(page);
    await page.evaluate(() => {
      window.nativeZoomStates = [];
      const record = () => nativeZoomStates.push({
        font: getComputedStyle(document.getElementById('lia-tff-btn-v2')).display,
        header: getComputedStyle(document.getElementById('lia-tff-header-toggle-v2')).display,
        voice: getComputedStyle(document.getElementById('lia-tff-voice-toggle-v2')).display,
        classes: document.documentElement.className,
        panelOpen: document.body.classList.contains('lia-tff-panel-open'),
      });
      visualViewport.addEventListener('resize', record);
      visualViewport.addEventListener('scroll', record);
    });
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 350, id: 1 }, { x: 400, y: 350, id: 2 }] });
    for (let step = 1; step <= 10; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 300 - step * 4, y: 350, id: 1 }, { x: 400 + step * 4, y: 350, id: 2 }] });
      await page.waitForTimeout(25);
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await settle(page);
    await directVisibility(content);
    let state = await snapshot(page);
    check(state.viewport.width < 520 && state.viewport.scale > 2 && state.layoutWidth === baseline.layoutWidth && state.button.display === baseline.button.display && state.header.display === baseline.header.display && state.voice.display === baseline.voice.display && state.classes === baseline.classes && state.panelOpen, 'native Chromium touch pinch crosses all old thresholds without changing layout', state);
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 320, y: 230, id: 1 }] });
    for (let step = 1; step <= 8; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 320 - step * 22, y: 230 - step * 14, id: 1 }] });
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(200);
    await settle(page);
    state = await snapshot(page);
    check((state.viewport.left > 0 || state.viewport.top > 0) && contained(state.panel, state.viewport) && state.panelOpen, 'native Chromium touch pan moves the visual viewport with the panel open', state);
    check(contained(state.button, state.viewport) && contained(state.marker, state.viewport) && close(state.marker.left, state.button.left) && close(state.marker.top, state.button.bottom + 6), 'native Chromium pinch/pan preserves the collapsed navigation and marker stack', state);
    const gestureStates = await page.evaluate(() => nativeZoomStates);
    check(gestureStates.length > 0 && gestureStates.every(sample => sample.font === baseline.button.display && sample.header === baseline.header.display && sample.voice === baseline.voice.display && sample.classes === baseline.classes && sample.panelOpen), 'native Chromium controls remain visible throughout pinch/pan events', gestureStates);
    check(errors.length === 0, 'native Chromium scenario has no browser exceptions', errors);
    return { method: 'CDP Input.dispatchTouchEvent with two fingers (pinch), then one finger (pan)', scale: state.viewport.scale, pan: { left: state.viewport.left, top: state.viewport.top }, physicalTouch: false };
  } finally { await context.close(); }
}
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const deadline = setTimeout(() => { void browser.close(); }, 90000);
  try {
    if (!process.argv.includes('--native-only')) {
      await deterministic(browser, false);
      await deterministic(browser, true);
      await floatingFixture(browser, false);
      await floatingFixture(browser, true);
    }
    const native = await nativeViewport(browser);
    console.log(JSON.stringify({ passed: checks.length, checks, native, limitations: 'No physical touch device, Safari, or live external course. Marker is a contract fixture, not lia-marker runtime.' }, null, 2));
  } finally { clearTimeout(deadline); await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
