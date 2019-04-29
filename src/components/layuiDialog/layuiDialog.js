require('../../utils/layui/layui_depend');
require('./layuiDialog.less');
var html = require('./layuiDialog.html');
module.exports = function () {
    var $layuiDialog = $(html).clone();
    $('body').append($layuiDialog);
    layui.use(['djcpsModal'], function () {
        var djcpsModal = layui.djcpsModal;
        var modal = djcpsModal.init({
            content: $layuiDialog
        });
        modal.success(function (layero, index) {
            console.log(layero, index);
            $('.btnaaa').click(function() {
                console.log(222);
            });
        });
        modal.end(function() {
            $layuiDialog.remove();
        });
    });
};
