import { AzureActiveDirectorySecurityMode, IsAuthEnabled } from '../services/auth';
import { AzureActiveDirectoryAction } from '../store/actions';
import { usePartition } from './redux';
import { usePathBelongsTo } from './route';

/**
 * Uses MSAL authentication service for
 * validate current user account.
 *
 * @export
 * @param {number} mode AAD route filter mode.
 * @param {array} list list of routes.
 * @param {string} errorRoute route for unauthorized error page.
 *
 * @returns {any} isAuthorized boolean and error object.
 */
export function useIsAuthorized(mode, list, errorRoute)
{
    // gets authentication state.
    const { authenticated, error } = usePartition(AzureActiveDirectoryAction);

    // whether mode is whitelist.
    const isWhitelistMode = mode === AzureActiveDirectorySecurityMode.WHITELIST;
    // adds error route in case of whitelist.
    isWhitelistMode && list.push(errorRoute);
    // whether current path is in list.
    const pathIsInList = usePathBelongsTo(list);

    // validates whether user is authenticated or
    // current path is in a whitelist, on Whitelist mode,
    // or isn't in a blacklist in case of Blacklist mode.
    const isAuthorized = !IsAuthEnabled || authenticated || !(isWhitelistMode ^ pathIsInList);

    // whether account or route is authorized,
    // in otherwise error object.
    return { isAuthorized, error };
}
