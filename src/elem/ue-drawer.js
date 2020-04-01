import { classMap, html, lit } from '../lib/lit';
import { reflect } from '../lib/util';
import { define } from 'hybrids';
const properties = {
    expand: false,
    direction: reflect('direction', 'right'),
    duration: reflect('duration', 0.2)
};
const styles = html `
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

        .expand {
            transform: translate(0, 0);
        }
    </style>
`;
const template = ({ direction, duration, expand }) => html `
        ${styles}
        <div
            class=${classMap({ expand, [direction]: true })}
            style="transition: transform ${duration}s;"
        >
            <slot></slot>
        </div>
    `;
export const UeDrawer = define('ue-drawer', Object.assign(Object.assign({}, properties), { render: lit(template) }));
//# sourceMappingURL=ue-drawer.js.map