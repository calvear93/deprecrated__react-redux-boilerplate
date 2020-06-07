import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
    return (
        <Suspense fallback={ <Loader message='Cargando' /> }>
            <Switch>
                <Redirect exact from='/' to='/main' />

                <RoutesRenderer routes={ Routes } />

                <Route component={ NotFoundPage } />
            </Switch>
        </Suspense>
    );
}
