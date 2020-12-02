!function(){"use strict";
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
     */const e=new WeakMap,t=t=>(...n)=>{const r=t(...n);return e.set(r,!0),r},n=t=>"function"==typeof t&&e.has(t),r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},s={},i={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${c}`),u="$lit$";class d{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],o=document.createTreeWalker(t.content,133,null,!1);let s=0,i=-1,c=0;const{strings:d,values:{length:h}}=e;for(;c<h;){const e=o.nextNode();if(null!==e){if(i++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let r=0;for(let e=0;e<n;e++)f(t[e].name,u)&&r++;for(;r-- >0;){const t=d[c],n=v.exec(t)[2],r=n.toLowerCase()+u,o=e.getAttribute(r);e.removeAttribute(r);const s=o.split(l);this.parts.push({type:"attribute",index:i,name:n,strings:s}),c+=s.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const r=e.parentNode,o=t.split(l),s=o.length-1;for(let t=0;t<s;t++){let n,s=o[t];if(""===s)n=p();else{const e=v.exec(s);null!==e&&f(e[2],u)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-u.length)+e[3]),n=document.createTextNode(s)}r.insertBefore(n,e),this.parts.push({type:"node",index:++i})}""===o[s]?(r.insertBefore(p(),e),n.push(e)):e.data=o[s],c+=s}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&i!==s||(i++,t.insertBefore(p(),e)),s=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),c++}}else o.currentNode=r.pop()}for(const e of n)e.parentNode.removeChild(e)}}const f=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},h=e=>-1!==e.index,p=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class b{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,o=document.createTreeWalker(e,133,null,!1);let s,i=0,a=0,c=o.nextNode();for(;i<n.length;)if(s=n[i],h(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(t.push(c),o.currentNode=c.content),null===(c=o.nextNode())&&(o.currentNode=t.pop(),c=o.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));i++}else this.__parts.push(void 0),i++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const m=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),g=` ${a} `;class y{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const s=v.exec(e);t+=null===s?e+(n?g:c):e.substr(0,s.index)+s[1]+s[2]+u+s[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==m&&(t=m.createHTML(t)),e.innerHTML=t,e}}class w extends y{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,r=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,r),t=n}})(t,n.firstChild),e}}
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),_=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class O{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new E(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!_(e))return e}let r="";for(let o=0;o<t;o++){r+=e[o];const t=n[o];if(void 0!==t){const e=t.value;if(x(e)||!_(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===s||x(e)&&e===this.value||(this.value=e,n(e)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const e=this.value;this.value=s,e(this)}this.value!==s&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(p()),this.endNode=e.appendChild(p())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=p()),e.__insert(this.endNode=p())}insertAfterPart(e){e.__insert(this.startNode=p()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}const e=this.__pendingValue;e!==s&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):_(e)?this.__commitIterable(e):e===i?(this.value=i,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const n=new b(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,r=0;for(const o of e)n=t[r],void 0===n&&(n=new j(this.options),t.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(t[r-1])),n.setValue(o),n.commit(),r++;r<t.length&&(t.length=r,this.clear(n&&n.endNode))}clear(e=this.startNode){o(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=s}}class $ extends O{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends E{}let S=!1;(()=>{try{const e={get capture(){return S=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=T(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=s}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(S?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;const M=new class{handleAttributeExpressions(e,t,n,r){const o=t[0];if("."===o){return new $(e,t.slice(1),n).parts}if("@"===o)return[new A(e,t.slice(1),r.eventContext)];if("?"===o)return[new k(e,t.slice(1),n)];return new O(e,t,n).parts}handleTextExpression(e){return new j(e)}};
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
     */function L(e){let t=P.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},P.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(a);return n=t.keyString.get(r),void 0===n&&(n=new d(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}const P=new Map,V=new WeakMap;
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
class R{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}}const D=new WeakMap,F=t(e=>t=>{if(!(t instanceof E)||t instanceof N||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=t,{element:r}=n;let o=D.get(t);void 0===o&&(r.setAttribute("class",n.strings.join(" ")),D.set(t,o=new Set));const s=r.classList||new R(r);o.forEach(t=>{t in e||(s.remove(t),o.delete(t))});for(const t in e){const n=e[t];n!=o.has(t)&&(n?(s.add(t),o.add(t)):(s.remove(t),o.delete(t)))}"function"==typeof s.commit&&s.commit()}),W=new WeakMap,B=t(e=>t=>{if(!(t instanceof E)||t instanceof N||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:n}=t,{style:r}=n.element;let o=W.get(t);void 0===o&&(r.cssText=n.strings.join(" "),W.set(t,o=new Set)),o.forEach(t=>{t in e||(o.delete(t),-1===t.indexOf("-")?r[t]=null:r.removeProperty(t))});for(const t in e)o.add(t),-1===t.indexOf("-")?r[t]=e[t]:r.setProperty(t,e[t])}),H=(e,t={})=>n=>{const r=e(n);return(e,n)=>((e,t,n)=>{let r=V.get(t);void 0===r&&(o(t,t.firstChild),V.set(t,r=new j(Object.assign({templateFactory:L},n))),r.appendInto(t)),r.setValue(e),r.commit()})(r,n,t)};function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){X(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function X(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Y=new Map;function q(e){var t=Y.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),Y.set(e,t)),t}function K(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,z({bubbles:!1},n)))}function Z(e){return(Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var J=function(e){return e},G=function(e){if("object"!==Z(e))throw TypeError("Assigned value must be an object: ".concat(Z(e)));return e&&Object.freeze(e)};function Q(e,t){var n=Z(e),r=J;switch(n){case"string":r=String;break;case"number":r=Number;break;case"boolean":r=Boolean;break;case"function":e=(r=e)();break;case"object":e&&Object.freeze(e),r=G}return{get:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return n},set:function(e,t,n){return r(t,n)},connect:"object"!==n&&"undefined"!==n?function(n,o,s){if(n[o]===e){var i=q(o);if(n.hasAttribute(i)){var a=n.getAttribute(i);n[o]=""===a&&r===Boolean||a}}return t&&t(n,o,s)}:t}}function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(Object(n),!0).forEach((function(t){te(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ne(e){return(ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var re=new WeakMap,oe=new Set;function se(){try{oe.forEach((function(e){try{re.get(e)(),oe.delete(e)}catch(t){throw oe.delete(e),t}}))}catch(e){throw oe.size&&se(),e}}function ie(e){oe.size||requestAnimationFrame(se),oe.add(e)}var ae=new WeakMap;function ce(e,t){var n=ae.get(e);n||(n=new Map,ae.set(e,n));var r=n.get(t);return r||(r={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:0,checksum:0,observed:!1},n.set(t,r)),r}function le(e){var t=e.state;return e.deps&&e.deps.forEach((function(e){t+=e.state})),t}function ue(e){e.observed&&ie(e),e.contexts&&e.contexts.forEach(ue)}function de(e,t){t&&t.forEach((function(t){e.deps.add(t),e.observed&&(t.contexts||(t.contexts=new Set),t.contexts.add(e)),de(e,t.deps)}))}var fe=new Set;function he(e,t,n,r){var o=ce(e,t);if(fe.size&&fe.has(o))throw Error("Circular get invocation is forbidden: '".concat(t,"'"));if(fe.forEach((function(e){e.deps||(e.deps=new Set),e.deps.add(o),e.observed&&(o.contexts||(o.contexts=new Set),o.contexts.add(e))})),(r&&r(o.value)||!r)&&o.checksum&&o.checksum===le(o))return o.value;try{fe.add(o),o.observed&&o.deps&&o.deps.size&&o.deps.forEach((function(e){e.contexts&&e.contexts.delete(o)})),o.deps=void 0;var s=n(e,o.value);o.deps&&o.deps.forEach((function(e){de(o,e.deps)})),s!==o.value&&(o.state+=1,o.value=s,ue(o)),o.checksum=le(o),fe.delete(o)}catch(e){throw o.checksum=0,fe.delete(o),fe.forEach((function(e){e.deps.delete(o),e.observed&&o.contexts.delete(e)})),e}return o.value}var pe=new Set;function ve(e,t,n){e.checksum=0,e.state+=1,ue(e),n&&function(e){pe.size||requestAnimationFrame((function(){pe.forEach((function(e){(!e.contexts||e.contexts&&0===e.contexts.size)&&ae.get(e.target).delete(e.key)})),pe.clear()})),pe.add(e)}(e),t&&(e.value=void 0)}function be(e,t,n,r){var o,s=ce(e,t);s.observed=!0;var i=function(e,t){return re.set(e,t),ie(e),function(){oe.delete(e),re.delete(e)}}(s,(function(){var s=he(e,t,n);s!==o&&(r(e,s,o),o=s)}));return s.deps&&s.deps.forEach((function(e){e.contexts||(e.contexts=new Set),e.contexts.add(s)})),function(){i(),s.observed=!1,s.deps&&s.deps.size&&s.deps.forEach((function(e){e.contexts&&e.contexts.delete(s)}))}}function me(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ge(e,t){return!t||"object"!==je(t)&&"function"!=typeof t?ye(e):t}function ye(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function we(e){var t="function"==typeof Map?new Map:void 0;return(we=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return xe(e,arguments,Ee(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Oe(r,e)})(e)}function xe(e,t,n){return(xe=_e()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&Oe(o,n.prototype),o}).apply(null,arguments)}function _e(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Oe(e,t){return(Oe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ee(e){return(Ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function je(e){return(je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}try{ke.env.NODE_ENV}catch(e){var ke={env:{NODE_ENV:"production"}}}var $e=function(e,t){return t},Ne=new WeakMap,Se=new WeakMap;function Ae(e,t){e.hybrids=t;var n=[],r=Object.keys(t);Ne.set(e,n),Se.set(e,r),r.forEach((function(r){var o,s=t[r],i=je(s);o="function"===i?"render"===r?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(ne(e)));var n=ee({shadowRoot:!0},t),r={mode:"open"};return"object"===ne(n.shadowRoot)&&Object.assign(r,n.shadowRoot),{get:function(t){var o=e(t),s=t;return n.shadowRoot&&(t.shadowRoot||t.attachShadow(r),s=t.shadowRoot),function(){return o(t,s),s}},observe:function(e,t){t()}}}(s):{get:s}:"object"!==i||null===s||Array.isArray(s)?Q(s):{get:s.get||$e,set:s.set||!s.get&&$e||void 0,connect:s.connect,observe:s.observe},Object.defineProperty(e.prototype,r,{get:function(){return he(this,r,o.get)},set:o.set&&function(e){!function(e,t,n,r){var o=ce(e,t),s=n(e,r,o.value);s!==o.value&&(o.checksum=0,o.state+=1,o.value=s,ue(o))}(this,r,o.set,e)},enumerable:!0,configurable:"production"!==ke.env.NODE_ENV}),o.observe&&n.unshift((function(e){return be(e,r,o.get,o.observe)})),o.connect&&n.push((function(e){return o.connect(e,r,(function(){!function(e,t,n,r){if(fe.size)throw Error("Invalidating property in chain of get calls is forbidden: '".concat(t,"'"));ve(ce(e,t),n,r)}(e,r)}))}))}))}var Te=new WeakMap;function Me(e,t){var n=je(t);if("object"!==n&&"function"!==n)throw TypeError("Second argument must be an object or a function: ".concat(n));if(null!==e){var r=window.customElements.get(e);if("function"===n)return r!==t?window.customElements.define(e,t):r;if(r){if(r.hybrids===t)return r;throw Error("Element '".concat(e,"' already defined"))}}var o=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Oe(e,t)}(i,e);var t,n,r,o,s=(t=i,function(){var e,n=Ee(t);if(_e()){var r=Ee(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return ge(this,e)});function i(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),e=s.call(this);for(var t=Se.get(i),n=0;n<t.length;n+=1){var r=t[n];if(Object.prototype.hasOwnProperty.call(ye(e),r)){var o=e[r];delete e[r],e[r]=o}}return e}return n=i,(r=[{key:"connectedCallback",value:function(){for(var e=Ne.get(i),t=[],n=0;n<e.length;n+=1){var r=e[n](this);r&&t.push(r)}Te.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=Te.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&me(n.prototype,r),o&&me(n,o),i}(we(HTMLElement));return Ae(o,t),null!==e&&(Object.defineProperty(o,"name",{get:function(){return e}}),customElements.define(e,o)),o}function Le(e){return Object.keys(e).reduce((function(t,n){var r=q(n.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[n]=Me(r,e[n]),t}),{})}function Pe(){return"object"===je(arguments.length<=0?void 0:arguments[0])&&null!==(arguments.length<=0?void 0:arguments[0])?Le(arguments.length<=0?void 0:arguments[0]):Me.apply(void 0,arguments)}function Ve(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Array.from(e.children).forEach((function(e){var o=e.constructor.hybrids;o&&t(o)?(r.push(e),n.deep&&n.nested&&Ve(e,t,n,r)):n.deep&&Ve(e,t,n,r)})),r}function Ce(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{deep:!1,nested:!1},n="function"==typeof e?e:function(t){return t===e};return{get:function(e){return Ve(e,n,t)},connect:function(e,n,r){var o=new MutationObserver(r);return o.observe(e,{childList:!0,subtree:!!t.deep}),function(){o.disconnect()}}}}const Re=e=>function t(...n){return n.length<e.length?t.bind(null,...n):e.call(null,...n)},De=Re((e,t,n)=>(t-e)*n+e),Fe=Re((e,t,n)=>(n-e)/(t-e)),We=Re((e,t,n)=>Math.max(e,Math.min(n,t))),Be=Re((e,t)=>{if(e<=0)return t;const n=e.toString().split(".")[1];return parseFloat((Math.round(t/e)*e).toFixed(n?n.length:0))}),He=Re((e,t,n,r,o)=>((...e)=>(...t)=>e.reduce((e,t)=>[t.call(null,...e)],t)[0])(Fe(e,t),De(n,r))(o)),Ie=(e,t)=>({get:n=>n.getAttribute(e)||t,set:(t,n)=>(t.setAttribute(e,n),n),connect:(n,r,o)=>{n[r]=null===n.getAttribute(e)?t:n.getAttribute(e);new MutationObserver(o).observe(n,{attributeFilter:[e]})}}),ze={boolean:(e,t)=>Object.assign(Object.assign({},Ie(e,t)),{get:n=>n.hasAttribute(e)||t,set:(t,n)=>(n?t.setAttribute(e,""):t.removeAttribute(e),!!n),connect:(t,n,r)=>{t[n]=t.hasAttribute(e);new MutationObserver(r).observe(t,{attributeFilter:[e]})}}),number:(e,t)=>Object.assign(Object.assign({},Ie(e,t)),{get:n=>parseFloat(n.getAttribute(e))||t}),string:Ie},Xe=Re((e,t)=>e&&ze[typeof t]?ze[typeof t](e,t):Q(t)),Ye=e=>{return n=-e,r=e+1,t=Array.from("0".repeat(r-n),(e,t)=>n+t),[].concat(...t.map(e=>t.map(t=>[e,t])));var t,n,r},qe=C`
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
`,Ke={lineWidth:Xe("line-width",1)},Ze=(Pe(null,Object.assign(Object.assign({},Ke),{render:H(e=>C`
    ${qe}
    <div style="text-shadow: ${(e=>{const{lineWidth:t}=e,n=isNaN(parseInt(t))?1:Math.max(parseInt(t),0);return Ye(n).map(e=>e.map(e=>e+"px").join(" ")).map(e=>e+"  var(--ue-border-blur, 0px) var(--ue-border-color, black)").join(", ")})(e)};"><slot></slot></div>
`)})),C`
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
`),Je=Re((e,{type:t})=>{}),Ge=C`
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
`,Qe=Object.assign({active:Xe("active",!1),checked:Xe("checked",!1),disabled:Xe("disabled",!1),focused:Xe("focused",!1)},{inverted:!1,outlined:!1,glow:!1}),Ue=Pe(null,Object.assign(Object.assign({},Qe),{render:H(e=>{const{active:t,checked:n,disabled:r,focused:o}=e;return C`
        ${Ze} ${Ge}

        <button
            tabindex="0"
            class=${F({active:t,checked:n,focused:o})}
            .disabled=${r}
            @focus=${Je(e)}
            @blur=${Je(e)}
            @mousedown=${Je(e)}
            @mouseup=${Je(e)}
        >
            <slot></slot>
        </button>
    `})})),et=function(e){const t=e._SHFTJS||{};return["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap)}),e._SHFTJS=t}(window),tt=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function nt(e,t={}){const n={};return tt.forEach(t=>{n[t]=e[t]}),Object.assign(n,t)}function rt(e,t,n={}){const r=new MouseEvent(t,n);return r.shftTarget=e,e.dispatchEvent(r),r}const ot=(e,t,n,r)=>(e.addEventListener(t,n,r||{}),()=>{e.removeEventListener(t,n,r||{})});function st(e,t=0,n=1){return Math.max(t,Math.min(e,n))}const it=new WeakMap;Object.assign(window,{isDrag:e=>it.has(e),undrag:e=>{e.removeEventListener("mousedown",it.get(e)),it.delete(e)}});class at{constructor(e){this.el=e}handleEvent(e){if(1===e.buttons){rt(this.el,"dragstart",nt(e)),this.el.setAttribute("is-dragging","");const t=ot(document,"mousemove",e=>{rt(this.el,"drag",nt(e))});document.addEventListener("mouseup",e=>{t(),this.el.removeAttribute("is-dragging"),rt(this.el,"dragend",nt(e))},{once:!0})}}}class ct{constructor(e){this.el=e,this.remove=()=>{},this.dropover=!1}get accepts(){return this.el.getAttribute("drop-accepts")||""}get overlap(){return parseFloat(this.el.getAttribute("drop-overlap"))||.5}canAccept(e){return!this.accepts||e.matches(this.accepts)}canDrop(e){return function(e,t){if(!e.getBoundingClientRect||!t.getBoundingClientRect)return 0;const{left:n,right:r,top:o,bottom:s,height:i,width:a}=e.getBoundingClientRect(),{left:c,right:l,top:u,bottom:d}=t.getBoundingClientRect();return st(Math.min(r,l)-Math.max(n,c),0,a)*st(Math.min(s,d)-Math.max(o,u),0,i)/(a*i)}(e,this.el)>=this.overlap}handleEvent({detail:{shftTarget:e}}){e&&this.canAccept(e)&&(rt(this.el,"dropopen",{relatedTarget:e}),this.el.setAttribute("drop-open",""),this.remove=ot(e,"drag",this.dragListener.bind(this)),e.addEventListener("dragend",this.dragEndListener.bind(this),{once:!0}))}dragListener({shftTarget:e}){const t=this.canDrop(e);if(t!==this.dropover){[e,this.el].forEach((e,n,r)=>{rt(e,t?"dragenter":"dragleave",{relatedTarget:r[1-n]})});const n=t?"setAttribute":"removeAttribute";this.el[n]("drop-over",""),this.dropover=t}t&&[e,this.el].forEach((e,t,n)=>{rt(e,"dragover",{relatedTarget:n[1-t]})})}dragEndListener({shftTarget:e}){this.remove(),this.remove=()=>{},this.el.removeAttribute("drop-open"),this.el.removeAttribute("drop-over"),rt(this.el,"drop-close",{relatedTarget:e}),this.canDrop(e)&&[e,this.el].forEach((e,t,n)=>{rt(e,"drop",{relatedTarget:n[1-t]})})}}let lt=[];const ut=({shftTarget:e})=>{lt=lt.filter(e=>e.isConnected),lt.forEach(t=>{t.dispatchEvent(new CustomEvent("_dragstart",{detail:{shftTarget:e}}))})};Object.assign(window,{DROPS:lt});var dt={drag:e=>{if(e instanceof Element&&!it.has(e)){const t=new at(e);e.addEventListener("mousedown",t),it.set(e,t)}return e},drop:function(e,t={accepts:"",overlap:.5}){return e instanceof Element&&!(e=>lt.includes(e))(e)&&(["accepts","overlap"].forEach(n=>{e.setAttribute("drop-"+n,t[n])}),e.addEventListener("_dragstart",new ct(e)),document.addEventListener("dragstart",ut),lt=[...lt.filter(e=>e.isConnected),e]),e},util:{clear:function(e){const{drags:t,drops:n}=et;if(t.has(e)){const{onmousedown:n,onmousemove:r,onmouseup:o}=t.get(e);e.removeEventListener("mousedown",n),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o)}if(n.has(e)){const{ondragstart:t,ondrag:r,ondragend:o}=n.get(e);document.removeEventListener("dragstart",t),document.removeEventListener("drag",r),document.removeEventListener("dragend",o)}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(n=>{let r=parseFloat(t.style[n])||0;r+="left"===n?e.movementX:e.movementY,t.style[n]=r+"px"})},is:function(e,t){const{drags:n,drops:r}=et;switch(t){case"drag":case"draggable":return n.has(e);case"drop":case"droppable":return r.has(e);default:return n.has(e)||r.has(e)}},matches:function(e,t){return!t||0===t.length||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}},_GLOBAL:et};const{drag:ft}=dt,ht=C`
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
            height: 0.5em;
            background: var(--ue-default-c-primary);
            touch-action: none;
            display: flex;
            align-items: center;
        }

        .handle {
            cursor: default;
            width: 1em;
            height: 1em;
            /* background: var(--ue-default-c-primary); */
            background-color: rgba(255, 0, 0, 0.3);
            clip-path: circle(0.5em);
            position: absolute;
            left: 0;
        }
    </style>
`,pt={min:Xe("min",0),max:Xe("max",100),step:Xe("step",1),value:Object.assign(Object.assign({},Xe("value",0)),{observe:(e,t)=>{K(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),bar:{get:({render:e})=>e().querySelector(".slider-bar"),observe:(e,t,n)=>{t&&t!==n&&ft(t)}}},vt=(e,{clientX:t})=>{const n=t-e.getBoundingClientRect().left,{min:r,max:o,step:s,clientWidth:i}=e;e.value=We(r,o,Be(s,He(0,i,r,o,n)))},bt=Pe(null,Object.assign(Object.assign({},pt),{render:H(e=>{const{min:t,max:n,value:r,clientWidth:o}=e;return C`
        ${Ze} ${ht}
        <div
            class="slider-bar"
            @drag=${t=>vt(e,t)}
            @mousedown=${t=>vt(e,t)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${We(0,o,He(t,n,0,o,r))}px) translateX(-50%);"
            ></div>
        </div>
    `})})),mt={arrow:((e,...t)=>new w(e,t,"svg",M))`
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
`},gt=C`
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
`,yt=Pe(null,Object.assign(Object.assign({},{shape:"arrow"}),{render:H(e=>C`
        ${gt} ${mt[e.shape]}
    `)})),wt={_ue_item:!0,active:Xe("active",!0),selected:Xe("selected",!1)},xt=Object.assign(Object.assign({},wt),{value:Xe("value",""),label:e=>e.getAttribute("label")||e.innerText,render:H(()=>C`<slot></slot>`)}),_t=Object.assign(Object.assign({},wt),{icon:Xe("icon",""),label:Xe("label",""),render:H(({active:e})=>C`${e?C`<slot></slot>`:C``}`)}),Ot={items:Ce(e=>void 0!==e._ue_item)},Et={get:({items:e})=>e.findIndex(e=>e.selected),observe:(e,t)=>{K(e,"selected",{bubbles:!0,composed:!0,detail:{index:t,item:e.items[t]||null}})}},jt=Re((e,t)=>{e.forEach(e=>{e.selected=e===t})}),kt=(Pe(null,xt),Pe(null,_t)),$t={get:({items:e},t)=>e.map(e=>e.selected).indexOf(!0),set:({items:e},t)=>e.map((e,n)=>e.selected=n===t).indexOf(!0),connect:(e,t)=>{e[t]=e.preselect||0},observe:(e,t)=>{const{items:n}=e;console.log("changed to "+t),n[t]&&K(e,"changed",{bubbles:!0,composed:!0,detail:{index:t,label:n[t].label,item:n[t]}})}},Nt={items:Ce(e=>e.ueItem)},St=Object.assign(Object.assign({},Nt),{preselect:Xe("preselect",0),selected:$t,selectedItem:({items:e})=>e.find(e=>e.selected)}),At=Re((e,t)=>C` ${t.items.map(e(t))} `)(e=>({selected:t,innerText:n},r)=>C`
    <ue-button
        .checked=${t}
        @click=${()=>{e.selected=r}}
        style="pointer-events: ${t?"none":"inherit"}"
    >
        <slot name="item-label-${r}">${n}</slot>
    </ue-button>
`),Tt=Object.assign(Object.assign({},St),{location:Xe("location","left")}),Mt=C`
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
`,Lt=Pe(null,Object.assign(Object.assign({},Tt),{render:H(e=>C`
        ${Mt}
        <div
            style="flex-direction: ${["left","right"].includes(e.location)?"column":"row"};"
        >
            ${At(e)}
        </div>
        <slot></slot>
    `)})),Pt=Object.assign(Object.assign({},St),{open:{connect:(e,t)=>{e[t]=!1},observe:(e,t)=>{if(t)return((e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)))(document,"click",()=>{e.open=!1},{once:!0})}}}),Vt=C`
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
`,Ct={border:"1px solid transparent"},Rt={border:"1px solid var(--ue-active-bg-color)"},Dt=Pe(null,Object.assign(Object.assign({},Pt),{render:H(e=>{const{open:t,selectedItem:n}=e;return C`
        ${Vt}
        <div class="container" style=${B(t?Rt:Ct)}>
            <ue-button
                .checked=${t}
                @click=${()=>{e.open=!t}}
                >${n?n.label:""}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${t} direction="down">
                <div style=${B(t?Rt:Ct)}>
                    ${At(e)}
                </div>
            </ue-drawer>
        </div>
    `})})),Ft={value:Object.assign(Object.assign({},Xe("value",0)),{observe:(e,t,n)=>{t!==n&&K(e,"change",{bubbles:!0,composed:!0,detail:{value:t}})}}),duration:Xe("duration",1),delay:Xe("delay",0)},Wt=Pe(null,Object.assign(Object.assign({},Ft),{render:H(e=>{const{value:t,duration:n,delay:r}=e;return C`
        ${Ze}
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
                width: ${We(0,100,t)}%;
                transition: width ${We(0,1/0,n)}s ease
                    ${We(0,1/0,r)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${()=>{K(e,"updated")}}
            ></div>
        </div>
    `})})),Bt=Object.assign(Object.assign({},St),{direction:Xe("direction","column")}),Ht=C`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`,It=Pe(null,Object.assign(Object.assign({},Bt),{render:H(e=>C`
                ${Ht}
                <div style="display: flex; flex-direction: ${e.direction}">
                    ${At(e)}
                </div>
            `)})),zt={open:Xe("open",!1),direction:Xe("direction","right"),duration:Xe("duration",500)},Xt=C`
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
`,Yt={left:"row-reverse",right:"row",down:"column",up:"column-reverse"},qt={left:"translate(110%, 0)",right:"translate(-110%, 0)",down:"translate(0, -110%)",up:"translate(0, 110%)"},Kt=Pe(null,Object.assign(Object.assign({},zt),{render:H(({direction:e,duration:t,open:n})=>C`
        ${Xt}
        <div style=${B((({direction:e,duration:t,open:n})=>({transition:`transform ${t}ms`,flexDirection:Yt[e],transform:n?"translate(0, 0)":qt[e]}))({direction:e,duration:t,open:n}))}>
            <slot></slot>
        </div>
    `)})),Zt=Object.assign(Object.assign({},Ot),{selected:Et}),Jt=(e,t,n)=>(e.slot=e.selected?"selected-item":"",C`<ue-button .checked=${e.selected} @click=${()=>jt(n,e)}
        >${e.label}</ue-button
    >`),Gt=({items:e})=>C`
        ${Ze}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${e.map(Jt)}
    `,Qt=(Pe("ue-list",Object.assign(Object.assign({},Zt),{render:H(Gt)})),Pe("ue-tab-list",Object.assign(Object.assign({},Zt),{render:H(({items:e})=>C`${Gt({items:e})} <slot name="selected-item"></slot>`)})),Object.assign(Object.assign({},Ot),{render:H(({items:e})=>C`
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
        `)})),Ut=Object.assign(Object.assign({},wt),{msg:(en=Qt,tn="function"==typeof en?en:function(e){return e===en},{get:function(e){return function(e,t){for(var n=e.parentElement||e.parentNode.host;n;){var r=n.constructor.hybrids;if(r&&t(r))return n;n=n.parentElement||n.parentNode&&n.parentNode.host}return n||null}(e,tn)},connect:function(e,t,n){return!!e[t]&&n}}),index:e=>e.msg.items.indexOf(e),render:H(e=>C`
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
        `)});var en,tn;Object.assign(window,{addMsg:e=>{const t=document.querySelector("ue-msg"),n=document.createElement("ue-msg-item");n.innerText=e,t.appendChild(n)}});Pe("ue-msg",Qt),Pe("ue-msg-item",Ut);customElements.define("ue-button",Ue),customElements.define("ue-content-item",kt),customElements.define("ue-drawer",Kt),customElements.define("ue-icon",yt),customElements.define("ue-dropdown",Dt),customElements.define("ue-progress-bar",Wt),customElements.define("ue-select-grp",It),customElements.define("ue-tab-group",Lt),customElements.define("ue-slider",bt)}();
