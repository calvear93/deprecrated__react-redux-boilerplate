# REACT & REDUX BOILERPLATE

### [GITHUB REPOSITORY](https://github.com/calvear93/react-redux-boilerplate)

[React](https://es.reactjs.org/) [Redux](https://es.redux.js.org/), [Create React App](https://github.com/facebook/create-react-app).

## 1. Exec

**npm scripts** .

| Script                    | Resultado                     |
| ------------------------- | ----------------------------- |
| npm run start:debug       | Ejecución en modo Debug       |
| npm run start:development | Ejecución en modo Development |
| npm run start:qa          | Ejecución en modo QA          |
| npm run build:development | Building en modo Development  |
| npm run build:qa          | Building en modo QA           |
| npm run build:production  | Building en modo Production   |
| npm run postbuild         | Remueve sourcemaps            |

## 2. Structure

```bash
├── README.md.
├── package.json # npm package manager file.
├── public/
│   ├── favicon.ico # Icono.
│   └── index.html # Root HTML.
└── src/
│   ├── assets/ # Recursos gráficos.
│   ├── components/ # Componentes React.
│   ├── services/ # Interfaces o utilidades globales como WebClient.
│   │   └── web-client.js # Cliente interface para la API del proyecto.
│   ├── store/ # Redux.
│   │   ├── actions/ # Actions.
│   │   │   └── shared.js # Utilidades comunes para las Actions.
│   │   ├── middleware/ # Middleware usando Redux Saga.
│   │   │   ├── shared.js # Utilidades para sagas.
│   │   │   └── logger.js # Saga logger.
│   │   ├── reducers/ # Reducers.
│   │   ├── defaults.js # Valores por defecto para las particiones.
│   │   └── store.js # Inicializa el store con saga y reducers.
│   ├── styles/ # Hojas de estilo CSS/SCSS.
│   ├── rules/ # Reglas para ejecuciones de páginas o JS.
│   │   ├── globals.js # Contiene variables globales.
│   │   └── routes.js # Contiene las rutas para Router.jsx.
│   ├── utils/ # Utilidades JS.
│   ├── pages/ # Contiene las páginas.
│   │   └── layouts # Layouts para las páginas.
│   ├── App.jsx # Inicialización y configuración base.
│   ├── Router.jsx # Se encarga del enrutamiento con React Router.
│   └── index.js # Montaje de la aplicación React.
├──.env-cmdrc.json # Variables de entorno.
├──.eslintrc.json # Eslint para JS/React/Redux.
├──.stylelintrc.json # Stylelint para CSS/SCSS.
├──web.config # Web config para enrutamiento en Azure.
├──webpack.config.js # Permite configuraciones de WebPack usando CRACO.
└──azure-pipelines.yml # Pipeline de CiCD en Azure.
```

### Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
