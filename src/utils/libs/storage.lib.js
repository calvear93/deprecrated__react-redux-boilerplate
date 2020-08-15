/**
 * Storage data and memoizing utilities.
 *
 * @see https://github.com/nbubna/store
 *
 * @summary Storage data and memoizing utilities.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.cl>
 *
 * Created at     : 2020-08-13 19:40:14
 * Last modified  : 2020-08-15 15:47:29
 */

import storage from 'store2';

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
 * Memoizes the result from an asynchronous
 * callback, storing it in sessionStorage.
 *
 * @param {string} key memoized value accessor.
 * @param {Promise<any>} promise callback promise.
 * @param {string} [storageType] storage type.
 *
 * @return {Promise<any>} cached/memoized value or promise result.
 */
export async function memoizeAsyncCallbackInStorage(key, promise, storageType = StorageType.SESSION)
{
    const cache = window[storageType].getItem(key);

    if (cache)
        return Promise.resolve(JSON.parse(cache));

    const data = await promise;
    window[storageType].setItem(key, JSON.stringify(data));

    return data;
}
