import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// application rendering
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.REACT_APP_SERVICE_WORKER === 'true')
{
    const serviceWorker = require('./serviceWorker');
    serviceWorker.register();
}
