import React from 'react';
import { IMaskInput } from 'react-imask';

/**
 * Wrapper for IMaskInput
 *
 * @param {any} props component props.
 *
 * @returns {JSX} masked input.
 */
function InputMasked(props)
{
    return (
        <div className='ui input'>
            <IMaskInput { ...props } />
        </div>
    );
}

export default InputMasked;
