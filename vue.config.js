const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 静态文件打包放进static目录
  assetsDir: 'static',
  // 生产环境打包不产生map文件
  productionSourceMap: false,
  devServer: {
    // host: 'localhost',
    port: '9800',
    // 尝试使用反向代理解决跨域问题
    proxy: {
      // 1.按照我理解的代理设置,应该是这样的,首先baseUrl的设置必须是和启动的服务器同一个域名
      // 也就是dev的是什么地址,baseURL就是什么地址,否则代理无效,还是按照baseUrl的地址去
      // 访问
      // 2.使用代理的情况就是API地址不支持跨域的时候使用,dev的时候,前端还是会启一个服务器
      // 然后页面通过访问同一个域名下的地址,然后通过服务器帮你访问另一个地址,才实现代理
      '^/api/*': {
        target: 'http://cc:3000', // 要代理的域名
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': '/cms/h5/api' // 其实我觉得这个就是把访问的路径某些地址进行替换而已,使用正则
          //然后把开发地址替换成接口要的地址
        }
      },
      '^/upload/*': {
        target: 'http://localhost:8090', // 要代理的域名
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/upload': '/api' // 其实我觉得这个就是把访问的路径某些地址进行替换而已,使用正则
          //然后把开发地址替换成接口要的地址
        }
      },
      '^/download/*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/download': '/'
        }
      },
      '^/cmbg-api/*': {
        target: 'https://cambridge-dev.shijicloud.com/CambridgeAPI',
        changeOrigin: true,
        pathRewrite: {
          '^/cmbg-api': '/api'
        }
      }
    }
    // before(app, /*server*/) {
    //   app.get(/.*.(js)$/, (req, res, next) => {
    //     req.url = req.url + '.gz';
    //     res.set('Content-Encoding', 'gzip');
    //     next();
    //   })
    // }
    // proxy: 'http://cc:3000/cms/h5'
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

    // 项目优化第一步
    //1.js,css代码的最小化压缩和分割
    // config.optimization.minimize(true)
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // })

    //2.CND引入资源包,一般不会这样做,暂时写一个例子
    //CND资源查询地址https://www.bootcdn.cn/
    //需要在index页面加入链接
    //<script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
    //<link href="https://cdn.bootcss.com/mint-ui/2.2.13/style.min.css" rel="stylesheet">

    //3.抽离css在js的动态加载

    //4.图片压缩网站,可对图片进行压缩处理
    // https://tinypng.com/

    //5.使用gzip的压缩代码

    // 用cdn方式引入
    // config.externals({
    //   'vue': 'Vue',
    //   'vuex': 'Vuex',
    //   'vue-router': 'VueRouter',
    //   'axios': 'axios'
    // })

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
  configureWebpack: config => {
    const isProd = process.env.NODE_ENV === 'production'
    const plugins = []
    if(isProd){
      // 这个插件有点坑爹啊,2.x以上版本的,不支持ES6的语法了,目前不知道怎么解决,所以只能换回1.x的版本使用
      const uglify = new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
            // pure_funcs: ['console.log']//移除console
          }
        },
        sourceMap: false,
        parallel: true
      })
      plugins.push(uglify)
    }
    // const compress = new CompressionWebpackPlugin(
    //   {
    //     filename: info => {
    //       return `${info.path}.gz${info.query}`
    //     },
    //     algorithm: 'gzip',
    //     threshold: 10240,
    //     test: new RegExp(
    //       '\\.(' +
    //       ['js'].join('|') +
    //       ')$'
    //     ),
    //     minRatio: 0.8,
    //     deleteOriginalAssets: false
    //   }
    // )
    //
    // plugins.push(compress)

    const copyWebpackPlugin = new CopyWebpackPlugin([{
      from: resolve('static'),
      to: 'static',
      ignore: ['.*']
    }])
    plugins.push(copyWebpackPlugin)

    config.plugins = [
      ...config.plugins,
      ...plugins
    ]

    // console.log(config)
  },
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
        additionalData: `@import "@/style/color.scss";`
      }
    },
    //因为js会动态的加载出css，所以js文件包会比较大，那么需要提取css代码到文件. 这里我们只需要将css配置一下
    extract: true
  }
}
