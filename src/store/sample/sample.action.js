import { CreateAction, MakeUnique } from 'store/shared/action.lib';

/**
 * store partition key.
 *
 * @const
 * @type {string}
 */
const KEY = 'SAMPLE';

/**
 * Redux Action Vault.
 */
const SampleHandler =
{
    /**
     * Action Store Key.
     *
     * @memberof SampleHandler
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof SampleHandler
     */
    Type: {
        EXEC: 'EXEC',
        COMMIT: 'COMMIT',
        ROLLBACK: 'ROLLBACK'
    },

    /**
     * Reducer States.
     *
     * @memberof SampleHandler
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
     * @param {object} [payload] data involved in the action.
     *
     * @memberof SampleHandler
     *
     * @returns {object} action.
     */
    Action: (type, payload) => CreateAction(SampleHandler.Key, type, payload)
};

// makes types unique.
MakeUnique(SampleHandler.Type);

export default Object.freeze(SampleHandler);
