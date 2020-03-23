!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["ue-elems"]=t():e["ue-elems"]=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("hybrids")},function(e,t){e.exports=require("lit-html")},function(e,t){e.exports=require("lit-html/directives/class-map")},function(e,t){e.exports=require("lit-html/directives/guard")},function(e,t){e.exports=require("lit-html/directives/until")},function(e,t){e.exports=require("shftjs")},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r(2);r(3),r(4);const i=new WeakSet,c=Object(n.directive)(e=>t=>{i.has(t)||(t.setValue(e()),i.add(t))}),s=e=>t=>{const r=e(t);return(e,t)=>Object(n.render)(r,t)};var a=r(0);const l=n.html`
    <style>
        :host {
            display: grid;
        }

        .grid-1 {
            grid-column: 1;
            grid-row: 1;
        }

        .bg {
            -webkit-text-stroke-width: var(--text-outline-width);
            -webkit-text-stroke-color: black;
        }

        .fg {
            color: var(--text-color);
        }

        div {
            user-select: none;
            cursor: default;
        }
    </style>
`,u=new WeakMap,d={slotHTML:{get:e=>e.innerHTML,connect:(e,t,r)=>{const n=u.get(e)||new MutationObserver(r);u.set(e,n),n.observe(e,{characterData:!0,childList:!0,subtree:!0})}}},b=Object(a.define)("ue-text",Object.assign(Object.assign({},d),{render:s(e=>n.html`
    ${l}
    <div class="grid-1 bg" .innerHTML=${e.slotHTML}></div>
    <div class="grid-1 fg" .innerHTML=${e.slotHTML}></div>
`)}));var f=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function c(e){try{a(n.next(e))}catch(e){i(e)}}function s(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}a((n=n.apply(e,t||[])).next())}))};function h(e=1e3,t=!1){return new Promise((r,n)=>{setTimeout(t?n:r,e)})}function v(e,t,r=500){return f(this,void 0,void 0,(function*(){const n=function(e,t=document,r=!1){return new Promise((n,o)=>{t.addEventListener(e,r?o:n,{once:!0})})}(t,document,!0);yield Promise.race([h(r),n]).catch(()=>{});let o=!0;for(;o;)yield Promise.race([new Promise(e=>{requestAnimationFrame(e)}),n]).then(e).catch(()=>{o=!1})}))}const m=e=>(function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)}),p=(...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0],g=(m((e,t,r)=>r.map((r,n)=>n==e?t:r)),m((e,t,r)=>(t-e)*r+e)),y=m((e,t,r)=>(r-e)/(t-e)),x=m((e,t,r)=>Math.max(e,Math.min(r,t))),k=m((e,t)=>{const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),w=m((e,t,r,n)=>p(y(e,t),g(r,n))),j=m((e,{type:t})=>{switch(t){case"focus":e.focused=!0;break;case"blur":e.focused=e.active=!1;break;case"mousedown":e.active=!!e.clickable;break;case"mouseup":e.clickable&&(e.active=!1,e.checked=!!e.checkable&&!e.checked)}}),O=n.html`
    <style>
        :host {
            display: flex;

            padding: 2px;
            align-items: stretch;
            outline: none;
            /* overflow: hidden; */
            width: var(--btn-width);
            height: var(--btn-height);

            font-size: var(--btn-font-size);
            font-family: var(--btn-font-family);
        }

        ::slotted(*) {
            user-select: none;
            pointer-events: none;
        }

        div {
            /* Fixed values */
            display: flex;
            padding: 5px;
            flex-grow: 1;
            flex-shrink: inherit;

            align-items: center;
            align-content: center;
            outline: none;

            /* Set from main css */

            border-radius: var(--btn-border-radius);
            justify-content: var(--btn-justify-content);

            color: var(--btn-text-color);
            background-color: var(--btn-bg-color);
            border: var(--btn-border);

            transition: background-color 0.2s, color 0.2s, transform 0.2s, border 0.2s;
        }

        .focused {
            color: var(--btn-focus-color);
            background-color: var(--btn-focus-bg-color);
            border: var(--btn-focus-border);
            transform: var(--btn-focus-transform);
            transition: var(--btn-focus-transition);
        }

        .active {
            color: var(--btn-click-color);
            background-color: var(--btn-click-bg-color);
            border: var(--btn-click-border);
            transform: var(--btn-click-transform);
            transition: var(--btn-click-transition);
        }

        .disabled {
            color: #888;
            background-color: #444;
            border-color: #888;
            pointer-events: none;
        }

        .checked {
            color: var(--btn-click-color);
            background-color: var(--btn-click-bg-color);
            border: var(--btn-click-border);
        }
    </style>
`,$={active:!1,checkable:!1,checked:!1,clickable:!0,disabled:!1,focused:!1};Object.keys($).forEach(e=>$[e]=((e,t=!0)=>({get:t=>t.hasAttribute(e),set:(t,r)=>(r?t.setAttribute(e,""):t.removeAttribute(e),!!r),connect:(e,r,n)=>{e[r]=t;const o=new MutationObserver(n);return o.observe(e,{attributeFilter:[r]}),o.disconnect}}))(e,$[e]));const M=Object(a.define)("ue-button",Object.assign(Object.assign({},$),{render:s(e=>{const{active:t,checked:r,disabled:i,focused:c}=e;return n.html`
        ${O}
        <div
            tabindex="0"
            class=${Object(o.classMap)({active:t,checked:r,disabled:i,focused:c})}
            @mouseover=${e=>e.target.focus()}
            @mouseleave=${e=>e.target.blur()}
            @mousedown=${j(e)}
            @mouseup=${j(e)}
            @focus=${j(e)}
            @blur=${j(e)}
        >
            <slot></slot>
        </div>
    `})}));var P=r(5),T=r.n(P);const{drag:S}=T.a,q=({min:e=0,max:t=100,step:r=1,clientWidth:n=100})=>p(w(0,n)(e,t),x(e,t),k(r)),L=m((e,t)=>q(e)(t)<e.value?-e.step:q(e)(t)>e.value?e.step:0),z=n.html`
    <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1em;
            cursor: default;
        }

        .slider-bar {
            cursor: default;
            position: relative;
            width: 100%;
            height: 50%;
            background-color: var(--bg-color-light);
            touch-action: none;
            display: flex;
            align-items: center;
        }

        .handle {
            cursor: default;
            width: 0.8em;
            height: 300%;
            transform: translate(-50%, 0);
            background-color: var(--color-primary);
            border: 1px solid var(--color-dark);
            border-radius: 2px;
            position: relative;
        }
    </style>
`,F={min:0,max:100,step:1,value:{get:(e,t)=>t||0,set:({step:e},t)=>k(e,t),observe:(e,t,r)=>{const{min:n,max:o,step:i}=e;Object(a.dispatch)(e,"change",{bubbles:!0,composed:!0,detail:{value:t,min:n,max:o,step:i}})}}},H=Object(a.define)("ue-slider",Object.assign(Object.assign({},F),{render:s(e=>{const{min:t,max:r,value:o}=e;return n.html`
        ${z}
        <div
            class="slider-bar"
            @mousedown=${({path:t,offsetX:r})=>{t[0]===((e,t=document)=>t?t.querySelector(e):null)(".slider-bar",e.shadowRoot)&&(e.value+=L(e,r),v(()=>{e.value+=L(e,r)},"mouseup"))}}
        >
            <div
                tabindex="0"
                class="handle"
                style="left: ${p(w(t,r)(0,100),x(0,100))(o)}%"
                @drag=${({offsetX:t,target:{offsetLeft:r}})=>{e.value=q(e)(t+r)}}
            ></div>
        </div>
        ${c(()=>{((e,t=document,r=1e3)=>new Promise((n,o)=>{let i;const c=setTimeout(()=>{i=!0},r);!function r(){if(i)return o();let s=t.querySelector(e);if(s)return clearTimeout(c),n(s);requestAnimationFrame(r)}()}))(".handle",e.shadowRoot).then(S).catch(console.log)})}
    `})})),_={small:32,medium:64,large:96,xlarge:128};function A(e){return parseFloat(e)||_[e]}const U=Object(a.define)("ue-icon",Object.assign(Object.assign({},{border:8,shape:"circle",size:"medium"}),{render:s(e=>n.html`
        ${(e=>n.html`
        <style>
            :host {
                width: ${A(e.size)||64}px;
                height: ${A(e.size)||64}px;
            }
            #bg {
                background-color: var(--color-secondary);
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: circle(${A(e.size)/2}px);
            }
            #fg {
                background-color: var(--color-primary);
                width: inherit;
                height: inherit;
                clip-path: circle(${A(e.size)/2-e.border}px);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `)(e)}
        <div id="bg">
            <div id="fg">
                <slot></slot>
            </div>
        </div>
    `)}));r.d(t,"UeText",(function(){return b})),r.d(t,"UeButton",(function(){return M})),r.d(t,"UeSlider",(function(){return H})),r.d(t,"UeIcon",(function(){return U}))}])}));
//# sourceMappingURL=index.js.map