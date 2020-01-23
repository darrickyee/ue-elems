import { classMap, lit, html } from '../lib/lit';
import { dispatch } from 'hybrids';
import { selectAll } from '../lib/util';

// Figure out how to set initial checked state

const styles = html`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2px;
        }

        ue-button {
            width: inherit;
        }

        .left {
            --btn-justify-content: left;
        }
    </style>
`;

export default {
    buttons: [],
    checkable: false,
    singlecheck: false,
    items: host => selectAll('ue-button', host.shadowRoot),
    checkedItems: {
        get: ({ items }) =>
            (items as any[]).filter((btn: any) => btn.checked).map((btn: any) => btn.index),
        set: ({ items }, value: number[]) => {
            (items as any[]).forEach((btn, index) => {
                btn.checked = value.includes(index);
            });
            return value;
        }
    },
    left: false,
    render: lit(host => {
        const { buttons, left, checkable, singlecheck } = host;
        return html`
            ${styles}
            ${buttons.map(
                ({ label, checked, disabled }, index) =>
                    html`
                        <ue-button
                            class=${classMap({ left })}
                            .index=${index}
                            .checkable=${checkable}
                            .disabled=${disabled}
                            @click=${({ target }) => {
                                const opts = {
                                    bubbles: true,
                                    composed: true,
                                    detail: { ...target, label }
                                };

                                dispatch(host, 'buttonclick', opts);
                                if (singlecheck) host.checkedItems = [index];
                            }}
                            ><ue-text .innerHTML=${label}></ue-text
                        ></ue-button>
                    `
            )}
        `;
    })
};
