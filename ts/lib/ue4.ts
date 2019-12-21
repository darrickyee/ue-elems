export function parseColor(color?: Array<number> | string) {
    if (color instanceof Array) {
        return `rgba(${[...color.slice(0, 3).map(f => Math.round(f * 255)), color[3]].toString()})`;
    }
    return color || '';
}

export interface UeKeyMapping {
    key: string;
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
}

export interface UeActionMapping {
    action: string;
    keys: UeKeyMapping[];
}

export interface UeTargetData {
    name?: string;
    color?: number[];
    actions?: UeActionMapping[];
}
