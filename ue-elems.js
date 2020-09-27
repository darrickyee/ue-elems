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
     */const t=new WeakMap,n=e=>(...n)=>{const r=e(...n);return t.set(r,!0),r},r=e=>"function"==typeof e&&t.has(e),o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},i={},a={},c=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${c}--\x3e`,u=new RegExp(`${c}|${l}`),d="$lit$";class f{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],o=document.createTreeWalker(t.content,133,null,!1);let s=0,i=-1,a=0;const{strings:l,values:{length:f}}=e;for(;a<f;){const e=o.nextNode();if(null!==e){if(i++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let r=0;for(let e=0;e<n;e++)h(t[e].name,d)&&r++;for(;r-- >0;){const t=l[a],n=b.exec(t)[2],r=n.toLowerCase()+d,o=e.getAttribute(r);e.removeAttribute(r);const s=o.split(u);this.parts.push({type:"attribute",index:i,name:n,strings:s}),a+=s.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(c)>=0){const r=e.parentNode,o=t.split(u),s=o.length-1;for(let t=0;t<s;t++){let n,s=o[t];if(""===s)n=v();else{const e=b.exec(s);null!==e&&h(e[2],d)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),n=document.createTextNode(s)}r.insertBefore(n,e),this.parts.push({type:"node",index:++i})}""===o[s]?(r.insertBefore(v(),e),n.push(e)):e.data=o[s],a+=s}}else if(8===e.nodeType)if(e.data===c){const t=e.parentNode;null!==e.previousSibling&&i!==s||(i++,t.insertBefore(v(),e)),s=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(c,t+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=r.pop()}for(const e of n)e.parentNode.removeChild(e)}}const h=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},p=e=>-1!==e.index,v=()=>document.createComment(""),b=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let s,i=0,a=0,c=r.nextNode();for(;i<n.length;)if(s=n[i],p(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(t.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=t.pop(),c=r.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));i++}else this.__parts.push(void 0),i++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const g=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${c} `;class w{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const s=b.exec(e);t+=null===s?e+(n?y:l):e.substr(0,s.index)+s[1]+s[2]+d+s[3]+c}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==g&&(t=g.createHTML(t)),e.innerHTML=t,e}}class x extends w{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,r=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,r),t=n}})(t,n.firstChild),e}}
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
     */const _=e=>null===e||!("object"==typeof e||"function"==typeof e),O=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new j(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!O(e))return e}let r="";for(let o=0;o<t;o++){r+=e[o];const t=n[o];if(void 0!==t){const e=t.value;if(_(e)||!O(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class j{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||_(e)&&e===this.value||(this.value=e,r(e)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(v()),this.endNode=e.appendChild(v())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=v()),e.__insert(this.endNode=v())}insertAfterPart(e){e.__insert(this.startNode=v()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):O(e)?this.__commitIterable(e):e===a?(this.value=a,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,r=0;for(const o of e)n=t[r],void 0===n&&(n=new k(this.options),t.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(t[r-1])),n.setValue(o),n.commit(),r++;r<t.length&&(t.length=r,this.clear(n&&n.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}class $ extends E{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends j{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=M(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const M=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const L=new class{handleAttributeExpressions(e,t,n,r){const o=t[0];if("."===o){return new $(e,t.slice(1),n).parts}if("@"===o)return[new A(e,t.slice(1),r.eventContext)];if("?"===o)return[new S(e,t.slice(1),n)];return new E(e,t,n).parts}handleTextExpression(e){return new k(e)}};
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
     */function P(e){let t=V.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},V.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(c);return n=t.keyString.get(r),void 0===n&&(n=new f(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}const V=new Map,C=new WeakMap;
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const R=(e,...t)=>new w(e,t,"html",L);
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
class D{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const F=new WeakMap,W=n(e=>t=>{if(!(t instanceof j)||t instanceof N||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=t,{element:r}=n;let o=F.get(t);void 0===o&&(r.setAttribute("class",n.strings.join(" ")),F.set(t,o=new Set));const s=r.classList||new D(r);o.forEach(t=>{t in e||(s.remove(t),o.delete(t))});for(const t in e){const n=e[t];n!=o.has(t)&&(n?(s.add(t),o.add(t)):(s.remove(t),o.delete(t)))}"function"==typeof s.commit&&s.commit()}),I=new WeakMap,B=n(e=>t=>{if(!(t instanceof j)||t instanceof N||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:n}=t,{style:r}=n.element;let o=I.get(t);void 0===o&&(r.cssText=n.strings.join(" "),I.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?r[t]=null:r.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?r[t]=e[t]:r.setProperty(t,e[t])}),U=(e,t={})=>n=>{const r=e(n);return(e,n)=>((e,t,n)=>{let r=C.get(t);void 0===r&&(s(t,t.firstChild),C.set(t,r=new k(Object.assign({templateFactory:P},n))),r.appendInto(t)),r.setValue(e),r.commit()})(r,n,t)};function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){X(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function X(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Y=new Map;function q(e){var t=Y.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),Y.set(e,t)),t}function K(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,z({bubbles:!1},n)))}function G(e){return(G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Z=function(e){return e},J=function(e){if("object"!==G(e))throw TypeError("Assigned value must be an object: ".concat(G(e)));return e&&Object.freeze(e)};function Q(e,t){var n=G(e),r=Z;switch(n){case"string":r=String;break;case"number":r=Number;break;case"boolean":r=Boolean;break;case"function":e=(r=e)();break;case"object":e&&Object.freeze(e),r=J}return{get:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return n},set:function(e,t,n){return r(t,n)},connect:"object"!==n&&"undefined"!==n?function(n,o,s){if(n[o]===e){var i=q(o);if(n.hasAttribute(i)){var a=n.getAttribute(i);n[o]=""===a&&r===Boolean||a}}return t&&t(n,o,s)}:t}}function ee(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(n),!0).forEach((function(t){ne(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ee(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function re(e){return(re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var oe=new WeakMap,se=new Set;function ie(){try{se.forEach((function(e){try{oe.get(e)(),se.delete(e)}catch(t){throw se.delete(e),t}}))}catch(e){throw se.size&&ie(),e}}function ae(e){se.size||requestAnimationFrame(ie),se.add(e)}var ce=new WeakMap;function le(e,t){var n=ce.get(e);n||(n=new Map,ce.set(e,n));var r=n.get(t);return r||(r={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},n.set(t,r)),r}function ue(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function de(e){e.observed&&ae(e),e.contexts&&e.contexts.forEach(de)}function fe(e,t){t&&t.forEach((function(t){e.deps.add(t),e.observed&&(t.contexts||(t.contexts=new Set),t.contexts.add(e)),fe(e,t.deps)}))}var he=new Set;function pe(e,t,n,r){var o=le(e,t);if(he.size&&he.has(o))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(he.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(o),e.observed&&(o.contexts||(o.contexts=new Set),o.contexts.add(e))})),(r&&r(o.value)||!r)&&o.checksum&&o.checksum===ue(o))return o.value;try{he.add(o),o.observed&&o.deps&&o.deps.size&&o.deps.forEach((function(e){e.contexts&&e.contexts.delete(o)})),o.deps=void 0;var s=n(e,o.value);o.deps&&o.deps.forEach((function(e){fe(o,e.deps)})),s!==o.value&&(o.state+=1,o.value=s,de(o)),o.checksum=ue(o),he.delete(o)}catch(e){throw o.checksum=0,he.delete(o),he.forEach((function(e){e.deps.delete(o),e.observed&&o.contexts.delete(e)})),e}return o.value}var ve=new Set;function be(e,t,n){e.checksum=0,e.state+=1,de(e),n&&function(e){ve.size||requestAnimationFrame((function(){ve.forEach((function(e){(!e.contexts||e.contexts&&0===e.contexts.size)&&ce.get(e.target).delete(e.key)})),ve.clear()})),ve.add(e)}(e),t&&(e.value=void 0)}function me(e,t,n,r){var o,s=le(e,t);s.observed=!0;var i=function(e,t){return oe.set(e,t),ae(e),function(){se.delete(e),oe.delete(e)}}(s,(function(){var s=pe(e,t,n);s!==o&&(r(e,s,o),o=s)}));return s.deps&&s.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(s)})),function(){i(),s.observed=!1,s.deps&&s.deps.size&&s.deps.forEach((function(e){e.contexts&&e.contexts.delete(s)}))}}function ge(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ye(e,t){return!t||"object"!==ke(t)&&"function"!=typeof t?we(e):t}function we(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function xe(e){var t="function"==typeof Map?new Map:void 0;return(xe=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return _e(e,arguments,je(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Ee(r,e)})(e)}function _e(e,t,n){return(_e=Oe()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&Ee(o,n.prototype),o}).apply(null,arguments)}function Oe(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Ee(e,t){return(Ee=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function je(e){return(je=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ke(e){return(ke="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{Se.env.NODE_ENV}catch(e){var Se={env:{NODE_ENV:"production"}}}var $e=function(e,t){return t},Ne=new WeakMap,Te=new WeakMap;function Ae(e,t){e.hybrids=t;var n=[],r=Object.keys(t);Ne.set(e,n),Te.set(e,r),r.forEach((function(r){var o,s=t[r],i=ke(s);o="function"===i?"render"===r?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(re(e)));var n=te({shadowRoot:!0},t),r={mode:"open"};return"object"===re(n.shadowRoot)&&Object.assign(r,n.shadowRoot),{get:function(t){var o=e(t),s=t;return n.shadowRoot&&(t.shadowRoot||t.attachShadow(r),s=t.shadowRoot),function(){return o(t,s),s}},observe:function(e,t){t()}}}(s):{get:s}:"object"!==i||null===s||Array.isArray(s)?Q(s):{get:s.get||$e,set:s.set||!s.get&&$e||void 0,connect:s.connect,observe:s.observe},Object.defineProperty(e.prototype,r,{get:function(){return pe(this,r,o.get)},set:o.set&&function(e){!function(e,t,n,r){var o=le(e,t),s=n(e,r,o.value);s!==o.value&&(o.checksum=0,o.state+=1,o.value=s,de(o))}(this,r,o.set,e)},enumerable:!0,configurable:"production"!==Se.env.NODE_ENV}),o.observe&&n.unshift((function(e){return me(e,r,o.get,o.observe)})),o.connect&&n.push((function(e){return o.connect(e,r,(function(){!function(e,t,n,r){if(he.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));be(le(e,t),n,r)}(e,r)}))}))}))}var Me=new WeakMap;function Le(e,t){var n=ke(t);if("object"!==n&&"function"!==n)throw TypeError("Second argument must be an object or a function: ".concat(n));if(null!==e){var r=window.customElements.get(e);if("function"===n)return r!==t?window.customElements.define(e,t):r;if(r){if(r.hybrids===t)return r;throw Error("Element '".concat(e,"' already defined"))}}var o=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ee(e,t)}(i,e);var t,n,r,o,s=(t=i,function(){var e,n=je(t);if(Oe()){var r=je(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return ye(this,e)});function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),e=s.call(this);for(var t=Te.get(i),n=0;n<t.length;n+=1){var r=t[n];if(Object.prototype.hasOwnProperty.call(we(e),r)){var o=e[r];delete e[r],e[r]=o}}return e}return n=i,(r=[{key:"connectedCallback",value:function(){for(var e=Ne.get(i),t=[],n=0;n<e.length;n+=1){var r=e[n](this);r&&t.push(r)}Me.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Me.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&ge(n.prototype,r),o&&ge(n,o),i}(xe(HTMLElement));return Ae(o,t),null!==e&&(Object.defineProperty(o,"name",{get:function(){return e}}),customElements.define(e,o)),o}function Pe(e){return Object.keys(e).reduce((function(t,n){var r=q(n.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[n]=Le(r,e[n]),t}),{})}function Ve(){return"object"===ke(arguments.length<=0?void 0:arguments[0])&&null!==(arguments.length<=0?void 0:arguments[0])?Pe(arguments.length<=0?void 0:arguments[0]):Le.apply(void 0,arguments)}function Ce(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(r.push(e),n.deep&&n.nested&&Ce(e,t,n,r)):n.deep&&Ce(e,t,n,r)})),r}function Re(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},n="function"==typeof e?e:function(t){return t===e};return{get:function(e){return Ce(e,n,t)},connect:function(e,n,r){var o=new MutationObserver(r);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}const De=e=>function t(...n){return n.length<e.length?t.bind(null,...n):e.call(null,...n)},Fe=De((e,t,n)=>(t-e)*n+e),We=De((e,t,n)=>(n-e)/(t-e)),Ie=De((e,t,n)=>Math.max(e,Math.min(n,t))),Be=De((e,t)=>{if(e<=0)return t;const n=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(n?n.length:0))}),Ue=De((e,t,n,r,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(We(e,t),Fe(n,r))(o)),He=(e,t)=>({get:n=>n.getAttribute(e)||t,set:(t,n)=>(t.setAttribute(e,n),n),connect:(n,r,o)=>{n[r]=null===n.getAttribute(e)?t:n.getAttribute(e);new MutationObserver(o).observe(n,{attributeFilter:[e]})}}),ze={boolean:(e,t)=>Object.assign(Object.assign({},He(e,t)),{get:n=>n.hasAttribute(e)||t,set:(t,n)=>(n?t.setAttribute(e,""):t.removeAttribute(e),!!n),connect:(t,n,r)=>{t[n]=t.hasAttribute(e);new MutationObserver(r).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},He(e,t)),{get:n=>parseFloat(n.getAttribute(e))||t}),string:He},Xe=De((e,t)=>e&&ze[typeof t]?ze[typeof t](e,t):Q(t)),Ye=e=>{return n=-e,r=e+1,t=Array.from("0".repeat(r-n),(e,t)=>n+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,n,r},qe=e=>{const{lineWidth:t}=e,n=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return Ye(n).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},Ke=R`
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
`,Ge={lineWidth:Xe("line-width",1)},Ze=Ve("ue-text",Object.assign(Object.assign({},Ge),{render:U(e=>R`
    ${Ke}
    <div style="text-shadow: ${qe(e)};"><slot></slot></div>
`)})),Je=R`
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
`,Qe=De((e,{type:t})=>{}),et=R`
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
`,tt=Object.assign({active:Xe("active",!1),checked:Xe("checked",!1),disabled:Xe("disabled",!1),focused:Xe("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),nt=Ve("ue-button",Object.assign(Object.assign({},tt),{render:U(e=>{const{active:t,checked:n,disabled:r,focused:o}=e;return R`
        ${Je} ${et}

        <button
            tabindex="0"
            class=${W({active:t,checked:n,focused:o})}
            .disabled=${r}
            @focus=${Qe(e)}
            @blur=${Qe(e)}
            @mousedown=${Qe(e)}
            @mouseup=${Qe(e)}
        >
            <slot></slot>
        </button>
    `})})),rt=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),ot=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function st(e,t={}){const n={};return ot.forEach(t=>{n[t]=e[t]}),Object.assign(n,t)}function it(e,t,n={}){const r=new MouseEvent(t,n);return r.shftTarget=e,e.dispatchEvent(r),r}const at=(e,t,n,r)=>(e.addEventListener(t,n,r||{}),()=>{e.removeEventListener(t,n,r||{})});function ct(e,t=0,n=1){return Math.max(t,Math.min(e,n))}const lt=new WeakMap;Object.assign(window,{isDrag:e=>lt.has(e),undrag:e=>{e.removeEventListener("mousedown",lt.get(e)),lt.delete(e)}});class ut{constructor(e){this.el=e}handleEvent(e){if(1===e.buttons){it(this.el,"dragstart",st(e)),this.el.setAttribute("is-dragging","");const t=at(document,"mousemove",e=>{it(this.el,"drag",st(e))});document.addEventListener("mouseup",e=>{t(),this.el.removeAttribute("is-dragging"),it(this.el,"dragend",st(e))},{once:!0})}}}class dt{constructor(e){this.el=e,this.remove=()=>{},this.dropover=!1}get accepts(){return this.el.getAttribute("drop-accepts")||""}get overlap(){return parseFloat(this.el.getAttribute("drop-overlap"))||.5}canAccept(e){return!this.accepts||e.matches(this.accepts)}canDrop(e){return function(e,t){if(!e.getBoundingClientRect||!t.getBoundingClientRect)return 0;const{left:n,right:r,top:o,bottom:s,height:i,width:a}=e.getBoundingClientRect(),{left:c,right:l,top:u,bottom:d}=t.getBoundingClientRect();return ct(Math.min(r,l)-Math.max(n,c),0,a)*ct(Math.min(s,d)-Math.max(o,u),0,i)/(a*i)}(e,this.el)>=this.overlap}handleEvent({detail:{shftTarget:e}}){e&&this.canAccept(e)&&(it(this.el,"dropopen",{relatedTarget:e}),this.el.setAttribute("drop-open",""),this.remove=at(e,"drag",this.dragListener.bind(this)),e.addEventListener("dragend",this.dragEndListener.bind(this),{once:!0}))}dragListener({shftTarget:e}){const t=this.canDrop(e);if(t!==this.dropover){[e,this.el].forEach((e,n,r)=>{it(e,t?"dragenter":"dragleave",{relatedTarget:r[1-n]})});const n=t?"setAttribute":"removeAttribute";this.el[n]("drop-over",""),this.dropover=t}t&&[e,this.el].forEach((e,t,n)=>{it(e,"dragover",{relatedTarget:n[1-t]})})}dragEndListener({shftTarget:e}){this.remove(),this.remove=()=>{},this.el.removeAttribute("drop-open"),this.el.removeAttribute("drop-over"),it(this.el,"drop-close",{relatedTarget:e}),this.canDrop(e)&&[e,this.el].forEach((e,t,n)=>{it(e,"drop",{relatedTarget:n[1-t]})})}}let ft=[];const ht=({shftTarget:e})=>{ft=ft.filter(e=>e.isConnected),ft.forEach(t=>{t.dispatchEvent(new CustomEvent("_dragstart",{detail:{shftTarget:e}}))})};Object.assign(window,{DROPS:ft});var pt={drag:e=>{if(e instanceof Element&&!lt.has(e)){const t=new ut(e);e.addEventListener("mousedown",t),lt.set(e,t)}return e},drop:function(e,t={accepts:"",overlap:.5}){return e instanceof Element&&!(e=>ft.includes(e))(e)&&(["accepts","overlap"].forEach(n=>{e.setAttribute("drop-"+n,t[n])}),e.addEventListener("_dragstart",new dt(e)),document.addEventListener("dragstart",ht),ft=[...ft.filter(e=>e.isConnected),e]),e},util:{clear:function(e){const{drags:t,drops:n}=rt;if(t.has(e)){const{onmousedown:n,onmousemove:r,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",n),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o)}if(n.has(e)){const{ondragstart:t,ondrag:r,ondragend:o}=n.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",r),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(n=>{let r=parseFloat(t.style[n])||0;r+="left"===n?e.movementX:e.movementY,t.style[n]=r+"px"})},is:function(e,t){const{drags:n,drops:r}=rt;switch(t){case"drag":case"draggable":return n.has(e);case"drop":case"droppable":return r.has(e);default:return n.has(e)||r.has(e)}},matches:function(e,t){return!t||0===t.length||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}},_GLOBAL:rt};const{drag:vt}=pt,bt=R`
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
`,mt={min:Xe("min",0),max:Xe("max",100),step:Xe("step",1),value:Object.assign(Object.assign({},Xe("value",0)),{observe:(e,t)=>{K(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),bar:{get:({render:e})=>e().querySelector(".slider-bar"),observe:(e,t,n)=>{t&&t!==n&&vt(t)}}},gt=(e,{clientX:t})=>{const n=t-e.getBoundingClientRect().left,{min:r,max:o,step:s,clientWidth:i}=e;e.value=Ie(r,o,Be(s,Ue(0,i,r,o,n)))},yt=Ve("ue-slider",Object.assign(Object.assign({},mt),{render:U(e=>{const{min:t,max:n,value:r,clientWidth:o}=e;return R`
        ${Je} ${bt}
        <div
            class="slider-bar"
            @drag=${t=>gt(e,t)}
            @mousedown=${t=>gt(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${Ie(0,o,Ue(t,n,0,o,r))}px) translateX(-50%);"
            ></div>
        </div>
    `})})),wt={arrow:((e,...t)=>new x(e,t,"svg",L))`
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
`},xt=R`
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
`,_t=Ve("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:U(e=>R`
        ${xt} ${wt[e.shape]}
    `)})),Ot={_ue_item:!0,active:Xe("active",!0),selected:Xe("selected",!1)},Et=Object.assign(Object.assign({},Ot),{value:Xe("value",""),label:e=>e.getAttribute("label")||e.innerText,render:U(()=>R`<slot></slot>`)}),jt=Object.assign(Object.assign({},Ot),{icon:Xe("icon",""),label:Xe("label",""),render:U(({active:e})=>R`${e?R`<slot></slot>`:R``}`)}),kt={items:Re(e=>void 0!==e._ue_item)},St={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{K(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},$t=De((e,t)=>{e.forEach(e=>{e.selected=e===t})}),Nt=Ve("ue-list-item",Et),Tt=Ve("ue-content-item",jt),At={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,n)=>e.selected=n===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:n}=e;console.log("changed to "+t),n[t]&&K(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:n[t].label,item:n[t]}})}},Mt={items:Re(e=>e.ueItem)},Lt=Object.assign(Object.assign({},Mt),{preselect:Xe("preselect",0),selected:At,selectedItem:({items:e})=>e.find(e=>e.selected)}),Pt=De((e,t)=>R` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:n},r)=>R`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=r}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${r}">${n}</slot>
    </ue-button>
`),Vt=Object.assign(Object.assign({},Lt),{location:Xe("location","left")}),Ct=R`
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
`,Rt=Ve("ue-tab-group",Object.assign(Object.assign({},Vt),{render:U(e=>R`
        ${Ct}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${Pt(e)}
        </div>
        <slot></slot>
    `)})),Dt=Object.assign(Object.assign({},Lt),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return((e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)))(document,"click",()=>{e.open=!1},{once:!0})}}}),Ft=R`
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
`,Wt={border:"1px solid transparent"},It={border:"1px solid var(--ue-active-bg-color)"},Bt=Ve("ue-dropdown",Object.assign(Object.assign({},Dt),{render:U(e=>{const{open:t,selectedItem:n}=e;return R`
        ${Ft}
        <div class="container" style=${B(t?It:Wt)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${n?n.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${B(t?It:Wt)}>
                    ${Pt(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),Ut={value:Object.assign(Object.assign({},Xe("value",0)),{observe:(e,t,n)=>{t!==n&&K(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:Xe("duration",1),delay:Xe("delay",0)},Ht=Ve("ue-progress-bar",Object.assign(Object.assign({},Ut),{render:U(e=>{const{value:t,duration:n,delay:r}=e;return R`
        ${Je}
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
                width: ${Ie(0,100,t)}%;
                transition: width ${Ie(0,1/0,n)}s ease
                    ${Ie(0,1/0,r)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{K(e,"updated")}}
            ></div>
        </div>
    `})})),zt=Object.assign(Object.assign({},Lt),{direction:Xe("direction","column")}),Xt=R`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,Yt=Ve("ue-select-grp",Object.assign(Object.assign({},zt),{render:U(e=>R`
                ${Xt}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${Pt(e)}
                </div>
            `)})),qt={open:Xe("open",!1),direction:Xe("direction","right"),duration:Xe("duration",500)},Kt=R`
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
`,Gt={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},Zt={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Jt=Ve("ue-drawer",Object.assign(Object.assign({},qt),{render:U(({direction:e,duration:t,open:n})=>R`
        ${Kt}
        <div style=${B((({direction:e,duration:t,open:n})=>({transition:`transform ${t}ms`,flexDirection:Gt[e],transform:n?"translate(0, 0)":Zt[e]}))({direction:e,duration:t,open:n}))}>
            <slot></slot>
        </div>
    `)})),Qt=Object.assign(Object.assign({},kt),{selected:St}),en=(e,t,n)=>(e.slot=e.selected?"selected-item":"",R`<ue-button .checked=${e.selected} @click=${()=>$t(n,e)}
        >${e.label}</ue-button
    >`),tn=({items:e})=>R`
        ${Je}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(en)}
    `,nn=Ve("ue-list",Object.assign(Object.assign({},Qt),{render:U(tn)})),rn=Ve("ue-tab-list",Object.assign(Object.assign({},Qt),{render:U(({items:e})=>R`${tn({items:e})} <slot name="selected-item"></slot>`)})),on=Object.assign(Object.assign({},kt),{render:U(({items:e})=>R`
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
        `)}),sn=Object.assign(Object.assign({},Ot),{msg:(an=on,cn="function"==typeof an?an:function(e){return e===an},{get:function(e){return function(e,t){for(var n=e.parentElement||e.parentNode.host;n;){var r=n.constructor.hybrids;if(r&&t(r))return n;n=n.parentElement||n.parentNode&&n.parentNode.host}return n||null}(e,cn)},connect:function(e,t,n){return!!e[t]&&n}}),index:e=>e.msg.items.indexOf(e),render:U(e=>R`
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
        `)});var an,cn;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),n=document.createElement("ue-msg-item");n.innerText=e,t.appendChild(n)}});const ln=Ve("ue-msg",on),un=Ve("ue-msg-item",sn);return e.UeButton=nt,e.UeContentItem=Tt,e.UeDrawer=Jt,e.UeDropdown=Bt,e.UeIcon=_t,e.UeList=nn,e.UeListItem=Nt,e.UeMsg=ln,e.UeMsgItem=un,e.UeProgressBar=Ht,e.UeSelectGrp=Yt,e.UeSlider=yt,e.UeTabGroup=Rt,e.UeTabList=rn,e.UeText=Ze,e.shadowStyle=qe,e}({});
