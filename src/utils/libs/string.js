/**
 * Exposes voca library with extra
 * features for process strings.
 *
 * @summary Improved voca (string processing library) utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:39:47
 * Last modified  : 2020-05-24 11:26:09
 */

import voca from 'voca';

/**
 * Returns a default value on falsy string.
 *
 * @param {string} str string.
 * @param {func} filter filter function if string is valid.
 * @param {string} def value in case of falsy string.
 *
 * @returns {string} string (with filter if exists) if valid, def in otherwise.
 */
voca.defaultOnFalsy = (str, filter, def = '-') =>
{
    return str ? (filter ? filter(str) : str) : def;
};

/**
 * Removes the string underscores.
 *
 * @param {string} str string.
 *
 * @returns {string} string without underscores.
 */
voca.removeUnderscore = (str) =>
{
    return str.replace(/_/g, ' ');
};

/**
 * Capitalizes first char after period symbol.
 *
 * @param {string} str string.
 * @returns {string} string normal
 * ized.
 */
voca.capitalizeAfterPeriod = (str) =>
{
    if (!str)
        return '';

    return str.replace(/([.!?-]+\s*)([a-z])/g, (m, $1, $2) => $1 + $2.toUpperCase());
};

/**
 * Capitalizes every word in the string.
 *
 * @param {string} str string.
 *
 * @returns {string} string capitalized.
 */
voca.capitalizeEvery = (str) =>
{
    if (!str)
        return '';

    return voca.capitalizeAfterPeriod(str.replace(/\w\S*/g, (txt) =>
    {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }));
};

/**
 * Normalizes the string removing diacritics.
 *
 * @param {string} str string.
 *
 * @returns {string} string without diacritics.
 */
voca.removeDiacritics = (str) =>
{
    if (!str)
        return '';

    return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Changes case to upper and add extra space
 * to every char for emphasize string,
 *
 * @param {string} str string.
 *
 * @returns {string} string emphasized.
 */
voca.empathize = (str) =>
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
};

export default voca;
