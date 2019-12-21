import { Hybrid, Properties } from 'hybrids';
export interface UeButtonGrpProps extends Properties {
    buttons?: {
        label?: string;
        checked?: boolean;
        disabled?: boolean;
    }[];
    left?: boolean;
}
declare const _default: Hybrid<UeButtonGrpProps>;
export default _default;
