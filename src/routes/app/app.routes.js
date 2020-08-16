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
 * Last modified  : 2020-08-15 20:43:50
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

export default {
    // root app page.
    MainPage: {
        key: 'Main',
        title: 'Inicio',
        path: '/main',
        exact: true,
        // specific layout config props.
        layoutConfig: {
            header: {
                title: 'ENCABEZADO'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        },
        Layout: Layouts.AppLayout,
        Child: Pages.MainPage
    },
    // playground router with nested paths.
    PlaygroundRouter: {
        key: 'PlaygroundRouter',
        title: 'Playground',
        path: '/playground', // base path for nested routes.
        // specific layout config props.
        layoutConfig: {
            header: {
                title: 'ÁREA DE PLAYGROUND'
            },
            footer: {
                text: 'PIE DE PÁGINA'
            }
        },
        Layout: Layouts.AppLayout,
        Child: Routers.PlaygroundRouter
    },
    // on unauthorized access.
    Unauthorized: {
        key: 'Unauthorized',
        title: 'Sin Autorización',
        path: '/401',
        exact: true,
        Layout: Layouts.BaseLayout,
        Child: Pages.UnauthorizedPage
    }
};
