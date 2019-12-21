export const capitalize = (s) => '' + s[0].toUpperCase() + s.slice(1);
/**
 * Clamps `value` to a range of `min` to `max`.
 *
 * @param value
 * @param min
 * @param max
 */
export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(value, max));
/**
 * Remaps `val` from the range specified by `valMin` and `valMax` to the range specified by `outMin` and `outMax`.
 *
 * @param val Input value to be remapped.
 * @param fromMin Minimum of input value range (default = 0).
 * @param fromMax Maximum of input value range (default = 1).
 * @param toMin Minimum of output value range (default = 0).
 * @param toMax Maximum of output value range (default = 1).
 */
export const remap = (val, { fromMin = 0, fromMax = 1, toMin = 0, toMax = 1 }) => ((val - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
export const round = (value, step = 1) => {
    const decimals = step.toString().split('.')[1];
    return parseFloat((Math.round(value / step) * step).toFixed(decimals ? decimals.length : 0));
};
export const getprop = (obj, path) => {
    if (typeof path === 'string')
        path = path.split('.');
    if (path instanceof Array)
        return path.reduce((o, key) => (o instanceof Object ? o[key] : undefined), obj);
    return undefined;
};
//# sourceMappingURL=common.js.map