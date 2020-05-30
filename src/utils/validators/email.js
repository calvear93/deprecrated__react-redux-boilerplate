/**
 * Validates value as email.
 *
 * @summary email validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-05-30 15:45:08
 */

/**
 * Validates current value email format.
 *
 * @param {any} value current value.
 * @param {any} options validator options.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {any} constraints validator cfg.
 * @param {bool} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value isn't a valid email, null in otherwise.
 */
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    const isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(value);

    if (isValid)
        return null;

    return message ?? (fullMessages ? `${attributeName} is not a valid email` : 'is not a valid email');
}
