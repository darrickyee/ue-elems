import { Properties, Hybrid } from 'hybrids';
declare const shapeUrls: {
    circle: string;
};
declare const sizes: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
};
interface UeIconProps extends Properties {
    border: number;
    shape: keyof typeof shapeUrls;
    size: keyof typeof sizes;
}
declare const _default: Hybrid<UeIconProps>;
export default _default;
