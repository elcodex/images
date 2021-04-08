const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    mode: "development"
}