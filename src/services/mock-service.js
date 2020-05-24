import HttpStatus from 'http-status-codes';

/**
 * JSON files modules.
 * modules with path should be
 * declared here.
 */
const Modules = {
    Pais: import('../data/Pais.json'),
    Region: import('../data/Region.json'),
    Provincia: import('../data/Provincia.json'),
    Comuna: import('../data/Comuna.json')
};

/**
 * Arms a HTTP response for mocking services.
 *
 * @param {*} content response content.
 * @param {*} message response message.
 * @param {*} httpStatus response status code.
 *
 * @returns {Response} HTTP response.
 */
function HttpResponse(content, message, httpStatus)
{
    return {
        data: content,
        status: httpStatus ?? HttpStatus.OK,
        statusText: message ?? 'Operation success'
    };
}

/**
 * Returns a promise with mocked data.
 *
 * @param {string} module mock data module.
 * @param {string} delay mocked service response delay
 * @param {string} fail whether service should fail.
 *
 * @returns {Promise} mocked promise.
 */
export function MockWithDatasource(module, delay = 500, fail = false)
{
    return new Promise( (resolve, reject) =>
    {
        setTimeout(() =>
        {
            if (fail)
                reject(HttpResponse(null, 'Connection error', HttpStatus.SERVICE_UNAVAILABLE));

            Modules[module]
                .then((data) => resolve(HttpResponse(data.default)))
                .catch((e) => resolve(HttpResponse(null, 'Operation failed' + e.message, HttpStatus.INTERNAL_SERVER_ERROR)));
        }, delay);
    });
}

/**
 * Returns a promise with mocked data.
 *
 * @param {string} data mock data object.
 * @param {string} delay mocked service response delay
 * @param {string} fail whether service should fail.
 *
 * @returns {Promise} mocked promise.
 */
export function Mock(data, delay = 500, fail = false)
{
    return new Promise( (resolve, reject) =>
    {
        setTimeout(() =>
        {
            if (fail)
                reject(HttpResponse(null, 'Connection error', HttpStatus.SERVICE_UNAVAILABLE));

            resolve(HttpResponse(data));
        }, delay);
    });
}
