/**
 * Base file containing validation
 * logics for validator.js.
 *
 * @see https://validatejs.org/
 *
 * @summary Validate JS improved validations.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 15:38:03
 * Last modified  : 2020-07-31 20:48:12
 */

import validate from 'validate.js';
import BlackListValidator from './blacklist.validator';
import Email from './email.validator';
import PhoneValidator from './phone.validator';
import Required from './required.validator';
import RutValidator from './rut.validator';
import WhiteListValidator from './whitelist.validator';

validate.validators.required = Required;
validate.validators.email = Email;
validate.validators.rut = RutValidator;
validate.validators.phone = PhoneValidator;
validate.validators.whitelist = WhiteListValidator;
validate.validators.blacklist = BlackListValidator;

/**
 * Allows to define a custom validator inline.
 *
 * @param {any} value current value.
 * @param {any} options validator options.
 * @param {string} options.validator custom validator function.
 * @param {any} attributeName input key.
 * @param {any} values neighbor values.
 * @param {any} constraints validator cfg.
 *
 * @returns {string} message if value isn't a valid phone number, null in otherwise.
 */
validate.validators.custom = (value, { validator, ...options }, attributeName, values, constraints) =>
{
    return validator && validator(value, options, attributeName, values, constraints);
};

/**
 * Flatten 'detailed' validations.
 *
 * @param {any} validations current validations from validate().
 * @param {any} validators validators.
 *
 * @returns {any} validations.
 */
validate.formatters.flatten = (validations = {}, validators) =>
{
    return Object.values(validations)
        .reduce((result, error) =>
        {
            const attr = error.attribute;

            result[attr] = {
                attribute: attr,
                label: validators[attr].label,
                value: error.value,
                errors: result[attr] ?
                    [ ...result[attr].errors, error.error ] :
                    [ error.error ]
            };

            result[attr].message = `${validators[attr].label ?? attr} ${result[attr].errors.join(', ')}`;
            result.isValid = false;

            return result;
        }, { isValid: true });
};

export default validate;
