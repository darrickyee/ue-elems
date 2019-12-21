import { lit, html } from '../../lib/lit';
import { bindParent } from '../../lib/hybrids';
import UeGameState, { action } from './ue-game-state';

const styles = html`
    <style>
        :host {
            font-size: 2em;
        }

        .container {
            width: 100%;
        }

        @keyframes fadeInOut {
            0% {
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        ue-text {
            transform: translateX(-50%);
        }

        .show {
            animation-name: fadeInOut;
            animation-duration: 5s;
            animation-iteration-count: infinite;
        }
    </style>
`;

export default {
    ...bindParent(UeGameState, ['announce']),
    render: lit(
        (host: { announce: string[] }) => html`
            ${styles}
            <div class="container">
                ${host.announce.length
                    ? html`
                          <ue-text
                              class="show"
                              @animationiteration=${() => {
                                  action('REMOVE_ANNOUNCE');
                              }}
                              >${host.announce[0]}</ue-text
                          >
                      `
                    : html``}
            </div>
        `
    )
};
