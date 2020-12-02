import { useEffect } from 'react';

/**
 * Loads UI Styles.
 */
export function useUI()
{
    useEffect(() =>
    {
        require('./styles/ui.scss');
    }, []);
}
