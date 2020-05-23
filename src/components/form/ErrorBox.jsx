import React from 'react';
import { Message } from 'semantic-ui-react';
import '../../styles/components/error-box.scss';

/**
 * Shows a error box.
 *
 * @param {string} header box title.
 * @param {any} error error object.
 * @param {array} messages extra messages.
 * @param {bool} visible whether box is visible.
 *
 * @returns {JSX} error box.
 */
function ErrorBox({ header, error, messages = [], visible = true })
{
    return visible && error ? (
        <Message
            className='error-box'
            error
            header={ header }
            list={ [ error.error?.message, error.message, ...messages ] }
        />
    ) : (null);
}

export default ErrorBox;
