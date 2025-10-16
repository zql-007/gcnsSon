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
            <div><span class="spanHead">原料库存占用（卷）</span></div>
          </div>
          <div>
            <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
              <ul>
                <li
                  v-for="(item, index) in finishLegendStyleList"
                  :key="index + '007'">
                  <div
                    :style="{ backgroundColor: item.color }"
                    class="liDivStyle">
                  </div>
                  <span class="liDivSpan">{{ item.name }}</span>
                </li>
              </ul>
            </div>
            <div style="height: 322px;">
              <nercar-echarts
                :legend="finishOccupOption.legend"
                :grid="finishOccupOption.grid"
                :series="finishOccupOption.series"
                :_height="'320px'"
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
                <span class="spanHead">成品在库时长</span>
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="datePickerLable">日期选择</span>
                <el-date-picker
                  v-model="times.startDate"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 120px;"
                  placeholder="选择日期">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="times.endDate"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 120px"
                  placeholder="选择日期">
                </el-date-picker>
                <el-tag
                  :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabCurrent"><span
                    class="spanStyle">查询</span></el-tag>
              </div>
            </div>
            <div style="height: 350px">
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
        </div></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import { post } from '@/lib/Util'
import {
  getRawMaterialInventoryOccupancy,
  getFinishedProductStorageTime
} from '@/lib/productDataApply/ywColdRollingProcess'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import {
  getFinishingRollingInterval,
  getFurnaceDischargeInterval,
  getFurnaceDischargeIntervalBox,
  getProcessRhythmTime
} from '@/lib/productDataApply/hotRollingProcess'

export default {
  name: 'materialOccupat',
  components: { NercarEcharts },
  data() {
    return {
      tapButActCurrent: false,
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
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
          value: 'S30400',
          label: '304'
        },
        {
          value: 'S30403',
          label: '304L'
        }
      ],
      form: {
        value: 'S30400' //默认查304
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
            },
            // 添加单位提示
            name: '单位：小时',
            nameTextStyle: {
              color: '#333',
              padding: [0, 0, 0, 10] // 调整位置
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
      }
    }
  },
  mounted() {
    this.getFinishProductAll()
    this.getFurnaceDischargeIntervalBoxData()
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getFinishProductAll()
      this.getFurnaceDischargeIntervalBoxData()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    async getFinishProductAll() {
      const res = await post(getRawMaterialInventoryOccupancy, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steelGrade: this.form.value
      })
      if (res.success && res.data.length > 0) {
        //从接口获取每个库存维度的数据
        let dayLess3 = []
        let day3Medi7 = []
        let day7Medi15 = []
        let dayBig15 = []
        res.data.forEach(item => {
          switch (item['storeHours']) {
            case 'Day≤7':
              dayLess3.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '7<Day≤30':
              day3Medi7.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '30<Day≤180':
              day7Medi15.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '180<DAY':
              if (!item.thick) item.thick = item.steelGrade
              dayBig15.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
          }
        })
        // 矩形树图的数据
        let data = {
          name: 'root',
          children: [
            {
              name: '天蓝色区域',
              itemStyle: {
                color: '#55c6d4'
              },
              children: [
                {
                  name: 'Day≤7',
                  children: dayLess3
                }
              ]
            },
            {
              name: '橙色区域',
              itemStyle: {
                color: '#ff9800'
              },
              children: [
                {
                  name: '7＜Day≤30',
                  children: day3Medi7
                }
              ]
            },
            {
              name: '绿色区域',
              itemStyle: {
                color: '#5db362'
              },
              children: [
                {
                  name: '30＜Day≤180',
                  children: day7Medi15
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#ffda35'
              },
              // children: dayBig15
              children: [
                {
                  name: '180＜Day',
                  children: dayBig15
                }
              ]
            }
          ]
        }
        this.finishOccupOption.series[0].data = [data]
      } else {
        this.finishOccupOption.series[0].data = []
      }
    },
    changeOptionValue(val) {},

    //加热炉出钢时间间隔(箱体图)
    async getFurnaceDischargeIntervalBoxData() {
      const res = await post(getFinishedProductStorageTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steelGrade: this.form.value
      })
      if (res.success) {
        let x = []
        let y1 = []
        res.data.forEach(item => {
          x.push(item.thickness.replace(/Thickness/g, '厚度'))
          y1.push(item.storageTimeList)
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
</style>
