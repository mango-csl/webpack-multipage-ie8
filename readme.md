# 前端工程化后续计划

<a name="pUi2A"></a>
### ~~问题1：改变代码时所有的 chunkhash 都会改变？~~
描述：理想状态希望，非公共模块改动时，只用替换某几个文件就能完成上线工作，从而最大利用缓存<br />解决方案：webpack好像有这方面的功能，会基于文件内容生成对应的文件hash名，当文件没有改动时，hash值是不会改变的<br />通过配置各类webpack插件解决<br />[Vendor chunk hash varies when app chunk changes](https://github.com/webpack/webpack/issues/1150)

<a name="aFm1G"></a>
### ~~问题2：公共的css，还没有额外输出为一个文件；postcss 插件引入~~
解决方案：webpack配置优化
<a name="oZV4R"></a>
### ~~问题3：static 文件有些可以再压缩~~
描述：现在layui和自定义layui组件是，放在static文件中引入，希望通过webpack统一管理

<a name="Zqb1G"></a>
### ~~问题4：资源地址问题~~
准备将启动有关的地址全改为绝对地址，利于后续文件维护<br />但是不知道会对性能有多大影响(暂时没发现多大影响)

<a name="KtTta"></a>
### ~~问题5：资源通过webpack自由组装（require），而不是通过标签的方式引入~~
	解决layui require 引入的问题，需要配置dir<br />layui在static中的位置千万不要改动，扩展组件的资源引用是写死的！

```
<link rel="stylesheet" id="alertCss" href="static/components/modules/djcpsAlert/djcpsAlert.css">
```

<a name="l5EM5"></a>
### ~~问题6：layui的jq 与引入的jq 统一~~

```
// layui中会检查window中的prototype是否有jQuery，没有会加载自带module中的jquery
window.$ = window.jQuery = require('./jquery-1.12.4.min');
```

<a name="oAuLx"></a>
### ~~问题7：loader问题，layui引用的是相对地址，开发环境会加载不出来~~
官网webpack给出的url-loader的配置参数吧。<br />（语雀插入表格崩溃问题）<br />配置名称	类型	默认值	含义<br />limit	{Number}	undefined	转化为data-url内联使用的文件带下阈值<br />mimetype	{String}	文件扩展名	文件的mimetype类型（默认使用文件扩展类型）<br />fallback	{String}	file-loader	在文件大于limit时，交于处理的加载器<br />实际上可用配置参数：

```javascript
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
    // include: [config.SRC_PATH],//需要被loader 处理的文件或文件夹
    // exclude: [config.VENDORS_PATH], //排除不满足条件的文件夹（这样可以排除webpack查找不必要的文件）
    use: [{
      loader: 'url-loader',
      options: {
        name: 'fonts/[hash].[name].[ext]',
        limit: 8192,
        context: 'src/',
        outputPath: 'fonts/',
        publicPath: '../../fonts/',
        useRelativePath: false,
        fallback: 'file-loader'
      }
    }]
}
```

	这个配置是配置给file-loader的，当图片的大小大于limit的时候，就会使用file-loader。https://webpack.docschina.org/loaders/file-loader/

<a name="VNnOm"></a>
### ~~问题8：art-tempalte  extend在项目中无法使用的问题~~

```
又回到资源在webpack中加载的问题，
[1]     ERROR in ./node_modules/html-webpack-plugin/lib/loader.js!./temp_compiledHtml/index.html
[1]     Module not found: Error: Can't resolve '../../imgs/3.png' in 'D:\项目代码\web-engineering\webpack-art-template\temp_compiledHtml'
[1]      @ ./node_modules/html-webpack-plugin/lib/loader.js!./temp_compiledHtml/index.html 1:3418-3445
[1]     
[1]     ERROR in ./node_modules/html-webpack-plugin/lib/loader.js!./temp_compiledHtml/index.html
[1]     Module not found: Error: Can't resolve '../imgs/4.png' in 'D:\项目代码\web-engineering\webpack-art-template\temp_compiledHtml'
[1]      @ ./node_modules/html-webpack-plugin/lib/loader.js!./temp_compiledHtml/index.html 1:3314-3338
```

~~node先编译art 模板，输出html作为webpack的编译模板~~模板改动更新问题，现在webpack编译用的模板是node编译art-template后的文件，中间多了一层，如何监听变动及更新~~
<a name="qEIiC"></a>
### ~~问题9：开发环境问题~~
a：layui.css 引入的font，在开发环境无法展示出来<br />css-loader中的配置问题，修改sourceMap为false即可
> [https://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809](https://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809)

<a name="Tb5gD"></a>
### **webpack.config.js**<br />
```
//sourceMap
//设置 sourceMap 选项查询参数来引入 source map。

//例如 extract-text-webpack-plugin 能够处理它们。
//
//默认情况下不启用它们，因为它们会导致运行时的额外开销，并增加了 bundle 大小 (JS source map 不会)。
//此外，相对路径是错误的，你需要使用包含服务器 URL 的绝对公用路径。
{
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}
```
ps：art-template编译的时候，对模板注释中所引用的资源也会处理
<a name="4qsJX"></a>
### 问题10：后续webpack性能优化
avalon-webpack3-start
