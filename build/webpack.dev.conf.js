//工具方法
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
    // 合并配置文件
var merge = require('webpack-merge')
    // 开发时和运行时webpack配置文件共享的
var baseWebpackConfig = require('./webpack.base.conf')
    // webpack提供的操作html文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    // 启动了一些hotreload的相关代码,当改变一些源码,在浏览器不刷新的情况下,也能看到改变的效果;如果这个过程失败了,则自动刷新浏览器
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // hotReload的插件
        new webpack.HotModuleReplacementPlugin(),
        // 当编译发生错误的时候,会跳过那部分编译代码,是编译后运行时的包不会发生错误
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            // 指定编译后生成的html文件名
            filename: 'index.html',
            // 指定要处理的模板
            template: 'index.html',
            // 会自动补全js css 文件路径插入到html文件里
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})