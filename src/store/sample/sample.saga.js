import { all, takeLatest } from 'redux-saga/effects';
import { putAction } from 'modules/store/effects';
import SamplePartition from './sample.partition';

/**
 * Exec sample.
 *
 * @param {any} payload action payload.
 *
 * @yields {PutEffect<any>} dispatcher action.
 */
function* exec({ payload })
{
    try
    {
        // const account = yield call(Service.Api);

        // Success action.
        yield putAction(
            SamplePartition.Type.COMMIT,
            payload
        );
    }
    catch (e)
    {
        yield putAction(
            SamplePartition.Type.ROLLBACK,
            {
                stacktrace: e,
                message: 'Operation cannot be completed'
            }
        );
    }
}

/**
 * Exports saga listeners.
 *
 * @yields {AllEffect<any>} dispatcher action.
 */
export default function* run()
{
    yield all([ // use all only if exists two or more listeners.
        takeLatest(SamplePartition.Type.EXEC, exec)
    ]);
}
