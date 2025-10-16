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
            <span class="spanHead">精炼工序</span>
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
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div><span class="spanHeadTwo">LF精炼产量</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :tooltip="LfRefOutputOption.tooltip"
                    :legend="LfRefOutputOption.legend"
                    :grid="LfRefOutputOption.grid"
                    :x-axis="LfRefOutputOption.xAxis"
                    :y-axis="LfRefOutputOption.yAxis"
                    :series="LfRefOutputOption.series"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div>
                    <span class="spanHeadTwo">LF终点温度</span>
                  </div>
                  <div>
                    <span class="selectSpan">牌号</span>
                    <el-select
                      v-model="form.value"
                      class="custom-select"
                      clearable
                      placeholder="请选择"
                      @change="changeOptionValue">
                      <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    ref="echartsRef"
                    :grid="smeltingTimeOption0.grid"
                    :tooltip="smeltingTimeOption0.tooltip"
                    :x-axis="smeltingTimeOption0.xAxis"
                    :y-axis="smeltingTimeOption0.yAxis"
                    :series="smeltingTimeOption0.series"
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
import NercarEcharts from '@/components/NercarEcharts.vue'
import { getLastMonthDate, getNowDay } from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import {
  getLgAodBoxByTime,
  getLgJingProdByTime,
  getLgLFTempByTime
} from '@/lib/productDataApply/steelmakingProcess'
import { mapState } from 'vuex'

export default {
  name: 'refiningProcess',
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: getLastMonthDate(),
        endDate: getNowDay()
      },
      tapButActCurrent: false,
      LfRefOutputOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 5, // 设置图例标记的高度
          data: [
            { name: '304', icon: '' },
            { name: '304L', icon: '' },
            { name: '304B', icon: '' },
            { name: '304H', icon: '' },
            { name: '304HC', icon: '' },
            { name: '316L', icon: '' },
            { name: '321', icon: '' },
            { name: '炉数', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['1号', '2号', '3号', '4号', '5号'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      form: {
        value: '304'
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
      smeltingTimeOption0: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            // console.log('pp', params)
            let value = params.value
            let seriesName = params.name
            if (params.seriesType === 'boxplot') {
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
              params.seriesType === 'scatter' &&
              params.name !== params.seriesIndex
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
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['LF1', 'LF2', 'LF3', 'LF4', 'LF5'],
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
              show: false
            }
          }
        ],
        yAxis: [
          {
            min: 'dataMin',
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
            data: [],
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
        ]
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  mounted() {
    this.getLfRefOutputData()
    this.getLgLFTempByTimeData()
    this.options = this.dataDictionary['lg-steel']
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getLfRefOutputData()
      this.getLgLFTempByTimeData()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //LF精炼产量
    async getLfRefOutputData() {
      const res = await post(getLgJingProdByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        let xData = []
        res.data.forEach(item => {
          xData.push(item.staidDictText)
        })
        xData = [...new Set(xData)]
        this.LfRefOutputOption.xAxis[0].data = []
        this.LfRefOutputOption.xAxis[0].data = xData

        const steelGrades = [
          '304',
          '304L',
          '304B',
          '304H',
          '304HC',
          '316L',
          '321'
        ]
        const furnaceNames = ['1号LF', '2号LF', '3号LF', '4号LF', '5号LF']
        //初始化一个对象 result，对象的键为炉号，值是长度为 7 的数组，初始值都为 0
        const result = {}
        const stovesResult = {}
        furnaceNames.forEach(furnace => {
          result[furnace] = new Array(steelGrades.length).fill(0)
          stovesResult[furnace] = 0
        })

        res.data.forEach(item => {
          item.outWgt = Number(item.outWgt)
          const furnace = item.staidDictText
          const gradeIndex = steelGrades.indexOf(item.steelGrade)
          if (furnaceNames.includes(furnace) && gradeIndex !== -1) {
            result[furnace][gradeIndex] = item.outWgt
            stovesResult[furnace] += item.stoves
          }
        })
        // 输出结果
        //转成需要的二维数组格式，每个二维数组元素数组为一个钢种（304、304L...）的全部数据
        const values = Object.values(result)
        const numArrays = values.length
        const arrayLength = values[0].length
        let rawData = []

        for (let i = 0; i < arrayLength; i++) {
          const newArray = []
          for (let j = 0; j < numArrays; j++) {
            newArray.push(values[j][i])
          }
          rawData.push(newArray)
        }
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
        // ------------start计算每个柱子在整个维度中的比例,低于5%进行隐藏
        const seriesDataHide = []
        let legendData2 = [
          {
            name: '304',
            color: '#5db362'
          },
          {
            name: '304L',
            color: '#ff9800'
          },
          {
            name: '304B',
            color: '#55c6d4'
          },
          {
            name: '304H',
            color: '#ffc000'
          },
          {
            name: '304HC',
            color: '#a146b0'
          },
          {
            name: '316L',
            color: '#68aeff'
          },
          {
            name: '321',
            color: '#255e91'
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
            const showLabel = percentage >= 10
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
        /*let rawData = []
        for (const furnace in result) {
          rawData.push(result[furnace])
        }*/
        let lineData = []
        Object.entries(stovesResult).forEach(([key, value]) => {
          lineData.push(value)
        })
        //一个柱状图展示多个维度的数据格式
        /*const rawData = [
          [33, 55, 44, 33, 22, 2, 33],
          [320, 132, 101, 134, 90, 2, 210],
          [23, 44, 301, 7, 88, 44, 320],
          [320, 132, 101, 134, 90, 230, 210],
          [3, 34, 56, 77, 88, 22, 55],
          [320, 132, 101, 134, 90, 33, 210],
          [2, 12, 34, 23, 34, 45, 66]
        ]*/
        const colors = [
          '#5db362',
          '#ff9800',
          '#55c6d4',
          '#ffc000',
          '#a146b0',
          '#68aeff',
          '#255e91'
        ]
        const series = [
          '304',
          '304L',
          '304B',
          '304H',
          '304HC',
          '316L',
          '321'
        ].map((name, sid) => {
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
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: rawData[sid]
          }
        })
        seriesDataHide.push({
          name: '炉数',
          type: 'line',
          smooth: true, // 开启平滑曲线
          // symbol: 'none', // 去掉转折点的圆点
          yAxisIndex: 1,
          label: {
            show: true, // 显示转折点数值
            position: 'top' // 数值显示在转折点上方
          },
          itemStyle: {
            color: '#f45549'
          },
          data: lineData
        })
        this.LfRefOutputOption.series = seriesDataHide
      }
    },
    //LF终点温度
    changeOptionValue(val) {
      this.form.value = val
      this.getLgLFTempByTimeData()
    },
    async getLgLFTempByTimeData() {
      const res = await post(getLgLFTempByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steelGrade: this.form.value
      })
      if (res.success) {
        const isEmpty1 = Object.keys(res.data).length === 0
        if (isEmpty1) {
          //销毁echarts组件,强制去除异常点残留问题
          this.$refs.echartsRef.echart.dispose()
        } else {
          //重新初始化echarts组件
          this.$refs.echartsRef.reInitChart()
        }
        let xData = Object.keys(res.data)
        //按顺序'LG1_LF1', 'LG1_LF2...依次排列
        /*xData.sort((a, b) => {
          const numA = parseInt(a.match(/\d+$/)[0], 10)
          const numB = parseInt(b.match(/\d+$/)[0], 10)
          return numA - numB
        })*/
        // console.log('xData', xData)
        let valueList = Object.values(res.data)
        // console.log('valueList', valueList)
        let toolTipList = ['max', 'q3', 'median', 'q1', 'min']
        let LGTotalData = []
        for (let item of valueList) {
          const newItem = []
          for (let val of toolTipList) {
            newItem.push(item[val])
          }
          LGTotalData.push(newItem)
        }
        let minTwoArr = this.findMinIn2DArray(LGTotalData)
        // console.log('LGTotalData', LGTotalData)
        //计算二维数组里最小的值,以最小值为y轴最低刻度线，保证数据展示效果合理
        for (let item of valueList) {
          const newItem = []
          newItem.push(item['outliers'])
          LGTotalData.push(newItem)
        }
        this.smeltingTimeOption0.yAxis[0].min = minTwoArr - 3
        //箱线图五个特征值
        this.smeltingTimeOption0.series[0].data = LGTotalData
        //X轴数据
        let xDataEnd = []
        this.dataDictionary['lg-lfStaid'].forEach(item => {
          xData.forEach(val => {
            if (item.code === val) {
              xDataEnd.push(item.text)
            }
          })
        })
        this.smeltingTimeOption0.xAxis[0].data = xDataEnd
        //每个横坐标维度异常点数据格式转化（outliersResult：只展示存在的异常点）
        const outliersResult = []
        xData.forEach((key, index) => {
          const outliers = res.data[key].outliers
          outliers.forEach(outlier => {
            outliersResult.push([index, outlier])
          })
        })
        // console.log('outliersResult', JSON.stringify(outliersResult))
        //设置异常点,转为最终赋值异常点的数据格式（OutliersArrays：没有的异常点进行补空数组处理，对应上X轴）
        let OutliersArrays = this.mergeOutliersArrays(
          outliersResult,
          xData.length
        )
        // console.log('OutliersArrays', OutliersArrays)
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
              borderColor: '#5cb85c',
              borderWidth: 1
            },
            label: {
              show: false
            }
          })
        })
      }
    },
    //计算二维数组里最小的值
    findMinIn2DArray(arr) {
      if (arr.length === 0) {
        return null
      }
      let min = arr[0][0]
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] < min) {
            min = arr[i][j]
          }
        }
      }
      return min
    },
    //以X轴为维度，算每个X轴刻度的异常点个数，没有异常点的维度进行补空数组处理（arr:未补空的异常点数据；xLength：X轴长度）
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

      for (let i = 0; i < xLength; i++) {
        result.push(map.get(i) || [])
      }

      return result
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
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
</style>
