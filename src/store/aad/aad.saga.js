import storage from 'utils/libs/storage.lib';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AuthenticationService, GraphService } from 'services/security';
import AzureActiveDirectoryAction from './aad.action';

/**
 * Executes azure active directory authentication.
 *
 * @param {object} action dispatched action..
 * @param {object} [action.payload] action payload.
 * @param {string} [action.payload.type] login type (redirect or popup).
 */
function* authenticate({ payload: { type } = {} })
{
    try
    {
        // calls azure MSAL authentication service.
        const account = yield call(AuthenticationService.login, { type });
        // initializes the storage.
        const cache = storage[AzureActiveDirectoryAction.Persistence.Type].get(account.accountIdentifier);

        // gets user detailed info.
        const [ user, photo ] = yield all([
            cache?.user || call(GraphService.me),
            cache?.photo || call(GraphService.photoWithSize, process.env.REACT_APP_AAD_USER_PHOTO_SIZE)
        ]);

        // success.
        yield put(AzureActiveDirectoryAction.Action(
            AzureActiveDirectoryAction.Type.AUTHENTICATE_SUCCESS,
            { account, user, photo }
        ));

        // saves user info in cookies.
        storage.set(account.accountIdentifier, { user, photo });
    }
    catch (e)
    {
        yield put(AzureActiveDirectoryAction.Action(
            AzureActiveDirectoryAction.Type.AUTHENTICATE_ERROR,
            {
                stacktrace: e,
                message: 'Autenticación denegada'
            }
        ));
    }
}

/**
 * Finishes azure session.
 */
function logout()
{
    // logouts user by AAD service.
    AuthenticationService.logout();
    AuthenticationService.clearCache();
}

/**
 * Exports saga listeners.
 */
export default function* run()
{
    yield all([
        takeLatest(AzureActiveDirectoryAction.Type.AUTHENTICATE, authenticate),
        takeLatest(AzureActiveDirectoryAction.Type.LOGOUT, logout)
    ]);
}
