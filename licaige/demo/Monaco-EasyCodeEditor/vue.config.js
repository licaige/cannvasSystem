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
