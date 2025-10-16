<template>
  <div>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">产品成材率</span></div>
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
                  :legend="outputStatOption.legend"
                  :tooltip="outputStatOption.tooltip"
                  :grid="outputStatOption.grid"
                  :x-axis="outputStatOption.xAxis"
                  :y-axis="outputStatOption.yAxis"
                  :series="outputStatOption.series"
                  :data-zoom="outputStatOption.dataZoom"
                  :_height="'340px'"
                  @chart-click-data="handleMonthBarClick"
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
import { getProductYieldRate } from '@/lib/productDataApply/ywColdRollingProcess'
import { post } from '@/lib/Util'
import {
  date2ym,
  getLastOneYearMonth,
  getMonthFirstDay,
  getMonthLastDay
} from '@/utils/dateUtil'

export default {
  name: 'productYieldRate',
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      outputStatOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          }
        },
        legend: {
          data: [
            {
              name: '304',
              icon: ''
            },
            {
              name: '304L',
              icon: ''
            },
            { name: '整体', icon: 'line' }
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
            name: '单位：%',
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
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
            name: '304',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#5DB362'
            },
            label: {
              show: false,
              position: 'top',
              formatter: '{c}%',
              color: '#000000'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '304L',
            type: 'bar',
            data: [],
            barWidth: 13,
            label: {
              show: false,
              formatter: '{c}%',
              textStyle: {
                color: '#000'
              }
            },
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '整体',
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
              color: '#a146b0'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: 0,
            end: 100
          }
        ]
      },
      tapButActCurrent: false,
      prodstatDayOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          }
        },
        legend: {
          data: [
            {
              name: '304',
              icon: ''
            },
            {
              name: '304L',
              icon: ''
            },
            { name: '整体', icon: 'line' }
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
            name: '单位：%',
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
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
            name: '304',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#5DB362'
            },
            label: {
              show: false,
              position: 'top',
              formatter: '{c}%',
              color: '#000000'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '304L',
            type: 'bar',
            data: [],
            barWidth: 13,
            label: {
              show: false,
              formatter: '{c}%',
              textStyle: {
                color: '#000'
              }
            },
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '整体',
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
              color: '#a146b0'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: 0,
            end: 100
          }
        ]
      },
      monthData: [],
      dayData: []
    }
  },
  mounted() {
    // 初始化：先获取月数据，再用 times.endDate（最后一个月）去获取日数据
    this.getMonthData().then(() => {
      // 使用 times.endDate 作为默认的日视图月份
      const defaultMonth = this.times.endDate
      this.getDayData(defaultMonth)
    })
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      // 刷新月图，月图刷新完成后，使用 times.endDate 刷新日图（保持行为和用户期望一致）
      this.getMonthData().then(() => {
        this.getDayData(this.times.endDate)
      })
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },

    // 产品成材率（月）
    async getMonthData() {
      try {
        const params = {
          startDate: this.times.startDate,
          endDate: this.times.endDate,
          type: 'month'
        }

        // 使用post函数调用接口，与机时产量代码保持一致
        const res = await post(getProductYieldRate, params)

        if (res && res.success && res.data) {
          this.monthData = res.data

          // 更新月度图表数据
          this.outputStatOption.xAxis[0].data = res.data.map(
            item => item.accDate
          )
          this.outputStatOption.series[0].data = res.data.map(
            item => item.yieldRate304
          )
          this.outputStatOption.series[1].data = res.data.map(
            item => item.yieldRate304L
          )
          this.outputStatOption.series[2].data = res.data.map(
            item => item.yieldRateTotal
          )

          // dataZoom 防护：避免除以 0
          const endPercent = res.data.length
            ? Math.min(100, (12 / res.data.length) * 100)
            : 100
          this.outputStatOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              height: 20,
              bottom: 0,
              start: 0,
              end: endPercent
            }
          ]
        } else {
          // 若失败，清空图表数据
          this.outputStatOption.xAxis[0].data = []
          this.outputStatOption.series[0].data = []
          this.outputStatOption.series[1].data = []
          this.outputStatOption.series[2].data = []
          this.outputStatOption.dataZoom = []
        }
      } catch (error) {
        console.error('获取月度数据失败:', error)
        // 清空图表数据
        this.outputStatOption.xAxis[0].data = []
        this.outputStatOption.series[0].data = []
        this.outputStatOption.series[1].data = []
        this.outputStatOption.series[2].data = []
        this.outputStatOption.dataZoom = []
      }
    },

    // 产品成材率（日）
    async getDayData(month) {
      if (!month) return
      try {
        // 计算该月的开始和结束日期
        const startDate = `${month}-01`
        const year = parseInt(month.split('-')[0])
        const monthNum = parseInt(month.split('-')[1])
        const daysInMonth = new Date(year, monthNum, 0).getDate()
        const endDate = `${month}-${daysInMonth}`
        const params = {
          startDate: startDate,
          endDate: endDate,
          type: 'day'
        }

        // 使用post函数调用接口，与机时产量代码保持一致
        const res = await post(getProductYieldRate, params)

        if (res && res.success) {
          this.dayData = res.data

          // 更新日图表数据
          this.prodstatDayOption.xAxis[0].data = res.data.map(
            item => item.accDate
          )
          this.prodstatDayOption.series[0].data = res.data.map(
            item => item.yieldRate304
          )
          this.prodstatDayOption.series[1].data = res.data.map(
            item => item.yieldRate304L
          )
          this.prodstatDayOption.series[2].data = res.data.map(
            item => item.yieldRateTotal
          )

          // dataZoom 防护，默认显示前 24 条（按比例）
          const endPercent = res.data.length
            ? Math.min(100, (12 / res.data.length) * 100)
            : 100
          this.prodstatDayOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              height: 20,
              bottom: 0,
              start: 0,
              end: endPercent
            }
          ]
        } else {
          // 失败则清空日图
          this.prodstatDayOption.xAxis[0].data = []
          this.prodstatDayOption.series[0].data = []
          this.prodstatDayOption.series[1].data = []
          this.prodstatDayOption.series[2].data = []
          this.prodstatDayOption.dataZoom = []
        }
      } catch (error) {
        console.error('获取日数据失败:', error)
        // 清空日图数据
        this.prodstatDayOption.xAxis[0].data = []
        this.prodstatDayOption.series[0].data = []
        this.prodstatDayOption.series[1].data = []
        this.prodstatDayOption.series[2].data = []
        this.prodstatDayOption.dataZoom = []
      }
    },

    // 点击月柱事件处理
    async handleMonthBarClick(data) {
      const month = data.data.name || null
      if (month) {
        await this.getDayData(month)
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
