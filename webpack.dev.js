const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: ['@babel/polyfill', './client/index.js']
  },
  output: {
      path: `${__dirname}/client/dist`,
      filename: "[name]-bundle.js",
  },
  devServer: { contentBase: './client/components' },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react' ],
              plugins: [ '@babel/transform-runtime' ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: { name: '[name].css' }
          // },
          // { loader: 'extract-loader'},
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: { name: '[name].html' }
          // },
          // {
          //   loader: 'extract-loader'
          // },
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src'
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'images/[name]-[hash].[ext]'}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({ template: './src/index.html'})
  ]
}
