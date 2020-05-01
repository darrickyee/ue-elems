import { property } from 'hybrids';
import { curry } from './func';
export * from './dom';
export * from './func';
export * from './math';

const reflectStr = (attrName: string, defaultValue) => ({
    get: host => host.getAttribute(attrName) || defaultValue,
    set: (host, value) => {
        host.setAttribute(attrName, value);
        return value;
    },
    connect: (host, key, invalidate) => {
        host[key] =
            host.getAttribute(attrName) === null ? defaultValue : host.getAttribute(attrName);
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [attrName] });
    },
});

const reflectNum = (attrName: string, defaultValue) => ({
    ...reflectStr(attrName, defaultValue),
    get: host => parseFloat(host.getAttribute(attrName)) || defaultValue,
});

const reflectBool = (attrName: string, defaultValue) => ({
    ...reflectStr(attrName, defaultValue),
    get: host => host.hasAttribute(attrName) || defaultValue,
    set: (host: HTMLElement, value) => {
        if (value) host.setAttribute(attrName, '');
        else host.removeAttribute(attrName);
        return !!value;
    },
    connect: (host, key, invalidate) => {
        host[key] = host.hasAttribute(attrName);
        const obs = new MutationObserver(invalidate);
        obs.observe(host, { attributeFilter: [attrName] });
    },
});

const mappers = {
    boolean: reflectBool,
    number: reflectNum,
    string: reflectStr,
};

/**
 * reflect(attrName, defaultValue)
 */
export const reflect = curry((attrName: string, defaultValue) =>
    attrName && mappers[typeof defaultValue]
        ? mappers[typeof defaultValue](attrName, defaultValue)
        : property(defaultValue)
);
