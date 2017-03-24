var path = require('path');

// index.html template
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

var webpackConfig = {
  entry: "src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader?modules!stylus-loader'
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  resolve: {
    // For nice filetype resolution, ie import 'components/navbar'.
    extensions: ["", ".js", ".jsx", ".css", ".styl"],
    root: __dirname,

    // God help us if someone has required react somewhere down the
    // dependency tree...
    alias: path.join(__dirname, "node_modules/react")
  }
};

module.exports = webpackConfig
