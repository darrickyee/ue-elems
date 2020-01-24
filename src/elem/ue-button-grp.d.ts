declare const _default: {
    render: (host: any) => (host: any, target: any) => void;
    buttons: any[];
    checkable: boolean;
    singlecheck: boolean;
    items: (host: any) => Element[];
    checkedItems: {
        get: ({ items }: {
            items: any;
        }) => any[];
        set: ({ items }: {
            items: any;
        }, value: number[]) => number[];
    };
    left: boolean;
};
export default _default;
