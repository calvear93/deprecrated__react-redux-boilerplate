import { useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Icon, Radio } from 'semantic-ui-react';
import { CustomOnChangeEvent } from '../shared';
import './radio-group.scss';

/**
 * Renders a radio group.
 *
 * @param {object} props component props.
 * @param {string} props.id component id.
 * @param {string} props.group id of radio group.
 * @param {Array} props.options array of options (value, label).
 * @param {Function} [props.onChange] onChange event.
 * @param {any} [props.checked] what option value is checked.
 * @param {boolean} [props.disabled] whether radio group is disabled.
 * @param {boolean} [props.clearable] whether radio group is clearable.
 * @param {object} [props.props] rest of props.
 *
 * @returns {React.ReactElement} radio group.
 */
export default function RadioGroup({
    id,
    group,
    options,
    onChange,
    checked = null,
    disabled,
    clearable,
    ...props
})
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
        // creates custom event.
        let event = CustomOnChangeEvent({
            id: group,
            value: null
        });
        onChange && onChange(event, event.target);
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
