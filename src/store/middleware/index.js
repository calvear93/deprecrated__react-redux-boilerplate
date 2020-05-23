import { all } from 'redux-saga/effects';
import logger from './logger';
import masterData from './master-data';
import transaction from './transaction';

/**
 * Combine every sagas in parallel tasks.
 *
 * @export combineMiddleware
 */
export default function* combineMiddleware()
{
    yield all([
        process.env.REACT_APP_DEBUG === 'true' ? logger() : undefined,
        masterData(),
        transaction()
    ]);
}
