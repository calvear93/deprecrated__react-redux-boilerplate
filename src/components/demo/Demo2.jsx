import React, { useEffect } from 'react';
// import { useState } from 'react';
import SampleForm from '../form/SampleForm';
import { Container, Header, Button } from 'semantic-ui-react';
// import { Input } from 'semantic-ui-react';
import { BallTriangleLoader } from '../../assets/loaders';
import Swal from '../../utils/libs/swal.lib';
// import { useDispatch } from 'react-redux';
// import { AzureActiveDirectoryAction } from '../../store/actions';
// import AADTypes from '../../services/auth/aad-types';
import Toast from '../../utils/libs/toast.lib';
import Tippy from '../../utils/libs/tippy.lib';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
 */
export default function Demo2()
{
    // const dispatch = useDispatch();
    // const [ values, setValues ] = useState({});

    useEffect(() =>
    {
        Toast.show('welcome to the jungle!', 5000, Toast.TYPE.NOTIFICATION_SUCCESS);
        Tippy();
    }, []);

    // function Logout()
    // {
    //     Toast.show('desactivado', 5000, Toast.TYPE.KEY_ERROR);
    //     // dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.LOGOUT));
    // }

    // function Login()
    // {
    //     Toast.show('desactivado', 5000, Toast.TYPE.KEY_ERROR);
    //     // dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.AUTHENTICATE));
    // }

    function showAlert()
    {
        Swal.confirm('success', 'este es una alerta');
    }

    return (
        <Container fluid text textAlign='justified'>
            <Header as='h2'>Demo</Header>
            <BallTriangleLoader style={ { stroke: 'green' } } data-tooltip='This is a SVG loader' data-tooltip-classes='medium bold' />
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
            {/* <Button color='primary' onClick={ Logout }>Sign Out</Button> */}
            {/* <Button color='green' onClick={ Login }>Login</Button> */}
        </Container>
    );
}
