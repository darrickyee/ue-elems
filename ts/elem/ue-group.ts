import { html } from '../lib/lit';
import { children, dispatch } from 'hybrids';
import { curry, reflect } from '../lib/util';

const hasProps = curry((propList: string[], hybrid) =>
    propList.every(hybrid.hasOwnProperty, hybrid)
);

const singleSelect = {
    get: ({ items }, lastValue) => items.map(item => item.selected).indexOf(true),
    set: ({ items }, value) =>
        items.map((item, index) => (item.selected = index === value)).indexOf(true),
    connect: (host, key) => {
        host[key] = host.preselect || 0;
    },
    observe: (host, selected) => {
        const { items } = host;
        console.log(`changed to ${selected}`);

        if (items[selected])
            dispatch(host, 'changed', {
                bubbles: true,
                composed: true,
                detail: {
                    index: selected,
                    label: items[selected].label,
                    item: items[selected],
                },
            });
    },
};

const BaseGroup = {
    items: children(el => el['ueItem']),
};

export const SingleSelectGroup = {
    ...BaseGroup,
    preselect: reflect('preselect', 0),
    selected: singleSelect,
    selectedItem: ({ items }) => items.find(item => item.selected),
};

export const itemList = curry(
    (itemTemplate, host) => html` ${host.items.map(itemTemplate(host))} `
);

export const buttonItemTemplate = host => ({ selected, innerText }, index) => html`
    <ue-button
        .checked=${selected}
        @click=${() => {
            host.selected = index;
        }}
        style="pointer-events: ${selected ? 'none' : 'inherit'}"
    >
        <slot name="item-label-${index}">${innerText}</slot>
    </ue-button>
`;

export const buttonList = itemList(buttonItemTemplate);
