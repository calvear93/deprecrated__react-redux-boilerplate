/**
 * Validates value presence.
 *
 * @summary presence validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-08-14 11:29:04
 */

import { isData } from 'utils/libs/object.lib';

/**
 * Validates current value presence.
 *
 * @param {any} value current value.
 * @param {object} options validator options.
 * @param {string} options.allowsEmpty whether allows empty as valid ({}, [], '' or ' ').
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {object} constraints validator cfg.
 * @param {boolean} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value is falsy, null in otherwise.
 */
export default function(value, { allowsEmpty = false, message }, attributeName, values, { fullMessages })
{
    if (!isData(value, allowsEmpty))
        return message ?? (fullMessages ? `${attributeName} es requerido` : 'es requerido');

    return null;
}
