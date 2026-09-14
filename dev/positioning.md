# Viewport positioning and lia-marker integration

Board-mode separates responsive layout from the magnified visible crop. Pinch
zoom can resize and move the visual viewport without changing the layout
viewport. Browser page zoom, resizing and orientation changes can change the
layout viewport and therefore still affect responsive controls. See the CSSOM
View definitions of [zooming](https://drafts.csswg.org/cssom-view/#zooming) and
[VisualViewport](https://drafts.csswg.org/cssom-view/#visualviewport).

## Coordinate contract

All toolbar anchor rectangles, floating button coordinates and font-panel
coordinates use CSS pixels in the `ROOT_DOC` layout viewport. The visible bounds
are `[offsetLeft, offsetTop, offsetLeft + width, offsetTop + height]`, taken from
`ROOT_WIN.visualViewport`. Without that API, the layout viewport supplies the
bounds and the offsets are zero.

`getBoundingClientRect()` results already use the coordinate basis required by
the root controls. Visual offsets enter the visible bounds once; they are never
added to measured anchor coordinates. The board overlay stays at `(0, 0)`.
Floating controls and the open font panel are clamped against those bounds. The
panel is measured while open, so changes to its content or dimensions do not
leave a stale size cache.

Anchor discovery distinguishes rendered anchors from intersection with the
visible crop. Panning past an anchor does not make it a different toolbar or
produce a synthetic replacement rectangle. Positioning reads current geometry
in its scheduled frame.

Responsive decisions use root media queries: the font control is suppressed at
layout widths up to 680 px or heights up to 520 px; header and narration-band
controls use the 1001 px wide-layout threshold. VisualViewport events request
geometry updates only. They do not toggle these controls, close the font panel
or overwrite the user's header/narration preferences.

UI geometry belongs to `ROOT_DOC`; course operations belong to `CONTENT_DOC`.
Measurements from a content iframe are not used as root toolbar coordinates.
The existing nearest LiaScript shell and LiveEditor preview boundaries remain
in effect, including when the two documents differ.

## Shared marker placement

The compatibility contract targets a marker button with this existing parent:

```css
#lia-hl-ui-overlay-v1 > #lia-hl-btn
```

When both controls are rendered in a supported dock, board-mode owns their
shared geometry. It publishes the following on `ROOT_DOC.documentElement`:

| Attribute / property | Meaning |
| --- | --- |
| `data-lia-tff-marker-dock="stack"` | Collapsed presentation navigation; TOC, font control, then marker vertically |
| `data-lia-tff-marker-dock="inline"` | Expanded toolbar; TOC, marker, then font control horizontally |
| `data-lia-tff-marker-dock="floating"` | TOC outside the header, such as an open nightly sidebar; marker then font control as one floating row |
| `--lia-tff-marker-left` / `--lia-tff-marker-top` | Marker coordinates in the root layout viewport, in CSS pixels |
| `--lia-tff-inline-width` | Reserved inline-slot width; 46 px plus marker width and 8 px when sharing |

The scoped stylesheet sets the marker button to `position: fixed !important`
and uses those coordinates. It leaves the button in its existing overlay, with
its listeners, appearance and marker behavior intact. The marker overlay must
not establish a new fixed-position containing block through transforms or
containment. The verified marker revision has no such rule.

In the stack, a fresh TOC rectangle anchors the font control. The marker follows
with a 6 px gap; the whole pair is clamped together. With the usual 22 px buttons,
this preserves the marker's existing 28 px stack pitch. Neither position depends
on the marker's previous rectangle or the order of independent marker updates.

Inline, the font button stays in the toolbar's layout flow. The slot expands to
94 px for a 40 px marker. The marker sits 8 px before the freshly measured font
button and shares its vertical center. The pair follows the layout together
during panning; independently clamping the marker would separate or overlap
them. The open font panel still stays within the visible bounds when it fits.

When the TOC button lives outside the header, such as in the open nightly
`.lia-toc`, both controls float beside its current rectangle. The marker leads
the row, followed by an 8 px gap and the font button; both share a vertical
center. The desired group starts 8 px after the TOC's right edge and is clamped
as one rectangle against the visual viewport. This floating form reads no
previous marker position, so it also avoids anchor changes caused by independent
marker updates from an earlier frame.

The attribute is removed outside the shared docks or when one control is no
longer rendered, and the inline reservation returns to 46 px. No new marker
runtime API or custom event is assumed. The marker's own panel positioning is
outside this contract.

The compatibility check used these public revisions, confirmed against their
GitHub heads on 2026-09-14:

- [lia-marker button positioning, `ed3da1236c5582c4083f2951fdaa4f83dfc97484`](https://github.com/MINT-the-GAP/lia-marker/blob/ed3da1236c5582c4083f2951fdaa4f83dfc97484/src/ui/button.ts#L125): TOC anchoring, peer visibility and stack order.
- [Marker overlay/button CSS at the same revision](https://github.com/MINT-the-GAP/lia-marker/blob/ed3da1236c5582c4083f2951fdaa4f83dfc97484/src/css/root.css#L12): fixed overlay, absolute button and normal/mini dimensions.
- [Marker observers at the same revision](https://github.com/MINT-the-GAP/lia-marker/blob/ed3da1236c5582c4083f2951fdaa4f83dfc97484/src/index.ts#L333): no observation of the board's custom root properties or dock attribute.
- [Affected course, `3184ab1978075679b6f1ae060474541fbfd1554d`](https://github.com/MINT-the-GAP/Wochenaufgabe/blob/3184ab1978075679b6f1ae060474541fbfd1554d/ABs/Spezi/profil10Lehrer.md#L3): presentation mode and direct imports of both templates.

## Scheduling and idle behavior

Viewport, scroll, resize, relevant DOM changes and UI interactions share the
frame scheduler in `src/ui.ts`. It coalesces requested positioning and measures
the viewport once for the positioning pass. Resize and orientation events also
refresh responsive state. DOM observers filter for relevant shell, course and
control changes, and resize observation follows replaced toolbar/content nodes.

Own control geometry, unchanged CSS properties and unrelated text counters must
not sustain observer work. CSS values are compared before writing. There is no
periodic toolbar-position polling; relevant future changes request new work.

## Verification

Run from the repository root after installing its existing development
dependencies:

```sh
node dev/test-viewport-dom.cjs
npx tsc --noEmit
npm run build
node dev/test-viewport-runtime.cjs
```

The browser tests require an available Playwright installation and Chrome.
`PLAYWRIGHT_MODULE` can point to an existing Playwright package;
`BROWSER_CHANNEL` selects another installed Chromium channel. The DOM test does not
download browsers or contact course websites. It transpiles the source modules
and uses real browser layout in a controlled LiaScript shell fixture. Its marker
fixture exercises the positioning contract and legacy style writes; it does
not load the complete external marker runtime.

The separate runtime test requires network access to LiaScript nightly and the
pinned marker resources. It serves this repository's README and freshly built
`dist/index.js` through request interception, loading them in a small test course
with the official runtime and actual marker. It exercises floating and stacked
placement at several native viewport scale factors, font changes and navigation.
Its scale changes use CDP; that integration path is separate from the emulated
two-finger gesture in the DOM test.

Keep deterministic tests with a mocked VisualViewport distinct from browser
tests using the native viewport and CDP touch emulation. Run only the latter with
`node dev/test-viewport-dom.cjs --native-only`. This path sends two touch points
and expanding `touchMove` events through `Input.dispatchTouchEvent` to pinch,
then sends one-finger movement to pan. Chromium updates its native visual
viewport; the test does not replace it or directly assign the scale.

On 2026-09-14, this native Chrome path was exercised at approximately 3.45x zoom
with layout width 1280 px and visual width below 520 px: font/header/narration
visibility stayed unchanged, and a touch pan reached visual offsets around
(303, 163) while the font panel remained open and within the visible bounds.
These were emulated two-finger pinch and one-finger pan gestures in the local
browser fixture. Physical Android/iOS devices, Safari and the complete remote
course with all imported templates were not checked by that run. Report
subsequent runs and device coverage explicitly instead of treating deterministic
geometry tests as hardware tests.

The completed regression run on 2026-09-14 passed:

- 99 viewport assertions, including offset content iframes, all three marker
  docks, real viewport-size changes, font persistence, mode changes and idle
  checks (no own style mutations; unrelated attributes schedule no frames).
- Four checks with the official LiaScript nightly runtime and the real marker
  revision above: floating dock at page scales 1/1.5/2/3, native TOC close,
  collapsed-navigation stack at scales 3/2/1, and native slide navigation with a
  persisted 31 px font. These runtime scales use CDP page-scale emulation; the
  separate fixture run supplies the actual emulated two-finger gesture.
- Existing header, presenter/keyboard, TOC and LiveEditor preview regressions
  (`node dev/test-layout-previews.cjs`), the autoscrolling source/runtime suites,
  and author-comment DOM plus course/nightly suites.
- `tsc --noEmit`, `git diff --check`, and the prescribed `npm run build`.

For a physical touch/browser integration check, load the affected course with
the newly built board bundle and check:

1. Pinch across visual widths of 1001 and 680 px and a height of 520 px while the
   layout viewport stays fixed. Control visibility and band preferences remain
   unchanged.
2. Open the font panel, zoom and pan in both directions. Check its visible
   bounds and the absence of a second offset translation.
3. Repeat with lia-marker and inline, floating and collapsed navigation. Check
   ordering, spacing, marker interaction and slot restoration on mode changes.
4. Resize the actual window and rotate the device across the layout thresholds.
   Responsive controls must still update.
5. Change slides, adjust the slider, use keyboard navigation and Escape, and
   toggle header/narration controls. Confirm saved font size is preserved.
6. Let the page settle and inspect mutation/frame activity. Repeated own style
   changes must not cause a continuous positioning cycle.
