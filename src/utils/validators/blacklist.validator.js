/**
 * Validates the value against a blacklist.
 *
 * @summary values blacklist validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-08-02 16:21:36
 */

/**
 * Validates current value against a blacklist.
 *
 * @param {any} value current value.
 * @param {object} options validator options.
 * @param {array} options.list blacklist.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {object} constraints validator cfg.
 * @param {boolean} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value is found in blacklist, null in otherwise.
 */
export default function(value, { list = [], message }, attributeName, values, { fullMessages })
{
    if (!list.includes(value))
        return null;

    return message ?? (fullMessages ? `${attributeName} no está permitido` : 'no está permitido');
}
