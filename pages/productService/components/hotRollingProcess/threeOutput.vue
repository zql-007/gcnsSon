<template>
  <div>
    <el-row
      :gutter="16">
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div>
            <div><span class="spanHead">钢卷产量</span></div>
          </div>
          <div style="height: 350px;padding-top: 10px">
            <el-row :gutter="40">
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">日</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.todayWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">月</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.monthWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">年</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.yearWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row
              :gutter="40"
              style="margin-top: 8px">
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">昨</span>
                    <span class="spanText">日</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.yesterdayWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">上</span>
                    <span class="spanText">月</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.lastMonthWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">上</span>
                    <span class="spanText">年</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ rollWeight.lastYearWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="margin-top: 20px">
              <div><span class="spanHead">中板产量</span></div>
            </div>
            <el-row
              :gutter="40"
              style="margin-top: 10px">
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">日</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.todayWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">月</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.monthWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">本</span>
                    <span class="spanText">年</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.yearWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row
              :gutter="40"
              style="margin-top: 8px">
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">昨</span>
                    <span class="spanText">日</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.yesterdayWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">上</span>
                    <span class="spanText">月</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.lastMonthWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="display: flex">
                  <div class="verticallyCentered">
                    <span class="spanText">上</span>
                    <span class="spanText">年</span>
                  </div>
                  <div class="outPutClass">
                    <span class="outPutNum">{{ plateWeight.lastYearWeight }}</span>
                    <span class="outPutUnit">万吨</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div>
            <div><span class="spanHead">机时产量</span></div>
          </div>
          <div style="height: 350px;padding-top: 20px">
            <nercar-echarts
              :tooltip="machineRateOption.tooltip"
              :grid="machineRateOption.grid"
              :x-axis="machineRateOption.xAxis"
              :y-axis="machineRateOption.yAxis"
              :series="machineRateOption.series"
              :data-zoom="machineRateOption.dataZoom"
              :_height="'330px'"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">产线停时统计与作业率</span></div>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期"
                @change="dateChange">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                type="month"
                value-format="yyyy-MM"
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
          <el-row :gutter="16">
            <el-col :span="12">
              <div style="height: 350px;padding-top: 20px">
                <nercar-echarts
                  :legend="prodstatOption.legend"
                  :tooltip="prodstatOption.tooltip"
                  :grid="prodstatOption.grid"
                  :x-axis="prodstatOption.xAxis"
                  :y-axis="prodstatOption.yAxis"
                  :series="prodstatOption.series"
                  :data-zoom="prodstatOption.dataZoom"
                  :_height="'330px'"
                  @chart-click-data="clickChartProdsMonth"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 350px;padding-top: 20px">
                <nercar-echarts
                  :legend="prodstatDayOption.legend"
                  :tooltip="prodstatDayOption.tooltip"
                  :grid="prodstatDayOption.grid"
                  :x-axis="prodstatDayOption.xAxis"
                  :y-axis="prodstatDayOption.yAxis"
                  :series="prodstatDayOption.series"
                  :data-zoom="prodstatDayOption.dataZoom"
                  :_height="'330px'"
                />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  date2ym,
  getLastOneYearMonth,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import {
  getFirstPassYield,
  getMachineHourOutput,
  getOperationMetrics,
  getPlateWeight,
  getRollWeight
} from '@/lib/productDataApply/hotRollingProcess'
import { post } from '@/lib/Util'

export default {
  name: 'threeOutput',
  components: { NercarEcharts },
  data() {
    return {
      echartsMonthData: null,
      clickYieldMonthFlag: false,
      rollWeight: {
        todayWeight: null,
        yesterdayWeight: null,
        monthWeight: null,
        lastMonthWeight: null,
        yearWeight: null,
        lastYearWeight: null
      },
      plateWeight: {
        todayWeight: null,
        yesterdayWeight: null,
        monthWeight: null,
        lastMonthWeight: null,
        yearWeight: null,
        lastYearWeight: null
      },
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      tapButActCurrent: false,
      machineRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)' // 设置柱状图背景阴影颜色
            }
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
            top: '12%',
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
            name: '单位：t/h',
            type: 'value',
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
            name: '',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              normal: {
                color: '#5db362'
              }
            }
          }
        ],
        dataZoom: []
      },
      prodstatOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                color +
                ';"></span>'
              result +=
                dot +
                params[i].seriesName +
                ': ' +
                params[i].value +
                unit +
                '<br>'
            }
            return result
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)' // 设置柱状图背景阴影颜色
            }
          }
        },
        legend: {
          // data: ['重量', '作业率']
          data: [
            {
              name: '月停机时长',
              icon: ''
            }, // 设置为线形
            { name: '月作业率', icon: 'line' }
          ],
          itemWidth: 22, // 设置图例标记的宽度
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
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：h',
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
            name: '月停机时长',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '月作业率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      prodstatDayOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                color +
                ';"></span>'
              result +=
                dot +
                params[i].seriesName +
                ': ' +
                params[i].value +
                unit +
                '<br>'
            }
            return result
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)' // 设置柱状图背景阴影颜色
            }
          }
        },
        legend: {
          // data: ['重量', '作业率']
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            {
              name: '日停机时长',
              icon: ''
            }, // 设置为线形
            { name: '日作业率', icon: 'line' }
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
            name: '日停机时长',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '日作业率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      }
    }
  },
  mounted() {
    this.getRollWeightData()
    this.getPlateWeightData()
    this.getMachineHourOutputData()
    this.getOperationMetricsMonth()
    this.getOperationMetricsDay()
  },
  methods: {
    dateChange(val) {
      console.log('val', val)
    },
    clickTabCurrent() {
      this.clickYieldMonthFlag = false
      this.getOperationMetricsMonth()
      this.getOperationMetricsDay()

      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //钢卷产量
    async getRollWeightData() {
      const res = await post(getRollWeight, {})
      if (res.success) {
        this.rollWeight.todayWeight = res.data.todayWeight
        this.rollWeight.monthWeight = res.data.monthWeight
        this.rollWeight.yearWeight = res.data.yearWeight
        this.rollWeight.yesterdayWeight = res.data.yesterdayWeight
        this.rollWeight.lastMonthWeight = res.data.lastMonthWeight
        this.rollWeight.lastYearWeight = res.data.lastYearWeight
      }
    },
    //中板产量
    async getPlateWeightData() {
      const res = await post(getPlateWeight, {})
      if (res.success) {
        this.plateWeight.todayWeight = res.data.todayWeight
        this.plateWeight.monthWeight = res.data.monthWeight
        this.plateWeight.yearWeight = res.data.yearWeight
        this.plateWeight.yesterdayWeight = res.data.yesterdayWeight
        this.plateWeight.lastMonthWeight = res.data.lastMonthWeight
        this.plateWeight.lastYearWeight = res.data.lastYearWeight
      }
    },
    //机时产量
    async getMachineHourOutputData() {
      const res = await post(getMachineHourOutput, {})
      if (res.success) {
        let xData = []
        let yData = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          yData.push(item.machineHourOutput)
        })
        this.machineRateOption.xAxis[0].data = xData
        this.machineRateOption.series[0].data = yData
        this.machineRateOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: 0,
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            start: Math.max(0, ((xData.length - 20) / xData.length) * 100),
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
    //产线停时统计与作业率(月)
    async getOperationMetricsMonth() {
      const res = await post(getOperationMetrics, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res.success) {
        let xData = []
        let stopHourList = []
        let operationRateList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          stopHourList.push(item.stopHour)
          operationRateList.push(item.operationRate)
        })
        this.prodstatOption.xAxis[0].data = xData
        this.prodstatOption.series[0].data = stopHourList
        this.prodstatOption.series[1].data = operationRateList
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: 0,
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
            start: 0,
            // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
            // end: 100 //100%
            end: (12 / xData.length) * 100
          }
        ]
      }
    },
    async clickChartProdsMonth(data) {
      this.echartsMonthData = data
      this.clickYieldMonthFlag = true
      await this.getOperationMetricsDay()
    },
    //产线停时统计与作业率(日)
    async getOperationMetricsDay() {
      const res = await post(getOperationMetrics, {
        date: this.clickYieldMonthFlag
          ? this.echartsMonthData.data.name
          : this.times.endDate,
        type: 'day'
      })
      if (res.success) {
        let xData = []
        let stopHourData = []
        let operationRateData = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          stopHourData.push(item.stopHour)
          operationRateData.push(item.operationRate)
        })
        this.prodstatDayOption.xAxis[0].data = xData
        this.prodstatDayOption.series[0].data = stopHourData
        this.prodstatDayOption.series[1].data = operationRateData
        this.prodstatDayOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: 0,
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
            start: 0,
            // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
            // end: 100 //100%
            end: (24 / xData.length) * 100
          }
        ]
      }
    }
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
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    vertical-align: middle;
  }
}
.verticallyCentered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0ebe1;
  height: 60px;
  width: 20%;
  text-align: center;
  .spanText {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0px;
  }
}
.outPutClass {
  background-color: #f5faf5;
  height: 60px;
  width: 80%;
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: flex-end; /* 内容靠右对齐 */
  padding-right: 10px; /* 减少右侧内边距 */
  //overflow: hidden; /* 防止内容溢出 */
  .outPutNum {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 20px;
    line-height: 44px;
    letter-spacing: 0px;
    text-align: right;
  }
  .outPutUnit {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0px;
  }
}
.outPutClass span:last-child {
  margin-left: 4px; /* 给"万吨"添加左侧间距 */
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
  height: 31px;
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
  line-height: 30px;
}
/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #d5ddd5;
}
.datePickerLable {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
</style>
