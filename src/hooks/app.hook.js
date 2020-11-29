import { routes } from 'routes';
import { RouterService } from 'modules/router';
import { AuthenticationService } from 'modules/security';

/**
 * Initializes application modules.
 *
 * @export
 */
export function useAppInit()
{
    // initializes routing service.
    RouterService.init(routes);

    // initializes Microsoft Active Directory authentication service.
    // AuthenticationService.init({
    //     clientId: process.env.REACT_APP_AAD_CLIENT_ID,
    //     tenantId: process.env.REACT_APP_AAD_TENANT_ID,
    //     loginActionRedirect: process.env.REACT_APP_AAD_LOGIN_ACTION_REDIRECT,
    //     logoutActionRedirect: process.env.REACT_APP_AAD_LOGOUT_ACTION_REDIRECT,
    //     tokenRefreshUri: process.env.REACT_APP_AAD_TOKEN_REFRESH_URI,
    //     tokenRenewalOffset: process.env.REACT_APP_AAD_TOKEN_RENEWAL_OFFSET_SECONDS,
    //     navigateToRequestAfterLogin: process.env.REACT_APP_AAD_NAVIGATE_TO_REQUEST_URL_AFTER_LOGIN
    // });
}
