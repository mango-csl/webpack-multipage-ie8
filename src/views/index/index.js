// todo document.ready 引入方式有没有性能提升
// document.ready(function (
//     // document.getElementById('test').innerHTML = 'document.ready test!'; //找到
//     // 测试document.ready 方法代码
//     // alert(document.getElementById('test')); //null 没找到
//     // document.getElementById('test').innerHTML = 'document.ready test!'; //找到
// ) {
// });

//     require.ensure([], function () {
//         var jquery = require('../../../static/js/jquery-1.12.4.min');
//         window.$ = jquery;
//         // stepone.checkone();
//         var oP = document.createElement('p');
//         oP.className = 'text';
//         oP.innerHTML = '这是由js生成的一句话';
//         document.querySelector('.g-bd').appendChild(oP);
//         /* eslint-disable no-undef */
// // 增加事件
//         $('#dialog').click(function () {
//             require(['../../components/dialog/index.js'], function (dialog) {
//                 dialog();
//             });
//         });
//     }, 'jquery');
require('../../assets/styles/base/index.less');
require('./index.less');
require('../../utils/layui/layui_depend');

require('../../utils/jquery');

var oP = document.createElement('p');
oP.className = 'text';
oP.innerHTML = '这是由js生成的一句话';
document.querySelector('.g-bd').appendChild(oP);
/* eslint-disable no-undef */
// 增加事件
$('#dialog').click(function () {
    require(['../../components/dialog/index.js'], function (dialog) {
        dialog('aaa', function (param) {
            console.log(param);
        });
    });
});
// layui弹窗
$('#layuiDialog').click(function () {
    require(['../../components/layuiDialog/layuiDialog.js'], function (layuiDialog) {
        layuiDialog();
    });
});
// layui确认框
$('#layuiConfirm').click(function () {
    layui.use(['djcpsConfirm'], function () {
        var djcpsConfirm = layui.djcpsConfirm;
        djcpsConfirm.init('aaaaaaaaa', {}, function (index) {
            console.log(index);
        });
    });
});
$('#http').click(function () {
    getTest();
    // ajax('https://api.douban.com/v2/music/search?q=周杰伦');
});
getTest();

function getTest() {
    $.ajax({
        type: "post",
        // url: "http://192.168.2.167:3000/test",
        url: "/dj_server/test",
        dataType: "json",
        success: function (data) {
            console.log('success = ', data);
        },
        error: function (err) {
            console.log('error = ', err);
        }
    });
}
