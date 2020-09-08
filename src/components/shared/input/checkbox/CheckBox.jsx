import React, { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Checkbox, Icon } from 'semantic-ui-react';
import { CustomOnChangeEvent } from '../shared';
import './checkbox.scss';

/**
 * Renders a checkbox group.
 *
 * @param {object} props component props.
 * @param {string} props.id component id.
 * @param {string} props.group id of checkbox group.
 * @param {Array} props.options array of options (value, label).
 * @param {Function} [props.onChange] onChange event.
 * @param {Array} [props.checked] what options are checked.
 * @param {number} [props.max] max of options user can check.
 * @param {boolean} [props.disabled] whether checkbox group is disabled.
 * @param {boolean} [props.clearable] whether checkbox group is clearable.
 * @param {object} [props.props] rest of props.
 *
 * @returns {React.ReactElement} checkbox group.
 */
export default function CheckBox({
    id,
    group,
    options,
    onChange,
    checked = [],
    max,
    disabled,
    clearable,
    ...props
})
{
    const [ values, setValues ] = useState(checked);
    // id or group serves as main id.
    group = group ?? id;
    // calculates checkbox restriction on max reached.
    const restricted = max && values.length >= max;

    /**
     * Handles option selection.
     *
     * @param {any} e selection event.
     * @param {object} args event args.
     * @param {any} args.value selected value.
     * @param {boolean} args.checked whether is selected.
     */
    function handleChange(e, { value, checked })
    {
        const newValues = checked ? [ ...values, value ] : [ ...values.filter(v => v !== value) ];
        setValues(newValues);
        onChange && onChange(e, { id: group, value: newValues, last: value });
    }

    /**
     * Clears checkbox value.
     */
    function onClear()
    {
        setValues([]);
        // creates custom event.
        let event = CustomOnChangeEvent({
            id: group,
            value: []
        });
        onChange && onChange(event, event.target);
    }

    return (
        <Row className='checkbox-container' { ...props }>
            {clearable && values.length > 0 && (
                <Icon
                    className='checkbox-clear'
                    name='x'
                    link
                    title='Limpiar'
                    onClick={ onClear }
                />
            )}
            {options
                .map(o =>
                {
                    const type = typeof o.value;
                    o.value = type === 'boolean' ? +o.value : o.value;

                    const isChecked = values.includes(o.value);

                    return (
                        <Col key={ o.value } className='checkbox-item'>
                            <Checkbox
                                id={ `${group}-${o.value}` }
                                name={ group }
                                label={ o.label }
                                value={ o.value }
                                checked={ isChecked }
                                onChange={ handleChange }
                                disabled={ disabled || (restricted && !isChecked) }
                            />
                        </Col>
                    );
                })}
        </Row>
    );
}
