// React Hot Loader
const webpack = require('webpack');
const path = require('path');
const cssLoader = 'style!css-loader?modules&importLoaders=1&'
  + 'localIdentName=[name]__[local]___[hash:base64:5]';


// Railsにビルドしたjsを乗せるためのプラグイン
const ManifestPlugin = require('webpack-manifest-plugin');

// 本番のjsビルド前にdist内部を全部クリーンするためのプラグイン
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Environment settings
 */
const devtool    = '#eval';
// const fileName   = DEBUG ? '[name]' : '[name]-[hash]';
// 本番ビルドの時はassets pipelineに乗せるためerbの拡張子くっつける
const filename   = '[name].js';
const publicPath = '/assets/';

const plugins = [
  // Webpack 1.0
  new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

plugins.push(new ManifestPlugin({ fileName: 'webpack-manifest.json' }));
plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
plugins.push(new CleanWebpackPlugin(['assets'], {
  root: `${__dirname}/../public`,
  verbose: true,
  dry: false
}));

plugins.push(
  /* DefinePluginの実行 */
  new webpack.DefinePlugin({
    // process.env.NODE_ENVを'production'に置き換える
    'process.env.NODE_ENV': JSON.stringify('production')
  })
);

const entrySources = [
  // babel-polyfillのimport用
  'babel-polyfill',
  // 'webpack-hot-middleware/client',
  './react/main.jsx',
  './stylesheet/reset.css',
  './stylesheet/colors.css',
];

module.exports = {
  devtool,
  resolve: {
    // import/requireをするときに拡張子を省略できるようにする
    extensions: ['', '.js', '.jsx'],
  },
  entry: entrySources,
  output: {
    path: '../public/assets',
    // path: `${__dirname}/../app/assets/javascripts`,
    publicPath,
    filename
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\.css$/,
        loader: cssLoader,
      },
    ],
  }
};
