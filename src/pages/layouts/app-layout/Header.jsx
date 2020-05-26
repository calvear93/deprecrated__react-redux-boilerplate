import React from 'react';

/**
 * Header for App Layout.
 *
 * @param {string} title header title.
 *
 * @returns {JSX} header component.
 */
export default function Header({ title })
{
    return (
        <header>
            {title}
        </header>
    );
}
