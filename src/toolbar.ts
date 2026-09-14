// Toolbar geometry: viewport, dock-target resolution, button placement logic, and toolbar signature.

import { ROOT_WIN, ROOT_DOC, BTN_ID, INLINE_SLOT_ID } from "./state";

export function getToolbarHeader(): Element | null {
  return ROOT_DOC.querySelector("header#lia-toolbar-nav") ||
    ROOT_DOC.querySelector("#lia-toolbar-nav") ||
    ROOT_DOC.querySelector("header.lia-header");
}

export function getToolbarLeftContainer(): Element | null {
  const header = getToolbarHeader();
  if (!header) return null;
  return header.querySelector(".lia-header__left") || header;
}

export type Viewport = { w: number; h: number; ox: number; oy: number };

/** Layout dimensions underpin CSS media queries; pinch zoom does not resize them. */
export function getLayoutViewport(): Viewport {
  const de = ROOT_DOC.documentElement;
  return { w: de.clientWidth || ROOT_WIN.innerWidth, h: de.clientHeight || ROOT_WIN.innerHeight, ox: 0, oy: 0 };
}

/** Visible bounds in layout CSS pixels, just like getBoundingClientRect(). */
export function getViewport(): Viewport {
  const vv = ROOT_WIN.visualViewport;
  if (vv) {
    return { w: vv.width, h: vv.height, ox: vv.offsetLeft || 0, oy: vv.offsetTop || 0 };
  }
  return getLayoutViewport();
}

export function getVisibleRect(el: Element | null, vp = getViewport()): DOMRect | null {
  if (!el) return null;
  try {
    const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
    if (!cs || cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return null;

    const r = el.getBoundingClientRect();
    if (!r || r.width < 6 || r.height < 6) return null;

    if (r.right <= vp.ox || r.bottom <= vp.oy || r.left >= vp.ox + vp.w || r.top >= vp.oy + vp.h) return null;

    return r;
  } catch (e) {
    return null;
  }
}

export function getRectLoose(el: Element | null, vp = getViewport()): DOMRect | null {
  if (!el) return null;
  try {
    const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
    if (!cs) return null;
    if (cs.display === "none" || cs.visibility === "hidden") return null;

    const r = el.getBoundingClientRect();
    if (!r || r.width < 2 || r.height < 2) return null;

    if (r.right <= vp.ox || r.bottom <= vp.oy || r.left >= vp.ox + vp.w || r.top >= vp.oy + vp.h) return null;

    return r;
  } catch (e) {
    return null;
  }
}

// Anchor identity follows the layout, not the currently magnified crop. Always
// measure the current element; never synthesize a peer rect from offsetParent data.
function getAnchorRect(el: Element | null): DOMRect | null {
  return getVisibleRect(el, getLayoutViewport());
}

export function isNightlyNavigationHidden(): boolean {
  const canvas = ROOT_DOC.querySelector(".lia-canvas");
  return !!(canvas && canvas.classList.contains("lia-navigation--hidden"));
}

export function syncNightlyMiniMode(): void {
  try {
    const body = ROOT_DOC.body;
    if (!body) return;
    const mini = isNightlyNavigationHidden();
    if (body.classList.contains("lia-tff-nightly-mini") !== mini) {
      body.classList.toggle("lia-tff-nightly-mini", mini);
    }
  } catch (e) { }
}

export function getTFFTOCButton(): Element | null {
  const byId = ROOT_DOC.getElementById("lia-btn-toc");
  if (byId) return byId;

  const host = getToolbarLeftContainer();
  if (!host) return null;

  const btns = Array.from(host.querySelectorAll("button,[role='button'],a"));
  return btns.find(b => {
    const t = (
      (b.getAttribute("aria-label") || "") + " " +
      (b.getAttribute("title") || "") + " " +
      (b.textContent || "")
    ).toLowerCase();

    return (
      t.includes("inhaltsverzeichnis") ||
      t.includes("table of contents") ||
      t.includes("contents")
    );
  }) || null;
}

export function getTFFTOCButtonRect(): DOMRect | null {
  return getAnchorRect(getTFFTOCButton());
}

export function shouldUseTFFNightlyStackDock(): boolean {
  const canvas = ROOT_DOC.querySelector(".lia-canvas");
  if (!canvas) return false;
  return canvas.classList.contains("lia-navigation--hidden") &&
    canvas.classList.contains("lia-mode--presentation");
}

export function shouldUseInlineStripDock(): boolean {
  if (shouldUseTFFNightlyStackDock()) return false;
  const host = getToolbarLeftContainer();
  const tocBtn = getTFFTOCButton();
  return !!(host && tocBtn && host.contains(tocBtn));
}

export function ensureInlineDockSlot(): Element | null {
  const host = getToolbarLeftContainer();
  const tocBtn = getTFFTOCButton();

  if (!host || !tocBtn || !host.contains(tocBtn)) return null;

  let slot = ROOT_DOC.getElementById(INLINE_SLOT_ID);
  if (!slot) {
    slot = ROOT_DOC.createElement("div");
    slot.id = INLINE_SLOT_ID;
  }

  if (slot.parentNode !== host || slot.previousElementSibling !== tocBtn) {
    tocBtn.insertAdjacentElement("afterend", slot);
  }

  return slot;
}

export function getHighlightRect(): DOMRect | null {
  return getAnchorRect(ROOT_DOC.getElementById("lia-hl-btn"));
}

export function getToolbarBandRect(): DOMRect | null {
  const leftC = getToolbarLeftContainer();
  const leftR = getAnchorRect(leftC);
  if (leftR) return leftR;
  return getAnchorRect(getToolbarHeader());
}

export function getVirtualHighlightSlotRect(): { left: number; top: number; right: number; bottom: number; width: number; height: number } | null {
  const band = getToolbarBandRect();
  if (!band) return null;

  const size = 34;
  const insetLeft = 8;

  return {
    left: band.left + insetLeft,
    top: band.top + (band.height - size) / 2,
    right: band.left + insetLeft + size,
    bottom: band.top + (band.height - size) / 2 + size,
    width: size,
    height: size
  };
}

export type Peer = { el: Element; r: DOMRect };
export type DockTarget = {
  kind: string;
  rect: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number };
  peers: Peer[];
};

export function getStableLeftToolbarPeers(): Peer[] {
  const vp = getLayoutViewport();
  const leftC = getToolbarLeftContainer();
  if (!leftC) return [];

  const out: Peer[] = [];
  const els = Array.from(leftC.querySelectorAll("button,[role='button'],a"));

  for (const el of els) {
    if (!el || el.id === BTN_ID) continue;
    const r = getAnchorRect(el);
    if (!r) continue;
    if (r.top > 220) continue;
    if (r.left > vp.w * 0.60) continue;
    if (r.width > 220 || r.height > 100) continue;
    out.push({ el, r });
  }

  out.sort((a, b) => (a.r.left - b.r.left) || (a.r.top - b.r.top));

  if (!out.length) return out;

  const baseMidY = out[0].r.top + out[0].r.height / 2;
  const yTol = Math.max(20, out[0].r.height * 0.9);

  return out.filter(p => {
    const midY = p.r.top + p.r.height / 2;
    return Math.abs(midY - baseMidY) <= yTol;
  });
}

export function getTOCDockSlot(): DockTarget | null {
  const gap = 8;
  const pad = 8;

  const toc = ROOT_DOC.getElementById("lia-toc");
  const tocBtn = ROOT_DOC.getElementById("lia-btn-toc");
  const tocBtnRect = getRectLoose(tocBtn, getLayoutViewport());
  const nightly = isNightlyNavigationHidden();
  const size = nightly ? 22 : 34;

  if (!tocBtnRect) return null;

  if (nightly) {
    const left = tocBtnRect.left + (tocBtnRect.width - size) / 2;
    const top = tocBtnRect.bottom + gap;

    return {
      kind: "toc-open-slot",
      rect: {
        left: Math.max(pad, left),
        top: Math.max(pad, top),
        right: Math.max(pad, left) + size,
        bottom: Math.max(pad, top) + size,
        width: size,
        height: size
      },
      peers: [{ el: tocBtn!, r: tocBtnRect }]
    };
  }

  if (toc && toc.classList.contains("lia-toc--open")) {
    const left = tocBtnRect.right + gap;
    const top = tocBtnRect.top + (tocBtnRect.height - size) / 2;

    return {
      kind: "toc-open-slot",
      rect: {
        left,
        top: Math.max(pad, top),
        right: left + size,
        bottom: Math.max(pad, top) + size,
        width: size,
        height: size
      },
      peers: [{ el: tocBtn!, r: tocBtnRect }]
    };
  }

  return {
    kind: "toc-button",
    rect: tocBtnRect,
    peers: [{ el: tocBtn!, r: tocBtnRect }]
  };
}

export function getDockTarget(): DockTarget | null {
  const hlRect = getHighlightRect();
  if (hlRect) {
    return {
      kind: "highlight",
      rect: hlRect as DOMRect,
      peers: [{ el: ROOT_DOC.getElementById("lia-hl-btn")!, r: hlRect as DOMRect }]
    };
  }

  const peers = getStableLeftToolbarPeers();
  if (peers.length) {
    let rightMost = peers[0].r;
    for (const p of peers) {
      if (p.r.right > rightMost.right) rightMost = p.r;
    }
    return { kind: "toolbar-row", rect: rightMost, peers };
  }

  const tocDock = getTOCDockSlot();
  if (tocDock) return tocDock;

  const virtualRect = getVirtualHighlightSlotRect();
  if (virtualRect) {
    return { kind: "virtual-highlight-slot", rect: virtualRect, peers: [] };
  }

  return null;
}
