import { bindParent } from '../../lib/hybrids';
import { html, lit } from '../../lib/lit';
import UeGameState from './ue-game-state';

export default {
    ...bindParent(UeGameState, ['location']),
    render: lit(
        ({ location }: any) =>
            html`
                <ue-text>${location.map(i => i.toFixed(2)).join(', ')}</ue-text>
            `
    )
};
