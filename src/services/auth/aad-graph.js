/**
 * Microsoft Graph query service.
 *
 * @summary Microsoft Graph service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-06-05 19:50:24
 */

import axios from 'axios';
import AuthenticationContext, { DEFAULT_SCOPES } from './aad-context';
import AADTypes from './aad-types';

// Graph API helper.
const Graph = {
    // Graph API base URL.
    URL: `${AADTypes.RESOURCES.MICROSOFT_GRAPH}v1.0/`,

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
            AuthenticationContext.config.auth.redirectUri = window.location.origin;

            AuthenticationContext.acquireTokenSilent({ scopes: DEFAULT_SCOPES })
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
     * User info.
     *
     * @returns {any} user info from AAD.
     */
    me()
    {
        return Graph.graphRequest({ api: 'me', params: { $select: AADTypes.ATTRIBUTES.join(',') } });
    },

    /**
     * User photo in max width.
     *
     * @returns {string} base64 string from user photo.
     */
    photo()
    {
        return new Promise((resolve, reject) =>
        {
            Graph.graphRequest({ api: 'me/photo/$value', responseType: 'blob' })
                .then((response) =>
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(response);
                    reader.onloadend = function()
                    {
                        resolve(reader.result);
                    };
                })
                .catch(reject);
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
        return new Promise((resolve, reject) =>
        {
            Graph.graphRequest({ api: `me/photos/${size}/$value`, responseType: 'blob' })
                .then((response) =>
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(response);
                    reader.onloadend = function()
                    {
                        resolve(reader.result);
                    };
                })
                .catch(reject);
        });
    }
};

export default Graph;
