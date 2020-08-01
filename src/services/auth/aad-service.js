/**
 * MSAL Microsoft Authentication service.
 *
 * @summary MSAL service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-06-27 12:54:06
 */

import { DEFAULT_SCOPES } from './aad-cfg';
import AuthenticationContext from './aad-context';
import AADTypes from './aad-types';

const AuthenticationService = {

    // Authentication context.
    Context: AuthenticationContext,

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {array} scopes array of scopes allowed.
     * @returns {Promise<any>} token container.
     */
    acquireTokenSilent(scopes = DEFAULT_SCOPES)
    {
        return AuthenticationContext.acquireTokenSilent({ scopes });
    },

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {array} scopes array of scopes allowed.
     * @returns {Promise<any>} token container.
     */
    acquireToken(scopes = DEFAULT_SCOPES)
    {
        return new Promise((resolve, reject) =>
        {
            AuthenticationContext.acquireTokenSilent({ scopes })
                .then((account) => resolve(account))
                .catch(() =>
                {
                    AuthenticationContext.acquireTokenPopup({ scopes })
                        .then((token) => resolve(token))
                        .catch((err) => reject(err));
                });
        });
    },

    /**
     * Single Sign-On flow.
     *
     * @param {array} scopes permission scopes.
     * @param {string} loginHint preset account email.
     *
     * @returns {boolean} account data if is authenticated, error on failure.
     */
    sso({
        scopes = DEFAULT_SCOPES,
        loginHint
    } = {})
    {
        return new Promise((resolve, reject) =>
        {
            AuthenticationContext.ssoSilent({ loginHint, scopes })
                .then((account) => resolve(account))
                .catch(() =>
                {
                    AuthenticationService.login({ loginHint, scopes, forceTokenRefresh: true })
                        .then((account) => resolve(account))
                        .catch((err) => reject(err));
                });
        });
    },

    /**
     * Redirect to Microsoft AD login if user isn't authenticated.
     * On finishing, redirect to redirectUri.
     *
     * @param {string} type login type (redirect or popup).
     * @param {array} scopes permission scopes.
     * @param {string} loginHint preset account email.
     * @param {boolean} forceTokenRefresh forces to renew token on authentication.
     *
     * @returns {boolean} account data if is authenticated, error on failure.
     */
    login({
        type = AADTypes.LOGIN_TYPE.REDIRECT,
        scopes = DEFAULT_SCOPES,
        loginHint,
        forceTokenRefresh = false
    } = {})
    {
        return new Promise((resolve, reject) =>
        {
            if (AuthenticationContext.getAccount())
                return resolve(AuthenticationContext.getAccount());

            AuthenticationContext.acquireTokenSilent({ scopes })
                .then(() => resolve(AuthenticationContext.getAccount()))
                .catch(() =>
                {
                    // authentication process callback.
                    AuthenticationContext.handleRedirectCallback((error, response) =>
                    {
                        if (response)
                            resolve(AuthenticationContext.getAccount());
                        else
                            reject(error);
                    });

                    // redirect method login.
                    AuthenticationContext[type]({
                        scopes,
                        loginHint,
                        forceRefresh: forceTokenRefresh
                    });
                });
        });
    },

    /**
     * Whether account is authenticated.
     *
     * @returns {boolean} true if authenticated, false in otherwise.
     */
    isAuthenticated()
    {
        return !!AuthenticationContext.getAccount();
    },

    /**
     * Logouts and redirects to postLogoutRedirectUri.
     */
    logout()
    {
        AuthenticationContext.logout();
    },

    /**
     * Clear all access tokens in the cache.
     */
    clearCache()
    {
        AuthenticationContext.clearCache();
    },

    /**
     * Returns current account data.
     *
     * @returns {any} account data.
     */
    getAccount()
    {
        return AuthenticationContext.getAccount();
    },

    /**
     * Returns current account claims.
     *
     * @returns {any} account claims.
     */
    getClaims()
    {
        return AuthenticationContext.getAccount()?.idTokenClaims;
    },

    /**
     * Returns current account roles.
     *
     * @returns {any} account roles.
     */
    getRoles()
    {
        const claims = AuthenticationContext.getAccount()?.idTokenClaims;

        if (Object.prototype.hasOwnProperty.call(claims, 'roles'))
            return claims.roles;

        return null;
    }
};

export default AuthenticationService;
