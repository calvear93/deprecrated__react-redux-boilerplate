import React from 'react';
import '../../styles/pages/main-page.scss';
import Demo from '../../components/demo';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function MainPage()
{
    return (
        <page is='div' id='main-page'>
            CONTENIDO
            <Demo />
        </page>
    );
}
