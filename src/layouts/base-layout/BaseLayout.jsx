import React from 'react';
import { useDocumentTitle } from '../../hooks/document';
import '../../styles/layouts/base-layout.scss';

/**
 * Base layout (wrapper for pages without header/footer).
 *
 * @param {JSX} children component for render inside.
 * @returns {JSX} base layout.
 */
export default function BaseLayout({ children, title })
{
    useDocumentTitle(title);

    return (
        <main id='base-layout'>
            {children}
        </main>
    );
}
