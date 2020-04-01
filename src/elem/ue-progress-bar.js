import { html, lit } from '../lib/lit';
import { clamp } from '../lib/util/index';
import { define, dispatch } from 'hybrids';
const properties = {
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
const template = host => {
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
export const UeProgressBar = define('ue-progress-bar', Object.assign(Object.assign({}, properties), { render: lit(template) }));
//# sourceMappingURL=ue-progress-bar.js.map