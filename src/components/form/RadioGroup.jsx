import React, { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Icon, Radio } from 'semantic-ui-react';
import '../../styles/components/radio-group.scss';

/**
 * Renders a radio group.
 *
 * @param {string} id component id.
 * @param {string} group id of radio group.
 * @param {array} options array of options (value, label).
 * @param {func} onChange onChange event.
 * @param {any} checked what option value is checked.
 * @param {bool} disabled whether radio group is disabled.
 * @param {bool} clearable whether radio group is clearable.
 * @param {any} props rest of props.
 *
 * @returns {JSX} radio group.
 */
function RadioGroup({ id, group, options, onChange, checked = null, disabled, clearable, ...props })
{
    const [ value, setValue ] = useState(checked);
    // id or group serves as main id.
    group = group ?? id;

    /**
     * Handles option selection.
     *
     * @param {any} e selection event.
     * @param {any} value selected value.
     */
    function handleChange(e, { value })
    {
        setValue(value);
        onChange && onChange(e, { id: group, value });
    }

    /**
     * Clears checkbox value.
     */
    function onClear()
    {
        setValue(null);
        onChange && onChange(null, { id: group, value: null });
    }

    return (
        <Row className='radio-group-container' { ...props }>
            {!!(clearable && (value !== undefined && value !== null && value !== '')) && (
                <Icon
                    className='radio-group-clear'
                    name='x'
                    link
                    title='Limpiar'
                    onClick={ onClear }
                />
            )}
            {options.map(o =>
            {
                const type = typeof o.value;
                o.value = type === 'boolean' ? +o.value : o.value;

                return (
                    <Col key={ o.value } className='radio-group-item'>
                        <Radio
                            id={ `${group}-${o.value}` }
                            name={ group }
                            label={ o.label }
                            value={ o.value }
                            checked={ value === o.value }
                            onChange={ handleChange }
                            disabled={ disabled }
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default RadioGroup;
