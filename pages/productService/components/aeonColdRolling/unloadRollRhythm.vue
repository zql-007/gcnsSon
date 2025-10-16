<template>
  <div>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">卸卷节奏</span></div>
            <div>
              <span class="datePickerLable">日期选择</span>
              <el-date-picker
                v-model="times.startDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 10px"
                placeholder="选择日期">
              </el-date-picker>
              <span>-</span>
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
              <div style="height: 350px;margin-top: 20px">
                <nercar-echarts
                  :legend="prodstatOption.legend"
                  :tooltip="prodstatOption.tooltip"
                  :grid="prodstatOption.grid"
                  :x-axis="prodstatOption.xAxis"
                  :y-axis="prodstatOption.yAxis"
                  :series="prodstatOption.series"
                  :data-zoom="prodstatOption.dataZoom"
                  :_height="'340px'"
                  @chart-click-data="clickChartProdsMonth"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 350px;margin-top: 20px">
                <nercar-echarts
                  :legend="prodstatDayOption.legend"
                  :tooltip="prodstatDayOption.tooltip"
                  :grid="prodstatDayOption.grid"
                  :x-axis="prodstatDayOption.xAxis"
                  :y-axis="prodstatDayOption.yAxis"
                  :series="prodstatDayOption.series"
                  :data-zoom="prodstatDayOption.dataZoom"
                  :_height="'340px'"
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
import { getLzUnloadingRhythm } from '@/lib/productDataApply/ywColdRollingProcess'
import { post } from '@/lib/Util'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import { mapState } from 'vuex'

export default {
  name: 'unloadRollRhythm',
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      prodstatOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : ''
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
              name: '日轧卷数',
              icon: ''
            }, // 设置为线形
            { name: '卸卷节奏', icon: 'line' }
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
            name: '单位：卷',
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
            name: '单位：分钟',
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
            name: '日轧卷数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '卸卷节奏',
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
      tapButActCurrent: false,
      prodstatDayOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : ''
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
              name: '小时卷数',
              icon: ''
            }, // 设置为线形
            { name: '卸卷节奏', icon: 'line' }
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
            name: '单位：卷',
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
            name: '单位：分钟',
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
            name: '小时卷数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '卸卷节奏',
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
      },
      yDataList: null
    }
  },
  mounted() {
    // 只触发月视图请求，月视图请求完成后会自动触发日视图
    this.getOperationMetricsMonth()
  },
  methods: {
    async clickTabCurrent() {
      this.tapButActCurrent = true
      // 等待月视图完成，月视图完成后会自动刷新日视图
      await this.getOperationMetricsMonth()
      // 防抖样式恢复
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },

    // 产线停时统计与作业率(月)
    async getOperationMetricsMonth() {
      const res = await post(getLzUnloadingRhythm, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'day'
      })
      if (res.success) {
        let xData = []
        let stopHourList = []
        let operationRateList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          stopHourList.push(item.coilNos)
          operationRateList.push(item.unloadingRhythm)
        })
        this.prodstatOption.xAxis[0].data = xData
        this.prodstatOption.series[0].data = stopHourList
        this.prodstatOption.series[1].data = operationRateList
        // this.prodstatOption.dataZoom = [
        //   {
        //     type: 'slider',
        //     xAxisIndex: 0,
        //     height: 20,
        //     bottom: 0,
        //     start: 0,
        //     end: (12 / Math.max(1, xData.length)) * 100
        //   }
        // ]
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start:
              xData.length <= 12
                ? 0
                : ((xData.length - 12) / xData.length) * 100,
            end: 100
          }
        ]

        // **关键**：月视图数据加载完成后，使用最后一条日期作为默认 day，触发日视图
        const defaultDay = xData.length ? xData[xData.length - 1] : null
        // 如果没有从月接口拿到日期，fallback 使用 times.endDate（通常不会发生）
        await this.getOperationMetricsDay(defaultDay || this.times.endDate)
      }
    },
    async clickChartProdsMonth(data) {
      // 解析传回的 data（nercar-echarts 可能的回传形式多样）
      let dayStr = null

      dayStr = data?.data?.name || null

      this.echartsMonthData = dayStr
      this.clickYieldMonthFlag = true
      await this.getOperationMetricsDay(dayStr)
    },
    // 产线停时统计与作业率(日)
    // 接收可选参数 day（可能由月图点击传入）
    async getOperationMetricsDay(day = null) {
      // 计算要查询的 day：参数优先 -> 月图已存在的最后一条日期 -> times.endDate（兜底）
      const availableX =
        this.prodstatOption &&
        this.prodstatOption.xAxis &&
        this.prodstatOption.xAxis[0].data
      const lastMonthDate =
        availableX && availableX.length
          ? availableX[availableX.length - 1]
          : null
      const targetDay = day || lastMonthDate || this.times.endDate

      // 如果依然没有 targetDay，可以选择直接返回（避免空请求）
      if (!targetDay) {
        // 没有可用日期，清空右侧图表数据并返回
        this.prodstatDayOption.xAxis[0].data = []
        this.prodstatDayOption.series[0].data = []
        this.prodstatDayOption.series[1].data = []
        this.prodstatDayOption.dataZoom = []
        return
      }

      const res = await post(getLzUnloadingRhythm, {
        startDate: targetDay,
        endDate: targetDay
      })
      if (res.success) {
        let xData = []
        let stopHourData = []
        let operationRateData = []
        res.data.forEach(item => {
          const fullTime = (item.hour || '').split(' ')[1] || ''
          const hour = fullTime ? String(Number(fullTime.split(':')[0])) : ''
          xData.push(hour) // e.g. "4"
          stopHourData.push(item.coilNos)
          operationRateData.push(item.unloadingRhythm)
        })
        this.prodstatDayOption.xAxis[0].data = xData
        this.prodstatDayOption.series[0].data = stopHourData
        this.prodstatDayOption.series[1].data = operationRateData
        this.prodstatDayOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: 0,
            end: (24 / Math.max(1, xData.length)) * 100
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
