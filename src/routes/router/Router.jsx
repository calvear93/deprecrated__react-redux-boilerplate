/**
 * Generic router for render components
 * with optional layouts depending of
 * routes defined in a routing JS file.
 *
 * @summary Generic router.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-07-04 16:42:09
 * Last modified  : 2020-08-08 13:03:32
 */

/* eslint-disable react/no-multi-comp */

import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import RouteChild from './RouteChild';
import Loader from '../../components/loader';

// lazy loaded components.
const NotFoundPage = lazy(() => import('../../pages/not-found'));

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
 * @param {React.ReactElement} DefaultChild default child for showing on bad route.
 *
 * @returns {React.ReactElement} router.
 */
export default function Router({
    routes = [],
    redirects = [],
    message = 'Cargando',
    DefaultChild = NotFoundPage
})
{
    const { pathname: currentPath } = useLocation();
    const { path: basePath } = useRouteMatch();

    return (
        <Suspense fallback={ <Loader message={ message } /> }>
            <Switch>
                <Redirect from='/:url*(/+)' to={ currentPath.slice(0, -1) } />

                {
                    // renders the redirection definitions.
                    redirects
                        .map(({ exact, from, to }, index) => (
                            <Redirect
                                key={ index }
                                exact={ exact }
                                from={ from }
                                to={ to }
                            />
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
                                path,
                                exact,
                                ...rest
                            } = route;

                            // renders the route.
                            return (
                                <Route key={ key } exact={ exact } path={ `${basePath}${path}`.replace(/\/\//g, '/') }>
                                    <RouteChild render={ rest } />
                                </Route>
                            );
                        })
                }

                <Route component={ DefaultChild } />
            </Switch>
        </Suspense>
    );
}