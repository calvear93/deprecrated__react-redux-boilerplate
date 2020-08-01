/**
 * Some utilities for strings processing.
 *
 * @see https://vocajs.com/
 *
 * @summary String processing utilities.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:39:47
 * Last modified  : 2020-06-06 22:08:32
 */

/**
 * Returns a default value on falsy string.
 *
 * @param {string} str string.
 * @param {Function} filter filter function if string is valid.
 * @param {string} def value in case of falsy string.
 *
 * @returns {string} string (with filter if exists) if valid, def in otherwise.
 */
export function defaultOnFalsy(str, filter, def = '-')
{
    return str ? (filter ? filter(str) : str) : def;
}

/**
 * Removes the string underscores.
 *
 * @param {string} str string.
 *
 * @returns {string} string without underscores.
 */
export function removeUnderscore(str)
{
    return str.replace(/_/g, ' ');
}

/**
 * Capitalizes first char after period symbol.
 *
 * @param {string} str string.
 * @returns {string} string normalized.
 */
export function capitalizeAfterPeriod(str)
{
    if (!str)
        return '';

    return str.replace(/([.!?-]+\s*)([a-z])/g, (m, $1, $2) => $1 + $2.toUpperCase());
}

/**
 * Capitalizes every word in the string.
 *
 * @param {string} str string.
 *
 * @returns {string} string capitalized.
 */
export function capitalizeEvery(str)
{
    if (!str)
        return '';

    return capitalizeAfterPeriod(str.replace(/\w\S*/g, (txt) =>
    {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }));
}

/**
 * Normalizes the string removing diacritics.
 *
 * @param {string} str string.
 *
 * @returns {string} string without diacritics.
 */
export function removeDiacritics(str)
{
    if (!str)
        return '';

    return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Changes case to upper and add extra space
 * to every char for emphasize string,
 *
 * @param {string} str string.
 *
 * @returns {string} string emphasized.
 */
export function empathize(str)
{
    if (!str)
        return '';

    return Array.from(str.toUpperCase())
        .reduce((result, char, index) =>
        {
            result += char;

            if (index !== (str.length - 1))
                result += ' ';

            return result;
        }, '');
}
