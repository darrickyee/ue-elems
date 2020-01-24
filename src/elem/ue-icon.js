import { lit, html } from '../lib/lit';
const sizes = {
    small: 32,
    medium: 64,
    large: 96,
    xlarge: 128
};
function getSize(size) {
    return parseFloat(size) || sizes[size];
}
const styles = host => {
    return html `
        <style>
            :host {
                width: ${getSize(host.size) || 64}px;
                height: ${getSize(host.size) || 64}px;
            }
            #bg {
                background-color: var(--color-secondary);
                width: inherit;
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: circle(${getSize(host.size) / 2}px);
            }
            #fg {
                background-color: var(--color-primary);
                width: inherit;
                height: inherit;
                clip-path: circle(${getSize(host.size) / 2 - host.border}px);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `;
};
const properties = { border: 8, shape: 'circle', size: 'medium' };
const template = host => html `
        ${styles(host)}
        <div id="bg">
            <div id="fg">
                <slot></slot>
            </div>
        </div>
    `;
export default Object.assign(Object.assign({}, properties), { render: lit(template) });
//# sourceMappingURL=ue-icon.js.map