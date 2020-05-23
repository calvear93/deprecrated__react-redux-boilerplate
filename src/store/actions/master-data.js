import { CreateAction, MakeUnique } from './shared';

// store partition key.
const KEY = 'MASTER-DATA';

/**
 * Redux Action Vault.
 *
 * @class MasterDataAction
 * @export MasterDataAction
 */
const MasterDataAction =
{
    /**
     * Action Store Key.
     *
     * @memberof MasterDataAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof MasterDataAction
     */
    Type: {
        FETCH: 'FETCH',
        FETCH_SUCCESS: 'FETCH_SUCCESS',
        FETCH_FAILED: 'FETCH_FAILED'
    },

    /**
     * Action States.
     *
     * @memberof MasterDataAction
     */
    State: {
        INITIALIZED: 'INITIALIZED',
        FETCHING: 'FETCHING',
        READY: 'READY',
        FAILED: 'FAILED'
    },

    /**
     * Storage type for persist data.
     *
     * @memberof MasterDataAction
     */
    StorageType: 'localStorage',

    /**
     * Keys for persisted data.
     *
     * @memberof MasterDataAction
     */
    StorageKey: {
        DATA: 'DATA'
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {any} payload data involved in the action.
     *
     * @memberof MasterDataAction
     *
     * @returns {func} action function.
     */
    Action: (type, payload) => CreateAction(MasterDataAction.Key, type, payload)
};

// makes types and keys unique.
MakeUnique(MasterDataAction.Type);
MakeUnique(MasterDataAction.StorageKey);

export default Object.freeze(MasterDataAction);
