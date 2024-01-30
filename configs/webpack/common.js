// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            sync: true,
          },
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/[name].[ext]",
        },
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: "responsive-loader",
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html.ejs",
      favicon: "../src/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
