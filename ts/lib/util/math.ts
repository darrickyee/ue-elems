import { curry, pipe } from './func';

export const lerp = curry((start, end, t) => (end - start) * t + start);

export const invlerp = curry((start, end, x) => (x - start) / (end - start));

export const clamp = curry((min, max, value) => Math.max(min, Math.min(value, max)));

export const roundTo = curry((step, value: number) => {
    if (step <= 0) return value;
    const decimals = step.toString().split('.')[1];
    return parseFloat((Math.round(value / step) * step).toFixed(decimals ? decimals.length : 0));
});

export const remap = curry((fromStart, fromEnd, toStart, toEnd, value) =>
    pipe(invlerp(fromStart, fromEnd), lerp(toStart, toEnd))(value)
);
