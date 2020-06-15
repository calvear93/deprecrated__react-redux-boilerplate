# REACT & REDUX BOILERPLATE

## [GITHUB REPOSITORY](https://github.com/calvear93/react-redux-boilerplate)

This is a boilerplate for React SPA application using [React](https://es.reactjs.org/) + [Redux](https://es.redux.js.org/), and the official project creation wrapper [Create React App](https://github.com/facebook/create-react-app).

## 1. Exec

Project uses **npm scripts** for eases execution and building.

| Command                       | Action                 |
| ----------------------------- | ---------------------- |
| npm run start:debug           | Debug execution        |
| npm run start:development     | Development execution  |
| npm run start:qa              | QA execution           |
| npm run build:development     | Development build      |
| npm run build:qa              | QA build               |
| npm run build:production      | Production build       |
| npm run lint                  | eslint validation      |
| npm run postbuild             | removes sourcemaps     |
| npm run packages:update       | updates packages       |
| npm run packages:update-force | force updates packages |

## 2. Source structure

```bash
├── README.md
├── LICENCE # GPL 3
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/ # graphics.
│   ├── components/
│   │   ├── form/ # form factory. (see SampleForm).
│   │   ├── input/ # variety of inputs.
│   │   └── Loader.jsx
│   ├── constants/ # app constants / global variables.
│   ├── data/ # local master data.
│   ├── hooks/
│   ├── layouts/
│   │   ├── base-layout/ # base flex layout.
│   │   └── app-layout/ # flex layout with header and footer.
│   ├── pages/
│   ├── rules/ # JS files with global rules.
│   │   └── routes/ # routes definition for Router.jsx.
│   ├── services/
│   │   ├── auth/ # Azure Active Directory auth service.
│   │   │   └── AzureActiveDirectoryProvider.jsx # authentication provider.
│   │   ├── json-service.js # allows to load JSON files.
│   │   ├── mock-service.js # utilities for mock API responses.
│   │   └── web-client.js # base web/api client.
│   ├── store/ # Redux.
│   │   ├── actions/
│   │   │   └── shared.js # common base utilities.
│   │   ├── middleware/ # with Redux Saga.
│   │   │   ├── shared.js
│   │   │   └── logger.js
│   │   ├── reducers/
│   │   ├── defaults.js # default stores values.
│   │   └── store.js # initializer.
│   ├── styles/ # CSS/SCSS.
│   ├── utils/
│   │   ├── libs/
│   │   │   ├── interval.js # chronometer util.
│   │   │   ├── object.js # generic object utilities.
│   │   │   ├── rut.js # chilean Id (RUT/RUN) utils.
│   │   │   ├── string.js # string utils using voca.
│   │   │   ├── swal.js # SweetAlert2 wrapper.
│   │   │   ├── time.js # time utils using date fns.
│   │   │   ├── tippy.js # tooltip using Tippy.
│   │   │   └── toast.js # toast using Toastify.
│   │   ├── masks/ # inputs masks using imaskjs.
│   │   ├── normalizers/
│   │   └── validators/ # input validation using validate.js
│   ├── App.jsx # app initializer.
│   ├── Router.jsx # routes controller.
│   └── index.js # app root mounting.
├── package.json
├── webpack.config.js # webpack config using CRACO.
├── web.config # Azure routing config file.
├── .env-cmdrc.json # environment variables.
├── .eslintrc.json # eslint for JS/React/Redux.
├── .stylelintrc.json # stylelint for CSS/SCSS/SASS.
└── azure-pipelines.yml # Azure CI/CD pipeline.
```

## 3. Libraries

- [env-cmd](https://github.com/toddbluhm/env-cmd) 10.1.0
- [craco](https://github.com/gsoft-inc/craco) 5.6.4
- [Redux-Saga](https://redux-saga.js.org/) 1.1.1
- [react-use](https://github.com/streamich/react-use) 15.2.2
- [SWR](https://github.com/vercel/swr) 0.2.2
- [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) 1.3.2
- [Semantic UI React](https://react.semantic-ui.com/) 2.4
- [Material Design Icons](https://materialdesignicons.com/) 5
- [Material Design Icons Animations](https://l-lin.github.io/font-awesome-animation/) 0.30 (ported for MDI)
- [React Router Dynamic Breadcrumbs](https://github.com/roya3000/react-router-dynamic-breadcrumbs#readme) 2.2.2
- [DevExtreme](https://js.devexpress.com/Overview/React/) 20.1.4
- [SweetAlert](https://sweetalert2.github.io/) 9.14.4
- [Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Tippy](https://atomiks.github.io/tippyjs/) 6.2.3
- [date-fns](https://date-fns.org/docs/Getting-Started) 2.14.0
- [Voca](https://vocajs.com/) 1.4.0
- [validate.js](https://validatejs.org/) 0.13.1
- [imaskjs](https://imask.js.org/) 6.0.5
- [mathjs](https://mathjs.org/) 7.0.1
- [mout](http://moutjs.com/docs/latest/) 1.2.2
- [formik](https://jaredpalmer.com/formik) 2.1.4
- [sass-mq](https://github.com/sass-mq/sass-mq) 5.0.1
- [json-query](https://www.npmjs.com/package/json-query) 2.2.2
- [clsx](https://github.com/lukeed/clsx) 1.1.1
- [script-hook](https://github.com/hartzis/react-script-hook) 1.1.1
- [react-wait](https://github.com/f/react-wait) 0.3.0
- [timeago.js](https://timeago.org/) 4.0.2
- [react-web-animation](https://github.com/bringking/react-web-animationhttps://timeago.org/) 0.7.0

### AUTHOR: Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
