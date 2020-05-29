import React from 'react';
import INPUT from './inputs';
import { Row, Col } from 'react-flexbox-grid';
import { useFormik } from 'formik';
import '../../styles/components/form/form-factory.scss';
import { PhoneAdvancedMask } from '../../utils/masks';

const inputs = [
    {
        key: 'Test',
        label: 'Phone',
        behavior: {
            ...INPUT.INPUT_MASKED
        },
        config: {
            mask: PhoneAdvancedMask,
            placeholder: 'adassdfs'
        },
        validators: {
            required: {
                dependencies: {
                    TipoAtencion: (value, neighbour) =>
                    {
                        return neighbour !== 'Ninguna';
                    }
                },
                message: 'es requerido'
            }
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
            clearable: false,
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

const values = {};
const dataset = {};

export default function FormFactory()
{
    const {
        values,
        handleChange
    } = useFormik({
        initialValues: {},
        validate: (values) =>
        {
            console.log(values);

            return {};
        },
        validateOnChange: true,
        onSubmit: (values) =>
        {
            // console.log(values);
        }
    });

    console.log(values);

    function onChange(key, value)
    {
        handleChange(key, value);
    }

    return (
        <Row className='form-factory'>
            {
                inputs.map(({ key, label, behavior, config, validators }, index) =>
                {
                    const { onChangeSwitch, onChangeMapper, valueMapper, defaultValue, filter } = behavior;

                    return (
                        <Col key={ key } id={ `${key}-container` } className='form-item-container' { ...columns } { ...behavior.columns }>
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
                                    { ...onChangeSwitch(onChangeMapper(key, onChange)) }
                                    { ...valueMapper(values[key]) }
                                    { ...(behavior.optionsMapper ? behavior.optionsMapper(dataset, config.dataset) : {}) }
                                    { ...config }
                                />
                            </Row>
                            <label className='form-item-error-label hidden' />
                        </Col>
                    );
                })
            }
        </Row>
    );
}
