<template>
  <div
    class="contentBox">
    <el-row
      style="margin-top: 16px">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick">
        <el-tab-pane
          label="AOD出钢成分"
          name="first">
          <el-row
            :gutter="20">
            <el-col :span="24">
              <el-card
                class="CardTable"
                shadow="never">
                <div style="display: flex;justify-content: space-between">
                  <div>
                    <span class="spanHead">统计分析评价</span>
                  </div>
                  <div>
                    <span class="selectSpan">成分</span>
                    <el-select
                      v-model="form.value"
                      class="custom-select"
                      clearable
                      style="width: 150px"
                      placeholder="请选择"
                      @change="changeSelect">
                      <el-option
                        v-for="item in steelCompositionList"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                    <span class="datePickerLable">开始时间</span>
                    <el-date-picker
                      v-model="times.startDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 150px;margin-right: 16px"
                      placeholder="选择日期">
                    </el-date-picker>
                    <span class="datePickerLable">结束时间</span>
                    <el-date-picker
                      v-model="times.endDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 150px"
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
                  <el-col :span="17">
                    <el-card
                      class="CardTable">
                      <div
                        ref="myElement">
                        <div>
                          <div><span class="spanHeadTwo">数据分布</span></div>
                        </div>
                        <el-row>
                          <el-col :span="17">
                            <div style="height: 428px">
                              <nercar-echarts
                                :legend="avgRollThickOption.legend"
                                :tooltip="avgRollThickOption.tooltip"
                                :grid="avgRollThickOption.grid"
                                :x-axis="avgRollThickOption.xAxis"
                                :y-axis="avgRollThickOption.yAxis"
                                :series="avgRollThickOption.series"
                                :_height="'428px'"
                              />
                            </div>
                          </el-col>
                          <el-col :span="7">
                            <div
                              id="chart-container1"
                              style="height: 428px">
                              <nercar-echarts
                                :legend="ZTRollThickOption.legend"
                                :tooltip="ZTRollThickOption.tooltip"
                                :grid="ZTRollThickOption.grid"
                                :x-axis="ZTRollThickOption.xAxis"
                                :y-axis="ZTRollThickOption.yAxis"
                                :series="ZTRollThickOption.series"
                                :_height="ZtEchartsHeight"
                                :_width="'390px'"
                              />
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="7">
                    <el-row>
                      <el-card
                        style="height: 170px"
                        class="CardTable">
                        <div style="display: flex;justify-content: space-between">
                          <div>
                            <span class="spanHeadTwo">数据统计</span>
                          </div>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                          <div>
                            <span class="dataStatistSpan">样品数量</span>
                            <el-input
                              v-model="dataStatInput.n"
                              style="width: 41%"
                              disabled
                              placeholder=""></el-input>
                          </div>
                          <div>
                            <span class="dataStatistSpan">平均值</span>
                            <el-input
                              v-model="dataStatInput.μ"
                              style="width: 50%"
                              disabled
                              placeholder=""></el-input>
                          </div>
                        </div>
                        <!--                        <el-row :gutter="16">
                          <el-col :span="12">
                            <el-row>
                              <div>
                                <span class="dataStatistSpan">样品数量</span>
                                <el-input
                                  v-model="dataStatInput.n"
                                  style="width: 45%"
                                  disabled
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                          <el-col :span="12">
                            <el-row>
                              <div>
                                <span class="dataStatistSpan">平均值</span>
                                <el-input
                                  v-model="dataStatInput.μ"
                                  style="width: 45%"
                                  disabled
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                        </el-row>-->
                        <el-row
                          :gutter="16"
                          style="margin-top: 12px">
                          <el-col :span="12">
                            <el-row>
                              <div style="margin-left: 15px">
                                <span class="dataStatistSpan">最大值</span>
                                <el-input
                                  v-model="dataStatInput.max"
                                  disabled
                                  style="width: 51%"
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                          <el-col :span="12">
                            <el-row>
                              <div style="margin-left: -17px">
                                <span class="dataStatistSpan">标准偏差</span>
                                <el-input
                                  v-model="dataStatInput.σ"
                                  disabled
                                  style="width: 45%"
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row
                          :gutter="16"
                          style="margin-top: 12px">
                          <el-col :span="12">
                            <el-row>
                              <div style="margin-left: 15px">
                                <span class="dataStatistSpan">最小值</span>
                                <el-input
                                  v-model="dataStatInput.min"
                                  disabled
                                  style="width: 51%"
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                          <el-col :span="12">
                            <el-row>
                              <div>
                                <span class="dataStatistSpan">波动率</span>
                                <el-input
                                  v-model="dataStatInput.bo"
                                  disabled
                                  style="width: 49%"
                                  placeholder=""></el-input>
                              </div>
                            </el-row>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-row>
                    <el-row style="margin-top: 16px">
                      <el-card
                        style="height: 310px"
                        class="CardTable">
                        <div style="display: flex;justify-content: space-between">
                          <div>
                            <span class="spanHeadTwo">过程能力指数分析</span>
                          </div>
                          <el-tag
                            :class="[tapButActCurrentTwo===false?'tagStyle':'tagStyleActive']"
                            icon="el-icon-search"
                            type="success"
                            @click="clickTabCurrentTwo">
                            <i
                              class="el-icon-refresh"
                              style="margin-right: 5px;color: #0D0D0D"></i>
                            <span
                              class="spanStyle">重新计算</span></el-tag>
                        </div>
                        <div style="height: 350px">
                          <el-form
                            :label-position="labelPosition"
                            :model="formLabelAlign"
                            label-width="160px">
                            <el-form-item label="控制上限USL">
                              <template #label>
                                <span class="dataStatistSpan">控制上限USL</span>
                              </template>
                              <el-input
                                v-model="controlTopBottom.usl"
                                style="width: 80%;font-weight: 700;-webkit-text-fill-color: #000000;font-family: Source Han Sans CN;font-size: 14px;line-height: 100%;"
                                suffix-icon="el-icon-edit"
                                placeholder="">
                              </el-input>
                            </el-form-item>
                            <el-form-item label="控制下限DSL">
                              <template #label>
                                <span class="dataStatistSpan">控制下限DSL</span>
                              </template>
                              <el-input
                                v-model="controlTopBottom.dsl"
                                style="width: 80%;font-weight: 700;-webkit-text-fill-color: #000000;font-family: Source Han Sans CN;font-size: 14px;line-height: 100%;"
                                suffix-icon="el-icon-edit"
                                placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item
                              label="过程能力指数Cpk">
                              <template #label>
                                <span class="dataStatistSpan">过程能力指数Cpk</span>
                              </template>
                              <el-input
                                v-model="controlTopBottom.cpk"
                                style="width: 80%;"
                                disabled
                                placeholder=""></el-input>
                            </el-form-item>
                          </el-form>
                          <div style="margin-top: 15px">
                            <div style="height: 30px;background-color: #5db362;display: flex;justify-content: space-around">
                              <div
                                style="color: #ffffff;font-family: Source Han Sans CN;font-weight: 700;font-size: 16px;display: flex;align-items: center">
                                <span>评价等级</span>
                              </div>
                              <div
                                style="color: #ffffff;font-family: Source Han Sans CN;font-weight: 700;font-size: 16px;display: flex;align-items: center">
                                <span>处理建议</span>
                              </div>
                            </div>
                            <el-row>
                              <el-col :span="12">
                                <div
                                  style="background-color: #55c6d4;height: 85px;">
                                  <div class="div-element">
                                    <div class="div-elementSon">
                                      <img
                                        :src="require('assets/images/IndonesiaImages/yuanQuan.svg')"
                                        style="height: 85px;width: 100%;z-index: 1"
                                        alt="">
                                      <div><span
                                        :style="{ color: textColor }"
                                        class="sapnClassCpk">{{ controlTopBottom.cpkGrade }}</span></div>
                                    </div>
                                  </div>
                                </div>
                              </el-col>
                              <el-col :span="12">
                                <div style="background-color: #425d8c;height: 85px;">
                                  <div class="div-elementTwo">
                                    <div class="div-elementSon">
                                      <div
                                        style="height: 85px;width: 100%;z-index: 1">
                                        <div><span class="sapnClassCpkTop">{{ controlTopBottom.treatmentAdviceTop }}</span></div>
                                        <div><span class="sapnClassCpkBottom">{{ controlTopBottom.treatmentAdviceBottom }}</span></div>
                                      </div>
                                    </div>
                                  </div>
                              </div></el-col>
                            </el-row>
                          </div>
                      </div></el-card>
                    </el-row>
                  </el-col>
                </el-row>
                <!--                分析评价结果-->
                <div style="margin-top: 16px">
                  <div style="display: flex;justify-content: space-between">
                    <div style="width: 150px">
                      <span class="spanHead">分析评价结果</span>
                    </div>
                    <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                      <ul>
                        <li
                          v-for="(item, index) in legendStyleList"
                          :key="index + '007'">
                          <div
                            :style="{ backgroundColor: item.color }"
                            class="liDivStyle">
                          </div>
                          <span class="liDivSpan">{{ item.name }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div style="height: 400px;margin-top: 20px">
                    <nercar-echarts
                      :tooltip="moltenSteelOutputOption.tooltip"
                      :legend="moltenSteelOutputOption.legend"
                      :grid="moltenSteelOutputOption.grid"
                      :x-axis="moltenSteelOutputOption.xAxis"
                      :y-axis="moltenSteelOutputOption.yAxis"
                      :series="moltenSteelOutputOption.series"
                      :data-zoom="moltenSteelOutputOption.dataZoom"
                      :_height="'380px'"
                      @chart-click-data="clickEcharts"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!--        <el-tab-pane
          label="AOD化钢渣"
          name="second">
          <el-card
            class="CardTable"
            shadow="never">
            <div style="display: flex;justify-content: space-between">
              <span class="spanHead">统计分析评价</span>
            </div>
          </el-card>
        </el-tab-pane>-->
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  getHalfYearAgoDate,
  getLastMonthDate,
  getNowDay
} from '@/utils/dateUtil'
import { mapState } from 'vuex'
import {
  getLgOutSteelCpk,
  getLgOutSteelData,
  getlgOutSteelNewCpk,
  getLgOutSteelStatistic,
  getLgOutSteelTotal
} from '@/lib/productDataApply/steelmakingProcess'
import { post } from '@/lib/Util'

export default {
  name: 'statisticalAnalysis',
  components: { NercarEcharts },
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      ZtEchartsHeight: null,
      xDataBarAnalyResult: null,
      legendStyleList: [
        {
          name: '能力过高，考虑降本',
          color: '#68aeff'
        },
        {
          name: '状态良好，维持现状',
          color: '#5db362'
        },
        {
          name: '能力欠缺，需要改进',
          color: '#55c6d4'
        },
        {
          name: '不良较多，务必改进',
          color: '#ffda35'
        },
        {
          name: '制程过差，停机改进',
          color: '#f45549'
        },
        {
          name: '样品数量不足50',
          color: '#ff9800'
        }
      ],
      clickEchartsFlag: false,
      xDataFirst: null,
      unit: '%',
      controlTopBottom: {
        usl: 0,
        dsl: 0,
        cpk: null,
        cpkGrade: null,
        cpkGradeAdvice: null,
        treatmentAdviceTop: null,
        treatmentAdviceBottom: null
      },
      elementPram: null,
      steeGradePram: null,
      seriesValuedata: null,
      listData: [],
      xAxis: [],
      steelCompositionList: null,
      activeName: 'first',
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getNowDay()
      },
      tapButActCurrent: false,
      tapButActCurrentTwo: false,
      form: {
        value: '2'
      },
      ZTRollThickOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        grid: [
          {
            left: '2%',
            right: '5%',
            bottom: '8%',
            top: '18%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            min: null,
            name: '',
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false
            },
            show: false,
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
              show: false
            },
            axisLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            // min: minValue1,
            // max: 0.5,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '直方图（次数）',
            type: 'bar',
            data: null,
            // barWidth: 10,
            itemStyle: { color: '#5db362' }
          },
          {
            name: '正态分布曲线',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            data: null,
            smooth: true,
            itemStyle: {
              color: '#ff9800'
            }
          }
        ]
      },
      avgRollThickOption: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function(params) {
            let dot =
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
              '#5db362' +
              ';"></span>'
            return dot + `${params.value[1]}`
          }
        },
        legend: {
          top: '1%',
          data: [
            {
              name: '',
              icon: 'circle',
              itemStyle: {
                symbolSize: 10 // 缩小点的大小
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
        xAxis: [
          {
            show: false,
            // type: 'time',
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
            min: null,
            // max: 150,
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
            name: '',
            type: 'scatter',
            data: [],
            trendLine: {
              show: true,
              type: 'linear', // 线性拟合
              lineStyle: {
                color: '#ff4d4f',
                type: 'dashed'
              }
            },
            itemStyle: {
              color: '#75bd42'
            }
          },
          {
            type: 'line',
            data: null,
            name: '拟合线',
            symbol: 'none', // 不显示端点标记
            lineStyle: {
              color: 'orange'
              // type: 'dashed'
            }
          },
          // 绘制第一条红色标准线
          {
            name: '红线1',
            type: 'line',
            // data: [[0, 8.12], [8.12, 8.12]],
            data: null,
            lineStyle: {
              color: 'red',
              width: 1
            },
            showSymbol: false
          },
          // 绘制第三条红色标准线
          {
            name: '红线2',
            type: 'line',
            // data: [[0, 8.01], [10, 8.01]],
            data: null,
            lineStyle: {
              color: 'red',
              width: 1
            },
            showSymbol: false
          }
        ]
      },
      dataStatInput: {
        n: null,
        μ: null,
        σ: null,
        max: null,
        min: null,
        bo: null
      },
      moltenSteelOutputOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let color =
                params[i].seriesType === 'bar' ? params[i].color : '#a146b0'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                color +
                ';"></span>'
              result +=
                dot + params[i].seriesName + ': ' + params[i].value + '<br>'
            }
            return result
          }
        },
        legend: {
          show: false // 或者直接设置为 false
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '7%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
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
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        series: [
          {
            name: 'Cpk值',
            type: 'bar',
            barWidth: 85,
            data: [],
            label: {
              show: true, // 显示数值
              position: 'top', // 数值显示在柱状图顶部
              color: '#333', // 文字颜色
              fontSize: 14 // 文字大小
              // formatter: '{c}个' // 自定义格式，这里添加了单位
            },
            itemStyle: {
              color: function(params) {
                // 根据数值大小返回不同颜色
                //样品数小于50优先级最高
                if (params.data.lineValue < 50) return '#ff9800'

                if (params.value >= 1.67) return '#68aeff'
                else if (params.value < 1.67 && params.value >= 1.33)
                  return '#5db362'
                else if (params.value < 1.33 && params.value >= 1.0)
                  return '#55c6d4'
                else if (params.value >= 0.67 && params.value < 1.0)
                  return '#ffda35'
                else if (params.value < 0.67) return '#f45549'
              }
            }
            /*itemStyle: {
              normal: {
                color: function(params) {
                  return barColors[params.dataIndex]
                }
              }
            }*/
          },
          {
            name: '样品数量',
            type: 'line',
            // smooth: true, // 开启平滑曲线
            // symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value + ' °C'
              }
            },
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              fontSize: 14 // 文字大小
            },
            itemStyle: {
              color: '#a146b0'
            },
            data: []
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
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse']),
    textColor() {
      if (this.controlTopBottom.cpk >= 1.67) return '#68aeff'
      if (this.controlTopBottom.cpk < 1.67 && this.controlTopBottom.cpk >= 1.33)
        return '#5db362'
      if (this.controlTopBottom.cpk < 1.33 && this.controlTopBottom.cpk >= 1.0)
        return '#55c6d4'
      if (this.controlTopBottom.cpk >= 0.67 && this.controlTopBottom.cpk < 1.0)
        return '#ffda35'
      if (this.controlTopBottom.cpk < 0.67) return '#f45549'
      return 'yellow'
    }
  },
  watch: {
    menuCollapse(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$nextTick(() => {
          const width = this.$refs.myElement.offsetWidth
          if (this.ZtEchartsHeight === width) {
            this.ZtEchartsHeight = width * 0.5 + 'px'
          }
          if (this.ZtEchartsHeight < width) {
            this.ZtEchartsHeight = width * 0.3 + 'px'
          }
        })
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      const width = this.$refs.myElement.offsetWidth
      this.ZtEchartsHeight = width * 0.4 + 'px'
    })
    this.getLgOutSteelDataListAndResult()
    this.steelCompositionList = this.dataDictionary['lg-cgType']
  },
  methods: {
    clickTabCurrent() {
      this.clickEchartsFlag = false
      this.tapButActCurrent = true

      this.getLgOutSteelDataListAndResult()

      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    async clickTabCurrentTwo() {
      //重新计算cpk
      const res = await post(getlgOutSteelNewCpk, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        avgValue: this.dataStatInput.μ.replace(/%/g, ''),
        stddevValue: this.dataStatInput.σ.replace(/%/g, ''),
        usl: this.controlTopBottom.usl,
        lsl: this.controlTopBottom.dsl
      })
      if (res.success) {
        this.controlTopBottom.cpkGrade = res.data[0].cpkGrade
        // this.controlTopBottom.treatmentAdvice = res.data[0].treatmentAdvice
        const [var1, var2] = res.data[0].treatmentAdvice.split('，')
        this.controlTopBottom.treatmentAdviceTop = var1
        this.controlTopBottom.treatmentAdviceBottom = var2

        this.controlTopBottom.cpk = res.data[0].cpk
      }

      this.tapButActCurrentTwo = true
      setTimeout(() => {
        this.tapButActCurrentTwo = false
      }, 1000)
    },
    handleClick() {},
    // 二维数组去重（子数组元素完全相同时视为重复）
    unique2DArray(histogramData) {
      if (!Array.isArray(histogramData)) return []
      const seen = new Set() // 用于存储已出现过的子数组字符串
      return histogramData.filter(item => {
        // 将子数组转换为JSON字符串（确保顺序一致时，相同元素的子数组转换后字符串相同）
        const str = JSON.stringify(item)
        // 如果Set中没有该字符串，则保留该子数组并添加到Set中
        if (!seen.has(str)) {
          seen.add(str)
          return true
        }
        return false
      })
    },
    // 处理二维数组：按子数组第一个元素分组，累加第二个元素的值
    mergeArray(uniqueData) {
      if (!Array.isArray(uniqueData)) return []

      const map = new Map()
      uniqueData.forEach(item => {
        // 取子数组的第一个元素作为键，第二个元素作为值
        const key = item[0]
        const value = item[1] || 0 // 防止第二个元素为undefined

        if (map.has(key)) {
          // 若键已存在，累加第二个元素的值
          map.set(key, map.get(key) + value)
        } else {
          // 若键不存在，直接存入
          map.set(key, value)
        }
      })

      // 将Map转换为二维数组 [[key1, sum1], [key2, sum2], ...]
      return Array.from(map.entries())
    },
    getZTData(
      min,
      max,
      histogramData,
      curveData,
      binCount,
      minValue,
      minValue1,
      maxValue
    ) {
      this.$nextTick(() => {
        const width = this.$refs.myElement.offsetWidth
        this.ZtEchartsHeight = width * 0.4 + 'px'
      })
      this.ZTRollThickOption.xAxis[0].min = minValue
      this.ZTRollThickOption.series[0].data = histogramData
      this.ZTRollThickOption.series[1].data = curveData
    },
    /*-------------封装方法-------------*/
    // 计算线性回归参数 a 和 b
    linearRegression(xData, yData) {
      const n = xData.length
      let sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0

      for (let i = 0; i < n; i++) {
        sumX += xData[i]
        sumY += yData[i]
        sumXY += xData[i] * yData[i]
        sumX2 += xData[i] * xData[i]
      }

      const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
      const b = (sumY - a * sumX) / n

      return { a, b }
    },
    // 生成拟合线数据点
    generateTrendLineData(xData, a, b) {
      const minX = Math.min(...xData)
      const maxX = Math.max(...xData)
      return [
        [minX, a * minX + b], // 拟合线起点
        [maxX, a * maxX + b] // 拟合线终点
      ]
    },
    /*-------------出钢成分-------------*/
    //成分选择
    changeSelect(val) {
      console.log('666', val)
      this.form.value = val
    },
    //单独获取分析评价结果(横坐标，即各钢种号进行传参)
    async getLgOutSteelDataListAndResult() {
      const res = await post(getLgOutSteelTotal, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        let xData = []
        res.data.forEach(item => {
          xData.push(item.steeGrade)
        })
        xData = [...new Set(xData)]

        //-----------分析评价结果(曲线值、柱状图值)
        const steelGrades = xData.toString()
        await this.getLgOutSteelCpkList(steelGrades)
      }
    },
    //数据接口获取（总-散点图）
    async getLgOutSteelDataListTotal() {
      const res = await post(getLgOutSteelData, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steeGrade: this.clickEchartsFlag
          ? this.steeGradePram
          : this.xDataBarAnalyResult[0]
      })
      if (res.success) {
        if (!this.clickEchartsFlag) {
          // this.xDataFirst = res.data[0].steeGrade
          this.xDataFirst = this.xDataBarAnalyResult[0]

          // this.steeGradePram = res.data[0].steeGrade
          this.steeGradePram = this.xDataBarAnalyResult[0]
          await this.getLgOutSteelStatisticList()
        }

        let allScatterYData = []
        let allScatterXData = []
        let i = 0
        res.data.forEach(item => {
          //成分选择不同切换
          if (this.form.value === '1' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.ni])
            allScatterXData.push(item.ni)
            i++
          }
          if (this.form.value === '2' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.c])
            allScatterXData.push(item.c)
            i++
          }
          if (this.form.value === '3' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.cr])
            allScatterXData.push(item.cr)
            i++
          }
          if (this.form.value === '4' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.s])
            allScatterXData.push(item.s)
            i++
          }
          if (this.form.value === '5' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.p])
            allScatterXData.push(item.p)
            i++
          }
          if (this.form.value === '6' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.mn])
            allScatterXData.push(item.mn)
            i++
          }
          if (this.form.value === '7' && this.xDataFirst === item.steeGrade) {
            allScatterYData.push([i, item.si])
            allScatterXData.push(item.si)
            i++
          }
        })

        //正态分布源数据格式
        const result = allScatterXData.map(item => ({ value: item }))
        this.seriesValuedata = [...result]

        //---------正态分布图
        // console.log('allScatterXData', allScatterXData) //散点图数值点
        this.ZtFenBuEchaets(allScatterXData)

        //----------散点图
        //散点图纵坐标
        const xDataMin = Math.min(...allScatterXData)
        this.avgRollThickOption.yAxis[0].min = (xDataMin * 0.99).toFixed(2)

        //散点图数据
        let allDotsList = [...allScatterYData]
        this.avgRollThickOption.series[0].data = allDotsList

        //散点图横坐标
        let allXdata = []
        allDotsList.forEach(item => {
          allXdata.push(item[0])
        })
        this.avgRollThickOption.xAxis[0].data = allXdata

        //----------计算拟合线
        // 分离 x 和 y 数据
        const xDataSplit = allDotsList.map(item => item[0])
        const yDataSplit = allDotsList.map(item => item[1])
        // 计算拟合线参数
        const { a, b } = this.linearRegression(xDataSplit, yDataSplit)
        const trendLineData = this.generateTrendLineData(xDataSplit, a, b)
        this.avgRollThickOption.series[1].data = trendLineData

        //-----------控制上下限
        const topLine = [
          [0, Number(this.controlTopBottom.usl)],
          [trendLineData[1][0], Number(this.controlTopBottom.usl)]
        ]
        const bottomLine = [
          [0, Number(this.controlTopBottom.dsl)],
          [trendLineData[1][0], Number(this.controlTopBottom.dsl)]
        ]
        this.avgRollThickOption.series[2].data = topLine
        this.avgRollThickOption.series[3].data = bottomLine
      }
    },
    sum(array) {
      let s = 0
      array.forEach(function(val, idx, arr) {
        s += Number(val)
      }, 0)
      return s
    },
    //求和
    sumXY(x, y) {
      return Number(x) + Number(y)
    },
    //求平方
    square(x) {
      return Number(x) * Number(x)
    },

    ZtFenBuEchaets(values) {
      // 假设这是后端返回的数据（你可以改成 fetch 请求）
      /*const values = [
        12.3,
        11.8,
        12.1,
        12.5,
        12.0,
        11.9,
        12.2,
        12.4,
        12.1,
        12.3
      ]*/

      // 计算均值
      const mean = values.reduce((a, b) => a + b, 0) / values.length

      // 计算标准差
      const std = Math.sqrt(
        values.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) /
          values.length
      )

      // 生成正态分布曲线点
      const curveData = []
      const minX = mean - 3 * std
      const maxX = mean + 3 * std
      const step = (maxX - minX) / 100

      // 左侧y=0点，x比minX再小一点
      curveData.push([minX - std, 0])

      for (let x = minX; x <= maxX; x += step) {
        const y =
          (1 / (std * Math.sqrt(2 * Math.PI))) *
          Math.exp(-((x - mean) ** 2) / (2 * std * std))
        curveData.push([x, Number(y.toFixed(3))])
      }
      const curveDataEnd = curveData.map(row =>
        row.map(
          value =>
            typeof value === 'number' ? Number(value.toFixed(2)) : value
        )
      )
      // console.log('curveData', JSON.stringify(curveData))
      // console.log('curveDataEnd', curveDataEnd)

      // 右侧y=0点，x比maxX再大一点
      curveData.push([maxX + std, 0])

      // 准备直方图数据（频率）
      const binCount = values.length
      const bins = Array(binCount).fill(0)
      const min = Math.min(...values)
      const max = Math.max(...values)
      const binSize = (max - min) / binCount

      values.forEach(v => {
        const idx = Math.min(Math.floor((v - min) / binSize), binCount - 1)
        bins[idx]++
      })

      const histogramData = bins.map((count, i) => {
        const x = Number((min + i * binSize + binSize / 2).toFixed(3))
        return [x, count]
      })
      // 去重处理
      const uniqueData = this.unique2DArray(histogramData)
      let mergedData = null
      mergedData = this.mergeArray(uniqueData)
      console.log('mergedData', mergedData)

      if (mergedData.length > 37) {
        const histogramData100 = bins.map((count, i) => {
          const x = Number((min + i * binSize + binSize / 2).toFixed(2)) //Math.floor(num * 100) / 100
          return [x, count]
        })

        const uniqueData100 = this.unique2DArray(histogramData100)
        mergedData = this.mergeArray(uniqueData100)

        /*if (this.mergeArray(uniqueData100).length > 35) {
          const histogramData200 = bins.map((count, i) => {
            const x = Number((min + i * binSize + binSize / 2).toFixed(1)) //Math.floor(num * 100) / 100
            return [x, count]
          })

          const uniqueData200 = this.unique2DArray(histogramData200)
          mergedData = this.mergeArray(uniqueData200)
        } else {
          mergedData = this.mergeArray(uniqueData100)
        }*/
        console.log('mergedData100', mergedData)
      }

      // console.log('uniqueData', uniqueData)
      // console.log('mergedData', mergedData)

      // console.log('histogramData', histogramData)
      // console.log('curveData', curveData)

      // 提取所有第一个数值并计算最小值
      const firstValues = curveData.map(item => item[0])
      const minValue = Math.min(...firstValues)

      const firstValues1 = curveData.map(item => item[1])
      const minValue1 = Math.min(...firstValues1)
      const firstValues2 = curveData.map(item => item[1])
      const maxValue = Math.max(...firstValues2)

      this.getZTData(
        min,
        max,
        mergedData,
        curveData,
        binCount,
        minValue,
        minValue1,
        maxValue
      )
    },

    //数据统计：样品数量 、标准偏差 、波动率、平均值、最大值、最小值
    async getLgOutSteelStatisticList() {
      switch (this.form.value) {
        case '1':
          this.elementPram = 'Ni'
          break
        case '2':
          this.elementPram = 'C'
          break
        case '3':
          this.elementPram = 'Cr'
          break
        case '4':
          this.elementPram = 'S'
          break
        case '5':
          this.elementPram = 'P'
          break
        case '6':
          this.elementPram = 'Mn'
          break
        case '7':
          this.elementPram = 'Si'
          break
      }
      const res = await post(getLgOutSteelStatistic, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steeGrade: this.steeGradePram,
        element: this.elementPram
      })
      if (res.success) {
        this.dataStatInput.n = res.data[0].n
        this.dataStatInput.μ = res.data[0].μ + '%'
        this.dataStatInput.σ = res.data[0].σ + '%'
        this.dataStatInput.max = res.data[0].max + '%'
        this.dataStatInput.min = res.data[0].min + '%'
        this.dataStatInput.bo = res.data[0].bo + '%'
      }
    },
    //过程能力指数分析Cpk-分析评价结果(新
    async getLgOutSteelCpkList(steelGrades) {
      switch (this.form.value) {
        case '1':
          this.elementPram = 'Ni'
          break
        case '2':
          this.elementPram = 'C'
          break
        case '3':
          this.elementPram = 'Cr'
          break
        case '4':
          this.elementPram = 'S'
          break
        case '5':
          this.elementPram = 'P'
          break
        case '6':
          this.elementPram = 'Mn'
          break
        case '7':
          this.elementPram = 'Si'
          break
      }
      const res = await post(getLgOutSteelCpk, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steeGrade: steelGrades,
        element: this.elementPram
      })
      if (res.success) {
        let xDataBar = []
        let lineYData = []
        let barYData = []
        let uslList = []
        let dslList = []
        // 按 unitCpk 字段从大到小排序，即cpk的值按从大到小
        res.data.sort((a, b) => b.cpk - a.cpk)

        this.controlTopBottom.cpkGrade = res.data[0].cpkGrade
        const [var1, var2] = res.data[0].treatmentAdvice.split('，')
        this.controlTopBottom.treatmentAdviceTop = var1
        this.controlTopBottom.treatmentAdviceBottom = var2
        this.controlTopBottom.usl = res.data[0].usl
        this.controlTopBottom.dsl = res.data[0].lsl

        res.data.forEach(item => {
          lineYData.push(item.n)
          barYData.push(Number(item.cpk).toFixed(4))
          xDataBar.push(item.steeGrade)
          uslList.push(item.usl)
          dslList.push(item.lsl)
        })
        this.xDataBarAnalyResult = xDataBar

        //(总)
        await this.getLgOutSteelDataListTotal()

        this.moltenSteelOutputOption.xAxis[0].data = xDataBar
        this.moltenSteelOutputOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: (8 / xDataBar.length) * 100 // 初始显示前 5 条数据
          }
        ]

        if (!this.clickEchartsFlag) {
          this.controlTopBottom.cpk = barYData[0]
        }

        //将折线图的值合并到柱状图，用来判断样品数小于50柱状图颜色展示
        let barYDataEnd = []
        barYData.forEach(item => {
          barYDataEnd.push({
            value: item,
            lineValue: null,
            uslValue: null,
            dslValue: null
          })
        })
        lineYData.forEach((item, index) => {
          barYDataEnd[index].lineValue = item
        })
        uslList.forEach((item, index) => {
          barYDataEnd[index].uslValue = item
        })
        dslList.forEach((item, index) => {
          barYDataEnd[index].dslValue = item
        })

        this.moltenSteelOutputOption.series[0].data = barYDataEnd
        this.moltenSteelOutputOption.series[1].data = lineYData
      }
    },
    //点击
    async clickEcharts(val) {
      this.clickEchartsFlag = true

      this.controlTopBottom.cpk = val.data.value //当前钢种的cpk值
      this.steeGradePram = val.data.name //钢种号

      this.xDataFirst = val.data.name

      //判断cpk评价等级，处理意见
      if (this.controlTopBottom.cpk >= 1.67) {
        this.controlTopBottom.cpkGradeAdvice = '能力过高，考虑降本'
        this.controlTopBottom.cpkGrade = 'A+'
      }
      if (
        this.controlTopBottom.cpk < 1.67 &&
        this.controlTopBottom.cpk >= 1.33
      ) {
        this.controlTopBottom.cpkGradeAdvice = '状态良好，维持现状'
        this.controlTopBottom.cpkGrade = 'A'
      }
      if (
        this.controlTopBottom.cpk < 1.33 &&
        this.controlTopBottom.cpk >= 1.0
      ) {
        this.controlTopBottom.cpkGradeAdvice = '能力欠缺，需要改进'
        this.controlTopBottom.cpkGrade = 'B'
      }
      if (
        this.controlTopBottom.cpk >= 0.67 &&
        this.controlTopBottom.cpk < 1.0
      ) {
        this.controlTopBottom.cpkGradeAdvice = '不良较多，务必改进'
        this.controlTopBottom.cpkGrade = 'C'
      }
      if (this.controlTopBottom.cpk < 0.67) {
        this.controlTopBottom.cpkGradeAdvice = '制程过差，停机改进'
        this.controlTopBottom.cpkGrade = 'D'
      }
      const [var1, var2] = this.controlTopBottom.cpkGradeAdvice.split('，')
      this.controlTopBottom.treatmentAdviceTop = var1
      this.controlTopBottom.treatmentAdviceBottom = var2

      //上下限
      this.controlTopBottom.usl = val.data.data.uslValue
      this.controlTopBottom.dsl = val.data.data.dslValue

      await this.getLgOutSteelStatisticList()
      await this.getLgOutSteelDataListTotal()
    }
  }
}
</script>

<style scoped lang="less">
.div-element {
  background: url('assets/images/IndonesiaImages/beiJin.svg') center/cover
    no-repeat;
  width: 100%;
  height: 85px; /* 使div高度等于视口高度 */
  .div-elementSon {
    position: relative;
    .sapnClassCpk {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0; /* 清除默认边距 */
      z-index: 2;
      font-family: Arial;
      font-weight: 700;
      font-size: 40px;
      //color: #55c6d4;
      vertical-align: middle;
    }
  }
}
.div-elementTwo {
  background: url('assets/images/IndonesiaImages/beiJin.svg') center/cover
    no-repeat;
  width: 100%;
  height: 85px; /* 使div高度等于视口高度 */
  .div-elementSon {
    position: relative;
    .sapnClassCpkTop {
      position: absolute;
      top: 36%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0; /* 清除默认边距 */
      z-index: 2;
      font-weight: 700;
      font-size: 14px;
      color: #000000;
      vertical-align: middle;
    }
    .sapnClassCpkBottom {
      position: absolute;
      top: 64%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0; /* 清除默认边距 */
      z-index: 2;
      font-weight: 700;
      font-size: 14px;
      color: #000000;
      vertical-align: middle;
    }
  }
}
.contentBox {
  margin-top: 16px;
  margin-bottom: 16px;
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
/* 设置未激活标签的背景色 ebf6ec*/
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  background-color: #ebf6ec; /* 非活动标签背景色 */
  //color: #666; /* 非活动标签文字颜色 */
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  //line-height: 100%;
  vertical-align: middle;
}

::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #fff; /* 活动标签背景色 */
  color: #5db362; /* 活动标签文字颜色 */
  font-weight: 700;
  font-size: 14px;
  //line-height: 100%;
  vertical-align: middle;
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
  //width: 150px;
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
//禁用文字加黑
/deep/ input[disabled],
input:disabled,
input.disabled {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  -webkit-text-fill-color: #000000; /*disabled里面字的颜色*/
  background: #f5f7fa;
  -webkit-opacity: 1;
  opacity: 1;
  cursor: not-allowed;
  font-style: normal;
}
ul {
  list-style-type: none;
  display: flex;
  padding: 0;
}

li {
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.liDivStyle {
  display: inline-block;
  content: '';
  width: 24px;
  height: 12px;
  margin-right: 8px;
}
.liDivSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
#chart-container1 {
  transform: rotate(90deg);
  position: absolute;
  right: -35px;
  top: 0px;
  width: 380px;
  height: 428px;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;
}
.dataStatistSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
</style>
