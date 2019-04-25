function MyPlugin(options) {
    // Configure your plugin with options...
    this.options = options;
}
MyPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', (compilation) => {
        console.log('The compiler is starting a new compilation...');
        compilation.plugin(
            'html-webpack-plugin-before-html-generation',
            (data, cb) => {
                this.options;
                data.html;
                data.plugin.options.template;
                cb(null, data);
            }
        );
        compilation.plugin(
            'html-webpack-plugin-before-html-processing',
            (data, cb) => {
                this.options;
                data.html;
                cb(null, data);
            }
        );
        compilation.plugin(
            'html-webpack-plugin-alter-asset-tags',
            (data, cb) => {
                this.options;
                data.html;
                cb(null, data);
            }
        );
        compilation.plugin(
            'html-webpack-plugin-after-html-processing',
            (data, cb) => {
                this.options;
                data.html;
                cb(null, data);
            }
        );
        compilation.plugin(
            'html-webpack-plugin-after-emit',
            (data, cb) => {
                this.options;
                data.html;
                cb(null, data);
            }
        );
    });
};

module.exports = MyPlugin;
