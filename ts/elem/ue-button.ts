import { html, lit, classMap } from '../lib/lit';
import { defaultStyles, styleProps } from './common';
import { curry, reflect } from '../lib/util';
import { define } from 'hybrids';

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

const styleDefault = {
    color: 'white',
};

const styles = html`
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

const properties = {
    active: reflect('active', false),
    checked: reflect('checked', false),
    disabled: reflect('disabled', false),
    focused: reflect('focused', false),
    ...styleProps,
};

const template = host => {
    const { active, checked, disabled, focused } = host;
    return html`
        ${defaultStyles} ${styles}

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

export const UeButton = define('ue-button', {
    ...properties,
    render: lit(template),
});
