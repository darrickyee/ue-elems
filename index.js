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
`,s=new WeakMap;var d={slotHTML:{get:e=>e.innerHTML,connect:(e,t,r)=>{const n=s.get(e)||new MutationObserver(r);s.set(e,n),n.observe(e,{characterData:!0,childList:!0,subtree:!0})}},render:c(e=>n.html`
            ${a}
            <div class="grid-1 bg" .innerHTML=${e.slotHTML}></div>
            <div class="grid-1 fg" .innerHTML=${e.slotHTML}></div>
        `)};const u=n.html`
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
`;var f={label:"Button",active:!1,checkable:!1,checked:!1,disabled:!1,focused:!1,render:c(e=>{const{active:t,checkable:r,checked:i,disabled:l,focused:c}=e;return n.html`
            ${u}
            <div
                tabindex="0"
                class=${Object(o.classMap)({active:t,checked:i,disabled:l,focused:c})}
                @mouseover=${e=>{e.target.focus()}}
                @mousedown=${()=>{e.active=!0}}
                @mouseleave=${e=>{e.target.blur()}}
                @mouseup=${()=>{e.active=!1,e.checked=!!r&&!i}}
                @focus=${()=>{e.focused=!0}}
                @blur=${()=>{e.focused=e.active=!1}}
            >
                <ue-text .innerHTML=${e.label}></ue-text>
            </div>
        `})},b=r(1);const h=n.html`
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
`;var m={buttons:[],checkable:!1,singlecheck:!1,left:!1,render:c(e=>{const{buttons:t,left:r,checkable:i,singlecheck:l}=e;return n.html`
            ${h}
            ${t.map(({label:t,checked:l,disabled:c},a)=>n.html`
                        <ue-button
                            class=${Object(o.classMap)({left:r})}
                            .checkable=${i}
                            .label=${t}
                            .checked=${!(!i||c)&&l}
                            @click=${t=>{const{checked:r,disabled:n,label:o}=t.target,i={bubbles:!0,composed:!0,detail:{index:a,label:o,checked:r,disabled:n}};Object(b.dispatch)(e,"buttonclick",i)}}
                        ></ue-button>
                    `)}
        `})};const v=(e,t=0,r=1)=>Math.max(t,Math.min(e,r)),p=(e,{fromMin:t=0,fromMax:r=1,toMin:n=0,toMax:o=1})=>(e-t)/(r-t)*(o-n)+n,g=(e,t=1)=>{const r=t.toString().split(".")[1];return parseFloat((Math.round(e/t)*t).toFixed(r?r.length:0))};var x=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function l(e){try{a(n.next(e))}catch(e){i(e)}}function c(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,c)}a((n=n.apply(e,t||[])).next())}))};const y=(e,t=document)=>t?t.querySelector(e):null;function $(){return new Promise(e=>{requestAnimationFrame(e)})}function k(e=1e3,t=!1){return new Promise((r,n)=>{setTimeout(t?n:r,e)})}function w(e,t,r=500){return x(this,void 0,void 0,(function*(){const n=function(e,t=document,r=!1){return new Promise((n,o)=>{t.addEventListener(e,r?o:n,{once:!0})})}(t,document,!0);yield Promise.race([k(r),n]).catch(()=>{});let o=!0;for(;o;)yield Promise.race([$(),n]).then(e).catch(()=>{o=!1})}))}const M=(e,...t)=>r=>e.call(null,r,...t);var j=r(5),O=r.n(j);const{drag:P}=O.a,S=n.html`
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
            width: 0.5em;
            height: 200%;
            transform: translate(-50%, 0);
            background-color: var(--color-primary);
            border: 1px solid var(--color-dark);
            border-radius: 2px;
            position: relative;
        }
    </style>
`,T=(e,t=".handle")=>{const r=e.querySelector(t);r&&P(r)},L=(e,{min:t=0,max:r=100,step:n=1,clientWidth:o=100})=>((...e)=>t=>e.reduce((e,t)=>t.call(null,e),t))(M(p,{fromMax:o,toMin:t,toMax:r}),M(v,t,r),M(g,n))(e);var q={min:0,max:100,step:1,value:{get:(e,t)=>t||0,set:({step:e},t)=>g(t,e),observe:(e,t,r)=>{const{min:n,max:o,step:i}=e;Object(b.dispatch)(e,"change",{bubbles:!0,composed:!0,detail:{value:t,min:n,max:o,step:i}})}},render:c(e=>{const{min:t,max:r,value:o}=e;return n.html`
            ${S}
            <div
                class="slider-bar"
                @click=${({path:t,offsetX:r})=>{t[0]===y(".slider-bar",e.shadowRoot)&&(e.value+=Math.sign(L(r,e)-o)*e.step)}}
                @mousedown=${t=>{t.path[0]===y(".slider-bar",e.shadowRoot)&&w(()=>y(".slider-bar",e.shadowRoot).dispatchEvent(new MouseEvent("click",t)),"mouseup",250)}}
            >
                <div
                    tabindex="0"
                    class="handle"
                    style="left: ${p(o,{fromMin:t,fromMax:r,toMin:0,toMax:100})}%"
                    @drag=${({offsetX:t,target:{offsetLeft:r}})=>{e.value=L(t+r,e)}}
                ></div>
            </div>
            ${l(()=>{(function(e,t=document,r=1e3){return x(this,void 0,void 0,(function*(){const n=k(r,!0);for(;!y(e,t);)yield Promise.race([$(),n]).catch(()=>Promise.reject(`Element '${e}' not found.`));return y(e,t)}))})(".slider-bar",e.shadowRoot).then(M(T,".handle")).catch(console.log)})}
        `})};const z=n.html`
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
`;var H={name:"",data:[],render:c(e=>n.html`
            ${z}
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
        `)};const U=n.html`
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
`;var V={label:"",min:0,max:100,step:1,value:0,defaultValue:0,render:c(e=>{const{label:t,min:r,max:o,step:i,value:l,defaultValue:c}=e;return n.html`
            ${U}
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
                .label=${"R"}
                @click=${()=>{e.value=c}}
            ></ue-button>
            <ue-button
                .label=${"0"}
                @click=${()=>{e.value=0}}
            ></ue-button>
        `})};const _={small:32,medium:64,large:96,xlarge:128};function F(e){return parseFloat(e)||_[e]}var R={border:8,shape:"circle",size:"medium",render:c(e=>n.html`
                ${(e=>n.html`
        <style>
            :host {
                width: ${F(e.size)||64}px;
                height: ${F(e.size)||64}px;
            }
            #bg {
                background-color: var(--color-primary);
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: circle(${F(e.size)/2}px);
            }
            #fg {
                background-color: var(--color-secondary);
                width: inherit;
                height: inherit;
                clip-path: circle(${F(e.size)/2-e.border}px);
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
            `)};r.d(t,"UeButton",(function(){return f})),r.d(t,"UeButtonGrp",(function(){return m})),r.d(t,"UeIcon",(function(){return R})),r.d(t,"UeSlider",(function(){return q})),r.d(t,"UeSliderGrp",(function(){return H})),r.d(t,"UeSliderWidget",(function(){return V})),r.d(t,"UeText",(function(){return d}))}])}));
//# sourceMappingURL=index.js.map