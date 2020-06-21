import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { usePartition } from '../../hooks/redux';
import { AzureActiveDirectoryAction } from '../../store/actions';
import { usePathBelongsTo } from '../../hooks/route';
import Loader from '../../components/Loader';

// AAD route security mode.
export const AzureActiveDirectorySecurityMode = {
    WHITELIST: 1,
    BLACKLIST: 0
};

/**
 * Azure Active Directory security wrapper for React.
 *
 * using example:
 *  <AzureActiveDirectoryProvider
 *      enabled={ true }
 *      mode={ AzureActiveDirectorySecurityMode.WHITELIST }
 *      list={ [ '/main' ] }
 *      errorRoute='/401'
 *  >
 *      <Router />
 *  </AzureActiveDirectoryProvider>
 *
 * @param {JSX} children component for render on authentication ok.
 * @param {bool} enabled authentication is enabled.
 * @param {number} mode routes security list mode, may be whitelist or blacklist.
 * @param {array} list secured routes list.
 * @param {string} loginRoute route for login page. When sets, avoid to automatic authentication.
 * @param {string} errorRoute route for authentication error page.
 *
 * @returns {JSX} children on authenticated, error redirection in otherwise.
 */
export default function AzureActiveDirectoryProvider({
    children,
    enabled = true,
    mode = AzureActiveDirectorySecurityMode.WHITELIST,
    list = [],
    loginRoute,
    errorRoute
})
{
    const dispatch = useDispatch();
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
    const isAuthorized = !enabled || authenticated || !(isWhitelistMode ^ pathIsInList);

    useEffect(() =>
    {
        // dispatches authentication action.
        if (!isAuthorized && !loginRoute)
            dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.AUTHENTICATE));
    }, [ isAuthorized ]);

    return isAuthorized ? (
        children
    ) : error ? (
        <Redirect to={ { pathname: errorRoute, state: error } } />
    ) : loginRoute ? (
        <Redirect to={ loginRoute } />
    ) : (
        <Loader message='Autenticando' />
    );
}
