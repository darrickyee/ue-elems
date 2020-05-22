import { directive as directive$1, render, html, svg } from 'lit-html';
import { property, define, dispatch, children, parent } from 'hybrids';

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
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

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
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};

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
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;

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
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();

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
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}

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
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
    constructor(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        const classList = (element.getAttribute('class') || '').split(/\s+/);
        for (const cls of classList) {
            this.classes.add(cls);
        }
    }
    add(cls) {
        this.classes.add(cls);
        this.changed = true;
    }
    remove(cls) {
        this.classes.delete(cls);
        this.changed = true;
    }
    commit() {
        if (this.changed) {
            let classString = '';
            this.classes.forEach((cls) => classString += cls + ' ');
            this.element.setAttribute('class', classString);
        }
    }
}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
const classMap = directive((classInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    const classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
        const value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
});

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
/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
const styleMap = directive((styleInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'style' || part.committer.parts.length > 1) {
        throw new Error('The `styleMap` directive must be used in the style attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { style } = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
        // Write static styles once
        style.cssText = committer.strings.join(' ');
        previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach((name) => {
        if (!(name in styleInfo)) {
            previousStyleProperties.delete(name);
            if (name.indexOf('-') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style[name] = null;
            }
            else {
                style.removeProperty(name);
            }
        }
    });
    // Add or update properties
    for (const name in styleInfo) {
        previousStyleProperties.add(name);
        if (name.indexOf('-') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style[name] = styleInfo[name];
        }
        else {
            style.setProperty(name, styleInfo[name]);
        }
    }
});

const hasRun = new WeakSet();
/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
const once = directive$1((fn) => (part) => {
    if (hasRun.has(part))
        return;
    part.setValue(fn());
    hasRun.add(part);
});
const lit = (fn, options = {}) => {
    return host => {
        const template = fn(host);
        return (_, target) => render(template, target, options);
    };
};

const curry = fn => function $c(...args) {
    return args.length < fn.length ? $c.bind(null, ...args) : fn.call(null, ...args);
};
const pipe = (...fns) => (...args) => fns.reduce((result, fn) => [fn.call(null, ...result)], args)[0];

/**
 * Adds an event listener to `target` and returns the associated `removeEventListener` function.
 *
 * @example
 *
 * // Add listener to document
 * const unlisten = listen(document, 'click', () => console.log('clicked'))
 *
 * // Remove listener
 * unlisten();
 *
 * @param target EventTarget to which the listener will be added.
 * @param type Passed to `addEventListener`.
 * @param listener Passed to `addEventListener`.
 * @param options Passed to `addEventListener`.
 *
 * @returns Function that removes the listener when called.
 */
const listen = (target, type, listener, options) => {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
};
/**
 * Returns a promise that resolves if `<context>.querySelector.(<selector>)` is found before `timeout` milliseconds and rejects otherwise.
 *
 * @param selector Selector string.
 * @param context Context for `selector`.  Defaults to `document`.
 * @param expire Expiration time (milliseconds).  Defaults to 1000.
 */
const findElement = (selector, context = document, timeout = 1000) => {
    return new Promise((resolve, reject) => {
        let expired;
        const t = setTimeout(() => {
            expired = true;
        }, timeout);
        function _find() {
            if (expired)
                return reject();
            let el = context.querySelector(selector);
            if (el) {
                clearTimeout(t);
                return resolve(el);
            }
            requestAnimationFrame(_find);
        }
        _find();
    });
};

const lerp = curry((start, end, t) => (end - start) * t + start);
const invlerp = curry((start, end, x) => (x - start) / (end - start));
const clamp = curry((min, max, value) => Math.max(min, Math.min(value, max)));
const roundTo = curry((step, value) => {
    if (step <= 0)
        return value;
    const decimals = step.toString().split('.')[1];
    return parseFloat((Math.round(value / step) * step).toFixed(decimals ? decimals.length : 0));
});
const remap = curry((fromStart, fromEnd, toStart, toEnd, value) => pipe(invlerp(fromStart, fromEnd), lerp(toStart, toEnd))(value));

const reflectStr = (attrName, defaultValue) => ({
    get: host => host.getAttribute(attrName) || defaultValue,
    set: (host, value) => {
        host.setAttribute(attrName, value);
        return value;
    },
    connect: (host, key, invalidate) => {
        host[key] =
            host.getAttribute(attrName) === null ? defaultValue : host.getAttribute(attrName);
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [attrName] });
    },
});
const reflectNum = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => parseFloat(host.getAttribute(attrName)) || defaultValue }));
const reflectBool = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => host.hasAttribute(attrName) || defaultValue, set: (host, value) => {
        if (value)
            host.setAttribute(attrName, '');
        else
            host.removeAttribute(attrName);
        return !!value;
    }, connect: (host, key, invalidate) => {
        host[key] = host.hasAttribute(attrName);
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [attrName] });
    } }));
const mappers = {
    boolean: reflectBool,
    number: reflectNum,
    string: reflectStr,
};
/**
 * reflect(attrName, defaultValue)
 */
const reflect = curry((attrName, defaultValue) => attrName && mappers[typeof defaultValue]
    ? mappers[typeof defaultValue](attrName, defaultValue)
    : property(defaultValue));

// Cartesian product w/ self
const AxA = (arr) => [].concat(...arr.map(i => arr.map(j => [i, j])));
const range = (s, e) => Array.from('0'.repeat(e - s), (_, i) => s + i);
const coords = i => AxA(range(-i, i + 1));
const shadowStyle = host => {
    const { lineWidth } = host;
    const w = isNaN(parseInt(lineWidth)) ? 1 : Math.max(parseInt(lineWidth), 0);
    const suffix = ' var(--ue-border-blur, 0px) var(--ue-border-color, black)';
    return coords(w)
        .map(xy => xy.map(i => i + 'px').join(' '))
        .map(s => s + ` ${suffix}`)
        .join(', ');
};
const styles = html `
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
`;
const properties = {
    lineWidth: reflect('line-width', 1)
};
const template = host => html `
    ${styles}
    <div style="text-shadow: ${shadowStyle(host)};"><slot></slot></div>
`;
const UeText = define('ue-text', Object.assign(Object.assign({}, properties), { render: lit(template) }));

const styleProps = {
    inverted: false,
    outlined: false,
    glow: false
};
const defaultStyles = html `
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
`;

/********** Utility functions **********/
const handleEvent = curry((host, { type }) => {
    // switch (type) {
    //     case 'focus':
    //         host.focused = true;
    //         break;
    //     case 'blur':
    //         host.focused = host.active = false;
    //         break;
    //     case 'mousedown':
    //         host.active = true;
    //         break;
    //     case 'mouseup':
    //         host.active = false;
    //         break;
    // }
});
const styles$1 = html `
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
`;
const properties$1 = Object.assign({ active: reflect('active', false), checked: reflect('checked', false), disabled: reflect('disabled', false), focused: reflect('focused', false) }, styleProps);
const template$1 = host => {
    const { active, checked, disabled, focused } = host;
    return html `
        ${defaultStyles} ${styles$1}

        <button
            tabindex="0"
            class=${classMap({ active, checked, focused })}
            .disabled=${disabled}
            @focus=${handleEvent(host)}
            @blur=${handleEvent(host)}
            @mousedown=${handleEvent(host)}
            @mouseup=${handleEvent(host)}
        >
            <slot></slot>
        </button>
    `;
};
const UeButton = define('ue-button', Object.assign(Object.assign({}, properties$1), { render: lit(template$1) }));

const e=function(e){const t=e._SHFTJS||{};return ["drags","drops"].forEach(e=>{t[e]||(t[e]=new WeakMap);}),e._SHFTJS=t}(window),t=["bubbles","cancelable","composed","detail","view","altKey","ctrlKey","metaKey","shiftKey","button","buttons","clientX","clientY","movementX","movementY","relatedTarget","screenX","screenY"];function n(e,n={}){const o={};return t.forEach(t=>{o[t]=e[t];}),Object.assign(o,n)}function o(e,t,n={}){const o=new MouseEvent(t,n);return o.shftTarget=e,e.dispatchEvent(o),o}const{drags:r,drops:a}=e;function s(e,t=0,n=1){return Math.max(t,Math.min(e,n))}function d(e,t){return !t||("string"==typeof t&&(t=[t]),t instanceof Array&&t.some(t=>e.matches(t)))}function c(t,n){const{drags:o,drops:r}=e;switch(n){case"drag":case"draggable":return o.has(t);case"drop":case"droppable":return r.has(t);default:return o.has(t)||r.has(t)}}function u(e,t){const{accepts:n,overlap:o}=a.get(e);return d(t,n)&&function(e,t){const{left:n,right:o,top:r,bottom:a,height:d,width:c}=e.getBoundingClientRect(),{left:u,right:i,top:m,bottom:g}=t.getBoundingClientRect();return s(Math.min(o,i)-Math.max(n,u),0,c)*s(Math.min(a,g)-Math.max(r,m),0,d)/(c*d)}(t,e)>o}const{drags:i}=e;function m(e){return t=>{const{onmousemove:r,onmouseup:a}=i.get(e);1===t.buttons&&(o(e,"dragstart",n(t)),document.addEventListener("mousemove",r),document.addEventListener("mouseup",a,{once:!0}));}}function g(e){return t=>{o(e,"drag",n(t));}}function l(e){return t=>{const{onmousemove:r}=i.get(e);o(e,"dragend",n(t)),document.removeEventListener("mousemove",r);}}const{drops:v}=e;function p(e){return t=>{if(!v.has(e))return;const n=t.shftTarget,{accepts:r,ondrag:a,ondragend:s}=v.get(e);d(n,r)&&(o(e,"dropopen",{relatedTarget:n}),n.addEventListener("drag",a),n.addEventListener("dragend",s,{once:!0}));}}function f(e){return t=>{const r=t.shftTarget,{accepts:a,content:s}=v.get(e);d(r,a)&&(u(e,r)?(s.has(r)||(s.add(r),o(e,"dragenter",n(t,{relatedTarget:r}))),o(e,"dragover",n(t,{relatedTarget:r}))):s.has(r)&&(s.delete(r),o(e,"dragleave",n(t,{relatedTarget:r}))));}}function h(e){return t=>{const r=t.shftTarget,{ondrag:a}=v.get(e);o(e,"dropclose",n(t,{relatedTarget:r})),r.removeEventListener("drag",a),u(e,r)&&o(e,"drop",n(t,{relatedTarget:r}));}}var E={drag:function(e){if(c(e,"drag"))return;const t={onmousedown:m(e),onmousemove:g(e),onmouseup:l(e)};e.addEventListener("mousedown",t.onmousedown),i.set(e,t);},drop:function(e,t){if(c(e,"drop"))return;const{accepts:n,overlap:o}=Object.assign({accepts:null,overlap:.5},t||{}),r={content:new WeakSet,ondragstart:p(e),ondrag:f(e),ondragend:h(e),accepts:n,overlap:o};document.addEventListener("dragstart",r.ondragstart),v.set(e,r);},util:{clear:function(t){const{drags:n,drops:o}=e;if(n.has(t)){const{onmousedown:e,onmousemove:o,onmouseup:r}=n.get(t);t.removeEventListener("mousedown",e),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r);}if(o.has(t)){const{ondragstart:e,ondrag:n,ondragend:r}=o.get(t);document.removeEventListener("dragstart",e),document.removeEventListener("drag",n),document.removeEventListener("dragend",r);}},defaultmove:function(e){const t=e.target;["absolute","relative"].some(e=>e===t.style.position)||(t.style.position="relative"),["left","top"].forEach(n=>{let o=parseFloat(t.style[n])||0;o+="left"===n?e.movementX:e.movementY,t.style[n]=o+"px";});},is:c,matches:d},_GLOBAL:e};

const { drag } = E;
const styles$2 = html `
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
`;
const properties$2 = {
    min: reflect('min', 0),
    max: reflect('max', 100),
    step: reflect('step', 1),
    value: Object.assign(Object.assign({}, reflect('value', 0)), { observe: (host, value) => {
            dispatch(host, 'changed', { bubbles: true, composed: true, detail: { value } });
        } }),
};
const _dragHandle = (host, { clientX }) => {
    const offsetX = clientX - host.getBoundingClientRect().left;
    const { min, max, step, clientWidth } = host;
    host.value = clamp(min, max, roundTo(step, remap(0, clientWidth, min, max, offsetX)));
};
const template$2 = (host) => {
    const { min, max, value, clientWidth } = host;
    return html `
        ${defaultStyles} ${styles$2}
        <div
            class="slider-bar"
            @drag=${(e) => _dragHandle(host, e)}
            @mousedown=${(e) => _dragHandle(host, e)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${clamp(0, clientWidth, remap(min, max, 0, clientWidth, value))}px) translateX(-50%);"
            ></div>
        </div>
        ${once(() => {
        findElement('.slider-bar', host.shadowRoot).then(drag).catch(console.log);
    })}
    `;
};
const UeSlider = define('ue-slider', Object.assign(Object.assign({}, properties$2), { render: lit(template$2) }));

// Arrow
const arrow = svg `
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
`;
const shapes = {
    arrow
};
const styles$3 = html `
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
`;
const properties$3 = { shape: 'arrow' };
const template$3 = host => html `
        ${styles$3} ${shapes[host.shape]}
    `;
const UeIcon = define('ue-icon', Object.assign(Object.assign({}, properties$3), { render: lit(template$3) }));

const Item = {
    _ue_item: true,
    active: reflect('active', true),
    selected: reflect('selected', false),
};
const ListItem = Object.assign(Object.assign({}, Item), { value: reflect('value', ''), label: host => host.getAttribute('label') || host.innerText, render: lit(() => html `<slot></slot>`) });
const ContentItem = Object.assign(Object.assign({}, Item), { icon: reflect('icon', ''), label: reflect('label', ''), render: lit(({ active }) => html `${active ? html `<slot></slot>` : html ``}`) });
const ItemGroup = {
    items: children(el => el['_ue_item'] !== undefined),
};
const singleSelectProp = {
    get: ({ items }) => items.findIndex(item => item.selected),
    observe: (host, value) => {
        dispatch(host, 'selected', {
            bubbles: true,
            composed: true,
            detail: { index: value, item: host.items[value] || null },
        });
    },
};
const selectSingle = curry((itemArray, item) => {
    itemArray.forEach(i => {
        i.selected = i === item;
    });
});
const UeListItem = define('ue-list-item', ListItem);
const UeContentItem = define('ue-content-item', ContentItem);

const singleSelect = {
    get: ({ items }, lastValue) => items.map(item => item.selected).indexOf(true),
    set: ({ items }, value) => items.map((item, index) => (item.selected = index === value)).indexOf(true),
    connect: (host, key) => {
        host[key] = host.preselect || 0;
    },
    observe: (host, selected) => {
        const { items } = host;
        console.log(`changed to ${selected}`);
        if (items[selected])
            dispatch(host, 'changed', {
                bubbles: true,
                composed: true,
                detail: {
                    index: selected,
                    label: items[selected].label,
                    item: items[selected],
                },
            });
    },
};
const BaseGroup = {
    items: children(el => el['ueItem']),
};
const SingleSelectGroup = Object.assign(Object.assign({}, BaseGroup), { preselect: reflect('preselect', 0), selected: singleSelect, selectedItem: ({ items }) => items.find(item => item.selected) });
const itemList = curry((itemTemplate, host) => html ` ${host.items.map(itemTemplate(host))} `);
const buttonItemTemplate = host => ({ selected, innerText }, index) => html `
    <ue-button
        .checked=${selected}
        @click=${() => {
    host.selected = index;
}}
        style="pointer-events: ${selected ? 'none' : 'inherit'}"
    >
        <slot name="item-label-${index}">${innerText}</slot>
    </ue-button>
`;
const buttonList = itemList(buttonItemTemplate);

const properties$4 = Object.assign(Object.assign({}, SingleSelectGroup), { location: reflect('location', 'left') });
const styles$4 = html `
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
`;
const template$4 = host => html `
        ${styles$4}
        <div
            style="flex-direction: ${['left', 'right'].includes(host.location) ? 'column' : 'row'};"
        >
            ${buttonList(host)}
        </div>
        <slot></slot>
    `;
const UeTabGroup = define('ue-tab-group', Object.assign(Object.assign({}, properties$4), { render: lit(template$4) }));

const properties$5 = Object.assign(Object.assign({}, SingleSelectGroup), { open: {
        connect: (host, key) => {
            host[key] = false;
        },
        observe: (host, value) => {
            if (value)
                return listen(document, 'click', () => {
                    host.open = false;
                }, { once: true });
        }
    } });
const styles$5 = html `
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
`;
const closeStyle = {
    border: '1px solid transparent'
};
const openStyle = {
    border: '1px solid var(--ue-active-bg-color)'
};
const template$5 = host => {
    const { open, selectedItem } = host;
    return html `
        ${styles$5}
        <div class="container" style=${styleMap(open ? openStyle : closeStyle)}>
            <ue-button
                .checked=${open}
                @click=${() => {
        host.open = !open;
    }}
                >${selectedItem ? selectedItem.label : ''}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${open} direction="down">
                <div style=${styleMap(open ? openStyle : closeStyle)}>
                    ${buttonList(host)}
                </div>
            </ue-drawer>
        </div>
    `;
};
const UeDropdown = define('ue-dropdown', Object.assign(Object.assign({}, properties$5), { render: lit(template$5) }));

const properties$6 = {
    // value: {
    //     get: (host, lastValue) => lastValue || 0,
    //     set: (host, value, lastValue) => {
    //         if (value !== lastValue) dispatch(host, 'change');
    //         if (value >= 100) dispatch(host, 'full');
    //         return value;
    //     }
    // },
    value: Object.assign(Object.assign({}, reflect('value', 0)), { observe: (host, value, lastValue) => {
            if (value !== lastValue)
                dispatch(host, 'change', { bubbles: true, composed: true, detail: { value } });
        } }),
    duration: reflect('duration', 1),
    delay: reflect('delay', 0)
};
const template$6 = host => {
    const { value, duration, delay } = host;
    return html `
        ${defaultStyles}
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
                width: ${clamp(0, 100, value)}%;
                transition: width ${clamp(0, Infinity, duration)}s ease
                    ${clamp(0, Infinity, delay)}s;
            }
        </style>
        <div id="bg">
            <div
                id="bar"
                @transitionend=${() => {
        dispatch(host, 'updated');
    }}
            ></div>
        </div>
    `;
};
const UeProgressBar = define('ue-progress-bar', Object.assign(Object.assign({}, properties$6), { render: lit(template$6) }));

const properties$7 = Object.assign(Object.assign({}, SingleSelectGroup), { direction: reflect('direction', 'column') });
const styles$6 = html `
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`;
const UeSelectGrp = define('ue-select-grp', Object.assign(Object.assign({}, properties$7), { render: lit(host => html `
                ${styles$6}
                <div style="display: flex; flex-direction: ${host.direction}">
                    ${buttonList(host)}
                </div>
            `) }));

const properties$8 = {
    open: reflect('open', false),
    direction: reflect('direction', 'right'),
    duration: reflect('duration', 500),
};
const styles$7 = html `
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
`;
const flexdirs = {
    left: 'row-reverse',
    right: 'row',
    down: 'column',
    up: 'column-reverse',
};
const transforms = {
    left: 'translate(110%, 0)',
    right: 'translate(-110%, 0)',
    down: 'translate(0, -110%)',
    up: 'translate(0, 110%)',
};
const getStyle = ({ direction, duration, open }) => ({
    transition: `transform ${duration}ms`,
    flexDirection: flexdirs[direction],
    transform: open ? 'translate(0, 0)' : transforms[direction],
});
const template$7 = ({ direction, duration, open }) => html `
        ${styles$7}
        <div style=${styleMap(getStyle({ direction, duration, open }))}>
            <slot></slot>
        </div>
    `;
const UeDrawer = define('ue-drawer', Object.assign(Object.assign({}, properties$8), { render: lit(template$7) }));

const properties$9 = Object.assign(Object.assign({}, ItemGroup), { selected: singleSelectProp });
const itemTemplate = (item, _, itemArray) => {
    item.slot = item.selected ? 'selected-item' : '';
    return html `<ue-button .checked=${item.selected} @click=${() => selectSingle(itemArray, item)}
        >${item.label}</ue-button
    >`;
};
const template$8 = ({ items }) => html `
        ${defaultStyles}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${items.map(itemTemplate)}
    `;
const UeList = define('ue-list', Object.assign(Object.assign({}, properties$9), { render: lit(template$8) }));
const tabTmp = ({ items }) => html `${template$8({ items })} <slot name="selected-item"></slot>`;
const UeTabList = define('ue-tab-list', Object.assign(Object.assign({}, properties$9), { render: lit(tabTmp) }));
const UeMsgT = Object.assign(Object.assign({}, ItemGroup), { render: lit(({ items }) => html `
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
        `) });
const UeMsgItemT = Object.assign(Object.assign({}, Item), { msg: parent(UeMsgT), index: host => host.msg.items.indexOf(host), render: lit(host => html `
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
                style="transform: translateY(${host.index * 100}%);"
                @animationend=${() => {
        host.parentNode.removeChild(host);
    }}
            >
                <slot></slot>
            </div>
        `) });
const addMsg = msg => {
    const m = document.querySelector('ue-msg');
    const it = document.createElement('ue-msg-item');
    it.innerText = msg;
    m.appendChild(it);
};
Object.assign(window, { addMsg });
const UeMsg = define('ue-msg', UeMsgT);
const UeMsgItem = define('ue-msg-item', UeMsgItemT);

export { UeButton, UeContentItem, UeDrawer, UeDropdown, UeIcon, UeList, UeListItem, UeMsg, UeMsgItem, UeProgressBar, UeSelectGrp, UeSlider, UeTabGroup, UeTabList, UeText, shadowStyle };
