import { createStore, combineReducers, Store } from 'redux';
import REDUCERS, { ACTIONS } from './reducers';

declare const global;

export { ACTIONS };

export default (function(obj) {
    const store = (obj._UE_DATASTORE as Store) || createStore(combineReducers(REDUCERS));
    return (obj._UE_DATASTORE = store);
})(global);
