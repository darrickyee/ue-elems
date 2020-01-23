import { dispatch } from 'hybrids';
import { clamp, findElement, roundTo, select, repeatUntil, pipe, remap, curry } from '../lib/util';
import { html, lit, once } from '../lib/lit';
import shft from 'shftjs';
const { drag } = shft;

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
            height: 50%;
            background-color: var(--bg-color-light);
            touch-action: none;
            display: flex;
            align-items: center;
        }

        .handle {
            cursor: default;
            width: 0.8em;
            height: 300%;
            transform: translate(-50%, 0);
            background-color: var(--color-primary);
            border: 1px solid var(--color-dark);
            border-radius: 2px;
            position: relative;
        }
    </style>
`;

const posToVal = ({ min = 0, max = 100, step = 1, clientWidth: width = 100 }) =>
    pipe(remap(0, width)(min, max), clamp(min, max), roundTo(step));

const increment = curry((host, pos) =>
    posToVal(host)(pos) < host.value ? -host.step : posToVal(host)(pos) > host.value ? host.step : 0
);

export default {
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
    },
    render: lit(host => {
        const { min, max, value } = host;

        return html`
            ${styles}
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
                    .then(drag)
                    .catch(console.log);
            })}
        `;
    })
};
