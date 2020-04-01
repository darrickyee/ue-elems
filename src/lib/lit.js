import { directive, render } from 'lit-html';
export { html, svg } from 'lit-html';
export { classMap } from 'lit-html/directives/class-map';
export { guard } from 'lit-html/directives/guard';
export { styleMap } from 'lit-html/directives/style-map';
export { until } from 'lit-html/directives/until';
const hasRun = new WeakSet();
/**
 * lit-html directive to run a function once on first render.
 *
 * @param fn
 */
const once = directive((fn) => (part) => {
    if (hasRun.has(part))
        return;
    part.setValue(fn());
    hasRun.add(part);
});
const lit = (fn) => {
    return host => {
        const template = fn(host);
        return (host, target) => render(template, target);
    };
};
export { directive, lit, once };
//# sourceMappingURL=lit.js.map