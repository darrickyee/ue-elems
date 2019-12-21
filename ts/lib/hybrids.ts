import { parent } from 'hybrids';
import { getprop } from './util';

const bindParent = (hybridsOrFn, propPaths: string[]) => {
    const source = parent(hybridsOrFn);
    const props = propPaths.reduce(
        (obj, propPath) =>
            Object.assign(obj, {
                [propPath.split('.').pop()]: host => getprop(host.source, propPath)
            }),
        {}
    );
    return { source, ...props };
};

export { bindParent };
