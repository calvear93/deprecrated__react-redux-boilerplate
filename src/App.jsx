import { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from 'store';
import { useUI } from 'modules/ui';
import { RouterProvider } from 'modules/router';
import AppRouter, { routes } from 'routes';

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
    // loads UI theme stylesheets.
    useUI();

    useEffect(() =>
    {
        require('styles/app.scss');
    }, []);

    return (
        <RouterProvider routes={ routes }>
            <StoreProvider store={ store }>
                <AppRouter />
            </StoreProvider>

            <ToastContainer />
        </RouterProvider>
    );
}
