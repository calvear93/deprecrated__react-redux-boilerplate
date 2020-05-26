import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { usePartition } from '../../hooks/redux';
import { AzureActiveDirectoryAction } from '../../store/actions';
import { usePathBelongsTo } from '../../hooks/route';
import Loader from '../../components/Loader';

/**
 * Azure Active Directory security wrapper for React.
 *
 * @param {JSX} children component for render on authentication ok.
 * @param {array} whitelist routes whitelist.
 * @param {bool} enabled authentication is enabled.
 * @param {string} errorRoute route for authentication error page.
 *
 * @returns {JSX} children on authenticated, error redirection in otherwise.
 */
export default function AzureActiveDirectoryProvider({
    children,
    whitelist = [],
    enabled = true,
    errorRoute
})
{
    const dispatch = useDispatch();
    // gets authentication state.
    const { authenticated, error } = usePartition(AzureActiveDirectoryAction);

    // adds error route to whitelist.
    whitelist.push(errorRoute);
    // validates current path for whitelist.
    const pathAllowed = usePathBelongsTo(whitelist);

    const isAuthorized = !enabled || pathAllowed || authenticated;

    useEffect(() =>
    {
        // dispatches authentication action.
        if (!isAuthorized)
            dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.AUTHENTICATE));
    }, [ authenticated ]);

    return isAuthorized ? (
        children
    ) : error ? (
        <Redirect to={ { pathname: errorRoute, state: error } } />
    ) : (
        <Loader message='Authenticating' />
    );
}
