const path = require('path')
// vue-loader的配置
// const createVueLoderOptions = require('./vue-loader.config')
const docsLoader = require.resolve('./docs-loader')
// const isDev = process.env.NODE_ENV === 'development'
// process 可以读取换变量

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre' // 预处理
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'docs': docsLoader
        },
        cssModules: {
          localIdentName: '[path][name]---[local]---[hash:base64:5]',
          camelCase: true
        }
      }
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(gif|png|jpg|svg)$/,
      use: [{
        loader: 'url-loader', // 可以转成base64
        options: {
          limit: 1024, // 这里设置字节数最大值小于1024就会转成base64,
          name: 'resources/[path][name].[hash:8].[ext]' // 定义图片名称
        }
      }]
    }
    ]
  }
}
module.exports = config
