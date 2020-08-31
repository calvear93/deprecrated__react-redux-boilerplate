import React from 'react';
import Router from 'routes/router';
import Routes from './playground.routes';

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
function PlaygroundRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando Playground' />
    );
}

export default React.memo(PlaygroundRouter);
