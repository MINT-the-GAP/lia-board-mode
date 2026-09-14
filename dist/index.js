!function(t,e,n,i,r){var o="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},a="function"==typeof o[i]&&o[i],l=a.i||{},s=a.cache||{},d="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(e,n){if(!s[e]){if(!t[e]){if(r[e])return r[e];var l="function"==typeof o[i]&&o[i];if(!n&&l)return l(e,!0);if(a)return a(e,!0);if(d&&"string"==typeof e)return d(e);var f=Error("Cannot find module '"+e+"'");throw f.code="MODULE_NOT_FOUND",f}u.resolve=function(n){var i=t[e][1][n];return null!=i?i:n},u.cache={};var p=s[e]=new c.Module(e);t[e][0].call(p.exports,u,p,p.exports,o)}return s[e].exports;function u(t){var e=u.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],i=t[1],r=t[2]||t[0],o=c(i);"*"===e?Object.keys(o).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return o[t]}})}):"*"===r?Object.defineProperty(n,e,{enumerable:!0,value:o}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===r?o.__esModule?o.default:o:o[r]}})}),n}return c(e)}}c.isParcelRequire=!0,c.Module=function(t){this.id=t,this.bundle=c,this.require=d,this.exports={}},c.modules=t,c.cache=s,c.parent=a,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=l,c.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return o[i]}}),o[i]=c;for(var f=0;f<e.length;f++)c(e[f]);if(n){var p=c(n);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(t,e,n,i){var r=t("./presenter"),o=t("./reverseNavigation"),a=t("./autoscrolling"),l=t("./state"),s=t("./mode"),d=t("./css"),c=t("./font"),f=t("./toolbar"),p=t("./ui"),u=t("./events"),m=t("./modeOnly"),h=t("./authorComments");function g(){(0,a.syncAutoscrolling)(),(0,o.syncReverseNavigation)((0,s.detectMode)()),(0,r.syncPresenterSupport)((0,s.detectMode)()),l.I.ticking||(l.I.ticking=!0,l.ROOT_WIN.requestAnimationFrame(()=>{try{(0,d.ensureContentCSS)(),(0,d.ensureRootCSS)();let t=(0,s.safeGetSettingsRaw)(),e=(0,s.detectMode)();(0,s.applyModeAttr)(e),(0,d.syncAccent)(e),(0,d.syncDarkMode)(),(0,p.ensureUI)(u.wireOnce),(0,f.syncNightlyMiniMode)(),(0,p.setPresentationOnlyVisibility)(e),(0,p.syncVoiceFooterToggle)(e),(0,p.syncHeaderBandToggle)(e),(e!==l.I.lastMode||t!==l.I.lastSettingsRaw)&&((0,c.applyFontLogic)(e),(0,m.applyModeOnlyNow)(e),l.I.lastMode=e,l.I.lastSettingsRaw=t),(0,d.syncSlideExitSpace)(e),(0,c.syncSliderToCurrent)(),(0,p.syncFontSizeLabel)(),(0,p.requestPositionUpdate)()}finally{l.I.ticking=!1}}))}(0,l.initInstance)()&&((0,h.initAuthorComments)(),(0,o.initReverseNavigation)(),(0,r.initPresenterSupport)(),(0,u.initEvents)(g),g(),(0,m.initModeOnly)(()=>l.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU","./presenter":"d6102","./autoscrolling":"a2N0z","./reverseNavigation":"lCNcT","./authorComments":"ilLos"}],jPEty:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(){let t=window,e=null;for(;;)try{if(function(t){try{return t.frameElement?.id==="liascript-preview"}catch(t){return!1}}(t)||function(t){try{return!!t.querySelector("#lia-toolbar-nav, .lia-canvas, #lia-toc, header.lia-header")}catch(t){return!1}}(t.document))return t;let n=t.parent;if(!n||n===t)break;n.document.documentElement,e||(e=n),t=n}catch(t){break}return e||window}r.defineInteropFlag(n),r.export(n,"getRootWindow",()=>o),r.export(n,"ROOT_WIN",()=>a),r.export(n,"ROOT_DOC",()=>l),r.export(n,"CONTENT_WIN",()=>s),r.export(n,"CONTENT_DOC",()=>d),r.export(n,"REG",()=>f),r.export(n,"DOC_ID",()=>p),r.export(n,"I",()=>u),r.export(n,"initInstance",()=>m),r.export(n,"SETTINGS_KEY",()=>h),r.export(n,"FONT_KEY",()=>g),r.export(n,"OVERLAY_ID",()=>O),r.export(n,"BTN_ID",()=>y),r.export(n,"PANEL_ID",()=>b),r.export(n,"SLIDER_ID",()=>_),r.export(n,"TITLE_ID",()=>T),r.export(n,"INLINE_SLOT_ID",()=>x),r.export(n,"VOICE_TOGGLE_BTN_ID",()=>v),r.export(n,"HEADER_TOGGLE_BTN_ID",()=>E),r.export(n,"clamp",()=>C);let a=o(),l=a.document,s=window,d=document,c="__LIA_TFF_REG_V2__";a[c]=a[c]||{instances:{}};let f=a[c],p=(d.baseURI||s.location.href||"")+"::"+(d.title||""),u=null;function m(){return!f.instances[p]?.__alive&&(u={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null},f.instances[p]=u,!0)}let h="settings",g="lia-tff-font-px-v2",O="lia-tff-overlay-v2",y="lia-tff-btn-v2",b="lia-tff-panel-v2",_="lia-tff-slider-v2",T="lia-tff-title-v2",x="lia-tff-inline-slot-v2",v="lia-tff-voice-toggle-v2",E="lia-tff-header-toggle-v2";function C(t,e,n){return Math.max(e,Math.min(n,t))}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,n,i){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}],aGLfG:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"norm",()=>a),r.export(n,"safeGetSettingsRaw",()=>l),r.export(n,"findModeInJson",()=>s),r.export(n,"detectMode",()=>d),r.export(n,"applyModeAttr",()=>c);var o=t("./state");function a(t){return String(null==t?"":t).toLowerCase()}function l(){try{return localStorage.getItem(o.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set,n=new Set(["mode","view","layout","format"]);return function t(i){if(null==i)return null;if("string"==typeof i){let t=a(i);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof i||e.has(i))return null;e.add(i);let r=[];for(let e in i)if(Object.prototype.hasOwnProperty.call(i,e))if(n.has(a(e))){let n=t(i[e]);if(n)return n}else r.push(e);for(let e of r){let n=t(i[e]);if(n)return n}return null}(t)}function d(){let t=l();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(n){let e=a(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function c(t){try{let e=o.CONTENT_DOC.documentElement;e.dataset.liaMode!==t&&(e.dataset.liaMode=t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureStyle",()=>a),r.export(n,"setVar",()=>l),r.export(n,"syncAccent",()=>p),r.export(n,"ensureContentCSS",()=>m),r.export(n,"syncSlideExitSpace",()=>b),r.export(n,"ensureRootCSS",()=>T),r.export(n,"syncDarkMode",()=>v);var o=t("./state");function a(t,e,n){try{if(!t||t.getElementById(e))return;let i=t.createElement("style");i.id=e,i.textContent=n,(t.head||t.documentElement).appendChild(i)}catch(t){}}function l(t,e,n){try{let i=t.documentElement.style;(i.getPropertyValue(e)!==n||i.getPropertyPriority(e))&&i.setProperty(e,n)}catch(t){}}let s=null,d=null;function c(t){return[t.documentElement,t.body].map(t=>t?[Array.from(t.classList).filter(t=>!t.startsWith("lia-tff-")).sort().join(" "),t.getAttribute("data-theme"),t.getAttribute("data-bs-theme")].join("|"):"").join("|")}function f(t){try{let e=t||document,n=e.body||e.documentElement,i=e.defaultView,r=e.querySelector(".lia-btn");if(r){let t=i.getComputedStyle(r).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let o=e.createElement("button");o.id="lia-tff-accent-probe-v2",o.className="lia-btn",o.type="button",o.textContent="x",o.style.position="absolute",o.style.left="-9999px",o.style.top="-9999px",o.style.visibility="hidden",n.appendChild(o);let a=i.getComputedStyle(o).backgroundColor;if(o.remove(),a&&"rgba(0, 0, 0, 0)"!==a&&"transparent"!==a)return a}catch(t){}return null}function p(t){let e=[t,c(o.ROOT_DOC),c(o.CONTENT_DOC),o.ROOT_WIN.matchMedia?.("(prefers-color-scheme: dark)").matches].join("|");if(e===d&&s){l(o.ROOT_DOC,"--lia-tff-accent",s),o.CONTENT_DOC!==o.ROOT_DOC&&l(o.CONTENT_DOC,"--lia-tff-accent",s);return}let n=f(o.ROOT_DOC)||f(o.CONTENT_DOC)||"rgb(11,95,255)";s=n,d=e,l(o.ROOT_DOC,"--lia-tff-accent",n),o.CONTENT_DOC!==o.ROOT_DOC&&l(o.CONTENT_DOC,"--lia-tff-accent",n)}let u=`
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

/* LiaScript's 2rem list indent stays fixed when only the content font grows.
   Use the list's own font size so markers and wrapped lines keep their space. */
html[data-lia-mode="presentation"] main .lia-list--unordered,
html[data-lia-mode="presentation"] main .lia-list--ordered,
html[data-lia-mode="slides"] main .lia-list--unordered,
html[data-lia-mode="slides"] main .lia-list--ordered{
  padding-inline-start: 2em;
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
`;function m(){a(o.CONTENT_DOC,"lia-tff-style-content-v2",u)}let h=null,g=null,O=null;function y(t,e){let n=String(t||"").trim().toLowerCase();if(!n)return 0;if(n.endsWith("px")){let t=parseFloat(n.slice(0,-2));return isFinite(t)?t:0}if(n.endsWith("vh")){let t=parseFloat(n.slice(0,-2));return isFinite(t)?e*t/100:0}let i=parseFloat(n);return isFinite(i)?i:0}function b(t){if("presentation"!==t&&"slides"!==t){h=null,g=null,O=null;return}try{let e=Array.from(o.CONTENT_DOC.querySelectorAll(".lia-slide__container"));if(!e.length)return;let n=o.CONTENT_WIN.innerHeight||1e3,i=e.filter(t=>t.clientHeight>80).map(t=>{let e=o.CONTENT_WIN.getComputedStyle(t),i=t.getBoundingClientRect(),r=Math.max(0,Math.min(i.bottom,n)-Math.max(i.top,0))*Math.max(1,i.width),a=Math.max(0,t.scrollHeight-t.clientHeight),l=+("none"!==e.display&&"hidden"!==e.visibility);return{el:t,r:i,score:l*(r+10*a)}}).sort((t,e)=>e.score-t.score),r=i[0]&&i[0].score>0?i[0].el:e.sort((t,e)=>e.scrollHeight-e.clientHeight-(t.scrollHeight-t.clientHeight))[0];if(!r)return;let a=r.querySelector("main.lia-slide__content")||o.CONTENT_DOC.querySelector("main.lia-slide__content")||o.CONTENT_DOC.querySelector("main");if(!a)return;let s=o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-slide-exit-space"),d=y(s,o.CONTENT_WIN.innerHeight),c=[t,Math.round(o.CONTENT_WIN.innerWidth),Math.round(o.CONTENT_WIN.innerHeight),Math.round(r.clientHeight),Math.round(r.scrollHeight-d),Math.round(r.getBoundingClientRect().top),Math.round(a.clientWidth),Math.round(a.scrollHeight-d)].join("|");if(r===g&&a===O&&c===h)return;let f=r.clientHeight;for(let t=0;t<3;t++){let t=function(t){let e=Array.from(t.querySelectorAll("*"));for(let t=e.length-1;t>=0;t--){let n=e[t];if(!n||!(n.textContent||"").trim())continue;let i=o.CONTENT_WIN.getComputedStyle(n);if("none"!==i.display&&"hidden"!==i.visibility)try{let t=o.CONTENT_DOC.createRange();t.selectNodeContents(n);let e=Array.from(t.getClientRects());for(let t=e.length-1;t>=0;t--){let n=e[t];if(n&&!(n.width<4)&&!(n.height<2))return n}}catch(t){}}return null}(a);if(!t)break;let e=r.getBoundingClientRect(),n=Math.max(0,r.scrollHeight-r.clientHeight),i=t.top-Math.max(0,n-r.scrollTop),d=e.top-.6*Math.max(2,t.height),c=o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-slide-exit-space"),p=y(c,o.CONTENT_WIN.innerHeight),u=i-d;if(1>=Math.abs(u))break;let m=(0,o.clamp)(p+u,0,1.25*r.clientHeight);if(1>Math.abs(m-p))break;if(l(o.CONTENT_DOC,"--lia-tff-slide-exit-space",`${m.toFixed(2)}px`),a.offsetHeight,Math.abs(r.clientHeight-f)>1){l(o.CONTENT_DOC,"--lia-tff-slide-exit-space",s.trim());break}}h=c,g=r,O=a}catch(t){}}let _=`
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

/* The inline and collapsed docks share layout-viewport coordinates with
   lia-marker. A fixed child bypasses its overlay viewport translation. */
html[data-lia-tff-marker-dock] #lia-hl-ui-overlay-v1 > #lia-hl-btn{
  position: fixed !important;
  left: var(--lia-tff-marker-left) !important;
  top: var(--lia-tff-marker-top) !important;
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
  width: var(--lia-tff-inline-width, 46px) !important;
  min-width: var(--lia-tff-inline-width, 46px) !important;
  max-width: var(--lia-tff-inline-width, 46px) !important;
  height: 34px !important;
  min-height: 34px !important;
  box-sizing: border-box !important;
  padding-right: 2px !important;
  overflow: visible !important;
  flex: 0 0 var(--lia-tff-inline-width, 46px) !important;
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
`;function T(){a(o.ROOT_DOC,"lia-tff-style-root-v2",_)}let x=null;function v(){try{if(!o.ROOT_DOC.body)return;let t=function(){try{let t=o.ROOT_DOC.documentElement,e=o.ROOT_DOC.body;if(t.classList.contains("lia-variant-light")||"light"===t.getAttribute("data-bs-theme")||"light"===t.getAttribute("data-theme")||"light"===e.getAttribute("data-bs-theme")||"light"===e.getAttribute("data-theme"))return!1;if(t.classList.contains("lia-variant-dark")||"dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark"))return!0}catch(t){}try{if(o.ROOT_WIN.matchMedia&&o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(t){}try{let t=o.ROOT_WIN.getComputedStyle(o.ROOT_DOC.body).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t){let e=t.match(/\d+/g);if(e&&e.length>=3&&(.299*e[0]+.587*e[1]+.114*e[2])/255<.45)return!0}}catch(t){}return!1}();if(t===x)return;x=t,o.ROOT_DOC.body.classList.toggle("lia-tff-dark",t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getSavedFontPx",()=>s),r.export(n,"setPresFontPx",()=>d),r.export(n,"applyFontLogic",()=>f),r.export(n,"syncSliderToCurrent",()=>p);var o=t("./state"),a=t("./css");let l=[18,24,32];function s(){try{let t=localStorage.getItem(o.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function d(t){(0,a.setVar)(o.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let c=!1;function f(t){let e="presentation"===t;if(!(e||"slides"===t))return void d(null);if(e){let t=s();if(null!=t)return void d((0,o.clamp)(t,14,48))}c||(c=!0,d(null),o.CONTENT_WIN.requestAnimationFrame(function(){o.CONTENT_WIN.requestAnimationFrame(function(){var t;let e,n;d(l[(e=o.CONTENT_DOC.querySelector("main")||o.CONTENT_DOC.documentElement,(t=isNaN(n=parseFloat(o.CONTENT_WIN.getComputedStyle(e).fontSize||"16"))?16:n)<=17)?0:t<=19?1:2]),c=!1})}))}function p(){let t=o.ROOT_DOC.getElementById(o.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),i=s();if(null!=i){t.value=String((0,o.clamp)(i,e,n));return}let r=parseInt(o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(r)&&(t.value=String((0,o.clamp)(r,e,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getToolbarHeader",()=>a),r.export(n,"getToolbarLeftContainer",()=>l),r.export(n,"getLayoutViewport",()=>s),r.export(n,"getViewport",()=>d),r.export(n,"getVisibleRect",()=>c),r.export(n,"getRectLoose",()=>f),r.export(n,"isNightlyNavigationHidden",()=>u),r.export(n,"syncNightlyMiniMode",()=>m),r.export(n,"getTFFTOCButton",()=>h),r.export(n,"getTFFTOCButtonRect",()=>g),r.export(n,"shouldUseTFFNightlyStackDock",()=>O),r.export(n,"shouldUseInlineStripDock",()=>y),r.export(n,"ensureInlineDockSlot",()=>b),r.export(n,"getHighlightRect",()=>_),r.export(n,"getToolbarBandRect",()=>T),r.export(n,"getVirtualHighlightSlotRect",()=>x),r.export(n,"getStableLeftToolbarPeers",()=>v),r.export(n,"getTOCDockSlot",()=>E),r.export(n,"getDockTarget",()=>C);var o=t("./state");function a(){return o.ROOT_DOC.querySelector("header#lia-toolbar-nav")||o.ROOT_DOC.querySelector("#lia-toolbar-nav")||o.ROOT_DOC.querySelector("header.lia-header")}function l(){let t=a();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=o.ROOT_DOC.documentElement;return{w:t.clientWidth||o.ROOT_WIN.innerWidth,h:t.clientHeight||o.ROOT_WIN.innerHeight,ox:0,oy:0}}function d(){let t=o.ROOT_WIN.visualViewport;return t?{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0}:s()}function c(t,e=d()){if(!t)return null;try{let n=o.ROOT_WIN.getComputedStyle(t);if(!n||"none"===n.display||"hidden"===n.visibility||"0"===n.opacity)return null;let i=t.getBoundingClientRect();if(!i||i.width<6||i.height<6||i.right<=e.ox||i.bottom<=e.oy||i.left>=e.ox+e.w||i.top>=e.oy+e.h)return null;return i}catch(t){return null}}function f(t,e=d()){if(!t)return null;try{let n=o.ROOT_WIN.getComputedStyle(t);if(!n||"none"===n.display||"hidden"===n.visibility)return null;let i=t.getBoundingClientRect();if(!i||i.width<2||i.height<2||i.right<=e.ox||i.bottom<=e.oy||i.left>=e.ox+e.w||i.top>=e.oy+e.h)return null;return i}catch(t){return null}}function p(t){return c(t,s())}function u(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function m(){try{let t=o.ROOT_DOC.body;if(!t)return;let e=u();t.classList.contains("lia-tff-nightly-mini")!==e&&t.classList.toggle("lia-tff-nightly-mini",e)}catch(t){}}function h(){let t=o.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=l();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function g(){return p(h())}function O(){let t=o.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function y(){if(O())return!1;let t=l(),e=h();return!!(t&&e&&t.contains(e))}function b(){let t=l(),e=h();if(!t||!e||!t.contains(e))return null;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);return n||((n=o.ROOT_DOC.createElement("div")).id=o.INLINE_SLOT_ID),(n.parentNode!==t||n.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",n),n}function _(){return p(o.ROOT_DOC.getElementById("lia-hl-btn"))}function T(){let t=p(l());return t||p(a())}function x(){let t=T();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function v(){let t=s(),e=l();if(!e)return[];let n=[];for(let i of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!i||i.id===o.BTN_ID)continue;let e=p(i);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:i,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let i=n[0].r.top+n[0].r.height/2,r=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-i)<=r)}function E(){let t=o.ROOT_DOC.getElementById("lia-toc"),e=o.ROOT_DOC.getElementById("lia-btn-toc"),n=f(e,s()),i=u(),r=i?22:34;if(!n)return null;if(i){let t=n.left+(n.width-r)/2,i=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,i),right:Math.max(8,t)+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:e,r:n}]}}if(t&&t.classList.contains("lia-toc--open")){let t=n.right+8,i=n.top+(n.height-r)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,i),right:t+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:e,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:e,r:n}]}}function C(){let t=_();if(t)return{kind:"highlight",rect:t,peers:[{el:o.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=v();if(e.length){let t=e[0].r;for(let n of e)n.r.right>t.right&&(t=n.r);return{kind:"toolbar-row",rect:t,peers:e}}let n=E();if(n)return n;let i=x();return i?{kind:"virtual-highlight-slot",rect:i,peers:[]}:null}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"requestPositionUpdate",()=>p),r.export(n,"cancelPositionUpdate",()=>u),r.export(n,"ensureUI",()=>m),r.export(n,"toggleVoiceFooterCollapsed",()=>y),r.export(n,"syncVoiceFooterToggle",()=>b),r.export(n,"toggleHeaderBandCollapsed",()=>v),r.export(n,"positionHeaderBandToggle",()=>E),r.export(n,"syncHeaderBandToggle",()=>C),r.export(n,"placeButtonInCorrectHost",()=>N),r.export(n,"positionOverlayButton",()=>D),r.export(n,"positionPanel",()=>w),r.export(n,"setPresentationOnlyVisibility",()=>R),r.export(n,"syncFontSizeLabel",()=>S);var o=t("./state"),a=t("./toolbar"),l=t("./i18n");let s=!0,d=!1;function c(t,e,n){t.style.getPropertyValue(e)!==n&&t.style.setProperty(e,n)}let f=null;function p(){null===f&&(f=o.ROOT_WIN.requestAnimationFrame(()=>{f=null;let t=(0,a.getViewport)();D(t),w(t),E()}))}function u(){null!==f&&(o.ROOT_WIN.cancelAnimationFrame(f),f=null)}function m(t){let e=!1,n=o.ROOT_DOC.getElementById(o.OVERLAY_ID);n||((n=o.ROOT_DOC.createElement("div")).id=o.OVERLAY_ID,o.ROOT_DOC.body.appendChild(n));let i=o.ROOT_DOC.getElementById(o.BTN_ID);if(!i){(i=o.ROOT_DOC.createElement("button")).id=o.BTN_ID,i.type="button";let t=(0,l.getFontSizeLabel)();i.setAttribute("aria-label",t),i.setAttribute("title",t);let r=o.ROOT_DOC.createElement("span");r.className="tffA-small",r.textContent="A";let a=o.ROOT_DOC.createElement("span");a.className="tffA-big",a.textContent="A",i.appendChild(r),i.appendChild(a),n.appendChild(i),e=!0}let r=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!r){(r=o.ROOT_DOC.createElement("div")).id=o.PANEL_ID;let t=(0,l.getFontSizeLabel)(),n=o.ROOT_DOC.createElement("div");n.id=o.TITLE_ID,n.textContent=t;let i=o.ROOT_DOC.createElement("input");i.id=o.SLIDER_ID,i.type="range",i.min="14",i.max="48",i.step="1",i.value="24",i.setAttribute("aria-label",t),r.appendChild(n),r.appendChild(i),o.ROOT_DOC.body.appendChild(r),e=!0}let a=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);a||((a=o.ROOT_DOC.createElement("button")).id=o.VOICE_TOGGLE_BTN_ID,a.type="button",a.setAttribute("aria-label","Vorleseleiste ausfahren"),a.setAttribute("title","Vorleseleiste ausfahren"),a.textContent="▲",o.ROOT_DOC.body.appendChild(a),e=!0);let s=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);s||((s=o.ROOT_DOC.createElement("button")).id=o.HEADER_TOGGLE_BTN_ID,s.type="button",s.setAttribute("aria-label","Headerband einklappen"),s.setAttribute("title","Headerband einklappen"),s.setAttribute("aria-expanded","true"),s.textContent="▲",o.ROOT_DOC.body.appendChild(s)),e&&t&&t()}function h(t){let e=o.ROOT_DOC.documentElement;e.classList.contains("lia-tff-voice-collapsed")!==t&&e.classList.toggle("lia-tff-voice-collapsed",t)}function g(){let t=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!t)return;let e=s,n=String.fromCodePoint(e?9650:9660),i=e?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";if(t.textContent===n&&t.getAttribute("aria-label")===i&&t.getAttribute("title")===i)return;t.textContent=e?"▲":"▼";let r=e?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";t.setAttribute("aria-label",r),t.setAttribute("title",r)}function O(t){return("presentation"===t||"slides"===t)&&(o.ROOT_WIN.matchMedia?o.ROOT_WIN.matchMedia("(min-width: 1001px)").matches:(0,a.getLayoutViewport)().w>=1001)}function y(){h(s=!s),g()}function b(t){let e=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!e)return;e.onclick=t=>{t&&(t.preventDefault(),t.stopPropagation()),y()};let n=O(t);if(c(e,"display",n?"flex":"none"),!n){h(!1),g();return}o.ROOT_DOC.documentElement.classList.contains("lia-tff-voice-collapsed")!==s&&h(s),g()}function _(t){try{t.focus({preventScroll:!0})}catch(e){t.focus()}}function T(t){if(t){let t=(0,a.getToolbarHeader)(),e=o.ROOT_DOC.activeElement,n=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);t&&e&&t.contains(e)&&n&&_(n)}let e=[o.ROOT_DOC.documentElement];for(let n of(o.CONTENT_DOC!==o.ROOT_DOC&&e.push(o.CONTENT_DOC.documentElement),e))n.classList.contains("lia-tff-header-collapsed")!==t&&n.classList.toggle("lia-tff-header-collapsed",t)}function x(){let t=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!t)return;let e=d,n=String.fromCodePoint(e?9660:9650),i=e?"Headerband ausfahren":"Headerband einklappen",r=e?"false":"true";(t.textContent!==n||t.getAttribute("aria-label")!==i||t.getAttribute("title")!==i||t.getAttribute("aria-expanded")!==r)&&(t.textContent=e?"▼":"▲",t.setAttribute("aria-label",i),t.setAttribute("title",i),t.setAttribute("aria-expanded",r))}function v(){T(d=!d),d&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),x(),p()}function E(){let t=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!t)return;let e=0;if(!d){let t=(0,a.getToolbarHeader)();if(t)try{let n=t.getBoundingClientRect();isFinite(n.bottom)&&(e=Math.max(0,n.bottom))}catch(t){}}let n=`${Math.round(e)}px`;(t.style.getPropertyValue("top")!==n||"important"!==t.style.getPropertyPriority("top"))&&t.style.setProperty("top",n,"important")}function C(t){let e=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!e)return;e.onclick=t=>{t&&(t.preventDefault(),t.stopPropagation()),v()};let n=(0,a.getToolbarHeader)(),i=O(t)&&!!n,r=n&&n.id;if(r&&e.getAttribute("aria-controls")!==r?e.setAttribute("aria-controls",r):!r&&e.hasAttribute("aria-controls")&&e.removeAttribute("aria-controls"),!i){if(T(!1),o.ROOT_DOC.activeElement===e){let t=n?.querySelector('#lia-btn-toc, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');t&&t!==e?_(t):e.blur()}c(e,"display","none"),p(),x();return}c(e,"display","flex"),T(d),p(),x()}function N(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!e)return;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);if((0,a.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n);return}if((0,a.shouldUseInlineStripDock)()){let n=(0,a.ensureInlineDockSlot)();n&&t.parentNode!==n&&n.appendChild(t),c(e,"left","0px"),c(e,"top","0px"),c(t,"left",""),c(t,"top","");return}t.parentNode!==e&&e.appendChild(t),n&&n.parentNode&&n.parentNode.removeChild(n)}function D(t=(0,a.getViewport)()){let e=o.ROOT_DOC.getElementById(o.BTN_ID),n=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!e||!n)return;N();let i=o.ROOT_DOC.documentElement,r=(0,a.shouldUseTFFNightlyStackDock)(),l=o.ROOT_DOC.querySelector("#lia-hl-ui-overlay-v1 > #lia-hl-btn"),s=l?o.ROOT_WIN.getComputedStyle(l):null,d=o.ROOT_WIN.getComputedStyle(e),f=!!l&&"none"!==d.display&&"hidden"!==d.visibility&&e.offsetWidth>0&&e.offsetHeight>0&&l.offsetWidth>0&&l.offsetHeight>0&&s?.display!=="none"&&s?.visibility!=="hidden",p=r&&f,u=(0,a.shouldUseInlineStripDock)(),m=u&&f,h=(0,a.getTFFTOCButtonRect)(),g=!r&&!u&&f&&!!h;!p&&!m&&!g&&i.hasAttribute("data-lia-tff-marker-dock")&&i.removeAttribute("data-lia-tff-marker-dock");let O=f?l.offsetWidth||(r?22:40):0,y=f?l.offsetHeight||(r?22:40):0;if(c(i,"--lia-tff-inline-width",m?`${46+O+8}px`:"46px"),u){if(m){let t=e.getBoundingClientRect();I(t.left-8-O,t.top+(t.height-y)/2,"inline")}return}let b=(0,a.isNightlyNavigationHidden)()?22:34,_=b,T=b;try{let t=e.getBoundingClientRect();t&&t.width>6&&t.height>6&&(_=t.width,T=t.height)}catch(t){}if(g){let i=O+8+_,r=Math.max(y,T),a=(0,o.clamp)(h.right+8,t.ox+8,t.ox+t.w-i-8),l=(0,o.clamp)(h.top+(h.height-r)/2,t.oy+8,t.oy+t.h-r-8);c(n,"left","0px"),c(n,"top","0px"),c(e,"left",`${a+O+8}px`),c(e,"top",`${l+(r-T)/2}px`),I(a,l+(r-y)/2,"floating");return}let x=t.ox+8,v=t.oy+8;if(r)h&&(x=h.left+(h.width-_)/2,v=h.bottom+6);else{let t=(0,a.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(x=e.right+8,v=e.top+(e.height-T)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(x=e.left,v=e.top)}}let E=Math.max(_,p?O:0),C=T+(p?6+y:0);x=(0,o.clamp)(x,t.ox+8,t.ox+t.w-E-8),v=(0,o.clamp)(v,t.oy+8,t.oy+t.h-C-8),c(n,"left","0px"),c(n,"top","0px"),c(e,"left",`${x}px`),c(e,"top",`${v}px`),p&&I(x+(_-O)/2,v+T+6,"stack")}function I(t,e,n){let i=o.ROOT_DOC.documentElement;c(i,"--lia-tff-marker-left",`${t}px`),c(i,"--lia-tff-marker-top",`${e}px`),i.getAttribute("data-lia-tff-marker-dock")!==n&&i.setAttribute("data-lia-tff-marker-dock",n)}function w(t=(0,a.getViewport)()){let e=o.ROOT_DOC.getElementById(o.BTN_ID),n=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!e||!n||!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let i=e.getBoundingClientRect(),r=n.offsetWidth,l=n.offsetHeight,s=(0,o.clamp)(i.left,t.ox+8,t.ox+t.w-r-8),d=i.bottom+10;d+l+8>t.oy+t.h&&(d=i.top-10-l),d=(0,o.clamp)(d,t.oy+8,t.oy+t.h-l-8),c(n,"left",`${s}px`),c(n,"top",`${d}px`)}function R(t){let e=function(){try{if(o.ROOT_WIN.matchMedia)return o.ROOT_WIN.matchMedia("(max-width: 680px), (max-height: 520px)").matches;let{w:t,h:e}=(0,a.getLayoutViewport)();return t<=680||520>=Math.min(t,e)}catch(t){return!1}}(),n="presentation"===t&&!e,i=o.ROOT_DOC.getElementById(o.BTN_ID),r=o.ROOT_DOC.getElementById(o.PANEL_ID);return i&&c(i,"display",n?"inline-flex":"none"),!n&&r&&(o.ROOT_DOC.body.classList.contains("lia-tff-panel-open")&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),c(r,"display","none")),n}let k=null;function S(){try{let t=(0,l.detectLanguage)();if(t===k)return;k=t;let e=(0,l.getFontSizeLabel)(),n=o.ROOT_DOC.getElementById(o.TITLE_ID);n&&(n.textContent=e);let i=o.ROOT_DOC.getElementById(o.BTN_ID);i&&(i.setAttribute("aria-label",e),i.setAttribute("title",e));let r=o.ROOT_DOC.getElementById(o.SLIDER_ID);r&&r.setAttribute("aria-label",e)}catch(t){}}},{"./state":"jPEty","./toolbar":"asdc8","./i18n":"7hvC6","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7hvC6":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"detectLanguage",()=>l),r.export(n,"getFontSizeLabel",()=>s);var o=t("./state");let a={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function l(){try{let t=o.CONTENT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=o.ROOT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=localStorage.getItem(o.SETTINGS_KEY);if(t){let e=JSON.parse(t),n=e?.language??e?.lang;if(n&&"string"==typeof n&&n.length>=2)return n.toLowerCase().slice(0,2)}}catch(t){}return"en"}function s(){return a[l()]??a.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"disposeEvents",()=>m),r.export(n,"wireOnce",()=>y),r.export(n,"initEvents",()=>w);var o=t("./state"),a=t("./ui"),l=t("./toolbar"),s=t("./font"),d=t("./keyboard");let c=new AbortController,f=[],p=null,u=()=>{};function m(){for(c.abort(),(0,a.cancelPositionUpdate)(),p=null;f.length;)try{f.pop().disconnect()}catch(t){}}let h=!1,g=new WeakSet,O=new WeakSet;function y(){let t=o.ROOT_DOC.getElementById(o.BTN_ID),e=o.ROOT_DOC.getElementById(o.SLIDER_ID);t&&!g.has(t)&&(g.add(t),t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),o.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,a.requestPositionUpdate)()},{signal:c.signal})),e&&!O.has(e)&&(O.add(e),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),i=(0,o.clamp)(parseInt(e.value||"24",10),t,n);try{localStorage.setItem(o.FONT_KEY,String(i))}catch(t){}(0,s.setPresFontPx)(i),p?.(),(0,a.requestPositionUpdate)()},{signal:c.signal})),h||(h=!0,o.ROOT_DOC.addEventListener("click",t=>{if(!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e?.closest?.("#"+o.PANEL_ID+",#"+o.BTN_ID+",#"+o.VOICE_TOGGLE_BTN_ID)||o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{capture:!0,signal:c.signal}),o.ROOT_DOC.addEventListener("keydown",t=>{(0,d.isEditableKeyboardEvent)(t)||"Escape"===t.key&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{signal:c.signal}),o.ROOT_WIN.visualViewport&&(o.ROOT_WIN.visualViewport.addEventListener("resize",a.requestPositionUpdate,{signal:c.signal}),o.ROOT_WIN.visualViewport.addEventListener("scroll",a.requestPositionUpdate,{signal:c.signal})),o.ROOT_DOC.addEventListener("scroll",a.requestPositionUpdate,{capture:!0,passive:!0,signal:c.signal}))}let b="#app,.lia-canvas,.lia-slide,.lia-slide__container,main,#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination",_="#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination",T="#lia-hl-ui-overlay-v1,#lia-hl-btn",x=b+",#focused,[data-lia-tff-autoscrolling],"+T,v='[id^="lia-tff-"],#__LIA_MODE_ONLY_STYLE_V01__',E=new Set([o.OVERLAY_ID,o.BTN_ID,o.PANEL_ID,o.SLIDER_ID,o.VOICE_TOGGLE_BTN_ID,o.HEADER_TOGGLE_BTN_ID]),C=["class","id","hidden","lang","data-theme","data-bs-theme","data-mode","data-view","mode","aria-expanded","aria-checked","aria-selected","aria-pressed","aria-hidden","data-lia-tff-autoscrolling"];function N(t){return 1===t.nodeType?t:t.parentElement}function D(t){return(t||"").split(/\s+/).filter(t=>t&&(!t.startsWith("lia-tff-")||"lia-tff-header-collapsed"===t||"lia-tff-voice-collapsed"===t)).sort().join(" ")}function I(t){let e=N(t.target);if(!e)return!1;if(e.closest(v))return"childList"===t.type&&Array.from(t.removedNodes).some(t=>{let e=N(t);return!!e&&E.has(e.id)&&!o.ROOT_DOC.getElementById(e.id)});if("attributes"===t.type){let n=t.attributeName;return("class"!==n||D(t.oldValue)!==D(e.getAttribute("class")))&&(!!("id"===n&&("focused"===e.id||"focused"===t.oldValue)||"data-lia-tff-autoscrolling"===n||e===e.ownerDocument.documentElement||e===e.ownerDocument.body||e.matches(b+","+T)||e.closest(_))||"aria-checked"===n||"aria-selected"===n||"aria-pressed"===n||!!e.closest(".lia-effect,.lia-effect__content"))}let n=[...Array.from(t.addedNodes),...Array.from(t.removedNodes)].filter(t=>{let e=N(t);return!e?.closest(v)||!!e.id&&E.has(e.id)&&!o.ROOT_DOC.getElementById(e.id)});return!!n.length&&(!!(n.some(t=>{let e=N(t);return!!e&&E.has(e.id)&&!o.ROOT_DOC.getElementById(e.id)})||e.closest(_))||(e.closest("main")?n.some(t=>1===t.nodeType):n.some(t=>{let e=N(t);return!!e&&(e.matches(x)||!!e.querySelector(x))})))}function w(t){p=t;if("u">typeof ResizeObserver)try{let e=new Set,n=new ResizeObserver(e=>{(0,a.requestPositionUpdate)(),e.some(t=>t.target.matches("main,.lia-slide__container"))&&t()});f.push(n),(u=()=>{let t=new Set,i=(0,l.getToolbarHeader)();for(let e of(i&&t.add(i),Array.from(o.CONTENT_DOC.querySelectorAll("main:not([hidden])")))){t.add(e);let n=e.closest(".lia-slide__container");n&&t.add(n)}for(let i of e)t.has(i)||n.unobserve(i);for(let i of t)e.has(i)||n.observe(i);e=t})()}catch(t){}for(let e of o.ROOT_DOC===o.CONTENT_DOC?[o.ROOT_DOC]:[o.ROOT_DOC,o.CONTENT_DOC]){try{let n=new MutationObserver(e=>{e.some(I)&&(u(),t())});f.push(n),n.observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:C,attributeOldValue:!0})}catch(t){}let n=e.defaultView;if(!n)continue;let i=`${e.documentElement.clientWidth}|${e.documentElement.clientHeight}`;n.addEventListener("resize",()=>{(0,a.requestPositionUpdate)();let n=`${e.documentElement.clientWidth}|${e.documentElement.clientHeight}`;n!==i&&(i=n,t())},{signal:c.signal}),n.addEventListener("orientationchange",t,{signal:c.signal}),n.addEventListener("storage",e=>{(e.key===o.SETTINGS_KEY||e.key===o.FONT_KEY||null===e.key)&&t()},{signal:c.signal}),n.addEventListener("hashchange",t,{signal:c.signal}),n.addEventListener("focus",t,{signal:c.signal}),e.addEventListener("visibilitychange",()=>{"visible"===e.visibilityState&&t()},{signal:c.signal})}for(let e of["(max-width: 680px)","(max-height: 520px)","(min-width: 1001px)","(prefers-color-scheme: dark)"])try{o.ROOT_WIN.matchMedia(e).addEventListener("change",t,{signal:c.signal})}catch(t){}}},{"./state":"jPEty","./ui":"7Wjmu","./toolbar":"asdc8","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],"5sy7j":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(t){return!!t&&"function"==typeof t.matches}function a(t){try{let e=t.composedPath();if(e.length)return e.filter(o)}catch(t){}let e=[],n=t.target,i=o(n)?n:n?.parentElement||null;for(;i;)e.push(i),i=i.parentElement;return e}function l(t,e){return a(t).some(t=>t.matches(e))}function s(t){return a(t).some(t=>{if(t.matches("input, textarea, select, option, [role=textbox], .ace_editor, .monaco-editor, .CodeMirror, .cm-editor")||t.isContentEditable)return!0;let e=t.getAttribute("contenteditable");return null!==e&&"false"!==e.trim().toLowerCase()})}r.defineInteropFlag(n),r.export(n,"eventPathMatches",()=>l),r.export(n,"isEditableKeyboardEvent",()=>s)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"initModeOnly",()=>c),r.export(n,"applyModeOnlyNow",()=>f);let o="__LIA_MODE_ONLY_STYLE_V01__",a=`
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
`;function l(t){return String(t??"").trim().toLowerCase()}function s(t){let e=l(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function d(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),n=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),i=n.length?n:[document];for(let t of i)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(o))return;let n=t.createElement("style");n.id=o,n.appendChild(t.createTextNode(a)),e.appendChild(n)}catch(t){}}(t);let r=t;if("unknown"===r)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let i of e){let e=s(l(i.textContent));if(!e)continue;let r=i.closest("button,[role='button'],a"),o=(r||i).getBoundingClientRect(),a=t.defaultView.innerWidth||1200,d=0;o.top<140&&(d+=200),o.left>.55*a&&(d+=200),r&&function(t){let e=l(t.getAttribute("aria-pressed")),n=l(t.getAttribute("aria-selected")),i=l(t.className);return"true"===e||"true"===n||i.includes("active")||i.includes("selected")||i.includes("mdc-icon-button--on")}(r)&&(d+=1e3),(!n||d>n.score)&&(n={mode:e,score:d})}return n?n.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(l(e.location.search)+"&"+l(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),i=e.getItem(n),r=s((n||"")+" "+(i||""));if(r)return r}}catch(t){}return null}(e)}(t);if(e){r=e;break}}let d="slides"===r||"presentation"===r||"textbook"===r;for(let t of i)try{d?t.documentElement.setAttribute("data-lia-mode",r):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}function c(t){let e=()=>d(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3)}function f(t){d(t)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],d6102:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"PRESENTER_BLACKOUT_ID",()=>d),r.export(n,"initPresenterSupport",()=>_),r.export(n,"syncPresenterSupport",()=>T);var o=t("./state"),a=t("./mode"),l=t("./reverseNavigation"),s=t("./keyboard");let d="lia-tff-presenter-blackout-v1",c="data-lia-tff-presenter-blackout",f=!1,p=!1;function u(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(t){let e=String(t||"").trim().toLowerCase();return"presentation"===e||"slides"===e}function h(t,e,n){(t.style.getPropertyValue(e)!==n||"important"!==t.style.getPropertyPriority(e))&&t.style.setProperty(e,n,"important")}function g(){let t=o.ROOT_DOC.getElementById(d);if(!t){if(!o.ROOT_DOC.body)return null;(t=o.ROOT_DOC.createElement("div")).id=d,o.ROOT_DOC.body.appendChild(t)}"true"!==t.getAttribute("aria-hidden")&&t.setAttribute("aria-hidden","true"),"presentation"!==t.getAttribute("role")&&t.setAttribute("role","presentation"),h(t,"position","fixed"),h(t,"inset","0px"),h(t,"width","100vw"),h(t,"height","100vh"),h(t,"margin","0px"),h(t,"padding","0px"),h(t,"border","0px"),h(t,"background","rgb(0, 0, 0)"),h(t,"opacity","1"),h(t,"pointer-events","auto"),h(t,"cursor","none"),h(t,"z-index","2147483647");let e=!p;t.hidden!==e&&(t.hidden=e);let n=p?"on":"off";return t.dataset.state!==n&&(t.dataset.state=n),t}function O(t){p=t;let e=o.ROOT_DOC.documentElement;e.hasAttribute(c)!==t&&e.toggleAttribute(c,t),t&&o.ROOT_DOC.body?.classList.remove("lia-tff-panel-open"),g()}function y(t){let e=function(t){for(let e of u())for(let n of Array.from(e.querySelectorAll("#"+t))){let t=n.closest("main");if(!(t?.hasAttribute("hidden")||n.closest("[inert]"))&&!n.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof n.click)return n}return null}(t);return!!e&&(e.click(),!0)}function b(t){let e;if((0,s.isEditableKeyboardEvent)(t))return;let n=p&&"Escape"===t.key?"close-blackout":t.defaultPrevented||t.isComposing||t.ctrlKey||t.altKey||t.metaKey?null:t.shiftKey||"PageDown"!==t.key&&"PageDown"!==t.code?t.shiftKey||"PageUp"!==t.key&&"PageUp"!==t.code?(t.shiftKey||"."!==t.key&&"Period"!==t.code)&&"KeyB"!==t.code&&"b"!==String(t.key||"").toLowerCase()?null:"toggle-blackout":"previous":"next";if(!n)return;let i=p&&("toggle-blackout"===n||"close-blackout"===n);"close-blackout"!==n&&!m("unknown"!==(e=(0,a.detectMode)())?e:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown")||!i&&((0,s.eventPathMatches)(t,"dialog, [role=dialog], .lia-modal")||u().some(t=>!!t.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]")))||(t.preventDefault(),t.stopImmediatePropagation(),!t.repeat&&("next"===n?((0,l.cancelReverseEntry)(),y("lia-btn-next")):"previous"===n?((0,l.armReverseEntry)(),y("lia-btn-prev")||(0,l.cancelReverseEntry)()):"close-blackout"===n?O(!1):O(!p)))}function _(){if(!f)for(let t of(f=!0,g(),u()))t.addEventListener("keydown",b,!0)}function T(t){g(),p&&!m(t)&&O(!1)}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./reverseNavigation":"lCNcT","./keyboard":"5sy7j"}],lCNcT:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"cancelReverseEntry",()=>y),r.export(n,"armReverseEntry",()=>T),r.export(n,"initReverseNavigation",()=>E),r.export(n,"syncReverseNavigation",()=>C);var o=t("./state"),a=t("./mode"),l=t("./keyboard");let s="lia-btn-prev",d=!1,c=!1,f=null,p=null;function u(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(t){let e=String(t||"").trim().toLowerCase();return"presentation"===e||"slides"===e}function h(){let t=(0,a.detectMode)();return"unknown"!==t?t:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown"}function g(){for(let t of u())for(let e of Array.from(t.querySelectorAll(".lia-pagination__current"))){if(e.closest("[hidden], [inert]"))continue;let n=e.closest(".lia-pagination");if(!n?.querySelector("#"+s))continue;let i=String(e.textContent||"").trim().match(/^\s*(\d+)(?:\s*\(\s*(\d+)\s*\/\s*(\d+)\s*\))?\s*$/);if(!i)continue;let r=Number(i[1]),o=null==i[2]?0:Number(i[2]),a=null==i[3]?0:Number(i[3]);if(Number.isInteger(r)&&Number.isInteger(o)&&Number.isInteger(a)&&!(r<1)&&!(o<0)&&!(a<0)&&!(o>a))return{doc:t,slide:r,visible:o,effects:a}}return null}function O(t,e){for(let n of[t,...u().filter(e=>e!==t)])for(let t of Array.from(n.querySelectorAll("#"+e)))if(!t.closest("[hidden], [inert]")&&!t.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof t.click)return t;return null}function y(){f=null,null!=p&&(o.ROOT_WIN.clearTimeout(p),p=null)}function b(){f&&null==p&&(p=o.ROOT_WIN.setTimeout(()=>{p=null,C(h()),f&&b()},25))}function _(){return u().some(t=>!!t.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]"))}function T(){if(!m(h())||_())return void y();let t=g();!t||0!==t.visible||t.slide<=1?y():(f={fromSlide:t.slide,targetSlide:t.slide-1,sawTargetReset:!1,targetZeroSince:null,awaitingVisible:null,zeroEffectsSince:null,deadline:Date.now()+2500},b())}function x(t){if(t.isComposing||(0,l.isEditableKeyboardEvent)(t))return;let e=String(t.key||""),n=e.toLowerCase(),i="ArrowLeft"===e&&!t.ctrlKey&&!t.altKey&&!t.metaKey&&!t.shiftKey,r=t.altKey&&t.shiftKey&&"p"===n;if("ArrowRight"===e||t.altKey&&t.shiftKey&&"n"===n)return void y();if(!_()){if(i&&t.repeat&&f){t.preventDefault(),t.stopImmediatePropagation();return}if(i){let e,n=g();if(!(m(h())&&n&&0===n.visible&&n.slide>1)||!n)return void y();if(t.preventDefault(),t.stopImmediatePropagation(),t.repeat)return;return T(),void((!(e=O(n.doc,s))||(e.click(),0))&&y())}!t.repeat&&r&&T()}}function v(t){if(c)return;let e=t.target;e&&"function"==typeof e.closest&&(e.closest("#"+s)?T():f&&y())}function E(){if(!d)for(let t of(d=!0,u()))t.addEventListener("keydown",x,!0),t.addEventListener("click",v,!0)}function C(t){if(!f)return;if(!m("unknown"===t?h():t)||_()||Date.now()>f.deadline)return void y();let e=g();if(!e||e.slide===f.fromSlide)return void b();if(e.slide!==f.targetSlide)return void y();if(!f.sawTargetReset){if(0!==e.visible){f.targetZeroSince=null,b();return}if(null==f.targetZeroSince&&(f.targetZeroSince=Date.now()),Date.now()-f.targetZeroSince<250)return void b();f.sawTargetReset=!0}if(null!=f.awaitingVisible){if(e.visible<f.awaitingVisible)return void b();f.awaitingVisible=null,f.deadline=Date.now()+2500}0===e.effects?(null==f.zeroEffectsSince&&(f.zeroEffectsSince=Date.now()),Date.now()-f.zeroEffectsSince<750)?b():y():(f.zeroEffectsSince=null,e.visible>=e.effects)?y():(f.awaitingVisible=e.visible+1,function(t){let e=O(t.doc,"lia-btn-next");if(!e)return!1;c=!0;try{e.click()}finally{c=!1}return!0}(e)?f.deadline=Date.now()+2500:f.awaitingVisible=null,b())}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],a2N0z:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"AUTOSCROLLING_MARKER_ATTR",()=>l),r.export(n,"syncAutoscrolling",()=>g);var o=t("./state"),a=t("./autoscrollingSource");let l="data-lia-tff-autoscrolling",s="__LIA_TFF_AUTOSCROLLING_GUARD_V2__",d=`[${l}]`,c=null,f=null;function p(t){let e=function(t){try{let e=new URL(t.URL).search.slice(1);if(/^https?:\/\//i.test(e)||(e=decodeURIComponent(e)),!/^https?:\/\//i.test(e))return null;let n=new URL(e);return n.hash="",n.href}catch(t){return null}}(t);if(f?.url===e)return f;let n={url:e,slides:null,pending:null};if(f=n,c=null,!e)return n;let i=new AbortController,r=setTimeout(()=>i.abort(),3e3);return n.pending=(async()=>{try{let t=await fetch(e,{cache:"no-store",signal:i.signal});t.ok&&(n.slides=(0,a.parseAutoscrollingSource)(await t.text()))}catch(t){}finally{clearTimeout(r),n.pending=null}})(),n}function u(t){return"off"!==String(t||"").trim().toLowerCase()}function m(t,e){var n;let i,r,o,a=p(t),s=(o=(r=(i=e.parentElement||e)===e?[e]:Array.from(i.children).filter(t=>"main"===t.localName)).includes(e)?r:[e],c&&c.doc===t&&c.root===i&&(n=c.slides,n.length===o.length&&n.every((t,e)=>t===o[e]))||(c={doc:t,root:i,slides:o,settings:new Map}),c);for(let t of s.slides){let n=function(t){return Array.from(t.querySelectorAll(d)).filter(e=>e.closest("main")===t)}(t),i=n[n.length-1];i?s.settings.set(t,u(i.getAttribute(l))):t===e&&t.children.length>1&&s.settings.set(t,null)}let f=a.slides?.length===s.slides.length&&s.slides.every((t,e)=>{let n=t.querySelector("header [ondblclick]"),i=n?.getAttribute("ondblclick")?.match(/LIA\.lineGoto\((\d+)\)/);return!i||Number(i[1])===a.slides[e].line})?a.slides:null,m=s.slides.indexOf(e),h=function(t){let e=!0;for(let n of Array.from(t.querySelectorAll(d)))n.closest("main")||(e=u(n.getAttribute(l)));return e}(t);for(let t=0;t<=m;t+=1){let e=s.settings.get(s.slides[t]),n=void 0===e?f?.[t].enabled:e;null!=n&&(h=n)}return h}function h(t){return t.querySelector("main.lia-slide__content:not([hidden])")||t.querySelector("main:not([hidden])")}function g(){p(o.CONTENT_DOC);let t=Array.from(o.CONTENT_DOC.querySelectorAll("#focused")).find(t=>t.closest("main:not([hidden])"))||null,e=t?.closest("main:not([hidden])")||h(o.CONTENT_DOC);e&&m(o.CONTENT_DOC,e),t&&function(t){let e=t[s],n=e&&"object"==typeof e?e:null;if(n&&t.scrollIntoView===n.wrappedScrollIntoView)return;let i=t.scrollIntoView;if("function"!=typeof i)return;let r=function(t){let e=()=>{let e=this.closest("main:not([hidden])")||h(this.ownerDocument);(!e||m(this.ownerDocument,e))&&(void 0===t?i.call(this):i.call(this,t))},n=p(this.ownerDocument);n.pending?n.pending.then(()=>{this.isConnected&&this.closest("main:not([hidden])")&&e()}):e()};try{Object.defineProperty(t,"scrollIntoView",{configurable:!0,writable:!0,value:r}),n?n.wrappedScrollIntoView=r:Object.defineProperty(t,s,{configurable:!0,value:{wrappedScrollIntoView:r}})}catch(t){}}(t)}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./autoscrollingSource":"5nbKf"}],"5nbKf":[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function o(t){let e=[],n=t.replace(/^\uFEFF/,"").split(/\r\n?|\n/),i=!1,r=null,o=0,a=null;for(let t=0;t<n.length;t+=1){let l=n[t];if(r){let t=l.match(/^ {0,3}(`+|~+)[ \t]*$/);t&&t[1][0]===r.character&&t[1].length>=r.length&&(r=null);continue}if(a){RegExp(`</${a}\\s*>`,"i").test(l)&&(a=null);continue}if(!i&&!o&&/^(?: {4}|[ \t]*\t)/.test(l))continue;if(!i&&!o){let t=l.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);if(t&&("`"!==t[1][0]||!t[2].includes("`"))){r={character:t[1][0],length:t[1].length};continue}let e=l.match(/^ {0,3}<(pre|code|script|style|textarea|xmp|iframe|noembed|noframes|template)(?:[\s>])/i);if(e){let t=e[1].toLowerCase();RegExp(`</${t}\\s*>`,"i").test(l)||(a=t);continue}}let s=o>0,d=s,c="";for(let t=0;t<l.length;)if(i){let e=l.indexOf("--\x3e",t);if(e<0)break;c+=" ".repeat(e+3-t),t=e+3,i=!1}else if(o)if("`"===l[t]){let e=t;for(;"`"===l[t];)t+=1;t-e===o&&(o=0),c+=" ".repeat(t-e)}else c+=" ",t+=1;else if(l.startsWith("\x3c!--",t))i=!0,c+="    ",t+=4;else if("\\"===l[t]&&t+1<l.length)c+=l.slice(t,t+2),t+=2;else if("`"===l[t]){let e=t;for(;"`"===l[t];)t+=1;o=t-e,d=!0,c+=" ".repeat(o)}else c+=l[t],t+=1;if(s)continue;if(/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(l)&&/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(c)){e.push({line:t}),o=0;continue}if(d||!e.length||!/^ {0,3}@autoscrolling\b/i.test(l)||!/^ {0,3}@autoscrolling\([^\r\n]*\)[ \t]*$/i.test(c))continue;let f=c.match(/^ {0,3}@autoscrolling\(\s*(on|off)\s*\)[ \t]*$/i);if(!f)return null;e[e.length-1].enabled="on"===f[1].toLowerCase()}return e.length?e:null}r.defineInteropFlag(n),r.export(n,"parseAutoscrollingSource",()=>o)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ilLos:[function(t,e,n,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"findAuthorComments",()=>u),r.export(n,"initAuthorComments",()=>m);var o=t("./state");let a="§:-",l="-:§",s="data-lia-board-comment-hidden",d="data-lia-board-comment-error",c=".lia-slide__content",f="lia-board-author-comments-style",p=/^(P|DIV|SECTION|ARTICLE|ASIDE|HEADER|FOOTER|H[1-6]|LI|UL|OL|BLOCKQUOTE|TABLE|TR|TD|TH|FIGURE|FIGCAPTION|BR)$/;function u(t){let e=[],n=new Set,i=-1,r=0,o=!1;for(let s=0;s<t.length;)t.startsWith(a,s)?(r?(o=!0,n.add("Kommentare dürfen nicht verschachtelt werden.")):(i=s,o=!1),r+=1,s+=a.length):t.startsWith(l,s)?(r?0!=--r||o||e.push({start:i,end:s+l.length}):n.add("Kommentarende -:§ ohne Beginn §:-."),s+=l.length):s+=1;return r&&n.add("Kommentar nicht geschlossen: -:§ fehlt auf dieser Folie."),{ranges:e,errors:Array.from(n)}}function m(){let t=new WeakMap,e=new Map,n=new Map,i=new WeakMap,r=!1;function a(o){let a=e.get(o);a?.disconnect();try{let e=n.get(o);e.forEach(t=>t.removeAttribute(s)),e.clear(),o.querySelectorAll(c).forEach(n=>{n.parentElement?.closest(c)||function(e,n){let r,o,{source:a,units:l}=(r=[],o="",e.childNodes.forEach(function e(n){if(3===n.nodeType){let e=t.get(n),i=e&&n.data===e.written?e.source:n.data;r.push({node:n,start:o.length,end:o.length+i.length,source:i,opaque:!1}),o+=i}else if(1===n.nodeType){if(n.matches('pre,code,kbd,samp,script,style,textarea,input,select,button,svg,math,canvas,img,video,audio,iframe,object,embed,hr,.ace_editor,.katex,lia-formula,[contenteditable]:not([contenteditable="false"])')||!n.hasChildNodes()){r.push({node:n,start:o.length,end:o.length+1,source:"￼",opaque:!0}),o+="￼";return}let t=p.test(n.tagName);t&&(o+="\n"),n.childNodes.forEach(e),t&&(o+="\n")}}),{source:o,units:r}),{ranges:c,errors:f}=u(a),m=new Set,h=t=>{t.setAttribute(s,""),n.add(t)},g=t=>{for(let n=t.parentElement;n&&n!==e;n=n.parentElement)m.add(n)},O=0;for(let e of l){for(;O<c.length&&c[O].end<=e.start;)O+=1;let n=e.start,i="",r=!1;for(let t=O;t<c.length&&c[t].start<e.end;t+=1){let o=c[t],a=Math.max(e.start,o.start),l=Math.min(e.end,o.end);i+=e.source.slice(n-e.start,a-e.start),n=l,r=!0}if(i+=e.source.slice(n-e.start),e.opaque)r&&(h(e.node),g(e.node));else{let n=e.node;n.data!==i&&(n.data=i),r?(t.set(n,{source:e.source,written:i}),g(n)):t.delete(n)}}let y=t=>{let e=0;for(let n=t.parentElement;n;n=n.parentElement)e+=1;return e};for(let t of Array.from(m).sort((t,e)=>y(e)-y(t)))Array.from(t.childNodes).every(t=>8===t.nodeType||3===t.nodeType&&!t.textContent?.trim()||1===t.nodeType&&(n.has(t)||"BR"===t.tagName))&&h(t);let b=f.length?"Kommentarfehler: "+f.join(" "):"";b?e.setAttribute(d,b):e.removeAttribute(d),b&&i.get(e)!==b&&console.warn("[lia-board-mode] "+b),i.set(e,b)}(n,e)})}finally{r||a?.observe(o.documentElement,{childList:!0,subtree:!0,characterData:!0})}}[o.ROOT_DOC,o.CONTENT_DOC].forEach(function(i){if(r||e.has(i)||!i.documentElement)return;if(!i.getElementById(f)){let t=i.createElement("style");t.id=f,t.textContent=`[${s}]{display:none!important;}[${d}]::before{content:attr(${d});display:block;padding:.6em;margin-bottom:1em;border:2px solid #b45309;color:inherit;font:inherit;}`,(i.head||i.documentElement).appendChild(t)}let o=new MutationObserver(e=>{let n=!1;for(let i of e){"characterData"===i.type&&t.delete(i.target);let e=1===i.target.nodeType?i.target:i.target.parentElement;e?.closest(c)&&(n=!0),"childList"===i.type&&i.addedNodes.forEach(t=>{1===t.nodeType&&(t.matches(c)||t.querySelector(c))&&(n=!0)})}n&&a(i)});e.set(i,o),n.set(i,new Set),a(i)});let l=()=>{r=!0,e.forEach(t=>t.disconnect()),e.clear(),n.clear()};return o.ROOT_DOC.defaultView?.addEventListener("pagehide",t=>{t.persisted||l()},{once:!0}),l}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
