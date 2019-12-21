import { directive, html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { until } from 'lit-html/directives/until';
import { HybridElement, Properties, RenderCallback } from 'hybrids';
/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
declare const once: (fn: () => unknown) => (part: any) => void;
declare const lit: <T extends Properties = Properties>(fn: (host: HybridElement<T>) => TemplateResult) => RenderCallback<T>;
export { classMap, directive, guard, html, lit, once, until };
