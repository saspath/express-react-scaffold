const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const buildConfig = require("./config/build.json");

module.exports = (env, argv) => {

    const mode = (argv && argv.mode) || (env && env.NODE_ENV) || 'development';
    const isDevelopment = mode === 'development';
    const devtool = isDevelopment ? 'source-map' : undefined;
    const filename = isDevelopment ? '[name].js' : '[name].[hash].js';
    const publicPath = isDevelopment ? '' : buildConfig.cdnRoot || '';

    console.log('webpack mode === ' + mode);

    return {
        mode,
        entry: { index: ['@babel/polyfill', './client/index.js'] },
        output: {
            path: `${__dirname}/client/dist`,
            filename,
            publicPath: '/'
        },
        devServer: {
          overlay: true
        },
        devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new HtmlWebpackPlugin({
            template: 'public/index.html',
            publicPath
          })
        ],
        optimization: {
            minimizer: [new UglifyJsPlugin({ include: /\.js$/ })]
        }
    }
}
