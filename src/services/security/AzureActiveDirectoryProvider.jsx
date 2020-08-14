import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'components/loader';
import { useIsAuthorized } from './aad.hook';
import { AzureActiveDirectoryAction } from 'store/aad';

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
 * @param {object} props component props.
 * @param {React.ReactElement} props.children component for render on authentication ok.
 * @param {number} [props.mode] routes security list mode, may be whitelist or blacklist.
 * @param {array} [props.list] secured routes list.
 * @param {string} [props.errorRoute] route for authentication error page.
 *
 * @returns {React.ReactElement} children on authenticated, error redirection in otherwise.
 */
export default function AzureActiveDirectoryProvider({
    children,
    mode = AzureActiveDirectorySecurityMode.WHITELIST,
    list = [],
    errorRoute
})
{
    const dispatch = useDispatch();
    // evaluates user account and routes for authorization.
    const { isAuthorized, error } = useIsAuthorized(mode, list, errorRoute);

    useEffect(() =>
    {
        // dispatches authentication action.
        if (!isAuthorized && !error)
            dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.AUTHENTICATE));
    }, [ isAuthorized, error, dispatch ]);

    return isAuthorized ? (
        children
    ) : error ? (
        <Redirect to={ { pathname: errorRoute, state: error } } />
    ) : (
        <Loader message='Autenticando' />
    );
}
