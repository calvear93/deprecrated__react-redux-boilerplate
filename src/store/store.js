/**
 * Redux store initializer.
 * Initializes combined reducers
 * and apply Saga middleware.
 *
 * @summary Redux store initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:41:11
 * Last modified  : 2020-05-16 22:42:38
 */

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import middleware from './middleware';

// creates Saga middleware factory.
const saga = createSagaMiddleware();

// creates the store with reducers and Saga middleware.
export default createStore(reducers, applyMiddleware(saga));

// runs Saga root middleware.
saga.run(middleware);
