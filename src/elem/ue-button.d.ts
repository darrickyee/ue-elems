import { Hybrid, PropertyDescriptor, Properties } from 'hybrids';
interface UeButtonProps extends Properties {
    label: PropertyDescriptor<string, UeButtonProps>;
    active: boolean;
    checkable: boolean;
    checked: boolean;
    disabled: boolean;
    focused: boolean;
}
declare const _default: Hybrid<UeButtonProps>;
export default _default;
