import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AzureActiveDirectoryProvider, AzureActiveDirectorySecurityMode } from './services/auth';
import store from './store/store';
import RootRouter from './routes/root';
import './styles/App.scss';

/**
 * App container.
 *
 * Here occur the initialization
 * and localization of some libs.
 *
 * @returns {React.ReactElement} App container.
 */
export default function App()
{
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AzureActiveDirectoryProvider
                    mode={ AzureActiveDirectorySecurityMode.WHITELIST }
                    errorRoute='/401'
                >
                    <RootRouter />
                </AzureActiveDirectoryProvider>
            </Provider>

            <ToastContainer />
        </BrowserRouter>
    );
}
