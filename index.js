!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["ue-elems"]=t():e["ue-elems"]=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("lit-html")},function(e,t){e.exports=require("hybrids")},function(e,t){e.exports=require("lit-html/directives/class-map")},function(e,t){e.exports=require("lit-html/directives/guard")},function(e,t){e.exports=require("lit-html/directives/until")},function(e,t){e.exports=require("shftjs")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(2);n(3),n(4);const i=new WeakSet,l=Object(r.directive)(e=>t=>{i.has(t)||(t.setValue(e()),i.add(t))}),c=e=>t=>{const n=e(t);return(e,t)=>Object(r.render)(n,t)},a=r.html`
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
`,s=new WeakMap,u={slotHTML:{get:e=>e.innerHTML,connect:(e,t,n)=>{const r=s.get(e)||new MutationObserver(n);s.set(e,r),r.observe(e,{characterData:!0,childList:!0,subtree:!0})}}};var d=Object.assign(Object.assign({},u),{render:c(e=>r.html`
    ${a}
    <div class="grid-1 bg" .innerHTML=${e.slotHTML}></div>
    <div class="grid-1 fg" .innerHTML=${e.slotHTML}></div>
`)}),b=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function l(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,c)}a((r=r.apply(e,t||[])).next())}))};function f(e=1e3,t=!1){return new Promise((n,r)=>{setTimeout(t?r:n,e)})}function m(e,t,n=500){return b(this,void 0,void 0,(function*(){const r=function(e,t=document,n=!1){return new Promise((r,o)=>{t.addEventListener(e,n?o:r,{once:!0})})}(t,document,!0);yield Promise.race([f(n),r]).catch(()=>{});let o=!0;for(;o;)yield Promise.race([new Promise(e=>{requestAnimationFrame(e)}),r]).then(e).catch(()=>{o=!1})}))}const h=e=>(function t(...n){return n.length<e.length?t.bind(null,...n):e.call(null,...n)}),g=(...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0],v=h((e,t,n)=>(t-e)*n+e),p=h((e,t,n)=>(n-e)/(t-e)),x=h((e,t,n)=>Math.max(e,Math.min(n,t))),y=h((e,t)=>{const n=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(n?n.length:0))}),k=h((e,t,n,r)=>g(p(e,t),v(n,r))),$=h((e,{type:t})=>{switch(t){case"focus":e.focused=!0;break;case"blur":e.focused=e.active=!1;break;case"mousedown":e.active=!!e.clickable;break;case"mouseup":e.clickable&&(e.active=!1,e.checked=!!e.checkable&&!e.checked)}}),w=r.html`
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
`;var j=Object.assign(Object.assign({},{active:!1,checkable:!1,checked:!1,clickable:!0,disabled:!1,focused:!1}),{render:c(e=>{const{active:t,checked:n,disabled:i,focused:l}=e;return r.html`
        ${w}
        <div
            tabindex="0"
            class=${Object(o.classMap)({active:t,checked:n,disabled:i,focused:l})}
            @mouseover=${e=>e.target.focus()}
            @mouseleave=${e=>e.target.blur()}
            @mousedown=${$(e)}
            @mouseup=${$(e)}
            @focus=${$(e)}
            @blur=${$(e)}
        >
            <slot></slot>
        </div>
    `})}),O=n(1);const M=r.html`
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
`,S={buttons:[],checkable:!1,singlecheck:!1,items:e=>((e,t=document)=>t?[...t.querySelectorAll(e)]:[])("ue-button",e.shadowRoot),checkedItems:{get:({items:e})=>e.filter(e=>e.checked).map(e=>e.index),set:({items:e},t)=>(e.forEach((e,n)=>{e.checked=t.includes(n)}),t)},left:!1};var T=Object.assign(Object.assign({},S),{render:c(e=>{const{buttons:t,left:n,checkable:i,singlecheck:l}=e;return r.html`
        ${M}
        ${t.map(({label:t,disabled:c},a)=>r.html`
                    <ue-button
                        class=${Object(o.classMap)({left:n})}
                        .index=${a}
                        .checkable=${i}
                        .disabled=${c}
                        @click=${({target:n})=>{const r={bubbles:!0,composed:!0,detail:Object.assign(Object.assign({},n),{label:t})};Object(O.dispatch)(e,"buttonclick",r),l&&(e.checkedItems=[a])}}
                        ><ue-text .innerHTML=${t}></ue-text
                    ></ue-button>
                `)}
    `})}),P=n(5),q=n.n(P);const{drag:L}=q.a,z=({min:e=0,max:t=100,step:n=1,clientWidth:r=100})=>g(k(0,r)(e,t),x(e,t),y(n)),H=h((e,t)=>z(e)(t)<e.value?-e.step:z(e)(t)>e.value?e.step:0),U=r.html`
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
`,V={min:0,max:100,step:1,value:{get:(e,t)=>t||0,set:({step:e},t)=>y(e,t),observe:(e,t,n)=>{const{min:r,max:o,step:i}=e;Object(O.dispatch)(e,"change",{bubbles:!0,composed:!0,detail:{value:t,min:r,max:o,step:i}})}}};var F=Object.assign(Object.assign({},V),{render:c(e=>{const{min:t,max:n,value:o}=e;return r.html`
        ${U}
        <div
            class="slider-bar"
            @mousedown=${({path:t,offsetX:n})=>{t[0]===((e,t=document)=>t?t.querySelector(e):null)(".slider-bar",e.shadowRoot)&&(e.value+=H(e,n),m(()=>{e.value+=H(e,n)},"mouseup"))}}
        >
            <div
                tabindex="0"
                class="handle"
                style="left: ${g(k(t,n)(0,100),x(0,100))(o)}%"
                @drag=${({offsetX:t,target:{offsetLeft:n}})=>{e.value=z(e)(t+n)}}
            ></div>
        </div>
        ${l(()=>{((e,t=document,n=1e3)=>new Promise((r,o)=>{let i;const l=setTimeout(()=>{i=!0},n);!function n(){if(console.log(`Looking for element ${e}...`),i)return o();let c=t.querySelector(e);if(c)return clearTimeout(l),r(c);requestAnimationFrame(n)}()}))(".handle",e.shadowRoot).then(L).catch(console.log)})}
    `})});const _=r.html`
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
`;var R=Object.assign(Object.assign({},{name:"",data:[]}),{render:c(e=>r.html`
    ${_}
    <div id="group">
        ${e.data.map(({label:e,min:t,max:n,step:o,value:i,defaultValue:l},c)=>r.html`
                    <ue-slider-widget
                        .label=${e}
                        .min=${t||0}
                        .max=${n||100}
                        .step=${o||1}
                        .value=${i||0}
                        .defaultValue=${l||0}
                        @change=${e=>{const{label:t,defaultValue:n}=e.target;Object.assign(e.detail,{index:c,label:t,defaultValue:n})}}
                    ></ue-slider-widget>
                `)}
    </div>
`)});const W=r.html`
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
`;var A=Object.assign(Object.assign({},{label:"",min:0,max:100,step:1,value:0,defaultValue:0}),{render:c(e=>{const{label:t,min:n,max:o,step:i,value:l,defaultValue:c}=e;return r.html`
        ${W}
        ${t?r.html`
                  <ue-text id="label">${t}</ue-text>
              `:r.html``}
        <ue-slider
            .min=${n}
            .max=${o}
            .step=${i}
            .value=${l}
            @change=${t=>{e.value=t.target.value}}
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
    `})});const I={small:32,medium:64,large:96,xlarge:128};function B(e){return parseFloat(e)||I[e]}var E=Object.assign(Object.assign({},{border:8,shape:"circle",size:"medium"}),{render:c(e=>r.html`
        ${(e=>r.html`
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
    `)});n.d(t,"UeButton",(function(){return j})),n.d(t,"UeButtonGrp",(function(){return T})),n.d(t,"UeIcon",(function(){return E})),n.d(t,"UeSlider",(function(){return F})),n.d(t,"UeSliderGrp",(function(){return R})),n.d(t,"UeSliderWidget",(function(){return A})),n.d(t,"UeText",(function(){return d}))}])}));
//# sourceMappingURL=index.js.map