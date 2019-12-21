export declare const capitalize: (s: string) => string;
/**
 * Clamps `value` to a range of `min` to `max`.
 *
 * @param value
 * @param min
 * @param max
 */
export declare const clamp: (value: number, min?: number, max?: number) => number;
/**
 * Remaps `val` from the range specified by `valMin` and `valMax` to the range specified by `outMin` and `outMax`.
 *
 * @param val Input value to be remapped.
 * @param fromMin Minimum of input value range (default = 0).
 * @param fromMax Maximum of input value range (default = 1).
 * @param toMin Minimum of output value range (default = 0).
 * @param toMax Maximum of output value range (default = 1).
 */
export declare const remap: (val: number, { fromMin, fromMax, toMin, toMax }: {
    fromMin?: number;
    fromMax?: number;
    toMin?: number;
    toMax?: number;
}) => number;
export declare const round: (value: number, step?: number) => number;
export declare const getprop: (obj: object, path: string | string[]) => any;
