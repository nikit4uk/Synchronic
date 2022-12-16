const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/script.js',
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: `./js/${filename('js')}`,
        publicPath: ""
    },
    devServer: {
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname, 'app'),
        open: true,
        hot: true,
        compress: true,
        static: {
            directory: path.resolve(__dirname, 'app')
        },
        port: 3000,
    },
    plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        manify: {
            collapseWhitespace: isProd
        }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: `./style/${filename('css')}`
    }),
  ],
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + "/";
                        }
                    },
                },
                "css-loader"],
        },
        {
            test: /\.(?:|png|svg)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: `./img/${filename('[ext]')}`
                }
            }],
        },
    ],
  },
};