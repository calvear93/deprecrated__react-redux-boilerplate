import { routes as appRoutes } from './app';
import { routes as playgroundRoutes } from './playground';

/**
 * Extract route paths from
 * routes definitions as path -> title.
 *
 * @param {Array} routes routes definitions.
 * @param {string} [basePath] base path.
 *
 * @returns {any} routes.
 */
function ExtractRoutes(routes, basePath = '')
{
    return routes
        .filter(r => !r.router)
        .reduce((paths, route) =>
        {
            paths[`${basePath}${route.path.replace(/\/$/, '')}`] = route.title;

            return paths;
        }, {});
}

// builds routes container.
export const routes = {
    ...ExtractRoutes(appRoutes),
    ...ExtractRoutes(playgroundRoutes, '/playground')
};

// main router for App.
export { default } from './app';
