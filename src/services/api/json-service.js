/**
 * Allows to access to JSON files.
 *
 * @summary JSON files handler.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-18 13:34:27
 * Last modified  : 2020-08-08 19:28:26
 */

/**
 * Returns JSON files data.
 *
 * @param {Promise<any>} module import JSON file, like import('../Module.json').
 *
 * @returns {JSON} json file data.
 */
export function LoadJSON(module)
{
    return new Promise(
        (resolve, reject) =>
        {
            module // import('../Module.json')
                .then((data) => resolve(data.default))
                .catch((e) => reject(e));
        }
    );
}
