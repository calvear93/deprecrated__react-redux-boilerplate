/**
 * Microsoft Graph query service.
 *
 * @summary Microsoft Graph service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-09-05 11:08:28
 */

import axios from 'axios';
import { types, DEFAULT_SCOPES } from '../config';
import AuthenticationService from './aad-service';

// Graph API helper.
const Graph = {
    // Graph API base URL.
    URL: `${types.RESOURCES.MICROSOFT_GRAPH}v1.0/`,

    /**
     * Acquire auth token and sends a request to
     * Microsoft Graph API.
     *
     * @param {any} options axios options. Use api for Graph action.
     * @returns {Promise} response.
     */
    graphRequest(options)
    {
        return new Promise((resolve, reject) =>
        {
            AuthenticationService.acquireToken({ scopes: DEFAULT_SCOPES })
                .then(response =>
                {
                    const token = response.accessToken;
                    // builds request config.
                    options = {
                        ...options,
                        url: `${Graph.URL}${options.api}`,
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    // Executes the request.
                    axios(options)
                        .then(res => resolve(res.data))
                        .catch(reject);
                })
                .catch(reject);
        });
    },

    /**
     * Reads blob data from axios
     * request for Graph API.
     *
     * @param {object} response request response.
     *
     * @returns {Promise<any>} promise waiting for blob data.
     */
    readBlob(response)
    {
        return new Promise((resolve) =>
        {
            var reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () =>
            {
                resolve(reader.result);
            };
        });
    },

    /**
     * User info.
     *
     * @returns {any} user info from AAD.
     */
    me()
    {
        return Graph.graphRequest({ api: 'me', params: { $select: types.ATTRIBUTES.join(',') } });
    },

    /**
     * User photo in max width.
     *
     * @returns {string} base64 string from user photo.
     */
    photo()
    {
        return new Promise((resolve) =>
        {
            Graph.graphRequest({ api: 'me/photo/$value', responseType: 'blob' })
                .then((response) => resolve(Graph.readBlob(response)))
                .catch(() => resolve());
        });
    },

    /**
     * User photo with specified width.
     *
     * Available sizes are: 48x48, 64x64, 96x96, 120x120,
     * 240x240, 360x360, 432x432, 504x504 and 648x648.
     *
     * @param {string} size photo size.
     * @returns {string} base64 string from user photo.
     */
    photoWithSize(size = '648x648')
    {
        return new Promise((resolve) =>
        {
            Graph.graphRequest({ api: `me/photos/${size}/$value`, responseType: 'blob' })
                .then((response) => resolve(Graph.readBlob(response)))
                .catch(() => resolve());
        });
    }
};

export default Graph;
