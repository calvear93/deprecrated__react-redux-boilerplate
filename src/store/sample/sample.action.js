import { CreateAction, MakeUnique } from '../shared/action.lib';

/**
 * store partition key.
 *
 * @const
 * @type {string}
 */
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
     * Returns a new action.
     *
     * @param {string} type action type.
     * @param {any} payload data involved in the action.
     *
     * @memberof SampleAction
     *
     * @returns {any} action function.
     */
    Action: (type, payload) => CreateAction(SampleAction.Key, type, payload)
};

// makes types unique.
MakeUnique(SampleAction.Type);

export default Object.freeze(SampleAction);
