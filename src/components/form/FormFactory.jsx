import React from 'react';
import INPUT from './inputs';
import { Row, Col } from 'react-flexbox-grid';
import '../../styles/components/form/form-factory.scss';

const inputs = [
    {
        key: 'Test',
        label: 'Title',
        input: {
            ...INPUT.INPUT,
            validators: {
                required: {
                    dependencies: {
                        TipoAtencion: (value, neighbour) =>
                        {
                            return neighbour !== 'Ninguna';
                        }
                    },
                    message: 'es requerido'
                },
                email: true
                // email: {
                //     message: '%{value} no es un correo válido'
                // }
            },
            config: {
                placeholder: 'adassdfs'
            }
        }
    },
    {
        key: 'Prevision',
        label: '¿Tipo de previsión de salud?',
        input: {
            ...INPUT.RADIO_GROUP,
            // dataset: 'PrevisionTipo',
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
            },
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
    return (
        <Row className='form-factory'>
            {
                inputs.map(({ key, label, input }, index) => (
                    <Col key={ key ?? index } id={ `${key ?? index}-container` } className='form-item' { ...columns } { ...input.columns }>
                        {input.divider ? (
                            <Row className='input-item'>
                                <input.component { ...input.config } />
                            </Row>
                        ) : (
                            <>
                                <Row
                                    htmlFor={ key }
                                    className='input-item-header'
                                    required={ input.validators?.required }
                                >
                                    {label ?? key}
                                </Row>
                                <Row className='input-item'>
                                    <input.component
                                        id={ key }
                                        { ...input.onChangeSwitch(input.onChangeMapper(key, () => {})) }
                                        { ...input.valueMapper(input.format ? input.format(values[key]) : values[key]) }
                                        { ...(input.optionsMapper ? input.optionsMapper(dataset, input.dataset) : {}) }
                                        { ...input.config }
                                    />
                                </Row>
                            </>
                        )}
                        <label className='input-item-error-label hidden' />
                    </Col>
                ))
            }
        </Row>
    );
}
