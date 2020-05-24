import React, { useEffect } from 'react';
import '../../styles/layouts/app-layout.scss';

// defaults site title.
const DEFAULT_TITLE = process.env.REACT_APP_TITLE;

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {JSX} children component for render inside.
 * @param {any} props component props.
 * @returns {JSX} app layout.
 */
export default function AppLayout({ children, title, ...props })
{
    useEffect(() =>
    {
        // sets page document title.
        document.title = title ?? DEFAULT_TITLE;
    });

    return (
        <div className='app-container' { ...props }>
            <header>
                HEADER
            </header>

            <content { ...props }>
                {children}
            </content>

            <footer>
                FOOTER
            </footer>
        </div>
    );
}
