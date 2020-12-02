import { lit, html } from '../lib/lit';
import { curry, reflect } from '../lib/util';
import { children, define, dispatch, Descriptor, property } from 'hybrids';

const Item = {
    _ue_item: true,
    active: reflect('active', true),
    selected: reflect('selected', false),
};

const ListItem = {
    ...Item,
    value: reflect('value', ''),
    label: host => host.getAttribute('label') || host.innerText,
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
};

const singleSelectProp: Descriptor<
    HTMLElement & { items: (HTMLElement & { selected: boolean })[] }
> = {
    get: ({ items }) => items.findIndex(item => item.selected),
    observe: (host, value) => {
        dispatch(host, 'selected', {
            bubbles: true,
            composed: true,
            detail: { index: value, item: host.items[value] || null },
        });
    },
};

const selectSingle = curry((itemArray, item) => {
    itemArray.forEach(i => {
        i.selected = i === item;
    });
});

export const UeListItem = define(null, ListItem);
export const UeContentItem = define(null, ContentItem);
export { Item, ItemGroup, selectSingle, singleSelectProp };
