import { useEffect } from 'react';
import { loadMessages, locale } from 'devextreme/localization';
import localeMessages from 'devextreme/localization/messages/es';
import '../styles/modules/devextreme.scss';

/**
 * Loads DevExtreme stylesheets
 * and locale configuration.
 */
export function useDevExtreme()
{
    // initializes DevExtreme config.
    useEffect(() =>
    {
        // DevExpress localization.
        loadMessages(localeMessages);
        locale(navigator.language);
    }, []);
}
