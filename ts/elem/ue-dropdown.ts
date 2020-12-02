import { lit, html, styleMap } from '../lib/lit';
import { define } from 'hybrids';
import { SingleSelectGroup, buttonList } from './ue-group';
import { listen } from '../lib/util';

const properties = {
    ...SingleSelectGroup,
    open: {
        connect: (host, key) => {
            host[key] = false;
        },
        observe: (host, value) => {
            if (value)
                return listen(
                    document,
                    'click',
                    () => {
                        host.open = false;
                    },
                    { once: true }
                );
        }
    }
};

const styles = html`
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
    const { open, selectedItem } = host;
    return html`
        ${styles}
        <div class="container" style=${styleMap(open ? openStyle : closeStyle)}>
            <ue-button
                .checked=${open}
                @click=${() => {
                    host.open = !open;
                }}
                >${selectedItem ? selectedItem.label : ''}<ue-icon></ue-icon
            ></ue-button>
        </div>
        <div class="container">
            <ue-drawer .open=${open} direction="down">
                <div style=${styleMap(open ? openStyle : closeStyle)}>
                    ${buttonList(host)}
                </div>
            </ue-drawer>
        </div>
    `;
};

export const UeDropdown = define(null, { ...properties, render: lit(template) });
