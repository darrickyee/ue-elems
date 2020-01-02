/**
 * Compose unary functions left-to-right.
 *
 * `chain(fn1, fn2, fn3)(x)` is equivalent to `fn3(fn2(fn1(x)))`.
 *
 * @param fns
 */
export const chain = (...fns: Function[]) => arg =>
    fns.reduce((result, fn) => fn.call(null, result), arg);

/**
 * Partial function application to convert to a unary function.
 *
 * `unary(fn, a, b...)(arg)` is equivalent to `fn(arg, a, b...)`.
 *
 * @param fn
 * @param partArgs
 */
export const unary = (fn: Function, ...partArgs: any[]) => arg => fn.call(null, arg, ...partArgs);

export const curry = fn =>
    function $c(...args) {
        return args.length < fn.length ? $c.bind(null, ...args) : fn.call(null, ...args);
    };

export const compose = (...fns) => (...args) =>
    fns.reduceRight((result, fn) => [fn.call(null, ...result)], args)[0];
