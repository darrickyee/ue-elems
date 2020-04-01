import { lit, html } from '../lib/lit';
import { define } from 'hybrids';
import { listen } from '../lib/util';

const inPath = (selector, path) => path.some(el => (el.matches ? el.matches(selector) : false));

function show(host, event) {
    if (!host.active) {
        host.pos = [event.clientX, event.clientY];
        host.active = true;
    }
}

function hide(host, event) {
    host.active = false;
}

const properties = {
    pos: [0, 0],
    delay: 1,
    active: {
        connect: (host, key, invalidate) => {
            const parent = host.parentElement;
            if (parent) {
                const stopshow = listen(parent, 'mouseover', e => show(host, e));
                const stophide = listen(parent, 'mouseout', e => hide(host, e));
                return () => {
                    stopshow();
                    stophide();
                };
            }
        }
    }
};

const template = host => html`
    <style>
        div {
            height: auto;
            width: auto;
            position: fixed;
            border: 1px solid black;
            background-color: var(--ue-bg-color);
        }
    </style>
    ${host.active
        ? html`
              <div style="left: ${host.pos[0]}px; top: ${host.pos[1]}px">
                  <slot></slot>
              </div>
          `
        : html``}
`;

export const UeTooltip = define('ue-tooltip', { ...properties, render: lit(template) });
