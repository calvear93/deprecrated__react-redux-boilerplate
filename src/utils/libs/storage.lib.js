/**
 * Storage data and memoizing utilities.
 *
 * @summary Storage data and memoizing utilities.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.cl>
 *
 * Created at     : 2020-08-13 19:40:14
 * Last modified  : 2020-08-14 19:18:41
 */

/**
 * Memoizes the result from an asynchronous
 * callback, storing it in sessionStorage.
 *
 * @param {string} key memoized value accessor.
 * @param {Promise<any>} promise callback promise.
 *
 * @return {Promise<any>} cached/memoized value or promise result.
 */
export async function memoizeAsyncCallbackInStorage(key, promise)
{
    const cache = window.sessionStorage.getItem(key);

    if (cache)
        return Promise.resolve(JSON.parse(cache));

    const data = await promise;
    window.sessionStorage.setItem(key, JSON.stringify(data));

    return data;
}
