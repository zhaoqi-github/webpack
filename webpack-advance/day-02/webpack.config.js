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
        // oneOf，让文件匹配上对应的loader后，就不与其他loader做匹配
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
      cache: true, // 开启eslint缓存
      // 缓存目录
      cacheLocation: resolvePath('../node_modules/.cache/.eslintcache'),
    }),
  ],

  // 配置模块如何解析
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
    // 省略引入文件后缀名
    extensions: ['.js', '.ts'],
  },

  optimization: {
    // 在webpack.config.js中，如果单独配置了optimization会导致默认的js压缩失效
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], // 压缩css, js
    // runtimeChunk会把文件之间依赖的映射关系提取成单独的文件保管
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

  // sourceMap（源代码映射）是一个用来生成源代码与构建后代码对应映射文件的方案
  devtool: 'cheap-module-source-map',
};
