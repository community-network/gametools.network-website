// development config
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(commonConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  cache: {
    type: "filesystem",
  },
  devServer: {
    allowedHosts: "all",
    hot: true, // enable HMR on the server
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    // new BundleAnalyzerPlugin(),
  ],
  output: {
    publicPath: "/",
  },
});
