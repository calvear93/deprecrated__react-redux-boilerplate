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
 * Last modified  : 2021-03-07 19:47:47
 */

import { combineReducers, createStore } from 'redux';
import { all } from 'redux-saga/effects';
import createMiddleware from './middleware';
import { makeUnique } from './libs/action.lib';

export default function({ actions = [], reducers = {}, sagas = [], debug })
{
    // creates middleware.
    const [ middleware, saga ] = createMiddleware(debug);

    // creates the store with reducers and Saga middleware.
    const store = createStore(combineReducers(reducers), middleware);

    function* combineSagas()
    {
        yield all(sagas);
    }

    for (let action of actions)
    {
        // makes action types unique depending of partition.
        makeUnique(action.Key, action.Type);
    }

    // runs Saga root middleware.
    saga.run(combineSagas);

    return store;
}
