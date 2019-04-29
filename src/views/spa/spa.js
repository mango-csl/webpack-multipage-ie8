// todo 首屏加载优化，先渲染主框架
// 引入css
require('../../assets/styles/base/index.less');
require('../../utils/layui/layui_depend');
layui.use('element', function() {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
});
var Data = {};
/* eslint-disable no-undef */
// 增加事件
location.hash = '#1'; //初始地址
$(window).on('hashchange', function () {
    var firstIndexSharp = location.hash.indexOf('#');
    var hash = location.hash.substring(firstIndexSharp + 1);
    var chineseHash = hash;
    $('#title').text(chineseHash);
    switch (chineseHash) {
        case '1':
            require(['../../components/login/index.js'], function (login) {
                var ss = function (val) {
                    console.log(val);
                };
                var aaa = login(ss);
                console.log(aaa);
            });
            layui.use('djcpsMsg', function () {
                var djcpsMsg = layui.djcpsMsg;
                djcpsMsg.init('当前信息已过期，请重新登录', undefined, function () {
                    console.log('end');
                });
            });
            break;
        case '2':
            require(['../../components/dialog/index.js'], function (dialog) {
                dialog();
            });
            break;
        case '3':
            var html = '<div id="main" style="width: 800px;height: 600px"></div>';
            var content = $('#content');
            content.html(html);
            var echarts = require('echarts/lib/echarts');
// 引入柱状图
            require('echarts/lib/chart/bar');
// 引入提示框和标题组件
            require('echarts/lib/component/tooltip');
            require('echarts/lib/component/title');
// 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            break;
        case '4':
            require(['../../components/upload/index.js'], function (upload) {
                upload();
            });
            break;
        default:
            break;
    }
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

