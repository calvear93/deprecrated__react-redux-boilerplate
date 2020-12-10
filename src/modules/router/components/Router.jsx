/**
 * Generic router for render components
 * with optional layouts depending of
 * routes defined in a routing JS file.
 *
 * @summary Generic router.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-07-04 16:42:09
 * Last modified  : 2020-12-10 14:14:17
 */

import { useState, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import RouteChild from './RouteChild';
import RouteService from '../router.service';

/**
 * Routing handler.
 *
 * Renders routes for application
 * pages, exceptions and intermediate
 * loading sections.
 *
 * Use it for define application routers.
 *
 * @param {object} [props] component props.
 * @param {Array} [props.redirects] array of redirects (exact, from, to).
 * @param {React.ReactElement | string} [props.loader] react loader component.
 * @param {React.ReactElement} [props.DefaultChild] default child for showing on bad/undefined route.
 *
 * @returns {React.ReactElement} router.
 */
export default function Router({
    redirects = [],
    loader = 'Cargando',
    DefaultChild = null
})
{
    const [ routes, setRoutes ] = useState(RouteService.Routes);
    const { pathname: currentPath } = useLocation();

    RouteService.setRoutesOnChangeListener(() => setRoutes(RouteService.Routes));

    return (
        <Suspense fallback={ loader }>
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
                                ...rest
                            } = route;

                            // renders the route.
                            return (
                                <Route exact key={ key } path={ path }>
                                    <RouteChild render={ rest } />
                                </Route>
                            );
                        })
                }

                {DefaultChild ? (
                    <Route component={ DefaultChild } />
                ) : (
                    <Redirect to={ RouteService.BasePath } />
                )}
            </Switch>
        </Suspense>
    );
}
