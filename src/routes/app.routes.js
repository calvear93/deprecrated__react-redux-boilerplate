/**
 * Contains the application root routes.
 *
 * @summary App routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-11-29 18:37:10
 */

import { lazy } from 'react';
import playgroundRoutes from './playground.routes';

// layouts container.
const Layouts = {
    Base: lazy(() => import('layouts/base')),
    App: lazy(() => import('layouts/app'))
};

// pages container.
const Pages = {
    Main: lazy(() => import('pages/main')),
    Unauthorized: lazy(() => import('pages/unauthorized'))
};

// // routers container.
// const Routers = {
//     Playground: lazy(() => import('routes/playground'))
// };

export default [
    {
        key: 'main-page',
        title: 'Inicio',
        path: '/',
        Layout: Layouts.App,
        Child: Pages.Main,
        payload: {
            header: {
                title: 'ENCABEZADO'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        }
    },
    // playground router with nested paths.
    {
        key: 'playground-router',
        path: '/playground',
        DefaultChild: Pages.NotFound,
        routes: playgroundRoutes,
        Layout: Layouts.App,
        payload: {
            header: {
                title: 'ENCABEZADO'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        }
    },
    // on unauthorized access.
    {
        key: 'unauthorized-page',
        title: 'Sin Autorización',
        path: '/401',
        Layout: Layouts.Base,
        Child: Pages.Unauthorized
    },
    // blank html page for load authentication iframe to refresh the token,
    // also, you should set REACT_APP_AAD_LOGIN_ACTION_REDIRECT as '/auth' route.
    {
        key: 'auth-page',
        title: 'Autenticando',
        path: '/auth',
        Child: () => null
    }
];
