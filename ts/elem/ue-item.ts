import { lit, html } from '../lib/lit';
import { reflect } from '../lib/util';
import { define } from 'hybrids';

const BaseItem = {
    active: true,
    selected: true
};

const ListItem = {
    ...BaseItem,
    label: ({ innerText }) => innerText,
    render: lit(
        () =>
            html`
                <slot></slot>
            `
    )
};

const ContentItem = {
    ...BaseItem,
    label: reflect('label', ''),
    render: lit(
        ({ selected }) => html`
            <style>
                :host {
                    flex-grow: ${selected ? 1 : 0};
                }
            </style>
            ${selected
                ? html`
                      <slot></slot>
                  `
                : html``}
        `
    )
};

export const UeListItem = define('ue-list-item', ListItem);
export const UeContentItem = define('ue-content-item', ContentItem);
