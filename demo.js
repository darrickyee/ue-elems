var UE_ELEMS = (function (exports) {
    'use strict';

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
    const lit = (fn) => {
        return host => {
            const template = fn(host);
            return (host, target) => render(template, target);
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
    function stringifyElement(element) {
      var tagName = String(element.tagName).toLowerCase();
      return "<".concat(tagName, ">");
    }
    var IS_IE = "ActiveXObject" in window;

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

    var contextStack = new Set();
    function get(target, key, getter) {
      var entry = getEntry(target, key);

      if (contextStack.size && contextStack.has(entry)) {
        throw Error("Circular get invocation of the '".concat(key, "' property in '").concat(stringifyElement(target), "'"));
      }

      contextStack.forEach(function (context) {
        context.deps = context.deps || new Set();
        context.deps.add(entry);

        if (context.observed) {
          entry.contexts = entry.contexts || new Set();
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
            if (depEntry.contexts) depEntry.contexts.delete(entry);
          });
        }

        entry.deps = undefined;
        var nextValue = getter(target, entry.value);

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
        throw Error("Try to set '".concat(key, "' of '").concat(stringifyElement(target), "' in get call"));
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
        throw Error("Try to invalidate '".concat(key, "' in '").concat(stringifyElement(target), "' get call"));
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
          depEntry.contexts = depEntry.contexts || new Set();
          depEntry.contexts.add(entry);
        });
      }

      return function unobserve() {
        unsubscribe();
        entry.observed = false;

        if (entry.deps && entry.deps.size) {
          entry.deps.forEach(function (depEntry) {
            if (depEntry.contexts) depEntry.contexts.delete(entry);
          });
        }
      };
    }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    function _possibleConstructorReturn(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

    function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

    function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

    function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

    function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

    function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
    /* istanbul ignore next */

    try {
      process.env.NODE_ENV;
    } catch (e) {
      var process = {
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
          configurable: process.env.NODE_ENV !== "production"
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

        function Hybrid() {
          _classCallCheck(this, Hybrid);

          return _possibleConstructorReturn(this, _getPrototypeOf(Hybrid).apply(this, arguments));
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

    function resolveArray(host, target, value) {
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
          resolveArray(host, target, value);
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

    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

    function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

    function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }
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
    const select = (selector, context = document) => context ? context.querySelector(selector) : null;
    function nextframe() {
        return new Promise(r => {
            requestAnimationFrame(r);
        });
    }
    /**
     * Returns a promise that resolves after `duration` milliseconds.  If `reject` is true, rejects the promise instead.
     *
     * @param duration
     * @param reject
     */
    function timeout(duration = 1000, reject = false) {
        return new Promise((res, rej) => {
            setTimeout(reject ? rej : res, duration);
        });
    }
    /**
     * Returns a promise that resolves when an `eventType` event is dispatched on `target`.  If `reject` is true, rejects the promise instead.
     *
     * @param duration
     * @param reject
     */
    function eventPromise(eventType, target = document, reject = false) {
        return new Promise((res, rej) => {
            target.addEventListener(eventType, reject ? rej : res, { once: true });
        });
    }
    async function repeatUntil(callback, eventType, delay = 500) {
        const cancel = eventPromise(eventType, document, true);
        await Promise.race([timeout(delay), cancel]).catch(() => {
            return;
        });
        let isHeld = true;
        while (isHeld) {
            await Promise.race([nextframe(), cancel])
                .then(callback)
                .catch(() => {
                isHeld = false;
            });
        }
    }
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

    const curry = fn => function $c(...args) {
        return args.length < fn.length ? $c.bind(null, ...args) : fn.call(null, ...args);
    };
    const pipe = (...fns) => (...args) => fns.reduce((result, fn) => [fn.call(null, ...result)], args)[0];

    const lerp = curry((start, end, t) => (end - start) * t + start);
    const invlerp = curry((start, end, x) => (x - start) / (end - start));
    const clamp = curry((min, max, value) => Math.max(min, Math.min(value, max)));
    const roundTo = curry((step, value) => {
        const decimals = step.toString().split('.')[1];
        return parseFloat((Math.round(value / step) * step).toFixed(decimals ? decimals.length : 0));
    });
    const remap = curry((fromStart, fromEnd, toStart, toEnd) => pipe(invlerp(fromStart, fromEnd), lerp(toStart, toEnd)));

    const reflectStr = (attrName, defaultValue) => ({
        get: host => host.getAttribute(attrName) || defaultValue,
        set: (host, value) => {
            host.setAttribute(attrName, value);
            return value;
        },
        connect: (host, key, invalidate) => {
            const obs = new MutationObserver(invalidate);
            obs.observe(host, { attributeFilter: [attrName] });
        }
    });
    const reflectNum = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => parseFloat(host.getAttribute(attrName)) || defaultValue }));
    const reflectBool = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => host.hasAttribute(attrName) || defaultValue, set: (host, value) => {
            if (value)
                host.setAttribute(attrName, '');
            else
                host.removeAttribute(attrName);
            return !!value;
        } }));
    const mappers = {
        boolean: reflectBool,
        number: reflectNum,
        string: reflectStr
    };
    const reflect = (attrName, defaultValue) => attrName && mappers[typeof defaultValue]
        ? mappers[typeof defaultValue](attrName, defaultValue)
        : property(defaultValue);

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

    /********** Utility functions **********/
    const handleEvent = curry((host, { type }) => {
        switch (type) {
            case 'focus':
                host.focused = true;
                break;
            case 'blur':
                host.focused = host.active = false;
                break;
            case 'mousedown':
                host.active = true;
                break;
            case 'mouseup':
                host.active = false;
                host.checked = host.checkable ? !host.checked : false;
                break;
        }
    });
    const styles$1 = host => html `
    <style>
        :host {
            display: flex;

            padding: 2px;
            align-items: stretch;
            outline: none;
            width: var(--ue-btn-width);
            height: var(--ue-btn-height);
            pointer-events: ${host.disabled ? 'none' : ''};
        }

        ::slotted(*) {
            user-select: none;
            max-height: -webkit-fill-available;
            max-width: -webkit-fill-available;
        }

        div {
            /* Fixed values */
            display: flex;
            flex-direction: column;
            padding: 5px;
            flex-grow: 1;
            flex-shrink: inherit;

            align-items: center;
            justify-content: center;
            outline: none;

            color: var(--ue-color);
            background-color: var(--ue-bg-color);
            border: var(--ue-border);
            border-radius: var(--ue-border-radius);

            transition: var(--ue-transition);
        }

        .focused {
            --ue-color: var(--ue-focus-color);
            --ue-bg-color: var(--ue-focus-bg-color);
            --ue-border: var(--ue-focus-border);

            transition: var(--ue-transition);
        }

        .active {
            --ue-color: var(--ue-active-color);
            --ue-bg-color: var(--ue-active-bg-color);
            --ue-border: var(--ue-active-border);

            transition: var(--ue-transition);
        }

        .disabled {
            --ue-color: #888;
            --ue-bg-color: #444;
            --ue-border: #888;
            pointer-events: none;
        }

        .checked {
            --ue-color: var(--ue-active-color);
            --ue-bg-color: var(--ue-active-bg-color);
            --ue-border: var(--ue-active-border);
        }
    </style>
`;
    const properties$1 = {
        active: reflect('active', false),
        checkable: false,
        checked: reflect('checked', false),
        disabled: reflect('disabled', false),
        focused: reflect('focused', false)
    };
    function focusMe() {
        if (this && this.focus)
            this.focus();
    }
    function blurMe() {
        if (this && this.blur)
            this.blur();
    }
    // Object.keys(properties).forEach(k => (properties[k] = reflectBool(k, properties[k])));
    const template$1 = host => {
        const { active, checked, disabled, focused } = host;
        return html `
        ${styles$1(host)}
        <div
            tabindex="0"
            class=${classMap({ active, checked, disabled, focused })}
            @mouseover=${focusMe}
            @mouseleave=${blurMe}
            @mousedown=${handleEvent(host)}
            @mouseup=${handleEvent(host)}
            @focus=${handleEvent(host)}
            @blur=${handleEvent(host)}
        >
            <slot></slot>
        </div>
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
    /********** Utility functions **********/
    const posToVal = ({ min = 0, max = 100, step = 1, clientWidth: width = 100 }) => pipe(remap(0, width)(min, max), clamp(min, max), roundTo(step));
    const increment = curry((host, pos) => posToVal(host)(pos) < host.value ? -host.step : posToVal(host)(pos) > host.value ? host.step : 0);
    const styles$2 = html `
    <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1em;
            cursor: default;
            padding: 0.5em;
        }

        .slider-bar {
            cursor: default;
            position: relative;
            width: 100%;
            height: 50%;
            background-color: var(--ue-bg-color);
            touch-action: none;
            display: flex;
            align-items: center;
        }

        .handle {
            cursor: default;
            width: 0.8em;
            height: 300%;
            transform: translate(-50%, 0);
            background-color: var(--ue-color);
            border: var(--ue-border);
            border-radius: var(--ue-border-radius);
            position: relative;
        }
    </style>
`;
    const properties$2 = {
        min: 0,
        max: 100,
        step: 1,
        value: {
            get: (host, lastValue) => lastValue || 0,
            set: ({ step }, value) => roundTo(step, value),
            observe: (host, value, lastValue) => {
                const { min, max, step } = host;
                dispatch(host, 'change', {
                    bubbles: true,
                    composed: true,
                    detail: { value, min, max, step }
                });
            }
        }
    };
    const template$2 = host => {
        const { min, max, value } = host;
        return html `
        ${styles$2}
        <div
            class="slider-bar"
            @mousedown=${({ path, offsetX }) => {
        if (path[0] === select('.slider-bar', host.shadowRoot)) {
            host.value += increment(host, offsetX);
            repeatUntil(() => {
                host.value += increment(host, offsetX);
            }, 'mouseup');
        }
    }}
        >
            <div
                tabindex="0"
                class="handle"
                style="left: ${pipe(remap(min, max)(0, 100), clamp(0, 100))(value)}%"
                @drag=${({ offsetX, target: { offsetLeft } }) => {
        host.value = posToVal(host)(offsetX + offsetLeft);
    }}
            ></div>
        </div>
        ${once(() => {
        findElement('.handle', host.shadowRoot)
            .then(drag$1)
            .catch(console.log);
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

    const BaseItem = {
        active: true,
        selected: true
    };
    const ListItem = Object.assign(Object.assign({}, BaseItem), { label: ({ innerText }) => innerText, render: lit(() => html `
                <slot></slot>
            `) });
    const ContentItem = Object.assign(Object.assign({}, BaseItem), { label: reflect('label', ''), render: lit(({ selected }) => html `
            <style>
                :host {
                    flex-grow: ${selected ? 1 : 0};
                }
            </style>
            ${selected
        ? html `
                      <slot></slot>
                  `
        : html ``}
        `) });
    const UeListItem = define('ue-list-item', ListItem);
    const UeContentItem = define('ue-content-item', ContentItem);

    const hasProps = curry((propList, hybrid) => propList.every(hybrid.hasOwnProperty, hybrid));
    const singleSelect = {
        get: ({ items }, lastValue) => items.map(item => item.selected).indexOf(true),
        set: ({ items }, value) => items.map((item, index) => (item.selected = index === value)).indexOf(true),
        connect: (host, key) => {
            host[key] = host.preselect || 0;
        },
        observe: (host, selected) => {
            const { items } = host;
            if (items[selected])
                dispatch(host, 'select', {
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
        items: children(hasProps(['label', 'selected']))
    };
    const SingleSelectGroup = Object.assign(Object.assign({}, BaseGroup), { preselect: reflect('preselect', 0), selected: singleSelect, selectedItem: ({ items }) => items.find(item => item.selected) });
    const itemList = curry((itemTemplate, host) => html `
            ${host.items.map(itemTemplate(host))}
        `);
    const buttonItemTemplate = host => ({ selected, label }, index) => html `
    <ue-button
        .checked=${selected}
        @click=${() => {
    host.selected = index;
}}
        style="pointer-events: ${selected ? 'none' : 'inherit'}"
    >
        <slot name="item-label-${index}">${label}</slot>
    </ue-button>
`;
    const buttonList = itemList(buttonItemTemplate);

    const properties$4 = Object.assign(Object.assign({}, SingleSelectGroup), { location: reflect('location', 'left'), direction: host => (['left', 'right'].includes(host.location) ? 'column' : 'row') });
    const styles$4 = html `
    <style>
        :host {
            display: block;
        }

        ue-button {
            padding: 0;
        }

        div {
            display: flex;
        }

        .left {
            flex-direction: row;
        }

        .right {
            flex-direction: row-reverse;
        }

        .top {
            flex-direction: column;
        }

        .bottom {
            flex-direction: column-reverse;
        }
    </style>
`;
    const template$4 = host => html `
        ${styles$4}
        <div class=${classMap({ [host.location]: true })}>
            <div style="flex-direction: ${host.direction};">${buttonList(host)}</div>
            <slot></slot>
        </div>
    `;
    const UeTabGroup = define('ue-tab-group', Object.assign(Object.assign({}, properties$4), { render: lit(template$4) }));

    const properties$5 = Object.assign(Object.assign({}, SingleSelectGroup), { expand: {
            connect: (host, key) => {
                host[key] = false;
            },
            observe: (host, value) => {
                if (value)
                    return listen(document, 'click', () => {
                        host.expand = false;
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
        const { expand, items, selectedItem } = host;
        return html `
        ${styles$5}
        <div class="container" style=${styleMap(expand ? openStyle : closeStyle)}>
            <ue-button
                .checked=${expand}
                @click=${() => {
        host.expand = !expand;
    }}
                >${selectedItem ? selectedItem.label : ''}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .expand=${expand} direction="down">
                <div style=${styleMap(expand ? openStyle : closeStyle)}>
                    ${buttonList(host)}
                </div>
            </ue-drawer>
        </div>
    `;
    };
    const UeDropdown = define('ue-dropdown', Object.assign(Object.assign({}, properties$5), { render: lit(template$5) }));

    function show(host, event) {
        if (!host.active) {
            host.pos = [event.clientX, event.clientY];
            host.active = true;
        }
    }
    function hide(host, event) {
        host.active = false;
    }
    const properties$6 = {
        pos: [0, 0],
        delay: 1,
        active: {
            connect: (host, key, invalidate) => {
                const parent = host.parentElement;
                if (parent) {
                    const stopshow = listen(parent, 'mouseover', e => show(host, e));
                    const stophide = listen(parent, 'mouseout', e => hide(host));
                    return () => {
                        stopshow();
                        stophide();
                    };
                }
            }
        }
    };
    const template$6 = host => html `
    <style>
        div {
            height: auto;
            width: auto;
            position: fixed;
            border: 1px solid black;
            background-color: var(--ue-bg-color);
        }
    </style>
    ${host.active
    ? html `
              <div style="left: ${host.pos[0]}px; top: ${host.pos[1]}px">
                  <slot></slot>
              </div>
          `
    : html ``}
`;
    const UeTooltip = define('ue-tooltip', Object.assign(Object.assign({}, properties$6), { render: lit(template$6) }));

    const properties$7 = {
        value: {
            get: (host, lastValue) => lastValue || 0,
            set: (host, value, lastValue) => {
                if (value !== lastValue)
                    dispatch(host, 'change');
                if (value >= 100)
                    dispatch(host, 'full');
                return value;
            }
        },
        duration: 1,
        delay: 0
    };
    const template$7 = host => {
        const { value, duration, delay } = host;
        return html `
        <style>
            :host {
                display: flex;
                font-size: 0.8em;
                height: 1.25em;
                padding: 4px;
            }

            div {
                height: -webkit-fill-available;
            }

            #bg {
                background-color: var(--ue-bg-color);
                border: var(--ue-border);
                border-radius: var(--ue-border-radius);
                width: 100%;
                overflow: hidden;
            }

            #bar {
                position: relative;
                background-color: var(--ue-color);
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
        if (value >= 100)
            dispatch(host, 'completed');
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
        expand: false,
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

        .expand {
            transform: translate(0, 0);
        }
    </style>
`;
    const template$8 = ({ direction, duration, expand }) => html `
        ${styles$7}
        <div
            class=${classMap({ expand, [direction]: true })}
            style="transition: transform ${duration}s;"
        >
            <slot></slot>
        </div>
    `;
    const UeDrawer = define('ue-drawer', Object.assign(Object.assign({}, properties$9), { render: lit(template$8) }));

    exports.UeButton = UeButton;
    exports.UeContentItem = UeContentItem;
    exports.UeDrawer = UeDrawer;
    exports.UeDropdown = UeDropdown;
    exports.UeIcon = UeIcon;
    exports.UeListItem = UeListItem;
    exports.UeProgressBar = UeProgressBar;
    exports.UeSelectGrp = UeSelectGrp;
    exports.UeSlider = UeSlider;
    exports.UeTabGroup = UeTabGroup;
    exports.UeText = UeText;
    exports.UeTooltip = UeTooltip;

    return exports;

}({}));
