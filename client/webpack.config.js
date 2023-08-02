const HtmlWebpackPlugin = require("html-webpack-plugin");
const os = require('os');

module.exports = (env, argv) => {

  return {
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
        },
        {
          test: /\.(?:jsx?)$/,
          exclude: "/node_modules/",
          use: {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                {search: '%%HOST%%', replace: `${process.env.hostname ?? os.hostname()}`},
                {search: '%%WSPORT%%', replace:`${process.env.BACKPORT ?? process.env.npm_package_config_backendport ?? "8081"}`},
                {search: '%%ENVIRONMENT%%', replace:`${process.env.NODE_ENV}`}
              ]
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            /*{
                            loader: 'file-loader',
                            options: { outputPath: 'css/', name: '[name].min.css'}
                        },
            */
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
    }
  }
}