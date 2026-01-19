<template>
  <!-- 在test布局中根据环境动态包裹default布局 -->
  <div v-if="isProduction">
    <nuxt/>
  </div>
  <div v-else>
    <!-- 在开发环境直接渲染default布局 -->
    <default-layout>
      <nuxt/>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from './default.vue'

export default {
  components: {
    DefaultLayout
  },
  computed: {
    isProduction() {
      // 根据环境变量判断
      return (
        process.env.NODE_ENV === 'production' ||
        process.env.ENV_TYPE === 'prod' ||
        process.env.isProd === 'true'
      )
    }
  }
}
</script>
