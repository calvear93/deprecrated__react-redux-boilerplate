import { DateBox } from 'devextreme-react';
import { Checkbox, Input, Select } from 'semantic-ui-react';
import { CheckBox, InputMasked, RadioGroup, TextArea, TimePicker } from '../input';
import Separator from './Separator';

export default {
    SEPARATOR: {
        component: Separator,
        divider: true
    },
    INPUT: {
        component: Input,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        default: ''
    },
    TEXTAREA: {
        component: TextArea,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        default: ''
    },
    INPUT_MASKED: {
        component: InputMasked,
        onChangeSwitch: (func) => ({ onAccept: func }),
        onChangeMapper: (key, receptor) => (value, mask) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        default: ''
    },
    SELECT: {
        component: Select,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        default: ''
    },
    DATE_PICKER: {
        component: DateBox,
        onChangeSwitch: (func) => ({ onValueChanged: func }),
        onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
        valueMapper: (value) => ({ value }),
        default: null
    },
    TIME_PICKER: {
        component: DateBox,
        onChangeSwitch: (func) => ({ onValueChanged: func }),
        onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
        valueMapper: (value) => ({ defaultValue: value }),
        default: null
    },
    TIME_CIRCULAR_PICKER: {
        component: TimePicker,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        valueMapper: (value) => ({ time: value }),
        default: ''
    },
    TOGGLER: {
        component: Checkbox,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, checked }) => receptor(key, checked),
        valueMapper: (value) => (value ? { checked: true } : { checked: false }),
        default: false
    },
    RADIO_GROUP: {
        component: RadioGroup,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
        // valueMapper: (value) => (value ? { checked: true } : { checked: false }),
        valueMapper: (value) => ({ checked: value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        default: null
    },
    CHECKBOX: {
        component: CheckBox,
        onChangeSwitch: (func) => ({ onChange: func }),
        onChangeMapper: (key, receptor) => (_, { id, value, last }) => receptor(key, value),
        valueMapper: (value) => ({ checked: value }),
        optionsMapper: (dataset, key) => ({ options: dataset[key] }),
        default: []
    }
};
