var UE_ELEMS = (function (exports, tippy) {
    'use strict';

    tippy = tippy && Object.prototype.hasOwnProperty.call(tippy, 'default') ? tippy['default'] : tippy;

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
     * True if the custom elements polyfill is in use.
     */
    const isCEPolyfill = typeof window !== 'undefined' &&
        window.customElements != null &&
        window.customElements.polyfillWrapFlushCallback !==
            undefined;
    /**
     * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
     * into another container (could be the same container), before `before`. If
     * `before` is null, it appends the nodes to the container.
     */
    const reparentNodes = (container, start, end = null, before = null) => {
        while (start !== end) {
            const n = start.nextSibling;
            container.insertBefore(start, before);
            start = n;
        }
    };
    /**
     * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
     * `container`.
     */
    const removeNodes = (container, start, end = null) => {
        while (start !== end) {
            const n = start.nextSibling;
            container.removeChild(start);
            start = n;
        }
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
     * A sentinel value that signals a NodePart to fully clear its content.
     */
    const nothing = {};

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
     * An expression marker used text-positions, multi-binding attributes, and
     * attributes with markup-like text values.
     */
    const nodeMarker = `<!--${marker}-->`;
    const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
    /**
     * Suffix appended to all bound attribute names.
     */
    const boundAttributeSuffix = '$lit$';
    /**
     * An updatable Template that tracks the location of dynamic parts.
     */
    class Template {
        constructor(result, element) {
            this.parts = [];
            this.element = element;
            const nodesToRemove = [];
            const stack = [];
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            // Keeps track of the last index associated with a part. We try to delete
            // unnecessary nodes, but we never want to associate two different parts
            // to the same index. They must have a constant node between.
            let lastPartIndex = 0;
            let index = -1;
            let partIndex = 0;
            const { strings, values: { length } } = result;
            while (partIndex < length) {
                const node = walker.nextNode();
                if (node === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    continue;
                }
                index++;
                if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        const attributes = node.attributes;
                        const { length } = attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondence between part index and attribute index.
                        let count = 0;
                        for (let i = 0; i < length; i++) {
                            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            const stringForPart = strings[partIndex];
                            // Find the attribute name
                            const name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            const attributeValue = node.getAttribute(attributeLookupName);
                            node.removeAttribute(attributeLookupName);
                            const statics = attributeValue.split(markerRegex);
                            this.parts.push({ type: 'attribute', index, name, strings: statics });
                            partIndex += statics.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                }
                else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    const data = node.data;
                    if (data.indexOf(marker) >= 0) {
                        const parent = node.parentNode;
                        const strings = data.split(markerRegex);
                        const lastIndex = strings.length - 1;
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        for (let i = 0; i < lastIndex; i++) {
                            let insert;
                            let s = strings[i];
                            if (s === '') {
                                insert = createMarker();
                            }
                            else {
                                const match = lastAttributeNameRegex.exec(s);
                                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                    s = s.slice(0, match.index) + match[1] +
                                        match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                                }
                                insert = document.createTextNode(s);
                            }
                            parent.insertBefore(insert, node);
                            this.parts.push({ type: 'node', index: ++index });
                        }
                        // If there's no text, we must insert a comment to mark our place.
                        // Else, we can trust it will stick around after cloning.
                        if (strings[lastIndex] === '') {
                            parent.insertBefore(createMarker(), node);
                            nodesToRemove.push(node);
                        }
                        else {
                            node.data = strings[lastIndex];
                        }
                        // We have a part for each match found
                        partIndex += lastIndex;
                    }
                }
                else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.data === marker) {
                        const parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * The previousSibling is already the start of a previous part
                        if (node.previousSibling === null || index === lastPartIndex) {
                            index++;
                            parent.insertBefore(createMarker(), node);
                        }
                        lastPartIndex = index;
                        this.parts.push({ type: 'node', index });
                        // If we don't have a nextSibling, keep this node so we have an end.
                        // Else, we can remove it to save future costs.
                        if (node.nextSibling === null) {
                            node.data = '';
                        }
                        else {
                            nodesToRemove.push(node);
                            index--;
                        }
                        partIndex++;
                    }
                    else {
                        let i = -1;
                        while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            this.parts.push({ type: 'node', index: -1 });
                            partIndex++;
                        }
                    }
                }
            }
            // Remove text binding nodes after the walk to not disturb the TreeWalker
            for (const n of nodesToRemove) {
                n.parentNode.removeChild(n);
            }
        }
    }
    const endsWith = (str, suffix) => {
        const index = str.length - suffix.length;
        return index >= 0 && str.slice(index) === suffix;
    };
    const isTemplatePartActive = (part) => part.index !== -1;
    // Allows `document.createComment('')` to be renamed for a
    // small manual size-savings.
    const createMarker = () => document.createComment('');
    /**
     * This regex extracts the attribute name preceding an attribute-position
     * expression. It does this by matching the syntax allowed for attributes
     * against the string literal directly preceding the expression, assuming that
     * the expression is in an attribute-value position.
     *
     * See attributes in the HTML spec:
     * https://www.w3.org/TR/html5/syntax.html#elements-attributes
     *
     * " \x09\x0a\x0c\x0d" are HTML space characters:
     * https://www.w3.org/TR/html5/infrastructure.html#space-characters
     *
     * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
     * space character except " ".
     *
     * So an attribute is:
     *  * The name: any character except a control character, space character, ('),
     *    ("), ">", "=", or "/"
     *  * Followed by zero or more space characters
     *  * Followed by "="
     *  * Followed by zero or more space characters
     *  * Followed by:
     *    * Any character except space, ('), ("), "<", ">", "=", (`), or
     *    * (") then any non-("), or
     *    * (') then any non-(')
     */
    const lastAttributeNameRegex = 
    // eslint-disable-next-line no-control-regex
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

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
     * An instance of a `Template` that can be attached to the DOM and updated
     * with new values.
     */
    class TemplateInstance {
        constructor(template, processor, options) {
            this.__parts = [];
            this.template = template;
            this.processor = processor;
            this.options = options;
        }
        update(values) {
            let i = 0;
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.setValue(values[i]);
                }
                i++;
            }
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.commit();
                }
            }
        }
        _clone() {
            // There are a number of steps in the lifecycle of a template instance's
            // DOM fragment:
            //  1. Clone - create the instance fragment
            //  2. Adopt - adopt into the main document
            //  3. Process - find part markers and create parts
            //  4. Upgrade - upgrade custom elements
            //  5. Update - set node, attribute, property, etc., values
            //  6. Connect - connect to the document. Optional and outside of this
            //     method.
            //
            // We have a few constraints on the ordering of these steps:
            //  * We need to upgrade before updating, so that property values will pass
            //    through any property setters.
            //  * We would like to process before upgrading so that we're sure that the
            //    cloned fragment is inert and not disturbed by self-modifying DOM.
            //  * We want custom elements to upgrade even in disconnected fragments.
            //
            // Given these constraints, with full custom elements support we would
            // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
            //
            // But Safari does not implement CustomElementRegistry#upgrade, so we
            // can not implement that order and still have upgrade-before-update and
            // upgrade disconnected fragments. So we instead sacrifice the
            // process-before-upgrade constraint, since in Custom Elements v1 elements
            // must not modify their light DOM in the constructor. We still have issues
            // when co-existing with CEv0 elements like Polymer 1, and with polyfills
            // that don't strictly adhere to the no-modification rule because shadow
            // DOM, which may be created in the constructor, is emulated by being placed
            // in the light DOM.
            //
            // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
            // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
            // in one step.
            //
            // The Custom Elements v1 polyfill supports upgrade(), so the order when
            // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
            // Connect.
            const fragment = isCEPolyfill ?
                this.template.element.content.cloneNode(true) :
                document.importNode(this.template.element.content, true);
            const stack = [];
            const parts = this.template.parts;
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            let partIndex = 0;
            let nodeIndex = 0;
            let part;
            let node = walker.nextNode();
            // Loop through all the nodes and parts of a template
            while (partIndex < parts.length) {
                part = parts[partIndex];
                if (!isTemplatePartActive(part)) {
                    this.__parts.push(undefined);
                    partIndex++;
                    continue;
                }
                // Progress the tree walker until we find our next part's node.
                // Note that multiple parts may share the same node (attribute parts
                // on a single element), so this loop may not run at all.
                while (nodeIndex < part.index) {
                    nodeIndex++;
                    if (node.nodeName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                    if ((node = walker.nextNode()) === null) {
                        // We've exhausted the content inside a nested template element.
                        // Because we still have parts (the outer for-loop), we know:
                        // - There is a template in the stack
                        // - The walker will find a nextNode outside the template
                        walker.currentNode = stack.pop();
                        node = walker.nextNode();
                    }
                }
                // We've arrived at our part's node.
                if (part.type === 'node') {
                    const part = this.processor.handleTextExpression(this.options);
                    part.insertAfterNode(node.previousSibling);
                    this.__parts.push(part);
                }
                else {
                    this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                }
                partIndex++;
            }
            if (isCEPolyfill) {
                document.adoptNode(fragment);
                customElements.upgrade(fragment);
            }
            return fragment;
        }
    }

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
    const commentMarker = ` ${marker} `;
    /**
     * The return type of `html`, which holds a Template and the values from
     * interpolated expressions.
     */
    class TemplateResult {
        constructor(strings, values, type, processor) {
            this.strings = strings;
            this.values = values;
            this.type = type;
            this.processor = processor;
        }
        /**
         * Returns a string of HTML used to create a `<template>` element.
         */
        getHTML() {
            const l = this.strings.length - 1;
            let html = '';
            let isCommentBinding = false;
            for (let i = 0; i < l; i++) {
                const s = this.strings[i];
                // For each binding we want to determine the kind of marker to insert
                // into the template source before it's parsed by the browser's HTML
                // parser. The marker type is based on whether the expression is in an
                // attribute, text, or comment position.
                //   * For node-position bindings we insert a comment with the marker
                //     sentinel as its text content, like <!--{{lit-guid}}-->.
                //   * For attribute bindings we insert just the marker sentinel for the
                //     first binding, so that we support unquoted attribute bindings.
                //     Subsequent bindings can use a comment marker because multi-binding
                //     attributes must be quoted.
                //   * For comment bindings we insert just the marker sentinel so we don't
                //     close the comment.
                //
                // The following code scans the template source, but is *not* an HTML
                // parser. We don't need to track the tree structure of the HTML, only
                // whether a binding is inside a comment, and if not, if it appears to be
                // the first binding in an attribute.
                const commentOpen = s.lastIndexOf('<!--');
                // We're in comment position if we have a comment open with no following
                // comment close. Because <-- can appear in an attribute value there can
                // be false positives.
                isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                    s.indexOf('-->', commentOpen + 1) === -1;
                // Check to see if we have an attribute-like sequence preceding the
                // expression. This can match "name=value" like structures in text,
                // comments, and attribute values, so there can be false-positives.
                const attributeMatch = lastAttributeNameRegex.exec(s);
                if (attributeMatch === null) {
                    // We're only in this branch if we don't have a attribute-like
                    // preceding sequence. For comments, this guards against unusual
                    // attribute values like <div foo="<!--${'bar'}">. Cases like
                    // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                    // below.
                    html += s + (isCommentBinding ? commentMarker : nodeMarker);
                }
                else {
                    // For attributes we use just a marker sentinel, and also append a
                    // $lit$ suffix to the name to opt-out of attribute-specific parsing
                    // that IE and Edge do for style and certain SVG attributes.
                    html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                        attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                        marker;
                }
            }
            html += this.strings[l];
            return html;
        }
        getTemplateElement() {
            const template = document.createElement('template');
            template.innerHTML = this.getHTML();
            return template;
        }
    }
    /**
     * A TemplateResult for SVG fragments.
     *
     * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
     * SVG namespace, then modifies the template to remove the `<svg>` tag so that
     * clones only container the original fragment.
     */
    class SVGTemplateResult extends TemplateResult {
        getHTML() {
            return `<svg>${super.getHTML()}</svg>`;
        }
        getTemplateElement() {
            const template = super.getTemplateElement();
            const content = template.content;
            const svgElement = content.firstChild;
            content.removeChild(svgElement);
            reparentNodes(content, svgElement.firstChild);
            return template;
        }
    }

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
    const isIterable = (value) => {
        return Array.isArray(value) ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !!(value && value[Symbol.iterator]);
    };
    /**
     * Writes attribute values to the DOM for a group of AttributeParts bound to a
     * single attribute. The value is only set once even if there are multiple parts
     * for an attribute.
     */
    class AttributeCommitter {
        constructor(element, name, strings) {
            this.dirty = true;
            this.element = element;
            this.name = name;
            this.strings = strings;
            this.parts = [];
            for (let i = 0; i < strings.length - 1; i++) {
                this.parts[i] = this._createPart();
            }
        }
        /**
         * Creates a single part. Override this to create a differnt type of part.
         */
        _createPart() {
            return new AttributePart(this);
        }
        _getValue() {
            const strings = this.strings;
            const l = strings.length - 1;
            let text = '';
            for (let i = 0; i < l; i++) {
                text += strings[i];
                const part = this.parts[i];
                if (part !== undefined) {
                    const v = part.value;
                    if (isPrimitive(v) || !isIterable(v)) {
                        text += typeof v === 'string' ? v : String(v);
                    }
                    else {
                        for (const t of v) {
                            text += typeof t === 'string' ? t : String(t);
                        }
                    }
                }
            }
            text += strings[l];
            return text;
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                this.element.setAttribute(this.name, this._getValue());
            }
        }
    }
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
    /**
     * A Part that controls a location within a Node tree. Like a Range, NodePart
     * has start and end locations and can set and update the Nodes between those
     * locations.
     *
     * NodeParts support several value types: primitives, Nodes, TemplateResults,
     * as well as arrays and iterables of those types.
     */
    class NodePart {
        constructor(options) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.options = options;
        }
        /**
         * Appends this part into a container.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendInto(container) {
            this.startNode = container.appendChild(createMarker());
            this.endNode = container.appendChild(createMarker());
        }
        /**
         * Inserts this part after the `ref` node (between `ref` and `ref`'s next
         * sibling). Both `ref` and its next sibling must be static, unchanging nodes
         * such as those that appear in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterNode(ref) {
            this.startNode = ref;
            this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendIntoPart(part) {
            part.__insert(this.startNode = createMarker());
            part.__insert(this.endNode = createMarker());
        }
        /**
         * Inserts this part after the `ref` part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterPart(ref) {
            ref.__insert(this.startNode = createMarker());
            this.endNode = ref.endNode;
            ref.endNode = this.startNode;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            if (this.startNode.parentNode === null) {
                return;
            }
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            const value = this.__pendingValue;
            if (value === noChange) {
                return;
            }
            if (isPrimitive(value)) {
                if (value !== this.value) {
                    this.__commitText(value);
                }
            }
            else if (value instanceof TemplateResult) {
                this.__commitTemplateResult(value);
            }
            else if (value instanceof Node) {
                this.__commitNode(value);
            }
            else if (isIterable(value)) {
                this.__commitIterable(value);
            }
            else if (value === nothing) {
                this.value = nothing;
                this.clear();
            }
            else {
                // Fallback, will render the string representation
                this.__commitText(value);
            }
        }
        __insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
        }
        __commitNode(value) {
            if (this.value === value) {
                return;
            }
            this.clear();
            this.__insert(value);
            this.value = value;
        }
        __commitText(value) {
            const node = this.startNode.nextSibling;
            value = value == null ? '' : value;
            // If `value` isn't already a string, we explicitly convert it here in case
            // it can't be implicitly converted - i.e. it's a symbol.
            const valueAsString = typeof value === 'string' ? value : String(value);
            if (node === this.endNode.previousSibling &&
                node.nodeType === 3 /* Node.TEXT_NODE */) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if this.value is primitive?
                node.data = valueAsString;
            }
            else {
                this.__commitNode(document.createTextNode(valueAsString));
            }
            this.value = value;
        }
        __commitTemplateResult(value) {
            const template = this.options.templateFactory(value);
            if (this.value instanceof TemplateInstance &&
                this.value.template === template) {
                this.value.update(value.values);
            }
            else {
                // Make sure we propagate the template processor from the TemplateResult
                // so that we use its syntax extension, etc. The template factory comes
                // from the render function options so that it can control template
                // caching and preprocessing.
                const instance = new TemplateInstance(template, value.processor, this.options);
                const fragment = instance._clone();
                instance.update(value.values);
                this.__commitNode(fragment);
                this.value = instance;
            }
        }
        __commitIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _value is an array, then the previous render was of an
            // iterable and _value will contain the NodeParts from the previous
            // render. If _value is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this.value)) {
                this.value = [];
                this.clear();
            }
            // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render
            const itemParts = this.value;
            let partIndex = 0;
            let itemPart;
            for (const item of value) {
                // Try to reuse an existing part
                itemPart = itemParts[partIndex];
                // If no existing part, create a new one
                if (itemPart === undefined) {
                    itemPart = new NodePart(this.options);
                    itemParts.push(itemPart);
                    if (partIndex === 0) {
                        itemPart.appendIntoPart(this);
                    }
                    else {
                        itemPart.insertAfterPart(itemParts[partIndex - 1]);
                    }
                }
                itemPart.setValue(item);
                itemPart.commit();
                partIndex++;
            }
            if (partIndex < itemParts.length) {
                // Truncate the parts array so _value reflects the current state
                itemParts.length = partIndex;
                this.clear(itemPart && itemPart.endNode);
            }
        }
        clear(startNode = this.startNode) {
            removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
    }
    /**
     * Implements a boolean attribute, roughly as defined in the HTML
     * specification.
     *
     * If the value is truthy, then the attribute is present with a value of
     * ''. If the value is falsey, the attribute is removed.
     */
    class BooleanAttributePart {
        constructor(element, name, strings) {
            this.value = undefined;
            this.__pendingValue = undefined;
            if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
                throw new Error('Boolean attributes can only contain a single expression');
            }
            this.element = element;
            this.name = name;
            this.strings = strings;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const value = !!this.__pendingValue;
            if (this.value !== value) {
                if (value) {
                    this.element.setAttribute(this.name, '');
                }
                else {
                    this.element.removeAttribute(this.name);
                }
                this.value = value;
            }
            this.__pendingValue = noChange;
        }
    }
    /**
     * Sets attribute values for PropertyParts, so that the value is only set once
     * even if there are multiple parts for a property.
     *
     * If an expression controls the whole property value, then the value is simply
     * assigned to the property under control. If there are string literals or
     * multiple expressions, then the strings are expressions are interpolated into
     * a string first.
     */
    class PropertyCommitter extends AttributeCommitter {
        constructor(element, name, strings) {
            super(element, name, strings);
            this.single =
                (strings.length === 2 && strings[0] === '' && strings[1] === '');
        }
        _createPart() {
            return new PropertyPart(this);
        }
        _getValue() {
            if (this.single) {
                return this.parts[0].value;
            }
            return super._getValue();
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.element[this.name] = this._getValue();
            }
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
    class EventPart {
        constructor(element, eventName, eventContext) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.element = element;
            this.eventName = eventName;
            this.eventContext = eventContext;
            this.__boundHandleEvent = (e) => this.handleEvent(e);
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const newListener = this.__pendingValue;
            const oldListener = this.value;
            const shouldRemoveListener = newListener == null ||
                oldListener != null &&
                    (newListener.capture !== oldListener.capture ||
                        newListener.once !== oldListener.once ||
                        newListener.passive !== oldListener.passive);
            const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
            if (shouldRemoveListener) {
                this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            if (shouldAddListener) {
                this.__options = getOptions(newListener);
                this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            this.value = newListener;
            this.__pendingValue = noChange;
        }
        handleEvent(event) {
            if (typeof this.value === 'function') {
                this.value.call(this.eventContext || this.element, event);
            }
            else {
                this.value.handleEvent(event);
            }
        }
    }
    // We copy options because of the inconsistent behavior of browsers when reading
    // the third argument of add/removeEventListener. IE11 doesn't support options
    // at all. Chrome 41 only reads `capture` if the argument is an object.
    const getOptions = (o) => o &&
        (eventOptionsSupported ?
            { capture: o.capture, passive: o.passive, once: o.once } :
            o.capture);

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
     * Creates Parts when a template is instantiated.
     */
    class DefaultTemplateProcessor {
        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        handleAttributeExpressions(element, name, strings, options) {
            const prefix = name[0];
            if (prefix === '.') {
                const committer = new PropertyCommitter(element, name.slice(1), strings);
                return committer.parts;
            }
            if (prefix === '@') {
                return [new EventPart(element, name.slice(1), options.eventContext)];
            }
            if (prefix === '?') {
                return [new BooleanAttributePart(element, name.slice(1), strings)];
            }
            const committer = new AttributeCommitter(element, name, strings);
            return committer.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */
        handleTextExpression(options) {
            return new NodePart(options);
        }
    }
    const defaultTemplateProcessor = new DefaultTemplateProcessor();

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
     * The default TemplateFactory which caches Templates keyed on
     * result.type and result.strings.
     */
    function templateFactory(result) {
        let templateCache = templateCaches.get(result.type);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(result.type, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        // If the TemplateStringsArray is new, generate a key from the strings
        // This key is shared between all templates with identical content
        const key = result.strings.join(marker);
        // Check if we already have a Template for this key
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            // If we have not seen this key before, create a new Template
            template = new Template(result, result.getTemplateElement());
            // Cache the Template for this key
            templateCache.keyString.set(key, template);
        }
        // Cache all future queries for this TemplateStringsArray
        templateCache.stringsArray.set(result.strings, template);
        return template;
    }
    const templateCaches = new Map();

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
    const parts = new WeakMap();
    /**
     * Renders a template result or other value to a container.
     *
     * To update a container with new values, reevaluate the template literal and
     * call `render` with the new result.
     *
     * @param result Any value renderable by NodePart - typically a TemplateResult
     *     created by evaluating a template tag like `html` or `svg`.
     * @param container A DOM parent to render to. The entire contents are either
     *     replaced, or efficiently updated if the same result type was previous
     *     rendered there.
     * @param options RenderOptions for the entire render tree rendered to this
     *     container. Render options must *not* change between renders to the same
     *     container, as those changes will not effect previously rendered DOM.
     */
    const render = (result, container, options) => {
        let part = parts.get(container);
        if (part === undefined) {
            removeNodes(container, container.firstChild);
            parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
            part.appendInto(container);
        }
        part.setValue(result);
        part.commit();
    };

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
     * Interprets a template literal as an HTML template that can efficiently
     * render to and update a container.
     */
    const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
    /**
     * Interprets a template literal as an SVG template that can efficiently
     * render to and update a container.
     */
    const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);

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
    const once = directive((fn) => (part) => {
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

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var camelToDashMap = new Map();
    function camelToDash(str) {
      var result = camelToDashMap.get(str);

      if (result === undefined) {
        result = str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        camelToDashMap.set(str, result);
      }

      return result;
    }
    function pascalToDash(str) {
      return camelToDash(str.replace(/((?!([A-Z]{2}|^))[A-Z])/g, "-$1"));
    }
    function dispatch(host, eventType) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return host.dispatchEvent(new CustomEvent(eventType, _objectSpread({
        bubbles: false
      }, options)));
    }
    function shadyCSS(fn, fallback) {
      var shady = window.ShadyCSS;
      /* istanbul ignore next */

      if (shady && !shady.nativeShadow) {
        return fn(shady);
      }

      return fallback;
    }
    function stringifyElement(target) {
      return "<".concat(String(target.tagName).toLowerCase(), ">");
    }
    var IS_IE = ("ActiveXObject" in window);

    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

    var defaultTransform = function defaultTransform(v) {
      return v;
    };

    var objectTransform = function objectTransform(value) {
      if (_typeof(value) !== "object") {
        throw TypeError("Assigned value must be an object: ".concat(_typeof(value)));
      }

      return value && Object.freeze(value);
    };

    function property(value, connect) {
      var type = _typeof(value);

      var transform = defaultTransform;

      switch (type) {
        case "string":
          transform = String;
          break;

        case "number":
          transform = Number;
          break;

        case "boolean":
          transform = Boolean;
          break;

        case "function":
          transform = value;
          value = transform();
          break;

        case "object":
          if (value) Object.freeze(value);
          transform = objectTransform;
          break;
      }

      return {
        get: function get(host) {
          var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value;
          return val;
        },
        set: function set(host, val, oldValue) {
          return transform(val, oldValue);
        },
        connect: type !== "object" && type !== "undefined" ? function (host, key, invalidate) {
          if (host[key] === value) {
            var attrName = camelToDash(key);

            if (host.hasAttribute(attrName)) {
              var attrValue = host.getAttribute(attrName);
              host[key] = attrValue === "" && transform === Boolean ? true : attrValue;
            }
          }

          return connect && connect(host, key, invalidate);
        } : connect
      };
    }

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

    function render$1(fn) {
      var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof fn !== "function") {
        throw TypeError("The first argument must be a function: ".concat(_typeof$1(fn)));
      }

      var options = _objectSpread$1({
        shadowRoot: true
      }, customOptions);

      var shadowRootInit = {
        mode: "open"
      };

      if (_typeof$1(options.shadowRoot) === "object") {
        Object.assign(shadowRootInit, options.shadowRoot);
      }

      return {
        get: function get(host) {
          var update = fn(host);
          var target = host;

          if (options.shadowRoot) {
            if (!host.shadowRoot) host.attachShadow(shadowRootInit);
            target = host.shadowRoot;
          }

          return function flush() {
            update(host, target);
            return target;
          };
        },
        observe: function observe(host, flush) {
          flush();
        }
      };
    }

    var callbacks = new WeakMap();
    var queue = new Set();

    function execute() {
      try {
        queue.forEach(function (target) {
          try {
            callbacks.get(target)();
            queue.delete(target);
          } catch (e) {
            queue.delete(target);
            throw e;
          }
        });
      } catch (e) {
        if (queue.size) execute();
        throw e;
      }
    }

    function dispatch$1(target) {
      if (!queue.size) {
        requestAnimationFrame(execute);
      }

      queue.add(target);
    }
    function subscribe(target, cb) {
      callbacks.set(target, cb);
      dispatch$1(target);
      return function unsubscribe() {
        queue.delete(target);
        callbacks.delete(target);
      };
    }

    var entries = new WeakMap();
    function getEntry(target, key) {
      var targetMap = entries.get(target);

      if (!targetMap) {
        targetMap = new Map();
        entries.set(target, targetMap);
      }

      var entry = targetMap.get(key);

      if (!entry) {
        entry = {
          target: target,
          key: key,
          value: undefined,
          contexts: undefined,
          deps: undefined,
          state: 0,
          checksum: 0,
          observed: false
        };
        targetMap.set(key, entry);
      }

      return entry;
    }

    function calculateChecksum(entry) {
      var checksum = entry.state;

      if (entry.deps) {
        entry.deps.forEach(function (depEntry) {
          checksum += depEntry.state;
        });
      }

      return checksum;
    }

    function dispatchDeep(entry) {
      if (entry.observed) dispatch$1(entry);
      if (entry.contexts) entry.contexts.forEach(dispatchDeep);
    }

    function restoreDeepDeps(entry, deps) {
      if (deps) {
        deps.forEach(function (depEntry) {
          entry.deps.add(depEntry);

          if (entry.observed) {
            /* istanbul ignore if */
            if (!depEntry.contexts) depEntry.contexts = new Set();
            depEntry.contexts.add(entry);
          }

          restoreDeepDeps(entry, depEntry.deps);
        });
      }
    }

    var contextStack = new Set();
    function get(target, key, getter) {
      var entry = getEntry(target, key);

      if (contextStack.size && contextStack.has(entry)) {
        throw Error("Circular get invocation is forbidden: '".concat(key, "'"));
      }

      contextStack.forEach(function (context) {
        if (!context.deps) context.deps = new Set();
        context.deps.add(entry);

        if (context.observed) {
          if (!entry.contexts) entry.contexts = new Set();
          entry.contexts.add(context);
        }
      });

      if (entry.checksum && entry.checksum === calculateChecksum(entry)) {
        return entry.value;
      }

      try {
        contextStack.add(entry);

        if (entry.observed && entry.deps && entry.deps.size) {
          entry.deps.forEach(function (depEntry) {
            /* istanbul ignore else */
            if (depEntry.contexts) depEntry.contexts.delete(entry);
          });
        }

        entry.deps = undefined;
        var nextValue = getter(target, entry.value);

        if (entry.deps) {
          entry.deps.forEach(function (depEntry) {
            restoreDeepDeps(entry, depEntry.deps);
          });
        }

        if (nextValue !== entry.value) {
          entry.state += 1;
          entry.value = nextValue;
          dispatchDeep(entry);
        }

        entry.checksum = calculateChecksum(entry);
        contextStack.delete(entry);
      } catch (e) {
        entry.checksum = 0;
        contextStack.delete(entry);
        contextStack.forEach(function (context) {
          context.deps.delete(entry);
          if (context.observed) entry.contexts.delete(context);
        });
        throw e;
      }

      return entry.value;
    }
    function set(target, key, setter, value, force) {
      if (contextStack.size && !force) {
        throw Error("Setting property in chain of get calls is forbidden: '".concat(key, "'"));
      }

      var entry = getEntry(target, key);
      var newValue = setter(target, value, entry.value);

      if (newValue !== entry.value) {
        entry.checksum = 0;
        entry.state += 1;
        entry.value = newValue;
        dispatchDeep(entry);
      }
    }
    function invalidate(target, key, clearValue) {
      if (contextStack.size) {
        throw Error("Invalidating property in chain of get calls is forbidden: '".concat(key, "'"));
      }

      var entry = getEntry(target, key);
      entry.checksum = 0;
      entry.state += 1;
      dispatchDeep(entry);

      if (clearValue) {
        entry.value = undefined;
      }
    }
    function observe(target, key, getter, fn) {
      var entry = getEntry(target, key);
      entry.observed = true;
      var lastValue;
      var unsubscribe = subscribe(entry, function () {
        var value = get(target, key, getter);

        if (value !== lastValue) {
          fn(target, value, lastValue);
          lastValue = value;
        }
      });

      if (entry.deps) {
        entry.deps.forEach(function (depEntry) {
          /* istanbul ignore else */
          if (!depEntry.contexts) depEntry.contexts = new Set();
          depEntry.contexts.add(entry);
        });
      }

      return function unobserve() {
        unsubscribe();
        entry.observed = false;

        if (entry.deps && entry.deps.size) {
          entry.deps.forEach(function (depEntry) {
            /* istanbul ignore else */
            if (depEntry.contexts) depEntry.contexts.delete(entry);
          });
        }
      };
    }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

    function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _possibleConstructorReturn(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

    function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

    function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

    function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

    function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
    /* istanbul ignore next */

    try {
      process$1.env.NODE_ENV;
    } catch (e) {
      var process$1 = {
        env: {
          NODE_ENV: 'production'
        }
      };
    } // eslint-disable-line


    var defaultMethod = function defaultMethod(host, value) {
      return value;
    };

    function compile(Hybrid, descriptors) {
      Hybrid.hybrids = descriptors;
      Hybrid.callbacks = [];
      Object.keys(descriptors).forEach(function (key) {
        var desc = descriptors[key];

        var type = _typeof$2(desc);

        var config;

        if (type === "function") {
          config = key === "render" ? render$1(desc) : {
            get: desc
          };
        } else if (type !== "object" || desc === null || Array.isArray(desc)) {
          config = property(desc);
        } else {
          config = {
            get: desc.get || defaultMethod,
            set: desc.set || !desc.get && defaultMethod || undefined,
            connect: desc.connect,
            observe: desc.observe
          };
        }

        Object.defineProperty(Hybrid.prototype, key, {
          get: function get$1() {
            return get(this, key, config.get);
          },
          set: config.set && function set$1(newValue) {
            set(this, key, config.set, newValue);
          },
          enumerable: true,
          configurable: process$1.env.NODE_ENV !== "production"
        });

        if (config.observe) {
          Hybrid.callbacks.unshift(function (host) {
            return observe(host, key, config.get, config.observe);
          });
        }

        if (config.connect) {
          Hybrid.callbacks.push(function (host) {
            return config.connect(host, key, function () {
              invalidate(host, key);
            });
          });
        }
      });
    }

    var disconnects = new WeakMap();

    function defineElement(tagName, hybridsOrConstructor) {
      var type = _typeof$2(hybridsOrConstructor);

      if (type !== "object" && type !== "function") {
        throw TypeError("Second argument must be an object or a function: ".concat(type));
      }

      var CustomElement = window.customElements.get(tagName);

      if (type === "function") {
        if (CustomElement !== hybridsOrConstructor) {
          return window.customElements.define(tagName, hybridsOrConstructor);
        }

        return CustomElement;
      }

      if (CustomElement) {
        if (CustomElement.hybrids === hybridsOrConstructor) {
          return CustomElement;
        }

        throw Error("Element '".concat(tagName, "' already defined"));
      }

      var Hybrid = /*#__PURE__*/function (_HTMLElement) {
        _inherits(Hybrid, _HTMLElement);

        var _super = _createSuper(Hybrid);

        function Hybrid() {
          _classCallCheck(this, Hybrid);

          return _super.apply(this, arguments);
        }

        _createClass(Hybrid, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var callbacks = this.constructor.callbacks;
            var list = [];

            for (var index = 0; index < callbacks.length; index += 1) {
              var cb = callbacks[index](this);
              if (cb) list.push(cb);
            }

            disconnects.set(this, list);
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            var list = disconnects.get(this);

            for (var index = 0; index < list.length; index += 1) {
              list[index]();
            }
          }
        }], [{
          key: "name",
          get: function get() {
            return tagName;
          }
        }]);

        return Hybrid;
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

      compile(Hybrid, hybridsOrConstructor);
      customElements.define(tagName, Hybrid);
      return Hybrid;
    }

    function defineMap(elements) {
      return Object.keys(elements).reduce(function (acc, key) {
        var tagName = pascalToDash(key);
        acc[key] = defineElement(tagName, elements[key]);
        return acc;
      }, {});
    }

    function define() {
      if (_typeof$2(arguments.length <= 0 ? undefined : arguments[0]) === "object") {
        return defineMap(arguments.length <= 0 ? undefined : arguments[0]);
      }

      return defineElement.apply(void 0, arguments);
    }

    function walk(node, fn, options) {
      var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      Array.from(node.children).forEach(function (child) {
        var hybrids = child.constructor.hybrids;

        if (hybrids && fn(hybrids)) {
          items.push(child);

          if (options.deep && options.nested) {
            walk(child, fn, options, items);
          }
        } else if (options.deep) {
          walk(child, fn, options, items);
        }
      });
      return items;
    }

    function children(hybridsOrFn) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        deep: false,
        nested: false
      };
      var fn = typeof hybridsOrFn === "function" ? hybridsOrFn : function (hybrids) {
        return hybrids === hybridsOrFn;
      };
      return {
        get: function get(host) {
          return walk(host, fn, options);
        },
        connect: function connect(host, key, invalidate) {
          var observer = new MutationObserver(invalidate);
          observer.observe(host, {
            childList: true,
            subtree: !!options.deep
          });
          return function () {
            observer.disconnect();
          };
        }
      };
    }

    var map = new WeakMap();
    var dataMap = {
      get: function get(key, defaultValue) {
        var value = map.get(key);
        if (value) return value;

        if (defaultValue) {
          map.set(key, defaultValue);
        }

        return defaultValue;
      },
      set: function set(key, value) {
        map.set(key, value);
        return value;
      }
    };
    function getTemplateEnd(node) {
      var data; // eslint-disable-next-line no-cond-assign

      while (node && (data = dataMap.get(node)) && data.endNode) {
        node = data.endNode;
      }

      return node;
    }
    function removeTemplate(target) {
      if (target.nodeType !== Node.TEXT_NODE) {
        var child = target.childNodes[0];

        while (child) {
          target.removeChild(child);
          child = target.childNodes[0];
        }
      } else {
        var data = dataMap.get(target);

        if (data.startNode) {
          var endNode = getTemplateEnd(data.endNode);
          var node = data.startNode;
          var lastNextSibling = endNode.nextSibling;

          while (node) {
            var nextSibling = node.nextSibling;
            node.parentNode.removeChild(node);
            node = nextSibling !== lastNextSibling && nextSibling;
          }
        }
      }
    }

    var arrayMap = new WeakMap();

    function movePlaceholder(target, previousSibling) {
      var data = dataMap.get(target);
      var startNode = data.startNode;
      var endNode = getTemplateEnd(data.endNode);
      previousSibling.parentNode.insertBefore(target, previousSibling.nextSibling);
      var prevNode = target;
      var node = startNode;

      while (node) {
        var nextNode = node.nextSibling;
        prevNode.parentNode.insertBefore(node, prevNode.nextSibling);
        prevNode = node;
        node = nextNode !== endNode.nextSibling && nextNode;
      }
    }

    function resolveArray(host, target, value, resolveValue) {
      var lastEntries = arrayMap.get(target);
      var entries = value.map(function (item, index) {
        return {
          id: Object.prototype.hasOwnProperty.call(item, "id") ? item.id : index,
          value: item,
          placeholder: null,
          available: true
        };
      });
      arrayMap.set(target, entries);

      if (lastEntries) {
        var ids = new Set();
        entries.forEach(function (entry) {
          return ids.add(entry.id);
        });
        lastEntries = lastEntries.filter(function (entry) {
          if (!ids.has(entry.id)) {
            removeTemplate(entry.placeholder);
            entry.placeholder.parentNode.removeChild(entry.placeholder);
            return false;
          }

          return true;
        });
      }

      var previousSibling = target;
      var lastIndex = value.length - 1;
      var data = dataMap.get(target);

      for (var index = 0; index < entries.length; index += 1) {
        var entry = entries[index];
        var matchedEntry = void 0;

        if (lastEntries) {
          for (var i = 0; i < lastEntries.length; i += 1) {
            if (lastEntries[i].available && lastEntries[i].id === entry.id) {
              matchedEntry = lastEntries[i];
              break;
            }
          }
        }

        var placeholder = void 0;

        if (matchedEntry) {
          matchedEntry.available = false;
          placeholder = matchedEntry.placeholder;

          if (placeholder.previousSibling !== previousSibling) {
            movePlaceholder(placeholder, previousSibling);
          }

          if (matchedEntry.value !== entry.value) {
            resolveValue(host, placeholder, entry.value);
          }
        } else {
          placeholder = document.createTextNode("");
          previousSibling.parentNode.insertBefore(placeholder, previousSibling.nextSibling);
          resolveValue(host, placeholder, entry.value);
        }

        previousSibling = getTemplateEnd(dataMap.get(placeholder).endNode || placeholder);
        if (index === 0) data.startNode = placeholder;
        if (index === lastIndex) data.endNode = previousSibling;
        entry.placeholder = placeholder;
      }

      if (lastEntries) {
        lastEntries.forEach(function (entry) {
          if (entry.available) {
            removeTemplate(entry.placeholder);
            entry.placeholder.parentNode.removeChild(entry.placeholder);
          }
        });
      }
    }

    function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
    function resolveValue(host, target, value) {
      var type = Array.isArray(value) ? "array" : _typeof$3(value);
      var data = dataMap.get(target, {});

      if (data.type !== type) {
        removeTemplate(target);
        if (type === "array") arrayMap.delete(target);
        data = dataMap.set(target, {
          type: type
        });

        if (target.textContent !== "") {
          target.textContent = "";
        }
      }

      switch (type) {
        case "function":
          value(host, target);
          break;

        case "array":
          resolveArray(host, target, value, resolveValue);
          break;

        default:
          target.textContent = type === "number" || value ? value : "";
      }
    }

    function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

    var targets = new WeakMap();
    function resolveEventListener(eventType) {
      return function (host, target, value, lastValue) {
        if (lastValue) {
          var eventMap = targets.get(target);

          if (eventMap) {
            target.removeEventListener(eventType, eventMap.get(lastValue), lastValue.options !== undefined ? lastValue.options : false);
          }
        }

        if (value) {
          if (typeof value !== "function") {
            throw Error("Event listener must be a function: ".concat(_typeof$4(value)));
          }

          var _eventMap = targets.get(target);

          if (!_eventMap) {
            _eventMap = new WeakMap();
            targets.set(target, _eventMap);
          }

          var callback = value.bind(null, host);

          _eventMap.set(value, callback);

          target.addEventListener(eventType, callback, value.options !== undefined ? value.options : false);
        }
      };
    }

    function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

    function normalizeValue(value) {
      var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

      if (Array.isArray(value)) {
        value.forEach(function (className) {
          return set.add(className);
        });
      } else if (value !== null && _typeof$5(value) === "object") {
        Object.keys(value).forEach(function (key) {
          return value[key] && set.add(key);
        });
      } else {
        set.add(value);
      }

      return set;
    }

    var classMap$1 = new WeakMap();
    function resolveClassList(host, target, value) {
      var previousList = classMap$1.get(target) || new Set();
      var list = normalizeValue(value);
      classMap$1.set(target, list);
      list.forEach(function (className) {
        target.classList.add(className);
        previousList.delete(className);
      });
      previousList.forEach(function (className) {
        target.classList.remove(className);
      });
    }

    function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }
    var styleMap$1 = new WeakMap();
    function resolveStyle(host, target, value) {
      if (value === null || _typeof$6(value) !== "object") {
        throw TypeError("Style value must be an object in ".concat(stringifyElement(target), ":"), value);
      }

      var previousMap = styleMap$1.get(target) || new Map();
      var nextMap = Object.keys(value).reduce(function (map, key) {
        var dashKey = camelToDash(key);
        var styleValue = value[key];

        if (!styleValue && styleValue !== 0) {
          target.style.removeProperty(dashKey);
        } else {
          target.style.setProperty(dashKey, styleValue);
        }

        map.set(dashKey, styleValue);
        previousMap.delete(dashKey);
        return map;
      }, new Map());
      previousMap.forEach(function (styleValue, key) {
        target.style[key] = "";
      });
      styleMap$1.set(target, nextMap);
    }

    function resolveProperty(attrName, propertyName, isSVG) {
      if (propertyName.substr(0, 2) === "on") {
        var eventType = propertyName.substr(2);
        return resolveEventListener(eventType);
      }

      switch (attrName) {
        case "class":
          return resolveClassList;

        case "style":
          return resolveStyle;

        default:
          return function (host, target, value) {
            if (!isSVG && !(target instanceof SVGElement) && propertyName in target) {
              if (target[propertyName] !== value) {
                target[propertyName] = value;
              }
            } else if (value === false || value === undefined || value === null) {
              target.removeAttribute(attrName);
            } else {
              var attrValue = value === true ? "" : String(value);
              target.setAttribute(attrName, attrValue);
            }
          };
      }
    }

    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

    function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }
    /* istanbul ignore next */

    try {
      process$2.env.NODE_ENV;
    } catch (e) {
      var process$2 = {
        env: {
          NODE_ENV: 'production'
        }
      };
    } // eslint-disable-line


    var TIMESTAMP = Date.now();
    var getPlaceholder = function getPlaceholder() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return "{{h-".concat(TIMESTAMP, "-").concat(id, "}}");
    };
    var PLACEHOLDER_REGEXP_TEXT = getPlaceholder("(\\d+)");
    var PLACEHOLDER_REGEXP_EQUAL = new RegExp("^".concat(PLACEHOLDER_REGEXP_TEXT, "$"));
    var PLACEHOLDER_REGEXP_ALL = new RegExp(PLACEHOLDER_REGEXP_TEXT, "g");
    var ATTR_PREFIX = "--".concat(TIMESTAMP, "--");
    var ATTR_REGEXP = new RegExp(ATTR_PREFIX, "g");
    var preparedTemplates = new WeakMap();
    /* istanbul ignore next */

    function applyShadyCSS(template, tagName) {
      if (!tagName) return template;
      return shadyCSS(function (shady) {
        var map = preparedTemplates.get(template);

        if (!map) {
          map = new Map();
          preparedTemplates.set(template, map);
        }

        var clone = map.get(tagName);

        if (!clone) {
          clone = document.createElement("template");
          clone.content.appendChild(template.content.cloneNode(true));
          map.set(tagName, clone);
          var styles = clone.content.querySelectorAll("style");
          Array.from(styles).forEach(function (style) {
            var count = style.childNodes.length + 1;

            for (var i = 0; i < count; i += 1) {
              style.parentNode.insertBefore(document.createTextNode(getPlaceholder()), style);
            }
          });
          shady.prepareTemplate(clone, tagName.toLowerCase());
        }

        return clone;
      }, template);
    }

    function createSignature(parts, styles) {
      var signature = parts.reduce(function (acc, part, index) {
        if (index === 0) {
          return part;
        }

        if (parts.slice(index).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)) {
          return "".concat(acc, "<!--").concat(getPlaceholder(index - 1), "-->").concat(part);
        }

        return acc + getPlaceholder(index - 1) + part;
      }, "");

      if (styles) {
        signature += "<style>\n".concat(styles.join("\n/*------*/\n"), "\n</style>");
      }
      /* istanbul ignore if */


      if (IS_IE) {
        return signature.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>/]+)/g, function (match) {
          return "".concat(ATTR_PREFIX).concat(match);
        });
      }

      return signature;
    }

    function getPropertyName(string) {
      return string.replace(/\s*=\s*['"]*$/g, "").split(/\s+/).pop();
    }

    function replaceComments(fragment) {
      var iterator = document.createNodeIterator(fragment, NodeFilter.SHOW_COMMENT, null, false);
      var node; // eslint-disable-next-line no-cond-assign

      while (node = iterator.nextNode()) {
        if (PLACEHOLDER_REGEXP_EQUAL.test(node.textContent)) {
          node.parentNode.insertBefore(document.createTextNode(node.textContent), node);
          node.parentNode.removeChild(node);
        }
      }
    }

    function createInternalWalker(context) {
      var node;
      return {
        get currentNode() {
          return node;
        },

        nextNode: function nextNode() {
          if (node === undefined) {
            node = context.childNodes[0];
          } else if (node.childNodes.length) {
            node = node.childNodes[0];
          } else if (node.nextSibling) {
            node = node.nextSibling;
          } else {
            var parentNode = node.parentNode;
            node = parentNode.nextSibling;

            while (!node && parentNode !== context) {
              parentNode = parentNode.parentNode;
              node = parentNode.nextSibling;
            }
          }

          return !!node;
        }
      };
    }

    function createExternalWalker(context) {
      return document.createTreeWalker(context, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
    }
    /* istanbul ignore next */


    var createWalker = _typeof$7(window.ShadyDOM) === "object" && window.ShadyDOM.inUse ? createInternalWalker : createExternalWalker;
    var container = document.createElement("div");
    function compileTemplate(rawParts, isSVG, styles) {
      var template = document.createElement("template");
      var parts = [];
      var signature = createSignature(rawParts, styles);
      if (isSVG) signature = "<svg>".concat(signature, "</svg>");
      /* istanbul ignore if */

      if (IS_IE) {
        template.innerHTML = signature;
      } else {
        container.innerHTML = "<template>".concat(signature, "</template>");
        template.content.appendChild(container.children[0].content);
      }

      if (isSVG) {
        var svgRoot = template.content.firstChild;
        template.content.removeChild(svgRoot);
        Array.from(svgRoot.childNodes).forEach(function (node) {
          return template.content.appendChild(node);
        });
      }

      replaceComments(template.content);
      var compileWalker = createWalker(template.content);
      var compileIndex = 0;

      var _loop = function _loop() {
        var node = compileWalker.currentNode;

        if (node.nodeType === Node.TEXT_NODE) {
          var text = node.textContent;

          if (!text.match(PLACEHOLDER_REGEXP_EQUAL)) {
            var results = text.match(PLACEHOLDER_REGEXP_ALL);

            if (results) {
              var currentNode = node;
              results.reduce(function (acc, placeholder) {
                var _acc$pop$split = acc.pop().split(placeholder),
                    _acc$pop$split2 = _slicedToArray(_acc$pop$split, 2),
                    before = _acc$pop$split2[0],
                    next = _acc$pop$split2[1];

                if (before) acc.push(before);
                acc.push(placeholder);
                if (next) acc.push(next);
                return acc;
              }, [text]).forEach(function (part, index) {
                if (index === 0) {
                  currentNode.textContent = part;
                } else {
                  currentNode = currentNode.parentNode.insertBefore(document.createTextNode(part), currentNode.nextSibling);
                }
              });
            }
          }

          var equal = node.textContent.match(PLACEHOLDER_REGEXP_EQUAL);

          if (equal) {
            /* istanbul ignore else */
            if (!IS_IE) node.textContent = "";
            parts[equal[1]] = [compileIndex, resolveValue];
          }
        } else {
          /* istanbul ignore else */
          // eslint-disable-next-line no-lonely-if
          if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.attributes).forEach(function (attr) {
              var value = attr.value.trim();
              /* istanbul ignore next */

              var name = IS_IE ? attr.name.replace(ATTR_PREFIX, "") : attr.name;
              var equal = value.match(PLACEHOLDER_REGEXP_EQUAL);

              if (equal) {
                var propertyName = getPropertyName(rawParts[equal[1]]);
                parts[equal[1]] = [compileIndex, resolveProperty(name, propertyName, isSVG)];
                node.removeAttribute(attr.name);
              } else {
                var _results = value.match(PLACEHOLDER_REGEXP_ALL);

                if (_results) {
                  var partialName = "attr__".concat(name);

                  _results.forEach(function (placeholder, index) {
                    var _placeholder$match = placeholder.match(PLACEHOLDER_REGEXP_EQUAL),
                        _placeholder$match2 = _slicedToArray(_placeholder$match, 2),
                        id = _placeholder$match2[1];

                    parts[id] = [compileIndex, function (host, target, attrValue) {
                      var data = dataMap.get(target, {});
                      data[partialName] = (data[partialName] || value).replace(placeholder, attrValue == null ? "" : attrValue);

                      if (_results.length === 1 || index + 1 === _results.length) {
                        target.setAttribute(name, data[partialName]);
                        data[partialName] = undefined;
                      }
                    }];
                  });

                  attr.value = "";
                  /* istanbul ignore next */

                  if (IS_IE && name !== attr.name) {
                    node.removeAttribute(attr.name);
                    node.setAttribute(name, "");
                  }
                }
              }
            });
          }
        }

        compileIndex += 1;
      };

      while (compileWalker.nextNode()) {
        _loop();
      }

      return function updateTemplateInstance(host, target, args) {
        var data = dataMap.get(target, {
          type: "function"
        });

        if (template !== data.template) {
          if (data.template || target.nodeType === Node.ELEMENT_NODE) removeTemplate(target);
          data.prevArgs = null;
          var fragment = document.importNode(applyShadyCSS(template, host.tagName).content, true);
          var renderWalker = createWalker(fragment);
          var clonedParts = parts.slice(0);
          var renderIndex = 0;
          var currentPart = clonedParts.shift();
          var markers = [];
          data.template = template;
          data.markers = markers;

          while (renderWalker.nextNode()) {
            var node = renderWalker.currentNode;

            if (node.nodeType === Node.TEXT_NODE) {
              /* istanbul ignore next */
              if (PLACEHOLDER_REGEXP_EQUAL.test(node.textContent)) {
                node.textContent = "";
              } else if (IS_IE) {
                node.textContent = node.textContent.replace(ATTR_REGEXP, "");
              }
            }

            while (currentPart && currentPart[0] === renderIndex) {
              markers.push([node, currentPart[1]]);
              currentPart = clonedParts.shift();
            }

            renderIndex += 1;
          }

          if (target.nodeType === Node.TEXT_NODE) {
            data.startNode = fragment.childNodes[0];
            data.endNode = fragment.childNodes[fragment.childNodes.length - 1];
            var previousChild = target;
            var child = fragment.childNodes[0];

            while (child) {
              target.parentNode.insertBefore(child, previousChild.nextSibling);
              previousChild = child;
              child = fragment.childNodes[0];
            }
          } else {
            target.appendChild(fragment);
          }
        }

        var prevArgs = data.prevArgs;
        data.prevArgs = args;

        for (var index = 0; index < data.markers.length; index += 1) {
          var _data$markers$index = _slicedToArray(data.markers[index], 2),
              _node = _data$markers$index[0],
              marker = _data$markers$index[1];

          if (!prevArgs || prevArgs[index] !== args[index]) {
            marker(host, _node, args[index], prevArgs ? prevArgs[index] : undefined);
          }
        }

        if (target.nodeType !== Node.TEXT_NODE) {
          shadyCSS(function (shady) {
            if (host.shadowRoot) {
              if (prevArgs) {
                shady.styleSubtree(host);
              } else {
                shady.styleElement(host);
              }
            }
          });
        }
      };
    }

    var setCache = new Map();
    function set$1(propertyName, value) {
      if (!propertyName) throw Error("Target property name missing: ".concat(propertyName));

      if (arguments.length === 2) {
        return function (host) {
          host[propertyName] = value;
        };
      }

      var fn = setCache.get(propertyName);

      if (!fn) {
        fn = function fn(host, _ref) {
          var target = _ref.target;
          host[propertyName] = target.value;
        };

        setCache.set(propertyName, fn);
      }

      return fn;
    }
    var promiseMap = new WeakMap();
    function resolve(promise, placeholder) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
      return function (host, target) {
        var timeout;

        if (placeholder) {
          timeout = setTimeout(function () {
            timeout = undefined;
            requestAnimationFrame(function () {
              placeholder(host, target);
            });
          }, delay);
        }

        promiseMap.set(target, promise);
        promise.then(function (template) {
          if (timeout) clearTimeout(timeout);

          if (promiseMap.get(target) === promise) {
            template(host, target);
            promiseMap.set(target, null);
          }
        });
      };
    }

    var helpers = /*#__PURE__*/Object.freeze({
        __proto__: null,
        set: set$1,
        resolve: resolve
    });

    var PLACEHOLDER = getPlaceholder();
    var SVG_PLACEHOLDER = getPlaceholder("svg");
    var templatesMap = new Map();
    var stylesMap = new WeakMap();
    var methods = {
      define: function define$1(elements) {
        define(elements);
        return this;
      },
      key: function key(id) {
        this.id = id;
        return this;
      },
      style: function style() {
        for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
          styles[_key] = arguments[_key];
        }

        stylesMap.set(this, styles);
        return this;
      }
    };

    function create(parts, args, isSVG) {
      var createTemplate = function createTemplate(host) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : host;
        var styles = stylesMap.get(createTemplate);
        var id = parts.join(PLACEHOLDER);
        if (styles) id += styles.join(PLACEHOLDER);
        if (isSVG) id += SVG_PLACEHOLDER;
        var render = templatesMap.get(id);

        if (!render) {
          render = compileTemplate(parts, isSVG, styles);
          templatesMap.set(id, render);
        }

        render(host, target, args);
      };

      return Object.assign(createTemplate, methods);
    }

    function html$1(parts) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return create(parts, args);
    }
    function svg$1(parts) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return create(parts, args, true);
    }
    Object.assign(html$1, helpers);
    Object.assign(svg$1, helpers);

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
`;
    const properties$1 = Object.assign({ active: reflect('active', false), checked: reflect('checked', false), disabled: reflect('disabled', false), focused: reflect('focused', false) }, styleProps);
    // Object.keys(properties).forEach(k => (properties[k] = reflectBool(k, properties[k])));
    const template$1 = host => {
        const { active, checked, disabled, focused } = host;
        return html `
        ${defaultStyles} ${styles$1}
        <style>
            ::slotted(*) {
                user-select: none;
            }
        </style>
        <button
            tabindex="0"
            class=${classMap({ active, checked, focused })}
            .disabled=${disabled}
            @mouseover=${e => {
        host.focused = true;
        e.target.focus();
    }}
            @mouseleave=${e => {
        host.focused = false;
        e.target.blur();
    }}
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

    const _GLOBAL = (function _init(obj) {
        const data = obj._SHFTJS || {};
        ['drags', 'drops'].forEach(type => {
            if (!data[type])
                data[type] = new WeakMap();
        });
        return (obj._SHFTJS = data);
    })(window);
    const EVENTINIT_KEYS = [
        /* EventInit */
        'bubbles',
        'cancelable',
        'composed',
        /* UiEventInit */
        'detail',
        'view',
        /* EventModifierInit */
        'altKey',
        'ctrlKey',
        'metaKey',
        'shiftKey',
        /* MouseEventInit */
        'button',
        'buttons',
        'clientX',
        'clientY',
        'movementX',
        'movementY',
        'relatedTarget',
        'screenX',
        'screenY'
    ];
    /**
     * Copies and returns `MouseEventInit` properties from an existing `MouseEvent`.
     * @param e
     * @param overrides
     */
    function eventInit(e, overrides = {}) {
        const init = {};
        EVENTINIT_KEYS.forEach(key => {
            init[key] = e[key];
        });
        return Object.assign(init, overrides);
    }
    /**
     * Constructs and dispatches a custom `MouseEvent` with property `shftTarget` set to `element`.
     * @param element
     * @param typeArg
     * @param options
     * @returns The constructed event.
     */
    function dispatch$2(element, typeArg, options = {}) {
        const ev = new MouseEvent(typeArg, options);
        ev.shftTarget = element;
        element.dispatchEvent(ev);
        return ev;
    }

    const { drags, drops } = _GLOBAL;
    function clamp$1(value, min = 0, max = 1) {
        return Math.max(min, Math.min(value, max));
    }
    function matches(el, selectors) {
        if (!selectors)
            return true;
        if (typeof selectors === 'string')
            selectors = [selectors];
        if (!(selectors instanceof Array))
            return false;
        return selectors.some(selector => el.matches(selector));
    }
    function overlapPct(el, other) {
        const { left: l, right: r, top: t, bottom: b, height: h, width: w } = el.getBoundingClientRect();
        const { left: otherL, right: otherR, top: otherT, bottom: otherB } = other.getBoundingClientRect();
        const overlapW = clamp$1(Math.min(r, otherR) - Math.max(l, otherL), 0, w);
        const overlapH = clamp$1(Math.min(b, otherB) - Math.max(t, otherT), 0, h);
        return (overlapW * overlapH) / (w * h);
    }
    function is(el, type) {
        const { drags, drops } = _GLOBAL;
        switch (type) {
            case 'drag':
            case 'draggable':
                return drags.has(el);
            case 'drop':
            case 'droppable':
                return drops.has(el);
            default:
                return drags.has(el) || drops.has(el);
        }
    }
    function clear(el) {
        const { drags, drops } = _GLOBAL;
        if (drags.has(el)) {
            const { onmousedown, onmousemove, onmouseup } = drags.get(el);
            el.removeEventListener('mousedown', onmousedown);
            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);
        }
        if (drops.has(el)) {
            const { ondragstart, ondrag, ondragend } = drops.get(el);
            document.removeEventListener('dragstart', ondragstart);
            document.removeEventListener('drag', ondrag);
            document.removeEventListener('dragend', ondragend);
        }
    }
    function canDrop(droppable, dragged) {
        const { accepts, overlap } = drops.get(droppable);
        return (matches(dragged, accepts) && overlapPct(dragged, droppable) > overlap);
    }

    const { drags: drags$1 } = _GLOBAL;
    function drag(el) {
        if (is(el, 'drag'))
            return;
        const data = {
            onmousedown: _mousedownFn(el),
            onmousemove: _mousemoveFn(el),
            onmouseup: _mouseupFn(el)
        };
        el.addEventListener('mousedown', data.onmousedown);
        drags$1.set(el, data);
    }
    function _mousedownFn(el) {
        return (e) => {
            const { onmousemove, onmouseup } = drags$1.get(el);
            if (e.buttons === 1) {
                dispatch$2(el, 'dragstart', eventInit(e));
                document.addEventListener('mousemove', onmousemove);
                document.addEventListener('mouseup', onmouseup, {
                    once: true
                });
            }
        };
    }
    function _mousemoveFn(el) {
        return (e) => {
            dispatch$2(el, 'drag', eventInit(e));
        };
    }
    function _mouseupFn(el) {
        return (e) => {
            const { onmousemove } = drags$1.get(el);
            dispatch$2(el, 'dragend', eventInit(e));
            document.removeEventListener('mousemove', onmousemove);
        };
    }

    const { drops: drops$1 } = _GLOBAL;
    function drop(el, options) {
        if (is(el, 'drop'))
            return;
        const { accepts, overlap } = Object.assign({ accepts: null, overlap: 0.5 }, options || {});
        const data = {
            content: new WeakSet(),
            ondragstart: _dragstartFn(el),
            ondrag: _dragFn(el),
            ondragend: _dragendFn(el),
            accepts,
            overlap
        };
        document.addEventListener('dragstart', data.ondragstart);
        drops$1.set(el, data);
    }
    function _dragstartFn(el) {
        return (e) => {
            if (!drops$1.has(el))
                return;
            const dragged = e.shftTarget;
            const { accepts, ondrag, ondragend } = drops$1.get(el);
            if (matches(dragged, accepts)) {
                dispatch$2(el, 'dropopen', { relatedTarget: dragged });
                dragged.addEventListener('drag', ondrag);
                dragged.addEventListener('dragend', ondragend, { once: true });
            }
        };
    }
    function _dragFn(el) {
        return (e) => {
            const dragged = e.shftTarget;
            const { accepts, content } = drops$1.get(el);
            if (matches(dragged, accepts)) {
                if (canDrop(el, dragged)) {
                    if (!content.has(dragged)) {
                        content.add(dragged);
                        dispatch$2(el, 'dragenter', eventInit(e, { relatedTarget: dragged }));
                    }
                    dispatch$2(el, 'dragover', eventInit(e, { relatedTarget: dragged }));
                }
                else {
                    if (content.has(dragged)) {
                        content.delete(dragged);
                        dispatch$2(el, 'dragleave', eventInit(e, { relatedTarget: dragged }));
                    }
                }
            }
        };
    }
    function _dragendFn(el) {
        return (e) => {
            const dragged = e.shftTarget;
            const { ondrag } = drops$1.get(el);
            dispatch$2(el, 'dropclose', eventInit(e, { relatedTarget: dragged }));
            dragged.removeEventListener('drag', ondrag);
            if (canDrop(el, dragged)) {
                dispatch$2(el, 'drop', eventInit(e, { relatedTarget: dragged }));
            }
        };
    }

    function defaultmove(e) {
        const el = e.target;
        if (!['absolute', 'relative'].some(pos => pos === el.style.position))
            el.style.position = 'relative';
        ['left', 'top'].forEach(axis => {
            let pos = parseFloat(el.style[axis]) || 0;
            pos += axis === 'left' ? e.movementX : e.movementY;
            el.style[axis] = `${pos}px`;
        });
    }
    var shft = {
        drag,
        drop,
        util: { clear, defaultmove, is, matches },
        _GLOBAL
    };

    const { drag: drag$1 } = shft;
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
        findElement('.slider-bar', host.shadowRoot).then(drag$1).catch(console.log);
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
    const ListItem = Object.assign(Object.assign({}, Item), { value: reflect('value', ''), render: lit(() => html `<slot></slot>`) });
    const ContentItem = Object.assign(Object.assign({}, Item), { icon: reflect('icon', ''), label: reflect('label', ''), render: lit(({ active }) => html `${active ? html `<slot></slot>` : html ``}`) });
    const ItemGroup = {
        items: children(el => el['_ue_item'] !== undefined),
        selected: ({ items }) => items.filter(item => item.selected),
        active: ({ items }) => items.filter(item => item.active),
        selectedIdx: ({ items }) => items.filter(item => item.selected).map(item => items.indexOf(item)),
        activeIdx: ({ items }) => items.filter(item => item.active).map(item => items.indexOf(item)),
    };
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
                        item: items[selected]
                    }
                });
        }
    };
    const BaseGroup = {
        items: children(el => el['ueItem'])
    };
    const SingleSelectGroup = Object.assign(Object.assign({}, BaseGroup), { preselect: reflect('preselect', 0), selected: singleSelect, selectedItem: ({ items }) => items.find(item => item.selected) });
    const itemList = curry((itemTemplate, host) => html `
            ${host.items.map(itemTemplate(host))}
        `);
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
        for: reflect('for', ''),
        target: {
            get: host => (host.for ? document.querySelector(host.for) : host.parentElement),
            connect: host => {
                const pop = tippy(host.target, {
                    content: host.firstChild,
                    allowHTML: true,
                    followCursor: 'initial',
                    interactive: true,
                    trigger: 'click'
                });
                return pop.destroy;
            },
        },
    };
    const template$6 = () => html `
    <style>
        div {
            height: auto;
            width: auto;
            position: fixed;
            border: 1px solid black;
            background-color: var(--ue-bg-color);
        }
    </style>
`;
    const UeTooltip = define('ue-tooltip', Object.assign(Object.assign({}, properties$6), { render: lit(template$6) }));

    const properties$7 = {
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
    const template$7 = host => {
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
    const UeProgressBar = define('ue-progress-bar', Object.assign(Object.assign({}, properties$7), { render: lit(template$7) }));

    const properties$8 = Object.assign(Object.assign({}, SingleSelectGroup), { direction: reflect('direction', 'column') });
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
    const UeSelectGrp = define('ue-select-grp', Object.assign(Object.assign({}, properties$8), { render: lit(host => html `
                ${styles$6}
                <div style="display: flex; flex-direction: ${host.direction}">
                    ${buttonList(host)}
                </div>
            `) }));

    const properties$9 = {
        open: false,
        direction: reflect('direction', 'right'),
        duration: reflect('duration', 0.2)
    };
    const styles$7 = html `
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
`;
    const template$8 = ({ direction, duration, open }) => html `
        ${styles$7}
        <div
            class=${classMap({ open, [direction]: true })}
            style="transition: transform ${duration}s;"
        >
            <slot></slot>
        </div>
    `;
    const UeDrawer = define('ue-drawer', Object.assign(Object.assign({}, properties$9), { render: lit(template$8) }));

    const properties$a = Object.assign(Object.assign({}, ItemGroup), { multi: reflect('multi', false) });
    const select = (host, item) => {
        if (host.multi)
            item.selected = !item.selected;
        else
            host.items.forEach(i => {
                i.selected = i === item;
            });
        dispatch(host, 'changed', { bubbles: true, composed: true, detail: host });
    };
    const template$9 = host => html `
        ${defaultStyles}
        <div>
            ${host.items.map(item => html `
                        <ue-button .checked=${item.selected} @click=${() => select(host, item)}
                            >${item.innerText}</ue-button
                        >
                    `)}
        </div>
    `;
    const UeList = define('ue-list', Object.assign(Object.assign({}, properties$a), { render: lit(template$9) }));

    function getBoundingClientRect(element) {
      var rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        x: rect.left,
        y: rect.top
      };
    }

    /*:: import type { Window } from '../types'; */

    /*:: declare function getWindow(node: Node | Window): Window; */
    function getWindow(node) {
      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView : window;
      }

      return node;
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    /*:: declare function isElement(node: mixed): boolean %checks(node instanceof
      Element); */

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }
    /*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
      HTMLElement); */


    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getDocumentElement(element) {
      // $FlowFixMe: assume body is always available
      return (isElement(element) ? element.ownerDocument : element.document).documentElement;
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getComputedStyle(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    // Composite means it takes into account transforms as well as layout.

    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (!isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    // Returns the layout rect of an element relative to its offsetParent. Layout
    // means it doesn't take into account transforms.
    function getLayoutRect(element) {
      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
      };
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        // $FlowFixMe: need a better way to handle this...
        element.host || // ShadowRoot detected
        // $FlowFixMe: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    function listScrollParents(element, list) {
      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = getNodeName(scrollParent) === 'body';
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    }

    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

      while (offsetParent && isTableElement(offsetParent)) {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
        return window;
      }

      return offsetParent || window;
    }

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function format(str) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return [].concat(args).reduce(function (p, c) {
        return p.replace(/%s/, c);
      }, str);
    }

    var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
    function validateModifiers(modifiers) {
      modifiers.forEach(function (modifier) {
        Object.keys(modifier).forEach(function (key) {
          switch (key) {
            case 'name':
              if (typeof modifier.name !== 'string') {
                console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
              }

              break;

            case 'enabled':
              if (typeof modifier.enabled !== 'boolean') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
              }

            case 'phase':
              if (modifierPhases.indexOf(modifier.phase) < 0) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
              }

              break;

            case 'fn':
              if (typeof modifier.fn !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'effect':
              if (typeof modifier.effect !== 'function') {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
              }

              break;

            case 'requires':
              if (!Array.isArray(modifier.requires)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
              }

              break;

            case 'requiresIfExists':
              if (!Array.isArray(modifier.requiresIfExists)) {
                console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
              }

              break;

            case 'options':
            case 'data':
              break;

            default:
              console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
                return "\"" + s + "\"";
              }).join(', ') + "; but \"" + key + "\" was provided.");
          }

          modifier.requires && modifier.requires.forEach(function (requirement) {
            if (modifiers.find(function (mod) {
              return mod.name === requirement;
            }) == null) {
              console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
            }
          });
        });
      });
    }

    function uniqueBy(arr, fn) {
      var identifiers = new Set();
      return arr.filter(function (item) {
        var identifier = fn(item);

        if (!identifiers.has(identifier)) {
          identifiers.add(identifier);
          return true;
        }
      });
    }

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
          options: Object.assign({}, existing.options, {}, current.options),
          data: Object.assign({}, existing.data, {}, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
    var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(options) {
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned
            // if one of the modifiers is invalid for any reason

            if (process.env.NODE_ENV !== "production") {
              var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
                var name = _ref.name;
                return name;
              });
              validateModifiers(modifiers);

              if (getBasePlacement(state.options.placement) === auto) {
                var flipModifier = state.orderedModifiers.find(function (_ref2) {
                  var name = _ref2.name;
                  return name === 'flip';
                });

                if (!flipModifier) {
                  console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
                }
              }

              var _getComputedStyle = getComputedStyle(popper),
                  marginTop = _getComputedStyle.marginTop,
                  marginRight = _getComputedStyle.marginRight,
                  marginBottom = _getComputedStyle.marginBottom,
                  marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
              // cause bugs with positioning, so we'll warn the consumer


              if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
                return parseFloat(margin);
              })) {
                console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
              }
            }

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              if (process.env.NODE_ENV !== "production") {
                console.error(INVALID_ELEMENT_ERROR);
              }

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            var __debug_loops__ = 0;

            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (process.env.NODE_ENV !== "production") {
                __debug_loops__ += 1;

                if (__debug_loops__ > 100) {
                  console.error(INFINITE_LOOP_ERROR);
                  break;
                }
              }

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsets(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: Math.round(x * dpr) / dpr || 0,
        y: Math.round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive;

      var _roundOffsets = roundOffsets(offsets),
          x = _roundOffsets.x,
          y = _roundOffsets.y;

      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);
        } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

        /*:: offsetParent = (offsetParent: Element); */


        if (placement === top) {
          sideY = bottom;
          y -= offsetParent.clientHeight - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left) {
          sideX = right;
          x -= offsetParent.clientWidth - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref3) {
      var state = _ref3.state,
          options = _ref3.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

      if (process.env.NODE_ENV !== "production") {
        var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

        if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
          return transitionProperty.indexOf(property) >= 0;
        })) {
          console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
        }
      }

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          } // Flow doesn't support to extend this property, but it's the most
          // effective way to apply styles to an HTMLElement
          // $FlowFixMe


          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$1,
      requires: ['computeStyles']
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched];
      });
    }

    var hash$1 = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash$1[matched];
      });
    }

    function getViewportRect(element) {
      var win = getWindow(element);
      var visualViewport = win.visualViewport;
      var width = win.innerWidth;
      var height = win.innerHeight; // We don't know which browsers have buggy or odd implementations of this, so
      // for now we're only applying it to iOS to fix the keyboard issue.
      // Investigation required

      if (visualViewport && /iPhone|iPod|iPad/.test(navigator.platform)) {
        width = visualViewport.width;
        height = visualViewport.height;
      }

      return {
        width: width,
        height: height,
        x: 0,
        y: 0
      };
    }

    function getDocumentRect(element) {
      var win = getWindow(element);
      var winScroll = getWindowScroll(element);
      var documentRect = getCompositeRect(getDocumentElement(element), win);
      documentRect.height = Math.max(documentRect.height, win.innerHeight);
      documentRect.width = Math.max(documentRect.width, win.innerWidth);
      documentRect.x = -winScroll.scrollLeft;
      documentRect.y = -winScroll.scrollTop;
      return documentRect;
    }

    function toNumber(cssValue) {
      return parseFloat(cssValue) || 0;
    }

    function getBorders(element) {
      var computedStyle = isHTMLElement(element) ? getComputedStyle(element) : {};
      return {
        top: toNumber(computedStyle.borderTopWidth),
        right: toNumber(computedStyle.borderRightWidth),
        bottom: toNumber(computedStyle.borderBottomWidth),
        left: toNumber(computedStyle.borderLeftWidth)
      };
    }

    function getDecorations(element) {
      var win = getWindow(element);
      var borders = getBorders(element);
      var isHTML = getNodeName(element) === 'html';
      var winScrollBarX = getWindowScrollBarX(element);
      var x = element.clientWidth + borders.right;
      var y = element.clientHeight + borders.bottom; // HACK:
      // document.documentElement.clientHeight on iOS reports the height of the
      // viewport including the bottom bar, even if the bottom bar isn't visible.
      // If the difference between window innerHeight and html clientHeight is more
      // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
      // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
      //   is about 17px)
      // * The mobile bar is 114px tall

      if (isHTML && win.innerHeight - element.clientHeight > 50) {
        y = win.innerHeight - borders.bottom;
      }

      return {
        top: isHTML ? 0 : element.clientTop,
        right: // RTL scrollbar (scrolling containers only)
        element.clientLeft > borders.left ? borders.right : // LTR scrollbar
        isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
        bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
        left: isHTML ? winScrollBarX : element.clientLeft
      };
    }

    function contains(parent, child) {
      // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
      var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (isShadow) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(element);
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement);
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
        accRect.top = Math.max(rect.top + decorations.top, accRect.top);
        accRect.right = Math.min(rect.right - decorations.right, accRect.right);
        accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
        accRect.left = Math.max(rect.left + decorations.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), {}, paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var referenceElement = state.elements.reference;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
      var referenceClientRect = getBoundingClientRect(referenceElement);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    /*:: type OverflowsMap = { [ComputedPlacement]: number }; */

    /*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = (variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements).filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      }); // $FlowFixMe: Flow seems to have problems with two array unions...

      var overflows = placements$1.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function within(min, value, max) {
      return Math.max(min, Math.min(value, max));
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min = popperOffsets[mainAxis] + overflow[mainSide];
        var max = popperOffsets[mainAxis] - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
        var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var _preventedOffset = within(_min, _offset, _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function arrow$1(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = state.modifiersData[name + "#persistent"].padding;
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$2(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
          _options$padding = options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (process.env.NODE_ENV !== "production") {
        if (!isHTMLElement(arrowElement)) {
          console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {
        if (process.env.NODE_ENV !== "production") {
          console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
        }

        return;
      }

      state.elements.arrow = arrowElement;
      state.modifiersData[name + "#persistent"] = {
        padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
      };
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$2 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow$1,
      effect: effect$2,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$2, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    Object.assign(window, { createPopper });

    exports.UeButton = UeButton;
    exports.UeContentItem = UeContentItem;
    exports.UeDrawer = UeDrawer;
    exports.UeDropdown = UeDropdown;
    exports.UeIcon = UeIcon;
    exports.UeList = UeList;
    exports.UeListItem = UeListItem;
    exports.UeProgressBar = UeProgressBar;
    exports.UeSelectGrp = UeSelectGrp;
    exports.UeSlider = UeSlider;
    exports.UeTabGroup = UeTabGroup;
    exports.UeText = UeText;
    exports.UeTooltip = UeTooltip;
    exports.shadowStyle = shadowStyle;

    return exports;

}({}, tippy));
