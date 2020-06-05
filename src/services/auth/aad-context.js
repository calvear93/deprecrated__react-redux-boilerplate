import * as Msal from 'msal';
import config from './aad-cfg';
import AADTypes from './aad-types';

// whether AAD authentication is enabled.
export const IsAuthEnabled = process.env.REACT_APP_AAD_ENABLED === 'true';
// default permission scopes for authentication.
export const DEFAULT_SCOPES = [ AADTypes.SCOPES.USER.READ ];

/**
 * Initializes MSAL instance.
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
 */
export default IsAuthEnabled ? new Msal.UserAgentApplication(config) : undefined;
