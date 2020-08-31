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
 * Last modified  : 2020-08-31 09:36:33
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('layouts/base-layout')),
    AppLayout: lazy(() => import('layouts/app-layout'))
};

// pages container.
const Pages = {
    MainPage: lazy(() => import('pages/main')),
    UnauthorizedPage: lazy(() => import('pages/unauthorized'))
};

// routers container.
const Routers = {
    PlaygroundRouter: lazy(() => import('routes/playground'))
};

export default [
    {
        key: 'MainPage',
        title: 'Inicio',
        path: '/main',
        exact: true,
        Layout: Layouts.AppLayout,
        Child: Pages.MainPage,
        // specific layout config props.
        layoutConfig: {
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
        key: 'PlaygroundRouter',
        title: 'Playground',
        path: '/playground', // base path for nested routes.
        Layout: Layouts.AppLayout,
        Child: Routers.PlaygroundRouter,
        // specific layout config props.
        layoutConfig: {
            header: {
                title: 'ÁREA DE PLAYGROUND'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        }
    },
    // blank html page for load authentication iframe to refresh the token,
    // also, you should set REACT_APP_AAD_LOGIN_ACTION_REDIRECT as '/auth' route.
    {
        key: 'AuthPage',
        title: 'Autenticando',
        path: '/auth',
        exact: true,
        Child: () => null
    },
    // on unauthorized access.
    {
        key: 'UnauthorizedPage',
        title: 'Sin Autorización',
        path: '/401',
        exact: true,
        Layout: Layouts.BaseLayout,
        Child: Pages.UnauthorizedPage
    }
];
