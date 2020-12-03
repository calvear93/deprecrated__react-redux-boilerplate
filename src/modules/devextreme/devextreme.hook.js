import { useEffect } from 'react';
import { loadMessages, locale } from 'devextreme/localization';
import localeMessages from 'devextreme/localization/messages/es';

/**
 * Loads DevExtreme stylesheets
 * and locale configuration.
 */
export function useDevExtreme()
{
    // initializes DevExtreme config.
    useEffect(() =>
    {
        import('./devextreme.scss');
        // DevExpress localization.
        loadMessages(localeMessages);
        locale(navigator.language);
    }, []);
}
