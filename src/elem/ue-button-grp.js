import { classMap, lit, html } from '../lib/lit';
import { dispatch } from 'hybrids';
const styles = html `
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
    left: false,
    render: lit(host => {
        const { buttons, left, checkable, singlecheck } = host;
        return html `
            ${styles}
            ${buttons.map(({ label, checked, disabled }, index) => html `
                        <ue-button
                            class=${classMap({ left })}
                            .checkable=${checkable}
                            .label=${label}
                            .checked=${checkable && !disabled ? checked : false}
                            @click=${e => {
            const { checked, disabled, label } = e.target;
            const opts = {
                bubbles: true,
                composed: true,
                detail: { index, label, checked, disabled }
            };
            dispatch(host, 'buttonclick', opts);
        }}
                        ></ue-button>
                    `)}
        `;
    })
};
//# sourceMappingURL=ue-button-grp.js.map