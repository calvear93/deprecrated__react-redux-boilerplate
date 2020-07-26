import { CreateAction, MakeUnique } from '../shared/action.lib';

// store partition key.
const KEY = 'AAD';

/**
 * Redux Action Vault.
 *
 * @export AzureActiveDirectoryAction
 */
const AzureActiveDirectoryAction =
{
    /**
     * Reducer Store Partition Key.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Type: {
        AUTHENTICATE: 'AUTHENTICATE',
        AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
        AUTHENTICATE_ERROR: 'AUTHENTICATE_ERROR',
        LOGOUT: 'LOGOUT'
    },

    /**
     * Partition selectors.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Selector: {
        User: ({ [AzureActiveDirectoryAction.Key]: { account: { user } } }) => user
    },

    /**
     * Storage persistence.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Persistence: {
        Type: 'localStorage'
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {any} payload data involved in the action.
     *
     * @memberof AzureActiveDirectoryAction
     *
     * @returns {func} action function.
     */
    Action: (type, payload) => CreateAction(AzureActiveDirectoryAction.Key, type, payload)
};

// makes types and cookies keys unique.
MakeUnique(AzureActiveDirectoryAction.Type);

export default Object.freeze(AzureActiveDirectoryAction);
