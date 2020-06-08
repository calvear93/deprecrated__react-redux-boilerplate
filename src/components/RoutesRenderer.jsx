import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

/**
 * Renders an array of routes
 * for Router components.
 *
 * @export
 * @param {array} routes array with routes definition.
 *
 * @returns {JSX} routes rendered.
 */
export default function RoutesRenderer({ routes = {} })
{
    // allows to arms dynamic nested routes.
    let { path: basePath } = useRouteMatch();

    return routes
        .map(route =>
        {
            // route config values.
            const {
                key,
                title,
                path,
                exact,
                layoutConfig,
                Layout,
                Page,
                ...props
            } = route;

            // renders the route.
            return (
                <Route key={ key } exact={ exact } path={ `${basePath}${path}` }>
                    {Layout ? (
                        <Layout title={ title } { ...layoutConfig }>
                            <Page { ...props } />
                        </Layout>
                    ) : (
                        <Page { ...props } />
                    )}
                </Route>
            );
        });
}
