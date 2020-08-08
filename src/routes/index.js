import { routes as rootRoutes } from './root';
import { routes as profileRoutes } from './profile';

/**
 * Extract route paths from
 * routes definitions as path -> title.
 *
 * @param {object} routes routes definitions.
 * @param {string} basePath base path.
 *
 * @returns {any} routes.
 */
function ExtractRoutes(routes, basePath = '')
{
    return Object.values(routes)
        .filter(r => !r.router)
        .reduce((paths, route) =>
        {
            paths[`${basePath}${route.path.replace(/\/$/, '')}`] = route.title;

            return paths;
        }, {});
}

// arms routes container.
export const routes = {
    ...ExtractRoutes(rootRoutes),
    ...ExtractRoutes(profileRoutes, '/profile')
};

export { default } from './root/RootRouter';
