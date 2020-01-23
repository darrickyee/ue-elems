declare const _default: {
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
    render: (host: any) => (host: any, target: any) => void;
};
export default _default;
