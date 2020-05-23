const { when } = require('@craco/craco');
const sassSourcemaps = require('./webpack/sass-sourcemaps');

module.exports = {
    plugins: [
        // ...when(process.env.NODE_ENV === 'development', () => [
        //     sassSourcemaps
        // ], [])
    ]
};
