import Storage from 'js-storage';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AuthenticationService, Graph } from '../../services/auth';
import { AzureActiveDirectoryAction } from '../actions';

/**
 * Executes azure active directory authentication.
 *
 * @param {string} type login type (redirect or popup).
 */
function* authenticate({ payload: { type } })
{
    try
    {
        // calls azure MSAL authentication service.
        const account = yield call(AuthenticationService.loginAsync, { type });
        // initializes the storage.
        const storage = Storage.initNamespaceStorage(account.accountIdentifier)[AzureActiveDirectoryAction.Persistence.Type];

        // gets user detailed info.
        const [ user, photo ] = yield all([
            storage.get('user') || call(Graph.me),
            storage.get('photo') || call(Graph.photoWithSize, process.env.REACT_APP_AAD_USER_PHOTO_SIZE)
        ]);

        // success.
        yield put(AzureActiveDirectoryAction.Action(
            AzureActiveDirectoryAction.Type.AUTHENTICATE_SUCCESS,
            { account, user, photo }
        ));

        // saves user info in cookies.
        storage.set({ user, photo });
    }
    catch (e)
    {
        yield put(AzureActiveDirectoryAction.Action(
            AzureActiveDirectoryAction.Type.AUTHENTICATE_ERROR,
            {
                error: e,
                message: 'Authentication denied'
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
 *
 * @export
 */
export default function* run()
{
    yield all([
        takeLatest(AzureActiveDirectoryAction.Type.AUTHENTICATE, authenticate),
        takeLatest(AzureActiveDirectoryAction.Type.LOGOUT, logout)
    ]);
}
