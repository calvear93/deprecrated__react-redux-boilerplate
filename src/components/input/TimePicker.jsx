import React, { useRef, useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import { useClickAway } from 'react-use';
import { Icon, Input, Popup, Ref } from 'semantic-ui-react';
import { CustomOnChangeEvent } from './shared';
import '../../styles/components/input/time-picker.scss';

/**
 * Time picker based on React Timekeeper.
 *
 * @see https://catc.github.io/react-timekeeper/
 *
 * @param {string} time time value.
 * @param {bool} hour24Mode time mode.
 * @param {bool} coarseMinutes rounds selected number to increments.
 * @param {bool} forceCoarseMinutes forces minutes to always round to coarseMinutes value.
 * @param {bool} clearable whether shows a clear button if any text.
 * @param {bool} onChange on time change. Sends (newTime, {id, value}).
 * @param {array} props rest of props for input.
 *
 * @returns {JSX} time picker input.
 */
export default function TimePicker({
    time: inputTime = '',
    hour24Mode = true,
    coarseMinutes,
    forceCoarseMinutes,
    clearable,
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
        // creates custom event.
        let event = CustomOnChangeEvent({
            id: props.id,
            value: val
        });
        onChange && onChange(event, event.target);
    }

    /**
     * Clears input value.
     */
    function onClear()
    {
        setValue('');
        // creates custom event.
        let event = CustomOnChangeEvent({
            id: props.id,
            value: ''
        });
        onChange && onChange(event, event.target);
    }

    return (
        <Ref innerRef={ popup }>
            <Popup
                basic
                on='click'
                className='time-picker-container'
                open={ showTime }
                trigger={
                    <Input
                        icon={ (
                            <>
                                {clearable && value && (
                                    <Icon
                                        className='time-picker-clear'
                                        name='x'
                                        link
                                        title='Limpiar'
                                        onClick={ onClear }
                                    />
                                )}
                                <i aria-hidden='true' className='time icon' />
                            </>
                        ) }
                        { ...props }
                        readOnly
                        autoComplete='off'
                        onClick={ () => setShowTime(true) }
                        value={ value }
                    />
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
