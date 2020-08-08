/**
 * Allows to access to JSON files.
 *
 * @summary JSON files handler.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-18 13:34:27
 * Last modified  : 2020-08-08 13:43:26
 */

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
 * Returns JSON files data.
 *
 * @param {string} module module name.
 * @returns {JSON} json file data.
 */
export function LoadJSON(module)
{
    return new Promise(
        (resolve, reject) =>
        {
            Modules[module] // module declared in Modules.
                .then((data) => resolve(data.default))
                .catch((e) => reject(e));
        }
    );
}
