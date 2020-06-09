import React from 'react';
import Router from '../components/Router';
import { AppRoutes } from '../routes';

// routes array.
const Routes = Object.values(AppRoutes);

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/',
        to: '/main'
    }
];

/**
 * Application routing handler.
 *
 * @returns {JSX} Application router.
 */
export default function AppRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando' />
    );
}
