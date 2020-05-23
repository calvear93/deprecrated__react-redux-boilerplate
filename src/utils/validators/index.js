
import Validate from 'validate.js';
import BlackListValidator from './blacklist';
import Disabled from './disabled';
import Email from './email';
import Hidden from './hidden';
import PhoneValidator from './phone';
import Required from './required';
import RutValidator from './rut';
import WhiteListValidator from './whitelist';

Validate.validators.required = Required;
Validate.validators.disabled = Disabled;
Validate.validators.hidden = Hidden;
Validate.validators.email = Email;
Validate.validators.rut = RutValidator;
Validate.validators.phone = PhoneValidator;
Validate.validators.whitelist = WhiteListValidator;
Validate.validators.blacklist = BlackListValidator;
Validate.validators.label = () => null; // used for skip validation attr assign.

// custom validator.
Validate.validators.custom = (value, { validator, ...options }, attributeName, values, constraints) =>
{
    return validator && validator(value, options, attributeName, values, constraints);
};

// formats 'detailed' validations in order to customize
// input label in error messages.
Validate.formatters.plain = (validations = {}, validators) =>
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
Validate.formatters.plainAsArray = (validations, validators) =>
{
    return Object.values(Validate.formatters.plain(validations, validators));
};

export default Validate;

