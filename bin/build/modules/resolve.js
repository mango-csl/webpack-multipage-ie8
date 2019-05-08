const files = require('../../config/files');
const path = require('path');
module.exports = {
    alias: {
        'static': path.resolve(files.staticPath),
        'utils': path.resolve(files.appPath, 'utils/base.js'),
        'Jquery': path.resolve(files.appPath, 'utils/jquery/index.js'),
        'baseCss': path.resolve(files.appPath, 'assets/styles/base/index.less')
    },
    modules: ['node_modules'],
    extensions: ['.js']
};
