const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
    wpyExt: '.wpy',
    eslint: true,
    cliLogs: !prod,
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        },
        aliasFields: ['wepy'],
        modules: ['node_modules']
    },
    compilers: {
        sass: {
            outputStyle: 'compressed'
        },
        babel: {
            sourceMap: !prod,
            presets: [
                'env'
            ],
            plugins: [
                'transform-class-properties',
                'transform-decorators-legacy',
                'transform-object-rest-spread',
                'transform-export-extensions',
            ]
        }
    },
    plugins: {},
    appConfig: {
        noPromiseAPI: ['createSelectorQuery']
    }
}

if (prod) {
    module.exports.compilers['sass'] = {outputStyle: 'compressed'}
    module.exports.plugins = {
        uglifyjs: {
            filter: /\.js$/,
            config: {}
        },
        imagemin: {
            filter: /\.(jpg|png|jpeg)$/,
            config: {
                jpg: {
                    quality: 80
                },
                png: {
                    quality: 80
                }
            }
        }
    }
}
