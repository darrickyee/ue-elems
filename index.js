!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["ue-elems"]=t():e["ue-elems"]=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("lit-html")},function(e,t){e.exports=require("hybrids")},function(e,t){e.exports=require("lit-html/directives/class-map")},function(e,t){e.exports=require("lit-html/directives/guard")},function(e,t){e.exports=require("lit-html/directives/until")},function(e,t){e.exports=require("shftjs")},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r(2);r(3),r(4);const i=new WeakSet,l=Object(n.directive)(e=>t=>{i.has(t)||(t.setValue(e()),i.add(t))}),c=e=>t=>{const r=e(t);return(e,t)=>Object(n.render)(r,t)},a=n.html`
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
`,s=new WeakMap;var u={slotHTML:{get:e=>e.innerHTML,connect:(e,t,r)=>{const n=s.get(e)||new MutationObserver(r);s.set(e,n),n.observe(e,{characterData:!0,childList:!0,subtree:!0})}},render:c(e=>n.html`
            ${a}
            <div class="grid-1 bg" .innerHTML=${e.slotHTML}></div>
            <div class="grid-1 fg" .innerHTML=${e.slotHTML}></div>
        `)},d=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function l(e){try{a(n.next(e))}catch(e){i(e)}}function c(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,c)}a((n=n.apply(e,t||[])).next())}))};function f(e=1e3,t=!1){return new Promise((r,n)=>{setTimeout(t?n:r,e)})}function b(e,t,r=500){return d(this,void 0,void 0,(function*(){const n=function(e,t=document,r=!1){return new Promise((n,o)=>{t.addEventListener(e,r?o:n,{once:!0})})}(t,document,!0);yield Promise.race([f(r),n]).catch(()=>{});let o=!0;for(;o;)yield Promise.race([new Promise(e=>{requestAnimationFrame(e)}),n]).then(e).catch(()=>{o=!1})}))}const m=e=>(function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)}),h=(...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0],v=m((e,t,r)=>(t-e)*r+e),p=m((e,t,r)=>(r-e)/(t-e)),g=m((e,t,r)=>Math.max(e,Math.min(r,t))),x=m((e,t)=>{const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),y=m((e,t,r,n)=>h(p(e,t),v(r,n))),k=n.html`
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
`,$=m((e,{type:t})=>{switch(t){case"focus":e.focused=!0;break;case"blur":e.focused=e.active=!1;break;case"mousedown":e.active=!!e.clickable;break;case"mouseup":e.clickable&&(e.active=!1,e.checked=!!e.checkable&&!e.checked)}});var w={active:!1,checkable:!1,checked:!1,clickable:!0,disabled:!1,focused:!1,render:c(e=>{const{active:t,checked:r,disabled:i,focused:l}=e;return n.html`
            ${k}
            <div
                tabindex="0"
                class=${Object(o.classMap)({active:t,checked:r,disabled:i,focused:l})}
                @mouseover=${e=>e.target.focus()}
                @mouseleave=${e=>e.target.blur()}
                @mousedown=${$(e)}
                @mouseup=${$(e)}
                @focus=${$(e)}
                @blur=${$(e)}
            >
                <slot></slot>
            </div>
        `})},j=r(1);const M=n.html`
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
`;var O={buttons:[],checkable:!1,singlecheck:!1,items:e=>((e,t=document)=>t?[...t.querySelectorAll(e)]:[])("ue-button",e.shadowRoot),checkedItems:{get:({items:e})=>e.filter(e=>e.checked).map(e=>e.index),set:({items:e},t)=>(e.forEach((e,r)=>{e.checked=t.includes(r)}),t)},left:!1,render:c(e=>{const{buttons:t,left:r,checkable:i,singlecheck:l}=e;return n.html`
            ${M}
            ${t.map(({label:t,checked:c,disabled:a},s)=>n.html`
                        <ue-button
                            class=${Object(o.classMap)({left:r})}
                            .index=${s}
                            .checkable=${i}
                            .disabled=${a}
                            @click=${({target:r})=>{const n={bubbles:!0,composed:!0,detail:Object.assign(Object.assign({},r),{label:t})};Object(j.dispatch)(e,"buttonclick",n),l&&(e.checkedItems=[s])}}
                            ><ue-text .innerHTML=${t}></ue-text
                        ></ue-button>
                    `)}
        `})},S=r(5),T=r.n(S);const{drag:P}=T.a,q=n.html`
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
`,L=({min:e=0,max:t=100,step:r=1,clientWidth:n=100})=>h(y(0,n)(e,t),g(e,t),x(r)),z=m((e,t)=>L(e)(t)<e.value?-e.step:L(e)(t)>e.value?e.step:0);var H={min:0,max:100,step:1,value:{get:(e,t)=>t||0,set:({step:e},t)=>x(e,t),observe:(e,t,r)=>{const{min:n,max:o,step:i}=e;Object(j.dispatch)(e,"change",{bubbles:!0,composed:!0,detail:{value:t,min:n,max:o,step:i}})}},render:c(e=>{const{min:t,max:r,value:o}=e;return n.html`
            ${q}
            <div
                class="slider-bar"
                @mousedown=${({path:t,offsetX:r})=>{t[0]===((e,t=document)=>t?t.querySelector(e):null)(".slider-bar",e.shadowRoot)&&(e.value+=z(e,r),b(()=>{e.value+=z(e,r)},"mouseup"))}}
            >
                <div
                    tabindex="0"
                    class="handle"
                    style="left: ${h(y(t,r)(0,100),g(0,100))(o)}%"
                    @drag=${({offsetX:t,target:{offsetLeft:r}})=>{e.value=L(e)(t+r)}}
                ></div>
            </div>
            ${l(()=>{((e,t=document,r=1e3)=>new Promise((n,o)=>{let i;const l=setTimeout(()=>{i=!0},r);!function r(){if(console.log(`Looking for element ${e}...`),i)return o();let c=t.querySelector(e);if(c)return clearTimeout(l),n(c);requestAnimationFrame(r)}()}))(".handle",e.shadowRoot).then(P).catch(console.log)})}
        `})};const U=n.html`
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
`;var V={name:"",data:[],render:c(e=>n.html`
            ${U}
            <div id="group">
                ${e.data.map(({label:e,min:t,max:r,step:o,value:i,defaultValue:l},c)=>n.html`
                            <ue-slider-widget
                                .label=${e}
                                .min=${t||0}
                                .max=${r||100}
                                .step=${o||1}
                                .value=${i||0}
                                .defaultValue=${l||0}
                                @change=${e=>{const{label:t,defaultValue:r}=e.target;Object.assign(e.detail,{index:c,label:t,defaultValue:r})}}
                            ></ue-slider-widget>
                        `)}
            </div>
        `)};const F=n.html`
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
`;var _={label:"",min:0,max:100,step:1,value:0,defaultValue:0,render:c(e=>{const{label:t,min:r,max:o,step:i,value:l,defaultValue:c}=e;return n.html`
            ${F}
            ${t?n.html`
                      <ue-text id="label">${t}</ue-text>
                  `:n.html``}
            <ue-slider
                .min=${r}
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
        `})};const R={small:32,medium:64,large:96,xlarge:128};function W(e){return parseFloat(e)||R[e]}var A={border:8,shape:"circle",size:"medium",render:c(e=>n.html`
                ${(e=>n.html`
        <style>
            :host {
                width: ${W(e.size)||64}px;
                height: ${W(e.size)||64}px;
            }
            #bg {
                background-color: var(--color-secondary);
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: circle(${W(e.size)/2}px);
            }
            #fg {
                background-color: var(--color-primary);
                width: inherit;
                height: inherit;
                clip-path: circle(${W(e.size)/2-e.border}px);
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
            `)};r.d(t,"UeButton",(function(){return w})),r.d(t,"UeButtonGrp",(function(){return O})),r.d(t,"UeIcon",(function(){return A})),r.d(t,"UeSlider",(function(){return H})),r.d(t,"UeSliderGrp",(function(){return V})),r.d(t,"UeSliderWidget",(function(){return _})),r.d(t,"UeText",(function(){return u}))}])}));
//# sourceMappingURL=index.js.map