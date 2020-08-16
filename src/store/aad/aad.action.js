import { CreateAction, MakeUnique } from 'store/shared/action.lib';

/**
 * store partition key.
 *
 * @const
 * @type {string}
 */
const KEY = 'AAD';

/**
 * Redux Action Vault.
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
        GET_INFO: 'GET_INFO',
        GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
        GET_INFO_ERROR: 'GET_INFO_ERROR',
        GET_PHOTO: 'GET_PHOTO',
        GET_PHOTO_SUCCESS: 'GET_PHOTO_SUCCESS',
        GET_PHOTO_ERROR: 'GET_PHOTO_ERROR',
        LOGOUT: 'LOGOUT'
    },

    /**
     * Partition selectors.
     *
     * @memberof AzureActiveDirectoryAction
     */
    Selector: {
        User: ({ [KEY]: { account: { user } } }) => user,
        Photo: ({ [KEY]: { account: { photo } } }) => photo
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {object} [payload] data involved in the action.
     *
     * @memberof AzureActiveDirectoryAction
     *
     * @returns {object} action.
     */
    Action: (type, payload) => CreateAction(AzureActiveDirectoryAction.Key, type, payload)
};

// makes types and keys unique.
MakeUnique(AzureActiveDirectoryAction.Type);

export default Object.freeze(AzureActiveDirectoryAction);
