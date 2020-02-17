const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = {
  mode: 'development',
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true, // 热替换
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(), // 和HotModuleReplacementPlugin搭配使用，以便更容易查看要修补的依赖
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico') // 指定favicon的位置，打包后自动插入到html中
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}

module.exports = config
