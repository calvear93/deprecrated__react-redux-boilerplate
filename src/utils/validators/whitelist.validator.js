/**
 * Validates the value against a whitelist.
 *
 * @summary values whitelist validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-08-02 16:22:17
 */

/**
 * Validates current value against a whitelist.
 *
 * @param {any} value current value.
 * @param {object} options validator options.
 * @param {array} options.list whitelist.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {object} constraints validator cfg.
 * @param {boolean} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value isn't found in whitelist, null in otherwise.
 */
export default function(value, { list = [], message }, attributeName, values, { fullMessages })
{
    if (list.includes(value))
        return null;

    return message ?? (fullMessages ? `${attributeName} no está permitido` : 'no está permitido');
}
