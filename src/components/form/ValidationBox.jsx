import equal from 'fast-deep-equal';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Message } from 'semantic-ui-react';
import '../../styles/components/validation-box.scss';
import Validate from '../../utils/validators';
import Object from '../../utils/Obj';

const config = {
    fullMessages: false,
    format: 'detailed' // grouped (default), flat, detailed.
};

/**
 * Shows a form validation box.
 *
 * @param {string} header box title
 * @param {any} ref used with forwardRef for exposes component reference.
 * @param {any} def default values
 * @param {any} values input values
 * @param {any} validators validator.js validators.
 * @param {string} lastChange key of last changed input.
 * @param {func} onValidation triggered on input validation.
 * @param {bool} visible whether box is visible.
 *
 * @ref {bool} isValid whether form is valid.
 *
 * @returns {JSX} validation box.
 */
function ValidationBox({
    header,
    def,
    values,
    validators,
    lastChange,
    onValidation,
    visible = true
}, ref)
{
    // input validations state.
    const [ validations, setValidations ] = useState([]);
    const [ isValid, setIsValid ] = useState(true);
    const requiredInputs = useMemo(() => Object.keys(validators).filter(key => validators[key].required), [ validators ] );
    // exposes isValid value to parent.
    useImperativeHandle(ref, () => isValid);

    useEffect(() =>
    {
        const validator = Validate.formatters.plain(
            Validate(values, validators, config),
            validators
        );

        // show error hints and required indicators.
        Object.keys(values).forEach((key) => displayErrors(key, validator, lastChange));

        setValidations(validator);
        setIsValid(validator.isValid);
        // triggers validation event.
        onValidation && onValidation({
            isValid: validator.isValid, // forms hasn't problems.
            hasChanges: !equal(def, values), // form has changed from defaults.
            hasCriticalChanges: requiredInputs.length > 0 ? criticalChange(def, values, requiredInputs) : true
        });
    }, [ values, validators ]);

    return visible && !isValid ? (
        <Message
            visible={ false }
            className='validation-box'
            warning
            header={ header }
            list={ Object.values(validations).map(v => v.message) }
        />
    ) : (null);
}

/**
 * Validates equality of required object
 * properties in order to calculate if some
 * critical change has done.
 *
 * @param {any} def base values.
 * @param {any} values current values.
 * @param {array} required required keys array
 * @returns {bool} true if a critical change has done, false in otherwise.
 */
function criticalChange(def, values, required)
{
    return !equal(
        Object.filter(def, v => required.includes(v)),
        Object.filter(values, v => required.includes(v))
    );
}

/**
 * Displays errors for each input.
 *
 * @param {string} key input id.
 * @param {any} validator contains every form validations.
 * @param {string} lastChange key of last changed input.
 */
function displayErrors(key, validator, lastChange)
{
    const label = document.querySelector(`div[for="${key}"]`);
    const err = document.querySelector(`#${key}-container > .input-item-error-label`);
    // const input = document.getElementById(key);
    const data = validator[key];
    const showHint = key === lastChange;

    if (data)
    {
        label && label.setAttribute('required', true);
        if (err)
        {
            if (showHint)
            {
                err.classList.remove('hidden');
                err.classList.add('active');
            }
            err.innerHTML = data.errors.join(', ');
        }
    }
    else
    {
        label && label.removeAttribute('required');
        if (err)
        {
            err.classList.add('hidden');
            err.classList.remove('active');
        }
    }
}

export default forwardRef(ValidationBox);
