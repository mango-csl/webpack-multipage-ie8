const express = require('express');
const router = express.Router();
const renderData = require('../../dataSource/renderData')();

const homePage = 'index';
for (let key of Object.keys(renderData)) {
    let path = key === homePage ? '/' : '/' + key + '.html';
    router.get(path, function (req, res) {
        //change
        // , renderData[key]
        res.render(`${key}.html`);
        // next();
    });
}
module.exports = router;
