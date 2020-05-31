import React, { useState } from 'react';
import FormFactory from './FormFactory';
import {
    SEPARATOR,
    RADIO_GROUP,
    INPUT,
    INPUT_MASKED,
    CHECKBOX,
    TOGGLER,
    SELECT,
    SELECT_MULTIPLE,
    DATE_PICKER,
    TIME_CIRCULAR_PICKER,
    TEXTAREA
} from './inputs';
import { PhoneAdvancedMask, RutMask } from '../../utils/masks';
import { addDays } from 'date-fns';

export default () => <FormFactory inputs={ inputs } datasets={ datasets } interceptor={ interceptor } />;

function interceptor(key, values, validations, config)
{
    switch (key)
    {
        case 'SimpleToggler':
            config.InputMaskedRut.disabled = values.SimpleToggler;
            config.InputMaskedPhone.disabled = values.SimpleToggler;
            config.InputEmail.disabled = values.SimpleToggler;
            break;

        default:
            break;
    }

    return [ values, validations, config ];
}

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
            label: 'Demo Formulary'
        }
    },
    {
        key: 'InputSimple',
        label: 'Simple Input',
        behavior: {
            ...INPUT
        },
        config: {
            placeholder: 'A simple placeholder'
        },
        validators: {
            required: {
                message: 'please fill this input!'
            }
        }
    },
    {
        key: 'InputMaskedRut',
        label: 'Maked (RUT/RUN) Input',
        behavior: {
            ...INPUT_MASKED
        },
        config: {
            mask: RutMask,
            placeholder: '15.331.459-4'
        },
        validators: {
            required: true,
            rut: true
        }
    },
    {
        key: 'InputMaskedPhone',
        label: 'Maked (Phone) Input',
        behavior: {
            ...INPUT_MASKED
        },
        config: {
            mask: PhoneAdvancedMask,
            placeholder: '+56 9 9345 1872'
        },
        validators: {
            phone: true
        }
    },
    {
        key: 'InputEmail',
        label: 'Email Input',
        behavior: {
            ...INPUT
        },
        config: {
            placeholder: 'test@test.cl'
        },
        validators: {
            email: {
                message: 'this is not a valid email'
            }
        }
    },
    {
        key: 'SimpleRadio',
        label: 'Yes or No?',
        behavior: {
            ...RADIO_GROUP
        },
        config: {
            dataset: 'assertion',
            clearable: true
        },
        validators: {
            required: true
        }
    },
    {
        key: 'SimpleToggler',
        label: 'Enable it?',
        behavior: {
            ...TOGGLER
        },
        config: {
            toggle: true,
            label: 'this is a optional label!'
        }
    },
    {
        key: 'SimpleCheckbox',
        label: 'Select something',
        behavior: {
            ...CHECKBOX,
            columns: {
                xs: 12,
                md: 12,
                lg: 12
            }
        },
        config: {
            dataset: 'manyOptions',
            clearable: true,
            max: 5
        },
        validators: {
            required: true,
            length: {
                minimum: 2,
                maximum: 4,
                tooShort: 'must be select at least %{count} options',
                tooLong: 'must be select less than %{count} options'
            }
        }
    },
    {
        key: 'SimpleSelect',
        label: 'Select Select Select!',
        behavior: {
            ...SELECT
        },
        config: {
            dataset: 'city',
            search: true,
            clearable: true,
            selectOnBlur: false,
            placeholder: 'Select something',
            noResultsMessage: 'No results here!'
        },
        validators: {
            required: true
        }
    },
    {
        key: 'MultipleSelect',
        label: 'Select Select Select!',
        behavior: {
            ...SELECT_MULTIPLE
        },
        config: {
            dataset: 'city',
            // fluid: true,
            search: true,
            clearable: true,
            selectOnBlur: false,
            multiple: true,
            placeholder: 'Select many',
            noResultsMessage: 'No results here!'
        },
        validators: {
            required: true
        }
    },
    {
        key: 'group-2',
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
            label: 'Other Group Here!'
        }
    },
    {
        key: 'DateTimePicker',
        label: 'A Date Time picker',
        behavior: {
            ...DATE_PICKER
        },
        config: {
            type: 'date',
            displayFormat: 'dd-MM-yyyy',
            // disabledDates:{ disabledDates }
            min: addDays(new Date(), -2),
            max: addDays(new Date(), 7),
            showClearButton: false,
            useMaskBehavior: true
        }
    },
    {
        key: 'TimePicker',
        label: 'A Time Picker',
        behavior: {
            ...TIME_CIRCULAR_PICKER
        },
        config: {
            hour24Mode: false,
            clearable: true
        }
    },
    {
        key: 'TestAreaInput',
        label: 'Text Area Input',
        behavior: {
            ...TEXTAREA,
            columns: {
                xs: 12,
                md: 12,
                lg: 12
            }
        },
        config: {
            placeholder: 'a text area'
        },
        validators: {
            length: {
                minimum: 10,
                maximum: 20,
                tooShort: 'must be at least %{count} characters',
                tooLong: 'must be less than %{count} characters'
            }
        }
    }
];

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
            key: 'santiago',
            value: 'santiago',
            text: 'Santiago'
        },
        {
            key: 'chillan',
            value: 'chillan',
            text: 'Chillán'
        },
        {
            key: 'san-carlos',
            value: 'san-carlos',
            text: 'San Carlos'
        }
    ],
    manyOptions: [
        {
            value: 1,
            label: 'Option 1'
        },
        {
            value: 2,
            label: 'Option 2'
        },
        {
            value: 3,
            label: 'Option 3'
        },
        {
            value: 4,
            label: 'Option 4'
        },
        {
            value: 5,
            label: 'Option 5'
        },
        {
            value: 'Super Option',
            label: 'Super Option'
        },
        {
            value: 7,
            label: 'Option 7'
        }
    ]
};
