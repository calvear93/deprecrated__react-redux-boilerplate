import { inflections } from 'inflected';
import { createServer, Model } from 'miragejs';

/**
 * Modifies pluralization for words,
 * cause default method use English.
 */
inflections('en', (inflect) =>
{
    inflect.irregular('pais', 'paises');
    inflect.irregular('region', 'regiones');
    inflect.irregular('provincia', 'provincias');
    inflect.irregular('comuna', 'comunas');
});

/**
 * Initializes mocking server.
 */
export default function runServer()
{
    createServer({
        models: {
            user: Model,
            pais: Model,
            region: Model,
            provincia: Model,
            comuna: Model
        },
        fixtures: {
            users: [
                { name: 'Diego', job: 'Developer' },
                { name: 'Juan', job: 'Scrum Master' },
                { name: 'Pedro', job: 'QA' }
            ],
            paises: require('./data/Pais.json'),
            regiones: require('./data/Region.json'),
            provincias: require('./data//Provincia.json'),
            comunas: require('./data/Comuna.json')
        },
        routes()
        {
            this.urlPrefix = process.env.REACT_APP_WEB_API_HOST;
            this.namespace = 'api';
            this.timing = 2000;

            this.resource('users');
            this.resource('paises');
            this.resource('regiones');
            this.resource('provincias');
            this.resource('comunas');

            this.passthrough('https://login.microsoftonline.com/**');
            this.passthrough('https://graph.microsoft.com/**');
        }
    });
}
