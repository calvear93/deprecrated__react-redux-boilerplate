import React from 'react';
import Router from 'routes/router';
import Routes from './app.routes';

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/',
        to: '/main'
    }
];

/**
 * Application main routing handler.
 *
 * @returns {React.ReactElement} Application main router.
 */
function AppRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando' />
    );
}

export default React.memo(AppRouter);
