import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RoutesRenderer from './components/RoutesRenderer';
import { AppRoutes } from './routes';
import Loader from './components/Loader';

// lazy loaded components.
const NotFoundPage = lazy(() => import('./pages/not-found'));

// routes array.
const Routes = Object.values(AppRoutes);

/**
 * Application routing handler.
 *
 * Defines routes for application
 * pages, exceptions and intermediate
 * loading sections.
 *
 * @returns {JSX} Application router.
 */
export default function Router()
{
    // allows to arms dynamic nested routes.
    let { path: basePath } = useRouteMatch();

    return (
        <Suspense fallback={ <Loader message='Cargando' /> }>
            <Switch>
                <Redirect exact from='/' to='/main' />

                {
                    Routes
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
                        })
                }

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
