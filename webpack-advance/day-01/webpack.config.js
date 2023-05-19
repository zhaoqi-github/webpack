const path = require('path');
const resolvePath = _path => path.resolve(__dirname, _path);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',

  // 只能指定一个 output 配置
  output: {
    path: resolvePath('./dist'), // path：文件输出的路径，必须是个绝对路径
    clean: true, // 清除上一次的打包结果
    filename: 'scripts/[name].js',
  },

  module: {
    rules: [
      /* {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, */
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash:10][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('./src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
  },

  mode: 'development',
};
