const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  helpers = require("./helpers");

module.exports = {
  entry: {
    "polyfills": "./src/polyfills.ts",
    "vendor": "./src/vendor.ts",
    "app": "./src/main.ts"
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: helpers.root("src", "tsconfig.json")
            }
          },
          "angular2-template-loader"
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          "html-loader"
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        use: [
          "file-loader?name=assets/[name].[hash].[ext]"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          "file-loader?name=assets/[name].[hash].[ext]",
          // options > https://github.com/imagemin
          "img-loader"
        ]
      },
      {
        // matches application-wide styles
        test: /\.css$/,
        exclude: [helpers.root("src", "app"), /node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: [helpers.root("src", "app"), /node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function () {
                  return [
                    require("precss"),
                    require("autoprefixer")
                  ];
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        // handles component-scoped styles (specified in a component"s styleUrls property)
        test: /\.css$/,
        exclude: /node_modules/,
        include: helpers.root("src", "app"),
        use: [
          "raw-loader"
        ]
      },
      {
        test: /\.scss$/,
        include: helpers.root("src", "app"),
        use: [
          "to-string-loader",
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root("./src"), // location of your src
      {} // a map of your routes
    ),
    // The CommonsChunkPlugin identifies the hierarchy among three chunks: app -> vendor -> polyfills.
    // Where Webpack finds that app has shared dependencies with vendor, it removes them from app.
    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),
    // auto inject scripts and links
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body"
    })
  ]
};
