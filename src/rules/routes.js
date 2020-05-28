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
 * Last modified  : 2020-05-28 10:08:31
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('../layouts/base-layout')),
    AppLayout: lazy(() => import('../layouts/app-layout'))
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
    }
};
