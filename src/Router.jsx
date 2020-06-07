import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoutes } from './routes';
import Loader from './components/Loader';

// lazy loaded components.
const NotFoundPage = lazy(() => import('./pages/not-found'));

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
        <Suspense fallback={ <Loader message='Loading' /> }>
            <Switch>
                <Redirect exact from='/' to='/main' />

                {
                    // maps every app base routes.
                    Object.values(AppRoutes)
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

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
