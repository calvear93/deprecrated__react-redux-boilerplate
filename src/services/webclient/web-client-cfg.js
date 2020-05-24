/**
 * Axios instance with base configurations
 * for web service client.
 *
 * @summary Pre-configured axios instance.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-17 10:32:34
 * Last modified  : 2020-05-17 12:54:07
 */

import axios from 'axios';
import mime from 'mime-types';

// Default axios instance.
export default axios.create({
    baseURL: process.env.REACT_APP_WEB_API_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept'
    },
    responseType: mime.lookup('json'),
    responseEncoding: 'utf8'
});
