const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [
    /^[a-z\-0-9]+$/ // Exclude all node_modules
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  }
};
