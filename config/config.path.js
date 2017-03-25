import path from 'path';
import yargs from 'yargs';
import 'babel-polyfill';

//工程路径配置常量
export const pathConfig = {
    buildPath: path.resolve(__dirname, '../dist'),
    buildLibPath: path.resolve(__dirname,  '../dist','[name]-manifest.json'),
    publicPath:  "/build/",
    contentBase:path.join(__dirname, ''),
    nodeModulesPath : path.resolve(__dirname, '../node_modules')

};
//项目App,在服务方式启动，buildPath是绝对路径
export const buildConfig={
    buildPath : 'build',
    nodeModulesPath : 'node_modules',
    publicPath :  "/build/",
    contentBase : "",
    dllReferencePath:path.resolve(__dirname, '../dist')
};

export const jsLoader = 'babel?cacheDirectory';

export var entryFile='./src/abc-framework/endpoint/ApplicationIndex';
// ['bootstrap-sass!./src/abc-proxy/theme/bootstrap.config.prod.js',
//    'font-awesome-webpack!./src/abc-proxy/theme/font-awesome.config.prod.js',
 //   './src/app.js'];
export const options = yargs
    .alias('p', 'optimize-minimize')
    .alias('d', 'debug')
    .default('host', '192.168.1.106')
    .default('port', '3000')
    .default('apiHost', '192.168.1.106')
    .default('apiPort', '3030')
    .default('debug', false)
    .default('__DEVTOOLS__', false)

    .argv;

export  default pathConfig;