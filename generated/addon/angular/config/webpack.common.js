/**
 * Webpack configuration that is commont across deployment environments, such as
 * dev, test, and production environments.
 *
 * The environment specific webpack configuration files merge their content with
 * the common configuration defined here using the Webpack Merge plugin.
 *
 * See also: https://angular.io/guide/webpack#common-configuration
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  // Defines the entiry-point files that define the bundles.
  entry: {
    // The polyfills needed to run Angular applications in most modern browsers.
    'polyfills': './src/polyfills.ts',
    // The third-party dependencies such as Angular, lodash, and boostrap.css
    'vendor': './src/vendor.ts',
    // The application code
    'app': './src/main.ts'
  },
  // How to resolve file names that do not have extentions in import statements
  resolve: {
    extensions: ['.ts', '.js']
  },
  // "module" is an object with "rules" for deciding how files are loaded.
  module: {
    // Rules tell Webpack which loaders to use for each file or module
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          },
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // Handle application-wide styles
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      // Handle component-scoped styles
      // i.e. styles specifeid in a component's styleUrls metadata property
      // filters for component-scoped styles and loads them as strings via
      // the raw-loader, which is what Angular expects to do with
      // styles specified in a styleUrls metadata property.
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },
  // Create insances of Webpack plugins.
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

