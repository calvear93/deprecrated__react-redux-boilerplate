const { when } = require('@craco/craco');

module.exports = {
    plugins: [
        ...when(process.env.GENERATE_SOURCEMAP === 'true' && process.env.NODE_ENV === 'development', () => [
            require('./webpack/sass-sourcemaps')
        ], [])
    ]
};
