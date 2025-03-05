// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const {
  defineReactCompilerLoaderOption,
  reactCompilerLoader,
} = require("react-compiler-webpack");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: /\.[mc]?[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
          // babel-loader, swc-loader, esbuild-loader, or anything you like to transpile JSX should go here.
          // If you are using rspack, the rspack's buiilt-in react transformation is sufficient.
          { loader: "swc-loader" },
          // Now add forgetti-loader
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({
              // React Compiler options goes here
            }),
          },
        ],
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
    new Dotenv({
      defaults: true,
      systemvars: true,
    }),
  ],
};
