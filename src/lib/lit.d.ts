import { directive, TemplateResult } from 'lit-html';
export { html, svg } from 'lit-html';
export { classMap } from 'lit-html/directives/class-map';
export { guard } from 'lit-html/directives/guard';
export { styleMap } from 'lit-html/directives/style-map';
export { until } from 'lit-html/directives/until';
/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
declare const once: (fn: () => unknown) => (part: any) => void;
declare const lit: (fn: (host: any) => TemplateResult) => (host: any) => (host: any, target: any) => void;
export { directive, lit, once };
