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
     */const m=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),g=` ${c} `;class y{constructor(e,t,r,n){this.strings=e,this.values=t,this.type=r,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===e.indexOf("--\x3e",o+1);const i=v.exec(e);t+=null===i?e+(r?g:u):e.substr(0,i.index)+i[1]+i[2]+"$lit$"+i[3]+c}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==m&&(t=m.createHTML(t)),e.innerHTML=t,e}}class w extends y{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,r=t.firstChild;return t.removeChild(r),((e,t,r=null,n=null)=>{for(;t!==r;){const r=t.nextSibling;e.insertBefore(t,n),t=r}})(t,r.firstChild),e}}
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
     */const E=e=>null===e||!("object"==typeof e||"function"==typeof e),O=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new j(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!O(e))return e}let n="";for(let o=0;o<t;o++){n+=e[o];const t=r[o];if(void 0!==t){const e=t.value;if(E(e)||!O(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class j{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||E(e)&&e===this.value||(this.value=e,n(e)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class S{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=h()),e.__insert(this.endNode=h())}insertAfterPart(e){e.__insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(E(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):O(e)?this.__commitIterable(e):e===s?(this.value=s,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const r=new b(t,e.processor,this.options),n=r._clone();r.update(e.values),this.__commitNode(n),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,n=0;for(const o of e)r=t[n],void 0===r&&(r=new S(this.options),t.push(r),0===n?r.appendIntoPart(this):r.insertAfterPart(t[n-1])),r.setValue(o),r.commit(),n++;n<t.length&&(t.length=n,this.clear(r&&r.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class _{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class N extends x{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends j{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=M(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const M=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const P=new class{handleAttributeExpressions(e,t,r,n){const o=t[0];if("."===o){return new N(e,t.slice(1),r).parts}if("@"===o)return[new A(e,t.slice(1),n.eventContext)];if("?"===o)return[new _(e,t.slice(1),r)];return new x(e,t,r).parts}handleTextExpression(e){return new S(e)}};
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
     */function $(e){let t=C.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},C.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(c);return r=t.keyString.get(n),void 0===r&&(r=new d(e,e.getTemplateElement()),t.keyString.set(n,r)),t.stringsArray.set(e.strings,r),r}const C=new Map,L=new WeakMap;
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(e,...t)=>new y(e,t,"html",P);
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
class D{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const W=new WeakMap,z=r(e=>t=>{if(!(t instanceof j)||t instanceof T||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:n}=r;let o=W.get(t);void 0===o&&(n.setAttribute("class",r.strings.join(" ")),W.set(t,o=new Set));const i=n.classList||new D(n);o.forEach(t=>{t in e||(i.remove(t),o.delete(t))});for(const t in e){const r=e[t];r!=o.has(t)&&(r?(i.add(t),o.add(t)):(i.remove(t),o.delete(t)))}"function"==typeof i.commit&&i.commit()}),R=new WeakMap,I=r(e=>t=>{if(!(t instanceof j)||t instanceof T||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:n}=r.element;let o=R.get(t);void 0===o&&(n.cssText=r.strings.join(" "),R.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?n[t]=null:n.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?n[t]=e[t]:n.setProperty(t,e[t])}),B=(e,t={})=>r=>{const n=e(r);return(e,r)=>((e,t,r)=>{let n=L.get(t);void 0===n&&(i(t,t.firstChild),L.set(t,n=new S(Object.assign({templateFactory:$},r))),n.appendInto(t)),n.setValue(e),n.commit()})(n,r,t)};function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function H(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(Object(r),!0).forEach((function(t){U(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var X=new Map;function q(e){var t=X.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),X.set(e,t)),t}function Y(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,H({bubbles:!1},r)))}function G(e,t){var r=window.ShadyCSS;return r&&!r.nativeShadow?e(r):t}var J="ActiveXObject"in window,K=new WeakMap;function Z(e){return(Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Q=function(e){return e},ee=function(e){if("object"!==Z(e))throw TypeError("Assigned value must be an object: ".concat(Z(e)));return e&&Object.freeze(e)};function te(e,t){var r=Z(e),n=Q;switch(r){case"string":n=String;break;case"number":n=Number;break;case"boolean":n=Boolean;break;case"function":e=(n=e)();break;case"object":e&&Object.freeze(e),n=ee}return{get:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return r},set:function(e,t,r){return n(t,r)},connect:"object"!==r&&"undefined"!==r?function(r,o,i){if(r[o]===e){var a=q(o);if(r.hasAttribute(a)){var s=r.getAttribute(a);r[o]=""===s&&n===Boolean||s}}return t&&t(r,o,i)}:t}}function re(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ne(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?re(Object(r),!0).forEach((function(t){oe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):re(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function oe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ie(e){return(ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var ae=new WeakMap,se=new Set;function ce(){try{se.forEach((function(e){try{ae.get(e)(),se.delete(e)}catch(t){throw se.delete(e),t}}))}catch(e){throw se.size&&ce(),e}}function ue(e){se.size||requestAnimationFrame(ce),se.add(e)}var le=new WeakMap;function de(e,t){var r=le.get(e);r||(r=new Map,le.set(e,r));var n=r.get(t);return n||(n={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},r.set(t,n)),n}function fe(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function pe(e){e.observed&&ue(e),e.contexts&&e.contexts.forEach(pe)}var he=new Set;function ve(e,t,r,n){var o=de(e,t);if(he.size&&he.has(o))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(he.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(o),e.observed&&(o.contexts||(o.contexts=new Set),o.contexts.add(e))})),(n&&n(o.value)||!n)&&o.checksum&&o.checksum===fe(o))return o.value;try{he.add(o),o.observed&&o.deps&&o.deps.size&&o.deps.forEach((function(e){e.contexts&&e.contexts.delete(o)})),o.deps=void 0;var i=r(e,o.value);o.deps&&o.deps.forEach((function(e){!function e(t,r){r&&r.forEach((function(r){t.deps.add(r),t.observed&&(r.contexts||(r.contexts=new Set),r.contexts.add(t)),e(t,r.deps)}))}(o,e.deps)})),i!==o.value&&(o.state+=1,o.value=i,pe(o)),o.checksum=fe(o),he.delete(o)}catch(e){throw o.checksum=0,he.delete(o),he.forEach((function(e){e.deps.delete(o),e.observed&&o.contexts.delete(e)})),e}return o.value}function be(e,t,r,n){var o=de(e,t),i=r(e,n,o.value);i!==o.value&&(o.checksum=0,o.state+=1,o.value=i,pe(o))}var me=new Set;function ge(e,t,r){e.checksum=0,e.state+=1,pe(e),r&&function(e){me.size||requestAnimationFrame((function(){me.forEach((function(e){(!e.contexts||e.contexts&&0===e.contexts.size)&&le.get(e.target).delete(e.key)})),me.clear()})),me.add(e)}(e),t&&(e.value=void 0)}function ye(e,t,r,n){if(he.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));ge(de(e,t),r,n)}function we(e,t,r){if(he.size)throw Error("Invalidating all properties in chain of get calls is forbidden");var n=le.get(e);n&&n.forEach((function(e){ge(e,t,r)}))}function Ee(e,t,r,n){var o,i=de(e,t);i.observed=!0;var a=function(e,t){return ae.set(e,t),ue(e),function(){se.delete(e),ae.delete(e)}}(i,(function(){var i=ve(e,t,r);i!==o&&(n(e,i,o),o=i)}));return i.deps&&i.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(i)})),function(){a(),i.observed=!1,i.deps&&i.deps.size&&i.deps.forEach((function(e){e.contexts&&e.contexts.delete(i)}))}}function Oe(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function xe(e,t){return!t||"object"!==Ae(t)&&"function"!=typeof t?je(e):t}function je(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Se(e){var t="function"==typeof Map?new Map:void 0;return(Se=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return _e(e,arguments,ke(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Te(n,e)})(e)}function _e(e,t,r){return(_e=Ne()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&Te(o,r.prototype),o}).apply(null,arguments)}function Ne(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Te(e,t){return(Te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ke(e){return(ke=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ae(e){return(Ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{Me.env.NODE_ENV}catch(e){var Me={env:{NODE_ENV:"production"}}}var Pe=function(e,t){return t},$e=new WeakMap,Ce=new WeakMap;function Le(e,t){e.hybrids=t;var r=[],n=Object.keys(t);$e.set(e,r),Ce.set(e,n),n.forEach((function(n){var o,i=t[n],a=Ae(i);o="function"===a?"render"===n?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(ie(e)));var r=ne({shadowRoot:!0},t),n={mode:"open"};return"object"===ie(r.shadowRoot)&&Object.assign(n,r.shadowRoot),{get:function(t){var o=e(t),i=t;return r.shadowRoot&&(t.shadowRoot||t.attachShadow(n),i=t.shadowRoot),function(){return o(t,i),i}},observe:function(e,t){t()}}}(i):{get:i}:"object"!==a||null===i||Array.isArray(i)?te(i):{get:i.get||Pe,set:i.set||!i.get&&Pe||void 0,connect:i.connect,observe:i.observe},Object.defineProperty(e.prototype,n,{get:function(){return ve(this,n,o.get)},set:o.set&&function(e){be(this,n,o.set,e)},enumerable:!0,configurable:"production"!==Me.env.NODE_ENV}),o.observe&&r.unshift((function(e){return Ee(e,n,o.get,o.observe)})),o.connect&&r.push((function(e){return o.connect(e,n,(function(){ye(e,n)}))}))}))}var Ve=new WeakMap;function De(e,t){var r=Ae(t);if("object"!==r&&"function"!==r)throw TypeError("Second argument must be an object or a function: ".concat(r));if(null!==e){var n=window.customElements.get(e);if("function"===r)return n!==t?window.customElements.define(e,t):n;if(n){if(n.hybrids===t)return n;throw Error("Element '".concat(e,"' already defined"))}}var o=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Te(e,t)}(a,e);var t,r,n,o,i=(t=a,function(){var e,r=ke(t);if(Ne()){var n=ke(this).constructor;e=Reflect.construct(r,arguments,n)}else e=r.apply(this,arguments);return xe(this,e)});function a(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),e=i.call(this);for(var t=Ce.get(a),r=0;r<t.length;r+=1){var n=t[r];if(Object.prototype.hasOwnProperty.call(je(e),n)){var o=e[n];delete e[n],e[n]=o}}return e}return r=a,(n=[{key:"connectedCallback",value:function(){for(var e=$e.get(a),t=[],r=0;r<e.length;r+=1){var n=e[r](this);n&&t.push(n)}Ve.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Ve.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&Oe(r.prototype,n),o&&Oe(r,o),a}(Se(HTMLElement));return Le(o,t),null!==e&&(Object.defineProperty(o,"name",{get:function(){return e}}),customElements.define(e,o)),o}function We(e){return Object.keys(e).reduce((function(t,r){var n=q(r.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[r]=De(n,e[r]),t}),{})}function ze(){return"object"===Ae(arguments.length<=0?void 0:arguments[0])&&null!==(arguments.length<=0?void 0:arguments[0])?We(arguments.length<=0?void 0:arguments[0]):De.apply(void 0,arguments)}function Re(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(n.push(e),r.deep&&r.nested&&Re(e,t,r,n)):r.deep&&Re(e,t,r,n)})),n}function Ie(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},r="function"==typeof e?e:function(t){return t===e};return{get:function(e){return Re(e,r,t)},connect:function(e,r,n){var o=new MutationObserver(n);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}function Be(e){return(Be="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Fe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function He(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Fe(Object(r),!0).forEach((function(t){Ue(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Fe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ue(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}try{Xe.env.NODE_ENV}catch(e){var Xe={env:{NODE_ENV:"production"}}}var qe,Ye="__store__connect__".concat(Date.now(),"__"),Ge=new WeakMap;function Je(e,t,r){return r&&Ge.set(r,null),Ge.set(t,e),t}function Ke(e,t,r){return Je(e,t,r),(e.external&&t||!r||Nt(t))&&e.invalidate(),t}function Ze(e,t,r,n){return be(e,t,n?Ke:Je,r),r}function Qe(){return qe||(qe=Date.now(),requestAnimationFrame((function(){qe=void 0}))),qe}var et=new WeakMap;function tt(e){var t=et.get(e);return t||(t=Qe(),et.set(e,t)),t}function rt(e){return et.set(e,Qe()),e}function nt(e){"function"==typeof e&&(e={get:e});var t=He({cache:!0},e);if(!1===t.cache||0===t.cache)t.validate=function(e){return!e||tt(e)===Qe()};else if("number"==typeof t.cache)t.validate=function(e){return!e||tt(e)+t.cache>Qe()};else if(!0!==t.cache)throw TypeError("Storage cache property must be a boolean or number: ".concat(Be(t.cache)));return Object.freeze(t)}function ot(e){return{get:e.enumerable?function(){}:function(){return e.create({})},set:e.enumerable?function(e,t){return t}:function(e,t){return null===t?{id:e}:t},list:e.enumerable&&function(t){if(t)throw TypeError("Memory-based model definition does not support id");return(r=e,n=[],o=le.get(r),o&&o.forEach((function(e){n.push(e)})),n).reduce((function(t,r){var n=r.key,o=r.value;return n===e||o&&!Nt(o)&&t.push(n),t}),[]);var r,n,o}}}function it(e,t){return Array.isArray(e)?function(e,t){var r=yt.get(e);if(r&&!r.enumerable&&!t&&r.nested)throw TypeError(pt(e,"Nested model definition cannot be used outside of the parent definition"));if(!r){var n=mt(e),o=new Set;if(o.add(n),!t){if(!n.enumerable)throw TypeError(pt(e,"Provided model definition does not support listing (it must be enumerable - set `id` property to `true`)"));if(!n.storage.list)throw TypeError(pt(e,"Provided model definition storage does not support `list` action"))}r={list:!0,nested:!n.enumerable&&t,model:e,contexts:o,enumerable:n.enumerable,storage:nt({cache:n.storage.cache,get:!t&&function(e){return n.storage.list(e)}}),placeholder:function(){return Object.freeze(Object.create(gt))},isInstance:function(e){return Object.getPrototypeOf(e)!==gt},create:function(t){var o=t.reduce((function(t,r){var o=r;if("object"===Be(r)&&null!==r){o=r.id;var i=Ge.get(r),a=r;if(i){if(i.model!==e)throw TypeError("Model instance must match the definition")}else a=n.create(r),n.enumerable&&(o=a.id,Ze(n,o,a));n.enumerable||t.push(a)}else if(!n.enumerable)throw TypeError("Model instance must be an object: ".concat(Be(r)));if(n.enumerable){var s=t.length;Object.defineProperty(t,s,{get:function(){return ve(this,s,_t(this)?ht:function(){return Ot(e,o)})},enumerable:!0})}return t}),[]);return Ge.set(o,r),K.set(o,Pt),Object.freeze(o)}},yt.set(e,Object.freeze(r))}return r}(e[0],t):mt(e,t)}function at(e,t){switch(e){case"string":return function(e){return null!=e?String(e):""};case"number":return Number;case"boolean":return Boolean;default:throw TypeError("The value of the '".concat(t,"' must be a string, number or boolean: ").concat(e))}}var st=function(e,t){return t};function ct(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;return be(e,"state",st,{state:t,value:r}),e}var ut=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{state:"ready",value:e};return t};function lt(e){return ve(e,"state",ut)}function dt(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,dt)}var ft=new WeakMap;function pt(e,t){return"".concat(t,":\n\n").concat(JSON.stringify(e,(function(e,t){if(e!==Ye)return t}),2),"\n\n")}var ht=function(e,t){return t},vt=Promise.resolve(),bt=new WeakMap;function mt(e,t){if("object"!==Be(e)||null===e)throw TypeError("Model definition must be an object: ".concat(Be(e)));var r=bt.get(e);if(r&&!r.enumerable){if(t&&!r.nested)throw TypeError(pt(e,"Provided model definition for nested object already used as a root definition"));if(!t&&r.nested)throw TypeError(pt(e,"Nested model definition cannot be used outside of the parent definition"))}if(!r){var n,o=e[Ye];"object"===Be(o)&&Object.freeze(o);var i={},a=hasOwnProperty.call(e,"id"),s=new Map;(r={model:e,external:!!o,enumerable:a,nested:!a&&t,placeholder:function(e){return Object.freeze(Object.assign(Object.create(i),{id:e}))},isInstance:function(e){return Object.getPrototypeOf(e)!==i},invalidate:function(){n||(n=vt.then((function(){ye(r,r,!0),n=null})))},checks:s}).storage=nt(o||ot(r));var c=Object.keys(Object.freeze(e)).filter((function(e){return e!==Ye})).map((function(t){if("id"!==t&&Object.defineProperty(i,t,{get:function(){throw Error("Model instance in ".concat(lt(this).state," state - use store.pending(), store.error(), or store.ready() guards"))},enumerable:!0}),"id"===t){if(!0!==e[t])throw TypeError("The 'id' property in model definition must be set to 'true' or not be defined");return function(e,t,r){var n;n=r?r.id:hasOwnProperty.call(t,"id")?String(t.id):dt(),Object.defineProperty(e,"id",{value:n,enumerable:!0})}}var n=function(e,t,r){var n=r.model[t],o=Be(r.model[t]);if(n instanceof String||n instanceof Number){var i=ft.get(n);if(!i)throw TypeError(pt(e,"You must use primitive ".concat(Be(n.valueOf())," value for '").concat(t,"' property of the provided model definition")));o=Be(n=n.valueOf()),r.checks.set(t,i)}return{defaultValue:n,type:o}}(e,t,r),o=n.defaultValue,a=n.type;switch(a){case"function":return function(e){Object.defineProperty(e,t,{get:function(){return ve(this,t,o)}})};case"object":if(null===o)throw TypeError("The value for the '".concat(t,"' must be an object instance: ").concat(o));if(Array.isArray(o)){var s=Be(o[0]);if("object"!==s){var c=at(s,t),u=Object.freeze(o.map(c));return function(e,r,n){if(hasOwnProperty.call(r,t)){if(!Array.isArray(r[t]))throw TypeError("The value for '".concat(t,"' property must be an array: ").concat(Be(r[t])));e[t]=Object.freeze(r[t].map(c))}else n&&hasOwnProperty.call(n,t)?e[t]=n[t]:e[t]=u}}var l=it(o,!0);if(l.enumerable&&o[1]){var d=o[1];if("object"!==Be(d))throw TypeError("Options for '".concat(t,"' array property must be an object instance: ").concat(Be(d)));d.loose&&(r.contexts=r.contexts||new Set,r.contexts.add(it(o[0])))}return function(e,r,n){if(hasOwnProperty.call(r,t)){if(!Array.isArray(r[t]))throw TypeError("The value for '".concat(t,"' property must be an array: ").concat(Be(r[t])));e[t]=l.create(r[t])}else e[t]=n&&n[t]||!l.enumerable&&l.create(o)||[]}}var f=it(o,!0);return f.enumerable||f.external?function(e,r,n){var i;if(hasOwnProperty.call(r,t)){var a=r[t];if("object"!==Be(a)||null===a)null!=a&&(i={id:a});else{var s=Ge.get(a);if(s){if(s.model!==o)throw TypeError("Model instance must match the definition");i=a}else i=f.create(a),Ze(f,i.id,i)}}else i=n&&n[t];if(i){var c=i.id;Object.defineProperty(e,t,{get:function(){return ve(this,t,_t(this)?ht:function(){return Ot(o,c)})},enumerable:!0})}else e[t]=void 0}:function(e,r,n){hasOwnProperty.call(r,t)?e[t]=f.create(r[t],n&&n[t]):e[t]=n?n[t]:f.create({})};default:var p=at(a,t);return function(e,r,n){hasOwnProperty.call(r,t)?e[t]=p(r[t]):n&&hasOwnProperty.call(n,t)?e[t]=n[t]:e[t]=o}}}));r.create=function(e,t){if(null===e)return null;if("object"!==Be(e))throw TypeError("Model values must be an object instance: ".concat(e));var n=c.reduce((function(r,n){return n(r,e,t),r}),{});return Ge.set(n,r),K.set(n,Pt),Object.freeze(n)},Object.freeze(i),bt.set(e,Object.freeze(r))}return r}var gt=Object.getOwnPropertyNames(Array.prototype).reduce((function(e,t){return"length"===t||"constructor"===t||Object.defineProperty(e,t,{get:function(){throw Error("Model list instance in ".concat(lt(this).state," state - use store.pending(), store.error(), or store.ready() guards"))}}),e}),[]),yt=new WeakMap;function wt(e,t){return t||Qe()}function Et(e,t,r){return ct(e,"error",t)}function Ot(e,t){var r,n=it(e);if(!n.storage.get)throw TypeError(pt(e,"Provided model definition does not support 'get' method"));if(n.enumerable){if(r=function(e){switch(Be(e)){case"object":return JSON.stringify(Object.keys(e).sort().reduce((function(t,r){if("object"===Be(e[r])&&null!==e[r])throw TypeError("You must use primitive value for '".concat(r,"' key: ").concat(Be(e[r])));return t[r]=e[r],t}),{}));case"undefined":return;default:return String(e)}}(t),!n.list&&!r)throw TypeError(pt(e,'Provided model definition requires non-empty id: "'.concat(r,'"')))}else if(void 0!==t)throw TypeError(pt(e,"Provided model definition does not support id"));return ve(n,r,(function(e,o){if(o&&_t(o))return o;var i=!0;if(n.contexts&&n.contexts.forEach((function(e){ve(e,e,wt)===Qe()&&(i=!1)})),i&&o&&(!0===n.storage.cache||n.storage.validate(o)))return o;try{var a=n.storage.get(t);if("object"!==Be(a)||null===a)throw Error("Model instance ".concat(void 0!==r?"with '".concat(r,"' id"):""," does not exist: ").concat(a));return a instanceof Promise?(a=a.then((function(e){if("object"!==Be(e)||null===e)throw Error("Model instance ".concat(void 0!==r?"with '".concat(r,"' id"):""," does not exist: ").concat(a));return Ze(n,r,n.create(r?He({},e,{id:r}):e))})).catch((function(e){return Ze(n,r,Et(o||n.placeholder(r),e))})),ct(o||n.placeholder(r),"pending",a)):(o&&Ge.set(o,null),rt(n.create(r?He({},a,{id:r}):a)))}catch(e){return rt(Et(o||n.placeholder(r),e))}}),n.storage.validate)}var xt=new WeakMap;function jt(e){var t=Object.keys(e),r=Error("Model validation failed (".concat(t.join(", "),") - read the details from 'errors' property"));return r.errors=e,r}function St(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("object"!==Be(e)||null===e)throw TypeError("The first argument must be a model instance or a model definition: ".concat(e));var r=Ge.get(e);if(null===r)throw Error("Provided model instance has expired. Haven't you used stale value from the outer scope?");if(r)ye(r,e.id,t,!0);else{if(!bt.get(e)&&!yt.get(e[0]))throw Error("Model definition must be used before - passed argument is probably not a model definition");we(it(e),t,!0)}}function _t(e){if(null===e||"object"!==Be(e))return!1;var t=lt(e),r=t.state,n=t.value;return"pending"===r&&n}function Nt(e,t){if(null===e||"object"!==Be(e))return!1;var r=lt(e),n=r.state,o=r.value,i="error"===n&&o;return i&&void 0!==t?i.errors&&i.errors[t]:i}function Tt(e){if(null===e||"object"!==Be(e))return!1;var t=Ge.get(e);return!(!t||!t.isInstance(e))}function kt(e,t){var r=Object.freeze(Object.keys(e).reduce((function(t,r){return Object.defineProperty(t,r,{get:function(){return e[r]},enumerable:!0}),t}),Object.create(e)));Ge.set(r,Ge.get(e));var n=lt(t);return ct(r,n.state,n.value)}function At(e){var t=He({},e);return delete t.id,t}function Mt(e,t){return!!e||"".concat(t," is required")}function Pt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=it(e);if("object"!==Be(t)&&(t={id:t}),void 0!==t.id&&"function"!=typeof t.id){var n=t.id;t.id=function(e){return e[n]}}if(t.draft){if(r.list)throw TypeError("Draft mode is not supported for listing model definition");e=He({},e,Ue({},Pt.connect,{get:function(e){var t=Pt.get(r.model,e);return Tt(t)?t:_t(t)},set:function(e,t){return null===t?{id:e}:t}})),t.draft=it(e),xt.set(t.draft,{model:r.model,id:t.id})}var o=t.draft&&r.enumerable&&!t.id,i={get:function(r,n){if(o&&!n){var i=t.draft.create({});return Ze(t.draft,i.id,i),Pt.get(e,i.id)}var a=t.draft&&n?n.id:t.id&&t.id(r),s=Pt.get(e,a);return n&&s!==n&&!Tt(s)?kt(n,s):s},set:r.list?void 0:function(e,t,r){return r&&Tt(r)||(r=i.get(e)),Pt.set(r,t).catch((function(){})),r},connect:t.draft?function(){return function(){return St(e,!1)}}:void 0};return i}Object.assign(Pt,{connect:Ye,get:Ot,set:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Ge.get(e),o=!!n;if(null===n)throw Error("Provided model instance has expired. Haven't you used stale value?");if(n||(n=it(e)),n.nested)throw pt(n.model,TypeError("Setting provided nested model instance is not supported, use the root model instance"));if(n.list)throw TypeError("Listing model definition does not support 'set' method");if(!n.storage.set)throw pt(n.model,TypeError("Provided model definition storage does not support 'set' method"));if(o&&_t(e))throw Error("Provided model instance is in pending state");var i=function(r,i){if(o)ct(e,r,i);else{var a=de(n,t);a.value&&ct(a.value,r,i)}};try{if(n.enumerable&&!o&&(!r||"object"!==Be(r)))throw TypeError("Values must be an object instance: ".concat(r));if(r&&hasOwnProperty.call(r,"id"))throw TypeError("Values must not contain 'id' property: ".concat(r.id));var a=n.create(r,o?e:void 0),s=r?Object.keys(r):[],c=xt.get(n),u={},l=o&&c&&Nt(e),d=!1;if(a&&(n.checks.forEach((function(e,t){if(-1!==s.indexOf(t)||(l&&l.errors&&l.errors[t]&&(d=!0,u[t]=l.errors[t]),!c||a[t]!=n.model[t])){var r;try{r=e(a[t],t,a)}catch(e){r=e}!0!==r&&void 0!==r&&(d=!0,u[t]=r||!0)}})),d&&!c))throw jt(u);t=a?a.id:e.id;var f=Promise.resolve(n.storage.set(o?t:void 0,a,s)).then((function(e){var r=e===a?a:n.create(e);if(o&&r&&t!==r.id)throw TypeError("Local and storage data must have the same id: '".concat(t,"', '").concat(r.id,"'"));var i=r?r.id:t;return d&&c&&ct(r,"error",jt(u)),Ze(n,i,r||Et(n.placeholder(i),Error("Model instance ".concat(void 0!==t?"with '".concat(t,"' id"):""," does not exist: ").concat(r))),!0)})).catch((function(e){throw e=void 0!==e?e:Error("Undefined error"),i("error",e),e}));return i("pending",f),f}catch(e){return i("error",e),Promise.reject(e)}},clear:St,pending:_t,error:Nt,ready:Tt,submit:function(e){var t=Ge.get(e);if(!t||!xt.has(t))throw TypeError("Provided model instance is not a draft: ".concat(e));if(_t(e))throw Error("Model draft in pending state");var r,n=xt.get(t);if(n.id){var o=Pt.get(n.model,e.id);r=Promise.resolve(_t(o)||o).then((function(t){return Pt.set(t,At(e))}))}else r=Pt.set(n.model,At(e));return r=r.then((function(t){return ct(e,"ready"),Pt.set(e,At(t)).then((function(){return t}))})).catch((function(t){return ct(e,"error",t),Promise.reject(t)})),ct(e,"pending",r),r},value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Mt,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";switch(Be(e)){case"string":e=new String(e);break;case"number":e=new Number(e);break;default:throw TypeError("Default value must be a string or a number: ".concat(Be(e)))}if(r instanceof RegExp)t=function(e){return r.test(e)||n};else{if("function"!=typeof r)throw TypeError("The second argument must be a RegExp instance or a function: ".concat(Be(r)));t=function(){var e=r.apply(void 0,arguments);return!0!==e&&void 0!==e?e||n:e}}return ft.set(e,t),e}});var $t=new WeakMap,Ct=function(e,t){var r=$t.get(e);return r||(t&&$t.set(e,t),t)},Lt=function(e,t){return $t.set(e,t),t};function Vt(e){for(var t;e&&(t=Ct(e))&&t.endNode;)e=t.endNode;return e}function Dt(e){if(e.nodeType!==Node.TEXT_NODE)for(var t=e.childNodes[0];t;)e.removeChild(t),t=e.childNodes[0];else{var r=Ct(e);if(r.startNode)for(var n=Vt(r.endNode),o=r.startNode,i=n.nextSibling;o;){var a=o.nextSibling;o.parentNode.removeChild(o),o=a!==i&&a}}}var Wt=new WeakMap;function zt(e,t){var r=Ct(e),n=r.startNode,o=Vt(r.endNode);t.parentNode.insertBefore(e,t.nextSibling);for(var i=e,a=n;a;){var s=a.nextSibling;i.parentNode.insertBefore(a,i.nextSibling),i=a,a=s!==o.nextSibling&&s}}function Rt(e){return(Rt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function It(e,t,r){var n=Array.isArray(r)?"array":Rt(r),o=Ct(t,{});switch(o.type!==n&&(Dt(t),"array"===n&&Wt.delete(t),o=Lt(t,{type:n}),""!==t.textContent&&(t.textContent="")),n){case"function":r(e,t);break;case"array":!function(e,t,r,n){var o=Wt.get(t),i=r.map((function(e,t){return{id:Object.prototype.hasOwnProperty.call(e,"id")?e.id:t,value:e,placeholder:null,available:!0}}));if(Wt.set(t,i),o){var a=new Set;i.forEach((function(e){return a.add(e.id)})),o=o.filter((function(e){return!!a.has(e.id)||(Dt(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder),!1)}))}for(var s=t,c=r.length-1,u=Ct(t),l=0;l<i.length;l+=1){var d=i[l],f=void 0;if(o)for(var p=0;p<o.length;p+=1)if(o[p].available&&o[p].id===d.id){f=o[p];break}f?(f.available=!1,d.placeholder=f.placeholder,d.placeholder.previousSibling!==s&&zt(d.placeholder,s),f.value!==d.value&&n(e,d.placeholder,d.value)):(d.placeholder=document.createTextNode(""),s.parentNode.insertBefore(d.placeholder,s.nextSibling),n(e,d.placeholder,d.value)),s=Vt(Ct(d.placeholder).endNode||d.placeholder),0===l&&(u.startNode=d.placeholder),l===c&&(u.endNode=s)}o&&o.forEach((function(e){e.available&&(Dt(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder))}))}(e,t,r,It);break;default:t.textContent="number"===n||r?r:""}}function Bt(e){return(Bt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ft=new WeakMap;function Ht(e){return(Ht="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ut=new WeakMap;function Xt(e,t,r){var n=Ut.get(t)||new Set,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;return Array.isArray(e)?e.forEach((function(e){return t.add(e)})):null!==e&&"object"===Ht(e)?Object.keys(e).forEach((function(r){return e[r]&&t.add(r)})):t.add(e),t}(r);Ut.set(t,o),o.forEach((function(e){t.classList.add(e),n.delete(e)})),n.forEach((function(e){t.classList.remove(e)}))}function qt(e){return(qt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Yt=new WeakMap;function Gt(e,t,r){if(null===r||"object"!==qt(r))throw TypeError("Style value must be an object in ".concat(function(e){return"<".concat(String(e.tagName).toLowerCase(),">")}(t),":"),r);var n=Yt.get(t)||new Map,o=Object.keys(r).reduce((function(e,o){var i=q(o),a=r[o];return a||0===a?t.style.setProperty(i,a):t.style.removeProperty(i),e.set(i,a),n.delete(i),e}),new Map);n.forEach((function(e,r){t.style[r]=""})),Yt.set(t,o)}function Jt(e,t,r){if("on"===t.substr(0,2))return function(e){return function(t,r,n,o){if(o){var i=Ft.get(r);i&&r.removeEventListener(e,i.get(o),void 0!==o.options&&o.options)}if(n){if("function"!=typeof n)throw Error("Event listener must be a function: ".concat(Bt(n)));var a=Ft.get(r);a||(a=new WeakMap,Ft.set(r,a));var s=n.bind(null,t);a.set(n,s),r.addEventListener(e,s,void 0!==n.options&&n.options)}}}(t.substr(2));switch(e){case"class":return Xt;case"style":return Gt;default:return function(n,o,i){if(r||o instanceof SVGElement||!(t in o))if(!1===i||null==i)o.removeAttribute(e);else{var a=!0===i?"":String(i);o.setAttribute(e,a)}else o[t]!==i&&(o[t]=i)}}}function Kt(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Zt(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Zt(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Zt(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Qt(e){return(Qt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{er.env.NODE_ENV}catch(e){var er={env:{NODE_ENV:"production"}}}var tr=Date.now(),rr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return"{{h-".concat(tr,"-").concat(e,"}}")},nr=rr("(\\d+)"),or=new RegExp("^".concat(nr,"$")),ir=new RegExp(nr,"g"),ar="--".concat(tr,"--"),sr=new RegExp(ar,"g"),cr=new WeakMap;var ur="object"===Qt(window.ShadyDOM)&&window.ShadyDOM.inUse?function(e){var t;return{get currentNode(){return t},nextNode:function(){if(void 0===t)t=e.childNodes[0];else if(t.childNodes.length)t=t.childNodes[0];else if(t.nextSibling)t=t.nextSibling;else{var r=t.parentNode;for(t=r.nextSibling;!t&&r!==e;)r=r.parentNode,t=r.nextSibling}return!!t}}}:function(e){return document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null,!1)},lr=document.createElement("div"),dr=new Map;function fr(e,t,r){var n=document.createElement("template"),o=[],i=function(e,t){var r=e.reduce((function(t,r,n){return 0===n?r:e.slice(n).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)?"".concat(t,"\x3c!--").concat(rr(n-1),"--\x3e").concat(r):t+rr(n-1)+r}),"");return t&&(r+="<style>\n".concat(t.join("\n/*------*/\n"),"\n</style>")),J?r.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>/]+)/g,(function(e){return"".concat(ar).concat(e)})):r}(e,r);if(t&&(i="<svg>".concat(i,"</svg>")),J?n.innerHTML=i:(lr.innerHTML="<template>".concat(i,"</template>"),n.content.appendChild(lr.children[0].content)),t){var a=n.content.firstChild;n.content.removeChild(a),Array.from(a.childNodes).forEach((function(e){return n.content.appendChild(e)}))}!function(e){for(var t,r=document.createNodeIterator(e,NodeFilter.SHOW_COMMENT,null,!1);t=r.nextNode();)or.test(t.textContent)&&(t.parentNode.insertBefore(document.createTextNode(t.textContent),t),t.parentNode.removeChild(t))}(n.content);for(var s=ur(n.content),c=0,u=function(){var r=s.currentNode;if(r.nodeType===Node.TEXT_NODE){var n=r.textContent;if(!n.match(or)){var i=n.match(ir);if(i){var a=r;i.reduce((function(e,t){var r=Kt(e.pop().split(t),2),n=r[0],o=r[1];return n&&e.push(n),e.push(t),o&&e.push(o),e}),[n]).forEach((function(e,t){0===t?a.textContent=e:a=a.parentNode.insertBefore(document.createTextNode(e),a.nextSibling)}))}}var u=r.textContent.match(or);u&&(J||(r.textContent=""),o[u[1]]=[c,It])}else r.nodeType===Node.ELEMENT_NODE&&Array.from(r.attributes).forEach((function(n){var i=n.value.trim(),a=J?n.name.replace(ar,""):n.name,s=i.match(or);if(s){var u=e[s[1]].replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop();o[s[1]]=[c,Jt(a,u,t)],r.removeAttribute(n.name)}else{var l=i.match(ir);if(l){var d="attr__".concat(a);l.forEach((function(e,t){var r=Kt(e.match(or),2)[1];o[r]=[c,function(r,n,o){var s=Ct(n,{});s[d]=(s[d]||i).replace(e,null==o?"":o),1!==l.length&&t+1!==l.length||(n.setAttribute(a,s[d]),s[d]=void 0)}]})),n.value="",J&&a!==n.name&&(r.removeAttribute(n.name),r.setAttribute(a,""))}}}));c+=1};s.nextNode();)u();return function(e,t,r,i){var a=Ct(t,{type:"function"});if(n!==a.template){(a.template||t.nodeType===Node.ELEMENT_NODE)&&Dt(t),a.prevArgs=null;var s=document.importNode(function(e,t){return t?G((function(r){var n=cr.get(e);n||(n=new Map,cr.set(e,n));var o=n.get(t);if(!o){(o=document.createElement("template")).content.appendChild(e.content.cloneNode(!0)),n.set(t,o);var i=o.content.querySelectorAll("style");Array.from(i).forEach((function(e){for(var t=e.childNodes.length+1,r=0;r<t;r+=1)e.parentNode.insertBefore(document.createTextNode(rr()),e)})),r.prepareTemplate(o,t.toLowerCase())}return o}),e):e}(n,e.tagName).content,!0),c=ur(s),u=o.slice(0),l=0,d=u.shift(),f=[];for(a.template=n,a.markers=f;c.nextNode();){var p=c.currentNode;for(p.nodeType===Node.TEXT_NODE&&(or.test(p.textContent)?p.textContent="":J&&(p.textContent=p.textContent.replace(sr,"")));d&&d[0]===l;)f.push([p,d[1]]),d=u.shift();l+=1}if(t.nodeType===Node.TEXT_NODE){a.startNode=s.childNodes[0],a.endNode=s.childNodes[s.childNodes.length-1];for(var h=t,v=s.childNodes[0];v;)t.parentNode.insertBefore(v,h.nextSibling),h=v,v=s.childNodes[0]}else t.appendChild(s)}var b=t.adoptedStyleSheets;if(i){var m=!1;if((i=i.map((function(e){if(e instanceof CSSStyleSheet)return e;var t=dr.get(e);return t||((t=new CSSStyleSheet).replaceSync(e),dr.set(e,t)),t}))).length===b.length){m=!0;for(var g=0;g<i.length;g+=1)if(i[g]!==b[g]){m=!1;break}}m||(t.adoptedStyleSheets=i)}else b&&b.length&&(t.adoptedStyleSheets=[]);var y=a.prevArgs;a.prevArgs=r;for(var w=0;w<a.markers.length;w+=1){var E=Kt(a.markers[w],2),O=E[0],x=E[1];if(!y||y[w]!==r[w])try{x(e,O,r[w],y?y[w]:void 0)}catch(e){throw e}}t.nodeType!==Node.TEXT_NODE&&G((function(t){e.shadowRoot&&(y?t.styleSubtree(e):t.styleElement(e))}))}}function pr(e){return(pr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function hr(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function vr(e,t){var r,n=e.target;switch(n.type){case"radio":case"checkbox":r=n.checked&&n.value;break;case"file":r=n.files;break;default:r=n.value}t(r)}function br(e,t){return e.split(".").reverse().reduce((function(e,r){return hr({},r,e||t)}),null)}var mr=new Map;var gr=new WeakMap;var yr=Object.freeze({__proto__:null,set:function(e,t){if(!e)throw Error("The first argument must be a property name or an object instance: ".concat(e));if("object"===pr(e)){if(void 0===t)throw Error("For model instance property the second argument must be defined");var r=K.get(e);if(!r)throw Error("Provided object must be a model instance of the store");return function(n,o){vr(o,(function(n){r.set(e,null!==t?br(t,n):t)}))}}if(2===arguments.length)return function(r){r[e]=t};var n=mr.get(e);return n||(n=function(t,r){vr(r,(function(r){t[e]=r}))},mr.set(e,n)),n},resolve:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return function(n,o){var i;t&&(i=setTimeout((function(){i=void 0,requestAnimationFrame((function(){t(n,o)}))}),r)),gr.set(o,e),e.then((function(t){i&&clearTimeout(i),gr.get(o)===e&&(t(n,o),gr.set(o,null))}))}}}),wr=rr(),Er=rr("svg"),Or=/@import/,xr=new Map,jr=new WeakMap,Sr={define:function(e){return ze(e),this},key:function(e){return this.id=e,this},style:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return jr.set(this,t.filter((function(e){return e}))),this}};function _r(e,t,r){return Object.assign((function n(o){var i,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,s=jr.get(n),c=e.join(wr);if(s){var u=s.join(wr);(i=!!a.adoptedStyleSheets&&!Or.test(u))||(c+=u)}r&&(c+=Er);var l=xr.get(c);l||(l=fr(e,r,!i&&s),xr.set(c,l)),l(o,a,t,i&&s)}),Sr)}Object.assign((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return _r(e,r)}),yr),Object.assign((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return _r(e,r,!0)}),yr);const Nr=e=>function t(...r){return r.length<e.length?t.bind(null,...r):e.call(null,...r)},Tr=Nr((e,t,r)=>(t-e)*r+e),kr=Nr((e,t,r)=>(r-e)/(t-e)),Ar=Nr((e,t,r)=>Math.max(e,Math.min(r,t))),Mr=Nr((e,t)=>{if(e<=0)return t;const r=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(r?r.length:0))}),Pr=Nr((e,t,r,n,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(kr(e,t),Tr(r,n))(o)),$r=(e,t)=>({get:r=>r.getAttribute(e)||t,set:(t,r)=>(t.setAttribute(e,r),r),connect:(r,n,o)=>{r[n]=null===r.getAttribute(e)?t:r.getAttribute(e);new MutationObserver(o).observe(r,{attributeFilter:[e]})}}),Cr={boolean:(e,t)=>Object.assign(Object.assign({},$r(e,t)),{get:r=>r.hasAttribute(e)||t,set:(t,r)=>(r?t.setAttribute(e,""):t.removeAttribute(e),!!r),connect:(t,r,n)=>{t[r]=t.hasAttribute(e);new MutationObserver(n).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},$r(e,t)),{get:r=>parseFloat(r.getAttribute(e))||t}),string:$r},Lr=Nr((e,t)=>e&&Cr[typeof t]?Cr[typeof t](e,t):te(t)),Vr=e=>{return r=-e,n=e+1,t=Array.from("0".repeat(n-r),(e,t)=>r+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,r,n},Dr=e=>{const{lineWidth:t}=e,r=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return Vr(r).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},Wr=V`
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
`,zr={lineWidth:Lr("line-width",1)},Rr=ze("ue-text",Object.assign(Object.assign({},zr),{render:B(e=>V`
    ${Wr}
    <div style="text-shadow: ${Dr(e)};"><slot></slot></div>
`)})),Ir=V`
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
`,Br=Nr((e,{type:t})=>{}),Fr=V`
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
`,Hr=Object.assign({active:Lr("active",!1),checked:Lr("checked",!1),disabled:Lr("disabled",!1),focused:Lr("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),Ur=ze("ue-button",Object.assign(Object.assign({},Hr),{render:B(e=>{const{active:t,checked:r,disabled:n,focused:o}=e;return V`
        ${Ir} ${Fr}

        <button
            tabindex="0"
            class=${z({active:t,checked:r,focused:o})}
            .disabled=${n}
            @focus=${Br(e)}
            @blur=${Br(e)}
            @mousedown=${Br(e)}
            @mouseup=${Br(e)}
        >
            <slot></slot>
        </button>
    `})})),Xr=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),qr=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function Yr(e,t={}){const r={};return qr.forEach(t=>{r[t]=e[t]}),Object.assign(r,t)}function Gr(e,t,r={}){const n=new MouseEvent(t,r);return n.shftTarget=e,e.dispatchEvent(n),n}const Jr=(e,t,r,n)=>(e.addEventListener(t,r,n||{}),()=>{e.removeEventListener(t,r,n||{})});function Kr(e,t=0,r=1){return Math.max(t,Math.min(e,r))}const Zr=new WeakMap;Object.assign(window,{isDrag:e=>Zr.has(e),undrag:e=>{e.removeEventListener("mousedown",Zr.get(e)),Zr.delete(e)}});class Qr{constructor(e){this.el=e}handleEvent(e){if(1===e.buttons){Gr(this.el,"dragstart",Yr(e)),this.el.setAttribute("is-dragging","");const t=Jr(document,"mousemove",e=>{Gr(this.el,"drag",Yr(e))});document.addEventListener("mouseup",e=>{t(),this.el.removeAttribute("is-dragging"),Gr(this.el,"dragend",Yr(e))},{once:!0})}}}class en{constructor(e){this.el=e,this.remove=()=>{},this.dropover=!1}get accepts(){return this.el.getAttribute("drop-accepts")||""}get overlap(){return parseFloat(this.el.getAttribute("drop-overlap"))||.5}canAccept(e){return!this.accepts||e.matches(this.accepts)}canDrop(e){return function(e,t){if(!e.getBoundingClientRect||!t.getBoundingClientRect)return 0;const{left:r,right:n,top:o,bottom:i,height:a,width:s}=e.getBoundingClientRect(),{left:c,right:u,top:l,bottom:d}=t.getBoundingClientRect();return Kr(Math.min(n,u)-Math.max(r,c),0,s)*Kr(Math.min(i,d)-Math.max(o,l),0,a)/(s*a)}(e,this.el)>=this.overlap}handleEvent({detail:{shftTarget:e}}){e&&this.canAccept(e)&&(Gr(this.el,"dropopen",{relatedTarget:e}),this.el.setAttribute("drop-open",""),this.remove=Jr(e,"drag",this.dragListener.bind(this)),e.addEventListener("dragend",this.dragEndListener.bind(this),{once:!0}))}dragListener({shftTarget:e}){const t=this.canDrop(e);if(t!==this.dropover){[e,this.el].forEach((e,r,n)=>{Gr(e,t?"dragenter":"dragleave",{relatedTarget:n[1-r]})});const r=t?"setAttribute":"removeAttribute";this.el[r]("drop-over",""),this.dropover=t}t&&[e,this.el].forEach((e,t,r)=>{Gr(e,"dragover",{relatedTarget:r[1-t]})})}dragEndListener({shftTarget:e}){this.remove(),this.remove=()=>{},this.el.removeAttribute("drop-open"),this.el.removeAttribute("drop-over"),Gr(this.el,"drop-close",{relatedTarget:e}),this.canDrop(e)&&[e,this.el].forEach((e,t,r)=>{Gr(e,"drop",{relatedTarget:r[1-t]})})}}let tn=[];const rn=({shftTarget:e})=>{tn=tn.filter(e=>e.isConnected),tn.forEach(t=>{t.dispatchEvent(new CustomEvent("_dragstart",{detail:{shftTarget:e}}))})};Object.assign(window,{DROPS:tn});var nn={drag:e=>{if(e instanceof Element&&!Zr.has(e)){const t=new Qr(e);e.addEventListener("mousedown",t),Zr.set(e,t)}return e},drop:function(e,t={accepts:"",overlap:.5}){return e instanceof Element&&!(e=>tn.includes(e))(e)&&(["accepts","overlap"].forEach(r=>{e.setAttribute("drop-"+r,t[r])}),e.addEventListener("_dragstart",new en(e)),document.addEventListener("dragstart",rn),tn=[...tn.filter(e=>e.isConnected),e]),e},util:{clear:function(e){const{drags:t,drops:r}=Xr;if(t.has(e)){const{onmousedown:r,onmousemove:n,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",r),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)}if(r.has(e)){const{ondragstart:t,ondrag:n,ondragend:o}=r.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",n),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(r=>{let n=parseFloat(t.style[r])||0;n+="left"===r?e.movementX:e.movementY,t.style[r]=n+"px"})},is:function(e,t){const{drags:r,drops:n}=Xr;switch(t){case"drag":case"draggable":return r.has(e);case"drop":case"droppable":return n.has(e);default:return r.has(e)||n.has(e)}},matches:function(e,t){return!t||0===t.length||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}},_GLOBAL:Xr};const{drag:on}=nn,an=V`
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
`,sn={min:Lr("min",0),max:Lr("max",100),step:Lr("step",1),value:Object.assign(Object.assign({},Lr("value",0)),{observe:(e,t)=>{Y(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}}),bar:{get:({render:e})=>e().querySelector(".slider-bar"),observe:(e,t,r)=>{t&&t!==r&&on(t)}}},cn=(e,{clientX:t})=>{const r=t-e.getBoundingClientRect().left,{min:n,max:o,step:i,clientWidth:a}=e;e.value=Ar(n,o,Mr(i,Pr(0,a,n,o,r)))},un=ze("ue-slider",Object.assign(Object.assign({},sn),{render:B(e=>{const{min:t,max:r,value:n,clientWidth:o}=e;return V`
        ${Ir} ${an}
        <div
            class="slider-bar"
            @drag=${t=>cn(e,t)}
            @mousedown=${t=>cn(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${Ar(0,o,Pr(t,r,0,o,n))}px) translateX(-50%);"
            ></div>
        </div>
    `})})),ln={arrow:((e,...t)=>new w(e,t,"svg",P))`
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
`},dn=V`
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
`,fn=ze("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:B(e=>V`
        ${dn} ${ln[e.shape]}
    `)})),pn={_ue_item:!0,active:Lr("active",!0),selected:Lr("selected",!1)},hn=Object.assign(Object.assign({},pn),{value:Lr("value",""),label:e=>e.getAttribute("label")||e.innerText,render:B(()=>V`<slot></slot>`)}),vn=Object.assign(Object.assign({},pn),{icon:Lr("icon",""),label:Lr("label",""),render:B(({active:e})=>V`${e?V`<slot></slot>`:V``}`)}),bn={items:Ie(e=>void 0!==e._ue_item)},mn={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{Y(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},gn=Nr((e,t)=>{e.forEach(e=>{e.selected=e===t})}),yn=ze("ue-list-item",hn),wn=ze("ue-content-item",vn),En={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,r)=>e.selected=r===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:r}=e;console.log("changed to "+t),r[t]&&Y(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:r[t].label,item:r[t]}})}},On={items:Ie(e=>e.ueItem)},xn=Object.assign(Object.assign({},On),{preselect:Lr("preselect",0),selected:En,selectedItem:({items:e})=>e.find(e=>e.selected)}),jn=Nr((e,t)=>V` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:r},n)=>V`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=n}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${n}">${r}</slot>
    </ue-button>
`),Sn=Object.assign(Object.assign({},xn),{location:Lr("location","left")}),_n=V`
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
`,Nn=ze("ue-tab-group",Object.assign(Object.assign({},Sn),{render:B(e=>V`
        ${_n}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${jn(e)}
        </div>
        <slot></slot>
    `)})),Tn=Object.assign(Object.assign({},xn),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return((e,t,r,n)=>(e.addEventListener(t,r,n),()=>e.removeEventListener(t,r,n)))(document,"click",()=>{e.open=!1},{once:!0})}}}),kn=V`
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
`,An={border:"1px solid transparent"},Mn={border:"1px solid var(--ue-active-bg-color)"},Pn=ze("ue-dropdown",Object.assign(Object.assign({},Tn),{render:B(e=>{const{open:t,selectedItem:r}=e;return V`
        ${kn}
        <div class="container" style=${I(t?Mn:An)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${r?r.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${I(t?Mn:An)}>
                    ${jn(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),$n={value:Object.assign(Object.assign({},Lr("value",0)),{observe:(e,t,r)=>{t!==r&&Y(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:Lr("duration",1),delay:Lr("delay",0)},Cn=ze("ue-progress-bar",Object.assign(Object.assign({},$n),{render:B(e=>{const{value:t,duration:r,delay:n}=e;return V`
        ${Ir}
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
                width: ${Ar(0,100,t)}%;
                transition: width ${Ar(0,1/0,r)}s ease
                    ${Ar(0,1/0,n)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{Y(e,"updated")}}
            ></div>
        </div>
    `})})),Ln=Object.assign(Object.assign({},xn),{direction:Lr("direction","column")}),Vn=V`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,Dn=ze("ue-select-grp",Object.assign(Object.assign({},Ln),{render:B(e=>V`
                ${Vn}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${jn(e)}
                </div>
            `)})),Wn={open:Lr("open",!1),direction:Lr("direction","right"),duration:Lr("duration",500)},zn=V`
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
`,Rn={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},In={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Bn=ze("ue-drawer",Object.assign(Object.assign({},Wn),{render:B(({direction:e,duration:t,open:r})=>V`
        ${zn}
        <div style=${I((({direction:e,duration:t,open:r})=>({transition:`transform ${t}ms`,flexDirection:Rn[e],transform:r?"translate(0, 0)":In[e]}))({direction:e,duration:t,open:r}))}>
            <slot></slot>
        </div>
    `)})),Fn=Object.assign(Object.assign({},bn),{selected:mn}),Hn=(e,t,r)=>(e.slot=e.selected?"selected-item":"",V`<ue-button .checked=${e.selected} @click=${()=>gn(r,e)}
        >${e.label}</ue-button
    >`),Un=({items:e})=>V`
        ${Ir}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(Hn)}
    `,Xn=ze("ue-list",Object.assign(Object.assign({},Fn),{render:B(Un)})),qn=ze("ue-tab-list",Object.assign(Object.assign({},Fn),{render:B(({items:e})=>V`${Un({items:e})} <slot name="selected-item"></slot>`)})),Yn=Object.assign(Object.assign({},bn),{render:B(({items:e})=>V`
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
        `)}),Gn=Object.assign(Object.assign({},pn),{msg:(Jn=Yn,Kn="function"==typeof Jn?Jn:function(e){return e===Jn},{get:function(e){return function(e,t){for(var r=e.parentElement||e.parentNode.host;r;){var n=r.constructor.hybrids;if(n&&t(n))return r;r=r.parentElement||r.parentNode&&r.parentNode.host}return r||null}(e,Kn)},connect:function(e,t,r){return!!e[t]&&r}}),index:e=>e.msg.items.indexOf(e),render:B(e=>V`
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
        `)});var Jn,Kn;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),r=document.createElement("ue-msg-item");r.innerText=e,t.appendChild(r)}});const Zn=ze("ue-msg",Yn),Qn=ze("ue-msg-item",Gn);return e.UeButton=Ur,e.UeContentItem=wn,e.UeDrawer=Bn,e.UeDropdown=Pn,e.UeIcon=fn,e.UeList=Xn,e.UeListItem=yn,e.UeMsg=Zn,e.UeMsgItem=Qn,e.UeProgressBar=Cn,e.UeSelectGrp=Dn,e.UeSlider=un,e.UeTabGroup=Nn,e.UeTabList=qn,e.UeText=Rr,e.shadowStyle=Dr,e}({});
