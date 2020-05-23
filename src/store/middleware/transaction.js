import HttpStatus from 'http-status-codes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import WebClient from '../../services/webclient';
import { TransactionAction } from '../actions';

/**
 * Fetches transaction info by it's Id.
 *
 * @param {number} id transaction id.
 */
function* fetch({ payload: id })
{
    try
    {
        // calls fetching service.
        const response = yield call(WebClient.Transaction.Get, id);

        if (response.status === HttpStatus.OK)
        {
            yield put(TransactionAction.Action(
                TransactionAction.Type.FETCH_SUCCESS,
                response.data
            ));
        }
        else
        {
            yield put(TransactionAction.Action(
                TransactionAction.Type.FETCH_FAILED,
                {
                    content: response.data,
                    message: HttpStatus.getStatusText(response.status)
                }
            ));
        }
    }
    catch (e)
    {
        yield put(TransactionAction.Action(
            TransactionAction.Type.FETCH_FAILED,
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
    yield takeLatest(TransactionAction.Type.FETCH, fetch);
}
