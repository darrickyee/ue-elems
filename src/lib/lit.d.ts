import { directive, html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { until } from 'lit-html/directives/until';
/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
declare const once: (fn: () => unknown) => (part: any) => void;
declare const lit: (fn: (host: any) => TemplateResult) => (host: any) => (host: any, target: any) => void;
export { classMap, directive, guard, html, lit, once, until };
