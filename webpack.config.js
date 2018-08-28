const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')

const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
//process 可以读取换变量

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },

      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [{
          loader: 'url-loader', //可以转成base64
          options: {
            limit: 2048, //这里设置字节数最大值小于1024就会转成base64,
            name: '[name]-photo.[ext]' //定义图片名称
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLplugin(),

  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
        //选项的作用使用来提高效率的。
      },
      'stylus-loader'
    ]
  })
  config.devtool = "#cheap-module-eval-source-map"
  config.devServer = {
    port: '8000',
    host: '127.0.0.1',
    overlay: { //配置错误
      errors: true
    },
    //open:true,
    // historyFallback: {

    // }
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {

  //正式环境
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    verdor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
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
  });
  config.plugins.push(
    new ExtractPlugin('style.[chunkhash:8].css'),
  )

  //这部分的配置看不懂
  config.optimization = {
    splitChunks: {
      cacheGroups: { // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5 // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config