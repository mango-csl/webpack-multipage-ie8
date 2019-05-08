// const config = require('../../config/index');
const files = require('../../config/files');
const path = require('path');
module.exports = {
    alias: {
        'static': path.resolve(files.staticPath),
        'utils': path.resolve(files.appPath, 'utils/base.js')
        // 'css': path.resolve(files.cssPath, 'index.' + config.cssType)
    },
    modules: ['node_modules'],
    extensions: ['.js']
};
