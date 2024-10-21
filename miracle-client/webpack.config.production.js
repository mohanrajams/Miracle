var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../Miracle.Service/Miracle.Service.WebApi/Client.Output.Build'),
    filename: 'bundle.js',
    publicPath: '/Client.Output.Build/'
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
      cleanAfterEveryBuildPatterns: ['../Miracle.Service/Miracle.Service.WebApi/Client.Output.Build']
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