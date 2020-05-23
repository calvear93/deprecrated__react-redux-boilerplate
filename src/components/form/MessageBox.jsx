import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';
import '../../styles/components/message-box.scss';

/**
 * Shows a closable message box.
 *
 * @param {bool} icon semantic ui icon.
 * @param {bool} header title.
 * @param {bool} content message text or JSX content.
 * @param {bool} visible whether box is visible.
 *
 * @returns {JSX} message box.
 */
function MessageBox({ message: { icon, header, content, visible } })
{
    const [ isVisible, setVisibility ] = useState(visible);

    /**
     * Hides the message box.
     */
    function dismiss()
    {
        setVisibility(false);
    }

    return isVisible ? (
        <Message
            className='message-box'
            info
            icon={ icon }
            header={ header }
            content={ content }
            onDismiss={ dismiss }
        />
    ) : (null);
}

export default MessageBox;
