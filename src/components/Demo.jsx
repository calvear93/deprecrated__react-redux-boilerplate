import React, { useEffect } from 'react';
import Toast from '../utils/Toast';
import Loader from './Loader';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo()
{
    useEffect(() =>
    {
        Toast('test', 20000, 'error');
    }, []);

    return (
        <div className=''>
            TEST
            {/* <Loader message='test de tests' /> */}
        </div>
    );
}
