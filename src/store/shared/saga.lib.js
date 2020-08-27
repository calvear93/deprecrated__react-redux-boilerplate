/**
 * Shared generator patterns for Saga.
 *
 * @summary Shared generator patterns for Saga.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:43:58
 * Last modified  : 2020-08-27 11:35:25
 */

import { call, race, take, delay } from 'redux-saga/effects';
import storage, { StorageType } from 'utils/libs/storage.lib';

/**
 * Waits for any action type to occur n times.
 *
 * @param {array} types action types.
 * @param {number} times times for wait each action type.
 * @param {number} [timeout] timeout in milliseconds (0 no timeout).
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
 * @param {string} storageType storage type.
 * @param {string} key persisted value accessor.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {array} args generator function args.
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* callPersistedInStorage(storageType, key, generator, ...args)
{
    const cache = storage[storageType].get(key);

    if (cache)
        return cache;

    const data = yield call(generator, ...args);
    storage[storageType].set(key, data);

    return data;
}

/**
 * Persists the result from an generator
 * callback, storing it in session storage.
 *
 * @param {string} key persisted value accessor.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {array} args generator function args.
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* callPersistedInSessionStorage(key, generator, ...args)
{
    return yield callPersistedInStorage(StorageType.SESSION, key, generator, ...args);
}

/**
 * Persists the result from an generator
 * callback, storing it in local storage.
 *
 * @param {string} key persisted value accessor.
 * @param {IterableIterator<any>} generator generator callback.
 * @param {array} args generator function args.
 *
 * @returns {IterableIterator<any>} cached/persisted value or result.
 */
export function* callPersistedInLocalStorage(key, generator, ...args)
{
    return yield callPersistedInStorage(StorageType.LOCAL, key, generator, ...args);
}
