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
 * Last modified  : 2020-08-08 14:12:03
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('../../layouts/base-layout')),
    AppLayout: lazy(() => import('../../layouts/app-layout'))
};

// pages container.
const Pages = {
    MainPage: lazy(() => import('../../pages/main')),
    UnauthorizedPage: lazy(() => import('../../pages/unauthorized'))
};

// routers container.
const Routers = {
    ProfileRouter: lazy(() => import('../profile'))
};

export default {
    // root app page.
    Main: {
        key: 'Main',
        title: 'Inicio',
        path: '/',
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
    // profile router with nested paths.
    ProfileRouter: {
        key: 'ProfileRouter',
        title: 'Perfil',
        path: '/profile', // base path for nested routes.
        // specific layout config props.
        layoutConfig: {
            header: {
                title: 'ENCABEZADO DEL PERFIL'
            },
            footer: {
                text: 'PIE DE PÁGINA DEL PERFIL'
            }
        },
        Layout: Layouts.AppLayout,
        Child: Routers.ProfileRouter
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
