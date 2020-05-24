import { CreateAction, MakeUnique } from './shared';

// store partition key.
const KEY = 'AAD';

/**
 * Redux Action Vault.
 *
 * @class AzureActiveDirectoryAction
 * @export AzureActiveDirectoryAction
 */
const AzureActiveDirectoryAction =
{
    /**
     * Action Store Key.
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
     * Storage persistence.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Persistence: {
        Key: 'aad-session',
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
