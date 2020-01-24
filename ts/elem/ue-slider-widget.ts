import { lit, html } from '../lib/lit';

const styles = html`
    <style>
        :host {
            display: flex;
            min-width: 200px;
            align-items: center;
            font-size: 0.8em;
        }

        #label {
            width: 20%;
            flex-shrink: 0;
            flex-grow: 0;
            margin-right: 0.5em;
        }

        #value {
            width: 2.5em;
            margin-left: 0.5em;
            justify-content: center;
        }

        ue-slider {
            flex-grow: 1;
            flex-shrink: 0;
        }

        ue-button {
            width: 2em;
            flex-grow: 0;
            flex-shrink: 0;
            margin: 2px;
            font-size: inherit;
        }
    </style>
`;

const properties = { label: '', min: 0, max: 100, step: 1, value: 0, defaultValue: 0 };

const template = host => {
    const { label, min, max, step, value, defaultValue } = host;
    return html`
        ${styles}
        ${label
            ? html`
                  <ue-text id="label">${label}</ue-text>
              `
            : html``}
        <ue-slider
            .min=${min}
            .max=${max}
            .step=${step}
            .value=${value}
            @change=${e => {
                host.value = e.target.value;
            }}
        ></ue-slider>
        <ue-text id="value">${value}</ue-text>
        <ue-button
            @click=${() => {
                host.value = defaultValue;
            }}
            ><ue-text>R</ue-text></ue-button
        >
        <ue-button
            @click=${() => {
                host.value = 0;
            }}
            ><ue-text>0</ue-text></ue-button
        >
    `;
};

export default {
    ...properties,
    render: lit(template)
};
