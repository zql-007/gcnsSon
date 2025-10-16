<template>
  <div>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">停机时长与作业率</span></div>
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
import { getLzOperationRate } from '@/lib/productDataApply/ywColdRollingProcess'
import { post } from '@/lib/Util'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import { mapState } from 'vuex'
export default {
  name: 'downOperatRate',
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
          data: [
            {
              name: '月停机时长',
              icon: ''
            },
            { name: '月作业率', icon: 'line' }
          ],
          itemWidth: 22,
          itemHeight: 10
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
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
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
            smooth: true,
            symbol: 'none',
            yAxisIndex: 1,
            label: {
              show: false,
              position: 'top',
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
              color: 'rgba(53, 160, 52, 0.15)'
            }
          }
        },
        legend: {
          itemWidth: 22,
          itemHeight: 10,
          data: [
            {
              name: '日停机时长',
              icon: ''
            },
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
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
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
            smooth: true,
            symbol: 'none',
            label: {
              show: false,
              position: 'top',
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
      yDataList: null,

      // 新增状态，保存点击的月份
      echartsMonthData: null,
      clickYieldMonthFlag: false
    }
  },
  mounted() {
    // 只请求月度数据；月度请求完成后会自动触发日数据加载（默认取月度最后一个月份）
    this.getOperationMetricsMonth()
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getOperationMetricsMonth()
      this.getOperationMetricsDay()

      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },

    // 产线停时统计与作业率(月)
    async getOperationMetricsMonth() {
      const res = await post(getLzOperationRate, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res && res.success) {
        let xData = []
        let stopHourList = []
        let operationRateList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          stopHourList.push(item.downTime)
          operationRateList.push(item.operationRate)
        })
        this.prodstatOption.xAxis[0].data = xData
        this.prodstatOption.series[0].data = stopHourList
        this.prodstatOption.series[1].data = operationRateList
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: 0,
            end: xData.length > 0 ? (12 / xData.length) * 100 : 100
          }
        ]

        // ——— 新增：页面刷新后默认加载右侧日数据 ———
        // 优先：取左侧 xData 的最后一个月份（通常为最近的月份）
        // 若没有 xData 则回退到 times.endDate 的月份
        let defaultMonth = null
        if (Array.isArray(xData) && xData.length > 0) {
          // 保证是 'YYYY-MM' 格式
          defaultMonth = String(xData[xData.length - 1]).slice(0, 7)
        } else if (this.times.endDate) {
          defaultMonth = String(this.times.endDate).slice(0, 7)
        } else {
          defaultMonth = date2ym(new Date()).slice(0, 7)
        }

        // 保存但不当作“用户点击”
        this.echartsMonthData = defaultMonth
        this.clickYieldMonthFlag = false

        // 异步加载该月份的日数据
        await this.getOperationMetricsDay(defaultMonth)
      }
    },

    // 点击左侧某个月的柱状图 -> 显示该月的日数据
    async clickChartProdsMonth(data) {
      // 解析传回的 data（nercar-echarts 可能的回传形式多样）
      let monthStr = null

      // 常见情况：回调直接传入 echart 的 params 对象 -> params.name
      if (!data) {
        monthStr = null
      } else if (typeof data === 'string') {
        monthStr = data
      } else if (data.name && typeof data.name === 'string') {
        monthStr = data.name
      } else if (data.data && typeof data.data === 'object' && data.data.name) {
        monthStr = data.data.name
      } else if (data.value && typeof data.value === 'string') {
        monthStr = data.value
      } else if (
        Array.isArray(data) &&
        data[0] &&
        typeof data[0] === 'string'
      ) {
        monthStr = data[0]
      } else if (
        data.dataIndex !== undefined &&
        Array.isArray(this.prodstatOption.xAxis[0].data)
      ) {
        // 如果回调只返回 dataIndex（索引），用索引从 xAxis 数据取月份
        monthStr = this.prodstatOption.xAxis[0].data[data.dataIndex]
      }

      if (monthStr && monthStr.length >= 7) {
        monthStr = monthStr.slice(0, 7) // 规范为 'YYYY-MM'
      }

      this.echartsMonthData = monthStr
      this.clickYieldMonthFlag = true

      // 获取日数据（传入 monthStr）
      await this.getOperationMetricsDay(monthStr)
    },

    // 产线停时统计与作业率(日) — 可传 month（'YYYY-MM'），若不传则以 echartsMonthData 或 times.endDate 为准
    async getOperationMetricsDay(month) {
      // 确定月份字符串 'YYYY-MM'
      let monthStr =
        month ||
        this.echartsMonthData ||
        (this.times.endDate
          ? this.times.endDate.slice(0, 7)
          : date2ym(new Date()).slice(0, 7))
      if (monthStr && monthStr.length >= 7) monthStr = monthStr.slice(0, 7)

      // 构造 startDate / endDate
      let startDate, endDate
      if (monthStr && /^\d{4}-\d{2}$/.test(monthStr)) {
        const parts = monthStr.split('-')
        const year = parseInt(parts[0], 10)
        const mon = parseInt(parts[1], 10)
        const lastDay = new Date(year, mon, 0).getDate() // 获取该月最后一天
        startDate = `${parts[0]}-${parts[1]}-01`
        endDate = `${parts[0]}-${parts[1]}-${String(lastDay).padStart(2, '0')}`
      } else {
        // 兜底：使用 times.endDate 的月份
        const fallbackMonth = (this.times.endDate || date2ym(new Date())).slice(
          0,
          7
        )
        const parts = fallbackMonth.split('-')
        const year = parseInt(parts[0], 10)
        const mon = parseInt(parts[1], 10)
        const lastDay = new Date(year, mon, 0).getDate()
        startDate = `${parts[0]}-${parts[1]}-01`
        endDate = `${parts[0]}-${parts[1]}-${String(lastDay).padStart(2, '0')}`
      }

      const res = await post(getLzOperationRate, {
        startDate: startDate,
        endDate: endDate,
        type: 'day'
      })
      if (res && res.success) {
        let xData = []
        let stopHourData = []
        let operationRateData = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          stopHourData.push(item.downTime)
          operationRateData.push(item.operationRate)
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
            end: xData.length > 0 ? (24 / xData.length) * 100 : 100
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
