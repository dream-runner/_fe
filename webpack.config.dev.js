var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');
var webpack = require('webpack')

module.exports = {
    entry:{
        index:'./src/main.1.js'
    },
    output:{
        filename:'[name].[hash].js',
        path:Path.resolve(__dirname,'dist')
    },
    devServer:{
        contentBase:'./dist',
        historyApiFallback:true
    },
    module:{
        loaders:[{
            test: /\.js$/,
            loaders: [ 'babel-loader' ],
            exclude: /node_modules/,
            include: __dirname
        }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProvidePlugin({
            '$':'jquery'
        })
    ],
    resolve:{
        alias:{
            'singleton':'./src/singleton',
            // '@signavio':'./src/fillthehole'
            ''
        }
    }
}