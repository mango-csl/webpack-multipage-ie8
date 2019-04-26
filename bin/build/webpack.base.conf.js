// 移除node开发环境，webpack警告
process.noDeprecation = true;
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../config/index');
const utils = require('../utils');
// const MyPlugin = require('./plugin/MyPlugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// const merge = require('webpack-merge');

const Es3ifyPlugin = require('es3ify-webpack-plugin');
const files = require('../config/files');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const entries = utils.getEntry(files.appPath + '/scripts/page/**/*.js', files.appPath + '/scripts/page/');
const views = utils.findSync(files.htmlPath);
const chunks = Object.keys(views);

function file_path(extname) {
    let result = {};
    for (let key of chunks) {
        result[key] = path.join(views[key], key + extname);
    }
    return result;
}

const entries = (file_path)('.js');

// let path_jq = path.join(files.staticPath, 'js/jquery-1.12.4.min.js');
let webpackConfig = {
    // entry: merge({
    //     // layui: `${files.staticPath}/lib/layui/layui.js`,
    //     // jquery: ['jquery']
    // }, entries,
    entry: entries,
    output: {
        path: files.buildPath,
        filename: '[name].js',
        publicPath: isProduction
            ? sysConfig.build.assetsPublicPath
            : sysConfig.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            // '@': resolve('src'),
            // 'jquery': path.join(files.staticPath, 'js/jquery-1.12.4.min.js')
        }
    },
    // 配置通过script 引入
    externals: {
        // 'layui': 'window.layui' // 使用时，依旧用require的方式来使用，webpack不会把它编译进文件里
        // 'jquery': path.join(files.staticPath, 'js/jquery-1.12.4.min.js')
        // 'jquery': 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                //include: path.join(projectDirname, 'src'),
                include: [files.appPath],
                use: {
                    loader: 'babel-loader',
                    /*options: {
                        presets: ['env']
                    }*/
                    options: {
                        presets: ['env', 'es2015-loose']
                        //presets: ['env'],
                        //plugins: ['transform-runtime', 'proxy']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // exclude: [files.staticPath],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                // exclude: [files.staticPath],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.art$/,
                loader: 'art-template-loader'
            }
        ]
    },
    plugins: [
        new Es3ifyPlugin(),
        // new webpack.ProvidePlugin({ // 加载jq
        // $: 'jquery'
        // }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        })
        // new MyPlugin({ options: '' })
    ]
};
// const tpl_extname = '.art';
const renderData = require('../dataSource/renderData');
// const html = utils.getEntry(`${files.htmlPath}/*${tpl_extname}`, files.htmlPath + '/');
// const pages = Object.keys(html);
const htmls = (file_path)('.art');
chunks.forEach(function (pathname) {
    pathname.replace('');
    if (pathname in webpackConfig.entry) {
        const conf = {
            // filename: '../' + files.tplName + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
            filename: `${isProduction ? files.buildPath : files.tplPath}/${pathname}.html`, // 生成的html存放路径，相对于outPutPath
            template: htmls[pathname], // html模板路径
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
        conf.favicon = files.faviconPath;
        conf.inject = 'body';
        conf.chunks = ['manifest', 'vendors', pathname];
        conf.chunksSortMode = 'manual';
        // 两种实现
        // conf.chunksSortMode = function (chunk1, chunk2) {
        //         //     const order = ['vendors', 'jquery', 'layui', pathname];
        //         //     const order1 = order.indexOf(chunk1.names[0]);
        //         //     const order2 = order.indexOf(chunk2.names[0]);
        //         //     return order1 - order2;
        //         // };
        conf.templateParameters = renderData[pathname];
        conf.hash = true;
        webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = webpackConfig;
