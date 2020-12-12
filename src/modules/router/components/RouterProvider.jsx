/**
 * Routing HOC initializer.
 * Initializes router service
 * and creates the navigation
 * history handler.
 *
 * @summary initializes routes and navigation history.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-12-12 10:23:22
 * Last modified  : 2020-12-12 10:52:13
 */

import { BrowserRouter } from 'react-router-dom';
import RouterService from '../router.service';

/**
 * Router provider.
 *
 * Initializes router service
 * and navigation history handler.
 *
 * Use it in in App.jsx or root component.
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children application tree.
 * @param {Array<object>} props.routes routes definition.
 * @param {Array<object>} props.rest Browser Router props.
 *
 * @returns {React.ReactElement} router provider.
 */
export default function RouterProvider({ children, routes = [], ...rest })
{
    // initializes routing service.
    RouterService.init(routes);

    return (
        <BrowserRouter { ...rest }>
            {children}
        </BrowserRouter>
    );
}
