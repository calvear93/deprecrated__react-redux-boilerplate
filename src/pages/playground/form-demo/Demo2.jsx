import React, { useEffect } from 'react';
import SampleForm from 'components/shared/form/SampleForm';
import { Button } from 'semantic-ui-react';
import Toast from 'utils/libs/toast.lib';
import { BallTriangleLoader } from 'assets/loaders';
import Swal from 'utils/libs/swal.lib';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
 */
export default function Demo2()
{
    useEffect(() =>
    {
        Toast.show('welcome to the jungle!', 5000, Toast.TYPE.NOTIFICATION_SUCCESS);
    }, []);

    function showAlert()
    {
        Swal.confirm('success', 'este es una alerta');
    }

    return (
        <>
            <BallTriangleLoader style={ { stroke: 'green' } } />
            <SampleForm />
            <Button
                type='submit'
                color='teal'
                onClick={ showAlert }
                content= { (
                    <div className='mdi-anim-flash mdi-anim-slow animated'>
                        <i className='mdi mdi-check-circle' />
                        <span>Show Alert</span>
                    </div>
                ) }
            />
        </>
    );
}
