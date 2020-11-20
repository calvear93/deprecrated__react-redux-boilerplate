import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AuthenticationProvider, AuthenticationSecurityMode } from 'services/security';
import { useUI } from 'hooks/ui.hook';
import store from 'store/store';
import AppRouter from 'routes';

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

    return (
        <BrowserRouter>
            <StoreProvider store={ store }>
                <AuthenticationProvider
                    mode={ AuthenticationSecurityMode.WHITELIST }
                    errorRoute='/401'
                >
                    <AppRouter />
                </AuthenticationProvider>
            </StoreProvider>

            <ToastContainer />
        </BrowserRouter>
    );
}
