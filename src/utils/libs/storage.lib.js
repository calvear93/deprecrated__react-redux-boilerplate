/**
 * Storage data and memoizing utilities.
 *
 * @see https://github.com/nbubna/store
 *
 * @summary Storage data and memoizing utilities.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.cl>
 *
 * Created at     : 2020-08-13 19:40:14
 * Last modified  : 2020-08-15 20:11:51
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
 * Persists the result from an asynchronous
 * callback, storing it in browser storage.
 *
 * @param {string} key persisted value accessor.
 * @param {Promise<any>} promise async callback.
 * @param {string} [storageType] storage type.
 *
 * @return {Promise<any>} cached/persisted value or promise result.
 */
export async function persistAsyncCallbackInStorage(key, promise, storageType = StorageType.SESSION)
{
    const cache = storage[storageType].get(key);

    if (cache)
        return Promise.resolve(cache);

    const data = await promise;
    storage[storageType].set(key, data);

    return data;
}
