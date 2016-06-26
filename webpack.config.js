const webpack = require('webpack');
const path = require('path');

var isProd = (process.env.NODE_ENV === 'production');
console.log('prod', isProd)
// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.

  // Conditionally add plugins for Production builds.
  //if (isProd) {
  //  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  //  plugins.push(new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify('production') } }) );
  //}

  // Conditionally add plugins for Development
  //else {
  //  // ...
  //}

  return plugins;
}

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    {
      // JSX REACT transpiler
      test: /\.js$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'test')
      ],
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
  },
  plugins: getPlugins()
}
