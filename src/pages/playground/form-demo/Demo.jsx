import { BallTriangleLoader } from 'assets/loaders';
import SampleForm from 'components/form/SampleForm';
import Tooltip from 'modules/ui/components/tooltip';
import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Swal } from 'modules/ui/libs';
import { Toast } from 'modules/ui/libs';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
 */
export default function Demo()
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
