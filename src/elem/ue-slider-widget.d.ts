declare const UeSliderWidget: {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    defaultValue: number;
    render: (host: any) => (host: any, target: any) => void;
};
export default UeSliderWidget;
