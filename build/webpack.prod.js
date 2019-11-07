const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const TerserWebpackPlugin  = require("terser-webpack-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano')


module.exports = merge( common, {
    mode:'production',
    devtool:'cheap-module-source-map',
    output:{
        filename:'javascript/[name].[chunkhash:5].js',
        chunkFilename:'javascript/[name].[chunkhash:5].chunk.js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit: 1024 * 8,
                        name:'img/[name].[hash:8].[ext]',
                        outputPath:'images/'
                    }
                }
            }
        ],  
    },
    optimization: {
        runtimeChunk: "single",
        minimizer: [
            new TerserWebpackPlugin({
                sourceMap: true
            }),
        ],
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 80 * 1024,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: function (module, chunks, chacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `vendor_${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].[chunkhash:5].css',
            chunkFilename:'[name].[chunkhash:5].chunck.css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env':'production'
        }),
        new optimizeCss({
            cssProcessor: cssnano, //引入cssnano配置压缩选项
            cssProcessorOptions: { 
            	discardComments: { removeAll: true } 
            },
            canPrint: true //是否将插件信息打印到控制台
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: path.resolve(__dirname, '../dist/index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ]
})