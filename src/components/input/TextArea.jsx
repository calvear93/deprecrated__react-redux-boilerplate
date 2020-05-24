import React from 'react';
import { Form, TextArea as TextAreaSemantic } from 'semantic-ui-react';

/**
 * Wrapper for IMaskInput
 *
 * @param {any} props component props.
 *
 * @returns {JSX} masked input.
 */
export default function TextArea(props)
{
    return (
        <div className='ui form'>
            <TextAreaSemantic { ...props } />
        </div>
    );
}
