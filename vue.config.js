const path = require('path')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 静态文件打包放进static目录
  assetsDir: 'static',
  // 生产环境打包不产生map文件
  productionSourceMap: false,
  devServer: {
    port: '9800'
  },
  chainWebpack: config => {
    // 设置路径名的别名引用
    config.resolve.alias.set('components', resolve('src/components'))
  },
  pages: {
    index: {
      entry: [
        resolve('src/main.js')
      ],
      title: 'Clothingshop'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        data: `@import "@/style/color.scss";`
      }
    }
  }
}
