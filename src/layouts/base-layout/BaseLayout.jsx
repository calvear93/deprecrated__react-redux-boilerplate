import React from 'react';
import { useDocumentTitle } from '../../hooks/document';
import '../../styles/layouts/base-layout.scss';

/**
 * Base layout (wrapper for pages without header/footer).
 *
 * @param {JSX} children component for render inside.
 * @param {any} props component props.
 * @returns {JSX} base layout.
 */
export default function BaseLayout({ children, title, ...props })
{
    useDocumentTitle(title);

    return (
        <div className='base-container' { ...props }>
            {children}
        </div>
    );
}
