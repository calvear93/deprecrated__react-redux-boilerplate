import { useEffect } from 'react';

/**
 * Loads UI Styles.
 */
export function useUI()
{
    useEffect(() =>
    {
        import('@mdi/font/css/materialdesignicons.css');
        import('./styles/ui.scss');
    }, []);
}
