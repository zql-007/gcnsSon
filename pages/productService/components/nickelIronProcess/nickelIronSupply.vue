<template>
  <div>
    <el-row
      :gutter="16">
      <el-col :span="12">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">镍铁供应量</span></div>
            <div>
              <el-tag
                :class="[tapButActDayNum===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabDayNum"><span
                  class="spanStyle">日</span></el-tag>
              <el-tag
                :class="[tapButActMonthNum===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabMonthNum"><span
                  class="spanStyle">月</span></el-tag>
              <el-tag
                :class="[tapButActYearNum===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabYearNum"><span
                  class="spanStyle">年</span></el-tag>
            </div>
          </div>
          <div style="height: 350px">
            <el-row style="padding-top: 10px">
              <el-col :span="6">
                <div class="statItem">
                  <span class="statValue">{{ currentProdData.realWegt }}<span class="unitSpan">万吨</span></span>
                  <span class="statText">本日供应</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="statItem">
                  <span class="statValue">{{ currentProdData.rollWegt }}<span class="unitSpan">万吨</span></span>
                  <span class="statText">昨日供应</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="statItem">
                  <span class="statValue">{{ currentProdData.pickWegt }}<span class="unitSpan">%</span></span>
                  <span class="statText">本日镍点平均值</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="statItemEnd">
                  <span class="statValue">{{ currentProdData.jingWegt }}<span class="unitSpan">%</span></span>
                  <span class="statText">昨日镍点平均值</span>
                </div>
              </el-col>
            </el-row>
            <div style="height: 270px;padding-top: 10px">
              <nercar-echarts
                :legend="stopHoursOption.legend"
                :tooltip="stopHoursOption.tooltip"
                :grid="stopHoursOption.grid"
                :x-axis="stopHoursOption.xAxis"
                :y-axis="stopHoursOption.yAxis"
                :series="stopHoursOption.series"
                :data-zoom="stopHoursOption.dataZoom"
                :_height="'267px'"
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
                <span class="spanHead">各炉座镍铁供应量</span>
              </div>
              <div>
                <el-tag
                  :class="[tapButActDay===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabDay"><span
                    class="spanStyle">日</span></el-tag>
                <el-tag
                  :class="[tapButActMonth===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabMonth"><span
                    class="spanStyle">月</span></el-tag>
                <el-tag
                  :class="[tapButActYear===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabYear"><span
                    class="spanStyle">年</span></el-tag>
              </div>
            </div>
            <div style="height: 350px">
              <nercar-echarts
                :legend="prodstatOption.legend"
                :tooltip="prodstatOption.tooltip"
                :grid="prodstatOption.grid"
                :x-axis="prodstatOption.xAxis"
                :y-axis="prodstatOption.yAxis"
                :series="prodstatOption.series"
                :data-zoom="prodstatOption.dataZoom"
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
import { getFinishedProductStock } from '@/lib/productDataApply/hotRollingProcess'
import { date2ym, getLastOneYearMonth } from '@/utils/dateUtil'
import {
  getFinishingRollingInterval,
  getFurnaceDischargeInterval,
  getFurnaceDischargeIntervalBox,
  getProcessRhythmTime
} from '@/lib/productDataApply/hotRollingProcess'

export default {
  name: 'nickelIronSupply',
  components: { NercarEcharts },
  data() {
    return {
      tapButActDay: true,
      tapButActMonth: false,
      tapButActYear: false,
      tapButActDayNum: true,
      tapButActMonthNum: false,
      tapButActYearNum: false,
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      prodstatOption: {
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
          data: [
            {
              name: '月停机时长',
              icon: ''
            }, // 设置为线形
            { name: '月作业率', icon: 'line' }
          ],
          show: false,
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
            data: [
              '2#',
              '4#',
              '5#',
              '6#',
              '8#',
              '9#',
              '10#',
              '13#',
              '14#',
              '15#',
              '16#',
              '21#',
              '22#',
              '23#',
              '24#',
              '25#',
              '26#',
              '28#'
            ],
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
            name: '万吨',
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
            name: '',
            type: 'bar',
            barWidth: '70%',
            label: {
              show: true,
              position: 'top',
              color: '#333333'
            },
            data: [
              1.55,
              1.48,
              1.5,
              1.64,
              1.7,
              1.75,
              1.44,
              0.68,
              0.18,
              0.01,
              1.74,
              1.85,
              1.83,
              1.88,
              1.74,
              1.54,
              1.83,
              1.66
            ],
            itemStyle: {
              color: '#5DB362'
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
            end: 100 //100%
            // end: (13 / xData.length) * 100
          }
        ]
      },
      currentProdData: {
        realWegt: '0.74',
        pickWegt: '1.08',
        jingWegt: '11.77',
        rollWegt: '11.74',
        toRoll: null,
        toAcidPick: null,
        toFinish: null,
        toPackage: null
      },
      stopHoursOption: {
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
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
            name: '万吨',
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
            name: '供应量',
            type: 'line',
            yAxisIndex: 0,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            data: [1, 2, 3, 2, 1, 4, 5, 6, 7, 3, 2, 5, 4, 8, 4, 3, 8],
            itemStyle: {
              color: '#5DB362'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(93, 179, 98, 0.2)' // 阴影起始颜色（半透明）
                  },
                  {
                    offset: 1,
                    color: 'rgba(93, 179, 98, 0.2)' // 阴影结束颜色（接近透明）
                  }
                ]
              }
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
            end: 100 //100%
            // end: (13 / xData.length) * 100
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    clickTabDay() {
      this.tapButActDay = true
      this.tapButActMonth = false
      this.tapButActYear = false
    },
    clickTabMonth() {
      this.tapButActMonth = true
      this.tapButActDay = false
      this.tapButActYear = false
    },
    clickTabYear() {
      this.tapButActYear = true
      this.tapButActMonth = false
      this.tapButActDay = false
    },
    clickTabDayNum() {
      this.tapButActDayNum = true
      this.tapButActMonthNum = false
      this.tapButActYearNum = false
    },
    clickTabMonthNum() {
      this.tapButActMonthNum = true
      this.tapButActDayNum = false
      this.tapButActYearNum = false
    },
    clickTabYearNum() {
      this.tapButActYearNum = true
      this.tapButActMonthNum = false
      this.tapButActDayNum = false
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
  margin-left: 7px;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActive {
  background-color: #35a034;
  margin-left: 7px;
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
//产线总览-当日产量
.statItem {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  align-items: center; // 垂直居中
  text-align: center; // 水平居中
  .statValue {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    letter-spacing: 0px;
    .unitSpan {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0px;
      margin-left: 5px;
    }
  }
  .statText {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0px;
  }
}
.statItemEnd {
  display: flex;
  flex-direction: column;
  align-items: center; // 垂直居中
  text-align: center; // 水平居中
  .statValue {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    letter-spacing: 0px;
    .unitSpan {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0px;
      margin-left: 5px;
    }
  }
  .statText {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0px;
  }
}
</style>
