/// <reference path="../../ts/typings/hybrids.d.ts" />
declare const bindParent: (hybridsOrFn: any, propPaths: string[]) => {
    source: import("hybrids").PropertyDescriptor<Element, import("hybrids").Properties>;
};
export { bindParent };
