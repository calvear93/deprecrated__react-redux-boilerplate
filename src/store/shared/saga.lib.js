/**
 * Shared generator patterns for Saga.
 *
 * @summary Shared generator patterns for Saga.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:43:58
 * Last modified  : 2021-02-25 09:30:37
 */

import { call, race, take, delay } from 'redux-saga/effects';
import storage, { StorageType } from 'utils/libs/storage.lib';

/**
 * Waits for any action type to occur n times.
 *
 * @param {Array} types action types.
 * @param {number} times times for wait each action type.
 * @param {number} [timeout] timeout in milliseconds (0 no timeout).
 *
 * @yields {Array<any>}
 *
 * @returns {IterableIterator<any>} actions results.
 */
export function* takeAny(types, times, timeout = 0)
{
    // stores every result of action intercepted.
    let results = [];
    // waits for every dispatch (whether action belongs to types array).
    while (times-- > 0)
    {
        results.push(
            yield race(
                types.reduce((awaiter, actionType) =>
                {
                    awaiter[actionType] = take(actionType);

                    return awaiter;
                },
                timeout === 0 ? {} : { timeout: delay(timeout) })
            )
        );
    }

    return results;
}

/**
 * Persists the result from an generator
 * callback, storing it in browser storage.
 *
 * @param {string} key persisted value accessor.
 * @param {string} storageType storage type.
 * @param {Date | null} expiration date when value expires.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {Array} args generator function args.
 *
 * @yields {any}
 * @throws {Error} on non valid key.
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* memoCall(key, storageType, expiration, generator, ...args)
{
    const cache = storage[storageType].get(key);

    // optimistic data refresh.
    if (cache?.expiration && new Date().getTime() > new Date(cache.expiration).getTime())
    {
        // delayed data refresh from source.
        (function* ()
        {
            const data = yield call(generator, ...args);
            storage[storageType].set(key, { expiration, data });
        })();
    }

    if (cache && cache !== 'undefined')
        return cache.data;

    const data = yield call(generator, ...args);
    storage[storageType].set(key, { expiration, data });

    return data;
}

/**
 * Persists the result from an generator
 * callback, storing it in session storage.
 *
 * @param {string} key persisted value accessor.
 * @param {Date | null} expiration date when value expires.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {Array} args generator function args.
 *
 * @yields {any}
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* memoCallInSessionStorage(key, expiration, generator, ...args)
{
    return yield memoCall(key, StorageType.SESSION, expiration, generator, ...args);
}

/**
 * Persists the result from an generator
 * callback, storing it in local storage.
 *
 * @param {string} key persisted value accessor.
 * @param {Date | null} expiration date when value expires.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {Array} args generator function args.
 *
 * @yields {any}
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* memoCallInLocalStorage(key, expiration, generator, ...args)
{
    return yield memoCall(key, StorageType.LOCAL, expiration, generator, ...args);
}
