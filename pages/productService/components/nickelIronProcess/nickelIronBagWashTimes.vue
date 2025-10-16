<template>
  <div>
    <el-row style="margin-top: 16px">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div>
              <span class="spanHead">产线停时统计与作业率</span>
              <el-tooltip
                class="item"
                effect="dark"
                popper-class="atooltip"
                content="根据AOD冶炼记录中的唯一兑铁号进行数据统计。"
                placement="top">
                <img
                  :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                  style="width: 16px;height: 16px;margin-left: 8px"
                  alt="">
              </el-tooltip>
            </div>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期"
                @change="dateChange">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
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
          <el-row>
            <el-col :span="24">
              <div style="height: 350px;padding-top: 20px">
                <nercar-echarts
                  :legend="gradeOneRateOption.legend"
                  :tooltip="gradeOneRateOption.tooltip"
                  :grid="gradeOneRateOption.grid"
                  :x-axis="gradeOneRateOption.xAxis"
                  :y-axis="gradeOneRateOption.yAxis"
                  :series="gradeOneRateOption.series"
                  :data-zoom="gradeOneRateOption.dataZoom"
                  :_height="'330px'"
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
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'

export default {
  name: 'nickelIronBagWashTimes',
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      gradeOneRateOption: {
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
          orient: 'horizontal', // 水平排列
          bottom: '1%', // 放置在图表底部
          left: 'center', // 水平居中
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '正常炉次', icon: '' },
            { name: '洗包次数', icon: '' },
            { name: '占比', icon: 'line' } // 设置为线形
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '13%',
            top: '2%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32,
              33,
              34,
              35,
              36,
              37,
              38
            ],
            axisPointer: {
              type: 'shadow'
            },
            // axisLabel: { interval: 0 }, //横坐标全部展示
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
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
          },
          {
            type: 'value',
            name: '',
            // interval: 5,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '正常炉次',
            type: 'bar',
            stack: 'total',
            barWidth: '70%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#66cc6a'
            },
            label: {
              show: true,
              position: 'inside',
              color: '#333333'
            },
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              12,
              3,
              4,
              5,
              6,
              7,
              10,
              6,
              7,
              8,
              12,
              3,
              4,
              5,
              8,
              12,
              3,
              4,
              5,
              6,
              7,
              10,
              6,
              6,
              7,
              8,
              12,
              3,
              4,
              5,
              8,
              12
            ]
          },
          {
            name: '洗包次数',
            type: 'bar',
            stack: 'total',
            barWidth: '70%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#ffda35'
            },
            label: {
              show: true,
              position: 'inside',
              color: '#333333'
            },
            data: [
              5,
              6,
              11,
              3,
              4,
              2,
              5,
              6,
              11,
              14,
              3,
              8,
              11,
              17,
              8,
              19.2,
              5,
              6,
              11,
              14,
              3,
              8,
              1,
              14,
              3,
              8,
              11,
              17,
              8,
              19.2,
              5,
              6,
              9.2,
              5,
              6,
              11,
              14,
              3
            ]
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            data: [
              3,
              4,
              5,
              8,
              10,
              11,
              15,
              17,
              9,
              5,
              6,
              1,
              8,
              9,
              5,
              16,
              11,
              7,
              9,
              5,
              6,
              1,
              8,
              9,
              5,
              6,
              1,
              8,
              9,
              5,
              16,
              11,
              1,
              8,
              9,
              5,
              6,
              1,
              8,
              9,
              5,
              16
            ],
            itemStyle: {
              color: '#3391ff'
            }
          }
        ],
        dataZoom: []
      },
      tapButActCurrent: false
    }
  },
  methods: {
    clickTabCurrent() {
      this.tapButActCurrent = true

      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
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
