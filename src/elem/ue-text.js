import { lit, html } from '../lib/lit';
const styles = html `
    <style>
        :host {
            display: grid;
        }

        .grid-1 {
            grid-column: 1;
            grid-row: 1;
        }

        .bg {
            -webkit-text-stroke-width: var(--text-outline-width);
            -webkit-text-stroke-color: black;
        }

        .fg {
            color: var(--text-color);
        }

        div {
            user-select: none;
            cursor: default;
        }
    </style>
`;
const observers = new WeakMap();
export default {
    slotHTML: {
        get: host => host.innerHTML,
        connect: (host, key, invalidate) => {
            // Create observer if it doesn't exist
            const observer = observers.get(host) || new MutationObserver(invalidate);
            observers.set(host, observer);
            observer.observe(host, { characterData: true, childList: true, subtree: true });
        }
    },
    render: lit(host => html `
            ${styles}
            <div class="grid-1 bg" .innerHTML=${host.slotHTML}></div>
            <div class="grid-1 fg" .innerHTML=${host.slotHTML}></div>
        `)
};
//# sourceMappingURL=ue-text.js.map