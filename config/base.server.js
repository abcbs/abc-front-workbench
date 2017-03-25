import webpack from 'webpack';
import ip from 'ip';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import configure,{options,buildConfig,pathConfig} from './config.path';
////////////////////////////////////////////////
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpack_isomorphic_tools_configuration from './webpack-isomorphic-tools'
import autoprefixer from 'autoprefixer'
import css_custom_properties from 'postcss-custom-properties'
import postcss_calc from 'postcss-calc'


const webpack_isomorphic_tools_plugin = new WebpackIsomorphicToolsPlugin(webpack_isomorphic_tools_configuration);
//
const codePath="src";
const assertsPath="resource";
const root_folder = path.resolve(__dirname, '..', '..')
const frontend_root_folder = path.resolve(__dirname, '..')

const assets_source_folder = path.resolve(frontend_root_folder, assertsPath);

////////////////////////////////////////
const webpackDevServerAddress = `http://${ip.address()}:${options.port}`;
const reactHot = options.debug ? 'react-hot!' : '';
const cssSourceMap = options.debug ? '?sourceMap' : '';

const entryFile = configure.entryFile;

const nodeModulesPath=configure.nodeModulesPath;

const rectVendor=path.join(buildConfig.dllReferencePath,"reactvendor-manifest.json");
const baseframevendor=path.join(buildConfig.dllReferencePath,"baseframevendor-manifest.json");
const reduxvendor=path.join(buildConfig.dllReferencePath,"reduxvendor-manifest.json");
const bootvendor=path.join(buildConfig.dllReferencePath,"bootvendor-manifest.json");
const materialuivendor=path.join(buildConfig.dllReferencePath,"materialuivendor-manifest.json");
const envdevlop=path.join(buildConfig.dllReferencePath,"envdevlop-manifest.json");

var bootstrapLess = new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]");

var extractCSS = new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]");
var cssLoader = //extractCSS.extract("style-loader","css-loader");
extractCSS.extract('style', `css${cssSourceMap}`)

var lessLoader = //bootstrapLess.extract("style-loader","css-loader","less-loader");
    extractCSS.extract('style', `css${cssSourceMap}!less${cssSourceMap}`);

var sassLoader = extractCSS.extract('style', `css${cssSourceMap}!sass${cssSourceMap}`)

const baseServer = {
  //resolve all relative paths from the project root folder
  context: frontend_root_folder,
  devtool: !options.debug ? 'source-map' : null,
  dependencies: ["reactvendor","baseframevendor","reduxvendor",
      "bootvendor","materialuivendor","envdevlop"],
  entry: {
    app: entryFile
  },
  output: {
    filename: '[name].js',
    //打包文件存放的绝对路径,html.js,css会在这个路径下
    path: buildConfig.buildPath,

    chunkFilename: '[name].[hash].js',
    //设置为webpack-dev-server服务器下资源目录的绝对路径
    //网站运行时的访问路径
    //如果不设置的话，打包出的html中默认路径会是相对路径
    publicPath: !options.debug ? `${webpackDevServerAddress}${buildConfig.publicPath}`
        : buildConfig.publicPath
  },

    resolve: {
        extensions: ['', '.js', '.jsx','.less','.css','scss','.json']
   },
  module: {

    loaders: [
        {
            test: /\.css/,
            //loader: 'style-loader!css-loader'
            loader:cssLoader
        },
        { test: /\.less$/,
            //loader: 'style!css!less'
            loader:lessLoader
        },
        {
            test: /\.scss$/,
            //loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
            loader:sassLoader
        },
        { test: /\.json$/,
            loader: 'json-loader'
        },
        { test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
            //loader: 'file?name=[name].[ext]'
            loader: 'url-loader?limit=8192&name=images/[name]_[hash].[ext]' // 图片提取到images目录
        },
        // { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]'
        // },

        { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
        // {
        //     test    : webpack_isomorphic_tools_plugin.regular_expression('fonts'),
        //     include : assets_source_folder,
        //     loaders :
        //         [
        //             'url-loader?limit=10240' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
        //         ]
        // },
        // {
        //     test    : webpack_isomorphic_tools_plugin.regular_expression('images'),
        //     include : assets_source_folder,
        //     loaders :
        //         [
        //             'url-loader?limit=10240' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
        //         ]
        // },
        // { test:  webpack_isomorphic_tools_plugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ],
  },

  // postcss: () => [autoprefixer({ browsers: 'last 2 version' })],

  plugins: [
      // new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require(rectVendor)
      // }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(baseframevendor)
    }),
     new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require(reduxvendor)
      }),
      //生成环境需要开启
      // new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require(bootvendor)
      // }),

      // new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require(materialuivendor)
      // }),
      extractCSS,
      // bootstrapLess,

      webpack_isomorphic_tools_plugin,
  ]
};

if(options.debug===false){
    baseServer.module.loaders = (baseServer.module.loaders || []).concat([
        {
          // React-hot loader and
          test: /\.js$/, // All .js files
          loaders: ['react-hot', 'babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7

           exclude: [nodeModulesPath],
           include :
          [
                    path.resolve(frontend_root_folder, codePath)
          ],
        },
        {
            // React-hot loader and
            test: /\.jsx$/, // All .js files
            loaders: ['react-hot', 'babel-loader'], //babel loads jsx and es6-7

            exclude: [nodeModulesPath],
            include :
                [
                    path.resolve(frontend_root_folder, codePath)
                ],
        },
    ])
}else{
    baseServer.module.loaders = (baseServer.module.loaders || []).concat([
        {
            // React-hot loader and
            test: /\.js$/, // All .js files
            loaders: [ 'babel-loader'], //babel loads jsx and es6-7

            exclude: [nodeModulesPath],
            include :
                [
                    path.resolve(frontend_root_folder, codePath)
                ],
        },
        {
            // React-hot loader and
            test: /\.jsx$/, // All .js files
            loaders: [ 'babel-loader'], //babel loads jsx and es6-7

            exclude: [nodeModulesPath],
            include :
                [
                    path.resolve(frontend_root_folder, codePath)
                ],
        },
    ])
}
//debug默认为false，命名行设置之后，则表示压缩，和生产环境
if (process.env.NODE_ENV === 'production'||options.debug===true) {
  // baseServer.devtool = 'source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  baseServer.plugins = (baseServer.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    }),

   new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      //sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
      mangle: true
    }),
    //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin(),
  ])
}else{
   baseServer.plugins = (baseServer.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.NoErrorsPlugin(),
   ])
}

export default baseServer;
