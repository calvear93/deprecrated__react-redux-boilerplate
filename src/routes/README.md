## Routes definition

This folder contains actions, reducers and sagas for global store.
For add a new router, you should add a new folder, with routes.js and Router.jsx, and import the router in other router, like app folder.

-   router: contains generic router logic. It components shouldn't change.
-   app: contains main routes and router.
-   index.js: exports main router and combined routes for breadcrumbs. When you add a new router with new routes, you should add the routes here.
