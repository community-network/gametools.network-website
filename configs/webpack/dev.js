// development config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const webpack = require("webpack");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:3001", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./index.tsx", // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "/" }],
    },
    static: { directory: resolve("src/public") },
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  ],
});
