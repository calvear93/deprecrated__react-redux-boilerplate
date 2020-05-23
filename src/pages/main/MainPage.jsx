import React from 'react';
import '../../styles/pages/main-page.scss';
import Test from '../../components/Test';

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
                BODY
                <Test />
            </div>
        </div>
    );
}
