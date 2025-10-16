<template>
  <div
    class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div><span class="spanHead">产线总览</span></div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                v-if="echartsShow"
                class="CardTable">
                <el-row :gutter="52">
                  <el-col :span="8">
                    <div><span class="spanHeadTwo">板坯产量</span></div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 10px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本日</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.dateSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">昨日</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastDateSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 16px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本月</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.monthSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">上月</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastMonthSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 16px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本年</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.yearSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">上年</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastYearSlabsYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div><span class="spanHeadTwo">方坯产量</span></div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 10px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本日</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.dateBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">昨日</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastDateBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 16px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本月</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.monthBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">上月</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastMonthBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 16px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">本年</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.yearBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 50px;display: flex;margin-top: 3px">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 16px">
                        <span style="width: 16px;height: 32px;font-size: 14px;font-weight: 545;letter-spacing: 0;">上年</span>
                      </div>
                      <div style="width: 140px;background-color: #F5FAF5;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.lastYearBilletYield }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div><span class="spanHeadTwo">库存统计</span></div>
                    <div style="width: 145px;height: 103px;margin-top: 10px;display: flex;position: relative">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;text-align: center">
                        <span style="width: 16px;height: 80px;font-size: 14px;font-weight: 545;letter-spacing: 0;">当日入库</span>
                      </div>
                      <div style="width: 140px;height: 50px;background-color: #F5FAF5;margin-left: 3px;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.dayTotalWet }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                      <div style="width: 117px;height: 50px;background-color: #F5FAF5;margin-left: 3px;position: absolute;top: 54px;left: 25px">
                        <div style="width: 117px;height: 50px;display: flex;align-items: center;line-height: 16px;position: relative">
                          <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.dayTotalSlab }}</div>
                          <div style="position: absolute;right: 20px;font-size: 12px;bottom: 15px">支</div>
                        </div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 103px;margin-top: 16px;display: flex;position: relative">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;text-align: center">
                        <span style="width: 16px;height: 80px;font-size: 14px;font-weight: 545;letter-spacing: 0;">当月入库</span>
                      </div>
                      <div style="width: 140px;height: 50px;background-color: #F5FAF5;margin-left: 3px;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.monthTotalWet }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                      <div style="width: 117px;height: 50px;background-color: #F5FAF5;margin-left: 3px;position: absolute;top: 54px;left: 25px">
                        <div style="width: 117px;height: 50px;display: flex;align-items: center;line-height: 16px;position: relative">
                          <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.monthTotalSlab }}</div>
                          <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万支</div>
                        </div>
                      </div>
                    </div>
                    <div style="width: 145px;height: 103px;margin-top: 16px;display: flex;position: relative">
                      <div style="width: 30px;background-color: #E0EBE1;display: flex;flex-direction: column;justify-content: center;align-items: center;text-align: center">
                        <span style="width: 16px;height: 80px;font-size: 14px;font-weight: 545;letter-spacing: 0;">当前库存</span>
                      </div>
                      <div style="width: 140px;height: 50px;background-color: #F5FAF5;margin-left: 3px;display: flex;align-items: center;line-height: 16px;position: relative">
                        <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px;">{{ fromData.totalWetOfInventory }}</div>
                        <div style="position: absolute;right: 10px;font-size: 12px;bottom: 15px">万吨</div>
                      </div>
                      <div style="width: 117px;height: 50px;background-color: #F5FAF5;margin-left: 3px;position: absolute;top: 54px;left: 25px">
                        <div style="width: 117px;height: 50px;display: flex;align-items: center;line-height: 16px;position: relative">
                          <div style="font-weight: 900;font-size: 21px;position: absolute;right: 39px">{{ fromData.totalSlabOfInventory }}</div>
                          <div
                            style="position: absolute;right: 10px;font-size: 12px;bottom: 15px;">万支</div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div><span class="spanHeadTwo">机时产量</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    v-if="echartsShow"
                    :tooltip="machineRateOption.tooltip"
                    :grid="machineRateOption.grid"
                    :x-axis="machineRateOption.xAxis"
                    :y-axis="machineRateOption.yAxis"
                    :series="machineRateOption.series"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div><span class="spanHeadTwo">生产节奏</span></div>
                  <div style="height: 350px">
                    <!--                    <nercar-echarts
                      v-if="echartsShow"
                      :legend="productRhythmOption.legend"
                      :tooltip="productRhythmOption.tooltip"
                      :grid="productRhythmOption.grid"
                      :x-axis="productRhythmOption.xAxis"
                      :y-axis="productRhythmOption.yAxis"
                      :series="productRhythmOption.series"
                      :_height="'350px'"
                    />-->
                    <echarts-scroll-sample></echarts-scroll-sample>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div><span class="spanHeadTwo">吨钢消耗</span></div>
                  <div class="container">
                    <!--                    <div
                      class="image-container"
                      style="display: flex;justify-content: center;margin-top: 30px">
                      <img
                        :src="require('@/assets/images/IndonesiaImages/tonSteelConsumpt.svg')"
                        alt="钢材图片"> &lt;!&ndash; 请替换为实际图片路径 &ndash;&gt;
                    </div>-->
                    <div class="data-container">
                      <div :class="[menuCollapse ? 'data-item top-leftMenuCollapse' : 'data-item top-left']">
                        <!-- 新增外层容器控制宽度和对齐 -->
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.steelAvg }} kg/t</span>
                        </div>
                        <span class="data-label">铁水消耗</span>
                      </div>
                      <div :class="[menuCollapse ? 'data-item top-rightMenuCollapse' : 'data-item top-right']">
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.oavg }} Nm³/t</span>
                        </div>
                        <span class="data-label">氧气消耗</span>
                      </div>
                      <div class="data-item middle-left">
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.fuAvg }} kg/t</span>
                        </div>
                        <span class="data-label">辅料消耗</span>
                      </div>
                      <div class="data-item middle-right">
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.navg }} Nm³/t</span>
                        </div>
                        <span class="data-label">氮气消耗</span>
                      </div>
                      <div class="data-item bottom-left">
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.heAvg }} kg/t</span>
                        </div>
                        <span class="data-label">合金消耗</span>
                      </div>
                      <div class="data-item bottom-right">
                        <div class="value-wrapper">
                          <span class="data-value">{{ steelFrom.arAvg }} Nm³/t</span>
                        </div>
                        <span class="data-label">氩气消耗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echartsScrollSample from '@/components/steelComponent/echartsScrollSample.vue'
import { post } from '@/lib/Util'
import { getLgccOutPut } from '@/lib/productDataApply/steelmakingProcess'
import NercarEcharts from '@/components/NercarEcharts.vue'
import { mapState } from 'vuex'
export default {
  layout: 'menuLayout',
  name: 'productService-productOverview',
  components: {
    NercarEcharts,
    echartsScrollSample
  },
  props: {
    inventoryStatistics: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rhythmProduction: {
      type: Array,
      default: function() {
        return []
      }
    },
    weightDataList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    echartsShow: {
      type: Boolean,
      default: false
    },
    prodByHourTimeList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    menuCollapse: {
      type: Boolean,
      default: false
    },
    lgAvgEnergyDataSon: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      timerId: null,
      number0: '912.74',
      fits: 'cover',
      machineRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false // 或者直接设置为 false
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '5%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 30,
            data: []
            /*itemStyle: {
              normal: {
                color: function(params) {
                  return barColors[params.dataIndex]
                }
              }
            }*/
          }
        ]
      },
      fromData: {
        //板坯产量
        dateSlabsYield: null,
        lastDateSlabsYield: null,
        monthSlabsYield: null,
        lastMonthSlabsYield: null,
        yearSlabsYield: null,
        lastYearSlabsYield: null,
        //方坯产量
        dateBilletYield: null,
        lastDateBilletYield: null,
        monthBilletYield: null,
        lastMonthBilletYield: null,
        yearBilletYield: null,
        lastYearBilletYield: null,
        //库存统计
        dayTotalWet: null,
        dayTotalSlab: null,
        monthTotalWet: null,
        monthTotalSlab: null,
        totalWetOfInventory: null,
        totalSlabOfInventory: null
      },
      steelFrom: {
        steelAvg: null,
        fuAvg: null,
        heAvg: null,
        oavg: null,
        navg: null,
        arAvg: null
      },
      productRhythmOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '5%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: []
      }
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse'])
  },
  watch: {
    /*tableData: {
      handler(tableData) {
      },
      immediate: true,
      deep: true
    },*/
    /* rhythmProduction(newValue) {
      if (newValue) {
        this.getInitRhythmProduction()
      }
    },*/
    rhythmProduction: {
      handler: 'getInitRhythmProduction',
      deep: true
    },
    inventoryStatistics: {
      handler: 'getWeightData',
      deep: true
    },
    weightDataList: {
      handler: 'getWeightData',
      deep: true
    },
    prodByHourTimeList: {
      handler: 'getEchartsData',
      deep: true
    },
    lgAvgEnergyDataSon: {
      handler: 'getLgAvgEnergyDataSon',
      deep: true
    },
    menuCollapse(newValue) {
      // console.log('newValue', newValue)
      if (newValue) {
        this.getNewPosition()
      }
    }
  },
  mounted() {},
  methods: {
    //板坯、方坯、库存
    async getWeightData() {
      if (this.weightDataList && this.inventoryStatistics) {
        //板坯、方坯
        this.fromData.dateSlabsYield = this.weightDataList.dateSlabsYield
        this.fromData.lastDateSlabsYield = this.weightDataList.lastDateSlabsYield
        this.fromData.monthSlabsYield = this.weightDataList.monthSlabsYield
        this.fromData.lastMonthSlabsYield = this.weightDataList.lastMonthSlabsYield
        this.fromData.yearSlabsYield = this.weightDataList.yearSlabsYield
        this.fromData.lastYearSlabsYield = this.weightDataList.lastYearSlabsYield
        this.fromData.dateBilletYield = this.weightDataList.dateBilletYield
        this.fromData.lastDateBilletYield = this.weightDataList.lastDateBilletYield
        this.fromData.monthBilletYield = this.weightDataList.monthBilletYield
        this.fromData.lastMonthBilletYield = this.weightDataList.lastMonthBilletYield
        this.fromData.yearBilletYield = this.weightDataList.yearBilletYield
        this.fromData.lastYearBilletYield = this.weightDataList.lastYearBilletYield
        //库存统计
        this.fromData.dayTotalWet = this.inventoryStatistics.dayTotalWet
        this.fromData.dayTotalSlab = this.inventoryStatistics.dayTotalSlab
        this.fromData.monthTotalWet = this.inventoryStatistics.monthTotalWet
        this.fromData.monthTotalSlab = this.inventoryStatistics.monthTotalSlab
        this.fromData.totalWetOfInventory = this.inventoryStatistics.totalWetOfInventory
        this.fromData.totalSlabOfInventory = this.inventoryStatistics.totalSlabOfInventory
      }
    },
    //生产节奏
    async getInitRhythmProduction() {
      let yAxisData = []
      this.rhythmProduction.forEach(item => {
        yAxisData.push(item.c_stove)
      })
      this.productRhythmOption.yAxis[0].data = yAxisData
      let seriesDataAodTime = []
      let seriesDataAodTranshipment = []
      let seriesDataCcTime = []
      let seriesDataIfTime = []
      let seriesDataIfTranshipment = []
      let colorList = [
        '#5db362',
        '#ff9800',
        '#55c6d4',
        '#ff9800',
        '#ffda35',
        '#5db362',
        '#ff9800',
        '#55c6d4',
        '#ff9800',
        '#ffda35'
      ]
      this.rhythmProduction.forEach(item => {
        seriesDataAodTime.push(item.aodTime)
        seriesDataAodTranshipment.push(item.aodTranshipment)
        seriesDataCcTime.push(item.ccTime)
        seriesDataIfTime.push(item.lfTime)
        seriesDataIfTranshipment.push(item.lfTranshipment)
      })
      const seriesData = {
        AOD冶炼时长: seriesDataAodTime,
        AOD到LF转运时长: seriesDataAodTranshipment,
        LF冶炼时长: seriesDataIfTime,
        LF到连铸转运时长: seriesDataIfTranshipment,
        连铸浇铸时长: seriesDataCcTime
      }
      let index = 0 //自定义seriesData对象下标
      // 遍历 seriesData 对象
      this.productRhythmOption.series = []
      for (const [name, data] of Object.entries(seriesData)) {
        this.productRhythmOption.series.push({
          name: name,
          type: 'bar',
          stack: 'total',
          // 设置柱状图的宽度，这里固定为 20px
          barWidth: 25,
          label: {
            show: false
          },
          emphasis: {
            focus: 'series'
          },
          data: data,
          //自定义每节柱状图颜色
          itemStyle: {
            color: colorList[index]
          }
        })
        index++
      }
    },
    //机时产量
    getEchartsData() {
      let xAxisData = []
      this.prodByHourTimeList.aod.forEach(item => {
        xAxisData.push(item.staidDictText)
      })
      this.prodByHourTimeList.cc.forEach(item => {
        xAxisData.push(item.staidDictText)
      })
      let seriesData = []
      this.prodByHourTimeList.aod.forEach(item => {
        seriesData.push(item.ratio)
      })
      this.prodByHourTimeList.cc.forEach(item => {
        seriesData.push(item.ratio)
      })
      // 定义每个柱子的颜色
      var barColors = [
        '#5db362',
        '#5db362',
        '#5db362',
        '#5db362',
        '#5db362',
        '#5db362',
        '#5db362',
        '#ff9800',
        '#ff9800',
        '#ff9800',
        '#ff9800',
        '#ff9800',
        '#ff9800'
      ]

      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 30,
            data: seriesData,
            itemStyle: {
              normal: {
                color: function(params) {
                  return barColors[params.dataIndex]
                }
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
              color: '#000000'
            }
          }
        ]
      }

      this.machineRateOption = option
    },
    //吨钢消耗
    getLgAvgEnergyDataSon() {
      this.steelFrom.steelAvg = this.lgAvgEnergyDataSon.steelAvg
      this.steelFrom.oavg = this.lgAvgEnergyDataSon.oavg
      this.steelFrom.fuAvg = this.lgAvgEnergyDataSon.fuAvg
      this.steelFrom.navg = this.lgAvgEnergyDataSon.navg
      this.steelFrom.heAvg = this.lgAvgEnergyDataSon.heAvg
      this.steelFrom.arAvg = this.lgAvgEnergyDataSon.arAvg
    },
    getNewPosition() {}
  }
}
</script>

<style scoped lang="less">
.CardTable {
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  .spanHead {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 28px;
  }
  .spanHeadTwo {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 28px;
  }
}
//--------------吨钢消耗样式start
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  //position: relative;
  width: 100%;
  //background-image: url('@/assets/images/backWashProImages/tonSteelConsump.svg');
  //background-size: auto;
  //background-repeat: no-repeat;
  //background-position: center;
  max-width: 800px;
  height: 350px;
  //display: flex;
  //justify-content: center;
  //align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.data-container {
  position: relative;
  background-image: url('@/assets/images/IndonesiaImages/tonSteelConsumpt.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
}

/* 数值+单位的外层容器：固定宽度+左对齐 */
.value-wrapper {
  display: inline-block; /* 确保宽度生效 */
  width: 140px; /* 根据实际数值最长长度调整（预留足够空间） */
  text-align: left; /* 强制左对齐 */
  padding-right: 10px; /* 与标签保持间距 */
}

.data-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.data-value {
  margin-bottom: 5px;
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-label {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelFourth {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueOne {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueThree {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueLeft {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueLeftFive {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeft {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeftThree {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeftFive {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelSix {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelEnd {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelEnding {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}

.top-left {
  position: absolute;
  left: 8%;
  top: 6%;
}
.top-leftMenuCollapse {
  position: absolute;
  left: 8%;
  top: 3%;
}

.top-right {
  position: absolute;
  right: 1%;
  top: 6%;
}
.top-rightMenuCollapse {
  position: absolute;
  right: 1%;
  top: 3%;
}
.middle-left {
  position: absolute;
  left: 8%;
  top: 40%;
}

.middle-right {
  position: absolute;
  right: 1%;
  top: 40%;
}

.bottom-left {
  position: absolute;
  left: 8%;
  bottom: 20%;
}

.bottom-right {
  position: absolute;
  right: 1%;
  bottom: 20%;
}
//--------------吨钢消耗样式end
</style>
