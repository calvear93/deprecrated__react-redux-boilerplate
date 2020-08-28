/**
 * Storage data and memoizing utilities.
 *
 * @see https://github.com/nbubna/store
 *
 * @summary Storage data and memoizing utilities.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-13 19:40:14
 * Last modified  : 2020-08-28 16:28:08
 */

import storage from 'store2';
import { isBefore } from 'date-fns';

/**
 * Storage types.
 *
 * @type {object}
 */
export const StorageType = {
    LOCAL: 'localStorage',
    SESSION: 'sessionStorage'
};

// normalizes storage accessors names.
storage[StorageType.LOCAL] = storage.local;
storage[StorageType.SESSION] = storage.session;

export default storage;

/**
 * Persists the result from an asynchronous
 * callback, storing it in browser storage.
 *
 * @param {string} key persisted value accessor.
 * @param {Promise<any>} promise async callback.
 * @param {object} [options] options.
 * @param {Date | null} [options.expiration] expiration date.
 * @param {string} [options.storageType] storage type.
 *
 * @returns {Promise<any>} cached/persisted value or promise result.
 */
export async function memoAsyncCallback(key, promise, { expiration, storageType = StorageType.SESSION } = {})
{
    const cache = storage[storageType].get(key);

    if (cache && cache !== 'undefined' && cache.expiration && isBefore(new Date(), new Date(cache.expiration)))
        return Promise.resolve(cache.data);

    const data = await promise;
    storage[storageType].set(key, { expiration, data });

    return data;
}
