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
            <div><span class="spanHead">轧制工序</span></div>
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
                        :style="{ width: rollMonthStatRatioSon + '%' }"
                        class="progress-bar">
                      </div>
                      <span class="progress-value">{{ rollMonthStatRatioSon }}%</span>
                    </div>
                    <div style="display: flex;align-items: center"><span class="spanHeadMin">{{ rollMonthStatWeightSon }}/{{ rollMonthStatTotalSon }}t</span></div>
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
                        :class="[flagOfEleDayKeyPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyPro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                      <el-tag
                        :class="[flagOfEleMonthKeyPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyPro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                      <el-tag
                        :class="[flagOfEleYearKeyPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyPro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                    </div>
                    <div>
                      <span class="selectSpan">维度</span>
                      <el-select
                        v-model="proParamData.realValue"
                        popper-class="custom-select-dropdown"
                        placeholder="请选择"
                        @change="changeProParam">
                        <el-option
                          v-for="item in proParamOptions"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
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
                    @chart-click-data="clickEchart"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div><span class="spanHeadTwo">轧机作业率</span></div>
                  <div style="display: flex">
                    <div style="margin-right: 10px">
                      <el-tag
                        :class="[flagOfEleDayKeyRate ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyRate('day')"><span class="spanStyleSwitch">日</span></el-tag>
                      <el-tag
                        :class="[flagOfEleMonthKeyRate ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyRate('month')"><span class="spanStyleSwitch">月</span></el-tag>
                      <el-tag
                        :class="[flagOfEleYearKeyRate ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEleKeyRate('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
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
                    <div><span class="spanHeadTwo">轧机平均厚度</span></div>
                    <div style="display: flex">
                      <div style="margin-right: 10px">
                        <el-tag
                          :class="[flagOfEleDayKeyThick ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyThick('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthKeyThick ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyThick('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearKeyThick ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyThick('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
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
                    <span class="spanHeadTwo">轧制电耗</span>
                    <div style="display: flex">
                      <div style="margin-right: 10px">
                        <el-tag
                          :class="[flagOfEleDayKeyEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyEle('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthKeyEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyEle('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearKeyEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleKeyEle('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                      <div>
                        <span class="selectSpan">维度</span>
                        <el-select
                          v-model="proParamData.consumeValue"
                          popper-class="custom-select-dropdown"
                          placeholder="请选择"
                          @change="changeProEle">
                          <el-option
                            v-for="item in proEleOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <!--                    <div>
                      <el-tag
                        :class="[flagOfEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                        type="success"
                        @click="clickTabEle(1)"><span class="spanStyleSwitch">吨钢电耗</span></el-tag>
                      <el-tag
                        :class="[flagOfEle ?'tagStyleSwitch':'tagStyleActiveSwitch']"
                        type="success"
                        @click="clickTabEle(0)"><span class="spanStyleSwitch">单卷电耗</span></el-tag>
                    </div>-->
                  </div>
                  <div style="height: 350px;padding-top: 2px">
                    <nercar-echarts
                      :legend="eleConsumpSteelOption.legend"
                      :tooltip="eleConsumpSteelOption.tooltip"
                      :grid="eleConsumpSteelOption.grid"
                      :x-axis="eleConsumpSteelOption.xAxis"
                      :y-axis="eleConsumpSteelOption.yAxis"
                      :series="eleConsumpSteelOption.series"
                      :data-zoom="eleConsumpSteelOption.dataZoom"
                      :_height="'340px'"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="各牌号产量统计">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFlag"
            :legend="outputStatDiaOption.legend"
            :tooltip="outputStatDiaOption.tooltip"
            :grid="outputStatDiaOption.grid"
            :x-axis="outputStatDiaOption.xAxis"
            :y-axis="outputStatDiaOption.yAxis"
            :series="outputStatDiaOption.series"
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
import { post } from '@/lib/Util'
import {
  getLzDownTimeDetail,
  getRollingProdStatisticsDetail
} from '@/lib/productDataApply/coldRollingProcess'

export default {
  name: 'coldRollProcess',
  components: { NercarEcharts },
  props: {
    avgRollThickDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    rollPreparatDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    rollProductCountDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    avgElecOfSteelDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    rollMonthStatWeightSon: {
      type: Number,
      default() {
        return 0
      }
    },
    rollMonthStatRatioSon: {
      type: Number,
      default() {
        return 0
      }
    },
    rollMonthStatTotalSon: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      //轧制工序-产量统计
      flagOfEleDayKeyPro: true,
      flagOfEleMonthKeyPro: false,
      flagOfEleYearKeyPro: false,
      dateTypePraKeyPro: 'day',
      proParamOptions: [
        {
          code: '1',
          text: '实际产量'
        },
        {
          code: '2',
          text: '折算产量'
        }
      ],
      proParamData: {
        realValue: '1', //产量统计-实际产量
        consumeValue: 1 //轧制电耗-吨钢电耗
      },
      //轧制工序-轧制电耗
      flagOfEleDayKeyEle: true,
      flagOfEleMonthKeyEle: false,
      flagOfEleYearKeyEle: false,
      dateTypePraKeyEle: 'day',
      proEleOptions: [
        {
          code: 1,
          text: '吨钢电耗'
        },
        {
          code: 0,
          text: '单卷电耗'
        }
      ],
      tapButActReal: true,
      tapButActConvert: false,
      //轧制工序-轧机作业率
      flagOfEleDayKeyRate: true,
      flagOfEleMonthKeyRate: false,
      flagOfEleYearKeyRate: false,
      dateTypePraKeyRate: 'day',
      //轧制工序-轧机平均厚度thick
      flagOfEleDayKeyThick: true,
      flagOfEleMonthKeyThick: false,
      flagOfEleYearKeyThick: false,
      dateTypePraKeyThick: 'day',
      //轧制工序-总体时间
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getPreviousDate()
      },
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
      tapButActCurrent: false,
      avgRollThickOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          top: '1%',
          data: [
            { name: '平均厚度', icon: 'line' }, // 设置为线形
            {
              name: '1#轧机',
              icon: 'circle',
              itemStyle: {
                symbolSize: 10 // 缩小点的大小
              }
            },
            { name: '2#轧机', icon: 'circle' }, // 设置为点状
            { name: '3#轧机', icon: 'circle' } // 设置为点状
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
                // color: '#ababab' // 这里设置为红色，可替换为你想要的颜色值，如十六进制颜色码、RGB 值等
              }
            },
            axisLabel: {
              textStyle: {
                // color: '#848484' // 设置刻度标签(数值背景)颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: false // 确保 y 轴维度值显示
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
              color: '#75bd42'
            }
          },
          {
            name: '1#轧机',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#4874cb'
            }
          },
          {
            name: '2#轧机',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#ee822f'
            }
          },
          {
            name: '3#轧机',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#f2ba02'
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
      eleConsumpSteelOption: {
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
              const unit = 'kW·h/t'
              const valueResult =
                item.seriesName === '日吨钢电耗' ? item.value : item.value

              result += `${item.marker}${
                item.seriesName
              }: <strong>${valueResult}${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          // data: ['日吨钢电耗', '1#吨钢耗电', '2#吨钢耗电', '3#吨钢耗电'],
          data: [
            { name: '日吨钢电耗', icon: 'line' }, // 设置为线形
            {
              name: '1#吨钢耗电',
              icon: 'circle',
              itemStyle: {
                symbolSize: 10 // 缩小点的大小
              }
            },
            { name: '2#吨钢电耗', icon: 'circle' }, // 设置为点状
            { name: '3#吨钢电耗', icon: 'circle' } // 设置为点状
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
                // color: '#ababab' // 这里设置为红色，可替换为你想要的颜色值，如十六进制颜色码、RGB 值等
              }
            },
            axisLabel: {
              textStyle: {
                // color: '#848484' // 设置刻度标签(数值背景)颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：kW·h/t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '日吨钢电耗',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#A146B0'
            }
          },
          {
            name: '1#吨钢耗电',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '2#吨钢耗电',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '3#吨钢耗电',
            type: 'scatter',
            data: [],
            itemStyle: {
              color: '#F45549'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 66, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      showEchartsFlag: false,
      dialogTableVisible: false,
      outputStatDiaOption: {
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
          // data: ['1#轧机', '2#轧机', '3#轧机', '目标产量'],
          formatter: function(name) {
            // 自定义图例 HTML
            if (name === '目标产量') {
              return `— —${name}`
            } else {
              // 其他图例默认显示
              return name
            }
          },
          data: [
            { name: '1#轧机', icon: '' },
            {
              name: '2#轧机',
              icon: ''
            },
            { name: '3#轧机', icon: '' },
            {
              name: '目标产量',
              icon: 'none',
              lineStyle: {
                show: true,
                type: 'dashed',
                width: 2,
                color: '#777'
              }
            } // 设置为线点型
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
            name: '1#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#5db362'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '2#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#ff9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '3#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#55c6d4'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          }
        ],
        dataZoom: []
      },
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
          // data: ['1#轧机', '2#轧机', '3#轧机', '目标产量'],
          formatter: function(name) {
            // 自定义图例 HTML
            if (name === '目标产量') {
              return `— —${name}`
            } else {
              // 其他图例默认显示
              return name
            }
          },
          data: [
            { name: '1#轧机', icon: '' },
            {
              name: '2#轧机',
              icon: ''
            },
            { name: '3#轧机', icon: '' },
            {
              name: '目标产量',
              icon: 'none',
              lineStyle: {
                show: true,
                type: 'dashed',
                width: 2,
                color: '#777'
              }
            } // 设置为线点型
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
            name: '1#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#5DB362'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '2#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '3#轧机',
            type: 'bar',
            data: [],
            barWidth: 15,
            itemStyle: {
              color: '#F45549'
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
              const unit = '%'
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
            { name: '1#作业率', icon: 'line' }, // 设置为线形
            { name: '2#作业率', icon: 'line' },
            { name: '3#作业率', icon: 'line' }
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
            data: [20, 21, 22, 23, 24, 25, 26],
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#作业率',
            type: 'line',
            data: [20, 21, 22, 23, 24, 25, 26],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '2#作业率',
            type: 'line',
            data: [30, 21, 52, 23, 64, 85, 36],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '3#作业率',
            type: 'line',
            data: [40, 51, 62, 73, 44, 85, 36],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#F45549'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 76, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      flagOfEle: 1
    }
  },
  watch: {
    dialogTableVisible(newVal, oldVal) {
      // 普通函数，this 指向组件实例
      this.showEchartsFlag = newVal // 简化赋值逻辑
    },
    avgRollThickDataSon: {
      handler: 'getAvgRollThickDataSon',
      deep: true
    },
    rollPreparatDataSon: {
      handler: 'getRollPreparatDataSon',
      deep: true
    },
    rollProductCountDataSon: {
      handler: 'getRollProductCountDataSon',
      deep: true
    },
    avgElecOfSteelDataSon: {
      handler: 'getAvgElecOfSteelDataSon',
      deep: true
    }
  },
  mounted() {
    this.$emit('rollProcessTimesTwo', this.times)
  },
  methods: {
    /* -----------------------下钻功能--------------------------*/
    clickEchart(val) {
      this.dialogTableVisible = true

      this.getOutPutData(val.data.name)
    },
    async getOutPutData(prodTime) {
      const res = await post(getRollingProdStatisticsDetail, {
        dateType: this.dateTypePraKeyPro,
        prodTime: prodTime
      })
      if (res.success) {
        let outWegtDataOne = []
        let convertWegtDataOne = []
        let xData = []
        let outWegtDataTwo = []
        let convertWegtDataTwo = []
        let outWegtDataThree = []
        let convertWegtDataThree = []
        res.data.forEach(item => {
          if (item['frame'] === '1#轧机') {
            outWegtDataOne.push(Number(item.outWegt).toFixed(2))
            convertWegtDataOne.push(Number(item.convertWegt).toFixed(2))
            xData.push(item.steelGradeDictText)
          }
          if (item['frame'] === '2#轧机') {
            outWegtDataTwo.push(Number(item.outWegt).toFixed(2))
            convertWegtDataTwo.push(Number(item.convertWegt).toFixed(2))
          }
          if (item['frame'] === '3#轧机') {
            outWegtDataThree.push(Number(item.outWegt).toFixed(2))
            convertWegtDataThree.push(Number(item.convertWegt).toFixed(2))
          }
        })
        this.outputStatDiaOption.xAxis[0].data = []
        this.outputStatDiaOption.series[0].data = []
        this.outputStatDiaOption.series[1].data = []
        this.outputStatDiaOption.series[2].data = []
        if (this.tapButActReal) {
          this.outputStatDiaOption.xAxis[0].data = xData
          this.outputStatDiaOption.series[0].data = outWegtDataOne
          this.outputStatDiaOption.series[1].data = outWegtDataTwo
          this.outputStatDiaOption.series[2].data = outWegtDataThree
        }
        if (this.tapButActConvert) {
          this.outputStatDiaOption.xAxis[0].data = xData
          this.outputStatDiaOption.series[0].data = convertWegtDataOne
          this.outputStatDiaOption.series[1].data = convertWegtDataTwo
          this.outputStatDiaOption.series[2].data = convertWegtDataThree
        }
        this.outputStatDiaOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
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
      this.$emit('rollProcessTimesTwo', this.times)
    },
    //轧机平均厚度
    clickTabEleKeyThick(params) {
      if (params === 'day') {
        this.flagOfEleDayKeyThick = true
        this.flagOfEleMonthKeyThick = false
        this.flagOfEleYearKeyThick = false
      } else if (params === 'month') {
        this.flagOfEleDayKeyThick = false
        this.flagOfEleMonthKeyThick = true
        this.flagOfEleYearKeyThick = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyThick = false
        this.flagOfEleMonthKeyThick = false
        this.flagOfEleYearKeyThick = true
      }
      this.dateTypePraKeyThick = params
      this.$emit('threeShowThick', this.dateTypePraKeyThick)
    },
    getAvgRollThickDataSon() {
      let xAxisData = this.avgRollThickDataSon.xDataTime
      let avgThicknessData = this.avgRollThickDataSon.avgValue
      avgThicknessData = avgThicknessData.map(item => Number(item).toFixed(2))
      let mill1Data = this.avgRollThickDataSon.oneRoll
      mill1Data = mill1Data.map(item => Number(item).toFixed(2))
      let mill2Data = this.avgRollThickDataSon.twoRoll
      mill2Data = mill2Data.map(item => Number(item).toFixed(2))
      let mill3Data = this.avgRollThickDataSon.threeRoll
      mill3Data = mill3Data.map(item => Number(item).toFixed(2))

      // 配置项
      this.avgRollThickOption = {
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
              const unit = 'mm'
              const valueResult =
                item.seriesName === '平均厚度' ? item.value : item.value[1]

              result += `${item.marker}${
                item.seriesName
              }: <strong>${valueResult}${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          // data: ['平均厚度', '1#轧机', '2#轧机', '3#轧机'],
          // icon: 'line'
          data: [
            { name: '平均厚度', icon: 'line' }, // 设置为线形
            {
              name: '1#轧机',
              icon: 'circle',
              itemStyle: {
                symbolSize: 10 // 缩小点的大小
              }
            },
            { name: '2#轧机', icon: 'circle' }, // 设置为点状
            { name: '3#轧机', icon: 'circle' } // 设置为点状
          ]
        },
        grid: [
          {
            left: '4%',
            right: '8%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // 这里设置为红色，可替换为你想要的颜色值，如十六进制颜色码、RGB 值等
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333333' // 设置刻度标签(数值)颜色
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
          }
        ],
        series: [
          {
            name: '平均厚度',
            type: 'line',
            data: avgThicknessData,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#A146B0'
            }
          },
          {
            name: '1#轧机',
            type: 'scatter',
            data: mill1Data.map((value, index) => [
              this.avgRollThickDataSon.xDataTime[index],
              value
            ]),
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '2#轧机',
            type: 'scatter',
            data: mill2Data.map((value, index) => [
              this.avgRollThickDataSon.xDataTime[index],
              value
            ]),
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '3#轧机',
            type: 'scatter',
            data: mill3Data.map((value, index) => [
              this.avgRollThickDataSon.xDataTime[index],
              value
            ]),
            itemStyle: {
              color: '#F45549'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(
              0,
              ((xAxisData.length - 39) / xAxisData.length) * 100
            ), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //轧机作业率
    clickTabEleKeyRate(params) {
      this.rollRateOption.xAxis[0].data = []
      if (params === 'day') {
        this.flagOfEleDayKeyRate = true
        this.flagOfEleMonthKeyRate = false
        this.flagOfEleYearKeyRate = false
        this.rollRateOption.series[0].type = 'line'
        this.rollRateOption.series[1].type = 'line'
        this.rollRateOption.series[2].type = 'line'
        this.rollRateOption.legend = {
          top: '1%',
          data: [
            { name: '1#作业率', icon: 'line' }, // 设置为线形
            { name: '2#作业率', icon: 'line' },
            { name: '3#作业率', icon: 'line' }
          ]
        }
      } else if (params === 'month') {
        this.flagOfEleDayKeyRate = false
        this.flagOfEleMonthKeyRate = true
        this.flagOfEleYearKeyRate = false
        this.rollRateOption.series[0].type = 'line'
        this.rollRateOption.series[1].type = 'line'
        this.rollRateOption.series[2].type = 'line'
        this.rollRateOption.legend = {
          top: '1%',
          data: [
            { name: '1#作业率', icon: 'line' }, // 设置为线形
            { name: '2#作业率', icon: 'line' },
            { name: '3#作业率', icon: 'line' }
          ]
        }
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyRate = false
        this.flagOfEleMonthKeyRate = false
        this.flagOfEleYearKeyRate = true
        this.rollRateOption.series[0].type = 'bar'
        this.rollRateOption.series[1].type = 'bar'
        this.rollRateOption.series[2].type = 'bar'
        this.rollRateOption.series[0].barWidth = 13
        this.rollRateOption.series[1].barWidth = 13
        this.rollRateOption.series[2].barWidth = 13
        this.rollRateOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#作业率', icon: '' }, // 设置为线形
            { name: '2#作业率', icon: '' },
            { name: '3#作业率', icon: '' }
          ]
        }
      }
      this.dateTypePraKeyRate = params
      this.$emit('threeShowRate', this.dateTypePraKeyRate)
    },
    getRollPreparatDataSon() {
      this.rollRateOption.series[0].data = []
      this.rollRateOption.series[1].data = []
      this.rollRateOption.series[2].data = []
      let xData = []
      this.rollPreparatDataSon.forEach(item => {
        if (item.machineCode === '11') {
          xData.push(item.tallyDate)
        }
      })
      this.rollRateOption.xAxis[0].data = xData
      this.rollPreparatDataSon.forEach(item => {
        switch (item.machineCode) {
          case '11':
            this.rollRateOption.series[0].data.push(
              Number(item.operationRate).toFixed(2)
            )
            break
          case '12':
            this.rollRateOption.series[1].data.push(
              Number(item.operationRate).toFixed(2)
            )
            break
          case '13':
            this.rollRateOption.series[2].data.push(
              Number(item.operationRate).toFixed(2)
            )
            break
        }
      })
      this.rollRateOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 39) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    changeProParam(pram) {
      if (pram === '1') {
        this.tapButActReal = true
        this.tapButActConvert = false
        this.getRollProductCountDataSon()
      } else {
        this.tapButActConvert = true
        this.tapButActReal = false
        this.getRollProductCountDataSon()
      }
    },
    clickTabEleKeyPro(params) {
      if (params === 'day') {
        this.flagOfEleDayKeyPro = true
        this.flagOfEleMonthKeyPro = false
        this.flagOfEleYearKeyPro = false
      } else if (params === 'month') {
        this.flagOfEleDayKeyPro = false
        this.flagOfEleMonthKeyPro = true
        this.flagOfEleYearKeyPro = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyPro = false
        this.flagOfEleMonthKeyPro = false
        this.flagOfEleYearKeyPro = true
      }
      this.dateTypePraKeyPro = params
      this.$emit('threeShow', this.dateTypePraKeyPro)
    },
    //产量统计
    getRollProductCountDataSon() {
      let outWegtDataOne = []
      let convertWegtDataOne = []
      let xData = []
      let outWegtDataTwo = []
      let convertWegtDataTwo = []
      let outWegtDataThree = []
      let convertWegtDataThree = []
      this.rollProductCountDataSon.forEach(item => {
        if (item['frame'] === '1#轧机') {
          outWegtDataOne.push(Number(item.outWegt).toFixed(2))
          convertWegtDataOne.push(Number(item.convertWegt).toFixed(2))
          xData.push(item.prodTime)
        }
        if (item['frame'] === '2#轧机') {
          outWegtDataTwo.push(Number(item.outWegt).toFixed(2))
          convertWegtDataTwo.push(Number(item.convertWegt).toFixed(2))
        }
        if (item['frame'] === '3#轧机') {
          outWegtDataThree.push(Number(item.outWegt).toFixed(2))
          convertWegtDataThree.push(Number(item.convertWegt).toFixed(2))
        }
      })
      this.outputStatOption.xAxis[0].data = []
      this.outputStatOption.series[0].data = []
      this.outputStatOption.series[1].data = []
      this.outputStatOption.series[2].data = []
      if (this.tapButActReal) {
        this.outputStatOption.xAxis[0].data = xData
        this.outputStatOption.series[0].data = outWegtDataOne
        this.outputStatOption.series[1].data = outWegtDataTwo
        this.outputStatOption.series[2].data = outWegtDataThree
      }
      if (this.tapButActConvert) {
        this.outputStatOption.xAxis[0].data = xData
        this.outputStatOption.series[0].data = convertWegtDataOne
        this.outputStatOption.series[1].data = convertWegtDataTwo
        this.outputStatOption.series[2].data = convertWegtDataThree
      }
      this.outputStatOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //吨钢电耗
    changeProEle(pram) {
      this.flagOfEle = pram
      this.getAvgElecOfSteelDataSon()

      //tooltip单位判断
      if (pram === 0) {
        this.eleConsumpSteelOption.tooltip = {
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
              const unit = 'kW·h/卷'
              const valueResult =
                item.seriesName === '日吨钢电耗' ? item.value : item.value

              result += `${item.marker}${
                item.seriesName
              }: <strong>${valueResult}${unit}</strong><br/>`
            })
            return result
          }
        }
      } else {
        this.eleConsumpSteelOption.tooltip = {
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
              const unit = 'kW·h/t'
              const valueResult =
                item.seriesName === '日吨钢电耗' ? item.value : item.value

              result += `${item.marker}${
                item.seriesName
              }: <strong>${valueResult}${unit}</strong><br/>`
            })
            return result
          }
        }
      }
    },
    clickTabEleKeyEle(params) {
      if (params === 'day') {
        this.flagOfEleDayKeyEle = true
        this.flagOfEleMonthKeyEle = false
        this.flagOfEleYearKeyEle = false
      } else if (params === 'month') {
        this.flagOfEleDayKeyEle = false
        this.flagOfEleMonthKeyEle = true
        this.flagOfEleYearKeyEle = false
      } else if (params === 'quarter') {
        this.flagOfEleDayKeyEle = false
        this.flagOfEleMonthKeyEle = false
        this.flagOfEleYearKeyEle = true
      }
      this.dateTypePraKeyEle = params
      this.$emit('threeShowEle', this.dateTypePraKeyEle)
    },
    getAvgElecOfSteelDataSon() {
      let xData = []
      let avgElectOfSteelData = []
      let oneElectOfSteelData = []
      let twoElectOfSteelData = []
      let threeElectOfSteelData = []

      if (this.flagOfEle) {
        avgElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.avgWegtOfElec).toFixed(2)
        })
        xData = this.avgElecOfSteelDataSon.map(item => {
          return item.monthDate
        })
        oneElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling1).toFixed(2)
        })
        twoElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling2).toFixed(2)
        })
        threeElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling3).toFixed(2)
        })
        this.setEcharts(
          '吨钢',
          avgElectOfSteelData,
          oneElectOfSteelData,
          twoElectOfSteelData,
          threeElectOfSteelData,
          't'
        )
      } else {
        avgElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.avgWegtOfNum).toFixed(2)
        })
        xData = this.avgElecOfSteelDataSon.map(item => {
          return item.monthDate
        })
        oneElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling1OfNum).toFixed(2)
        })
        twoElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling2OfNum).toFixed(2)
        })
        threeElectOfSteelData = this.avgElecOfSteelDataSon.map(item => {
          return Number(item.rolling3OfNum).toFixed(2)
        })
        this.setEcharts(
          '单卷',
          avgElectOfSteelData,
          oneElectOfSteelData,
          twoElectOfSteelData,
          threeElectOfSteelData,
          '卷'
        )
      }

      this.eleConsumpSteelOption.xAxis[0].data = xData
      this.eleConsumpSteelOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 39) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    clickTabEle(params) {
      console.log('===', params)
      this.flagOfEle = params
      this.getAvgElecOfSteelDataSon()
    },
    setEcharts(
      name = '吨钢',
      data1 = [],
      data2 = [],
      data3 = [],
      data4 = [],
      unit = 't'
    ) {
      this.eleConsumpSteelOption.legend.data = [
        { name: `日${name}电耗`, icon: 'line' },
        {
          name: `1#${name}电耗`,
          icon: 'circle',
          itemStyle: {
            symbolSize: 10
          }
        },
        { name: `2#${name}电耗`, icon: 'circle' },
        { name: `3#${name}电耗`, icon: 'circle' }
      ]
      ;(this.eleConsumpSteelOption.series = [
        {
          name: `日${name}电耗`,
          type: 'line',
          data: data1,
          smooth: true, // 开启平滑曲线
          symbol: 'none', // 去掉转折点的圆点
          itemStyle: {
            color: '#A146B0'
          }
        },
        {
          name: `1#${name}电耗`,
          type: 'scatter',
          data: data2,
          itemStyle: {
            color: '#5DB362'
          }
        },
        {
          name: `2#${name}电耗`,
          type: 'scatter',
          data: data3,
          itemStyle: {
            color: '#FF9800'
          }
        },
        {
          name: `3#${name}电耗`,
          type: 'scatter',
          data: data4,
          itemStyle: {
            color: '#F45549'
          }
        }
      ]),
        (this.eleConsumpSteelOption.yAxis[0].name = `单位：kW·h/${unit}`)
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
  //overflow: hidden; /* 隐藏超出部分 */
  margin-left: 1px;
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
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
</style>
