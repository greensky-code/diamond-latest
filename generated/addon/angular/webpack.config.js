/*
 * The main configuration file for webpack.
 * This file is a javascript node module file.
 *
 * This file refers to other configuration files in order to support
 * environment specific deployments, i.e. a different configuration for
 * local development vs a test environment or a production environment, etc.
 *
 * See also:
 *   https://angular.io/guide/webpack
 *   https://github.com/webpack-contrib/awesome-webpack
 *
 */
module.exports = require('./config/webpack.dev.js');
