'use strict'

var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: __dirname + '/src/index.js',
    //entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/dist/',
        //libraryTarget: "umd",  //一般都会选择umd
        filename: 'okay-painter.min.js'
    },
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    }
}