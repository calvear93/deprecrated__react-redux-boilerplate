import React, { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../../styles/layouts/app-layout.scss';

// defaults site title.
const DEFAULT_TITLE = process.env.REACT_APP_TITLE;

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {JSX} children component for render inside.
 * @param {string} title page document title.
 * @param {any} headerProps header props.
 * @param {any} footerProps footer props.
 * @param {any} props component props.
 *
 * @returns {JSX} app layout.
 */
export default function AppLayout({
    children,
    title,
    header: headerProps,
    footer: footerProps,
    ...props
})
{
    useEffect(() =>
    {
        // sets page document title.
        document.title = title ?? DEFAULT_TITLE;
    });

    return (
        <div className='app-container' { ...props }>
            <Header { ...headerProps } />

            <content { ...props }>
                {children}
            </content>

            <Footer { ...footerProps } />
        </div>
    );
}
