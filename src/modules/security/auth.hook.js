import { useEffect, useState } from 'react';
import { types } from './config';
import { cacheAsyncCallback } from './cache.util';
import { AuthenticationService, GraphService } from './services';

/**
 * Returns login function and
 * current authentication state.
 *
 * @export
 *
 * @param {string} [loginType] login type (redirect or popup).
 *  Avoid using POPUP type on programatic/automatic login, should be used
 *  on user interaction (i.e. button push, page navigation triggered by user, etc.)
 *
 * @returns {Array<any>} login function and auth state
 *  (authenticated, authenticating and error).
 */
export function useLogin(loginType = types.LOGIN_TYPE.REDIRECT)
{
    const [ disabled, setDisabled ] = useState(true);
    const state = useAuthentication(disabled, loginType);

    function login()
    {
        setDisabled(false);
    }

    return [ login, state ];
}

/**
 * Returns logout function and
 * current authentication state.
 *
 * @export
 *
 * @returns {Array<any>} logout function and auth state
 *  (only authenticated).
 */
export function useLogout()
{
    return () =>
    {
        if (AuthenticationService.isAuthenticated())
        {
            AuthenticationService.clearCache();
            AuthenticationService.logout();
        }
    };
}

/**
 * Executes Active Directory
 * automatic account validation.
 *
 * @export
 *
 * @param {boolean} [disabled] whether authentication is disabled.
 * @param {string} [loginType] login type (redirect or popup).
 *  Avoid using POPUP type on programatic/automatic login, should be used
 *  on user interaction (i.e. button push, page navigation triggered by user, etc.)
 *
 * @returns {object} authenticating (bool),
 *  authenticated (bool) and error (Error) data.
 */
export function useAuthentication(disabled = false, loginType = types.LOGIN_TYPE.REDIRECT)
{
    const [ authenticated, setAuthenticated ] = useState(AuthenticationService.isAuthenticated() || disabled);
    const [ authenticating, setAuthenticating ] = useState(!authenticated);
    const [ error, setError ] = useState();

    useEffect(() =>
    {
        if (!authenticated)
        {
            AuthenticationService.login({ type: loginType })
                .then(() => setAuthenticated(true))
                .catch((error) => setError(error))
                .finally(() => setAuthenticating(false));
        }
    }, [ authenticated ]);

    useEffect(() =>
    {
        const isAuthenticated = AuthenticationService.isAuthenticated() || disabled;

        setAuthenticated(isAuthenticated);
        setAuthenticating(!isAuthenticated);
    }, [ disabled ]);

    return { authenticating, authenticated, error };
}

/**
 * Retrieves Active Directory
 * account info from Graph Service.
 *
 * @export
 *
 * @param {boolean} [disabled] whether authentication is disabled.

 * @returns {object} loading, error and info properties.
 */
export function useAccountInfo(disabled = false)
{
    const { authenticated } = useAuthentication();
    const [ info, setInfo ] = useState();
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(!disabled && authenticated);

    useEffect(() =>
    {
        if (!disabled && authenticated)
        {
            const { cacheLocation, infoCacheDurationInDays } = AuthenticationService.BaseConfig.cache;

            cacheAsyncCallback(
                `${AuthenticationService.getId()}_info`,
                GraphService.me(),
                {
                    expirationInDays: infoCacheDurationInDays,
                    storageType: cacheLocation
                }
            )
                .then((user) => setInfo(user))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [ authenticated, disabled ]);

    return { loading, info, error };
}

/**
 * Retrieves Active Directory
 * user photograph from Graph Service.
 *
 * @export
 *
 * @param {string} [size] photo size.
 * @param {boolean} [disabled] whether authentication is disabled.

 * @returns {object} loading, error and photo (base64) properties.
 */
export function useUserPhoto(size = '648x648', disabled = false)
{
    const { authenticated } = useAuthentication();
    const [ photo, setPhoto ] = useState();
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(!disabled && authenticated);

    useEffect(() =>
    {
        if (!disabled && authenticated)
        {
            const { cacheLocation, photoCacheDurationInDays } = AuthenticationService.BaseConfig.cache;

            cacheAsyncCallback(
                `${AuthenticationService.getId()}_photo_${size}`,
                GraphService.photoWithSize(size),
                {
                    expirationInDays: photoCacheDurationInDays,
                    storageType: cacheLocation
                }
            )
                .then((photo) => setPhoto(photo))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [ authenticated, disabled ]);

    return { loading, photo, error };
}
