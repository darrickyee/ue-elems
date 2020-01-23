declare const _default: {
    min: number;
    max: number;
    step: number;
    value: {
        get: (host: any, lastValue: any) => any;
        set: ({ step }: {
            step: any;
        }, value: any) => any;
        observe: (host: any, value: any, lastValue: any) => void;
    };
    render: (host: any) => (host: any, target: any) => void;
};
export default _default;
