const { when } = require('@craco/craco');

module.exports = {
    devServer: {
        compress: false,
        headers: {
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '1; mode=block'
        }
    },
    plugins: [
        {
            plugin: require('craco-image-optimizer-plugin'),
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: [ 0.65, 0.9 ],
                    speed: 4
                },
                gifsicle: {
                    interlaced: false
                },
                webp: {
                    quality: 75
                }
            }
        },
        ...when(process.env.GENERATE_SOURCEMAP === 'true' && process.env.NODE_ENV === 'development', () => [
            require('./webpack/sass-sourcemaps')
        ], [])
    ]
};
