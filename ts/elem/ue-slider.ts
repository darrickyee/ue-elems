import { Properties, PropertyDescriptor, Hybrid, dispatch } from 'hybrids';
import { chain, clamp, getElement, remap, repeatUntil, round, unary, select } from '../lib/util';
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
            width: 0.5em;
            height: 200%;
            transform: translate(-50%, 0);
            background-color: var(--color-primary);
            border: 1px solid var(--color-dark);
            border-radius: 2px;
            position: relative;
        }
    </style>
`;

const initSlider = (target: Element, handleSelector: string = '.handle') => {
    const handle = target.querySelector(handleSelector);
    if (!handle) return;
    drag(handle);
};

export interface UeSliderProps extends Properties {
    min?: number;
    max?: number;
    step?: number;
    value?: PropertyDescriptor<number, UeSliderProps>;
}

const posToVal = (pos, { min = 0, max = 100, step = 1, clientWidth: width = 100 }) =>
    chain(
        unary(remap, { fromMax: width, toMin: min, toMax: max }),
        unary(clamp, min, max),
        unary(round, step)
    )(pos);

export default {
    min: 0,
    max: 100,
    step: 1,
    value: {
        get: (host, lastValue) => lastValue || 0,
        set: ({ step }, value) => round(value, step),
        observe: (host, value, lastValue) => {
            const { min, max, step } = host;
            dispatch(host, 'change', {
                bubbles: true,
                composed: true,
                detail: { value, min, max, step }
            });
        }
    },
    render: lit<UeSliderProps>(host => {
        const { min, max, value } = host;

        return html`
            ${styles}
            <div
                class="slider-bar"
                @click=${({ path, offsetX }) => {
                    if (path[0] === select('.slider-bar', host.shadowRoot))
                        host.value += Math.sign(posToVal(offsetX, host) - value) * host.step;
                }}
                @mousedown=${e => {
                    if (e.path[0] === select('.slider-bar', host.shadowRoot))
                        repeatUntil(
                            () =>
                                select('.slider-bar', host.shadowRoot).dispatchEvent(
                                    new MouseEvent('click', e)
                                ),
                            'mouseup',
                            250
                        );
                }}
            >
                <div
                    tabindex="0"
                    class="handle"
                    style="left: ${remap(value, {
                        fromMin: min,
                        fromMax: max,
                        toMin: 0,
                        toMax: 100
                    })}%"
                    @drag=${({ offsetX, target: { offsetLeft } }) => {
                        host.value = posToVal(offsetX + offsetLeft, host);
                    }}
                ></div>
            </div>
            ${once(() => {
                getElement('.slider-bar', host.shadowRoot)
                    .then(unary(initSlider, '.handle'))
                    .catch(console.log);
            })}
        `;
    })
} as Hybrid<UeSliderProps>;
