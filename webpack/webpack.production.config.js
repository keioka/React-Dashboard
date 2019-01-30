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
const { SERVICE_WORKER_FILENAME } = require('./config');

const vendors = ['react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'redux-saga'];

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    core: vendors,
    main: path.join(__dirname, 'app/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name]-[hash].min.js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    splitChunks: {
      cacheGroups: {
        core: {
          test: 'core',
          chunks: 'initial',
          name: 'core',
          priority: 10,
          enforce: true,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv({
      silent: true, // hide any errors on production
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      minify: true,
      serviceWorker: `/${SERVICE_WORKER_FILENAME}`,
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new StatsPlugin('../webpack/webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new CleanWebpackPlugin('dist'),
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
    new Critters({
      // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
      preload: 'swap',

      // Don't inline critical font-face rules, but preload the font URLs:
      preloadFonts: true,
    }),

    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100',
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new WebpackPwaManifest({
      name: 'front-end',
      short_name: 'FS',
      description: 'front-end',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    }),
  ],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'app/utilities/'),
      '@components': path.resolve(__dirname, 'app/components/'),
      '@containers': path.resolve(__dirname, 'app/containers/'),
      '@actions': path.resolve(__dirname, 'app/actions/'),
    },
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.json?$/,
        use: 'json-loader',
      },
      {
        test: /\.scss$/,
        // we extract the styles into their own .css file instead of having
        // them inside the js.
        use: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          'sass-loader',
        ),
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file',
      },
    ],
  },
};
