const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 使用merge来合并webpack配置
const merge = require('webpack-merge')
const baseconfig = require('./webpack.config.base')
// process 可以读取换变量

const devServer = {
  port: '8080',
  host: '127.0.0.1',
  overlay: { // 配置错误
    errors: true
  },
  hot: true
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLplugin({
    template: path.join(__dirname, './template.html')
  })
]

const config = merge(baseconfig, {
  entry: {
    path: path.join(__dirname, '../practice/index.js')
  },
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
          // 选项的作用使用来提高效率的。
        },
        'stylus-loader'
      ]
    }]
  },
  devServer,
  // import Vue from vue
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
})

module.exports = config
