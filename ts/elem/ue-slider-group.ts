import { html, lit } from '../lib/lit';
import { update } from '../lib/util';

const styles = html`
    <style>
        #group {
            display: flex;
            flex-direction: column;
            padding: 2px;
            justify-content: center;
            width: inherit;
        }
        ue-slider {
            margin-bottom: 8px;
        }
    </style>
`;

const properties = {
    label: '',
    min: 0,
    max: 100,
    step: 1,
    axislabels: ['X', 'Y', 'Z'],
    values: [],
    defaultValues: []
};

const template = (host: typeof properties) => {
    const { label, min, max, step, axislabels, values, defaultValues } = host;
    return html`
        ${styles}
        ${values.map(
            (val, index) =>
                html`
                    <ue-slider-widget
                        .label="${label} ${axislabels[index] === undefined
                            ? ''
                            : axislabels[index]}"
                        .min=${min}
                        .max=${max}
                        .step=${step}
                        .value=${val}
                        .defaultValue=${defaultValues[index] === undefined
                            ? val
                            : defaultValues[index]}
                        @change=${e => {
                            host.values = update(index, e.target.value, values);
                            Object.assign(e.detail, { index, group: label, values: host.values });
                        }}
                    ></ue-slider-widget>
                `
        )}
    `;
};

export default {
    ...properties,
    render: lit(template)
};
