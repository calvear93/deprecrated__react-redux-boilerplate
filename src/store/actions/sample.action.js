import { CreateAction, MakeUnique } from './shared';

// store partition key.
const KEY = 'SAMPLE';

/**
 * Redux Action Vault.
 *
 * @export SampleAction
 */
const SampleAction =
{
    /**
     * Action Store Key.
     *
     * @memberof SampleAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof SampleAction
     */
    Type: {
        EXEC: 'EXEC',
        COMMIT: 'COMMIT',
        ROLLBACK: 'ROLLBACK'
    },

    /**
     * Reducer States.
     *
     * @memberof SampleAction
     */
    State: {
        PREPARING: 'PREPARING',
        EXECUTING: 'EXECUTING',
        READY: 'READY',
        FAILED: 'FAILED'
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {any} payload data involved in the action.
     *
     * @memberof SampleAction
     *
     * @returns {func} action function.
     */
    Action: (type, payload) => CreateAction(SampleAction.Key, type, payload)
};

// makes types unique.
MakeUnique(SampleAction.Type);

export default Object.freeze(SampleAction);
