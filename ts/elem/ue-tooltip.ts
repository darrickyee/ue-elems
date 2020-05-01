import { lit, html } from '../lib/lit';
import { define, parent } from 'hybrids';
import { listen, reflect } from '../lib/util';
import tippy from 'tippy.js';

const TOOLTIPS = new WeakMap();

function show(host, event) {
    if (host.target) {
        TOOLTIPS.set(host.target, tippy(host.target, host));
    }
}

function hide(host, event) {
    if (host.target && TOOLTIPS.has(host.target)) {
        TOOLTIPS.get(host.target).destroy();
    }
}

const properties = {
    for: reflect('for', ''),
    target: {
        get: host => (host.for ? document.querySelector(host.for) : host.parentElement),
        connect: host => {
            const pop = tippy(host.target as Element, {
                content: host.firstChild,
                allowHTML: true,
                followCursor: 'initial',
                interactive: true,
                trigger: 'click'
            });
            return pop.destroy;
        },
    },
};

const template = () => html`
    <style>
        div {
            height: auto;
            width: auto;
            position: fixed;
            border: 1px solid black;
            background-color: var(--ue-bg-color);
        }
    </style>
`;

export const UeTooltip = define('ue-tooltip', { ...properties, render: lit(template) });
