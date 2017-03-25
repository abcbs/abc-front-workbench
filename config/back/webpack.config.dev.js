var path = require('path')
var webpack = require('webpack');

const buildPath = path.resolve(__dirname, './build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const publicPath =  "/build/";
const contentBase = path.resolve(__dirname, '');

module.exports = {
  dependencies: ["vendors"],
  entry: {
    app:path.join(__dirname, 'src'),

  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: publicPath

  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //这个使用uglifyJs压缩你的js代码
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dist/manifest.json")
    }),
    //new webpack.optimize.CommonsChunkPlugin('hots', 'hots.js'),
    /**
     new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
      mangle: true
    })**/
  ],
  module: {
    loaders: [
      {
        test:/\.js?$/,
        exclude:/node_modules/,
        loader:'babel',
        query:{
          presets:['react','es2015']
        }
      }
    ]
  }

}

