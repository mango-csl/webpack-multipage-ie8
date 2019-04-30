/**
 * 废弃
 */
const {artTemplateRenderFn} = require('../../lib/art-template');
const fs = require('fs');
const utils = require('../../utils/index');
const files = require('../../config/files');
require('shelljs/global');
// 渲染数据
const renderData = require('../../dataSource/renderData');
//html模板所在页面
const tempaltePath = files.htmlPath; // change
// 'dist/'
const outPutPath = files.compiledHtmlPath; // change
rm('-rf', outPutPath);
/**
 * node端html模板渲染函数
 * @param htmlToString
 * @param renderData
 * @param options
 * @returns {*}
 */
let nodeRenderFn = function (htmlToString, renderData, options) {
    // todo layui标签模板引入时，会被编译,目前采用layui.laytpl(tpl).render(); 的方式引入自定义字符串模板
    return artTemplateRenderFn(htmlToString, renderData, Object.assign({}, {
        root: tempaltePath,
        extname: '.art'
        // imports: {
        //     outSide: function (name) {
        //         return 'outside' + name;
        //     }
        // }
    }, options));
};
const tpl_extname = '.art';
const entries = utils.getEntry(`${tempaltePath}/*${tpl_extname}`, tempaltePath + '/', (value) => {
    return value;
});
const entryPage = require('../webpack.base.conf').entry;
for (let item of Object.keys(entries)) {
    if (item in entryPage) {
        let filePath = entries[item];
        fs.readFile(filePath, function (e, v) {
                let ret = v.toString();
                const template = nodeRenderFn(ret, renderData[item]);

                let dirname = outPutPath;
                if (!fs.existsSync(dirname)) {
                    mkdir('-p', dirname);
                }
                const file_html = `${outPutPath}/${item}.html`;
                fs.writeFile(file_html, template, function (err) {
                    console.log('compile  ----- ', file_html);
                    if (err) throw err;
                });
            }
        );
    }
}

// rm('-rf', tempaltePath);
