'use strict';

// 循环引用问题  utils 运行时，引用config；而config初始化时，又引用utils，
// node在加载模块的时候会为每个新加载的文件创建一个Module对象,获取utils没有完全加载完毕，故 object类型的变量为{}
// const utils = require('../utils/index.js');
let dev_config;
try {
    // 本地维护，不上传github
    dev_config = require('./dev.config');
} catch (e) {
    dev_config = {};
}
// utils.getPort(2082).then((port) => {
//     port;
// });
module.exports = {
    dev: {
        //sourceMap
        //设置 sourceMap 选项查询参数来引入 source map。
        //例如 extract-text-webpack-plugin 能够处理它们。
        //默认情况下不启用它们，因为它们会导致运行时的额外开销，并增加了 bundle 大小 (JS source map 不会)。
        // 此外，相对路径是错误的，你需要使用包含服务器 URL 的绝对公用路径。!!
        cssSourceMap: false,
        host: '0.0.0.0',
        serverPort: 2082,
        expressPort: 24999,
        autoOpenBrowser: true,
        assetsPublicPath: '/', // 'https://cdn.xxxxx.com', // 添加路径前缀,后续cdn扩展
        assetsSubDirectory: 'static', //静态资源指向目录
        notifyOnErrors: true,
        screw_ie8: dev_config.screw_ie8 || false // 开发环境兼容ie8开关，false 兼容 || true 不兼容
    },

    build: {
        assetsPublicPath: '/',
        assetsSubDirectory: 'static', //静态资源指向目录
        bundleAnalyzerReport: true, //会打断npm && npm 这类npm指令继续执行
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        productionSourceMap: false
    }
};
