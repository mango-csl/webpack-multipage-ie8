// 加载模块css
var style = require('./css/dialog.less');
// 加载模板
var html = require('./tmpl/dialog.html');
/* eslint-disable no-undef */
module.exports = function (param, callback) {
    var $dialog = $(html).clone();
    console.log(param);
    // debugger;
    // setTimeout(function() {
    //     // 改变css变量的值
    //     document.documentElement.style.setProperty('--normalColor', 'blue');
    // }, 3000);
    $dialog.addClass(style.dialog);
    $dialog.find('.close').on('click', function () {
        $dialog.remove();
        typeof callback === 'function' && callback('bbb');
    });
    $('body').append($dialog);
};
