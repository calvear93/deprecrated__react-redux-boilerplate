import React from 'react';
import '../../styles/pages/main-page.scss';
import Loader from '../../components/Loader';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function MainPage()
{
    return (
        <div className='page-container main-page-container'>
            <div className='main-page-header'>
                HEADER
            </div>

            <div className='main-page-body'>
                <Loader message='test' />
            </div>
        </div>
    );
}
