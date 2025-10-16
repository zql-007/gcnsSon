<template>
  <div>
    <nickel-iron-supply></nickel-iron-supply>
    <nickel-iron-bag-wash-times></nickel-iron-bag-wash-times>
  </div>
</template>

<script>
import NickelIronSupply from '@/pages/productService/components/nickelIronProcess/nickelIronSupply.vue'
import NickelIronBagWashTimes from '@/pages/productService/components/nickelIronProcess/nickelIronBagWashTimes.vue'

export default {
  name: 'nickelIronProcess',
  components: { NickelIronBagWashTimes, NickelIronSupply }
}
</script>

<style scoped lang="less">
</style>
