/**
 * Http fetching/requesting
 * utilities using axios.
 *
 * @summary Http utils for fetching/requests.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-14 16:40:14
 * Last modified  : 2020-08-28 20:32:52
 */

import axios from 'axios';
import HttpStatus from 'http-status-codes';

/**
 * Http Status Codes.
 *
 * @type {object}
 */
export { HttpStatus };

/**
 * Http Methods.
 *
 * @type {object}
 */
export const HttpMethod = {
    HEAD: 'HEAD',
    CONNECT: 'CONNECT',
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    TRACE: 'TRACE',
    COPY: 'COPY',
    LINK: 'LINK',
    UNLINK: 'UNLINK',
    PURGE: 'PURGE',
    LOCK: 'LOCK',
    UNLOCK: 'UNLOCK',
    VIEW: 'VIEW'
};

/**
 * Creates a http client.
 *
 * @param {string} baseURL base URL.
 * @param {object} [headers] default headers.
 *
 * @returns {AxiosInstance} axios http client.
 */
export function createHttpClient(baseURL, headers)
{
    // creates an axios instance pre-configured.
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
            ...headers
        },
        responseType: 'json',
        responseEncoding: 'utf8'
    });

    // error handler.
    client.interceptors.response.use(undefined, (error) =>
    {
        errorMessageInterceptor(error);
        throw error;
    });

    return client;
}

/**
 * Axios interceptor for
 * change error message.
 *
 * @param {AxiosError} error axios error object.
 */
function errorMessageInterceptor(error)
{
    if (!error.response)
    {
        error.message = 'Error de conexión';

        return;
    }

    const { status, statusText } = error.response;

    // modifies error message.
    switch (status)
    {
        default:
            error.message = `Solicitud ha fallado por '${statusText}' [${status}]`;
    }
}
