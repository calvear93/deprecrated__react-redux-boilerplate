import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { AzureActiveDirectoryAction } from '../../store/actions';
import Loader from '../../components/Loader';

/**
 * Azure Active Directory security wrapper for React.
 *
 * @param {JSX} children component for render on authentication ok.
 * @param {JSX} loader authentication loading.
 * @param {array} whitelist routes whitelist.
 * @param {bool} enabled authentication is enabled.
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
    // gets authentication state.
    const { authenticated, error } = useSelector(
        store => store[AzureActiveDirectoryAction.Key],
        shallowEqual
    );
    const dispatch = useDispatch();
    // validates current path for whitelist.
    const { pathname } = useLocation();

    // adds error route to whitelist.
    whitelist.push(errorRoute);

    const isAuthorized = !enabled || whitelist.includes(pathname) || authenticated;

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
        <Loader message='Autenticando' />
    );
}
