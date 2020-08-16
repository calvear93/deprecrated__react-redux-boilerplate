import React from 'react';
import Router from 'routes/router';
import ProfileRoutes from './playground.routes';

// routes array.
const Routes = Object.values(ProfileRoutes);

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/',
        to: '/main'
    }
];

/**
 * Playground routing handler.
 *
 * @returns {React.ReactElement} Playground router.
 */
export default function PlaygroundRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando Playground' />
    );
}
