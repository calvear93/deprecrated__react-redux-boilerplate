import React, { useState } from 'react';
import FormFactory from '../form/FormFactory';
import { SEPARATOR, RADIO_GROUP, INPUT, INPUT_MASKED } from '../form/inputs';
import { PhoneAdvancedMask, RutMask } from '../../utils/masks';

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

const datasets = {
    assertion: [
        {
            value: 1,
            label: 'yes'
        },
        {
            value: 0,
            label: 'no'
        }
    ],
    city: [
        {
            value: 'santiago',
            label: 'Santiago'
        },
        {
            value: 'chillan',
            label: 'Chillán'
        },
        {
            value: 'san-carlos',
            label: 'San Carlos'
        }
    ],
    approval: [
        {
            value: -1,
            label: 'In Disagreement'
        },
        {
            value: 0,
            label: 'Indifferent'
        },
        {
            value: 1,
            label: 'In Agreement'
        }
    ]
};

const inputs = [
    {
        key: 'group-1',
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
            label: 'Main Formulary'
        }
    },
    {
        key: 'InputSimple',
        label: 'Simple Input',
        behavior: {
            ...INPUT
        },
        validators: {
            required: {
                message: 'please fill this input!'
            }
        },
        config: {
            placeholder: 'A simple placeholder'
        }
    },
    {
        key: 'InputMaskedRut',
        label: 'Maked (RUT/RUN) Input',
        behavior: {
            ...INPUT_MASKED
        },
        validators: {
            required: true,
            rut: true
        },
        config: {
            mask: RutMask,
            placeholder: '15.331.459-4'
        }
    },
    {
        key: 'InputMaskedPhone',
        label: 'Maked (Phone) Input',
        behavior: {
            ...INPUT_MASKED
        },
        validators: {
            phone: true
        },
        config: {
            mask: PhoneAdvancedMask,
            placeholder: '+56 9 9345 1872'
        }
    }
    // {
    //     key: 'Test',
    //     label: 'Phone',
    //     behavior: {
    //         ...INPUT
    //     },
    //     config: {
    //         mask: PhoneAdvancedMask,
    //         placeholder: 'adassdfs'
    //     },
    //     validators: {
    //         required: true,
    //         phone: true
    //     }
    // },
    // {
    //     key: 'separator-1',
    //     behavior: {
    //         ...SEPARATOR,
    //         columns: {
    //             xs: 12,
    //             md: 12,
    //             lg: 12
    //         }
    //     },
    //     config: {
    //         divider: true,
    //         label: 'Derivar Agendamiento'
    //     }
    // },
    // {
    //     key: 'Prevision',
    //     label: '¿Tipo de previsión de salud?',
    //     behavior: {
    //         ...RADIO_GROUP
    //     },
    //     config: {
    //         dataset: 'test',
    //         clearable: true
    //     },
    //     validators: {
    //         required: true
    //     }
    // }
];
