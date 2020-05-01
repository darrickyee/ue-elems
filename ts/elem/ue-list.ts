import { html, lit } from '../lib/lit';
import { reflect } from '../lib/util';
import { define, dispatch } from 'hybrids';
import { defaultStyles } from './common';
import { ItemGroup } from './ue-items';

const properties = { ...ItemGroup, multi: reflect('multi', false) };

const select = (host, item) => {
    if (host.multi) item.selected = !item.selected;
    else
        host.items.forEach(i => {
            i.selected = i === item;
        });
    dispatch(host, 'changed', { bubbles: true, composed: true, detail: host });
};

const template = host =>
    html`
        ${defaultStyles}
        <div>
            ${host.items.map(
                item =>
                    html`
                        <ue-button .checked=${item.selected} @click=${() => select(host, item)}
                            >${item.innerText}</ue-button
                        >
                    `
            )}
        </div>
    `;

export const UeList = define('ue-list', { ...properties, render: lit(template) });
