import React, { useState, useMemo, useEffect } from 'react';
import { INPUT, RADIO_GROUP } from './inputs';
import { Row, Col } from 'react-flexbox-grid';
import '../../styles/components/form/form-factory.scss';
import { PhoneAdvancedMask } from '../../utils/masks';
import validate from '../../utils/validators';
import classNames from 'classnames';
import { isEmpty } from '../../utils/libs/object';

const inputs = [
    {
        key: 'Test',
        label: 'Phone',
        behavior: {
            ...INPUT
        },
        config: {
            mask: PhoneAdvancedMask,
            placeholder: 'adassdfs'
        },
        validators: {
            required: true,
            phone: true
        }
    },
    {
        key: 'Prevision',
        label: '¿Tipo de previsión de salud?',
        behavior: {
            ...RADIO_GROUP
        },
        config: {
            dataset: 'test',
            clearable: true
        },
        validators: {
            required: true
        }
    }
];

// defines grid columns.
const columns = {
    xs: 6,
    md: 6,
    lg: 4
};

let defValues = {};
const datasets = {
    test: [
        {
            value: 1,
            label: 'yeah'
        },
        {
            value: 0,
            label: 'nouh'
        },
        {
            value: 3,
            label: 'gut'
        }
    ]
};

const validatorConfig = {
    fullMessages: false,
    format: 'grouped' // grouped (default), flat, detailed.
};

const interceptor = (key, values, validations, config) =>
{
    return [ values, validations, config ];
};

export default function FormFactory({ validateOnMount = true })
{
    // keeps base configuration memoized.
    const [ defaultConfig, defaultValues, validators ] = useInputs(inputs, defValues);

    const [ config, setConfig ] = useState(defaultConfig);
    const [ values, setValues ] = useState(defaultValues);
    const [ validations, setValidations ] = useState({});
    const [ isValid, setIsValid ] = useState();
    const [ changed, setChanged ] = useState({});
    const [ touched, setTouched ] = useState({});

    useEffect(() =>
    {
        if (validateOnMount)
        {
            const updatedValidations = validate(values, validators, validatorConfig);
            setValidations(updatedValidations);
            setIsValid(isEmpty(updatedValidations));
        }
    }, []);

    function handleChange(key, value)
    {
        const inputValidations = validate.single(value, validators[key]);

        if (inputValidations)
            validations[key] = inputValidations;
        else
            delete validations[key];

        const [ newValues, newValidations, newConfig ] = interceptor(
            key,
            { ...values, [key]: value },
            { ...validations },
            { ...config }
        );

        setValues(newValues);
        setValidations(newValidations);
        setConfig(newConfig);
        setIsValid(isEmpty(newValidations));

        setChanged({
            ...changed,
            [key]: defaultValues[key] !== value
        });

        !touched[key] && setTouched({
            ...touched,
            [key]: true
        });
    }

    return (
        <Row className='form-factory'>
            {
                inputs.map(({ key, label, behavior, validators }) =>
                {
                    const { onChangeSwitch, onChangeMapper, valueMapper } = behavior;
                    const { dataset, hidden, invisible, ...cfg } = config[key];

                    return (
                        <Col key={ key } id={ `${key}-container` } { ...columns } { ...behavior.columns }
                            className={ classNames(
                                'form-item-container',
                                {
                                    hidden, // display: none
                                    invisible, // visibility: hidden
                                    touched: touched[key], // whether value is changed once at least.
                                    changed: changed[key], // whether value is different from default.
                                    success: !validations[key],
                                    error: validations[key] && touched[key]
                                }
                            ) }
                        >
                            <Row
                                htmlFor={ key }
                                className='form-item-header'
                                required={ validators?.required }
                            >
                                {label ?? key}
                            </Row>
                            <Row className='form-item'>
                                <behavior.Input
                                    id={ key }
                                    { ...onChangeSwitch(onChangeMapper(key, handleChange)) }
                                    { ...valueMapper(values[key]) }
                                    { ...(behavior.optionsMapper ? behavior.optionsMapper(datasets, dataset) : {}) }
                                    { ...cfg }
                                />
                            </Row>
                            {validations[key] && touched[key] && (
                                <label className='form-item-error-label'>
                                    {validations[key].join(', ')}
                                </label>
                            )}
                        </Col>
                    );
                })
            }
        </Row>
    );
}

/**
 * Retrieves config, default values
 * and validators from input config.
 *
 * @param {any} inputs inputs config.
 * @param {any} defValues default values,
 * @returns {array} [config, defaultValues, validators]
 */
function useInputs(inputs, defValues)
{
    const [ data ] = useState(
        inputs.reduce((data, input) =>
        {
            const key = input.key;
            // inputs config.
            data[0][key] = input.config;
            // default values.
            data[1][key] = defValues[key] ?? input.behavior.defaultValue;
            // validators.
            data[2][key] = input.validators;

            return data;
        }, [ {}, {}, {} ])
    );

    return data;
}
