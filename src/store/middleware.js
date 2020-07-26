/**
 * Redux middleware initializer.
 * Initializes Saga with Redux Logger.
 *
 * @see https://github.com/LogRocket/redux-logger
 *
 * @summary Redux middleware initializer.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-07-26 13:45:06
 * Last modified  : 2020-07-26 13:52:26
 */

import { applyMiddleware } from 'redux';

/**
 * Generates a middleware conditionally
 * by current debug mode.
 *
 * @export
 * @param {any} saga saga middleware combiner.
 * @returns {any} middleware.
 */
export default function middleware(saga)
{
    if (process.env.REACT_APP_DEBUG === 'true')
    {
        const { createLogger } = require('redux-logger');

        const logger = createLogger({
            duration: true,
            timestamp: true,
            diff: true,
            collapsed: (getState, action, logEntry) => !logEntry.error
        });

        return applyMiddleware(saga, logger);
    }
    else
    {
        return applyMiddleware(saga);
    }
}
