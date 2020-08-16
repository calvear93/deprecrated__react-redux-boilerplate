import { SampleDefaults } from 'store/defaults';
import SampleHandler from './sample.action';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new state or store partition.
 */
export default function SampleReducer(store = SampleDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // executes the action.
        case SampleHandler.Type.EXEC:
            delete store.error;

            return {
                ...store,
                state: SampleHandler.State.EXECUTING
            };

        // action is successful.
        case SampleHandler.Type.COMMIT:
            return {
                ...store,
                state: SampleHandler.State.READY
            };

        // action was finished with errors.
        case SampleHandler.Type.ROLLBACK:
            return {
                ...store,
                state: SampleHandler.State.FAILED,
                error: payload
            };

        // default doesn't changes the store,
        // so, components don't re-renders.
        default:
            return store;
    }
}
