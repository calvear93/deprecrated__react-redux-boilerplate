import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import Routes from './rules/routes';

// lazy loaded components.
const NotFoundPage = lazy(() => import('./pages/not-found'));
const UnauthorizedPage = lazy(() => import('./pages/unauthorized'));

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
    return (
        <Suspense fallback={ <Loader message='Cargando' /> }>
            <Switch>
                <Redirect exact from='/' to='/main' />

                {
                    // maps every rule for route.
                    Object.values(Routes)
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
                                <Route key={ key } exact={ exact } path={ path }>
                                    <Layout title={ title } { ...layoutConfig }>
                                        <Page { ...props } />
                                    </Layout>
                                </Route>
                            );
                        })
                }

                <Route exact path='/401' component={ UnauthorizedPage } />

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
