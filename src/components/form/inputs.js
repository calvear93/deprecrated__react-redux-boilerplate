import { DateBox } from 'devextreme-react';
import { Checkbox, Input, Select } from 'semantic-ui-react';
import { CheckBox, InputMasked, RadioGroup, TextArea, TimePicker } from '../input';
import Separator from './Separator';

export default {
    SEPARATOR: {
        Input: Separator,
        divider: true
    },
    INPUT: {
        Input,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        defaultValue: ''
    },
    TEXTAREA: {
        Input: TextArea,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        defaultValue: ''
    },
    INPUT_MASKED: {
        Input: InputMasked,
        onChangeSwitch: (func) => ({ onAccept: func }),
        onChangeMapper: (key, receptor) => (value, mask) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        defaultValue: ''
    },
    SELECT: {
        Input: Select,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        defaultValue: ''
    },
    DATE_PICKER: {
        Input: DateBox,
        onChangeSwitch: (func) => ({ onValueChanged: func }),
        onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        defaultValue: null
    },
    TIME_PICKER: {
        Input: DateBox,
        onChangeSwitch: (func) => ({ onValueChanged: func }),
        onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
        valueMapper: (value) => ({ defaultValue: value }),
        defaultValue: null
    },
    TIME_CIRCULAR_PICKER: {
        Input: TimePicker,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ time: value }),
        defaultValue: ''
    },
    TOGGLER: {
        Input: Checkbox,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, checked }) => receptor(key, checked),
        valueMapper: (value) => (value ? { checked: true } : { checked: false }),
        defaultValue: false
    },
    RADIO_GROUP: {
        Input: RadioGroup,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ checked: value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        defaultValue: null
    },
    CHECKBOX: {
        Input: CheckBox,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value, last }) => receptor(key, value),
        valueMapper: (value) => ({ checked: value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        defaultValue: []
    }
};
