<!--
author:   MINT-the-GAP, Martin Lommatzsch, Jihad Hyadi
version:  0.0.1
language: de
edit: true
narrator: US English Female
comment:  LiaScript board-mode plugin — full-width presentation layout with font-size slider and mode-conditional content blocks.

script:   ./dist/index.js

@autoscrolling: <div hidden aria-hidden="true" data-lia-tff-autoscrolling="@0"></div>

-->

# Board Mode


@autoscrolling(off)


          --{{0}}--
The board-mode plugin optimizes LiaScript for classroom presentations: it provides an almost full-width layout, font controls, mode-conditional content, scrolling controls, and presenter-remote support.

__Try it on LiaScript:__
https://liascript.github.io/course/?https://raw.githubusercontent.com/MINT-the-GAP/lia-board-mode/main/README.md

__See the project on GitHub:__
https://github.com/MINT-the-GAP/lia-board-mode

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-board-mode/main/README.md`

   or pin to a specific version:

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-board-mode/0.0.1/README.md`

2. Copy the definitions into your project

3. Clone this repository on GitHub

## Features

          --{{0}}--
After importing this plugin your document will automatically:

- Use ~98.5% of the screen width in **Presentation** and **Slides** mode
- Show an **AA button** in the toolbar (Presentation mode only) that opens a font-size slider (14–48 px, persisted in localStorage)
- Auto-boost the font size to 18/24/32 px based on the current base font (can be overridden with the slider)
- Support `data-lia-only` attributes to conditionally show blocks per mode
- Support opt-in horizontal layouts for single- and multiple-choice quizzes
- Toggle automatic scrolling for the current and all following slides
- Support common presenter remotes for slide navigation and black-screen toggling
- Re-enter previous slides at their final animation step when navigating backwards

## `data-lia-only` — Mode-conditional content

          --{{0}}--
Wrap any HTML block in a `<div data-lia-only="MODE">` to make it visible only in that mode.

Supported values: `slides`, `presentation`, `textbook`

``` markdown
<div data-lia-only="slides">
This is only visible in slides mode.
</div>

<div data-lia-only="presentation">
This is only visible in presentation mode.
</div>

<div data-lia-only="textbook">
This is only visible in textbook mode.
</div>
```

---

<div data-lia-only="slides">
**You are in slides mode.**
</div>

<div data-lia-only="presentation">
**You are in presentation mode.**
</div>

<div data-lia-only="textbook">
**You are in textbook mode.**
</div>

## `@autoscrolling(on|off)` — Animation-step scrolling

LiaScript normally scrolls the newly revealed animation step into view. On board-style slides with extra space below the content, that can move the slide much farther down than desired.

Place `@autoscrolling(off)` on a slide to keep the current scroll position when advancing through animation steps. The value applies to that slide and all following slides until another `@autoscrolling(...)` macro changes it. Slides without a macro inherit the most recent value; before the first macro, LiaScript's default behavior (`on`) is used. The plugin remembers switches after LiaScript unloads an inactive slide and resolves later back/forward navigation by course position. Manual scrolling, the table of contents, and notes are not affected.

For a direct jump across slides that LiaScript has never rendered, body macros on the skipped slides are not available to the plugin. Use LiaScript's `persistent: true` setting when such jumps must inherit their switches as well.

``` markdown
## First slide: switch it off

@autoscrolling(off)

{{1}}
- a
- b

{{2}}
> c

## Following slide: still off

No additional macro is required here.

## Later slide: switch it on again

@autoscrolling(on)
```

Use `@autoscrolling(on)` when automatic scrolling should resume. Any value other than `off` is treated as `on`.

## Presenter remotes

Presenter support is active automatically in **Presentation** and **Slides** mode; no macro or configuration is required.

| Presenter button / keyboard key | Action |
| --- | --- |
| Next (`PageDown`) | Advance to the next animation step or slide |
| Previous (`PageUp`) | Return to the previous animation step or slide |
| Black screen (`.` / `Period`, or `B`) | Toggle the black screen on or off |
| `Escape` while the screen is black | Restore the presentation |

The plugin activates LiaScript's own navigation buttons, so animated reveals and the normal slide sequence remain intact. Holding a button does not race through multiple steps. Keyboard events inside inputs, editors, or open dialogs are left untouched. You can continue navigating while the screen is black and reveal the updated slide with the same blackout button.

Backward navigation is animation-aware: `ArrowLeft`, presenter `PageUp`, and the visible Previous arrow open the previous slide at its final animation step. Further Previous actions hide one step at a time. A jump through the table of contents deliberately keeps LiaScript's normal step-zero entry.

To keep LiaScript's internal animation state correct, the catch-up traverses its native animation steps. Scripts, media, or narration attached to those steps can therefore run again when returning to the slide.

The black overlay covers the entire webpage. In browser fullscreen mode (usually `F11`) this means the complete display; without browser fullscreen, browser tabs and the address bar remain visible.

## Implementation

          --{{0}}--
If you prefer not to use `import:`, copy the following block directly into the header of your LiaScript document.

``` markdown
script:   https://cdn.jsdelivr.net/gh/MINT-the-GAP/lia-board-mode@0.0.1/dist/index.js

@autoscrolling: <div hidden aria-hidden='true' data-lia-tff-autoscrolling='@0'></div>
```

## Horizontal single- and multiple-choice quizzes

Place `<!-- horizontal-quiz -->` immediately before a single- or multiple-choice quiz. When enough width is available, the choices share the content width and are separated by vertical lines in the current theme color. On viewports up to 760 px, the quiz uses LiaScript's standard vertical layout.

---

**Multiple choice**

Choose the right options.

<!-- horizontal-quiz -->
-[[ ]] false
-[[ ]] false
-[[X]] right
-[[ ]] false
-[[X]] right

---

**Single choice**

Choose the right option.

<!-- horizontal-quiz -->
-[( )] false
-[(X)] right
-[( )] false
