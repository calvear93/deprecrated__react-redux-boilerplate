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
 * Last modified  : 2020-08-14 11:24:29
 */

import { lazy } from 'react';

// pages container.
const Pages = {
    ProfilePage: lazy(() => import('pages/profile')),
    ProfileEditPage: lazy(() => import('pages/profile-edit')),
    ProfileUserPage: lazy(() => import('pages/profile-user'))
};

export default {
    // profile root page.
    Profile: {
        key: 'Profile',
        title: 'Perfil',
        path: '/', // profile/
        exact: true,
        Child: Pages.ProfilePage
    },
    ProfileEdit: {
        key: 'ProfileEdit',
        title: 'Editar Perfil',
        path: '/edit', // profile/edit
        exact: true,
        Child: Pages.ProfileEditPage
    },
    ProfileUser: {
        key: 'ProfileUser',
        title: 'Ver Usuario',
        path: '/user/:userId', // profile/user/123
        exact: true,
        Child: Pages.ProfileUserPage
    }
};
