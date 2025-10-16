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
            <span class="spanHead">分条产线</span>
            <div style="display: flex">
              <div style="margin-right: 10px">
                <el-tag
                  :class="[flagOfEleDaySteelPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabEleSteelPro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                <el-tag
                  :class="[flagOfEleMonthSteelPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabEleSteelPro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                <el-tag
                  :class="[flagOfEleYearSteelPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabEleSteelPro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
              </div>
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
          </div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;align-items: center">
                  <div><span class="spanHeadTwo">实时监控</span></div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    popper-class="atooltip"
                    content="当前产线实际生产状态，不受查询时间影响。"
                    placement="top">
                    <img
                      :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                      style="width: 16px;height: 16px;margin-left: 8px"
                      alt="实时监控">
                  </el-tooltip>
                </div>
                <div style="height: 350px;padding-top: 10px">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div :class="greenGreyMonitor[0].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="greenGreyMonitor[0].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">1#产线</span>
                        </div>
                        <div :class="greenGreyMonitor[0].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.realTimeOutputOne }}
                                <span style="font-size: 16px">t</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">实时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.machineTimeOutputOne }}
                                <span style="font-size: 16px">t/h</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">机时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivNoLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.prodHoursOne }}
                                <span style="font-size: 16px">%</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">成材率</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div :class="greenGreyMonitor[1].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="greenGreyMonitor[1].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">2#产线</span>
                        </div>
                        <div :class="greenGreyMonitor[1].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.realTimeOutputTwo }}
                                <span style="font-size: 16px">t</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">实时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.machineTimeOutputTwo }}
                                <span style="font-size: 16px">t/h</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">机时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivNoLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.prodHoursTwo }}
                                <span style="font-size: 16px">%</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">成材率</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div :class="greenGreyMonitor[2].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="greenGreyMonitor[2].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">3#产线</span>
                        </div>
                        <div :class="greenGreyMonitor[2].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.realTimeOutputThree }}
                                <span style="font-size: 16px">t</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">实时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.machineTimeOutputThree }}
                                <span style="font-size: 16px">t/h</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">机时产量</span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivNoLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor.prodHoursThree }}
                                <span style="font-size: 16px">%</span>
                              </span>
                              <div class="realTimeOutput">
                                <span class="realTimeOutputSpan">成材率</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex">
                    <span class="spanHeadTwo">产量统计</span>
                    <div style="padding-top: 6px;padding-left: 5px">
                      <img
                        :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                        alt="产量统计">
                    </div>
                  </div>
                  <!--                  <div>
                    <span class="selectSpan">产线选择</span>
                    <el-select
                      v-model="selectInspectData.materialValue"
                      popper-class="custom-select-dropdown"
                      placeholder="请选择"
                      @change="changeInspectData">
                      <el-option
                        v-for="item in tableInspectOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>-->
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="outputStatOption1.legend"
                    :tooltip="outputStatOption1.tooltip"
                    :grid="outputStatOption1.grid"
                    :x-axis="outputStatOption1.xAxis"
                    :y-axis="outputStatOption1.yAxis"
                    :series="outputStatOption1.series"
                    :data-zoom="outputStatOption1.dataZoom"
                    :_height="'330px'"
                    @chart-click-data="clickEchartPassRate"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisiblePassRate"
      title="各机组成材率">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsPassRateFlag"
            :legend="passRateOption.legend"
            :tooltip="passRateOption.tooltip"
            :grid="passRateOption.grid"
            :x-axis="passRateOption.xAxis"
            :y-axis="passRateOption.yAxis"
            :series="passRateOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  getHalfYearAgoDate,
  getLastMonthDate,
  getNowDay,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import {
  getFenStopType,
  getProcessDefectCount,
  getRollStopType,
  getTxFtProdByTime,
  getTxFtProdNow,
  getTxImportantProcessByTime,
  getSlittingOutputDetail
} from '@/lib/productDataApply/backWashingProcess'
import { post } from '@/lib/Util'
import { mapState } from 'vuex'

export default {
  name: 'splitProductLine',
  components: { NercarEcharts },
  data() {
    return {
      passRateOption: {
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
              const unit = '%'
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
            name: '单位：%',
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
      dialogTableVisiblePassRate: false,
      showEchartsPassRateFlag: false,
      flagOfEleDaySteelPro: true,
      flagOfEleMonthSteelPro: false,
      flagOfEleYearSteelPro: false,
      dateTypePraSteelPro: 'day',
      greenGreyMonitor: [
        {
          greenGreyFlag: true,
          productMonitor: '1#产线'
        },
        {
          greenGreyFlag: true,
          productMonitor: '2#产线'
        },
        {
          greenGreyFlag: true,
          productMonitor: '3#产线'
        }
      ],
      greenGreyFlag: false,
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getPreviousDate()
      },
      selectInspectData: {
        materialValue: '99'
      },
      tableInspectOptions: null,
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
      outputStatOption1: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = item.seriesName === '成材率' ? '%' : 't'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          },
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          }
        },
        legend: {
          // data: ['重量', '作业率']
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#线', icon: '' },
            { name: '2#线', icon: '' },
            { name: '3#线', icon: '' },
            { name: '成材率', icon: 'line' }
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
            data: [1, 2, 3, 4, 5, 6, 7],
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
            name: '单位：t',
            // interval: 50,
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
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#线',
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            data: [1, 2, 12, 33, 4, 12, 7],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '2#线',
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            data: [33, 4, 13, 32, 12, 22, 8],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '3#线',
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            data: [33, 4, 13, 32, 12, 22, 8],
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '成材率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [1, 2, 3, 4, 3, 5, 6, 2],
            itemStyle: {
              color: '#a146b0'
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
      realTimeMonitor: {
        realTimeOutputOne: '0.00',
        machineTimeOutputOne: '0.00',
        prodHoursOne: '0.00',
        realTimeOutputTwo: '0.00',
        machineTimeOutputTwo: '0.00',
        prodHoursTwo: '0.00',
        realTimeOutputThree: '0.00',
        machineTimeOutputThree: '0.00',
        prodHoursThree: '0.00'
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  watch: {
    dialogTableVisiblePassRate(newVal, oldVal) {
      this.showEchartsPassRateFlag = newVal
    }
  },
  mounted() {
    this.getTxFtProdNowData()
    this.getRollStopDataType()
    this.getTxFtProdByTimeData()

    this.tableInspectOptions = this.dataDictionary['rtsx-productionLine']
    //去重
    const codeSet2 = new Set()
    this.tableInspectOptions = this.tableInspectOptions.filter(item => {
      if (!codeSet2.has(item.code)) {
        codeSet2.add(item.code)
        return true
      }
      return false
    })
  },
  activated() {
    //定时器十分钟刷新停机状态
    this.timerId = setInterval(async () => {
      try {
        await this.getRollStopDataType()
      } catch (error) {
        console.error('异步方法调用出错:', error)
      }
    }, 600000)
  },
  deactivated() {
    //切换页面后销毁定时器
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  },
  methods: {
    clickEchartPassRate(val) {
      this.dialogTableVisiblePassRate = true

      this.getPassRateData(val.data.name)
    },
    async getPassRateData(accountDate) {
      const res = await post(getSlittingOutputDetail, {
        dateType: this.dateTypePraSteelPro,
        accDate: accountDate
      })
      if (res.success) {
        const result = this.processProductionLineData(res.data)
        console.log('result', result)

        this.passRateOption.yAxis[0].data = []
        this.passRateOption.series[0].data = []

        this.passRateOption.series[0].data = result.ratioArray
        this.passRateOption.yAxis[0].data = result.proLineArray
      }
    },
    //排序
    processProductionLineData(data) {
      // 步骤1：从原始数据中提取产线列表和对应的ratio值
      const lineWithRatio = data.map(item => {
        return {
          lineName: `${item.proLine}#产线`, // 格式化产线名（如 1#产线）
          ratio: item.ratio || 0 // 提取ratio值（默认0避免异常）
        }
      })

      // 步骤2：按ratio值由大到小排序
      const sortedData = lineWithRatio.sort((a, b) => a.ratio - b.ratio)

      // 步骤3：拆分产线数组和对应ratio值数组
      const proLineArray = sortedData.map(item => item.lineName) // 产线数组
      const ratioArray = sortedData.map(item => item.ratio) // 对应ratio值数组

      // 返回结果
      return {
        sortedData,
        proLineArray,
        ratioArray
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
      this.getTxFtProdNowData()
      this.getRollStopDataType()
      this.getTxFtProdByTimeData()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //实时监控
    async getTxFtProdNowData() {
      const res = await post(getTxFtProdNow, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        res.data.forEach(item => {
          if (item.proLine === '1') {
            this.realTimeMonitor.realTimeOutputOne = Number(
              item.whiteWgt
            ).toFixed(2)
            this.realTimeMonitor.machineTimeOutputOne = Number(
              item.prodHours
            ).toFixed(2)
            this.realTimeMonitor.prodHoursOne = Number(item.ratio).toFixed(2)
          }
          if (item.proLine === '2') {
            this.realTimeMonitor.realTimeOutputTwo = Number(
              item.whiteWgt
            ).toFixed(2)
            this.realTimeMonitor.machineTimeOutputTwo = Number(
              item.prodHours
            ).toFixed(2)
            this.realTimeMonitor.prodHoursTwo = Number(item.ratio).toFixed(2)
          }
          if (item.proLine === '3') {
            this.realTimeMonitor.realTimeOutputThree = Number(
              item.whiteWgt
            ).toFixed(2)
            this.realTimeMonitor.machineTimeOutputThree = Number(
              item.prodHours
            ).toFixed(2)
            this.realTimeMonitor.prodHoursThree = Number(item.ratio).toFixed(2)
          }
        })
      }
    },
    //退洗-实时监控-停机检测
    async getRollStopDataType() {
      const res = await post(getFenStopType, {})
      if (res.success) {
        res.data.map(item => {
          item.is_recent == '1'
            ? (item.is_recent = true)
            : (item.is_recent = false)
        })
        this.greenGreyMonitor.forEach((item, index) => {
          res.data.forEach(val => {
            if (item.productMonitor.slice(0, 1) === val.proLine) {
              this.greenGreyMonitor[index].greenGreyFlag = val.is_recent
            }
          })
        })
      }
    },
    //产量统计
    clickTabEleSteelPro(params) {
      if (params === 'day') {
        this.flagOfEleDaySteelPro = true
        this.flagOfEleMonthSteelPro = false
        this.flagOfEleYearSteelPro = false
      } else if (params === 'month') {
        this.flagOfEleDaySteelPro = false
        this.flagOfEleMonthSteelPro = true
        this.flagOfEleYearSteelPro = false
      } else if (params === 'quarter') {
        this.flagOfEleDaySteelPro = false
        this.flagOfEleMonthSteelPro = false
        this.flagOfEleYearSteelPro = true
      }
      this.dateTypePraSteelPro = params
      this.getTxFtProdByTimeData()
    },
    changeInspectData(val) {
      // this.selectInspectData.materialValue = val
      this.getTxFtProdByTimeData(val)
    },
    async getTxFtProdByTimeData(val) {
      const res = await post(getTxFtProdByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraSteelPro
      })
      if (res.success) {
        let xData = []
        let proLine1 = []
        let proLine2 = []
        let proLine3 = []
        let ratio = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          proLine1.push(Number(item.proLine1).toFixed(2))
          proLine2.push(Number(item.proLine2).toFixed(2))
          proLine3.push(Number(item.proLine3).toFixed(2))
          ratio.push(Number(item.ratio).toFixed(2))
        })
        this.outputStatOption1.xAxis[0].data = xData
        this.outputStatOption1.series[0].data = proLine1
        this.outputStatOption1.series[1].data = proLine2
        this.outputStatOption1.series[2].data = proLine3
        this.outputStatOption1.series[3].data = ratio
        this.outputStatOption1.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 14) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
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
    font-family: Source Han Sans CN;
    font-weight: 400;
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
/*-----------------------分条产线----------------*/
//实时监控-绿色
.outerDiv {
  height: 320px;
  border: 1px solid #35a03b;
  border-radius: 5px;
  overflow: hidden;
  .headTitle {
    background-color: #35a03b;
    height: 45px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .headTitleText {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: floralwhite;
      vertical-align: middle;
    }
  }
  .outPutDiv {
    height: calc(100% - 45px);
    background-color: #f0faf0;
    .outPutDivLine {
      height: calc((100% - 2px) / 3);
      border-bottom: 1px solid #b5b5b5;
      width: 70%;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
    .outPutDivNoLine {
      height: calc((100% - 2px) / 3);
      width: 75%;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
//实时监控-灰色
.outerDivGrey {
  height: 320px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  overflow: hidden;
  .headTitleGrey {
    background-color: #b5b5b5;
    height: 45px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .headTitleText {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: floralwhite;
      vertical-align: middle;
    }
  }
  .outPutDivGrey {
    height: calc(100% - 45px);
    background-color: #f2f2f2;
    .outPutDivLine {
      height: calc((100% - 2px) / 3);
      border-bottom: 1px solid #b5b5b5;
      width: 70%;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
    .outPutDivNoLine {
      height: calc((100% - 2px) / 3);
      width: 75%;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
.outPutCountStyle {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 32px;
}
//----------------切换按钮---------------
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
  //background: url('../../../../assets/images/coldRollingProcess/close.svg')
  //  no-repeat center;
  background: url('../../../../assets/images/coldRollingProcess/close.svg')
    no-repeat center;
  background-size: contain;
}
</style>
