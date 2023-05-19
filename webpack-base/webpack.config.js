const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    //contenthash => https://webpack.js.org/guides/caching/#output-filenames
    filename: '[name][contenthash].js', //entry中key是'bundle',则生成的文件就是'bundle.js'
    clean: true, //npm run build会自动删除之前的文件
    assetModuleFilename: '[name][ext]', //自定义资源文件名
  },
  devtool: 'source-map', //概念扫盲https://juejin.cn/post/7016510600960278565
  // devServer 是开发服务器的配置，本质是启动了一个express服务器
  devServer: {
    //概念扫盲 https://blog.csdn.net/qq_17175013/article/details/119213124
    //https://www.webpackjs.com/configuration/dev-server/#devserver-hot
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true, //webpack 的模块热替换特性
    compress: true, //启用gzip 压缩
    historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', //扫盲 http://www.voycn.com/article/babel-loaderbabel-corehebabel-presetzhijianshishenmeguanxi
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', //扫盲 https://blog.csdn.net/qq_15601471/article/details/115083790
      },
    ],
  },
  plugins: [
    // 打包完之后，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    new BundleAnalyzerPlugin()
  ],
};
