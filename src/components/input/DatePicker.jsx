import React, { useState, useMemo } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import ModernDatePicker from 'react-modern-calendar-datepicker';
import { getYear, getMonth, getDate } from 'date-fns';
import Time from '../../utils/libs/time';
import { datePickerLocaleES } from './shared';
import color from '../../styles/vars/_colors.scss';

/**
 * Date Picker wrapper for
 * React Modern Calendar Datepicker.
 *
 * @see https://kiarash-z.github.io/react-modern-calendar-datepicker/
 *
 * @export
 * @param {Date} date selected.
 * @param {func} onChange on selected date callback.
 * @param {string} format format by date-fns.
 * @param {string} placeholder input placeholder.
 * @param {any} props other picker props.
 *
 * @returns {JSX} date picker.
 */
export default function DatePicker({
    value = null,
    onChange,
    format = 'yyyy-MM-dd',
    placeholder,
    ...props })
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
        <div className='ui input'>
            <input
                readOnly
                ref={ ref }
                placeholder={ placeholder }
                value={ date ? Time.Date(date, format) : '' }
            />
        </div>
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
