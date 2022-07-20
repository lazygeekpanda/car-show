const { merge } = require("webpack-merge")
const commonConfiguration = require("./webpack.common.js")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true
  },
  optimization: {
    runtimeChunk: "single"
  }
})
