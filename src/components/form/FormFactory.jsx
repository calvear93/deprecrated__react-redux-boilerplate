import React, { useState, useMemo, useEffect } from 'react';
import INPUT from './inputs';
import { Row, Col } from 'react-flexbox-grid';
import { useFormik } from 'formik';
import '../../styles/components/form/form-factory.scss';
import { PhoneAdvancedMask } from '../../utils/masks';
import validate from '../../utils/validators';

const inputs = [
    {
        key: 'Test',
        label: 'Phone',
        behavior: {
            ...INPUT.INPUT
        },
        config: {
            mask: PhoneAdvancedMask,
            placeholder: 'adassdfs'
        },
        validators: {
            required: {
                // dependencies: {
                //     TipoAtencion: (value, neighbour) =>
                //     {
                //         return neighbour !== 'Ninguna';
                //     }
                // },
                message: 'es requerido'
            },
            phone: true
        }
    },
    {
        key: 'Prevision',
        label: '¿Tipo de previsión de salud?',
        behavior: {
            ...INPUT.RADIO_GROUP
        },
        // dataset: 'PrevisionTipo',
        config: {
            clearable: true,
            options: [
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
        },
        validators: {
            required: {
                dependencies: {
                    TipoAtencion: (value, neighbour) =>
                    {
                        return neighbour !== 'Ninguna';
                    },
                    DerivarAgendamiento: (value, neighbour) =>
                    {
                        return !neighbour;
                    }
                },
                message: 'es requerido'
            }
        }
    }
];

// defines grid columns.
const columns = {
    xs: 6,
    md: 6,
    lg: 4
};

const defValues = {};
const dataset = {};

const config = {
    fullMessages: false,
    format: 'grouped' // grouped (default), flat, detailed.
};

export default function FormFactory({ validateOnMount = false })
{
    const [ defaultValues ] = useState(
        inputs
            .reduce((defaults, input) =>
            {
                const key = input.key;
                defaults[key] = defValues[key] ?? input.behavior.defaultValue;

                return defaults;
            }, {})
    );
    const [ values, setValues ] = useState(defaultValues);
    const [ validations, setValidations ] = useState({});
    const [ touched, setTouched ] = useState({});
    const validators = useMemo(
        () => inputs
            .reduce((validators, input) =>
            {
                validators[input.key] = input.validators;

                return validators;
            }, {}),
        []
    );

    useEffect(() =>
    {
        if (validateOnMount)
            setValidations(validate(values, validators, config));
    }, []);

    function handleChange(key, value)
    {
        setValues({
            ...values,
            [key]: value
        });

        setValidations({
            ...validations,
            [key]: validate.single(value, validators[key]) ?? null
        });

        setTouched({
            ...touched,
            [key]: defaultValues[key] !== value
        });
    }

    return (
        <Row className='form-factory'>
            {
                inputs.map(({ key, label, behavior, config, validators }) =>
                {
                    const { onChangeSwitch, onChangeMapper, valueMapper, defaultValue } = behavior;
                    const errors = validations[key];

                    return (
                        <Col key={ key } id={ `${key}-container` } className='form-item-container' { ...columns } { ...behavior.columns }>
                            <Row
                                htmlFor={ key }
                                className={ `form-item-header${errors ? ' error' : errors === null ? ' success' : ''}` }
                                required={ validators?.required }
                            >
                                {label ?? key}
                            </Row>
                            <Row className='form-item'>
                                <behavior.Input
                                    id={ key }
                                    { ...onChangeSwitch(onChangeMapper(key, handleChange)) }
                                    { ...valueMapper(values[key]) }
                                    { ...(behavior.optionsMapper ? behavior.optionsMapper(dataset, config.dataset) : {}) }
                                    { ...config }
                                />
                            </Row>
                            {errors && (
                                <label className='form-item-error-label'>
                                    {errors.join(', ')}
                                </label>
                            )}
                        </Col>
                    );
                })
            }
        </Row>
    );
}
