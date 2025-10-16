<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">钢卷产量</span></div>
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
              <div style="height: 350px">
                <!-- 添加 ref 用于获取实例并绑定 click；同时监听自定义事件 chart-click（若组件支持） -->
                <nercar-echarts
                  ref="monthChart"
                  :legend="powerConsumptStatisticsOption.legend"
                  :tooltip="powerConsumptStatisticsOption.tooltip"
                  :grid="powerConsumptStatisticsOption.grid"
                  :x-axis="powerConsumptStatisticsOption.xAxis"
                  :y-axis="powerConsumptStatisticsOption.yAxis"
                  :series="powerConsumptStatisticsOption.series"
                  :data-zoom="powerConsumptStatisticsOption.dataZoom"
                  :_height="'340px'"
                  @chart-click-data="handleMonthBarClick"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 350px">
                <nercar-echarts
                  ref="dayChart"
                  :tooltip="chemicComOptionTwo.tooltip"
                  :legend="chemicComOptionTwo.legend"
                  :grid="chemicComOptionTwo.grid"
                  :x-axis="chemicComOptionTwo.xAxis"
                  :y-axis="chemicComOptionTwo.yAxis"
                  :series="chemicComOptionTwo.series"
                  :data-zoom="chemicComOptionTwo.dataZoom"
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
import { getLzCoilProduction } from '@/lib/productDataApply/ywColdRollingProcess'
import { post } from '@/lib/Util'
import NercarEcharts from '@/components/NercarEcharts.vue'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'

export default {
  name: 'steelCoilsOutput',
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      // times: {
      //   startDate: date2ym(
      //     new Date(new Date().setMonth(new Date().getMonth() - 6))
      //   ),
      //   endDate: date2ym(new Date())
      // },
      // 月度图配置（左图）
      powerConsumptStatisticsOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          },
          formatter: function(params) {
            let tar
            if (params[1] && params[1].value !== '-') {
              tar = params[1]
            } else {
              tar = params[2]
            }
            return (
              tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
            )
          }
        },
        legend: {
          data: ['重量'],
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
            name: '单位：万吨',
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        series: [
          // 占位（用于瀑布差值/参考）
          {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            silent: true,
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
              }
            },
            data: []
          },
          // 实际卷数柱子（可点击）
          {
            name: '重量',
            type: 'bar',
            barWidth: '60%',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              color: '#333333'
            },
            itemStyle: {
              color: params => {
                const dataLength = this.yDataList?.length || 0
                if (params.dataIndex === dataLength - 1) {
                  return '#ff9800' // 合计为黄色
                }
                return '#5DB362'
              }
            },
            data: []
          }
        ],
        dataZoom: []
      },
      tapButActCurrent: false,
      // 日度图配置（右图 — 每月每日产量）
      chemicComOptionTwo: {
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
          itemWidth: 15,
          itemHeight: 5,
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
            name: '单位：吨',
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: { show: false }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '日产量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            label: {
              show: false
            },
            itemStyle: {
              color: '#5db362'
            },
            data: []
          }
        ],
        dataZoom: []
      },
      // 原始柱状数据（用于颜色判断）
      yDataList: null,
      // 当前选中的月份（格式 yyyy-MM）
      currentMonthSelected: null,
      // 控制是否正在加载，避免并发请求（简单控制）
      loadingMonth: false,
      loadingDay: false
    }
  },
  mounted() {
    // 先加载月度数据，再基于月度数据默认加载最近一个月的日数据
    this.loadMonthData()
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      // 触发按日期范围刷新
      this.loadMonthData()
    },

    // 统一请求：按月加载（type === 'month'）
    async loadMonthData() {
      if (this.loadingMonth) return
      this.loadingMonth = true
      try {
        const params = {
          startDate: this.times.startDate,
          endDate: this.times.endDate,
          type: 'month'
        }
        const res = await post(getLzCoilProduction, params)
        if (!res || !res.success) {
          console.warn('获取月度产量失败', res)
          return
        }

        // 组织 x / y 数据
        const rawList = res.data?.lzCoilProductionCount || []
        const xData = []
        const yData = []
        rawList.forEach(item => {
          xData.push(item.accDate)
          yData.push(Number(item.weight) || 0)
        })

        // 添加合计（如果接口返回合计值）
        // 为兼容原逻辑：在 xData 和 yData 末尾添加 '合计' 和 totallzCoilCount（如果存在）
        if (res.data && typeof res.data.totallzWeightCount !== 'undefined') {
          xData.push('合计')
          yData.push(Number(res.data.totallzWeightCount) || 0)
        }

        // 设置到图表配置（避免直接引用导致响应式问题）
        this.powerConsumptStatisticsOption.xAxis[0].data = [...xData]
        // 主柱状图
        this.powerConsumptStatisticsOption.series[1].data = [...yData]
        // 保留原始数据，用于颜色判断
        this.yDataList = [...yData]

        // 生成占位参考序列（原 transformArray 的意图），保证长度匹配
        const referToData = this._buildPlaceholderArray(yData)
        // 原代码做了 referToData.splice(1,1) & reverse，保留类似处理以保持视觉效果
        if (referToData.length > 1) {
          // 在 splice 前做一次复制，避免破坏原数组
          const tmp = referToData.slice()
          if (tmp.length > 1) tmp.splice(1, 1)
          this.powerConsumptStatisticsOption.series[0].data = tmp.reverse()
        } else {
          this.powerConsumptStatisticsOption.series[0].data = []
        }

        // dataZoom 配置：默认显示前 13 条（如不足则显示全部）
        // const total = xData.length
        // const endPercent = total ? Math.min(100, (13 / total) * 100) : 100
        // this.powerConsumptStatisticsOption.dataZoom = [
        //   {
        //     type: 'slider',
        //     xAxisIndex: 0,
        //     height: 20,
        //     bottom: 0,
        //     start: 0,
        //     end: endPercent
        //   }
        // ]
        // dataZoom 配置：默认显示后 13 条（如不足则显示全部）
        const total = xData.length
        let startPercent = 0
        if (total > 13) {
          // 保证显示后 13 条：start = (total-13)/total * 100, end = 100
          startPercent = ((total - 13) / total) * 100
        } else {
          startPercent = 0
        }
        this.powerConsumptStatisticsOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: startPercent,
            end: 100
          }
        ]

        // 自动加载默认的日数据：选择最近一个真实月份（排除 '合计'）
        const lastIndex = xData.length - 1
        let defaultMonth = null
        if (lastIndex >= 0 && xData[lastIndex] === '合计') {
          // 取倒数第二个（如果存在）
          if (lastIndex - 1 >= 0) defaultMonth = xData[lastIndex - 1]
        } else if (lastIndex >= 0) {
          defaultMonth = xData[lastIndex]
        }
        if (defaultMonth) {
          // 设置当前选择并加载日数据
          this.currentMonthSelected = defaultMonth
          await this.loadDayData(defaultMonth)
        }
      } catch (e) {
        console.error('loadMonthData error', e)
      } finally {
        this.loadingMonth = false
      }
    },

    // 加载某个月的每日产量（type === 'day'）
    async loadDayData(month) {
      if (!month) return
      // 计算该月的开始和结束日期
      const startDate = `${month}-01`
      const year = parseInt(month.split('-')[0])
      const monthNum = parseInt(month.split('-')[1])
      const daysInMonth = new Date(year, monthNum, 0).getDate()
      const endDate = `${month}-${daysInMonth}`
      if (this.loadingDay) return
      this.loadingDay = true
      try {
        const params = {
          startDate: startDate,
          endDate: endDate,
          type: 'day'
        }
        const res = await post(getLzCoilProduction, params)
        if (!res || !res.success) {
          console.warn('获取日度产量失败', res)
          // 清空右侧图表数据以避免误导
          this.chemicComOptionTwo.xAxis[0].data = []
          this.chemicComOptionTwo.series[0].data = []
          return
        }

        // 假设接口返回的数据格式为 res.data.lzCoilProductionDay 或类似，尝试兼容常见字段
        // 优先寻找常见字段名，如果没有，尝试查看 res.data.lzCoilProductionCount（仅防护）
        const rawDayList =
          res.data?.lzCoilProductionDay ||
          res.data?.lzCoilProductionCount ||
          res.data?.dayList ||
          []
        const xData = []
        const yData = []
        rawDayList.forEach(item => {
          // item.accDate 可能是 yyyy-MM-dd 或 day 数字，尽量展示可读 x 轴标签
          const label = item.accDate || item.day || item.date || ''
          xData.push(label)
          yData.push(
            Number(item.weight) ||
              Number(item.coil) ||
              Number(item.count) ||
              Number(item.value) ||
              0
          )
        })

        // 如果没有返回明细（某些接口在请求 day 时可能把每日放在 res.data.data），做保护
        if (!rawDayList.length && res.data && Array.isArray(res.data.data)) {
          res.data.data.forEach(item => {
            const label = item.accDate || item.day || item.date || ''
            xData.push(label)
            yData.push(Number(item.weight) || 0)
          })
        }

        // 回填到右侧折线图
        this.chemicComOptionTwo.xAxis[0].data = [...xData]
        // 保证 series 存在
        if (
          !this.chemicComOptionTwo.series ||
          !this.chemicComOptionTwo.series.length
        ) {
          this.chemicComOptionTwo.series = [
            {
              name: '日产量',
              type: 'line',
              smooth: true,
              symbol: 'none',
              label: { show: false },
              itemStyle: { color: '#5db362' },
              data: []
            }
          ]
        }
        this.chemicComOptionTwo.series[0].data = [...yData]

        // dataZoom：若天数较多，可自动设置（例如初始显示前 20 天）
        const total = xData.length
        const endPercent = total ? Math.min(100, (20 / total) * 100) : 100
        this.chemicComOptionTwo.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: 0,
            end: endPercent
          }
        ]
      } catch (e) {
        console.error('loadDayData error', e)
      } finally {
        this.loadingDay = false
      }
    },

    async handleMonthBarClick(data) {
      // ECharts 点击柱子时，月份应该在 data.name 或 data.value 里
      const month = data?.data?.name || null
      if (!month || month === '合计') return // 排除掉“合计”那一栏

      this.currentMonthSelected = month
      await this.loadDayData(month)
    },

    // 用于生成占位参考数组（保留原 transformArray 的意图，但更鲁棒）
    _buildPlaceholderArray(yData) {
      // 生成类似原 transformArray 的差分数组，首位 0 开始
      // 例如 yData = [a, b, c, ...] => arr2 = [0, last, last - penultimate, ...] reversed later
      if (!Array.isArray(yData) || yData.length === 0) return []
      const arr2 = [0]
      for (let i = yData.length - 1; i >= 0; i--) {
        if (i === yData.length - 1) {
          arr2.push(yData[i])
        } else {
          const prev = arr2[arr2.length - 1]
          arr2.push(prev - (yData[i] || 0))
        }
      }
      return arr2
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
