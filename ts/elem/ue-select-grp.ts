import { lit, html } from '../lib/lit';
import { define } from 'hybrids';
import { SingleSelectGroup, buttonList } from './ue-group';
import { reflect } from '../lib/util';

const properties = {
    ...SingleSelectGroup,
    direction: reflect('direction', 'column'),
};

const styles = html`
    <style>
        :host {
            display: flex;
        }

        ue-button {
            padding: 0;
        }
    </style>
`;

export const UeSelectGrp = define(null, {
    ...properties,
    render: lit(
        host =>
            html`
                ${styles}
                <div style="display: flex; flex-direction: ${host.direction}">
                    ${buttonList(host)}
                </div>
            `
    ),
});
