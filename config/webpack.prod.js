const webpack = require("webpack"),
  webpackMerge = require("webpack-merge"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WorkboxPlugin = require("workbox-webpack-plugin"),
  commonConfig = require("./webpack.common.js"),
  helpers = require("./helpers"),
  ENV = process.env.NODE_ENV = process.env.ENV = "production",
  APP_URL = process.env.APP_URL = "https://b.luntly.com/",
  METADATA = webpackMerge(commonConfig.metadata, {
    APP_URL: APP_URL,
    ENV: ENV
  }),
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = webpackMerge(commonConfig, {
  // devtool: "source-map",
  output: {
    path: helpers.root("dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      },
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new ExtractTextPlugin("[name].[hash].css"),
    new webpack.DefinePlugin({
      "ENV": JSON.stringify(METADATA.ENV),
      "APP_URL": JSON.stringify(METADATA.APP_URL),
      "process.env": {
        "ENV": JSON.stringify(METADATA.ENV),
        "NODE_ENV": JSON.stringify(METADATA.ENV),
        "APP_URL" : JSON.stringify(METADATA.APP_URL)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: "127.0.0.1",
      analyzerPort: 8989,
    }),
    new WorkboxPlugin({
      globDirectory: "dist",
      globPatterns: [
        "**/*.{css,html,js,eot,png,svg,ttf,woff2,woff,ico,png}"
      ],
      swSrc: helpers.root("src/assets/js/sw-base.js"),
      swDest: helpers.root("dist/sw.js")
    })
  ]
});

