const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const { use } = require("react");
const { default: DevServer } = require("next/dist/server/dev/next-dev-server");
const { type } = require("os");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPLugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { bundle: path.resolve(__dirname, "src/js/index.js") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
          MiniCssExtractPlugin.loader,
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "assets/resource",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/templates/template.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // new MiniCssExtractPlugin({
    //   filename: "style.css",
    // }),
  ],
  //   resolve: {
  //     alias: {
  //       bootstrap: path.resolve(__dirname, "node_modules/bootstrap"),
  //     },
  //   },
  //   optimization: {
  //     minimize: true,
  //     minimizer: [new TerserPLugin(), new CssMinimizerPlugin()],
  //   },
};
