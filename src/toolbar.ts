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

export function getViewport() {
  const vv = ROOT_WIN.visualViewport;
  if (vv) {
    return { w: vv.width, h: vv.height, ox: vv.offsetLeft || 0, oy: vv.offsetTop || 0 };
  }
  const de = ROOT_DOC.documentElement;
  return { w: de.clientWidth, h: de.clientHeight, ox: 0, oy: 0 };
}

export function getVisibleRect(el: Element | null): DOMRect | null {
  if (!el) return null;
  try {
    const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
    if (!cs || cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return null;

    const r = el.getBoundingClientRect();
    if (!r || r.width < 6 || r.height < 6) return null;

    const vp = getViewport();
    if (r.right < 0 || r.bottom < 0 || r.left > vp.w || r.top > vp.h) return null;

    return r;
  } catch (e) {
    return null;
  }
}

export function getRectLoose(el: Element | null): DOMRect | null {
  if (!el) return null;
  try {
    const cs = ROOT_WIN.getComputedStyle(el as HTMLElement);
    if (!cs) return null;
    if (cs.display === "none" || cs.visibility === "hidden") return null;

    const r = el.getBoundingClientRect();
    if (!r || r.width < 2 || r.height < 2) return null;

    const vp = getViewport();
    if (r.right < 0 || r.bottom < 0 || r.left > vp.w || r.top > vp.h) return null;

    return r;
  } catch (e) {
    return null;
  }
}

export function isSaneTopLeftRect(r: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number } | null): boolean {
  if (!r) return false;
  const vp = getViewport();
  if (!isFinite(r.left) || !isFinite(r.top) || !isFinite(r.right) || !isFinite(r.bottom)) return false;
  if (r.width < 6 || r.height < 6) return false;
  if (r.top < -20 || r.top > 220) return false;
  if (r.left < -20) return false;
  if (r.left > vp.w * 0.60) return false;
  if (r.right > vp.w + 120) return false;
  if (r.bottom > vp.h + 120) return false;
  return true;
}

export function isNightlyNavigationHidden(): boolean {
  const canvas = ROOT_DOC.querySelector(".lia-canvas");
  return !!(canvas && canvas.classList.contains("lia-navigation--hidden"));
}

export function syncNightlyMiniMode(): void {
  try {
    if (!ROOT_DOC.body) return;
    ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini", isNightlyNavigationHidden());
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
  const tocBtn = getTFFTOCButton();
  if (!tocBtn) return null;
  try {
    const r = tocBtn.getBoundingClientRect();
    if (!r || r.width < 6 || r.height < 6) return null;
    return r;
  } catch (e) {
    return null;
  }
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

export function getHighlightRect(): ({ left: number; top: number; right: number; bottom: number; width: number; height: number } & { isSynthetic?: boolean }) | DOMRect | null {
  const btn = ROOT_DOC.getElementById("lia-hl-btn");
  if (!btn) return null;

  let r: DOMRect | null = null;
  try { r = btn.getBoundingClientRect(); } catch (e) { r = null; }

  if (isSaneTopLeftRect(r)) return r;

  const leftC = getToolbarLeftContainer() || btn.parentElement || getToolbarHeader();
  if (!leftC) return null;

  const c = getVisibleRect(leftC);
  if (!c) return null;

  const bw = Math.max(34, (btn as HTMLElement).offsetWidth || 0);
  const bh = Math.max(34, (btn as HTMLElement).offsetHeight || 0);
  const ox = (btn as HTMLElement).offsetLeft || 0;
  const oy = typeof (btn as HTMLElement).offsetTop === "number"
    ? (btn as HTMLElement).offsetTop
    : Math.max(0, (c.height - bh) / 2);

  const synthetic = {
    left: c.left + ox,
    top: c.top + oy,
    right: c.left + ox + bw,
    bottom: c.top + oy + bh,
    width: bw,
    height: bh
  };

  if (isSaneTopLeftRect(synthetic)) return synthetic;

  return {
    left: c.left + 8,
    top: c.top + Math.max(0, (c.height - 34) / 2),
    right: c.left + 8 + 34,
    bottom: c.top + Math.max(0, (c.height - 34) / 2) + 34,
    width: 34,
    height: 34
  };
}

// Dead code — kept for reference but never called
export function isTOCOpen(): boolean {
  const toc = ROOT_DOC.getElementById("lia-toc");
  if (!toc) return false;
  return toc.classList.contains("lia-toc--open");
}

// Dead code — superseded by getTFFTOCButtonRect
export function getTOCButtonRect(): DOMRect | null {
  return getVisibleRect(ROOT_DOC.getElementById("lia-btn-toc"));
}

export function getToolbarBandRect(): DOMRect | null {
  const leftC = getToolbarLeftContainer();
  const leftR = getVisibleRect(leftC);
  if (leftR) return leftR;
  return getVisibleRect(getToolbarHeader());
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
  const vp = getViewport();
  const leftC = getToolbarLeftContainer();
  if (!leftC) return [];

  const out: Peer[] = [];
  const els = Array.from(leftC.querySelectorAll("button,[role='button'],a"));

  for (const el of els) {
    if (!el || el.id === BTN_ID) continue;
    const r = getVisibleRect(el);
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
  const tocBtnRect = getRectLoose(tocBtn);
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

export function toolbarSignature(): string | null {
  try {
    const vp = getViewport();
    const dock = getDockTarget();

    if (!dock) {
      return [Math.round(vp.w), Math.round(vp.h), Math.round(vp.ox), Math.round(vp.oy), "none"].join("|");
    }

    const r = dock.rect;
    const count = dock.peers ? dock.peers.length : 0;

    return [
      Math.round(vp.w), Math.round(vp.h), Math.round(vp.ox), Math.round(vp.oy),
      dock.kind,
      Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom),
      Math.round(r.width), Math.round(r.height),
      count
    ].join("|");
  } catch (e) {
    return null;
  }
}
