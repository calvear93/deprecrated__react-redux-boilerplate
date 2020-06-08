/**
 * Contains the application routes
 * for Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary App routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-06-08 08:34:47
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('../layouts/base-layout')),
    AppLayout: lazy(() => import('../layouts/app-layout'))
};

// pages container.
const Pages = {
    MainPage: lazy(() => import('../pages/main')),
    UnauthorizedPage: lazy(() => import('../pages/unauthorized'))
};

export default {
    // root app page.
    Main: {
        key: 'Main',
        title: 'Main Page', // requires at least BaseLayout.
        path: 'main',
        exact: true,
        // specific layout config props.
        layoutConfig: {
            header: {
                title: 'HEADER'
            },
            footer: {
                text: 'FOOTER'
            }
        },
        Layout: Layouts.AppLayout,
        Page: Pages.MainPage
    },
    // on unauthorized access.
    Unauthorized: {
        key: 'Unauthorized',
        title: 'Unauthorized',
        path: '401',
        exact: true,
        Layout: Layouts.BaseLayout,
        Page: Pages.UnauthorizedPage
    }
};
