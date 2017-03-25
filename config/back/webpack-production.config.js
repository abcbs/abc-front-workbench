var path = require('path')
var webpack = require('webpack')
const buildPath = path.resolve(__dirname, './build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const publicPath =  "/build/";
const contentBase = path.resolve(__dirname, '');



module.exports = {
  //devtool: 'eval-source-map',
  devServer:{
    //这里contentBase是访问路径，如果html文件和css img等文件打包后都在这个路径下是没有问题，否则会找不到文件的。
    //不配置这个默认路径的话，在浏览器地址栏中访问一个页面，路径是要从根目录下开始的，本项目是使用express建立，
    // 打包后的html页面放在/public/dist/html下，因此地址栏中访问路径是这样：
    //如果配置了contentBase，就可以把url中的/public/dist/html省去了。
    contentBase: contentBase,
    historyApiFallback:true,
    hot:false,
    inline:false,
    port: 3000, // Port Number
    progress:true,
    host: '192.168.1.102', // Change to '0.0.0.0' for external facing server
    //publicPath: publicPath,
    //path: buildPath
  },
  dependencies: ["vendors"],
  /**entry: [
   'webpack/hot/dev-server',
   'webpack/hot/only-dev-server',
   path.join(__dirname, './src/index'),
   ],
   **/
  entry: {
    app: './src/index',

    /**
     editor: [
     './src/editor',
     'webpack/hot/only-dev-server'
     ],
     //资源服务器地址
     client: 'webpack-dev-server/client?http://localhost:3000'
     **/
  },
  output: {
    //打包文件存放的绝对路径,html.js,css会在这个路径下
    path: buildPath,
    filename: '[name].js',
    //设置为webpack-dev-server服务器下资源目录的绝对路径
    //网站运行时的访问路径
    //如果不设置的话，打包出的html中默认路径会是相对路径
    publicPath: publicPath,

  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dist/manifest.json")
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.NoErrorsPlugin(),

    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('evn', 'evn.js'),
  ],
  module: {
    loaders: [
      //{ test: /\.js?$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      {
        test: /\.js$/,
        loader: 'babel',
        //loaders: ['react-hot', 'babel-loader'],
        //  loaders: ['react-hot', 'babel'],
        //query: {
        //"presets": ["react", "es2015", "stage-1", "react-hmre"]
        //},
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ],
        exclude: /node_modules/,
        include: __dirname
      }, {
        test: /\.css?$/,
        loader: 'style!css' // This are the loaders
      }

    ]
  }
}


