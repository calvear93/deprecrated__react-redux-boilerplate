/**
 * Http fetching/requesting
 * utilities using axios.
 *
 * @summary Http utils for fetching/requests.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-14 16:40:14
 * Last modified  : 2020-08-15 21:55:57
 */

import axios from 'axios';

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
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
            ...headers
        },
        responseType: 'application/json',
        responseEncoding: 'utf8'
    });
}
