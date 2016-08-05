var production = process.env.NODE_ENV !== 'development';

var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var defaultFileLoader = "file?name=assets/[path][name].[hash].[ext]";

var defaultOptions = {
  chunks: [],
  cache: true,
  inject: 'body'
};

var plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": "\"" + process.env.NODE_ENV  +"\"",
      "FIREBASE_URL": "\"" + process.env.FIREBASE_URL +"\""
    }
  }),
  new CleanWebpackPlugin(['dist']),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new HtmlWebpackPlugin(Object.assign({}, defaultOptions, {
    filename: 'index.html',
    template: './entries/index.html.ejs',
    chunks: ['dashboard']
  }))
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]);
}

module.exports = {
  debug: !production,
  devtool: production ? "source-map" : false,
  context: __dirname + "/client",
  entry: {
    dashboard: ['bootstrap-loader', "./modules/dashboard/dashboard"]
  },
  output: {
    path: __dirname + "/dist",
    filename: "assets/[name].[hash].js",
    chunkFilename: "assets/[name].[hash].js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory!baggage?[file].scss"
      },
      {
        test: /\.scss$/i,
        loader: 'style!css!sass'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          defaultFileLoader,
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        loader: defaultFileLoader
      },
      {
        test: /\.ejs$/i,
        loader: 'html?attrs[]=img:src&attrs[]=link:href&attrs[]=square:src&attrs[]=wide:src&removeAttributeQuotes=false&conservativeCollapse=false'
      }
    ]
  },
  plugins: plugins
};
