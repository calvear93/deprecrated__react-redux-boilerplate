import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { useDocumentTitle } from '../../hooks/document';
import '../../styles/layouts/app-layout.scss';

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
    useDocumentTitle(title);

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
