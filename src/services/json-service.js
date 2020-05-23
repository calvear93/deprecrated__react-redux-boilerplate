/**
 * Allows to access to JSON files.
 *
 * @summary JSON files handler.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-18 13:34:27
 * Last modified  : 2020-05-23 16:31:05
 */

// preloaded data animation modules.
// modules with path should be
// declared here.
const Source = {
    JSON: import('./test-file.json')
};

/**
 * Returns animation JSON files.
 *
 * @export
 * @param {string} module module name.
 * @returns {JSON} json animation data.
 */
export function GetAnimation(module)
{
    return new Promise(
        (resolve, reject) =>
        {
            Source[module] // module declared in Animations.
                .then((data) => resolve(data.default))
                .catch((e) => reject(e));
        }
    );
}
