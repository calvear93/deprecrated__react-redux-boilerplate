/**
 * Utilities for Redux actions.
 *
 * @summary Shared utilities for Redux actions.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:42:56
 * Last modified  : 2021-03-07 19:59:00
 */

/**
 * Makes object properties of an object
 * unique, appending a guid ot it.
 *
 * @param {string} prefix unique key prefix.
 * @param {object} obj dictionary with actions types for declare.
 */
export function makeUnique(prefix, obj)
{
    for (const key of Object.keys(obj))
        obj[key] = `${prefix}:${key}`;
}
