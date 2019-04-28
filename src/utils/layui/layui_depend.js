require('../jquery');
// todo es2015 的问题??



// require('../../../static/lib/layui/css/modules/code.css');
// require('../../../static/lib/layui/css/modules/laydate/default/laydate.css');
// require('../../../static/lib/layui/css/modules/layer/default/layer.css');

// static 中引入,虽然样式也能按需加载,但是devserver中,font引入会有问题
// require('../../../static/components/layui/css/layui.css');
// require('../../../static/components/layui/layui.js');
// layui.config({
//     dir: '/static/components/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
//     // dir: '../../package/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
// });

// require('../../../static/components/layui/css/layui.css');
require('../../assets/lib/layui/css/layui.css');
// require('../../../static/components/layui/layui.js');
require('../../assets/lib/layui/layui');
layui.config({
    dir: '/static/components/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
    // dir: '../../assets/lib/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
});
require('./layui_extend');

