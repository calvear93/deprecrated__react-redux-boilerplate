/**
 * Redux store initializer.
 * Initializes combined reducers
 * and apply Saga middleware.
 *
 * Here you should import your reducers
 * and sagas/thunks/epics into combiners.
 *
 * @summary Redux store initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:41:11
 * Last modified  : 2020-08-16 11:30:51
 */

import { combineReducers, createStore } from 'redux';
import createMiddleware from './middleware';
import { all } from 'redux-saga/effects';
import { SampleHandler, SampleReducer, SampleSaga } from './sample';
import { AuthenticationHandler, AuthenticationReducer, AuthenticationSaga } from './auth';

// combine reducers creating the store partitions.
const reducers = combineReducers({
    [SampleHandler.Key]: SampleReducer,
    [AuthenticationHandler.Key]: AuthenticationReducer
});

// combine every sagas in parallel tasks.
function* combineSagas()
{
    yield all([
        SampleSaga(),
        AuthenticationSaga()
    ]);
}

// creates middleware.
const [ middleware, saga ] = createMiddleware();

// creates the store with reducers and Saga middleware.
export default createStore(reducers, middleware);

// runs Saga root middleware.
saga.run(combineSagas);
