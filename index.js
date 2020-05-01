import{directive as e,render as t,html as r,svg as o}from"lit-html";import{property as n,define as a,dispatch as i,children as s}from"hybrids";import c from"tippy.js";
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
 */const l=new WeakMap,d=e=>(...t)=>{const r=e(...t);return l.set(r,!0),r},u=e=>"function"==typeof e&&l.has(e),f={};String(Math.random()).slice(2);class p{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||(e=>null===e||!("object"==typeof e||"function"==typeof e))(e)&&e===this.value||(this.value=e,u(e)||(this.committer.dirty=!0))}commit(){for(;u(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class m extends p{}let h=!1;(()=>{try{const e={get capture(){return h=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})(),
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
class v{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const b=new WeakMap,g=d(e=>t=>{if(!(t instanceof p)||t instanceof m||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:o}=r;let n=b.get(t);void 0===n&&(o.setAttribute("class",r.strings.join(" ")),b.set(t,n=new Set));const a=o.classList||new v(o);n.forEach(t=>{t in e||(a.remove(t),n.delete(t))});for(const t in e){const r=e[t];r!=n.has(t)&&(r?(a.add(t),n.add(t)):(a.remove(t),n.delete(t)))}"function"==typeof a.commit&&a.commit()}),y=new WeakMap,w=d(e=>t=>{if(!(t instanceof p)||t instanceof m||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:o}=r.element;let n=y.get(t);void 0===n&&(o.cssText=r.strings.join(" "),y.set(t,n=new Set)),n.forEach(t=>{t in e||(n.delete(t),-1===t.indexOf("-")?o[t]=null:o.removeProperty(t))});for(const t in e)n.add(t),-1===t.indexOf("-")?o[t]=e[t]:o.setProperty(t,e[t])}),x=new WeakSet,O=e(e=>t=>{x.has(t)||(t.setValue(e()),x.add(t))}),j=(e,r={})=>o=>{const n=e(o);return(e,o)=>t(n,o,r)},k=e=>function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)},E=k((e,t,r)=>(t-e)*r+e),M=k((e,t,r)=>(r-e)/(t-e)),$=k((e,t,r)=>Math.max(e,Math.min(r,t))),L=k((e,t)=>{if(e<=0)return t;const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),S=k((e,t,r,o,n)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(M(e,t),E(r,o))(n)),T=(e,t)=>({get:r=>r.getAttribute(e)||t,set:(t,r)=>(t.setAttribute(e,r),r),connect:(r,o,n)=>{r[o]=null===r.getAttribute(e)?t:r.getAttribute(e),new MutationObserver(n).observe(r,{attributeFilter:[e]})}}),D={boolean:(e,t)=>Object.assign(Object.assign({},T(e,t)),{get:r=>r.hasAttribute(e)||t,set:(t,r)=>(r?t.setAttribute(e,""):t.removeAttribute(e),!!r),connect:(t,r,o)=>{t[r]=t.hasAttribute(e),new MutationObserver(o).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},T(e,t)),{get:r=>parseFloat(r.getAttribute(e))||t}),string:T},P=k((e,t)=>e&&D[typeof t]?D[typeof t](e,t):n(t)),A=e=>{return r=-e,o=e+1,t=Array.from("0".repeat(o-r),(e,t)=>r+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,r,o},W=e=>{const{lineWidth:t}=e,r=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return A(r).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},q=r`
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
`,B={lineWidth:P("line-width",1)},N=a("ue-text",Object.assign(Object.assign({},B),{render:j(e=>r`
    ${q}
    <div style="text-shadow: ${W(e)};"><slot></slot></div>
`)})),H=r`
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
`,V=k((e,{type:t})=>{}),C=r`
    <style>
        :host {
            display: inline-flex;
            min-width: var(--ue-btn-width, var(--ue-default-btn-width));
            height: var(--ue-btn-height, var(--ue-default-btn-height));
            --ue-focus-color: var(--ue-color-primary-text);
            --ue-focus-background: var(--ue-color-primary);
        }

        :host([invert]) {
            --ue-focus-color: var(--ue-color-primary);
            --ue-focus-background: var(--ue-color-primary-text);
        }

        button:focus {
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
`,I=Object.assign({active:P("active",!1),checked:P("checked",!1),disabled:P("disabled",!1),focused:P("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),R=a("ue-button",Object.assign(Object.assign({},I),{render:j(e=>{const{active:t,checked:o,disabled:n,focused:a}=e;return r`
        ${H} ${C}
        <style>
            ::slotted(*) {
                user-select: none;
            }
        </style>
        <button
            tabindex="0"
            class=${g({active:t,checked:o,focused:a})}
            .disabled=${n}
            @mouseover=${t=>{e.focused=!0,t.target.focus()}}
            @mouseleave=${t=>{e.focused=!1,t.target.blur()}}
            @focus=${V(e)}
            @blur=${V(e)}
            @mousedown=${V(e)}
            @mouseup=${V(e)}
        >
            <slot></slot>
        </button>
    `})})),_=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),F=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function X(e,t={}){const r={};return F.forEach(t=>{r[t]=e[t]}),Object.assign(r,t)}function Y(e,t,r={}){const o=new MouseEvent(t,r);return o.shftTarget=e,e.dispatchEvent(o),o}const{drags:z,drops:K}=_;function U(e,t=0,r=1){return Math.max(t,Math.min(e,r))}function G(e,t){return!t||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}function J(e,t){const{drags:r,drops:o}=_;switch(t){case"drag":case"draggable":return r.has(e);case"drop":case"droppable":return o.has(e);default:return r.has(e)||o.has(e)}}function Q(e,t){const{accepts:r,overlap:o}=K.get(e);return G(t,r)&&function(e,t){const{left:r,right:o,top:n,bottom:a,height:i,width:s}=e.getBoundingClientRect(),{left:c,right:l,top:d,bottom:u}=t.getBoundingClientRect();return U(Math.min(o,l)-Math.max(r,c),0,s)*U(Math.min(a,u)-Math.max(n,d),0,i)/(s*i)}(t,e)>o}const{drags:Z}=_;function ee(e){return t=>{const{onmousemove:r,onmouseup:o}=Z.get(e);1===t.buttons&&(Y(e,"dragstart",X(t)),document.addEventListener("mousemove",r),document.addEventListener("mouseup",o,{once:!0}))}}function te(e){return t=>{Y(e,"drag",X(t))}}function re(e){return t=>{const{onmousemove:r}=Z.get(e);Y(e,"dragend",X(t)),document.removeEventListener("mousemove",r)}}const{drops:oe}=_;function ne(e){return t=>{if(!oe.has(e))return;const r=t.shftTarget,{accepts:o,ondrag:n,ondragend:a}=oe.get(e);G(r,o)&&(Y(e,"dropopen",{relatedTarget:r}),r.addEventListener("drag",n),r.addEventListener("dragend",a,{once:!0}))}}function ae(e){return t=>{const r=t.shftTarget,{accepts:o,content:n}=oe.get(e);G(r,o)&&(Q(e,r)?(n.has(r)||(n.add(r),Y(e,"dragenter",X(t,{relatedTarget:r}))),Y(e,"dragover",X(t,{relatedTarget:r}))):n.has(r)&&(n.delete(r),Y(e,"dragleave",X(t,{relatedTarget:r}))))}}function ie(e){return t=>{const r=t.shftTarget,{ondrag:o}=oe.get(e);Y(e,"dropclose",X(t,{relatedTarget:r})),r.removeEventListener("drag",o),Q(e,r)&&Y(e,"drop",X(t,{relatedTarget:r}))}}var se={drag:function(e){if(J(e,"drag"))return;const t={onmousedown:ee(e),onmousemove:te(e),onmouseup:re(e)};e.addEventListener("mousedown",t.onmousedown),Z.set(e,t)},drop:function(e,t){if(J(e,"drop"))return;const{accepts:r,overlap:o}=Object.assign({accepts:null,overlap:.5},t||{}),n={content:new WeakSet,ondragstart:ne(e),ondrag:ae(e),ondragend:ie(e),accepts:r,overlap:o};document.addEventListener("dragstart",n.ondragstart),oe.set(e,n)},util:{clear:function(e){const{drags:t,drops:r}=_;if(t.has(e)){const{onmousedown:r,onmousemove:o,onmouseup:n}=t.get(e);e.removeEventListener("mousedown",r),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)}if(r.has(e)){const{ondragstart:t,ondrag:o,ondragend:n}=r.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",o),document.removeEventListener("dragend",n)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(r=>{let o=parseFloat(t.style[r])||0;o+="left"===r?e.movementX:e.movementY,t.style[r]=o+"px"})},is:J,matches:G},_GLOBAL:_};const{drag:ce}=se,le=r`
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
`,de={min:P("min",0),max:P("max",100),step:P("step",1),value:Object.assign(Object.assign({},P("value",0)),{observe:(e,t)=>{i(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}})},ue=(e,{clientX:t})=>{const r=t-e.getBoundingClientRect().left,{min:o,max:n,step:a,clientWidth:i}=e;e.value=$(o,n,L(a,S(0,i,o,n,r)))},fe=a("ue-slider",Object.assign(Object.assign({},de),{render:j(e=>{const{min:t,max:o,value:n,clientWidth:a}=e;return r`
        ${H} ${le}
        <div
            class="slider-bar"
            @drag=${t=>ue(e,t)}
            @mousedown=${t=>ue(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${$(0,a,S(t,o,0,a,n))}px) translateX(-50%);"
            ></div>
        </div>
        ${O(()=>{((e,t=document,r=1e3)=>new Promise((o,n)=>{let a;const i=setTimeout(()=>{a=!0},r);!function r(){if(a)return n();let s=t.querySelector(e);if(s)return clearTimeout(i),o(s);requestAnimationFrame(r)}()}))(".slider-bar",e.shadowRoot).then(ce).catch(console.log)})}
    `})})),pe={arrow:o`
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
`},me=r`
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
`,he=a("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:j(e=>r`
        ${me} ${pe[e.shape]}
    `)})),ve={_ue_item:!0,active:P("active",!0),selected:P("selected",!1)},be=Object.assign(Object.assign({},ve),{value:P("value",""),render:j(()=>r`<slot></slot>`)}),ge=Object.assign(Object.assign({},ve),{icon:P("icon",""),label:P("label",""),render:j(({active:e})=>r`${e?r`<slot></slot>`:r``}`)}),ye={items:s(e=>void 0!==e._ue_item),selected:({items:e})=>e.filter(e=>e.selected),active:({items:e})=>e.filter(e=>e.active),selectedIdx:({items:e})=>e.filter(e=>e.selected).map(t=>e.indexOf(t)),activeIdx:({items:e})=>e.filter(e=>e.active).map(t=>e.indexOf(t))},we=a("ue-list-item",be),xe=a("ue-content-item",ge),Oe={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,r)=>e.selected=r===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:r}=e;console.log("changed to "+t),r[t]&&i(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:r[t].label,item:r[t]}})}},je={items:s(e=>e.ueItem)},ke=Object.assign(Object.assign({},je),{preselect:P("preselect",0),selected:Oe,selectedItem:({items:e})=>e.find(e=>e.selected)}),Ee=k((e,t)=>r`
            ${t.items.map(e(t))}
        `)(e=>({selected:t,innerText:o},n)=>r`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=n}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${n}">${o}</slot>
    </ue-button>
`),Me=Object.assign(Object.assign({},ke),{location:P("location","left")}),$e=r`
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
`,Le=a("ue-tab-group",Object.assign(Object.assign({},Me),{render:j(e=>r`
        ${$e}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${Ee(e)}
        </div>
        <slot></slot>
    `)})),Se=Object.assign(Object.assign({},ke),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return r=document,o="click",n=()=>{e.open=!1},a={once:!0},r.addEventListener(o,n,a),()=>r.removeEventListener(o,n,a);var r,o,n,a}}}),Te=r`
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
`,De={border:"1px solid transparent"},Pe={border:"1px solid var(--ue-active-bg-color)"},Ae=a("ue-dropdown",Object.assign(Object.assign({},Se),{render:j(e=>{const{open:t,selectedItem:o}=e;return r`
        ${Te}
        <div class="container" style=${w(t?Pe:De)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${o?o.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${w(t?Pe:De)}>
                    ${Ee(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),We={for:P("for",""),target:{get:e=>e.for?document.querySelector(e.for):e.parentElement,connect:e=>c(e.target,{content:e.firstChild,allowHTML:!0,followCursor:"initial",interactive:!0,trigger:"click"}).destroy}},qe=a("ue-tooltip",Object.assign(Object.assign({},We),{render:j(()=>r`
    <style>
        div {
            height: auto;
            width: auto;
            position: fixed;
            border: 1px solid black;
            background-color: var(--ue-bg-color);
        }
    </style>
`)})),Be={value:Object.assign(Object.assign({},P("value",0)),{observe:(e,t,r)=>{t!==r&&i(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:P("duration",1),delay:P("delay",0)},Ne=a("ue-progress-bar",Object.assign(Object.assign({},Be),{render:j(e=>{const{value:t,duration:o,delay:n}=e;return r`
        ${H}
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
                width: ${$(0,100,t)}%;
                transition: width ${$(0,1/0,o)}s ease
                    ${$(0,1/0,n)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{i(e,"updated")}}
            ></div>
        </div>
    `})})),He=Object.assign(Object.assign({},ke),{direction:P("direction","column")}),Ve=r`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,Ce=a("ue-select-grp",Object.assign(Object.assign({},He),{render:j(e=>r`
                ${Ve}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${Ee(e)}
                </div>
            `)})),Ie={open:!1,direction:P("direction","right"),duration:P("duration",.2)},Re=r`
    <style>
        :host {
            display: block;
            overflow: hidden;
            position: absolute;
        }

        .left {
            transform: translate(110%, 0);
            flex-direction: row-reverse;
        }

        .right {
            transform: translate(-110%, 0);
            flex-direction: row;
        }

        .down {
            transform: translate(0, -110%);
            flex-direction: column;
        }

        .right {
            transform: translate(0, 110%);
            flex-direction: column-reverse;
        }

        div {
            display: flex;
            align-items: center;
        }

        .open {
            transform: translate(0, 0);
        }
    </style>
`,_e=a("ue-drawer",Object.assign(Object.assign({},Ie),{render:j(({direction:e,duration:t,open:o})=>r`
        ${Re}
        <div
            class=${g({open:o,[e]:!0})}
            style="transition: transform ${t}s;"
        >
            <slot></slot>
        </div>
    `)})),Fe=Object.assign(Object.assign({},ye),{multi:P("multi",!1)}),Xe=a("ue-list",Object.assign(Object.assign({},Fe),{render:j(e=>r`
        ${H}
        <div>
            ${e.items.map(t=>r`
                        <ue-button .checked=${t.selected} @click=${()=>((e,t)=>{e.multi?t.selected=!t.selected:e.items.forEach(e=>{e.selected=e===t}),i(e,"changed",{bubbles:!0,composed:!0,detail:e})})(e,t)}
                            >${t.innerText}</ue-button
                        >
                    `)}
        </div>
    `)}));function Ye(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function ze(e){if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t?t.defaultView:window}return e}function Ke(e){var t=ze(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ue(e){return e instanceof ze(e).Element||e instanceof Element}function Ge(e){return e instanceof ze(e).HTMLElement||e instanceof HTMLElement}function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Qe(e){return(Ue(e)?e.ownerDocument:e.document).documentElement}function Ze(e){return Ye(Qe(e)).left+Ke(e).scrollLeft}function et(e){return ze(e).getComputedStyle(e)}function tt(e){var t=et(e),r=t.overflow,o=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+n+o)}function rt(e,t,r){void 0===r&&(r=!1);var o,n,a=Qe(t),i=Ye(e),s={scrollLeft:0,scrollTop:0},c={x:0,y:0};return r||(("body"!==Je(t)||tt(a))&&(s=(o=t)!==ze(o)&&Ge(o)?{scrollLeft:(n=o).scrollLeft,scrollTop:n.scrollTop}:Ke(o)),Ge(t)?((c=Ye(t)).x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Ze(a))),{x:i.left+s.scrollLeft-c.x,y:i.top+s.scrollTop-c.y,width:i.width,height:i.height}}function ot(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function nt(e){return"html"===Je(e)?e:e.assignedSlot||e.parentNode||e.host||Qe(e)}function at(e,t){void 0===t&&(t=[]);var r=function e(t){return["html","body","#document"].indexOf(Je(t))>=0?t.ownerDocument.body:Ge(t)&&tt(t)?t:e(nt(t))}(e),o="body"===Je(r),n=ze(r),a=o?[n].concat(n.visualViewport||[],tt(r)?r:[]):r,i=t.concat(a);return o?i:i.concat(at(nt(a)))}function it(e){return["table","td","th"].indexOf(Je(e))>=0}function st(e){return Ge(e)&&"fixed"!==et(e).position?e.offsetParent:null}function ct(e){for(var t=ze(e),r=st(e);r&&it(r);)r=st(r);return r&&"body"===Je(r)&&"static"===et(r).position?t:r||t}var lt="top",dt="bottom",ut="right",ft="left",pt=[lt,dt,ut,ft],mt=pt.reduce((function(e,t){return e.concat([t+"-start",t+"-end"])}),[]),ht=[].concat(pt,["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]),vt=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function bt(e){var t=new Map,r=new Set,o=[];return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){r.has(e.name)||function e(n){r.add(n.name),[].concat(n.requires||[],n.requiresIfExists||[]).forEach((function(o){if(!r.has(o)){var n=t.get(o);n&&e(n)}})),o.push(n)}(e)})),o}function gt(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return[].concat(r).reduce((function(e,t){return e.replace(/%s/,t)}),e)}var yt='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',wt=["name","enabled","phase","fn","effect","requires","options"];function xt(e){return e.split("-")[0]}var Ot="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",jt={placement:"bottom",modifiers:[],strategy:"absolute"};function kt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Et(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,n=t.defaultOptions,a=void 0===n?jt:n;return function(e,t,r){void 0===r&&(r=a);var n,i,s={placement:"bottom",orderedModifiers:[],options:Object.assign({},jt,{},a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,d={state:s,setOptions:function(r){u(),s.options=Object.assign({},a,{},s.options,{},r),s.scrollParents={reference:Ue(e)?at(e):e.contextElement?at(e.contextElement):[],popper:at(t)};var n,i,l,f=function(e){var t=bt(e);return vt.reduce((function(e,r){return e.concat(t.filter((function(e){return e.phase===r})))}),[])}(function(e){var t=e.reduce((function(e,t){var r=e[t.name];return e[t.name]=r?Object.assign({},r,{},t,{options:Object.assign({},r.options,{},t.options),data:Object.assign({},r.data,{},t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(o,s.options.modifiers)));if(s.orderedModifiers=f.filter((function(e){return e.enabled})),"production"!==process.env.NODE_ENV){if(function(e){e.forEach((function(t){Object.keys(t).forEach((function(r){switch(r){case"name":"string"!=typeof t.name&&console.error(gt(yt,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":"boolean"!=typeof t.enabled&&console.error(gt(yt,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));case"phase":vt.indexOf(t.phase)<0&&console.error(gt(yt,t.name,'"phase"',"either "+vt.join(", "),'"'+String(t.phase)+'"'));break;case"fn":"function"!=typeof t.fn&&console.error(gt(yt,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":"function"!=typeof t.effect&&console.error(gt(yt,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":Array.isArray(t.requires)||console.error(gt(yt,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(gt(yt,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+wt.map((function(e){return'"'+e+'"'})).join(", ")+'; but "'+r+'" was provided.')}t.requires&&t.requires.forEach((function(r){null==e.find((function(e){return e.name===r}))&&console.error(gt('Popper: modifier "%s" requires "%s", but "%s" modifier is not available',String(t.name),r,r))}))}))}))}((n=[].concat(f,s.options.modifiers),i=function(e){return e.name},l=new Set,n.filter((function(e){var t=i(e);if(!l.has(t))return l.add(t),!0})))),"auto"===xt(s.options.placement))s.orderedModifiers.find((function(e){return"flip"===e.name}))||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" "));var p=et(t);[p.marginTop,p.marginRight,p.marginBottom,p.marginLeft].some((function(e){return parseFloat(e)}))&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" "))}return s.orderedModifiers.forEach((function(e){var t=e.name,r=e.options,o=void 0===r?{}:r,n=e.effect;if("function"==typeof n){var a=n({state:s,name:t,instance:d,options:o});c.push(a||function(){})}})),d.update()},forceUpdate:function(){if(!l){var e=s.elements,t=e.reference,r=e.popper;if(kt(t,r)){s.rects={reference:rt(t,ct(r),"fixed"===s.options.strategy),popper:ot(r)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach((function(e){return s.modifiersData[e.name]=Object.assign({},e.data)}));for(var o=0,n=0;n<s.orderedModifiers.length;n++){if("production"!==process.env.NODE_ENV&&(o+=1)>100){console.error("Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.");break}if(!0!==s.reset){var a=s.orderedModifiers[n],i=a.fn,c=a.options,u=void 0===c?{}:c,f=a.name;"function"==typeof i&&(s=i({state:s,options:u,name:f,instance:d})||s)}else s.reset=!1,n=-1}}else"production"!==process.env.NODE_ENV&&console.error(Ot)}},update:(n=function(){return new Promise((function(e){d.forceUpdate(),e(s)}))},function(){return i||(i=new Promise((function(e){Promise.resolve().then((function(){i=void 0,e(n())}))}))),i}),destroy:function(){u(),l=!0}};if(!kt(e,t))return"production"!==process.env.NODE_ENV&&console.error(Ot),d;function u(){c.forEach((function(e){return e()})),c=[]}return d.setOptions(r).then((function(e){!l&&r.onFirstUpdate&&r.onFirstUpdate(e)})),d}}var Mt={passive:!0};function $t(e){return e.split("-")[1]}function Lt(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function St(e){var t,r=e.reference,o=e.element,n=e.placement,a=n?xt(n):null,i=n?$t(n):null,s=r.x+r.width/2-o.width/2,c=r.y+r.height/2-o.height/2;switch(a){case lt:t={x:s,y:r.y-o.height};break;case dt:t={x:s,y:r.y+r.height};break;case ut:t={x:r.x+r.width,y:c};break;case ft:t={x:r.x-o.width,y:c};break;default:t={x:r.x,y:r.y}}var l=a?Lt(a):null;if(null!=l){var d="y"===l?"height":"width";switch(i){case"start":t[l]=Math.floor(t[l])-Math.floor(r[d]/2-o[d]/2);break;case"end":t[l]=Math.floor(t[l])+Math.ceil(r[d]/2-o[d]/2)}}return t}var Tt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Dt(e){var t,r=e.popper,o=e.popperRect,n=e.placement,a=e.offsets,i=e.position,s=e.gpuAcceleration,c=e.adaptive,l=function(e){var t=e.x,r=e.y,o=window.devicePixelRatio||1;return{x:Math.round(t*o)/o||0,y:Math.round(r*o)/o||0}}(a),d=l.x,u=l.y,f=a.hasOwnProperty("x"),p=a.hasOwnProperty("y"),m=ft,h=lt,v=window;if(c){var b=ct(r);b===ze(r)&&(b=Qe(r)),n===lt&&(h=dt,u-=b.clientHeight-o.height,u*=s?1:-1),n===ft&&(m=ut,d-=b.clientWidth-o.width,d*=s?1:-1)}var g,y=Object.assign({position:i},c&&Tt);return s?Object.assign({},y,((g={})[h]=p?"0":"",g[m]=f?"0":"",g.transform=(v.devicePixelRatio||1)<2?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",g)):Object.assign({},y,((t={})[h]=p?u+"px":"",t[m]=f?d+"px":"",t.transform="",t))}var Pt={left:"right",right:"left",bottom:"top",top:"bottom"};function At(e){return e.replace(/left|right|bottom|top/g,(function(e){return Pt[e]}))}var Wt={start:"end",end:"start"};function qt(e){return e.replace(/start|end/g,(function(e){return Wt[e]}))}function Bt(e){return parseFloat(e)||0}function Nt(e){var t=ze(e),r=function(e){var t=Ge(e)?et(e):{};return{top:Bt(t.borderTopWidth),right:Bt(t.borderRightWidth),bottom:Bt(t.borderBottomWidth),left:Bt(t.borderLeftWidth)}}(e),o="html"===Je(e),n=Ze(e),a=e.clientWidth+r.right,i=e.clientHeight+r.bottom;return o&&t.innerHeight-e.clientHeight>50&&(i=t.innerHeight-r.bottom),{top:o?0:e.clientTop,right:e.clientLeft>r.left?r.right:o?t.innerWidth-a-n:e.offsetWidth-a,bottom:o?t.innerHeight-i:e.offsetHeight-i,left:o?n:e.clientLeft}}function Ht(e,t){var r=Boolean(t.getRootNode&&t.getRootNode().host);if(e.contains(t))return!0;if(r){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function Vt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Ct(e,t){return"viewport"===t?Vt(function(e){var t=ze(e),r=t.visualViewport,o=t.innerWidth,n=t.innerHeight;return r&&/iPhone|iPod|iPad/.test(navigator.platform)&&(o=r.width,n=r.height),{width:o,height:n,x:0,y:0}}(e)):Ge(t)?Ye(t):Vt(function(e){var t=ze(e),r=Ke(e),o=rt(Qe(e),t);return o.height=Math.max(o.height,t.innerHeight),o.width=Math.max(o.width,t.innerWidth),o.x=-r.scrollLeft,o.y=-r.scrollTop,o}(Qe(e)))}function It(e,t,r){var o="clippingParents"===t?function(e){var t=at(e),r=["absolute","fixed"].indexOf(et(e).position)>=0&&Ge(e)?ct(e):e;return Ue(r)?t.filter((function(e){return Ue(e)&&Ht(e,r)})):[]}(e):[].concat(t),n=[].concat(o,[r]),a=n[0],i=n.reduce((function(t,r){var o=Ct(e,r),n=Nt(Ge(r)?r:Qe(e));return t.top=Math.max(o.top+n.top,t.top),t.right=Math.min(o.right-n.right,t.right),t.bottom=Math.min(o.bottom-n.bottom,t.bottom),t.left=Math.max(o.left+n.left,t.left),t}),Ct(e,a));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}function Rt(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},{},e)}function _t(e,t){return t.reduce((function(t,r){return t[r]=e,t}),{})}function Ft(e,t){void 0===t&&(t={});var r=t,o=r.placement,n=void 0===o?e.placement:o,a=r.boundary,i=void 0===a?"clippingParents":a,s=r.rootBoundary,c=void 0===s?"viewport":s,l=r.elementContext,d=void 0===l?"popper":l,u=r.altBoundary,f=void 0!==u&&u,p=r.padding,m=void 0===p?0:p,h=Rt("number"!=typeof m?m:_t(m,pt)),v="popper"===d?"reference":"popper",b=e.elements.reference,g=e.rects.popper,y=e.elements[f?v:d],w=It(Ue(y)?y:y.contextElement||Qe(e.elements.popper),i,c),x=Ye(b),O=St({reference:x,element:g,strategy:"absolute",placement:n}),j=Vt(Object.assign({},g,{},O)),k="popper"===d?j:x,E={top:w.top-k.top+h.top,bottom:k.bottom-w.bottom+h.bottom,left:w.left-k.left+h.left,right:k.right-w.right+h.right},M=e.modifiersData.offset;if("popper"===d&&M){var $=M[n];Object.keys(E).forEach((function(e){var t=[ut,dt].indexOf(e)>=0?1:-1,r=[lt,dt].indexOf(e)>=0?"y":"x";E[e]+=$[r]*t}))}return E}function Xt(e,t){void 0===t&&(t={});var r=t,o=r.placement,n=r.boundary,a=r.rootBoundary,i=r.padding,s=r.flipVariations,c=r.allowedAutoPlacements,l=void 0===c?ht:c,d=$t(o),u=(d?s?mt:mt.filter((function(e){return $t(e)===d})):pt).filter((function(e){return l.indexOf(e)>=0})).reduce((function(t,r){return t[r]=Ft(e,{placement:r,boundary:n,rootBoundary:a,padding:i})[xt(r)],t}),{});return Object.keys(u).sort((function(e,t){return u[e]-u[t]}))}function Yt(e,t,r){return Math.max(e,Math.min(t,r))}function zt(e,t,r){return void 0===r&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Kt(e){return[lt,ut,dt,ft].some((function(t){return e[t]>=0}))}var Ut=Et({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,r=e.instance,o=e.options,n=o.scroll,a=void 0===n||n,i=o.resize,s=void 0===i||i,c=ze(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&l.forEach((function(e){e.addEventListener("scroll",r.update,Mt)})),s&&c.addEventListener("resize",r.update,Mt),function(){a&&l.forEach((function(e){e.removeEventListener("scroll",r.update,Mt)})),s&&c.removeEventListener("resize",r.update,Mt)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,r=e.name;t.modifiersData[r]=St({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,r=e.options,o=r.gpuAcceleration,n=void 0===o||o,a=r.adaptive,i=void 0===a||a;if("production"!==process.env.NODE_ENV){var s=et(t.elements.popper).transitionProperty||"";i&&["transform","top","right","bottom","left"].some((function(e){return s.indexOf(e)>=0}))&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',"\n\n",'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.","\n\n","We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "))}var c={placement:xt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,{},Dt(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,{},Dt(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var r=t.styles[e]||{},o=t.attributes[e]||{},n=t.elements[e];Ge(n)&&Je(n)&&(Object.assign(n.style,r),Object.keys(o).forEach((function(e){var t=o[e];!1===t?n.removeAttribute(e):n.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],n=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:r[e]).reduce((function(e,t){return e[t]="",e}),{});Ge(o)&&Je(o)&&(Object.assign(o.style,a),Object.keys(n).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,r=e.options,o=e.name,n=r.offset,a=void 0===n?[0,0]:n,i=ht.reduce((function(e,r){return e[r]=function(e,t,r){var o=xt(e),n=[ft,lt].indexOf(o)>=0?-1:1,a="function"==typeof r?r(Object.assign({},t,{placement:e})):r,i=a[0],s=a[1];return i=i||0,s=(s||0)*n,[ft,ut].indexOf(o)>=0?{x:s,y:i}:{x:i,y:s}}(r,t.rects,a),e}),{}),s=i[t.placement],c=s.x,l=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[o]=i}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var n=r.mainAxis,a=void 0===n||n,i=r.altAxis,s=void 0===i||i,c=r.fallbackPlacements,l=r.padding,d=r.boundary,u=r.rootBoundary,f=r.altBoundary,p=r.flipVariations,m=void 0===p||p,h=r.allowedAutoPlacements,v=t.options.placement,b=xt(v),g=c||(b===v||!m?[At(v)]:function(e){if("auto"===xt(e))return[];var t=At(e);return[qt(e),t,qt(t)]}(v)),y=[v].concat(g).reduce((function(e,r){return e.concat("auto"===xt(r)?Xt(t,{placement:r,boundary:d,rootBoundary:u,padding:l,flipVariations:m,allowedAutoPlacements:h}):r)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,k=y[0],E=0;E<y.length;E++){var M=y[E],$=xt(M),L="start"===$t(M),S=[lt,dt].indexOf($)>=0,T=S?"width":"height",D=Ft(t,{placement:M,boundary:d,rootBoundary:u,altBoundary:f,padding:l}),P=S?L?ut:ft:L?dt:lt;w[T]>x[T]&&(P=At(P));var A=At(P),W=[];if(a&&W.push(D[$]<=0),s&&W.push(D[P]<=0,D[A]<=0),W.every((function(e){return e}))){k=M,j=!1;break}O.set(M,W)}if(j)for(var q=function(e){var t=y.find((function(t){var r=O.get(t);if(r)return r.slice(0,e).every((function(e){return e}))}));if(t)return k=t,"break"},B=m?3:1;B>0;B--){if("break"===q(B))break}t.placement!==k&&(t.modifiersData[o]._skip=!0,t.placement=k,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,o=e.name,n=r.mainAxis,a=void 0===n||n,i=r.altAxis,s=void 0!==i&&i,c=r.boundary,l=r.rootBoundary,d=r.altBoundary,u=r.padding,f=r.tether,p=void 0===f||f,m=r.tetherOffset,h=void 0===m?0:m,v=Ft(t,{boundary:c,rootBoundary:l,padding:u,altBoundary:d}),b=xt(t.placement),g=$t(t.placement),y=!g,w=Lt(b),x="x"===w?"y":"x",O=t.modifiersData.popperOffsets,j=t.rects.reference,k=t.rects.popper,E="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,M={x:0,y:0};if(O){if(a){var $="y"===w?lt:ft,L="y"===w?dt:ut,S="y"===w?"height":"width",T=O[w],D=O[w]+v[$],P=O[w]-v[L],A=p?-k[S]/2:0,W="start"===g?j[S]:k[S],q="start"===g?-k[S]:-j[S],B=t.elements.arrow,N=p&&B?ot(B):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},V=H[$],C=H[L],I=Yt(0,j[S],N[S]),R=y?j[S]/2-A-I-V-E:W-I-V-E,_=y?-j[S]/2+A+I+C+E:q+I+C+E,F=t.elements.arrow&&ct(t.elements.arrow),X=F?"y"===w?F.clientTop||0:F.clientLeft||0:0,Y=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,z=O[w]+R-Y-X,K=O[w]+_-Y,U=Yt(p?Math.min(D,z):D,T,p?Math.max(P,K):P);O[w]=U,M[w]=U-T}if(s){var G="x"===w?lt:ft,J="x"===w?dt:ut,Q=O[x],Z=Yt(Q+v[G],Q,Q-v[J]);O[x]=Z,M[x]=Z-Q}t.modifiersData[o]=M}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,r=e.state,o=e.name,n=r.elements.arrow,a=r.modifiersData.popperOffsets,i=xt(r.placement),s=Lt(i),c=[ft,ut].indexOf(i)>=0?"height":"width";if(n&&a){var l=r.modifiersData[o+"#persistent"].padding,d=ot(n),u="y"===s?lt:ft,f="y"===s?dt:ut,p=r.rects.reference[c]+r.rects.reference[s]-a[s]-r.rects.popper[c],m=a[s]-r.rects.reference[s],h=ct(n),v=h?"y"===s?h.clientHeight||0:h.clientWidth||0:0,b=p/2-m/2,g=l[u],y=v-d[c]-l[f],w=v/2-d[c]/2+b,x=Yt(g,w,y),O=s;r.modifiersData[o]=((t={})[O]=x,t.centerOffset=x-w,t)}},effect:function(e){var t=e.state,r=e.options,o=e.name,n=r.element,a=void 0===n?"[data-popper-arrow]":n,i=r.padding,s=void 0===i?0:i;null!=a&&("string"!=typeof a||(a=t.elements.popper.querySelector(a)))&&("production"!==process.env.NODE_ENV&&(Ge(a)||console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).',"To use an SVG arrow, wrap it in an HTMLElement that will be used as","the arrow."].join(" "))),Ht(t.elements.popper,a)?(t.elements.arrow=a,t.modifiersData[o+"#persistent"]={padding:Rt("number"!=typeof s?s:_t(s,pt))}):"production"!==process.env.NODE_ENV&&console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" ")))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,r=e.name,o=t.rects.reference,n=t.rects.popper,a=t.modifiersData.preventOverflow,i=Ft(t,{elementContext:"reference"}),s=Ft(t,{altBoundary:!0}),c=zt(i,o),l=zt(s,n,a),d=Kt(c),u=Kt(l);t.modifiersData[r]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:d,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":u})}}]});Object.assign(window,{createPopper:Ut});export{R as UeButton,xe as UeContentItem,_e as UeDrawer,Ae as UeDropdown,he as UeIcon,Xe as UeList,we as UeListItem,Ne as UeProgressBar,Ce as UeSelectGrp,fe as UeSlider,Le as UeTabGroup,N as UeText,qe as UeTooltip,W as shadowStyle};
