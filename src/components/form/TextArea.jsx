import React from 'react';
import { Form, TextArea as TextAreaSemantic } from 'semantic-ui-react';

/**
 * Wrapper for IMaskInput
 *
 * @param {any} props component props.
 *
 * @returns {JSX} masked input.
 */
function TextArea(props)
{
    return (
        <Form>
            <TextAreaSemantic { ...props } />
        </Form>
    );
}

export default TextArea;
