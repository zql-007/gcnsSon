/*
 * @Author: your name
 * @Date: 2020-07-20 15:45:41
 * @LastEditTime: 2021-07-15 09:23:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\iem\nuxt.config.js
 */

//引入package.json文件（通过pkg变量获取项目基本信息，如名称、描述等）
const pkg = require('./package')

//导出 Nuxt 配置对象，包含项目所有核心配置
module.exports = {
  mode: 'spa', //spa：单页应用模式，仅客户端渲染（当前被注释，未启用
  //universal：服务端渲染 (SSR) 和客户端渲染混合模式（默认），有利于 SEO 和首屏加载速度,
  // mode: 'universal',
  // ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name, // 页面标题，取自package.json的name字段
    meta: [
      { charset: 'utf-8' }, // 字符集
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }, // 响应式视图配置
      { hid: 'description', name: 'description', content: pkg.description } // 页面描述，用于SEO
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img_1.png' }] // 网站图标
  },

  /*
  ** Customize the progress-bar color配置页面切换时的加载进度条样式（这里设置为白色）
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS 配置全局引入的 CSS/LESS 文件，这些样式会应用到所有页面
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icon/iconfont.css',
    '@/assets/css/baseStyle.less',
    '@/assets/css/pageIom04Style.less',
    '@/assets/css/theme/index.css',
    { src: '@/assets/css/common.less', lang: 'less' }
  ],

  /*
  ** Plugins to load before mounting the App配置需要在应用初始化时加载的插件,ssr: false表示插件仅在客户端执行（避免服务端渲染报错）
  */
  plugins: [
    // '@/plugins/main',
    '@/plugins/element-ui',
    '@/plugins/directive',
    '@/plugins/api',
    '@/plugins/i18n',
    '@/plugins/filters',
    { src: '~/plugins/persistedstate.js', ssr: false },
    { src: '@/plugins/interceptors', ssr: false },
    '@/plugins/request',
    { src: '@/plugins/route', ssr: false }
    // { src: '@/plugins/qiankun-life-cycle.js', ssr: false }
  ],

  MFE: {
    force: true
  },
  /*
  ** Nuxt.js modules,配置 Nuxt.js 模块，扩展项目功能（这里引入了官方的 Axios 模块）
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@femessage/nuxt-micro-frontend'
  ],
  //服务器配置（server）,配置开发服务器的端口和主机地址
  server: {
    port: 3003 || process.env.PORT, // 项目运行端口（默认9731，可通过环境变量覆盖）
    host: '0.0.0.0' || process.env.BASE_URL, // 主机地址（0.0.0.0允许外部访问）
    // 添加以下 headers 配置，允许主应用跨域访问
    headers: {
      /*'Access-Control-Allow-Origin':
        process.env.NODE_ENV === 'development'
          ? '*' // 开发环境允许所有源（方便调试）
          : 'http://主应用生产环境域名', // 生产环境指定主应用域名*/
      'Access-Control-Allow-Origin': '*', // 开发环境临时放宽（生产环境需指定主应用域名）
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }
  },
  /*
  ** Axios module configuration,环境变量（env）
  */
  env: {
    device: 'web' // 定义全局环境变量，可在代码中通过process.env.device访问
  },
  //Axios 配置（网络请求）,配置 Axios 的全局请求参数
  axios: {
    baseURL: 'http://10.200.29.181:9702/', //服务器地址,// 默认请求基础地址
    timeout: 60000, // 请求超时时间（60秒）
    retry: { retries: 3 }, // 请求失败重试次数（3次）
    proxy: true // 启用代理
  },
  //代理配置（proxy）
  //配置 API 请求代理，解决跨域问题;例如：前端请求/api/user会被代理到http://10.200.29.181:9702/user
  proxy: {
    '/api': {
      target: 'http://10.200.29.181:9702/', //服务器地址// 代理目标地址
      pathRewrite: { '^/api/': '' } // 路径重写（去掉请求中的/api前缀）
    },
    // 其他代理规则...
    // '/mes': {
    //   target: 'http://10.200.29.184:9702/', //服务器地址(炼钢工序-bobo）
    //   pathRewrite: { '^/mes/': '' }
    // },
    '/mes': {
      target: 'http://10.200.29.2:9702/', //服务器地址(自己本地）
      pathRewrite: { '^/mes/': '' }
    },
    '/mo': {
      target: 'http://10.200.29.2:9702/', //服务器地址(lcx)
      pathRewrite: { '^/mo/': '' }
    }
  },
  //路由配置（router）,全局路由中间件（所有路由切换都会执行redirect中间件）
  /*router: {
    middleware: 'redirect'
  },*/
  router: {
    mode: 'hash', // 与主应用保持一致的 history 模式
    // 动态设置 base：嵌入 qiankun 时用 /sub-app，独立运行时用 /
    base: '/'
  },
  /*
  ** Build configuration,构建配置（build）
  */
  // 配置 build 选项
  build: {
    // 增加库模式配置
    libraryTarget: 'umd',
    library: 'sub-app-[name]',
    jsonpFunction: `webpackJsonp_sub_app`,
    // 解决资源路径问题
    /*  publicPath:
      process.env.NODE_ENV === 'production'
        ? '//your-cdn/sub-app/' // 生产环境 CDN 路径
        : window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ ||
          '//localhost:3001/_nuxt/', // 适配 qiankun 注入的路径*/
    publicPath: '//localhost:3003/', // 新增qiankun注入路径适配
    // 解决子应用与主应用的样式冲突
    extractCSS: true,
    // 自定义 webpack 配置
    extend(config, { isDev, isClient }) {
      config.output.library = 'sub-app-[name]'
      config.output.libraryTarget = 'umd'
      config.output.jsonpFunction = `webpackJsonp_sub_app`

      // 开发环境配置
      if (isDev && isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  },
  configureWebpack: {
    output: {
      library: 'sub-app-[name]',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_sub_app`,
      crossOriginLoading: 'anonymous'
    }
  },
  //构建模块（buildModules）,配置 Nuxt 的构建时模块，这里引入了 PostCSS 8 支持（处理 CSS 的工具）
  buildModules: ['@nuxt/postcss8']
}
