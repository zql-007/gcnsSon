import {
  filterUrl,
  funcUrlDel,
  generateTree,
  initialOpenedList,
  openNewPage
} from '@/lib/Menu'
import { resourceListNoPage } from '@/lib/system'
import { post } from '@/lib/Util'
import { clearHttpRequestingList } from '@/lib/Util'

const sleep = function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 清空缓存dialogVisible信息
export function clearDialogVisible(app) {
  app.store.commit('whb/setAlarmDealDialogVisible', false)
  app.store.commit('whb/setRealTimeParamDialogVisible', false)
  app.store.commit('whb/setHiddenDetailDialogVisible', false)
}

// 路由守卫
export default ({ app }) => {
  app.router.beforeEach(async (to, from, next) => {
    clearHttpRequestingList()
    clearDialogVisible(app)

    const { query } = to

    if (typeof window !== 'undefined' && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search)
      const tokenFromSearch = searchParams.get('token')

      if (tokenFromSearch && tokenFromSearch !== query.token) {
        localStorage.setItem('token', tokenFromSearch)
        app.store.commit('user/setToken', tokenFromSearch)
      }
    }

    // 清理URL中?org=redirect及之后到#前的参数
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href
      // 分割hash部分（如果存在）
      const [urlPart, hashPart] = currentUrl.split('#')
      // 查找org=redirect的起始位置
      const redirectIndex = urlPart.indexOf('?org=redirect')
      if (redirectIndex !== -1) {
        // 截取到org=redirect之前的部分
        const cleanUrlPart = urlPart.substring(0, redirectIndex)
        // 重新组合URL（包含hash部分）
        const newUrl = hashPart ? `${cleanUrlPart}#${hashPart}` : cleanUrlPart
        // 更新URL
        window.history.replaceState({}, document.title, newUrl)
      }
    }

    // 判断资源来源是否为后端重定向
    if (query.org && query.org === 'redirect') {
      if (query.token) {
        localStorage.setItem('token', query.token)
        app.store.commit('user/setToken', query.token)
      }
      if (query.userId) {
        localStorage.setItem('userId', query.userId)
        app.store.commit('user/setUserNo', query.userId)
      }
      if (query.userName) {
        localStorage.setItem('userName', query.userName)
        app.store.commit('user/setUserName', query.userName)
      }

      // 标记需要清理URL
      app.store.commit('menu/setNeedCleanUrl', true)

      // 删除URL中的token参数（立即执行）
      /*if (typeof window !== 'undefined') {
        const cleanUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, document.title, cleanUrl)
      }*/
    }

    // 判断是否显示头部
    if (query.showHeader !== undefined) {
      app.store.commit('menu/showHeader', parseInt(query.showHeader))
    }

    // 判断系统是否已经记录token
    const token = localStorage.getItem('token')
    if (!token) {
      // 没有token，直接继续导航
      next()
      // 直接跳转到统一认证登录页
      // window.location.href = `http://10.1.11.181:9730`
      return
    }

    // 特殊路径处理 - 直接放行
    if (
      to.path === '/EquipConditionMonitor/WideThickPlateFactory/MonitorRoute'
    ) {
      next()
      return
    }

    // 用户菜单没有加载时
    if (!window.SYSTEM_MENU_LOADED) {
      // 系统初始化时，设置头部显示
      app.store.commit('menu/showHeader', true)

      // 判断是否显示头部
      if (query.showHeader !== undefined) {
        app.store.commit('menu/showHeader', !!parseInt(query.showHeader))
      }

      // 初始化标签固定页
      initialOpenedList(app)

      // 删除页面token参数
      if (query.org && query.org === 'redirect') {
        funcUrlDel()
      }

      // 直接放行，权限检查放在组件内或路由配置中
      next()
      return
    }

    // 如果菜单已加载，进行权限检查
    if (app.store.state.menu.allMenus) {
      const hasPermission = app.store.state.menu.allMenus.find(
        item =>
          item.url === to.path ||
          item.url === decodeURIComponent(filterUrl(to.fullPath))
      )

      // 如果没有权限且不是首页，延迟跳转到首页
      if (!hasPermission && to.path !== '/') {
        // 使用 setTimeout 避免在守卫中直接导航
        setTimeout(() => {
          app.router.push('/').catch(err => {
            // 忽略导航重复错误
            if (err.name !== 'NavigationDuplicated') {
              console.warn('导航错误:', err)
            }
          })
        }, 0)
        // 继续当前导航，然后会被重定向
        next()
        return
      }

      // 删除页面token参数
      if (query.org && query.org === 'redirect') {
        funcUrlDel()
      }
    }

    next()
  })

  app.router.afterEach((to, from) => {
    openNewPage(app, to.name, to.path, to.fullPath, to.params, to.query)
    window.scrollTo(0, 0)

    // 清理URL中的查询参数，但保留正确的hash
    /*  if (window.location.search.includes('org=redirect')) {
      // 构建新的URL：去掉查询参数，只保留路径和hash
      const newPath = to.path || '/'
      const newHash = app.router.mode === 'hash' ? `#${to.fullPath}` : ''
      const cleanUrl =
        window.location.origin +
        (app.router.mode === 'hash' ? window.location.pathname : newPath) +
        newHash

      // 使用 replaceState 清理URL，不影响页面内容
      window.history.replaceState({}, document.title, cleanUrl)
    }*/
  })
}
