import STORE, { ACTIONS } from '../../lib/data';
import DEFAULTS from '../../lib/data/defaults';
import { connectState as connectStore } from '../../lib/hybrids';
import { property } from 'hybrids';

// Convert default values to property descriptors if they are non-array objects
const translate = value =>
    typeof value === 'object' && !(value instanceof Array) ? property(value) : value;

const defaultProps = Object.keys(DEFAULTS).reduce(
    (obj, key) => ({ ...obj, [key]: translate(DEFAULTS[key]) }),
    {}
);

export const action = (type: keyof typeof ACTIONS, data?: any) => {
    STORE.dispatch({ type, data });
};

export default {
    state: connectStore(STORE, Object.keys(DEFAULTS)),
    ...defaultProps
};
