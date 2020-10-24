/**
 * Contains the application root routes
 * for App Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary App routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-10-24 16:17:39
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    Base: lazy(() => import('layouts/base-layout')),
    App: lazy(() => import('layouts/app-layout'))
};

// pages container.
const Pages = {
    Main: lazy(() => import('pages/main')),
    Unauthorized: lazy(() => import('pages/unauthorized'))
};

// routers container.
const Routers = {
    Playground: lazy(() => import('routes/playground'))
};

export default [
    {
        key: 'main-page',
        title: 'Inicio',
        path: '/main',
        exact: true,
        Layout: {
            Render: Layouts.App,
            // layout props
            header: {
                title: 'ENCABEZADO'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        },
        Child: Pages.Main
    },
    // playground router with nested paths.
    {
        key: 'playground-router',
        title: 'Playground',
        path: '/playground', // base path for nested routes.
        Layout: {
            Render: Layouts.App,
            header: {
                title: 'ÁREA DE PLAYGROUND'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        },
        Child: Routers.Playground
    },
    // blank html page for load authentication iframe to refresh the token,
    // also, you should set REACT_APP_AAD_LOGIN_ACTION_REDIRECT as '/auth' route.
    {
        key: 'auth-page',
        title: 'Autenticando',
        path: '/auth',
        exact: true,
        Child: () => null
    },
    // on unauthorized access.
    {
        key: 'unauthorized-page',
        title: 'Sin Autorización',
        path: '/401',
        exact: true,
        Layout: Layouts.Base,
        Child: Pages.Unauthorized
    }
];
