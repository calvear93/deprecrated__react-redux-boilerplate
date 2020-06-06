import { SampleDefaults } from '../defaults';
import { SampleAction } from '../actions';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new store partition.
 */
export default function SampleReducer(store = SampleDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        case SampleAction.Type.EXEC:
            delete store.error;

            return {
                ...store,
                state: SampleAction.State.PREPARING
            };

        case SampleAction.Type.COMMIT:
            return {
                ...store,
                state: SampleAction.State.READY
            };

        case SampleAction.Type.ROLLBACK:
        {
            const { error, message } = payload;

            return {
                ...store,
                state: SampleAction.State.CORRUPT,
                error,
                message
            };
        }

        // default doesn't changes the store,
        // so, components doesn't re-renders.
        default:
            return store;
    }
}
