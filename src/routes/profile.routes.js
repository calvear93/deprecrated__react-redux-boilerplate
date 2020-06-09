/**
 * Contains the application routes
 * for Profile Router component, defining
 * title, path, component, layout
 * or specific configurations, etc.
 *
 * @summary Profile routes configuration file.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:24:07
 * Last modified  : 2020-06-08 21:20:38
 */

import { lazy } from 'react';

// pages container.
const Pages = {
    ProfilePage: lazy(() => import('../pages/profile')),
    ProfileEditPage: lazy(() => import('../pages/profile-edit'))
};

export default {
    // profile root page.
    Profile: {
        key: 'Profile',
        title: 'Perfil', // requires at least BaseLayout.
        path: '/',
        exact: true,
        Page: Pages.ProfilePage
    },
    ProfileEdit: {
        key: 'ProfileEdit',
        title: 'Editar Perfil', // requires at least BaseLayout.
        path: '/edit',
        exact: true,
        Page: Pages.ProfileEditPage
    }
};
