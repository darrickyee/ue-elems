import{directive as e,render as t,html as r,svg as o}from"lit-html";import{property as a,define as n,dispatch as s,children as i,parent as l}from"hybrids";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const d=new WeakMap,c=e=>(...t)=>{const r=e(...t);return d.set(r,!0),r},u=e=>"function"==typeof e&&d.has(e),b={};String(Math.random()).slice(2);class m{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===b||(e=>null===e||!("object"==typeof e||"function"==typeof e))(e)&&e===this.value||(this.value=e,u(e)||(this.committer.dirty=!0))}commit(){for(;u(this.value);){const e=this.value;this.value=b,e(this)}this.value!==b&&this.committer.commit()}}class v extends m{}let f=!1;(()=>{try{const e={get capture(){return f=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})(),
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const h=new WeakMap,p=c(e=>t=>{if(!(t instanceof m)||t instanceof v||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:o}=r;let a=h.get(t);void 0===a&&(o.setAttribute("class",r.strings.join(" ")),h.set(t,a=new Set));const n=o.classList||new g(o);a.forEach(t=>{t in e||(n.remove(t),a.delete(t))});for(const t in e){const r=e[t];r!=a.has(t)&&(r?(n.add(t),a.add(t)):(n.remove(t),a.delete(t)))}"function"==typeof n.commit&&n.commit()}),y=new WeakMap,w=c(e=>t=>{if(!(t instanceof m)||t instanceof v||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:o}=r.element;let a=y.get(t);void 0===a&&(o.cssText=r.strings.join(" "),y.set(t,a=new Set)),a.forEach(t=>{t in e||(a.delete(t),-1===t.indexOf("-")?o[t]=null:o.removeProperty(t))});for(const t in e)a.add(t),-1===t.indexOf("-")?o[t]=e[t]:o.setProperty(t,e[t])}),x=new WeakSet,O=e(e=>t=>{x.has(t)||(t.setValue(e()),x.add(t))}),j=(e,r={})=>o=>{const a=e(o);return(e,o)=>t(a,o,r)},k=e=>function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)},$=k((e,t,r)=>(t-e)*r+e),E=k((e,t,r)=>(r-e)/(t-e)),L=k((e,t,r)=>Math.max(e,Math.min(r,t))),M=k((e,t)=>{if(e<=0)return t;const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),T=k((e,t,r,o,a)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(E(e,t),$(r,o))(a)),A=(e,t)=>({get:r=>r.getAttribute(e)||t,set:(t,r)=>(t.setAttribute(e,r),r),connect:(r,o,a)=>{r[o]=null===r.getAttribute(e)?t:r.getAttribute(e),new MutationObserver(a).observe(r,{attributeFilter:[e]})}}),S={boolean:(e,t)=>Object.assign(Object.assign({},A(e,t)),{get:r=>r.hasAttribute(e)||t,set:(t,r)=>(r?t.setAttribute(e,""):t.removeAttribute(e),!!r),connect:(t,r,o)=>{t[r]=t.hasAttribute(e),new MutationObserver(o).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},A(e,t)),{get:r=>parseFloat(r.getAttribute(e))||t}),string:A},W=k((e,t)=>e&&S[typeof t]?S[typeof t](e,t):a(t)),F=e=>{return r=-e,o=e+1,t=Array.from("0".repeat(o-r),(e,t)=>r+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,r,o},X=e=>{const{lineWidth:t}=e,r=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return F(r).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},_=r`
    <style>
        :host {
            display: block;
            color: var(--ue-color);
        }

        ::slotted(*) {
            user-select: none;
            cursor: default;
        }
    </style>
`,C={lineWidth:W("line-width",1)},I=n("ue-text",Object.assign(Object.assign({},C),{render:j(e=>r`
    ${_}
    <div style="text-shadow: ${X(e)};"><slot></slot></div>
`)})),B=r`
    <style>
        * {
            outline: none;
        }

        :host([disabled]) {
            pointer-events: none;
        }

        :host {
            --ue-color-primary: #52d6f4;
            --ue-color-primary-text: #363538;
            --ue-background: transparent;

            --ue-default-c-dark: #363538;
            --ue-default-c-light: #f6f6f6;
            --ue-default-c-primary: #52d6f4;
            --ue-default-c-secondary: #408697;
            --ue-default-c-contrast: #8d8c8a;

            --ue-default-color: var(--ue-default-c-dark);
            --ue-default-background-color: var(--ue-default-c-light);
            --ue-default-border-color: var(--ue-default-c-dark);
            --ue-default-border-width: 1px;
            --ue-default-border-style: solid;
            --ue-default-border-radius: 0.5em;

            --ue-default-focus-color: var(--ue-default-c-primary);
            --ue-default-focus-background-color: var(--ue-default-c-light);
            --ue-default-focus-border-color: var(--ue-default-c-primary);
            --ue-default-focus-border-style: solid;

            --ue-default-active-color: var(--ue-default-c-secondary);
            --ue-default-active-background-color: var(--ue-default-c-light);
            --ue-default-active-border-color: var(--ue-default-c-secondary);
            --ue-default-active-border-style: solid;

            --ue-default-btn-width: 8em;
            --ue-default-btn-height: 2em;

            --ue-default-transition: background-color 0.25s, color 0.25s, transform 0.25s,
                border 0.25s;
        }

        .reverse {
            --ue-default-color: var(--ue-default-c-light);
            --ue-default-background-color: var(--ue-default-c-dark);
            --ue-default-border-color: var(--ue-default-c-dark);

            --ue-default-focus-color: var(--ue-default-c-light);
            --ue-default-focus-background-color: var(--ue-default-c-secondary);
            --ue-default-focus-border-color: var(--ue-default-c-secondary);
            --ue-default-focus-border-style: solid;

            --ue-default-active-color: var(--ue-default-c-light);
            --ue-default-active-background-color: var(--ue-default-c-primary);
            --ue-default-active-border-color: var(--ue-default-c-primary);
            --ue-default-active-border-style: solid;
        }
    </style>
`,Y=k((e,{type:t})=>{}),H=r`
    <style>
        :host {
            display: inline-flex;
            min-width: var(--ue-btn-width, var(--ue-default-btn-width));
            height: var(--ue-btn-height, var(--ue-default-btn-height));
            --ue-focus-color: var(--ue-color-primary-text);
            --ue-focus-background: var(--ue-color-primary);
        }

        :host([rounded]) {
            --ue-border-radius: '0.25em';
        }

        :host([invert]) {
            --ue-focus-color: var(--ue-color-primary);
            --ue-focus-background: var(--ue-color-primary-text);
        }

        button:hover {
            /* color: var(--ue-focus-color, var(--ue-default-focus-color));
            background-color: var(
                --ue-focus-background-color,
                var(--ue-default-focus-background-color)
            );
            border-color: var(--ue-focus-border-color, var(--ue-default-focus-border-color));
            border-style: var(--ue-focus-border-style, var(--ue-default-focus-border-style));*/
            color: var(--ue-focus-color);
            background: var(--ue-focus-background);
        }

        button:active,
        .checked {
            color: var(--ue-active-color, var(--ue-default-active-color));
            background-color: var(
                --ue-active-background-color,
                var(--ue-default-active-background-color)
            );
            border-color: var(--ue-active-border-color, var(--ue-default-active-border-color));
            border-style: var(--ue-active-border-style, var(--ue-default-active-border-style));
        }

        button:disabled {
            pointer-events: none;
            color: #888;
            background-color: #444;
            border: var(--ue-border-width) solid #888;
        }

        ::slotted(*) {
            user-select: none;
        }

        button {
            display: inline-flex;
            justify-content: center;
            font: inherit;

            width: 100%;
            height: 100%;

            color: var(--ue-color, var(--ue-default-color));
            background-color: var(--ue-background-color, var(--ue-default-background-color));
            border-color: var(--ue-border-color, var(--ue-default-border-color));
            border-width: var(--ue-border-width, var(--ue-default-border-width));
            border-style: var(--ue-border-style, var(--ue-default-border-style));
            border-radius: var(--ue-border-radius, var(--ue-default-border-radius));

            transition: var(--ue-transition, var(--ue-default-transition));
        }
    </style>
`,K=Object.assign({active:W("active",!1),checked:W("checked",!1),disabled:W("disabled",!1),focused:W("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),R=n("ue-button",Object.assign(Object.assign({},K),{render:j(e=>{const{active:t,checked:o,disabled:a,focused:n}=e;return r`
        ${B} ${H}

        <button
            tabindex="0"
            class=${p({active:t,checked:o,focused:n})}
            .disabled=${a}
            @focus=${Y(e)}
            @blur=${Y(e)}
            @mousedown=${Y(e)}
            @mouseup=${Y(e)}
        >
            <slot></slot>
        </button>
    `})})),V=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),q=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function N(e,t={}){const r={};return q.forEach(t=>{r[t]=e[t]}),Object.assign(r,t)}function P(e,t,r={}){const o=new MouseEvent(t,r);return o.shftTarget=e,e.dispatchEvent(o),o}const{drags:z,drops:J}=V;function D(e,t=0,r=1){return Math.max(t,Math.min(e,r))}function G(e,t){return!t||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}function Q(e,t){const{drags:r,drops:o}=V;switch(t){case"drag":case"draggable":return r.has(e);case"drop":case"droppable":return o.has(e);default:return r.has(e)||o.has(e)}}function U(e,t){const{accepts:r,overlap:o}=J.get(e);return G(t,r)&&function(e,t){const{left:r,right:o,top:a,bottom:n,height:s,width:i}=e.getBoundingClientRect(),{left:l,right:d,top:c,bottom:u}=t.getBoundingClientRect();return D(Math.min(o,d)-Math.max(r,l),0,i)*D(Math.min(n,u)-Math.max(a,c),0,s)/(i*s)}(t,e)>o}const{drags:Z}=V;function ee(e){return t=>{const{onmousemove:r,onmouseup:o}=Z.get(e);1===t.buttons&&(P(e,"dragstart",N(t)),document.addEventListener("mousemove",r),document.addEventListener("mouseup",o,{once:!0}))}}function te(e){return t=>{P(e,"drag",N(t))}}function re(e){return t=>{const{onmousemove:r}=Z.get(e);P(e,"dragend",N(t)),document.removeEventListener("mousemove",r)}}const{drops:oe}=V;function ae(e){return t=>{if(!oe.has(e))return;const r=t.shftTarget,{accepts:o,ondrag:a,ondragend:n}=oe.get(e);G(r,o)&&(P(e,"dropopen",{relatedTarget:r}),r.addEventListener("drag",a),r.addEventListener("dragend",n,{once:!0}))}}function ne(e){return t=>{const r=t.shftTarget,{accepts:o,content:a}=oe.get(e);G(r,o)&&(U(e,r)?(a.has(r)||(a.add(r),P(e,"dragenter",N(t,{relatedTarget:r}))),P(e,"dragover",N(t,{relatedTarget:r}))):a.has(r)&&(a.delete(r),P(e,"dragleave",N(t,{relatedTarget:r}))))}}function se(e){return t=>{const r=t.shftTarget,{ondrag:o}=oe.get(e);P(e,"dropclose",N(t,{relatedTarget:r})),r.removeEventListener("drag",o),U(e,r)&&P(e,"drop",N(t,{relatedTarget:r}))}}var ie={drag:function(e){if(Q(e,"drag"))return;const t={onmousedown:ee(e),onmousemove:te(e),onmouseup:re(e)};e.addEventListener("mousedown",t.onmousedown),Z.set(e,t)},drop:function(e,t){if(Q(e,"drop"))return;const{accepts:r,overlap:o}=Object.assign({accepts:null,overlap:.5},t||{}),a={content:new WeakSet,ondragstart:ae(e),ondrag:ne(e),ondragend:se(e),accepts:r,overlap:o};document.addEventListener("dragstart",a.ondragstart),oe.set(e,a)},util:{clear:function(e){const{drags:t,drops:r}=V;if(t.has(e)){const{onmousedown:r,onmousemove:o,onmouseup:a}=t.get(e);e.removeEventListener("mousedown",r),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",a)}if(r.has(e)){const{ondragstart:t,ondrag:o,ondragend:a}=r.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",o),document.removeEventListener("dragend",a)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(r=>{let o=parseFloat(t.style[r])||0;o+="left"===r?e.movementX:e.movementY,t.style[r]=o+"px"})},is:Q,matches:G},_GLOBAL:V};const{drag:le}=ie,de=r`
    <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3em;
            cursor: default;
        }

        .slider-bar {
            cursor: default;
            position: relative;
            width: 100%;
            height: 0.5em;
            background: var(--ue-default-c-primary);
            touch-action: none;
            display: flex;
            align-items: center;
        }

        .handle {
            cursor: default;
            width: 2.5em;
            height: 2.5em;
            /* background: var(--ue-default-c-primary); */
            background-color: rgba(255, 0, 0, 0.3);
            clip-path: circle(1em);
            position: absolute;
            left: 0;
        }
    </style>
`,ce={min:W("min",0),max:W("max",100),step:W("step",1),value:Object.assign(Object.assign({},W("value",0)),{observe:(e,t)=>{s(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}})},ue=(e,{clientX:t})=>{const r=t-e.getBoundingClientRect().left,{min:o,max:a,step:n,clientWidth:s}=e;e.value=L(o,a,M(n,T(0,s,o,a,r)))},be=n("ue-slider",Object.assign(Object.assign({},ce),{render:j(e=>{const{min:t,max:o,value:a,clientWidth:n}=e;return r`
        ${B} ${de}
        <div
            class="slider-bar"
            @drag=${t=>ue(e,t)}
            @mousedown=${t=>ue(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${L(0,n,T(t,o,0,n,a))}px) translateX(-50%);"
            ></div>
        </div>
        ${O(()=>{((e,t=document,r=1e3)=>new Promise((o,a)=>{let n;const s=setTimeout(()=>{n=!0},r);!function r(){if(n)return a();let i=t.querySelector(e);if(i)return clearTimeout(s),o(i);requestAnimationFrame(r)}()}))(".slider-bar",e.shadowRoot).then(le).catch(console.log)})}
    `})})),me={arrow:o`
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 491.996 491.996"
        xml:space="preserve"
    >
    <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
			L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
			c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
			c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
			C491.996,136.902,489.204,130.046,484.132,124.986z"/>
    </svg>
`},ve=r`
    <style>
        :host {
            display: block;
            background-color: transparent;
            fill: var(--ue-color);
            position: relative;
            height: 1em;
            width: 1em;
        }

        svg {
            height: inherit;
            width: inherit;
            position: absolute;
        }
    </style>
`,fe=n("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:j(e=>r`
        ${ve} ${me[e.shape]}
    `)})),ge={_ue_item:!0,active:W("active",!0),selected:W("selected",!1)},he=Object.assign(Object.assign({},ge),{value:W("value",""),label:e=>e.getAttribute("label")||e.innerText,render:j(()=>r`<slot></slot>`)}),pe=Object.assign(Object.assign({},ge),{icon:W("icon",""),label:W("label",""),render:j(({active:e})=>r`${e?r`<slot></slot>`:r``}`)}),ye={items:i(e=>void 0!==e._ue_item)},we={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{s(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},xe=k((e,t)=>{e.forEach(e=>{e.selected=e===t})}),Oe=n("ue-list-item",he),je=n("ue-content-item",pe),ke={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,r)=>e.selected=r===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:r}=e;console.log("changed to "+t),r[t]&&s(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:r[t].label,item:r[t]}})}},$e={items:i(e=>e.ueItem)},Ee=Object.assign(Object.assign({},$e),{preselect:W("preselect",0),selected:ke,selectedItem:({items:e})=>e.find(e=>e.selected)}),Le=k((e,t)=>r` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:o},a)=>r`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=a}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${a}">${o}</slot>
    </ue-button>
`),Me=Object.assign(Object.assign({},Ee),{location:W("location","left")}),Te=r`
    <style>
        :host {
            display: flex;
            flex-direction: column;
        }

        :host([location='left']) {
            flex-direction: row;
        }

        :host([location='right']) {
            flex-direction: row-reverse;
        }

        :host([location='bottom']) {
            flex-direction: column-reverse;
        }

        ue-button {
            margin: 0.25em;
        }

        div {
            display: flex;
        }
    </style>
`,Ae=n("ue-tab-group",Object.assign(Object.assign({},Me),{render:j(e=>r`
        ${Te}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${Le(e)}
        </div>
        <slot></slot>
    `)})),Se=Object.assign(Object.assign({},Ee),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return r=document,o="click",a=()=>{e.open=!1},n={once:!0},r.addEventListener(o,a,n),()=>r.removeEventListener(o,a,n);var r,o,a,n}}}),We=r`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            font-size: 0.8em;
        }

        ue-button {
            padding: 0;
        }

        ue-icon {
            position: absolute;
            height: 0.8em;
            width: 0.8em;
            right: 0.1em;
        }

        svg {
            position: absolute;
        }

        .container {
            position: relative;
        }
    </style>
`,Fe={border:"1px solid transparent"},Xe={border:"1px solid var(--ue-active-bg-color)"},_e=n("ue-dropdown",Object.assign(Object.assign({},Se),{render:j(e=>{const{open:t,selectedItem:o}=e;return r`
        ${We}
        <div class="container" style=${w(t?Xe:Fe)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${o?o.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${w(t?Xe:Fe)}>
                    ${Le(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),Ce={value:Object.assign(Object.assign({},W("value",0)),{observe:(e,t,r)=>{t!==r&&s(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:W("duration",1),delay:W("delay",0)},Ie=n("ue-progress-bar",Object.assign(Object.assign({},Ce),{render:j(e=>{const{value:t,duration:o,delay:a}=e;return r`
        ${B}
        <style>
            :host {
                display: flex;
                height: 0.75em;
                width: 100%;
            }

            #bg {
                background-color: var(--ue-bg-color);
                border-color: var(--ue-border-color, var(--ue-default-border-color));
                border-width: var(--ue-border-width, var(--ue-default-border-width));
                border-style: var(--ue-border-style, var(--ue-default-border-style));
                border-radius: var(--ue-border-radius, var(--ue-default-border-radius));
                width: 100%;
                overflow: hidden;
            }

            #bar {
                position: relative;
                height: 100%;
                background-color: var(--ue-color, var(--ue-default-c-primary, #444));
                width: ${L(0,100,t)}%;
                transition: width ${L(0,1/0,o)}s ease
                    ${L(0,1/0,a)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{s(e,"updated")}}
            ></div>
        </div>
    `})})),Be=Object.assign(Object.assign({},Ee),{direction:W("direction","column")}),Ye=r`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,He=n("ue-select-grp",Object.assign(Object.assign({},Be),{render:j(e=>r`
                ${Ye}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${Le(e)}
                </div>
            `)})),Ke={open:W("open",!1),direction:W("direction","right"),duration:W("duration",500)},Re=r`
    <style>
        :host {
            display: inline-flex;
            overflow: hidden;
            position: absolute;
            background-color: transparent;
        }

        div {
            display: flex;
            align-items: center;
        }
    </style>
`,Ve={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},qe={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Ne=n("ue-drawer",Object.assign(Object.assign({},Ke),{render:j(({direction:e,duration:t,open:o})=>r`
        ${Re}
        <div style=${w((({direction:e,duration:t,open:r})=>({transition:`transform ${t}ms`,flexDirection:Ve[e],transform:r?"translate(0, 0)":qe[e]}))({direction:e,duration:t,open:o}))}>
            <slot></slot>
        </div>
    `)})),Pe=Object.assign(Object.assign({},ye),{selected:we}),ze=(e,t,o)=>(e.slot=e.selected?"selected-item":"",r`<ue-button .checked=${e.selected} @click=${()=>xe(o,e)}
        >${e.label}</ue-button
    >`),Je=({items:e})=>r`
        ${B}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(ze)}
    `,De=n("ue-list",Object.assign(Object.assign({},Pe),{render:j(Je)})),Ge=n("ue-tab-list",Object.assign(Object.assign({},Pe),{render:j(({items:e})=>r`${Je({items:e})} <slot name="selected-item"></slot>`)})),Qe=Object.assign(Object.assign({},ye),{render:j(({items:e})=>r`
            <style>
                #container {
                    display: inline-flex;
                    flex-direction: column;
                    position: relative;
                    width: inherit;
                }
            </style>
            <div id="container">
                <slot></slot>
            </div>
        `)}),Ue=Object.assign(Object.assign({},ge),{msg:l(Qe),index:e=>e.msg.items.indexOf(e),render:j(e=>r`
            <style>
                @keyframes fadeinout {
                    0% {
                        opacity: 0;
                    }

                    10% {
                        opacity: 1;
                    }

                    80% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                    }
                }

                div {
                    animation: 3s linear fadeinout;
                    position: absolute;
                    transition: transform 1s;
                }
            </style>
            <div
                style="transform: translateY(${100*e.index}%);"
                @animationend=${()=>{e.parentNode.removeChild(e)}}
            >
                <slot></slot>
            </div>
        `)});Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),r=document.createElement("ue-msg-item");r.innerText=e,t.appendChild(r)}});const Ze=n("ue-msg",Qe),et=n("ue-msg-item",Ue);export{R as UeButton,je as UeContentItem,Ne as UeDrawer,_e as UeDropdown,fe as UeIcon,De as UeList,Oe as UeListItem,Ze as UeMsg,et as UeMsgItem,Ie as UeProgressBar,He as UeSelectGrp,be as UeSlider,Ae as UeTabGroup,Ge as UeTabList,I as UeText,X as shadowStyle};
