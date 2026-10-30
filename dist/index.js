!function(e,t,n,i,r){var o="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},a="function"==typeof o[i]&&o[i],l=a.i||{},s=a.cache||{},c="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!s[t]){if(!e[t]){if(r[t])return r[t];var l="function"==typeof o[i]&&o[i];if(!n&&l)return l(t,!0);if(a)return a(t,!0);if(c&&"string"==typeof t)return c(t);var f=Error("Cannot find module '"+t+"'");throw f.code="MODULE_NOT_FOUND",f}p.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},p.cache={};var u=s[t]=new d.Module(t);e[t][0].call(u.exports,p,u,u.exports,o)}return s[t].exports;function p(e){var t=p.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var n={__esModule:!0};return t.forEach(function(e){var t=e[0],i=e[1],r=e[2]||e[0],o=d(i);"*"===t?Object.keys(o).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})}):"*"===r?Object.defineProperty(n,t,{enumerable:!0,value:o}):Object.defineProperty(n,t,{enumerable:!0,get:function(){return"default"===r?o.__esModule?o.default:o:o[r]}})}),n}return d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.require=c,this.exports={}},d.modules=e,d.cache=s,d.parent=a,d.distDir=void 0,d.publicUrl=void 0,d.devServer=void 0,d.i=l,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return o[i]}}),o[i]=d;for(var f=0;f<t.length;f++)d(t[f]);if(n){var u=d(n);"object"==typeof exports&&"u">typeof module?module.exports=u:"function"==typeof define&&define.amd&&define(function(){return u})}}({"8RSWf":[function(e,t,n,i){var r=e("./presenter"),o=e("./reverseNavigation"),a=e("./autoscrolling"),l=e("./state"),s=e("./mode"),c=e("./css"),d=e("./font"),f=e("./toolbar"),u=e("./ui"),p=e("./events"),m=e("./modeOnly"),h=e("./authorComments"),g=e("./horizontalQuizCompatibility");function O(){(0,a.syncAutoscrolling)(),(0,o.syncReverseNavigation)((0,s.detectMode)()),(0,r.syncPresenterSupport)((0,s.detectMode)()),l.I.ticking||(l.I.ticking=!0,l.ROOT_WIN.requestAnimationFrame(()=>{try{(0,c.ensureContentCSS)(),(0,c.ensureRootCSS)();let e=(0,s.safeGetSettingsRaw)(),t=(0,s.detectMode)();(0,s.applyModeAttr)(t),(0,c.syncAccent)(t),(0,c.syncDarkMode)(),(0,u.ensureUI)(p.wireOnce),(0,f.syncNightlyMiniMode)(),(0,u.setPresentationOnlyVisibility)(t),(0,u.syncVoiceFooterToggle)(t),(0,u.syncHeaderBandToggle)(t),(t!==l.I.lastMode||e!==l.I.lastSettingsRaw)&&((0,d.applyFontLogic)(t),(0,m.applyModeOnlyNow)(t),l.I.lastMode=t,l.I.lastSettingsRaw=e),(0,d.syncSliderToCurrent)(),(0,u.syncFontSizeLabel)(),(0,u.requestPositionUpdate)()}finally{l.I.ticking=!1}}))}(0,l.initInstance)()&&((0,g.initHorizontalQuizCompatibility)(),(0,h.initAuthorComments)(),(0,o.initReverseNavigation)(),(0,r.initPresenterSupport)(),(0,p.initEvents)(O),O(),(0,m.initModeOnly)(()=>l.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU","./presenter":"d6102","./autoscrolling":"a2N0z","./reverseNavigation":"lCNcT","./authorComments":"ilLos","./horizontalQuizCompatibility":"1QDL1"}],jPEty:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){let e=window,t=null;for(;;)try{if(function(e){try{return e.frameElement?.id==="liascript-preview"}catch(e){return!1}}(e)||function(e){try{return!!e.querySelector("#lia-toolbar-nav, .lia-canvas, #lia-toc, header.lia-header")}catch(e){return!1}}(e.document))return e;let n=e.parent;if(!n||n===e)break;n.document.documentElement,t||(t=n),e=n}catch(e){break}return t||window}r.defineInteropFlag(n),r.export(n,"getRootWindow",()=>o),r.export(n,"ROOT_WIN",()=>a),r.export(n,"ROOT_DOC",()=>l),r.export(n,"CONTENT_WIN",()=>s),r.export(n,"CONTENT_DOC",()=>c),r.export(n,"REG",()=>f),r.export(n,"DOC_ID",()=>u),r.export(n,"I",()=>p),r.export(n,"initInstance",()=>m),r.export(n,"SETTINGS_KEY",()=>h),r.export(n,"FONT_KEY",()=>g),r.export(n,"OVERLAY_ID",()=>O),r.export(n,"BTN_ID",()=>y),r.export(n,"PANEL_ID",()=>b),r.export(n,"SLIDER_ID",()=>_),r.export(n,"TITLE_ID",()=>v),r.export(n,"INLINE_SLOT_ID",()=>T),r.export(n,"VOICE_TOGGLE_BTN_ID",()=>x),r.export(n,"HEADER_TOGGLE_BTN_ID",()=>E),r.export(n,"clamp",()=>C);let a=o(),l=a.document,s=window,c=document,d="__LIA_TFF_REG_V2__";a[d]=a[d]||{instances:{}};let f=a[d],u=(c.baseURI||s.location.href||"")+"::"+(c.title||""),p=null;function m(){return!f.instances[u]?.__alive&&(p={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null},f.instances[u]=p,!0)}let h="settings",g="lia-tff-font-px-v2",O="lia-tff-overlay-v2",y="lia-tff-btn-v2",b="lia-tff-panel-v2",_="lia-tff-slider-v2",v="lia-tff-title-v2",T="lia-tff-inline-slot-v2",x="lia-tff-voice-toggle-v2",E="lia-tff-header-toggle-v2";function C(e,t,n){return Math.max(t,Math.min(n,e))}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(e,t,n,i){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],aGLfG:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"norm",()=>a),r.export(n,"safeGetSettingsRaw",()=>l),r.export(n,"findModeInJson",()=>s),r.export(n,"detectMode",()=>c),r.export(n,"applyModeAttr",()=>d);var o=e("./state");function a(e){return String(null==e?"":e).toLowerCase()}function l(){try{return localStorage.getItem(o.SETTINGS_KEY)}catch(e){return null}}function s(e){let t=new Set,n=new Set(["mode","view","layout","format"]);return function e(i){if(null==i)return null;if("string"==typeof i){let e=a(i);return e.includes("presentation")?"presentation":e.includes("slides")?"slides":e.includes("textbook")||e.includes("book")?"textbook":null}if("object"!=typeof i||t.has(i))return null;t.add(i);let r=[];for(let t in i)if(Object.prototype.hasOwnProperty.call(i,t))if(n.has(a(t))){let n=e(i[t]);if(n)return n}else r.push(t);for(let t of r){let n=e(i[t]);if(n)return n}return null}(e)}function c(){let e=l();if(!e)return"unknown";try{let t=JSON.parse(e);return s(t)||"unknown"}catch(n){let t=a(e);if(t.includes("presentation"))return"presentation";if(t.includes("slides"))return"slides";if(t.includes("textbook")||t.includes("book"))return"textbook";return"unknown"}}function d(e){try{let t=o.CONTENT_DOC.documentElement;t.dataset.liaMode!==e&&(t.dataset.liaMode=e)}catch(e){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"ensureStyle",()=>a),r.export(n,"setVar",()=>l),r.export(n,"syncAccent",()=>u),r.export(n,"ensureContentCSS",()=>m),r.export(n,"ensureRootCSS",()=>g),r.export(n,"syncDarkMode",()=>y);var o=e("./state");function a(e,t,n){try{if(!e||e.getElementById(t))return;let i=e.createElement("style");i.id=t,i.textContent=n,(e.head||e.documentElement).appendChild(i)}catch(e){}}function l(e,t,n){try{let i=e.documentElement.style;(i.getPropertyValue(t)!==n||i.getPropertyPriority(t))&&i.setProperty(t,n)}catch(e){}}let s=null,c=null;function d(e){return[e.documentElement,e.body].map(e=>e?[Array.from(e.classList).filter(e=>!e.startsWith("lia-tff-")).sort().join(" "),e.getAttribute("data-theme"),e.getAttribute("data-bs-theme")].join("|"):"").join("|")}function f(e){try{let t=e||document,n=t.body||t.documentElement,i=t.defaultView,r=t.querySelector(".lia-btn");if(r){let e=i.getComputedStyle(r).backgroundColor;if(e&&"rgba(0, 0, 0, 0)"!==e&&"transparent"!==e)return e}let o=t.createElement("button");o.id="lia-tff-accent-probe-v2",o.className="lia-btn",o.type="button",o.textContent="x",o.style.position="absolute",o.style.left="-9999px",o.style.top="-9999px",o.style.visibility="hidden",n.appendChild(o);let a=i.getComputedStyle(o).backgroundColor;if(o.remove(),a&&"rgba(0, 0, 0, 0)"!==a&&"transparent"!==a)return a}catch(e){}return null}function u(e){let t=[e,d(o.ROOT_DOC),d(o.CONTENT_DOC),o.ROOT_WIN.matchMedia?.("(prefers-color-scheme: dark)").matches].join("|");if(t===c&&s){l(o.ROOT_DOC,"--lia-tff-accent",s),o.CONTENT_DOC!==o.ROOT_DOC&&l(o.CONTENT_DOC,"--lia-tff-accent",s);return}let n=f(o.ROOT_DOC)||f(o.CONTENT_DOC)||"rgb(11,95,255)";s=n,c=t,l(o.ROOT_DOC,"--lia-tff-accent",n),o.CONTENT_DOC!==o.ROOT_DOC&&l(o.CONTENT_DOC,"--lia-tff-accent",n)}let p=`
:root{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 80vh;
  --lia-tff-font: unset;
}

html[data-lia-mode="presentation"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 80vh;
}

html[data-lia-mode="slides"]{
  --lia-tff-left-gap: 50px;
  --lia-tff-right-gap: 25px;
  --lia-tff-pad-left: 25px;
  --lia-tff-pad-right: 25px;
  --lia-tff-maxw: 98.5vw;
  --lia-tff-slide-top-preview: 5vh;
  --lia-tff-slide-exit-space: 80vh;
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

/* Reserve the vertical scrollbar on the element that actually scrolls. This
   keeps responsive content at one width while animation steps change the
   amount of overflow. */
html[data-lia-mode="presentation"] .lia-slide__container,
html[data-lia-mode="slides"] .lia-slide__container{
  scrollbar-gutter: stable;
}

/* Older engines have no gutter reservation. A permanently allocated classic
   scrollbar is the closest non-clipping fallback and keeps manual scrolling. */
@supports not (scrollbar-gutter: stable){
  html[data-lia-mode="presentation"] .lia-slide__container,
  html[data-lia-mode="slides"] .lia-slide__container{
    overflow-y: scroll !important;
  }
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

/* A fixed 80% of the content viewport keeps the scroll tail independent of
   changing slide content and avoids measurement feedback while animations run. */
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
`;function m(){a(o.CONTENT_DOC,"lia-tff-style-content-v2",p)}let h=`
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
`;function g(){a(o.ROOT_DOC,"lia-tff-style-root-v2",h)}let O=null;function y(){try{if(!o.ROOT_DOC.body)return;let e=function(){try{let e=o.ROOT_DOC.documentElement,t=o.ROOT_DOC.body;if(e.classList.contains("lia-variant-light")||"light"===e.getAttribute("data-bs-theme")||"light"===e.getAttribute("data-theme")||"light"===t.getAttribute("data-bs-theme")||"light"===t.getAttribute("data-theme"))return!1;if(e.classList.contains("lia-variant-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark")||"dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark"))return!0}catch(e){}try{if(o.ROOT_WIN.matchMedia&&o.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(e){}try{let e=o.ROOT_WIN.getComputedStyle(o.ROOT_DOC.body).backgroundColor;if(e&&"rgba(0, 0, 0, 0)"!==e&&"transparent"!==e){let t=e.match(/\d+/g);if(t&&t.length>=3&&(.299*t[0]+.587*t[1]+.114*t[2])/255<.45)return!0}}catch(e){}return!1}();if(e===O)return;O=e,o.ROOT_DOC.body.classList.toggle("lia-tff-dark",e)}catch(e){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getSavedFontPx",()=>c),r.export(n,"setPresFontPx",()=>d),r.export(n,"applyFontLogic",()=>p),r.export(n,"syncSliderToCurrent",()=>m);var o=e("./state"),a=e("./css");let l=[18,24,32];function s(){let e=o.CONTENT_DOC.querySelector("main")||o.CONTENT_DOC.documentElement,t=parseFloat(o.CONTENT_WIN.getComputedStyle(e).fontSize||"16");return isNaN(t)?16:t}function c(){try{let e=localStorage.getItem(o.FONT_KEY);if(!e)return null;let t=parseInt(e,10);return isFinite(t)?t:null}catch(e){return null}}function d(e){(0,a.setVar)(o.CONTENT_DOC,"--lia-tff-font",null==e?"unset":e+"px")}let f=null,u=null;function p(e){var t;let n,i,r="presentation"===e;if(!(r||"slides"===e)){d(null),f=null,u=null;return}let a=(n=o.CONTENT_DOC.querySelector("main")||o.CONTENT_DOC.documentElement,i=o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),f===n&&null!=u||isFinite(parseFloat(i))||(f=n,u=s()),l[(t=null==u?s():u)<=17?0:t<=19?1:2]);if(r){let e=c();if(null!=e)return void d((0,o.clamp)(e,14,48))}d(a)}function m(){let e=o.ROOT_DOC.getElementById(o.SLIDER_ID);if(!e)return;let t=parseInt(e.min||"14",10),n=parseInt(e.max||"48",10),i=c();if(null!=i){e.value=String((0,o.clamp)(i,t,n));return}let r=parseInt(o.CONTENT_WIN.getComputedStyle(o.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(r)&&(e.value=String((0,o.clamp)(r,t,n)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"getToolbarHeader",()=>a),r.export(n,"getToolbarLeftContainer",()=>l),r.export(n,"getLayoutViewport",()=>s),r.export(n,"getViewport",()=>c),r.export(n,"getVisibleRect",()=>d),r.export(n,"getRectLoose",()=>f),r.export(n,"isNightlyNavigationHidden",()=>p),r.export(n,"syncNightlyMiniMode",()=>m),r.export(n,"getTFFTOCButton",()=>h),r.export(n,"getTFFTOCButtonRect",()=>g),r.export(n,"shouldUseTFFNightlyStackDock",()=>O),r.export(n,"shouldUseInlineStripDock",()=>y),r.export(n,"ensureInlineDockSlot",()=>b),r.export(n,"getHighlightRect",()=>_),r.export(n,"getToolbarBandRect",()=>v),r.export(n,"getVirtualHighlightSlotRect",()=>T),r.export(n,"getStableLeftToolbarPeers",()=>x),r.export(n,"getTOCDockSlot",()=>E),r.export(n,"getDockTarget",()=>C);var o=e("./state");function a(){return o.ROOT_DOC.querySelector("header#lia-toolbar-nav")||o.ROOT_DOC.querySelector("#lia-toolbar-nav")||o.ROOT_DOC.querySelector("header.lia-header")}function l(){let e=a();return e?e.querySelector(".lia-header__left")||e:null}function s(){let e=o.ROOT_DOC.documentElement;return{w:e.clientWidth||o.ROOT_WIN.innerWidth,h:e.clientHeight||o.ROOT_WIN.innerHeight,ox:0,oy:0}}function c(){let e=o.ROOT_WIN.visualViewport;return e?{w:e.width,h:e.height,ox:e.offsetLeft||0,oy:e.offsetTop||0}:s()}function d(e,t=c()){if(!e)return null;try{let n=o.ROOT_WIN.getComputedStyle(e);if(!n||"none"===n.display||"hidden"===n.visibility||"0"===n.opacity)return null;let i=e.getBoundingClientRect();if(!i||i.width<6||i.height<6||i.right<=t.ox||i.bottom<=t.oy||i.left>=t.ox+t.w||i.top>=t.oy+t.h)return null;return i}catch(e){return null}}function f(e,t=c()){if(!e)return null;try{let n=o.ROOT_WIN.getComputedStyle(e);if(!n||"none"===n.display||"hidden"===n.visibility)return null;let i=e.getBoundingClientRect();if(!i||i.width<2||i.height<2||i.right<=t.ox||i.bottom<=t.oy||i.left>=t.ox+t.w||i.top>=t.oy+t.h)return null;return i}catch(e){return null}}function u(e){return d(e,s())}function p(){let e=o.ROOT_DOC.querySelector(".lia-canvas");return!!(e&&e.classList.contains("lia-navigation--hidden"))}function m(){try{let e=o.ROOT_DOC.body;if(!e)return;let t=p();e.classList.contains("lia-tff-nightly-mini")!==t&&e.classList.toggle("lia-tff-nightly-mini",t)}catch(e){}}function h(){let e=o.ROOT_DOC.getElementById("lia-btn-toc");if(e)return e;let t=l();return t&&Array.from(t.querySelectorAll("button,[role='button'],a")).find(e=>{let t=((e.getAttribute("aria-label")||"")+" "+(e.getAttribute("title")||"")+" "+(e.textContent||"")).toLowerCase();return t.includes("inhaltsverzeichnis")||t.includes("table of contents")||t.includes("contents")})||null}function g(){return u(h())}function O(){let e=o.ROOT_DOC.querySelector(".lia-canvas");return!!e&&e.classList.contains("lia-navigation--hidden")&&e.classList.contains("lia-mode--presentation")}function y(){if(O())return!1;let e=l(),t=h();return!!(e&&t&&e.contains(t))}function b(){let e=l(),t=h();if(!e||!t||!e.contains(t))return null;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);return n||((n=o.ROOT_DOC.createElement("div")).id=o.INLINE_SLOT_ID),(n.parentNode!==e||n.previousElementSibling!==t)&&t.insertAdjacentElement("afterend",n),n}function _(){return u(o.ROOT_DOC.getElementById("lia-hl-btn"))}function v(){let e=u(l());return e||u(a())}function T(){let e=v();return e?{left:e.left+8,top:e.top+(e.height-34)/2,right:e.left+8+34,bottom:e.top+(e.height-34)/2+34,width:34,height:34}:null}function x(){let e=s(),t=l();if(!t)return[];let n=[];for(let i of Array.from(t.querySelectorAll("button,[role='button'],a"))){if(!i||i.id===o.BTN_ID)continue;let t=u(i);t&&!(t.top>220)&&!(t.left>.6*e.w)&&(t.width>220||t.height>100||n.push({el:i,r:t}))}if(n.sort((e,t)=>e.r.left-t.r.left||e.r.top-t.r.top),!n.length)return n;let i=n[0].r.top+n[0].r.height/2,r=Math.max(20,.9*n[0].r.height);return n.filter(e=>Math.abs(e.r.top+e.r.height/2-i)<=r)}function E(){let e=o.ROOT_DOC.getElementById("lia-toc"),t=o.ROOT_DOC.getElementById("lia-btn-toc"),n=f(t,s()),i=p(),r=i?22:34;if(!n)return null;if(i){let e=n.left+(n.width-r)/2,i=n.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,e),top:Math.max(8,i),right:Math.max(8,e)+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:t,r:n}]}}if(e&&e.classList.contains("lia-toc--open")){let e=n.right+8,i=n.top+(n.height-r)/2;return{kind:"toc-open-slot",rect:{left:e,top:Math.max(8,i),right:e+r,bottom:Math.max(8,i)+r,width:r,height:r},peers:[{el:t,r:n}]}}return{kind:"toc-button",rect:n,peers:[{el:t,r:n}]}}function C(){let e=_();if(e)return{kind:"highlight",rect:e,peers:[{el:o.ROOT_DOC.getElementById("lia-hl-btn"),r:e}]};let t=x();if(t.length){let e=t[0].r;for(let n of t)n.r.right>e.right&&(e=n.r);return{kind:"toolbar-row",rect:e,peers:t}}let n=E();if(n)return n;let i=T();return i?{kind:"virtual-highlight-slot",rect:i,peers:[]}:null}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"requestPositionUpdate",()=>u),r.export(n,"cancelPositionUpdate",()=>p),r.export(n,"ensureUI",()=>m),r.export(n,"toggleVoiceFooterCollapsed",()=>y),r.export(n,"syncVoiceFooterToggle",()=>b),r.export(n,"toggleHeaderBandCollapsed",()=>x),r.export(n,"positionHeaderBandToggle",()=>E),r.export(n,"syncHeaderBandToggle",()=>C),r.export(n,"placeButtonInCorrectHost",()=>D),r.export(n,"positionOverlayButton",()=>w),r.export(n,"positionPanel",()=>I),r.export(n,"setPresentationOnlyVisibility",()=>R),r.export(n,"syncFontSizeLabel",()=>S);var o=e("./state"),a=e("./toolbar"),l=e("./i18n");let s=!0,c=!1;function d(e,t,n){e.style.getPropertyValue(t)!==n&&e.style.setProperty(t,n)}let f=null;function u(){null===f&&(f=o.ROOT_WIN.requestAnimationFrame(()=>{f=null;let e=(0,a.getViewport)();w(e),I(e),E()}))}function p(){null!==f&&(o.ROOT_WIN.cancelAnimationFrame(f),f=null)}function m(e){let t=!1,n=o.ROOT_DOC.getElementById(o.OVERLAY_ID);n||((n=o.ROOT_DOC.createElement("div")).id=o.OVERLAY_ID,o.ROOT_DOC.body.appendChild(n));let i=o.ROOT_DOC.getElementById(o.BTN_ID);if(!i){(i=o.ROOT_DOC.createElement("button")).id=o.BTN_ID,i.type="button";let e=(0,l.getFontSizeLabel)();i.setAttribute("aria-label",e),i.setAttribute("title",e);let r=o.ROOT_DOC.createElement("span");r.className="tffA-small",r.textContent="A";let a=o.ROOT_DOC.createElement("span");a.className="tffA-big",a.textContent="A",i.appendChild(r),i.appendChild(a),n.appendChild(i),t=!0}let r=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!r){(r=o.ROOT_DOC.createElement("div")).id=o.PANEL_ID;let e=(0,l.getFontSizeLabel)(),n=o.ROOT_DOC.createElement("div");n.id=o.TITLE_ID,n.textContent=e;let i=o.ROOT_DOC.createElement("input");i.id=o.SLIDER_ID,i.type="range",i.min="14",i.max="48",i.step="1",i.value="24",i.setAttribute("aria-label",e),r.appendChild(n),r.appendChild(i),o.ROOT_DOC.body.appendChild(r),t=!0}let a=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);a||((a=o.ROOT_DOC.createElement("button")).id=o.VOICE_TOGGLE_BTN_ID,a.type="button",a.setAttribute("aria-label","Vorleseleiste ausfahren"),a.setAttribute("title","Vorleseleiste ausfahren"),a.textContent="▲",o.ROOT_DOC.body.appendChild(a),t=!0);let s=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);s||((s=o.ROOT_DOC.createElement("button")).id=o.HEADER_TOGGLE_BTN_ID,s.type="button",s.setAttribute("aria-label","Headerband einklappen"),s.setAttribute("title","Headerband einklappen"),s.setAttribute("aria-expanded","true"),s.textContent="▲",o.ROOT_DOC.body.appendChild(s)),t&&e&&e()}function h(e){let t=o.ROOT_DOC.documentElement;t.classList.contains("lia-tff-voice-collapsed")!==e&&t.classList.toggle("lia-tff-voice-collapsed",e)}function g(){let e=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!e)return;let t=s,n=String.fromCodePoint(t?9650:9660),i=t?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";if(e.textContent===n&&e.getAttribute("aria-label")===i&&e.getAttribute("title")===i)return;e.textContent=t?"▲":"▼";let r=t?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";e.setAttribute("aria-label",r),e.setAttribute("title",r)}function O(e){return("presentation"===e||"slides"===e)&&(o.ROOT_WIN.matchMedia?o.ROOT_WIN.matchMedia("(min-width: 1001px)").matches:(0,a.getLayoutViewport)().w>=1001)}function y(){h(s=!s),g()}function b(e){let t=o.ROOT_DOC.getElementById(o.VOICE_TOGGLE_BTN_ID);if(!t)return;t.onclick=e=>{e&&(e.preventDefault(),e.stopPropagation()),y()};let n=O(e);if(d(t,"display",n?"flex":"none"),!n){h(!1),g();return}o.ROOT_DOC.documentElement.classList.contains("lia-tff-voice-collapsed")!==s&&h(s),g()}function _(e){try{e.focus({preventScroll:!0})}catch(t){e.focus()}}function v(e){if(e){let e=(0,a.getToolbarHeader)(),t=o.ROOT_DOC.activeElement,n=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);e&&t&&e.contains(t)&&n&&_(n)}let t=[o.ROOT_DOC.documentElement];for(let n of(o.CONTENT_DOC!==o.ROOT_DOC&&t.push(o.CONTENT_DOC.documentElement),t))n.classList.contains("lia-tff-header-collapsed")!==e&&n.classList.toggle("lia-tff-header-collapsed",e)}function T(){let e=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!e)return;let t=c,n=String.fromCodePoint(t?9660:9650),i=t?"Headerband ausfahren":"Headerband einklappen",r=t?"false":"true";(e.textContent!==n||e.getAttribute("aria-label")!==i||e.getAttribute("title")!==i||e.getAttribute("aria-expanded")!==r)&&(e.textContent=t?"▼":"▲",e.setAttribute("aria-label",i),e.setAttribute("title",i),e.setAttribute("aria-expanded",r))}function x(){v(c=!c),c&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),T(),u()}function E(){let e=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!e)return;let t=0;if(!c){let e=(0,a.getToolbarHeader)();if(e)try{let n=e.getBoundingClientRect();isFinite(n.bottom)&&(t=Math.max(0,n.bottom))}catch(e){}}let n=`${Math.round(t)}px`;(e.style.getPropertyValue("top")!==n||"important"!==e.style.getPropertyPriority("top"))&&e.style.setProperty("top",n,"important")}function C(e){let t=o.ROOT_DOC.getElementById(o.HEADER_TOGGLE_BTN_ID);if(!t)return;t.onclick=e=>{e&&(e.preventDefault(),e.stopPropagation()),x()};let n=(0,a.getToolbarHeader)(),i=O(e)&&!!n,r=n&&n.id;if(r&&t.getAttribute("aria-controls")!==r?t.setAttribute("aria-controls",r):!r&&t.hasAttribute("aria-controls")&&t.removeAttribute("aria-controls"),!i){if(v(!1),o.ROOT_DOC.activeElement===t){let e=n?.querySelector('#lia-btn-toc, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');e&&e!==t?_(e):t.blur()}d(t,"display","none"),u(),T();return}d(t,"display","flex"),v(c),u(),T()}function D(){let e=o.ROOT_DOC.getElementById(o.BTN_ID),t=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!e||!t)return;let n=o.ROOT_DOC.getElementById(o.INLINE_SLOT_ID);if((0,a.shouldUseTFFNightlyStackDock)()){e.parentNode!==t&&t.appendChild(e),n&&n.parentNode&&n.parentNode.removeChild(n);return}if((0,a.shouldUseInlineStripDock)()){let n=(0,a.ensureInlineDockSlot)();n&&e.parentNode!==n&&n.appendChild(e),d(t,"left","0px"),d(t,"top","0px"),d(e,"left",""),d(e,"top","");return}e.parentNode!==t&&t.appendChild(e),n&&n.parentNode&&n.parentNode.removeChild(n)}function w(e=(0,a.getViewport)()){let t=o.ROOT_DOC.getElementById(o.BTN_ID),n=o.ROOT_DOC.getElementById(o.OVERLAY_ID);if(!t||!n)return;D();let i=o.ROOT_DOC.documentElement,r=(0,a.shouldUseTFFNightlyStackDock)(),l=o.ROOT_DOC.querySelector("#lia-hl-ui-overlay-v1 > #lia-hl-btn"),s=l?o.ROOT_WIN.getComputedStyle(l):null,c=o.ROOT_WIN.getComputedStyle(t),f=!!l&&"none"!==c.display&&"hidden"!==c.visibility&&t.offsetWidth>0&&t.offsetHeight>0&&l.offsetWidth>0&&l.offsetHeight>0&&s?.display!=="none"&&s?.visibility!=="hidden",u=r&&f,p=(0,a.shouldUseInlineStripDock)(),m=p&&f,h=(0,a.getTFFTOCButtonRect)(),g=!r&&!p&&f&&!!h;!u&&!m&&!g&&i.hasAttribute("data-lia-tff-marker-dock")&&i.removeAttribute("data-lia-tff-marker-dock");let O=f?l.offsetWidth||(r?22:40):0,y=f?l.offsetHeight||(r?22:40):0;if(d(i,"--lia-tff-inline-width",m?`${46+O+8}px`:"46px"),p){if(m){let e=t.getBoundingClientRect();N(e.left-8-O,e.top+(e.height-y)/2,"inline")}return}let b=(0,a.isNightlyNavigationHidden)()?22:34,_=b,v=b;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(_=e.width,v=e.height)}catch(e){}if(g){let i=O+8+_,r=Math.max(y,v),a=(0,o.clamp)(h.right+8,e.ox+8,e.ox+e.w-i-8),l=(0,o.clamp)(h.top+(h.height-r)/2,e.oy+8,e.oy+e.h-r-8);d(n,"left","0px"),d(n,"top","0px"),d(t,"left",`${a+O+8}px`),d(t,"top",`${l+(r-v)/2}px`),N(a,l+(r-y)/2,"floating");return}let T=e.ox+8,x=e.oy+8;if(r)h&&(T=h.left+(h.width-_)/2,x=h.bottom+6);else{let e=(0,a.getDockTarget)();if(e&&e.rect){let t=e.rect;"highlight"===e.kind||"toolbar-row"===e.kind||"toc-button"===e.kind?(T=t.right+8,x=t.top+(t.height-v)/2):("toc-open-slot"===e.kind||"virtual-highlight-slot"===e.kind)&&(T=t.left,x=t.top)}}let E=Math.max(_,u?O:0),C=v+(u?6+y:0);T=(0,o.clamp)(T,e.ox+8,e.ox+e.w-E-8),x=(0,o.clamp)(x,e.oy+8,e.oy+e.h-C-8),d(n,"left","0px"),d(n,"top","0px"),d(t,"left",`${T}px`),d(t,"top",`${x}px`),u&&N(T+(_-O)/2,x+v+6,"stack")}function N(e,t,n){let i=o.ROOT_DOC.documentElement;d(i,"--lia-tff-marker-left",`${e}px`),d(i,"--lia-tff-marker-top",`${t}px`),i.getAttribute("data-lia-tff-marker-dock")!==n&&i.setAttribute("data-lia-tff-marker-dock",n)}function I(e=(0,a.getViewport)()){let t=o.ROOT_DOC.getElementById(o.BTN_ID),n=o.ROOT_DOC.getElementById(o.PANEL_ID);if(!t||!n||!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let i=t.getBoundingClientRect(),r=n.offsetWidth,l=n.offsetHeight,s=(0,o.clamp)(i.left,e.ox+8,e.ox+e.w-r-8),c=i.bottom+10;c+l+8>e.oy+e.h&&(c=i.top-10-l),c=(0,o.clamp)(c,e.oy+8,e.oy+e.h-l-8),d(n,"left",`${s}px`),d(n,"top",`${c}px`)}function R(e){let t=function(){try{if(o.ROOT_WIN.matchMedia)return o.ROOT_WIN.matchMedia("(max-width: 680px), (max-height: 520px)").matches;let{w:e,h:t}=(0,a.getLayoutViewport)();return e<=680||520>=Math.min(e,t)}catch(e){return!1}}(),n="presentation"===e&&!t,i=o.ROOT_DOC.getElementById(o.BTN_ID),r=o.ROOT_DOC.getElementById(o.PANEL_ID);return i&&d(i,"display",n?"inline-flex":"none"),!n&&r&&(o.ROOT_DOC.body.classList.contains("lia-tff-panel-open")&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),d(r,"display","none")),n}let k=null;function S(){try{let e=(0,l.detectLanguage)();if(e===k)return;k=e;let t=(0,l.getFontSizeLabel)(),n=o.ROOT_DOC.getElementById(o.TITLE_ID);n&&(n.textContent=t);let i=o.ROOT_DOC.getElementById(o.BTN_ID);i&&(i.setAttribute("aria-label",t),i.setAttribute("title",t));let r=o.ROOT_DOC.getElementById(o.SLIDER_ID);r&&r.setAttribute("aria-label",t)}catch(e){}}},{"./state":"jPEty","./toolbar":"asdc8","./i18n":"7hvC6","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7hvC6":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"detectLanguage",()=>l),r.export(n,"getFontSizeLabel",()=>s);var o=e("./state");let a={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function l(){try{let e=o.CONTENT_DOC.documentElement.lang;if(e&&e.length>=2)return e.toLowerCase().slice(0,2)}catch(e){}try{let e=o.ROOT_DOC.documentElement.lang;if(e&&e.length>=2)return e.toLowerCase().slice(0,2)}catch(e){}try{let e=localStorage.getItem(o.SETTINGS_KEY);if(e){let t=JSON.parse(e),n=t?.language??t?.lang;if(n&&"string"==typeof n&&n.length>=2)return n.toLowerCase().slice(0,2)}}catch(e){}return"en"}function s(){return a[l()]??a.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"disposeEvents",()=>m),r.export(n,"wireOnce",()=>y),r.export(n,"initEvents",()=>I);var o=e("./state"),a=e("./ui"),l=e("./toolbar"),s=e("./font"),c=e("./keyboard");let d=new AbortController,f=[],u=null,p=()=>{};function m(){for(d.abort(),(0,a.cancelPositionUpdate)(),u=null;f.length;)try{f.pop().disconnect()}catch(e){}}let h=!1,g=new WeakSet,O=new WeakSet;function y(){let e=o.ROOT_DOC.getElementById(o.BTN_ID),t=o.ROOT_DOC.getElementById(o.SLIDER_ID);e&&!g.has(e)&&(g.add(e),e.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),o.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,a.requestPositionUpdate)()},{signal:d.signal})),t&&!O.has(t)&&(O.add(t),t.addEventListener("input",()=>{let e=parseInt(t.min||"14",10),n=parseInt(t.max||"48",10),i=(0,o.clamp)(parseInt(t.value||"24",10),e,n);try{localStorage.setItem(o.FONT_KEY,String(i))}catch(e){}(0,s.setPresFontPx)(i),u?.(),(0,a.requestPositionUpdate)()},{signal:d.signal})),h||(h=!0,o.ROOT_DOC.addEventListener("click",e=>{if(!o.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let t=e.target;t?.closest?.("#"+o.PANEL_ID+",#"+o.BTN_ID+",#"+o.VOICE_TOGGLE_BTN_ID)||o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{capture:!0,signal:d.signal}),o.ROOT_DOC.addEventListener("keydown",e=>{(0,c.isEditableKeyboardEvent)(e)||"Escape"===e.key&&o.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},{signal:d.signal}),o.ROOT_WIN.visualViewport&&(o.ROOT_WIN.visualViewport.addEventListener("resize",a.requestPositionUpdate,{signal:d.signal}),o.ROOT_WIN.visualViewport.addEventListener("scroll",a.requestPositionUpdate,{signal:d.signal})),o.ROOT_DOC.addEventListener("scroll",a.requestPositionUpdate,{capture:!0,passive:!0,signal:d.signal}))}let b="#app,.lia-canvas,.lia-slide,.lia-slide__container,main,#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination",_="#lia-toolbar-nav,header.lia-header,#lia-toc,.lia-responsive-voice,.lia-pagination",v="#lia-hl-ui-overlay-v1,#lia-hl-btn",T=b+",#focused,[data-lia-tff-autoscrolling],"+v,x='[id^="lia-tff-"],#__LIA_MODE_ONLY_STYLE_V01__',E=new Set([o.OVERLAY_ID,o.BTN_ID,o.PANEL_ID,o.SLIDER_ID,o.VOICE_TOGGLE_BTN_ID,o.HEADER_TOGGLE_BTN_ID]),C=["class","id","hidden","lang","data-theme","data-bs-theme","data-mode","data-view","mode","aria-expanded","aria-checked","aria-selected","aria-pressed","aria-hidden","data-lia-tff-autoscrolling"];function D(e){return 1===e.nodeType?e:e.parentElement}function w(e){return(e||"").split(/\s+/).filter(e=>e&&(!e.startsWith("lia-tff-")||"lia-tff-header-collapsed"===e||"lia-tff-voice-collapsed"===e)).sort().join(" ")}function N(e){let t=D(e.target);if(!t)return!1;if(t.closest(x))return"childList"===e.type&&Array.from(e.removedNodes).some(e=>{let t=D(e);return!!t&&E.has(t.id)&&!o.ROOT_DOC.getElementById(t.id)});if("attributes"===e.type){let n=e.attributeName;return("class"!==n||w(e.oldValue)!==w(t.getAttribute("class")))&&(!!("id"===n&&("focused"===t.id||"focused"===e.oldValue)||"data-lia-tff-autoscrolling"===n||t===t.ownerDocument.documentElement||t===t.ownerDocument.body||t.matches(b+","+v)||t.closest(_))||"aria-checked"===n||"aria-selected"===n||"aria-pressed"===n||!!t.closest(".lia-effect,.lia-effect__content"))}let n=[...Array.from(e.addedNodes),...Array.from(e.removedNodes)].filter(e=>{let t=D(e);return!t?.closest(x)||!!t.id&&E.has(t.id)&&!o.ROOT_DOC.getElementById(t.id)});return!!n.length&&(!!(n.some(e=>{let t=D(e);return!!t&&E.has(t.id)&&!o.ROOT_DOC.getElementById(t.id)})||t.closest(_))||(t.closest("main")?n.some(e=>1===e.nodeType):n.some(e=>{let t=D(e);return!!t&&(t.matches(T)||!!t.querySelector(T))})))}function I(e){u=e;if("u">typeof ResizeObserver)try{let t=new Set,n=new ResizeObserver(t=>{t.length&&((0,a.requestPositionUpdate)(),t.some(e=>e.target.matches("main,.lia-slide__container"))&&e())});f.push(n),(p=()=>{let e=new Set,i=(0,l.getToolbarHeader)();for(let t of(i&&e.add(i),Array.from(o.CONTENT_DOC.querySelectorAll("main:not([hidden])")))){e.add(t);let n=t.closest(".lia-slide__container");n&&e.add(n)}for(let i of t)e.has(i)||n.unobserve(i);for(let i of e)t.has(i)||n.observe(i);t=e})()}catch(e){}for(let t of o.ROOT_DOC===o.CONTENT_DOC?[o.ROOT_DOC]:[o.ROOT_DOC,o.CONTENT_DOC]){try{let n=new MutationObserver(t=>{t.some(N)&&(p(),e())});f.push(n),n.observe(t.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:C,attributeOldValue:!0})}catch(e){}let n=t.defaultView;if(!n)continue;let i=`${t.documentElement.clientWidth}|${t.documentElement.clientHeight}`;n.addEventListener("resize",()=>{(0,a.requestPositionUpdate)();let n=`${t.documentElement.clientWidth}|${t.documentElement.clientHeight}`;n!==i&&(i=n,e())},{signal:d.signal}),n.addEventListener("orientationchange",e,{signal:d.signal}),n.addEventListener("storage",t=>{(t.key===o.SETTINGS_KEY||t.key===o.FONT_KEY||null===t.key)&&e()},{signal:d.signal}),n.addEventListener("hashchange",e,{signal:d.signal}),n.addEventListener("focus",e,{signal:d.signal}),t.addEventListener("visibilitychange",()=>{"visible"===t.visibilityState&&e()},{signal:d.signal})}for(let t of["(max-width: 680px)","(max-height: 520px)","(min-width: 1001px)","(prefers-color-scheme: dark)"])try{o.ROOT_WIN.matchMedia(t).addEventListener("change",e,{signal:d.signal})}catch(e){}}},{"./state":"jPEty","./ui":"7Wjmu","./toolbar":"asdc8","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],"5sy7j":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(e){return!!e&&"function"==typeof e.matches}function a(e){try{let t=e.composedPath();if(t.length)return t.filter(o)}catch(e){}let t=[],n=e.target,i=o(n)?n:n?.parentElement||null;for(;i;)t.push(i),i=i.parentElement;return t}function l(e,t){return a(e).some(e=>e.matches(t))}function s(e){return a(e).some(e=>{if(e.matches("input, textarea, select, option, [role=textbox], .ace_editor, .monaco-editor, .CodeMirror, .cm-editor")||e.isContentEditable)return!0;let t=e.getAttribute("contenteditable");return null!==t&&"false"!==t.trim().toLowerCase()})}r.defineInteropFlag(n),r.export(n,"eventPathMatches",()=>l),r.export(n,"isEditableKeyboardEvent",()=>s)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"initModeOnly",()=>d),r.export(n,"applyModeOnlyNow",()=>f);let o="__LIA_MODE_ONLY_STYLE_V01__",a=`
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
`;function l(e){return String(e??"").trim().toLowerCase()}function s(e){let t=l(e);return"book"===t?"textbook":"hearing"===t?"presentation":"visibility"===t?"slides":"textbook"===t||"presentation"===t||"slides"===t?t:t.includes("textbook")||t.includes("lehrbuch")?"textbook":t.includes("presentation")||t.includes("präsent")?"presentation":t.includes("slides")||t.includes("folien")?"slides":null}function c(e){let t=function(){let e=new Set;function t(t){try{t&&t.documentElement&&e.add(t)}catch(e){}}try{let e=window;for(let n=0;n<12&&(t(e.document),e.parent&&e.parent!==e);n++)e=e.parent}catch(e){}for(let n of Array.from(e))try{n.querySelectorAll("iframe").forEach(e=>{try{t(e.contentDocument)}catch(e){}})}catch(e){}return Array.from(e)}(),n=t.filter(e=>{try{return!!e.querySelector("[data-lia-only]")}catch(e){return!1}}),i=n.length?n:[document];for(let e of i)!function(e){try{let t=e.head||e.getElementsByTagName("head")[0]||e.documentElement;if(!t||e.getElementById(o))return;let n=e.createElement("style");n.id=o,n.appendChild(e.createTextNode(a)),t.appendChild(n)}catch(e){}}(e);let r=e;if("unknown"===r)for(let e of t){let t=function(e){let t=e.defaultView;return function(e){let t=Array.from(e.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),n=null;for(let i of t){let t=s(l(i.textContent));if(!t)continue;let r=i.closest("button,[role='button'],a"),o=(r||i).getBoundingClientRect(),a=e.defaultView.innerWidth||1200,c=0;o.top<140&&(c+=200),o.left>.55*a&&(c+=200),r&&function(e){let t=l(e.getAttribute("aria-pressed")),n=l(e.getAttribute("aria-selected")),i=l(e.className);return"true"===t||"true"===n||i.includes("active")||i.includes("selected")||i.includes("mdc-icon-button--on")}(r)&&(c+=1e3),(!n||c>n.score)&&(n={mode:t,score:c})}return n?n.mode:null}(e)||function(e){for(let t of[e.querySelector("#app"),e.querySelector("main"),e.querySelector(".markdown-body"),e.body,e.documentElement].filter(Boolean)){let e=s([t.getAttribute&&t.getAttribute("data-mode"),t.getAttribute&&t.getAttribute("data-view"),t.getAttribute&&t.getAttribute("mode"),t.className,t.id].map(e=>String(e||"")).join(" "));if(e)return e}return null}(e)||s(l(t.location.search)+"&"+l(t.location.hash))||function(e){for(let t of[e.sessionStorage,e.localStorage].filter(Boolean))try{for(let e=0;e<t.length;e++){let n=t.key(e),i=t.getItem(n),r=s((n||"")+" "+(i||""));if(r)return r}}catch(e){}return null}(t)}(e);if(t){r=t;break}}let c="slides"===r||"presentation"===r||"textbook"===r;for(let e of i)try{c?e.documentElement.setAttribute("data-lia-mode",r):e.documentElement.removeAttribute("data-lia-mode")}catch(e){}}function d(e){let t=()=>c(e());t(),setTimeout(t,50),setTimeout(t,250),setTimeout(t,1e3)}function f(e){c(e)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],d6102:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"PRESENTER_BLACKOUT_ID",()=>c),r.export(n,"initPresenterSupport",()=>_),r.export(n,"syncPresenterSupport",()=>v);var o=e("./state"),a=e("./mode"),l=e("./reverseNavigation"),s=e("./keyboard");let c="lia-tff-presenter-blackout-v1",d="data-lia-tff-presenter-blackout",f=!1,u=!1;function p(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(e){let t=String(e||"").trim().toLowerCase();return"presentation"===t||"slides"===t}function h(e,t,n){(e.style.getPropertyValue(t)!==n||"important"!==e.style.getPropertyPriority(t))&&e.style.setProperty(t,n,"important")}function g(){let e=o.ROOT_DOC.getElementById(c);if(!e){if(!o.ROOT_DOC.body)return null;(e=o.ROOT_DOC.createElement("div")).id=c,o.ROOT_DOC.body.appendChild(e)}"true"!==e.getAttribute("aria-hidden")&&e.setAttribute("aria-hidden","true"),"presentation"!==e.getAttribute("role")&&e.setAttribute("role","presentation"),h(e,"position","fixed"),h(e,"inset","0px"),h(e,"width","100vw"),h(e,"height","100vh"),h(e,"margin","0px"),h(e,"padding","0px"),h(e,"border","0px"),h(e,"background","rgb(0, 0, 0)"),h(e,"opacity","1"),h(e,"pointer-events","auto"),h(e,"cursor","none"),h(e,"z-index","2147483647");let t=!u;e.hidden!==t&&(e.hidden=t);let n=u?"on":"off";return e.dataset.state!==n&&(e.dataset.state=n),e}function O(e){u=e;let t=o.ROOT_DOC.documentElement;t.hasAttribute(d)!==e&&t.toggleAttribute(d,e),e&&o.ROOT_DOC.body?.classList.remove("lia-tff-panel-open"),g()}function y(e){let t=function(e){for(let t of p())for(let n of Array.from(t.querySelectorAll("#"+e))){let e=n.closest("main");if(!(e?.hasAttribute("hidden")||n.closest("[inert]"))&&!n.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof n.click)return n}return null}(e);return!!t&&(t.click(),!0)}function b(e){let t;if((0,s.isEditableKeyboardEvent)(e))return;let n=u&&"Escape"===e.key?"close-blackout":e.defaultPrevented||e.isComposing||e.ctrlKey||e.altKey||e.metaKey?null:e.shiftKey||"PageDown"!==e.key&&"PageDown"!==e.code?e.shiftKey||"PageUp"!==e.key&&"PageUp"!==e.code?(e.shiftKey||"."!==e.key&&"Period"!==e.code)&&"KeyB"!==e.code&&"b"!==String(e.key||"").toLowerCase()?null:"toggle-blackout":"previous":"next";if(!n)return;let i=u&&("toggle-blackout"===n||"close-blackout"===n);"close-blackout"!==n&&!m("unknown"!==(t=(0,a.detectMode)())?t:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown")||!i&&((0,s.eventPathMatches)(e,"dialog, [role=dialog], .lia-modal")||p().some(e=>!!e.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]")))||(e.preventDefault(),e.stopImmediatePropagation(),!e.repeat&&("next"===n?((0,l.cancelReverseEntry)(),y("lia-btn-next")):"previous"===n?((0,l.armReverseEntry)(),y("lia-btn-prev")||(0,l.cancelReverseEntry)()):"close-blackout"===n?O(!1):O(!u)))}function _(){if(!f)for(let e of(f=!0,g(),p()))e.addEventListener("keydown",b,!0)}function v(e){g(),u&&!m(e)&&O(!1)}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./reverseNavigation":"lCNcT","./keyboard":"5sy7j"}],lCNcT:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"cancelReverseEntry",()=>y),r.export(n,"armReverseEntry",()=>v),r.export(n,"initReverseNavigation",()=>E),r.export(n,"syncReverseNavigation",()=>C);var o=e("./state"),a=e("./mode"),l=e("./keyboard");let s="lia-btn-prev",c=!1,d=!1,f=null,u=null;function p(){return o.ROOT_DOC===o.CONTENT_DOC?[o.CONTENT_DOC]:[o.CONTENT_DOC,o.ROOT_DOC]}function m(e){let t=String(e||"").trim().toLowerCase();return"presentation"===t||"slides"===t}function h(){let e=(0,a.detectMode)();return"unknown"!==e?e:o.CONTENT_DOC.documentElement.dataset.liaMode||"unknown"}function g(){for(let e of p())for(let t of Array.from(e.querySelectorAll(".lia-pagination__current"))){if(t.closest("[hidden], [inert]"))continue;let n=t.closest(".lia-pagination");if(!n?.querySelector("#"+s))continue;let i=String(t.textContent||"").trim().match(/^\s*(\d+)(?:\s*\(\s*(\d+)\s*\/\s*(\d+)\s*\))?\s*$/);if(!i)continue;let r=Number(i[1]),o=null==i[2]?0:Number(i[2]),a=null==i[3]?0:Number(i[3]);if(Number.isInteger(r)&&Number.isInteger(o)&&Number.isInteger(a)&&!(r<1)&&!(o<0)&&!(a<0)&&!(o>a))return{doc:e,slide:r,visible:o,effects:a}}return null}function O(e,t){for(let n of[e,...p().filter(t=>t!==e)])for(let e of Array.from(n.querySelectorAll("#"+t)))if(!e.closest("[hidden], [inert]")&&!e.matches(":disabled, [aria-disabled=true], .is-disabled")&&"function"==typeof e.click)return e;return null}function y(){f=null,null!=u&&(o.ROOT_WIN.clearTimeout(u),u=null)}function b(){f&&null==u&&(u=o.ROOT_WIN.setTimeout(()=>{u=null,C(h()),f&&b()},25))}function _(){return p().some(e=>!!e.querySelector(".lia-modal, dialog[open], [role=dialog][aria-modal=true]"))}function v(){if(!m(h())||_())return void y();let e=g();!e||0!==e.visible||e.slide<=1?y():(f={fromSlide:e.slide,targetSlide:e.slide-1,sawTargetReset:!1,targetZeroSince:null,awaitingVisible:null,zeroEffectsSince:null,deadline:Date.now()+2500},b())}function T(e){if(e.isComposing||(0,l.isEditableKeyboardEvent)(e))return;let t=String(e.key||""),n=t.toLowerCase(),i="ArrowLeft"===t&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&!e.shiftKey,r=e.altKey&&e.shiftKey&&"p"===n;if("ArrowRight"===t||e.altKey&&e.shiftKey&&"n"===n)return void y();if(!_()){if(i&&e.repeat&&f){e.preventDefault(),e.stopImmediatePropagation();return}if(i){let t,n=g();if(!(m(h())&&n&&0===n.visible&&n.slide>1)||!n)return void y();if(e.preventDefault(),e.stopImmediatePropagation(),e.repeat)return;return v(),void((!(t=O(n.doc,s))||(t.click(),0))&&y())}!e.repeat&&r&&v()}}function x(e){if(d)return;let t=e.target;t&&"function"==typeof t.closest&&(t.closest("#"+s)?v():f&&y())}function E(){if(!c)for(let e of(c=!0,p()))e.addEventListener("keydown",T,!0),e.addEventListener("click",x,!0)}function C(e){if(!f)return;if(!m("unknown"===e?h():e)||_()||Date.now()>f.deadline)return void y();let t=g();if(!t||t.slide===f.fromSlide)return void b();if(t.slide!==f.targetSlide)return void y();if(!f.sawTargetReset){if(0!==t.visible){f.targetZeroSince=null,b();return}if(null==f.targetZeroSince&&(f.targetZeroSince=Date.now()),Date.now()-f.targetZeroSince<250)return void b();f.sawTargetReset=!0}if(null!=f.awaitingVisible){if(t.visible<f.awaitingVisible)return void b();f.awaitingVisible=null,f.deadline=Date.now()+2500}0===t.effects?(null==f.zeroEffectsSince&&(f.zeroEffectsSince=Date.now()),Date.now()-f.zeroEffectsSince<750)?b():y():(f.zeroEffectsSince=null,t.visible>=t.effects)?y():(f.awaitingVisible=t.visible+1,function(e){let t=O(e.doc,"lia-btn-next");if(!t)return!1;d=!0;try{t.click()}finally{d=!1}return!0}(t)?f.deadline=Date.now()+2500:f.awaitingVisible=null,b())}},{"./state":"jPEty","./mode":"aGLfG","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./keyboard":"5sy7j"}],a2N0z:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"AUTOSCROLLING_MARKER_ATTR",()=>l),r.export(n,"syncAutoscrolling",()=>g);var o=e("./state"),a=e("./autoscrollingSource");let l="data-lia-tff-autoscrolling",s="__LIA_TFF_AUTOSCROLLING_GUARD_V2__",c=`[${l}]`,d=null,f=null;function u(e){let t=function(e){try{let t=new URL(e.URL).search.slice(1);if(/^https?:\/\//i.test(t)||(t=decodeURIComponent(t)),!/^https?:\/\//i.test(t))return null;let n=new URL(t);return n.hash="",n.href}catch(e){return null}}(e);if(f?.url===t)return f;let n={url:t,slides:null,pending:null};if(f=n,d=null,!t)return n;let i=new AbortController,r=setTimeout(()=>i.abort(),3e3);return n.pending=(async()=>{try{let e=await fetch(t,{cache:"no-store",signal:i.signal});e.ok&&(n.slides=(0,a.parseAutoscrollingSource)(await e.text()))}catch(e){}finally{clearTimeout(r),n.pending=null}})(),n}function p(e){return"off"!==String(e||"").trim().toLowerCase()}function m(e,t){var n;let i,r,o,a=u(e),s=(o=(r=(i=t.parentElement||t)===t?[t]:Array.from(i.children).filter(e=>"main"===e.localName)).includes(t)?r:[t],d&&d.doc===e&&d.root===i&&(n=d.slides,n.length===o.length&&n.every((e,t)=>e===o[t]))||(d={doc:e,root:i,slides:o,settings:new Map}),d);for(let e of s.slides){let n=function(e){return Array.from(e.querySelectorAll(c)).filter(t=>t.closest("main")===e)}(e),i=n[n.length-1];i?s.settings.set(e,p(i.getAttribute(l))):e===t&&e.children.length>1&&s.settings.set(e,null)}let f=a.slides?.length===s.slides.length&&s.slides.every((e,t)=>{let n=e.querySelector("header [ondblclick]"),i=n?.getAttribute("ondblclick")?.match(/LIA\.lineGoto\((\d+)\)/);return!i||Number(i[1])===a.slides[t].line})?a.slides:null,m=s.slides.indexOf(t),h=function(e){let t=!0;for(let n of Array.from(e.querySelectorAll(c)))n.closest("main")||(t=p(n.getAttribute(l)));return t}(e);for(let e=0;e<=m;e+=1){let t=s.settings.get(s.slides[e]),n=void 0===t?f?.[e].enabled:t;null!=n&&(h=n)}return h}function h(e){return e.querySelector("main.lia-slide__content:not([hidden])")||e.querySelector("main:not([hidden])")}function g(){u(o.CONTENT_DOC);let e=Array.from(o.CONTENT_DOC.querySelectorAll("#focused")).find(e=>e.closest("main:not([hidden])"))||null,t=e?.closest("main:not([hidden])")||h(o.CONTENT_DOC);t&&m(o.CONTENT_DOC,t),e&&function(e){let t=e[s],n=t&&"object"==typeof t?t:null;if(n&&e.scrollIntoView===n.wrappedScrollIntoView)return;let i=e.scrollIntoView;if("function"!=typeof i)return;let r=function(e){let t=()=>{let t=this.closest("main:not([hidden])")||h(this.ownerDocument);(!t||m(this.ownerDocument,t))&&(void 0===e?i.call(this):i.call(this,e))},n=u(this.ownerDocument);n.pending?n.pending.then(()=>{this.isConnected&&this.closest("main:not([hidden])")&&t()}):t()};try{Object.defineProperty(e,"scrollIntoView",{configurable:!0,writable:!0,value:r}),n?n.wrappedScrollIntoView=r:Object.defineProperty(e,s,{configurable:!0,value:{wrappedScrollIntoView:r}})}catch(e){}}(e)}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151","./autoscrollingSource":"5nbKf"}],"5nbKf":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(e){let t=[],n=e.replace(/^\uFEFF/,"").split(/\r\n?|\n/),i=!1,r=null,o=0,a=null;for(let e=0;e<n.length;e+=1){let l=n[e];if(r){let e=l.match(/^ {0,3}(`+|~+)[ \t]*$/);e&&e[1][0]===r.character&&e[1].length>=r.length&&(r=null);continue}if(a){RegExp(`</${a}\\s*>`,"i").test(l)&&(a=null);continue}if(!i&&!o&&/^(?: {4}|[ \t]*\t)/.test(l))continue;if(!i&&!o){let e=l.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);if(e&&("`"!==e[1][0]||!e[2].includes("`"))){r={character:e[1][0],length:e[1].length};continue}let t=l.match(/^ {0,3}<(pre|code|script|style|textarea|xmp|iframe|noembed|noframes|template)(?:[\s>])/i);if(t){let e=t[1].toLowerCase();RegExp(`</${e}\\s*>`,"i").test(l)||(a=e);continue}}let s=o>0,c=s,d="";for(let e=0;e<l.length;)if(i){let t=l.indexOf("--\x3e",e);if(t<0)break;d+=" ".repeat(t+3-e),e=t+3,i=!1}else if(o)if("`"===l[e]){let t=e;for(;"`"===l[e];)e+=1;e-t===o&&(o=0),d+=" ".repeat(e-t)}else d+=" ",e+=1;else if(l.startsWith("\x3c!--",e))i=!0,d+="    ",e+=4;else if("\\"===l[e]&&e+1<l.length)d+=l.slice(e,e+2),e+=2;else if("`"===l[e]){let t=e;for(;"`"===l[e];)e+=1;o=e-t,c=!0,d+=" ".repeat(o)}else d+=l[e],e+=1;if(s)continue;if(/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(l)&&/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(d)){t.push({line:e}),o=0;continue}if(c||!t.length||!/^ {0,3}@autoscrolling\b/i.test(l)||!/^ {0,3}@autoscrolling\([^\r\n]*\)[ \t]*$/i.test(d))continue;let f=d.match(/^ {0,3}@autoscrolling\(\s*(on|off)\s*\)[ \t]*$/i);if(!f)return null;t[t.length-1].enabled="on"===f[1].toLowerCase()}return t.length?t:null}r.defineInteropFlag(n),r.export(n,"parseAutoscrollingSource",()=>o)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ilLos:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"findAuthorComments",()=>p),r.export(n,"initAuthorComments",()=>m);var o=e("./state");let a="§:-",l="-:§",s="data-lia-board-comment-hidden",c="data-lia-board-comment-error",d=".lia-slide__content",f="lia-board-author-comments-style",u=/^(P|DIV|SECTION|ARTICLE|ASIDE|HEADER|FOOTER|H[1-6]|LI|UL|OL|BLOCKQUOTE|TABLE|TR|TD|TH|FIGURE|FIGCAPTION|BR)$/;function p(e){let t=[],n=new Set,i=-1,r=0,o=!1;for(let s=0;s<e.length;)e.startsWith(a,s)?(r?(o=!0,n.add("Kommentare dürfen nicht verschachtelt werden.")):(i=s,o=!1),r+=1,s+=a.length):e.startsWith(l,s)?(r?0!=--r||o||t.push({start:i,end:s+l.length}):n.add("Kommentarende -:§ ohne Beginn §:-."),s+=l.length):s+=1;return r&&n.add("Kommentar nicht geschlossen: -:§ fehlt auf dieser Folie."),{ranges:t,errors:Array.from(n)}}function m(){let e=new WeakMap,t=new Map,n=new Map,i=new WeakMap,r=!1;function a(o){let a=t.get(o);a?.disconnect();try{let t=n.get(o);t.forEach(e=>e.removeAttribute(s)),t.clear(),o.querySelectorAll(d).forEach(n=>{n.parentElement?.closest(d)||function(t,n){let r,o,{source:a,units:l}=(r=[],o="",t.childNodes.forEach(function t(n){if(3===n.nodeType){let t=e.get(n),i=t&&n.data===t.written?t.source:n.data;r.push({node:n,start:o.length,end:o.length+i.length,source:i,opaque:!1}),o+=i}else if(1===n.nodeType){if(n.matches('pre,code,kbd,samp,script,style,textarea,input,select,button,svg,math,canvas,img,video,audio,iframe,object,embed,hr,.ace_editor,.katex,lia-formula,[contenteditable]:not([contenteditable="false"])')||!n.hasChildNodes()){r.push({node:n,start:o.length,end:o.length+1,source:"￼",opaque:!0}),o+="￼";return}let e=u.test(n.tagName);e&&(o+="\n"),n.childNodes.forEach(t),e&&(o+="\n")}}),{source:o,units:r}),{ranges:d,errors:f}=p(a),m=new Set,h=e=>{e.setAttribute(s,""),n.add(e)},g=e=>{for(let n=e.parentElement;n&&n!==t;n=n.parentElement)m.add(n)},O=0;for(let t of l){for(;O<d.length&&d[O].end<=t.start;)O+=1;let n=t.start,i="",r=!1;for(let e=O;e<d.length&&d[e].start<t.end;e+=1){let o=d[e],a=Math.max(t.start,o.start),l=Math.min(t.end,o.end);i+=t.source.slice(n-t.start,a-t.start),n=l,r=!0}if(i+=t.source.slice(n-t.start),t.opaque)r&&(h(t.node),g(t.node));else{let n=t.node;n.data!==i&&(n.data=i),r?(e.set(n,{source:t.source,written:i}),g(n)):e.delete(n)}}let y=e=>{let t=0;for(let n=e.parentElement;n;n=n.parentElement)t+=1;return t};for(let e of Array.from(m).sort((e,t)=>y(t)-y(e)))Array.from(e.childNodes).every(e=>8===e.nodeType||3===e.nodeType&&!e.textContent?.trim()||1===e.nodeType&&(n.has(e)||"BR"===e.tagName))&&h(e);let b=f.length?"Kommentarfehler: "+f.join(" "):"";b?t.setAttribute(c,b):t.removeAttribute(c),b&&i.get(t)!==b&&console.warn("[lia-board-mode] "+b),i.set(t,b)}(n,t)})}finally{r||a?.observe(o.documentElement,{childList:!0,subtree:!0,characterData:!0})}}[o.ROOT_DOC,o.CONTENT_DOC].forEach(function(i){if(r||t.has(i)||!i.documentElement)return;if(!i.getElementById(f)){let e=i.createElement("style");e.id=f,e.textContent=`[${s}]{display:none!important;}[${c}]::before{content:attr(${c});display:block;padding:.6em;margin-bottom:1em;border:2px solid #b45309;color:inherit;font:inherit;}`,(i.head||i.documentElement).appendChild(e)}let o=new MutationObserver(t=>{let n=!1;for(let i of t){"characterData"===i.type&&e.delete(i.target);let t=1===i.target.nodeType?i.target:i.target.parentElement;t?.closest(d)&&(n=!0),"childList"===i.type&&i.addedNodes.forEach(e=>{1===e.nodeType&&(e.matches(d)||e.querySelector(d))&&(n=!0)})}n&&a(i)});t.set(i,o),n.set(i,new Set),a(i)});let l=()=>{r=!0,t.forEach(e=>e.disconnect()),t.clear(),n.clear()};return o.ROOT_DOC.defaultView?.addEventListener("pagehide",e=>{e.persisted||l()},{once:!0}),l}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"1QDL1":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"sourceMatchesSnapshot",()=>f),r.export(n,"expandEvaluation",()=>u),r.export(n,"initHorizontalQuizCompatibility",()=>g);var o=e("./state"),a=e("./autoscrollingSource");let l='<div data-snapshot-eval="1" style="display:none;"></div>';function s(e,t,n=!1){return{reply:n,track:[],service:"db",message:{cmd:e,param:t}}}function c(){try{let e=new URL(o.CONTENT_DOC.URL).search.slice(1);if(/^https?:\/\//i.test(e)||(e=decodeURIComponent(e)),!/^https?:\/\//i.test(e))return null;let t=new URL(e);if(t.hash||t.searchParams.has("submission"))return null;return t.href}catch{return null}}function d(e){try{return/submission(?:=|%3d)/i.test(o.CONTENT_DOC.URL)||!!o.ROOT_WIN.sessionStorage.getItem("__lia_freeze_v2__:"+e)}catch{return!0}}function f(e,t){let n=e.replace(/^\uFEFF/,"").replace(/\r\n?/g,"\n"),i=(0,a.parseAutoscrollingSource)(n);if(!i||i.length!==t.sections.length)return!1;let r=n.split("\n");return i.every((e,n)=>{let o=t.sections[n];if(!o.title.every(e=>"string"==typeof e.Chars))return!1;let a=r[e.line].match(/^ {0,3}(#{1,6})[ \t]*/);if(a[1].length!==o.indentation)return!1;let l=r[e.line].slice(a[0].length).trim(),s=r.slice(e.line+1,i[n+1]?.line).join("\n");return l===o.title.map(e=>e.Chars).join("").trim()&&s.trim()===o.code.trim()})}function u(e,t){let n=!1,i=0,r=null,o=null;return e.split("\n").map(e=>{if(r){let t=e.match(/^ {0,3}(`+|~+)[ \t]*$/);return t&&t[1][0]===r.char&&t[1].length>=r.length&&(r=null),e}if(o)return RegExp("</"+o+"\\s*>","i").test(e)&&(o=null),e;if(!n&&!i){let n=e.match(/^ {0,3}(`{3,}|~{3,})/);if(n)return r={char:n[1][0],length:n[1].length},e;let i=e.match(/^ {0,3}<(pre|code|script|style|textarea|template|xmp|iframe|noembed|noframes)(?:[\s>])/i);if(i)return RegExp("</"+i[1]+"\\s*>","i").test(e)||(o=i[1]),e;if(/^@Auswertung(?:\([A-Za-z0-9; \t]*\))?[ \t]*$/.test(e))return t}for(let t=0;t<e.length;)if(n){let i=e.indexOf("--\x3e",t);if(i<0)break;t=i+3,n=!1}else if("`"===e[t]){let n=t;for(;"`"===e[t];)t++;let r=t-n;i===r?i=0:i||(i=r)}else i?t++:e.startsWith("\x3c!--",t)?(n=!0,t+=4):"\\"===e[t]?t+=2:t++;return e}).join("\n")}function p(){for(let e of Array.from(o.CONTENT_DOC.querySelectorAll("main input:not([type=hidden]):not([type=range]):not([type=button]):not([type=submit]):not([type=reset]):not([type=color]),main textarea")))if(e instanceof HTMLInputElement&&/^(radio|checkbox)$/.test(e.type)){if(e.checked)return!1}else if(e.value.trim())return!1;return!Array.from(o.CONTENT_DOC.querySelectorAll("main select")).some(e=>e.selectedIndex>0)&&!o.CONTENT_DOC.querySelector("main .lia-quiz.solved,main .lia-quiz.failed")}function m(){return!!o.CONTENT_DOC.querySelector(".lia-quiz[horizontal-quiz] .lia-quiz")}async function h(e,t){for(let n of["quiz","survey","task","code"]){let i=s("load_all",n);await e.handle(i);let r=i.message.param;if(!Array.isArray(r)||r.some(e=>t.has(e.id)&&null!=e.data))return!0}return!1}function g(){let e=o.ROOT_WIN.LIA;if(e?.version!=="2.5.0"||"function"!=typeof e.send)return;let t=c();if(!t||d(t))return;let n=!1,i=!1,r=!1,a=new AbortController,g=e=>{let t=e.target;t?.closest?.("main")&&(n=!0)};for(let e of["pointerdown","keydown","input","change"])o.CONTENT_DOC.addEventListener(e,g,{capture:!0,signal:a.signal});let O=new MutationObserver(()=>{b()});function y(){r=!0,O.disconnect(),a.abort()}async function b(){if(i||r||!m())return;if(n||!p())return void y();i=!0;let a=new AbortController,g=o.ROOT_WIN.setTimeout(()=>a.abort(),4e3),O=()=>{};try{let i=function(){let e=o.ROOT_WIN;for(let t of Object.keys(e).filter(e=>/^parcelRequire/.test(e)))try{if("function"!=typeof e[t])continue;let n=e[t]("86RH7")?.default;if(n?.PORT==="db"&&"function"==typeof n.handle)return n}catch{}return null}();if(!i)return;let r=await fetch(t,{cache:"no-store",signal:a.signal});if(!r.ok)return;let g=await r.text(),b=g.match(/^\s*<!--[\s\S]*?-->/)?.[0]||"",_=b.match(/^\s*version:[ \t]*([^\s]+)/m)?.[1]||"0.0.1",v=Number(_.split(".")[0]);if(!Number.isInteger(v))return;let T=null;for(let e=0;e<8;e++){let e=s("index_restore",{url:t,version:v});if(await i.handle(e),Array.isArray(e.message.param?.sections)){T=e.message.param;break}await new Promise(e=>o.ROOT_WIN.setTimeout(e,50))}if(!T||T.readme!==t||T.definition?.version!==_||T.definition.macro?.Auswertung?.trim()!==l||!f(g,T))return;let x=JSON.parse(JSON.stringify(T)),E=new Set;if(x.sections.forEach((e,t)=>{if(!e.code.includes("horizontal-quiz"))return;let n=u(e.code,l);n!==e.code&&(e.code=n,E.add(t))}),!E.size||!T.sections.every(e=>(function e(t,n,i=new Set){if(/<script\b|\bon\w+\s*=|@\[|^\s*```[^\n]*@/im.test(t))return!1;for(let r of t.matchAll(/(?:^|[^\w\\])@([A-Za-z][\w.-]*)/g)){let t=r[1];if(!i.has(t)&&(i.add(t),n[t]&&!e(n[t],n,i)))return!1}return!0})(e.code,T.definition.macro))||v>0&&await h(i,E)||n||!p()||c()!==t||d(t)||!m())return;let C=0;for(let t=0;t<80;t++){if(0===e.eventSemaphore){if(C||(C=Date.now()),Date.now()-C>=350)break}else C=0;await new Promise(e=>o.ROOT_WIN.setTimeout(e,50))}if(!C||Date.now()-C<350||0!==e.eventSemaphore||n||!p()||c()!==t||d(t))return;x.definition.resources=[],x.definition.onload="";let D=JSON.stringify(x.sections),w=i.handle,N=function(e){return"index_store"===e.message.cmd&&e.message.param?.readme===t&&JSON.stringify(e.message.param.sections)===D?void O():w.call(this,e)};O=()=>{i.handle===N&&(i.handle=w)},i.handle=N,y(),e.send(s("index_restore",x,!0))}catch(e){O(),console.warn("[lia-board-mode] Horizontal quiz compatibility skipped.",e)}finally{o.ROOT_WIN.clearTimeout(g),y()}}O.observe(o.CONTENT_DOC.documentElement,{childList:!0,subtree:!0}),b()}},{"./state":"jPEty","./autoscrollingSource":"5nbKf","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
