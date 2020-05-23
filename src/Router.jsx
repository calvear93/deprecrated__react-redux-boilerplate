import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import Routes from './rules/routes';

// lazy loaded components.
const NotFoundPage = lazy(() => import('./pages/notfound'));

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
                        .map(r => (
                            <Route key={ r.key } exact path={ r.path }>
                                <r.Layout title={ r.title }>
                                    <r.Page />
                                </r.Layout>
                            </Route>
                        ))
                }

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
