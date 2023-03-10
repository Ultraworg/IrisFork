const isDev = process.env.NODE_ENV !== 'production';
const isDevServer = process.env.WEBPACK_DEV_SERVER;
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
let version = fs.readFileSync("IRIS_VERSION", "utf8");
version = version.replace(/\r?\n?/g, '').trim();
const build = Math.floor(Date.now() / 1000);

const config = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname),
  entry: ['@babel/polyfill', './src/js/index'],
  output: {
    path: path.resolve(__dirname, 'mopidy_iris/static'),
    filename: `app${isDev ? '' : '.min'}.js`,
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        exclude: [
          /node_modules/,
        ],
        use: [
          'expose-loader?jQuery!expose?$',
        ],
      },
      {
        test: /.(jsx|js|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: {
          loader: 'yaml-loader',
          options: { json: true, type: 'json' }
        }
      },
      {
        // load external resources (ie Google fonts)
        test: /.(gif|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      (isDev ? {} : {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'webpack-strip',
            options: {
              strip: [
                'console.log',
                'console.info',
                'debug',
              ],
            },
          },
        ],
      }),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: `app${isDev ? '' : '.min'}.css`,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      templateParameters: {
        isDevServer: isDevServer ? 1 : 0,
        baseHref: isDevServer ? '/' : '/iris/',
        version: `${version}-${isDevServer ? 'DEV_SERVER' : ''}`,
        build,
      },
    }),
  ],
  watchOptions: {
    poll: true,
  },
  devtool: (isDev ? 'source-map' : false),
  devServer: {
    historyApiFallback: true,
    port: 6681,
    client: {
      overlay: true,
    },
    static: [
      {
        directory: path.join(__dirname, 'mopidy_iris', 'static', 'assets'),
        publicPath: '/assets/',
      },
    ],
  },
};

// now export our collated config object
module.exports = config;
