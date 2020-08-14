import React from 'react';

/**
 * Header for App Layout.
 *
 * @param {object} props component props.
 * @param {string} props.title header title.
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
