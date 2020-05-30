/**
 * Validates value as chilean Id (RUT/RUN) format.
 *
 * @summary chilean Id validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-05-30 15:45:29
 */

import Rut from '../libs/rut';

/**
 * Validates current value as chilean Id (RUT/RUN) format.
 *
 * @param {any} value current value.
 * @param {any} options validator options.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {any} constraints validator cfg.
 * @param {bool} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value isn't a valid RUT/RUN, null in otherwise.
 */
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    if (Rut.IsValid(value, false))
        return null;

    return message ?? (fullMessages ? `${attributeName} does not is a valid RUT/RUN` : 'does not is a valid RUT/RUN');
}
