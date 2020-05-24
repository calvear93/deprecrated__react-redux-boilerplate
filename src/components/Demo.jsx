import React, { useEffect } from 'react';
import { BallTriangleLoader } from '../assets/loaders';
import Toast from '../utils/libs/toast';

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
            <BallTriangleLoader style={ { stroke: 'green' } } />
            {/* <Loader message='Loading' absolute={ false } /> */}
        </div>
    );
}
