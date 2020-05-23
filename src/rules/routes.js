/**
 * Contains the application routes
 * for Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary Routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-05-23 16:26:56
 */

import { lazy } from 'react';

// layouts container.
const Layouts = {
    BaseLayout: lazy(() => import('../pages/layouts/BaseLayout'))
};

// pages container.
const Pages = {
    MainPage: lazy(() => import('../pages/main'))
};

export default {
    Main: {
        key: 'Main',
        title: 'Pago Electrónico',
        path: '/main',
        Layout: Layouts.BaseLayout,
        Page: Pages.MainPage
    }
};
