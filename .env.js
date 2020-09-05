module.exports = Promise.resolve({
  // default variables for all environments.
	default: {
		HTTPS: false, // local HTTPS support.
		GENERATE_SOURCEMAP: true, // enables/disables sourcemaps generation.
		SKIP_PREFLIGHT_CHECK: true, // avoid package from node_modules versions conflicts. Used for jest.
		EXTEND_ESLINT: true, // allows to use eslint plugins
		REACT_APP_DEBUG: true,
		REACT_APP_MOCK_SERVER: false, // enables/disables mirage js mock server.
		REACT_APP_SERVICE_WORKER: false, // enables/disables service worker.
		REACT_APP_TITLE: 'ACHS React Boilerplate',
    	REACT_APP_DESCRIPTION: 'React con Redux boilerplate usando Create React App.',
    	REACT_APP_NOSCRIPT: 'Necesitas activar JavaScript para ejecutar esta aplicación.',

		REACT_APP_AAD_ENABLED: false, // when true, turn on HTTPS.
		REACT_APP_AAD_TOKEN_RENEWAL_OFFSET_SECONDS: 120,
		REACT_APP_AAD_TENANT_ID: '',
		REACT_APP_AAD_NAVIGATE_TO_REQUEST_URL_AFTER_LOGIN: true,
		REACT_APP_AAD_LOGIN_ACTION_REDIRECT: '/', // login auth route.
		REACT_APP_AAD_TOKEN_REFRESH_URI: '/auth', // blank page for token acquisition iframe.
		REACT_APP_AAD_LOGOUT_ACTION_REDIRECT: null,
		REACT_APP_AAD_USER_PHOTO_SIZE: '120x120',
		REACT_APP_AAD_USER_INFO_MEMO_EXPIRATION_DAYS: 1,
		REACT_APP_AAD_USER_PHOTO_MEMO_EXPIRATION_DAYS: 3,

		REACT_APP_WEB_API_HOST: 'https://aa-desa-project.azurewebsites.net'
	},

  	// used on tests running.
	test: {
	},

	// used on project building.
	build: {
		//NODE_OPTIONS: '--max_old_space_size=4096', // increases build heap size.
	},

  	debug: {
		PORT: 3000,
		REACT_APP_ENV: 'debug',
		REACT_APP_MOCK_SERVER: false,
	},
	development: {
		REACT_APP_ENV: 'development',
		REACT_APP_WEB_API_HOST: 'https://aa-desa-project.azurewebsites.net',
		REACT_APP_AAD_CLIENT_ID: ''
	},
	qa: {
		REACT_APP_ENV: 'qa',
		REACT_APP_WEB_API_HOST: 'https://aa-qa-project.azurewebsites.net',
		REACT_APP_AAD_CLIENT_ID: ''
	},
	staging: {
		REACT_APP_ENV: 'staging',
		REACT_APP_MOCK_SERVER: false,
		REACT_APP_WEB_API_HOST: 'https://aa-stg-project.azurewebsites.net',
		REACT_APP_AAD_CLIENT_ID: ''
	},
	production: {
		REACT_APP_ENV: 'production',
		GENERATE_SOURCEMAP: false,
		REACT_APP_MOCK_SERVER: false,
		REACT_APP_DEBUG: false,
		REACT_APP_WEB_API_HOST: 'https://aa-prod-project.azurewebsites.net',
		REACT_APP_AAD_CLIENT_ID: ''
	},
});
