import { all, put, takeLatest } from 'redux-saga/effects';
import { SampleAction } from '../actions';

/**
 * Exec sample.
 *
 * @param {any} payload action payload.
 */
function* exec(payload)
{
    try
    {
        // const account = yield call(Service.Api);

        // Success action.
        yield put(SampleAction.Action(
            SampleAction.Type.COMMIT,
            payload
        ));
    }
    catch (e)
    {
        yield put(SampleAction.Action(
            SampleAction.Type.ROLLBACK,
            {
                stacktrace: e,
                message: 'Operation cannot be completed'
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
    yield all([ // use all only if exists two or more listeners.
        takeLatest(SampleAction.Type.EXEC, exec)
    ]);
}
