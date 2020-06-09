import { useEffect } from 'react';
import { loadMessages, locale } from 'devextreme/localization';
import localeMessages from 'devextreme/localization/messages/es';

/**
 * Loads DevExtreme locale configuration.
 */
export function useDevExtremeLocale()
{
    // initializes DevExtreme config.
    useEffect(() =>
    {
        // DevExpress localization.
        loadMessages(localeMessages);
        locale(navigator.language);
    }, []);
}
