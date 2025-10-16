<template>
  <div>
    <heat-anneal-acid-wash
      :id="heatAnnealAcidWashId">
    </heat-anneal-acid-wash>
    <split-product-line
      :id="splitProductLineId">
    </split-product-line>
    <inventory-statistics
      :id="inventoryStatisticsId">
    </inventory-statistics>
    <right-position-naviga
      :right-position-naviga-name="rightPositionNavigaName">
    </right-position-naviga>
  </div>
</template>

<script>
import rightPositionNaviga from '@/components/rightPositionNaviga/rightPositionNaviga.vue'
import splitProductLine from '@/pages/productService/components/backWashingProcess/splitProductLine.vue'
import heatAnnealAcidWash from '@/pages/productService/components/backWashingProcess/heatAnnealAcidWash.vue'
import InventoryStatistics from '@/pages/productService/components/backWashingProcess/inventoryStatistics.vue'
export default {
  name: 'backWashingProcess',
  components: {
    InventoryStatistics,
    heatAnnealAcidWash,
    splitProductLine,
    rightPositionNaviga
  },
  data() {
    return {
      heatAnnealAcidWashId: 'section1',
      splitProductLineId: 'section2',
      inventoryStatisticsId: 'section3',
      rightPositionNavigaName: [
        {
          id: 'section1',
          name: '热退酸洗'
        },
        {
          id: 'section2',
          name: '分条产线'
        },
        {
          id: 'section3',
          name: '库存统计'
        } /*,
        {
          id: 'section4',
          name: '分析评价'
        }*/
      ]
    }
  }
}
</script>

<style scoped lang="less">
</style>
