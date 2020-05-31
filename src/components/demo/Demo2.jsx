import React, { useState } from 'react';
import FormFactory from '../form/FormFactory';
import { SEPARATOR, RADIO_GROUP, INPUT } from '../form/inputs';
import { PhoneAdvancedMask } from '../../utils/masks';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo2()
{
    const [ values, setValues ] = useState({});

    function onChange({ key, values, validations, isValid })
    {
        setValues(values);
    }

    function interceptor(key, values, validations, config)
    {
        switch (key)
        {
            case 'Prevision':
                if (values.Prevision === 3)
                {
                    values.Test = 'oh my gosh';
                    config.Test.disabled = true;
                }
                break;

            default:
                break;
        }

        return [ values, validations, config ];
    }

    return (
        <FormFactory inputs={ inputs } defaults={ values } datasets={ datasets } onChange={ onChange } interceptor={ interceptor } />
    );
}

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
        key: 'separator-1',
        behavior: {
            ...SEPARATOR,
            columns: {
                xs: 12,
                md: 12,
                lg: 12
            }
        },
        config: {
            divider: true,
            label: 'Derivar Agendamiento'
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
