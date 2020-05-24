import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import Routes from './rules/routes';

// lazy loaded components.
const NotFoundPage = lazy(() => import('./pages/notfound'));
const NotAuthorizedPage = lazy(() => import('./pages/notauthorized'));

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
                            // route values.
                            const { key, title, path, config, Layout, Page, ...props } = route;

                            return (
                                <Route key={ key } path={ path } { ...config }>
                                    <Layout title={ title }>
                                        <Page { ...props } />
                                    </Layout>
                                </Route>
                            );
                        })
                }

                <Route exact path='/notauthorized' component={ NotAuthorizedPage } />

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
