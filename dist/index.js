!function(t,e,n,o,r){var i="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof i[o]&&i[o],a=l.i||{},s=l.cache||{},p="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(e,n){if(!s[e]){if(!t[e]){if(r[e])return r[e];var a="function"==typeof i[o]&&i[o];if(!n&&a)return a(e,!0);if(l)return l(e,!0);if(p&&"string"==typeof e)return p(e);var f=Error("Cannot find module '"+e+"'");throw f.code="MODULE_NOT_FOUND",f}c.resolve=function(n){var o=t[e][1][n];return null!=o?o:n},c.cache={};var d=s[e]=new u.Module(e);t[e][0].call(d.exports,c,d,d.exports,i)}return s[e].exports;function c(t){var e=c.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],o=t[1],r=t[2]||t[0],i=u(o);"*"===e?Object.keys(i).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return i[t]}})}):"*"===r?Object.defineProperty(n,e,{enumerable:!0,value:i}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===r?i.__esModule?i.default:i:i[r]}})}),n}return u(e)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.require=p,this.exports={}},u.modules=t,u.cache=s,u.parent=l,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=a,u.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return i[o]}}),i[o]=u;for(var f=0;f<e.length;f++)u(e[f]);if(n){var d=u(n);"object"==typeof exports&&"u">typeof module?module.exports=d:"function"==typeof define&&define.amd&&define(function(){return d})}}({"8RSWf":[function(t,e,n,o){var r=t("./state"),i=t("./mode"),l=t("./css"),a=t("./font"),s=t("./toolbar"),p=t("./ui"),u=t("./events"),f=t("./modeOnly");function d(){r.I.ticking||(r.I.ticking=!0,r.ROOT_WIN.requestAnimationFrame(()=>{try{(0,l.ensureContentCSS)(),(0,l.ensureRootCSS)();let t=(0,i.safeGetSettingsRaw)(),e=(0,i.detectMode)();(0,i.applyModeAttr)(e),(0,l.syncAccent)(),(0,p.ensureUI)(),(0,s.syncNightlyMiniMode)(),(0,p.placeButtonInCorrectHost)();let n=(0,p.setPresentationOnlyVisibility)(e),o=null===r.I.lastShow||n!==r.I.lastShow;r.I.lastShow=n;let f=(0,s.toolbarSignature)(),d=!!(f&&f!==r.I.lastToolbarSig);r.I.lastToolbarSig=f||r.I.lastToolbarSig,!n&&d&&(r.I.pendingReposition=!0),(0,p.positionOverlayButton)(),n&&(0,p.positionPanel)();let c=e!==r.I.lastMode||t!==r.I.lastSettingsRaw;c&&((0,a.applyFontLogic)(e),r.I.lastMode=e,r.I.lastSettingsRaw=t),(o||d||c||r.I.pendingReposition)&&(r.I.pendingReposition=!1,(0,u.burstRepositionThrottled)()),(0,a.syncSliderToCurrent)(),n&&(0,p.positionPanel)(),(0,u.wireOnce)()}finally{r.I.ticking=!1}}))}(0,r.initInstance)()&&((0,u.initEvents)(d),d(),(0,f.initModeOnly)(()=>r.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU"}],jPEty:[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function i(){let t=window;try{for(;t.parent&&t.parent!==t;)t=t.parent}catch(t){}return t}r.defineInteropFlag(n),r.export(n,"getRootWindow",()=>i),r.export(n,"ROOT_WIN",()=>l),r.export(n,"ROOT_DOC",()=>a),r.export(n,"CONTENT_WIN",()=>s),r.export(n,"CONTENT_DOC",()=>p),r.export(n,"REG",()=>f),r.export(n,"DOC_ID",()=>d),r.export(n,"I",()=>c),r.export(n,"initInstance",()=>m),r.export(n,"SETTINGS_KEY",()=>h),r.export(n,"FONT_KEY",()=>g),r.export(n,"OVERLAY_ID",()=>y),r.export(n,"BTN_ID",()=>O),r.export(n,"PANEL_ID",()=>x),r.export(n,"SLIDER_ID",()=>b),r.export(n,"TITLE_ID",()=>T),r.export(n,"INLINE_SLOT_ID",()=>_),r.export(n,"clamp",()=>I),r.export(n,"clearPosTimers",()=>v);let l=i(),a=l.document,s=window,p=document,u="__LIA_TFF_REG_V2__";l[u]=l[u]||{instances:{}};let f=l[u],d=(p.baseURI||s.location.href||"")+"::"+(p.title||""),c=null;function m(){return!f.instances[d]?.__alive&&(c={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1},f.instances[d]=c,!0)}let h="settings",g="lia-tff-font-px-v2",y="lia-tff-overlay-v2",O="lia-tff-btn-v2",x="lia-tff-panel-v2",b="lia-tff-slider-v2",T="lia-tff-title-v2",_="lia-tff-inline-slot-v2";function I(t,e,n){return Math.max(e,Math.min(n,t))}function v(){try{for(c.posTimers||(c.posTimers=[]);c.posTimers.length;)l.clearTimeout(c.posTimers.pop())}catch(t){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,n,o){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}],aGLfG:[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"norm",()=>l),r.export(n,"safeGetSettingsRaw",()=>a),r.export(n,"findModeInJson",()=>s),r.export(n,"detectMode",()=>p),r.export(n,"applyModeAttr",()=>u);var i=t("./state");function l(t){return String(null==t?"":t).toLowerCase()}function a(){try{return localStorage.getItem(i.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set;return function t(n){if(null==n)return null;if("string"==typeof n){let t=l(n);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof n||e.has(n))return null;for(let o in e.add(n),n){if(!Object.prototype.hasOwnProperty.call(n,o))continue;let e=l(o);if("mode"===e||"view"===e||"layout"===e||"format"===e){let e=t(n[o]);if(e)return e}}for(let e in n){if(!Object.prototype.hasOwnProperty.call(n,e))continue;let o=t(n[e]);if(o)return o}return null}(t)}function p(){let t=a();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(n){let e=l(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function u(t){try{i.CONTENT_DOC.documentElement.dataset.liaMode=t}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureStyle",()=>l),r.export(n,"setVar",()=>a),r.export(n,"getLiaAccentColor",()=>s),r.export(n,"syncAccent",()=>p),r.export(n,"ensureContentCSS",()=>f),r.export(n,"ensureRootCSS",()=>c);var i=t("./state");function l(t,e,n){try{if(!t||t.getElementById(e))return;let o=t.createElement("style");o.id=e,o.textContent=n,(t.head||t.documentElement).appendChild(o)}catch(t){}}function a(t,e,n){try{t.documentElement.style.setProperty(e,n)}catch(t){}}function s(t){try{let e=t||document,n=e.body||e.documentElement,o=e.querySelector(".lia-btn");if(o){let t=getComputedStyle(o).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let r=e.createElement("button");r.className="lia-btn",r.type="button",r.textContent="x",r.style.position="absolute",r.style.left="-9999px",r.style.top="-9999px",r.style.visibility="hidden",n.appendChild(r);let i=getComputedStyle(r).backgroundColor;if(r.remove(),i&&"rgba(0, 0, 0, 0)"!==i&&"transparent"!==i)return i}catch(t){}return null}function p(){let t=s(i.ROOT_DOC)||s(i.CONTENT_DOC)||"rgb(11,95,255)";a(i.ROOT_DOC,"--lia-tff-accent",t),a(i.CONTENT_DOC,"--lia-tff-accent",t)}let u=`
:root{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 15px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 15px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 15px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 15px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="presentation"] body,
html[data-lia-mode="slides"] body{
  margin: 0 !important;
  overflow-x: hidden !important;
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  box-sizing: border-box !important;

  width: min(
    var(--lia-tff-maxw),
    calc(100vw - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  max-width: min(
    var(--lia-tff-maxw),
    calc(100vw - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  margin-left: var(--lia-tff-left-gap) !important;
  margin-right: var(--lia-tff-right-gap) !important;

  padding-left: var(--lia-tff-pad-left) !important;
  padding-right: var(--lia-tff-pad-right) !important;
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  font-size: var(--lia-tff-font) !important;
}
`;function f(){l(i.CONTENT_DOC,"lia-tff-style-content-v2",u)}let d=`
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#${i.OVERLAY_ID}{
  position: fixed !important;
  z-index: 99999980 !important;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none !important;
}

#${i.BTN_ID}{
  pointer-events: auto !important;
  position: absolute !important;
  width: 34px !important;
  height: 34px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 0 !important;
  background: transparent !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#${i.INLINE_SLOT_ID}{
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  width: 46px !important;
  min-width: 46px !important;
  max-width: 46px !important;
  height: 34px !important;
  min-height: 34px !important;
  box-sizing: border-box !important;
  padding-right: 2px !important;
  overflow: visible !important;
  flex: 0 0 46px !important;
  pointer-events: none !important;
}

#${i.INLINE_SLOT_ID} > #${i.BTN_ID}{
  position: relative !important;
  left: auto !important;
  top: auto !important;
  margin: 0 !important;
}

body.lia-navigation--hidden #lia-toolbar-nav .lia-header__left{
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  width: 46px !important;
  min-width: 46px !important;
  gap: 6px !important;
  overflow: visible !important;
}

body.lia-navigation--hidden #lia-tff-btn-v2{
  width: 22px !important;
  height: 22px !important;
}

body.lia-tff-nightly-mini #${i.BTN_ID}{
  width: 22px !important;
  height: 22px !important;
  border-radius: 6px !important;
}

body.lia-tff-nightly-mini #${i.BTN_ID} .tffA-small{
  left: 0px !important;
  top: 2px !important;
  font-size: 15px !important;
}

body.lia-tff-nightly-mini #${i.BTN_ID} .tffA-big{
  left: 5px !important;
  top: -2px !important;
  font-size: 18px !important;
}

#${i.BTN_ID}:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 12%, transparent) !important;
}
#${i.BTN_ID}:active{
  background: color-mix(in srgb, var(--lia-tff-accent) 18%, transparent) !important;
}
#${i.BTN_ID}:focus,
#${i.BTN_ID}:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

#${i.BTN_ID} .tffA-small,
#${i.BTN_ID} .tffA-big{
  position: absolute !important;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}

#${i.BTN_ID} .tffA-small{
  left: 2px !important;
  top: 3px !important;
  font-size: 24px !important;
  color: var(--lia-tff-accent) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.25) !important;
  opacity: .95 !important;
}

#${i.BTN_ID} .tffA-big{
  left: 10px !important;
  top: -2px !important;
  font-size: 30px !important;
  color: #fff !important;
  text-shadow: 0 2px 3px rgba(0,0,0,.45) !important;
  opacity: .98 !important;
}

#${i.PANEL_ID}{
  position: fixed !important;
  z-index: 99999979 !important;
  width: 240px !important;
  padding: 12px 14px !important;
  display: none !important;
  border-radius: 14px !important;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent) !important;
  background: color-mix(in srgb, rgba(0, 0, 0, 0.65) 65%, transparent) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 16px 42px rgba(0,0,0,.18) !important;
}

body.lia-tff-panel-open #${i.PANEL_ID}{
  display: block !important;
}

#${i.TITLE_ID}{
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  margin: 0 0 10px 0 !important;
  letter-spacing: .2px !important;
}

#${i.PANEL_ID} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}
`;function c(){l(i.ROOT_DOC,"lia-tff-style-root-v2",d)}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getSavedFontPx",()=>s),r.export(n,"setPresFontPx",()=>p),r.export(n,"applyFontLogic",()=>f),r.export(n,"syncSliderToCurrent",()=>d);var i=t("./state"),l=t("./css");let a=[18,24,32];function s(){try{let t=localStorage.getItem(i.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function p(t){(0,l.setVar)(i.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let u=!1;function f(t){let e="presentation"===t;if(!(e||"slides"===t))return void p(null);if(e){let t=s();if(null!=t)return void p((0,i.clamp)(t,14,48))}u||(u=!0,p(null),i.CONTENT_WIN.requestAnimationFrame(function(){i.CONTENT_WIN.requestAnimationFrame(function(){var t;let e;p(a[(t=isNaN(e=parseFloat(getComputedStyle(i.CONTENT_DOC.querySelector("main")||i.CONTENT_DOC.documentElement).fontSize||"16"))?16:e)<=17?0:t<=19?1:2]),u=!1})}))}function d(){let t=i.ROOT_DOC.getElementById(i.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),o=s();if(null!=o){t.value=String((0,i.clamp)(o,e,n));return}let r=parseInt(getComputedStyle(i.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(r)&&(t.value=String((0,i.clamp)(r,e,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getToolbarHeader",()=>l),r.export(n,"getToolbarLeftContainer",()=>a),r.export(n,"getViewport",()=>s),r.export(n,"getVisibleRect",()=>p),r.export(n,"getRectLoose",()=>u),r.export(n,"isSaneTopLeftRect",()=>f),r.export(n,"isNightlyNavigationHidden",()=>d),r.export(n,"syncNightlyMiniMode",()=>c),r.export(n,"getTFFTOCButton",()=>m),r.export(n,"getTFFTOCButtonRect",()=>h),r.export(n,"shouldUseTFFNightlyStackDock",()=>g),r.export(n,"shouldUseInlineStripDock",()=>y),r.export(n,"ensureInlineDockSlot",()=>O),r.export(n,"getHighlightRect",()=>x),r.export(n,"getToolbarBandRect",()=>b),r.export(n,"getVirtualHighlightSlotRect",()=>T),r.export(n,"getStableLeftToolbarPeers",()=>_),r.export(n,"getTOCDockSlot",()=>I),r.export(n,"getDockTarget",()=>v),r.export(n,"toolbarSignature",()=>D);var i=t("./state");function l(){return i.ROOT_DOC.querySelector("header#lia-toolbar-nav")||i.ROOT_DOC.querySelector("#lia-toolbar-nav")||i.ROOT_DOC.querySelector("header.lia-header")}function a(){let t=l();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=i.ROOT_WIN.visualViewport;if(t)return{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0};let e=i.ROOT_DOC.documentElement;return{w:e.clientWidth,h:e.clientHeight,ox:0,oy:0}}function p(t){if(!t)return null;try{let e=i.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility||"0"===e.opacity)return null;let n=t.getBoundingClientRect();if(!n||n.width<6||n.height<6)return null;let o=s();if(n.right<0||n.bottom<0||n.left>o.w||n.top>o.h)return null;return n}catch(t){return null}}function u(t){if(!t)return null;try{let e=i.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility)return null;let n=t.getBoundingClientRect();if(!n||n.width<2||n.height<2)return null;let o=s();if(n.right<0||n.bottom<0||n.left>o.w||n.top>o.h)return null;return n}catch(t){return null}}function f(t){if(!t)return!1;let e=s();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function d(){let t=i.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function c(){try{if(!i.ROOT_DOC.body)return;i.ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini",d())}catch(t){}}function m(){let t=i.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=a();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function h(){let t=m();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}function g(){let t=i.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function y(){if(g())return!1;let t=a(),e=m();return!!(t&&e&&t.contains(e))}function O(){let t=a(),e=m();if(!t||!e||!t.contains(e))return null;let n=i.ROOT_DOC.getElementById(i.INLINE_SLOT_ID);return n||((n=i.ROOT_DOC.createElement("div")).id=i.INLINE_SLOT_ID),(n.parentNode!==t||n.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",n),n}function x(){let t=i.ROOT_DOC.getElementById("lia-hl-btn");if(!t)return null;let e=null;try{e=t.getBoundingClientRect()}catch(t){e=null}if(f(e))return e;let n=a()||t.parentElement||l();if(!n)return null;let o=p(n);if(!o)return null;let r=Math.max(34,t.offsetWidth||0),s=Math.max(34,t.offsetHeight||0),u=t.offsetLeft||0,d="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(o.height-s)/2),c={left:o.left+u,top:o.top+d,right:o.left+u+r,bottom:o.top+d+s,width:r,height:s};return f(c)?c:{left:o.left+8,top:o.top+Math.max(0,(o.height-34)/2),right:o.left+8+34,bottom:o.top+Math.max(0,(o.height-34)/2)+34,width:34,height:34}}function b(){let t=p(a());return t||p(l())}function T(){let t=b();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function _(){let t=s(),e=a();if(!e)return[];let n=[];for(let o of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!o||o.id===i.BTN_ID)continue;let e=p(o);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:o,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let o=n[0].r.top+n[0].r.height/2,r=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-o)<=r)}function I(){let t=i.ROOT_DOC.getElementById("lia-toc"),e=i.ROOT_DOC.getElementById("lia-btn-toc"),n=u(e),o=d(),r=o?22:34;if(!n)return null;if(o){let t=n.left+(n.width-r)/2,o=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,o),right:Math.max(8,t)+r,bottom:Math.max(8,o)+r,width:r,height:r},peers:[{el:e,r:n}]}}if(t&&t.classList.contains("lia-toc--open")){let t=n.right+8,o=n.top+(n.height-r)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,o),right:t+r,bottom:Math.max(8,o)+r,width:r,height:r},peers:[{el:e,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:e,r:n}]}}function v(){let t=x();if(t)return{kind:"highlight",rect:t,peers:[{el:i.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=_();if(e.length){let t=e[0].r;for(let n of e)n.r.right>t.right&&(t=n.r);return{kind:"toolbar-row",rect:t,peers:e}}let n=I();if(n)return n;let o=T();return o?{kind:"virtual-highlight-slot",rect:o,peers:[]}:null}function D(){try{let t=s(),e=v();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let n=e.rect,o=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(n.left),Math.round(n.top),Math.round(n.right),Math.round(n.bottom),Math.round(n.width),Math.round(n.height),o].join("|")}catch(t){return null}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureUI",()=>a),r.export(n,"placeButtonInCorrectHost",()=>s),r.export(n,"positionOverlayButton",()=>p),r.export(n,"positionPanel",()=>u),r.export(n,"setPresentationOnlyVisibility",()=>f);var i=t("./state"),l=t("./toolbar");function a(){let t=i.ROOT_DOC.getElementById(i.OVERLAY_ID);t||((t=i.ROOT_DOC.createElement("div")).id=i.OVERLAY_ID,i.ROOT_DOC.body.appendChild(t));let e=i.ROOT_DOC.getElementById(i.BTN_ID);e||((e=i.ROOT_DOC.createElement("button")).id=i.BTN_ID,e.type="button",e.setAttribute("aria-label","Font size"),e.innerHTML='<span class="tffA-small">A</span><span class="tffA-big">A</span>',t.appendChild(e));let n=i.ROOT_DOC.getElementById(i.PANEL_ID);n||((n=i.ROOT_DOC.createElement("div")).id=i.PANEL_ID,n.innerHTML=`<div id="${i.TITLE_ID}">Font size</div><input id="${i.SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="Font size" />`,i.ROOT_DOC.body.appendChild(n))}function s(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.OVERLAY_ID);if(!t||!e)return;let n=i.ROOT_DOC.getElementById(i.INLINE_SLOT_ID);if((0,l.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}if((0,l.shouldUseInlineStripDock)()){let n=(0,l.ensureInlineDockSlot)();n&&t.parentNode!==n&&n.appendChild(t),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n)}function p(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.OVERLAY_ID);if(!t||!e||(s(),(0,l.shouldUseInlineStripDock)()))return;let n=(0,l.getViewport)(),o=(0,l.isNightlyNavigationHidden)()?22:34,r=o,a=o;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(r=e.width,a=e.height)}catch(t){}let p=8,u=8;if((0,l.shouldUseTFFNightlyStackDock)()){let t=(0,l.getTFFTOCButtonRect)();t&&(p=t.left+(t.width-r)/2,u=t.bottom+6)}else{let t=(0,l.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(p=e.right+8,u=e.top+(e.height-a)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(p=e.left,u=e.top)}}p=(0,i.clamp)(p,8,n.w-r-8),u=(0,i.clamp)(u,8,n.h-a-8),e.style.left=`${Math.round(n.ox)}px`,e.style.top=`${Math.round(n.oy)}px`,t.style.left=`${Math.round(p)}px`,t.style.top=`${Math.round(u)}px`}function u(){let t,e,n,o,r,a,s=i.ROOT_DOC.getElementById(i.BTN_ID),p=i.ROOT_DOC.getElementById(i.PANEL_ID);if(!s||!p||!i.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let u=s.getBoundingClientRect(),f=(0,l.getViewport)(),d=(t=p.style.display,e=p.style.visibility,n=p.style.left,o=p.style.top,p.style.display="block",p.style.visibility="hidden",p.style.left="-9999px",p.style.top="-9999px",r=p.offsetWidth||240,a=p.offsetHeight||90,p.style.display=t,p.style.visibility=e,p.style.left=n,p.style.top=o,{w:r,h:a}),c=u.left,m=u.bottom+10;c=(0,i.clamp)(c,8,f.w-d.w-8),m+d.h+8>f.h&&(m=u.top-10-d.h),m=(0,i.clamp)(m,8,f.h-d.h-8),p.style.left=`${Math.round(c+f.ox)}px`,p.style.top=`${Math.round(m+f.oy)}px`}function f(t){let e=function(){try{let t=i.ROOT_WIN.visualViewport,e=t?t.width:i.ROOT_DOC.documentElement.clientWidth||9999,n=t?t.height:i.ROOT_DOC.documentElement.clientHeight||9999,o=Math.min(e,n);return e<=680||o<=520}catch(t){return!1}}(),n="presentation"===t&&!e,o=i.ROOT_DOC.getElementById(i.BTN_ID),r=i.ROOT_DOC.getElementById(i.PANEL_ID);return o&&(o.style.display=n?"inline-flex":"none"),!n&&r&&(i.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),r.style.display="none",(0,i.clearPosTimers)()),n}},{"./state":"jPEty","./toolbar":"asdc8","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"scheduleRepositionBurst",()=>p),r.export(n,"burstRepositionThrottled",()=>u),r.export(n,"wireOnce",()=>d),r.export(n,"initEvents",()=>c);var i=t("./state"),l=t("./ui"),a=t("./font");function s(){(0,l.positionOverlayButton)(),(0,l.positionPanel)()}function p(){for(let t of((0,i.clearPosTimers)(),s(),i.ROOT_WIN.requestAnimationFrame(()=>{i.ROOT_WIN.requestAnimationFrame(()=>s())}),[40,120,260,520]))i.I.posTimers.push(i.ROOT_WIN.setTimeout(()=>{s()},t));try{i.ROOT_DOC.fonts&&i.ROOT_DOC.fonts.ready&&i.ROOT_DOC.fonts.ready.then(()=>s())}catch(t){}}function u(){let t=Date.now();t-(i.I.lastBurstAt||0)<120||(i.I.lastBurstAt=t,p())}let f=new WeakSet;function d(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.SLIDER_ID);t&&e&&(!f.has(t)&&(f.add(t),t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),i.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,l.positionPanel)()}),i.ROOT_DOC.addEventListener("click",t=>{if(!i.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e&&e.closest&&(e.closest("#"+i.PANEL_ID)||e.closest("#"+i.BTN_ID))||i.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},!0),i.ROOT_DOC.addEventListener("keydown",t=>{"Escape"===t.key&&i.ROOT_DOC.body.classList.remove("lia-tff-panel-open")}),i.ROOT_WIN.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),i.ROOT_WIN.visualViewport&&(i.ROOT_WIN.visualViewport.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),i.ROOT_WIN.visualViewport.addEventListener("scroll",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}))),f.has(e)||(f.add(e),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),o=(0,i.clamp)(parseInt(e.value||"24",10),t,n);try{localStorage.setItem(i.FONT_KEY,String(o))}catch(t){}(0,a.setPresFontPx)(o)})))}function c(t){let e=new Set(["style","data-lia-mode"]);function n(){return new MutationObserver(n=>{for(let o of n)if(!("attributes"===o.type&&o.attributeName&&e.has(o.attributeName)))return void t()})}try{n().observe(i.ROOT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{n().observe(i.CONTENT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}i.ROOT_WIN.addEventListener("storage",function(e){e&&(e.key===i.SETTINGS_KEY||e.key===i.FONT_KEY)&&t()}),i.ROOT_WIN.setInterval(()=>{i.I.__alive&&t()},5e3)}},{"./state":"jPEty","./ui":"7Wjmu","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(t,e,n,o){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"initModeOnly",()=>p);let i="__LIA_MODE_ONLY_STYLE_V01__",l=`
[data-lia-only]{ display: block; }

html[data-lia-mode="slides"] [data-lia-only]:not([data-lia-only="slides"]){
  display: none !important;
}
html[data-lia-mode="presentation"] [data-lia-only]:not([data-lia-only="presentation"]){
  display: none !important;
}
html[data-lia-mode="textbook"] [data-lia-only]:not([data-lia-only="textbook"]){
  display: none !important;
}
`;function a(t){return String(t??"").trim().toLowerCase()}function s(t){let e=a(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function p(t){let e=()=>(function(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),n=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),o=n.length?n:[document];for(let t of o)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(i))return;let n=t.createElement("style");n.id=i,n.appendChild(t.createTextNode(l)),e.appendChild(n)}catch(t){}}(t);let r=t;if("unknown"===r)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let o of e){let e=s(a(o.textContent));if(!e)continue;let r=o.closest("button,[role='button'],a"),i=(r||o).getBoundingClientRect(),l=t.defaultView.innerWidth||1200,p=0;i.top<140&&(p+=200),i.left>.55*l&&(p+=200),r&&function(t){let e=a(t.getAttribute("aria-pressed")),n=a(t.getAttribute("aria-selected")),o=a(t.className);return"true"===e||"true"===n||o.includes("active")||o.includes("selected")||o.includes("mdc-icon-button--on")}(r)&&(p+=1e3),(!n||p>n.score)&&(n={mode:e,score:p})}return n?n.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(a(e.location.search)+"&"+a(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),o=e.getItem(n),r=s((n||"")+" "+(o||""));if(r)return r}}catch(t){}return null}(e)}(t);if(e){r=e;break}}let p="slides"===r||"presentation"===r||"textbook"===r;for(let t of o)try{p?t.documentElement.setAttribute("data-lia-mode",r):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}})(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3),document.addEventListener("click",()=>setTimeout(e,0),!0),window.addEventListener("hashchange",e,!0),window.addEventListener("popstate",e,!0)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
