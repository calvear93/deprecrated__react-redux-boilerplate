import { AzureActiveDirectoryAction } from '../actions';
import { AzureActiveDirectoryDefaults } from '../defaults';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new store partition.
 */
export default function AzureActiveDirectoryReducer(store = AzureActiveDirectoryDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // on authentication success.
        case AzureActiveDirectoryAction.Type.AUTHENTICATE_SUCCESS:
            delete store.error;

            return {
                ...store,
                authenticated: true,
                account: payload
            };

        // on login error.
        case AzureActiveDirectoryAction.Type.AUTHENTICATE_ERROR:
            return {
                ...store,
                authenticated: false,
                error: payload
            };

        // default doesn't changes the store,
        // so, components doesn't re-renders.
        default:
            return store;
    }
}
