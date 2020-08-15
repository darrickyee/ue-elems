var UE_ELEMS=function(e){"use strict";
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
     */const t=new WeakMap,r=e=>(...r)=>{const n=e(...r);return t.set(n,!0),n},n=e=>"function"==typeof e&&t.has(e),o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},a={},s={},c=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${c}--\x3e`,l=new RegExp(`${c}|${u}`);class d{constructor(e,t){this.parts=[],this.element=t;const r=[],n=[],o=document.createTreeWalker(t.content,133,null,!1);let i=0,a=-1,s=0;const{strings:u,values:{length:d}}=e;for(;s<d;){const e=o.nextNode();if(null!==e){if(a++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let n=0;for(let e=0;e<r;e++)f(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=u[s],r=v.exec(t)[2],n=r.toLowerCase()+"$lit$",o=e.getAttribute(n);e.removeAttribute(n);const i=o.split(l);this.parts.push({type:"attribute",index:a,name:r,strings:i}),s+=i.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(c)>=0){const n=e.parentNode,o=t.split(l),i=o.length-1;for(let t=0;t<i;t++){let r,i=o[t];if(""===i)r=h();else{const e=v.exec(i);null!==e&&f(e[2],"$lit$")&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),r=document.createTextNode(i)}n.insertBefore(r,e),this.parts.push({type:"node",index:++a})}""===o[i]?(n.insertBefore(h(),e),r.push(e)):e.data=o[i],s+=i}}else if(8===e.nodeType)if(e.data===c){const t=e.parentNode;null!==e.previousSibling&&a!==i||(a++,t.insertBefore(h(),e)),i=a,this.parts.push({type:"node",index:a}),null===e.nextSibling?e.data="":(r.push(e),a--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(c,t+1));)this.parts.push({type:"node",index:-1}),s++}}else o.currentNode=n.pop()}for(const e of r)e.parentNode.removeChild(e)}}const f=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},p=e=>-1!==e.index,h=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class b{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],r=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,a=0,s=0,c=n.nextNode();for(;a<r.length;)if(i=r[a],p(i)){for(;s<i.index;)s++,"TEMPLATE"===c.nodeName&&(t.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=t.pop(),c=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));a++}else this.__parts.push(void 0),a++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const m=` ${c} `;class g{constructor(e,t,r,n){this.strings=e,this.values=t,this.type=r,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===e.indexOf("--\x3e",o+1);const i=v.exec(e);t+=null===i?e+(r?m:u):e.substr(0,i.index)+i[1]+i[2]+"$lit$"+i[3]+c}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class y extends g{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,r=t.firstChild;return t.removeChild(r),((e,t,r=null,n=null)=>{for(;t!==r;){const r=t.nextSibling;e.insertBefore(t,n),t=r}})(t,r.firstChild),e}}
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
     */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),E=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class O{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let r="";for(let n=0;n<t;n++){r+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(w(e)||!E(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||w(e)&&e===this.value||(this.value=e,n(e)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=h()),e.__insert(this.endNode=h())}insertAfterPart(e){e.__insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof g?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):E(e)?this.__commitIterable(e):e===s?(this.value=s,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const r=new b(t,e.processor,this.options),n=r._clone();r.update(e.values),this.__commitNode(n),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,n=0;for(const o of e)r=t[n],void 0===r&&(r=new j(this.options),t.push(r),0===n?r.appendIntoPart(this):r.insertAfterPart(t[n-1])),r.setValue(o),r.commit(),n++;n<t.length&&(t.length=n,this.clear(r&&r.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class _ extends O{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends x{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const M=new class{handleAttributeExpressions(e,t,r,n){const o=t[0];if("."===o){return new _(e,t.slice(1),r).parts}if("@"===o)return[new T(e,t.slice(1),n.eventContext)];if("?"===o)return[new S(e,t.slice(1),r)];return new O(e,t,r).parts}handleTextExpression(e){return new j(e)}};
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
     */function P(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(c);return r=t.keyString.get(n),void 0===r&&(r=new d(e,e.getTemplateElement()),t.keyString.set(n,r)),t.stringsArray.set(e.strings,r),r}const $=new Map,C=new WeakMap;
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const L=(e,...t)=>new g(e,t,"html",M);
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
class V{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const D=new WeakMap,W=r(e=>t=>{if(!(t instanceof x)||t instanceof N||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:n}=r;let o=D.get(t);void 0===o&&(n.setAttribute("class",r.strings.join(" ")),D.set(t,o=new Set));const i=n.classList||new V(n);o.forEach(t=>{t in e||(i.remove(t),o.delete(t))});for(const t in e){const r=e[t];r!=o.has(t)&&(r?(i.add(t),o.add(t)):(i.remove(t),o.delete(t)))}"function"==typeof i.commit&&i.commit()}),z=new WeakMap,R=r(e=>t=>{if(!(t instanceof x)||t instanceof N||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:n}=r.element;let o=z.get(t);void 0===o&&(n.cssText=r.strings.join(" "),z.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?n[t]=null:n.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?n[t]=e[t]:n.setProperty(t,e[t])}),I=(e,t={})=>r=>{const n=e(r);return(e,r)=>((e,t,r)=>{let n=C.get(t);void 0===n&&(i(t,t.firstChild),C.set(t,n=new j(Object.assign({templateFactory:P},r))),n.appendInto(t)),n.setValue(e),n.commit()})(n,r,t)};function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){H(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var U=new Map;function X(e){var t=U.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),U.set(e,t)),t}function q(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,F({bubbles:!1},r)))}function Y(e,t){var r=window.ShadyCSS;return r&&!r.nativeShadow?e(r):t}var G="ActiveXObject"in window,J=new WeakMap;function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Z=function(e){return e},Q=function(e){if("object"!==K(e))throw TypeError("Assigned value must be an object: ".concat(K(e)));return e&&Object.freeze(e)};function ee(e,t){var r=K(e),n=Z;switch(r){case"string":n=String;break;case"number":n=Number;break;case"boolean":n=Boolean;break;case"function":e=(n=e)();break;case"object":e&&Object.freeze(e),n=Q}return{get:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return r},set:function(e,t,r){return n(t,r)},connect:"object"!==r&&"undefined"!==r?function(r,o,i){if(r[o]===e){var a=X(o);if(r.hasAttribute(a)){var s=r.getAttribute(a);r[o]=""===s&&n===Boolean||s}}return t&&t(r,o,i)}:t}}function te(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function re(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?te(Object(r),!0).forEach((function(t){ne(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):te(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ne(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function oe(e){return(oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var ie=new WeakMap,ae=new Set;function se(){try{ae.forEach((function(e){try{ie.get(e)(),ae.delete(e)}catch(t){throw ae.delete(e),t}}))}catch(e){throw ae.size&&se(),e}}function ce(e){ae.size||requestAnimationFrame(se),ae.add(e)}var ue=new WeakMap;function le(e,t){var r=ue.get(e);r||(r=new Map,ue.set(e,r));var n=r.get(t);return n||(n={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},r.set(t,n)),n}function de(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function fe(e){e.observed&&ce(e),e.contexts&&e.contexts.forEach(fe)}var pe=new Set;function he(e,t,r,n){var o=le(e,t);if(pe.size&&pe.has(o))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(pe.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(o),e.observed&&(o.contexts||(o.contexts=new Set),o.contexts.add(e))})),(n&&n(o.value)||!n)&&o.checksum&&o.checksum===de(o))return o.value;try{pe.add(o),o.observed&&o.deps&&o.deps.size&&o.deps.forEach((function(e){e.contexts&&e.contexts.delete(o)})),o.deps=void 0;var i=r(e,o.value);o.deps&&o.deps.forEach((function(e){!function e(t,r){r&&r.forEach((function(r){t.deps.add(r),t.observed&&(r.contexts||(r.contexts=new Set),r.contexts.add(t)),e(t,r.deps)}))}(o,e.deps)})),i!==o.value&&(o.state+=1,o.value=i,fe(o)),o.checksum=de(o),pe.delete(o)}catch(e){throw o.checksum=0,pe.delete(o),pe.forEach((function(e){e.deps.delete(o),e.observed&&o.contexts.delete(e)})),e}return o.value}function ve(e,t,r,n){var o=le(e,t),i=r(e,n,o.value);i!==o.value&&(o.checksum=0,o.state+=1,o.value=i,fe(o))}var be=new Set;function me(e,t,r){e.checksum=0,e.state+=1,fe(e),r&&function(e){be.size||requestAnimationFrame((function(){be.forEach((function(e){(!e.contexts||e.contexts&&0===e.contexts.size)&&ue.get(e.target).delete(e.key)})),be.clear()})),be.add(e)}(e),t&&(e.value=void 0)}function ge(e,t,r,n){if(pe.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));me(le(e,t),r,n)}function ye(e,t,r){if(pe.size)throw Error("Invalidating all properties in chain of get calls is forbidden");var n=ue.get(e);n&&n.forEach((function(e){me(e,t,r)}))}function we(e,t,r,n){var o,i=le(e,t);i.observed=!0;var a=function(e,t){return ie.set(e,t),ce(e),function(){ae.delete(e),ie.delete(e)}}(i,(function(){var i=he(e,t,r);i!==o&&(n(e,i,o),o=i)}));return i.deps&&i.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(i)})),function(){a(),i.observed=!1,i.deps&&i.deps.size&&i.deps.forEach((function(e){e.contexts&&e.contexts.delete(i)}))}}function Ee(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Oe(e,t){return!t||"object"!==Te(t)&&"function"!=typeof t?xe(e):t}function xe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function je(e){var t="function"==typeof Map?new Map:void 0;return(je=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return Se(e,arguments,ke(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Ne(n,e)})(e)}function Se(e,t,r){return(Se=_e()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&Ne(o,r.prototype),o}).apply(null,arguments)}function _e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Ne(e,t){return(Ne=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ke(e){return(ke=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Te(e){return(Te="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{Ae.env.NODE_ENV}catch(e){var Ae={env:{NODE_ENV:"production"}}}var Me=function(e,t){return t},Pe=new WeakMap,$e=new WeakMap;function Ce(e,t){e.hybrids=t;var r=[],n=Object.keys(t);Pe.set(e,r),$e.set(e,n),n.forEach((function(n){var o,i=t[n],a=Te(i);o="function"===a?"render"===n?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(oe(e)));var r=re({shadowRoot:!0},t),n={mode:"open"};return"object"===oe(r.shadowRoot)&&Object.assign(n,r.shadowRoot),{get:function(t){var o=e(t),i=t;return r.shadowRoot&&(t.shadowRoot||t.attachShadow(n),i=t.shadowRoot),function(){return o(t,i),i}},observe:function(e,t){t()}}}(i):{get:i}:"object"!==a||null===i||Array.isArray(i)?ee(i):{get:i.get||Me,set:i.set||!i.get&&Me||void 0,connect:i.connect,observe:i.observe},Object.defineProperty(e.prototype,n,{get:function(){return he(this,n,o.get)},set:o.set&&function(e){ve(this,n,o.set,e)},enumerable:!0,configurable:"production"!==Ae.env.NODE_ENV}),o.observe&&r.unshift((function(e){return we(e,n,o.get,o.observe)})),o.connect&&r.push((function(e){return o.connect(e,n,(function(){ge(e,n)}))}))}))}var Le=new WeakMap;function Ve(e,t){var r=Te(t);if("object"!==r&&"function"!==r)throw TypeError("Second argument must be an object or a function: ".concat(r));if(null!==e){var n=window.customElements.get(e);if("function"===r)return n!==t?window.customElements.define(e,t):n;if(n){if(n.hybrids===t)return n;throw Error("Element '".concat(e,"' already defined"))}}var o=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ne(e,t)}(a,e);var t,r,n,o,i=(t=a,function(){var e,r=ke(t);if(_e()){var n=ke(this).constructor;e=Reflect.construct(r,arguments,n)}else e=r.apply(this,arguments);return Oe(this,e)});function a(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),e=i.call(this);for(var t=$e.get(a),r=0;r<t.length;r+=1){var n=t[r];if(Object.prototype.hasOwnProperty.call(xe(e),n)){var o=e[n];delete e[n],e[n]=o}}return e}return r=a,(n=[{key:"connectedCallback",value:function(){for(var e=Pe.get(a),t=[],r=0;r<e.length;r+=1){var n=e[r](this);n&&t.push(n)}Le.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Le.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&Ee(r.prototype,n),o&&Ee(r,o),a}(je(HTMLElement));return Ce(o,t),null!==e&&(Object.defineProperty(o,"name",{get:function(){return e}}),customElements.define(e,o)),o}function De(e){return Object.keys(e).reduce((function(t,r){var n=X(r.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[r]=Ve(n,e[r]),t}),{})}function We(){return"object"===Te(arguments.length<=0?void 0:arguments[0])&&null!==(arguments.length<=0?void 0:arguments[0])?De(arguments.length<=0?void 0:arguments[0]):Ve.apply(void 0,arguments)}function ze(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(n.push(e),r.deep&&r.nested&&ze(e,t,r,n)):r.deep&&ze(e,t,r,n)})),n}function Re(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},r="function"==typeof e?e:function(t){return t===e};return{get:function(e){return ze(e,r,t)},connect:function(e,r,n){var o=new MutationObserver(n);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}function Ie(e){return(Ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Be(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Fe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Be(Object(r),!0).forEach((function(t){He(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Be(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function He(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}try{Ue.env.NODE_ENV}catch(e){var Ue={env:{NODE_ENV:"production"}}}var Xe,qe="__store__connect__".concat(Date.now(),"__"),Ye=new WeakMap;function Ge(e,t,r){return r&&Ye.set(r,null),Ye.set(t,e),t}function Je(e,t,r){return Ge(e,t,r),(e.external&&t||!r||_t(t))&&e.invalidate(),t}function Ke(e,t,r,n){return ve(e,t,n?Je:Ge,r),r}function Ze(){return Xe||(Xe=Date.now(),requestAnimationFrame((function(){Xe=void 0}))),Xe}var Qe=new WeakMap;function et(e){var t=Qe.get(e);return t||(t=Ze(),Qe.set(e,t)),t}function tt(e){return Qe.set(e,Ze()),e}function rt(e){"function"==typeof e&&(e={get:e});var t=Fe({cache:!0},e);if(!1===t.cache||0===t.cache)t.validate=function(e){return!e||et(e)===Ze()};else if("number"==typeof t.cache)t.validate=function(e){return!e||et(e)+t.cache>Ze()};else if(!0!==t.cache)throw TypeError("Storage cache property must be a boolean or number: ".concat(Ie(t.cache)));return Object.freeze(t)}function nt(e){return{get:e.enumerable?function(){}:function(){return e.create({})},set:e.enumerable?function(e,t){return t}:function(e,t){return null===t?{id:e}:t},list:e.enumerable&&function(t){if(t)throw TypeError("Memory-based model definition does not support id");return(r=e,n=[],o=ue.get(r),o&&o.forEach((function(e){n.push(e)})),n).reduce((function(t,r){var n=r.key,o=r.value;return n===e||o&&!_t(o)&&t.push(n),t}),[]);var r,n,o}}}function ot(e,t){return Array.isArray(e)?function(e,t){var r=gt.get(e);if(r&&!r.enumerable&&!t&&r.nested)throw TypeError(ft(e,"Nested model definition cannot be used outside of the parent definition"));if(!r){var n=bt(e),o=new Set;if(o.add(n),!t){if(!n.enumerable)throw TypeError(ft(e,"Provided model definition does not support listing (it must be enumerable - set `id` property to `true`)"));if(!n.storage.list)throw TypeError(ft(e,"Provided model definition storage does not support `list` action"))}r={list:!0,nested:!n.enumerable&&t,model:e,contexts:o,enumerable:n.enumerable,storage:rt({cache:n.storage.cache,get:!t&&function(e){return n.storage.list(e)}}),placeholder:function(){return Object.freeze(Object.create(mt))},isInstance:function(e){return Object.getPrototypeOf(e)!==mt},create:function(t){var o=t.reduce((function(t,r){var o=r;if("object"===Ie(r)&&null!==r){o=r.id;var i=Ye.get(r),a=r;if(i){if(i.model!==e)throw TypeError("Model instance must match the definition")}else a=n.create(r),n.enumerable&&(o=a.id,Ke(n,o,a));n.enumerable||t.push(a)}else if(!n.enumerable)throw TypeError("Model instance must be an object: ".concat(Ie(r)));if(n.enumerable){var s=t.length;Object.defineProperty(t,s,{get:function(){return he(this,s,St(this)?pt:function(){return Et(e,o)})},enumerable:!0})}return t}),[]);return Ye.set(o,r),J.set(o,Mt),Object.freeze(o)}},gt.set(e,Object.freeze(r))}return r}(e[0],t):bt(e,t)}function it(e,t){switch(e){case"string":return function(e){return null!=e?String(e):""};case"number":return Number;case"boolean":return Boolean;default:throw TypeError("The value of the '".concat(t,"' must be a string, number or boolean: ").concat(e))}}var at=function(e,t){return t};function st(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;return ve(e,"state",at,{state:t,value:r}),e}var ct=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{state:"ready",value:e};return t};function ut(e){return he(e,"state",ct)}function lt(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,lt)}var dt=new WeakMap;function ft(e,t){return"".concat(t,":\n\n").concat(JSON.stringify(e,(function(e,t){if(e!==qe)return t}),2),"\n\n")}var pt=function(e,t){return t},ht=Promise.resolve(),vt=new WeakMap;function bt(e,t){if("object"!==Ie(e)||null===e)throw TypeError("Model definition must be an object: ".concat(Ie(e)));var r=vt.get(e);if(r&&!r.enumerable){if(t&&!r.nested)throw TypeError(ft(e,"Provided model definition for nested object already used as a root definition"));if(!t&&r.nested)throw TypeError(ft(e,"Nested model definition cannot be used outside of the parent definition"))}if(!r){var n,o=e[qe];"object"===Ie(o)&&Object.freeze(o);var i={},a=hasOwnProperty.call(e,"id"),s=new Map;(r={model:e,external:!!o,enumerable:a,nested:!a&&t,placeholder:function(e){return Object.freeze(Object.assign(Object.create(i),{id:e}))},isInstance:function(e){return Object.getPrototypeOf(e)!==i},invalidate:function(){n||(n=ht.then((function(){ge(r,r,!0),n=null})))},checks:s}).storage=rt(o||nt(r));var c=Object.keys(Object.freeze(e)).filter((function(e){return e!==qe})).map((function(t){if("id"!==t&&Object.defineProperty(i,t,{get:function(){throw Error("Model instance in ".concat(ut(this).state," state - use store.pending(), store.error(), or store.ready() guards"))},enumerable:!0}),"id"===t){if(!0!==e[t])throw TypeError("The 'id' property in model definition must be set to 'true' or not be defined");return function(e,t,r){var n;n=r?r.id:hasOwnProperty.call(t,"id")?String(t.id):lt(),Object.defineProperty(e,"id",{value:n,enumerable:!0})}}var n=function(e,t,r){var n=r.model[t],o=Ie(r.model[t]);if(n instanceof String||n instanceof Number){var i=dt.get(n);if(!i)throw TypeError(ft(e,"You must use primitive ".concat(Ie(n.valueOf())," value for '").concat(t,"' property of the provided model definition")));o=Ie(n=n.valueOf()),r.checks.set(t,i)}return{defaultValue:n,type:o}}(e,t,r),o=n.defaultValue,a=n.type;switch(a){case"function":return function(e){Object.defineProperty(e,t,{get:function(){return he(this,t,o)}})};case"object":if(null===o)throw TypeError("The value for the '".concat(t,"' must be an object instance: ").concat(o));if(Array.isArray(o)){var s=Ie(o[0]);if("object"!==s){var c=it(s,t),u=Object.freeze(o.map(c));return function(e,r,n){if(hasOwnProperty.call(r,t)){if(!Array.isArray(r[t]))throw TypeError("The value for '".concat(t,"' property must be an array: ").concat(Ie(r[t])));e[t]=Object.freeze(r[t].map(c))}else n&&hasOwnProperty.call(n,t)?e[t]=n[t]:e[t]=u}}var l=ot(o,!0);if(l.enumerable&&o[1]){var d=o[1];if("object"!==Ie(d))throw TypeError("Options for '".concat(t,"' array property must be an object instance: ").concat(Ie(d)));d.loose&&(r.contexts=r.contexts||new Set,r.contexts.add(ot(o[0])))}return function(e,r,n){if(hasOwnProperty.call(r,t)){if(!Array.isArray(r[t]))throw TypeError("The value for '".concat(t,"' property must be an array: ").concat(Ie(r[t])));e[t]=l.create(r[t])}else e[t]=n&&n[t]||!l.enumerable&&l.create(o)||[]}}var f=ot(o,!0);return f.enumerable||f.external?function(e,r,n){var i;if(hasOwnProperty.call(r,t)){var a=r[t];if("object"!==Ie(a)||null===a)null!=a&&(i={id:a});else{var s=Ye.get(a);if(s){if(s.model!==o)throw TypeError("Model instance must match the definition");i=a}else i=f.create(a),Ke(f,i.id,i)}}else i=n&&n[t];if(i){var c=i.id;Object.defineProperty(e,t,{get:function(){return he(this,t,St(this)?pt:function(){return Et(o,c)})},enumerable:!0})}else e[t]=void 0}:function(e,r,n){hasOwnProperty.call(r,t)?e[t]=f.create(r[t],n&&n[t]):e[t]=n?n[t]:f.create({})};default:var p=it(a,t);return function(e,r,n){hasOwnProperty.call(r,t)?e[t]=p(r[t]):n&&hasOwnProperty.call(n,t)?e[t]=n[t]:e[t]=o}}}));r.create=function(e,t){if(null===e)return null;if("object"!==Ie(e))throw TypeError("Model values must be an object instance: ".concat(e));var n=c.reduce((function(r,n){return n(r,e,t),r}),{});return Ye.set(n,r),J.set(n,Mt),Object.freeze(n)},Object.freeze(i),vt.set(e,Object.freeze(r))}return r}var mt=Object.getOwnPropertyNames(Array.prototype).reduce((function(e,t){return"length"===t||"constructor"===t||Object.defineProperty(e,t,{get:function(){throw Error("Model list instance in ".concat(ut(this).state," state - use store.pending(), store.error(), or store.ready() guards"))}}),e}),[]),gt=new WeakMap;function yt(e,t){return t||Ze()}function wt(e,t,r){return st(e,"error",t)}function Et(e,t){var r,n=ot(e);if(!n.storage.get)throw TypeError(ft(e,"Provided model definition does not support 'get' method"));if(n.enumerable){if(r=function(e){switch(Ie(e)){case"object":return JSON.stringify(Object.keys(e).sort().reduce((function(t,r){if("object"===Ie(e[r])&&null!==e[r])throw TypeError("You must use primitive value for '".concat(r,"' key: ").concat(Ie(e[r])));return t[r]=e[r],t}),{}));case"undefined":return;default:return String(e)}}(t),!n.list&&!r)throw TypeError(ft(e,'Provided model definition requires non-empty id: "'.concat(r,'"')))}else if(void 0!==t)throw TypeError(ft(e,"Provided model definition does not support id"));return he(n,r,(function(e,o){if(o&&St(o))return o;var i=!0;if(n.contexts&&n.contexts.forEach((function(e){he(e,e,yt)===Ze()&&(i=!1)})),i&&o&&(!0===n.storage.cache||n.storage.validate(o)))return o;try{var a=n.storage.get(t);if("object"!==Ie(a)||null===a)throw Error("Model instance ".concat(void 0!==r?"with '".concat(r,"' id"):""," does not exist: ").concat(a));return a instanceof Promise?(a=a.then((function(e){if("object"!==Ie(e)||null===e)throw Error("Model instance ".concat(void 0!==r?"with '".concat(r,"' id"):""," does not exist: ").concat(a));return Ke(n,r,n.create(r?Fe({},e,{id:r}):e))})).catch((function(e){return Ke(n,r,wt(o||n.placeholder(r),e))})),st(o||n.placeholder(r),"pending",a)):(o&&Ye.set(o,null),tt(n.create(r?Fe({},a,{id:r}):a)))}catch(e){return tt(wt(o||n.placeholder(r),e))}}),n.storage.validate)}var Ot=new WeakMap;function xt(e){var t=Object.keys(e),r=Error("Model validation failed (".concat(t.join(", "),") - read the details from 'errors' property"));return r.errors=e,r}function jt(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("object"!==Ie(e)||null===e)throw TypeError("The first argument must be a model instance or a model definition: ".concat(e));var r=Ye.get(e);if(null===r)throw Error("Provided model instance has expired. Haven't you used stale value from the outer scope?");if(r)ge(r,e.id,t,!0);else{if(!vt.get(e)&&!gt.get(e[0]))throw Error("Model definition must be used before - passed argument is probably not a model definition");ye(ot(e),t,!0)}}function St(e){if(null===e||"object"!==Ie(e))return!1;var t=ut(e),r=t.state,n=t.value;return"pending"===r&&n}function _t(e,t){if(null===e||"object"!==Ie(e))return!1;var r=ut(e),n=r.state,o=r.value,i="error"===n&&o;return i&&void 0!==t?i.errors&&i.errors[t]:i}function Nt(e){if(null===e||"object"!==Ie(e))return!1;var t=Ye.get(e);return!(!t||!t.isInstance(e))}function kt(e,t){var r=Object.freeze(Object.keys(e).reduce((function(t,r){return Object.defineProperty(t,r,{get:function(){return e[r]},enumerable:!0}),t}),Object.create(e)));Ye.set(r,Ye.get(e));var n=ut(t);return st(r,n.state,n.value)}function Tt(e){var t=Fe({},e);return delete t.id,t}function At(e,t){return!!e||"".concat(t," is required")}function Mt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=ot(e);if("object"!==Ie(t)&&(t={id:t}),void 0!==t.id&&"function"!=typeof t.id){var n=t.id;t.id=function(e){return e[n]}}if(t.draft){if(r.list)throw TypeError("Draft mode is not supported for listing model definition");e=Fe({},e,He({},Mt.connect,{get:function(e){var t=Mt.get(r.model,e);return Nt(t)?t:St(t)},set:function(e,t){return null===t?{id:e}:t}})),t.draft=ot(e),Ot.set(t.draft,{model:r.model,id:t.id})}var o=t.draft&&r.enumerable&&!t.id,i={get:function(r,n){if(o&&!n){var i=t.draft.create({});return Ke(t.draft,i.id,i),Mt.get(e,i.id)}var a=t.draft&&n?n.id:t.id&&t.id(r),s=Mt.get(e,a);return n&&s!==n&&!Nt(s)?kt(n,s):s},set:r.list?void 0:function(e,t,r){return r&&Nt(r)||(r=i.get(e)),Mt.set(r,t).catch((function(){})),r},connect:t.draft?function(){return function(){return jt(e,!1)}}:void 0};return i}Object.assign(Mt,{connect:qe,get:Et,set:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Ye.get(e),o=!!n;if(null===n)throw Error("Provided model instance has expired. Haven't you used stale value?");if(n||(n=ot(e)),n.nested)throw ft(n.model,TypeError("Setting provided nested model instance is not supported, use the root model instance"));if(n.list)throw TypeError("Listing model definition does not support 'set' method");if(!n.storage.set)throw ft(n.model,TypeError("Provided model definition storage does not support 'set' method"));if(o&&St(e))throw Error("Provided model instance is in pending state");var i=function(r,i){if(o)st(e,r,i);else{var a=le(n,t);a.value&&st(a.value,r,i)}};try{if(n.enumerable&&!o&&(!r||"object"!==Ie(r)))throw TypeError("Values must be an object instance: ".concat(r));if(r&&hasOwnProperty.call(r,"id"))throw TypeError("Values must not contain 'id' property: ".concat(r.id));var a=n.create(r,o?e:void 0),s=r?Object.keys(r):[],c=Ot.get(n),u={},l=o&&c&&_t(e),d=!1;if(a&&(n.checks.forEach((function(e,t){if(-1!==s.indexOf(t)||(l&&l.errors&&l.errors[t]&&(d=!0,u[t]=l.errors[t]),!c||a[t]!=n.model[t])){var r;try{r=e(a[t],t,a)}catch(e){r=e}!0!==r&&void 0!==r&&(d=!0,u[t]=r||!0)}})),d&&!c))throw xt(u);t=a?a.id:e.id;var f=Promise.resolve(n.storage.set(o?t:void 0,a,s)).then((function(e){var r=e===a?a:n.create(e);if(o&&r&&t!==r.id)throw TypeError("Local and storage data must have the same id: '".concat(t,"', '").concat(r.id,"'"));var i=r?r.id:t;return d&&c&&st(r,"error",xt(u)),Ke(n,i,r||wt(n.placeholder(i),Error("Model instance ".concat(void 0!==t?"with '".concat(t,"' id"):""," does not exist: ").concat(r))),!0)})).catch((function(e){throw e=void 0!==e?e:Error("Undefined error"),i("error",e),e}));return i("pending",f),f}catch(e){return i("error",e),Promise.reject(e)}},clear:jt,pending:St,error:_t,ready:Nt,submit:function(e){var t=Ye.get(e);if(!t||!Ot.has(t))throw TypeError("Provided model instance is not a draft: ".concat(e));if(St(e))throw Error("Model draft in pending state");var r,n=Ot.get(t);if(n.id){var o=Mt.get(n.model,e.id);r=Promise.resolve(St(o)||o).then((function(t){return Mt.set(t,Tt(e))}))}else r=Mt.set(n.model,Tt(e));return r=r.then((function(t){return st(e,"ready"),Mt.set(e,Tt(t)).then((function(){return t}))})).catch((function(t){return st(e,"error",t),Promise.reject(t)})),st(e,"pending",r),r},value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:At,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";switch(Ie(e)){case"string":e=new String(e);break;case"number":e=new Number(e);break;default:throw TypeError("Default value must be a string or a number: ".concat(Ie(e)))}if(r instanceof RegExp)t=function(e){return r.test(e)||n};else{if("function"!=typeof r)throw TypeError("The second argument must be a RegExp instance or a function: ".concat(Ie(r)));t=function(){var e=r.apply(void 0,arguments);return!0!==e&&void 0!==e?e||n:e}}return dt.set(e,t),e}});var Pt=new WeakMap,$t=function(e,t){var r=Pt.get(e);return r||(t&&Pt.set(e,t),t)},Ct=function(e,t){return Pt.set(e,t),t};function Lt(e){for(var t;e&&(t=$t(e))&&t.endNode;)e=t.endNode;return e}function Vt(e){if(e.nodeType!==Node.TEXT_NODE)for(var t=e.childNodes[0];t;)e.removeChild(t),t=e.childNodes[0];else{var r=$t(e);if(r.startNode)for(var n=Lt(r.endNode),o=r.startNode,i=n.nextSibling;o;){var a=o.nextSibling;o.parentNode.removeChild(o),o=a!==i&&a}}}var Dt=new WeakMap;function Wt(e,t){var r=$t(e),n=r.startNode,o=Lt(r.endNode);t.parentNode.insertBefore(e,t.nextSibling);for(var i=e,a=n;a;){var s=a.nextSibling;i.parentNode.insertBefore(a,i.nextSibling),i=a,a=s!==o.nextSibling&&s}}function zt(e){return(zt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Rt(e,t,r){var n=Array.isArray(r)?"array":zt(r),o=$t(t,{});switch(o.type!==n&&(Vt(t),"array"===n&&Dt.delete(t),o=Ct(t,{type:n}),""!==t.textContent&&(t.textContent="")),n){case"function":r(e,t);break;case"array":!function(e,t,r,n){var o=Dt.get(t),i=r.map((function(e,t){return{id:Object.prototype.hasOwnProperty.call(e,"id")?e.id:t,value:e,placeholder:null,available:!0}}));if(Dt.set(t,i),o){var a=new Set;i.forEach((function(e){return a.add(e.id)})),o=o.filter((function(e){return!!a.has(e.id)||(Vt(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder),!1)}))}for(var s=t,c=r.length-1,u=$t(t),l=0;l<i.length;l+=1){var d=i[l],f=void 0;if(o)for(var p=0;p<o.length;p+=1)if(o[p].available&&o[p].id===d.id){f=o[p];break}f?(f.available=!1,d.placeholder=f.placeholder,d.placeholder.previousSibling!==s&&Wt(d.placeholder,s),f.value!==d.value&&n(e,d.placeholder,d.value)):(d.placeholder=document.createTextNode(""),s.parentNode.insertBefore(d.placeholder,s.nextSibling),n(e,d.placeholder,d.value)),s=Lt($t(d.placeholder).endNode||d.placeholder),0===l&&(u.startNode=d.placeholder),l===c&&(u.endNode=s)}o&&o.forEach((function(e){e.available&&(Vt(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder))}))}(e,t,r,Rt);break;default:t.textContent="number"===n||r?r:""}}function It(e){return(It="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Bt=new WeakMap;function Ft(e){return(Ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ht=new WeakMap;function Ut(e,t,r){var n=Ht.get(t)||new Set,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;return Array.isArray(e)?e.forEach((function(e){return t.add(e)})):null!==e&&"object"===Ft(e)?Object.keys(e).forEach((function(r){return e[r]&&t.add(r)})):t.add(e),t}(r);Ht.set(t,o),o.forEach((function(e){t.classList.add(e),n.delete(e)})),n.forEach((function(e){t.classList.remove(e)}))}function Xt(e){return(Xt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var qt=new WeakMap;function Yt(e,t,r){if(null===r||"object"!==Xt(r))throw TypeError("Style value must be an object in ".concat(function(e){return"<".concat(String(e.tagName).toLowerCase(),">")}(t),":"),r);var n=qt.get(t)||new Map,o=Object.keys(r).reduce((function(e,o){var i=X(o),a=r[o];return a||0===a?t.style.setProperty(i,a):t.style.removeProperty(i),e.set(i,a),n.delete(i),e}),new Map);n.forEach((function(e,r){t.style[r]=""})),qt.set(t,o)}function Gt(e,t,r){if("on"===t.substr(0,2))return function(e){return function(t,r,n,o){if(o){var i=Bt.get(r);i&&r.removeEventListener(e,i.get(o),void 0!==o.options&&o.options)}if(n){if("function"!=typeof n)throw Error("Event listener must be a function: ".concat(It(n)));var a=Bt.get(r);a||(a=new WeakMap,Bt.set(r,a));var s=n.bind(null,t);a.set(n,s),r.addEventListener(e,s,void 0!==n.options&&n.options)}}}(t.substr(2));switch(e){case"class":return Ut;case"style":return Yt;default:return function(n,o,i){if(r||o instanceof SVGElement||!(t in o))if(!1===i||null==i)o.removeAttribute(e);else{var a=!0===i?"":String(i);o.setAttribute(e,a)}else o[t]!==i&&(o[t]=i)}}}function Jt(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Kt(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Kt(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Kt(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Zt(e){return(Zt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{Qt.env.NODE_ENV}catch(e){var Qt={env:{NODE_ENV:"production"}}}var er=Date.now(),tr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return"{{h-".concat(er,"-").concat(e,"}}")},rr=tr("(\\d+)"),nr=new RegExp("^".concat(rr,"$")),or=new RegExp(rr,"g"),ir="--".concat(er,"--"),ar=new RegExp(ir,"g"),sr=new WeakMap;var cr="object"===Zt(window.ShadyDOM)&&window.ShadyDOM.inUse?function(e){var t;return{get currentNode(){return t},nextNode:function(){if(void 0===t)t=e.childNodes[0];else if(t.childNodes.length)t=t.childNodes[0];else if(t.nextSibling)t=t.nextSibling;else{var r=t.parentNode;for(t=r.nextSibling;!t&&r!==e;)r=r.parentNode,t=r.nextSibling}return!!t}}}:function(e){return document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null,!1)},ur=document.createElement("div"),lr=new Map;function dr(e,t,r){var n=document.createElement("template"),o=[],i=function(e,t){var r=e.reduce((function(t,r,n){return 0===n?r:e.slice(n).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)?"".concat(t,"\x3c!--").concat(tr(n-1),"--\x3e").concat(r):t+tr(n-1)+r}),"");return t&&(r+="<style>\n".concat(t.join("\n/*------*/\n"),"\n</style>")),G?r.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>/]+)/g,(function(e){return"".concat(ir).concat(e)})):r}(e,r);if(t&&(i="<svg>".concat(i,"</svg>")),G?n.innerHTML=i:(ur.innerHTML="<template>".concat(i,"</template>"),n.content.appendChild(ur.children[0].content)),t){var a=n.content.firstChild;n.content.removeChild(a),Array.from(a.childNodes).forEach((function(e){return n.content.appendChild(e)}))}!function(e){for(var t,r=document.createNodeIterator(e,NodeFilter.SHOW_COMMENT,null,!1);t=r.nextNode();)nr.test(t.textContent)&&(t.parentNode.insertBefore(document.createTextNode(t.textContent),t),t.parentNode.removeChild(t))}(n.content);for(var s=cr(n.content),c=0,u=function(){var r=s.currentNode;if(r.nodeType===Node.TEXT_NODE){var n=r.textContent;if(!n.match(nr)){var i=n.match(or);if(i){var a=r;i.reduce((function(e,t){var r=Jt(e.pop().split(t),2),n=r[0],o=r[1];return n&&e.push(n),e.push(t),o&&e.push(o),e}),[n]).forEach((function(e,t){0===t?a.textContent=e:a=a.parentNode.insertBefore(document.createTextNode(e),a.nextSibling)}))}}var u=r.textContent.match(nr);u&&(G||(r.textContent=""),o[u[1]]=[c,Rt])}else r.nodeType===Node.ELEMENT_NODE&&Array.from(r.attributes).forEach((function(n){var i=n.value.trim(),a=G?n.name.replace(ir,""):n.name,s=i.match(nr);if(s){var u=e[s[1]].replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop();o[s[1]]=[c,Gt(a,u,t)],r.removeAttribute(n.name)}else{var l=i.match(or);if(l){var d="attr__".concat(a);l.forEach((function(e,t){var r=Jt(e.match(nr),2)[1];o[r]=[c,function(r,n,o){var s=$t(n,{});s[d]=(s[d]||i).replace(e,null==o?"":o),1!==l.length&&t+1!==l.length||(n.setAttribute(a,s[d]),s[d]=void 0)}]})),n.value="",G&&a!==n.name&&(r.removeAttribute(n.name),r.setAttribute(a,""))}}}));c+=1};s.nextNode();)u();return function(e,t,r,i){var a=$t(t,{type:"function"});if(n!==a.template){(a.template||t.nodeType===Node.ELEMENT_NODE)&&Vt(t),a.prevArgs=null;var s=document.importNode(function(e,t){return t?Y((function(r){var n=sr.get(e);n||(n=new Map,sr.set(e,n));var o=n.get(t);if(!o){(o=document.createElement("template")).content.appendChild(e.content.cloneNode(!0)),n.set(t,o);var i=o.content.querySelectorAll("style");Array.from(i).forEach((function(e){for(var t=e.childNodes.length+1,r=0;r<t;r+=1)e.parentNode.insertBefore(document.createTextNode(tr()),e)})),r.prepareTemplate(o,t.toLowerCase())}return o}),e):e}(n,e.tagName).content,!0),c=cr(s),u=o.slice(0),l=0,d=u.shift(),f=[];for(a.template=n,a.markers=f;c.nextNode();){var p=c.currentNode;for(p.nodeType===Node.TEXT_NODE&&(nr.test(p.textContent)?p.textContent="":G&&(p.textContent=p.textContent.replace(ar,"")));d&&d[0]===l;)f.push([p,d[1]]),d=u.shift();l+=1}if(t.nodeType===Node.TEXT_NODE){a.startNode=s.childNodes[0],a.endNode=s.childNodes[s.childNodes.length-1];for(var h=t,v=s.childNodes[0];v;)t.parentNode.insertBefore(v,h.nextSibling),h=v,v=s.childNodes[0]}else t.appendChild(s)}var b=t.adoptedStyleSheets;if(i){var m=!1;if((i=i.map((function(e){if(e instanceof CSSStyleSheet)return e;var t=lr.get(e);return t||((t=new CSSStyleSheet).replaceSync(e),lr.set(e,t)),t}))).length===b.length){m=!0;for(var g=0;g<i.length;g+=1)if(i[g]!==b[g]){m=!1;break}}m||(t.adoptedStyleSheets=i)}else b&&b.length&&(t.adoptedStyleSheets=[]);var y=a.prevArgs;a.prevArgs=r;for(var w=0;w<a.markers.length;w+=1){var E=Jt(a.markers[w],2),O=E[0],x=E[1];if(!y||y[w]!==r[w])try{x(e,O,r[w],y?y[w]:void 0)}catch(e){throw e}}t.nodeType!==Node.TEXT_NODE&&Y((function(t){e.shadowRoot&&(y?t.styleSubtree(e):t.styleElement(e))}))}}function fr(e){return(fr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function pr(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function hr(e,t){var r,n=e.target;switch(n.type){case"radio":case"checkbox":r=n.checked&&n.value;break;case"file":r=n.files;break;default:r=n.value}t(r)}function vr(e,t){return e.split(".").reverse().reduce((function(e,r){return pr({},r,e||t)}),null)}var br=new Map;var mr=new WeakMap;var gr=Object.freeze({__proto__:null,set:function(e,t){if(!e)throw Error("The first argument must be a property name or an object instance: ".concat(e));if("object"===fr(e)){if(void 0===t)throw Error("For model instance property the second argument must be defined");var r=J.get(e);if(!r)throw Error("Provided object must be a model instance of the store");return function(n,o){hr(o,(function(n){r.set(e,null!==t?vr(t,n):t)}))}}if(2===arguments.length)return function(r){r[e]=t};var n=br.get(e);return n||(n=function(t,r){hr(r,(function(r){t[e]=r}))},br.set(e,n)),n},resolve:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return function(n,o){var i;t&&(i=setTimeout((function(){i=void 0,requestAnimationFrame((function(){t(n,o)}))}),r)),mr.set(o,e),e.then((function(t){i&&clearTimeout(i),mr.get(o)===e&&(t(n,o),mr.set(o,null))}))}}}),yr=tr(),wr=tr("svg"),Er=/@import/,Or=new Map,xr=new WeakMap,jr={define:function(e){return We(e),this},key:function(e){return this.id=e,this},style:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return xr.set(this,t.filter((function(e){return e}))),this}};function Sr(e,t,r){return Object.assign((function n(o){var i,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,s=xr.get(n),c=e.join(yr);if(s){var u=s.join(yr);(i=!!a.adoptedStyleSheets&&!Er.test(u))||(c+=u)}r&&(c+=wr);var l=Or.get(c);l||(l=dr(e,r,!i&&s),Or.set(c,l)),l(o,a,t,i&&s)}),jr)}Object.assign((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return Sr(e,r)}),gr),Object.assign((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return Sr(e,r,!0)}),gr);const _r=e=>function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)},Nr=_r((e,t,r)=>(t-e)*r+e),kr=_r((e,t,r)=>(r-e)/(t-e)),Tr=_r((e,t,r)=>Math.max(e,Math.min(r,t))),Ar=_r((e,t)=>{if(e<=0)return t;const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),Mr=_r((e,t,r,n,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(kr(e,t),Nr(r,n))(o)),Pr=(e,t)=>({get:r=>r.getAttribute(e)||t,set:(t,r)=>(t.setAttribute(e,r),r),connect:(r,n,o)=>{r[n]=null===r.getAttribute(e)?t:r.getAttribute(e);new MutationObserver(o).observe(r,{attributeFilter:[e]})}}),$r={boolean:(e,t)=>Object.assign(Object.assign({},Pr(e,t)),{get:r=>r.hasAttribute(e)||t,set:(t,r)=>(r?t.setAttribute(e,""):t.removeAttribute(e),!!r),connect:(t,r,n)=>{t[r]=t.hasAttribute(e);new MutationObserver(n).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},Pr(e,t)),{get:r=>parseFloat(r.getAttribute(e))||t}),string:Pr},Cr=_r((e,t)=>e&&$r[typeof t]?$r[typeof t](e,t):ee(t)),Lr=e=>{return r=-e,n=e+1,t=Array.from("0".repeat(n-r),(e,t)=>r+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,r,n},Vr=e=>{const{lineWidth:t}=e,r=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return Lr(r).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},Dr=L`
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
`,Wr={lineWidth:Cr("line-width",1)},zr=We("ue-text",Object.assign(Object.assign({},Wr),{render:I(e=>L`
    ${Dr}
    <div style="text-shadow: ${Vr(e)};"><slot></slot></div>
`)})),Rr=L`
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
`,Ir=_r((e,{type:t})=>{}),Br=L`
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
`,Fr=Object.assign({active:Cr("active",!1),checked:Cr("checked",!1),disabled:Cr("disabled",!1),focused:Cr("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),Hr=We("ue-button",Object.assign(Object.assign({},Fr),{render:I(e=>{const{active:t,checked:r,disabled:n,focused:o}=e;return L`
        ${Rr} ${Br}

        <button
            tabindex="0"
            class=${W({active:t,checked:r,focused:o})}
            .disabled=${n}
            @focus=${Ir(e)}
            @blur=${Ir(e)}
            @mousedown=${Ir(e)}
            @mouseup=${Ir(e)}
        >
            <slot></slot>
        </button>
    `})})),Ur=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),Xr=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function qr(e,t={}){const r={};return Xr.forEach(t=>{r[t]=e[t]}),Object.assign(r,t)}function Yr(e,t,r={}){const n=new MouseEvent(t,r);return n.shftTarget=e,e.dispatchEvent(n),n}const Gr=(e,t,r,n)=>(e.addEventListener(t,r,n||{}),()=>{e.removeEventListener(t,r,n||{})});function Jr(e,t=0,r=1){return Math.max(t,Math.min(e,r))}const Kr=new WeakMap;Object.assign(window,{isDrag:e=>Kr.has(e),undrag:e=>{e.removeEventListener("mousedown",Kr.get(e)),Kr.delete(e)}});class Zr{constructor(e){this.el=e}handleEvent(e){if(1===e.buttons){Yr(this.el,"dragstart",qr(e)),this.el.setAttribute("is-dragging","");const t=Gr(document,"mousemove",e=>{Yr(this.el,"drag",qr(e))});document.addEventListener("mouseup",e=>{t(),this.el.removeAttribute("is-dragging"),Yr(this.el,"dragend",qr(e))},{once:!0})}}}class Qr{constructor(e){this.el=e,this.remove=()=>{},this.dropover=!1}get accepts(){return this.el.getAttribute("drop-accepts")||""}get overlap(){return parseFloat(this.el.getAttribute("drop-overlap"))||.5}canAccept(e){return!this.accepts||e.matches(this.accepts)}canDrop(e){return function(e,t){if(!e.getBoundingClientRect||!t.getBoundingClientRect)return 0;const{left:r,right:n,top:o,bottom:i,height:a,width:s}=e.getBoundingClientRect(),{left:c,right:u,top:l,bottom:d}=t.getBoundingClientRect();return Jr(Math.min(n,u)-Math.max(r,c),0,s)*Jr(Math.min(i,d)-Math.max(o,l),0,a)/(s*a)}(e,this.el)>=this.overlap}handleEvent({detail:{shftTarget:e}}){e&&this.canAccept(e)&&(Yr(this.el,"dropopen",{relatedTarget:e}),this.el.setAttribute("drop-open",""),this.remove=Gr(e,"drag",this.dragListener.bind(this)),e.addEventListener("dragend",this.dragEndListener.bind(this),{once:!0}))}dragListener({shftTarget:e}){const t=this.canDrop(e);if(t!==this.dropover){[e,this.el].forEach((e,r,n)=>{Yr(e,t?"dragenter":"dragleave",{relatedTarget:n[1-r]})});const r=t?"setAttribute":"removeAttribute";this.el[r]("drop-over",""),this.dropover=t}t&&[e,this.el].forEach((e,t,r)=>{Yr(e,"dragover",{relatedTarget:r[1-t]})})}dragEndListener({shftTarget:e}){this.remove(),this.remove=()=>{},this.el.removeAttribute("drop-open"),this.el.removeAttribute("drop-over"),Yr(this.el,"drop-close",{relatedTarget:e}),this.canDrop(e)&&[e,this.el].forEach((e,t,r)=>{Yr(e,"drop",{relatedTarget:r[1-t]})})}}let en=[];const tn=({shftTarget:e})=>{en=en.filter(e=>e.isConnected),en.forEach(t=>{t.dispatchEvent(new CustomEvent("_dragstart",{detail:{shftTarget:e}}))})};Object.assign(window,{DROPS:en});var rn={drag:e=>{if(e instanceof Element&&!Kr.has(e)){const t=new Zr(e);e.addEventListener("mousedown",t),Kr.set(e,t)}return e},drop:function(e,t={accepts:"",overlap:.5}){return e instanceof Element&&!(e=>en.includes(e))(e)&&(["accepts","overlap"].forEach(r=>{e.setAttribute("drop-"+r,t[r])}),e.addEventListener("_dragstart",new Qr(e)),document.addEventListener("dragstart",tn),en=[...en.filter(e=>e.isConnected),e]),e},util:{clear:function(e){const{drags:t,drops:r}=Ur;if(t.has(e)){const{onmousedown:r,onmousemove:n,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",r),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)}if(r.has(e)){const{ondragstart:t,ondrag:n,ondragend:o}=r.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",n),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(r=>{let n=parseFloat(t.style[r])||0;n+="left"===r?e.movementX:e.movementY,t.style[r]=n+"px"})},is:function(e,t){const{drags:r,drops:n}=Ur;switch(t){case"drag":case"draggable":return r.has(e);case"drop":case"droppable":return n.has(e);default:return r.has(e)||n.has(e)}},matches:function(e,t){return!t||0===t.length||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}},_GLOBAL:Ur};const{drag:nn}=rn,on=L`
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
`,an={min:Cr("min",0),max:Cr("max",100),step:Cr("step",1),value:Object.assign(Object.assign({},Cr("value",0)),{observe:(e,t)=>{q(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}}),bar:{get:({render:e})=>e().querySelector(".slider-bar"),observe:(e,t,r)=>{t&&t!==r&&nn(t)}}},sn=(e,{clientX:t})=>{const r=t-e.getBoundingClientRect().left,{min:n,max:o,step:i,clientWidth:a}=e;e.value=Tr(n,o,Ar(i,Mr(0,a,n,o,r)))},cn=We("ue-slider",Object.assign(Object.assign({},an),{render:I(e=>{const{min:t,max:r,value:n,clientWidth:o}=e;return L`
        ${Rr} ${on}
        <div
            class="slider-bar"
            @drag=${t=>sn(e,t)}
            @mousedown=${t=>sn(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${Tr(0,o,Mr(t,r,0,o,n))}px) translateX(-50%);"
            ></div>
        </div>
    `})})),un={arrow:((e,...t)=>new y(e,t,"svg",M))`
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
`},ln=L`
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
`,dn=We("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:I(e=>L`
        ${ln} ${un[e.shape]}
    `)})),fn={_ue_item:!0,active:Cr("active",!0),selected:Cr("selected",!1)},pn=Object.assign(Object.assign({},fn),{value:Cr("value",""),label:e=>e.getAttribute("label")||e.innerText,render:I(()=>L`<slot></slot>`)}),hn=Object.assign(Object.assign({},fn),{icon:Cr("icon",""),label:Cr("label",""),render:I(({active:e})=>L`${e?L`<slot></slot>`:L``}`)}),vn={items:Re(e=>void 0!==e._ue_item)},bn={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{q(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},mn=_r((e,t)=>{e.forEach(e=>{e.selected=e===t})}),gn=We("ue-list-item",pn),yn=We("ue-content-item",hn),wn={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,r)=>e.selected=r===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:r}=e;console.log("changed to "+t),r[t]&&q(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:r[t].label,item:r[t]}})}},En={items:Re(e=>e.ueItem)},On=Object.assign(Object.assign({},En),{preselect:Cr("preselect",0),selected:wn,selectedItem:({items:e})=>e.find(e=>e.selected)}),xn=_r((e,t)=>L` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:r},n)=>L`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=n}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${n}">${r}</slot>
    </ue-button>
`),jn=Object.assign(Object.assign({},On),{location:Cr("location","left")}),Sn=L`
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
`,_n=We("ue-tab-group",Object.assign(Object.assign({},jn),{render:I(e=>L`
        ${Sn}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${xn(e)}
        </div>
        <slot></slot>
    `)})),Nn=Object.assign(Object.assign({},On),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return((e,t,r,n)=>(e.addEventListener(t,r,n),()=>e.removeEventListener(t,r,n)))(document,"click",()=>{e.open=!1},{once:!0})}}}),kn=L`
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
`,Tn={border:"1px solid transparent"},An={border:"1px solid var(--ue-active-bg-color)"},Mn=We("ue-dropdown",Object.assign(Object.assign({},Nn),{render:I(e=>{const{open:t,selectedItem:r}=e;return L`
        ${kn}
        <div class="container" style=${R(t?An:Tn)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${r?r.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${R(t?An:Tn)}>
                    ${xn(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),Pn={value:Object.assign(Object.assign({},Cr("value",0)),{observe:(e,t,r)=>{t!==r&&q(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:Cr("duration",1),delay:Cr("delay",0)},$n=We("ue-progress-bar",Object.assign(Object.assign({},Pn),{render:I(e=>{const{value:t,duration:r,delay:n}=e;return L`
        ${Rr}
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
                width: ${Tr(0,100,t)}%;
                transition: width ${Tr(0,1/0,r)}s ease
                    ${Tr(0,1/0,n)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{q(e,"updated")}}
            ></div>
        </div>
    `})})),Cn=Object.assign(Object.assign({},On),{direction:Cr("direction","column")}),Ln=L`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,Vn=We("ue-select-grp",Object.assign(Object.assign({},Cn),{render:I(e=>L`
                ${Ln}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${xn(e)}
                </div>
            `)})),Dn={open:Cr("open",!1),direction:Cr("direction","right"),duration:Cr("duration",500)},Wn=L`
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
`,zn={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},Rn={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},In=We("ue-drawer",Object.assign(Object.assign({},Dn),{render:I(({direction:e,duration:t,open:r})=>L`
        ${Wn}
        <div style=${R((({direction:e,duration:t,open:r})=>({transition:`transform ${t}ms`,flexDirection:zn[e],transform:r?"translate(0, 0)":Rn[e]}))({direction:e,duration:t,open:r}))}>
            <slot></slot>
        </div>
    `)})),Bn=Object.assign(Object.assign({},vn),{selected:bn}),Fn=(e,t,r)=>(e.slot=e.selected?"selected-item":"",L`<ue-button .checked=${e.selected} @click=${()=>mn(r,e)}
        >${e.label}</ue-button
    >`),Hn=({items:e})=>L`
        ${Rr}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(Fn)}
    `,Un=We("ue-list",Object.assign(Object.assign({},Bn),{render:I(Hn)})),Xn=We("ue-tab-list",Object.assign(Object.assign({},Bn),{render:I(({items:e})=>L`${Hn({items:e})} <slot name="selected-item"></slot>`)})),qn=Object.assign(Object.assign({},vn),{render:I(({items:e})=>L`
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
        `)}),Yn=Object.assign(Object.assign({},fn),{msg:(Gn=qn,Jn="function"==typeof Gn?Gn:function(e){return e===Gn},{get:function(e){return function(e,t){for(var r=e.parentElement||e.parentNode.host;r;){var n=r.constructor.hybrids;if(n&&t(n))return r;r=r.parentElement||r.parentNode&&r.parentNode.host}return r||null}(e,Jn)},connect:function(e,t,r){return!!e[t]&&r}}),index:e=>e.msg.items.indexOf(e),render:I(e=>L`
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
        `)});var Gn,Jn;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),r=document.createElement("ue-msg-item");r.innerText=e,t.appendChild(r)}});const Kn=We("ue-msg",qn),Zn=We("ue-msg-item",Yn);return e.UeButton=Hr,e.UeContentItem=yn,e.UeDrawer=In,e.UeDropdown=Mn,e.UeIcon=dn,e.UeList=Un,e.UeListItem=gn,e.UeMsg=Kn,e.UeMsgItem=Zn,e.UeProgressBar=$n,e.UeSelectGrp=Vn,e.UeSlider=cn,e.UeTabGroup=_n,e.UeTabList=Xn,e.UeText=zr,e.shadowStyle=Vr,e}({});
