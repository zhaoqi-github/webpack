const path = require('path')
const webpack = require('webpack');
const FooterPlugin = require('./plugin/FooterPlugin')

module.exports = {
  mode:'development', 
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.imooc$/,
        use: [path.resolve(__dirname, './loader/imooc-loader.js')]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '测试BannerPlugin'
    }),
    new FooterPlugin({
      banner: '测试FooterPlugin'
    })
  ]
}