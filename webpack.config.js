const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './bundle/main.js',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.pcss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public', '_compiled'),
    filename: 'main.bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.bundle.css'
    }),
  ],
}
