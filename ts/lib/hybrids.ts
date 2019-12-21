import { Store } from 'redux';
import { PropertyDescriptor, parent } from 'hybrids';
import { getprop } from './util';

const connectState = (store: Store, propList: string[]): PropertyDescriptor => ({
    get: store.getState,
    connect: (host, key, invalidate) =>
        store.subscribe(() => {
            invalidate();
            propList.forEach(prop => {
                host[prop] = host[key][prop];
            });
        })
});

const bindParent = (hybridsOrFn, propPaths: string[]) => {
    const source = parent(hybridsOrFn);
    const props = propPaths.reduce(
        (obj, propPath) =>
            Object.assign(obj, {
                [propPath.split('.').pop()]: host => getprop(host.source, propPath)
            }),
        {}
    );
    console.log({ source, ...props });
    return { source, ...props };
};

export { connectState, bindParent };
