/**
 * SASS Sourcemaps.
 * Allows to generate sourcemaps on debugging.
 * Specially useful for stylesheets debugging.
 *
 * https://github.com/facebook/create-react-app/issues/5707#issuecomment-503614767
 *
 * @summary short description for the file
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:27:55
 * Last modified  : 2020-05-16 16:29:14
 */

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) =>
        {
            function traverse(obj, callback)
            {
                if (Array.isArray(obj))
                {
                    obj.forEach(item => traverse(item, callback));
                }
                else if ((typeof obj === 'object') && (obj !== null))
                {
                    Object.keys(obj).forEach(key =>
                    {
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                        {
                            callback(obj, key);
                            traverse(obj[key], callback);
                        }
                    });
                }
            }

            function validateLoader(node, key, loaders)
            {
                if (key !== 'loader')
                    return false;

                for (let loader of loaders)
                {
                    if (node[key].indexOf(loader) !== -1)
                        return true;
                }

                return false;
            }

            traverse(webpackConfig, (node, key) =>
            {
                if (node.options && validateLoader(node, key, [ 'sass-loader', 'postcss-loader', 'css-loader' ]))
                    node.options.sourceMap = true;
            });

            return webpackConfig;
        }
    }
};
