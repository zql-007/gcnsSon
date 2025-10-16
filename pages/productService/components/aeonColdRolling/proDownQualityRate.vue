<template>
  <div class="contentBox">
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
                <span class="spanHead">产品降级重量(吨)与产品合格率</span>
              </div>
              <div>
                <span class="selectSpan">日期选择</span>
                <el-date-picker
                  v-model="times.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 140px"
                  placeholder="选择日期">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="times.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 140px"
                  placeholder="选择日期">
                </el-date-picker>
                <el-tag
                  :class="[tapButActLeft===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabLeft"><span
                    class="spanStyle">查询</span></el-tag>
              </div>
            </div>
            <div style="height: 353px;padding-top: 20px">
              <nercar-echarts
                :tooltip="moltenSteelOutputOption.tooltip"
                :legend="moltenSteelOutputOption.legend"
                :grid="moltenSteelOutputOption.grid"
                :x-axis="moltenSteelOutputOption.xAxis"
                :y-axis="moltenSteelOutputOption.yAxis"
                :series="moltenSteelOutputOption.series"
                :data-zoom="moltenSteelOutputOption.dataZoom"
                :_height="'340px'"
              />
            </div>
        </div></el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">产品降级主缺陷工序分布(卷)</span></div>
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
              <el-tag
                :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabCurrent"><span
                  class="spanStyle">查询</span></el-tag>
            </div>
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
            <div style="height: 320px;">
              <!-- 替换为与左侧相同的方块图 -->
              <nercar-echarts
                :legend="materialOccupOption.legend"
                :grid="materialOccupOption.grid"
                :series="materialOccupOption.series"
                :_height="'320px'"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import { post } from '@/lib/Util'
import { getFinishedProductStock } from '@/lib/productDataApply/hotRollingProcess'
import {
  getLzDowngradeWeightAndPassRate,
  getDegradedMainDefectProcessDistribution
} from '@/lib/productDataApply/ywColdRollingProcess'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import { getAodXbTimeByTime } from '@/lib/productDataApply/steelmakingProcess'

export default {
  name: 'proDownQualityRate',
  components: { NercarEcharts },
  data() {
    return {
      tapButActCurrent: false,
      tapButActLeft: false,
      times: {
        startDate: this.getDefaultStartDate(),
        endDate: this.getDefaultEndDate()
      },
      finishLegendStyleList: [
        {
          name: '炼钢',
          color: '#ffd000'
        },
        {
          name: '热轧',
          color: '#5db362'
        },
        {
          name: '热酸',
          color: '#264478'
        },
        {
          name: '轧机',
          color: '#a146b0'
        },
        {
          name: '冷酸',
          color: '#ff9800'
        },
        {
          name: '精整',
          color: '#55c6d4'
        },
        {
          name: '未定',
          color: '#f45549'
        },
        {
          name: '物流',
          color: '#9e480e'
        }
      ],
      // 使用与左侧相同的配置
      materialOccupOption: {
        legend: {
          data: [
            '炼钢',
            '热轧',
            '热酸',
            '轧机',
            '冷酸',
            '精整',
            '未定',
            '物流'
          ],
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
            containLabel: true
          }
        ],
        series: [
          {
            type: 'treemap',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            leafDepth: null,
            roam: false,
            breadcrumb: { show: false },
            nodeClick: false,
            data: null,
            visualMap: {
              show: false
            },
            upperLabel: {
              show: false
            },
            label: {
              show: true
            },
            itemStyle: {
              borderColor: '#fff',
              gapWidth: 2
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
                  show: false
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
        value: 'S30400'
      },
      moltenSteelOutputOption: {
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
          itemWidth: 22,
          itemHeight: 8,
          data: [
            { name: '304降级重量', icon: '' },
            { name: '304L降级重量', icon: '' },
            { name: '304合格率', icon: 'line' },
            { name: '304L合格率', icon: 'line' },
            { name: '总体合格率', icon: 'line' }
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
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              show: false
            },
            axisLabel: { interval: 0 },
            axisLine: { show: false }
          }
        ],
        series: null
      }
    }
  },
  mounted() {
    this.getFinishProductAll()
    this.getAodXbTimeByTimeDataSon()
  },
  methods: {
    getDefaultStartDate() {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)
      return this.formatDate(startDate)
    },
    getDefaultEndDate() {
      return this.formatDate(new Date())
    },
    formatDate(date) {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    },
    clickTabLeft() {
      this.tapButActLeft = true
      this.getAodXbTimeByTimeDataSon()
      setTimeout(() => {
        this.tapButActLeft = false
      }, 1000)
    },
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getFinishProductAll()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    async getFinishProductAll() {
      const res = await post(getDegradedMainDefectProcessDistribution, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        steelGrade: this.form.value
      })
      if (res.success && res.data.length > 0) {
        let steelmakingData = []
        let hotRollingData = []
        let hotAcidData = []
        let rollingMillData = []
        let coldAcidData = []
        let finishingData = []
        let undecidedData = []
        let logisticsData = []

        res.data.forEach(item => {
          switch (item['process']) {
            case '炼钢':
              steelmakingData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '热轧':
              hotRollingData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '热酸':
              hotAcidData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '轧机':
              rollingMillData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '冷酸':
              coldAcidData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '精整':
              finishingData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '未定':
              undecidedData.push({
                name: item.process,
                value: item.totalCount
              })
              break
            case '物流':
              logisticsData.push({
                name: item.process,
                value: item.totalCount
              })
              break
          }
        })

        // 构建与左侧相同的树结构
        let data = {
          name: 'root',
          children: [
            {
              name: '炼钢',
              itemStyle: {
                color: '#ffd000'
              },
              children: steelmakingData
            },
            {
              name: '热轧',
              itemStyle: {
                color: '#5db362'
              },
              children: hotRollingData
            },
            {
              name: '热酸',
              itemStyle: {
                color: '#264478'
              },
              children: hotAcidData
            },
            {
              name: '轧机',
              itemStyle: {
                color: '#a146b0'
              },
              children: rollingMillData
            },
            {
              name: '冷酸',
              itemStyle: {
                color: '#ff9800'
              },
              children: coldAcidData
            },
            {
              name: '精整',
              itemStyle: {
                color: '#55c6d4'
              },
              children: finishingData
            },
            {
              name: '未定',
              itemStyle: {
                color: '#f45549'
              },
              children: undecidedData
            },
            {
              name: '物流',
              itemStyle: {
                color: '#9e480e'
              },
              children: logisticsData
            }
          ]
        }
        this.materialOccupOption.series[0].data = [data]
      } else {
        this.materialOccupOption.series[0].data = []
      }
    },
    changeOptionValue(val) {
      // 选项改变时的处理
    },
    async getAodXbTimeByTimeDataSon() {
      const res = await post(getLzDowngradeWeightAndPassRate, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        this.aodXbTimeByTimeData = res.data

        let xData = []
        let smeltDurationData = []
        let xbDurationData = []
        let rate304Data = []
        let rate304LData = []
        let totalRateData = []
        this.aodXbTimeByTimeData.forEach(item => {
          xData.push(item.inStockTime ? item.inStockTime.slice(-2) : '')
          smeltDurationData.push(item.weight304)
          xbDurationData.push(item.weight304L)
          rate304Data.push(item.rate304)
          rate304LData.push(item.rate304L)
          totalRateData.push(item.totalRate)
        })
        this.moltenSteelOutputOption.xAxis[0].data = xData
        const rawData = [smeltDurationData, xbDurationData]
        const colors = ['#5db362', '#ff9800', '#55c6d4']
        const series = ['304降级重量', '304L降级重量'].map((name, sid) => {
          return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            itemStyle: {
              color: colors[sid]
            },
            label: {
              show: false,
              textStyle: {
                color: '#000'
              }
            },
            data: rawData[sid]
          }
        })
        series.push(
          {
            name: '304合格率',
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
            itemStyle: {
              color: '#55c6d4'
            },
            data: rate304Data
          },
          {
            name: '304L合格率',
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
            itemStyle: {
              color: '#a146b0'
            },
            data: rate304LData
          },
          {
            name: '总体合格率',
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
            itemStyle: {
              color: '#f45549'
            },
            data: totalRateData
          }
        )
        this.moltenSteelOutputOption.series = series
        // 动态设置dataZoom，默认显示最后12条数据
        const total = xData.length || 0
        const showCount = Math.min(12, total)
        const startPercent =
          total === 0 ? 0 : Math.max(0, ((total - showCount) / total) * 100)

        this.moltenSteelOutputOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0,
            start: startPercent,
            end: 100
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  margin-bottom: 16px;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
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
  margin-left: 4px;
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
