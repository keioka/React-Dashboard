const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const swCachePlugin = require('sw-cache-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const PLUGIN_NAME = 'webpack-plugin';
const weblog = require('webpack-log');

const log = weblog({ name: PLUGIN_NAME });
const csp = require('csp-header');

const cspContent = csp({
  policies: {
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
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      'data: blob:',
      csp.SELF,
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
    ],
  },
  // 'report-uri': 'https://cspreport.com/send'
});

// const merge = require('webpack-merge');
// const common = require('./webpack.common.js');

// module.exports = merge(common, {
//   mode: 'production',
// });

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    main: path.join(__dirname, '../app/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: 'body',
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
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [/\.map/],
      as: (entry) => {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.ttf$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ExtractTextPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      // chunkFilename: '[id].css',
      allChunks: true,
    }),
    new WebpackPwaManifest({
      name: 'front-end',
      short_name: 'FS',
      description: 'front-end',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    }),
    // new WorkboxPlugin.GenerateSW(),
  ],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, '../app/utils/'),
      '@components': path.resolve(__dirname, '../app/components/'),
      '@containers': path.resolve(__dirname, '../app/containers/'),
      '@redux': path.resolve(__dirname, '../app/redux/'),
      '%': path.resolve(__dirname, '../app/styles/index.scss'),
    },
    extensions: ['.jsx', '.js'],
  },
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
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    // useLocalIp: true,
    // compress: true,
    // port: 9000,
    historyApiFallback: true,
    hot: true,
  },
};
