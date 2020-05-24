import { all, call, put, takeLatest } from 'redux-saga/effects';
import AuthenticationService, { Graph } from '../../services/auth/aad-service';
import { AzureActiveDirectoryAction } from '../actions';
import Storage from 'js-storage';

/**
 * Executes azure active directory authentication.
 */
function* authenticate()
{
    try
    {
        // calls azure msal authentication service.
        const account = yield call(AuthenticationService.loginAsync);
        // initializes the storage.
        const storage = Storage.initNamespaceStorage(account.accountIdentifier)[AzureActiveDirectoryAction.Persistence.Type];

        // gets user detailed info.
        const [ user, photo ] = yield all([
            storage.get('user') || call(Graph.me),
            storage.get('photo') || call(Graph.photo)
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
                message: 'Authentication cannot be completed'
            }
        ));
    }
}

/**
 * Finishes azure session.
 */
function* logout()
{
    yield call(AuthenticationService.logout);
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
