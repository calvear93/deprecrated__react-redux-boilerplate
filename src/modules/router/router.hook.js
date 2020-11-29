import { matchPath, useLocation } from 'react-router';
import RouteService from './router.service';

/**
 * Returns current payload
 * from routes definition.
 *
 * @dependency useLocation and matchPath from react-router.
 *
 * @returns {object} array with route payload and loaded boolean.
 */
export function useRoutePayload()
{
    const { pathname } = useLocation();

    return RouteService.Routes
        .find(r => matchPath(pathname, {
            path: r.path,
            exact: true
        }))
        ?.payload ?? {};
}
