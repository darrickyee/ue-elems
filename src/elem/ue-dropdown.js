import { lit, html, styleMap } from '../lib/lit';
import { define } from 'hybrids';
import { SingleSelectGroup, buttonList } from './ue-group';
import { listen } from '../lib/util';
const properties = Object.assign(Object.assign({}, SingleSelectGroup), { expand: {
        connect: (host, key) => {
            host[key] = false;
        },
        observe: (host, value) => {
            if (value)
                return listen(document, 'click', () => {
                    host.expand = false;
                }, { once: true });
        }
    } });
const styles = html `
    <style>
        :host {
            display: flex;
            flex-direction: column;
            font-size: 0.8em;
        }

        ue-button {
            padding: 0;
        }

        ue-icon {
            position: absolute;
            height: 0.8em;
            width: 0.8em;
            right: 0.1em;
        }

        svg {
            position: absolute;
        }

        .container {
            position: relative;
        }
    </style>
`;
const closeStyle = {
    border: '1px solid transparent'
};
const openStyle = {
    border: '1px solid var(--ue-active-bg-color)'
};
const template = host => {
    const { expand, items, selectedItem } = host;
    return html `
        ${styles}
        <div class="container" style=${styleMap(expand ? openStyle : closeStyle)}>
            <ue-button
                .checked=${expand}
                @click=${() => {
        host.expand = !expand;
    }}
                >${selectedItem ? selectedItem.label : ''}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .expand=${expand} direction="down">
                <div style=${styleMap(expand ? openStyle : closeStyle)}>
                    ${buttonList(host)}
                </div>
            </ue-drawer>
        </div>
    `;
};
export const UeDropdown = define('ue-dropdown', Object.assign(Object.assign({}, properties), { render: lit(template) }));
//# sourceMappingURL=ue-dropdown.js.map