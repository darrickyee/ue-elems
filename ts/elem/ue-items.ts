import { lit, html } from '../lib/lit';
import { reflect } from '../lib/util';
import { children, define } from 'hybrids';

const Item = {
    _ue_item: true,
    active: reflect('active', true),
    selected: reflect('selected', false),
};

const ListItem = {
    ...Item,
    value: reflect('value', ''),
    render: lit(() => html`<slot></slot>`),
};

const ContentItem = {
    ...Item,
    icon: reflect('icon', ''),
    label: reflect('label', ''),
    render: lit(({ active }) => html`${active ? html`<slot></slot>` : html``}`),
};

const ItemGroup = {
    items: children(el => el['_ue_item'] !== undefined),
    selected: ({ items }) => items.filter(item => item.selected),
    active: ({ items }) => items.filter(item => item.active),
    selectedIdx: ({ items }) =>
        items.filter(item => item.selected).map(item => items.indexOf(item)),
    activeIdx: ({ items }) => items.filter(item => item.active).map(item => items.indexOf(item)),
};

export const UeListItem = define('ue-list-item', ListItem);
export const UeContentItem = define('ue-content-item', ContentItem);
export { Item, ItemGroup };
