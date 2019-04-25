// 引入css
require('../../assets/styles/base/index.less');
// todo 首屏加载优化，先渲染主框架
// 引入css
// document.ready(function () {
//     require(['../../utils/jquery-1.12.4.min'], function (_jquery) {
//         window.$ = _jquery;
//         $('.g-bd').append('这是一段js生成的文字');
//     });
// });
require('../../utils/jquery');
$('.g-bd').append('这是一段js生成的文字');
