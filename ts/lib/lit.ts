import { directive, Part, render, TemplateResult, RenderOptions } from 'lit-html';
export { html, svg } from 'lit-html';
export { classMap } from 'lit-html/directives/class-map';
export { guard } from 'lit-html/directives/guard';
export { styleMap } from 'lit-html/directives/style-map';
export { until } from 'lit-html/directives/until';

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

const lit = (fn: (host: any) => TemplateResult, options: Partial<RenderOptions> = {}) => {
    return host => {
        const template = fn(host);
        return (_, target) => render(template, target, options);
    };
};

export { directive, lit, once };
