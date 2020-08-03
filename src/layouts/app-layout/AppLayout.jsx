import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Breadcrumbs from '../../routes/Breadcrumbs';
import './app-layout.scss';

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {React.ReactElement} children component for render inside.
 * @param {any} headerProps header props.
 * @param {any} footerProps footer props.
 * @param {any} props layout props.
 *
 * @returns {React.ReactElement} app layout.
 */
export default function AppLayout({
    children,
    header: headerProps,
    footer: footerProps
})
{
    return (
        <main id='app-layout'>
            <Header { ...headerProps } />

            <Breadcrumbs />

            {children}

            <Footer { ...footerProps } />
        </main>
    );
}
