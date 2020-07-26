/**
 * Redux store initializer.
 * Initializes combined reducers
 * and apply Saga middleware.
 *
 * @summary Redux store initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:41:11
 * Last modified  : 2020-07-26 12:31:28
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { SampleAction, SampleReducer, SampleSaga } from './sample';
import { AzureActiveDirectoryAction, AzureActiveDirectoryReducer, AzureActiveDirectorySaga } from './aad';
import logger from './shared/logger.saga';

// combine reducers creating the store partitions.
const reducers = combineReducers({
    [SampleAction.Key]: SampleReducer,
    [AzureActiveDirectoryAction.Key]: AzureActiveDirectoryReducer
});

// combine every sagas in parallel tasks.
function* combineSagas()
{
    yield all([
        process.env.REACT_APP_DEBUG === 'true' ? logger() : undefined,
        SampleSaga(),
        AzureActiveDirectorySaga()
    ]);
}

// creates Saga middleware factory.
const saga = createSagaMiddleware();

// creates the store with reducers and Saga middleware.
export default createStore(reducers, applyMiddleware(saga));

// runs Saga root middleware.
saga.run(combineSagas);
