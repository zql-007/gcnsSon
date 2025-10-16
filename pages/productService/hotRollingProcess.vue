<template>
  <div>
    <three-output>
    </three-output>
    <product-statistics>
    </product-statistics>
    <product-rhythm>
    </product-rhythm>
    <roll-work-replace>
    </roll-work-replace>
    <inventory-occupancy>
    </inventory-occupancy>
    <quality-down>
    </quality-down>
  </div>
</template>

<script>
import qualityDown from '@/pages/productService/components/hotRollingProcess/qualityDown.vue'
import inventoryOccupancy from '@/pages/productService/components/hotRollingProcess/inventoryOccupancy.vue'
import rollWorkReplace from '@/pages/productService/components/hotRollingProcess/rollWorkReplace.vue'
import productStatistics from '@/pages/productService/components/hotRollingProcess/productStatistics.vue'
import productRhythm from '@/pages/productService/components/hotRollingProcess/productRhythm.vue'
import threeOutput from '@/pages/productService/components/hotRollingProcess/threeOutput.vue'
export default {
  name: 'hotRollingProcess',
  components: {
    threeOutput,
    productRhythm,
    productStatistics,
    rollWorkReplace,
    inventoryOccupancy,
    qualityDown
  }
}
</script>


<style scoped lang="less">
</style>
