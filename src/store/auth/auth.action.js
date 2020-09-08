import { createAction, makeUnique } from 'store/shared/action.lib';

/**
 * store partition key.
 *
 * @constant
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
    Action: (type, payload) => createAction(AuthenticationHandler.Key, type, payload),

    /**
     * Creates AUTHENTICATE action.
     * Initiates authentication logic
     * for Single Sign-On or login.
     *
     * @param {string} type login type (loginRedirect or loginPopup).
     *
     * @memberof AuthenticationHandler
     *
     * @returns {object} action.
     */
    Authenticate: (type) => createAction(KEY, AuthenticationHandler.Type.AUTHENTICATE, type),

    /**
     * Creates LOGOUT action.
     * Clears session cache and
     * redirects to Microsoft
     * Account logout page.
     *
     * @memberof AuthenticationHandler
     *
     * @returns {object} action.
     */
    Logout: () => createAction(KEY, AuthenticationHandler.Type.LOGOUT)
};

// makes action types unique depending of partition.
makeUnique(KEY, AuthenticationHandler.Type);

export default Object.freeze(AuthenticationHandler);
