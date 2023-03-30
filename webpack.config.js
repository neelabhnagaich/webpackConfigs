const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const modeConfig = env => require(`./build-utills/webpack.${env}`)(env)
const webpackMerge = require('webpack-merge')
const presetConfig = require("./build-utills/loadPresets")


module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
    return webpackMerge({
        mode,
        output: {
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.jpe?g$/,
                    use: [
                        {
                            loader:"url-loader",
                            options:{
                                limit: 5000
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new webpack.ProgressPlugin()
        ]
    }, modeConfig(mode), presetConfig({mode, presets: presets || []}))
}