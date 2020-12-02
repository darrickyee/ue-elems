import { html, lit } from '../lib/lit';
import { clamp, reflect } from '../lib/util';
import { define, dispatch } from 'hybrids';
import { defaultStyles } from './common';

const properties = {
    // value: {
    //     get: (host, lastValue) => lastValue || 0,
    //     set: (host, value, lastValue) => {
    //         if (value !== lastValue) dispatch(host, 'change');
    //         if (value >= 100) dispatch(host, 'full');
    //         return value;
    //     }
    // },
    value: {
        ...reflect('value', 0),
        observe: (host, value, lastValue) => {
            if (value !== lastValue)
                dispatch(host, 'change', { bubbles: true, composed: true, detail: { value } });
        }
    },
    duration: reflect('duration', 1),
    delay: reflect('delay', 0)
};

const template = host => {
    const { value, duration, delay } = host;
    return html`
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

export const UeProgressBar = define(null, { ...properties, render: lit(template) });
