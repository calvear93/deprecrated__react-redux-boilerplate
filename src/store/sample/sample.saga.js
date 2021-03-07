import { all, takeLatest } from 'redux-saga/effects';
import { putAction } from 'modules/store/effects';
import SampleHandler from './sample.action';

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
            SampleHandler.Type.COMMIT,
            payload
        );
    }
    catch (e)
    {
        yield putAction(
            SampleHandler.Type.ROLLBACK,
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
        takeLatest(SampleHandler.Type.EXEC, exec)
    ]);
}
