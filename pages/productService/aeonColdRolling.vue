<template>
  <div>
    <steel-coils-output></steel-coils-output>
    <down-operat-rate></down-operat-rate>
    <machine-output></machine-output>
    <product-yield-rate></product-yield-rate>
    <material-occupat></material-occupat>
    <roll-up-time></roll-up-time>
    <unload-roll-rhythm></unload-roll-rhythm>
    <pro-down-quality-rate></pro-down-quality-rate>
  </div>
</template>

<script>
import SteelCoilsOutput from '@/pages/productService/components/aeonColdRolling/steelCoilsOutput.vue'
import DownOperatRate from '@/pages/productService/components/aeonColdRolling/downOperatRate.vue'
import MachineOutput from '@/pages/productService/components/aeonColdRolling/machineOutput.vue'
import ProductYieldRate from '@/pages/productService/components/aeonColdRolling/productYieldRate.vue'
import MaterialOccupat from '@/pages/productService/components/aeonColdRolling/materialOccupat.vue'
import RollUpTime from '@/pages/productService/components/aeonColdRolling/rollUpTime.vue'
import UnloadRollRhythm from '@/pages/productService/components/aeonColdRolling/unloadRollRhythm.vue'
import ProDownQualityRate from '@/pages/productService/components/aeonColdRolling/proDownQualityRate.vue'
export default {
  name: 'aeonColdRolling',
  components: {
    ProDownQualityRate,
    UnloadRollRhythm,
    RollUpTime,
    MaterialOccupat,
    ProductYieldRate,
    MachineOutput,
    DownOperatRate,
    SteelCoilsOutput
  }
}
</script>

<style scoped lang="less">
</style>
