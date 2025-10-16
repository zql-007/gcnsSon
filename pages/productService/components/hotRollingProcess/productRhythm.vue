<template>
  <div class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <span class="spanHead">生产节奏</span>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                type="date"
                value-format="yyyy-MM-dd"
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
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">加热炉出钢间隔</span></div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        ref="echartsRef"
                        :grid="smeltingTimeOption0.grid"
                        :tooltip="smeltingTimeOption0.tooltip"
                        :x-axis="smeltingTimeOption0.xAxis"
                        :y-axis="smeltingTimeOption0.yAxis"
                        :series="smeltingTimeOption0.series"
                        :data-zoom="smeltingTimeOption0.dataZoom"
                        :_height="'350px'"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <div><span
                        class="spanHeadTwo"
                        style="color: #ffffff">.</span></div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        :tooltip="chemicComOptionTwo.tooltip"
                        :legend="chemicComOptionTwo.legend"
                        :grid="chemicComOptionTwo.grid"
                        :x-axis="chemicComOptionTwo.xAxis"
                        :y-axis="chemicComOptionTwo.yAxis"
                        :series="chemicComOptionTwo.series"
                        :data-zoom="chemicComOptionTwo.dataZoom"
                        :_height="'350px'"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div>
                    <div>
                      <span class="spanHeadTwo">精轧轧制间隔</span>
                    </div>
                  </div>
                  <div style="height: 350px;">
                    <nercar-echarts
                      :tooltip="chemicComOptionJing.tooltip"
                      :legend="chemicComOptionJing.legend"
                      :grid="chemicComOptionJing.grid"
                      :x-axis="chemicComOptionJing.xAxis"
                      :y-axis="chemicComOptionJing.yAxis"
                      :series="chemicComOptionJing.series"
                      :data-zoom="chemicComOptionJing.dataZoom"
                      :_height="'350px'"
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
                    <div>
                      <span class="spanHeadTwo">工序节奏时间</span>
                    </div>
                  </div>
                  <div style="height: 350px">
                    <nercar-echarts
                      :tooltip="singleLiquorOption.tooltip"
                      :legend="singleLiquorOption.legend"
                      :grid="singleLiquorOption.grid"
                      :x-axis="singleLiquorOption.xAxis"
                      :y-axis="singleLiquorOption.yAxis"
                      :series="singleLiquorOption.series"
                      :data-zoom="singleLiquorOption.dataZoom"
                      :_height="'350px'"
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
import echartsScrollBar2 from '@/components/steelComponent/echartsScrollBar2.vue'
import { getPreviousDate, getPreviousMonthDate } from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import { getLgAodHotByTime } from '@/lib/productDataApply/steelmakingProcess'
import {
  getFinishingRollingInterval,
  getFurnaceDischargeInterval,
  getFurnaceDischargeIntervalBox,
  getProcessRhythmTime
} from '@/lib/productDataApply/hotRollingProcess'

export default {
  name: 'productRhythm',
  components: { echartsScrollBar2, NercarEcharts },
  data() {
    return {
      aodHotByTimeDataSon: null,
      times: {
        startDate: getPreviousMonthDate(),
        endDate: getPreviousDate()
      },
      tapButActCurrent: false,
      singleLiquorOption: {
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
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          selectedMode: false
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
            name: '单位：s',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
        dataZoom: []
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
            name: '单位：s',
            min: null,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#858585' //单位
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
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 5, // 设置图例标记的高度
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
            name: '单位：s',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#858585' //单位
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#5db362'
            },
            data: []
          }
        ],
        dataZoom: []
      },
      chemicComOptionJing: {
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
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 5, // 设置图例标记的高度
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
            name: '单位：s',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#5db362'
            },
            data: []
          }
        ],
        dataZoom: []
      }
    }
  },
  mounted() {
    this.getProcRhythmTime()
    this.getFinishingRollingIntervalData()
    this.getFurnaceDischargeIntervalData()
    this.getFurnaceDischargeIntervalBoxData()
  },
  methods: {
    clickTabCurrent() {
      this.getProcRhythmTime()
      this.getFinishingRollingIntervalData()
      this.getFurnaceDischargeIntervalData()
      this.getFurnaceDischargeIntervalBoxData()

      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //工序节奏时间
    async getProcRhythmTime() {
      const res = await post(getProcessRhythmTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        this.aodHotByTimeDataSon = res.data
        let xData = []
        let niWgtList = []
        let crWgtList = []
        let midWgtList = []
        let finishingCoilingDurationList = []
        this.aodHotByTimeDataSon.forEach(item => {
          xData.push(item.accDate)
          niWgtList.push(Number(item.roughingGap))
          crWgtList.push(Number(item.roughingDuration))
          midWgtList.push(Number(item.finishingGap))
          finishingCoilingDurationList.push(
            Number(item.finishingCoilingDuration)
          )
        })
        let rawData = [
          niWgtList,
          crWgtList,
          midWgtList,
          finishingCoilingDurationList
        ]
        /*const rawData = [
          [100, 302, 301, 334, 390, 330, 320],
          [320, 132, 101, 134, 90, 230, 210],
          [220, 182, 191, 234, 290, 330, 310]
        ]*/
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
        // ------------start计算每个柱子在整个维度中的比例,低于5%进行隐藏
        const seriesDataHide = []
        let legendData2 = [
          {
            name: '粗轧间隙',
            color: '#ffda35'
          },
          {
            name: '粗轧时间',
            color: '#55c6d4'
          },
          {
            name: '精轧间隙',
            color: '#ff9800'
          },
          {
            name: '精轧卷取时间',
            color: '#5db362'
          }
        ]
        const totalPerIndex = new Array(rawData[0].length).fill(0)
        for (let i = 0; i < rawData.length; i++) {
          for (let j = 0; j < rawData[i].length; j++) {
            totalPerIndex[j] += rawData[i][j]
          }
        }
        for (let i = 0; i < rawData.length; i++) {
          const currentSeries = {
            name: legendData2[i].name,
            //自定义每节柱状图颜色
            itemStyle: {
              color: legendData2[i].color
            },
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            data: []
          }
          for (let j = 0; j < rawData[i].length; j++) {
            const percentage = (rawData[i][j] / totalPerIndex[j]) * 100
            const showLabel = percentage >= 5
            currentSeries.data.push({
              value: rawData[i][j],
              label: {
                show: showLabel,
                position: 'inside',
                textStyle: {
                  color: '#000' // 设置图内文字为黑色
                },
                formatter: `${rawData[i][j]}`
              }
            })
          }
          seriesDataHide.push(currentSeries)
        }
        //------------end计算每个柱子在整个维度中的比例
        const colors = ['#ffda35', '#55c6d4', '#ff9800', '#5db362']
        const series = ['粗轧间隙', '粗轧时间', '精轧间隙', '精轧卷取时间'].map(
          (name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: colors[sid]
              },
              label: {
                show: true,
                position: 'inside',
                textStyle: {
                  color: '#000' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          }
        )
        this.singleLiquorOption.xAxis[0].data = xData
        this.singleLiquorOption.series = seriesDataHide

        this.singleLiquorOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 20) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //精轧轧制间隔
    async getFinishingRollingIntervalData() {
      const res = await post(getFinishingRollingInterval, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          yData.push(item.avgIntervalSeconds)
        })
        this.chemicComOptionJing.xAxis[0].data = xData
        this.chemicComOptionJing.series[0].data = yData

        this.chemicComOptionJing.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //加热炉出钢时间间隔（曲线图）
    async getFurnaceDischargeIntervalData() {
      const res = await post(getFurnaceDischargeInterval, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.forEach(item => {
          xData.push(item.castTime)
          yData.push(item.avgIntervalSeconds)
        })
        this.chemicComOptionTwo.xAxis[0].data = xData
        this.chemicComOptionTwo.series[0].data = yData

        this.chemicComOptionTwo.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
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
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
</style>
