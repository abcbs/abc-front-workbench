var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var options= require('./abc-args').options;
var path = require('path');
var webpack_isomorphic_tools_configuration =require(options.iso_config||'../../../config/webpack-isomorphic-tools');
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// global.log = log
var rootDir = path.resolve(__dirname, options.iso_rootDir||'../../../');
var srcRoot = path.join(rootDir, 'src/todos/');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpack_isomorphic_tools_configuration);
webpackIsomorphicTools.options=Object.assign(webpackIsomorphicTools.options,
    {webpack_assets_file_path:rootDir+'/webpack-assets.json'});
webpackIsomorphicTools.server(srcRoot, function() {
    require('./service');
})

