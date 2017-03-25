import webpack from 'webpack';
import ip from 'ip';
import baseServer from './base.server';
import configure,{options,buildConfig,} from './config.path';

const webpackDevServerAddress = `http://${ip.address()}:${options.port}`;

//具体应用的配置
//configure.entryFile='./src/todomvc/index';
if (options.debug) {
  baseServer.plugins.push(new webpack.NoErrorsPlugin());
}

var entryFile = configure.entryFile;

export const devEntryBundle = [
  'webpack/hot/dev-server',
  `webpack-dev-server/client?${webpackDevServerAddress}`,
 // 'bootstrap-sass!./src/abc-proxy/theme/bootstrap.config.prod.js',
  //'font-awesome-webpack!./src/abc-proxy/theme/font-awesome.config.prod.js',

  // entryFile,
];

// const app=devEntryBundle.concat(entryFile);
const app =(process.env.NODE_ENV === 'production')?entryFile:devEntryBundle.concat(entryFile);

const server= {
  ...baseServer,
  entry:{
     //app:app
    app:entryFile
  },
  devServer:{
    //这里contentBase是访问路径，如果html文件和css img等文件打包后都在这个路径下是没有问题，否则会找不到文件的。
    //不配置这个默认路径的话，在浏览器地址栏中访问一个页面，路径是要从根目录下开始的，本项目是使用express建立，
    // 打包后的html页面放在/public/dist/html下，因此地址栏中访问路径是这样：
    //如果配置了contentBase，就可以把url中的/public/dist/html省去了。
    contentBase: buildConfig.contentBase,
    historyApiFallback:true,
    hot:true,
    inline:true,
    port: options.port, // Port Number
    progress:true,
    host:options.host,
    //是否启用gzip压缩
    compress:true,

  },
};
export default server;


