import React, { useEffect } from 'react';
import '../../../styles/layouts/base-layout.scss';

// defaults site title.
const DEFAULT_TITLE = process.env.REACT_APP_TITLE;

/**
 * Base layout (wrapper for pages without header/footer).
 *
 * @param {JSX} children component for render inside.
 * @param {any} props component props.
 * @returns {JSX} base layout.
 */
export default function BaseLayout({ children, title, ...props })
{
    useEffect(() =>
    {
        // sets page document title.
        document.title = title ?? DEFAULT_TITLE;
    });

    return (
        <div className='base-container' { ...props }>
            {children}
        </div>
    );
}
