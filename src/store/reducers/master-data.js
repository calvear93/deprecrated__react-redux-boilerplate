import { MasterDataDefaults } from '../defaults';
import { MasterDataAction } from '../actions';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new store partition.
 */
export default function MasterDataReducer(store = MasterDataDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        case MasterDataAction.Type.FETCH:
            delete store.error;

            return {
                ...store,
                state: MasterDataAction.State.FETCHING
            };

        case MasterDataAction.Type.FETCH_SUCCESS:
            return {
                ...store,
                state: MasterDataAction.State.READY,
                data: payload
            };

        case MasterDataAction.Type.FETCH_FAILED:
            return {
                ...store,
                state: MasterDataAction.State.FAILED,
                error: payload
            };

        // default doesn't changes the store,
        // so, components doesn't re-renders.
        default:
            return store;
    }
}
