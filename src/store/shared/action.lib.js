/**
 * Utilities for Redux actions.
 *
 * @summary Shared utilities for Redux actions.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:42:56
 * Last modified  : 2020-08-08 13:44:04
 */

import { v1 as guid } from 'uuid';

/**
 * Creates a new Redux Action.
 *
 * @param {string} key Action store pointer.
 * @param {string} type Action Type.
 * @param {any} payload Action args.
 *
 * @returns {any} Action.
 */
export function CreateAction(key, type, payload)
{
    return {
        key,
        type,
        payload
    };
}

/**
 * Creates Redux Action Type from
 * object using GUID.
 *
 * @param {any} obj Dictionary with actions types for declare.
 *
 * @returns {any} Freezed object for Redux Action Types.
 */
export function CreateActionTypes(obj)
{
    let types = {};

    for (const key in obj)
        types[key] = `${obj[key]}:${guid()}`;

    return Object.freeze(types);
}

/**
 * Makes object properties of an object
 * unique, appending a guid ot it.
 *
 * @param {any} obj dictionary with actions types for declare.
 */
export function MakeUnique(obj)
{
    for (const key of Object.keys(obj))
        obj[key] = `${key}:${guid()}`;
}
