import { parent } from 'hybrids';
import { getprop } from './util';
const bindParent = (hybridsOrFn, propPaths) => {
    const source = parent(hybridsOrFn);
    const props = propPaths.reduce((obj, propPath) => Object.assign(obj, {
        [propPath.split('.').pop()]: host => getprop(host.source, propPath)
    }), {});
    console.log(Object.assign({ source }, props));
    return Object.assign({ source }, props);
};
export { bindParent };
//# sourceMappingURL=hybrids.js.map