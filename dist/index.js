!function(t,e,i,n,o){var r="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof r[n]&&r[n],a=l.i||{},s=l.cache||{},p="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(e,i){if(!s[e]){if(!t[e]){if(o[e])return o[e];var a="function"==typeof r[n]&&r[n];if(!i&&a)return a(e,!0);if(l)return l(e,!0);if(p&&"string"==typeof e)return p(e);var u=Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}d.resolve=function(i){var n=t[e][1][i];return null!=n?n:i},d.cache={};var f=s[e]=new c.Module(e);t[e][0].call(f.exports,d,f,f.exports,r)}return s[e].exports;function d(t){var e=d.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var i={__esModule:!0};return e.forEach(function(t){var e=t[0],n=t[1],o=t[2]||t[0],r=c(n);"*"===e?Object.keys(r).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(i,t)||Object.defineProperty(i,t,{enumerable:!0,get:function(){return r[t]}})}):"*"===o?Object.defineProperty(i,e,{enumerable:!0,value:r}):Object.defineProperty(i,e,{enumerable:!0,get:function(){return"default"===o?r.__esModule?r.default:r:r[o]}})}),i}return c(e)}}c.isParcelRequire=!0,c.Module=function(t){this.id=t,this.bundle=c,this.require=p,this.exports={}},c.modules=t,c.cache=s,c.parent=l,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=a,c.register=function(e,i){t[e]=[function(t,e){e.exports=i},{}]},Object.defineProperty(c,"root",{get:function(){return r[n]}}),r[n]=c;for(var u=0;u<e.length;u++)c(e[u]);if(i){var f=c(i);"object"==typeof exports&&"u">typeof module?module.exports=f:"function"==typeof define&&define.amd&&define(function(){return f})}}({"8RSWf":[function(t,e,i,n){var o=t("./state"),r=t("./mode"),l=t("./css"),a=t("./font"),s=t("./toolbar"),p=t("./ui"),c=t("./events"),u=t("./modeOnly");function f(){o.I.ticking||(o.I.ticking=!0,o.ROOT_WIN.requestAnimationFrame(()=>{try{(0,l.ensureContentCSS)(),(0,l.ensureRootCSS)();let t=(0,r.safeGetSettingsRaw)(),e=(0,r.detectMode)();(0,r.applyModeAttr)(e),(0,l.syncAccent)(e),(0,l.syncDarkMode)(),(0,p.ensureUI)(c.wireOnce),(0,s.syncNightlyMiniMode)();let i=(0,p.setPresentationOnlyVisibility)(e);(0,p.syncVoiceFooterToggle)(e);let n=null===o.I.lastShow||i!==o.I.lastShow;o.I.lastShow=i;let f=(0,s.toolbarSignature)(),d=!!(f&&f!==o.I.lastToolbarSig);o.I.lastToolbarSig=f||o.I.lastToolbarSig,!i&&d&&(o.I.pendingReposition=!0),(0,p.positionOverlayButton)();let m=e!==o.I.lastMode||t!==o.I.lastSettingsRaw;m&&((0,a.applyFontLogic)(e),(0,u.applyModeOnlyNow)(e),o.I.lastMode=e,o.I.lastSettingsRaw=t);let h=n||d||m||o.I.pendingReposition;(0,l.syncSlideExitSpace)(e),h&&(o.I.pendingReposition=!1,(0,c.burstRepositionThrottled)()),(0,a.syncSliderToCurrent)(),(0,p.syncFontSizeLabel)(),i&&(0,p.positionPanel)()}finally{o.I.ticking=!1}}))}(0,o.initInstance)()&&((0,c.initEvents)(f),f(),(0,u.initModeOnly)(()=>o.I.lastMode??"unknown"))},{"./state":"jPEty","./mode":"aGLfG","./css":"dDfro","./font":"895IN","./toolbar":"asdc8","./ui":"7Wjmu","./events":"6B86Q","./modeOnly":"NHYwU"}],jPEty:[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");function r(){let t=window;try{for(;t.parent&&t.parent!==t;)t=t.parent}catch(t){}return t}o.defineInteropFlag(i),o.export(i,"getRootWindow",()=>r),o.export(i,"ROOT_WIN",()=>l),o.export(i,"ROOT_DOC",()=>a),o.export(i,"CONTENT_WIN",()=>s),o.export(i,"CONTENT_DOC",()=>p),o.export(i,"REG",()=>u),o.export(i,"DOC_ID",()=>f),o.export(i,"I",()=>d),o.export(i,"initInstance",()=>m),o.export(i,"SETTINGS_KEY",()=>h),o.export(i,"FONT_KEY",()=>g),o.export(i,"OVERLAY_ID",()=>O),o.export(i,"BTN_ID",()=>y),o.export(i,"PANEL_ID",()=>b),o.export(i,"SLIDER_ID",()=>_),o.export(i,"TITLE_ID",()=>x),o.export(i,"INLINE_SLOT_ID",()=>T),o.export(i,"VOICE_TOGGLE_BTN_ID",()=>v),o.export(i,"clamp",()=>I),o.export(i,"clearPosTimers",()=>C);let l=r(),a=l.document,s=window,p=document,c="__LIA_TFF_REG_V2__";l[c]=l[c]||{instances:{}};let u=l[c],f=(p.baseURI||s.location.href||"")+"::"+(p.title||""),d=null;function m(){return!u.instances[f]?.__alive&&(d={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1},u.instances[f]=d,!0)}let h="settings",g="lia-tff-font-px-v2",O="lia-tff-overlay-v2",y="lia-tff-btn-v2",b="lia-tff-panel-v2",_="lia-tff-slider-v2",x="lia-tff-title-v2",T="lia-tff-inline-slot-v2",v="lia-tff-voice-toggle-v2";function I(t,e,i){return Math.max(e,Math.min(i,t))}function C(){try{for(d.posTimers||(d.posTimers=[]);d.posTimers.length;)l.clearTimeout(d.posTimers.pop())}catch(t){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,i,n){i.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},i.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.exportAll=function(t,e){return Object.keys(t).forEach(function(i){"default"===i||"__esModule"===i||Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[i]}})}),e},i.export=function(t,e,i){Object.defineProperty(t,e,{enumerable:!0,get:i})}},{}],aGLfG:[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"norm",()=>l),o.export(i,"safeGetSettingsRaw",()=>a),o.export(i,"findModeInJson",()=>s),o.export(i,"detectMode",()=>p),o.export(i,"applyModeAttr",()=>c);var r=t("./state");function l(t){return String(null==t?"":t).toLowerCase()}function a(){try{return localStorage.getItem(r.SETTINGS_KEY)}catch(t){return null}}function s(t){let e=new Set,i=new Set(["mode","view","layout","format"]);return function t(n){if(null==n)return null;if("string"==typeof n){let t=l(n);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof n||e.has(n))return null;e.add(n);let o=[];for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))if(i.has(l(e))){let i=t(n[e]);if(i)return i}else o.push(e);for(let e of o){let i=t(n[e]);if(i)return i}return null}(t)}function p(){let t=a();if(!t)return"unknown";try{let e=JSON.parse(t);return s(e)||"unknown"}catch(i){let e=l(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}function c(t){try{r.CONTENT_DOC.documentElement.dataset.liaMode=t}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dDfro:[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"ensureStyle",()=>l),o.export(i,"setVar",()=>a),o.export(i,"syncAccent",()=>u),o.export(i,"ensureContentCSS",()=>d),o.export(i,"syncSlideExitSpace",()=>g),o.export(i,"ensureRootCSS",()=>y),o.export(i,"syncDarkMode",()=>_);var r=t("./state");function l(t,e,i){try{if(!t||t.getElementById(e))return;let n=t.createElement("style");n.id=e,n.textContent=i,(t.head||t.documentElement).appendChild(n)}catch(t){}}function a(t,e,i){try{t.documentElement.style.setProperty(e,i)}catch(t){}}let s=null,p=null;function c(t){try{let e=t||document,i=e.body||e.documentElement,n=e.defaultView,o=e.querySelector(".lia-btn");if(o){let t=n.getComputedStyle(o).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let r=e.createElement("button");r.className="lia-btn",r.type="button",r.textContent="x",r.style.position="absolute",r.style.left="-9999px",r.style.top="-9999px",r.style.visibility="hidden",i.appendChild(r);let l=n.getComputedStyle(r).backgroundColor;if(r.remove(),l&&"rgba(0, 0, 0, 0)"!==l&&"transparent"!==l)return l}catch(t){}return null}function u(t){if(t===p&&s){a(r.ROOT_DOC,"--lia-tff-accent",s),a(r.CONTENT_DOC,"--lia-tff-accent",s);return}let e=c(r.ROOT_DOC)||c(r.CONTENT_DOC)||"rgb(11,95,255)";s=e,p=t,a(r.ROOT_DOC,"--lia-tff-accent",e),a(r.CONTENT_DOC,"--lia-tff-accent",e)}let f=`
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

/* Reliable scroll spacer only on real slide content nodes. */
html[data-lia-mode="presentation"] .lia-slide__container > main.lia-slide__content::after,
html[data-lia-mode="slides"] .lia-slide__container > main.lia-slide__content::after{
  content: "";
  display: block;
  height: var(--lia-tff-slide-exit-space);
  pointer-events: none;
}

/* Opt-in horizontal layout for LiaScript single-/multiple-choice answers. */
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

@media (max-width: 760px){
  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers{
    flex-wrap: wrap !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label{
    flex-basis: 50% !important;
    border-block-start: 2px solid rgb(var(--color-highlight)) !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label:nth-child(2n+1)::before,
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label:nth-child(2n+1)::before{
    display: none !important;
  }

  .lia-quiz-single-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label:nth-child(-n+2),
  .lia-quiz-multiple-choice[horizontal-quiz] > .lia-quiz__answers > .lia-label:nth-child(-n+2){
    border-block-start: 0 !important;
  }
}
`;function d(){l(r.CONTENT_DOC,"lia-tff-style-content-v2",f)}let m=null,h=1/0;function g(t){if("presentation"!==t&&"slides"!==t){m=null;return}try{let e=Array.from(r.CONTENT_DOC.querySelectorAll(".lia-slide__container"));if(!e.length)return;let i=r.ROOT_WIN.innerHeight||1e3,n=e.filter(t=>t.clientHeight>80).map(t=>{let e=r.CONTENT_WIN.getComputedStyle(t),n=t.getBoundingClientRect(),o=Math.max(0,Math.min(n.bottom,i)-Math.max(n.top,0))*Math.max(1,n.width),l=Math.max(0,t.scrollHeight-t.clientHeight),a=+("none"!==e.display&&"hidden"!==e.visibility);return{el:t,r:n,score:a*(o+10*l)}}).sort((t,e)=>e.score-t.score),o=n[0]&&n[0].score>0?n[0].el:e.sort((t,e)=>e.scrollHeight-e.clientHeight-(t.scrollHeight-t.clientHeight))[0];if(!o)return;let l=o.querySelector("main.lia-slide__content")||r.CONTENT_DOC.querySelector("main.lia-slide__content")||r.CONTENT_DOC.querySelector("main");if(!l)return;let s=[t,Math.round(r.ROOT_WIN.innerWidth),Math.round(r.ROOT_WIN.innerHeight),Math.round(o.clientHeight),Math.round(o.scrollHeight),Math.round(o.getBoundingClientRect().top),Math.round(l.clientWidth),Math.round(l.scrollHeight)].join("|");if(s===m&&h<=.08)return;let p=o.scrollTop,c=1/0;for(let t=0;t<3;t++){o.scrollTop=o.scrollHeight;let t=function(t){let e=Array.from(t.querySelectorAll("*"));for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i||!(i.textContent||"").trim())continue;let n=r.CONTENT_WIN.getComputedStyle(i);if("none"!==n.display&&"hidden"!==n.visibility)try{let t=r.CONTENT_DOC.createRange();t.selectNodeContents(i);let e=Array.from(t.getClientRects());for(let t=e.length-1;t>=0;t--){let i=e[t];if(i&&!(i.width<4)&&!(i.height<2))return i}}catch(t){}}return null}(l);if(!t)break;let e=o.getBoundingClientRect(),i=t.top,n=e.top-.6*Math.max(2,t.height),s=r.CONTENT_WIN.getComputedStyle(r.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-slide-exit-space"),p=function(t,e){let i=String(t||"").trim().toLowerCase();if(!i)return 0;if(i.endsWith("px")){let t=parseFloat(i.slice(0,-2));return isFinite(t)?t:0}if(i.endsWith("vh")){let t=parseFloat(i.slice(0,-2));return isFinite(t)?e*t/100:0}let n=parseFloat(i);return isFinite(n)?n:0}(s,r.ROOT_WIN.innerHeight),u=i-n;if((c=Math.abs(u))<=.08)break;let f=(0,r.clamp)(p+u,0,1.25*o.clientHeight);if(.05>Math.abs(f-p))break;a(r.CONTENT_DOC,"--lia-tff-slide-exit-space",`${f.toFixed(2)}px`),l.offsetHeight}o.scrollTop=p,m=s,h=c}catch(t){}}let O=`
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

#${r.OVERLAY_ID}{
  position: fixed !important;
  z-index: 99999980 !important;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none !important;
}

#${r.BTN_ID}{
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

#${r.INLINE_SLOT_ID}{
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

#${r.INLINE_SLOT_ID} > #${r.BTN_ID}{
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

body.lia-tff-nightly-mini #${r.BTN_ID}{
  width: 22px !important;
  height: 22px !important;
  border-radius: 6px !important;
}

body.lia-tff-nightly-mini #${r.BTN_ID} .tffA-small{
  left: 0px !important;
  top: 2px !important;
  font-size: 15px !important;
}

body.lia-tff-nightly-mini #${r.BTN_ID} .tffA-big{
  left: 5px !important;
  top: -2px !important;
  font-size: 18px !important;
}

#${r.BTN_ID}:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 12%, transparent) !important;
}
#${r.BTN_ID}:active{
  background: color-mix(in srgb, var(--lia-tff-accent) 18%, transparent) !important;
}
#${r.BTN_ID}:focus,
#${r.BTN_ID}:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

#${r.BTN_ID} .tffA-small,
#${r.BTN_ID} .tffA-big{
  position: absolute !important;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}

#${r.BTN_ID} .tffA-small{
  left: 2px !important;
  top: 3px !important;
  font-size: 24px !important;
  color: var(--lia-tff-accent) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.25) !important;
  opacity: .95 !important;
}

#${r.BTN_ID} .tffA-big{
  left: 10px !important;
  top: -2px !important;
  font-size: 30px !important;
  color: #fff !important;
  text-shadow: 0 2px 3px rgba(0,0,0,.45) !important;
  opacity: .98 !important;
}

#${r.PANEL_ID}{
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

body.lia-tff-panel-open #${r.PANEL_ID}{
  display: block !important;
}

body.lia-tff-dark #${r.PANEL_ID}{
  --tff-panel-bg: #252830;
  --tff-panel-fg: #e4e6eb;
}

#${r.TITLE_ID}{
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  color: var(--lia-tff-accent) !important;
  margin: 0 0 12px 0 !important;
}

#${r.PANEL_ID} input[type="range"]{
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
  #lia-tff-voice-toggle-v2{ display: none !important; }
}
`;function y(){l(r.ROOT_DOC,"lia-tff-style-root-v2",O)}let b=null;function _(){try{if(!r.ROOT_DOC.body)return;let t=function(){try{let t=r.ROOT_DOC.documentElement,e=r.ROOT_DOC.body;if(t.classList.contains("lia-variant-light")||"light"===t.getAttribute("data-bs-theme")||"light"===t.getAttribute("data-theme")||"light"===e.getAttribute("data-bs-theme")||"light"===e.getAttribute("data-theme"))return!1;if(t.classList.contains("lia-variant-dark")||"dark"===t.getAttribute("data-bs-theme")||"dark"===t.getAttribute("data-theme")||t.classList.contains("dark")||t.classList.contains("lia-theme-dark")||"dark"===e.getAttribute("data-bs-theme")||"dark"===e.getAttribute("data-theme")||e.classList.contains("dark")||e.classList.contains("lia-theme-dark"))return!0}catch(t){}try{if(r.ROOT_WIN.matchMedia&&r.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").matches)return!0}catch(t){}try{let t=r.ROOT_WIN.getComputedStyle(r.ROOT_DOC.body).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t){let e=t.match(/\d+/g);if(e&&e.length>=3&&(.299*e[0]+.587*e[1]+.114*e[2])/255<.45)return!0}}catch(t){}return!1}();if(t===b)return;b=t,r.ROOT_DOC.body.classList.toggle("lia-tff-dark",t)}catch(t){}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"895IN":[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"getSavedFontPx",()=>s),o.export(i,"setPresFontPx",()=>p),o.export(i,"applyFontLogic",()=>u),o.export(i,"syncSliderToCurrent",()=>f);var r=t("./state"),l=t("./css");let a=[18,24,32];function s(){try{let t=localStorage.getItem(r.FONT_KEY);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function p(t){(0,l.setVar)(r.CONTENT_DOC,"--lia-tff-font",null==t?"unset":t+"px")}let c=!1;function u(t){let e="presentation"===t;if(!(e||"slides"===t))return void p(null);if(e){let t=s();if(null!=t)return void p((0,r.clamp)(t,14,48))}c||(c=!0,p(null),r.CONTENT_WIN.requestAnimationFrame(function(){r.CONTENT_WIN.requestAnimationFrame(function(){var t;let e,i;p(a[(e=r.CONTENT_DOC.querySelector("main")||r.CONTENT_DOC.documentElement,(t=isNaN(i=parseFloat(r.CONTENT_WIN.getComputedStyle(e).fontSize||"16"))?16:i)<=17)?0:t<=19?1:2]),c=!1})}))}function f(){let t=r.ROOT_DOC.getElementById(r.SLIDER_ID);if(!t)return;let e=parseInt(t.min||"14",10),i=parseInt(t.max||"48",10),n=s();if(null!=n){t.value=String((0,r.clamp)(n,e,i));return}let o=parseInt(r.CONTENT_WIN.getComputedStyle(r.CONTENT_DOC.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(o)&&(t.value=String((0,r.clamp)(o,e,i)))}},{"./state":"jPEty","./css":"dDfro","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],asdc8:[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"getToolbarHeader",()=>l),o.export(i,"getToolbarLeftContainer",()=>a),o.export(i,"getViewport",()=>s),o.export(i,"getVisibleRect",()=>p),o.export(i,"getRectLoose",()=>c),o.export(i,"isSaneTopLeftRect",()=>u),o.export(i,"isNightlyNavigationHidden",()=>f),o.export(i,"syncNightlyMiniMode",()=>d),o.export(i,"getTFFTOCButton",()=>m),o.export(i,"getTFFTOCButtonRect",()=>h),o.export(i,"shouldUseTFFNightlyStackDock",()=>g),o.export(i,"shouldUseInlineStripDock",()=>O),o.export(i,"ensureInlineDockSlot",()=>y),o.export(i,"getHighlightRect",()=>b),o.export(i,"getToolbarBandRect",()=>_),o.export(i,"getVirtualHighlightSlotRect",()=>x),o.export(i,"getStableLeftToolbarPeers",()=>T),o.export(i,"getTOCDockSlot",()=>v),o.export(i,"getDockTarget",()=>I),o.export(i,"toolbarSignature",()=>C);var r=t("./state");function l(){return r.ROOT_DOC.querySelector("header#lia-toolbar-nav")||r.ROOT_DOC.querySelector("#lia-toolbar-nav")||r.ROOT_DOC.querySelector("header.lia-header")}function a(){let t=l();return t?t.querySelector(".lia-header__left")||t:null}function s(){let t=r.ROOT_WIN.visualViewport;if(t)return{w:t.width,h:t.height,ox:t.offsetLeft||0,oy:t.offsetTop||0};let e=r.ROOT_DOC.documentElement;return{w:e.clientWidth,h:e.clientHeight,ox:0,oy:0}}function p(t){if(!t)return null;try{let e=r.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility||"0"===e.opacity)return null;let i=t.getBoundingClientRect();if(!i||i.width<6||i.height<6)return null;let n=s();if(i.right<0||i.bottom<0||i.left>n.w||i.top>n.h)return null;return i}catch(t){return null}}function c(t){if(!t)return null;try{let e=r.ROOT_WIN.getComputedStyle(t);if(!e||"none"===e.display||"hidden"===e.visibility)return null;let i=t.getBoundingClientRect();if(!i||i.width<2||i.height<2)return null;let n=s();if(i.right<0||i.bottom<0||i.left>n.w||i.top>n.h)return null;return i}catch(t){return null}}function u(t){if(!t)return!1;let e=s();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function f(){let t=r.ROOT_DOC.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function d(){try{if(!r.ROOT_DOC.body)return;r.ROOT_DOC.body.classList.toggle("lia-tff-nightly-mini",f())}catch(t){}}function m(){let t=r.ROOT_DOC.getElementById("lia-btn-toc");if(t)return t;let e=a();return e&&Array.from(e.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function h(){let t=m();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}function g(){let t=r.ROOT_DOC.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function O(){if(g())return!1;let t=a(),e=m();return!!(t&&e&&t.contains(e))}function y(){let t=a(),e=m();if(!t||!e||!t.contains(e))return null;let i=r.ROOT_DOC.getElementById(r.INLINE_SLOT_ID);return i||((i=r.ROOT_DOC.createElement("div")).id=r.INLINE_SLOT_ID),(i.parentNode!==t||i.previousElementSibling!==e)&&e.insertAdjacentElement("afterend",i),i}function b(){let t=r.ROOT_DOC.getElementById("lia-hl-btn");if(!t)return null;let e=null;try{e=t.getBoundingClientRect()}catch(t){e=null}if(u(e))return e;let i=a()||t.parentElement||l();if(!i)return null;let n=p(i);if(!n)return null;let o=Math.max(34,t.offsetWidth||0),s=Math.max(34,t.offsetHeight||0),c=t.offsetLeft||0,f="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(n.height-s)/2),d={left:n.left+c,top:n.top+f,right:n.left+c+o,bottom:n.top+f+s,width:o,height:s};return u(d)?d:{left:n.left+8,top:n.top+Math.max(0,(n.height-34)/2),right:n.left+8+34,bottom:n.top+Math.max(0,(n.height-34)/2)+34,width:34,height:34}}function _(){let t=p(a());return t||p(l())}function x(){let t=_();return t?{left:t.left+8,top:t.top+(t.height-34)/2,right:t.left+8+34,bottom:t.top+(t.height-34)/2+34,width:34,height:34}:null}function T(){let t=s(),e=a();if(!e)return[];let i=[];for(let n of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!n||n.id===r.BTN_ID)continue;let e=p(n);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||i.push({el:n,r:e}))}if(i.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!i.length)return i;let n=i[0].r.top+i[0].r.height/2,o=Math.max(20,.9*i[0].r.height);return i.filter(t=>Math.abs(t.r.top+t.r.height/2-n)<=o)}function v(){let t=r.ROOT_DOC.getElementById("lia-toc"),e=r.ROOT_DOC.getElementById("lia-btn-toc"),i=c(e),n=f(),o=n?22:34;if(!i)return null;if(n){let t=i.left+(i.width-o)/2,n=i.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,n),right:Math.max(8,t)+o,bottom:Math.max(8,n)+o,width:o,height:o},peers:[{el:e,r:i}]}}if(t&&t.classList.contains("lia-toc--open")){let t=i.right+8,n=i.top+(i.height-o)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,n),right:t+o,bottom:Math.max(8,n)+o,width:o,height:o},peers:[{el:e,r:i}]}}return{kind:"toc-button",rect:i,peers:[{el:e,r:i}]}}function I(){let t=b();if(t)return{kind:"highlight",rect:t,peers:[{el:r.ROOT_DOC.getElementById("lia-hl-btn"),r:t}]};let e=T();if(e.length){let t=e[0].r;for(let i of e)i.r.right>t.right&&(t=i.r);return{kind:"toolbar-row",rect:t,peers:e}}let i=v();if(i)return i;let n=x();return n?{kind:"virtual-highlight-slot",rect:n,peers:[]}:null}function C(){try{let t=s(),e=I();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let i=e.rect,n=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(i.left),Math.round(i.top),Math.round(i.right),Math.round(i.bottom),Math.round(i.width),Math.round(i.height),n].join("|")}catch(t){return null}}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7Wjmu":[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"ensureUI",()=>p),o.export(i,"toggleVoiceFooterCollapsed",()=>f),o.export(i,"syncVoiceFooterToggle",()=>d),o.export(i,"placeButtonInCorrectHost",()=>m),o.export(i,"positionOverlayButton",()=>h),o.export(i,"positionPanel",()=>O),o.export(i,"setPresentationOnlyVisibility",()=>y),o.export(i,"syncFontSizeLabel",()=>_);var r=t("./state"),l=t("./toolbar"),a=t("./i18n");let s=!0;function p(t){let e=r.ROOT_DOC.getElementById(r.OVERLAY_ID);e||((e=r.ROOT_DOC.createElement("div")).id=r.OVERLAY_ID,r.ROOT_DOC.body.appendChild(e));let i=r.ROOT_DOC.getElementById(r.BTN_ID);if(!i){(i=r.ROOT_DOC.createElement("button")).id=r.BTN_ID,i.type="button";let t=(0,a.getFontSizeLabel)();i.setAttribute("aria-label",t),i.setAttribute("title",t),i.innerHTML='<span class="tffA-small">A</span><span class="tffA-big">A</span>',e.appendChild(i)}let n=!1,o=r.ROOT_DOC.getElementById(r.PANEL_ID);if(!o){(o=r.ROOT_DOC.createElement("div")).id=r.PANEL_ID;let t=(0,a.getFontSizeLabel)();o.innerHTML=`<div id="${r.TITLE_ID}">${t}</div><input id="${r.SLIDER_ID}" type="range" min="14" max="48" step="1" value="24" aria-label="${t}" />`,r.ROOT_DOC.body.appendChild(o),n=!0}let l=r.ROOT_DOC.getElementById(r.VOICE_TOGGLE_BTN_ID);l||((l=r.ROOT_DOC.createElement("button")).id=r.VOICE_TOGGLE_BTN_ID,l.type="button",l.setAttribute("aria-label","Vorleseleiste ausfahren"),l.setAttribute("title","Vorleseleiste ausfahren"),l.textContent="▲",r.ROOT_DOC.body.appendChild(l),n=!0),n&&t&&t()}function c(t){r.ROOT_DOC.documentElement.classList.toggle("lia-tff-voice-collapsed",t)}function u(){let t=r.ROOT_DOC.getElementById(r.VOICE_TOGGLE_BTN_ID);if(!t)return;let e=s;t.textContent=e?"▲":"▼";let i=e?"Vorleseleiste ausfahren":"Vorleseleiste einklappen";t.setAttribute("aria-label",i),t.setAttribute("title",i)}function f(){c(s=!s),u()}function d(t){let e=r.ROOT_DOC.getElementById(r.VOICE_TOGGLE_BTN_ID);if(!e)return;e.onclick=t=>{t&&(t.preventDefault(),t.stopPropagation()),f()};let i=function(t){if("presentation"!==t&&"slides"!==t)return!1;let e=r.ROOT_WIN.visualViewport;return(e?e.width:r.ROOT_DOC.documentElement.clientWidth||0)>1e3}(t);if(e.style.display=i?"flex":"none",!i){c(!1),u();return}r.ROOT_DOC.documentElement.classList.contains("lia-tff-voice-collapsed")!==s&&c(s),u()}function m(){let t=r.ROOT_DOC.getElementById(r.BTN_ID),e=r.ROOT_DOC.getElementById(r.OVERLAY_ID);if(!t||!e)return;let i=r.ROOT_DOC.getElementById(r.INLINE_SLOT_ID);if((0,l.shouldUseTFFNightlyStackDock)()){t.parentNode!==e&&e.appendChild(t),i&&i.parentNode&&i.parentNode.removeChild(i),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}if((0,l.shouldUseInlineStripDock)()){let i=(0,l.ensureInlineDockSlot)();i&&t.parentNode!==i&&i.appendChild(t),e.style.left="0px",e.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==e&&e.appendChild(t),i&&i.parentNode&&i.parentNode.removeChild(i)}function h(){let t=r.ROOT_DOC.getElementById(r.BTN_ID),e=r.ROOT_DOC.getElementById(r.OVERLAY_ID);if(!t||!e||(m(),(0,l.shouldUseInlineStripDock)()))return;let i=(0,l.getViewport)(),n=(0,l.isNightlyNavigationHidden)()?22:34,o=n,a=n;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(o=e.width,a=e.height)}catch(t){}let s=8,p=8;if((0,l.shouldUseTFFNightlyStackDock)()){let t=(0,l.getTFFTOCButtonRect)();t&&(s=t.left+(t.width-o)/2,p=t.bottom+6)}else{let t=(0,l.getDockTarget)();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(s=e.right+8,p=e.top+(e.height-a)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(s=e.left,p=e.top)}}s=(0,r.clamp)(s,8,i.w-o-8),p=(0,r.clamp)(p,8,i.h-a-8),e.style.left=`${Math.round(i.ox)}px`,e.style.top=`${Math.round(i.oy)}px`,t.style.left=`${Math.round(s)}px`,t.style.top=`${Math.round(p)}px`}let g=null;function O(){let t=r.ROOT_DOC.getElementById(r.BTN_ID),e=r.ROOT_DOC.getElementById(r.PANEL_ID);if(!t||!e||!r.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let i=t.getBoundingClientRect(),n=(0,l.getViewport)(),o=function(t){if(g)return g;let e=t.style.display,i=t.style.visibility,n=t.style.left,o=t.style.top;t.style.display="block",t.style.visibility="hidden",t.style.left="-9999px",t.style.top="-9999px";let r=t.offsetWidth||240,l=t.offsetHeight||90;return t.style.display=e,t.style.visibility=i,t.style.left=n,t.style.top=o,g={w:r,h:l}}(e),a=i.left,s=i.bottom+10;a=(0,r.clamp)(a,8,n.w-o.w-8),s+o.h+8>n.h&&(s=i.top-10-o.h),s=(0,r.clamp)(s,8,n.h-o.h-8),e.style.left=`${Math.round(a+n.ox)}px`,e.style.top=`${Math.round(s+n.oy)}px`}function y(t){let e=function(){try{let t=r.ROOT_WIN.visualViewport,e=t?t.width:r.ROOT_DOC.documentElement.clientWidth||9999,i=t?t.height:r.ROOT_DOC.documentElement.clientHeight||9999,n=Math.min(e,i);return e<=680||n<=520}catch(t){return!1}}(),i="presentation"===t&&!e,n=r.ROOT_DOC.getElementById(r.BTN_ID),o=r.ROOT_DOC.getElementById(r.PANEL_ID);return n&&(n.style.display=i?"inline-flex":"none"),!i&&o&&(r.ROOT_DOC.body.classList.remove("lia-tff-panel-open"),o.style.display="none",(0,r.clearPosTimers)()),i}let b=null;function _(){try{let t=(0,a.detectLanguage)();if(t===b)return;b=t;let e=(0,a.getFontSizeLabel)(),i=r.ROOT_DOC.getElementById(r.TITLE_ID);i&&(i.textContent=e);let n=r.ROOT_DOC.getElementById(r.BTN_ID);n&&(n.setAttribute("aria-label",e),n.setAttribute("title",e));let o=r.ROOT_DOC.getElementById(r.SLIDER_ID);o&&o.setAttribute("aria-label",e)}catch(t){}}},{"./state":"jPEty","./toolbar":"asdc8","./i18n":"7hvC6","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7hvC6":[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"detectLanguage",()=>a),o.export(i,"getFontSizeLabel",()=>s);var r=t("./state");let l={ar:"حجم الخط",bg:"Размер на шрифта",cs:"Velikost písma",da:"Skriftstørrelse",de:"Schriftgröße",el:"Μέγεθος γραμματοσειράς",en:"Font Size",es:"Tamaño de fuente",fa:"اندازه قلم",fi:"Fonttikoko",fr:"Taille de police",hr:"Veličina fonta",hu:"Betűméret",it:"Dimensione carattere",ja:"フォントサイズ",ko:"글꼴 크기",nl:"Lettergrootte",pl:"Rozmiar czcionki",pt:"Tamanho da fonte",ro:"Dimensiunea fontului",ru:"Размер шрифта",sk:"Veľkosť písma",sv:"Teckenstorlek",tr:"Yazı tipi boyutu",uk:"Розмір шрифту",zh:"字体大小"};function a(){try{let t=r.CONTENT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=r.ROOT_DOC.documentElement.lang;if(t&&t.length>=2)return t.toLowerCase().slice(0,2)}catch(t){}try{let t=localStorage.getItem(r.SETTINGS_KEY);if(t){let e=JSON.parse(t),i=e?.language??e?.lang;if(i&&"string"==typeof i&&i.length>=2)return i.toLowerCase().slice(0,2)}}catch(t){}return"en"}function s(){return l[a()]??l.en}},{"./state":"jPEty","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"6B86Q":[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"scheduleRepositionBurst",()=>c),o.export(i,"burstRepositionThrottled",()=>u),o.export(i,"wireOnce",()=>f),o.export(i,"initEvents",()=>d);var r=t("./state"),l=t("./ui"),a=t("./toolbar"),s=t("./font");function p(){(0,l.positionOverlayButton)(),(0,l.positionPanel)()}function c(){(0,r.clearPosTimers)(),r.ROOT_WIN.requestAnimationFrame(()=>{p(),r.ROOT_WIN.requestAnimationFrame(()=>p())})}function u(){let t=Date.now();t-(r.I.lastBurstAt||0)<120||(r.I.lastBurstAt=t,c())}function f(){let t=r.ROOT_DOC.getElementById(r.BTN_ID),e=r.ROOT_DOC.getElementById(r.SLIDER_ID);t&&e&&(t.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),r.ROOT_DOC.body.classList.toggle("lia-tff-panel-open"),(0,l.positionPanel)()}),r.ROOT_DOC.addEventListener("click",t=>{if(!r.ROOT_DOC.body.classList.contains("lia-tff-panel-open"))return;let e=t.target;e&&e.closest&&(e.closest("#"+r.PANEL_ID)||e.closest("#"+r.BTN_ID)||e.closest("#"+r.VOICE_TOGGLE_BTN_ID))||r.ROOT_DOC.body.classList.remove("lia-tff-panel-open")},!0),r.ROOT_DOC.addEventListener("keydown",t=>{"Escape"===t.key&&r.ROOT_DOC.body.classList.remove("lia-tff-panel-open")}),r.ROOT_WIN.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),r.ROOT_WIN.visualViewport&&(r.ROOT_WIN.visualViewport.addEventListener("resize",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()}),r.ROOT_WIN.visualViewport.addEventListener("scroll",()=>{(0,l.positionOverlayButton)(),(0,l.positionPanel)()})),e.addEventListener("input",()=>{let t=parseInt(e.min||"14",10),i=parseInt(e.max||"48",10),n=(0,r.clamp)(parseInt(e.value||"24",10),t,i);try{localStorage.setItem(r.FONT_KEY,String(n))}catch(t){}(0,s.setPresFontPx)(n)}))}function d(t){let e=new Set(["style","data-lia-mode"]);function i(){return new MutationObserver(i=>{for(let n of i)if(!("attributes"===n.type&&n.attributeName&&e.has(n.attributeName)))return void t()})}try{i().observe(r.ROOT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{i().observe(r.CONTENT_DOC.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}r.ROOT_WIN.addEventListener("storage",function(e){e&&(e.key===r.SETTINGS_KEY||e.key===r.FONT_KEY)&&t()}),r.ROOT_WIN.setInterval(()=>{r.I.__alive&&t()},5e3);try{r.ROOT_WIN.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>t())}catch(t){}if("u">typeof ResizeObserver)try{let t=new ResizeObserver(()=>p()),e=(0,a.getToolbarHeader)();if(e)t.observe(e);else{let e=new MutationObserver(()=>{let i=(0,a.getToolbarHeader)();i&&(t.observe(i),e.disconnect())});e.observe(r.ROOT_DOC.documentElement,{childList:!0,subtree:!0})}}catch(t){}}},{"./state":"jPEty","./ui":"7Wjmu","./toolbar":"asdc8","./font":"895IN","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],NHYwU:[function(t,e,i,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(i),o.export(i,"initModeOnly",()=>c),o.export(i,"applyModeOnlyNow",()=>u);let r="__LIA_MODE_ONLY_STYLE_V01__",l=`
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
`;function a(t){return String(t??"").trim().toLowerCase()}function s(t){let e=a(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function p(t){let e=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let i=0;i<12&&(e(t.document),t.parent&&t.parent!==t);i++)t=t.parent}catch(t){}for(let i of Array.from(t))try{i.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),i=e.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),n=i.length?i:[document];for(let t of n)!function(t){try{let e=t.head||t.getElementsByTagName("head")[0]||t.documentElement;if(!e||t.getElementById(r))return;let i=t.createElement("style");i.id=r,i.appendChild(t.createTextNode(l)),e.appendChild(i)}catch(t){}}(t);let o=t;if("unknown"===o)for(let t of e){let e=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),i=null;for(let n of e){let e=s(a(n.textContent));if(!e)continue;let o=n.closest("button,[role='button'],a"),r=(o||n).getBoundingClientRect(),l=t.defaultView.innerWidth||1200,p=0;r.top<140&&(p+=200),r.left>.55*l&&(p+=200),o&&function(t){let e=a(t.getAttribute("aria-pressed")),i=a(t.getAttribute("aria-selected")),n=a(t.className);return"true"===e||"true"===i||n.includes("active")||n.includes("selected")||n.includes("mdc-icon-button--on")}(o)&&(p+=1e3),(!i||p>i.score)&&(i={mode:e,score:p})}return i?i.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=s([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||s(a(e.location.search)+"&"+a(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let i=e.key(t),n=e.getItem(i),o=s((i||"")+" "+(n||""));if(o)return o}}catch(t){}return null}(e)}(t);if(e){o=e;break}}let p="slides"===o||"presentation"===o||"textbook"===o;for(let t of n)try{p?t.documentElement.setAttribute("data-lia-mode",o):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}function c(t){let e=()=>p(t());e(),setTimeout(e,50),setTimeout(e,250),setTimeout(e,1e3)}function u(t){p(t)}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
