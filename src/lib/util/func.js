export const curry = fn => function $c(...args) {
    return args.length < fn.length ? $c.bind(null, ...args) : fn.call(null, ...args);
};
export const compose = (...fns) => (...args) => fns.reduceRight((result, fn) => [fn.call(null, ...result)], args)[0];
export const pipe = (...fns) => (...args) => fns.reduce((result, fn) => [fn.call(null, ...result)], args)[0];
//# sourceMappingURL=func.js.map