import config from './aad-cfg';
import types from './aad-types';

// whether AAD authentication is enabled or not.
export const SECURITY_ENABLED = process.env.REACT_APP_AAD_ENABLED === 'true';

// default AAD authentication permission scopes.
export const DEFAULT_SCOPES = [ types.SCOPES.USER.READ ];

export { config, types };
