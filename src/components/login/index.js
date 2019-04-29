// 加载模块css
require('./login.css');
// 加载模板
var html = require('./login.html');
var md5 = require('md5');
/* eslint-disable no-undef */
module.exports = function (callback) {
    $('#content').html(html);
    $('.getMD5ofPwd').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        localStorage.setItem('pwd', md5(password));
        layer.msg(md5(password));
        callback(password);
    });
};
