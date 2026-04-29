'use strict';
// This is the webpack config used for unit tests.
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const testEnv = require('../config/test.env');
const project = require('../package.json');
const { VueLoaderPlugin } = require('vue-loader');

testEnv.APP_VERSION = '"' + project.version.toString() + '"';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function loadRules() {
  let c = utils.styleLoaders();
  c.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
  });

  return c;
}

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: [
      ...loadRules(),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'test'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('"testing"'),
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'karma-bamboo-reporter': require('karma-bamboo-reporter'),
    }),
  ],
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
