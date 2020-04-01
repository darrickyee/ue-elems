export declare const SingleSelectGroup: {
    preselect: any;
    selected: {
        get: ({ items }: {
            items: any;
        }, lastValue: any) => any;
        set: ({ items }: {
            items: any;
        }, value: any) => any;
        connect: (host: any, key: any) => void;
        observe: (host: any, selected: any) => void;
    };
    selectedItem: ({ items }: {
        items: any;
    }) => any;
    items: import("hybrids").Descriptor<HTMLElement>;
};
export declare const itemList: (...args: any[]) => any;
export declare const buttonItemTemplate: (host: any) => ({ selected, label }: {
    selected: any;
    label: any;
}, index: any) => import("lit-html").TemplateResult;
export declare const buttonList: any;
