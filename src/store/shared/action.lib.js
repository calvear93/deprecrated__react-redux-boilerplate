/**
 * Utilities for Redux actions.
 *
 * @summary Shared utilities for Redux actions.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:42:56
 * Last modified  : 2020-08-31 15:17:28
 */

// import { v4 as guid } from 'uuid';

/**
 * Creates a new Redux Action.
 *
 * @param {string} key Action store pointer.
 * @param {string} type Action Type.
 * @param {object} [payload] Action args.
 *
 * @returns {object} Action.
 */
export function createAction(key, type, payload)
{
    return {
        key,
        type,
        payload
    };
}

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
        // obj[key] = Symbol(`${prefix}:${key}`);
        // obj[key] = `${key}:${guid()}`;
}
