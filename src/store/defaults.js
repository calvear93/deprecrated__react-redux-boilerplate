/**
 * lRedux store default values.
 *
 * @summary Store default values for reducers.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 22:44:51
 * Last modified  : 2020-05-23 20:26:40
 */

import Cookies from 'js-cookie';
import Storage from 'js-storage';

/**
 * Cleans storage and cookies on app build changed.
 */
(() =>
{
    const APP_BUILD_KEY = 'app_build';

    const APP_BUILD = Cookies.get(APP_BUILD_KEY);
    // cleans cached data if build changed.
    if (APP_BUILD !== process.env.REACT_APP_BUILD)
    {
        Cookies.remove();
        Storage.removeAllStorages();
    }
    // saves current app build.
    Cookies.set(APP_BUILD_KEY, process.env.REACT_APP_BUILD);
})();

// sample data defaults.
const SampleDefaults = {};

// aad authentication defaults.
const AzureActiveDirectoryDefaults = {};

export {
    SampleDefaults,
    AzureActiveDirectoryDefaults
};
