import React from 'react';

/**
 * Header for App Layout.
 *
 * @param {string} title header title.
 *
 * @returns {React.ReactElement} header component.
 */
export default function Header({ title })
{
    return (
        <header>
            {title}
        </header>
    );
}
