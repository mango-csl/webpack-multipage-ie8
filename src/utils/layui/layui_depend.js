// require('../jquery/index.js');
// require('../../../static/lib/layui/css/modules/code.css');
// require('../../../static/lib/layui/css/modules/laydate/default/laydate.css');
// require('../../../static/lib/layui/css/modules/layer/default/layer.css');

require('../../../static/components/layui/css/layui.css');
require('../../../static/components/layui/layui.js');
layui.config({
    dir: '/static/components/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
    // dir: '../../assets/lib/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
});
require('./layui_extend');

