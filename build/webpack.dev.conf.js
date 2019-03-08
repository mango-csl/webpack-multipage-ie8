// 移除node开发环境，webpack警告
process.noDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../sysConfig/index');
const utils = require('./utils');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const files = require('./base/files');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

let webpackConfig = merge(baseWebpackConfig, {
    // output: {
    //     // path: sysConfig.dev.outPutPath,
    //     path: '/',
    //     publicPath: '/',
    //     filename: 'scripts/[name].js',
    //     chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    // },
    //ps：inline-source-map 其他方式（cheap-module-eval-source-map）压缩会导致开发环境在ie8下，编译异常   取消标识符，坑爹：注意webpack重启才能检验，忘记已经去除ie8 热更新了
    devtool: 'inline-source-map',
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: "post",
            //     // enforce: "pre",
            //     include: [
            //         resolve('src'),
            //         // resolve('test'),
            //         // resolve('node_modules/webpack-hot-middleware'),
            //         resolve('node_modules/webpack-dev-server/client')
            //     ],
            //     loader: "es3ify-loader"
            // }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({ // 压缩代码
        //     output: {
        //         screw_ie8: false,
        //         beautify: true, //有正常的空格和断句，注释也会保留，
        //         comments: true,
        //         quote_keys: true,
        //         keep_quoted_props: true
        //     },
        //     screw_ie8: false,
        //     compress: {
        //         warnings: false, properties: false, screw_ie8: false
        //     },
        //     mangle: {
        //         eval: true,
        //         screw_ie8: false,
        //         except: ['$super', '$', 'exports', 'require'] // 排除关键字
        //     }
        // }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: sysConfig.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});

// for (const key of Object.keys(webpackConfig.entry)) {
//     webpackConfig.entry[key].unshift("babel-polyfill");
// }
if (sysConfig.dev.screw_ie8) {
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}

// if (sysConfig.dev.screw_ie8) {
//     // const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//     const hotMiddlewareScript = 'webpack-dev-server/client?http://localhost:' + sysConfig.dev.serverPort;
//     for (const key of Object.keys(webpackConfig.entry)) {
//         webpackConfig.entry[key].unshift("babel-polyfill", hotMiddlewareScript, 'webpack/hot/dev-server');
//     }
//     webpackConfig.plugins.push(
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoEmitOnErrorsPlugin()
//     );
// } else {
//     for (const key of Object.keys(webpackConfig.entry)) {
//         webpackConfig.entry[key].unshift("babel-polyfill");
//     }
// }

const pages = Object.keys(utils.getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
    const conf = {
        filename: '../' + sysConfig.dev.tplPath + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
        template: 'src/views/' + pathname + '.html', // html模板路径
        inject: false // js插入的位置，true/'head'/'body'/false
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //  removeComments: true, //移除HTML中的注释
        //  collapseWhitespace: false //删除空白符与换行符
        // }
    };
    if (pathname in webpackConfig.entry) {
        conf.favicon = path.resolve(__dirname, '../src/imgs/favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;
