import { classMap, html, lit } from '../lib/lit';
import { dispatch, Hybrid, PropertyDescriptor, Properties } from 'hybrids';

const styles = html`
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

interface UeButtonProps extends Properties {
    label: PropertyDescriptor<string, UeButtonProps>;
    active: boolean;
    checkable: boolean;
    checked: boolean;
    disabled: boolean;
    focused: boolean;
}

export default {
    label: 'Button',
    active: false,
    checkable: false,
    checked: false,
    disabled: false,
    focused: false,
    render: lit(host => {
        const { active, checkable, checked, disabled, focused } = host;
        return html`
            ${styles}
            <div
                tabindex="0"
                class=${classMap({ active, checked, disabled, focused })}
                @mouseover=${e => {
                    e.target.focus();
                }}
                @mousedown=${() => {
                    host.active = true;
                }}
                @mouseleave=${e => {
                    e.target.blur();
                }}
                @mouseup=${() => {
                    host.active = false;
                    host.checked = checkable ? !checked : false;
                }}
                @focus=${() => {
                    host.focused = true;
                }}
                @blur=${() => {
                    host.focused = host.active = false;
                }}
            >
                <ue-text .innerHTML=${host.label}></ue-text>
            </div>
        `;
    })
} as Hybrid<UeButtonProps>;
