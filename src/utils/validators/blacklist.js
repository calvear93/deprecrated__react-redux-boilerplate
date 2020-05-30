/**
 * Validates the value against a blacklist.
 *
 * @summary values blacklist validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-05-30 15:45:04
 */

/**
 * Validates current value against a blacklist.
 *
 * @param {any} value current value.
 * @param {any} options validator options.
 * @param {array} options.list blacklist.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {any} constraints validator cfg.
 * @param {bool} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value is found in blacklist, null in otherwise.
 */
export default function(value, { list = [], message }, attributeName, values, { fullMessages })
{
    if (!list.includes(value))
        return null;

    return message ?? (fullMessages ? `${attributeName} is not allowed` : 'is not allowed');
}
