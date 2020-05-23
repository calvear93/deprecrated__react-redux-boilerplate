import HttpStatus from 'http-status-codes';
import Storage from 'js-storage';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import WebClient from '../../services/webclient';
import { MasterDataAction } from '../actions';
import Object from '../../utils/Obj';
import { MasterDataNormalizer } from '../../utils/normalizers';

// data storage.
const storage = Storage.initNamespaceStorage(MasterDataAction.StorageKey.DATA)[MasterDataAction.StorageType];

/**
 * Fetches master data.
 *
 * @param {bool} force forces to fetch data.
 */
function* fetch({ payload: force })
{
    try
    {
        // gets current storage cache for avoid api calls.
        const cache = force ? undefined : storage.get();

        if (!Object.isEmpty(cache)) // data exists on cache.
        {
            yield put(MasterDataAction.Action(
                MasterDataAction.Type.FETCH_SUCCESS,
                cache
            ));
        }
        else // cache is empty, so asks to service for data.
        {
            const [
                TransactionState,
                TransactionType,
                TransactionResultCode,
                AuthenticationResultCode
            ] = yield all([
                call(WebClient.MasterData.TransactionState),
                call(WebClient.MasterData.TransactionType),
                call(WebClient.MasterData.TransactionResultCode),
                call(WebClient.MasterData.AuthenticationResultCode)
            ]);

            // arms master data package.
            const data = {
                TransactionState: MasterDataNormalizer.AsDictionary(TransactionState.data, 'Id'),
                TransactionType: MasterDataNormalizer.AsDictionary(TransactionType.data, 'Id'),
                TransactionResultCode: MasterDataNormalizer.AsDictionary(TransactionResultCode.data, 'Id'),
                AuthenticationResultCode: MasterDataNormalizer.AsDictionary(AuthenticationResultCode.data, 'Id')
            };

            yield put(MasterDataAction.Action(
                MasterDataAction.Type.FETCH_SUCCESS,
                data
            ));

            // persists master data on browser.
            storage.set(data);
        }
    }
    catch (e)
    {
        yield put(MasterDataAction.Action(
            MasterDataAction.Type.FETCH_FAILED,
            {
                content: e,
                message: e.message
            }
        ));
    }
}

/**
 * Exports saga listeners.
 *
 * @export
 */
export default function* run()
{
    yield takeLatest(MasterDataAction.Type.FETCH, fetch);
}
