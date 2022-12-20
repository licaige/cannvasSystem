const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        // languages: ['javascript', 'python', 'typescript']
      })
    ],
    resolve: { fallback: { path: require.resolve('path-browserify') } }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.BASE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
