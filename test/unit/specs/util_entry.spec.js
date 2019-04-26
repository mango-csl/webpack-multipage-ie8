const utils = require('../../../bin/utils');
const files = require('../../../bin/config/files');
// console.log('entries', entries)

const path = require('path');

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
console.log('entries', entries)
