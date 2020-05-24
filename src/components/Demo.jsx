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
        Toast('Welcome', 8000, Toast.TYPE.SMILEY_WINK);
    }, []);

    return (
        <div className=''>
            TEST
            <Loader message='Loading' absolute={ false } />
        </div>
    );
}
