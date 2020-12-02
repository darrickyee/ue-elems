import { classMap, html, lit, styleMap } from '../lib/lit';
import { reflect } from '../lib/util';
import { define } from 'hybrids';

const properties = {
    open: reflect('open', false),
    direction: reflect('direction', 'right'),
    duration: reflect('duration', 500),
};

const styles = html`
    <style>
        :host {
            display: inline-flex;
            overflow: hidden;
            position: absolute;
            background-color: transparent;
        }

        div {
            display: flex;
            align-items: center;
        }
    </style>
`;

const flexdirs = {
    left: 'row-reverse',
    right: 'row',
    down: 'column',
    up: 'column-reverse',
};

const transforms = {
    left: 'translate(110%, 0)',
    right: 'translate(-110%, 0)',
    down: 'translate(0, -110%)',
    up: 'translate(0, 110%)',
};

const getStyle = ({ direction, duration, open }) => ({
    transition: `transform ${duration}ms`,
    flexDirection: flexdirs[direction],
    transform: open ? 'translate(0, 0)' : transforms[direction],
});

const template = ({ direction, duration, open }) =>
    html`
        ${styles}
        <div style=${styleMap(getStyle({ direction, duration, open }))}>
            <slot></slot>
        </div>
    `;

export const UeDrawer = define(null, { ...properties, render: lit(template) });
