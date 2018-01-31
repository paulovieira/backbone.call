/*

simple webpack configuration to create a UMD wrapper for a library

*/

var Fs = require('fs');
var Path = require('path');
var Webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');

var rootDir = Path.resolve(__dirname, '..');
var packageObj = require(Path.join(rootDir, 'package.json'));

var name = packageObj.name;
var version = packageObj.version;
var repositoryUrl = (typeof packageObj.repository === 'object') ? packageObj.repository.url : '';

var banner = `
${ name } v${ version }
${ repositoryUrl }
`;

var webpackConfig = {

    entry: Path.join(rootDir, 'lib/index.js'),

    output: {
        filename: Path.join(rootDir, `build/${ name }.js`),
        libraryTarget: 'umd',
        library: 'CallRouter',
        // umdNamedDefine: '...'   // see: http://requirejs.org/docs/whyamd.html#namedmodules
        //sourcePrefix: `/* UMD for ${ name } */\t`
    },

    // external dependencies used by the library code that shouln't be part of the webpack output
    // (in package.json they should be either in "dependencies" or "peerDependencies")

    externals: {

        "underscore": {
            commonjs: "underscore",
            commonjs2: "underscore",
            amd: "underscore",
            root: "_"
        },
        
        "backbone": {
            commonjs: "backbone",
            commonjs2: "backbone",
            amd: "backbone",
            root: "Backbone"
        },
        
        "backbone.base-router": {
            commonjs: "backbone.base-router",
            commonjs2: "backbone.base-router",
            amd: "backbone.base-router",
            root: "Backbone.BaseRouter"  // won't work in the umd wrapper, but will be corrected in the postbuild step
        },

        "backbone.marionette": {
            commonjs: "backbone.marionette",
            commonjs2: "backbone.marionette",
            amd: "backbone.marionette",
            root: "Marionette"
        },
    },

    plugins: [
        new Webpack.BannerPlugin(banner, {}),
        new WebpackShellPlugin({
            onBuildExit:[`node ${ Path.join(rootDir, 'build/fix-umd-wrapper.js') } `]
        })
    ]
    
};

module.exports = webpackConfig;

