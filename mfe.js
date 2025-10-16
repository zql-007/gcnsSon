import Vue from 'vue'
import store from './store'

/*if (!window.$sdk) {
  window.$sdk = {
    scrollToActiveTab: () => {} // 全局空实现
  }
}

// 若子应用是 Vue，再绑定到原型
Vue.prototype.$sdk = window.$sdk*/

export default function(render) {
  if (!window.__POWERED_BY_QIANKUN__) {
    render()
  }
}

export function bootstrap() {}

export async function mount(render, props) {
  console.log('mount props:', props)
  await render()
}

export async function update() {}

export function mounted(instance, props) {
  console.log('mouted---props', props)
  console.log('mouted---instance', instance)
  // store.commit('setShowMenu', props.showMenu)
  // this.$store.commit('menu/setShowMenu', props.showMenu)
  // if (props.sdk) {
  //   Vue.prototype.$sdk = props.sdk
  // }
}

export function beforeUnmount(instance) {}

export async function unmount(props) {
  console.log('unProps', props)
  // 通知所有 ECharts 组件销毁实例
  /* window.__ECHARTS_INSTANCES__.forEach(chart => {
    if (chart && chart.dispose) {
      chart.dispose()
    }
  })*/
}
