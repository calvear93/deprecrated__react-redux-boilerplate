import { CreateAction, MakeUnique } from 'store/shared/action.lib';

/**
 * store partition key.
 *
 * @const
 * @type {string}
 */
const KEY = 'SESSION';

/**
 * Redux Action Handler.
 */
const AuthenticationHandler =
{
    /**
     * Reducer Store Partition Key.
     *
     * @memberof AuthenticationHandler
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof AuthenticationHandler
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
     * @memberof AuthenticationHandler
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
     * @memberof AuthenticationHandler
     *
     * @returns {object} action.
     */
    Action: (type, payload) => CreateAction(AuthenticationHandler.Key, type, payload)
};

// makes types and keys unique.
MakeUnique(AuthenticationHandler.Type);

export default Object.freeze(AuthenticationHandler);
