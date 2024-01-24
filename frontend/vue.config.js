const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  apiTarget: process.env.NODE_ENV === 'production'
    ? 'https://host-app-server-7f2f9249185c.herokuapp.com/'
    : 'http://localhost:3000',

  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
