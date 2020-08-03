import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Profile User page.
 *
 * @returns {React.ReactElement} Profile User page.
 */
export default function ProfileUserPage()
{
    const { userId } = useParams();

    return (
        <page is='div' id='profile-user-page'>
            VER USUARIO: {userId}
        </page>
    );
}
