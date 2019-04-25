// todo 首屏加载优化，先渲染主框架
// 引入css
document.ready(function () {
    //todo
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
//             require(['../components/dialog/index.js'], function (dialog) {
//                 dialog();
//             });
//         });
//     }, 'jquery');
    require('../../assets/styles/base/index.less');
    require('../../assets/styles/page/index.less');
//     require(['../../utils/jquery-1.12.4.min'], function (_jquery) {
//         window.$ = _jquery;
//         // stepone.checkone();
//         var oP = document.createElement('p');
//         oP.className = 'text';
//         oP.innerHTML = '这是由js生成的一句话';
//         document.querySelector('.g-bd').appendChild(oP);
//         /* eslint-disable no-undef */
// // 增加事件
//         $('#dialog').click(function () {
//             require(['../components/dialog/index.js'], function (dialog) {
//                 dialog();
//             });
//         });
//         $('#http').click(function () {
//             getTest();
//             // ajax('https://api.douban.com/v2/music/search?q=周杰伦');
//         });
//         getTest();
//
//         function getTest() {
//             $.ajax({
//                 type: "post",
//                 // url: "http://192.168.2.167:3000/test",
//                 url: "/dj_server/test",
//                 dataType: "json",
//                 success: function (data) {
//                     console.log('success = ', data);
//                 },
//                 error: function (err) {
//                     console.log('error = ', err);
//                 }
//             });
//         }
//     });
    document.getElementById('test').innerHTML = 'document.ready test!'; //找到
    // require('../../../static/js/jquery-1.12.4.min');
});
require('../../utils/jquery');
// 测试document.ready 方法代码
// alert(document.getElementById('test')); //null 没找到
// document.getElementById('test').innerHTML = 'document.ready test!'; //找到
var oP = document.createElement('p');
oP.className = 'text';
oP.innerHTML = '这是由js生成的一句话';
document.querySelector('.g-bd').appendChild(oP);
/* eslint-disable no-undef */
// 增加事件
$('#dialog').click(function () {
    require(['../../components/dialog/index.js'], function (dialog) {
        dialog();
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
