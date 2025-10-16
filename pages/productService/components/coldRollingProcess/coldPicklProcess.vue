<template>
  <div
    class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">酸洗工序</span></div>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                :picker-options="pickerOptions"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期"
                @change="handleStartDateChange">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                :picker-options="pickerOptions"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px"
                placeholder="选择日期"
                @change="handleEndDateChange">
              </el-date-picker>
              <el-tag
                :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                type="success"
                style="padding-left: 10px;padding-right: 10px"
                @click="clickTabCurrent"><span
                  class="spanStyle">查询</span></el-tag>
            </div>
          </div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex;align-items: center">
                    <div style="display: flex">
                      <div><span class="spanHeadTwo">产量统计</span></div>
                      <div style="padding-top: 6px;padding-left: 5px">
                        <img
                          :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                          alt="产量统计">
                      </div>
                    </div>
                    <div class="progress-bar-container">
                      <div
                        :style="{width: pickMonthStatRatioSon + '%'}"
                        class="progress-bar">
                      </div>
                      <span class="progress-value">{{ pickMonthStatRatioSon }}%</span>
                    </div>
                    <div style="display: flex;align-items: center"><span class="spanHeadMin">{{ pickMonthStatWeightSon }}/{{ pickMonthStatTotalSon }}t</span></div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      popper-class="atooltip"
                      content="当月统计"
                      placement="top">
                      <img
                        :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                        style="width: 16px;height: 16px;margin-left: 8px"
                        alt="产量统计">
                    </el-tooltip>
                  </div>
                  <div style="display: flex">
                    <div style="margin-right: 10px">
                      <el-tag
                        :class="[flagOfEleDayKeyOutput ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyOutput('day')"><span class="spanStyleSwitch">日</span></el-tag>
                      <el-tag
                        :class="[flagOfEleMonthKeyOutput ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyOutput('month')"><span class="spanStyleSwitch">月</span></el-tag>
                      <el-tag
                        :class="[flagOfEleYearKeyOutput ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyOutput('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                    </div>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="outputStatOption.legend"
                    :tooltip="outputStatOption.tooltip"
                    :grid="outputStatOption.grid"
                    :x-axis="outputStatOption.xAxis"
                    :y-axis="outputStatOption.yAxis"
                    :series="outputStatOption.series"
                    :data-zoom="outputStatOption.dataZoom"
                    :_height="'330px'"
                    @chart-click-data="clickEchartFirstRate"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div><span class="spanHeadTwo">日平均厚度/速度</span></div>
                  <div style="display: flex">
                    <div style="margin-right: 10px">
                      <el-tag
                        :class="[flagOfEleDayKeyDailyAv ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyDailyAv('day')"><span class="spanStyleSwitch">日</span></el-tag>
                      <el-tag
                        :class="[flagOfEleMonthKeyDailyAv ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyDailyAv('month')"><span class="spanStyleSwitch">月</span></el-tag>
                      <el-tag
                        :class="[flagOfEleYearKeyDailyAv ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyDailyAv('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                    </div>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="rollRateOption.legend"
                    :tooltip="rollRateOption.tooltip"
                    :grid="rollRateOption.grid"
                    :x-axis="rollRateOption.xAxis"
                    :y-axis="rollRateOption.yAxis"
                    :series="rollRateOption.series"
                    :data-zoom="rollRateOption.dataZoom"
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
                  <div style="display: flex;justify-content: space-between">
                    <div style="display: flex">
                      <div><span class="spanHeadTwo">停时降速</span></div>
                      <div style="padding-top: 6px;padding-left: 5px">
                        <img
                          :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                          alt="产量统计">
                      </div>
                    </div>
                    <div style="display: flex">
                      <div style="margin-right: 10px">
                        <el-tag
                          :class="[flagOfEleDayKeyStop ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyStop('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthKeyStop ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyStop('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearKeyStop ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyStop('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                    </div>
                  </div>
                  <div style="height: 350px;padding-top: 2px">
                    <nercar-echarts
                      :legend="avgRollThickOption.legend"
                      :tooltip="avgRollThickOption.tooltip"
                      :grid="avgRollThickOption.grid"
                      :x-axis="avgRollThickOption.xAxis"
                      :y-axis="avgRollThickOption.yAxis"
                      :series="avgRollThickOption.series"
                      :data-zoom="avgRollThickOption.dataZoom"
                      :_height="'340px'"
                      @chart-click-data="clickEchart"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div><span class="spanHeadTwo">工艺速度</span></div>
                    <div style="display: flex">
                      <div style="margin-right: 10px">
                        <el-tag
                          :class="[flagOfEleDayKeySpeed ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeySpeed('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthKeySpeed ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeySpeed('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearKeySpeed ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeySpeed('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                    </div>
                  </div>
                  <div style="height: 350px;padding-top: 2px">
                    <nercar-echarts
                      ref="processSpeedChart"
                      :tooltip="processSpeedOption.tooltip"
                      :grid="processSpeedOption.grid"
                      :x-axis="processSpeedOption.xAxis"
                      :y-axis="processSpeedOption.yAxis"
                      :series="processSpeedOption.series"
                      :dataset="processSpeedOption.dataset"
                      :data-zoom="processSpeedOption.dataZoom"
                      :_height="'340px'"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div style="display: flex;justify-content: space-between">
                        <span class="spanHeadTwo">吨钢消耗</span>
                      </div>
                      <div class="container">
                        <!--                        <div
                          class="image-container"
                          style="display: flex;justify-content: center;margin-top: 30px">
                          <img
                            :src="require('@/assets/images/backWashProImages/tonSteelConsump.svg')"
                            alt="钢材图片">
                        </div>-->
                        <div class="data-container">
                          <div :class="[menuCollapse ? 'data-item top-leftMenuCollapse' : 'data-item top-left']">
                            <!-- 新增外层容器控制宽度和对齐 -->
                            <div class="value-wrapper">
                              <span class="data-valueOne">{{ consumpTonSteelValue.electricity }}</span>
                              <span class="data-valueOneUnit">kW·h/t</span>
                            </div>
                            <span class="data-labelLeft">吨钢电耗</span>
                          </div>
                          <div :class="[menuCollapse ? 'data-item top-rightMenuCollapse' : 'data-item top-right']">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.wasteWater }}</span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-label">吨钢产生废水</span>
                          </div>
                          <div class="data-item middle-left">
                            <div class="value-wrapper">
                              <span class="data-valueThree">{{ consumpTonSteelValue.coldFlow }}</span>
                              <span class="data-valueOneUnit">Nm³/t</span>
                            </div>
                            <span class="data-labelLeftThree">吨钢气耗</span>
                          </div>
                          <div class="data-item middle-right">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.nitricAcid }}</span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelFourth">吨钢硝酸消耗</span>
                          </div>
                          <div class="data-item bottom-left">
                            <div class="value-wrapper">
                              <span class="data-valueLeftFive">{{ consumpTonSteelValue.water }}</span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-labelLeftFive">吨钢水耗</span>
                          </div>
                          <div class="data-item bottom-right">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.hydrofluoricAcid }}</span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelSix">吨钢氢氟酸消耗</span>
                          </div>
                          <div class="data-item bottom-leftEnd">
                            <div class="value-wrapper">
                              <span class="data-valueLeft">{{ consumpTonSteelValue.csw01 }}</span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-labelEnd">吨钢压缩空气用量</span>
                          </div>
                          <div class="data-item bottom-rightEnd">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.liningPaper }}</span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelEnding">吨钢衬纸消耗</span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="display: flex;justify-content: space-between">
                        <div></div>
                        <div style="display: flex">
                          <div style="margin-right: 10px">
                            <el-tag
                              :class="[flagOfEleDayKeyGasEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                              type="success"
                              @click="clickTabEleKeyGasEle('day')"><span class="spanStyleSwitch">日</span></el-tag>
                            <el-tag
                              :class="[flagOfEleMonthKeyGasEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                              type="success"
                              @click="clickTabEleKeyGasEle('month')"><span class="spanStyleSwitch">月</span></el-tag>
                            <el-tag
                              :class="[flagOfEleYearKeyGasEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                              type="success"
                              @click="clickTabEleKeyGasEle('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                          </div>
                        </div>
                      </div>
                      <div style="height: 350px;padding-top: 20px">
                        <nercar-echarts
                          :legend="consumpTonSteelOption.legend"
                          :tooltip="consumpTonSteelOption.tooltip"
                          :grid="consumpTonSteelOption.grid"
                          :x-axis="consumpTonSteelOption.xAxis"
                          :y-axis="consumpTonSteelOption.yAxis"
                          :series="consumpTonSteelOption.series"
                          :data-zoom="consumpTonSteelOption.dataZoom"
                          :_height="'330px'"
                        />
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisibleFirstRate"
      title="各宽度生产总长">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFirstRateFlag"
            :legend="firstRateOption.legend"
            :tooltip="firstRateOption.tooltip"
            :grid="firstRateOption.grid"
            :x-axis="firstRateOption.xAxis"
            :y-axis="firstRateOption.yAxis"
            :series="firstRateOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="停时降速详情">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFlag"
            :legend="stopDownStatisticOption.legend"
            :tooltip="stopDownStatisticOption.tooltip"
            :grid="stopDownStatisticOption.grid"
            :x-axis="stopDownStatisticOption.xAxis"
            :y-axis="stopDownStatisticOption.yAxis"
            :series="stopDownStatisticOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import echarts from 'echarts'
import {
  getHalfYearAgoDate,
  getLastMonthDate,
  getNowDay,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import { mapState } from 'vuex'
import { post } from '@/lib/Util'
import {
  getFinishedFirstGradeRateDetail,
  getLzDownTimeDetail,
  getPicklingProdStatisticsDetail,
  getPicklingStopSlowDrill
} from '@/lib/productDataApply/coldRollingProcess'

export default {
  name: 'coldPicklProcess',
  components: { NercarEcharts },
  props: {
    pickProcessDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    avgSpeedAndThickDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    coldStopDownDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    avgPickEnergyDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    avgPickEnergyDataGasEleSon: {
      type: Array,
      default() {
        return []
      }
    },
    pickSpeedDataListSon: {
      type: Object,
      default() {
        return {}
      }
    },
    pickMonthStatWeightSon: {
      type: Number,
      default() {
        return 0
      }
    },
    pickMonthStatRatioSon: {
      type: Number,
      default() {
        return 0
      }
    },
    pickMonthStatTotalSon: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      dialogTableVisibleFirstRate: false,
      showEchartsFirstRateFlag: false,
      firstRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 'm'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false,
          selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '冶炼', icon: '' }, // 设置为线形
            { name: '等待', icon: '' },
            { name: '停时', icon: '' }
            // { name: '作业率', icon: '', show: false }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '单位：m',
            min: 0,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            scrollBar: {
              show: true, // 显示滚动条
              height: 10, // 滚动条高度
              width: 10, // 滚动条宽度
              left: '90%' // 滚动条位置
              // 其他滚动条样式和交互配置
            },
            data: [],
            // data: ['青丰板坯', '三期方坯', '三期板坯', '二期板坯', '一期板坯'],
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
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [],
            itemStyle: {
              color: '#5db362'
            }
          }
        ],
        dataZoom: [
          /* {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }*/
        ]
      },
      tapButActMonth: false,
      tapButActYear: false,
      pickerOptions: {
        disabledDate(time) {
          // 获取当前月份的最后一天
          const endOfCurrentMonth = new Date()
          endOfCurrentMonth.setMonth(endOfCurrentMonth.getMonth() + 1)
          endOfCurrentMonth.setDate(0)

          // 禁用当前月份之后的日期
          return time > endOfCurrentMonth
        }
      },
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getPreviousDate()
      },
      tapButActCurrent: false,
      showEchartsFlag: false,
      dialogTableVisible: false,
      stopDownStatisticOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 'min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false,
          // selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          // borderRadius: 3 // 设置图例标记的圆角半径
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：min',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            stack: 'total',
            barWidth: 28,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5db362'
            },
            label: {
              show: false
            },
            data: []
          }
        ]
      },
      avgRollThickOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 'min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          // borderRadius: 3 // 设置图例标记的圆角半径
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：min',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            // axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '停时',
            type: 'bar',
            stack: 'total',
            barWidth: 17,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5DB362'
            },
            label: {
              show: false
            },
            data: []
          },
          {
            name: 'SXJS',
            type: 'bar',
            stack: 'total',
            barWidth: 17,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#FF9800'
            },
            label: {
              show: false
            },
            data: []
          }
        ],
        dataZoom: []
      },
      //酸洗工序-产量统计
      flagOfEleDayKeyOutput: true,
      flagOfEleMonthKeyOutput: false,
      flagOfEleYearKeyOutput: false,
      dateTypePraKeyOutput: 'day',
      //酸洗工序-日平均厚度/速度
      flagOfEleDayKeyDailyAv: true,
      flagOfEleMonthKeyDailyAv: false,
      flagOfEleYearKeyDailyAv: false,
      dateTypePraKeyDailyAv: 'day',
      //酸洗工序-停时降速
      flagOfEleDayKeyStop: true,
      flagOfEleMonthKeyStop: false,
      flagOfEleYearKeyStop: false,
      dateTypePraKeyStop: 'day',
      //酸洗工序-工艺速度
      flagOfEleDayKeySpeed: true,
      flagOfEleMonthKeySpeed: false,
      flagOfEleYearKeySpeed: false,
      dateTypePraKeySpeed: 'day',
      //酸洗工序-吨钢气、电耗
      flagOfEleDayKeyGasEle: true,
      flagOfEleMonthKeyGasEle: false,
      flagOfEleYearKeyGasEle: false,
      dateTypePraKeyGasEle: 'day',
      outputStatOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 't'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          data: ['折算重量', '实际重量'],
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '折算重量',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#5DB362'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '实际重量',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          }
        ],
        dataZoom: []
      },
      rollRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = item.seriesName === '平均厚度' ? 'mm' : 'm/min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          data: [
            { name: '平均厚度', icon: 'line' }, // 设置为线形
            { name: '平均速度', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：mm',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '单位：m/min',
            // interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '平均厚度',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '平均速度',
            type: 'line',
            data: [30, 21, 52, 23, 64, 85, 36],
            smooth: true, // 开启平滑曲线
            yAxisIndex: 1, //另建一个Y轴维度
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      consumpTonSteelOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = item.seriesName === '吨钢气耗' ? 'Nm³/t' : 'kW·h/t'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          data: [
            { name: '吨钢气耗', icon: 'line' }, // 设置为线形
            { name: '吨钢电耗', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：Nm³/t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '单位：kW·h/t',
            // interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '吨钢气耗',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '吨钢电耗',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            yAxisIndex: 1, //另建一个Y轴维度
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      consumpTonSteelValue: {
        electricity: null,
        wasteWater: null,
        coldFlow: null,
        nitricAcid: null,
        water: null,
        hydrofluoricAcid: null,
        csw01: null,
        liningPaper: null
      },
      processSpeedOption: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let value = params.value
            let seriesName = params.name
            // 箱线图（boxplot）tooltip 格式化
            if (params.seriesType === 'boxplot') {
              return (
                '<div>' +
                seriesName +
                '</div>' +
                // 上边缘USL：数值+单位加粗
                '<div>上边缘USL: <span style="font-weight: bold;">' +
                value[1] +
                'm/min</span></div>' +
                // 上四分位数：数值+单位加粗
                '<div>上四分位数: <span style="font-weight: bold;">' +
                value[2] +
                'm/min</span></div>' +
                // 中位数：数值+单位加粗
                '<div>中位数: <span style="font-weight: bold;">' +
                value[3] +
                'm/min</span></div>' +
                // 下四分位数：数值+单位加粗
                '<div>下四分位数: <span style="font-weight: bold;">' +
                value[4] +
                'm/min</span></div>' +
                // 下边缘DSL：数值+单位加粗
                '<div>下边缘DSL: <span style="font-weight: bold;">' +
                value[5] +
                'm/min</span></div>'
              )
            }
            // 散点图（scatter）tooltip 格式化（修复原代码语法缺失，同时加粗数值）
            if (params.seriesType === 'scatter') {
              return (
                '<div style="font-size: 14px; font-weight: bold;">' +
                seriesName +
                '</div>' +
                // 异常点：数值加粗（若有单位可补充，此处按原逻辑保留）
                '<div>异常点: <span style="font-weight: bold;">' +
                value[1] +
                '</span></div>'
              )
            }
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['1号', '2号', '3号'],
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            // min: 20,
            // max: 160,
            // interval: 20,
            name: '单位：m/min',
            nameTextStyle: {
              color: '#333333' // 设置 Y 轴名称的字体颜色（这里使用深灰色）
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          }
        ],
        series: [
          {
            type: 'boxplot',
            // 设置箱线图的宽度
            boxWidth: '18',
            data: [
              // 1号数据
              [50, 55, 60, 60, 60],
              // 2号数据
              [50, 55, 55, 60, 65],
              // 3号数据
              [45, 50, 55, 55, 60]
              /*            // 4号数据
              [35, 40, 45, 50, 55],
              // 5号数据
              [30, 35, 40, 40, 45],
              // 6号数据
              [25, 30, 30, 35, 40],
              // 7号数据
              [40, 40, 45, 50, 55]*/
            ],
            itemStyle: {
              color: '#5DB362',
              borderColor: '#5DB362' // 添加这一行，设置边线颜色为绿色
            },
            boxplotItemStyle: {
              medianColor: 'transparent' // 将中位数线颜色设为透明，取消显示
            },
            emphasis: {
              itemStyle: {
                color: '#5DB362',
                borderColor: '#5DB362'
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{b}: {c}'
              }
            },
            // 新增异常值点样式设置
            outlierStyle: {
              color: '#5DB362',
              borderColor: '#5DB362',
              symbolSize: 6
            }
          }
        ],
        dataZoom: []
        /*dataset: [
          {
            // prettier-ignore
            source: [
              [30, 740, 900, 1070, 930, 850, 950],
              [960, 940, 960, 940, 880, 800, 850],
              [880, 880, 880, 860, 720, 720, 620],
              [890, 810, 810, 820, 800, 770, 760],
              [890, 840, 780, 810, 760, 810, 790]
            ]
          },
          {
            transform: {
              type: 'boxplot',
              config: { itemNameFormatter: '{value}' }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: [
          {
            left: '10%',
            right: '10%',
            bottom: '15%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            }
            // data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'km/s minus 299,000',
            splitArea: {
              show: true
            }
          }
        ],
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            datasetIndex: 1
          },
          {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2
          }
        ]*/
      }
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse'])
  },
  watch: {
    dialogTableVisible(newVal, oldVal) {
      // 普通函数，this 指向组件实例
      this.showEchartsFlag = newVal // 简化赋值逻辑
    },
    dialogTableVisibleFirstRate(newVal, oldVal) {
      this.showEchartsFirstRateFlag = newVal
    },
    pickProcessDataSon: {
      handler: 'getPickProcessDataSon',
      deep: true
    },
    avgSpeedAndThickDataSon: {
      handler: 'getAvgSpeedAndThickDataSon',
      deep: true
    },
    coldStopDownDataSon: {
      handler: 'getColdStopDownDataSon',
      deep: true
    },
    avgPickEnergyDataSon: {
      handler: 'getAvgPickEnergyDataSon',
      deep: true
    },
    avgPickEnergyDataGasEleSon: {
      handler: 'getavgPickEnergyDataGasEleSon',
      deep: true
    },
    pickSpeedDataListSon: {
      handler: 'getPickSpeedDataListSon',
      deep: true
    }
  },
  mounted() {
    this.$emit('pickProcessTimes', this.times)
    this.getTest()
  },
  methods: {
    /* -----------------------下钻功能--------------------------*/
    //产量统计
    clickEchartFirstRate(val) {
      this.dialogTableVisibleFirstRate = true

      this.getFirstRateData(val.data.name)
    },
    async getFirstRateData(accountDate) {
      const res = await post(getPicklingProdStatisticsDetail, {
        dateType: this.dateTypePraKeyOutput,
        prodTime: accountDate
      })
      if (res.success) {
        // 2. 关键步骤：处理数据并排序
        // 2.1 取data中的目标对象（若data有多个对象，可循环处理，此处按示例1个对象处理）
        const targetData = res.data[0]
        // 2.2 定义需要处理的3个字段名（明确目标字段，避免干扰其他字段）
        const lengthFields = ['length1020', 'length1250', 'length1280']

        // 2.3 将“字段名-字段值”组成数组（便于关联排序）
        const fieldValueList = lengthFields.map(fieldName => ({
          field: fieldName, // 原始字段名（如length1020）
          value: targetData[fieldName] // 字段对应的值（如0）
        }))

        // 2.4 按“字段值”从小到大排序
        const sortedList = fieldValueList.sort((a, b) => a.value - b.value)

        // 2.5 提取最终目标数组
        const sortedValueArray = sortedList.map(item => item.value) // 排序后的值数组
        const fieldSuffixArray = sortedList.map(item => item.field.slice(-4)) // 字段名后四位数组

        this.firstRateOption.yAxis[0].data = fieldSuffixArray
        this.firstRateOption.series[0].data = sortedValueArray
      }
    },
    //停时降速
    clickEchart(val) {
      this.dialogTableVisible = true

      this.getStopDownData(val.data.name)
    },
    async getStopDownData(machineTime) {
      const res = await post(getPicklingStopSlowDrill, {
        dateType: this.dateTypePraKeyStop,
        tallyDate: machineTime
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.map(item => {
          xData.push(item.stopTypeDictText)
          yData.push(item.stopHours)
        })
        this.stopDownStatisticOption.xAxis[0].data = xData
        this.stopDownStatisticOption.series[0].data = yData
      }
    },
    /* -----------------------统一处理时间--------------------------*/
    handleStartDateChange() {
      if (this.times.startDate) {
        this.times.startDate = this.formatStartDate(this.times.startDate)
      }
    },
    handleEndDateChange() {
      if (this.times.endDate) {
        this.times.endDate = this.formatEndDate(this.times.endDate)
      }
    },
    // 处理开始时间：选择月份时精确到当月第一天
    formatStartDate(monthStr) {
      if (!monthStr) return null
      // 拼接当月第一天
      return `${monthStr}-01`
    },
    // 处理结束时间：选择月份时精确到当月最后一天，若为当前月则精确到前一天
    formatEndDate(monthStr) {
      if (!monthStr) return null

      const year = parseInt(monthStr.split('-')[0])
      const month = parseInt(monthStr.split('-')[1])

      // 获取当月最后一天
      const lastDay = new Date(year, month, 0).getDate()
      const lastDayStr = `${monthStr}-${lastDay}`

      // 判断是否为当前月
      const today = new Date()
      const currentMonthStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`

      if (monthStr === currentMonthStr) {
        // 是当前月，返回昨天
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        return `${yesterday.getFullYear()}-${String(
          yesterday.getMonth() + 1
        ).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
      } else {
        // 非当前月，返回当月最后一天
        return lastDayStr
      }
    },
    /* -------------------------------------------------*/
    clickTabCurrent() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      this.$emit('pickProcessTimes', this.times)
    },
    //产量统计
    clickTabEleKeyOutput(params) {
      if (params === 'day') {
        this.flagOfEleDayKeyOutput = true
        this.flagOfEleMonthKeyOutput = false
        this.flagOfEleYearKeyOutput = false
      } else if (params === 'month') {
        this.flagOfEleDayKeyOutput = false
        this.flagOfEleMonthKeyOutput = true
        this.flagOfEleYearKeyOutput = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyOutput = false
        this.flagOfEleMonthKeyOutput = false
        this.flagOfEleYearKeyOutput = true
      }
      this.dateTypePraKeyOutput = params
      this.$emit('threeShowOutput', this.dateTypePraKeyOutput)
    },
    getPickProcessDataSon() {
      let xData = []
      let outWegtData = []
      let convertWegtData = []
      this.pickProcessDataSon.forEach(item => {
        xData.push(item.prodTime)
        outWegtData.push(Number(item.outWegt).toFixed(2))
        convertWegtData.push(Number(item.convertWegt).toFixed(2))
      })
      this.outputStatOption.xAxis[0].data = xData
      this.outputStatOption.series[0].data = convertWegtData
      this.outputStatOption.series[1].data = outWegtData
      this.outputStatOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 7) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //日平均厚度/速度
    clickTabEleKeyDailyAv(params) {
      this.rollRateOption.xAxis[0].data = []

      if (params === 'day') {
        this.flagOfEleDayKeyDailyAv = true
        this.flagOfEleMonthKeyDailyAv = false
        this.flagOfEleYearKeyDailyAv = false
        this.rollRateOption.series[0].type = 'line'
        this.rollRateOption.series[1].type = 'line'
        this.rollRateOption.legend = {
          top: '1%',
          data: [
            { name: '平均厚度', icon: 'line' }, // 设置为线形
            { name: '平均速度', icon: 'line' }
          ]
        }
      } else if (params === 'month') {
        this.flagOfEleDayKeyDailyAv = false
        this.flagOfEleMonthKeyDailyAv = true
        this.flagOfEleYearKeyDailyAv = false
        this.rollRateOption.series[0].type = 'line'
        this.rollRateOption.series[1].type = 'line'
        this.rollRateOption.legend = {
          top: '1%',
          data: [
            { name: '平均厚度', icon: 'line' }, // 设置为线形
            { name: '平均速度', icon: 'line' }
          ]
        }
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyDailyAv = false
        this.flagOfEleMonthKeyDailyAv = false
        this.flagOfEleYearKeyDailyAv = true
        this.rollRateOption.series[0].type = 'bar'
        this.rollRateOption.series[1].type = 'bar'
        this.rollRateOption.series[0].barWidth = 13
        this.rollRateOption.series[1].barWidth = 13
        this.rollRateOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '平均厚度', icon: 'bar' }, // 设置为线形
            { name: '平均速度', icon: 'bar' }
          ]
        }
      }
      this.dateTypePraKeyDailyAv = params
      this.$emit('threeShowDailyAv', this.dateTypePraKeyDailyAv)
    },
    getAvgSpeedAndThickDataSon() {
      this.rollRateOption.xAxis[0].data = []

      this.rollRateOption.series[0].data = this.avgSpeedAndThickDataSon.thick.map(
        item => Number(item.avgThick).toFixed(2)
      )
      this.rollRateOption.series[1].data = this.avgSpeedAndThickDataSon.speed.map(
        item => Number(item.avgSpeed).toFixed(2)
      )

      let xDataList = this.avgSpeedAndThickDataSon.speed.map(
        item => item.prodTime
      )
      this.rollRateOption.xAxis[0].data = xDataList
      this.rollRateOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(
            0,
            ((xDataList.length - 30) / xDataList.length) * 100
          ), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //停时降速
    clickTabEleKeyStop(params) {
      if (params === 'day') {
        this.flagOfEleDayKeyStop = true
        this.flagOfEleMonthKeyStop = false
        this.flagOfEleYearKeyStop = false
      } else if (params === 'month') {
        this.flagOfEleDayKeyStop = false
        this.flagOfEleMonthKeyStop = true
        this.flagOfEleYearKeyStop = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyStop = false
        this.flagOfEleMonthKeyStop = false
        this.flagOfEleYearKeyStop = true
      }
      this.dateTypePraKeyStop = params
      this.$emit('threeShowStop', this.dateTypePraKeyStop)
    },
    getColdStopDownDataSon() {
      let xData = []
      let stopHoursSXJS = []
      let stopHours21 = []
      this.coldStopDownDataSon.forEach(item => {
        if (item.machineCode === 'SXJS') {
          stopHoursSXJS.push(item.stopHours)
          xData.push(item.tallyDate)
        }
        if (item.machineCode === '21') {
          stopHours21.push(item.stopHours)
        }
      })
      this.avgRollThickOption.xAxis[0].data = xData
      this.avgRollThickOption.series[0].data = stopHours21
      this.avgRollThickOption.series[1].data = stopHoursSXJS
      this.avgRollThickOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 12) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //吨钢气、电耗
    clickTabEleKeyGasEle(params) {
      this.consumpTonSteelOption.xAxis[0].data = []

      if (params === 'day') {
        this.flagOfEleDayKeyGasEle = true
        this.flagOfEleMonthKeyGasEle = false
        this.flagOfEleYearKeyGasEle = false
        this.consumpTonSteelOption.series[0].type = 'line'
        this.consumpTonSteelOption.series[1].type = 'line'
        this.consumpTonSteelOption.legend = {
          top: '1%',
          data: [
            { name: '吨钢气耗', icon: 'line' }, // 设置为线形
            { name: '吨钢电耗', icon: 'line' }
          ]
        }
      } else if (params === 'month') {
        this.flagOfEleDayKeyGasEle = false
        this.flagOfEleMonthKeyGasEle = true
        this.flagOfEleYearKeyGasEle = false
        this.consumpTonSteelOption.series[0].type = 'line'
        this.consumpTonSteelOption.series[1].type = 'line'
        this.consumpTonSteelOption.legend = {
          top: '1%',
          data: [
            { name: '吨钢气耗', icon: 'line' }, // 设置为线形
            { name: '吨钢电耗', icon: 'line' }
          ]
        }
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyGasEle = false
        this.flagOfEleMonthKeyGasEle = false
        this.flagOfEleYearKeyGasEle = true
        this.consumpTonSteelOption.series[0].type = 'bar'
        this.consumpTonSteelOption.series[1].type = 'bar'
        this.consumpTonSteelOption.series[0].barWidth = 13
        this.consumpTonSteelOption.series[1].barWidth = 13
        this.consumpTonSteelOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '吨钢气耗', icon: '' }, // 设置为线形
            { name: '吨钢电耗', icon: '' }
          ]
        }
      }
      this.dateTypePraKeyGasEle = params
      this.$emit('threeShowGasEle', this.dateTypePraKeyGasEle)
    },
    getavgPickEnergyDataGasEleSon() {
      let xData = []
      let coldFlowRatioData = []
      let electricityRatioData = []
      this.avgPickEnergyDataGasEleSon.forEach(item => {
        xData.push(item.amountDate)
        coldFlowRatioData.push(Number(item.coldFlowRatio).toFixed(2))
        electricityRatioData.push(Number(item.electricityRatio).toFixed(2))
      })
      this.consumpTonSteelOption.xAxis[0].data = xData
      this.consumpTonSteelOption.series[0].data = coldFlowRatioData
      this.consumpTonSteelOption.series[1].data = electricityRatioData
      this.consumpTonSteelOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //吨钢消耗
    getAvgPickEnergyDataSon() {
      this.consumpTonSteelValue.electricity = Number(
        this.avgPickEnergyDataSon[0].electricityRatio
      ).toFixed(2)
      this.consumpTonSteelValue.wasteWater = Number(
        this.avgPickEnergyDataSon[0].wasteWaterRatio
      ).toFixed(2)
      this.consumpTonSteelValue.coldFlow = Number(
        this.avgPickEnergyDataSon[0].coldFlowRatio
      ).toFixed(2)
      this.consumpTonSteelValue.nitricAcid = Number(
        this.avgPickEnergyDataSon[0].nitricAcidRatio
      ).toFixed(2)
      this.consumpTonSteelValue.water = Number(
        this.avgPickEnergyDataSon[0].waterRatio
      ).toFixed(2)
      this.consumpTonSteelValue.hydrofluoricAcid = Number(
        this.avgPickEnergyDataSon[0].hydrofluoricAcidRatio
      ).toFixed(2)
      this.consumpTonSteelValue.csw01 = Number(
        this.avgPickEnergyDataSon[0].csw01Ratio
      ).toFixed(2)
      this.consumpTonSteelValue.liningPaper = Number(
        this.avgPickEnergyDataSon[0].liningPaperRatio
      ).toFixed(2)
    },
    getTest() {
      // 测试数组
      let arr1 = [[1, 2, 3], [1], [2, 3, 4], []]
      let arr2 = this.transformArray(arr1)
      // console.log('测试', arr2)
    },
    transformArray(arr1) {
      // 找出 arr1 中元素数组的最大长度
      let maxLength = 0
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].length > maxLength) {
          maxLength = arr1[i].length
        }
      }

      // 初始化结果数组
      let arr2 = []
      for (let i = 0; i < maxLength; i++) {
        arr2[i] = []
        for (let j = 0; j < arr1.length; j++) {
          // 如果当前元素数组有对应位置的元素，则取该元素，否则补 0
          arr2[i][j] = arr1[j][i] || null
        }
      }

      return arr2
    },
    //工艺速度
    clickTabEleKeySpeed(params) {
      if (params === 'day') {
        this.flagOfEleDayKeySpeed = true
        this.flagOfEleMonthKeySpeed = false
        this.flagOfEleYearKeySpeed = false
      } else if (params === 'month') {
        this.flagOfEleDayKeySpeed = false
        this.flagOfEleMonthKeySpeed = true
        this.flagOfEleYearKeySpeed = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeySpeed = false
        this.flagOfEleMonthKeySpeed = false
        this.flagOfEleYearKeySpeed = true
      }
      this.dateTypePraKeySpeed = params
      this.$emit('threeShowSpeed', this.dateTypePraKeySpeed)
    },
    getPickSpeedDataListSon() {
      //将返回的二维数组中的字符串值转成Number类型的数值
      const resultY1 = this.pickSpeedDataListSon.y1.map(subArray =>
        subArray.map(Number)
      )
      const resultBoxplot = this.prepareBoxplotData(resultY1)
      // console.log('五个特征值', resultBoxplot.boxData)
      // console.log('异常点', JSON.stringify(resultBoxplot.outliers))
      // console.log('min, Q1, Q2, Q3, max', resultBoxplot.boxData)
      // console.log('xxxx', this.pickSpeedDataListSon.x)
      //计算出异常点需要的格式resultUtliers
      const maxIndex = Math.max(
        ...resultBoxplot.outliers.map(subArr => subArr[0])
      )
      const resultUtliers = Array.from({ length: maxIndex + 1 }, () => [])

      resultBoxplot.outliers.forEach(subArr => {
        const index = subArr[0]
        const values = subArr.slice(1)
        resultUtliers[index] = values
      })
      //横坐标
      this.processSpeedOption.xAxis[0].data = this.pickSpeedDataListSon.x
      //纵坐标的值min, Q1, Q2, Q3, max
      this.processSpeedOption.series[0].data = resultBoxplot.boxData
      //设置异常点,转为最终赋值异常点的数据格式
      let OutliersArrays = this.mergeOutliersArrays(
        resultBoxplot.outliers,
        this.pickSpeedDataListSon.x.length
      )
      // console.log('OutliersArrays', OutliersArrays)
      //防止重复异常点，删除每次调用不同钢板号之前异常的数据
      this.processSpeedOption.series.splice(1)
      OutliersArrays.forEach(item => {
        this.processSpeedOption.series.push({
          name: '',
          type: 'scatter',
          symbolSize: 5,
          data: item,
          itemStyle: {
            //异常点（空心）
            color: 'transparent',
            borderColor: '#5DB362',
            borderWidth: 1
          },
          label: {
            show: false
          }
        })
      })
      //设置zoom
      this.processSpeedOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(
            0,
            ((this.pickSpeedDataListSon.x.length - 12) /
              this.pickSpeedDataListSon.x.length) *
              100
          ), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          // start: 0,
          // end: (13 / this.pickSpeedDataListSon.x.length) * 100 // 初始显示前 13 条数据
        }
      ]
      // 手动更新 ECharts 实例
      this.$nextTick(() => {
        if (this.$refs.processSpeedChart) {
          this.$refs.processSpeedChart.updateOption(
            this.processSpeedOption,
            true
          )
        }
      })
    },
    //计算以X轴为维度，每个X轴刻度的异常点数据
    mergeOutliersArrays(arr, xLength) {
      const result = []
      const map = new Map()

      for (const subArr of arr) {
        const key = subArr[0]
        if (map.has(key)) {
          const currentGroup = map.get(key)
          let found = false
          for (let i = 0; i < currentGroup.length; i++) {
            if (
              currentGroup[i][0] === subArr[0] &&
              currentGroup[i][1] === subArr[1]
            ) {
              found = true
              break
            }
          }
          if (!found) {
            currentGroup.push(subArr)
          }
        } else {
          map.set(key, [subArr])
        }
      }

      for (let i = 1; i <= xLength; i++) {
        result.push(map.get(i) || [])
      }

      return result
    },
    //计算min, Q1, Q2, Q3, max、异常点
    prepareBoxplotData(rawData) {
      const boxData = []
      const outliers = []
      const axisData = []
      let outliersList = null

      rawData.forEach((arr, idx) => {
        const data = arr.slice().sort((a, b) => a - b)
        const Q1 = this.quantile(data, 0.25)
        const Q2 = this.quantile(data, 0.5) // 中位数
        const Q3 = this.quantile(data, 0.75)
        const IQR = Q3 - Q1
        const lowerFence = Q1 - 1.5 * IQR
        const upperFence = Q3 + 1.5 * IQR

        const validData = data.filter(v => v >= lowerFence && v <= upperFence)
        const min = validData[0]
        const max = validData[validData.length - 1]

        boxData.push([max, Q3, Q2, Q1, min])
        axisData.push(`类目${idx}`)

        data.forEach((v, i) => {
          if (v < lowerFence || v > upperFence) {
            outliers.push([idx, v])
          }
        })
      })

      return {
        boxData, // 每组的 [max, Q3, Q2, Q1, min]
        outliers, // 所有的异常点
        axisData // 横坐标分类
      }
    },
    quantile(arr, p) {
      const pos = (arr.length - 1) * p
      const base = Math.floor(pos)
      const rest = pos - base
      if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base])
      } else {
        return arr[base]
      }
    }
  }
}
</script>

<style>
/* 整体 tooltip 样式 */
.atooltip {
  background: #e0ebe1 !important;
  color: black !important; /* 设置 tooltip 文字颜色为黑色 */
}

/* 顶部放置的 tooltip 箭头样式 */
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow,
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::before {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
}

.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow {
  bottom: -8px; /* 调整箭头位置 */
  margin-left: -8px;
  border-width: 8px 8px 0 8px;
  border-top-color: #e0ebe1;
  z-index: 1;
}

.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::before {
  content: '';
  bottom: 1px;
  margin-left: -8px;
  border-width: 8px 8px 0 8px;
  border-top-color: #e0ebe1;
}

/* 去除原有的伪元素样式 */
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
  content: none;
}
</style>

<style scoped lang="less">
.contentBox {
  margin-top: 16px;
}
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
.datePickerLable {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
.tagStyle {
  background-color: #ebf6ec;
  cursor: pointer;
  margin-left: 24px;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActive {
  background-color: #35a034;
  margin-left: 24px;
  .spanStyle {
    color: #ffffff;
  }
}
//时间组件样式
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  //border: 1px solid #d5ddd5;
  box-sizing: border-box;
  color: #2e382e;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  width: 150px;
  line-height: 28px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 31px;
}
/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #d5ddd5;
}
//进度条
.progress-bar-container {
  width: 110px; /* 可按需调整进度条容器宽度 */
  height: 18px; /* 可按需调整进度条容器高度 */
  background-color: #e0ebe1; /* 浅灰色背景 */
  border-radius: 5px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
  margin-left: 24px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #c8e6c9, #4caf50); /* 绿色进度条颜色 */
  display: flex;
  align-items: center;
  justify-content: right;
  color: black;
  border-radius: 5px;
  font-size: 20px; /* 可按需调整文字大小 */
  transition: width 0.5s ease; /* 过渡效果，让进度条变化更平滑 */
}

.progress-value {
  text-align: center;
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  //进度条内文字按最外层父元素居中展示
  position: absolute;
  left: 32%;
  top: 50%;
  transform: translateY(-50%);
}
//--进度条后文字
.spanHeadMin {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  margin-left: 8px;
  text-align: center;
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

/* 数值+单位的外层容器：固定宽度+左对齐 */
.value-wrapper {
  display: inline-block; /* 确保宽度生效 */
  width: 140px; /* 根据实际数值最长长度调整（预留足够空间） */
  text-align: left; /* 强制左对齐 */
  padding-right: 10px; /* 与标签保持间距 */
}

.data-container {
  position: relative;
  background-image: url('@/assets/images/coldProductImages/tonSteelConsump.svg');
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

.data-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.data-value {
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
  top: 26%;
}

.middle-right {
  position: absolute;
  right: 1%;
  top: 26%;
}

.bottom-left {
  position: absolute;
  left: 8%;
  bottom: 40%;
}

.bottom-right {
  position: absolute;
  right: 1%;
  bottom: 40%;
}

.bottom-leftEnd {
  position: absolute;
  left: 8%;
  bottom: 20%;
}

.bottom-rightEnd {
  position: absolute;
  right: 1%;
  bottom: 20%;
}
.data-valueOneUnit {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
//切换按钮
.tagStyleSwitch {
  background-color: #ebf6ec;
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
/* 消除dialog内部卡片的默认margin/padding导致的间隙 */
::v-deep .el-dialog__body {
  padding: 0 !important; /* 移除对话框内容区默认内边距 */
  margin: 0 !important;
}

/* 确保卡片与对话框边缘无缝衔接 */
::v-deep .el-dialog .CardTable {
  border-radius: 0 !important; /* 可选：如需去除卡片圆角与对话框的间隙 */
  margin: 0 !important;
  border: none !important; /* 如卡片有边框可移除 */
}

/* 调整对话框样式 - 增加圆角并消除默认间隙 */
::v-deep .el-dialog {
  padding: 0 !important;
  border-radius: 8px !important; /* 设置四个角为圆角，数值可根据需要调整 */
  overflow: hidden; /* 防止内部内容溢出圆角范围 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; /* 添加阴影效果 */
}

/* 如需调整对话框头部和底部的圆角适配 */
::v-deep .el-dialog__header {
  border-radius: 8px 8px 0 0 !important; /* 仅顶部两角圆角 */
}

::v-deep .el-dialog__footer {
  border-radius: 0 0 8px 8px !important; /* 仅底部两角圆角 */
}
//使用图标路径引入
::v-deep .el-dialog__headerbtn .el-dialog__close {
  /* 移除默认图标 */
  font-size: 0 !important;

  /* 增大按钮容器尺寸（为图标提供更大空间） */
  width: 25px; /* 调大宽度 */
  height: 25px; /* 调大高度 */

  /* 控制图标大小：值越大图标越大（可超过100%） */
  background-size: 9px; /* 直接指定图标像素尺寸 */
  /* 或使用百分比：background-size: 80%; */

  /* 保持圆形边框（如果需要） */
  //border: 2px solid #e0e0e0;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 背景图方式引入图标 */
  background: url('../../../../assets/images/coldRollingProcess/close.svg')
    no-repeat center;
  background-size: contain;
}
</style>
