const webpackMerge = require('webpack-merge'),
  // The CSS styles are buried inside the Javascript bundles by default.
  // The ExtractTextPlugin extracts them into external .css files that the
  // HtmlWebpackPlugin inscribes as <link> tags into the index.html.
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  commonConfig = require('./webpack.common.js'),
  helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
