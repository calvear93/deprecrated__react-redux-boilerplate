import { getDate, getMonth, getYear } from 'date-fns';
import React, { useMemo, useState } from 'react';
import ModernDatePicker from 'react-modern-calendar-datepicker';
import { Icon, Input, Ref } from 'semantic-ui-react';
import Time from '../../utils/libs/time';
import { datePickerLocaleES } from './shared';
import color from '../../styles/vars/_colors.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import '../../styles/components/input/date-picker.scss';

/**
 * Date Picker wrapper for
 * React Modern Calendar Datepicker.
 *
 * @see https://kiarash-z.github.io/react-modern-calendar-datepicker/
 *
 * @export
 * @param {Date} date selected.
 * @param {func} onChange on selected date callback.
 * @param {string} displayFormat format by date-fns.
 * @param {string} placeholder input placeholder.
 * @param {bool} clearable whether input is clearable.
 * @param {any} props other picker props.
 *
 * @returns {JSX} date picker.
 */
export default function DatePicker({
    value = null,
    onChange,
    displayFormat = 'yyyy-MM-dd',
    placeholder,
    clearable,
    ...props
})
{
    // default value modules calc.
    const defModules = useMemo(() =>
    {
        if (!value)
            return null;

        return {
            year: getYear(value),
            month: getMonth(value),
            day: getDate(value)
        };
    }, [ value ]);

    const [ date, setDate ] = useState(value);
    const [ modules, setModules ] = useState(defModules);

    // eslint-disable-next-line react/no-multi-comp
    const input = ({ ref }) => (
        <Ref innerRef={ ref }>
            <Input
                icon={ (
                    <>
                        {clearable && date && (
                            <Icon
                                className='date-picker-clear'
                                name='x'
                                link
                                title='Limpiar'
                                onClick={ clear }
                            />
                        )}
                        <i aria-hidden='true' className='calendar icon' />
                    </>
                ) }
                readOnly
                autoComplete='off'
                placeholder={ placeholder }
                value={ date ? Time.Date(date, displayFormat) : '' }
            />
        </Ref>
    );

    /**
     * Handles the date selection.
     *
     * @param {any} selected selected date {year, month, day}.
     */
    function handleChange(selected)
    {
        const { year, month, day } = selected;
        const newDate = new Date(year, month, day);
        setDate(newDate);
        setModules(selected);
        onChange && onChange(newDate);
    }

    /**
     * Clears selected value.
     */
    function clear()
    {
        setDate(null);
        setModules(null);
        onChange && onChange(null);
    }

    return (
        <ModernDatePicker
            renderInput={ input }
            value={ modules }
            onChange={ handleChange }
            locale={ datePickerLocaleES }
            shouldHighlightWeekends
            colorPrimary={ color.primary }
            colorPrimaryLight={ color['primary-light'] }
            { ...props }
        />
    );
}
