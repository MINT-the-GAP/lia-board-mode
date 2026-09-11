!function(t,e,n,i,r){var o="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof o[i]&&o[i],a=l.i||{},s=l.cache||{},c="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(e,n){if(!s[e]){if(!t[e]){if(r[e])return r[e];var a="function"==typeof o[i]&&o[i];if(!n&&a)return a(e,!0);if(l)return l(e,!0);if(c&&"string"==typeof e)return c(e);var d=Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(n){var i=t[e][1][n];return null!=i?i:n},f.cache={};var p=s[e]=new u.Module(e);t[e][0].call(p.exports,f,p,p.exports,o)}return s[e].exports;function f(t){var e=f.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],i=t[1],r=t[2]||t[0],o=u(i);"*"===e?Object.keys(o).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return o[t]}})}):"*"===r?Object.defineProperty(n,e,{enumerable:!0,value:o}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===r?o.__esModule?o.default:o:o[r]}})}),n}return u(e)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.require=c,this.exports={}},u.modules=t,u.cache=s,u.parent=l,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=a,u.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return o[i]}}),o[i]=u;for(var d=0;d<e.length;d++)u(e[d]);if(n){var p=u(n);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(t,e,n,i){var r=t("./presenter"),o=t("./reverseNavigation"),l=t("./autoscrolling"),a=t("./state"),s=t("./mode"),c=t("./css"),u=t("./font"),d=t("./toolbar"),p=t("./ui"),f=t("./events"),m=t("./modeOnly");function h(){(0,l.syncAutoscrolling)(),(0,o.syncReverseNavigation)((0,s.detectMode)()),(0,r.syncPresenterSupport)((0,s.detectMode)()),a.I.ticking||(a.I.ticking=!0,a.ROOT_WIN.requestAnimationFrame(()=>{try{(0,c.ensureContentCSS)(),(0,c.ensureRootCSS)();let t=(0,s.safeGetSettingsRaw)(),e=(0,s.detectMode)();(0,s.applyModeAttr)(e),(0,c.syncAccent)(e),(0,c.syncDarkMode)(),(0,p.ensureUI)(f.wireOnce),(0,d.syncNightlyMiniMode)();let n=(0,p.setPresentationOnlyVisibility)(e);(0,p.syncVoiceFooterToggle)(e),(0,p.syncHeaderBandToggle)(e);let i=null===a.I.lastShow||n!==a.I.lastShow;a.I.lastShow=n;let r=(0,d.toolbarSignature)(),o=!!(r&&r!==a.I.lastToolbarSig);a.I.lastToolbarSig=r||a.I.lastToolbarSig,!n&&o&&(a.I.pendingReposition=!0),(0,p.positionOverlayButton)();let l=e!==a.I.lastMode||t!==a.I.lastSettingsRaw;l&&((0,u.applyFontLogic)(e),(0,m.applyModeOnlyNow)(e),a.I.lastMode=e,a.I.lastSettingsRaw=t);let h=i||o||l||a.I.pendingReposition;(0,c.syncSlideExitSpace)(e),h&&(a.I.pendingReposition=!1,(0,f.burstRepositionThrottled)()),(0,u.syncSliderToCurrent)(),(0,p.syncFontSizeLabel)(),n&&(0,p.positionPanel)()}finally{a.I.ticking=!1}}))}(0,a.initInstance)()&&((0,o.initReverseNavigation)(),(0,r.initPresenterSupport)(),(0,f.initEvents)(h),h(),(0,m.initModeOnly)(()=>a.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU","./presenter":"d6102","./autoscrolling":"a2N0z","./reverseNavigation":"lCNcT"}],jPEty:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(){let t=window,e=null;for(;;)try{if(function(t){try{return t.frameElement?.id==="liascript-preview"}catch(t){return!1}}(t)||function(t){try{return!!t.querySelector("#lia-toolbar-nav, .lia-canvas, #lia-toc, header.lia-header")}catch(t){return!1}}(t.document))return t;let n=t.parent;if(!n||n===t)break;n.document.documentElement,e||(e=n),t=n}catch(t){break}return e||window}r.defineInteropFlag(n),r.export(n,"getRootWindow",()=>o),r.export(n,"ROOT_WIN",()=>l),r.export(n,"ROOT_DOC",()=>a),r.export(n,"CONTENT_WIN",()=>s),r.export(n,"CONTENT_DOC",()=>c),r.export(n,"REG",()=>d),r.export(n,"DOC_ID",()=>p),r.export(n,"I",()=>f),r.export(n,"initInstance",()=>m),r.export(n,"SETTINGS_KEY",()=>h),r.export(n,"FONT_KEY",()=>g),r.export(n,"OVERLAY_ID",()=>O),r.export(n,"BTN_ID",()=>y),r.export(n,"PANEL_ID",()=>b),r.export(n,"SLIDER_ID",()=>T),r.export(n,"TITLE_ID",()=>_),r.export(n,"INLINE_SLOT_ID",()=>x),r.export(n,"VOICE_TOGGLE_BTN_ID",()=>v),r.export(n,"HEADER_TOGGLE_BTN_ID",()=>C),r.export(n,"clamp",()=>E),r.export(n,"clearPosTimers",()=>N);let l=o(),a=l.document,s=window,c=document,u="__LIA_TFF_REG_V2__";l[u]=l[u]||{instances:{}};let d=l[u],p=(c.baseURI||s.location.href||"")+"::"+(c.title||""),f=null;function m(){return!d.instances[p]?.__alive&&(f={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1},d.instances[p]=f,!0)}let h="settings",g="lia-tff-font-px-v2",O="lia-tff-overlay-v2",y="lia-tff-btn-v2",b="lia-tff-panel-v2",T="lia-tff-slider-v2",_="lia-tff-title-v2",x="lia-tff-inline-slot-v2",v="lia-tff-voice-toggle-v2",C="lia-tff-header-toggle-v2";function E(t,e,n){return Math.max(e,Math.min(n,t))}function N(){try{for(f.posTimers||(f.posTimers=[]);f.posTimers.length;)l.clearTimeout(f.posTimers.pop())}catch(t){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,n,i){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}],aGLfG:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"norm",()=>l),r.export(n,"safeGetSettingsRaw",()=>a),r.export(n,"findModeInJson",()=>s),r.export(n,"detectMode",()=>c),r.export(n,"applyModeAttr",()=>u);var o=t("./state");function l(t){return String(null==t?"":t).toLowerCase()}function a(){try{return localStorage.getItem(o.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set,n=new Set(["mode","view","layout","format"]);return function t(i){if(null==i)return null;if("string"==typeof i){let t=l(i);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof i||e.has(i))return null;e.add(i);let r=[];for(let e in i)if(Object.prototype.hasOwnProperty.call(i,e))if(n.has(l(e))){let n=t(i[e]);if(n)return n}else r.push(e);for(let e of r){let n=t(i[e]);if(n)return n}return null}(t)}function c(){let t=a();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(n){let e=l(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function u(t){try{let e=o.CONTENT_DOC.documentElement;e.dataset.liaMode!==t&&(e.dataset.liaMode=t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureStyle",()=>l),r.export(n,"setVar",()=>a),r.export(n,"syncAccent",()=>d),r.export(n,"ensureContentCSS",()=>f),r.export(n,"syncSlideExitSpace",()=>y),r.export(n,"ensureRootCSS",()=>T),r.export(n,"syncDarkMode",()=>x);var o=t("./state");function l(t,e,n){try{if(!t||t.getElementById(e))return;let i=t.createElement("style");i.id=e,i.textContent=n,(t.head||t.documentElement).appendChild(i)}catch(t){}}function a(t,e,n){try{t.documentElement.style.setProperty(e,n)}catch(t){}}let s=null,c=null;function u(t){try{let e=t||document,n=e.body||e.documentElement,i=e.defaultView,r=e.querySelector(".lia-btn");if(r){let t=i.getComputedStyle(r).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let o=e.createElement("button");o.className="lia-btn",o.type="button",o.textContent="x",o.style.position="absolute",o.style.left="-9999px",o.style.top="-9999px",o.style.visibility="hidden",n.appendChild(o);let l=i.getComputedStyle(o).backgroundColor;if(o.remove(),l&&"rgba(0, 0, 0, 0)"!==l&&"transparent"!==l)return l}catch(t){}return null}function d(t){if(t===c&&s){a(o.ROOT_DOC,"--lia-tff-accent",s),a(o.CONTENT_DOC,"--lia-tff-accent",s);return}let e=u(o.ROOT_DOC)||u(o.CONTENT_DOC)||"rgb(11,95,255)";s=e,c=t,a(o.ROOT_DOC,"--lia-tff-accent",e),a(o.CONTENT_DOC,"--lia-tff-accent",e)}let p=`
:root{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 81vh;
}

/* Collapsible TTS footer (mode 1/2): hidden by default until user expands. */
html.lia-tff-voice-collapsed[data-lia-mode="presentation"] .lia-responsive-voice,
html.lia-tff-voice-collapsed[data-lia-mode="slides"] .lia-responsive-voice{
  min-height: 0 !important;
  max-height: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
  opacity: 0 !important;
}

html[data-lia-mode="presentation"] .lia-responsive-voice,
html[data-lia-mode="slides"] .lia-responsive-voice{
  transition: max-height .2s ease, opacity .2s ease, padding .2s ease;
}

/* LiaScript reserves the fixed header height on the slide container itself. */
html.lia-tff-header-collapsed[data-lia-mode="presentation"] .lia-slide > .lia-slide__container,
html.lia-tff-header-collapsed[data-lia-mode="slides"] .lia-slide > .lia-slide__container{
  margin-block-start: 0 !important;
}

html.lia-tff-header-collapsed[data-lia-mode="slides"] .lia-canvas.lia-mode--slides .lia-slide{
  height: 100vh !important;
}

html[data-lia-mode="presentation"] body,
html[data-lia-mode="slides"] body{
  margin: 0 !important;
  overflow-x: hidden !important;
}

html[data-lia-mode="presentation"] main,
html[data-lia-mode="slides"] main{
  box-sizing: border-box !important;

  /* LiaScript shrinks its canvas while the TOC or another side panel is open. */
  width: min(
    var(--lia-tff-maxw),
    calc(100% - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
  ) !important;

  max-width: min(
    var(--lia-tff-maxw),
    calc(100% - var(--lia-tff-left-gap) - var(--lia-tff-right-gap))
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

/* Reliable scroll spacer only on real slide content nodes. */
html[data-lia-mode="presentation"] .lia-slide__container > main.lia-slide__content::after,
html[data-lia-mode="slides"] .lia-slide__container > main.lia-slide__content::after{
  content: "";
  display: block;
  height: var(--lia-tff-slide-exit-space);
  pointer-events: none;
}

/* Opt-in horizontal layout for LiaScript single-/multiple-choice answers. */
@media (min-width: 761px){
  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers{
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    width: 100% !important;
    margin-inline: 0 !important;
    padding-inline: 0 !important;
    gap: 0 !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label{
    box-sizing: border-box !important;
    display: flex !important;
    flex: 1 1 0 !important;
    position: relative !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: .5rem clamp(.5rem, 1.4vw, 1.2rem) !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label + .lia-label::before,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label + .lia-label::before{
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 2px;
    background: rgb(var(--color-highlight));
    pointer-events: none;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label > span,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label > span{
    min-width: 0 !important;
    overflow-wrap: anywhere;
  }
}
`;function f(){l(o.CONTENT_DOC,"lia-tff-style-content-v2",p)}let m=null,h=null,g=null;function O(t,e){let n=String(t||"").trim().toLowerCase();if(!n)return 0;if(n.endsWith("px")){let t=parseFloat(n.slice(0,-2));return isFinite(t)?t:0}if(n.endsWith("vh")){let t=parseFloat(n.slice(0,-2));return isFinite(t)?e*t/100:0}let i=parseFloat(n);return isFinite(i)?i:0}function y(t){if("presentation"!==t&&"slides"!==t){m=null,h=null,g=null;return}try{let e=Array.from(o.CONTENT_DOC.querySelectorAll(".lia-slide__container"));if(!e.length)return;let n=o.CONTENT_WIN.innerHeight||1e3,i=e.filter(t=>t.clientHeight>80).map(t=>{let e=o.CONTENT_WIN.getComputedStyle(t),i=t.getBoundingClientRect(),r=Math.max(0,Math.min(i.bottom,n)-Math.max(i.top,0))*Math.max(1,i.width),l=Math.max(0,t.scrollHeight-t.clientHeight),a=+("none"!==e.display&&"hidden"!==e.visibility);return{el:t,r:i,score:a*(r+10*l)}}).sort((t,e)=>e.score-t.score),r=i[0]&&i[0].score>0?i[0].el:e.sort((t,e)=>e.scrollHeight-e.clientHeight-(t.scrollHeight-t.clientHeight))[0];if(!r)return;let l=r.querySelector("main.lia-slide__content")||o.CONTENT_DOC.querySelector("main.lia-slide__content")||o.CONTENT_DOC.querySelector("main");if(!l)return;let s=o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-slide-exit-space"),c=O(s,o.CONTENT_WIN.innerHeight),u=[t,Math.round(o.CONTENT_WIN.innerWidth),Math.round(o.CONTENT_WIN.innerHeight),Math.round(r.clientHeight),Math.round(r.scrollHeight-c),Math.round(r.getBoundingClientRect().top),Math.round(l.clientWidth),Math.round(l.scrollHeight-c)].join("|");if(r===h&&l===g&&u===m)return;for(let t=0;t<3;t++){let t=function(t){let e=Array.from(t.querySelectorAll("*"));for(let t=e.length-1;t>=0;t--){let n=e[t];if(!n||!(n.textContent||"").trim())continue;let i=o.CONTENT_WIN.getComputedStyle(n);if("none"!==i.display&&"hidden"!==i.visibility)try{let t=o.CONTENT_DOC.createRange();t.selectNodeContents(n);let e=Array.from(t.getClientRects());for(let t=e.length-1;t>=0;t--){let n=e[t];if(n&&!(n.width<4)&&!(n.height<2))return n}}catch(t){}}return null}(l);if(!t)break;let e=r.getBoundingClientRect(),n=Math.max(0,r.scrollHeight-r.clientHeight),i=t.top-Math.max(0,n-r.scrollTop),s=e.top-.6*Math.max(2,t.height),c=o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-slide-exit-space"),u=O(c,o.CONTENT_WIN.innerHeight),d=i-s;if(1>=Math.abs(d))break;let p=(0,o.clamp)(u+d,0,1.25*r.clientHeight);if(1>Math.abs(p-u))break;a(o.CONTENT_DOC,"--lia-tff-slide-exit-space",`${p.toFixed(2)}px`),l.offsetHeight}m=u,h=r,g=l}catch(t){}}let b=`
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#lia-tff-voice-toggle-v2{
  position: fixed !important;
  right: 5% !important;
  bottom: 0 !important;
  z-index: 99999982 !important;
  width: 28px !important;
  height: 24px !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid color-mix(in srgb, var(--lia-tff-accent) 40%, #8a8f98) !important;
  border-bottom: 0 !important;
  border-radius: 8px 8px 0 0 !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 14%, #2e3035) !important;
  color: #e9edf4 !important;
  font-size: 12px !important;
  line-height: 1 !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#lia-tff-voice-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 22%, #2e3035) !important;
}

#lia-tff-voice-toggle-v2:focus,
#lia-tff-voice-toggle-v2:focus-visible{
  outline: none !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lia-tff-accent) 40%, transparent) !important;
}

#lia-tff-header-toggle-v2{
  position: fixed !important;
  right: 5% !important;
  top: 0 !important;
  /* Below LiaScript's header (100) and its menus, above slide content. */
  z-index: 99 !important;
  width: 28px !important;
  height: 24px !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid color-mix(in srgb, var(--lia-tff-accent) 40%, #8a8f98) !important;
  border-top: 0 !important;
  border-radius: 0 0 8px 8px !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 14%, #2e3035) !important;
  color: #e9edf4 !important;
  font-size: 12px !important;
  line-height: 1 !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

#lia-tff-header-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 22%, #2e3035) !important;
}

#lia-tff-header-toggle-v2:focus,
#lia-tff-header-toggle-v2:focus-visible{
  outline: none !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lia-tff-accent) 40%, transparent) !important;
}

/* Match the light interface while keeping the existing dark tabs unchanged. */
body:not(.lia-tff-dark) #lia-tff-voice-toggle-v2,
body:not(.lia-tff-dark) #lia-tff-header-toggle-v2{
  border-color: color-mix(in srgb, var(--lia-tff-accent) 25%, #adb3bc) !important;
  background: color-mix(in srgb, var(--lia-tff-accent) 8%, #fff) !important;
  color: #2e3035 !important;
}

body:not(.lia-tff-dark) #lia-tff-voice-toggle-v2:hover,
body:not(.lia-tff-dark) #lia-tff-header-toggle-v2:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 16%, #fff) !important;
}

@media (min-width: 1001px){
  html.lia-tff-header-collapsed #lia-toolbar-nav,
  html.lia-tff-header-collapsed header.lia-header{
    min-height: 0 !important;
    max-height: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border-width: 0 !important;
    overflow: hidden !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    box-shadow: none !important;
  }

  html.lia-tff-header-collapsed .lia-slide > .lia-slide__container{
    margin-block-start: 0 !important;
  }

  html.lia-tff-header-collapsed .lia-canvas.lia-mode--slides .lia-slide{
    height: 100vh !important;
  }
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

@media (max-width: 1000px){
  #lia-tff-voice-toggle-v2,
  #lia-tff-header-toggle-v2{ display: none !important; }
}
`;function T(){l(o.ROOT_DOC,"lia-tff-style-root-v2",b)}let _=null;function x(){try{if(!o.ROOT_DOC.body)return;let t=function(){try{let t=o.ROOT_DOC.documentElement,e=o.ROOT_DOC.body;if(t.classList.contains("lia-variant-light")||"light"===t.getAttribute("data-bs-theme")||"light"===t.getAttribute("data-theme")||"light"===e.getAttribute("data-bs-theme")||"light"===e.getAttribute("data-theme"))return!1;if(t.classList.contains("lia-variant-dark")||"dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark"))return!0}catch(t){}try{if(o.ROOT_WIN.matchMedia&&o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(t){}try{let t=o.ROOT_WIN.getComputedStyle(o.ROOT_DOC.body).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t){let e=t.match(/\d+/g);if(e&&e.length>=3&&(.299*e[0]+.587*e[1]+.114*e[2])/255<.45)return!0}}catch(t){}return!1}();if(t===_)return;_=t,o.ROOT_DOC.body.classList.toggle("lia-tff-dark",t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getSavedFontPx",()=>s),r.export(n,"setPresFontPx",()=>c),r.export(n,"applyFontLogic",()=>d),r.export(n,"syncSliderToCurrent",()=>p);var o=t("./state"),l=t("./css");let a=[18,24,32];function s(){try{let t=localStorage.getItem(o.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function c(t){(0,l.setVar)(o.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let u=!1;function d(t){let e="presentation"===t;if(!(e||"slides"===t))return void c(null);if(e){let t=s();if(null!=t)return void c((0,o.clamp)(t,14,48))}u||(u=!0,c(null),o.CONTENT_WIN.requestAnimationFrame(function(){o.CONTENT_WIN.requestAnimationFrame(function(){var t;let e,n;c(a[(e=o.CONTENT_DOC.querySelector("main")||o.CONTENT_DOC.documentElement,(t=isNaN(n=parseFloat(o.CONTENT_WIN.getComputedStyle(e).fontSize||"16"))?16:n)<=17)?0:t<=19?1:2]),u=!1})}))}function p(){let t=o.ROOT_DOC.getElementById(o.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),i=s();if(null!=i){t.value=String((0,o.clamp)(i,e,n));return}let r=parseInt(o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(r)&&(t.value=String((0,o.clamp)(r,e,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getToolbarHeader",()=>l),r.export(n,"getToolbarLeftContainer",()=>a),r.export(n,"getViewport",()=>s),r.export(n,"getVisibleRect",()=>c),r.export(n,"getRectLoose",()=>u),r.export(n,"isSaneTopLeftRect",()=>d),r.export(n,"isNightlyNavigationHidden",()=>p),r.export(n,"syncNightlyMiniMode",()=>f),r.export(n,"getTFFTOCButton",()=>m),r.export(n,"getTFFTOCButtonRect",()=>h),r.export(n,"shouldUseTFFNightlyStackDock",()=>g),r.export(n,"shouldUseInlineStripDock",()=>O),r.export(n,"ensureInlineDockSlot",()=>y),r.export(n,"getHighlightRect",()=>b),r.export(n,"getToolbarBandRect",()=>T),r.export(n,"getVirtualHighlightSlotRect",()=>_),r.export(n,"getStableLeftToolbarPeers",()=>x),r.export(n,"getTOCDockSlot",()=>v),r.export(n,"getDockTarget",()=>C),r.export(n,"toolbarSignature",()=>E);var o=t("./state");function l(){return o.ROOT_DOC.querySelector("header#lia-toolbar-nav")||o.ROOT_DOC.querySelector("#lia-toolbar-nav")||o.ROOT_DOC.querySelector("header.lia-header")}function a(){let t=l();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=o.ROOT_WIN.visualViewport;if(t)return{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0};let e=o.ROOT_DOC.documentElement;return{w:e.clientWidth,h:e.clientHeight,ox:0,oy:0}}function c(t){if(!t)return null;try{let e=o.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility||"0"===e.opacity)return null;let n=t.getBoundingClientRect();if(!n||n.width<6||n.height<6)return null;let i=s();if(n.right<0||n.bottom<0||n.left>i.w||n.top>i.h)return null;return n}catch(t){return null}}function u(t){if(!t)return null;try{let e=o.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility)return null;let n=t.getBoundingClientRect();if(!n||n.width<2||n.height<2)return null;let i=s();if(n.right<0||n.bottom<0||n.left>i.w||n.top>i.h)return null;return n}catch(t){return null}}function d(t){if(!t)return!1;let e=s();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function p(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function f(){try{let t=o.ROOT_DOC.body;if(!t)return;let e=p();t.classList.contains("lia-tff-nightly-mini")!==e&&t.classList.toggle("lia-tff-nightly-mini",e)}catch(t){}}function m(){let t=o.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=a();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function h(){let t=m();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}function g(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function O(){if(g())return!1;let t=a(),e=m();return!!(t&&e&&t.contains(e))}function y(){let t=a(),e=m();if(!t||!e||!t.contains(e))return null;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);return n||((n=o.ROOT_DOC.createElement("div")).id=o.INLINE_SLOT_ID),(n.parentNode!==t||n.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",n),n}function b(){let t=o.ROOT_DOC.getElementById("lia-hl-btn");if(!t)return null;let e=null;try{e=t.getBoundingClientRect()}catch(t){e=null}if(d(e))return e;let n=a()||t.parentElement||l();if(!n)return null;let i=c(n);if(!i)return null;let r=Math.max(34,t.offsetWidth||0),s=Math.max(34,t.offsetHeight||0),u=t.offsetLeft||0,p="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(i.height-s)/2),f={left:i.left+u,top:i.top+p,right:i.left+u+r,bottom:i.top+p+s,width:r,height:s};return d(f)?f:{left:i.left+8,top:i.top+Math.max(0,(i.height-34)/2),right:i.left+8+34,bottom:i.top+Math.max(0,(i.height-34)/2)+34,width:34,height:34}}function T(){let t=c(a());return t||c(l())}function _(){let t=T();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function x(){let t=s(),e=a();if(!e)return[];let n=[];for(let i of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!i||i.id===o.BTN_ID)continue;let e=c(i);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:i,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let i=n[0].r.top+n[0].r.height/2,r=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-i)<=r)}function v(){let t=o.ROOT_DOC.getElementById("lia-toc"),e=o.ROOT_DOC.getElementById("lia-btn-toc"),n=u(e),i=p(),r=i?22:34;if(!n)return null;if(i){let t=n.left+(n.width-r)/2,i=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,i),right:Math.max(8,t)+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:e,r:n}]}}if(t&&t.classList.contains("lia-toc--open")){let t=n.right+8,i=n.top+(n.height-r)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,i),right:t+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:e,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:e,r:n}]}}function C(){let t=b();if(t)return{kind:"highlight",rect:t,peers:[{el:o.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=x();if(e.length){let t=e[0].r;for(let n of e)n.r.right>t.right&&(t=n.r);return{kind:"toolbar-row",rect:t,peers:e}}let n=v();if(n)return n;let i=_();return i?{kind:"virtual-highlight-slot",rect:i,peers:[]}:null}function E(){try{let t=s(),e=C();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let n=e.rect,i=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(n.left),Math.round(n.top),Math.round(n.right),Math.round(n.bottom),Math.round(n.width),Math.round(n.height),i].join("|")}catch(t){return null}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureUI",()=>u),r.export(n,"toggleVoiceFooterCollapsed",()=>m),r.export(n,"syncVoiceFooterToggle",()=>h),r.export(n,"toggleHeaderBandCollapsed",()=>b),r.export(n,"positionHeaderBandToggle",()=>T),r.export(n,"syncHeaderBandToggle",()=>_),r.export(n,"placeButtonInCorrectHost",()=>x),r.export(n,"positionOverlayButton",()=>v),r.export(n,"positionPanel",()=>E),r.export(n,"setPresentationOnlyVisibility",()=>N),r.export(n,"syncFontSizeLabel",()=>D);var o=t("./state"),l=t("./toolbar"),a=t("./i18n");let s=!0,c=!1;function u(t){let e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);e||((e=o.ROOT_DOC.createElement("div")).id=o.OVERLAY_ID,o.ROOT_DOC.body.appendChild(e));let n=o.ROOT_DOC.getElementById(o.BTN_ID);if(!n){(n=o.ROOT_DOC.createElement("button")).id=o.BTN_ID,n.type="button";let t=(0,a.getFontSizeLabel)();n.setAttribute("aria-label",t),n.setAttribute("title",t);let i=o.ROOT_DOC.createElement("span");i.className="tffA-small",i.textContent="A";let r=o.ROOT_DOC.createElement("span");r.className="tffA-big",r.textContent="A",n.appendChild(i),n.appendChild(r),e.appendChild(n)}let i=!1,r=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!r){(r=o.ROOT_DOC.createElement("div")).id=o.PANEL_ID;let t=(0,a.getFontSizeLabel)(),e=o.ROOT_DOC.createElement("div");e.id=o.TITLE_ID,e.textContent=t;let n=o.ROOT_DOC.createElement("input");n.id=o.SLIDER_ID,n.type="range",n.min="14",n.max="48",n.step="1",n.value="24",n.setAttribute("aria-label",t),r.appendChild(e),r.appendChild(n),o.ROOT_DOC.body.appendChild(r),i=!0}let l=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);l||((l=o.ROOT_DOC.createElement("button")).id=o.VOICE_TOGGLE_BTN_ID,l.type="button",l.setAttribute("aria-label","Vorleseleiste ausfahren"),l.setAttribute("title","Vorleseleiste ausfahren"),l.textContent="▲",o.ROOT_DOC.body.appendChild(l),i=!0);let s=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);s||((s=o.ROOT_DOC.createElement("button")).id=o.HEADER_TOGGLE_BTN_ID,s.type="button",s.setAttribute("aria-label","Headerband einklappen"),s.setAttribute("title","Headerband einklappen"),s.setAttribute("aria-expanded","true"),s.textContent="▲",o.ROOT_DOC.body.appendChild(s)),i&&t&&t()}function d(t){let e=o.ROOT_DOC.documentElement;e.classList.contains("lia-tff-voice-collapsed")!==t&&e.classList.toggle("lia-tff-voice-collapsed",t)}function p(){let t=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!t)return;let e=s,n=String.fromCodePoint(e?9650:9660),i=e?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";if(t.textContent===n&&t.getAttribute("aria-label")===i&&t.getAttribute("title")===i)return;t.textContent=e?"▲":"▼";let r=e?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";t.setAttribute("aria-label",r),t.setAttribute("title",r)}function f(t){if("presentation"!==t&&"slides"!==t)return!1;let e=o.ROOT_WIN.visualViewport;return(e?e.width:o.ROOT_DOC.documentElement.clientWidth||0)>=1001}function m(){d(s=!s),p()}function h(t){let e=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!e)return;e.onclick=t=>{t&&(t.preventDefault(),t.stopPropagation()),m()};let n=f(t);if(e.style.display=n?"flex":"none",!n){d(!1),p();return}o.ROOT_DOC.documentElement.classList.contains("lia-tff-voice-collapsed")!==s&&d(s),p()}function g(t){try{t.focus({preventScroll:!0})}catch(e){t.focus()}}function O(t){if(t){let t=(0,l.getToolbarHeader)(),e=o.ROOT_DOC.activeElement,n=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);t&&e&&t.contains(e)&&n&&g(n)}let e=[o.ROOT_DOC.documentElement];for(let n of(o.CONTENT_DOC!==o.ROOT_DOC&&e.push(o.CONTENT_DOC.documentElement),e))n.classList.contains("lia-tff-header-collapsed")!==t&&n.classList.toggle("lia-tff-header-collapsed",t)}function y(){let t=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!t)return;let e=c,n=String.fromCodePoint(e?9660:9650),i=e?"Headerband ausfahren":"Headerband einklappen",r=e?"false":"true";(t.textContent!==n||t.getAttribute("aria-label")!==i||t.getAttribute("title")!==i||t.getAttribute("aria-expanded")!==r)&&(t.textContent=e?"▼":"▲",t.setAttribute("aria-label",i),t.setAttribute("title",i),t.setAttribute("aria-expanded",r))}function b(){O(c=!c),c&&(o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),(0,o.clearPosTimers)()),y(),T()}function T(){let t=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!t)return;let e=0;if(!c){let t=(0,l.getToolbarHeader)();if(t)try{let n=t.getBoundingClientRect();isFinite(n.bottom)&&(e=Math.max(0,n.bottom))}catch(t){}}let n=`${Math.round(e)}px`;(t.style.getPropertyValue("top")!==n||"important"!==t.style.getPropertyPriority("top"))&&t.style.setProperty("top",n,"important")}function _(t){let e=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!e)return;e.onclick=t=>{t&&(t.preventDefault(),t.stopPropagation()),b()};let n=(0,l.getToolbarHeader)(),i=f(t)&&!!n,r=n&&n.id;if(r&&e.getAttribute("aria-controls")!==r?e.setAttribute("aria-controls",r):!r&&e.hasAttribute("aria-controls")&&e.removeAttribute("aria-controls"),!i){if(O(!1),o.ROOT_DOC.activeElement===e){let t=n?.querySelector('#lia-btn-toc, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');t&&t!==e?g(t):e.blur()}e.style.display="none",T(),y();return}e.style.display="flex",O(c),T(),y()}function x(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!e)return;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);if((0,l.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}if((0,l.shouldUseInlineStripDock)()){let n=(0,l.ensureInlineDockSlot)();n&&t.parentNode!==n&&n.appendChild(t),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n)}function v(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!e||(x(),(0,l.shouldUseInlineStripDock)()))return;let n=(0,l.getViewport)(),i=(0,l.isNightlyNavigationHidden)()?22:34,r=i,a=i;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(r=e.width,a=e.height)}catch(t){}let s=8,c=8;if((0,l.shouldUseTFFNightlyStackDock)()){let t=(0,l.getTFFTOCButtonRect)();t&&(s=t.left+(t.width-r)/2,c=t.bottom+6)}else{let t=(0,l.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(s=e.right+8,c=e.top+(e.height-a)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(s=e.left,c=e.top)}}s=(0,o.clamp)(s,8,n.w-r-8),c=(0,o.clamp)(c,8,n.h-a-8),e.style.left=`${Math.round(n.ox)}px`,e.style.top=`${Math.round(n.oy)}px`,t.style.left=`${Math.round(s)}px`,t.style.top=`${Math.round(c)}px`}let C=null;function E(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!t||!e||!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let n=t.getBoundingClientRect(),i=(0,l.getViewport)(),r=function(t){if(C)return C;let e=t.style.display,n=t.style.visibility,i=t.style.left,r=t.style.top;t.style.display="block",t.style.visibility="hidden",t.style.left="-9999px",t.style.top="-9999px";let o=t.offsetWidth||240,l=t.offsetHeight||90;return t.style.display=e,t.style.visibility=n,t.style.left=i,t.style.top=r,C={w:o,h:l}}(e),a=n.left,s=n.bottom+10;a=(0,o.clamp)(a,8,i.w-r.w-8),s+r.h+8>i.h&&(s=n.top-10-r.h),s=(0,o.clamp)(s,8,i.h-r.h-8),e.style.left=`${Math.round(a+i.ox)}px`,e.style.top=`${Math.round(s+i.oy)}px`}function N(t){let e=function(){try{let t=o.ROOT_WIN.visualViewport,e=t?t.width:o.ROOT_DOC.documentElement.clientWidth||9999,n=t?t.height:o.ROOT_DOC.documentElement.clientHeight||9999,i=Math.min(e,n);return e<=680||i<=520}catch(t){return!1}}(),n="presentation"===t&&!e,i=o.ROOT_DOC.getElementById(o.BTN_ID),r=o.ROOT_DOC.getElementById(o.PANEL_ID);return i&&(i.style.display=n?"inline-flex":"none"),!n&&r&&(o.ROOT_DOC.body.classList.contains("lia-tff-panel-open")&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),r.style.display="none",(0,o.clearPosTimers)()),n}let I=null;function D(){try{let t=(0,a.detectLanguage)();if(t===I)return;I=t;let e=(0,a.getFontSizeLabel)(),n=o.ROOT_DOC.getElementById(o.TITLE_ID);n&&(n.textContent=e);let i=o.ROOT_DOC.getElementById(o.BTN_ID);i&&(i.setAttribute("aria-label",e),i.setAttribute("title",e));let r=o.ROOT_DOC.getElementById(o.SLIDER_ID);r&&r.setAttribute("aria-label",e)}catch(t){}}},{"./state":"jPEty","./toolbar":"asdc8","./i18n":"7hvC6","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7hvC6":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"detectLanguage",()=>a),r.export(n,"getFontSizeLabel",()=>s);var o=t("./state");let l={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function a(){try{let t=o.CONTENT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=o.ROOT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=localStorage.getItem(o.SETTINGS_KEY);if(t){let e=JSON.parse(t),n=e?.language??e?.lang;if(n&&"string"==typeof n&&n.length>=2)return n.toLowerCase().slice(0,2)}}catch(t){}return"en"}function s(){return l[a()]??l.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"scheduleRepositionBurst",()=>d),r.export(n,"burstRepositionThrottled",()=>p),r.export(n,"disposeEvents",()=>h),r.export(n,"wireOnce",()=>O),r.export(n,"initEvents",()=>y);var o=t("./state"),l=t("./ui"),a=t("./toolbar"),s=t("./font"),c=t("./keyboard");function u(){(0,l.positionOverlayButton)(),(0,l.positionPanel)(),(0,l.positionHeaderBandToggle)()}function d(){(0,o.clearPosTimers)(),o.ROOT_WIN.requestAnimationFrame(()=>{u(),o.ROOT_WIN.requestAnimationFrame(()=>u())})}function p(){let t=Date.now();t-(o.I.lastBurstAt||0)<120||(o.I.lastBurstAt=t,d())}let f=new AbortController,m=[];function h(){for(f.abort();m.length;)try{m.pop().disconnect()}catch(t){}}let g=!1;function O(){if(g)return;let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.SLIDER_ID);t&&e&&(g=!0,t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),o.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,l.positionPanel)()}),o.ROOT_DOC.addEventListener("click",t=>{if(!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e&&e.closest&&(e.closest("#"+o.PANEL_ID)||e.closest("#"+o.BTN_ID)||e.closest("#"+o.VOICE_TOGGLE_BTN_ID))||o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{capture:!0,signal:f.signal}),o.ROOT_DOC.addEventListener("keydown",t=>{(0,c.isEditableKeyboardEvent)(t)||"Escape"===t.key&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{signal:f.signal}),o.ROOT_WIN.addEventListener("resize",u,{signal:f.signal}),o.ROOT_WIN.visualViewport&&(o.ROOT_WIN.visualViewport.addEventListener("resize",u,{signal:f.signal}),o.ROOT_WIN.visualViewport.addEventListener("scroll",u,{signal:f.signal})),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),i=(0,o.clamp)(parseInt(e.value||"24",10),t,n);try{localStorage.setItem(o.FONT_KEY,String(i))}catch(t){}(0,s.setPresFontPx)(i)}))}function y(t){let e=new Set(["style","data-lia-mode"]);function n(){return new MutationObserver(n=>{for(let i of n)if(!("attributes"===i.type&&i.attributeName&&e.has(i.attributeName)))return void t()})}try{let t=n();m.push(t),t.observe(o.ROOT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{let t=n();m.push(t),t.observe(o.CONTENT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}o.ROOT_WIN.addEventListener("storage",function(e){e&&(e.key===o.SETTINGS_KEY||e.key===o.FONT_KEY)&&t()},{signal:f.signal}),o.ROOT_WIN.addEventListener("resize",t,{signal:f.signal}),o.ROOT_WIN.visualViewport&&o.ROOT_WIN.visualViewport.addEventListener("resize",t,{signal:f.signal});let i=o.ROOT_WIN.setInterval(()=>{o.I.__alive&&t()},5e3);m.push({disconnect:()=>o.ROOT_WIN.clearInterval(i)});try{o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>t(),{signal:f.signal})}catch(t){}if("u">typeof ResizeObserver)try{let t=new ResizeObserver(()=>u());m.push(t);let e=(0,a.getToolbarHeader)();if(e)t.observe(e);else{let e=new MutationObserver(()=>{let n=(0,a.getToolbarHeader)();n&&(t.observe(n),e.disconnect())});m.push(e),e.observe(o.ROOT_DOC.documentElement,{childList:!0,subtree:!0})}}catch(t){}}},{"./state":"jPEty","./ui":"7Wjmu","./toolbar":"asdc8","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],"5sy7j":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(t){return!!t&&"function"==typeof t.matches}function l(t){try{let e=t.composedPath();if(e.length)return e.filter(o)}catch(t){}let e=[],n=t.target,i=o(n)?n:n?.parentElement||null;for(;i;)e.push(i),i=i.parentElement;return e}function a(t,e){return l(t).some(t=>t.matches(e))}function s(t){return l(t).some(t=>{if(t.matches("input, textarea, select, option, [role=textbox], .ace_editor, .monaco-editor, .CodeMirror, .cm-editor")||t.isContentEditable)return!0;let e=t.getAttribute("contenteditable");return null!==e&&"false"!==e.trim().toLowerCase()})}r.defineInteropFlag(n),r.export(n,"eventPathMatches",()=>a),r.export(n,"isEditableKeyboardEvent",()=>s)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"initModeOnly",()=>u),r.export(n,"applyModeOnlyNow",()=>d);let o="__LIA_MODE_ONLY_STYLE_V01__",l=`
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
`;function a(t){return String(t??"").trim().toLowerCase()}function s(t){let e=a(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function c(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),n=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),i=n.length?n:[document];for(let t of i)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(o))return;let n=t.createElement("style");n.id=o,n.appendChild(t.createTextNode(l)),e.appendChild(n)}catch(t){}}(t);let r=t;if("unknown"===r)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let i of e){let e=s(a(i.textContent));if(!e)continue;let r=i.closest("button,[role='button'],a"),o=(r||i).getBoundingClientRect(),l=t.defaultView.innerWidth||1200,c=0;o.top<140&&(c+=200),o.left>.55*l&&(c+=200),r&&function(t){let e=a(t.getAttribute("aria-pressed")),n=a(t.getAttribute("aria-selected")),i=a(t.className);return"true"===e||"true"===n||i.includes("active")||i.includes("selected")||i.includes("mdc-icon-button--on")}(r)&&(c+=1e3),(!n||c>n.score)&&(n={mode:e,score:c})}return n?n.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(a(e.location.search)+"&"+a(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),i=e.getItem(n),r=s((n||"")+" "+(i||""));if(r)return r}}catch(t){}return null}(e)}(t);if(e){r=e;break}}let c="slides"===r||"presentation"===r||"textbook"===r;for(let t of i)try{c?t.documentElement.setAttribute("data-lia-mode",r):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}function u(t){let e=()=>c(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3)}function d(t){c(t)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],d6102:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"PRESENTER_BLACKOUT_ID",()=>c),r.export(n,"initPresenterSupport",()=>T),r.export(n,"syncPresenterSupport",()=>_);var o=t("./state"),l=t("./mode"),a=t("./reverseNavigation"),s=t("./keyboard");let c="lia-tff-presenter-blackout-v1",u="data-lia-tff-presenter-blackout",d=!1,p=!1;function f(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(t){let e=String(t||"").trim().toLowerCase();return"presentation"===e||"slides"===e}function h(t,e,n){(t.style.getPropertyValue(e)!==n||"important"!==t.style.getPropertyPriority(e))&&t.style.setProperty(e,n,"important")}function g(){let t=o.ROOT_DOC.getElementById(c);if(!t){if(!o.ROOT_DOC.body)return null;(t=o.ROOT_DOC.createElement("div")).id=c,o.ROOT_DOC.body.appendChild(t)}"true"!==t.getAttribute("aria-hidden")&&t.setAttribute("aria-hidden","true"),"presentation"!==t.getAttribute("role")&&t.setAttribute("role","presentation"),h(t,"position","fixed"),h(t,"inset","0px"),h(t,"width","100vw"),h(t,"height","100vh"),h(t,"margin","0px"),h(t,"padding","0px"),h(t,"border","0px"),h(t,"background","rgb(0, 0, 0)"),h(t,"opacity","1"),h(t,"pointer-events","auto"),h(t,"cursor","none"),h(t,"z-index","2147483647");let e=!p;t.hidden!==e&&(t.hidden=e);let n=p?"on":"off";return t.dataset.state!==n&&(t.dataset.state=n),t}function O(t){p=t;let e=o.ROOT_DOC.documentElement;e.hasAttribute(u)!==t&&e.toggleAttribute(u,t),t&&o.ROOT_DOC.body?.classList.remove("lia-tff-panel-open"),g()}function y(t){let e=function(t){for(let e of f())for(let n of Array.from(e.querySelectorAll("#"+t))){let t=n.closest("main");if(!(t?.hasAttribute("hidden")||n.closest("[inert]"))&&!n.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof n.click)return n}return null}(t);return!!e&&(e.click(),!0)}function b(t){let e;if((0,s.isEditableKeyboardEvent)(t))return;let n=p&&"Escape"===t.key?"close-blackout":t.defaultPrevented||t.isComposing||t.ctrlKey||t.altKey||t.metaKey?null:t.shiftKey||"PageDown"!==t.key&&"PageDown"!==t.code?t.shiftKey||"PageUp"!==t.key&&"PageUp"!==t.code?(t.shiftKey||"."!==t.key&&"Period"!==t.code)&&"KeyB"!==t.code&&"b"!==String(t.key||"").toLowerCase()?null:"toggle-blackout":"previous":"next";if(!n)return;let i=p&&("toggle-blackout"===n||"close-blackout"===n);"close-blackout"!==n&&!m("unknown"!==(e=(0,l.detectMode)())?e:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown")||!i&&((0,s.eventPathMatches)(t,"dialog, [role=dialog], .lia-modal")||f().some(t=>!!t.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]")))||(t.preventDefault(),t.stopImmediatePropagation(),!t.repeat&&("next"===n?((0,a.cancelReverseEntry)(),y("lia-btn-next")):"previous"===n?((0,a.armReverseEntry)(),y("lia-btn-prev")||(0,a.cancelReverseEntry)()):"close-blackout"===n?O(!1):O(!p)))}function T(){if(!d)for(let t of(d=!0,g(),f()))t.addEventListener("keydown",b,!0)}function _(t){g(),p&&!m(t)&&O(!1)}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./reverseNavigation":"lCNcT","./keyboard":"5sy7j"}],lCNcT:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"cancelReverseEntry",()=>y),r.export(n,"armReverseEntry",()=>_),r.export(n,"initReverseNavigation",()=>C),r.export(n,"syncReverseNavigation",()=>E);var o=t("./state"),l=t("./mode"),a=t("./keyboard");let s="lia-btn-prev",c=!1,u=!1,d=null,p=null;function f(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(t){let e=String(t||"").trim().toLowerCase();return"presentation"===e||"slides"===e}function h(){let t=(0,l.detectMode)();return"unknown"!==t?t:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown"}function g(){for(let t of f())for(let e of Array.from(t.querySelectorAll(".lia-pagination__current"))){if(e.closest("[hidden], [inert]"))continue;let n=e.closest(".lia-pagination");if(!n?.querySelector("#"+s))continue;let i=String(e.textContent||"").trim().match(/^\s*(\d+)(?:\s*\(\s*(\d+)\s*\/\s*(\d+)\s*\))?\s*$/);if(!i)continue;let r=Number(i[1]),o=null==i[2]?0:Number(i[2]),l=null==i[3]?0:Number(i[3]);if(Number.isInteger(r)&&Number.isInteger(o)&&Number.isInteger(l)&&!(r<1)&&!(o<0)&&!(l<0)&&!(o>l))return{doc:t,slide:r,visible:o,effects:l}}return null}function O(t,e){for(let n of[t,...f().filter(e=>e!==t)])for(let t of Array.from(n.querySelectorAll("#"+e)))if(!t.closest("[hidden], [inert]")&&!t.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof t.click)return t;return null}function y(){d=null,null!=p&&(o.ROOT_WIN.clearTimeout(p),p=null)}function b(){d&&null==p&&(p=o.ROOT_WIN.setTimeout(()=>{p=null,E(h()),d&&b()},25))}function T(){return f().some(t=>!!t.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]"))}function _(){if(!m(h())||T())return void y();let t=g();!t||0!==t.visible||t.slide<=1?y():(d={fromSlide:t.slide,targetSlide:t.slide-1,sawTargetReset:!1,targetZeroSince:null,awaitingVisible:null,zeroEffectsSince:null,deadline:Date.now()+2500},b())}function x(t){if(t.isComposing||(0,a.isEditableKeyboardEvent)(t))return;let e=String(t.key||""),n=e.toLowerCase(),i="ArrowLeft"===e&&!t.ctrlKey&&!t.altKey&&!t.metaKey&&!t.shiftKey,r=t.altKey&&t.shiftKey&&"p"===n;if("ArrowRight"===e||t.altKey&&t.shiftKey&&"n"===n)return void y();if(!T()){if(i&&t.repeat&&d){t.preventDefault(),t.stopImmediatePropagation();return}if(i){let e,n=g();if(!(m(h())&&n&&0===n.visible&&n.slide>1)||!n)return void y();if(t.preventDefault(),t.stopImmediatePropagation(),t.repeat)return;return _(),void((!(e=O(n.doc,s))||(e.click(),0))&&y())}!t.repeat&&r&&_()}}function v(t){if(u)return;let e=t.target;e&&"function"==typeof e.closest&&(e.closest("#"+s)?_():d&&y())}function C(){if(!c)for(let t of(c=!0,f()))t.addEventListener("keydown",x,!0),t.addEventListener("click",v,!0)}function E(t){if(!d)return;if(!m("unknown"===t?h():t)||T()||Date.now()>d.deadline)return void y();let e=g();if(!e||e.slide===d.fromSlide)return void b();if(e.slide!==d.targetSlide)return void y();if(!d.sawTargetReset){if(0!==e.visible){d.targetZeroSince=null,b();return}if(null==d.targetZeroSince&&(d.targetZeroSince=Date.now()),Date.now()-d.targetZeroSince<250)return void b();d.sawTargetReset=!0}if(null!=d.awaitingVisible){if(e.visible<d.awaitingVisible)return void b();d.awaitingVisible=null,d.deadline=Date.now()+2500}0===e.effects?(null==d.zeroEffectsSince&&(d.zeroEffectsSince=Date.now()),Date.now()-d.zeroEffectsSince<750)?b():y():(d.zeroEffectsSince=null,e.visible>=e.effects)?y():(d.awaitingVisible=e.visible+1,function(t){let e=O(t.doc,"lia-btn-next");if(!e)return!1;u=!0;try{e.click()}finally{u=!1}return!0}(e)?d.deadline=Date.now()+2500:d.awaitingVisible=null,b())}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],a2N0z:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"AUTOSCROLLING_MARKER_ATTR",()=>a),r.export(n,"syncAutoscrolling",()=>g);var o=t("./state"),l=t("./autoscrollingSource");let a="data-lia-tff-autoscrolling",s="__LIA_TFF_AUTOSCROLLING_GUARD_V2__",c=`[${a}]`,u=null,d=null;function p(t){let e=function(t){try{let e=new URL(t.URL).search.slice(1);if(/^https?:\/\//i.test(e)||(e=decodeURIComponent(e)),!/^https?:\/\//i.test(e))return null;let n=new URL(e);return n.hash="",n.href}catch(t){return null}}(t);if(d?.url===e)return d;let n={url:e,slides:null,pending:null};if(d=n,u=null,!e)return n;let i=new AbortController,r=setTimeout(()=>i.abort(),3e3);return n.pending=(async()=>{try{let t=await fetch(e,{cache:"no-store",signal:i.signal});t.ok&&(n.slides=(0,l.parseAutoscrollingSource)(await t.text()))}catch(t){}finally{clearTimeout(r),n.pending=null}})(),n}function f(t){return"off"!==String(t||"").trim().toLowerCase()}function m(t,e){var n;let i,r,o,l=p(t),s=(o=(r=(i=e.parentElement||e)===e?[e]:Array.from(i.children).filter(t=>"main"===t.localName)).includes(e)?r:[e],u&&u.doc===t&&u.root===i&&(n=u.slides,n.length===o.length&&n.every((t,e)=>t===o[e]))||(u={doc:t,root:i,slides:o,settings:new Map}),u);for(let t of s.slides){let n=function(t){return Array.from(t.querySelectorAll(c)).filter(e=>e.closest("main")===t)}(t),i=n[n.length-1];i?s.settings.set(t,f(i.getAttribute(a))):t===e&&t.children.length>1&&s.settings.set(t,null)}let d=l.slides?.length===s.slides.length&&s.slides.every((t,e)=>{let n=t.querySelector("header [ondblclick]"),i=n?.getAttribute("ondblclick")?.match(/LIA\.lineGoto\((\d+)\)/);return!i||Number(i[1])===l.slides[e].line})?l.slides:null,m=s.slides.indexOf(e),h=function(t){let e=!0;for(let n of Array.from(t.querySelectorAll(c)))n.closest("main")||(e=f(n.getAttribute(a)));return e}(t);for(let t=0;t<=m;t+=1){let e=s.settings.get(s.slides[t]),n=void 0===e?d?.[t].enabled:e;null!=n&&(h=n)}return h}function h(t){return t.querySelector("main.lia-slide__content:not([hidden])")||t.querySelector("main:not([hidden])")}function g(){p(o.CONTENT_DOC);let t=Array.from(o.CONTENT_DOC.querySelectorAll("#focused")).find(t=>t.closest("main:not([hidden])"))||null,e=t?.closest("main:not([hidden])")||h(o.CONTENT_DOC);e&&m(o.CONTENT_DOC,e),t&&function(t){let e=t[s],n=e&&"object"==typeof e?e:null;if(n&&t.scrollIntoView===n.wrappedScrollIntoView)return;let i=t.scrollIntoView;if("function"!=typeof i)return;let r=function(t){let e=()=>{let e=this.closest("main:not([hidden])")||h(this.ownerDocument);(!e||m(this.ownerDocument,e))&&(void 0===t?i.call(this):i.call(this,t))},n=p(this.ownerDocument);n.pending?n.pending.then(()=>{this.isConnected&&this.closest("main:not([hidden])")&&e()}):e()};try{Object.defineProperty(t,"scrollIntoView",{configurable:!0,writable:!0,value:r}),n?n.wrappedScrollIntoView=r:Object.defineProperty(t,s,{configurable:!0,value:{wrappedScrollIntoView:r}})}catch(t){}}(t)}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./autoscrollingSource":"5nbKf"}],"5nbKf":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(t){let e=[],n=t.replace(/^\uFEFF/,"").split(/\r\n?|\n/),i=!1,r=null,o=0,l=null;for(let t=0;t<n.length;t+=1){let a=n[t];if(r){let t=a.match(/^ {0,3}(`+|~+)[ \t]*$/);t&&t[1][0]===r.character&&t[1].length>=r.length&&(r=null);continue}if(l){RegExp(`</${l}\\s*>`,"i").test(a)&&(l=null);continue}if(!i&&!o&&/^(?: {4}|[ \t]*\t)/.test(a))continue;if(!i&&!o){let t=a.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);if(t&&("`"!==t[1][0]||!t[2].includes("`"))){r={character:t[1][0],length:t[1].length};continue}let e=a.match(/^ {0,3}<(pre|code|script|style|textarea|xmp|iframe|noembed|noframes|template)(?:[\s>])/i);if(e){let t=e[1].toLowerCase();RegExp(`</${t}\\s*>`,"i").test(a)||(l=t);continue}}let s=o>0,c=s,u="";for(let t=0;t<a.length;)if(i){let e=a.indexOf("--\x3e",t);if(e<0)break;u+=" ".repeat(e+3-t),t=e+3,i=!1}else if(o)if("`"===a[t]){let e=t;for(;"`"===a[t];)t+=1;t-e===o&&(o=0),u+=" ".repeat(t-e)}else u+=" ",t+=1;else if(a.startsWith("\x3c!--",t))i=!0,u+="    ",t+=4;else if("\\"===a[t]&&t+1<a.length)u+=a.slice(t,t+2),t+=2;else if("`"===a[t]){let e=t;for(;"`"===a[t];)t+=1;o=t-e,c=!0,u+=" ".repeat(o)}else u+=a[t],t+=1;if(s)continue;if(/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(a)&&/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(u)){e.push({line:t}),o=0;continue}if(c||!e.length||!/^ {0,3}@autoscrolling\b/i.test(a)||!/^ {0,3}@autoscrolling\([^\r\n]*\)[ \t]*$/i.test(u))continue;let d=u.match(/^ {0,3}@autoscrolling\(\s*(on|off)\s*\)[ \t]*$/i);if(!d)return null;e[e.length-1].enabled="on"===d[1].toLowerCase()}return e.length?e:null}r.defineInteropFlag(n),r.export(n,"parseAutoscrollingSource",()=>o)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
