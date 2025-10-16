<template>
  <!--  <img
    style="width: 100%;height: 100%"
    src="../assets/IMIP-welcome.png"
    alt="">-->
  <h2>欢迎进入GCNS热轧设备保障系统！请点击左侧菜单查看页面！！</h2>
  <!-- <HomePage></HomePage> -->
</template>


<script>
import HomePage from '@/pages/system/org.vue'
export default {
  name: 'App',
  components: { HomePage }
}
</script>

<style scoped lang="less">
.circleStyle {
  border-radius: 80%;
  background-color: white;
  width: 500px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#app {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
