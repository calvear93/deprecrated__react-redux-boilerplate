import { lazy, Suspense } from 'react';
import Loader from 'modules/ui/components/loader';
import { Router } from '@calvear/react-spa-routerizer';
import { AuthenticationService, useAuthentication } from 'modules/security';

// initializes Microsoft Active Directory authentication service.
AuthenticationService.init({
    disabled: process.env.REACT_APP_AAD_ENABLED !== 'true',
    clientId: process.env.REACT_APP_AAD_CLIENT_ID,
    tenantId: process.env.REACT_APP_AAD_TENANT_ID,
    loginActionRedirect: process.env.REACT_APP_AAD_LOGIN_ACTION_REDIRECT,
    logoutActionRedirect: process.env.REACT_APP_AAD_LOGOUT_ACTION_REDIRECT,
    tokenRefreshUri: process.env.REACT_APP_AAD_TOKEN_REFRESH_URI,
    tokenRenewalOffset: process.env.REACT_APP_AAD_TOKEN_RENEWAL_OFFSET_SECONDS,
    navigateToRequestAfterLogin: process.env.REACT_APP_AAD_NAVIGATE_TO_REQUEST_URL_AFTER_LOGIN,
    infoCacheDurationInDays: process.env.REACT_APP_AAD_USER_INFO_CACHE_EXPIRATION_DAYS,
    photoCacheDurationInDays: process.env.REACT_APP_AAD_USER_AVATAR_CACHE_EXPIRATION_DAYS
});

// not found page for default route.
const DefaultPage = lazy(() => import('pages/not-found'));
const UnauthorizedPage = lazy(() => import('pages/unauthorized'));

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/main',
        to: '/'
    }
];

/**
 * Application main routing handler.
 *
 * @returns {React.ReactElement} Application main router.
 */
export default function AppRouter()
{
    const { authenticating, authenticated } = useAuthentication();

    if (authenticating)
        return <Loader message='Autenticando' />;

    if (!authenticated)
    {
        return (
            <Suspense fallback={ <Loader message='Cargando' /> }>
                <UnauthorizedPage />
            </Suspense>
        );
    }

    return (
        <Router
            redirects={ Redirects }
            loader={ <Loader message='Cargando' /> }
            DefaultChild={ DefaultPage }
        />
    );
}
