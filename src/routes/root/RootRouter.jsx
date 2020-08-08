import React from 'react';
import Router from '../router';
import RootRoutes from './root.routes';

// routes array.
const Routes = Object.values(RootRoutes);

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/main',
        to: '/'
    }
];

/**
 * Application root routing handler.
 *
 * @returns {React.ReactElement} Application root router.
 */
export default function RootRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando' />
    );
}
