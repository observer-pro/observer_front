const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.js"),
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.pug$/,
                use: ["pug-loader"],
            },
        ],
    },
    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()],
    },
    devtool:
        process.env.NODE_ENV === "production"
            ? "hidden-source-map"
            : "source-map",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.pug"),
        }),
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new MiniCssExtractPlugin(),
    ],
};
