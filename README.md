# REACT SPA BOILERPLATE

## [GITHUB REPOSITORY](https://github.com/calvear93/react-redux-boilerplate)

This is a boilerplate for React SPA application using [React](https://es.reactjs.org/) + [Redux](https://es.redux.js.org/), and the official project creation wrapper [Create React App](https://github.com/facebook/create-react-app).

## Structure (simplified) 💡

```bash
├── README.md
├── LICENCE.md
├── CHANGELOG.md
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/ # graphics
│   ├── components/
│   │   └── shared/ # shared atomic components
│   │       ├── form/ # form factory. (see SampleForm)
│   │       ├── input/ # variety of inputs
│   │       ├── breadcrumbs/ # automatic breadcrumbs renderer
│   │       └── loader/
│   ├── constants/ # global constants
│   ├── hooks/ # global hooks
│   ├── layouts/
│   │   ├── base-layout/ # base flex layout
│   │   └── app-layout/ # flex layout with header and footer
│   ├── mock/ # mock server using MirageJS
│   ├── modules/
│   │   ├── devextreme/
│   │   ├── mock/ # mock service using MirageJS
│   │   ├── ui/ # ui framework
│   │   ├── router/ # routing service
│   │   └── security/ # authentication module
│   ├── pages/ # app pages/views
│   ├── routes/ # app routes and routers
│   │   ├── app.routes.js # main app routes
│   │   ├── App.router.jsx # app router
│   │   └── index.js # exposes main router and routes definition
│   ├── services/
│   │   └── api/ # web api clients
│   ├── store/
│   │   ├── sample/ # store partition sample
│   │   │   ├── sample.action.js
│   │   │   ├── sample.reducer.js
│   │   │   └── sample.saga.js # middleware saga
│   │   ├── shared/
│   │   │   ├── action.lib.js # action creator utils
│   │   │   └── saga.lib.js # saga generators utils
│   │   ├── defaults.js # default store partition values
│   │   ├── middleware.js # middleware constructor
│   │   └── store.js # reducer/sagas combiner and store initializer
│   ├── styles/
│   │   ├── global/ # global fragments
│   │   ├── modules/ # used in hooks, providers or injectors
│   │   ├── vars/ # shared variables
│   │   └── app.scss # main stylesheet
│   ├── utils/
│   │   ├── libs/
│   │   │   ├── http.lib.js # axios and http utils
│   │   │   ├── object.lib.js # generic object utils
│   │   │   ├── redirect.lib.js # browser redirection utils
│   │   │   ├── rut.lib.js # chilean Id (RUT/RUN) utils
│   │   │   ├── storage.lib.js # browser storage utils
│   │   │   ├── string.lib.js # string utils
│   │   │   └── time.lib.js # time utils using date fns
│   │   └── normalizers/
│   ├── App.test.js
│   ├── App.jsx # app initializer
│   ├── service-worker.js
│   ├── setupTests.js
│   └── index.js
├── package.json
├── webpack.config.js # webpack config using CRACO
├── web.config # Azure webapp server config file
├── jsconfig.js # Node config for JS
├── service-worker-register.js
├── service-worker.js
├── setupTests.js # Jest test init
├── .env.json # environment variables
├── .prettierrc.json # prettier rules
├── .eslintrc.json # eslint for JS/React/Redux
├── .stylelintrc.json # stylelint for CSS/SCSS/SASS
└── azure-pipelines.yml # Azure CI/CD pipeline
```

## Branches and Environments 📋

Project has 4 environments base for project building.

-   **development**: environment with breaking changes and new features.
-   **qa**: environment for testing and quality assurance.
-   **staging**: pre-production environment.
-   **production**: productive environment.

Also, pipeline has automated deployments depending of branch updated.

-   **feature/\***: new features/requirements, it doesn't deploys to any environment.
-   **develop**: accumulates new features for current sprint development, it deploys to 'development' environment.
-   **release/\***: has features of last release, it deploys to 'QA' environment.
-   **stage**: pre-production, for stability assurance, it deploys to 'staging' environment.
-   **main**: releases tested and certified from 'QA' environment, it deploys to 'production' environment.
-   **hotfix/\***: specific fixes from main, it deploys to 'development' environment.

## Executing ⚙️

Project uses **npm scripts** for eases execution, testing and building.

| Command                       | Action                  |
| ----------------------------- | ----------------------- |
| npm run start:debug           | debug execution         |
| npm run start:development     | development execution   |
| npm run start:qa              | qa execution            |
| npm run start:staging         | staging execution       |
| npm run eslint:analyze        | code format review      |
| npm run eslint:fix            | code format review/fix  |
| npm run test:development      | development tests run   |
| npm run test:qa               | qa tests run            |
| npm run test:staging          | staging tests run       |
| npm run test:production       | production tests run    |
| npm run test:coverage         | tests coverage analysis |
| npm run bundle:analyzer       | analyzes build bundles  |
| npm run build:development     | development build       |
| npm run build:qa              | qa build                |
| npm run build:staging         | staging build           |
| npm run build:production      | production build        |
| npm run lint                  | eslint validation       |
| npm run postbuild             | removes sourcemaps      |
| npm run packages:update       | updates packages        |
| npm run packages:force-update | force updates packages  |
| npm run git:case-sensitive    | git case sensitive fix  |

## Linting 🧿

Project uses two linters, for code formatting and code styling normalizing.

-   **eslint**: JavaScript and React linter with Airbnb React base config and some other additions.
-   **stylelint**: CSS/SCSS/SASS linter.
-   **prettier**: optional Prettier config.

For correct interpretation of linters, is recommended to use [Visual Studio Code](https://code.visualstudio.com/) as IDE and install the plugins in .vscode folder at 'extensions.json', as well as use the config provided in 'settings.json'

## Deployment 📦

Use included Azure Pipeline for CI/CD - edit [azure-pipeline.yml](azure-pipeline.yml) file for custom projects variables.

Branches environments are defined as:

-   **main**: production
-   **stage/\***: staging
-   **release/\***: qa
-   **develop**: development
-   **hotfix/\***: development
-   **feature/\***: none

Variables for change.

-   **environment**: Azure DevOps environment for setup approvers/reviewers.
-   **azureSubscription**: Subscription configured with a SPN.
-   **webapp**: WebApp resource name, previously created with Terraform/Azure.
-   **environmentBuild**: React app building environment. (development/qa/staging/production).

## Built with 🛠️

-   [Create React App](https://github.com/facebook/create-react-app) - Official React SPA framework.
-   [Redux & Redux Saga](https://es.redux.js.org/) - State container for centralized information handling.
-   [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) - Microsoft authentication service.
-   [Semantic UI](https://react.semantic-ui.com/) - UI framework.
-   [env-cmd](https://github.com/toddbluhm/env-cmd) - NodeJS app's environment utility.
-   [craco](https://github.com/gsoft-inc/craco) - CRA webpack config injector.
-   [Material Design Icons](https://materialdesignicons.com/)
-   [Material Design Icons Animations](https://l-lin.github.io/)

## Libraries could be useful 🛠️

-   [DevExtreme](https://js.devexpress.com/Overview/React/)
-   [rxjs](https://rxjs-dev.firebaseapp.com/)
-   [rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks)
-   [date-fns](https://date-fns.org/docs/Getting-Started)
-   [react-use](https://github.com/streamich/react-use)
-   [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal#readme)
-   [beautiful-react-hooks](https://github.com/beautifulinteractions/beautiful-react-hooks)
-   [SWR](https://github.com/vercel/swr)
-   [SweetAlert](https://sweetalert2.github.io/)
-   [Toastify](https://fkhadra.github.io/react-toastify/introduction)
-   [Tippy](https://atomiks.github.io/tippyjs/)
-   [Voca](https://vocajs.com/)
-   [validate.js](https://validatejs.org/)
-   [imaskjs](https://imask.js.org/)
-   [mathjs](https://mathjs.org/)
-   [mout](http://moutjs.com/docs/latest/)
-   [formik](https://jaredpalmer.com/formik)
-   [json-query](https://www.npmjs.com/package/json-query)
-   [clsx](https://github.com/lukeed/clsx)
-   [script-hook](https://github.com/hartzis/react-script-hook)
-   [react-wait](https://github.com/f/react-wait)
-   [jwt-decode](https://github.com/auth0/jwt-decode)
-   [react-children-utilities](https://github.com/fernandopasik/react-children-utilities)
-   [react-web-animation](https://github.com/bringking/react-web-animationhttps://timeago.org/)
-   [react-lazyload](https://github.com/twobin/react-lazyload)
-   [react-rnd](https://github.com/bokuweb/react-rnd)
-   [react-spinners](https://github.com/davidhu2000/react-spinners)
-   [react-epic-spinners](https://www.npmjs.com/package/react-epic-spinners)
-   [mathjs](https://mathjs.org/)
-   [react-fine-uploader](https://github.com/FineUploader/react-fine-uploader)
-   [ahooks](https://github.com/alibaba/hooks)

## License 📄

This project is licensed under the GPL License - see [LICENSE.md](LICENSE.md) file for details.

---

⌨ by [Alvear Candia, Cristopher Alejandro](https://github.com/calvear93)
