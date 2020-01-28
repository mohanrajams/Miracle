var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true,
    port: 3000,
    stats: "errors-only",
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
    host: '192.168.16.246'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jpe?g|gif|ttf)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          }
        },
      ],
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    }),
    new copyWebpackPlugin([
      { from: 'public' }
    ]),
    new htmlWebpackPlugin({
      hash: true,
      template: './public/index.html',
      filename: './index.html' //relative to root of the application
    }),
    new htmlReplaceWebpackPlugin([
      {
        pattern: '%PUBLIC_URL%',
        replacement: ''
      }])
  ]
};