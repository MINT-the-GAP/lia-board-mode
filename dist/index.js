!function(t,e,n,r,i){var o="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof o[r]&&o[r],a=l.i||{},s=l.cache||{},p="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(e,n){if(!s[e]){if(!t[e]){if(i[e])return i[e];var a="function"==typeof o[r]&&o[r];if(!n&&a)return a(e,!0);if(l)return l(e,!0);if(p&&"string"==typeof e)return p(e);var f=Error("Cannot find module '"+e+"'");throw f.code="MODULE_NOT_FOUND",f}d.resolve=function(n){var r=t[e][1][n];return null!=r?r:n},d.cache={};var c=s[e]=new u.Module(e);t[e][0].call(c.exports,d,c,c.exports,o)}return s[e].exports;function d(t){var e=d.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],r=t[1],i=t[2]||t[0],o=u(r);"*"===e?Object.keys(o).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return o[t]}})}):"*"===i?Object.defineProperty(n,e,{enumerable:!0,value:o}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===i?o.__esModule?o.default:o:o[i]}})}),n}return u(e)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.require=p,this.exports={}},u.modules=t,u.cache=s,u.parent=l,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=a,u.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return o[r]}}),o[r]=u;for(var f=0;f<e.length;f++)u(e[f]);if(n){var c=u(n);"object"==typeof exports&&"u">typeof module?module.exports=c:"function"==typeof define&&define.amd&&define(function(){return c})}}({"8RSWf":[function(t,e,n,r){var i=t("./state"),o=t("./mode"),l=t("./css"),a=t("./font"),s=t("./toolbar"),p=t("./ui"),u=t("./events"),f=t("./modeOnly");function c(){i.I.ticking||(i.I.ticking=!0,i.ROOT_WIN.requestAnimationFrame(()=>{try{(0,l.ensureContentCSS)(),(0,l.ensureRootCSS)();let t=(0,o.safeGetSettingsRaw)(),e=(0,o.detectMode)();(0,o.applyModeAttr)(e),(0,l.syncAccent)(e),(0,l.syncDarkMode)(),(0,p.ensureUI)(u.wireOnce),(0,s.syncNightlyMiniMode)();let n=(0,p.setPresentationOnlyVisibility)(e),r=null===i.I.lastShow||n!==i.I.lastShow;i.I.lastShow=n;let c=(0,s.toolbarSignature)(),d=!!(c&&c!==i.I.lastToolbarSig);i.I.lastToolbarSig=c||i.I.lastToolbarSig,!n&&d&&(i.I.pendingReposition=!0),(0,p.positionOverlayButton)();let m=e!==i.I.lastMode||t!==i.I.lastSettingsRaw;m&&((0,a.applyFontLogic)(e),(0,f.applyModeOnlyNow)(e),i.I.lastMode=e,i.I.lastSettingsRaw=t),(r||d||m||i.I.pendingReposition)&&(i.I.pendingReposition=!1,(0,u.burstRepositionThrottled)()),(0,a.syncSliderToCurrent)(),(0,p.syncFontSizeLabel)(),n&&(0,p.positionPanel)()}finally{i.I.ticking=!1}}))}(0,i.initInstance)()&&((0,u.initEvents)(c),c(),(0,f.initModeOnly)(()=>i.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU"}],jPEty:[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(){let t=window;try{for(;t.parent&&t.parent!==t;)t=t.parent}catch(t){}return t}i.defineInteropFlag(n),i.export(n,"getRootWindow",()=>o),i.export(n,"ROOT_WIN",()=>l),i.export(n,"ROOT_DOC",()=>a),i.export(n,"CONTENT_WIN",()=>s),i.export(n,"CONTENT_DOC",()=>p),i.export(n,"REG",()=>f),i.export(n,"DOC_ID",()=>c),i.export(n,"I",()=>d),i.export(n,"initInstance",()=>m),i.export(n,"SETTINGS_KEY",()=>h),i.export(n,"FONT_KEY",()=>g),i.export(n,"OVERLAY_ID",()=>O),i.export(n,"BTN_ID",()=>y),i.export(n,"PANEL_ID",()=>b),i.export(n,"SLIDER_ID",()=>x),i.export(n,"TITLE_ID",()=>T),i.export(n,"INLINE_SLOT_ID",()=>_),i.export(n,"clamp",()=>I),i.export(n,"clearPosTimers",()=>v);let l=o(),a=l.document,s=window,p=document,u="__LIA_TFF_REG_V2__";l[u]=l[u]||{instances:{}};let f=l[u],c=(p.baseURI||s.location.href||"")+"::"+(p.title||""),d=null;function m(){return!f.instances[c]?.__alive&&(d={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1},f.instances[c]=d,!0)}let h="settings",g="lia-tff-font-px-v2",O="lia-tff-overlay-v2",y="lia-tff-btn-v2",b="lia-tff-panel-v2",x="lia-tff-slider-v2",T="lia-tff-title-v2",_="lia-tff-inline-slot-v2";function I(t,e,n){return Math.max(e,Math.min(n,t))}function v(){try{for(d.posTimers||(d.posTimers=[]);d.posTimers.length;)l.clearTimeout(d.posTimers.pop())}catch(t){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,n,r){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}],aGLfG:[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"norm",()=>l),i.export(n,"safeGetSettingsRaw",()=>a),i.export(n,"findModeInJson",()=>s),i.export(n,"detectMode",()=>p),i.export(n,"applyModeAttr",()=>u);var o=t("./state");function l(t){return String(null==t?"":t).toLowerCase()}function a(){try{return localStorage.getItem(o.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set,n=new Set(["mode","view","layout","format"]);return function t(r){if(null==r)return null;if("string"==typeof r){let t=l(r);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof r||e.has(r))return null;e.add(r);let i=[];for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))if(n.has(l(e))){let n=t(r[e]);if(n)return n}else i.push(e);for(let e of i){let n=t(r[e]);if(n)return n}return null}(t)}function p(){let t=a();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(n){let e=l(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function u(t){try{o.CONTENT_DOC.documentElement.dataset.liaMode=t}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"ensureStyle",()=>l),i.export(n,"setVar",()=>a),i.export(n,"syncAccent",()=>f),i.export(n,"ensureContentCSS",()=>d),i.export(n,"ensureRootCSS",()=>h),i.export(n,"syncDarkMode",()=>O);var o=t("./state");function l(t,e,n){try{if(!t||t.getElementById(e))return;let r=t.createElement("style");r.id=e,r.textContent=n,(t.head||t.documentElement).appendChild(r)}catch(t){}}function a(t,e,n){try{t.documentElement.style.setProperty(e,n)}catch(t){}}let s=null,p=null;function u(t){try{let e=t||document,n=e.body||e.documentElement,r=e.defaultView,i=e.querySelector(".lia-btn");if(i){let t=r.getComputedStyle(i).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let o=e.createElement("button");o.className="lia-btn",o.type="button",o.textContent="x",o.style.position="absolute",o.style.left="-9999px",o.style.top="-9999px",o.style.visibility="hidden",n.appendChild(o);let l=r.getComputedStyle(o).backgroundColor;if(o.remove(),l&&"rgba(0, 0, 0, 0)"!==l&&"transparent"!==l)return l}catch(t){}return null}function f(t){if(t===p&&s){a(o.ROOT_DOC,"--lia-tff-accent",s),a(o.CONTENT_DOC,"--lia-tff-accent",s);return}let e=u(o.ROOT_DOC)||u(o.CONTENT_DOC)||"rgb(11,95,255)";s=e,p=t,a(o.ROOT_DOC,"--lia-tff-accent",e),a(o.CONTENT_DOC,"--lia-tff-accent",e)}let c=`
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
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
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
`;function d(){l(o.CONTENT_DOC,"lia-tff-style-content-v2",c)}let m=`
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#${o.OVERLAY_ID}{
  position: fixed !important;
  z-index: 99999980 !important;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none !important;
}

#${o.BTN_ID}{
  pointer-events: auto !important;
  position: absolute !important;
  width: 34px !important;
  height: 34px !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  border: 0 !important;
  background: transparent !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#${o.INLINE_SLOT_ID}{
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

#${o.INLINE_SLOT_ID} > #${o.BTN_ID}{
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

body.lia-tff-nightly-mini #${o.BTN_ID}{
  width: 22px !important;
  height: 22px !important;
  border-radius: 6px !important;
}

body.lia-tff-nightly-mini #${o.BTN_ID} .tffA-small{
  left: 0px !important;
  top: 2px !important;
  font-size: 15px !important;
}

body.lia-tff-nightly-mini #${o.BTN_ID} .tffA-big{
  left: 5px !important;
  top: -2px !important;
  font-size: 18px !important;
}

#${o.BTN_ID}:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 12%, transparent) !important;
}
#${o.BTN_ID}:active{
  background: color-mix(in srgb, var(--lia-tff-accent) 18%, transparent) !important;
}
#${o.BTN_ID}:focus,
#${o.BTN_ID}:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

#${o.BTN_ID} .tffA-small,
#${o.BTN_ID} .tffA-big{
  position: absolute !important;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}

#${o.BTN_ID} .tffA-small{
  left: 2px !important;
  top: 3px !important;
  font-size: 24px !important;
  color: var(--lia-tff-accent) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.25) !important;
  opacity: .95 !important;
}

#${o.BTN_ID} .tffA-big{
  left: 10px !important;
  top: -2px !important;
  font-size: 30px !important;
  color: #fff !important;
  text-shadow: 0 2px 3px rgba(0,0,0,.45) !important;
  opacity: .98 !important;
}

#${o.PANEL_ID}{
  position: fixed !important;
  z-index: 99999979 !important;
  width: 220px !important;
  padding: 14px 16px 16px !important;
  display: none !important;
  border-radius: 12px !important;
  border: 2px solid var(--lia-tff-accent) !important;
  background: var(--tff-panel-bg, #fff) !important;
  color: var(--tff-panel-fg, #111) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,.15) !important;
}

body.lia-tff-panel-open #${o.PANEL_ID}{
  display: block !important;
}

body.lia-tff-dark #${o.PANEL_ID}{
  --tff-panel-bg: #252830;
  --tff-panel-fg: #e4e6eb;
}

#${o.TITLE_ID}{
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  color: var(--lia-tff-accent) !important;
  margin: 0 0 12px 0 !important;
}

#${o.PANEL_ID} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
  cursor: pointer !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}
`;function h(){l(o.ROOT_DOC,"lia-tff-style-root-v2",m)}let g=null;function O(){try{if(!o.ROOT_DOC.body)return;let t=function(){try{let t=o.ROOT_DOC.documentElement,e=o.ROOT_DOC.body;if(t.classList.contains("lia-variant-light")||"light"===t.getAttribute("data-bs-theme")||"light"===t.getAttribute("data-theme")||"light"===e.getAttribute("data-bs-theme")||"light"===e.getAttribute("data-theme"))return!1;if(t.classList.contains("lia-variant-dark")||"dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark"))return!0}catch(t){}try{if(o.ROOT_WIN.matchMedia&&o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(t){}try{let t=o.ROOT_WIN.getComputedStyle(o.ROOT_DOC.body).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t){let e=t.match(/\d+/g);if(e&&e.length>=3&&(.299*e[0]+.587*e[1]+.114*e[2])/255<.45)return!0}}catch(t){}return!1}();if(t===g)return;g=t,o.ROOT_DOC.body.classList.toggle("lia-tff-dark",t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"getSavedFontPx",()=>s),i.export(n,"setPresFontPx",()=>p),i.export(n,"applyFontLogic",()=>f),i.export(n,"syncSliderToCurrent",()=>c);var o=t("./state"),l=t("./css");let a=[18,24,32];function s(){try{let t=localStorage.getItem(o.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function p(t){(0,l.setVar)(o.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let u=!1;function f(t){let e="presentation"===t;if(!(e||"slides"===t))return void p(null);if(e){let t=s();if(null!=t)return void p((0,o.clamp)(t,14,48))}u||(u=!0,p(null),o.CONTENT_WIN.requestAnimationFrame(function(){o.CONTENT_WIN.requestAnimationFrame(function(){var t;let e,n;p(a[(e=o.CONTENT_DOC.querySelector("main")||o.CONTENT_DOC.documentElement,(t=isNaN(n=parseFloat(o.CONTENT_WIN.getComputedStyle(e).fontSize||"16"))?16:n)<=17)?0:t<=19?1:2]),u=!1})}))}function c(){let t=o.ROOT_DOC.getElementById(o.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),r=s();if(null!=r){t.value=String((0,o.clamp)(r,e,n));return}let i=parseInt(o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(i)&&(t.value=String((0,o.clamp)(i,e,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"getToolbarHeader",()=>l),i.export(n,"getToolbarLeftContainer",()=>a),i.export(n,"getViewport",()=>s),i.export(n,"getVisibleRect",()=>p),i.export(n,"getRectLoose",()=>u),i.export(n,"isSaneTopLeftRect",()=>f),i.export(n,"isNightlyNavigationHidden",()=>c),i.export(n,"syncNightlyMiniMode",()=>d),i.export(n,"getTFFTOCButton",()=>m),i.export(n,"getTFFTOCButtonRect",()=>h),i.export(n,"shouldUseTFFNightlyStackDock",()=>g),i.export(n,"shouldUseInlineStripDock",()=>O),i.export(n,"ensureInlineDockSlot",()=>y),i.export(n,"getHighlightRect",()=>b),i.export(n,"getToolbarBandRect",()=>x),i.export(n,"getVirtualHighlightSlotRect",()=>T),i.export(n,"getStableLeftToolbarPeers",()=>_),i.export(n,"getTOCDockSlot",()=>I),i.export(n,"getDockTarget",()=>v),i.export(n,"toolbarSignature",()=>D);var o=t("./state");function l(){return o.ROOT_DOC.querySelector("header#lia-toolbar-nav")||o.ROOT_DOC.querySelector("#lia-toolbar-nav")||o.ROOT_DOC.querySelector("header.lia-header")}function a(){let t=l();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=o.ROOT_WIN.visualViewport;if(t)return{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0};let e=o.ROOT_DOC.documentElement;return{w:e.clientWidth,h:e.clientHeight,ox:0,oy:0}}function p(t){if(!t)return null;try{let e=o.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility||"0"===e.opacity)return null;let n=t.getBoundingClientRect();if(!n||n.width<6||n.height<6)return null;let r=s();if(n.right<0||n.bottom<0||n.left>r.w||n.top>r.h)return null;return n}catch(t){return null}}function u(t){if(!t)return null;try{let e=o.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility)return null;let n=t.getBoundingClientRect();if(!n||n.width<2||n.height<2)return null;let r=s();if(n.right<0||n.bottom<0||n.left>r.w||n.top>r.h)return null;return n}catch(t){return null}}function f(t){if(!t)return!1;let e=s();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function c(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function d(){try{if(!o.ROOT_DOC.body)return;o.ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini",c())}catch(t){}}function m(){let t=o.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=a();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function h(){let t=m();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}function g(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function O(){if(g())return!1;let t=a(),e=m();return!!(t&&e&&t.contains(e))}function y(){let t=a(),e=m();if(!t||!e||!t.contains(e))return null;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);return n||((n=o.ROOT_DOC.createElement("div")).id=o.INLINE_SLOT_ID),(n.parentNode!==t||n.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",n),n}function b(){let t=o.ROOT_DOC.getElementById("lia-hl-btn");if(!t)return null;let e=null;try{e=t.getBoundingClientRect()}catch(t){e=null}if(f(e))return e;let n=a()||t.parentElement||l();if(!n)return null;let r=p(n);if(!r)return null;let i=Math.max(34,t.offsetWidth||0),s=Math.max(34,t.offsetHeight||0),u=t.offsetLeft||0,c="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(r.height-s)/2),d={left:r.left+u,top:r.top+c,right:r.left+u+i,bottom:r.top+c+s,width:i,height:s};return f(d)?d:{left:r.left+8,top:r.top+Math.max(0,(r.height-34)/2),right:r.left+8+34,bottom:r.top+Math.max(0,(r.height-34)/2)+34,width:34,height:34}}function x(){let t=p(a());return t||p(l())}function T(){let t=x();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function _(){let t=s(),e=a();if(!e)return[];let n=[];for(let r of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!r||r.id===o.BTN_ID)continue;let e=p(r);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:r,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let r=n[0].r.top+n[0].r.height/2,i=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-r)<=i)}function I(){let t=o.ROOT_DOC.getElementById("lia-toc"),e=o.ROOT_DOC.getElementById("lia-btn-toc"),n=u(e),r=c(),i=r?22:34;if(!n)return null;if(r){let t=n.left+(n.width-i)/2,r=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,r),right:Math.max(8,t)+i,bottom:Math.max(8,r)+i,width:i,height:i},peers:[{el:e,r:n}]}}if(t&&t.classList.contains("lia-toc--open")){let t=n.right+8,r=n.top+(n.height-i)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,r),right:t+i,bottom:Math.max(8,r)+i,width:i,height:i},peers:[{el:e,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:e,r:n}]}}function v(){let t=b();if(t)return{kind:"highlight",rect:t,peers:[{el:o.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=_();if(e.length){let t=e[0].r;for(let n of e)n.r.right>t.right&&(t=n.r);return{kind:"toolbar-row",rect:t,peers:e}}let n=I();if(n)return n;let r=T();return r?{kind:"virtual-highlight-slot",rect:r,peers:[]}:null}function D(){try{let t=s(),e=v();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let n=e.rect,r=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(n.left),Math.round(n.top),Math.round(n.right),Math.round(n.bottom),Math.round(n.width),Math.round(n.height),r].join("|")}catch(t){return null}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"ensureUI",()=>s),i.export(n,"placeButtonInCorrectHost",()=>p),i.export(n,"positionOverlayButton",()=>u),i.export(n,"positionPanel",()=>c),i.export(n,"setPresentationOnlyVisibility",()=>d),i.export(n,"syncFontSizeLabel",()=>h);var o=t("./state"),l=t("./toolbar"),a=t("./i18n");function s(t){let e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);e||((e=o.ROOT_DOC.createElement("div")).id=o.OVERLAY_ID,o.ROOT_DOC.body.appendChild(e));let n=o.ROOT_DOC.getElementById(o.BTN_ID);if(!n){(n=o.ROOT_DOC.createElement("button")).id=o.BTN_ID,n.type="button";let t=(0,a.getFontSizeLabel)();n.setAttribute("aria-label",t),n.setAttribute("title",t),n.innerHTML='<span class="tffA-small">A</span><span class="tffA-big">A</span>',e.appendChild(n)}let r=!1,i=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!i){(i=o.ROOT_DOC.createElement("div")).id=o.PANEL_ID;let t=(0,a.getFontSizeLabel)();i.innerHTML=`<div id="${o.TITLE_ID}">${t}</div><input id="${o.SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="${t}" />`,o.ROOT_DOC.body.appendChild(i),r=!0}r&&t&&t()}function p(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!e)return;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);if((0,l.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}if((0,l.shouldUseInlineStripDock)()){let n=(0,l.ensureInlineDockSlot)();n&&t.parentNode!==n&&n.appendChild(t),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n)}function u(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!e||(p(),(0,l.shouldUseInlineStripDock)()))return;let n=(0,l.getViewport)(),r=(0,l.isNightlyNavigationHidden)()?22:34,i=r,a=r;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(i=e.width,a=e.height)}catch(t){}let s=8,u=8;if((0,l.shouldUseTFFNightlyStackDock)()){let t=(0,l.getTFFTOCButtonRect)();t&&(s=t.left+(t.width-i)/2,u=t.bottom+6)}else{let t=(0,l.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(s=e.right+8,u=e.top+(e.height-a)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(s=e.left,u=e.top)}}s=(0,o.clamp)(s,8,n.w-i-8),u=(0,o.clamp)(u,8,n.h-a-8),e.style.left=`${Math.round(n.ox)}px`,e.style.top=`${Math.round(n.oy)}px`,t.style.left=`${Math.round(s)}px`,t.style.top=`${Math.round(u)}px`}let f=null;function c(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!t||!e||!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let n=t.getBoundingClientRect(),r=(0,l.getViewport)(),i=function(t){if(f)return f;let e=t.style.display,n=t.style.visibility,r=t.style.left,i=t.style.top;t.style.display="block",t.style.visibility="hidden",t.style.left="-9999px",t.style.top="-9999px";let o=t.offsetWidth||240,l=t.offsetHeight||90;return t.style.display=e,t.style.visibility=n,t.style.left=r,t.style.top=i,f={w:o,h:l}}(e),a=n.left,s=n.bottom+10;a=(0,o.clamp)(a,8,r.w-i.w-8),s+i.h+8>r.h&&(s=n.top-10-i.h),s=(0,o.clamp)(s,8,r.h-i.h-8),e.style.left=`${Math.round(a+r.ox)}px`,e.style.top=`${Math.round(s+r.oy)}px`}function d(t){let e=function(){try{let t=o.ROOT_WIN.visualViewport,e=t?t.width:o.ROOT_DOC.documentElement.clientWidth||9999,n=t?t.height:o.ROOT_DOC.documentElement.clientHeight||9999,r=Math.min(e,n);return e<=680||r<=520}catch(t){return!1}}(),n="presentation"===t&&!e,r=o.ROOT_DOC.getElementById(o.BTN_ID),i=o.ROOT_DOC.getElementById(o.PANEL_ID);return r&&(r.style.display=n?"inline-flex":"none"),!n&&i&&(o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),i.style.display="none",(0,o.clearPosTimers)()),n}let m=null;function h(){try{let t=(0,a.detectLanguage)();if(t===m)return;m=t;let e=(0,a.getFontSizeLabel)(),n=o.ROOT_DOC.getElementById(o.TITLE_ID);n&&(n.textContent=e);let r=o.ROOT_DOC.getElementById(o.BTN_ID);r&&(r.setAttribute("aria-label",e),r.setAttribute("title",e));let i=o.ROOT_DOC.getElementById(o.SLIDER_ID);i&&i.setAttribute("aria-label",e)}catch(t){}}},{"./state":"jPEty","./toolbar":"asdc8","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./i18n":"7hvC6"}],"7hvC6":[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"detectLanguage",()=>a),i.export(n,"getFontSizeLabel",()=>s);var o=t("./state");let l={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function a(){try{let t=o.CONTENT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=o.ROOT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=localStorage.getItem(o.SETTINGS_KEY);if(t){let e=JSON.parse(t),n=e?.language??e?.lang;if(n&&"string"==typeof n&&n.length>=2)return n.toLowerCase().slice(0,2)}}catch(t){}return"en"}function s(){return l[a()]??l.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"scheduleRepositionBurst",()=>u),i.export(n,"burstRepositionThrottled",()=>f),i.export(n,"wireOnce",()=>c),i.export(n,"initEvents",()=>d);var o=t("./state"),l=t("./ui"),a=t("./toolbar"),s=t("./font");function p(){(0,l.positionOverlayButton)(),(0,l.positionPanel)()}function u(){(0,o.clearPosTimers)(),o.ROOT_WIN.requestAnimationFrame(()=>{p(),o.ROOT_WIN.requestAnimationFrame(()=>p())})}function f(){let t=Date.now();t-(o.I.lastBurstAt||0)<120||(o.I.lastBurstAt=t,u())}function c(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.SLIDER_ID);t&&e&&(t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),o.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,l.positionPanel)()}),o.ROOT_DOC.addEventListener("click",t=>{if(!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e&&e.closest&&(e.closest("#"+o.PANEL_ID)||e.closest("#"+o.BTN_ID))||o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},!0),o.ROOT_DOC.addEventListener("keydown",t=>{"Escape"===t.key&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")}),o.ROOT_WIN.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),o.ROOT_WIN.visualViewport&&(o.ROOT_WIN.visualViewport.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),o.ROOT_WIN.visualViewport.addEventListener("scroll",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()})),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),r=(0,o.clamp)(parseInt(e.value||"24",10),t,n);try{localStorage.setItem(o.FONT_KEY,String(r))}catch(t){}(0,s.setPresFontPx)(r)}))}function d(t){let e=new Set(["style","data-lia-mode"]);function n(){return new MutationObserver(n=>{for(let r of n)if(!("attributes"===r.type&&r.attributeName&&e.has(r.attributeName)))return void t()})}try{n().observe(o.ROOT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{n().observe(o.CONTENT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}o.ROOT_WIN.addEventListener("storage",function(e){e&&(e.key===o.SETTINGS_KEY||e.key===o.FONT_KEY)&&t()}),o.ROOT_WIN.setInterval(()=>{o.I.__alive&&t()},5e3);try{o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>t())}catch(t){}if("u">typeof ResizeObserver)try{let t=new ResizeObserver(()=>p()),e=(0,a.getToolbarHeader)();if(e)t.observe(e);else{let e=new MutationObserver(()=>{let n=(0,a.getToolbarHeader)();n&&(t.observe(n),e.disconnect())});e.observe(o.ROOT_DOC.documentElement,{childList:!0,subtree:!0})}}catch(t){}}},{"./state":"jPEty","./ui":"7Wjmu","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./toolbar":"asdc8"}],NHYwU:[function(t,e,n,r){var i=t("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"initModeOnly",()=>u),i.export(n,"applyModeOnlyNow",()=>f);let o="__LIA_MODE_ONLY_STYLE_V01__",l=`
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
`;function a(t){return String(t??"").trim().toLowerCase()}function s(t){let e=a(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function p(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),n=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),r=n.length?n:[document];for(let t of r)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(o))return;let n=t.createElement("style");n.id=o,n.appendChild(t.createTextNode(l)),e.appendChild(n)}catch(t){}}(t);let i=t;if("unknown"===i)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let r of e){let e=s(a(r.textContent));if(!e)continue;let i=r.closest("button,[role='button'],a"),o=(i||r).getBoundingClientRect(),l=t.defaultView.innerWidth||1200,p=0;o.top<140&&(p+=200),o.left>.55*l&&(p+=200),i&&function(t){let e=a(t.getAttribute("aria-pressed")),n=a(t.getAttribute("aria-selected")),r=a(t.className);return"true"===e||"true"===n||r.includes("active")||r.includes("selected")||r.includes("mdc-icon-button--on")}(i)&&(p+=1e3),(!n||p>n.score)&&(n={mode:e,score:p})}return n?n.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(a(e.location.search)+"&"+a(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),r=e.getItem(n),i=s((n||"")+" "+(r||""));if(i)return i}}catch(t){}return null}(e)}(t);if(e){i=e;break}}let p="slides"===i||"presentation"===i||"textbook"===i;for(let t of r)try{p?t.documentElement.setAttribute("data-lia-mode",i):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}function u(t){let e=()=>p(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3)}function f(t){p(t)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
