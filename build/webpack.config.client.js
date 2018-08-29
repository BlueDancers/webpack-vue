const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
// 使用merge来合并webpack配置
const merge = require('webpack-merge')
const baseconfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'
// process可以读取换变量

const devServer = {
  port: '8000',
  host: '127.0.0.1',
  overlay: { // 配置错误
    errors: true
  },
  hot: true
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLplugin()

]

let config // 配置文件 用于合并

if (isDev) {
  config = merge(baseconfig, {
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  // 正式环境
  config = merge(baseconfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
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
      }]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
        // cacheGroups: { // 这里开始设置缓存的 chunks
        //   commons: {
        //     chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //     minSize: 0, // 最小尺寸，默认0,
        //     minChunks: 2, // 最小 chunk ，默认1
        //     maxInitialRequests: 5 // 最大初始化请求书，默认1
        //   },
        //   vendor: {
        //     test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
        //     chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //     name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
        //     priority: 10, // 缓存组优先级
        //     enforce: true
        //   }
        // }
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('style.[chunkhash:8].css')
    ])
  })
}

module.exports = config
