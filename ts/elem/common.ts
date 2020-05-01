import { html } from 'lit-html';

export const styleProps = {
    inverted: false,
    outlined: false,
    glow: false
}

export const defaultStyles = html`
    <style>
        * {
            outline: none;
        }

        :host([disabled]) {
            pointer-events: none;
        }

        :host {
            --ue-color-primary: #52d6f4;
            --ue-color-primary-text: #363538;
            --ue-background: transparent;

            --ue-default-c-dark: #363538;
            --ue-default-c-light: #f6f6f6;
            --ue-default-c-primary: #52d6f4;
            --ue-default-c-secondary: #408697;
            --ue-default-c-contrast: #8d8c8a;

            --ue-default-color: var(--ue-default-c-dark);
            --ue-default-background-color: var(--ue-default-c-light);
            --ue-default-border-color: var(--ue-default-c-dark);
            --ue-default-border-width: 1px;
            --ue-default-border-style: solid;
            --ue-default-border-radius: 0.5em;

            --ue-default-focus-color: var(--ue-default-c-primary);
            --ue-default-focus-background-color: var(--ue-default-c-light);
            --ue-default-focus-border-color: var(--ue-default-c-primary);
            --ue-default-focus-border-style: solid;

            --ue-default-active-color: var(--ue-default-c-secondary);
            --ue-default-active-background-color: var(--ue-default-c-light);
            --ue-default-active-border-color: var(--ue-default-c-secondary);
            --ue-default-active-border-style: solid;

            --ue-default-btn-width: 8em;
            --ue-default-btn-height: 2em;

            --ue-default-transition: background-color 0.25s, color 0.25s, transform 0.25s,
                border 0.25s;
        }

        .reverse {
            --ue-default-color: var(--ue-default-c-light);
            --ue-default-background-color: var(--ue-default-c-dark);
            --ue-default-border-color: var(--ue-default-c-dark);

            --ue-default-focus-color: var(--ue-default-c-light);
            --ue-default-focus-background-color: var(--ue-default-c-secondary);
            --ue-default-focus-border-color: var(--ue-default-c-secondary);
            --ue-default-focus-border-style: solid;

            --ue-default-active-color: var(--ue-default-c-light);
            --ue-default-active-background-color: var(--ue-default-c-primary);
            --ue-default-active-border-color: var(--ue-default-c-primary);
            --ue-default-active-border-style: solid;
        }
    </style>
`;
