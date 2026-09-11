/*
 * Run after npm run build:
 *   node dev/test-autoscrolling-runtime.cjs
 *
 * Requires an existing Playwright installation with Chromium and a built
 * @liascript/editor runtime. Set PLAYWRIGHT_MODULE and LIASCRIPT_EDITOR_DIR
 * when they are outside node_modules. A VS Code LiaScript preview installation
 * is also discovered automatically. No packages are downloaded by this test.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');

const repository = path.resolve(__dirname, '..');

function findEditor() {
  if (process.env.LIASCRIPT_EDITOR_DIR) return path.resolve(process.env.LIASCRIPT_EDITOR_DIR);
  const local = path.join(repository, 'node_modules/@liascript/editor/dist');
  if (fs.existsSync(path.join(local, 'index.html'))) return local;
  const extensions = path.join(os.homedir(), '.vscode/extensions');
  if (fs.existsSync(extensions)) {
    const candidates = fs.readdirSync(extensions)
      .filter(name => name.startsWith('liascript.liascript-preview-'))
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    for (const name of candidates) {
      const candidate = path.join(extensions, name, 'node_modules/@liascript/editor/dist');
      if (fs.existsSync(path.join(candidate, 'index.html'))) return candidate;
    }
  }
  throw new Error('Set LIASCRIPT_EDITOR_DIR to an existing @liascript/editor/dist directory.');
}

async function startServer(editor) {
  const contentTypes = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.md': 'text/plain; charset=utf-8',
    '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.wasm': 'application/wasm',
  };
  const server = http.createServer((request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const isEditor = pathname.startsWith('/liascript/');
      const root = isEditor ? editor : repository;
      const relativeUrl = isEditor ? pathname.slice('/liascript/'.length) : pathname.slice(1);
      const filename = path.resolve(root, relativeUrl || 'index.html');
      const relative = path.relative(root, filename);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        response.writeHead(403).end();
        return;
      }
      fs.readFile(filename, (error, data) => {
        if (error) {
          response.writeHead(404).end();
          return;
        }
        response.writeHead(200, {
          'Content-Type': contentTypes[path.extname(filename)] || 'application/octet-stream',
          'Cache-Control': 'no-store',
        });
        response.end(request.method === 'HEAD' ? undefined : data);
      });
    } catch {
      response.writeHead(400).end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  return server;
}

async function run() {
  let playwright;
  try {
    playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  } catch {
    throw new Error('Set PLAYWRIGHT_MODULE to an existing Playwright installation (including Chromium).');
  }
  const editor = findEditor();
  assert.ok(fs.existsSync(path.join(editor, 'index.html')), 'LiaScript editor index.html must exist');
  const server = await startServer(editor);
  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true });
    let page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const scrollSpy = () => {
      window.autoscrollingNativeCalls = [];
      const nativeScrollIntoView = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = function (...args) {
        window.autoscrollingNativeCalls.push({
          id: this.id,
          text: this.textContent.trim(),
          effect: this.classList.contains('lia-effect__content'),
          slide: this.closest('main')?.querySelector('header')?.textContent.trim(),
        });
        // Keep real scrolling; a spy that replaces native scrolling can hide
        // regressions caused by the actual runtime/layout interaction.
        return nativeScrollIntoView.apply(this, args);
      };
    };
    await page.addInitScript(scrollSpy);
    const origin = `http://127.0.0.1:${server.address().port}`;
    await page.goto(`${origin}/liascript/index.html?${origin}/dev/autoscrolling-course.md`, {
      waitUntil: 'domcontentloaded',
    });
    await page.locator('#lia-tff-btn-v2').waitFor();
    await page.locator('main:not([hidden]) header').filter({ hasText: 'Default scrolling' }).waitFor();
    assert.equal(await page.locator('#lia-mode-presentation').getAttribute('aria-checked'), 'true');
    const results = [];
    const pause = () => page.waitForTimeout(1100); // LiaScript defers effects, then scrolls smoothly.
    const slideTitle = () => page.locator('main:not([hidden]) header').innerText();
    const snapshot = () => page.evaluate(() => {
      const main = document.querySelector('main:not([hidden])');
      const scroller = main.closest('.lia-slide__container');
      return {
        title: main.querySelector('header').textContent.trim(),
        scrollTop: scroller.scrollTop,
        effectCalls: window.autoscrollingNativeCalls.filter(call => call.effect),
        markerValues: Array.from(document.querySelectorAll('[data-lia-tff-autoscrolling]'))
          .map(marker => marker.getAttribute('data-lia-tff-autoscrolling')),
      };
    });
    async function resetScroll() {
      await page.evaluate(() => {
        const main = document.querySelector('main:not([hidden])');
        main.closest('.lia-slide__container').scrollTop = 80;
      });
      await page.waitForTimeout(100);
    }
    async function reveal(label, enabled) {
      await pause();
      await resetScroll();
      const before = await snapshot();
      await page.locator('#lia-btn-next').click();
      await pause();
      const after = await snapshot();
      const nativeCalls = after.effectCalls.length - before.effectCalls.length;
      const moved = after.scrollTop > before.scrollTop + 100;
      const stationary = Math.abs(after.scrollTop - before.scrollTop) <= 2;
      const pass = after.title === before.title &&
        (enabled ? nativeCalls > 0 && moved : nativeCalls === 0 && stationary);
      results.push({ label, pass, nativeCalls, before: before.scrollTop, after: after.scrollTop });
      return after;
    }
    async function nextSlide(title) {
      await page.locator('#lia-btn-next').click();
      await page.waitForFunction(expected => {
        return document.querySelector('main:not([hidden]) header')?.textContent.trim() === expected;
      }, title);
      await pause();
    }
    async function previousSlide(title) {
      // Board Mode enters earlier slides at their final animation step.
      // Clicking previous again hides that step before changing slides.
      for (let step = 0; step < 15 && (await slideTitle()).trim() !== title; step += 1) {
        await page.locator('#lia-btn-prev').click();
        await pause();
      }
      assert.equal((await slideTitle()).trim(), title, `Could not return to ${title}`);
      assert.equal(await page.locator('main:not([hidden]) .lia-effect__content').count(), 1,
        'Back navigation should re-enter the slide at its final step');
      await page.locator('#lia-btn-prev').click();
      await pause();
      assert.equal((await slideTitle()).trim(), title);
      assert.equal(await page.locator('main:not([hidden]) .lia-effect__content').count(), 0);
    }

    await reveal('default before the first switch', true);
    await nextSlide('Explicit off');
    await reveal('explicit off', false);
    await nextSlide('Inherited off');
    const inheritedOff = await reveal('off inherited after marker unmount', false);
    results.push({ label: 'inactive off marker is really unmounted', pass: inheritedOff.markerValues.length === 0 });
    await nextSlide('Inherited off again');
    await reveal('off inherited across another slide', false);
    await nextSlide('Explicit on');
    await reveal('explicit on', true);
    await nextSlide('Inherited on');
    await reveal('on inherited after marker unmount', true);
    await previousSlide('Inherited off');
    await reveal('back navigation uses the earlier off switch', false);
    await previousSlide('Default scrolling');
    await reveal('back before the first switch restores default on', true);

    // Alt-L reloads the preview after edits. A remembered DOM-only switch
    // must not be lost when reopening the same URL on a later slide.
    await nextSlide('Explicit off');
    await reveal('off before preview reload', false);
    await nextSlide('Inherited off');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('#lia-tff-btn-v2').waitFor();
    await page.locator('main:not([hidden]) header').filter({ hasText: 'Inherited off' }).waitFor();
    await reveal('off inherited after Alt-L-style page reload', false);

    // A fresh context has never rendered the off marker or stored its state.
    await page.close();
    page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(scrollSpy);
    await page.goto(`${origin}/liascript/index.html?${origin}/dev/autoscrolling-course.md#3`, {
      waitUntil: 'domcontentloaded',
    });
    await page.locator('#lia-tff-btn-v2').waitFor();
    await page.locator('main:not([hidden]) header').filter({ hasText: 'Inherited off' }).waitFor();
    await reveal('off inherited on fresh direct entry', false);
    await nextSlide('Inherited off again');
    await reveal('off stays inherited after fresh direct entry', false);

    // A preview refresh must read edited course source rather than keep a
    // remembered off value from the previous revision.
    await previousSlide('Inherited off');
    const editedCourse = fs.readFileSync(path.join(__dirname, 'autoscrolling-course.md'), 'utf8')
      .replace('@autoscrolling(off)', '@autoscrolling(on)');
    await page.route(url => url.pathname === '/dev/autoscrolling-course.md', route => route.fulfill({
      status: 200,
      contentType: 'text/plain; charset=utf-8',
      body: editedCourse,
    }));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('#lia-tff-btn-v2').waitFor();
    await page.locator('main:not([hidden]) header').filter({ hasText: 'Inherited off' }).waitFor();
    await reveal('reload uses edited source instead of stale off state', true);
    await nextSlide('Inherited off again');
    await reveal('edited on switch stays inherited after reload', true);

    // Starting beyond both switches must use the last preceding on switch.
    // The new context also drops the previous page's source-edit route.
    await page.close();
    page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(scrollSpy);
    await page.goto(`${origin}/liascript/index.html?${origin}/dev/autoscrolling-course.md#6`, {
      waitUntil: 'domcontentloaded',
    });
    await page.locator('#lia-tff-btn-v2').waitFor();
    await page.locator('main:not([hidden]) header').filter({ hasText: 'Inherited on' }).waitFor();
    await reveal('fresh direct entry uses the later on switch', true);

    // Let LiaScript render normally, but hold the plugin's later source
    // reread. Advancing now exercises the interval before inheritance is known.
    for (const { slide, title, enabled } of [
      { slide: 3, title: 'Inherited off', enabled: false },
      { slide: 6, title: 'Inherited on', enabled: true },
    ]) {
      await page.close();
      page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(scrollSpy);
      let sourceRequests = 0;
      let pendingSourceRequests = 0;
      let releaseSource;
      const sourceGate = new Promise(resolve => { releaseSource = resolve; });
      await page.route(url => url.pathname === '/dev/autoscrolling-course.md', async route => {
        sourceRequests += 1;
        if (sourceRequests > 1) {
          pendingSourceRequests += 1;
          await sourceGate;
          pendingSourceRequests -= 1;
        }
        await route.continue();
      });
      try {
        await page.goto(`${origin}/liascript/index.html?${origin}/dev/autoscrolling-course.md#${slide}`, {
          waitUntil: 'domcontentloaded',
        });
        await page.locator('#lia-tff-btn-v2').waitFor();
        await page.locator('main:not([hidden]) header').filter({ hasText: title }).waitFor();
        // Do not use reveal(): its settling delay would skip the pending path.
        await page.evaluate(() => {
          document.querySelector('main:not([hidden])').closest('.lia-slide__container').scrollTop = 80;
        });
        const before = await snapshot();
        await page.locator('#lia-btn-next').click();
        await page.waitForTimeout(1000);
        const during = await snapshot();
        const wasPending = pendingSourceRequests > 0;
        await page.waitForTimeout(800);
        releaseSource();
        await page.waitForTimeout(800);
        const after = await snapshot();
        const callsWhilePending = during.effectCalls.length - before.effectCalls.length;
        const nativeCalls = after.effectCalls.length - before.effectCalls.length;
        const stayedStillWhilePending = Math.abs(during.scrollTop - before.scrollTop) <= 2;
        const finalScrollCorrect = enabled
          ? nativeCalls > 0 && after.scrollTop > before.scrollTop + 100
          : nativeCalls === 0 && Math.abs(after.scrollTop - before.scrollTop) <= 2;
        results.push({
          label: `pending source preserves inherited ${enabled ? 'on' : 'off'}`,
          pass: wasPending && sourceRequests >= 2 && callsWhilePending === 0 &&
            stayedStillWhilePending && finalScrollCorrect && after.title === title,
          sourceRequests,
          wasPending,
          callsWhilePending,
          nativeCalls,
          before: before.scrollTop,
          during: during.scrollTop,
          after: after.scrollTop,
        });
      } finally {
        releaseSource();
      }
    }

    results.push({ label: 'no browser runtime errors', pass: errors.length === 0, errors });
    console.log(JSON.stringify({ editor, pass: results.every(result => result.pass), results }, null, 2));
    assert.ok(results.every(result => result.pass), 'Real LiaScript autoscrolling regression failed');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

run().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});

