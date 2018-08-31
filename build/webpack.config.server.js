const path = require('path')
const webpack = require('webpack')
// 使用merge来合并webpack配置
const merge = require('webpack-merge')
const baseconfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

const config = merge(baseconfig, {
  target: 'node', // 默认是web 这里是服务程序,所以是node
  devtool: 'source-map',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2', // 会帮助我们使用module.exports来进行打包出去
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies), // 得到生产环境的依赖,让他不要打包着部分的文件
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('style.[chunkhash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin(),
    new VueLoaderPlugin()
  ]
})

module.exports = config
