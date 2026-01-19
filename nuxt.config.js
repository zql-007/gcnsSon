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
  head: {
    title: pkg.name, // 页面标题，取自package.json的name字段
    meta: [
      { charset: 'utf-8' }, // 字符集
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }, // 响应式视图配置
      { hid: 'description', name: 'description', content: pkg.description } // 页面描述，用于SEO
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/IMIP.ico' }] // 网站图标
  },

  loading: { color: '#fff' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icon/iconfont.css',
    '@/assets/css/baseStyle.less',
    '@/assets/css/pageIom04Style.less',
    '@/assets/css/theme/index.css',
    { src: '@/assets/css/common.less', lang: 'less' }
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/directive',
    '@/plugins/api',
    '@/plugins/i18n',
    '@/plugins/filters',
    { src: '~/plugins/persistedstate.js', ssr: false },
    { src: '@/plugins/interceptors', ssr: false },
    '@/plugins/request',
    { src: '@/plugins/route', ssr: false }
  ],

  /*MFE: {
    force: true
  },*/
  modules: ['@nuxtjs/axios', '@femessage/nuxt-micro-frontend'],
  //服务器配置（server）,配置开发服务器的端口和主机地址
  server: {
    port: 9100 || process.env.PORT, // 项目运行端口（默认9204，可通过环境变量覆盖）
    host: '0.0.0.0' || process.env.BASE_URL, // 主机地址（0.0.0.0允许外部访问）
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }
  },
  env: {
    device: 'web' // 定义全局环境变量，可在代码中通过process.env.device访问
  },
  axios: {
    baseURL: 'http://10.2.0.28:9201/', // 默认请求基础地址
    timeout: 60000,
    retry: { retries: 3 },
    proxy: true
  },
  proxy: {
    '/hid': {
      target: 'http://10.2.0.28:9201/',
      pathRewrite: { '^/hid/': '' }
    },
    '/mv': {
      target: 'http://10.2.0.42:9701/',
      pathRewrite: { '^/mv/': '' }
    }
  },
  router: {
    middleware: 'redirect',
    mode: 'hash' // 或history 模式
    // base: basePath // 直接使用公共变量
  },
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        // 在客户端构建中排除 Node.js 原生模块
        config.node = {
          fs: 'empty',
          net: 'empty',
          tls: 'empty',
          child_process: 'empty'
        }
      }
    },
    // 1. 转译这个库（处理语法兼容）
    transpile: ['xlsx-style-medalsoft'],
    // publicPath: `${basePath}_Nuxt/` // 拼接静态资源目录，无需重复写 /energy/
    publicPath:
      process.env.NODE_ENV === 'production' ? '/hidden/_Nuxt/' : '/_Nuxt/'
  },
  buildModules: ['@nuxt/postcss8']
}
