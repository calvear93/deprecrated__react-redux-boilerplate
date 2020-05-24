import * as Msal from 'msal';
import config from './aad-cfg';

// DOCS: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
// Initializes MSAL instance.
export default new Msal.UserAgentApplication(config);
