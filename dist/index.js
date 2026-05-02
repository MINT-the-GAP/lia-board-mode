!function(t,e,n,r,o){var i="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof i[r]&&i[r],a=l.i||{},s=l.cache||{},p="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(e,n){if(!s[e]){if(!t[e]){if(o[e])return o[e];var a="function"==typeof i[r]&&i[r];if(!n&&a)return a(e,!0);if(l)return l(e,!0);if(p&&"string"==typeof e)return p(e);var f=Error("Cannot find module '"+e+"'");throw f.code="MODULE_NOT_FOUND",f}d.resolve=function(n){var r=t[e][1][n];return null!=r?r:n},d.cache={};var c=s[e]=new u.Module(e);t[e][0].call(c.exports,d,c,c.exports,i)}return s[e].exports;function d(t){var e=d.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],r=t[1],o=t[2]||t[0],i=u(r);"*"===e?Object.keys(i).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return i[t]}})}):"*"===o?Object.defineProperty(n,e,{enumerable:!0,value:i}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===o?i.__esModule?i.default:i:i[o]}})}),n}return u(e)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.require=p,this.exports={}},u.modules=t,u.cache=s,u.parent=l,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=a,u.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return i[r]}}),i[r]=u;for(var f=0;f<e.length;f++)u(e[f]);if(n){var c=u(n);"object"==typeof exports&&"u">typeof module?module.exports=c:"function"==typeof define&&define.amd&&define(function(){return c})}}({"8RSWf":[function(t,e,n,r){var o=t("./state"),i=t("./mode"),l=t("./css"),a=t("./font"),s=t("./toolbar"),p=t("./ui"),u=t("./events"),f=t("./modeOnly");function c(){o.I.ticking||(o.I.ticking=!0,o.ROOT_WIN.requestAnimationFrame(()=>{try{(0,l.ensureContentCSS)(),(0,l.ensureRootCSS)();let t=(0,i.safeGetSettingsRaw)(),e=(0,i.detectMode)();(0,i.applyModeAttr)(e),(0,l.syncAccent)(e),(0,l.syncDarkMode)(),(0,p.ensureUI)(u.wireOnce),(0,s.syncNightlyMiniMode)();let n=(0,p.setPresentationOnlyVisibility)(e),r=null===o.I.lastShow||n!==o.I.lastShow;o.I.lastShow=n;let c=(0,s.toolbarSignature)(),d=!!(c&&c!==o.I.lastToolbarSig);o.I.lastToolbarSig=c||o.I.lastToolbarSig,!n&&d&&(o.I.pendingReposition=!0),(0,p.positionOverlayButton)();let m=e!==o.I.lastMode||t!==o.I.lastSettingsRaw;m&&((0,a.applyFontLogic)(e),(0,f.applyModeOnlyNow)(e),o.I.lastMode=e,o.I.lastSettingsRaw=t),(r||d||m||o.I.pendingReposition)&&(o.I.pendingReposition=!1,(0,u.burstRepositionThrottled)()),(0,a.syncSliderToCurrent)(),(0,p.syncFontSizeLabel)(),n&&(0,p.positionPanel)()}finally{o.I.ticking=!1}}))}(0,o.initInstance)()&&((0,u.initEvents)(c),c(),(0,f.initModeOnly)(()=>o.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU"}],jPEty:[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");function i(){let t=window;try{for(;t.parent&&t.parent!==t;)t=t.parent}catch(t){}return t}o.defineInteropFlag(n),o.export(n,"getRootWindow",()=>i),o.export(n,"ROOT_WIN",()=>l),o.export(n,"ROOT_DOC",()=>a),o.export(n,"CONTENT_WIN",()=>s),o.export(n,"CONTENT_DOC",()=>p),o.export(n,"REG",()=>f),o.export(n,"DOC_ID",()=>c),o.export(n,"I",()=>d),o.export(n,"initInstance",()=>m),o.export(n,"SETTINGS_KEY",()=>h),o.export(n,"FONT_KEY",()=>g),o.export(n,"OVERLAY_ID",()=>y),o.export(n,"BTN_ID",()=>O),o.export(n,"PANEL_ID",()=>b),o.export(n,"SLIDER_ID",()=>x),o.export(n,"TITLE_ID",()=>T),o.export(n,"INLINE_SLOT_ID",()=>_),o.export(n,"clamp",()=>I),o.export(n,"clearPosTimers",()=>v);let l=i(),a=l.document,s=window,p=document,u="__LIA_TFF_REG_V2__";l[u]=l[u]||{instances:{}};let f=l[u],c=(p.baseURI||s.location.href||"")+"::"+(p.title||""),d=null;function m(){return!f.instances[c]?.__alive&&(d={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1},f.instances[c]=d,!0)}let h="settings",g="lia-tff-font-px-v2",y="lia-tff-overlay-v2",O="lia-tff-btn-v2",b="lia-tff-panel-v2",x="lia-tff-slider-v2",T="lia-tff-title-v2",_="lia-tff-inline-slot-v2";function I(t,e,n){return Math.max(e,Math.min(n,t))}function v(){try{for(d.posTimers||(d.posTimers=[]);d.posTimers.length;)l.clearTimeout(d.posTimers.pop())}catch(t){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,n,r){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}],aGLfG:[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"norm",()=>l),o.export(n,"safeGetSettingsRaw",()=>a),o.export(n,"findModeInJson",()=>s),o.export(n,"detectMode",()=>p),o.export(n,"applyModeAttr",()=>u);var i=t("./state");function l(t){return String(null==t?"":t).toLowerCase()}function a(){try{return localStorage.getItem(i.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set,n=new Set(["mode","view","layout","format"]);return function t(r){if(null==r)return null;if("string"==typeof r){let t=l(r);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof r||e.has(r))return null;e.add(r);let o=[];for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))if(n.has(l(e))){let n=t(r[e]);if(n)return n}else o.push(e);for(let e of o){let n=t(r[e]);if(n)return n}return null}(t)}function p(){let t=a();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(n){let e=l(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function u(t){try{i.CONTENT_DOC.documentElement.dataset.liaMode=t}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"ensureStyle",()=>l),o.export(n,"setVar",()=>a),o.export(n,"syncAccent",()=>f),o.export(n,"ensureContentCSS",()=>d),o.export(n,"ensureRootCSS",()=>h),o.export(n,"syncDarkMode",()=>y);var i=t("./state");function l(t,e,n){try{if(!t||t.getElementById(e))return;let r=t.createElement("style");r.id=e,r.textContent=n,(t.head||t.documentElement).appendChild(r)}catch(t){}}function a(t,e,n){try{t.documentElement.style.setProperty(e,n)}catch(t){}}let s=null,p=null;function u(t){try{let e=t||document,n=e.body||e.documentElement,r=e.defaultView,o=e.querySelector(".lia-btn");if(o){let t=r.getComputedStyle(o).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let i=e.createElement("button");i.className="lia-btn",i.type="button",i.textContent="x",i.style.position="absolute",i.style.left="-9999px",i.style.top="-9999px",i.style.visibility="hidden",n.appendChild(i);let l=r.getComputedStyle(i).backgroundColor;if(i.remove(),l&&"rgba(0, 0, 0, 0)"!==l&&"transparent"!==l)return l}catch(t){}return null}function f(t){if(t===p&&s){a(i.ROOT_DOC,"--lia-tff-accent",s),a(i.CONTENT_DOC,"--lia-tff-accent",s);return}let e=u(i.ROOT_DOC)||u(i.CONTENT_DOC)||"rgb(11,95,255)";s=e,p=t,a(i.ROOT_DOC,"--lia-tff-accent",e),a(i.CONTENT_DOC,"--lia-tff-accent",e)}let c=`
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
`;function d(){l(i.CONTENT_DOC,"lia-tff-style-content-v2",c)}let m=`
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
  width: 220px !important;
  padding: 14px 16px 16px !important;
  display: none !important;
  border-radius: 12px !important;
  border: 2px solid var(--lia-tff-accent) !important;
  background: var(--tff-panel-bg, #fff) !important;
  color: var(--tff-panel-fg, #111) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,.15) !important;
}

body.lia-tff-panel-open #${i.PANEL_ID}{
  display: block !important;
}

@media (prefers-color-scheme: dark){
  #${i.PANEL_ID}{
    --tff-panel-bg: #252830;
    --tff-panel-fg: #e4e6eb;
  }
}

body.lia-tff-dark #${i.PANEL_ID}{
  --tff-panel-bg: #252830;
  --tff-panel-fg: #e4e6eb;
}

#${i.TITLE_ID}{
  font-size: 1rem !important;
  font-weight: 700 !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
  color: var(--lia-tff-accent) !important;
  margin: 0 0 12px 0 !important;
}

#${i.PANEL_ID} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
  cursor: pointer !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}
`;function h(){l(i.ROOT_DOC,"lia-tff-style-root-v2",m)}let g=null;function y(){try{if(!i.ROOT_DOC.body)return;let t=function(){try{if(i.ROOT_WIN.matchMedia&&i.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(t){}try{let t=i.ROOT_DOC.documentElement,e=i.ROOT_DOC.body;if("dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark"))return!0}catch(t){}try{let t=i.ROOT_WIN.getComputedStyle(i.ROOT_DOC.body).backgroundColor.match(/\d+/g);if(t&&t.length>=3&&(.299*t[0]+.587*t[1]+.114*t[2])/255<.45)return!0}catch(t){}return!1}();if(t===g)return;g=t,i.ROOT_DOC.body.classList.toggle("lia-tff-dark",t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"getSavedFontPx",()=>s),o.export(n,"setPresFontPx",()=>p),o.export(n,"applyFontLogic",()=>f),o.export(n,"syncSliderToCurrent",()=>c);var i=t("./state"),l=t("./css");let a=[18,24,32];function s(){try{let t=localStorage.getItem(i.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function p(t){(0,l.setVar)(i.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let u=!1;function f(t){let e="presentation"===t;if(!(e||"slides"===t))return void p(null);if(e){let t=s();if(null!=t)return void p((0,i.clamp)(t,14,48))}u||(u=!0,p(null),i.CONTENT_WIN.requestAnimationFrame(function(){i.CONTENT_WIN.requestAnimationFrame(function(){var t;let e,n;p(a[(e=i.CONTENT_DOC.querySelector("main")||i.CONTENT_DOC.documentElement,(t=isNaN(n=parseFloat(i.CONTENT_WIN.getComputedStyle(e).fontSize||"16"))?16:n)<=17)?0:t<=19?1:2]),u=!1})}))}function c(){let t=i.ROOT_DOC.getElementById(i.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),r=s();if(null!=r){t.value=String((0,i.clamp)(r,e,n));return}let o=parseInt(i.CONTENT_WIN.getComputedStyle(i.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(o)&&(t.value=String((0,i.clamp)(o,e,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"getToolbarHeader",()=>l),o.export(n,"getToolbarLeftContainer",()=>a),o.export(n,"getViewport",()=>s),o.export(n,"getVisibleRect",()=>p),o.export(n,"getRectLoose",()=>u),o.export(n,"isSaneTopLeftRect",()=>f),o.export(n,"isNightlyNavigationHidden",()=>c),o.export(n,"syncNightlyMiniMode",()=>d),o.export(n,"getTFFTOCButton",()=>m),o.export(n,"getTFFTOCButtonRect",()=>h),o.export(n,"shouldUseTFFNightlyStackDock",()=>g),o.export(n,"shouldUseInlineStripDock",()=>y),o.export(n,"ensureInlineDockSlot",()=>O),o.export(n,"getHighlightRect",()=>b),o.export(n,"getToolbarBandRect",()=>x),o.export(n,"getVirtualHighlightSlotRect",()=>T),o.export(n,"getStableLeftToolbarPeers",()=>_),o.export(n,"getTOCDockSlot",()=>I),o.export(n,"getDockTarget",()=>v),o.export(n,"toolbarSignature",()=>D);var i=t("./state");function l(){return i.ROOT_DOC.querySelector("header#lia-toolbar-nav")||i.ROOT_DOC.querySelector("#lia-toolbar-nav")||i.ROOT_DOC.querySelector("header.lia-header")}function a(){let t=l();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=i.ROOT_WIN.visualViewport;if(t)return{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0};let e=i.ROOT_DOC.documentElement;return{w:e.clientWidth,h:e.clientHeight,ox:0,oy:0}}function p(t){if(!t)return null;try{let e=i.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility||"0"===e.opacity)return null;let n=t.getBoundingClientRect();if(!n||n.width<6||n.height<6)return null;let r=s();if(n.right<0||n.bottom<0||n.left>r.w||n.top>r.h)return null;return n}catch(t){return null}}function u(t){if(!t)return null;try{let e=i.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility)return null;let n=t.getBoundingClientRect();if(!n||n.width<2||n.height<2)return null;let r=s();if(n.right<0||n.bottom<0||n.left>r.w||n.top>r.h)return null;return n}catch(t){return null}}function f(t){if(!t)return!1;let e=s();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function c(){let t=i.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function d(){try{if(!i.ROOT_DOC.body)return;i.ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini",c())}catch(t){}}function m(){let t=i.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=a();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function h(){let t=m();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}function g(){let t=i.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function y(){if(g())return!1;let t=a(),e=m();return!!(t&&e&&t.contains(e))}function O(){let t=a(),e=m();if(!t||!e||!t.contains(e))return null;let n=i.ROOT_DOC.getElementById(i.INLINE_SLOT_ID);return n||((n=i.ROOT_DOC.createElement("div")).id=i.INLINE_SLOT_ID),(n.parentNode!==t||n.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",n),n}function b(){let t=i.ROOT_DOC.getElementById("lia-hl-btn");if(!t)return null;let e=null;try{e=t.getBoundingClientRect()}catch(t){e=null}if(f(e))return e;let n=a()||t.parentElement||l();if(!n)return null;let r=p(n);if(!r)return null;let o=Math.max(34,t.offsetWidth||0),s=Math.max(34,t.offsetHeight||0),u=t.offsetLeft||0,c="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(r.height-s)/2),d={left:r.left+u,top:r.top+c,right:r.left+u+o,bottom:r.top+c+s,width:o,height:s};return f(d)?d:{left:r.left+8,top:r.top+Math.max(0,(r.height-34)/2),right:r.left+8+34,bottom:r.top+Math.max(0,(r.height-34)/2)+34,width:34,height:34}}function x(){let t=p(a());return t||p(l())}function T(){let t=x();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function _(){let t=s(),e=a();if(!e)return[];let n=[];for(let r of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!r||r.id===i.BTN_ID)continue;let e=p(r);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:r,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let r=n[0].r.top+n[0].r.height/2,o=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-r)<=o)}function I(){let t=i.ROOT_DOC.getElementById("lia-toc"),e=i.ROOT_DOC.getElementById("lia-btn-toc"),n=u(e),r=c(),o=r?22:34;if(!n)return null;if(r){let t=n.left+(n.width-o)/2,r=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,r),right:Math.max(8,t)+o,bottom:Math.max(8,r)+o,width:o,height:o},peers:[{el:e,r:n}]}}if(t&&t.classList.contains("lia-toc--open")){let t=n.right+8,r=n.top+(n.height-o)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,r),right:t+o,bottom:Math.max(8,r)+o,width:o,height:o},peers:[{el:e,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:e,r:n}]}}function v(){let t=b();if(t)return{kind:"highlight",rect:t,peers:[{el:i.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=_();if(e.length){let t=e[0].r;for(let n of e)n.r.right>t.right&&(t=n.r);return{kind:"toolbar-row",rect:t,peers:e}}let n=I();if(n)return n;let r=T();return r?{kind:"virtual-highlight-slot",rect:r,peers:[]}:null}function D(){try{let t=s(),e=v();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let n=e.rect,r=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(n.left),Math.round(n.top),Math.round(n.right),Math.round(n.bottom),Math.round(n.width),Math.round(n.height),r].join("|")}catch(t){return null}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"ensureUI",()=>s),o.export(n,"placeButtonInCorrectHost",()=>p),o.export(n,"positionOverlayButton",()=>u),o.export(n,"positionPanel",()=>c),o.export(n,"setPresentationOnlyVisibility",()=>d),o.export(n,"syncFontSizeLabel",()=>h);var i=t("./state"),l=t("./toolbar"),a=t("./i18n");function s(t){let e=i.ROOT_DOC.getElementById(i.OVERLAY_ID);e||((e=i.ROOT_DOC.createElement("div")).id=i.OVERLAY_ID,i.ROOT_DOC.body.appendChild(e));let n=i.ROOT_DOC.getElementById(i.BTN_ID);if(!n){(n=i.ROOT_DOC.createElement("button")).id=i.BTN_ID,n.type="button";let t=(0,a.getFontSizeLabel)();n.setAttribute("aria-label",t),n.setAttribute("title",t),n.innerHTML='<span class="tffA-small">A</span><span class="tffA-big">A</span>',e.appendChild(n)}let r=!1,o=i.ROOT_DOC.getElementById(i.PANEL_ID);if(!o){(o=i.ROOT_DOC.createElement("div")).id=i.PANEL_ID;let t=(0,a.getFontSizeLabel)();o.innerHTML=`<div id="${i.TITLE_ID}">${t}</div><input id="${i.SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="${t}" />`,i.ROOT_DOC.body.appendChild(o),r=!0}r&&t&&t()}function p(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.OVERLAY_ID);if(!t||!e)return;let n=i.ROOT_DOC.getElementById(i.INLINE_SLOT_ID);if((0,l.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}if((0,l.shouldUseInlineStripDock)()){let n=(0,l.ensureInlineDockSlot)();n&&t.parentNode!==n&&n.appendChild(t),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n)}function u(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.OVERLAY_ID);if(!t||!e||(p(),(0,l.shouldUseInlineStripDock)()))return;let n=(0,l.getViewport)(),r=(0,l.isNightlyNavigationHidden)()?22:34,o=r,a=r;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(o=e.width,a=e.height)}catch(t){}let s=8,u=8;if((0,l.shouldUseTFFNightlyStackDock)()){let t=(0,l.getTFFTOCButtonRect)();t&&(s=t.left+(t.width-o)/2,u=t.bottom+6)}else{let t=(0,l.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(s=e.right+8,u=e.top+(e.height-a)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(s=e.left,u=e.top)}}s=(0,i.clamp)(s,8,n.w-o-8),u=(0,i.clamp)(u,8,n.h-a-8),e.style.left=`${Math.round(n.ox)}px`,e.style.top=`${Math.round(n.oy)}px`,t.style.left=`${Math.round(s)}px`,t.style.top=`${Math.round(u)}px`}let f=null;function c(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.PANEL_ID);if(!t||!e||!i.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let n=t.getBoundingClientRect(),r=(0,l.getViewport)(),o=function(t){if(f)return f;let e=t.style.display,n=t.style.visibility,r=t.style.left,o=t.style.top;t.style.display="block",t.style.visibility="hidden",t.style.left="-9999px",t.style.top="-9999px";let i=t.offsetWidth||240,l=t.offsetHeight||90;return t.style.display=e,t.style.visibility=n,t.style.left=r,t.style.top=o,f={w:i,h:l}}(e),a=n.left,s=n.bottom+10;a=(0,i.clamp)(a,8,r.w-o.w-8),s+o.h+8>r.h&&(s=n.top-10-o.h),s=(0,i.clamp)(s,8,r.h-o.h-8),e.style.left=`${Math.round(a+r.ox)}px`,e.style.top=`${Math.round(s+r.oy)}px`}function d(t){let e=function(){try{let t=i.ROOT_WIN.visualViewport,e=t?t.width:i.ROOT_DOC.documentElement.clientWidth||9999,n=t?t.height:i.ROOT_DOC.documentElement.clientHeight||9999,r=Math.min(e,n);return e<=680||r<=520}catch(t){return!1}}(),n="presentation"===t&&!e,r=i.ROOT_DOC.getElementById(i.BTN_ID),o=i.ROOT_DOC.getElementById(i.PANEL_ID);return r&&(r.style.display=n?"inline-flex":"none"),!n&&o&&(i.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),o.style.display="none",(0,i.clearPosTimers)()),n}let m=null;function h(){try{let t=(0,a.detectLanguage)();if(t===m)return;m=t;let e=(0,a.getFontSizeLabel)(),n=i.ROOT_DOC.getElementById(i.TITLE_ID);n&&(n.textContent=e);let r=i.ROOT_DOC.getElementById(i.BTN_ID);r&&(r.setAttribute("aria-label",e),r.setAttribute("title",e));let o=i.ROOT_DOC.getElementById(i.SLIDER_ID);o&&o.setAttribute("aria-label",e)}catch(t){}}},{"./state":"jPEty","./toolbar":"asdc8","./i18n":"7hvC6","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7hvC6":[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"detectLanguage",()=>a),o.export(n,"getFontSizeLabel",()=>s);var i=t("./state");let l={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function a(){try{let t=i.CONTENT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=i.ROOT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=localStorage.getItem(i.SETTINGS_KEY);if(t){let e=JSON.parse(t),n=e?.language??e?.lang;if(n&&"string"==typeof n&&n.length>=2)return n.toLowerCase().slice(0,2)}}catch(t){}return"en"}function s(){return l[a()]??l.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"scheduleRepositionBurst",()=>u),o.export(n,"burstRepositionThrottled",()=>f),o.export(n,"wireOnce",()=>c),o.export(n,"initEvents",()=>d);var i=t("./state"),l=t("./ui"),a=t("./toolbar"),s=t("./font");function p(){(0,l.positionOverlayButton)(),(0,l.positionPanel)()}function u(){(0,i.clearPosTimers)(),i.ROOT_WIN.requestAnimationFrame(()=>{p(),i.ROOT_WIN.requestAnimationFrame(()=>p())})}function f(){let t=Date.now();t-(i.I.lastBurstAt||0)<120||(i.I.lastBurstAt=t,u())}function c(){let t=i.ROOT_DOC.getElementById(i.BTN_ID),e=i.ROOT_DOC.getElementById(i.SLIDER_ID);t&&e&&(t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),i.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,l.positionPanel)()}),i.ROOT_DOC.addEventListener("click",t=>{if(!i.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e&&e.closest&&(e.closest("#"+i.PANEL_ID)||e.closest("#"+i.BTN_ID))||i.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},!0),i.ROOT_DOC.addEventListener("keydown",t=>{"Escape"===t.key&&i.ROOT_DOC.body.classList.remove("lia-tff-panel-open")}),i.ROOT_WIN.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),i.ROOT_WIN.visualViewport&&(i.ROOT_WIN.visualViewport.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),i.ROOT_WIN.visualViewport.addEventListener("scroll",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()})),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),r=(0,i.clamp)(parseInt(e.value||"24",10),t,n);try{localStorage.setItem(i.FONT_KEY,String(r))}catch(t){}(0,s.setPresFontPx)(r)}))}function d(t){let e=new Set(["style","data-lia-mode"]);function n(){return new MutationObserver(n=>{for(let r of n)if(!("attributes"===r.type&&r.attributeName&&e.has(r.attributeName)))return void t()})}try{n().observe(i.ROOT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{n().observe(i.CONTENT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}if(i.ROOT_WIN.addEventListener("storage",function(e){e&&(e.key===i.SETTINGS_KEY||e.key===i.FONT_KEY)&&t()}),i.ROOT_WIN.setInterval(()=>{i.I.__alive&&t()},5e3),"u">typeof ResizeObserver)try{let t=new ResizeObserver(()=>p()),e=(0,a.getToolbarHeader)();if(e)t.observe(e);else{let e=new MutationObserver(()=>{let n=(0,a.getToolbarHeader)();n&&(t.observe(n),e.disconnect())});e.observe(i.ROOT_DOC.documentElement,{childList:!0,subtree:!0})}}catch(t){}}},{"./state":"jPEty","./ui":"7Wjmu","./toolbar":"asdc8","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(t,e,n,r){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"initModeOnly",()=>u),o.export(n,"applyModeOnlyNow",()=>f);let i="__LIA_MODE_ONLY_STYLE_V01__",l=`
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
`;function a(t){return String(t??"").trim().toLowerCase()}function s(t){let e=a(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function p(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),n=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),r=n.length?n:[document];for(let t of r)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(i))return;let n=t.createElement("style");n.id=i,n.appendChild(t.createTextNode(l)),e.appendChild(n)}catch(t){}}(t);let o=t;if("unknown"===o)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let r of e){let e=s(a(r.textContent));if(!e)continue;let o=r.closest("button,[role='button'],a"),i=(o||r).getBoundingClientRect(),l=t.defaultView.innerWidth||1200,p=0;i.top<140&&(p+=200),i.left>.55*l&&(p+=200),o&&function(t){let e=a(t.getAttribute("aria-pressed")),n=a(t.getAttribute("aria-selected")),r=a(t.className);return"true"===e||"true"===n||r.includes("active")||r.includes("selected")||r.includes("mdc-icon-button--on")}(o)&&(p+=1e3),(!n||p>n.score)&&(n={mode:e,score:p})}return n?n.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(a(e.location.search)+"&"+a(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),r=e.getItem(n),o=s((n||"")+" "+(r||""));if(o)return o}}catch(t){}return null}(e)}(t);if(e){o=e;break}}let p="slides"===o||"presentation"===o||"textbook"===o;for(let t of r)try{p?t.documentElement.setAttribute("data-lia-mode",o):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}function u(t){let e=()=>p(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3)}function f(t){p(t)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
