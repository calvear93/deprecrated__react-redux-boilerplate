import { getDate, getMonth, getYear } from 'date-fns';
import { useMemo, useState } from 'react';
import ModernDatePicker from 'react-modern-calendar-datepicker';
import { Icon, Input, Ref } from 'semantic-ui-react';
import { formatDate } from '../../../utils/time.util';
import localeES from './locale-es';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import './date-picker.scss';

/**
 * Date Picker wrapper for
 * React Modern Calendar Datepicker.
 *
 * @see https://kiarash-z.github.io/react-modern-calendar-datepicker/
 *
 * @param {object} props component props.
 * @param {Date} [props.value] date selected.
 * @param {Function} [props.onChange] on selected date callback.
 * @param {string} [props.displayFormat] format by date-fns.
 * @param {string} [props.placeholder] input placeholder.
 * @param {boolean} [props.clearable] whether input is clearable.
 * @param {object} [props.props] other picker props.
 *
 * @returns {React.ReactElement} date picker.
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
                value={ date ? formatDate(date, displayFormat) : '' }
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
            locale={ localeES }
            shouldHighlightWeekends
            // colorPrimary={ color.primary }
            // colorPrimaryLight={ color['primary-light'] }
            { ...props }
        />
    );
}
