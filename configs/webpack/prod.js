// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "CacheFirst",
        },
        {
          urlPattern: new RegExp(
            "^https://fonts.(?:googleapis|gstatic).com/(.*)",
          ),
          handler: "CacheFirst",
        },
        {
          urlPattern: new RegExp(
            "^https://cdn.jsdelivr.net/(.*)"
          ),
          handler: "CacheFirst"
        },
        {
          urlPattern: new RegExp(
            "^https://unpkg.com/(.*)"
          ),
          handler: "CacheFirst"
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['mozjpeg', { quality: 85 }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            preset: "webp",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"]
            }
          }
        ],
      })
    ],
  }
});
