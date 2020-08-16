import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Breadcrumbs from 'components/shared/breadcrumbs';
import './app-layout.scss';

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children component for render inside.
 * @param {any} props.header header props.
 * @param {any} props.footer footer props.
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
