/**
 * MSAL Microsoft Authentication configuration file.
 *
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 *
 * @summary MSAL config file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-04-15 19:51:39
 * Last modified  : 2020-06-06 10:44:29
 */

import AADTypes from './aad-types';

// offset needed to renew the token before expiry.
const TOKEN_REFRESH_PERIOD = parseInt(process.env.REACT_APP_AAD_TOKEN_RENEWAL_OFFSET_SECONDS);

// default permission scopes for authentication.
export const DEFAULT_SCOPES = [ AADTypes.SCOPES.USER.READ ];

// login redirect URL.
export const LOGIN_ACTION_REDIRECT = process.env.REACT_APP_AAD_LOGIN_ACTION_REDIRECT !== 'null'
    ? `${window.location.origin}${process.env.REACT_APP_AAD_LOGIN_ACTION_REDIRECT}`
    : window.location.origin;

// logout redirect URL.
export const LOGOUT_ACTION_REDIRECT = process.env.REACT_APP_AAD_LOGOUT_ACTION_REDIRECT !== 'null'
    ? `${window.location.origin}${process.env.REACT_APP_AAD_LOGOUT_ACTION_REDIRECT}`
    : window.location.origin;

/**
 *  - clientId                    - Client ID of your app registered with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview in Microsoft Identity Platform
 *  - authority                   - You can configure a specific authority, defaults to " " or "https://login.microsoftonline.com/common"
 *  - validateAuthority           - Used to turn authority validation on/off. When set to true (default), MSAL will compare the application's authority against well-known URLs templates representing well-formed authorities. It is useful when the authority is obtained at run time to prevent MSAL from displaying authentication prompts from malicious pages.
 *  - knownAuthorities            - If validateAuthority is set to True, this will be used to set the Trusted Host list. Defaults to empty array
 *  - redirectUri                 - The redirect URI of the application, this should be same as the value in the application registration portal.Defaults to `window.location.href`.
 *  - postLogoutRedirectUri       - Used to redirect the user to this location after logout. Defaults to `window.location.href`.
 *  - navigateToLoginRequestUrl   - Used to turn off default navigation to start page after login. Default is true. This is used only for redirect flows.
 */
const auth = {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID,
    // https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-client-application-configuration
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AAD_TENANT_ID}`,
    validateAuthority: false,
    redirectUri: LOGIN_ACTION_REDIRECT,
    postLogoutRedirectUri: LOGOUT_ACTION_REDIRECT,
    navigateToLoginRequestUrl: false
};

/**
 * Use this to configure the below cache configuration options:
 *
 * - cacheLocation            - Used to specify the cacheLocation user wants to set. Valid values are "localStorage" and "sessionStorage"
 * - storeAuthStateInCookie   - If set, MSAL store's the auth request state required for validation of the auth flows in the browser cookies. By default this flag is set to false.
 */
const cache = {
    cacheLocation: AADTypes.CACHE.LOCAL_STORAGE,
    storeAuthStateInCookie: false
};

/**
 * Library Specific Options
 *
 * - logger                       - Used to initialize the Logger object;
 * - loadFrameTimeout             - maximum time the library should wait for a frame to load
 * - tokenRenewalOffsetSeconds    - sets the window of offset needed to renew the token before expiry
 * - navigateFrameWait            - sets the wait time for hidden iFrame navigation
 */
const system = {
    loadFrameTimeout: 6000,
    tokenRenewalOffsetSeconds: TOKEN_REFRESH_PERIOD,
    navigateFrameWait: 500
};

/**
 * App/Framework specific environment support
 *
 * - unprotectedResources     - Array of URI's which are unprotected resources. MSAL will not attach a token to outgoing requests that have these URI. Defaults to 'null'.
 * - protectedResourceMap     - This is mapping of resources to scopes used by MSAL for automatically attaching access tokens in web API calls.A single access token is obtained for the resource. So you can map a specific resource path as follows: {"https://graph.microsoft.com/v1.0/me", ["user.read"]}, or the app URL of the resource as: {"https://graph.microsoft.com/", ["user.read", "mail.send"]}. This is required for CORS calls.
 */
const framework = {
    unprotectedResources: [],
    protectedResourceMap: new Map()
};

// MSAL configuration.
export default {
    auth,
    cache,
    system,
    framework
};
