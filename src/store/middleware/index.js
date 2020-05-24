import { all } from 'redux-saga/effects';
import logger from './logger';
import aad from './aad';
import sample from './sample';

/**
 * Combine every sagas in parallel tasks.
 *
 * @export combineMiddleware
 */
export default function* combineMiddleware()
{
    yield all([
        process.env.REACT_APP_DEBUG === 'true' ? logger() : undefined,
        aad(),
        sample()
    ]);
}
