const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const webpack = require('webpack');
module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['mocha'],
    mochaReporter: {
      output: 'minimal',
      showDiff: false,
    },
    client: {
      captureConsole: false,
      mocha: {
        bail: true,
      },
    },
    files: [
      { pattern: '../../src/store/modules/types.js', watched: false },
      { pattern: '../../src/store/store.js', watched: false },
      { pattern: '../../test/unit/specs/*.spec.js', watched: false },
      { pattern: '../../test/unit/specs/**/*.spec.js', watched: false },
      { pattern: '../../src/assets/*.+(png|jpe?g|gif|svg|bmp|ico)', watched: false, included: false, server: true },
      { pattern: '../../src/**/*.+(png|jpe?g|gif|svg|bmp|ico)', watched: false, included: false, server: true },
    ],
    preprocessors: {
      '../../src/store/modules/types.js': ['webpack', 'sourcemap'],
      '../../src/store/store.js': ['webpack', 'sourcemap'],
      '../../test/unit/specs/*.spec.js': ['webpack', 'sourcemap'],
      '../../test/unit/specs/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.worker\.js$/,
            use: {
              loader: 'worker-loader',
              options: {
                inline: 'fallback',
              },
            },
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  importLoaders: 2,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg|bmp|ico)(\?.*)?$/,
            type: 'asset/source',
            generator: {
              emit: false,
            },
          },
          {
            resourceQuery: /^\[object Object\]$/,
            loader: 'null-loader',
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]',
            },
          },
          {
            test: /\.(txt|md|csv)$/i,
            type: 'assets/source',
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin((percentage, message) => {
          console.log(`${(percentage * 100).toFixed()}% ${message}`);
        }),
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
        new webpack.ContextReplacementPlugin(/vuetify/),
        new webpack.debug.ProfilingPlugin({
          outputPath: path.join(__dirname, 'webpack-stats.json'),
        }),
      ],
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, '../../src'),
          'vuetify/es5': false,
          vuetify: false,
          store: path.resolve(__dirname, '../../src/store'),
          types: path.resolve(__dirname, '../../src/store/modules/types.js'),
          test: path.resolve(__dirname),
          static: path.resolve(__dirname, '../../static'),
          assets: path.resolve(__dirname, '../../src/assets'),
        },
        fallback: {
          https: require.resolve('https-browserify'),
          http: require.resolve('stream-http'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer/'),
          util: require.resolve('util/'),
          vuetify: false,
          module: false,
          path: false,
          fs: false,
          crypto: false,
        },
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        modules: [
          path.resolve(__dirname, '../.'),
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../src/store'),
          path.resolve(__dirname, '../../src/store/modules'),
          'node_modules',
        ],
      },
    },
    beforeMiddleware: ['blockUrls'],
    plugins: [
      'karma-*',
      {
        'middleware:blockUrls': [
          'factory',
          function () {
            return function (req, res, next) {
              if (req.url === '/icon' || req.url === '/qr-code-url' || req.url.includes('PNG')) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end();
                return;
              }
              next();
            };
          },
        ],
      },
    ],
    logLevel: config.LOG_WARNINGS,
    browserConsoleLogOptions: {
      level: 'debug',
      format: '%b %T: %m',
      terminal: true,
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        warnings: false,
      },
    },
    basePath: path.resolve(__dirname, ''),
    proxies: {
      '': '',
    },
    externals: {
      vuetify: 'vuetify',
    },
    output: {
      publicPath: '/base/',
    },
    urlRoot: '/',
    coverageReporter: {
      type: 'html',
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
    },
  });
};
