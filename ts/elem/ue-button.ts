import { classMap, html, lit } from '../lib/lit';
import { curry, reflect } from '../lib/util';
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
            host.active = true;
            break;
        case 'mouseup':
            host.active = false;
            host.checked = host.checkable ? !host.checked : false;

            break;
    }
});

const styles = host => html`
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

const properties = {
    active: reflect('active', false),
    checkable: false,
    checked: reflect('checked', false),
    disabled: reflect('disabled', false),
    focused: reflect('focused', false)
};

function focusMe() {
    if (this && this.focus) this.focus();
}

function blurMe() {
    if (this && this.blur) this.blur();
}

// Object.keys(properties).forEach(k => (properties[k] = reflectBool(k, properties[k])));

const template = host => {
    const { active, checked, disabled, focused } = host;
    return html`
        ${styles(host)}
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

export const UeButton = define('ue-button', {
    ...properties,
    render: lit(template)
});
