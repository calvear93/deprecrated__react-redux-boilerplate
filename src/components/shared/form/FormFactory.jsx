import clsx from 'clsx';
import { Suspense, useEffect, useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { isEmpty } from 'utils/libs/object.lib';
import validate from 'utils/validators';
import Loader from 'components/shared/loader';
import './form-factory.scss';

// defines flex-box default columns.
const columns = {
    xs: 12,
    md: 6,
    lg: 4
};

// default validator config.
const validatorConfig = {
    fullMessages: false,
    format: 'grouped' // grouped (default), flat, detailed.
};

// default onChange interceptor.
const defInterceptor = (key, values, validations, config) =>
{
    return [ values, validations, config ];
};

/**
 * This components is a generic utility for render
 * formulary with a huge control over each input
 * configuration and behavior, with UI ready for
 * showing errors and handle input events.
 *
 * @see https://validatejs.org/
 *
 * @param {object} props component props.
 * @param {any} props.schema inputs configuration.
 * @param {object} [props.defaults] default values for inputs.
 * @param {object} [props.datasets] datasets for use in options inputs.
 * @param {Function} [props.interceptor] functions for intercepts values and validations on change.
 * @param {Function} [props.onChange] callback triggered on every input change.
 *  Receives (key: key of changed input, values: current values,
 *  validations: current input validations, isValid: whether form is valid)
 * @param {boolean} [props.loading] whether form should shows loading indicator.
 * @param {boolean} [props.validateOnMount] whether validation is executed on mounting.
 *
 * @returns {React.ReactElement} form factory.
 */
export default function FormFactory({
    schema,
    defaults = {},
    datasets = {},
    interceptor = defInterceptor,
    onChange,
    loading,
    validateOnMount = true
})
{
    // keeps base configuration memoized.
    const [ defaultConfig, defaultValues, validators ] = useSchema(schema, defaults);
    // inputs config, may be changed by interceptor.
    const [ config, setConfig ] = useState(defaultConfig);
    // current input values.
    const [ values, setValues ] = useState(defaultValues);
    // inputs validations.
    const [ validations, setValidations ] = useState({});
    // whether inputs are changed from it's default value.
    const [ changed, setChanged ] = useState({});
    // whether inputs are changed once at least.
    const [ touched, setTouched ] = useState({});

    // initial validation.
    useEffect(() =>
    {
        if (validateOnMount)
        {
            const newValidations = validate(values, validators, validatorConfig);

            // on change callback.
            onChange && onChange({
                values,
                validations: newValidations,
                isValid: isEmpty(newValidations)
            });

            setValidations(newValidations ?? {});
        }
    }, [ validateOnMount, validators, values, onChange ]);

    /**
     * Updates validations from a
     * single value changing.
     *
     * @param {string} key key of input changed.
     * @param {any} value value.
     *
     * @returns {any} validations.
     */
    function updateValidationFor(key, value)
    {
        validations[key] = validate.single(value, validators[key]);

        if (!validations[key])
            delete validations[key];

        return validations;
    }

    /**
     * Handles on input change
     * event for updates values
     * and validates inputs.
     *
     * @param {string} key key of input changed.
     * @param {any} value value.
     */
    function handleChange(key, value)
    {
        // changes values and validations on demand.
        const [ newValues, newValidations, newConfig ] = interceptor(
            key,
            { ...values, [key]: value },
            { ...updateValidationFor(key, value) },
            { ...config }
        );

        // on change callback.
        onChange && onChange({
            key,
            values: newValues,
            validations: newValidations,
            isValid: isEmpty(newValidations)
        });

        setValues(newValues);
        setValidations(newValidations);
        setConfig(newConfig);

        setChanged({
            ...changed,
            [key]: defaultValues[key] !== value
        });

        !touched[key] && setTouched({
            ...touched,
            [key]: true
        });
    }

    // renders loading indicator.
    if (loading)
    {
        return (
            <Loader message='Cargando Datos de Formulario' absolute={ false } />
        );
    }

    return (
        <Suspense fallback={ <Loader message='Cargando Formulario' absolute={ false } /> }>
            <Row className='form-factory'>
                {
                    schema.map(({ key, label, behavior, validators }) =>
                    {
                        const { onChangeSwitch, onChangeMapper, valueMapper } = behavior;
                        const { dataset, hidden, invisible, ...cfg } = config[key];

                        if (behavior.divider)
                        {
                            return (
                                <Col
                                    key={ key }
                                    className='form-separator-container'
                                    { ...columns }
                                    { ...behavior.columns }
                                >
                                    <Row className='form-item'>
                                        <behavior.Input { ...cfg } />
                                    </Row>
                                </Col>
                            );
                        }

                        return (
                            <Col key={ key } id={ `${key}-container` } { ...columns }
                                { ...behavior.columns }
                                className={ clsx(
                                    'form-item-container',
                                    {
                                        hidden, // display: none
                                        invisible, // visibility: hidden
                                        touched: touched[key], // whether value is changed once at least.
                                        changed: changed[key], // whether value is different from default.
                                        success: !validations[key],
                                        error: validations[key] && touched[key]
                                    }
                                ) }
                            >
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
                                        { ...onChangeSwitch(onChangeMapper(key, handleChange)) }
                                        { ...valueMapper(values[key]) }
                                        { ...(behavior.optionsMapper ? behavior.optionsMapper(datasets, dataset) : {}) }
                                        { ...cfg }
                                    />
                                </Row>
                                {validations[key] && touched[key] && (
                                    <label className='form-item-error-label'>
                                        {validations[key].join(', ')}
                                    </label>
                                )}
                            </Col>
                        );
                    })
                }
            </Row>
        </Suspense>
    );
}

/**
 * Retrieves config, default values
 * and validators from input config.
 *
 * @param {any} schema inputs config.
 * @param {any} defValues default values,
 * @returns {Array} [config, defaultValues, validators]
 */
function useSchema(schema, defValues)
{
    const [ data ] = useState(
        schema.reduce((data, input) =>
        {
            const key = input.key;
            // inputs config.
            data[0][key] = input.config;

            if (!input.behavior.divider)
            {
                // default values.
                data[1][key] = defValues[key] ?? input.behavior.defaultValue;
                // validators.
                data[2][key] = input.validators;
            }

            return data;
        }, [ {}, {}, {} ])
    );

    return data;
}
