/**
 * Validates value as email.
 *
 * @summary email validator.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 14:57:47
 * Last modified  : 2020-06-07 12:20:31
 */

//  const REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGEX = /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i;

/**
 * Validates current value email format.
 *
 * @param {any} value current value.
 * @param {any} options validator options.
 * @param {string} options.message error message.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {any} constraints validator cfg.
 * @param {boolean} constraints.fullMessages whether message contains attribute name.
 *
 * @returns {string} message if value isn't a valid email, null in otherwise.
 */
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    const isValid = REGEX
        .test(value);

    if (isValid)
        return null;

    return message ?? (fullMessages ? `${attributeName} no es un correo electrónico válido` : 'no es un correo electrónico válido');
}
