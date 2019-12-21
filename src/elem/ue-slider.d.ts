import { Properties, PropertyDescriptor, Hybrid } from 'hybrids';
export interface UeSliderProps extends Properties {
    min?: number;
    max?: number;
    step?: number;
    value?: PropertyDescriptor<number, UeSliderProps>;
}
declare const _default: Hybrid<UeSliderProps>;
export default _default;
