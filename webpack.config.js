var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: ['./index.js'],
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')},
            {test: /\.svg$/, loader: 'file'}
        ]
    }, 
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
}