import React, { useEffect } from 'react';
import Loader from './Loader';
import Toast from '../utils/Toast';

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
        </div>
    );
}
