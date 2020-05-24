import * as Msal from 'msal';
import config from './aad-cfg';

// Whether AAD authentication is enabled.
const authEnabled = process.env.REACT_APP_AAD_ENABLED === 'true';

// DOCS: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
// Initializes MSAL instance.
export default authEnabled ? new Msal.UserAgentApplication(config) : undefined;
