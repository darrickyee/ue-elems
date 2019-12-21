import { directive, html, render } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { until } from 'lit-html/directives/until';
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
    return (host) => {
        const template = fn(host);
        return (host, target) => render(template, target);
    };
};
export { classMap, directive, guard, html, lit, once, until };
//# sourceMappingURL=lit.js.map