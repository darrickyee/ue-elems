import { lit, html } from '../lib/lit';
import { reflect } from '../lib/util';
import { define } from 'hybrids';

// Cartesian product w/ self
const AxA = (arr: number[]) => [].concat(...arr.map(i => arr.map(j => [i, j])));
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

const styles = html`
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

const template = host => html`
    ${styles}
    <div style="text-shadow: ${shadowStyle(host)};"><slot></slot></div>
`;

export const UeText = define('ue-text', {
    ...properties,
    render: lit(template)
});

export { shadowStyle };
