import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AuthenticationService, GraphService } from 'services/security';
import { callPersistedInLocalStorage } from 'store/shared/saga.lib';
import AuthenticationHandler from './auth.action';

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

        // user authenticated.
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.AUTHENTICATE_SUCCESS,
            account
        ));

        // dispatches actions for fetching user info.
        yield put(AuthenticationHandler.Action(AuthenticationHandler.Type.GET_INFO, account.accountIdentifier));
        yield put(AuthenticationHandler.Action(AuthenticationHandler.Type.GET_PHOTO, account.accountIdentifier));
    }
    catch (e)
    {
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.AUTHENTICATE_ERROR,
            {
                stacktrace: e,
                message: 'Autenticación denegada'
            }
        ));
    }
}

/**
 * Fetches azure account info.
 *
 * @param {object} action dispatched action..
 * @param {object} action.payload azure account identifier.
 */
function* getUserInfo({ payload: accountIdentifier })
{
    try
    {
        // gets user detailed info.
        const user = yield callPersistedInLocalStorage(`${accountIdentifier}_info`, GraphService.me);

        // success.
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.GET_INFO_SUCCESS,
            user
        ));
    }
    catch (e)
    {
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.GET_INFO_ERROR,
            {
                stacktrace: e,
                message: 'No se pudo obtener información del usuario'
            }
        ));
    }
}

/**
 * Fetches azure account photo.
 *
 * @param {object} action dispatched action..
 * @param {object} action.payload azure account identifier.
 */
function* getUserPhoto({ payload: accountIdentifier })
{
    try
    {
        // gets user photo.
        const photo = yield callPersistedInLocalStorage(
            `${accountIdentifier}_photo`,
            GraphService.photoWithSize,
            process.env.REACT_APP_AAD_USER_PHOTO_SIZE
        );

        // success.
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.GET_PHOTO_SUCCESS,
            photo
        ));
    }
    catch (e)
    {
        yield put(AuthenticationHandler.Action(
            AuthenticationHandler.Type.GET_PHOTO_ERROR,
            {
                stacktrace: e,
                message: 'No se pudo obtener fotografía del usuario'
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
        takeLatest(AuthenticationHandler.Type.AUTHENTICATE, authenticate),
        takeLatest(AuthenticationHandler.Type.GET_INFO, getUserInfo),
        takeLatest(AuthenticationHandler.Type.GET_PHOTO, getUserPhoto),
        takeLatest(AuthenticationHandler.Type.LOGOUT, logout)
    ]);
}
