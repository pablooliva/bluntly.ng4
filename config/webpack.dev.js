const webpack = require("webpack"),
  webpackMerge = require("webpack-merge"),
  // The CSS styles are buried inside the Javascript bundles by default.
  // The ExtractTextPlugin extracts them into external .css files that the
  // HtmlWebpackPlugin inscribes as <link> tags into the index.html.
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  commonConfig = require("./webpack.common.js"),
  helpers = require("./helpers"),
  ENV = process.env.NODE_ENV = process.env.ENV = "development",
  APP_URL = process.env.APP_URL = "http://localhost:8080/",
  METADATA = webpackMerge(commonConfig.metadata, {
    APP_URL: APP_URL,
    ENV: ENV
  });

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",
  output: {
    path: helpers.root("dist"),
    publicPath: "http://localhost:8080/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "ENV": JSON.stringify(METADATA.ENV),
      "APP_URL": JSON.stringify(METADATA.APP_URL),
      "process.env": {
        "ENV": JSON.stringify(METADATA.ENV),
        "NODE_ENV": JSON.stringify(METADATA.ENV),
        "APP_URL" : JSON.stringify(METADATA.APP_URL)
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    stats: "minimal"
  }
});
