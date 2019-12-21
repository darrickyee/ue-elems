import { bindParent } from '../../lib/hybrids';
import { html, lit } from '../../lib/lit';
import { parseColor } from '../../lib/ue4';
import UeGameState from './ue-game-state';

const styles = color => html`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #name {
            font-size: 1.5em;
            font-weight: bold;
            color: ${parseColor(color)};
        }
    </style>
`;

const template = ({
    name,
    color,
    actions
}: {
    name: string;
    color: number[];
    actions: { action: string; keys: string[] }[];
}) => html`
    ${styles(color)}
    <ue-text id="name">${name}</ue-text>
    <ue-text id="actions"
        >${actions.map(
            act =>
                html`
                    ${act.action} [${act.keys.join(', ')}]
                `
        )}</ue-text
    >
`;

export default {
    ...bindParent(UeGameState, ['target.name', 'target.color', 'target.actions']),
    render: lit(template)
};
