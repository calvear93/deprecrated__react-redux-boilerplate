import React from 'react';

/**
 * Footer for App Layout.
 *
 * @param {string} text footer text.
 *
 * @returns {React.ReactElement} footer component.
 */
export default function Footer({ text })
{
    return (
        <footer>
            {text}
        </footer>
    );
}
