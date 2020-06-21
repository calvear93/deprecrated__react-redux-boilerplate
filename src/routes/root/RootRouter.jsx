import React from 'react';
import Router from '../Router';
import RootRoutes from './root.routes';

// routes array.
const Routes = Object.values(RootRoutes);

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/',
        to: '/main'
    }
];

/**
 * Application root routing handler.
 *
 * @returns {JSX} Application root router.
 */
export default function AppRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando' />
    );
}
