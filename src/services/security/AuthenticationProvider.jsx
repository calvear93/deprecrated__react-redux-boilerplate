import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'components/shared/loader';
import { useIsAuthorized } from './auth.hook';
import { AuthenticationHandler } from 'store/auth';

// AAD route security mode.
export const AuthenticationSecurityMode = {
    WHITELIST: 1,
    BLACKLIST: 0
};

/**
 * Azure Active Directory security wrapper for React.
 *
 * using example:
 *  <AuthenticationProvider
 *      enabled={ true }
 *      mode={ AuthenticationSecurityMode.WHITELIST }
 *      list={ [ '/main' ] }
 *      errorRoute='/401'
 *  >
 *      <Router />
 *  </AuthenticationProvider>
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children component for render on authentication ok.
 * @param {number} [props.mode] routes security list mode, may be whitelist or blacklist.
 * @param {array} [props.list] secured routes list.
 * @param {string} [props.errorRoute] route for authentication error page.
 *
 * @returns {React.ReactElement} children on authenticated, error redirection in otherwise.
 */
function AuthenticationProvider({
    children,
    mode = AuthenticationSecurityMode.WHITELIST,
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
            dispatch(AuthenticationHandler.Authenticate());
    }, [ isAuthorized, error, dispatch ]);

    return isAuthorized ? (
        children
    ) : error ? (
        <Redirect to={ { pathname: errorRoute, state: error } } />
    ) : (
        <Loader message='Autenticando' />
    );
}

export default React.memo(AuthenticationProvider);
