const { Config } = require('webpack-config');

module.exports = new Config().merge({
  mode: 'production',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /config\.json$/,
        loader: __dirname + '/scripts/ConfigLoader.js',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    electron: `window.require("electron")`,
    fs: `window.require("fs")`,
    path: `window.require("path")`,
    request: `window.require("request")`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
});
