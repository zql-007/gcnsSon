<template>
  <div>
    <el-row
      :gutter="16"
      style="margin-top: 16px">
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div>
            <div style="display: flex;justify-content: space-between">
              <div>
                <span class="spanHead">卷取时长与钢种规格转换次数分析</span>
              </div>
              <div>
                <span class="datePickerLable">日期选择</span>
                <el-date-picker
                  v-model="times.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 150px"
                  placeholder="选择日期">
                </el-date-picker>
                <span>-</span>
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
            <div style="height: 350px;padding-top: 10px">
              <nercar-echarts
                :legend="outputStatOption.legend"
                :tooltip="outputStatOption.tooltip"
                :grid="outputStatOption.grid"
                :x-axis="outputStatOption.xAxis"
                :y-axis="outputStatOption.yAxis"
                :series="outputStatOption.series"
                :data-zoom="outputStatOption.dataZoom"
                :_height="'340px'"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div>
            <div style="display: flex;justify-content: space-between">
              <div>
                <span class="spanHead">平均厚度与产量</span>
              </div>
              <div>
                <span class="datePickerLable">月份选择</span>
                <el-date-picker
                  v-model="times.endDateMonth"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 120px"
                  placeholder="选择日期">
                </el-date-picker>
                <el-tag
                  :class="[tapButActMonthCurrent===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabMonthCurrent"><span
                    class="spanStyle">查询</span></el-tag>
              </div>
            </div>
            <div style="height: 350px;padding-top: 10px">
              <nercar-echarts
                :legend="SMIOption.legend"
                :tooltip="SMIOption.tooltip"
                :grid="SMIOption.grid"
                :x-axis="SMIOption.xAxis"
                :y-axis="SMIOption.yAxis"
                :series="SMIOption.series"
                :data-zoom="SMIOption.dataZoom"
                :_height="'348px'"
              />
            </div>
        </div></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import { post } from '@/lib/Util'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import {
  getLzAvgThicknessAndYield,
  getCoilingTimeAndSteelGrade
} from '@/lib/productDataApply/ywColdRollingProcess'

export default {
  name: 'rollUpTime',
  components: { NercarEcharts },
  data() {
    // 计算默认近30天：包含今天和前29天
    const today = new Date()
    const endDateStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const startDateObj = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 29
    )
    const startDateStr = `${startDateObj.getFullYear()}-${String(
      startDateObj.getMonth() + 1
    ).padStart(2, '0')}-${String(startDateObj.getDate()).padStart(2, '0')}`

    return {
      tapButActCurrent: false,
      tapButActMonthCurrent: false,
      times: {
        startDate: startDateStr,
        endDate: endDateStr,
        endDateMonth: date2ym(new Date())
      },
      finishLegendStyleList: [
        {
          name: 'Day≤7',
          color: '#55c6d4'
        },
        {
          name: '7＜Day≤30',
          color: '#ff9800'
        },
        {
          name: '30＜Day≤180',
          color: '#5db362'
        },
        {
          name: '180＜Day',
          color: '#ffda35'
        }
      ],
      finishOccupOption: {
        legend: {
          data: ['绿色区域', '天蓝色区域', '橙色区域', '黄色区域'],
          orient: 'horizontal',
          left: 'center',
          top: '1%',
          selectedMode: true,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 12
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            // top: '4%',
            containLabel: true
          }
        ],
        series: [
          {
            type: 'treemap',
            left: 0, //left、right、top、bottom几个值为0用于矩形树图占据整个容器
            right: 0,
            top: 0,
            bottom: 0,
            leafDepth: null,
            roam: false,
            breadcrumb: { show: false }, //去掉矩形树图下方root黑色标签
            nodeClick: false, //节点点击无反应
            data: null,
            // 其他配置...
            visualMap: {
              show: false
            },
            // upperLabel: false,
            upperLabel: {
              show: false
            },
            label: {
              show: true
            },
            itemStyle: {
              borderColor: '#fff',
              // borderWidth: 1 // 设置边框宽度，增加节点之间的间隔
              gapWidth: 2 // 设置节点内部子节点之间的间隔
            },
            levels: [
              {
                depth: 1,
                itemStyle: {
                  borderWidth: 2
                },
                upperLabel: {
                  show: false
                },
                label: {
                  show: false // 隐藏该层级的标签
                }
              },
              {
                depth: 2,
                itemStyle: {
                  borderWidth: 1
                },
                upperLabel: {
                  show: false
                }
              }
            ]
            // silent: true // 禁止矩形树图的所有交互
          }
        ]
      },
      options: [
        {
          value: '304',
          label: '304'
        },
        {
          value: '305',
          label: '305'
        },
        {
          value: '306',
          label: '306'
        }
      ],
      form: {
        value: '304'
      },
      smeltingTimeOption0: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          },
          formatter: function(params) {
            let value = params[0].value
            let seriesName = params[0].name
            if (params[0].seriesType === 'boxplot') {
              return (
                '<div style="font-size: 14px; font-weight: bold;">' +
                seriesName +
                '</div>' +
                '<div>上边缘USL: ' +
                value[1] +
                '</div>' +
                '<div>上四分位数: ' +
                value[2] +
                '</div>' +
                '<div>中位数: ' +
                value[3] +
                '</div>' +
                '<div>下四分位数: ' +
                value[4] +
                '</div>' +
                '<div>下边缘DSL: ' +
                value[5] +
                '</div>'
              )
            }
            if (
              params[0].seriesType === 'scatter' &&
              params[0].name !== params[0].seriesIndex
            ) {
              return (
                '<div style="font-size: 14px; font-weight: bold;">' +
                seriesName +
                '</div>' +
                '<div>异常点: ' +
                value[1]
              )
            }
          }
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
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 0, //X轴展示不全
              color: '#333'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            min: null,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          }
        ],
        series: [
          {
            type: 'boxplot',
            data: [
              // 1号数据
              [50, 55, 60, 60, 60],
              // 2号数据
              [50, 55, 55, 60, 65],
              // 3号数据
              [45, 50, 55, 55, 60],
              // 4号数据
              [35, 40, 45, 50, 55],
              // 5号数据
              [30, 35, 40, 40, 45],
              // 6号数据
              [25, 30, 30, 35, 40],
              // 7号数据
              [40, 40, 45, 50, 55]
            ],
            boxWidth: '18',
            itemStyle: {
              color: '#5cb85c',
              borderColor: '#5cb85c' // 添加这一行，设置边线颜色为绿色
            },
            boxplotItemStyle: {
              medianColor: 'transparent' // 将中位数线颜色设为透明，取消显示
            },
            emphasis: {
              itemStyle: {
                color: '#5cb85c',
                borderColor: '#5cb85c'
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{b}: {c}'
              }
            },
            // 新增异常值点样式设置
            outlierStyle: {
              color: '#5cb85c',
              borderColor: '#5cb85c',
              symbolSize: 6
            }
          }
        ],
        dataZoom: []
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
              name: '钢种转换',
              icon: ''
            },
            {
              name: '规格转换',
              icon: ''
            },
            { name: '生产时长', icon: 'line' }
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
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            name: '单位：次',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}'
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
            name: '钢种转换',
            type: 'bar',
            data: [1, 2, 4, 5, 10, 11, 3, 23, 21, 8],
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
            name: '规格转换',
            type: 'bar',
            data: [1, 2, 4, 5, 10, 11, 3, 23, 21, 8],
            barWidth: 13,
            label: {
              show: false,
              formatter: '{c}%',
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '生产时长',
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
            data: [23, 44, 55, 66, 23, 12, 8, 65, 33, 67],
            itemStyle: {
              color: '#a146b0'
            }
          }
        ],
        dataZoom: [
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
            end: 100
          }
        ]
      },
      SMIOption: {
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
          // data: ['重量', '作业率']
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          // top: '1%',
          data: [
            {
              name: '日产量',
              icon: ''
            }, // 设置为线形
            { name: '平均厚度', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '10%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            name: '单位：吨',
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
            name: '单位：毫米',
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
            name: '日产量',
            type: 'bar',
            barWidth: '70%',
            data: [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '平均厚度',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [22, 33, 3, 5, 21, 15, 34, 32, 11, 9, 10],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: 0,
            height: 20, //滑块高度设置
            bottom: 10, //缩放条显示在底部
            // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
            start: 0,
            // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
            end: 100 //100%
            // end: (31 / xData.length) * 100
          }
        ]
      }
    }
  },
  mounted() {
    this.getFinishProductAll()
    // this.getFurnaceDischargeIntervalBoxData()
    // 新增：挂载时也请求右侧图表数据
    this.getAvgThicknessAndYield()
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getFinishProductAll()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    clickTabMonthCurrent() {
      // 新增：刷新右侧图表数据
      this.getAvgThicknessAndYield()

      this.tapButActMonthCurrent = true

      setTimeout(() => {
        this.tapButActMonthCurrent = false
      }, 1000)
    },
    async getFinishProductAll() {
      const res = await post(getCoilingTimeAndSteelGrade, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'day'
      })

      if (res.success && res.data && res.data.length > 0) {
        // 对返回数据按日期排序
        const sortedData = res.data.sort((a, b) => {
          return new Date(a.accDate) - new Date(b.accDate)
        })

        // 提取数据
        const dates = sortedData.map(item => item.accDate)
        const steelConversions = sortedData.map(item => item.steelConversions)
        const thicknessConversions = sortedData.map(
          item => item.thicknessConversions
        )
        const productionTimes = sortedData.map(item => item.totalProductionTime)

        // 更新图表数据
        this.outputStatOption.xAxis[0].data = dates
        this.outputStatOption.series[0].data = steelConversions
        this.outputStatOption.series[1].data = thicknessConversions
        this.outputStatOption.series[2].data = productionTimes

        // 更新dataZoom配置
        // this.outputStatOption.dataZoom = [
        //   {
        //     type: 'slider',
        //     xAxisIndex: 0,
        //     height: 20,
        //     bottom: 0,
        //     start: 0,
        //     end: Math.min(100, (12 / dates.length) * 100) // 初始显示最多12条数据
        //   }
        // ]
        // 更新dataZoom配置：默认显示“后面”的 12 条数据
        const total = dates.length || 0
        const showCount = Math.min(12, total)

        // 计算 start（百分比），若数据少于等于 showCount 则从 0 开始显示全部
        const startPercent =
          total === 0 ? 0 : Math.max(0, ((total - showCount) / total) * 100)

        this.outputStatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: startPercent,
            end: 100 // 始终以结束位置为 100%，显示最后的 showCount 条数据
          }
        ]
      } else {
        // 没有数据时清空图表
        this.outputStatOption.xAxis[0].data = []
        this.outputStatOption.series[0].data = []
        this.outputStatOption.series[1].data = []
        this.outputStatOption.series[2].data = []
      }
    },
    changeOptionValue(val) {},

    //加热炉出钢时间间隔(箱体图)
    async getFurnaceDischargeIntervalBoxData() {
      const res = await post(getFurnaceDischargeIntervalBox, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        let x = []
        let y1 = []
        res.data.forEach(item => {
          x.push(item.steelGrade)
          y1.push(item.intervalSecondsList)
        })
        //将返回的二维数组中的字符串值转成Number类型的数值
        const resultY1 = y1.map(subArray => subArray.map(Number))
        const resultBoxplot = this.prepareBoxplotData(resultY1)

        //计算出异常点需要的格式resultUtliers
        const maxIndex = Math.max(
          ...resultBoxplot.outliers.map(subArr => subArr[0])
        )
        const resultUtliers = Array.from({ length: maxIndex + 1 }, () => [])
        resultBoxplot.outliers.forEach(subArr => {
          const index = subArr[0]
          const values = subArr.slice(1)
          resultUtliers[index] = values
        })

        //横坐标
        this.smeltingTimeOption0.xAxis[0].data = x
        //纵坐标的值min, Q1, Q2, Q3, max
        this.smeltingTimeOption0.series[0].data = resultBoxplot.boxData
        //设置异常点,转为最终赋值异常点的数据格式
        let OutliersArrays = this.mergeOutliersArrays(
          resultBoxplot.outliers,
          x.length
        )
        //防止重复异常点，删除每次调用不同钢板号之前异常的数据
        this.smeltingTimeOption0.series.splice(1)
        OutliersArrays.forEach(item => {
          this.smeltingTimeOption0.series.push({
            name: '',
            type: 'scatter',
            symbolSize: 5,
            data: item,
            itemStyle: {
              //异常点（空心）
              color: 'transparent',
              borderColor: '#5DB362',
              borderWidth: 1
            },
            label: {
              show: false
            }
          })
        })

        //设置zoom
        this.smeltingTimeOption0.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((x.length - 8) / x.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
            // start: 0,
            // end: (13 / this.pickSpeedDataListSon.x.length) * 100 // 初始显示前 13 条数据
          }
        ]
        // 手动更新 ECharts 实例
        this.$nextTick(() => {
          if (this.$refs.echartsRef) {
            this.$refs.echartsRef.updateOption(this.smeltingTimeOption0, true)
          }
        })
      }
    },
    //计算min, Q1, Q2, Q3, max、异常点
    prepareBoxplotData(rawData) {
      const boxData = []
      const outliers = []
      const axisData = []
      let outliersList = null

      rawData.forEach((arr, idx) => {
        const data = arr.slice().sort((a, b) => a - b)
        const Q1 = this.quantile(data, 0.25)
        const Q2 = this.quantile(data, 0.5) // 中位数
        const Q3 = this.quantile(data, 0.75)
        const IQR = Q3 - Q1
        const lowerFence = Q1 - 1.5 * IQR
        const upperFence = Q3 + 1.5 * IQR

        const validData = data.filter(v => v >= lowerFence && v <= upperFence)
        const min = validData[0]
        const max = validData[validData.length - 1]

        boxData.push([max, Q3, Q2, Q1, min])
        axisData.push(`类目${idx}`)

        data.forEach((v, i) => {
          if (v < lowerFence || v > upperFence) {
            outliers.push([idx, v])
          }
        })
      })

      return {
        boxData, // 每组的 [max, Q3, Q2, Q1, min]
        outliers, // 所有的异常点
        axisData // 横坐标分类
      }
    },
    //计算以X轴为维度，每个X轴刻度的异常点数据
    mergeOutliersArrays(arr, xLength) {
      const result = []
      const map = new Map()

      for (const subArr of arr) {
        const key = subArr[0]
        if (map.has(key)) {
          const currentGroup = map.get(key)
          let found = false
          for (let i = 0; i < currentGroup.length; i++) {
            if (
              currentGroup[i][0] === subArr[0] &&
              currentGroup[i][1] === subArr[1]
            ) {
              found = true
              break
            }
          }
          if (!found) {
            currentGroup.push(subArr)
          }
        } else {
          map.set(key, [subArr])
        }
      }

      for (let i = 1; i <= xLength; i++) {
        result.push(map.get(i) || [])
      }

      return result
    },
    quantile(arr, p) {
      const pos = (arr.length - 1) * p
      const base = Math.floor(pos)
      const rest = pos - base
      if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base])
      } else {
        return arr[base]
      }
    },

    /**
     * 新增：获取平均厚度与产量（右侧图表）
     * 参数格式：{startDate: "2024-11-01", endDate: "2024-11-30", type: "day"}
     */
    async getAvgThicknessAndYield() {
      console.log('getAvgThicknessAn**************Yield')
      try {
        // 计算选择月份的起止日期 (times.endDateMonth 格式 yyyy-MM)
        const fallbackMonth = (this.times.endDateMonth || '').slice(0, 7)
        const parts = fallbackMonth.split('-')
        if (parts.length !== 2) {
          // 如果格式异常，直接清空并返回
          this.SMIOption.xAxis[0].data = []
          this.SMIOption.series[0].data = []
          this.SMIOption.series[1].data = []
          return
        }
        const year = parseInt(parts[0], 10)
        const mon = parseInt(parts[1], 10)
        const lastDay = new Date(year, mon, 0).getDate()
        const startDate = `${parts[0]}-${parts[1]}-01`
        const endDate = `${parts[0]}-${parts[1]}-${String(lastDay).padStart(
          2,
          '0'
        )}`

        const res = await post(getLzAvgThicknessAndYield, {
          startDate: startDate,
          endDate: endDate,
          type: 'day'
        })

        if (
          !res ||
          !res.success ||
          !Array.isArray(res.data) ||
          res.data.length === 0
        ) {
          // 没有数据时清空图表数据
          this.SMIOption.xAxis[0].data = []
          this.SMIOption.series[0].data = []
          this.SMIOption.series[1].data = []
          return
        }

        // 解析后端返回的数据，做容错兼容：
        // 常见字段候选：
        // 时间字段： date, accDate, prodEnd, day, inStockTime, time
        // 产量字段： yield, exitWeight, weight, totalWeight, totalCount, dailyYield
        // 厚度字段： averagethick, avgThickness, thickness, thick, averagethickness, averagethick
        const x = []
        const yieldArr = []
        const thicknessArr = []

        res.data.forEach(item => {
          // 时间
          const dateVal =
            item.date ??
            item.accDate ??
            item.prodEnd ??
            item.day ??
            item.inStockTime ??
            item.time ??
            item.month ??
            item.statDate ??
            ''

          // 产量（优先选择常见字段）
          const yValRaw =
            item.yield ??
            item.exitWeight ??
            item.weight ??
            item.totalWeight ??
            item.totalCount ??
            item.dailyYield ??
            item.machineHourlyOutput ??
            0

          // 平均厚度
          const tValRaw =
            item.averageThick ??
            item.avgThickness ??
            item.thickness ??
            item.thick ??
            item.averagethickness ??
            item.AvgThickness ??
            undefined

          // 尝试解析数值
          const yVal =
            yValRaw === null || yValRaw === undefined ? 0 : Number(yValRaw)
          let tVal =
            tValRaw === null || tValRaw === undefined
              ? undefined
              : Number(tValRaw)

          // 若 thickness 字段不存在但有其他字段可由字符串里提取（谨慎），这里不做额外猜测
          // 填充 x、y、t
          x.push(String(dateVal).slice(0, 10)) // 仅保留到日，防止时间带时分秒导致显示拥挤
          yieldArr.push(Number.isFinite(yVal) ? yVal : 0)
          if (tVal === undefined || !Number.isFinite(tVal)) {
            thicknessArr.push(null)
          } else {
            // 保留一位小数
            thicknessArr.push(Number(tVal.toFixed(1)))
          }
        })

        // 赋值到图表配置（保持原有样式不变）
        this.SMIOption.xAxis[0].data = x
        // SMIOption.series[0] 是日产量（柱），series[1] 是平均厚度（线）
        this.SMIOption.series[0].data = yieldArr
        this.SMIOption.series[1].data = thicknessArr

        // 如果需要可以触发图表更新（NercarEcharts 通常会响应 prop 变化）
        this.$nextTick(() => {
          // 如果你的 NercarEcharts 暴露了 updateOption 的 ref，可以手动触发更新，这里做安全判断（不强制）
          if (
            this.$refs &&
            this.$refs.smiEchartsRef &&
            this.$refs.smiEchartsRef.updateOption
          ) {
            try {
              this.$refs.smiEchartsRef.updateOption(this.SMIOption, true)
            } catch (e) {
              // 忽略更新失败，props 本身应已更新
            }
          }
        })
      } catch (err) {
        // 出错时清空图表并打印错误（便于本地调试）
        console.error('getAvgThicknessAndYield error:', err)
        this.SMIOption.xAxis[0].data = []
        this.SMIOption.series[0].data = []
        this.SMIOption.series[1].data = []
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
  margin-left: 20px;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActive {
  background-color: #35a034;
  margin-left: 20px;
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
  width: 120px;
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
  width: 100%;
}
.datePickerLable {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}

ul {
  list-style-type: none;
  display: flex;
  padding: 0;
}

li {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.liDivStyle {
  display: inline-block;
  content: '';
  width: 12px;
  height: 12px;
  margin-right: 8px;
}
.liDivSpan {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
}

.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
/deep/ .el-date-editor .el-input__inner {
  width: 145px;
}
</style>
