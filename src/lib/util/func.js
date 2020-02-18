export const curry = fn => function $c(...args) {
    return args.length < fn.length ? $c.bind(null, ...args) : fn.call(null, ...args);
};
export const compose = (...fns) => (...args) => fns.reduceRight((result, fn) => [fn.call(null, ...result)], args)[0];
export const pipe = (...fns) => (...args) => fns.reduce((result, fn) => [fn.call(null, ...result)], args)[0];
export const update = curry((index, value, array) => array.map((el, i) => i == index ? value : el));
//# sourceMappingURL=func.js.map