import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AzureActiveDirectoryProvider, AzureActiveDirectorySecurityMode, IsAuthEnabled } from './services/auth';
import store from './store/store';
import Router from './Router';
import { loadMessages, locale } from 'devextreme/localization';
import esMessages from 'devextreme/localization/messages/es';
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
    // initializes App config.
    useEffect(() =>
    {
        // DevExpress localization.
        loadMessages(esMessages);
        locale(navigator.language);
    }, []);

    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AzureActiveDirectoryProvider
                    enabled={ IsAuthEnabled }
                    errorRoute='/401'
                >
                    <Router />
                    <ToastContainer />
                </AzureActiveDirectoryProvider>
            </Provider>
        </BrowserRouter>
    );
}
