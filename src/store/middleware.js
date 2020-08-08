/**
 * Redux middleware initializer.
 * Initializes Saga with Redux Logger.
 *
 * @see https://redux-saga.js.org/
 * @see https://github.com/LogRocket/redux-logger
 *
 * @summary Redux middleware initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-07-26 13:45:06
 * Last modified  : 2020-08-08 13:43:30
 */

import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

/**
 * Generates a middleware conditionally
 * by current debug mode.
 *
 * @returns {array} middleware apply and run functions.
 */
export default function createMiddleware()
{
    // creates Saga middleware factory.
    const saga = createSagaMiddleware();

    if (process.env.REACT_APP_DEBUG === 'true')
    {
        const { createLogger } = require('redux-logger');

        const logger = createLogger({
            duration: true,
            timestamp: true,
            diff: true,
            collapsed: (getState, action, logEntry) => !logEntry.error
        });

        return [ applyMiddleware(saga, logger), saga ];
    }
    else
    {
        return [ applyMiddleware(saga), saga ];
    }
}
