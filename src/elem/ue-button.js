import { classMap, html, lit } from '../lib/lit';
import { curry } from '../lib/util/index';
import { define } from 'hybrids';
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
            host.active = host.clickable ? true : false;
            break;
        case 'mouseup':
            if (host.clickable) {
                host.active = false;
                host.checked = host.checkable ? !host.checked : false;
            }
            break;
    }
});
const styles = html `
    <style>
        :host {
            display: flex;

            padding: 2px;
            align-items: stretch;
            outline: none;
            /* overflow: hidden; */
            width: var(--btn-width);
            height: var(--btn-height);

            font-size: var(--btn-font-size);
            font-family: var(--btn-font-family);
        }

        ::slotted(*) {
            user-select: none;
            pointer-events: none;
        }

        div {
            /* Fixed values */
            display: flex;
            padding: 5px;
            flex-grow: 1;
            flex-shrink: inherit;

            align-items: center;
            align-content: center;
            outline: none;

            /* Set from main css */

            border-radius: var(--btn-border-radius);
            justify-content: var(--btn-justify-content);

            color: var(--btn-text-color);
            background-color: var(--btn-bg-color);
            border: var(--btn-border);

            transition: background-color 0.2s, color 0.2s, transform 0.2s, border 0.2s;
        }

        .focused {
            color: var(--btn-focus-color);
            background-color: var(--btn-focus-bg-color);
            border: var(--btn-focus-border);
            transform: var(--btn-focus-transform);
            transition: var(--btn-focus-transition);
        }

        .active {
            color: var(--btn-click-color);
            background-color: var(--btn-click-bg-color);
            border: var(--btn-click-border);
            transform: var(--btn-click-transform);
            transition: var(--btn-click-transition);
        }

        .disabled {
            color: #888;
            background-color: #444;
            border-color: #888;
            pointer-events: none;
        }

        .checked {
            color: var(--btn-click-color);
            background-color: var(--btn-click-bg-color);
            border: var(--btn-click-border);
        }
    </style>
`;
const reflectBool = (name, defaultValue = true) => ({
    get: host => host.hasAttribute(name),
    set: (host, value) => {
        if (value)
            host.setAttribute(name, '');
        else
            host.removeAttribute(name);
        return !!value;
    },
    connect: (host, key, invalidate) => {
        host[key] = defaultValue;
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [key] });
        return obs.disconnect;
    }
});
const properties = {
    active: false,
    checkable: false,
    checked: false,
    clickable: true,
    disabled: false,
    focused: false
};
Object.keys(properties).forEach(k => (properties[k] = reflectBool(k, properties[k])));
const template = host => {
    const { active, checked, disabled, focused } = host;
    return html `
        ${styles}
        <div
            tabindex="0"
            class=${classMap({ active, checked, disabled, focused })}
            @mouseover=${e => e.target.focus()}
            @mouseleave=${e => e.target.blur()}
            @mousedown=${handleEvent(host)}
            @mouseup=${handleEvent(host)}
            @focus=${handleEvent(host)}
            @blur=${handleEvent(host)}
        >
            <slot></slot>
        </div>
    `;
};
export const UeButton = define('ue-button', Object.assign(Object.assign({}, properties), { render: lit(template) }));
//# sourceMappingURL=ue-button.js.map