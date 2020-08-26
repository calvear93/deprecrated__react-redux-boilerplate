import AuthenticationHandler from './auth.action';
import { AuthenticationDefaults } from 'store/defaults';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new state or store partition.
 */
export default function AuthenticationReducer(store = AuthenticationDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // on authentication success.
        case AuthenticationHandler.Type.AUTHENTICATE_SUCCESS:
        {
            delete store.error;

            const { account } = store;

            return {
                ...store,
                authenticated: true,
                account: {
                    ...account,
                    context: payload,
                    user: {
                        displayName: payload.name,
                        givenName: payload.name,
                        mail: payload.userName,
                        ...account.user
                    }
                }
            };
        }

        // on authentication error.
        case AuthenticationHandler.Type.AUTHENTICATE_ERROR:
            return {
                ...store,
                authenticated: false,
                error: payload
            };

        // on user info retrieved.
        case AuthenticationHandler.Type.GET_INFO_SUCCESS:
        {
            const { account } = store;

            return {
                ...store,
                account: {
                    ...account,
                    user: payload
                }
            };
        }

        // user info cannot be retrieved.
        case AuthenticationHandler.Type.GET_INFO_ERROR:
            return {
                ...store,
                error: payload
            };

        // on user photo retrieved.
        case AuthenticationHandler.Type.GET_PHOTO_SUCCESS:
        {
            const { account } = store;

            return {
                ...store,
                account: {
                    ...account,
                    photo: payload
                }
            };
        }

        // default doesn't changes the store,
        // so, components don't re-renders.
        default:
            return store;
    }
}
