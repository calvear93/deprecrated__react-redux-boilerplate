/**
 * Contains the application routes
 * for Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary Routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-05-23 21:55:27
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('../pages/layouts/BaseLayout')),
    AppLayout: lazy(() => import('../pages/layouts/AppLayout'))
};

// pages container.
const Pages = {
    MainPage: lazy(() => import('../pages/main'))
};

export default {
    Main: {
        key: 'Main',
        title: 'Main Page',
        path: '/main',
        config: {
            exact: true
        },
        Layout: Layouts.AppLayout,
        Page: Pages.MainPage
    }
};
