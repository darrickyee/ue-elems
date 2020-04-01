import { property } from 'hybrids';
export * from './dom';
export * from './func';
export * from './math';
const reflectStr = (attrName, defaultValue) => ({
    get: host => host.getAttribute(attrName) || defaultValue,
    set: (host, value) => {
        host.setAttribute(attrName, value);
        return value;
    },
    connect: (host, key, invalidate) => {
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [attrName] });
    }
});
const reflectNum = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => parseFloat(host.getAttribute(attrName)) || defaultValue }));
const reflectBool = (attrName, defaultValue) => (Object.assign(Object.assign({}, reflectStr(attrName, defaultValue)), { get: host => host.hasAttribute(attrName) || defaultValue, set: (host, value) => {
        if (value)
            host.setAttribute(attrName, '');
        else
            host.removeAttribute(attrName);
        return !!value;
    } }));
const mappers = {
    boolean: reflectBool,
    number: reflectNum,
    string: reflectStr
};
export const reflect = (attrName, defaultValue) => attrName && mappers[typeof defaultValue]
    ? mappers[typeof defaultValue](attrName, defaultValue)
    : property(defaultValue);
//# sourceMappingURL=index.js.map