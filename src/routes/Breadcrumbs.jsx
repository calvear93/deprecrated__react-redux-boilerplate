import React from 'react';
import DynamicBreadcrumbs from 'react-router-dynamic-breadcrumbs';
import { routes as rootRoutes } from './root';
import { routes as profileRoutes } from './profile';

// arms breadcrumbs.
const breadcrumbs = {
    ...GenerateBreadcrumbs(rootRoutes),
    ...GenerateBreadcrumbs(profileRoutes, '/profile')
};

// routes array.
const routes = Object.keys(breadcrumbs);

/**
 * Arms breadcrumbs object for
 * dynamic breadcrumbs.
 *
 * @param {any} routes routes definitions.
 * @param {string} basePath base path.
 * @returns {any} breadcrumbs definitions.
 */
function GenerateBreadcrumbs(routes, basePath = '')
{
    return Object.values(routes)
        .filter(r => !r.router)
        .reduce((breadcrumbs, route) =>
        {
            breadcrumbs[`${basePath}${route.path.replace(/\/$/, '')}`] = route.title;

            return breadcrumbs;
        }, {});
}

/**
 * Dynamic breadcrumbs for
 * React Router v4+.
 *
 * @export
 * @returns {React.ReactElement} breadcrumbs.
 */
export default function Breadcrumbs()
{
    return (
        <DynamicBreadcrumbs
            mappedRoutes={ breadcrumbs }
            WrapperComponent={ ({ children }) => (
                <div className='ui breadcrumb'>{children}</div>
            ) }
            ActiveLinkComponent={ ({ children }) => (
                <div className='active section'>{children}</div>
            ) }
            LinkComponent={ ({ children }) =>
            {
                // route isn't defined.
                if (!routes.includes(children.props.to))
                    return null;

                return (
                    <>
                        <div className='section'>{children}</div>
                        <i aria-hidden='true' className='right angle icon divider' />
                    </>
                );
            } }
        />
    );
}
