<!--
 * @Date: 2025-07-30 16:12:14
 * @LastEditTime: 2025-07-31 11:46:52
 * @FilePath: \iet-report-web\pages\productService\components\coldRollingProcess\coldOrder.vue
 * @Description:
-->
<template>
  <el-card
    class="contentBox CardTable"
    shadow="never">
    <div style="display: flex;justify-content: space-between">
      <div><span class="spanHead">订单信息</span></div>
      <div>
        <span class="datePickerLable">开始时间</span>
        <el-date-picker
          v-model="times.startDate"
          type="month"
          value-format="yyyy-MM"
          style="width: 140px;margin-right: 16px"
          placeholder="选择日期">
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
          @click="onSearch"><span
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
            <div><span class="spanHeadTwo">订单厚度统计</span></div>
            <div style="height: 350px;padding-top: 2px">
              <nercar-echarts
                ref="orderThickRef"
                :legend="legend"
                :tooltip="tooltip"
                :grid="grid"
                :y-axis="yAxis"
                :x-axis="avgRollThickOption.xAxis"
                :series="avgRollThickOption.series"
                :data-zoom="avgRollThickOption.dataZoom"
                :_height="'340px'"
                @chart-click-data="handleClick"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          class="CardTable">
          <div >
            <div style="display: flex;justify-content: space-between">
              <span class="spanHeadTwo">月订单兑现详情</span>
              <div>
                <el-tag
                  :class="[flagOfEle ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabEle(1)"><span class="spanStyleSwitch">钢种统计</span></el-tag>
                <el-tag
                  :class="[flagOfEle ?'tagStyleSwitch':'tagStyleActiveSwitch']"
                  type="success"
                  @click="clickTabEle(0)"><span class="spanStyleSwitch">厚度统计</span></el-tag>
              </div>
            </div>
            <div style="height: 350px;padding-top: 2px">
              <nercar-echarts
                ref="orderDuiRef"
                :legend="legend"
                :tooltip="tooltip2"
                :grid="grid"
                :y-axis="yAxis2"
                :x-axis="eleConsumpSteelOption.xAxis"
                :series="eleConsumpSteelOption.series"
                :data-zoom="eleConsumpSteelOption.dataZoom"
                :_height="'340px'"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  getLzOrderThick,
  getLzOrderDui
} from '@/lib/productDataApply/coldRollingProcess'
import NercarEcharts from '@/components/NercarEcharts.vue'
import { post } from '@/lib/Util'
import moment from 'moment'
export default {
  components: { NercarEcharts },
  data() {
    return {
      times: {
        startDate: moment()
          .subtract(11, 'months')
          .format('YYYY-MM'),
        endDate: moment(new Date()).format('YYYY-MM')
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        // triggerOn: 'none', // 禁用鼠标触发
        showContent: true, // 强制显示内容
        formatter: function(params) {
          let result = params[0].name + '<br/>'
          params.forEach(item => {
            // 判断系列名称，设置不同单位
            const unit = 'mm'
            result += `${item.marker}${item.seriesName}: <strong>${
              item.value
            }${unit}</strong><br/>`
          })
          return result
        }
      },
      tooltip2: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        formatter: function(params) {
          let result = params[0].name + '<br/>'
          params.forEach(item => {
            // 判断系列名称，设置不同单位
            const unit = 't'
            result += `${item.marker}${item.seriesName}: <strong>${
              item.value
            }${unit}</strong><br/>`
          })
          return result
        }
      },
      legend: {
        itemWidth: 10,
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
      yAxis: [
        {
          type: 'value',
          name: '单位：mm',
          axisLine: { show: false } //只隐藏 Y 轴线
        }
      ],
      yAxis2: [
        {
          type: 'value',
          name: '单位：t',
          axisLine: { show: false } //只隐藏 Y 轴线
        }
      ],
      avgRollThickOption: {
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '订单测算厚度',
            type: 'bar',
            data: [1, 2, 3, 4],
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '订单轧制厚度',
            type: 'bar',
            data: [1, 2, 3, 4],
            itemStyle: {
              color: '#5DB362'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0
          }
        ]
      },
      eleConsumpSteelOption: {
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            data: [1, 2, 3, 4],
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '订单入库量',
            type: 'bar',
            data: [1, 2, 3, 4],
            itemStyle: {
              color: '#5DB362'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: 0
          }
        ]
      },
      flagOfEle: 0,
      tapButActCurrent: false,
      selectMonth: '',
      steel: {
        s301: '301',
        s304: '304',
        s304l: '304l',
        s316l: '316l',
        s321: '321'
      },
      thick: {
        thick3: 'h≤0.3',
        thick36: '0.3<h≤0.6',
        thick69: '0.6<h≤0.9',
        thick912: '0.9<h≤1.2',
        thick1215: '1.2<h≤1.5',
        thick1518: '1.5<h≤1.8',
        thick1821: '1.8<h≤2.1',
        thick2124: '2.1<h≤2.4',
        thick24: '2.4<h'
      }
    }
  },
  mounted() {
    this.getOrderThick()
  },
  methods: {
    onSearch() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      this.getOrderThick()
    },
    clickTabEle(params) {
      this.flagOfEle = params
      this.getOrderDui()
    },
    async getOrderThick() {
      let res = await post(getLzOrderThick, this.times)
      if (res.data) {
        let { rollThick, testThick, time } = res.data

        this.avgRollThickOption.xAxis[0].data = time
        this.avgRollThickOption.series[0].data = testThick
        this.avgRollThickOption.series[1].data = rollThick
        this.$refs.orderThickRef.reInitChart()

        this.selectMonth = time[time.length - 1]
        this.getOrderDui()

        //x 轴默认显示阴影类型的坐标轴指示器
        this.$nextTick(() => {
          const chart = this.$refs.orderThickRef.getEchartInstance() // 假设组件有获取图表实例的方法
          if (chart) {
            // 获取x轴数据长度，计算最后一个数据的索引
            const option = chart.getOption()
            // 假设x轴数据在第一个xAxis中
            const lastDataIndex = option.xAxis[0].data.length - 1

            chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: lastDataIndex
            })
          }
        })
      }
    },
    // 月订单兑现详情
    async getOrderDui() {
      let res = await post(getLzOrderDui, { accDate: this.selectMonth })
      if (res.data) {
        let { bzList, jingList } = res.data
        if (this.flagOfEle) {
          // 钢种统计
          let { x, y } = this.filterList(bzList, this.steel)
          let { y: jing } = this.filterList(jingList, this.steel)
          this.eleConsumpSteelOption.xAxis[0].data = x
          this.eleConsumpSteelOption.series[0].data = jing
          this.eleConsumpSteelOption.series[1].data = y
        } else {
          // 厚度统计
          let { x, y } = this.filterList(bzList, this.thick)
          let { y: jing } = this.filterList(jingList, this.thick)
          this.eleConsumpSteelOption.xAxis[0].data = x
          this.eleConsumpSteelOption.series[0].data = jing
          this.eleConsumpSteelOption.series[1].data = y
        }
        this.$refs.orderDuiRef.reInitChart()
      }
    },
    // 格式化数据结构
    filterList([resMap], vo) {
      let x = []
      let y = []
      for (let key in vo) {
        x.push(vo[key])
        y.push(resMap[key])
      }
      return { x, y }
    },
    handleClick(params) {
      let { data } = params
      if (data) {
        this.selectMonth = data.name
        this.getOrderDui()
      }
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  margin-top: 16px;
}

.spanHead {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 28px;
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
//进度条
.progress-bar-container {
  width: 110px; /* 可按需调整进度条容器宽度 */
  height: 18px; /* 可按需调整进度条容器高度 */
  background-color: #e0ebe1; /* 浅灰色背景 */
  border-radius: 5px; /* 圆角 */
  //overflow: hidden; /* 隐藏超出部分 */
  margin-left: 1px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #c8e6c9, #4caf50); /* 绿色进度条颜色 */
  display: flex;
  align-items: center;
  justify-content: right;
  color: black;
  border-radius: 5px;
  font-size: 20px; /* 可按需调整文字大小 */
  transition: width 0.5s ease; /* 过渡效果，让进度条变化更平滑 */
}

.progress-value {
  text-align: center;
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  //进度条内文字按最外层父元素居中展示
  position: absolute;
  left: 32%;
  top: 50%;
  transform: translateY(-50%);
}
//--进度条后文字
.spanHeadMin {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  margin-left: 8px;
  text-align: center;
}
//切换按钮
.tagStyleSwitch {
  background-color: #ebf6ec;
  cursor: pointer;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
</style>
