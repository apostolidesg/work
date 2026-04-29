'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const project = require('../package.json');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
let env = require('../config/dev.env');
const { VueLoaderPlugin } = require('vue-loader');
env.APP_VERSION = '"' + project.version.toString() + '"';

const devServer = {
  client: {
    logging: 'warn',
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
  },
  historyApiFallback: {
    rewrites: true,
  },
  hot: true,
  static: {
    directory: path.join(__dirname, '../dist'),
    publicPath: config.dev.assetsPublicPath,
  },
  devMiddleware: {
    publicPath: '/',
  },
  compress: true,
  host: HOST || config.dev.host,
  port: PORT || config.dev.port,
  open: config.dev.autoOpenBrowser,
  watchFiles: {
    paths: ['*'],
    options: {
      poll: config.dev.poll,
    },
  },
};

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  devtool: config.dev.devtool,
  devServer: devServer,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.log(percentage, message, ...args);
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;

      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
