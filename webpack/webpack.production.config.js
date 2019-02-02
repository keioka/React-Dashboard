const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const Critters = require('critters-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// console.log(UglifyJSPlugin);

// const uglify = new UglifyJSPlugin({
//   sourceMap: true,
//   uglifyOptions: {
//     compress: {
//       inline: false,
//     },
//   },
// });
const { SERVICE_WORKER_FILENAME } = require('../config');
const csp = require('csp-header');

const core = ['react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'redux-saga'];
const cspContent = csp({
  policies: {
    'style-src-elem': [
      csp.SELF,
      csp.INLINE,
      csp.EVAL,
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
    ],
    'script-src': [
      csp.SELF,
      csp.INLINE,
      csp.EVAL,
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
    ],
    'style-src': [
      csp.SELF,
      csp.INLINE,
      csp.EVAL,
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      csp.SELF,
      'data:',
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      csp.SELF,
      'data: ',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
    ],
  },
  // 'report-uri': 'https://cspreport.com/send'
});
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    core,
    root: path.join(__dirname, '../app/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name]-[hash].min.js',
    chunkFilename: '[name]-[hash].min.js',
    publicPath: '/',
  },
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      // uglify,
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      cacheGroups: {
        core: {
          test: 'core',
          chunks: 'initial',
          name: 'core',
          priority: 10,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, '../app/utils/'),
      '@components': path.resolve(__dirname, '../app/components/'),
      '@containers': path.resolve(__dirname, '../app/containers/'),
      '@redux': path.resolve(__dirname, '../app/redux/'),
      '%': path.resolve(__dirname, '../app/styles/index.scss'),
    },
    extensions: ['.jsx', '.js', '.json', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist/'), { root: path.resolve(__dirname, '../') }),
    new Dotenv({
      silent: true, // hide any errors on production
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      filename: 'index.html',
      template: 'app/assets/index.tpl.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          content: cspContent,
        },
      },
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].min.css',
      allChunks: true,
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'front-end',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: SERVICE_WORKER_FILENAME,
      minify: true,
      staticFileGlobs: ['dist/*'],
      stripPrefix: 'dist',
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest.\.*\.json$/],
    }),
    // new Critters({
    //   // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
    //   preload: 'swap',

    //   // Don't inline critical font-face rules, but preload the font URLs:
    //   preloadFonts: true,
    // }),

    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100',
      },
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer',
    // }),
    new WebpackPwaManifest({
      name: 'front-end',
      short_name: 'FS',
      description: 'front-end',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            // Could also be write as follow:
            // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
            use: [
              {
                loader: 'css-loader',
                options: {
                  // If you are having trouble with urls not resolving add this setting.
                  // See https://github.com/webpack-contrib/css-loader#url
                  url: true,
                  minimize: true,
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[name]--[local]--[hash:base64:5]',
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
              // {
              //   loader: 'postcss-loader',
              //   options: {
              //     plugins() {
              //       return [require('autoprefixer')];
              //     },
              //   },
              // },
            ],
          }),
        ),
      },
      {
        test: /\.(woff|woff2|eot|ttf)/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-react-loader',
        },
      },
    ],
  },
};
