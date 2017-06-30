var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
    // 定义当前目录的根目录
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        // 输出的文件名称,这里的[name],对应上面的entry的key
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        // 可以在require的模块路径中,自动补全文件后缀
        extensions: ['.js', '.vue', '.json'],
        // 提供一些别名,require的模块路径中,通过别名缩短整个路径的字符串长度
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        // 利用各种loader对各种文件做编译,根据后缀名匹配不同文件
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                // include 只对改文件下做编译
                include: [resolve('src'), resolve('test')],
                options: {
                    // 当eslint检查到错误的时候,会友好的提示错误,并链接到eslint的官网链接
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 当图片大小小于10KB的时候,会先将图片base64,打包到编译后的js文件里,否则超过10KB的话,单独生成一个文件
                    limit: 10000,
                    // 生成文件名的规则
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}