/**
 * Object utility functions.
 *
 * @summary Object utility functions.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:42:09
 * Last modified  : 2020-05-24 11:21:26
 */

/**
 * Reduces a empty object to a undefined,
 * 'cause in many cases,  it's meaning is the same.
 *
 * @param {any} obj object for validate.
 *
 * @returns {any} object if is not null, undefined or empty, undefined in otherwise.
 */
export function reduceEmptiness(obj)
{
    return Object.isEmpty(obj) ? undefined : obj;
}

/**
 * Validates emptiness of an object.
 *
 * @param {any} obj object for validate.
 *
 * @returns {bool} true if object is empty or null/undefined, false in otherwise.
 */
export function isEmpty(obj)
{
    return !obj || Object.keys(obj).length === 0;
}

/**
 * Safely calls a function over a object,
 * validating nullity of it.
 *
 * @param {func} func func for apply.
 * @param {any} obj object for apply function.
 * @param {any} def default value in case of nullity/undefined.
 * @param {array} args other function args.
 *
 * @returns {bool} function result on object ok, def if object us null/undefined.
 */
export function callSafe(func, obj, def, ...args)
{
    return (obj && func(obj, ...args)) ?? def;
}

/**
 * Filters object properties by keys array.
 *
 * @param {any} obj object for filter.
 * @param {any} func filter func for keys/attributes.
 *
 * @returns {any} object with filtered props.
 */
export function filter(obj, func)
{
    return !obj ? obj : Object.keys(obj)
        .filter(func)
        .reduce((mapper, key) =>
        {
            mapper[key] = obj[key];

            return mapper;
        }, {});
}

/**
 * Validates whether a value contains data,
 * it means the value cannot be undefined,
 * null, NaN or empty object.
 *
 * @param {any} value value for validation (undefined, null, NaN).
 * @param {any} allowEmpty whether allows empty as valid ({}, [], '' or ' ').
 *
 * @returns {any} true if is valid, false in otherwise.
 */
export function isData(value, allowEmpty = false)
{
    if (value === undefined || value === null)
        return false;

    const type = typeof value;
    const isDate = value instanceof Date;

    if ((type === 'number' || isDate) && isNaN(value))
        return false;

    if (!allowEmpty && type === 'string' && value.trim() === '')
        return false;

    if (!allowEmpty && Array.isArray(value) && value.length === 0)
        return false;

    if (!allowEmpty && value instanceof Date && isNaN(value))
        return false;

    if (!allowEmpty && (type === 'object' && !isDate) && Object.keys(value).length === 0)
        return false;

    return true;
}
