const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// 配置vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? '/Monaco-EasyCodeEditor/': '/',
  outputDir: 'dist',
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
}

// vue.config.js 配置chainWebpack
/*const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // ...
  chainWebpack: function(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  configureWebpack: function(config) {
  }
}*/
// vue.config.js
/*const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack (config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  }
}*/

