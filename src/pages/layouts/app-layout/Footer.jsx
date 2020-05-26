import React from 'react';

/**
 * Footer for App Layout.
 *
 * @param {string} text footer text.
 *
 * @returns {JSX} footer component.
 */
export default function Footer({ text })
{
    return (
        <footer>
            {text}
        </footer>
    );
}
