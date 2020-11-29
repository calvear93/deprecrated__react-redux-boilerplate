/**
 * Routes handler for expose
 * application routes definition.
 *
 * @summary Routes handler.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-11-25 10:04:09
 * Last modified  : 2020-11-27 17:53:44
 */

export default {

    // complete routes definitions.
    Routes: [],

    // breadcrumbs dictionary.
    Breadcrumbs: {},

    // routes base path.
    BasePath: '/',

    /**
     * Initializes routing service.
     *
     * @param {Array<object>} routes routes definitions.
     * @param {string} [basePath] routes base path.
     */
    init(routes, basePath = '/')
    {
        this.BasePath = basePath;
        this.setRoutes(routes);
    },

    /**
     * Sets the listener function for routes change.
     *
     * @param {Function} listener routes on change listener.
     */
    setRoutesOnChangeListener(listener)
    {
        this.RoutesOnChangeListener = listener;
    },

    /**
     * Sets current app routes definitions
     * and calculates complete router paths
     * for nested routes.
     *
     * @param {Array<object>} routes routes definitions
     * @param {string} [basePath] routes base path.
     * @param {object} [baseRoute] base route config from parent router.
     */
    setRoutes(routes, basePath = this.BasePath, baseRoute)
    {
        routes
            .forEach(({ title, path: relativePath, routes: subRoutes, ...rest }) =>
            {
                const path = `${basePath}${relativePath.replace(/\/$/g, '')}`.replace(/\/+/g, '/');

                if (subRoutes)
                {
                    this.setRoutes(subRoutes, path, { ...baseRoute, ...rest });
                }
                else
                {
                    this.Routes.push({
                        ...baseRoute,
                        title,
                        path,
                        ...rest
                    });

                    this.Breadcrumbs[path] = title;
                }
            });

        this.RoutesOnChangeListener && this.RoutesOnChangeListener();
    }
};
