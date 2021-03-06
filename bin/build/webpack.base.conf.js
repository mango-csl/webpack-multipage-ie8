// 移除node开发环境，webpack警告
process.noDeprecation = true;
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../config/index');
const utils = require('../utils');
// const MyPlugin = require('./plugin/MyPlugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const Es3ifyPlugin = require('es3ify-webpack-plugin');
const files = require('../config/files');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
const htmlPlugin_chunks = ['manifest', 'vendors', 'common'];
// const htmlPlugin_chunks = ['manifest', 'vendors'];
let webpackConfig = {
    entry: Object.assign(entries, {
        common: ['utils', 'baseCss']
    }),
    // entry: entries,
    output: {
        path: files.buildPath,
        filename: '[name].js',
        publicPath: isProduction
            ? sysConfig.build.assetsPublicPath
            : sysConfig.dev.assetsPublicPath
    },
    resolve: require('./modules/resolve'),
    // 关联通过script 引入的资源
    externals: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /(node_modules)/,
                exclude: [files.staticPath],
                //include: path.join(projectDirname, 'src'),
                include: [files.appPath],
                use: {
                    loader: 'babel-loader',
                    /*options: {
                        presets: ['env']
                    }*/
                    // options: {
                    //     presets: ['env', 'es2015-loose']
                    //     //presets: ['env'],
                    //     //plugins: ['transform-runtime', 'proxy']
                    // }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // exclude: [files.staticPath],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    // fallback: 'file-loader'
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
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                    // fallback: 'file-loader'
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
const renderData = require('../dataSource/renderData')({isProduction: isProduction});
const htmls = (file_path)('.art');
chunks.forEach(function (pathname) {
    pathname.replace('');
    if (pathname in webpackConfig.entry) {
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            // filename: '../' + files.tplName + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
            filename: `${isProduction ? files.buildPath : files.buildPath}/${pathname}.html`, // 生成的html存放绝对路径
            template: htmls[pathname], // html模板路径
            // inject: false, // js插入的位置，true/'head'/'body'/false
            /*
             * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
             * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
             * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
             * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
             */
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                minifyJS: true,
                minifyCSS: true
            },
            favicon: files.faviconPath,
            inject: 'body', // js插入的位置，'head'||'body'
            chunks: [...htmlPlugin_chunks, pathname],
            chunksSortMode: 'manual',
            // 两种实现
            // chunksSortMode = function (chunk1, chunk2) {
            //         //     const order = ['vendors', 'jquery', 'layui', pathname];
            //         //     const order1 = order.indexOf(chunk1.names[0]);
            //         //     const order2 = order.indexOf(chunk2.names[0]);
            //         //     return order1 - order2;
            //         // };
            templateParameters: renderData[pathname],
            hash: true
        }));
    }
});

module.exports = webpackConfig;
