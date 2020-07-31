import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Breadcrumbs from '../../routes/Breadcrumbs';
import { useDocumentTitle } from '../../hooks/document';
import './app-layout.scss';

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {JSX} children component for render inside.
 * @param {string} title page document title.
 * @param {any} headerProps header props.
 * @param {any} footerProps footer props.
 * @param {any} props layout props.
 *
 * @returns {JSX} app layout.
 */
export default function AppLayout({
    children,
    title,
    header: headerProps,
    footer: footerProps
})
{
    // sets up tab title.
    useDocumentTitle(title);

    return (
        <main id='app-layout'>
            <Header { ...headerProps } />

            <Breadcrumbs />

            {children}

            <Footer { ...footerProps } />
        </main>
    );
}
