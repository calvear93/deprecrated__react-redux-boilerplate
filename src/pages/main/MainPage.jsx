import React from 'react';
import './main-page.scss';
import Demo from 'components/demo';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
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
