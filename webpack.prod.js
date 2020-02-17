const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 配置控制台输出信息

const config = {
  mode: 'production',
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[hash:5].bundle.js',
    publicPath: './'
  },
  stats: {
    children: false,
    entrypoints: false,
    modules: false
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico') // 指定favicon的位置，打包后自动插入到html中
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}

module.exports = config
