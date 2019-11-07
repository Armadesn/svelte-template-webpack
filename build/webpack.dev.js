const path              = require('path')
const merge             = require('webpack-merge')
const common            = require('./webpack.common.js')
const webpack           = require('webpack')
const HtmlWebpakcPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    output:{
        filename:'main.js',
        chunkFilename:'[name].chunk.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'/'
    },
    devServer:{
        historyApiFallback:true,
        port:'8888',
        proxy:{
            '/api': {
                target:'http://www.baidu.com',
                changeOrigin:true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less/,
                use:['style.loader','css-loader','less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: "file-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpakcPlugin({
            template:'./public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env':'development'
        })
    ]
})