!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["ue-elems"]=t():e["ue-elems"]=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("lit-html")},function(e,t){e.exports=require("hybrids")},function(e,t){e.exports=require("lit-html/directives/class-map")},function(e,t){e.exports=require("lit-html/directives/guard")},function(e,t){e.exports=require("lit-html/directives/until")},function(e,t){e.exports=require("shftjs")},function(e,t,r){"use strict";r.r(t);var n=r(0),i=r(2);r(3),r(4);const o=new WeakSet,l=Object(n.directive)(e=>t=>{o.has(t)||(t.setValue(e()),o.add(t))}),c=e=>t=>{const r=e(t);return(e,t)=>Object(n.render)(r,t)},s=n.html`
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
`,a=new WeakMap,u={slotHTML:{get:e=>e.innerHTML,connect:(e,t,r)=>{const n=a.get(e)||new MutationObserver(r);a.set(e,n),n.observe(e,{characterData:!0,childList:!0,subtree:!0})}}};var d=Object.assign(Object.assign({},u),{render:c(e=>n.html`
    ${s}
    <div class="grid-1 bg" .innerHTML=${e.slotHTML}></div>
    <div class="grid-1 fg" .innerHTML=${e.slotHTML}></div>
`)}),b=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function l(e){try{s(n.next(e))}catch(e){o(e)}}function c(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,c)}s((n=n.apply(e,t||[])).next())}))};function f(e=1e3,t=!1){return new Promise((r,n)=>{setTimeout(t?n:r,e)})}function m(e,t,r=500){return b(this,void 0,void 0,(function*(){const n=function(e,t=document,r=!1){return new Promise((n,i)=>{t.addEventListener(e,r?i:n,{once:!0})})}(t,document,!0);yield Promise.race([f(r),n]).catch(()=>{});let i=!0;for(;i;)yield Promise.race([new Promise(e=>{requestAnimationFrame(e)}),n]).then(e).catch(()=>{i=!1})}))}const h=e=>(function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)}),v=(...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0],g=h((e,t,r)=>r.map((r,n)=>n==e?t:r)),p=h((e,t,r)=>(t-e)*r+e),x=h((e,t,r)=>(r-e)/(t-e)),y=h((e,t,r)=>Math.max(e,Math.min(r,t))),k=h((e,t)=>{const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),$=h((e,t,r,n)=>v(x(e,t),p(r,n))),w=h((e,{type:t})=>{switch(t){case"focus":e.focused=!0;break;case"blur":e.focused=e.active=!1;break;case"mousedown":e.active=!!e.clickable;break;case"mouseup":e.clickable&&(e.active=!1,e.checked=!!e.checkable&&!e.checked)}}),j=n.html`
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
`;var O=Object.assign(Object.assign({},{active:!1,checkable:!1,checked:!1,clickable:!0,disabled:!1,focused:!1}),{render:c(e=>{const{active:t,checked:r,disabled:o,focused:l}=e;return n.html`
        ${j}
        <div
            tabindex="0"
            class=${Object(i.classMap)({active:t,checked:r,disabled:o,focused:l})}
            @mouseover=${e=>e.target.focus()}
            @mouseleave=${e=>e.target.blur()}
            @mousedown=${w(e)}
            @mouseup=${w(e)}
            @focus=${w(e)}
            @blur=${w(e)}
        >
            <slot></slot>
        </div>
    `})}),M=r(1);const S=n.html`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2px;
        }

        ue-button {
            width: inherit;
        }

        .left {
            --btn-justify-content: left;
        }
    </style>
`,T={buttons:[],checkable:!1,singlecheck:!1,items:e=>((e,t=document)=>t?[...t.querySelectorAll(e)]:[])("ue-button",e.shadowRoot),checkedItems:{get:({items:e})=>e.filter(e=>e.checked).map(e=>e.index),set:({items:e},t)=>(e.forEach((e,r)=>{e.checked=t.includes(r)}),t)},left:!1};var P=Object.assign(Object.assign({},T),{render:c(e=>{const{buttons:t,left:r,checkable:o,singlecheck:l}=e;return n.html`
        ${S}
        ${t.map(({label:t,disabled:c},s)=>n.html`
                    <ue-button
                        class=${Object(i.classMap)({left:r})}
                        .index=${s}
                        .checkable=${o}
                        .disabled=${c}
                        @click=${({target:r})=>{const n={bubbles:!0,composed:!0,detail:Object.assign(Object.assign({},r),{label:t})};Object(M.dispatch)(e,"buttonclick",n),l&&(e.checkedItems=[s])}}
                        ><ue-text .innerHTML=${t}></ue-text
                    ></ue-button>
                `)}
    `})}),q=r(5),L=r.n(q);const{drag:z}=L.a,H=({min:e=0,max:t=100,step:r=1,clientWidth:n=100})=>v($(0,n)(e,t),y(e,t),k(r)),U=h((e,t)=>H(e)(t)<e.value?-e.step:H(e)(t)>e.value?e.step:0),F=n.html`
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
`,V={min:0,max:100,step:1,value:{get:(e,t)=>t||0,set:({step:e},t)=>k(e,t),observe:(e,t,r)=>{const{min:n,max:i,step:o}=e;Object(M.dispatch)(e,"change",{bubbles:!0,composed:!0,detail:{value:t,min:n,max:i,step:o}})}}};var _=Object.assign(Object.assign({},V),{render:c(e=>{const{min:t,max:r,value:i}=e;return n.html`
        ${F}
        <div
            class="slider-bar"
            @mousedown=${({path:t,offsetX:r})=>{t[0]===((e,t=document)=>t?t.querySelector(e):null)(".slider-bar",e.shadowRoot)&&(e.value+=U(e,r),m(()=>{e.value+=U(e,r)},"mouseup"))}}
        >
            <div
                tabindex="0"
                class="handle"
                style="left: ${v($(t,r)(0,100),y(0,100))(i)}%"
                @drag=${({offsetX:t,target:{offsetLeft:r}})=>{e.value=H(e)(t+r)}}
            ></div>
        </div>
        ${l(()=>{((e,t=document,r=1e3)=>new Promise((n,i)=>{let o;const l=setTimeout(()=>{o=!0},r);!function r(){if(o)return i();let c=t.querySelector(e);if(c)return clearTimeout(l),n(c);requestAnimationFrame(r)}()}))(".handle",e.shadowRoot).then(z).catch(console.log)})}
    `})});const R=n.html`
    <style>
        #group {
            display: flex;
            flex-direction: column;
            padding: 2px;
            justify-content: center;
            width: inherit;
        }
        ue-slider {
            margin-bottom: 8px;
        }
    </style>
`;var W=Object.assign(Object.assign({},{label:"",min:0,max:100,step:1,axislabels:["X","Y","Z"],values:[],defaultValues:[]}),{render:c(e=>{const{label:t,min:r,max:i,step:o,axislabels:l,values:c,defaultValues:s}=e;return n.html`
        ${R}
        ${c.map((a,u)=>n.html`
                    <ue-slider-widget
                        .label="${t} ${void 0===l[u]?"":l[u]}"
                        .min=${r}
                        .max=${i}
                        .step=${o}
                        .value=${a}
                        .defaultValue=${void 0===s[u]?a:s[u]}
                        @change=${r=>{e.values=g(u,r.target.value,c),Object.assign(r.detail,{index:u,group:t,values:e.values})}}
                    ></ue-slider-widget>
                `)}
    `})});const A=n.html`
    <style>
        :host {
            display: flex;
            min-width: 200px;
            align-items: center;
            font-size: 0.8em;
        }

        #label {
            width: 20%;
            flex-shrink: 0;
            flex-grow: 0;
            margin-right: 0.5em;
        }

        #value {
            width: 2.5em;
            margin-left: 0.5em;
            justify-content: center;
        }

        ue-slider {
            flex-grow: 1;
            flex-shrink: 0;
        }

        ue-button {
            width: 2em;
            flex-grow: 0;
            flex-shrink: 0;
            margin: 2px;
            font-size: inherit;
        }
    </style>
`;var I=Object.assign(Object.assign({},{label:"",min:0,max:100,step:1,value:0,defaultValue:0}),{render:c(e=>{const{label:t,min:r,max:i,step:o,value:l,defaultValue:c}=e;return n.html`
        ${A}
        ${t?n.html`
                  <ue-text id="label">${t}</ue-text>
              `:n.html``}
        <ue-slider
            .min=${r}
            .max=${i}
            .step=${o}
            .value=${l}
            @change=${r=>{e.value=r.target.value,Object.assign(r.detail,{label:t})}}
        ></ue-slider>
        <ue-text id="value">${l}</ue-text>
        <ue-button
            @click=${()=>{e.value=c}}
            ><ue-text>R</ue-text></ue-button
        >
        <ue-button
            @click=${()=>{e.value=0}}
            ><ue-text>0</ue-text></ue-button
        >
    `})});const X={small:32,medium:64,large:96,xlarge:128};function B(e){return parseFloat(e)||X[e]}var E=Object.assign(Object.assign({},{border:8,shape:"circle",size:"medium"}),{render:c(e=>n.html`
        ${(e=>n.html`
        <style>
            :host {
                width: ${B(e.size)||64}px;
                height: ${B(e.size)||64}px;
            }
            #bg {
                background-color: var(--color-secondary);
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: circle(${B(e.size)/2}px);
            }
            #fg {
                background-color: var(--color-primary);
                width: inherit;
                height: inherit;
                clip-path: circle(${B(e.size)/2-e.border}px);
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
    `)});r.d(t,"UeButton",(function(){return O})),r.d(t,"UeButtonGrp",(function(){return P})),r.d(t,"UeIcon",(function(){return E})),r.d(t,"UeSlider",(function(){return _})),r.d(t,"UeSliderGroup",(function(){return W})),r.d(t,"UeSliderWidget",(function(){return I})),r.d(t,"UeText",(function(){return d}))}])}));
//# sourceMappingURL=index.js.map