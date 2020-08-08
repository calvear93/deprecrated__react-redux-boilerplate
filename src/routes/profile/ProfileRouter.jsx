import React from 'react';
import Router from '../router';
import ProfileRoutes from './profile.routes';

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
 * Profile routing handler.
 *
 * @returns {React.ReactElement} Profile router.
 */
export default function ProfileRouter()
{
    return (
        <Router routes={ Routes } redirects={ Redirects } message='Cargando Perfil' />
    );
}
