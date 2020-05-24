import React, { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Checkbox, Icon } from 'semantic-ui-react';
import '../../styles/components/checkbox.scss';

/**
 * Renders a checkbox group.
 *
 * @param {string} id component id.
 * @param {string} group id of checkbox group.
 * @param {array} options array of options (value, label).
 * @param {func} onChange onChange event.
 * @param {array} checked what options are checked.
 * @param {number} max max of options user can check.
 * @param {bool} disabled whether checkbox group is disabled.
 * @param {bool} clearable whether checkbox group is clearable.
 * @param {any} props rest of props.
 *
 * @returns {JSX} checkbox group.
 */
export default function CheckBox({ id, group, options, onChange, checked = [], max, disabled, clearable, ...props })
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
     * @param {any} id selected id.
     * @param {any} value selected value.
     * @param {any} checked whether is selected.
     */
    function handleChange(e, { id, value, checked })
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
        onChange && onChange(null, { id: group, value: [] });
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
