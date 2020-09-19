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
     */const t=new WeakMap,n=e=>(...n)=>{const r=e(...n);return t.set(r,!0),r},r=e=>"function"==typeof e&&t.has(e),o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},i={},a={},c=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${c}--\x3e`,u=new RegExp(`${c}|${l}`);class d{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],o=document.createTreeWalker(t.content,133,null,!1);let s=0,i=-1,a=0;const{strings:l,values:{length:d}}=e;for(;a<d;){const e=o.nextNode();if(null!==e){if(i++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let r=0;for(let e=0;e<n;e++)f(t[e].name,"$lit$")&&r++;for(;r-- >0;){const t=l[a],n=v.exec(t)[2],r=n.toLowerCase()+"$lit$",o=e.getAttribute(r);e.removeAttribute(r);const s=o.split(u);this.parts.push({type:"attribute",index:i,name:n,strings:s}),a+=s.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(c)>=0){const r=e.parentNode,o=t.split(u),s=o.length-1;for(let t=0;t<s;t++){let n,s=o[t];if(""===s)n=p();else{const e=v.exec(s);null!==e&&f(e[2],"$lit$")&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),n=document.createTextNode(s)}r.insertBefore(n,e),this.parts.push({type:"node",index:++i})}""===o[s]?(r.insertBefore(p(),e),n.push(e)):e.data=o[s],a+=s}}else if(8===e.nodeType)if(e.data===c){const t=e.parentNode;null!==e.previousSibling&&i!==s||(i++,t.insertBefore(p(),e)),s=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(c,t+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=r.pop()}for(const e of n)e.parentNode.removeChild(e)}}const f=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},h=e=>-1!==e.index,p=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class b{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let s,i=0,a=0,c=r.nextNode();for(;i<n.length;)if(s=n[i],h(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(t.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=t.pop(),c=r.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));i++}else this.__parts.push(void 0),i++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const m=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),g=` ${c} `;class y{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const s=v.exec(e);t+=null===s?e+(n?g:l):e.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+c}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==m&&(t=m.createHTML(t)),e.innerHTML=t,e}}class w extends y{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,r=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,r),t=n}})(t,n.firstChild),e}}
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),_=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class O{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new E(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!_(e))return e}let r="";for(let o=0;o<t;o++){r+=e[o];const t=n[o];if(void 0!==t){const e=t.value;if(x(e)||!_(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||x(e)&&e===this.value||(this.value=e,r(e)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(p()),this.endNode=e.appendChild(p())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=p()),e.__insert(this.endNode=p())}insertAfterPart(e){e.__insert(this.startNode=p()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):_(e)?this.__commitIterable(e):e===a?(this.value=a,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const n=new b(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,r=0;for(const o of e)n=t[r],void 0===n&&(n=new j(this.options),t.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(t[r-1])),n.setValue(o),n.commit(),r++;r<t.length&&(t.length=r,this.clear(n&&n.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}class $ extends O{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends E{}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;r(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const M=new class{handleAttributeExpressions(e,t,n,r){const o=t[0];if("."===o){return new $(e,t.slice(1),n).parts}if("@"===o)return[new T(e,t.slice(1),r.eventContext)];if("?"===o)return[new k(e,t.slice(1),n)];return new O(e,t,n).parts}handleTextExpression(e){return new j(e)}};
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
     */function L(e){let t=P.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},P.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(c);return n=t.keyString.get(r),void 0===n&&(n=new d(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}const P=new Map,V=new WeakMap;
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const C=(e,...t)=>new y(e,t,"html",M);
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
class R{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const D=new WeakMap,F=n(e=>t=>{if(!(t instanceof E)||t instanceof S||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=t,{element:r}=n;let o=D.get(t);void 0===o&&(r.setAttribute("class",n.strings.join(" ")),D.set(t,o=new Set));const s=r.classList||new R(r);o.forEach(t=>{t in e||(s.remove(t),o.delete(t))});for(const t in e){const n=e[t];n!=o.has(t)&&(n?(s.add(t),o.add(t)):(s.remove(t),o.delete(t)))}"function"==typeof s.commit&&s.commit()}),W=new WeakMap,I=n(e=>t=>{if(!(t instanceof E)||t instanceof S||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:n}=t,{style:r}=n.element;let o=W.get(t);void 0===o&&(r.cssText=n.strings.join(" "),W.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?r[t]=null:r.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?r[t]=e[t]:r.setProperty(t,e[t])}),B=(e,t={})=>n=>{const r=e(n);return(e,n)=>((e,t,n)=>{let r=V.get(t);void 0===r&&(s(t,t.firstChild),V.set(t,r=new j(Object.assign({templateFactory:L},n))),r.appendInto(t)),r.setValue(e),r.commit()})(r,n,t)};function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(Object(n),!0).forEach((function(t){z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var X=new Map;function Y(e){var t=X.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),X.set(e,t)),t}function q(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,H({bubbles:!1},n)))}function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var G=function(e){return e},Z=function(e){if("object"!==K(e))throw TypeError("Assigned value must be an object: ".concat(K(e)));return e&&Object.freeze(e)};function J(e,t){var n=K(e),r=G;switch(n){case"string":r=String;break;case"number":r=Number;break;case"boolean":r=Boolean;break;case"function":e=(r=e)();break;case"object":e&&Object.freeze(e),r=Z}return{get:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return n},set:function(e,t,n){return r(t,n)},connect:"object"!==n&&"undefined"!==n?function(n,o,s){if(n[o]===e){var i=Y(o);if(n.hasAttribute(i)){var a=n.getAttribute(i);n[o]=""===a&&r===Boolean||a}}return t&&t(n,o,s)}:t}}function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){te(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ne(e){return(ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var re=new WeakMap,oe=new Set;function se(){try{oe.forEach((function(e){try{re.get(e)(),oe.delete(e)}catch(t){throw oe.delete(e),t}}))}catch(e){throw oe.size&&se(),e}}function ie(e){oe.size||requestAnimationFrame(se),oe.add(e)}var ae=new WeakMap;function ce(e,t){var n=ae.get(e);n||(n=new Map,ae.set(e,n));var r=n.get(t);return r||(r={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},n.set(t,r)),r}function le(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function ue(e){e.observed&&ie(e),e.contexts&&e.contexts.forEach(ue)}var de=new Set;function fe(e,t,n,r){var o=ce(e,t);if(de.size&&de.has(o))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(de.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(o),e.observed&&(o.contexts||(o.contexts=new Set),o.contexts.add(e))})),(r&&r(o.value)||!r)&&o.checksum&&o.checksum===le(o))return o.value;try{de.add(o),o.observed&&o.deps&&o.deps.size&&o.deps.forEach((function(e){e.contexts&&e.contexts.delete(o)})),o.deps=void 0;var s=n(e,o.value);o.deps&&o.deps.forEach((function(e){!function e(t,n){n&&n.forEach((function(n){t.deps.add(n),t.observed&&(n.contexts||(n.contexts=new Set),n.contexts.add(t)),e(t,n.deps)}))}(o,e.deps)})),s!==o.value&&(o.state+=1,o.value=s,ue(o)),o.checksum=le(o),de.delete(o)}catch(e){throw o.checksum=0,de.delete(o),de.forEach((function(e){e.deps.delete(o),e.observed&&o.contexts.delete(e)})),e}return o.value}var he=new Set;function pe(e,t,n){e.checksum=0,e.state+=1,ue(e),n&&function(e){he.size||requestAnimationFrame((function(){he.forEach((function(e){(!e.contexts||e.contexts&&0===e.contexts.size)&&ae.get(e.target).delete(e.key)})),he.clear()})),he.add(e)}(e),t&&(e.value=void 0)}function ve(e,t,n,r){var o,s=ce(e,t);s.observed=!0;var i=function(e,t){return re.set(e,t),ie(e),function(){oe.delete(e),re.delete(e)}}(s,(function(){var s=fe(e,t,n);s!==o&&(r(e,s,o),o=s)}));return s.deps&&s.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(s)})),function(){i(),s.observed=!1,s.deps&&s.deps.size&&s.deps.forEach((function(e){e.contexts&&e.contexts.delete(s)}))}}function be(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function me(e,t){return!t||"object"!==Ee(t)&&"function"!=typeof t?ge(e):t}function ge(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ye(e){var t="function"==typeof Map?new Map:void 0;return(ye=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return we(e,arguments,Oe(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),_e(r,e)})(e)}function we(e,t,n){return(we=xe()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&_e(o,n.prototype),o}).apply(null,arguments)}function xe(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _e(e,t){return(_e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Oe(e){return(Oe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ee(e){return(Ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{je.env.NODE_ENV}catch(e){var je={env:{NODE_ENV:"production"}}}var ke=function(e,t){return t},$e=new WeakMap,Se=new WeakMap;function Ne(e,t){e.hybrids=t;var n=[],r=Object.keys(t);$e.set(e,n),Se.set(e,r),r.forEach((function(r){var o,s=t[r],i=Ee(s);o="function"===i?"render"===r?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(ne(e)));var n=ee({shadowRoot:!0},t),r={mode:"open"};return"object"===ne(n.shadowRoot)&&Object.assign(r,n.shadowRoot),{get:function(t){var o=e(t),s=t;return n.shadowRoot&&(t.shadowRoot||t.attachShadow(r),s=t.shadowRoot),function(){return o(t,s),s}},observe:function(e,t){t()}}}(s):{get:s}:"object"!==i||null===s||Array.isArray(s)?J(s):{get:s.get||ke,set:s.set||!s.get&&ke||void 0,connect:s.connect,observe:s.observe},Object.defineProperty(e.prototype,r,{get:function(){return fe(this,r,o.get)},set:o.set&&function(e){!function(e,t,n,r){var o=ce(e,t),s=n(e,r,o.value);s!==o.value&&(o.checksum=0,o.state+=1,o.value=s,ue(o))}(this,r,o.set,e)},enumerable:!0,configurable:"production"!==je.env.NODE_ENV}),o.observe&&n.unshift((function(e){return ve(e,r,o.get,o.observe)})),o.connect&&n.push((function(e){return o.connect(e,r,(function(){!function(e,t,n,r){if(de.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));pe(ce(e,t),n,r)}(e,r)}))}))}))}var Te=new WeakMap;function Ae(e,t){var n=Ee(t);if("object"!==n&&"function"!==n)throw TypeError("Second argument must be an object or a function: ".concat(n));if(null!==e){var r=window.customElements.get(e);if("function"===n)return r!==t?window.customElements.define(e,t):r;if(r){if(r.hybrids===t)return r;throw Error("Element '".concat(e,"' already defined"))}}var o=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_e(e,t)}(i,e);var t,n,r,o,s=(t=i,function(){var e,n=Oe(t);if(xe()){var r=Oe(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return me(this,e)});function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),e=s.call(this);for(var t=Se.get(i),n=0;n<t.length;n+=1){var r=t[n];if(Object.prototype.hasOwnProperty.call(ge(e),r)){var o=e[r];delete e[r],e[r]=o}}return e}return n=i,(r=[{key:"connectedCallback",value:function(){for(var e=$e.get(i),t=[],n=0;n<e.length;n+=1){var r=e[n](this);r&&t.push(r)}Te.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Te.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&be(n.prototype,r),o&&be(n,o),i}(ye(HTMLElement));return Ne(o,t),null!==e&&(Object.defineProperty(o,"name",{get:function(){return e}}),customElements.define(e,o)),o}function Me(e){return Object.keys(e).reduce((function(t,n){var r=Y(n.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[n]=Ae(r,e[n]),t}),{})}function Le(){return"object"===Ee(arguments.length<=0?void 0:arguments[0])&&null!==(arguments.length<=0?void 0:arguments[0])?Me(arguments.length<=0?void 0:arguments[0]):Ae.apply(void 0,arguments)}function Pe(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(r.push(e),n.deep&&n.nested&&Pe(e,t,n,r)):n.deep&&Pe(e,t,n,r)})),r}function Ve(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},n="function"==typeof e?e:function(t){return t===e};return{get:function(e){return Pe(e,n,t)},connect:function(e,n,r){var o=new MutationObserver(r);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}const Ce=e=>function t(...n){return n.length<e.length?t.bind(null,...n):e.call(null,...n)},Re=Ce((e,t,n)=>(t-e)*n+e),De=Ce((e,t,n)=>(n-e)/(t-e)),Fe=Ce((e,t,n)=>Math.max(e,Math.min(n,t))),We=Ce((e,t)=>{if(e<=0)return t;const n=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(n?n.length:0))}),Ie=Ce((e,t,n,r,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(De(e,t),Re(n,r))(o)),Be=(e,t)=>({get:n=>n.getAttribute(e)||t,set:(t,n)=>(t.setAttribute(e,n),n),connect:(n,r,o)=>{n[r]=null===n.getAttribute(e)?t:n.getAttribute(e);new MutationObserver(o).observe(n,{attributeFilter:[e]})}}),Ue={boolean:(e,t)=>Object.assign(Object.assign({},Be(e,t)),{get:n=>n.hasAttribute(e)||t,set:(t,n)=>(n?t.setAttribute(e,""):t.removeAttribute(e),!!n),connect:(t,n,r)=>{t[n]=t.hasAttribute(e);new MutationObserver(r).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},Be(e,t)),{get:n=>parseFloat(n.getAttribute(e))||t}),string:Be},He=Ce((e,t)=>e&&Ue[typeof t]?Ue[typeof t](e,t):J(t)),ze=e=>{return n=-e,r=e+1,t=Array.from("0".repeat(r-n),(e,t)=>n+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,n,r},Xe=e=>{const{lineWidth:t}=e,n=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return ze(n).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")},Ye=C`
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
`,qe={lineWidth:He("line-width",1)},Ke=Le("ue-text",Object.assign(Object.assign({},qe),{render:B(e=>C`
    ${Ye}
    <div style="text-shadow: ${Xe(e)};"><slot></slot></div>
`)})),Ge=C`
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
`,Ze=Ce((e,{type:t})=>{}),Je=C`
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
`,Qe=Object.assign({active:He("active",!1),checked:He("checked",!1),disabled:He("disabled",!1),focused:He("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),et=Le("ue-button",Object.assign(Object.assign({},Qe),{render:B(e=>{const{active:t,checked:n,disabled:r,focused:o}=e;return C`
        ${Ge} ${Je}

        <button
            tabindex="0"
            class=${F({active:t,checked:n,focused:o})}
            .disabled=${r}
            @focus=${Ze(e)}
            @blur=${Ze(e)}
            @mousedown=${Ze(e)}
            @mouseup=${Ze(e)}
        >
            <slot></slot>
        </button>
    `})})),tt=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),nt=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function rt(e,t={}){const n={};return nt.forEach(t=>{n[t]=e[t]}),Object.assign(n,t)}function ot(e,t,n={}){const r=new MouseEvent(t,n);return r.shftTarget=e,e.dispatchEvent(r),r}const st=(e,t,n,r)=>(e.addEventListener(t,n,r||{}),()=>{e.removeEventListener(t,n,r||{})});function it(e,t=0,n=1){return Math.max(t,Math.min(e,n))}const at=new WeakMap;Object.assign(window,{isDrag:e=>at.has(e),undrag:e=>{e.removeEventListener("mousedown",at.get(e)),at.delete(e)}});class ct{constructor(e){this.el=e}handleEvent(e){if(1===e.buttons){ot(this.el,"dragstart",rt(e)),this.el.setAttribute("is-dragging","");const t=st(document,"mousemove",e=>{ot(this.el,"drag",rt(e))});document.addEventListener("mouseup",e=>{t(),this.el.removeAttribute("is-dragging"),ot(this.el,"dragend",rt(e))},{once:!0})}}}class lt{constructor(e){this.el=e,this.remove=()=>{},this.dropover=!1}get accepts(){return this.el.getAttribute("drop-accepts")||""}get overlap(){return parseFloat(this.el.getAttribute("drop-overlap"))||.5}canAccept(e){return!this.accepts||e.matches(this.accepts)}canDrop(e){return function(e,t){if(!e.getBoundingClientRect||!t.getBoundingClientRect)return 0;const{left:n,right:r,top:o,bottom:s,height:i,width:a}=e.getBoundingClientRect(),{left:c,right:l,top:u,bottom:d}=t.getBoundingClientRect();return it(Math.min(r,l)-Math.max(n,c),0,a)*it(Math.min(s,d)-Math.max(o,u),0,i)/(a*i)}(e,this.el)>=this.overlap}handleEvent({detail:{shftTarget:e}}){e&&this.canAccept(e)&&(ot(this.el,"dropopen",{relatedTarget:e}),this.el.setAttribute("drop-open",""),this.remove=st(e,"drag",this.dragListener.bind(this)),e.addEventListener("dragend",this.dragEndListener.bind(this),{once:!0}))}dragListener({shftTarget:e}){const t=this.canDrop(e);if(t!==this.dropover){[e,this.el].forEach((e,n,r)=>{ot(e,t?"dragenter":"dragleave",{relatedTarget:r[1-n]})});const n=t?"setAttribute":"removeAttribute";this.el[n]("drop-over",""),this.dropover=t}t&&[e,this.el].forEach((e,t,n)=>{ot(e,"dragover",{relatedTarget:n[1-t]})})}dragEndListener({shftTarget:e}){this.remove(),this.remove=()=>{},this.el.removeAttribute("drop-open"),this.el.removeAttribute("drop-over"),ot(this.el,"drop-close",{relatedTarget:e}),this.canDrop(e)&&[e,this.el].forEach((e,t,n)=>{ot(e,"drop",{relatedTarget:n[1-t]})})}}let ut=[];const dt=({shftTarget:e})=>{ut=ut.filter(e=>e.isConnected),ut.forEach(t=>{t.dispatchEvent(new CustomEvent("_dragstart",{detail:{shftTarget:e}}))})};Object.assign(window,{DROPS:ut});var ft={drag:e=>{if(e instanceof Element&&!at.has(e)){const t=new ct(e);e.addEventListener("mousedown",t),at.set(e,t)}return e},drop:function(e,t={accepts:"",overlap:.5}){return e instanceof Element&&!(e=>ut.includes(e))(e)&&(["accepts","overlap"].forEach(n=>{e.setAttribute("drop-"+n,t[n])}),e.addEventListener("_dragstart",new lt(e)),document.addEventListener("dragstart",dt),ut=[...ut.filter(e=>e.isConnected),e]),e},util:{clear:function(e){const{drags:t,drops:n}=tt;if(t.has(e)){const{onmousedown:n,onmousemove:r,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",n),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o)}if(n.has(e)){const{ondragstart:t,ondrag:r,ondragend:o}=n.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",r),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(n=>{let r=parseFloat(t.style[n])||0;r+="left"===n?e.movementX:e.movementY,t.style[n]=r+"px"})},is:function(e,t){const{drags:n,drops:r}=tt;switch(t){case"drag":case"draggable":return n.has(e);case"drop":case"droppable":return r.has(e);default:return n.has(e)||r.has(e)}},matches:function(e,t){return!t||0===t.length||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}},_GLOBAL:tt};const{drag:ht}=ft,pt=C`
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
`,vt={min:He("min",0),max:He("max",100),step:He("step",1),value:Object.assign(Object.assign({},He("value",0)),{observe:(e,t)=>{q(e,"changed",{bubbles:!0,composed:!0,detail:{value:t}})}}),bar:{get:({render:e})=>e().querySelector(".slider-bar"),observe:(e,t,n)=>{t&&t!==n&&ht(t)}}},bt=(e,{clientX:t})=>{const n=t-e.getBoundingClientRect().left,{min:r,max:o,step:s,clientWidth:i}=e;e.value=Fe(r,o,We(s,Ie(0,i,r,o,n)))},mt=Le("ue-slider",Object.assign(Object.assign({},vt),{render:B(e=>{const{min:t,max:n,value:r,clientWidth:o}=e;return C`
        ${Ge} ${pt}
        <div
            class="slider-bar"
            @drag=${t=>bt(e,t)}
            @mousedown=${t=>bt(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${Fe(0,o,Ie(t,n,0,o,r))}px) translateX(-50%);"
            ></div>
        </div>
    `})})),gt={arrow:((e,...t)=>new w(e,t,"svg",M))`
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
`},yt=C`
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
`,wt=Le("ue-icon",Object.assign(Object.assign({},{shape:"arrow"}),{render:B(e=>C`
        ${yt} ${gt[e.shape]}
    `)})),xt={_ue_item:!0,active:He("active",!0),selected:He("selected",!1)},_t=Object.assign(Object.assign({},xt),{value:He("value",""),label:e=>e.getAttribute("label")||e.innerText,render:B(()=>C`<slot></slot>`)}),Ot=Object.assign(Object.assign({},xt),{icon:He("icon",""),label:He("label",""),render:B(({active:e})=>C`${e?C`<slot></slot>`:C``}`)}),Et={items:Ve(e=>void 0!==e._ue_item)},jt={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{q(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},kt=Ce((e,t)=>{e.forEach(e=>{e.selected=e===t})}),$t=Le("ue-list-item",_t),St=Le("ue-content-item",Ot),Nt={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,n)=>e.selected=n===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:n}=e;console.log("changed to "+t),n[t]&&q(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:n[t].label,item:n[t]}})}},Tt={items:Ve(e=>e.ueItem)},At=Object.assign(Object.assign({},Tt),{preselect:He("preselect",0),selected:Nt,selectedItem:({items:e})=>e.find(e=>e.selected)}),Mt=Ce((e,t)=>C` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:n},r)=>C`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=r}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${r}">${n}</slot>
    </ue-button>
`),Lt=Object.assign(Object.assign({},At),{location:He("location","left")}),Pt=C`
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
`,Vt=Le("ue-tab-group",Object.assign(Object.assign({},Lt),{render:B(e=>C`
        ${Pt}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${Mt(e)}
        </div>
        <slot></slot>
    `)})),Ct=Object.assign(Object.assign({},At),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return((e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)))(document,"click",()=>{e.open=!1},{once:!0})}}}),Rt=C`
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
`,Dt={border:"1px solid transparent"},Ft={border:"1px solid var(--ue-active-bg-color)"},Wt=Le("ue-dropdown",Object.assign(Object.assign({},Ct),{render:B(e=>{const{open:t,selectedItem:n}=e;return C`
        ${Rt}
        <div class="container" style=${I(t?Ft:Dt)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${n?n.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${I(t?Ft:Dt)}>
                    ${Mt(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),It={value:Object.assign(Object.assign({},He("value",0)),{observe:(e,t,n)=>{t!==n&&q(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:He("duration",1),delay:He("delay",0)},Bt=Le("ue-progress-bar",Object.assign(Object.assign({},It),{render:B(e=>{const{value:t,duration:n,delay:r}=e;return C`
        ${Ge}
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
                width: ${Fe(0,100,t)}%;
                transition: width ${Fe(0,1/0,n)}s ease
                    ${Fe(0,1/0,r)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{q(e,"updated")}}
            ></div>
        </div>
    `})})),Ut=Object.assign(Object.assign({},At),{direction:He("direction","column")}),Ht=C`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,zt=Le("ue-select-grp",Object.assign(Object.assign({},Ut),{render:B(e=>C`
                ${Ht}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${Mt(e)}
                </div>
            `)})),Xt={open:He("open",!1),direction:He("direction","right"),duration:He("duration",500)},Yt=C`
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
`,qt={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},Kt={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Gt=Le("ue-drawer",Object.assign(Object.assign({},Xt),{render:B(({direction:e,duration:t,open:n})=>C`
        ${Yt}
        <div style=${I((({direction:e,duration:t,open:n})=>({transition:`transform ${t}ms`,flexDirection:qt[e],transform:n?"translate(0, 0)":Kt[e]}))({direction:e,duration:t,open:n}))}>
            <slot></slot>
        </div>
    `)})),Zt=Object.assign(Object.assign({},Et),{selected:jt}),Jt=(e,t,n)=>(e.slot=e.selected?"selected-item":"",C`<ue-button .checked=${e.selected} @click=${()=>kt(n,e)}
        >${e.label}</ue-button
    >`),Qt=({items:e})=>C`
        ${Ge}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(Jt)}
    `,en=Le("ue-list",Object.assign(Object.assign({},Zt),{render:B(Qt)})),tn=Le("ue-tab-list",Object.assign(Object.assign({},Zt),{render:B(({items:e})=>C`${Qt({items:e})} <slot name="selected-item"></slot>`)})),nn=Object.assign(Object.assign({},Et),{render:B(({items:e})=>C`
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
        `)}),rn=Object.assign(Object.assign({},xt),{msg:(on=nn,sn="function"==typeof on?on:function(e){return e===on},{get:function(e){return function(e,t){for(var n=e.parentElement||e.parentNode.host;n;){var r=n.constructor.hybrids;if(r&&t(r))return n;n=n.parentElement||n.parentNode&&n.parentNode.host}return n||null}(e,sn)},connect:function(e,t,n){return!!e[t]&&n}}),index:e=>e.msg.items.indexOf(e),render:B(e=>C`
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
        `)});var on,sn;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),n=document.createElement("ue-msg-item");n.innerText=e,t.appendChild(n)}});const an=Le("ue-msg",nn),cn=Le("ue-msg-item",rn);return e.UeButton=et,e.UeContentItem=St,e.UeDrawer=Gt,e.UeDropdown=Wt,e.UeIcon=wt,e.UeList=en,e.UeListItem=$t,e.UeMsg=an,e.UeMsgItem=cn,e.UeProgressBar=Bt,e.UeSelectGrp=zt,e.UeSlider=mt,e.UeTabGroup=Vt,e.UeTabList=tn,e.UeText=Ke,e.shadowStyle=Xe,e}({});
