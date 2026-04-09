!function(t,e,n,i,r){var o="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof o[i]&&o[i],a=l.i||{},f=l.cache||{},p="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(e,n){if(!f[e]){if(!t[e]){if(r[e])return r[e];var a="function"==typeof o[i]&&o[i];if(!n&&a)return a(e,!0);if(l)return l(e,!0);if(p&&"string"==typeof e)return p(e);var u=Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(n){var i=t[e][1][n];return null!=i?i:n},c.cache={};var d=f[e]=new s.Module(e);t[e][0].call(d.exports,c,d,d.exports,o)}return f[e].exports;function c(t){var e=c.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var n={__esModule:!0};return e.forEach(function(t){var e=t[0],i=t[1],r=t[2]||t[0],o=s(i);"*"===e?Object.keys(o).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return o[t]}})}):"*"===r?Object.defineProperty(n,e,{enumerable:!0,value:o}):Object.defineProperty(n,e,{enumerable:!0,get:function(){return"default"===r?o.__esModule?o.default:o:o[r]}})}),n}return s(e)}}s.isParcelRequire=!0,s.Module=function(t){this.id=t,this.bundle=s,this.require=p,this.exports={}},s.modules=t,s.cache=f,s.parent=l,s.distDir=void 0,s.publicUrl=void 0,s.devServer=void 0,s.i=a,s.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return o[i]}}),o[i]=s;for(var u=0;u<e.length;u++)s(e[u]);if(n){var d=s(n);"object"==typeof exports&&"u">typeof module?module.exports=d:"function"==typeof define&&define.amd&&define(function(){return d})}}({"8RSWf":[function(t,e,n,i){!function(){let t=function(){let t=window;try{for(;t.parent&&t.parent!==t;)t=t.parent}catch(t){}return t}(),e=t.document,n=window,i=document,r="__LIA_TFF_REG_V2__";t[r]=t[r]||{instances:{}};let o=t[r],l=(i.baseURI||n.location.href||"")+"::"+(i.title||"");if(o.instances[l]?.__alive)return;let a=o.instances[l]={__alive:!0,ticking:!1,lastMode:null,lastSettingsRaw:null,posTimers:[],lastShow:null,lastToolbarSig:null,lastBurstAt:0,pendingReposition:!1};function f(){try{for(a.posTimers||(a.posTimers=[]);a.posTimers.length;)t.clearTimeout(a.posTimers.pop())}catch(t){}}function p(){W(),P()}function s(t,e,n){try{if(!t||t.getElementById(e))return;let i=t.createElement("style");i.id=e,i.textContent=n,(t.head||t.documentElement).appendChild(i)}catch(t){}}let u="settings",d="lia-tff-font-px-v2";function c(t){return String(null==t?"":t).toLowerCase()}function m(){try{return localStorage.getItem(u)}catch(t){return null}}function h(t){try{let e=t||document,n=e.body||e.documentElement,i=e.querySelector(".lia-btn");if(i){let t=getComputedStyle(i).backgroundColor;if(t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t}let r=e.createElement("button");r.className="lia-btn",r.type="button",r.textContent="x",r.style.position="absolute",r.style.left="-9999px",r.style.top="-9999px",r.style.visibility="hidden",n.appendChild(r);let o=getComputedStyle(r).backgroundColor;if(r.remove(),o&&"rgba(0, 0, 0, 0)"!==o&&"transparent"!==o)return o}catch(t){}return null}function g(t,e,n){try{t.documentElement.style.setProperty(e,n)}catch(t){}}let y=`
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
`,b=[18,24,32];function x(){try{let t=localStorage.getItem(d);if(!t)return null;let e=parseInt(t,10);return isFinite(e)?e:null}catch(t){return null}}function v(t,e,n){return Math.max(e,Math.min(n,t))}function w(t){g(i,"--lia-tff-font",null==t?"unset":t+"px")}let E=!1,k="lia-tff-overlay-v2",S="lia-tff-btn-v2",M="lia-tff-panel-v2",A="lia-tff-slider-v2",_="lia-tff-title-v2",I="lia-tff-inline-slot-v2",B=`
:root{
  --lia-tff-accent: rgb(11,95,255);
}

#${k}{
  position: fixed !important;
  z-index: 99999980 !important;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none !important;
}

#${S}{
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

#${I}{
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

#${I} > #${S}{
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

body.lia-tff-nightly-mini #${S}{
  width: 22px !important;
  height: 22px !important;
  border-radius: 6px !important;
}

body.lia-tff-nightly-mini #${S} .tffA-small{
  left: 0px !important;
  top: 2px !important;
  font-size: 15px !important;
}

body.lia-tff-nightly-mini #${S} .tffA-big{
  left: 5px !important;
  top: -2px !important;
  font-size: 18px !important;
}

#${S}:hover{
  background: color-mix(in srgb, var(--lia-tff-accent) 12%, transparent) !important;
}
#${S}:active{
  background: color-mix(in srgb, var(--lia-tff-accent) 18%, transparent) !important;
}
#${S}:focus,
#${S}:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

#${S} .tffA-small,
#${S} .tffA-big{
  position: absolute !important;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}

#${S} .tffA-small{
  left: 2px !important;
  top: 3px !important;
  font-size: 24px !important;
  color: var(--lia-tff-accent) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.25) !important;
  opacity: .95 !important;
}

#${S} .tffA-big{
  left: 10px !important;
  top: -2px !important;
  font-size: 30px !important;
  color: #fff !important;
  text-shadow: 0 2px 3px rgba(0,0,0,.45) !important;
  opacity: .98 !important;
}

#${M}{
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

body.lia-tff-panel-open #${M}{
  display: block !important;
}

#${_}{
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  margin: 0 0 10px 0 !important;
  letter-spacing: .2px !important;
}

#${M} input[type="range"]{
  width: 100% !important;
  margin: 0 !important;
  accent-color: var(--lia-tff-accent) !important;
}

@media (max-width: 680px){
  #lia-tff-btn-v2{ display: none !important; }
  body.lia-tff-panel-open #lia-tff-panel-v2{ display: none !important; }
}
`;function C(){return e.querySelector("header#lia-toolbar-nav")||e.querySelector("#lia-toolbar-nav")||e.querySelector("header.lia-header")}function L(){let t=C();return t?t.querySelector(".lia-header__left")||t:null}function T(){let n=t.visualViewport;if(n)return{w:n.width,h:n.height,ox:n.offsetLeft||0,oy:n.offsetTop||0};let i=e.documentElement;return{w:i.clientWidth,h:i.clientHeight,ox:0,oy:0}}function $(e){if(!e)return null;try{let n=t.getComputedStyle(e);if(!n||"none"===n.display||"hidden"===n.visibility||"0"===n.opacity)return null;let i=e.getBoundingClientRect();if(!i||i.width<6||i.height<6)return null;let r=T();if(i.right<0||i.bottom<0||i.left>r.w||i.top>r.h)return null;return i}catch(t){return null}}function q(t){if(!t)return!1;let e=T();return!!isFinite(t.left)&&!!isFinite(t.top)&&!!isFinite(t.right)&&!!isFinite(t.bottom)&&!(t.width<6)&&!(t.height<6)&&!(t.top<-20)&&!(t.top>220)&&!(t.left<-20)&&!(t.left>.6*e.w)&&!(t.right>e.w+120)&&!(t.bottom>e.h+120)&&!0}function R(){let t=e.querySelector(".lia-canvas");return!!(t&&t.classList.contains("lia-navigation--hidden"))}function N(){let t=e.getElementById("lia-btn-toc");if(t)return t;let n=L();return n&&Array.from(n.querySelectorAll("button,[role='button'],a")).find(t=>{let e=((t.getAttribute("aria-label")||"")+" "+(t.getAttribute("title")||"")+" "+(t.textContent||"")).toLowerCase();return e.includes("inhaltsverzeichnis")||e.includes("table of contents")||e.includes("contents")})||null}function O(){let t=e.querySelector(".lia-canvas");return!!t&&t.classList.contains("lia-navigation--hidden")&&t.classList.contains("lia-mode--presentation")}function F(){if(O())return!1;let t=L(),e=N();return!!(t&&e&&t.contains(e))}function j(){let t=e.getElementById(S),n=e.getElementById(k);if(!t||!n)return;let i=e.getElementById(I);if(O()){t.parentNode!==n&&n.appendChild(t),i&&i.parentNode&&i.parentNode.removeChild(i),n.style.left="0px",n.style.top="0px",t.style.left="",t.style.top="";return}if(F()){let i=function(){let t=L(),n=N();if(!t||!n||!t.contains(n))return null;let i=e.getElementById(I);return i||((i=e.createElement("div")).id=I),(i.parentNode!==t||i.previousElementSibling!==n)&&n.insertAdjacentElement("afterend",i),i}();i&&t.parentNode!==i&&i.appendChild(t),n.style.left="0px",n.style.top="0px",t.style.left="",t.style.top="";return}t.parentNode!==n&&n.appendChild(t),i&&i.parentNode&&i.parentNode.removeChild(i)}function z(){let n,i,r=function(){let t=e.getElementById("lia-hl-btn");if(!t)return null;let n=null;try{n=t.getBoundingClientRect()}catch(t){n=null}if(q(n))return n;let i=L()||t.parentElement||C();if(!i)return null;let r=$(i);if(!r)return null;let o=Math.max(34,t.offsetWidth||0),l=Math.max(34,t.offsetHeight||0),a=t.offsetLeft||0,f="number"==typeof t.offsetTop?t.offsetTop:Math.max(0,(r.height-l)/2),p={left:r.left+a,top:r.top+f,right:r.left+a+o,bottom:r.top+f+l,width:o,height:l};return q(p)?p:{left:r.left+8,top:r.top+Math.max(0,(r.height-34)/2),right:r.left+8+34,bottom:r.top+Math.max(0,(r.height-34)/2)+34,width:34,height:34}}();if(r)return{kind:"highlight",rect:r,peers:[{el:e.getElementById("lia-hl-btn"),r:r}]};let o=function(){let t=T(),e=L();if(!e)return[];let n=[];for(let i of Array.from(e.querySelectorAll("button,[role='button'],a"))){if(!i||i.id===S)continue;let e=$(i);e&&!(e.top>220)&&!(e.left>.6*t.w)&&(e.width>220||e.height>100||n.push({el:i,r:e}))}if(n.sort((t,e)=>t.r.left-e.r.left||t.r.top-e.r.top),!n.length)return n;let i=n[0].r.top+n[0].r.height/2,r=Math.max(20,.9*n[0].r.height);return n.filter(t=>Math.abs(t.r.top+t.r.height/2-i)<=r)}();if(o.length){let t=o[0].r;for(let e of o)e.r.right>t.right&&(t=e.r);return{kind:"toolbar-row",rect:t,peers:o}}let l=function(){let n=e.getElementById("lia-toc"),i=e.getElementById("lia-btn-toc"),r=function(e){if(!e)return null;try{let n=t.getComputedStyle(e);if(!n||"none"===n.display||"hidden"===n.visibility)return null;let i=e.getBoundingClientRect();if(!i||i.width<2||i.height<2)return null;let r=T();if(i.right<0||i.bottom<0||i.left>r.w||i.top>r.h)return null;return i}catch(t){return null}}(i),o=R(),l=o?22:34;if(!r)return null;if(o){let t=r.left+(r.width-l)/2,e=r.bottom+8;return{kind:"toc-open-slot",rect:{left:Math.max(8,t),top:Math.max(8,e),right:Math.max(8,t)+l,bottom:Math.max(8,e)+l,width:l,height:l},peers:[{el:i,r:r}]}}if(n&&n.classList.contains("lia-toc--open")){let t=r.right+8,e=r.top+(r.height-l)/2;return{kind:"toc-open-slot",rect:{left:t,top:Math.max(8,e),right:t+l,bottom:Math.max(8,e)+l,width:l,height:l},peers:[{el:i,r:r}]}}return{kind:"toc-button",rect:r,peers:[{el:i,r:r}]}}();if(l)return l;let a=(i=(n=$(L()))||$(C()))?{left:i.left+8,top:i.top+(i.height-34)/2,right:i.left+8+34,bottom:i.top+(i.height-34)/2+34,width:34,height:34}:null;return a?{kind:"virtual-highlight-slot",rect:a,peers:[]}:null}function W(){let t=e.getElementById(S),n=e.getElementById(k);if(!t||!n||(j(),F()))return;let i=T(),r=R()?22:34,o=r,l=r;try{let e=t.getBoundingClientRect();e&&e.width>6&&e.height>6&&(o=e.width,l=e.height)}catch(t){}let a=8,f=8;if(O()){let t=function(){let t=N();if(!t)return null;try{let e=t.getBoundingClientRect();if(!e||e.width<6||e.height<6)return null;return e}catch(t){return null}}();t&&(a=t.left+(t.width-o)/2,f=t.bottom+6+0)}else{let t=z();if(t&&t.rect){let e=t.rect;"highlight"===t.kind||"toolbar-row"===t.kind||"toc-button"===t.kind?(a=e.right+8,f=e.top+(e.height-l)/2):("toc-open-slot"===t.kind||"virtual-highlight-slot"===t.kind)&&(a=e.left,f=e.top)}}a=v(a,8,i.w-o-8),f=v(f,8,i.h-l-8),n.style.left=`${Math.round(i.ox)}px`,n.style.top=`${Math.round(i.oy)}px`,t.style.left=`${Math.round(a)}px`,t.style.top=`${Math.round(f)}px`}function P(){let t,n,i,r,o,l,a=e.getElementById(S),f=e.getElementById(M);if(!a||!f||!e.body.classList.contains("lia-tff-panel-open"))return;let p=a.getBoundingClientRect(),s=T(),u=(t=f.style.display,n=f.style.visibility,i=f.style.left,r=f.style.top,f.style.display="block",f.style.visibility="hidden",f.style.left="-9999px",f.style.top="-9999px",o=f.offsetWidth||240,l=f.offsetHeight||90,f.style.display=t,f.style.visibility=n,f.style.left=i,f.style.top=r,{w:o,h:l}),d=p.left,c=p.bottom+10;d=v(d,8,s.w-u.w-8),c+u.h+8>s.h&&(c=p.top-10-u.h),c=v(c,8,s.h-u.h-8),f.style.left=`${Math.round(d+s.ox)}px`,f.style.top=`${Math.round(c+s.oy)}px`}function V(){a.ticking||(a.ticking=!0,t.requestAnimationFrame(()=>{try{let r,o,l,u,I,C,L,$,q,N;s(i,"lia-tff-style-content-v2",y),s(e,"lia-tff-style-root-v2",B);let O=m(),F=function(){let t=m();if(!t)return"unknown";try{var e;let n;return e=JSON.parse(t),n=new Set,function t(e){if(null==e)return null;if("string"==typeof e){let t=c(e);return t.includes("presentation")?"presentation":t.includes("slides")?"slides":t.includes("textbook")||t.includes("book")?"textbook":null}if("object"!=typeof e||n.has(e))return null;for(let i in n.add(e),e){if(!Object.prototype.hasOwnProperty.call(e,i))continue;let n=c(i);if("mode"===n||"view"===n||"layout"===n||"format"===n){let n=t(e[i]);if(n)return n}}for(let n in e){if(!Object.prototype.hasOwnProperty.call(e,n))continue;let i=t(e[n]);if(i)return i}return null}(e)||"unknown"}catch(n){let e=c(t);if(e.includes("presentation"))return"presentation";if(e.includes("slides"))return"slides";if(e.includes("textbook")||e.includes("book"))return"textbook";return"unknown"}}();try{i.documentElement.dataset.liaMode=F}catch(t){}r=h(e)||h(i)||"rgb(11,95,255)",g(e,"--lia-tff-accent",r),g(i,"--lia-tff-accent",r),(o=e.getElementById(k))||((o=e.createElement("div")).id=k,e.body.appendChild(o)),(l=e.getElementById(S))||((l=e.createElement("button")).id=S,l.type="button",l.setAttribute("aria-label","Font size"),l.innerHTML='<span class="tffA-small">A</span><span class="tffA-big">A</span>',o.appendChild(l)),(u=e.getElementById(M))||((u=e.createElement("div")).id=M,u.innerHTML=`<div id="${_}">Font size</div><input id="${A}" type="range" min="14" max="48" step="1" value="24" aria-label="Font size" />`,e.body.appendChild(u)),function(){try{if(!e.body)return;e.body.classList.toggle("lia-tff-nightly-mini",R())}catch(t){}}(),j();let V=(I=function(){try{let n=t.visualViewport,i=n?n.width:e.documentElement.clientWidth||9999,r=n?n.height:e.documentElement.clientHeight||9999,o=Math.min(i,r);return i<=680||o<=520}catch(t){return!1}}(),C="presentation"===F&&!I,L=e.getElementById(S),$=e.getElementById(M),L&&(L.style.display=C?"inline-flex":"none"),!C&&$&&(e.body.classList.remove("lia-tff-panel-open"),$.style.display="none",f()),C),D=null===a.lastShow||V!==a.lastShow;a.lastShow=V;let H=function(){try{let t=T(),e=z();if(!e)return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),"none"].join("|");let n=e.rect,i=e.peers?e.peers.length:0;return[Math.round(t.w),Math.round(t.h),Math.round(t.ox),Math.round(t.oy),e.kind,Math.round(n.left),Math.round(n.top),Math.round(n.right),Math.round(n.bottom),Math.round(n.width),Math.round(n.height),i].join("|")}catch(t){return null}}(),U=!!(H&&H!==a.lastToolbarSig);a.lastToolbarSig=H||a.lastToolbarSig,!V&&U&&(a.pendingReposition=!0),W(),V&&P();let Y=F!==a.lastMode||O!==a.lastSettingsRaw;if(Y&&(!function(t){let e="presentation"===t;if(!(e||"slides"===t))return w(null);if(e){let t=x();if(null!=t)return w(v(t,14,48))}E||(E=!0,w(null),n.requestAnimationFrame(function(){n.requestAnimationFrame(function(){var t;let e;w(b[(e=parseFloat(getComputedStyle(i.querySelector("main")||i.documentElement).fontSize||"16"),(t=isNaN(e)?16:e)<=17)?0:t<=19?1:2]),E=!1})}))}(F),a.lastMode=F,a.lastSettingsRaw=O),D||U||Y||a.pendingReposition){a.pendingReposition=!1;let n=Date.now();if(!(n-(a.lastBurstAt||0)<120)){for(let e of(a.lastBurstAt=n,f(),p(),t.requestAnimationFrame(()=>{t.requestAnimationFrame(()=>p())}),[40,120,260,520]))a.posTimers.push(t.setTimeout(()=>{p()},e));try{e.fonts&&e.fonts.ready&&e.fonts.ready.then(()=>p())}catch(t){}}}!function(){let t=e.getElementById(A);if(!t)return;let n=parseInt(t.min||"14",10),r=parseInt(t.max||"48",10),o=x();if(null!=o){t.value=String(v(o,n,r));return}let l=parseInt(getComputedStyle(i.documentElement).getPropertyValue("--lia-tff-font").trim(),10);isFinite(l)&&(t.value=String(v(l,n,r)))}(),V&&P(),q=e.getElementById(S),N=e.getElementById(A),q&&N&&(!q.__liaTffWired&&(q.__liaTffWired=!0,q.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),e.body.classList.toggle("lia-tff-panel-open"),P()}),e.addEventListener("click",t=>{if(!e.body.classList.contains("lia-tff-panel-open"))return;let n=t.target;n&&n.closest&&(n.closest("#"+M)||n.closest("#"+S))||e.body.classList.remove("lia-tff-panel-open")},!0),e.addEventListener("keydown",t=>{"Escape"===t.key&&e.body.classList.remove("lia-tff-panel-open")}),t.addEventListener("resize",()=>{W(),P()}),t.visualViewport&&(t.visualViewport.addEventListener("resize",()=>{W(),P()}),t.visualViewport.addEventListener("scroll",()=>{W(),P()}))),N.__liaTffWired||(N.__liaTffWired=!0,N.addEventListener("input",()=>{let t=parseInt(N.min||"14",10),e=parseInt(N.max||"48",10),n=v(parseInt(N.value||"24",10),t,e);try{localStorage.setItem(d,String(n))}catch(t){}w(n)})))}finally{a.ticking=!1}}))}try{new MutationObserver(()=>V()).observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}try{new MutationObserver(()=>V()).observe(i.documentElement,{childList:!0,subtree:!0,attributes:!0})}catch(t){}t.addEventListener("storage",function(t){t&&(t.key===u||t.key===d)&&V()}),V(),t.setInterval(()=>{a.__alive&&V()},350),function(){let t="__LIA_MODE_ONLY_STYLE_V01__",e=`
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
`;function n(t){return String(t??"").trim().toLowerCase()}function i(t){let e=n(t);return"book"===e?"textbook":"hearing"===e?"presentation":"visibility"===e?"slides":"textbook"===e||"presentation"===e||"slides"===e?e:e.includes("textbook")||e.includes("lehrbuch")?"textbook":e.includes("presentation")||e.includes("präsent")?"presentation":e.includes("slides")||e.includes("folien")?"slides":null}function r(){let r=function(){let t=new Set;function e(e){try{e&&e.documentElement&&t.add(e)}catch(t){}}try{let t=window;for(let n=0;n<12&&(e(t.document),t.parent&&t.parent!==t);n++)t=t.parent}catch(t){}for(let n of Array.from(t))try{n.querySelectorAll("iframe").forEach(t=>{try{e(t.contentDocument)}catch(t){}})}catch(t){}return Array.from(t)}(),o=r.filter(t=>{try{return!!t.querySelector("[data-lia-only]")}catch(t){return!1}}),l=o.length?o:[document];for(let n of l)!function(n){try{let i=n.head||n.getElementsByTagName("head")[0]||n.documentElement;if(!i||n.getElementById(t))return;let r=n.createElement("style");r.id=t,r.type="text/css",r.appendChild(n.createTextNode(e)),i.appendChild(r)}catch(t){}}(n);let a=null;for(let t of r)if(a=function(t){let e=t.defaultView;return function(t){let e=Array.from(t.querySelectorAll(".material-icons, i.material-icons, span.material-icons")),r=null;for(let o of e){let e=i(n(o.textContent));if(!e)continue;let l=o.closest("button,[role='button'],a"),a=(l||o).getBoundingClientRect(),f=t.defaultView.innerWidth||1200,p=0;a.top<140&&(p+=200),a.left>.55*f&&(p+=200),l&&function(t){let e=n(t.getAttribute("aria-pressed")),i=n(t.getAttribute("aria-selected")),r=n(t.className);return"true"===e||"true"===i||r.includes("active")||r.includes("selected")||r.includes("mdc-icon-button--on")}(l)&&(p+=1e3),(!r||p>r.score)&&(r={mode:e,score:p})}return r?r.mode:null}(t)||function(t){for(let e of[t.querySelector("#app"),t.querySelector("main"),t.querySelector(".markdown-body"),t.body,t.documentElement].filter(Boolean)){let t=i([e.getAttribute&&e.getAttribute("data-mode"),e.getAttribute&&e.getAttribute("data-view"),e.getAttribute&&e.getAttribute("mode"),e.className,e.id].map(t=>String(t||"")).join(" "));if(t)return t}return null}(t)||i(n(e.location.search)+"&"+n(e.location.hash))||function(t){for(let e of[t.sessionStorage,t.localStorage].filter(Boolean))try{for(let t=0;t<e.length;t++){let n=e.key(t),r=e.getItem(n),o=i((n||"")+" "+(r||""));if(o)return o}}catch(t){}return null}(e)}(t))break;a||(a="unknown");let f="slides"===a||"presentation"===a||"textbook"===a;for(let t of l)try{f?t.documentElement.setAttribute("data-lia-mode",a):t.documentElement.removeAttribute("data-lia-mode")}catch(t){}}r(),setTimeout(r,50),setTimeout(r,250),setTimeout(r,1e3),document.addEventListener("click",()=>setTimeout(r,0),!0),window.addEventListener("hashchange",r,!0),window.addEventListener("popstate",r,!0)}()}()},{}]},["8RSWf"],"8RSWf","parcelRequirec2a1",{});
//# sourceMappingURL=index.js.map
