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
     */const t=new WeakMap,n=e=>(...n)=>{const r=e(...n);return t.set(r,!0),r},r=e=>"function"==typeof e&&t.has(e),o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},s={},a={},c=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${c}--\x3e`,l=new RegExp(`${c}|${u}`);class d{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],o=document.createTreeWalker(t.content,133,null,!1);let i=0,s=-1,a=0;const{strings:u,values:{length:d}}=e;for(;a<d;){const e=o.nextNode();if(null!==e){if(s++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let r=0;for(let e=0;e<n;e++)f(t[e].name,"$lit$")&&r++;for(;r-- >0;){const t=u[a],n=v.exec(t)[2],r=n.toLowerCase()+"$lit$",o=e.getAttribute(r);e.removeAttribute(r);const i=o.split(l);this.parts.push({type:"attribute",index:s,name:n,strings:i}),a+=i.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(c)>=0){const r=e.parentNode,o=t.split(l),i=o.length-1;for(let t=0;t<i;t++){let n,i=o[t];if(""===i)n=h();else{const e=v.exec(i);null!==e&&f(e[2],"$lit$")&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),n=document.createTextNode(i)}r.insertBefore(n,e),this.parts.push({type:"node",index:++s})}""===o[i]?(r.insertBefore(h(),e),n.push(e)):e.data=o[i],a+=i}}else if(8===e.nodeType)if(e.data===c){const t=e.parentNode;null!==e.previousSibling&&s!==i||(s++,t.insertBefore(h(),e)),i=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(n.push(e),s--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(c,t+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=r.pop()}for(const e of n)e.parentNode.removeChild(e)}}const f=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},p=e=>-1!==e.index,h=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let i,s=0,a=0,c=r.nextNode();for(;s<n.length;)if(i=n[s],p(i)){for(;a<i.index;)a++,"TEMPLATE"===c.nodeName&&(t.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=t.pop(),c=r.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));s++}else this.__parts.push(void 0),s++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const b=` ${c} `;class g{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const i=v.exec(e);t+=null===i?e+(n?b:u):e.substr(0,i.index)+i[1]+i[2]+"$lit$"+i[3]+c}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class y extends g{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,r=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,r),t=n}})(t,n.firstChild),e}}
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
     */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new O(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let r=0;r<t;r++){n+=e[r];const t=this.parts[r];if(void 0!==t){const e=t.value;if(w(e)||!x(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===s||w(e)&&e===this.value||(this.value=e,r(e)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const e=this.value;this.value=s,e(this)}this.value!==s&&this.committer.commit()}}class _{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=h()),e.__insert(this.endNode=h())}insertAfterPart(e){e.__insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}const e=this.__pendingValue;e!==s&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof g?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===a?(this.value=a,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,r=0;for(const o of e)n=t[r],void 0===n&&(n=new _(this.options),t.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(t[r-1])),n.setValue(o),n.commit(),r++;r<t.length&&(t.length=r,this.clear(n&&n.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class N{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=s}}class j extends E{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends O{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=$(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=s}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const $=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const A=new class{handleAttributeExpressions(e,t,n,r){const o=t[0];if("."===o){return new j(e,t.slice(1),n).parts}return"@"===o?[new T(e,t.slice(1),r.eventContext)]:"?"===o?[new N(e,t.slice(1),n)]:new E(e,t,n).parts}handleTextExpression(e){return new _(e)}};
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
     */function M(e){let t=C.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},C.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(c);return n=t.keyString.get(r),void 0===n&&(n=new d(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}const C=new Map,L=new WeakMap;
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const V=(e,...t)=>new g(e,t,"html",A);
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
class P{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const W=new WeakMap,D=n(e=>t=>{if(!(t instanceof O)||t instanceof S||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=t,{element:r}=n;let o=W.get(t);void 0===o&&(r.setAttribute("class",n.strings.join(" ")),W.set(t,o=new Set));const i=r.classList||new P(r);o.forEach(t=>{t in e||(i.remove(t),o.delete(t))});for(const t in e){const n=e[t];n!=o.has(t)&&(n?(i.add(t),o.add(t)):(i.remove(t),o.delete(t)))}"function"==typeof i.commit&&i.commit()}),R=new WeakMap,B=n(e=>t=>{if(!(t instanceof O)||t instanceof S||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:n}=t,{style:r}=n.element;let o=R.get(t);void 0===o&&(r.cssText=n.strings.join(" "),R.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?r[t]=null:r.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?r[t]=e[t]:r.setProperty(t,e[t])}),F=new WeakSet,I=n(e=>t=>{F.has(t)||(t.setValue(e()),F.add(t))}),H=(e,t={})=>n=>{const r=e(n);return(e,n)=>((e,t,n)=>{let r=L.get(t);void 0===r&&(i(t,t.firstChild),L.set(t,r=new _(Object.assign({templateFactory:M},n))),r.appendInto(t)),r.setValue(e),r.commit()})(r,n,t)};function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(Object(n),!0).forEach((function(t){z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var q=new Map;function Y(e){var t=q.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),q.set(e,t)),t}function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,X({bubbles:!1},n)))}function K(e,t){var n=window.ShadyCSS;return n&&!n.nativeShadow?e(n):t}var Z="ActiveXObject"in window;function J(e){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Q=function(e){return e},ee=function(e){if("object"!==J(e))throw TypeError("Assigned value must be an object: ".concat(J(e)));return e&&Object.freeze(e)};function te(e,t){var n=J(e),r=Q;switch(n){case"string":r=String;break;case"number":r=Number;break;case"boolean":r=Boolean;break;case"function":e=(r=e)();break;case"object":e&&Object.freeze(e),r=ee}return{get:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return n},set:function(e,t,n){return r(t,n)},connect:"object"!==n&&"undefined"!==n?function(n,o,i){if(n[o]===e){var s=Y(o);if(n.hasAttribute(s)){var a=n.getAttribute(s);n[o]=""===a&&r===Boolean||a}}return t&&t(n,o,i)}:t}}function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function re(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(n),!0).forEach((function(t){oe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ie(e){return(ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var se=new WeakMap,ae=new Set;function ce(){try{ae.forEach((function(e){try{se.get(e)(),ae.delete(e)}catch(t){throw ae.delete(e),t}}))}catch(e){throw ae.size&&ce(),e}}function ue(e){ae.size||requestAnimationFrame(ce),ae.add(e)}var le=new WeakMap;function de(e,t){var n=le.get(e);n||(n=new Map,le.set(e,n));var r=n.get(t);return r||(r={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},n.set(t,r)),r}function fe(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function pe(e){e.observed&&ue(e),e.contexts&&e.contexts.forEach(pe)}var he=new Set;function ve(e,t,n){var r=de(e,t);if(he.size&&he.has(r))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(he.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(r),e.observed&&(r.contexts||(r.contexts=new Set),r.contexts.add(e))})),r.checksum&&r.checksum===fe(r))return r.value;try{he.add(r),r.observed&&r.deps&&r.deps.size&&r.deps.forEach((function(e){e.contexts&&e.contexts.delete(r)})),r.deps=void 0;var o=n(e,r.value);r.deps&&r.deps.forEach((function(e){!function e(t,n){n&&n.forEach((function(n){t.deps.add(n),t.observed&&(n.contexts||(n.contexts=new Set),n.contexts.add(t)),e(t,n.deps)}))}(r,e.deps)})),o!==r.value&&(r.state+=1,r.value=o,pe(r)),r.checksum=fe(r),he.delete(r)}catch(e){throw r.checksum=0,he.delete(r),he.forEach((function(e){e.deps.delete(r),e.observed&&r.contexts.delete(e)})),e}return r.value}function me(e,t,n,r){var o,i=de(e,t);i.observed=!0;var s=function(e,t){return se.set(e,t),ue(e),function(){ae.delete(e),se.delete(e)}}(i,(function(){var i=ve(e,t,n);i!==o&&(r(e,i,o),o=i)}));return i.deps&&i.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(i)})),function(){s(),i.observed=!1,i.deps&&i.deps.size&&i.deps.forEach((function(e){e.contexts&&e.contexts.delete(i)}))}}function be(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ge(e,t,n){return t&&be(e.prototype,t),n&&be(e,n),e}function ye(e,t){return!t||"object"!==je(t)&&"function"!=typeof t?we(e):t}function we(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function xe(e){var t="function"==typeof Map?new Map:void 0;return(xe=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return Ee(e,arguments,Ne(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),_e(r,e)})(e)}function Ee(e,t,n){return(Ee=Oe()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&_e(o,n.prototype),o}).apply(null,arguments)}function Oe(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _e(e,t){return(_e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ne(e){return(Ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function je(e){return(je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{Se.env.NODE_ENV}catch(e){var Se={env:{NODE_ENV:"production"}}}var ke=function(e,t){return t},Te=new WeakMap,$e=new WeakMap;function Ae(e,t){e.hybrids=t;var n=[],r=Object.keys(t);Te.set(e,n),$e.set(e,r),r.forEach((function(r){var o,i=t[r],s=je(i);o="function"===s?"render"===r?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(ie(e)));var n=re({shadowRoot:!0},t),r={mode:"open"};return"object"===ie(n.shadowRoot)&&Object.assign(r,n.shadowRoot),{get:function(t){var o=e(t),i=t;return n.shadowRoot&&(t.shadowRoot||t.attachShadow(r),i=t.shadowRoot),function(){return o(t,i),i}},observe:function(e,t){t()}}}(i):{get:i}:"object"!==s||null===i||Array.isArray(i)?te(i):{get:i.get||ke,set:i.set||!i.get&&ke||void 0,connect:i.connect,observe:i.observe},Object.defineProperty(e.prototype,r,{get:function(){return ve(this,r,o.get)},set:o.set&&function(e){!function(e,t,n,r,o){if(he.size&&!o)throw Error("Setting property in chain of get calls is forbidden: '".concat(t,"'"));var i=de(e,t),s=n(e,r,i.value);s!==i.value&&(i.checksum=0,i.state+=1,i.value=s,pe(i))}(this,r,o.set,e)},enumerable:!0,configurable:"production"!==Se.env.NODE_ENV}),o.observe&&n.unshift((function(e){return me(e,r,o.get,o.observe)})),o.connect&&n.push((function(e){return o.connect(e,r,(function(){!function(e,t,n){if(he.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));var r=de(e,t);r.checksum=0,r.state+=1,pe(r),n&&(r.value=void 0)}(e,r)}))}))}))}var Me=new WeakMap;function Ce(e,t){var n=je(t);if("object"!==n&&"function"!==n)throw TypeError("Second argument must be an object or a function: ".concat(n));var r=window.customElements.get(e);if("function"===n)return r!==t?window.customElements.define(e,t):r;if(r){if(r.hybrids===t)return r;throw Error("Element '".concat(e,"' already defined"))}var o=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_e(e,t)}(o,t);var n,r=(n=o,function(){var e,t=Ne(n);if(Oe()){var r=Ne(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return ye(this,e)});function o(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),e=r.call(this);for(var t=$e.get(o),n=0;n<t.length;n+=1){var i=t[n];if(Object.prototype.hasOwnProperty.call(we(e),i)){var s=e[i];delete e[i],e[i]=s}}return e}return ge(o,null,[{key:"name",get:function(){return e}}]),ge(o,[{key:"connectedCallback",value:function(){for(var e=Te.get(o),t=[],n=0;n<e.length;n+=1){var r=e[n](this);r&&t.push(r)}Me.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Me.get(this),t=0;t<e.length;t+=1)e[t]()}}]),o}(xe(HTMLElement));return Ae(o,t),customElements.define(e,o),o}function Le(e){return Object.keys(e).reduce((function(t,n){var r=Y(n.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[n]=Ce(r,e[n]),t}),{})}function Ve(){return"object"===je(arguments.length<=0?void 0:arguments[0])?Le(arguments.length<=0?void 0:arguments[0]):Ce.apply(void 0,arguments)}function Pe(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(r.push(e),n.deep&&n.nested&&Pe(e,t,n,r)):n.deep&&Pe(e,t,n,r)})),r}function We(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},n="function"==typeof e?e:function(t){return t===e};return{get:function(e){return Pe(e,n,t)},connect:function(e,n,r){var o=new MutationObserver(r);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}var De=new WeakMap,Re=function(e,t){var n=De.get(e);return n||(t&&De.set(e,t),t)},Be=function(e,t){return De.set(e,t),t};function Fe(e){for(var t;e&&(t=Re(e))&&t.endNode;)e=t.endNode;return e}function Ie(e){if(e.nodeType!==Node.TEXT_NODE)for(var t=e.childNodes[0];t;)e.removeChild(t),t=e.childNodes[0];else{var n=Re(e);if(n.startNode)for(var r=Fe(n.endNode),o=n.startNode,i=r.nextSibling;o;){var s=o.nextSibling;o.parentNode.removeChild(o),o=s!==i&&s}}}var He=new WeakMap;function Ue(e,t){var n=Re(e),r=n.startNode,o=Fe(n.endNode);t.parentNode.insertBefore(e,t.nextSibling);for(var i=e,s=r;s;){var a=s.nextSibling;i.parentNode.insertBefore(s,i.nextSibling),i=s,s=a!==o.nextSibling&&a}}function Xe(e){return(Xe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ze(e,t,n){var r=Array.isArray(n)?"array":Xe(n),o=Re(t,{});switch(o.type!==r&&(Ie(t),"array"===r&&He.delete(t),o=Be(t,{type:r}),""!==t.textContent&&(t.textContent="")),r){case"function":n(e,t);break;case"array":!function(e,t,n,r){var o=He.get(t),i=n.map((function(e,t){return{id:Object.prototype.hasOwnProperty.call(e,"id")?e.id:t,value:e,placeholder:null,available:!0}}));if(He.set(t,i),o){var s=new Set;i.forEach((function(e){return s.add(e.id)})),o=o.filter((function(e){return!!s.has(e.id)||(Ie(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder),!1)}))}for(var a=t,c=n.length-1,u=Re(t),l=0;l<i.length;l+=1){var d=i[l],f=void 0;if(o)for(var p=0;p<o.length;p+=1)if(o[p].available&&o[p].id===d.id){f=o[p];break}var h=void 0;f?(f.available=!1,(h=f.placeholder).previousSibling!==a&&Ue(h,a),f.value!==d.value&&r(e,h,d.value)):(h=document.createTextNode(""),a.parentNode.insertBefore(h,a.nextSibling),r(e,h,d.value)),a=Fe(Re(h).endNode||h),0===l&&(u.startNode=h),l===c&&(u.endNode=a),d.placeholder=h}o&&o.forEach((function(e){e.available&&(Ie(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder))}))}(e,t,n,ze);break;default:t.textContent="number"===r||n?n:""}}function qe(e){return(qe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ye=new WeakMap;function Ge(e){return(Ge="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Ke=new WeakMap;function Ze(e,t,n){var r=Ke.get(t)||new Set,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;return Array.isArray(e)?e.forEach((function(e){return t.add(e)})):null!==e&&"object"===Ge(e)?Object.keys(e).forEach((function(n){return e[n]&&t.add(n)})):t.add(e),t}(n);Ke.set(t,o),o.forEach((function(e){t.classList.add(e),r.delete(e)})),r.forEach((function(e){t.classList.remove(e)}))}function Je(e){return(Je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Qe=new WeakMap;function et(e,t,n){if(null===n||"object"!==Je(n))throw TypeError("Style value must be an object in ".concat(function(e){return"<".concat(String(e.tagName).toLowerCase(),">")}(t),":"),n);var r=Qe.get(t)||new Map,o=Object.keys(n).reduce((function(e,o){var i=Y(o),s=n[o];return s||0===s?t.style.setProperty(i,s):t.style.removeProperty(i),e.set(i,s),r.delete(i),e}),new Map);r.forEach((function(e,n){t.style[n]=""})),Qe.set(t,o)}function tt(e,t,n){if("on"===t.substr(0,2))return function(e){return function(t,n,r,o){if(o){var i=Ye.get(n);i&&n.removeEventListener(e,i.get(o),void 0!==o.options&&o.options)}if(r){if("function"!=typeof r)throw Error("Event listener must be a function: ".concat(qe(r)));var s=Ye.get(n);s||(s=new WeakMap,Ye.set(n,s));var a=r.bind(null,t);s.set(r,a),n.addEventListener(e,a,void 0!==r.options&&r.options)}}}(t.substr(2));switch(e){case"class":return Ze;case"style":return et;default:return function(r,o,i){if(n||o instanceof SVGElement||!(t in o))if(!1===i||null==i)o.removeAttribute(e);else{var s=!0===i?"":String(i);o.setAttribute(e,s)}else o[t]!==i&&(o[t]=i)}}}function nt(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return rt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return rt(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function rt(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ot(e){return(ot="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{it.env.NODE_ENV}catch(e){var it={env:{NODE_ENV:"production"}}}var st=Date.now(),at=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return"{{h-".concat(st,"-").concat(e,"}}")},ct=at("(\\d+)"),ut=new RegExp("^".concat(ct,"$")),lt=new RegExp(ct,"g"),dt="--".concat(st,"--"),ft=new RegExp(dt,"g"),pt=new WeakMap;var ht="object"===ot(window.ShadyDOM)&&window.ShadyDOM.inUse?function(e){var t;return{get currentNode(){return t},nextNode:function(){if(void 0===t)t=e.childNodes[0];else if(t.childNodes.length)t=t.childNodes[0];else if(t.nextSibling)t=t.nextSibling;else{var n=t.parentNode;for(t=n.nextSibling;!t&&n!==e;)n=n.parentNode,t=n.nextSibling}return!!t}}}:function(e){return document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null,!1)},vt=document.createElement("div");function mt(e,t,n){var r=document.createElement("template"),o=[],i=function(e,t){var n=e.reduce((function(t,n,r){return 0===r?n:e.slice(r).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)?"".concat(t,"\x3c!--").concat(at(r-1),"--\x3e").concat(n):t+at(r-1)+n}),"");return t&&(n+="<style>\n".concat(t.join("\n/*------*/\n"),"\n</style>")),Z?n.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>/]+)/g,(function(e){return"".concat(dt).concat(e)})):n}(e,n);if(t&&(i="<svg>".concat(i,"</svg>")),Z?r.innerHTML=i:(vt.innerHTML="<template>".concat(i,"</template>"),r.content.appendChild(vt.children[0].content)),t){var s=r.content.firstChild;r.content.removeChild(s),Array.from(s.childNodes).forEach((function(e){return r.content.appendChild(e)}))}!function(e){for(var t,n=document.createNodeIterator(e,NodeFilter.SHOW_COMMENT,null,!1);t=n.nextNode();)ut.test(t.textContent)&&(t.parentNode.insertBefore(document.createTextNode(t.textContent),t),t.parentNode.removeChild(t))}(r.content);for(var a=ht(r.content),c=0,u=function(){var n=a.currentNode;if(n.nodeType===Node.TEXT_NODE){var r=n.textContent;if(!r.match(ut)){var i=r.match(lt);if(i){var s=n;i.reduce((function(e,t){var n=nt(e.pop().split(t),2),r=n[0],o=n[1];return r&&e.push(r),e.push(t),o&&e.push(o),e}),[r]).forEach((function(e,t){0===t?s.textContent=e:s=s.parentNode.insertBefore(document.createTextNode(e),s.nextSibling)}))}}var u=n.textContent.match(ut);u&&(Z||(n.textContent=""),o[u[1]]=[c,ze])}else n.nodeType===Node.ELEMENT_NODE&&Array.from(n.attributes).forEach((function(r){var i=r.value.trim(),s=Z?r.name.replace(dt,""):r.name,a=i.match(ut);if(a){var u=e[a[1]].replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop();o[a[1]]=[c,tt(s,u,t)],n.removeAttribute(r.name)}else{var l=i.match(lt);if(l){var d="attr__".concat(s);l.forEach((function(e,t){var n=nt(e.match(ut),2)[1];o[n]=[c,function(n,r,o){var a=Re(r,{});a[d]=(a[d]||i).replace(e,null==o?"":o),1!==l.length&&t+1!==l.length||(r.setAttribute(s,a[d]),a[d]=void 0)}]})),r.value="",Z&&s!==r.name&&(n.removeAttribute(r.name),n.setAttribute(s,""))}}}));c+=1};a.nextNode();)u();return function(e,t,n){var i=Re(t,{type:"function"});if(r!==i.template){(i.template||t.nodeType===Node.ELEMENT_NODE)&&Ie(t),i.prevArgs=null;var s=document.importNode(function(e,t){return t?K((function(n){var r=pt.get(e);r||(r=new Map,pt.set(e,r));var o=r.get(t);if(!o){(o=document.createElement("template")).content.appendChild(e.content.cloneNode(!0)),r.set(t,o);var i=o.content.querySelectorAll("style");Array.from(i).forEach((function(e){for(var t=e.childNodes.length+1,n=0;n<t;n+=1)e.parentNode.insertBefore(document.createTextNode(at()),e)})),n.prepareTemplate(o,t.toLowerCase())}return o}),e):e}(r,e.tagName).content,!0),a=ht(s),c=o.slice(0),u=0,l=c.shift(),d=[];for(i.template=r,i.markers=d;a.nextNode();){var f=a.currentNode;for(f.nodeType===Node.TEXT_NODE&&(ut.test(f.textContent)?f.textContent="":Z&&(f.textContent=f.textContent.replace(ft,"")));l&&l[0]===u;)d.push([f,l[1]]),l=c.shift();u+=1}if(t.nodeType===Node.TEXT_NODE){i.startNode=s.childNodes[0],i.endNode=s.childNodes[s.childNodes.length-1];for(var p=t,h=s.childNodes[0];h;)t.parentNode.insertBefore(h,p.nextSibling),p=h,h=s.childNodes[0]}else t.appendChild(s)}var v=i.prevArgs;i.prevArgs=n;for(var m=0;m<i.markers.length;m+=1){var b=nt(i.markers[m],2),g=b[0],y=b[1];v&&v[m]===n[m]||y(e,g,n[m],v?v[m]:void 0)}t.nodeType!==Node.TEXT_NODE&&K((function(t){e.shadowRoot&&(v?t.styleSubtree(e):t.styleElement(e))}))}}var bt=new Map;var gt=new WeakMap;var yt=Object.freeze({__proto__:null,set:function(e,t){if(!e)throw Error("Target property name missing: ".concat(e));if(2===arguments.length)return function(n){n[e]=t};var n=bt.get(e);return n||(n=function(t,n){var r=n.target;t[e]=r.value},bt.set(e,n)),n},resolve:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return function(r,o){var i;t&&(i=setTimeout((function(){i=void 0,requestAnimationFrame((function(){t(r,o)}))}),n)),gt.set(o,e),e.then((function(t){i&&clearTimeout(i),gt.get(o)===e&&(t(r,o),gt.set(o,null))}))}}}),wt=at(),xt=at("svg"),Et=new Map,Ot=new WeakMap,_t={define:function(e){return Ve(e),this},key:function(e){return this.id=e,this},style:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Ot.set(this,t),this}};function Nt(e,t,n){return Object.assign((function r(o){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,s=Ot.get(r),a=e.join(wt);s&&(a+=s.join(wt)),n&&(a+=xt);var c=Et.get(a);c||(c=mt(e,n,s),Et.set(a,c)),c(o,i,t)}),_t)}Object.assign((function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Nt(e,n)}),yt),Object.assign((function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Nt(e,n,!0)}),yt);const jt=e=>function t(...n){return n.length<e.length?t.bind(null,...n):e.call(null,...n)},St=jt((e,t,n)=>(t-e)*n+e),kt=jt((e,t,n)=>(n-e)/(t-e)),Tt=jt((e,t,n)=>Math.max(e,Math.min(n,t))),$t=jt((e,t)=>{if(e<=0)return t;const n=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(n?n.length:0))}),At=jt((e,t,n,r,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(kt(e,t),St(n,r))(o)),Mt=(e,t)=>({get:n=>n.getAttribute(e)||t,set:(t,n)=>(t.setAttribute(e,n),n),connect:(n,r,o)=>{n[r]=null===n.getAttribute(e)?t:n.getAttribute(e),new MutationObserver(o).observe(n,{attributeFilter:[e]})}}),Ct={boolean:(e,t)=>Object.assign(Object.assign({},Mt(e,t)),{get:n=>n.hasAttribute(e)||t,set:(t,n)=>(n?t.setAttribute(e,""):t.removeAttribute(e),!!n),connect:(t,n,r)=>{t[n]=t.hasAttribute(e),new MutationObserver(r).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},Mt(e,t)),{get:n=>parseFloat(n.getAttribute(e))||t}),string:Mt},Lt=jt((e,t)=>e&&Ct[typeof t]?Ct[typeof t](e,t):te(t)),Vt=e=>{return n=-e,r=e+1,t=Array.from("0".repeat(r-n),(e,t)=>n+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,n,r},Pt=e=>{const{lineWidth:t}=e,n=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return Vt(n).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},Wt=V`
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
`,Dt={lineWidth:Lt("line-width",1)},Rt=Ve("ue-text",Object.assign(Object.assign({},Dt),{render:H(e=>V`
    ${Wt}
    <div style="text-shadow: ${Pt(e)};"><slot></slot></div>
`)})),Bt=V`
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
`,Ft=jt((e,{type:t})=>{}),It=V`
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
`,Ht=Object.assign({active:Lt("active",!1),checked:Lt("checked",!1),disabled:Lt("disabled",!1),focused:Lt("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),Ut=Ve("ue-button",Object.assign(Object.assign({},Ht),{render:H(e=>{const{active:t,checked:n,disabled:r,focused:o}=e;return V`
        ${Bt} ${It}

        <button
            tabindex="0"
            class=${D({active:t,checked:n,focused:o})}
            .disabled=${r}
            @focus=${Ft(e)}
            @blur=${Ft(e)}
            @mousedown=${Ft(e)}
            @mouseup=${Ft(e)}
        >
            <slot></slot>
        </button>
    `})})),Xt=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),zt=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function qt(e,t={}){const n={};return zt.forEach(t=>{n[t]=e[t]}),Object.assign(n,t)}function Yt(e,t,n={}){const r=new MouseEvent(t,n);return r.shftTarget=e,e.dispatchEvent(r),r}const{drags:Gt,drops:Kt}=Xt;function Zt(e,t=0,n=1){return Math.max(t,Math.min(e,n))}function Jt(e,t){return!t||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}function Qt(e,t){const{drags:n,drops:r}=Xt;switch(t){case"drag":case"draggable":return n.has(e);case"drop":case"droppable":return r.has(e);default:return n.has(e)||r.has(e)}}function en(e,t){const{accepts:n,overlap:r}=Kt.get(e);return Jt(t,n)&&function(e,t){const{left:n,right:r,top:o,bottom:i,height:s,width:a}=e.getBoundingClientRect(),{left:c,right:u,top:l,bottom:d}=t.getBoundingClientRect();return Zt(Math.min(r,u)-Math.max(n,c),0,a)*Zt(Math.min(i,d)-Math.max(o,l),0,s)/(a*s)}(t,e)>r}const{drags:tn}=Xt;function nn(e){return t=>{const{onmousemove:n,onmouseup:r}=tn.get(e);1===t.buttons&&(Yt(e,"dragstart",qt(t)),document.addEventListener("mousemove",n),document.addEventListener("mouseup",r,{once:!0}))}}function rn(e){return t=>{Yt(e,"drag",qt(t))}}function on(e){return t=>{const{onmousemove:n}=tn.get(e);Yt(e,"dragend",qt(t)),document.removeEventListener("mousemove",n)}}const{drops:sn}=Xt;function an(e){return t=>{if(!sn.has(e))return;const n=t.shftTarget,{accepts:r,ondrag:o,ondragend:i}=sn.get(e);Jt(n,r)&&(Yt(e,"dropopen",{relatedTarget:n}),n.addEventListener("drag",o),n.addEventListener("dragend",i,{once:!0}))}}function cn(e){return t=>{const n=t.shftTarget,{accepts:r,content:o}=sn.get(e);Jt(n,r)&&(en(e,n)?(o.has(n)||(o.add(n),Yt(e,"dragenter",qt(t,{relatedTarget:n}))),Yt(e,"dragover",qt(t,{relatedTarget:n}))):o.has(n)&&(o.delete(n),Yt(e,"dragleave",qt(t,{relatedTarget:n}))))}}function un(e){return t=>{const n=t.shftTarget,{ondrag:r}=sn.get(e);Yt(e,"dropclose",qt(t,{relatedTarget:n})),n.removeEventListener("drag",r),en(e,n)&&Yt(e,"drop",qt(t,{relatedTarget:n}))}}var ln={drag:function(e){if(Qt(e,"drag"))return;const t={onmousedown:nn(e),onmousemove:rn(e),onmouseup:on(e)};e.addEventListener("mousedown",t.onmousedown),tn.set(e,t)},drop:function(e,t){if(Qt(e,"drop"))return;const{accepts:n,overlap:r}=Object.assign({accepts:null,overlap:.5},t||{}),o={content:new WeakSet,ondragstart:an(e),ondrag:cn(e),ondragend:un(e),accepts:n,overlap:r};document.addEventListener("dragstart",o.ondragstart),sn.set(e,o)},util:{clear:function(e){const{drags:t,drops:n}=Xt;if(t.has(e)){const{onmousedown:n,onmousemove:r,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",n),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o)}if(n.has(e)){const{ondragstart:t,ondrag:r,ondragend:o}=n.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",r),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(n=>{let r=parseFloat(t.style[n])||0;r+="left"===n?e.movementX:e.movementY,t.style[n]=r+"px"})},is:Qt,matches:Jt},_GLOBAL:Xt};const{drag:dn}=ln,fn=V`
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
`,pn={min:Lt("min",0),max:Lt("max",100),step:Lt("step",1),value:Object.assign(Object.assign({},Lt("value",0)),{observe:(e,t)=>{G(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}})},hn=(e,{clientX:t})=>{const n=t-e.getBoundingClientRect().left,{min:r,max:o,step:i,clientWidth:s}=e;e.value=Tt(r,o,$t(i,At(0,s,r,o,n)))},vn=Ve("ue-slider",Object.assign(Object.assign({},pn),{render:H(e=>{const{min:t,max:n,value:r,clientWidth:o}=e;return V`
        ${Bt} ${fn}
        <div
            class="slider-bar"
            @drag=${t=>hn(e,t)}
            @mousedown=${t=>hn(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${Tt(0,o,At(t,n,0,o,r))}px) translateX(-50%);"
            ></div>
        </div>
        ${I(()=>{((e,t=document,n=1e3)=>new Promise((r,o)=>{let i;const s=setTimeout(()=>{i=!0},n);!function n(){if(i)return o();let a=t.querySelector(e);if(a)return clearTimeout(s),r(a);requestAnimationFrame(n)}()}))(".slider-bar",e.shadowRoot).then(dn).catch(console.log)})}
    `})})),mn={arrow:((e,...t)=>new y(e,t,"svg",A))`
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
`},bn=V`
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
`,gn=Ve("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:H(e=>V`
        ${bn} ${mn[e.shape]}
    `)})),yn={_ue_item:!0,active:Lt("active",!0),selected:Lt("selected",!1)},wn=Object.assign(Object.assign({},yn),{value:Lt("value",""),label:e=>e.getAttribute("label")||e.innerText,render:H(()=>V`<slot></slot>`)}),xn=Object.assign(Object.assign({},yn),{icon:Lt("icon",""),label:Lt("label",""),render:H(({active:e})=>V`${e?V`<slot></slot>`:V``}`)}),En={items:We(e=>void 0!==e._ue_item)},On={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{G(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},_n=jt((e,t)=>{e.forEach(e=>{e.selected=e===t})}),Nn=Ve("ue-list-item",wn),jn=Ve("ue-content-item",xn),Sn={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,n)=>e.selected=n===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:n}=e;console.log("changed to "+t),n[t]&&G(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:n[t].label,item:n[t]}})}},kn={items:We(e=>e.ueItem)},Tn=Object.assign(Object.assign({},kn),{preselect:Lt("preselect",0),selected:Sn,selectedItem:({items:e})=>e.find(e=>e.selected)}),$n=jt((e,t)=>V` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:n},r)=>V`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=r}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${r}">${n}</slot>
    </ue-button>
`),An=Object.assign(Object.assign({},Tn),{location:Lt("location","left")}),Mn=V`
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
`,Cn=Ve("ue-tab-group",Object.assign(Object.assign({},An),{render:H(e=>V`
        ${Mn}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${$n(e)}
        </div>
        <slot></slot>
    `)})),Ln=Object.assign(Object.assign({},Tn),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return n=document,r="click",o=()=>{e.open=!1},i={once:!0},n.addEventListener(r,o,i),()=>n.removeEventListener(r,o,i);var n,r,o,i}}}),Vn=V`
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
`,Pn={border:"1px solid transparent"},Wn={border:"1px solid var(--ue-active-bg-color)"},Dn=Ve("ue-dropdown",Object.assign(Object.assign({},Ln),{render:H(e=>{const{open:t,selectedItem:n}=e;return V`
        ${Vn}
        <div class="container" style=${B(t?Wn:Pn)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${n?n.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${B(t?Wn:Pn)}>
                    ${$n(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),Rn={value:Object.assign(Object.assign({},Lt("value",0)),{observe:(e,t,n)=>{t!==n&&G(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:Lt("duration",1),delay:Lt("delay",0)},Bn=Ve("ue-progress-bar",Object.assign(Object.assign({},Rn),{render:H(e=>{const{value:t,duration:n,delay:r}=e;return V`
        ${Bt}
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
                width: ${Tt(0,100,t)}%;
                transition: width ${Tt(0,1/0,n)}s ease
                    ${Tt(0,1/0,r)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{G(e,"updated")}}
            ></div>
        </div>
    `})})),Fn=Object.assign(Object.assign({},Tn),{direction:Lt("direction","column")}),In=V`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,Hn=Ve("ue-select-grp",Object.assign(Object.assign({},Fn),{render:H(e=>V`
                ${In}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${$n(e)}
                </div>
            `)})),Un={open:Lt("open",!1),direction:Lt("direction","right"),duration:Lt("duration",500)},Xn=V`
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
`,zn={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},qn={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Yn=Ve("ue-drawer",Object.assign(Object.assign({},Un),{render:H(({direction:e,duration:t,open:n})=>V`
        ${Xn}
        <div style=${B((({direction:e,duration:t,open:n})=>({transition:`transform ${t}ms`,flexDirection:zn[e],transform:n?"translate(0, 0)":qn[e]}))({direction:e,duration:t,open:n}))}>
            <slot></slot>
        </div>
    `)})),Gn=Object.assign(Object.assign({},En),{selected:On}),Kn=(e,t,n)=>(e.slot=e.selected?"selected-item":"",V`<ue-button .checked=${e.selected} @click=${()=>_n(n,e)}
        >${e.label}</ue-button
    >`),Zn=({items:e})=>V`
        ${Bt}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(Kn)}
    `,Jn=Ve("ue-list",Object.assign(Object.assign({},Gn),{render:H(Zn)})),Qn=Ve("ue-tab-list",Object.assign(Object.assign({},Gn),{render:H(({items:e})=>V`${Zn({items:e})} <slot name="selected-item"></slot>`)})),er=Object.assign(Object.assign({},En),{render:H(({items:e})=>V`
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
        `)}),tr=Object.assign(Object.assign({},yn),{msg:(nr=er,rr="function"==typeof nr?nr:function(e){return e===nr},{get:function(e){return function(e,t){for(var n=e.parentElement||e.parentNode.host;n;){var r=n.constructor.hybrids;if(r&&t(r))return n;n=n.parentElement||n.parentNode&&n.parentNode.host}return n||null}(e,rr)},connect:function(e,t,n){return!!e[t]&&n}}),index:e=>e.msg.items.indexOf(e),render:H(e=>V`
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
        `)});var nr,rr;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),n=document.createElement("ue-msg-item");n.innerText=e,t.appendChild(n)}});const or=Ve("ue-msg",er),ir=Ve("ue-msg-item",tr);return e.UeButton=Ut,e.UeContentItem=jn,e.UeDrawer=Yn,e.UeDropdown=Dn,e.UeIcon=gn,e.UeList=Jn,e.UeListItem=Nn,e.UeMsg=or,e.UeMsgItem=ir,e.UeProgressBar=Bn,e.UeSelectGrp=Hn,e.UeSlider=vn,e.UeTabGroup=Cn,e.UeTabList=Qn,e.UeText=Rt,e.shadowStyle=Pt,e}({});
