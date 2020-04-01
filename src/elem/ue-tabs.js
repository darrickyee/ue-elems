import { lit, html, classMap } from '../lib/lit';
import { SingleSelectGroup, buttonList } from './ue-group';
import { define } from 'hybrids';
import { reflect } from '../lib/util';
const hostFlex = {
    left: 'row',
    right: 'row-reverse',
    top: 'column',
    bottom: 'column-reverse'
};
const properties = Object.assign(Object.assign({}, SingleSelectGroup), { location: reflect('location', 'left'), direction: host => (['left', 'right'].includes(host.location) ? 'column' : 'row') });
const styles = html `
    <style>
        :host {
            display: block;
        }

        ue-button {
            padding: 0;
        }

        div {
            display: flex;
        }

        .left {
            flex-direction: row;
        }

        .right {
            flex-direction: row-reverse;
        }

        .top {
            flex-direction: column;
        }

        .bottom {
            flex-direction: column-reverse;
        }
    </style>
`;
const template = host => html `
        ${styles}
        <div class=${classMap({ [host.location]: true })}>
            <div style="flex-direction: ${host.direction};">${buttonList(host)}</div>
            <slot></slot>
        </div>
    `;
export const UeTabGroup = define('ue-tab-group', Object.assign(Object.assign({}, properties), { render: lit(template) }));
//# sourceMappingURL=ue-tabs.js.map