/**
 * Shared generator patterns for Saga.
 *
 * @summary Shared generator patterns for Saga.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:43:58
 * Last modified  : 2020-06-23 12:11:49
 */

import { race, take, delay } from 'redux-saga/effects';

/**
 * Waits for any action type to occur n times.
 *
 * @param {Array<any>} types action types.
 * @param {number} times times for wait each action type.
 * @param {number} timeout timeout in milliseconds (0 no timeout).
 *
 * @returns {Array<any>} actions results.
 */
export function* waitForAny(types, times, timeout = 0)
{
    // stores every result of action intercepted.
    let results = [];
    // waits for every dispatch (whether action belongs to types array).
    while (times-- > 0)
    {
        results.push(
            yield race(types.reduce((awaiter, actionType) =>
            {
                awaiter[actionType] = take(actionType);

                return awaiter;
            },
            timeout === 0 ? {} : { timeout: delay(timeout) }))
        );
    }

    return results;
}
