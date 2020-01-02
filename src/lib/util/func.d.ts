/**
 * Compose unary functions left-to-right.
 *
 * `chain(fn1, fn2, fn3)(x)` is equivalent to `fn3(fn2(fn1(x)))`.
 *
 * @param fns
 */
export declare const chain: (...fns: Function[]) => (arg: any) => any;
/**
 * Partial function application to convert to a unary function.
 *
 * `unary(fn, a, b...)(arg)` is equivalent to `fn(arg, a, b...)`.
 *
 * @param fn
 * @param partArgs
 */
export declare const unary: (fn: Function, ...partArgs: any[]) => (arg: any) => any;
export declare const curry: (fn: any) => (...args: any[]) => any;
export declare const compose: (...fns: any[]) => (...args: any[]) => any;
