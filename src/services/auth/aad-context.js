import * as Msal from 'msal';
import config from './aad-cfg';

// whether AAD authentication is enabled.
export const IsAuthEnabled = process.env.REACT_APP_AAD_ENABLED === 'true';

// DOCS: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
// Initializes MSAL instance.
export default IsAuthEnabled ? new Msal.UserAgentApplication(config) : undefined;
