// 加载模块css
require('./upload.less');
// 加载模板
var html = require('./upload.html');
/* eslint-disable no-undef */
module.exports = function () {
    $('#content').html(html);
    layui.use(['djcpsUpload', 'laytpl', 'layer'], function () {
        var djcpsUpload = layui.djcpsUpload;
        var laytpl = layui.laytpl;
        var layer = layui.layer;
        var uploadListTpl = '{{# layui.each(d,function(index, item) { }} ' +
            '<tr data-index={{item.index}}> ' +
            '<td class="name">{{item.file.name}}</td> ' +
            '<td><img src="{{item.url}}"></td> ' +
            '<td>{{(item.file.size/1024).toFixed(1)}}kb</td> ' +
            '<td class="aaa">等待上传</td> ' +
            '<td> ' +
            '<!-- <button class="layui-btn rename">重命名</button> --> ' +
            '<button class="layui-btn reupload">重传</button> ' +
            '<button class="layui-btn delete">删除</button> ' +
            '</td> ' +
            '</tr>' +
            '{{# }); }}';
        var loading;
        var upload1 = djcpsUpload.init({
            elem: '#upload1',
            url: '/api/upload',
            data: {id: 111111, name: 'hahaha'},
            accept: 'images',
            acceptMime: 'image/jpg, image/png, image/jpeg',
            exts: 'jpg|png|jpeg',
            auto: false,
            bindAction: $('#uploadBtn'),
            field: 'file',
            size: 100,
            multiple: true,
            number: 0,
            drag: false,
            choose: function (obj) {
                upload1.filePreview(obj).then(function (fileArr) {
                    laytpl(uploadListTpl).render(fileArr, function (html) {
                        $('#uploadBody').html(html);
                        $('.delete').unbind().bind('click', function () {
                            var index = $(this).parents('tr').data('index');
                            var itemIndex = (function () {
                                for (var i = 0; i < fileArr.length; i++) {
                                    if (fileArr[i].index === index) {
                                        return i;
                                    }
                                }
                            })();
                            upload1.deleteFile(fileArr[itemIndex].index, $(this).parents('tr'));
                            fileArr.splice(itemIndex, 1);
                        });
                        $('.reupload').unbind().bind('click', function () {
                            var index = $(this).parents('tr').data('index');
                            var itemIndex = (function () {
                                for (var i = 0; i < fileArr.length; i++) {
                                    if (fileArr[i].index === index) {
                                        return i;
                                    }
                                }
                            })();
                            upload1.reupload(obj, fileArr[itemIndex].file, fileArr[itemIndex].index);
                        });
                    });
                });
            },
            before: function (obj) {
                var fileArr = upload1.filePreview(obj);
                console.log(fileArr);
                loading = layer.load();
            },
            done: function (res, index, upload) {
                console.log(res, index, upload);
            },
            error: function (index, upload) {
                console.log(index, upload);
            },
            allDone: function (obj) {
                console.log(obj);
                layer.close(loading);
            }
        });
        $('#reupload').click(function () {
            upload1.reupload();
        });
    });
};
