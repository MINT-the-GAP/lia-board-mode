<!--
author:   MINT-the-GAP
version:  0.0.1
language: en
edit: true
narrator: US English Female
comment:  LiaScript board-mode plugin — full-width presentation layout with font-size slider and mode-conditional content blocks.

script:   ./dist/index.js

-->

# Board Mode

          --{{0}}--
The board-mode plugin does two things: it expands the content area to (almost) full screen width in presentation and slides mode, and it adds a font-size slider button in the toolbar. It also lets you show different content blocks depending on the current view mode.

__Try it on LiaScript:__
https://liascript.github.io/course/?https://raw.githubusercontent.com/MINT-the-GAP/liascript-board-mode/main/README.md

__See the project on GitHub:__
https://github.com/MINT-the-GAP/liascript-board-mode

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/MINT-the-GAP/liascript-board-mode/main/README.md`

   or pin to a specific version:

   `import: https://raw.githubusercontent.com/MINT-the-GAP/liascript-board-mode/0.0.1/README.md`

2. Copy the definitions into your project

3. Clone this repository on GitHub

## Features

          --{{0}}--
After importing this plugin your document will automatically:

- Use ~98.5% of the screen width in **Presentation** and **Slides** mode
- Show an **AA button** in the toolbar (Presentation mode only) that opens a font-size slider (14–48 px, persisted in localStorage)
- Auto-boost the font size to 18/24/32 px based on the current base font (can be overridden with the slider)
- Support `data-lia-only` attributes to conditionally show blocks per mode

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

## Implementation

          --{{0}}--
If you prefer not to use `import:`, copy the following block directly into the header of your LiaScript document.

``` markdown
script:   https://cdn.jsdelivr.net/gh/MINT-the-GAP/liascript-board-mode@0.0.1/dist/index.js
```
