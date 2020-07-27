/**
 * Redux store initializer.
 * Initializes combined reducers
 * and apply Saga middleware.
 *
 * @summary Redux store initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:41:11
 * Last modified  : 2020-07-26 22:14:26
 */

import { combineReducers, createStore } from 'redux';
import createMiddleware from './middleware';
import { all } from 'redux-saga/effects';
import { SampleAction, SampleReducer, SampleSaga } from './sample';
import { AzureActiveDirectoryAction, AzureActiveDirectoryReducer, AzureActiveDirectorySaga } from './aad';

// combine reducers creating the store partitions.
const reducers = combineReducers({
    [SampleAction.Key]: SampleReducer,
    [AzureActiveDirectoryAction.Key]: AzureActiveDirectoryReducer
});

// combine every sagas in parallel tasks.
function* combineSagas()
{
    yield all([
        SampleSaga(),
        AzureActiveDirectorySaga()
    ]);
}

// creates middleware.
const [ middleware, saga ] = createMiddleware();

// creates the store with reducers and Saga middleware.
export default createStore(reducers, middleware);

// runs Saga root middleware.
saga.run(combineSagas);
