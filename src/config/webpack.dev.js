var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var nodeExternals = require('webpack-node-externals');

module.exports = webpackMerge(commonConfig, {



  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': './src/main.ts',
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts'
  },
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    // See: https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
    // Enables support for history API fallback, which means that a request will fallback to /index.html if no resource can be found.
    historyApiFallback: true,
    stats: 'minimal'
  }
});

