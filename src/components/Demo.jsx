import React, { useEffect } from 'react';
import { BallTriangleLoader } from '../assets/loaders';
import Toast from '../utils/libs/toast';
import Tippy from '../utils/libs/tippy';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo()
{
    useEffect(() =>
    {
        Toast.show('Welcome', 800000, Toast.TYPE.SMILEY_WINK);
        Tippy();
    }, []);

    return (
        <div className='' data-tooltip='hola'>
            TEST
            <BallTriangleLoader style={ { stroke: 'green' } } />
            {/* <Loader message='Loading' absolute={ false } /> */}
        </div>
    );
}
