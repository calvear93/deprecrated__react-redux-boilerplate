import { SampleDefaults } from 'store/defaults';
import SamplePartition from './sample.partition';

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
        case SamplePartition.Type.EXEC:
            delete store.error;

            return {
                ...store,
                state: SamplePartition.State.EXECUTING,
                data: payload
            };

        // action is successful.
        case SamplePartition.Type.COMMIT:
            return {
                ...store,
                state: SamplePartition.State.READY
            };

        // action was finished with errors.
        case SamplePartition.Type.ROLLBACK:
            return {
                ...store,
                state: SamplePartition.State.FAILED,
                error: payload
            };

        // default doesn't changes the store,
        // so, components don't re-renders.
        default:
            return store;
    }
}
