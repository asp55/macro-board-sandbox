const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: `${__dirname}/src/App.jsx`,
  mode: "production",
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.wasm'],
  },
  optimization: {
      minimize: false
  },
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:jsx)$/,
        exclude: "/node_modules/",
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
