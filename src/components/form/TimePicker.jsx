import React, { useRef, useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import { useClickAway } from 'react-use';
import { Icon, Input, Popup, Ref } from 'semantic-ui-react';
import '../../styles/components/time-picker.scss';

/**
 * Time picker based on React Timekeeper.
 * https://catc.github.io/react-timekeeper/#examples
 *
 * @param {string} time time value.
 * @param {bool} hour24Mode time mode.
 * @param {bool} coarseMinutes rounds selected number to increments.
 * @param {bool} forceCoarseMinutes forces minutes to always round to coarseMinutes value.
 * @param {bool} showClearButton whether shows a clear button if any text.
 * @param {bool} onChange on time change.
 * @param {array} props rest of props for input.
 *
 * @returns {JSX} time picker input.
 */
function TimePicker({
    time: inputTime,
    hour24Mode = true,
    coarseMinutes,
    forceCoarseMinutes,
    showClearButton,
    onChange,
    ...props
})
{
    const popup = useRef(null);

    // closes on popup blur.
    useClickAway(popup, () => setShowTime(false));

    const [ time, setTime ] = useState();
    const [ value, setValue ] = useState(inputTime);
    const [ showTime, setShowTime ] = useState(false);

    /**
     * Handles selected value.
     *
     * @param {any} newTime time selected from picker.
     */
    function onTimeChange(newTime)
    {
        const val = hour24Mode ? newTime.formatted24 : newTime.formatted12;
        setValue(val);
        setTime(val);
        onChange && onChange(newTime, { id: props.id, value: val });
    }

    /**
     * Clears input value.
     */
    function onClear()
    {
        setValue('');
        onChange && onChange(null, { id: props.id, value: '' });
    }

    return (
        <Ref innerRef={ popup }>
            <Popup
                basic
                on='click'
                className='time-picker-container'
                open={ showTime }
                trigger={
                    <>
                        <Input
                            icon={ { name: 'time', circular: false } }
                            { ...props }
                            autoComplete='off'
                            onClick={ () => setShowTime(true) }
                            value={ value }
                        />
                        {showClearButton && value && (
                            <Icon
                                className='time-picker-clear'
                                name='x'
                                link
                                title='Limpiar'
                                onClick={ onClear }
                            />
                        )}
                    </>
                }
                content={
                    <TimeKeeper
                        time={ time }
                        coarseMinutes={ coarseMinutes }
                        forceCoarseMinutes={ forceCoarseMinutes }
                        hour24Mode={ hour24Mode }
                        switchToMinuteOnHourSelect
                        closeOnMinuteSelect
                        onChange={ onTimeChange }
                        onDoneClick={ () => setShowTime(false) }
                        doneButton={ () => null }
                        onBlur={ () => setShowTime(false) }
                    />
                }
            />
        </Ref>
    );
}

export default TimePicker;
