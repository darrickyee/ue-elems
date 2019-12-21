import { directive, html, Part, render, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { until } from 'lit-html/directives/until';
import { HybridElement, Properties, RenderCallback } from 'hybrids';

const hasRun = new WeakSet<Part>();

/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
const once = directive((fn: () => unknown) => (part: any): void => {
    if (hasRun.has(part)) return;
    part.setValue(fn());
    hasRun.add(part);
});

const lit = <T extends Properties = Properties>(
    fn: (host: HybridElement<T>) => TemplateResult
): RenderCallback<T> => {
    return (host: HybridElement<T>) => {
        const template = fn(host);
        return (host: HybridElement<T>, target: Element) => render(template, target);
    };
};

export { classMap, directive, guard, html, lit, once, until };
