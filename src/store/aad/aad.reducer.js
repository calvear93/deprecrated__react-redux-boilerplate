import AzureActiveDirectoryAction from './aad.action';
import { AzureActiveDirectoryDefaults } from 'store/defaults';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new state or store partition.
 */
export default function AzureActiveDirectoryReducer(store = AzureActiveDirectoryDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // on authentication success.
        case AzureActiveDirectoryAction.Type.AUTHENTICATE_SUCCESS:
        {
            delete store.error;

            const { account } = store;

            return {
                ...store,
                authenticated: true,
                account: {
                    ...account,
                    context: payload
                }
            };
        }

        // on authentication error.
        case AzureActiveDirectoryAction.Type.AUTHENTICATE_ERROR:
            return {
                ...store,
                authenticated: false,
                error: payload
            };

        // on user info retrieved.
        case AzureActiveDirectoryAction.Type.GET_INFO_SUCCESS:
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
        case AzureActiveDirectoryAction.Type.GET_INFO_ERROR:
            return {
                ...store,
                error: payload
            };

        // on user photo retrieved.
        case AzureActiveDirectoryAction.Type.GET_PHOTO_SUCCESS:
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
