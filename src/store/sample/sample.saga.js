import { all, put, takeLatest } from 'redux-saga/effects';
import SampleHandler from './sample.action';

/**
 * Exec sample.
 *
 * @param {any} payload action payload.
 */
function* exec({ payload })
{
    try
    {
        // const account = yield call(Service.Api);

        // Success action.
        yield put(SampleHandler.Action(
            SampleHandler.Type.COMMIT,
            payload
        ));
    }
    catch (e)
    {
        yield put(SampleHandler.Action(
            SampleHandler.Type.ROLLBACK,
            {
                stacktrace: e,
                message: 'Operation cannot be completed'
            }
        ));
    }
}

/**
 * Exports saga listeners.
 */
export default function* run()
{
    yield all([ // use all only if exists two or more listeners.
        takeLatest(SampleHandler.Type.EXEC, exec)
    ]);
}
