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
            <div><span class="spanHead">准备工序</span></div>
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
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div><span class="spanHeadTwo">生产统计</span></div>
                    <div>
                      <div>
                        <el-tag
                          :class="[flagOfEleDayFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                    </div>
                  </div>
                  <div style="height: 350px;padding-top: 2px">
                    <nercar-echarts
                      :legend="prodstatOption.legend"
                      :tooltip="prodstatOption.tooltip"
                      :grid="prodstatOption.grid"
                      :x-axis="prodstatOption.xAxis"
                      :y-axis="prodstatOption.yAxis"
                      :series="prodstatOption.series"
                      :data-zoom="prodstatOption.dataZoom"
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
                    <div><span class="spanHeadTwo">停时统计</span></div>
                    <div>
                      <div>
                        <el-tag
                          :class="[flagOfEleDayTwoPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleTwoPPro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthTwoPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleTwoPPro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearTwoPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleTwoPPro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                    </div>
                  </div>
                  <div style="height: 350px;padding-top: 2px">
                    <nercar-echarts
                      :legend="stopHoursOption.legend"
                      :tooltip="stopHoursOption.tooltip"
                      :grid="stopHoursOption.grid"
                      :x-axis="stopHoursOption.xAxis"
                      :y-axis="stopHoursOption.yAxis"
                      :series="stopHoursOption.series"
                      :data-zoom="stopHoursOption.dataZoom"
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
  getProdOfPrepareByTime,
  getLzProdStopHoursOfDayTime
} from '@/lib/productDataApply/coldRollingProcess'

export default {
  name: 'coldPreparatProcess',
  components: { NercarEcharts },
  props: {
    // rollPreparatDataSon: {
    //   type: Object,
    //   default: function() {
    //     return {}
    //   }
    // }
  },
  data() {
    return {
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
      flagOfEleDayFirstPro: true,
      flagOfEleMonthFirstPro: false,
      flagOfEleYearFirstPro: false,
      dateTypePraFirstPro: 'day',
      flagOfEleDayTwoPro: true,
      flagOfEleMonthTwoPro: false,
      flagOfEleYearTwoPro: false,
      dateTypePraTwoPro: 'day',
      prodstatOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesName === '重量' ? 't' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                color +
                ';"></span>'
              result +=
                dot +
                params[i].seriesName +
                ': <strong>' +
                params[i].value +
                unit +
                '</strong><br>'
            }
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
          data: [
            {
              name: '重量',
              icon: ''
            }, // 设置为线形
            { name: '作业率', icon: 'line' }
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
            // interval: 5,
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
            name: '重量',
            type: 'bar',
            barWidth: 12,
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '作业率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      stopHoursOption: {
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
              const unit = 'min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false
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
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：min',
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
            // interval: 5,
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
            name: '停时',
            type: 'line',
            yAxisIndex: 0,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          }
        ],
        dataZoom: []
      }
    }
  },
  watch: {
    // rollPreparatDataSon: {
    //   handler: 'getRollPreparatDataSon',
    //   deep: true
    // }
  },
  mounted() {
    this.getRollPreparatDataSon()
    this.getLzProdStopHoursOfDayTimeSon()
    // this.$emit('rollPreparatTimes', this.times)
  },
  methods: {
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
      // this.$emit('rollPreparatTimes', this.times)
      this.getRollPreparatDataSon()
      this.getLzProdStopHoursOfDayTimeSon()
    },
    //准备工序-生产统计
    clickTabEleFirstPro(params) {
      if (params === 'day') {
        this.flagOfEleDayFirstPro = true
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = false
      } else if (params === 'month') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = true
        this.flagOfEleYearFirstPro = false
      } else if (params === 'quarter') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = true
      }
      this.dateTypePraFirstPro = params
      this.getRollPreparatDataSon()
    },
    async getRollPreparatDataSon() {
      const res = await post(getProdOfPrepareByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraFirstPro
      })
      if (res.success) {
        let workRate = []
        let workWeight = []
        let xData = []
        res.data.workRateList.forEach(item => {
          workRate.push(Number(item.operationRate).toFixed(2))
        })
        res.data.realList.forEach(item => {
          workWeight.push(Number(item.outWegt).toFixed(2))
          xData.push(item.prodTime)
        })
        this.prodstatOption.xAxis[0].data = xData
        this.prodstatOption.series[0].data = workWeight
        this.prodstatOption.series[1].data = workRate
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: 0,
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            start: Math.max(0, ((xData.length - 13) / xData.length) * 100),
            // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
            end: 100 //100%
          } /*,
          {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: (13 / xData.length) * 100
          }*/
        ]
      }
    },
    //准备工序-停时统计
    clickTabEleTwoPPro(params) {
      this.stopHoursOption.xAxis[0].data = []
      if (params === 'day') {
        this.flagOfEleDayTwoPro = true
        this.flagOfEleMonthTwoPro = false
        this.flagOfEleYearTwoPro = false
        this.stopHoursOption.series[0].type = 'line'
      } else if (params === 'month') {
        this.flagOfEleDayTwoPro = false
        this.flagOfEleMonthTwoPro = true
        this.flagOfEleYearTwoPro = false
        this.stopHoursOption.series[0].type = 'line'
      } else if (params === 'quarter') {
        this.flagOfEleDayTwoPro = false
        this.flagOfEleMonthTwoPro = false
        this.flagOfEleYearTwoPro = true
        this.stopHoursOption.series[0].type = 'bar'
        this.stopHoursOption.series[0].barWidth = 13
      }
      this.dateTypePraTwoPro = params
      this.getLzProdStopHoursOfDayTimeSon()
    },
    async getLzProdStopHoursOfDayTimeSon() {
      const res = await post(getLzProdStopHoursOfDayTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        machineCode: '1',
        dateType: this.dateTypePraTwoPro
      })
      if (res.success) {
        let stopHours = []
        let xData = []
        res.data.forEach(item => {
          xData.push(item.tallyDate)
          stopHours.push(item.stopHours)
        })
        this.stopHoursOption.xAxis[0].data = xData
        this.stopHoursOption.series[0].data = stopHours
        this.stopHoursOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 13) / xData.length) * 100), // 计算起始位置, //0
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
</style>
