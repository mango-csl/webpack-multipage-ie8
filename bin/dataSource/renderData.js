const files_path = require('../config/files');
const webTile = '各个页面统一title';
const commonData = {
    headerList: {
        index: '首页',
        about: '关于',
        login: '登陆',
        spa: '单页'
    },
    assetsPath: files_path.assetsPath,
    staticPath: files_path.staticPath
};
const renderData = (option = {isProduction: false}) => ((_baseData) => {
    for (let key of Object.keys(_baseData)) {
        _baseData[key] = Object.assign({}, commonData, _baseData[key], option);
    }
    return _baseData;
})({
    'index': {
        title: '首页 - ' + webTile,
        pageNav: 'index'
    },
    'about': {
        title: '首页 - ' + webTile,
        pageNav: 'about'
    },
    'error': {
        title: '错误 - ' + webTile,
        message: '错误message',
        error: {
            status: 'error status',
            stack: 'error stack'
        }
    },
    'login': {
        title: '登陆 - ' + webTile,
        pageNav: 'login'
    },
    'spa': {
        title: '单页 - ' + webTile,
        pageNav: 'spa'
    }
});

module.exports = renderData;
