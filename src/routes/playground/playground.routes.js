/**
 * Contains the application routes
 * for Playground Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary Profile routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-03 16:24:07
 * Last modified  : 2020-08-15 20:46:18
 */

import { lazy } from 'react';

// pages container.
const Pages = {
    PlaygroundPage: lazy(() => import('pages/playground/index')),
    FormDemoPage: lazy(() => import('pages/playground/form-demo')),
    QueyDemoPage: lazy(() => import('pages/playground/query-demo'))
};

export default {
    // root page.
    PlaygroundPage: {
        key: 'Playground',
        title: 'Playground',
        path: '/', // playground/
        exact: true,
        Child: Pages.PlaygroundPage
    },
    FormDemoPage: {
        key: 'FormDemo',
        title: 'Demostración Formularios',
        path: '/form', // playground/form
        exact: true,
        Child: Pages.FormDemoPage
    },
    QueyDemoPage: {
        key: 'QueyDemo',
        title: 'Demostración de Ruta dinámica',
        path: '/query/:id', // playground/query/123
        exact: true,
        Child: Pages.QueyDemoPage
    }
};
