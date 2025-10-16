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
            <span class="spanHead">连铸工序</span>
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
                  <div><span class="spanHeadTwo">连铸钢包自开率</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    ref="aodTimingYieldRef"
                    :legend="aodTimingYieldOption.legend"
                    :grid="aodTimingYieldOption.grid"
                    :tooltip="aodTimingYieldOption.tooltip"
                    :x-axis="aodTimingYieldOption.xAxis"
                    :y-axis="aodTimingYieldOption.yAxis"
                    :series="aodTimingYieldOption.series"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div>
                    <span class="spanHeadTwo">连铸时间分布(作业率)</span>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :tooltip="aodFurnaceProductRhythmOption.tooltip"
                    :legend="aodFurnaceProductRhythmOption.legend"
                    :grid="aodFurnaceProductRhythmOption.grid"
                    :x-axis="aodFurnaceProductRhythmOption.xAxis"
                    :y-axis="aodFurnaceProductRhythmOption.yAxis"
                    :series="aodFurnaceProductRhythmOption.series"
                    :data-zoom="aodFurnaceProductRhythmOption.dataZoom"
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
                  <div><span class="spanHeadTwo">300系化学成分内控合格率</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="chemicComOption.legend"
                    :grid="chemicComOption.grid"
                    :tooltip="chemicComOption.tooltip"
                    :x-axis="chemicComOption.xAxis"
                    :y-axis="chemicComOption.yAxis"
                    :series="chemicComOption.series"
                    :data-zoom="chemicComOption.dataZoom"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div>
                    <span class="spanHeadTwo">钢坯一级品率</span>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :tooltip="chemicComOptionTwo.tooltip"
                    :legend="chemicComOptionTwo.legend"
                    :grid="chemicComOptionTwo.grid"
                    :x-axis="chemicComOptionTwo.xAxis"
                    :y-axis="chemicComOptionTwo.yAxis"
                    :series="chemicComOptionTwo.series"
                    :data-zoom="chemicComOptionTwo.dataZoom"
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
                  <div><span class="spanHeadTwo">钢坯改判信息统计</span></div>
                </div>
                <div style="height: 350px;padding: 40px 30px 10px 30px">
                  <div
                    style="width: 100%;display: flex;justify-content: space-between;cursor: pointer">
                    <div
                      style="background-color: #e0ebe1;width: 48%;height: 80px;display: flex;justify-content: center;align-items: center"
                      @click="steelChange">
                      <div
                        class="staidSpanClass">钢种改判</div>
                    </div>
                    <div
                      style="background-color: #e0ebe1;width: 48%;height: 80px;margin-left: 20px;display: flex;justify-content: center;align-items: center"
                      @click="useChange">
                      <div
                        class="staidSpanClass">用途码改判</div>
                    </div>
                  </div>
                  <div style="width: 100%;display: flex;justify-content: space-between;margin-top: 6px">
                    <div style="background-color: #f5faf5;width: 48%;height: 80px;display: flex;justify-content: center;align-items: center">
                      <div class="staidSpanClassTwo">{{ judgeForm.steelWgt }}<span class="staidSpanClassTwoSpan">吨</span></div>
                    </div>
                    <div style="background-color: #f5faf5;width: 48%;height: 80px;margin-left: 20px;display: flex;justify-content: center;align-items: center">
                      <div class="staidSpanClassTwo">{{ judgeForm.useWgt }}<span class="staidSpanClassTwoSpan">吨</span></div>
                    </div>
                  </div>
                  <div style="width: 100%;display: flex;justify-content: space-between;margin-top: 6px">
                    <div style="background-color: #f5faf5;width: 48%;height: 80px;;display: flex;justify-content: center;align-items: center">
                      <div class="staidSpanClassTwo">{{ judgeForm.steelTotal }}<span class="staidSpanClassTwoSpan">支</span></div>
                    </div>
                    <div style="background-color: #f5faf5;width: 48%;height: 80px;margin-left: 20px;;display: flex;justify-content: center;align-items: center">
                      <div class="staidSpanClassTwo">{{ judgeForm.useTotal }}<span class="staidSpanClassTwoSpan">支</span></div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div>
                      <span class="spanHeadTwo">钢坯改判信息流向图</span>
                    </div>
                  </div>
                  <div style="display: flex;justify-content: center;width: 100%">
                    <div
                      id="chartContainer"
                      style="height: 350px;width: 100%"></div>
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
import * as echarts from 'echarts'
import NercarEcharts from '@/components/NercarEcharts.vue'
import { getLastMonthDate, getNowDay } from '@/utils/dateUtil'
import { mapState } from 'vuex'
import { filterUrl } from '@/lib/Menu'
import { log } from 'event-stream'
import {
  getLgAodHotByTime,
  getLgCcJudgeByTime
} from '@/lib/productDataApply/steelmakingProcess'
import { post } from '@/lib/Util'

export default {
  name: 'continuousCastiProcess',
  components: { NercarEcharts },
  props: {
    lgCcSmeltByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    lgCcOpenByTimeDataSon: {
      type: Array,
      default() {
        return []
      }
    },
    lgccChemByTimeDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    lgccOneByTimeDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    lgCcJudgeByTimeDataSon: {
      type: Object,
      default() {
        return {}
      }
    },
    lgCcJudgeByTypeAndTimeDataSon: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      outputStatOption1: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            emphasis: {
              focus: 'adjacency'
            },
            nodeAlign: 'left',
            data: null,
            links: null,
            lineStyle: {
              color: 'source',
              curveness: 0.5
            },
            nodeWidth: 10 // 缩小节点宽度，这里设置为 10 像素，可根据需求调整
          }
        ]
      },
      judgeForm: {
        steelWgt: null,
        steelTotal: null,
        useWgt: null,
        useTotal: null
      },
      times: {
        startDate: getLastMonthDate(),
        endDate: getNowDay()
      },
      tapButActCurrent: false,
      aodTimingYieldOption: {
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
            { name: '自开炉数', icon: '' },
            { name: '非自开炉数', icon: '' },
            { name: '自开率', icon: 'line' }
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
            data: ['一期板坯', '二期板坯', '三期板坯', '三期方坯', '青丰板坯'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '自开炉数',
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
            name: '非自开炉数',
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
            name: '自开率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点
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
              color: '#f45549'
            },
            data: []
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
        legend: {
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
            data: ['一期板坯', '二期板坯', '三期板坯', '三期方坯', '青丰板坯'],
            // data: ['青丰板坯', '三期方坯', '三期板坯', '二期板坯', '一期板坯'],
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
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [320, 302, 301, 334, 390],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '等待',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '停时',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [220, 182, 191, 234, 290],
            itemStyle: {
              color: '#55c6d4'
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
      chemicComOption: {
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
            { name: '', icon: 'line' },
            {
              name: '目标产量',
              icon: 'none',
              lineStyle: {
                show: true,
                type: 'dashed',
                width: 2,
                color: '#777'
              }
            }
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
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%'
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
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            itemStyle: {
              color: '#5db362'
            },
            data: [20, 14, 15, 18, 21]
          },
          {
            name: '',
            type: 'line',
            symbol: 'none', // 去掉转折点的圆点
            data: [27, 27, 27, 27, 27],
            lineStyle: {
              color: '#ff9800',
              type: 'dashed'
            },
            itemStyle: {
              show: false,
              color: '#ff9800',
              symbol: 'none',
              type: 'dashed'
            },
            label: {
              show: false,
              position: 'top',
              formatter: '{c}.0'
            },
            markPoint: {
              label: {
                show: true,
                color: 'red',
                fontSize: 12, // 增加字体大小设置，确保可见
                position: 'top' // 设置文字位置
              },
              data: [
                {
                  name: '目标产量值',
                  xAxis: '5号',
                  yAxis: 97,
                  symbolSize: 1, //去掉图标识，只展示文字
                  label: {
                    show: true,
                    color: '#ff9800',
                    fontSize: 12, // 增加字体大小设置，确保可见
                    position: 'top', // 设置文字位置
                    formatter: '97%'
                  }
                }
              ]
            }
          }
        ],
        dataZoom: []
      },
      chemicComOptionTwo: {
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
            { name: '', icon: 'line' },
            {
              name: '',
              icon: 'none',
              lineStyle: {
                show: true,
                type: 'dashed',
                width: 2,
                color: '#777'
              }
            }
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
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%'
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
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            itemStyle: {
              color: '#5db362'
            },
            data: [20, 14, 15, 18, 21, 30]
          }
        ],
        dataZoom: []
      },
      myChartSz: null
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse']),
    processedJudgeByTypeAndTimeData() {
      if (
        this.lgCcJudgeByTypeAndTimeDataSon &&
        Object.keys(this.lgCcJudgeByTypeAndTimeDataSon).length > 0
      ) {
        return this.lgCcJudgeByTypeAndTimeDataSon
      }
      return null
    }
  },
  watch: {
    menuCollapse(newValue, oldValue) {
      if (newValue !== oldValue) {
        window.addEventListener('resize', function() {
          this.myChartSz.resize()
        })
      }
    },
    lgCcSmeltByTimeDataSon: {
      handler: 'getLgCcSmeltByTimeDataSon',
      deep: true
    },
    lgCcOpenByTimeDataSon: {
      handler: 'getLgCcOpenByTimeDataSon',
      deep: true
    },
    lgccChemByTimeDataSon: {
      handler: 'getLgccChemByTimeDataSon',
      deep: true
    },
    lgccOneByTimeDataSon: {
      handler: 'getLgccOneByTimeDataSon',
      deep: true
    },
    lgCcJudgeByTimeDataSon: {
      handler: 'getLgCcJudgeByTimeDataSon',
      deep: true
    },
    processedJudgeByTypeAndTimeData(newVal) {
      if (newVal) {
        console.log('数据更新:', newVal)
        // 这里可以执行额外操作，如更新图表数据等
        this.getLgCcJudgeByTypeAndTimeDataSon()
      }
    }
    /*lgCcJudgeByTypeAndTimeDataSon: {
      handler(newVal, oldVal) {
        // 数据变化时执行的逻辑
        console.log('数据更新:', newVal)
        // 这里可以执行额外操作，如触发方法、更新其他数据等
        this.$nextTick(() => {
          this.getLgCcJudgeByTypeAndTimeDataSon()
        })
      }
      // deep: true, // 深度监听对象内部变化（若需要）
      // immediate: true // 初始化时立即执行一次handler
    }*/
  },
  mounted() {
    this.$emit('clickContinuous', this.times)
    // this.getLfRefOutputData()
    // this.getLgContinuData()
    // this.getEChartsData()
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      this.$emit('clickContinuous', this.times)
    },
    //连铸时间分布(作业率)
    getLgCcSmeltByTimeDataSon() {
      let xData = ['一期板坯', '二期板坯', '三期板坯', '三期方坯', '青丰板坯']
      let legendData = ['冶炼', '等待', '停时']
      let smeltMinData = []
      let waitMinData = []
      let stopMinData = []
      let empRateData = []
      xData.forEach(item => {
        this.lgCcSmeltByTimeDataSon.forEach(val => {
          if (item === val.staidDictText) {
            smeltMinData.push(val.smeltMin)
            waitMinData.push(val.waitMin)
            stopMinData.push(val.stopMin)
            empRateData.push(val.ratio)
          }
        })
      })

      this.aodFurnaceProductRhythmOption.series[0].data = smeltMinData
      this.aodFurnaceProductRhythmOption.series[1].data = waitMinData
      this.aodFurnaceProductRhythmOption.series[2].data = stopMinData
      //鼠标移入tooltip-只展示'冶炼', '等待', '停时‘数据
      this.aodFurnaceProductRhythmOption.tooltip = {
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
      // this.aodFurnaceProductRhythmOption.series.pop()
      //顶部数据重叠问题，删除后再赋值
      this.aodFurnaceProductRhythmOption.series.forEach((item, index) => {
        if (item.name === '') {
          this.aodFurnaceProductRhythmOption.series.splice(index, 1)
        }
      })
      //作业率-柱状图顶部展示
      this.aodFurnaceProductRhythmOption.series.push({
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
          formatter: params => `             ${empRateData[params.dataIndex]}%`
        },
        data: empRateData.map(value => 0.0) // 微小的值以便能显示标签但不影响图形
      })
    },
    //连铸钢包自开率
    getLgCcOpenByTimeDataSon() {
      let xData = ['一期板坯', '二期板坯', '三期板坯', '三期方坯', '青丰板坯']
      let openData = []
      let stoveData = []
      let ratioData = []
      xData.forEach(item => {
        this.lgCcOpenByTimeDataSon.forEach(val => {
          if (item === val.staidDictText) {
            openData.push(val.open)
            stoveData.push(val.stove)
            ratioData.push(val.ratio)
          }
        })
      })
      this.aodTimingYieldOption.series[0].data = openData
      this.aodTimingYieldOption.series[1].data = stoveData
      this.aodTimingYieldOption.series[2].data = ratioData
      // 计算每个叠状柱状图de高度
      const seriesData = this.aodTimingYieldOption.series
      const xAxisData = this.aodTimingYieldOption.xAxis[0].data
      xAxisData.forEach((xItem, xIndex) => {
        let cumulativeHeight = 0
        seriesData.forEach((series, seriesIndex) => {
          const dataValue = series.data[xIndex]
          const startPixel = this.$refs.aodTimingYieldRef.echart.convertToPixel(
            { seriesIndex },
            [xIndex, cumulativeHeight]
          )
          const endPixel = this.$refs.aodTimingYieldRef.echart.convertToPixel(
            { seriesIndex },
            [xIndex, cumulativeHeight + dataValue]
          )
          const pixelHeight = Math.abs(endPixel[1] - startPixel[1])
          /*console.log(
            `Column ${xItem}, Series ${
              series.name
            }: Value ${dataValue}, Pixel Height ${pixelHeight}`
          )*/
          cumulativeHeight += dataValue
        })
      })
    },
    //300系化学成分内控合格率
    getLgccChemByTimeDataSon() {
      this.chemicComOption.xAxis[0].data = this.lgccChemByTimeDataSon.x
      this.chemicComOption.series[0].data = this.lgccChemByTimeDataSon.y1
      let lineYellow = []
      this.lgccChemByTimeDataSon.x.forEach(val => {
        lineYellow.push(97)
      })
      this.chemicComOption.series[1].data = lineYellow
      this.chemicComOption.series[1].markPoint.data[0].xAxis = this.lgccChemByTimeDataSon.x[
        this.lgccChemByTimeDataSon.x.length - 1
      ]
      this.chemicComOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(
            0,
            ((this.lgccChemByTimeDataSon.x.length - 7) /
              this.lgccChemByTimeDataSon.x.length) *
              100
          ), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //钢坯一级品率
    getLgccOneByTimeDataSon() {
      this.chemicComOptionTwo.xAxis[0].data = this.lgccOneByTimeDataSon.x
      this.chemicComOptionTwo.series[0].data = this.lgccOneByTimeDataSon.y1
      this.chemicComOptionTwo.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(
            0,
            ((this.lgccOneByTimeDataSon.x.length - 7) /
              this.lgccOneByTimeDataSon.x.length) *
              100
          ), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //钢坯改判信息统计
    getLgCcJudgeByTimeDataSon() {
      this.judgeForm.steelWgt = this.lgCcJudgeByTimeDataSon.steelWgt
      this.judgeForm.steelTotal = this.lgCcJudgeByTimeDataSon.steelTotal
      this.judgeForm.useWgt = this.lgCcJudgeByTimeDataSon.useWgt
      this.judgeForm.useTotal = this.lgCcJudgeByTimeDataSon.useTotal
    },
    //桑基图
    getLgCcJudgeByTypeAndTimeDataSon() {
      this.lgCcJudgeByTypeAndTimeDataSon.data.forEach(item => {
        item.itemStyle = { color: '#333333' }
      })
      let colorList = [
        '#3391ff',
        '#ffc000',
        '#7382a5',
        '#ffc194',
        '#e65b57',
        '#a1e8ce',
        '#ffe064',
        '#b6e4fb'
      ]
      this.lgCcJudgeByTypeAndTimeDataSon.data.forEach(item => {
        if (item.name.includes('(新)')) {
          item.label = { position: 'left' }
        }
      })
      let sourceList = []
      this.lgCcJudgeByTypeAndTimeDataSon.links.forEach(item => {
        this.lgCcJudgeByTypeAndTimeDataSon.data.forEach((val, ind) => {
          if (item.source === val.name) {
            sourceList.push(val.name)
          }
        })
      })
      sourceList = [...new Set(sourceList)]
      this.lgCcJudgeByTypeAndTimeDataSon.links.forEach(item => {
        sourceList.forEach((val, ind) => {
          if (item.source === val) {
            item.lineStyle = { color: colorList[ind] }
          }
        })
      })
      /* let data = {
        nodes: this.lgCcJudgeByTypeAndTimeDataSon.data,
        links: this.lgCcJudgeByTypeAndTimeDataSon.links
      }*/
      /*this.outputStatOption1.series[0].data = data.nodes
      this.outputStatOption1.series[0].links = data.links
      this.outputStatOption1.tooltip = {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: function(params) {
          // console.log('ppp', params)
          if (params.dataType === 'node') {
            return `${params.name}`
          }
          if (params.dataType === 'edge') {
            return `${params.data.slabNo}: ${params.data.source}→${
              params.data.target
            }: ${params.value}`
          }
        }
      }*/
      var chartDom = document.getElementById('chartContainer')
      this.myChartSz = echarts.init(chartDom)
      let data = {
        /*nodes: [
          { name: '304L-LZ0', itemStyle: { color: '#333333' } },
          {
            name: '304L-JSL',
            itemStyle: { color: '#333333' },
            label: { position: 'left' }
          },
          {
            name: 'Solid',
            itemStyle: { color: '#333333' },
            label: { position: 'left' }
          },
          {
            name: 'Biomass imports',
            itemStyle: { color: '#333333' }
          },
          { name: 'Coal imports', itemStyle: { color: '#333333' } },
          {
            name: 'Coal',
            itemStyle: { color: '#333333' },
            label: { position: 'left' }
          },
          { name: 'Coal reserves', itemStyle: { color: '#333333' } }
        ],
        links: [
          {
            source: '304L-LZ0',
            target: '304L-JSL',
            value: 124.729,
            lineStyle: { color: '#e65b57' }
          },
          {
            source: '304L-LZ0304L-LZ0',
            target: 'Solid',
            value: 20.729,
            lineStyle: { color: '#e65b57' }
          },
          {
            source: 'Biomass imports',
            target: '304L-JSL',
            value: 30.597,
            lineStyle: { color: '#7584a7' }
          },
          {
            source: '304L-JSL',
            target: 'Liquid',
            value: 0.597,
            lineStyle: { color: '#e65b57' }
          },
          {
            source: 'Biomass imports',
            target: 'Solid',
            value: 35,
            lineStyle: { color: '#7584a7' }
          },
          {
            source: 'Coal imports',
            target: 'Coal',
            value: 11.606,
            lineStyle: { color: '#a1e8ce' }
          },
          {
            source: 'Coal reserves',
            target: 'Coal',
            value: 63.965,
            lineStyle: { color: 'blue' }
          }
        ],*/
        nodes: this.lgCcJudgeByTypeAndTimeDataSon.data,
        links: this.lgCcJudgeByTypeAndTimeDataSon.links
      }
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function(params) {
            // console.log('ppp', params)
            if (params.dataType === 'node') {
              return `${params.name}`
            }
            if (params.dataType === 'edge') {
              return `${params.data.slabNo}: ${params.data.source}→${
                params.data.target
              }: ${params.value}`
            }
          }
        },
        series: [
          {
            type: 'sankey',
            emphasis: {
              focus: 'adjacency'
            },
            nodeAlign: 'left',
            data: data.nodes,
            links: data.links,
            lineStyle: {
              color: 'source',
              curveness: 1
            },
            width: '90%', // 确保图表宽度填满容器
            height: '100%', // 确保图表高度填满容器
            nodeWidth: 10 // 缩小节点宽度，这里设置为 10 像素，可根据需求调整
          }
        ]
      }
      option && this.myChartSz.setOption(option)
      // 响应式调整
      window.addEventListener('resize', function() {
        this.myChartSz.resize()
      })
    },
    steelChange() {
      this.$emit('steelChangeParent', 'steel')
    },
    useChange() {
      this.$emit('useChangeParent', 'use')
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
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
.staidSpanClass {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
}
.staidSpanClassTwo {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
  text-align: right;
  .staidSpanClassTwoSpan {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-left: 3px;
  }
}
</style>
