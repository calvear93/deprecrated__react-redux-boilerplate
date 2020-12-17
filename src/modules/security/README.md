## Azure Active Directory security module using MSAL

This folder contains AAD security module that eases application protection with Azure session JWT using MSAL library.
Exposes multiples hooks for login, logout and secure components.

-   **config**: contains context config and MSAL constants.
-   **aad.service.js**: main service. Handles MSAL context, session state, login, logout and token acquisition.
-   **aad-graph.service.js**: handles Microsoft Graph calls, like user detailed info and profile avatar.
-   **auth.hooks.js**: exposed hooks for login, logout and secure components.

## How To Configure

First, you should [register](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) a new Azure Active Directory Application in Azure Portal.

In **Authentication** section add a new platform, selecting Single-Page Application (SPA) and setting up Redirect URIs only, with host (base URL) and token auth URL, for example, for dev:
- https://localhost:3000/
- https://localhost:3000/auth

Also, in this section, enable **Access tokens** and **ID tokens** in **Implicit grant** sub-section.

Finally, you should configure permissions in **API permissions** section, with the minimum permission _User.Read_, although ideally _profile_ and _openid_ for correct token acquisition.

## How To Use

THis module, exposes many hooks for handle login, logout and secure React components.

### App configuration

In your **App.jsx** or **App.router.jsx** you should initialize the authentication service.

```javascript
import { AuthenticationService } from 'modules/security';

// initializes Microsoft Active Directory authentication service.
AuthenticationService.init({
    disabled: false,
    clientId: '2a85c521-02fc-4796-8ecc-eaa13eee2e7b',
    tenantId: 'ba3947ca-abb7-402e-b1d1-c9284608f497',
    loginActionRedirect: '/',
    logoutActionRedirect: null,
    tokenRefreshUri: '/auth',
    tokenRenewalOffset: 120,
    navigateToRequestAfterLogin: true
});

// main react component
export default () => {
    return (
        <div>
            <h1>Welcome to My App</h1>
        </div>
    );
}
```

### Automatic Login

```javascript
import { useAuthentication } from 'modules/security';

// react component
export default () => {
    const { authenticated, authenticating, error } = useAuthentication();

    if(authenticating)
        return <div>Authenticating...</div>;

    if(!authenticated)
        return <div>403: Not Authorized - {error.message}</div>;

    return (
        <div>
            <h1>Welcome to My App</h1>
        </div>
    );
}
```

### Manual Login

```javascript
import { Redirect } from 'react-router-dom';
import { useLogin } from 'modules/security';

// react component
export default () => {
    const [ login, { authenticated, authenticating, error }] = useLogin();

    if(authenticating)
        return <div>Authenticating...</div>;

    if(!authenticated)
        return <div>403: Not Authorized - {error.message}</div>;

    if(authenticated)
        return <Redirect to='/home'>;

    return (
        <div>
            <button onClick={login}>Log In</button>
        </div>
    );
}
```

### Logout

```javascript
import { useLogout } from 'modules/security';

// react component
export default () => {
    const logout = useLogout();

    return (
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}
```

### Conditional Login

Both, automatic and manual login, has the possibility to add a condition after AAD authentication, for custom user or role validation.
The conditional validation should be an asynchronous function resolving a boolean.

```javascript
import { UserApi } from 'services/api/user';
import { useConditionalAuthentication } from 'modules/security';

async function ValidateRegisteredUserInDb(aadService) => {
    // retrieves current logged user principal name (email).
    const upn = aadService.getUserName();
    // validates with custom service user existence.
    const isValid = await UserApi.validate(upn);

    return isValid;
}

// react component
export default () => {
    const {
        authenticated,
        authenticating,
        error
    } = useConditionalAuthentication(ValidateRegisteredUserInDb);

    if(authenticating)
        return <div>Authenticating...</div>;

    if(!authenticated)
        return <div>403: Not Authorized - {error.message}</div>;

    return (
        <div>
            <h1>Welcome to My App</h1>
        </div>
    );
}
```

### Acquire Token

You can acquire a JWT access token for API securing.

```javascript
import { useState, useEffect } from 'react';
import { useAcquireToken } from 'modules/security';

// react component
export default () => {
    const [ token, setToken ] = useState();
    const acquireToken = useAcquireToken();

    useEffect(() => {
        acquireToken()
            .then((tkn) => setToken(tkn));
    }, [])

    return (
        <div>
            <h1>Welcome to My App</h1>
        </div>
    );
}
```

### Graph Info

You can retrieves user account detailed info and profile avatar from Microsoft Graph api with hooks.

```javascript
import { useAccountInfo } from 'modules/security';

// react component
export default () => {
    const { loading, info, error } = useAccountInfo();

    if(loading)
        return <div>Loading User Info...</div>

    if(error)
        return <div>User info cannot be loaded: {error.message}</div>

    return (
        <div>
            <h1>User Info</h1>
            <h3>Name: {info.displayName}</h3>
        </div>
    );
}
```

```javascript
import { useAccountAvatar } from 'modules/security';

// react component
export default () => {
    const { loading, avatar, error } = useAccountAvatar();

    if(loading)
        return <div>Loading User Avatar...</div>

    if(error)
        return <div>User avatar cannot be loaded: {error.message}</div>

    return (
        <div>
            <img alt='user-avatar' src={avatar} />
        </div>
    );
}
```
