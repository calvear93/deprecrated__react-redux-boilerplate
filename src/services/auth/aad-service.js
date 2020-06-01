/**
 * MSAL Microsoft Authentication service.
 *
 * @summary MSAL service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-06-01 19:18:24
 */

import axios from 'axios';
import AuthenticationContext from './aad-context';
import AADTypes from './aad-types';

const DEFAULT_SCOPES = [ AADTypes.SCOPES.USER.READ, AADTypes.SCOPES.EMAIL, AADTypes.SCOPES.PROFILE ];

export default {

    // Authentication context.
    Context: AuthenticationContext,

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {array} scopes array of scopes allowed.
     * @returns {Promise<any>} token container.
     */
    acquireTokenSilent(scopes)
    {
        return AuthenticationContext.acquireTokenSilent({ scopes: scopes ?? DEFAULT_SCOPES });
    },

    /**
     * Redirect to Microsoft AD login if user isn't authenticated.
     * On finishing, redirect to redirectUri.
     *
     * @param {array} scopes permission scopes.
     * @param {bool} force forces to login.
     * @param {func} onSuccess on authorized.
     * @param {func} onError on unauthorized.
     * @param {bool} redirectToMain whether redirect to hostname.
     *
     * @returns {bool} true if is authenticated, false if login is in progress.
     */
    login({
        scopes = DEFAULT_SCOPES,
        force = false,
        onSuccess,
        onError,
        redirectToMain = false
    } = {})
    {
        if (force || !AuthenticationContext.getAccount())
        {
            if (!redirectToMain)
                AuthenticationContext.config.auth.redirectUri = window.location.href;

            // authentication process callback.
            AuthenticationContext.handleRedirectCallback((error, response) =>
            {
                if (response)
                    onSuccess && onSuccess(response);
                else
                    onError && onError(error);
            });
            // redirect method login.
            AuthenticationContext.loginRedirect({
                scopes,
                forceRefresh: false
            });

            // should authenticate.
            return false;
        }
        else
        {
            // authentication is ok.
            return true;
        }
    },

    /**
     * Redirect to Microsoft AD login if user isn't authenticated.
     * On finishing, redirect to redirectUri.
     *
     * @param {array} scopes permission scopes.
     * @param {bool} force forces to login.
     * @param {bool} redirectToMain whether redirect to hostname.
     *
     * @returns {bool} account data if is authenticated, error on failure.
     */
    loginAsync({
        scopes = DEFAULT_SCOPES,
        force = false,
        redirectToMain = false
    } = {})
    {
        return new Promise((resolve, reject) =>
        {
            if (force || !AuthenticationContext.getAccount())
            {
                if (!redirectToMain)
                    AuthenticationContext.config.auth.redirectUri = window.location.href;

                // authentication process callback.
                AuthenticationContext.handleRedirectCallback((error, response) =>
                {
                    if (response)
                        resolve(AuthenticationContext.getAccount());
                    else
                        reject(error);
                });
                // redirect method login.
                AuthenticationContext.loginRedirect({
                    scopes,
                    forceRefresh: false
                });
            }
            else
            {
                // authentication is ok.
                resolve(AuthenticationContext.getAccount());
            }
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

// Graph API helper.
export const Graph = {
    // Graph API base URL.
    URL: `${AADTypes.RESOURCES.MICROSOFT_GRAPH}v1.0/`,

    /**
     * Acquire auth token and sends a request to
     * Microsoft Graph API.
     *
     * @param {any} options axios options. Use api for Graph action.
     * @returns {Promise} response.
     */
    graphRequest(options)
    {
        return new Promise((resolve, reject) =>
        {
            AuthenticationContext.acquireTokenSilent({ scopes: DEFAULT_SCOPES })
                .then(response =>
                {
                    const token = response.accessToken;
                    // builds request config.
                    options = {
                        ...options,
                        url: `${Graph.URL}${options.api}`,
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    // Executes the request.
                    axios(options)
                        .then(res => resolve(res.data))
                        .catch(reject);
                })
                .catch(reject);
        });
    },

    /**
     * User info.
     *
     * @returns {any} user info from AAD.
     */
    me()
    {
        return Graph.graphRequest({ api: 'me', params: { $select: AADTypes.ATTRIBUTES.join(',') } });
    },

    /**
     * User photo in max width.
     *
     * @returns {string} base64 string from user photo.
     */
    photo()
    {
        return new Promise((resolve, reject) =>
        {
            Graph.graphRequest({ api: 'me/photo/$value', responseType: 'blob' })
                .then((response) =>
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(response);
                    reader.onloadend = function()
                    {
                        resolve(reader.result);
                    };
                })
                .catch(reject);
        });
    },

    /**
     * User photo with specified width.
     *
     * @param {string} size photo size.
     * @returns {string} base64 string from user photo.
     */
    photoWithSize(size = '640x640')
    {
        return new Promise((resolve, reject) =>
        {
            Graph.graphRequest({ api: `me/photos/${size}/$value`, responseType: 'blob' })
                .then((response) =>
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(response);
                    reader.onloadend = function()
                    {
                        resolve(reader.result);
                    };
                })
                .catch(reject);
        });
    }
};
