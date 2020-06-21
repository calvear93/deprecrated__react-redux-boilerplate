import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from '../components/Loader';

// lazy loaded components.
const NotFoundPage = lazy(() => import('../pages/not-found'));

/**
 * Routing handler.
 *
 * Renders routes for application
 * pages, exceptions and intermediate
 * loading sections.
 *
 * Use it for define application
 * routers in this directory.
 *
 * @param {array} routes array of routes.
 * @param {array} redirects array of redirects (exact, from, to).
 * @param {string} message loading message.
 *
 * @returns {JSX} router.
 */
export default function Router({ routes = [], redirects = [], message = 'Cargando' })
{
    const { path: basePath } = useRouteMatch();

    return (
        <Suspense fallback={ <Loader message={ message } /> }>
            <Switch>
                {
                    // renders the redirection definitions.
                    redirects
                        .map(({ exact, from, to }, index) => (
                            <Redirect key={ index } exact={ exact } from={ from } to={ to } />
                        ))
                }

                {
                    // renders the route definitions.
                    routes
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
                                Child,
                                ...props
                            } = route;

                            // renders the route.
                            return (
                                <Route key={ key } exact={ exact } path={ `${basePath}${path}`.replace(/\/\//g, '/') }>
                                    {Layout ? (
                                        <Layout title={ title } { ...layoutConfig }>
                                            <Child { ...props } />
                                        </Layout>
                                    ) : (
                                        <Child { ...props } />
                                    )}
                                </Route>
                            );
                        })
                }

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
