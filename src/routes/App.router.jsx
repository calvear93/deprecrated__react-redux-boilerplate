import { lazy } from 'react';
import Loader from 'components/shared/loader';
import Router, { RouterService } from 'modules/router';
import routes from './app.routes';

// initializes routing service.
RouterService.init(routes);

// not found page for default route.
const DefaultChild = lazy(() => import('pages/not-found'));

// redirects array.
const Redirects = [
    {
        exact: true,
        from: '/main',
        to: '/'
    }
];

/**
 * Application main routing handler.
 *
 * @returns {React.ReactElement} Application main router.
 */
export default function AppRouter()
{
    return (
        <Router
            redirects={ Redirects }
            loader={ <Loader message='Cargando' /> }
            DefaultChild={ DefaultChild }
        />
    );
}
