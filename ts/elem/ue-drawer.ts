import { classMap, html, lit } from '../lib/lit';
import { reflect } from '../lib/util';
import { define } from 'hybrids';

const properties = {
    open: false,
    direction: reflect('direction', 'right'),
    duration: reflect('duration', 0.2)
};

const styles = html`
    <style>
        :host {
            display: block;
            overflow: hidden;
            position: absolute;
        }

        .left {
            transform: translate(110%, 0);
            flex-direction: row-reverse;
        }

        .right {
            transform: translate(-110%, 0);
            flex-direction: row;
        }

        .down {
            transform: translate(0, -110%);
            flex-direction: column;
        }

        .right {
            transform: translate(0, 110%);
            flex-direction: column-reverse;
        }

        div {
            display: flex;
            align-items: center;
        }

        .open {
            transform: translate(0, 0);
        }
    </style>
`;

const template = ({ direction, duration, open }) =>
    html`
        ${styles}
        <div
            class=${classMap({ open, [direction]: true })}
            style="transition: transform ${duration}s;"
        >
            <slot></slot>
        </div>
    `;

export const UeDrawer = define('ue-drawer', { ...properties, render: lit(template) });
