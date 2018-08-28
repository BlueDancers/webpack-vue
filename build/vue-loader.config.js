const docsLoader = require.resolve('./docs-loader')
module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //相当于trim()
    extractCSS: !isDev, //css分文件打包,
    cssModules: {},
    loaders: {
      'docs': docsLoader
    },
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:base64:5]',  //打包生成独一无二的名字
      camelCase: true   //驼峰命名
    } 
  }
}