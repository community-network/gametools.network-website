// production config
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const WorkboxPlugin = require('workbox-webpack-plugin');

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.gametools-prod-edge.min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: resolve(__dirname, "../../dist") }],
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
});
