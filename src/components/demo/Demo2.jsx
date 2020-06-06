import React, { useState, useEffect } from 'react';
import SampleForm from '../form/SampleForm';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { AzureActiveDirectoryAction } from '../../store/actions';
import AADTypes from '../../services/auth/aad-types';
import Toast from '../../utils/libs/toast';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo2()
{
    const dispatch = useDispatch();
    const [ values, setValues ] = useState({});

    useEffect(() =>
    {
        Toast.show('welcome to the jungle!', 5000, Toast.TYPE.NOTIFICATION_SUCCESS);
    }, []);

    function onChange({ key, values, validations, isValid })
    {
        console.log(values);
        setValues(values);
    }

    function Logout()
    {
        dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.LOGOUT));
    }

    function Login()
    {
        dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.AUTHENTICATE));
    }

    return (
        <>
            <SampleForm />
            {/* <Button color='primary' onClick={ Logout }>Sign Out</Button> */}
            {/* <Button color='green' onClick={ Login }>Login</Button> */}
        </>
    );
}
