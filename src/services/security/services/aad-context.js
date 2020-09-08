import * as Msal from 'msal';
import { config, SECURITY_ENABLED } from '../config';

/**
 * Initializes MSAL instance.
 *
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
 */
export default SECURITY_ENABLED ? new Msal.UserAgentApplication(config) : undefined;
