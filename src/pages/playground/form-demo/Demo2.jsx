import { BallTriangleLoader } from 'assets/loaders';
import SampleForm from 'components/shared/form/SampleForm';
import Tooltip from 'components/shared/tooltip';
import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Swal from 'utils/libs/swal.lib';
import Toast from 'utils/libs/toast.lib';

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

    /**
     *
     */
    function showAlert()
    {
        Swal.confirm('success', 'este es una alerta');
    }

    return (
        <>
            <Tooltip content='holitas' textType={ [ 'bold', 'medium' ] }>
                <BallTriangleLoader style={ { stroke: 'green' } } />
            </Tooltip>
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
