import React from 'react';
import { TextArea as TextAreaSemantic } from 'semantic-ui-react';

/**
 * Wrapper for TextArea.
 *
 * @param {object} props component props.
 *
 * @returns {React.ReactElement} masked input.
 */
export default function TextArea(props)
{
    return (
        <div className='ui form'>
            <TextAreaSemantic { ...props } />
        </div>
    );
}
