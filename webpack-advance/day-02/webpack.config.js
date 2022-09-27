const path = require('path');
const resolvePath = _path => path.resolve(__dirname, _path);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: resolvePath('./dist'),
    clean: true,
    //在文件发生更改时，hash后缀会产生变化，反之则无变化
    //确保编译的bundle能被客户端缓存，在资源发生变动时也能请求到新的文件
    filename: 'scripts/[name].[contenthash:10].js',
  },

  module: {
    rules: [
      {
        oneOf: [
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
            use: [MiniCssExtractPlugin.loader, 'cache-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            type: 'asset',
            generator: {
              filename: 'assets/img/[hash:10][ext]',
            },
            parser: {
              dataUrlCondition: {
                maxSize: 60 * 1024, // 小于60kb的图片会被base64处理
              },
            },
          },
          {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            // include: resolvePath('./src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不压缩
            },
          },
        ],
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
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: resolvePath('./src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: resolvePath('../node_modules/.cache/.eslintcache'),
    }),
  ],

  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
    extensions: ['.js', '.ts'],
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    runtimeChunk: {
      name: entryChunk => `runtime-${entryChunk.name}.js`
    }
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
  },

  mode: 'development',
  devtool: 'cheap-module-source-map',
};
