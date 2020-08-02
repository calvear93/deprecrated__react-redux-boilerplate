const { when } = require('@craco/craco');

module.exports = {
    devServer: {
        compress: false,
        port: 3000,
        headers: {
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '1; mode=block'
        }
    },
    plugins: [
        ...when(process.env.GENERATE_SOURCEMAP === 'true' && process.env.NODE_ENV === 'development', () => [
            require('./webpack/sass-sourcemaps')
        ], [])
    ]
};
