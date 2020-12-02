import { lit, html, styleMap } from '../lib/lit';
import { SingleSelectGroup, buttonList } from './ue-group';
import { define, property } from 'hybrids';
import { reflect } from '../lib/util';

const properties = {
    ...SingleSelectGroup,
    location: reflect('location', 'left')
};

const styles = html`
    <style>
        :host {
            display: flex;
            flex-direction: column;
        }

        :host([location='left']) {
            flex-direction: row;
        }

        :host([location='right']) {
            flex-direction: row-reverse;
        }

        :host([location='bottom']) {
            flex-direction: column-reverse;
        }

        ue-button {
            margin: 0.25em;
        }

        div {
            display: flex;
        }
    </style>
`;

const template = host =>
    html`
        ${styles}
        <div
            style="flex-direction: ${['left', 'right'].includes(host.location) ? 'column' : 'row'};"
        >
            ${buttonList(host)}
        </div>
        <slot></slot>
    `;

export const UeTabGroup = define(null, { ...properties, render: lit(template) });
