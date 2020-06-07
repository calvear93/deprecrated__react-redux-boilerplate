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
 * Last modified  : 2020-06-07 13:00:47
 */

import { lazy } from 'react';

// components container.
const Components = {
    Separator: lazy(() => import('./Separator')),
    Input: lazy(() => import('semantic-ui-react').then(module => ({ default: module.Input }))),
    Select: lazy(() => import('semantic-ui-react').then(module => ({ default: module.Select }))),
    Checkbox: lazy(() => import('semantic-ui-react').then(module => ({ default: module.Checkbox }))),
    DateBox: lazy(() => import('devextreme-react').then(module => ({ default: module.DateBox }))),
    DatePicker: lazy(() => import('../input/DatePicker')),
    InputMasked: lazy(() => import('../input/InputMasked')),
    RadioGroup: lazy(() => import('../input/RadioGroup')),
    CheckBox: lazy(() => import('../input/CheckBox')),
    TextArea: lazy(() => import('../input/TextArea')),
    TimePicker: lazy(() => import('../input/TimePicker'))
};

export const SEPARATOR = {
    Input: Components.Separator,
    divider: true
};

export const INPUT = {
    Input: Components.Input,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const TEXTAREA = {
    Input: Components.TextArea,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const INPUT_MASKED = {
    Input: Components.InputMasked,
    onChangeSwitch: (func) => ({ onAccept: func }),
    onChangeMapper: (key, receptor) => (value, mask) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: ''
};

export const SELECT = {
    Input: Components.Select,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: ''
};

export const SELECT_MULTIPLE = {
    Input: Components.Select,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: []
};

export const DATE_PICKER = {
    Input: Components.DatePicker,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (value) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: null
};

export const DATE_BOX = {
    Input: Components.DateBox,
    onChangeSwitch: (func) => ({ onValueChanged: func }),
    onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
    valueMapper: (value) => ({ value }),
    defaultValue: null
};

export const TIME_PICKER = {
    Input: Components.DateBox,
    onChangeSwitch: (func) => ({ onValueChanged: func }),
    onChangeMapper: (key, receptor) => ({ element, value }) => receptor(key, value),
    valueMapper: (value) => ({ defaultValue: value }),
    defaultValue: null
};

export const TIME_CIRCULAR_PICKER = {
    Input: Components.TimePicker,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ time: value }),
    defaultValue: ''
};

export const TOGGLER = {
    Input: Components.Checkbox,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, checked }) => receptor(key, checked),
    valueMapper: (value) => (value ? { checked: true } : { checked: false }),
    defaultValue: false
};

export const RADIO_GROUP = {
    Input: Components.RadioGroup,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value }) => receptor(key, value),
    valueMapper: (value) => ({ checked: value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: null
};

export const CHECKBOX = {
    Input: Components.CheckBox,
    onChangeSwitch: (func) => ({ onChange: func }),
    onChangeMapper: (key, receptor) => (_, { id, value, last }) => receptor(key, value),
    valueMapper: (value) => ({ checked: value }),
    optionsMapper: (dataset, key) => ({ options: dataset[key] }),
    defaultValue: []
};
