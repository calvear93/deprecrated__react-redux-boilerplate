import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AzureActiveDirectoryProvider, AzureActiveDirectorySecurityMode, IsAuthEnabled } from './services/auth';
import store from './store/store';
import AppRouter from './pages/AppRouter.routes';
import './styles/App.scss';

/**
 * App container.
 *
 * Here occur the initialization
 * and localization of some libs.
 *
 * @returns {JSX} App container.
 */
export default function App()
{
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AzureActiveDirectoryProvider
                    enabled={ IsAuthEnabled }
                    mode={ AzureActiveDirectorySecurityMode.WHITELIST }
                    errorRoute='/401'
                >
                    <AppRouter />
                </AzureActiveDirectoryProvider>
            </Provider>
            <ToastContainer />
        </BrowserRouter>
    );
}
