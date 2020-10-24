/**
 * Generic router for render components
 * with optional layouts depending of
 * routes defined in a routing JS file.
 *
 * @summary Generic router.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-07-04 16:42:09
 * Last modified  : 2020-09-07 19:10:21
 */

import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import RouteChild from './RouteChild';
import Loader from 'components/shared/loader';

// lazy loaded components.
const NotFoundPage = lazy(() => import('pages/not-found'));

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
 * @param {object} [props] component props.
 * @param {Array} [props.routes] array of routes.
 * @param {Array} [props.redirects] array of redirects (exact, from, to).
 * @param {string} [props.message] loading message.
 * @param {React.ReactElement} [props.DefaultChild] default child for showing on bad route.
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
        <Suspense fallback={ <Loader message={ message } absolute={ false } /> }>
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
                                ...child
                            } = route;

                            // renders the route.
                            return (
                                <Route key={ key } exact={ exact } path={ `${basePath}${path}`.replace(/\/\//g, '/') }>
                                    <RouteChild render={ child } />
                                </Route>
                            );
                        })
                }

                <Route component={ DefaultChild } />
            </Switch>
        </Suspense>
    );
}
