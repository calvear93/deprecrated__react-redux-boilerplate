import validate from 'validate.js';
import BlackListValidator from './blacklist';
import Disabled from './disabled';
import Email from './email';
import Hidden from './hidden';
import PhoneValidator from './phone';
import Required from './required';
import RutValidator from './rut';
import WhiteListValidator from './whitelist';

validate.validators.required = Required;
validate.validators.disabled = Disabled;
validate.validators.hidden = Hidden;
validate.validators.email = Email;
validate.validators.rut = RutValidator;
validate.validators.phone = PhoneValidator;
validate.validators.whitelist = WhiteListValidator;
validate.validators.blacklist = BlackListValidator;
validate.validators.label = () => null; // used for skip validation attr assign.

// custom validator.
validate.validators.custom = (value, { validator, ...options }, attributeName, values, constraints) =>
{
    return validator && validator(value, options, attributeName, values, constraints);
};

// formats 'detailed' validations in order to customize
// input label in error messages.
validate.formatters.plain = (validations = {}, validators) =>
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
// For validations display.
validate.formatters.plainAsArray = (validations, validators) =>
{
    return Object.values(validate.formatters.plain(validations, validators));
};

export default validate;
