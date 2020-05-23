import { TransactionDefaults } from '../defaults';
import { TransactionAction } from '../actions';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new store partition.
 */
export default function TransactionReducer(store = TransactionDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        case TransactionAction.Type.FETCH:
            delete store.error;

            return {
                ...store,
                state: TransactionAction.State.FETCHING
            };

        case TransactionAction.Type.FETCH_SUCCESS:
            return {
                ...store,
                state: TransactionAction.State.READY,
                transaction: payload
            };

        case TransactionAction.Type.FETCH_FAILED:
            return {
                ...store,
                state: TransactionAction.State.FAILED,
                error: payload
            };

        // default doesn't changes the store,
        // so, components doesn't re-renders.
        default:
            return store;
    }
}
