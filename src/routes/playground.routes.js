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
 * Last modified  : 2020-11-29 18:38:06
 */

import { lazy } from 'react';

// pages container.
const Pages = {
    Playground: lazy(() => import('pages/playground/index')),
    FormDemo: lazy(() => import('pages/playground/form-demo')),
    QueyDemo: lazy(() => import('pages/playground/query-demo'))
};

export default [
    {
        key: 'playground-page',
        title: 'Playground',
        path: '/', // playground/
        exact: true,
        Child: Pages.Playground
    },
    {
        key: 'form-demo-page',
        title: 'Demostración Formularios',
        path: '/form', // playground/form
        exact: true,
        Child: Pages.FormDemo,
        payload: {
            header: {
                title: 'Demo de Formularios'
            }
        }
    },
    {
        key: 'quey-demo-page',
        title: 'Demostración de Ruta dinámica',
        path: '/query/:id', // playground/query/123
        exact: true,
        Child: Pages.QueyDemo,
        payload: {
            header: {
                title: 'Demo de Route Query'
            }
        }
    }
];
