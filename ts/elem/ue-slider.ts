import { dispatch, define } from 'hybrids';
import { clamp, roundTo, pipe, remap, curry, reflect } from '../lib/util/index';
import { html, lit } from '../lib/lit';
import { defaultStyles } from './common';
import shft from 'shftjs';
const { drag } = shft;

/********** Utility functions **********/

const posToVal = ({ min = 0, max = 100, step = 1, clientWidth: width = 100 }) =>
    pipe(remap(0, width)(min, max), clamp(min, max), roundTo(step));

const increment = curry((host, pos) =>
    posToVal(host)(pos) < host.value ? -host.step : posToVal(host)(pos) > host.value ? host.step : 0
);

const styles = html`
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
`;

const properties = {
    min: reflect('min', 0),
    max: reflect('max', 100),
    step: reflect('step', 1),
    value: {
        ...reflect('value', 0),
        observe: (host, value) => {
            dispatch(host, 'change', { bubbles: true, composed: true, detail: { value } });
        },
    },
    bar: {
        get: ({ render }) => {
            const target = render();
            return target.querySelector('.slider-bar');
        },
        observe: (_, value, lastValue) => {
            if (value && value !== lastValue) drag(value);
        },
    },
};

const _dragHandle = (host, { clientX }) => {
    const offsetX = clientX - host.getBoundingClientRect().left;
    const { min, max, step, clientWidth } = host;
    host.value = clamp(min, max, roundTo(step, remap(0, clientWidth, min, max, offsetX)));
};

const template = host => {
    const { min, max, value, clientWidth } = host;

    return html`
        ${defaultStyles} ${styles}
        <div
            class="slider-bar"
            @drag=${e => _dragHandle(host, e)}
            @mousedown=${e => _dragHandle(host, e)}
        >
            <div
                tabindex="0"
                class="handle"
                style="transform: translateX(${clamp(
                    0,
                    clientWidth,
                    remap(min, max, 0, clientWidth, value)
                )}px) translateX(-50%);"
            ></div>
        </div>
    `;
};

export const UeSlider = define(null, {
    ...properties,
    render: lit(template),
});
