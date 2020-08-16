import { SECURITY_ENABLED } from './config';
import { usePartition } from 'hooks/redux.hook';
import { usePathBelongsTo } from 'hooks/route.hook';
import { AuthenticationHandler } from 'store/auth';
import { AuthenticationSecurityMode } from './AuthenticationProvider';

/**
 * Uses MSAL authentication service for
 * validate current user account.
 *
 * @param {number} mode AAD route filter mode.
 * @param {array} list list of routes.
 * @param {string} [errorRoute] route for unauthorized error page.
 *
 * @returns {any} isAuthorized boolean and error object.
 */
export function useIsAuthorized(mode, list, errorRoute)
{
    // gets authentication state.
    const { authenticated, error } = usePartition(AuthenticationHandler);

    // whether mode is whitelist.
    const isWhitelistMode = mode === AuthenticationSecurityMode.WHITELIST;
    // adds error route in case of whitelist.
    isWhitelistMode && list.push(errorRoute);
    // whether current path is in list.
    const pathIsInList = usePathBelongsTo(list);

    // validates whether user is authenticated or
    // current path is in a whitelist, on Whitelist mode,
    // or isn't in a blacklist in case of Blacklist mode.
    const isAuthorized = !SECURITY_ENABLED || authenticated || !(isWhitelistMode ^ pathIsInList);

    // whether account or route is authorized,
    // in otherwise error object.
    return { isAuthorized, error };
}
