/**
 * MSAL Microsoft Authentication service.
 *
 * @summary MSAL service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-09-07 20:50:16
 */

import { config, types, DEFAULT_SCOPES } from '../config';
import AuthenticationContext from './aad-context';

export default {

    // Authentication context.
    Context: AuthenticationContext,

    // saves current token acquisition request.
    AcquireTokenPromise: null,

    /**
     * Retrieves current access token cached.
     *
     * @param {object} [config] options.
     * @param {Array} [config.scopes] array of scopes allowed.
     *
     * @returns {object} account with cached token.
     */
    acquireTokenInCache({ scopes = DEFAULT_SCOPES } = {})
    {
        return AuthenticationContext.getCachedTokenInternal(scopes, AuthenticationContext.getAccount());
    },

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {object} [config] options.
     * @param {Array} [config.scopes] array of scopes allowed.
     *
     * @returns {Promise<any>} token container.
     */
    acquireTokenSilent({ scopes = DEFAULT_SCOPES } = {})
    {
        if (this.AcquireTokenPromise && AuthenticationContext.getAcquireTokenInProgress())
            return this.AcquireTokenPromise;

        AuthenticationContext.setAcquireTokenInProgress(true);
        // sets token refresh uri as redirect uri for iframe load.
        AuthenticationContext.config.auth.redirectUri = config.auth.tokenRefreshUri;

        return (this.AcquireTokenPromise = AuthenticationContext.acquireTokenSilent({ scopes }))
            .finally(() => AuthenticationContext.setAcquireTokenInProgress(false));
    },

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {object} [config] options.
     * @param {Array} [config.scopes] array of scopes allowed.
     *
     * @returns {Promise<any>} token container.
     */
    acquireToken({ scopes = DEFAULT_SCOPES } = {})
    {
        return new Promise((resolve, reject) =>
        {
            const cached = this.acquireTokenInCache(scopes);

            if (cached && cached.accessToken)
                resolve(cached);

            this.acquireTokenSilent({ scopes })
                .then((account) => resolve(account))
                .catch((err) => reject(err));
        });
    },

    /**
     * Single Sign-On flow.
     *
     * @param {object} [config] options.
     * @param {Array} [config.scopes] array of scopes allowed.
     * @param {string} [config.loginHint] preset account email.
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
                    this.login({ loginHint, scopes, forceTokenRefresh: true })
                        .then((account) => resolve(account))
                        .catch((err) => reject(err));
                });
        });
    },

    /**
     * Redirect to Microsoft AD login if user isn't authenticated.
     * On finishing, redirect to redirectUri.
     *
     * @param {object} [config] options.
     * @param {string} [config.type] login type (redirect or popup).
     * @param {Array} [config.scopes] permission scopes.
     * @param {string} [config.loginHint] preset account email.
     * @param {boolean} [config.forceTokenRefresh] forces to renew token on authentication.
     *
     * @returns {boolean} account data if is authenticated, error on failure.
     */
    login({
        type = types.LOGIN_TYPE.REDIRECT,
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
