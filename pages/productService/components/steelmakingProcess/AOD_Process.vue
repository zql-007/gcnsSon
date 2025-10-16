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
            <span class="spanHead">AOD工序</span>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="选择日期">
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
                <div>
                  <div><span class="spanHeadTwo">AOD母液铁水单耗</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :tooltip="singleLiquorOption.tooltip"
                    :legend="singleLiquorOption.legend"
                    :grid="singleLiquorOption.grid"
                    :x-axis="singleLiquorOption.xAxis"
                    :y-axis="singleLiquorOption.yAxis"
                    :series="singleLiquorOption.series"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div><span class="spanHeadTwo">AOD钢水产量</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :tooltip="aodProdByTimeDataOption.tooltip"
                    :legend="aodProdByTimeDataOption.legend"
                    :grid="aodProdByTimeDataOption.grid"
                    :x-axis="aodProdByTimeDataOption.xAxis"
                    :y-axis="aodProdByTimeDataOption.yAxis"
                    :series="aodProdByTimeDataOption.series"
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
                    <div>
                      <span class="spanHeadTwo">AOD冶炼时长</span>
                    </div>
                    <div>
                      <span class="selectSpan">牌号</span>
                      <el-select
                        v-model="form.value"
                        class="custom-select"
                        clearable
                        placeholder="请选择"
                        @change="changeOptionValue">
                        <el-option
                          v-for="item in options"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <nercar-echarts
                    ref="echartsRef"
                    :grid="smeltingTimeOption0.grid"
                    :tooltip="smeltingTimeOption0.tooltip"
                    :x-axis="smeltingTimeOption0.xAxis"
                    :y-axis="smeltingTimeOption0.yAxis"
                    :series="smeltingTimeOption0.series"
                    :_height="'350px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div>
                      <span class="spanHeadTwo">AOD时间分布</span>
                    </div>
                  </div>
                  <nercar-echarts
                    :tooltip="aodTimeRangeOption.tooltip"
                    :legend="aodTimeRangeOption.legend"
                    :grid="aodTimeRangeOption.grid"
                    :x-axis="aodTimeRangeOption.xAxis"
                    :y-axis="aodTimeRangeOption.yAxis"
                    :series="aodTimeRangeOption.series"
                    :_height="'350px'"
                  />
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
                  <div><span class="spanHeadTwo">AOD洗包统计</span></div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div style="height: 350px">
                      <nercar-echarts
                        :tooltip="moltenSteelOutputOption.tooltip"
                        :legend="moltenSteelOutputOption.legend"
                        :grid="moltenSteelOutputOption.grid"
                        :x-axis="moltenSteelOutputOption.xAxis"
                        :y-axis="moltenSteelOutputOption.yAxis"
                        :series="moltenSteelOutputOption.series"
                        :_height="'350px'"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="height: 350px">
                      <nercar-echarts
                        :tooltip="moltenSteelOutputOption1.tooltip"
                        :legend="moltenSteelOutputOption1.legend"
                        :grid="moltenSteelOutputOption1.grid"
                        :x-axis="moltenSteelOutputOption1.xAxis"
                        :y-axis="moltenSteelOutputOption1.yAxis"
                        :series="moltenSteelOutputOption1.series"
                        :_height="'350px'"
                      />
                    </div>
                  </el-col>
                </el-row>
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
                        <span class="spanHeadTwo">AOD机时产量</span>
                      </div>
                      <div style="height: 350px;padding-top: 20px">
                        <nercar-echarts
                          :legend="aodTimingYieldOption.legend"
                          :grid="aodTimingYieldOption.grid"
                          :tooltip="aodTimingYieldOption.tooltip"
                          :x-axis="aodTimingYieldOption.xAxis"
                          :y-axis="aodTimingYieldOption.yAxis"
                          :series="aodTimingYieldOption.series"
                          :_height="'330px'"
                        />
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="display: flex;justify-content: space-between">
                        <span class="spanHeadTwo">AOD炉次生产节奏</span>
                      </div>
                      <div style="height: 350px">
                        <!--                        <nercar-echarts
                          :tooltip="aodFurnaceProductRhythmOption.tooltip"
                          :legend="aodFurnaceProductRhythmOption.legend"
                          :grid="aodFurnaceProductRhythmOption.grid"
                          :x-axis="aodFurnaceProductRhythmOption.xAxis"
                          :y-axis="aodFurnaceProductRhythmOption.yAxis"
                          :series="aodFurnaceProductRhythmOption.series"
                          :data-zoom="aodFurnaceProductRhythmOption.dataZoom"
                          :_height="'330px'"
                        />-->
                        <!--                        <echarts-scroll-bar></echarts-scroll-bar>-->
                        <echarts-scroll-bar2></echarts-scroll-bar2>
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
  </div>
</template>

<script>
import echartsScrollBar2 from '@/components/steelComponent/echartsScrollBar2.vue'
import echartsScrollBar from '@/components/steelComponent/echartsScrollBar.vue'
import * as echarts from 'echarts'
import { post } from '@/lib/Util'
import { getLgccOutPut } from '@/lib/productDataApply/steelmakingProcess'
import NercarEcharts from '@/components/NercarEcharts.vue'
import { getLastMonthDate, getNowDay } from '@/utils/dateUtil'
import { mapState } from 'vuex'
// import { color } from 'echarts/lib/export'
export default {
  layout: 'menuLayout',
  name: 'productService-productOverview',
  components: {
    NercarEcharts,
    echartsScrollBar,
    echartsScrollBar2
  },
  props: {
    aodProdByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    aodHotByTimeDataSon: {
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
    lgAodBoxByTimeDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    aodTimeByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    aodXbTimeByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    aodXbStovesByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    targetByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentPage: 0, // 当前页码，从0开始
      pageSize: 20, // 每页展示的数据条数
      times: {
        startDate: getLastMonthDate(),
        endDate: getNowDay()
      },
      singleLiquorOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          selectedMode: false
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      aodProdByTimeDataOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 5, // 设置图例标记的高度
          data: [
            { name: '304', icon: '' },
            { name: '304L', icon: '' },
            { name: '304B', icon: '' },
            { name: '304H', icon: '' },
            { name: '304HC', icon: '' },
            { name: '316L', icon: '' },
            { name: '321', icon: '' },
            { name: '炉数', icon: 'line' }
          ]
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['1号', '2号', '3号', '4号', '5号'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      moltenSteelOutputOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 8, // 设置图例标记的高度
          data: [
            { name: '冶炼时长', icon: '' },
            { name: '洗包时长', icon: '' },
            { name: '洗包时长占比', icon: 'line' }
          ]
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}%'
            },
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      moltenSteelOutputOption1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 8, // 设置图例标记的高度
          data: [
            { name: '冶炼炉次', icon: '' },
            { name: '洗包次数', icon: '' },
            { name: '洗包次数占比', icon: 'line' }
          ]
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value}%'
            },
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
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '冶炼炉次',
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5db362'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: []
          },
          {
            name: '洗包次数',
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#ff9800'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: []
          },
          {
            name: '洗包次数占比',
            type: 'line',
            smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点（去掉则显示占比）
            yAxisIndex: 1,
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            itemStyle: {
              color: '#a146b0'
            },
            data: []
          }
        ]
      },
      smeltingTimeOption: {
        title: {
          text: '数据统计'
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
        tooltip: {},
        legend: {
          data: ['中位数', '众数', '当前时长']
        },
        xAxis: [
          {
            data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '中位数',
            type: 'bar',
            data: [74, 79, 74, 76, 76, 73, 59],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '众数',
            type: 'bar',
            data: [72, 73, 73, 76, 76, 78, 56],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '当前时长',
            type: 'bar',
            data: [20, 78, 82, 36, 67, 49, 55],
            itemStyle: {
              color: '#55c6d4'
            }
          }
        ]
      },
      smeltingTimeOption0: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            // console.log('pp', params)
            let value = params.value
            let seriesName = params.name
            if (params.seriesType === 'boxplot') {
              return (
                '<div style="font-size: 14px; font-weight: bold;">' +
                seriesName +
                '</div>' +
                '<div>上边缘USL: ' +
                value[1] +
                '</div>' +
                '<div>上四分位数: ' +
                value[2] +
                '</div>' +
                '<div>中位数: ' +
                value[3] +
                '</div>' +
                '<div>下四分位数: ' +
                value[4] +
                '</div>' +
                '<div>下边缘DSL: ' +
                value[5] +
                '</div>'
              )
            }
            if (
              params.seriesType === 'scatter' &&
              params.name !== params.seriesIndex
            ) {
              return (
                '<div style="font-size: 14px; font-weight: bold;">' +
                seriesName +
                '</div>' +
                '<div>异常点: ' +
                value[1]
              )
            }
          }
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
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0, //X轴展示不全
              color: '#333'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            min: null,
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
            data: [
              // 1号数据
              [50, 55, 60, 60, 60],
              // 2号数据
              [50, 55, 55, 60, 65],
              // 3号数据
              [45, 50, 55, 55, 60],
              // 4号数据
              [35, 40, 45, 50, 55],
              // 5号数据
              [30, 35, 40, 40, 45],
              // 6号数据
              [25, 30, 30, 35, 40],
              // 7号数据
              [40, 40, 45, 50, 55]
            ],
            boxWidth: '18',
            itemStyle: {
              color: '#5cb85c',
              borderColor: '#5cb85c' // 添加这一行，设置边线颜色为绿色
            },
            boxplotItemStyle: {
              medianColor: 'transparent' // 将中位数线颜色设为透明，取消显示
            },
            emphasis: {
              itemStyle: {
                color: '#5cb85c',
                borderColor: '#5cb85c'
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{b}: {c}'
              }
            },
            // 新增异常值点样式设置
            outlierStyle: {
              color: '#5cb85c',
              borderColor: '#5cb85c',
              symbolSize: 6
            }
          }
        ]
      },
      aodTimeRangeOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '冶炼',
            type: 'bar',
            stack: 'total',
            barWidth: 24,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '洗包',
            type: 'bar',
            stack: 'total',
            barWidth: 24,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '等待',
            type: 'bar',
            stack: 'total',
            barWidth: 24,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '停时',
            type: 'bar',
            stack: 'total',
            barWidth: 24,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410],
            itemStyle: {
              color: '#f45549'
            }
          }
        ]
      },
      aodTimingYieldOption: {
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
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 8, // 设置图例标记的高度
          data: [
            { name: '机时产量', icon: '' },
            { name: '平均出钢量', icon: '' },
            { name: '平均冶炼时长', icon: 'line' }
          ]
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
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
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
            name: '',
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '',
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
            name: '机时产量',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            itemStyle: {
              color: '#5db362'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            }
          },
          {
            name: '平均出钢量',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            itemStyle: {
              color: '#ff9800'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            }
          },
          {
            name: '平均冶炼时长',
            type: 'line',
            yAxisIndex: 1,
            // smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ],
            itemStyle: {
              color: '#a146b0'
            },
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            }
          }
        ]
      },
      aodFurnaceProductRhythmOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
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
            type: 'value',
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
            data: [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
              'Mon1',
              'Tue1',
              'Wed1',
              'Thu1',
              'Fri1',
              'Sat1',
              'Sun1',
              'Mon2',
              'Tue2',
              'Wed2',
              'Thu2',
              'Fri2',
              'Sat2',
              'Sun2'
            ],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '等待',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              320,
              302,
              301,
              334,
              390,
              330,
              320,
              320,
              302,
              301,
              334,
              390,
              330,
              320,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '化钢',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '氧化',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '还原',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#ffc000'
            }
          },
          {
            name: '精炼',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              150,
              212,
              201,
              154,
              190,
              330,
              410,
              320,
              302,
              301,
              334,
              390,
              330,
              320
            ],
            itemStyle: {
              color: '#3391ff'
            }
          }
        ],
        dataZoom: [
          /*{
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
      tapButActCurrent: false,
      tapButActMonth: false,
      tapButActYear: false,
      options: [
        {
          value: '304',
          label: '304'
        },
        {
          value: '305',
          label: '305'
        },
        {
          value: '306',
          label: '306'
        }
      ],
      form: {
        value: '304'
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  watch: {
    tapButActCurrent: function(newVal, oldVal) {
      if (newVal) {
        this.tapButActMonth = false
        this.tapButActYear = false
      }
    },
    aodProdByTimeDataSon: {
      handler: 'getAodProdByTimeDataSon',
      deep: true
    },
    aodHotByTimeDataSon: {
      handler: 'getAodHotByTimeDataSon',
      deep: true
    },
    lgAodBoxByTimeDataSon: {
      handler: 'getLgAodBoxByTimeDataSon',
      deep: true
    },
    aodTimeByTimeDataSon: {
      handler: 'getAodTimeByTimeDataSon',
      deep: true
    },
    aodXbTimeByTimeDataSon: {
      handler: 'getAodXbTimeByTimeDataSon',
      deep: true
    },
    aodXbStovesByTimeDataSon: {
      handler: 'getAodXbStovesByTimeDataSon',
      deep: true
    },
    targetByTimeDataSon: {
      handler: 'getTargetByTimeDataSon',
      deep: true
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.$emit('clickTimeQuery', this.times)
    // this.getMoltenSteelOutputData()
    this.options = this.dataDictionary['lg-steel']
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      this.$emit('clickTimeQuery', this.times)
    },
    formatterArr(data) {
      var arr = new Array()
      data.map((item, i) => {
        arr.push({
          coord: [item, i]
        })
      })
      return arr
    },
    //AOD洗包统计---测试
    getMoltenSteelOutputData() {
      const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210]
      ]
      const colors = ['#5db362', '#ff9800', '#55c6d4']
      const series = ['冶炼时长', '洗包时长'].map((name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[sid]
          },
          label: {
            show: true,
            textStyle: {
              color: '#000' // 设置图内文字为黑色
            }
          },
          data: rawData[sid]
        }
      })
      series.push({
        name: '洗包时长占比',
        type: 'line',
        smooth: true, // 开启平滑曲线
        // symbol: 'none', // 去掉转折点的圆点（去掉则显示占比）
        yAxisIndex: 1,
        label: {
          show: true, // 显示转折点数值
          position: 'top', // 数值显示在转折点上方
          color: 'black',
          formatter: function(params) {
            return params.value + '%'
          }
        },
        itemStyle: {
          color: '#a146b0'
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      })
      this.moltenSteelOutputOption.series = series
    },
    //AOD母液铁水单耗
    getAodHotByTimeDataSon() {
      let xData = []
      let niWgtList = []
      let crWgtList = []
      let midWgtList = []
      this.aodHotByTimeDataSon.forEach(item => {
        xData.push(item.steelGrade)
        niWgtList.push(Number(item.niWgt))
        crWgtList.push(Number(item.crWgt))
        midWgtList.push(Number(item.midWgt))
      })
      let rawData = [niWgtList, crWgtList, midWgtList]
      /*const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310]
      ]*/
      //将二维数组里的字符串数值全部转为Number类型
      rawData = rawData.map(subArr => subArr.map(item => Number(item)))
      // ------------start计算每个柱子在整个维度中的比例,低于5%进行隐藏
      const seriesDataHide = []
      let legendData2 = [
        {
          name: '镍铁单耗',
          color: '#5db362'
        },
        {
          name: '铬铁单耗',
          color: '#ff9800'
        },
        {
          name: '中频单耗',
          color: '#55c6d4'
        }
      ]
      const totalPerIndex = new Array(rawData[0].length).fill(0)
      for (let i = 0; i < rawData.length; i++) {
        for (let j = 0; j < rawData[i].length; j++) {
          totalPerIndex[j] += rawData[i][j]
        }
      }
      for (let i = 0; i < rawData.length; i++) {
        const currentSeries = {
          name: legendData2[i].name,
          //自定义每节柱状图颜色
          itemStyle: {
            color: legendData2[i].color
          },
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          data: []
        }
        for (let j = 0; j < rawData[i].length; j++) {
          const percentage = (rawData[i][j] / totalPerIndex[j]) * 100
          const showLabel = percentage >= 5
          currentSeries.data.push({
            value: rawData[i][j],
            label: {
              show: showLabel,
              position: 'inside',
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              },
              formatter: `${rawData[i][j].toFixed(2)}`
            }
          })
        }
        seriesDataHide.push(currentSeries)
      }
      //------------end计算每个柱子在整个维度中的比例
      const colors = ['#5db362', '#ff9800', '#55c6d4']
      const series = ['镍铁单耗', '铬铁单耗', '中频单耗'].map((name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[sid]
          },
          label: {
            show: true,
            position: 'inside',
            textStyle: {
              color: '#000' // 设置图内文字为黑色
            }
          },
          data: rawData[sid]
        }
      })
      this.singleLiquorOption.xAxis[0].data = xData
      this.singleLiquorOption.series = seriesDataHide
      /*---------------------------柱状图顶部展示总计------------*/
      //鼠标移入tooltip-只展示'冶炼', '等待', '停时‘数据
      let legendData = ['镍铁单耗', '铬铁单耗', '中频单耗']
      this.singleLiquorOption.tooltip = {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br>'
          for (let i = 0; i < params.length; i++) {
            if (legendData.includes(params[i].seriesName)) {
              let unit = params[i].seriesType === 'bar' ? '' : ''
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
                ';"></span>'
              result +=
                dot +
                params[i].seriesName +
                ': ' +
                params[i].value +
                unit +
                '<br>'
            }
          }
          return result
        },
        axisPointer: {
          type: 'shadow'
        }
      }
      //总计：铁水吨钢单耗值
      let totalSeriesData = []
      this.aodHotByTimeDataSon.forEach(item => {
        totalSeriesData.push(
          Number(item.niWgt) + Number(item.crWgt) + Number(item.midWgt)
        )
      })
      //总计-柱状图顶部展示
      this.singleLiquorOption.series.push({
        name: '',
        type: 'bar',
        stack: 'total',
        itemStyle: {
          color: 'rgba(0,0,0,0)' // 透明颜色
        },
        label: {
          show: true,
          textStyle: {
            color: '#000' // 设置图内文字为黑色
          },
          position: 'top',
          formatter: params => `${totalSeriesData[params.dataIndex].toFixed(2)}`
        },
        data: totalSeriesData.map(value => 0.0) // 微小的值以便能显示标签但不影响图形
      })
    },
    //AOD钢水产量
    getAodProdByTimeDataSon() {
      let xData = []
      this.aodProdByTimeDataSon.forEach(item => {
        xData.push(item.staidDictText)
      })
      xData = [...new Set(xData)]
      this.aodProdByTimeDataOption.xAxis[0].data = []
      this.aodProdByTimeDataOption.xAxis[0].data = xData
      const steelGrades = [
        '304',
        '304L',
        '304B',
        '304H',
        '304HC',
        '316L',
        '321'
      ]
      const furnaceNames = [
        '1号AOD',
        '2号AOD',
        '3号AOD',
        '4号AOD',
        '5号AOD',
        '6号AOD',
        '7号AOD'
      ]
      //初始化一个对象 result，对象的键为炉号，值是长度为 7 的数组，初始值都为 0
      const result = {}
      const stovesResult = {}
      furnaceNames.forEach(furnace => {
        result[furnace] = new Array(steelGrades.length).fill(0)
        stovesResult[furnace] = 0
      })
      this.aodProdByTimeDataSon.forEach(item => {
        item.aodOutNum = Number(item.aodOutNum)
        item.stoves = Number(item.stoves)
        const furnace = item.staidDictText
        const gradeIndex = steelGrades.indexOf(item.steelGrade)
        if (furnaceNames.includes(furnace) && gradeIndex !== -1) {
          result[furnace][gradeIndex] = item.aodOutNum
          stovesResult[furnace] += item.stoves
        }
      })
      // console.log('result', JSON.stringify(result))
      //转成需要的二维数组格式，每个二维数组元素数组为一个钢种（304、304L...）的全部数据
      const values = Object.values(result)
      const numArrays = values.length
      const arrayLength = values[0].length
      let rawData = []

      for (let i = 0; i < arrayLength; i++) {
        const newArray = []
        for (let j = 0; j < numArrays; j++) {
          newArray.push(values[j][i])
        }
        rawData.push(newArray)
      }
      //将二维数组里的字符串数值全部转为Number类型
      rawData = rawData.map(subArr => subArr.map(item => Number(item)))
      // ------------start计算每个柱子在整个维度中的比例,低于5%进行隐藏
      const seriesDataHide = []
      let legendData2 = [
        {
          name: '304',
          color: '#5db362'
        },
        {
          name: '304L',
          color: '#ff9800'
        },
        {
          name: '304B',
          color: '#55c6d4'
        },
        {
          name: '304H',
          color: '#ffc000'
        },
        {
          name: '304HC',
          color: '#a146b0'
        },
        {
          name: '316L',
          color: '#68aeff'
        },
        {
          name: '321',
          color: '#255e91'
        }
      ]
      const totalPerIndex = new Array(rawData[0].length).fill(0)
      for (let i = 0; i < rawData.length; i++) {
        for (let j = 0; j < rawData[i].length; j++) {
          totalPerIndex[j] += rawData[i][j]
        }
      }
      for (let i = 0; i < rawData.length; i++) {
        const currentSeries = {
          name: legendData2[i].name,
          //自定义每节柱状图颜色
          itemStyle: {
            color: legendData2[i].color
          },
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          data: []
        }
        for (let j = 0; j < rawData[i].length; j++) {
          const percentage = (rawData[i][j] / totalPerIndex[j]) * 100
          const showLabel = percentage >= 5
          currentSeries.data.push({
            value: rawData[i][j],
            label: {
              show: showLabel,
              position: 'inside',
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              },
              formatter: `${rawData[i][j]}`
            }
          })
        }
        seriesDataHide.push(currentSeries)
      }
      //------------end计算每个柱子在整个维度中的比例
      // 输出结果
      /*let rawData = []
      for (const furnace in result) {
        rawData.push(result[furnace])
      }*/
      let lineData = []
      Object.entries(stovesResult).forEach(([key, value]) => {
        lineData.push(value)
      })
      const colors = [
        '#5db362',
        '#ff9800',
        '#55c6d4',
        '#ffc000',
        '#a146b0',
        '#68aeff',
        '#255e91'
      ]
      const series = [
        '304',
        '304L',
        '304B',
        '304H',
        '304HC',
        '316L',
        '321'
      ].map((name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[sid]
          },
          label: {
            show: true,
            textStyle: {
              color: '#000' // 设置图内文字为黑色
            }
          },
          data: rawData[sid]
        }
      })
      seriesDataHide.push({
        name: '炉数',
        type: 'line',
        smooth: true, // 开启平滑曲线
        // symbol: 'none', // 去掉转折点的圆点
        yAxisIndex: 1,
        label: {
          show: true, // 显示转折点数值
          textStyle: {
            color: '#000' // 设置图内文字为黑色
          },
          position: 'top' // 数值显示在转折点上方
        },
        itemStyle: {
          color: '#f45549'
        },
        data: lineData
      })
      this.aodProdByTimeDataOption.series = seriesDataHide
    },
    //AOD冶炼时长
    getLgAodBoxByTimeDataSon() {
      // console.log('999', JSON.stringify(this.lgAodBoxByTimeDataSon))
      const isEmpty1 = Object.keys(this.lgAodBoxByTimeDataSon).length === 0
      if (isEmpty1) {
        //销毁echarts组件,强制去除异常点残留问题
        this.$refs.echartsRef.echart.dispose()
      } else {
        //重新初始化echarts组件
        this.$refs.echartsRef.reInitChart()
      }
      let xData = Object.keys(this.lgAodBoxByTimeDataSon)
      // console.log('xData', xData)
      let valueList = Object.values(this.lgAodBoxByTimeDataSon)
      // console.log('valueList', valueList)
      let toolTipList = ['max', 'q3', 'median', 'q1', 'min']
      let LGTotalData = []
      for (let item of valueList) {
        const newItem = []
        for (let val of toolTipList) {
          newItem.push(item[val])
        }
        LGTotalData.push(newItem)
      }
      // console.log('LGTotalData', LGTotalData)
      //计算二维数组里最小的值,以最小值为y轴最低刻度线，保证数据展示效果合理
      for (let item of valueList) {
        LGTotalData.push(item['outliers'])
      }
      const minTwoArr = this.findMinIn2DArray(LGTotalData)
      this.smeltingTimeOption0.yAxis[0].min = minTwoArr - 10
      //箱线图五个特征值
      this.smeltingTimeOption0.series[0].data = LGTotalData
      //X轴数据
      let xDataEnd = []
      this.dataDictionary['lg-aodStaid'].forEach(item => {
        xData.forEach(val => {
          if (item.code === val) {
            xDataEnd.push(item.text)
          }
        })
      })
      this.smeltingTimeOption0.xAxis[0].data = xDataEnd
      //每个横坐标维度异常点数据格式转化（outliersResult：只展示存在的异常点）
      const outliersResult = []
      xData.forEach((key, index) => {
        const outliers = this.lgAodBoxByTimeDataSon[key].outliers
        outliers.forEach(outlier => {
          outliersResult.push([index, outlier])
        })
      })
      // console.log('outliersResult9999', outliersResult)
      //设置异常点,转为最终赋值异常点的数据格式（OutliersArrays：没有的异常点进行补空数组处理，对应上X轴）
      let OutliersArrays = this.mergeOutliersArrays(
        outliersResult,
        xData.length
      )
      // console.log('OutliersArrays9999', OutliersArrays)
      //防止重复异常点，删除每次调用不同钢板号之前异常的数据
      this.smeltingTimeOption0.series.splice(1)
      OutliersArrays.forEach(item => {
        this.smeltingTimeOption0.series.push({
          name: '',
          type: 'scatter',
          symbolSize: 5,
          data: item,
          itemStyle: {
            //异常点（空心）
            color: 'transparent',
            borderColor: '#5cb85c',
            borderWidth: 1
          },
          label: {
            show: false
          }
        })
      })
    },
    //计算二维数组里最小的值
    findMinIn2DArray(arr) {
      if (arr.length === 0) {
        return null
      }
      let min = arr[0][0]
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] < min) {
            min = arr[i][j]
          }
        }
      }
      return min
    },
    //以X轴为维度，算每个X轴刻度的异常点个数，没有异常点的维度进行补空数组处理（arr:未补空的异常点数据；xLength：X轴长度）
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

      for (let i = 1; i < xLength; i++) {
        result.push(map.get(i) || [])
      }

      return result
    },
    changeOptionValue(val) {
      // console.log('val', val)
      this.$emit('emitOptionValue', val)
    },
    //AOD时间分布
    getAodTimeByTimeDataSon() {
      let xData = []
      let smeltDurationData = []
      let xbDurationData = []
      let waitTimeData = []
      let stopHoursData = []
      let ratioData = []
      this.aodTimeByTimeDataSon.forEach(item => {
        xData.push(item.staidDictText)
        smeltDurationData.push(item.smeltDuration)
        xbDurationData.push(item.xbDuration)
        waitTimeData.push(item.waitTime)
        stopHoursData.push(item.stopHours)
        ratioData.push(item.ratio)
      })
      this.aodTimeRangeOption.yAxis[0].data = xData
      this.aodTimeRangeOption.series[0].data = smeltDurationData
      this.aodTimeRangeOption.series[1].data = xbDurationData
      this.aodTimeRangeOption.series[2].data = waitTimeData
      this.aodTimeRangeOption.series[3].data = stopHoursData
      //鼠标移入tooltip-只展示'冶炼', '等待', '停时‘数据
      let legendData = ['冶炼', '洗包', '等待', '停时']
      this.aodTimeRangeOption.tooltip = {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br>'
          for (let i = 0; i < params.length; i++) {
            if (legendData.includes(params[i].seriesName)) {
              let unit = params[i].seriesType === 'bar' ? '' : ''
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
                ';"></span>'
              result +=
                dot +
                params[i].seriesName +
                ': ' +
                params[i].value +
                unit +
                '<br>'
            }
          }
          return result
        },
        axisPointer: {
          type: 'shadow'
        }
      }
      //作业率-柱状图顶部展示
      // this.aodTimeRangeOption.series.pop()
      //顶部数据重叠问题，删除后再赋值
      this.aodTimeRangeOption.series.forEach((item, index) => {
        if (item.name === '') {
          this.aodTimeRangeOption.series.splice(index, 1)
        }
      })
      this.aodTimeRangeOption.series.push({
        name: '',
        type: 'bar',
        stack: 'total',
        itemStyle: {
          color: 'rgba(0,0,0,0)' // 透明颜色
        },
        label: {
          show: true,
          textStyle: {
            color: '#000' // 设置图内文字为黑色
          },
          // position: 'middle',
          formatter: params => `              ${ratioData[params.dataIndex]}%`
        },
        data: ratioData.map(value => 0.0) // 微小的值以便能显示标签但不影响图形
      })
    },
    //AOD洗包统计（时长）
    getAodXbTimeByTimeDataSon() {
      let xData = []
      let smeltDurationData = []
      let xbDurationData = []
      let ratioData = []
      this.aodXbTimeByTimeDataSon.forEach(item => {
        xData.push(item.staidDictText)
        smeltDurationData.push(item.smeltDuration)
        xbDurationData.push(item.xbDuration)
        ratioData.push(item.ratio)
      })
      this.moltenSteelOutputOption.xAxis[0].data = xData
      const rawData = [smeltDurationData, xbDurationData]
      const colors = ['#5db362', '#ff9800', '#55c6d4']
      const series = ['冶炼时长', '洗包时长'].map((name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[sid]
          },
          label: {
            show: true,
            textStyle: {
              color: '#000' // 设置图内文字为黑色
            }
          },
          data: rawData[sid]
        }
      })
      series.push({
        name: '洗包时长占比',
        type: 'line',
        smooth: true, // 开启平滑曲线
        // symbol: 'none', // 去掉转折点的圆点（去掉则显示占比）
        yAxisIndex: 1,
        label: {
          show: true, // 显示转折点数值
          position: 'top', // 数值显示在转折点上方
          color: 'black',
          formatter: function(params) {
            return params.value + '%'
          }
        },
        itemStyle: {
          color: '#a146b0'
        },
        data: ratioData
      })
      this.moltenSteelOutputOption.series = series
    },
    //AOD洗包统计（次数）
    getAodXbStovesByTimeDataSon() {
      let xData = []
      let stovesData = []
      let mainData = []
      let ratioData = []
      this.aodXbStovesByTimeDataSon.forEach(item => {
        xData.push(item.staidDictText)
        stovesData.push(item.stoves)
        mainData.push(item.main)
        ratioData.push(item.ratio)
      })
      this.moltenSteelOutputOption1.xAxis[0].data = xData
      this.moltenSteelOutputOption1.series[0].data = stovesData
      this.moltenSteelOutputOption1.series[1].data = mainData
      this.moltenSteelOutputOption1.series[2].data = ratioData
    },
    //AOD机时产量
    getTargetByTimeDataSon() {
      let xData = []
      let ratioData = []
      let avgAodOutNumData = []
      let avgSmeltDurationData = []
      this.targetByTimeDataSon.forEach(item => {
        xData.push(item.staidDictText)
        ratioData.push(item.ratio)
        avgAodOutNumData.push(item.avgAodOutNum)
        avgSmeltDurationData.push(item.avgSmeltDuration)
      })
      this.aodTimingYieldOption.xAxis[0].data = xData
      this.aodTimingYieldOption.series[0].data = ratioData
      this.aodTimingYieldOption.series[1].data = avgAodOutNumData
      this.aodTimingYieldOption.series[2].data = avgSmeltDurationData
    },
    handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight) {
        this.currentPage++
        // this.fetchData();
      }
    }
  }
}
</script>

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
/deep/.custom-select.el-scrollbar {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
  background-color: red !important;
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
