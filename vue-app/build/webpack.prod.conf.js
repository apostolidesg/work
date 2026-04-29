'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const project = require('../package.json');
const { VueLoaderPlugin } = require('vue-loader');

let env;

if (process.env.CONFIG_ENV === 'development') env = require('../config/prod.dev.env');
else if (process.env.CONFIG_ENV === 'test') env = require('../config/test.env');
else env = require('../config/prod.env');

console.log('Creating build for v' + project.version.toString());
env.APP_VERSION = '"' + project.version.toString() + '"';

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  devtool: config.build.productionSourceMap ? 'source-map' : false,
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          map: config.build.productionSourceMap
            ? {
                inline: false,
                annotation: true,
              }
            : false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          name: 'vendor',
          test: (module) => {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            );
          },
          chunks: 'initial',
        },
        async: {
          name: 'vendor-async',
          chunks: 'async',
          minChunks: 3,
          enforce: true,
        },
        commons: {
          name: 'app',
          minChunks: 3,
          priority: -20,
        },
      },
    },
    minimize: true,
    moduleIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
          },
        },
        parallel: true,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'auto',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
        },
      ],
    }),
  ],
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
