import { useEffect } from 'react';

// defaults site title.
const DEFAULT_TITLE = process.env.REACT_APP_TITLE;

/**
 * Sets document title.
 *
 * @param {string} title document title.
 */
export function useDocumentTitle(title)
{
    useEffect(() =>
    {
        document.title = title ?? DEFAULT_TITLE;
    }, [ title ]);
}
