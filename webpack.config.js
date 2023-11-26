const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: ["./src/main.js"],
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
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                {
                    loader: 'file-loader',
                },
                ],
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
        filename: "bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/templates/index.pug",
        }),
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new MiniCssExtractPlugin(),
    ],
};
