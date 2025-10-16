<template>
  <div>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">机时产量</span></div>
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
import { getLzMachineOutput } from '@/lib/productDataApply/ywColdRollingProcess'
import { post } from '@/lib/Util'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import { mapState } from 'vuex'

export default {
  name: 'machineOutput',
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
              color: 'rgba(53, 160, 52, 0.15)'
            }
          }
        },
        legend: {
          data: [
            { name: '月停机时长', icon: '' },
            { name: '月作业率', icon: 'line' }
          ],
          show: false,
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
            axisPointer: { type: 'shadow' },
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：吨/小时',
            axisLabel: { formatter: '{value}' },
            axisTick: { show: false },
            axisLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}%' },
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '机时产量',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: { color: '#5DB362' }
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
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#5DB362'
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
            shadowStyle: { color: 'rgba(53, 160, 52, 0.15)' }
          }
        },
        legend: {
          itemWidth: 22,
          itemHeight: 10,
          show: false,
          data: [
            { name: '日停机时长', icon: '' },
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
            axisPointer: { type: 'shadow' },
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：吨/小时',
            axisLabel: { formatter: '{value}' },
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '机时产量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            label: {
              show: false,
              position: 'top',
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            data: [],
            itemStyle: { color: '#5DB362' }
          }
        ],
        dataZoom: []
      },
      yDataList: null
    }
  },
  mounted() {
    // 初始化：先获取月数据，再用 times.endDate（最后一个月）去获取日数据
    this.getOperationMetricsMonth().then(() => {
      // 使用 times.endDate 作为默认的日视图月份
      const defaultMonth = this.times.endDate
      this.getOperationMetricsDay(defaultMonth)
    })
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      // 刷新月图，月图刷新完成后，使用 times.endDate 刷新日图（保持行为和用户期望一致）
      this.getOperationMetricsMonth().then(() => {
        this.getOperationMetricsDay(this.times.endDate)
      })
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },

    // 产线机时产量（月）
    async getOperationMetricsMonth() {
      const res = await post(getLzMachineOutput, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res && res.success) {
        const xData = []
        const monthMachineList = []
        // 确保取 machineHourlyOutput 字段
        res.data.forEach(item => {
          xData.push(item.accDate)
          monthMachineList.push(
            item.machineHourlyOutput == null ? 0 : item.machineHourlyOutput
          )
        })
        this.prodstatOption.xAxis[0].data = xData
        this.prodstatOption.series[0].data = monthMachineList

        // dataZoom 配置：默认显示前 12 条（如不足则显示全部）
        // const endPercent = xData.length
        //   ? Math.min(100, (12 / xData.length) * 100)
        //   : 100
        // this.prodstatOption.dataZoom = [
        //   {
        //     type: 'slider',
        //     xAxisIndex: 0,
        //     height: 20,
        //     bottom: 0,
        //     start: 0,
        //     end: endPercent
        //   }
        // ]
        // dataZoom 配置：默认显示后 12 条（如不足则显示全部）
        const total = xData.length
        let startPercent = 0
        if (total > 12) {
          // 保证显示后 12 条：start = (total-12)/total * 100, end = 100
          startPercent = ((total - 12) / total) * 100
        } else {
          startPercent = 0
        }
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: startPercent,
            end: 100
          }
        ]
      } else {
        // 若失败，清空图表数据
        this.prodstatOption.xAxis[0].data = []
        this.prodstatOption.series[0].data = []
        this.prodstatOption.dataZoom = []
      }
    },

    // 点击左侧月柱事件，解析月份并请求日接口（兼容不同 click 回调结构）
    async clickChartProdsMonth(data) {
      const month = data.data.name || null

      // 如果拿到 monthStr 则请求对应天数据
      await this.getOperationMetricsDay(month)
    },

    // 产线机时产量（日）
    // 参数：可以是 'YYYY-MM' 或 {start: 'YYYY-MM-DD', end: 'YYYY-MM-DD'}，或 undefined（此时使用 times.endDate）
    async getOperationMetricsDay(month) {
      if (!month) return
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
      const res = await post(getLzMachineOutput, params)

      if (res.success) {
        const xData = []
        const dayMachineList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          dayMachineList.push(item.machineHourlyOutput)
        })

        this.prodstatDayOption.xAxis[0].data = xData
        this.prodstatDayOption.series[0].data = dayMachineList

        // dataZoom 防护，默认显示前 24 条（按比例）
        const endPercent = xData.length
          ? Math.min(100, (24 / xData.length) * 100)
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
        this.prodstatDayOption.dataZoom = []
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
