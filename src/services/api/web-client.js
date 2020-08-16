import { createHttpClient, HttpMethod } from 'utils/libs/http.lib';

// axios instance pre-configured.
const request = createHttpClient(process.env.REACT_APP_WEB_API_HOST);

export default {
    // demo service.
    Users: {
        /**
         * Returns users list.
         *
         * @returns {any} users list.
         */
        GetAll()
        {
            return request({
                url: '/api/users',
                method: HttpMethod.GET
            });
        }
    }
};
