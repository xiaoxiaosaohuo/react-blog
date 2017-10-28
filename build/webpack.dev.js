const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('../config/config');

const ROOT_PATH = path.resolve(__dirname,'..');
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');
console.log(ROOT_PATH);
process.traceDeprecation = true
module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
            'babel-polyfill',
            path.resolve(ENTRY_PATH, 'index.js')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom','redux','react-router','react-redux','react-router-redux']
    },
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[hash:8].js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new CleanPlugin(['dist']),
        new ProgressBarPlugin(),

        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title: "苦瓜和尚的博客",
          template: path.resolve(ENTRY_PATH,'index.html'),
          hash: false,
          favicon: path.resolve(ROOT_PATH,'static/favicon.ico'),
          filename: `index.html`,
          inject: 'body',
          chunks: ['app','vendor','manifest'],
          minify: {
            collapseWhitespace: true
            },
          showErrors: true,
        }),

        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化

        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        }),
        new BundleAnalyzerPlugin()
    ],
    resolve: {
        modules: [ENTRY_PATH,"node_modules"],
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    },
    devtool: "source-map",
};
