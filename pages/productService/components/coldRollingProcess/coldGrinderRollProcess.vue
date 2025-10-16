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
            <div><span class="spanHead">磨辊工序</span></div>
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
                    <div style="width: 67px"><span class="spanHeadTwo">生产统计</span></div>
                    <div class="progress-bar-container">
                      <div
                        :style="{width: oneRatioSon + '%'}"
                        class="progress-bar">
                      </div>
                      <span class="progress-value">{{ oneRatioSon }}%</span>
                    </div>
                    <div style="display: flex;align-items: center"><span class="spanHeadMin">{{ oneWgtSon }}/{{ totalOneSon }}支(1#辊)</span></div>
                    <div
                      class="progress-bar-container"
                      style="margin-left: 10px">
                      <div
                        :style="{width: threeRatioSon + '%'}"
                        class="progress-bar">
                      </div>
                      <span class="progress-value">{{ threeRatioSon }}%</span>
                    </div>
                    <div style="display: flex;align-items: center"><span class="spanHeadMin">{{ threeWgtSon }}/{{ totalThreeSon }}支(3#辊)</span></div>
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
                  <div>
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
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div><span class="spanHeadTwo">停时统计</span></div>
                  <div>
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
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="stopTimeOption.legend"
                    :tooltip="stopTimeOption.tooltip"
                    :grid="stopTimeOption.grid"
                    :x-axis="stopTimeOption.xAxis"
                    :y-axis="stopTimeOption.yAxis"
                    :series="stopTimeOption.series"
                    :data-zoom="stopTimeOption.dataZoom"
                    :_height="'330px'"
                  />
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
import {
  getLzProdDay,
  getLzProdOfJingByTime,
  getLzProdStopHoursOfDayTime,
  getLzRoll
} from '@/lib/productDataApply/coldRollingProcess'
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  getHalfYearAgoDate,
  getLastMonthDate,
  getNowDay,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'

export default {
  name: 'coldGrinderRollProcess',
  components: { NercarEcharts },
  props: {
    oneWgtSon: {
      type: Number,
      default() {
        return 0
      }
    },
    oneRatioSon: {
      type: Number,
      default() {
        return 0
      }
    },
    totalOneSon: {
      type: Number,
      default() {
        return 0
      }
    },
    threeWgtSon: {
      type: Number,
      default() {
        return 0
      }
    },
    threeRatioSon: {
      type: Number,
      default() {
        return 0
      }
    },
    totalThreeSon: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      //生产统计
      flagOfEleDayKeyPro: true,
      flagOfEleMonthKeyPro: false,
      flagOfEleYearKeyPro: false,
      dateTypePraKeyPro: 'day',
      //停时统计
      flagOfEleDayKeyStop: true,
      flagOfEleMonthKeyStop: false,
      flagOfEleYearKeyStop: false,
      dateTypePraKeyStop: 'day',
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
      outputStatOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = '支'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
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
          data: [{ name: '1#辊', icon: '' }, { name: '3#辊', icon: '' }]
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
            name: '单位：支',
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
            name: '1#辊',
            type: 'bar',
            barWidth: 12,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '3#辊',
            type: 'bar',
            barWidth: 12,
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          }
        ],
        dataZoom: []
      },
      stopTimeOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = 'min'
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
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
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 12,
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
  watch: {},
  mounted() {
    this.getLzProdOfJingByTimeData()
    this.getStopTimeData()
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
      this.getLzProdOfJingByTimeData()
      this.getStopTimeData()
    },
    //生产统计
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
      this.getLzProdOfJingByTimeData()
    },
    async getLzProdOfJingByTimeData() {
      const res = await post(getLzRoll, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraKeyPro
      })
      if (res.success) {
        let seriesData = [res.data.y1, res.data.y2]
        const seriesName = ['1#辊', '3#辊']
        const colors = ['#FF9800', '#5DB362']
        const series = seriesData.map((name, index) => {
          return {
            name: seriesName[index],
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            //自定义每节柱状图颜色
            itemStyle: {
              color: colors[index]
            },
            label: {
              show: false
            },
            data: seriesData[index]
          }
        })
        this.outputStatOption.series = []
        this.outputStatOption.series = series
        this.outputStatOption.xAxis[0].data = []
        this.outputStatOption.xAxis[0].data = res.data.x
        this.outputStatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(
              0,
              ((res.data.x.length - 13) / res.data.x.length) * 100
            ), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //停时统计
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
      this.getStopTimeData()
    },
    async getStopTimeData() {
      const res = await post(getLzProdStopHoursOfDayTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        machineCode: 'ZGLX',
        dateType: this.dateTypePraKeyStop
      })
      if (res.success) {
        let xData = res.data.map(item => {
          return item.tallyDate
        })
        let yData = res.data.map(item => {
          return item.stopHours
        })
        this.stopTimeOption.xAxis[0].data = xData
        this.stopTimeOption.series[0].data = yData
        this.stopTimeOption.dataZoom = [
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
  width: 90px; /* 可按需调整进度条容器宽度 */
  height: 18px; /* 可按需调整进度条容器高度 */
  background-color: #e0ebe1; /* 浅灰色背景 */
  border-radius: 5px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
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
  left: 28%;
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
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
</style>
