import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from 'store/store';
import AppRouter from 'routes';
import { useUI } from 'hooks/ui.hook';
import { useSecurity } from 'hooks/app.hook';

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
    // initializes app modules.
    useSecurity();

    return (
        <BrowserRouter>
            <StoreProvider store={ store }>
                <AppRouter />
            </StoreProvider>

            <ToastContainer />
        </BrowserRouter>
    );
}
