/**
 * Inputs interfaces definition
 * for Form Factory.
 *
 * definitions are structured as:
 *  Input: input JSX component.
 *  onChangeSwitch: maps onChange function to component's defined function,
 *  onChangeMapper: maps onChange params from component to a (key, value) pair.
 *  valueMapper: maps value (for controlled component),
 *  defaultValue: defines the default value.
 *
 * @summary inputs definition for Form Factory.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-30 17:01:45
 * Last modified  : 2020-05-31 15:50:00
 */

import { DateBox } from 'devextreme-react';
import { Checkbox, Input, Select } from 'semantic-ui-react';
import { CheckBox, InputMasked, RadioGroup, TextArea, TimePicker } from '../input';
import Separator from './Separator';

export const SEPARATOR = {
    Input: Separator,
    divider: true
};

export const INPUT = {
    Input,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const TEXTAREA = {
    Input: TextArea,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const INPUT_MASKED = {
    Input: InputMasked,
    onChangeSwitch: (func) => ({ onAccept: func }),
    onChangeMapper: (key, receptor) => (value, mask) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const SELECT = {
    Input: Select,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: ''
};

export const SELECT_MULTIPLE = {
    Input: Select,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: []
};

export const DATE_PICKER = {
    Input: DateBox,
    onChangeSwitch: (func) => ({ onValueChanged: func }),
    onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: null
};

export const TIME_PICKER = {
    Input: DateBox,
    onChangeSwitch: (func) => ({ onValueChanged: func }),
    onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
    valueMapper: (value) => ({ defaultValue: value }),
    defaultValue: null
};

export const TIME_CIRCULAR_PICKER = {
    Input: TimePicker,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ time: value }),
    defaultValue: ''
};

export const TOGGLER = {
    Input: Checkbox,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, checked }) => receptor(key, checked),
    valueMapper: (value) => (value ? { checked: true } : { checked: false }),
    defaultValue: false
};

export const RADIO_GROUP = {
    Input: RadioGroup,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ checked: value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: null
};

export const CHECKBOX = {
    Input: CheckBox,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value, last }) => receptor(key, value),
    valueMapper: (value) => ({ checked: value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: []
};
