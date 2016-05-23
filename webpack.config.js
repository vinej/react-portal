const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    {
        // JSX REACT transpiler
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
    },
    {
        // SASS transpiler
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    },
    // file loaders
    {test: /.eot(\?v=\d+.\d+.\d+)?$/, loader: "file"},
    {test: /.(woff|woff2)$/, loader: "file-loader?prefix=font/&limit=5000"},
    {test: /.ttf(\?v=\d+.\d+.\d+)?$/, loader: "file-loader?limit=10000&mimetype=application/octet-stream"},
    {test: /.svg(\?v=\d+.\d+.\d+)?$/, loader: "file-loader?limit=10000&mimetype=image/svg+xml"},
    {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
    {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
   ]
  }
}
