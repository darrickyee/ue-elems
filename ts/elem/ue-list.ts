import { html, lit } from '../lib/lit';
import { define, parent } from 'hybrids';
import { defaultStyles } from './common';
import { ItemGroup, selectSingle, singleSelectProp, Item } from './ue-items';

const properties = {
    ...ItemGroup,
    selected: singleSelectProp,
};

const itemTemplate = (item, _, itemArray) => {
    item.slot = item.selected ? 'selected-item' : '';
    return html`<ue-button .checked=${item.selected} @click=${() => selectSingle(itemArray, item)}
        >${item.label}</ue-button
    >`;
};

const template = ({ items }) =>
    html`
        ${defaultStyles}
        <style>
            #container {
                display: inline-flex;
            }
        </style>
        ${items.map(itemTemplate)}
    `;

export const UeList = define('ue-list', { ...properties, render: lit(template) });

const tabTmp = ({ items }) => html`${template({ items })} <slot name="selected-item"></slot>`;

export const UeTabList = define('ue-tab-list', { ...properties, render: lit(tabTmp) });

const setPos = host => {
    host.items.forEach((item, i) => {
        console.log(item);
        item.classList.add(`item-${i}`);
    });
};

const UeMsgT = {
    ...ItemGroup,
    render: lit(
        ({ items }) => html`
            <style>
                #container {
                    display: inline-flex;
                    flex-direction: column;
                    position: relative;
                    width: inherit;
                }
            </style>
            <div id="container">
                <slot></slot>
            </div>
        `
    ),
};

const UeMsgItemT = {
    ...Item,
    msg: parent(UeMsgT),
    index: host => host.msg.items.indexOf(host),
    render: lit(
        host => html`
            <style>
                @keyframes fadeinout {
                    0% {
                        opacity: 0;
                    }

                    10% {
                        opacity: 1;
                    }

                    80% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                    }
                }

                div {
                    animation: 3s linear fadeinout;
                    position: absolute;
                    transition: transform 1s;
                }
            </style>
            <div
                style="transform: translateY(${host.index * 100}%);"
                @animationend=${() => {
                    host.parentNode.removeChild(host);
                }}
            >
                <slot></slot>
            </div>
        `
    ),
};

const addMsg = msg => {
    const m = document.querySelector('ue-msg');
    const it = document.createElement('ue-msg-item');
    it.innerText = msg;
    m.appendChild(it);
};

Object.assign(window, { addMsg });

export const UeMsg = define('ue-msg', UeMsgT);
export const UeMsgItem = define('ue-msg-item', UeMsgItemT);
