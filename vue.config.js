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
    host: 'localhost',
    port: '9800'
    // proxy: 'http://localhost:3000/cms/h5'
  },
  // runtimeCompiler: true,
  // vue 2.x版本的原先BASE_URL，vue 4.x改名为publicPath
  // 这里有个不好的地方就是无法设置多个环境的配置文件
  // 这个配置有问题,默认就是./
  // publicPath: './',
  // 对应vue 2.x webpack.base.conf的配置
  chainWebpack: config => {
    // 设置路径名的别名引用
    config.resolve.alias.set('components', resolve('src/components'))

    // 添加scss规则
    // const scssRule = config.module.rule('scss').test(/\\.scss$/)
    // scssRule.use('sass-loader').loader('sass-loader').end()
    // scssRule.use('vue-style-loader').loader('vue-style-loader').end()

    // 添加js规则
    // const jsRule = config.module.rule('js').test(/\\.js/)
    // jsRule.use('babel-loader').loader('babel-loader').end()

    // const vueRule = config.module.rule('vue').test(/\\.vue/)
    // vueRule.use('vue-style-loader').loader('vue-style-loader').end()
    // console.log(config.module.rules.get('vue'))
    // console.log(config.module.rules.get('vue').store)
  },
  // configureWebpack: config => {
  //
  // },
  pages: {
    index: {
      entry: [
        // 为了兼容IE,暂时注掉
        // 'babel-polyfill',
        resolve('src/main.js')
      ],
      title: 'Clothingshop'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/style/color.scss` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        // 作用是全局引用这个scss
        // 这里最坑爹的是最后必须要有一个;号,否则编译报错
        data: `@import "@/style/color.scss";`
      }
    }
  }
  // pluginOptions: {
  //   'sass-resources-loader': {
  //     preProcessor: 'scss',
  //     // 需要通过less-loader自动引入的资源，集合类型
  //     patterns: [resolve('src/style/color.scss')]
  //   }
  // }
}
