import { useEffect } from 'react';

/**
 * Loads UI Styles.
 */
export function useUI()
{
    useEffect(() =>
    {
        require('styles/modules/ui.scss');
        require('styles/app.scss');
    }, []);
}
