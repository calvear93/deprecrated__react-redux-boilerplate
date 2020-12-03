import { useEffect } from 'react';

/**
 * Loads UI Styles.
 */
export function useUI()
{
    useEffect(() =>
    {
        import('./styles/ui.scss');
    }, []);
}
