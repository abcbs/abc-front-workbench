import configure ,{options} from  './config/config.path';
import path from 'path';
import webpack from 'webpack';
//var configure  =require ( './config/config.path');
configure.entryFile='./src/abc-framework/endpoint/ApplicationIndex'
//configure.entryFile='./src/material-ui/app';
var baseServer = require('./config/webpack.config.server');
// config.entry={
//     app:"./src/todos/index"
// }

const server= {
    ...baseServer,
    externals: [
        {
        jquery: path.resolve(__dirname,"/external/jquery/jquery.min"),
        }

    ],
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, "/external/jquery/jquery.min"),
        }
    },
    // 当require的模块找不到时，尝试添加这些后缀后进行寻找
    extentions: ['', 'js'],
};

const evn = ['webpack-hot-middleware','redux-devtools','react-hot-loader'];

const home=baseServer.devEntryBundle.concat("./src/enteries/home.js");
const introduct=baseServer.devEntryBundle.concat("./src/enteries/introduct.js");
const manager=baseServer.devEntryBundle.concat("./src/enteries/manager.js");
server.entry = Object.assign(
    baseServer.default.entry,{
        // home:!options.debug ? "./src/enteries/home.js" : home,
        // introduct:!options.debug ? "./src/enteries/introduct.js" : introduct,
        // manager:!options.debug ? "./src/enteries/manager.js" : manager,
        home: "./src/enteries/home.js" ,
        introduct: "./src/enteries/introduct.js" ,
        manager :"./src/enteries/manager.js",
        evn:evn,
 });


server.plugins = (baseServer.default.plugins || []).concat([
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin('evn'),

]);

module.exports = server;
