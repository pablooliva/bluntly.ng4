const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts', // vendor: ['angular', 'firebase', 'angularfire', 'angular-ui-router']
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      /* maybe unnecessary
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: helpers.root('src', 'app'),
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      */
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'file-loader?name=assets/[name].[hash].[ext]',
          // options > https://github.com/imagemin
          'img-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: helpers.root('src'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
      },
      {
        // matches application-wide styles
        test: /\.css$/,
        exclude: [helpers.root('src', 'app'), /node_modules/],
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        // handles component-scoped styles (specified in a component's styleUrls property)
        test: /\.css$/,
        exclude: /node_modules/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    // The CommonsChunkPlugin identifies the hierarchy among three chunks: app -> vendor -> polyfills.
    // Where Webpack finds that app has shared dependencies with vendor, it removes them from app.
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // auto inject scripts and links
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    })
  ]
};
