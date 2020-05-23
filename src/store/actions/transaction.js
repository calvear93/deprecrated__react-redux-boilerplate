import { CreateAction, MakeUnique } from './shared';

// store partition key.
const KEY = 'TRANSACTION';

/**
 * Redux Action Vault.
 *
 * @class TransactionAction
 * @export TransactionAction
 */
const TransactionAction =
{
    /**
     * Action Store Key.
     *
     * @memberof TransactionAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof TransactionAction
     */
    Type: {
        FETCH: 'FETCH',
        FETCH_SUCCESS: 'FETCH_SUCCESS',
        FETCH_FAILED: 'FETCH_FAILED'
    },

    /**
     * Action States.
     *
     * @memberof TransactionAction
     */
    State: {
        INITIALIZED: 'INITIALIZED',
        FETCHING: 'FETCHING',
        READY: 'READY',
        FAILED: 'FAILED'
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {any} payload data involved in the action.
     *
     * @memberof TransactionAction
     *
     * @returns {func} action function.
     */
    Action: (type, payload) => CreateAction(TransactionAction.Key, type, payload)
};

// makes types unique.
MakeUnique(TransactionAction.Type);

export default Object.freeze(TransactionAction);
