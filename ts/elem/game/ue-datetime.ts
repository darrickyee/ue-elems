import { bindParent } from '../../lib/hybrids';
import { html, lit } from '../../lib/lit';
import UeGameState from './ue-game-state';

export default {
    ...bindParent(UeGameState, ['datetime']),
    render: lit(
        ({ datetime: { day, time } }: any) => html`
            <ue-text>${day}: ${time}</ue-text>
        `
    )
};
