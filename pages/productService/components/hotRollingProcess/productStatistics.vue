<template>
  <div class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <span class="spanHead">生产统计</span>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="startDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择月份">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="endDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px"
                placeholder="选择月份">
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
                  <div><span
                    class="spanHeadTwo">投料与产出</span></div>
                </div>
                <div>
                  <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                    <ul>
                      <li
                        v-for="(item, index) in codeLegendStyleList"
                        :key="index + '007'">
                        <div
                          :style="{ backgroundColor: item.color }"
                          class="codeDivStyle">
                        </div>
                        <span class="liDivSpan">{{ item.name }}</span>
                      </li>
                    </ul>
                  </div>
                  <div style="height: 320px">
                    <nercar-echarts
                      :tooltip="singleInputOption.tooltip"
                      :legend="singleInputOption.legend"
                      :grid="singleInputOption.grid"
                      :x-axis="singleInputOption.xAxis"
                      :y-axis="singleInputOption.yAxis"
                      :series="singleInputOption.series"
                      :_height="'320px'"
                      @chart-click-data="handlEchartClick"
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
                      <span class="spanHeadTwo">产品成材率</span>
                    </div>
                  </div>
                  <div style="height: 350px;">
                    <nercar-echarts
                      ref="chemicOfRef"
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
                </div>
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
                    <span class="spanHeadTwo">轧制平均尺寸</span>
                  </div>
                  <div style="height: 350px;">
                    <nercar-echarts
                      ref="rollSizeOfRef"
                      :legend="rollSizeOption.legend"
                      :tooltip="rollSizeOption.tooltip"
                      :grid="rollSizeOption.grid"
                      :x-axis="rollSizeOption.xAxis"
                      :y-axis="rollSizeOption.yAxis"
                      :series="rollSizeOption.series"
                      :data-zoom="rollSizeOption.dataZoom"
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
                  <div><span class="spanHeadTwo">生产异常统计</span></div>
                </div>
                <div style="height: 350px;">
                  <nercar-echarts
                    :legend="rollRateOption.legend"
                    :tooltip="rollRateOption.tooltip"
                    :grid="rollRateOption.grid"
                    :x-axis="rollRateOption.xAxis"
                    :y-axis="rollRateOption.yAxis"
                    :series="rollRateOption.series"
                    :data-zoom="rollRateOption.dataZoom"
                    :_height="'350px'"
                  />
                </div>
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
                      <span class="spanHeadTwo">生产订单跟踪</span>
                    </div>
                  </div>
                  <div style="height: 350px;">
                    <nercar-echarts
                      ref="outputStatRef"
                      :legend="outputStatOption.legend"
                      :tooltip="outputStatOption.tooltip"
                      :grid="outputStatOption.grid"
                      :x-axis="outputStatOption.xAxis"
                      :y-axis="outputStatOption.yAxis"
                      :series="outputStatOption.series"
                      :data-zoom="outputStatOption.dataZoom"
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
                      <span class="spanHeadTwo">每日计划兑现率</span>
                    </div>
                  </div>
                  <div style="height: 350px;">
                    <nercar-echarts
                      :tooltip="dayComOptionTwo.tooltip"
                      :legend="dayComOptionTwo.legend"
                      :grid="dayComOptionTwo.grid"
                      :x-axis="dayComOptionTwo.xAxis"
                      :y-axis="dayComOptionTwo.yAxis"
                      :series="dayComOptionTwo.series"
                      :data-zoom="dayComOptionTwo.dataZoom"
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
import {
  getPreviousDate,
  getPreviousMonthDate,
  date2ym
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import { getLgAodHotByTime } from '@/lib/productDataApply/steelmakingProcess'
import {
  getCompletionRate,
  getFeedAndOutput,
  getPlanCompletionRate,
  getProductionException,
  getRollingAvgSize,
  getYieldRate
} from '@/lib/productDataApply/hotRollingProcess'
import moment from 'moment'

export default {
  name: 'productStatistics',
  components: { echartsScrollBar2, NercarEcharts },
  data() {
    return {
      aodHotByTimeDataSon: null,
      startDate: moment()
        .subtract(11, 'months')
        .format('YYYY-MM'),
      endDate: moment(new Date()).format('YYYY-MM'),
      tapButActCurrent: false,
      codeLegendStyleList: [
        {
          name: '300系不锈钢',
          color: '#5db362'
        },
        {
          name: '普碳钢',
          color: '#ff9800'
        },
        {
          name: '中板',
          color: '#55c6d4'
        }
      ],
      singleInputXData: [],
      singleInputOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)' // 设置柱状图背景阴影颜色
            }
          },
          // 添加 formatter 函数处理 tooltip 显示内容
          formatter: function(params) {
            let tooltipStr = ''
            for (let i = 0; i < 3; i++) {
              if (i === 0) {
                // 处理 X 轴标签，去除 '投料成品<br>'
                let xLabel = params[0].data.accDate
                tooltipStr += `<div style="font-size: 14px;">${xLabel}</div>`
              }
              tooltipStr += `<div style="color: ${
                params[i].color
              }; margin-top: 4px;">`
              tooltipStr += `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${
                params[i].color
              }; margin-right: 4px;"></span>`
              tooltipStr += `${params[i].seriesName}: ${params[i].value}`
              tooltipStr += `</div>`

              tooltipStr += `<div style="color: ${
                params[i + 3].color
              }; margin-top: 4px;">`
              tooltipStr += `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${
                params[i + 3].color
              }; margin-right: 4px;"></span>`
              tooltipStr += `${params[i + 3].seriesName}: ${
                params[i + 3].value
              }`
              tooltipStr += `</div>`
            }
            // params.forEach((param, index) => {
            //   if (index === 0) {
            //     // 处理 X 轴标签，去除 '投料成品<br>'
            //     let xLabel = params[0].data.accDate
            //     tooltipStr += `<div style="font-size: 14px;">${xLabel}</div>`
            //   }
            //   tooltipStr += `<div style="color: ${
            //     param.color
            //   }; margin-top: 4px;">`
            //   tooltipStr += `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${
            //     param.color
            //   }; margin-right: 4px;"></span>`
            //   tooltipStr += `${param.seriesName}: ${param.value}`
            //   tooltipStr += `</div>`
            // })
            return tooltipStr
          }
        },
        legend: {
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          selectedMode: false,
          show: false
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
            name: '单位：wt',
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
              length: 40, // 把刻度线长度设为10像素
              show: true // 隐藏Y轴的刻度线
            },
            axisLabel: {
              interval: 0
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
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
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      rollRateOption: {
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
          top: '1%',
          data: [
            { name: '回炉', icon: 'line' }, // 设置为线形
            { name: '降级', icon: 'line' },
            { name: '废钢', icon: 'line' },
            { name: '超工艺', icon: 'line' }
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
            data: [20, 21, 22, 23, 24, 25, 26],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            name: '单位：t',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '回炉',
            type: 'line',
            data: [],
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '降级',
            type: 'line',
            data: [],
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
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
            }
          },
          {
            name: '废钢',
            type: 'line',
            data: [],
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '超工艺',
            type: 'line',
            data: [],
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#ffda35'
            }
          }
        ],
        dataZoom: []
      },
      rollSizeOption: {
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
          top: '1%',
          data: [
            { name: '平均宽度', icon: 'line' }, // 设置为线形
            { name: '平均厚度', icon: 'line' }
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
            data: [20, 21, 22, 23, 24, 25, 26],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            name: '单位：mm',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '平均宽度',
            type: 'line',
            data: [20, 21, 22, 23, 24, 25, 26],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '平均厚度',
            type: 'line',
            yAxisIndex: 1,
            data: [40, 51, 62, 73, 44, 85, 36],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#ff9800'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      chemicComOptionTwo: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          },
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#FF9800' : '#5DB362'
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
            type: 'value',
            min: null,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%'
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
            name: '成材率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            // label: {
            //   show: true, // 显示转折点数值
            //   position: 'top', // 数值显示在转折点上方
            //   color: 'black',
            //   formatter: function(params) {
            //     return params.value
            //   }
            // },
            itemStyle: {
              color: '#5db362'
            },
            data: []
          }
        ],
        dataZoom: []
      },
      dayComOptionTwo: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)'
            }
          },
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#FF9800' : '#5DB362'
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
            type: 'value',
            min: null,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%'
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
            name: '计划兑现率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              // show: true, // 显示转折点数值
              // position: 'top', // 数值显示在转折点上方
              // color: 'black',
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
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [
              '1号',
              '2号',
              '3号',
              '4号',
              '5号',
              '1号',
              '2号',
              '3号',
              '4号',
              '5号'
            ],
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
            // symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            label: {
              show: true, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value
              }
            },
            itemStyle: {
              color: '#5db362'
            },
            data: [20, 14, 15, 18, 21, 30, 20, 14, 15, 18, 21, 30]
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
          },
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color =
                params[i].seriesName === '订单量' ? '#5DB362' : '#FF9800'
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
          }
        },
        legend: {
          data: ['订单量', '产出量', '完成率'],
          itemWidth: 10, // 设置图例标记的宽度
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
            name: '单位：t',
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#5DB362'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '产出量',
            type: 'bar',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '完成率',
            type: 'line',
            data: [],
            barWidth: 13,
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%',
            yAxisIndex: 1
          }
        ],
        dataZoom: []
      }
    }
  },
  mounted() {
    this.getFeedAndOutputData() //投料产出
  },
  methods: {
    clickTabCurrent() {
      this.getFeedAndOutputData()
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    handlEchartClick(item) {
      console.log(item)
      let index = item.data.dataIndex
      if (!item && !time) {
        return
      }
      this.getData(this.singleInputXData[index])
    },
    getData(time) {
      const currentDate = date2ym(new Date())

      let startTime = moment(time, 'YYYY-MM')
        .startOf('month')
        .format('YYYY-MM-DD')
      let endTime = moment(time, 'YYYY-MM')
        .endOf('month')
        .format('YYYY-MM-DD')

      let endTimeCurrent = moment(time, 'YYYY-MM')
        .date(moment().date())
        .format('YYYY-MM-DD')
      if (time !== currentDate) {
        this.getProductionExceptionData(startTime, endTime)
      } else {
        this.getProductionExceptionData(startTime, endTimeCurrent)
      }

      this.getRollingAvgSizeData(startTime, endTime)
      this.getYieldRateData(startTime, endTime)
      this.getCompletionRateData(startTime, endTime)
      this.getPlanCompletionRateData(startTime, endTime)
    },
    async getProcRhythmTime() {
      const res = await post(getLgAodHotByTime, {
        startDate: this.startDate,
        endDate: this.endDate
      })
      if (res.success) {
        this.aodHotByTimeDataSon = res.data
        let xData = []
        let niWgtList = []
        let crWgtList = []
        let midWgtList = []
        this.aodHotByTimeDataSon.forEach(item => {
          xData.push(item.steelGrade)
          niWgtList.push(Number(item.niWgt))
          crWgtList.push(Number(item.crWgt))
          midWgtList.push(Number(item.midWgt))
        })
        let rawData = [niWgtList, crWgtList, midWgtList]
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
                formatter: `${rawData[i][j].toFixed(2)}`
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
        this.singleLiquorOption.series = series
      }
    },
    //-----生产异常统计
    async getProductionExceptionData(startDate, endDate) {
      const res = await post(getProductionException, {
        startDate,
        endDate
      })
      if (res.success) {
        let xData = []
        let hlData = []
        let jjData = []
        let fgData = []
        let cgyData = []
        res.data['回炉'].forEach(item => {
          xData.push(item.accDate)
          hlData.push(item.weight)
        })
        res.data['降级'].forEach(item => {
          jjData.push(item.weight)
        })
        res.data['废钢'].forEach(item => {
          fgData.push(item.weight)
        })
        res.data['超工艺'].forEach(item => {
          cgyData.push(item.weight)
        })
        this.rollRateOption.xAxis[0].data = xData
        this.rollRateOption.series[0].data = hlData
        this.rollRateOption.series[1].data = jjData
        this.rollRateOption.series[2].data = fgData
        this.rollRateOption.series[3].data = cgyData
        this.rollRateOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 31) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //------投料与产出
    async getFeedAndOutputData() {
      const res = await post(getFeedAndOutput, {
        startDate: this.startDate,
        endDate: this.endDate
      })
      if (res.success) {
        // 按 accDate 升序排序（时间顺序）
        const sortedData = res.data.sort((a, b) => {
          const dateA = new Date(a.accDate + '-01') // 补全为月份第一天
          const dateB = new Date(b.accDate + '-01')
          return dateA - dateB
        })

        let xData = []
        let threeInputList = []
        let threeOutputList = []
        let carbonInputList = []
        let carbonOutputList = []
        let plateInputList = []
        let plateOutputList = []
        sortedData.forEach(item => {
          xData.push(item.accDate)
          threeInputList.push({
            value: Number(item.threeInput),
            accDate: item.accDate
          })
          threeOutputList.push(Number(item.threeOutput))
          carbonInputList.push(Number(item.carbonInput))
          carbonOutputList.push(Number(item.carbonOutput))
          plateInputList.push(Number(item.plateInput))
          plateOutputList.push(Number(item.plateOutput))
        })
        let xMonthData = []
        xData.forEach(item => {
          xMonthData.push(this.getMonthString(item))
        })
        this.singleInputXData = [...xData]
        //投料
        let rawDataIn = [threeInputList, carbonInputList, plateInputList]
        const colors = ['#5db362', '#ff9800', '#55c6d4']
        const series = [
          '300系不锈钢（投料）',
          '普碳钢（投料）',
          '中板（投料）'
        ].map((name, sid) => {
          return {
            name,
            type: 'bar',
            stack: 'input',
            // barWidth: '60%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: colors[sid]
            },
            label: {
              show: false,
              position: 'inside',
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: rawDataIn[sid]
          }
        })
        this.singleInputOption.xAxis[0].data = xMonthData
        this.singleInputOption.xAxis[0].axisLabel = {
          // 使用 formatter 函数自定义标签显示
          formatter: function(value) {
            // 分割标签文本，按<br>分割
            const parts = value.split('<br>')
            if (parts.length === 2) {
              return [
                '{top|' + parts[0] + '}', // 第一行文本样式
                '{bottom|' + parts[1] + '}' // 第二行文本样式
              ].join('\n\n') // 使用\n实现换行
            }
            return value
          },
          // 配置富文本样式
          rich: {
            top: {
              fontSize: 8, // 减小"投料 成品"的字体大小
              lineHeight: 10
            },
            bottom: {
              fontSize: 8,
              lineHeight: 10
            }
          }
        }
        this.singleInputOption.series = series

        //产出
        let rawDataOut = [threeOutputList, carbonOutputList, plateOutputList]
        const colorsOut = ['#5db362', '#ff9800', '#55c6d4']
        const seriesOut = [
          '300系不锈钢（产出）',
          '普碳钢（产出）',
          '中板（产出）'
        ].map((name, sid) => {
          return {
            name,
            type: 'bar',
            stack: 'output',
            // barWidth: '60%',
            //自定义每节柱状图颜色
            itemStyle: {
              color: colorsOut[sid]
            },
            label: {
              show: false,
              position: 'inside',
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: rawDataOut[sid]
          }
        })
        seriesOut.forEach(item => {
          this.singleInputOption.series.push(item)
        })
        this.getData(xData[xData.length - 1])
      }
    },
    //X轴展示处理
    getMonthString(dateStr) {
      const month = dateStr.split('-')[1]
      return month.startsWith('0')
        ? '投料 成品<br>' + month[1] + '月'
        : '投料 成品<br>' + month + '月'
    },
    //------轧制平均尺寸
    async getRollingAvgSizeData(startDate, endDate) {
      const res = await post(getRollingAvgSize, {
        startDate,
        endDate
      })
      if (res.success) {
        //使用数组的 sort 方法按时间升序排列
        res.data.sort((a, b) => {
          return new Date(a.accDate) - new Date(b.accDate)
        })

        let xData = []
        let avgWidthList = []
        let avgThicknessList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          avgWidthList.push(item.avgWidth)
          avgThicknessList.push(item.avgThickness)
        })
        this.rollSizeOption.xAxis[0].data = xData
        this.rollSizeOption.series[0].data = avgWidthList
        this.rollSizeOption.series[1].data = avgThicknessList
        this.rollSizeOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]

        this.$refs.rollSizeOfRef.reInitChart()
      }
    },
    //------产品成材率
    async getYieldRateData(startDate, endDate) {
      const res = await post(getYieldRate, {
        startDate,
        endDate
      })
      if (res.success) {
        let xData = []
        let yieldRateList = []
        //使用数组的 sort 方法按时间升序排列
        res.data.sort((a, b) => {
          return new Date(a.accDate) - new Date(b.accDate)
        })
        res.data.forEach(item => {
          xData.push(item.accDate)
          yieldRateList.push(item.yieldRate)
        })
        this.chemicComOptionTwo.xAxis[0].data = xData
        this.chemicComOptionTwo.series[0].data = yieldRateList
        this.chemicComOptionTwo.yAxis[0].min =
          Number(Math.min(...yieldRateList)) - 1
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
        this.$refs.chemicOfRef.reInitChart()
      }
    },
    //------生产订单跟踪
    async getCompletionRateData(startDate, endDate) {
      const res = await post(getCompletionRate, {
        startDate,
        endDate
      })
      if (res.success) {
        console.log(res.data)
        let xData = []
        let orderCompletionList = []
        let specCompletionRateList = []
        let rate = []
        // res.data['订单完成率'].forEach(item => {
        //   xData.push(item.accDate)
        //   orderCompletionList.push(item.orderCompletionRate)
        // })
        // res.data['规格完成率'].forEach(item => {
        //   specCompletionRateList.push(item.specCompletionRate)
        // })
        // xData.push('总计')
        // orderCompletionList.push(res.data['总'][0].orderCompletionRate)
        // specCompletionRateList.push(res.data['总'][0].specCompletionRate)
        res.data.forEach(item => {
          xData.push(item.accDate)
          orderCompletionList.push(item.totalOrderWeight)
          specCompletionRateList.push(item.totalOutputWeight)
          rate.push(item.orderCompletionRate)
        })
        this.outputStatOption.xAxis[0].data = xData
        this.outputStatOption.series[0].data = orderCompletionList
        this.outputStatOption.series[1].data = specCompletionRateList
        this.outputStatOption.series[2].data = rate
        this.outputStatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 11) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]

        this.$refs.outputStatRef.reInitChart()
      }
    },
    //------每日计划兑现率
    async getPlanCompletionRateData(startDate, endDate) {
      const res = await post(getPlanCompletionRate, {
        startDate,
        endDate
      })
      if (res.success) {
        let xData = []
        let planCompletionRateList = []
        res.data.forEach(item => {
          xData.push(item.plannedDate)
          planCompletionRateList.push(item.planCompletionRate)
        })
        this.dayComOptionTwo.xAxis[0].data = xData
        this.dayComOptionTwo.series[0].data = planCompletionRateList
        this.dayComOptionTwo.yAxis[0].min =
          Number(Math.min(...planCompletionRateList)) - 1
        this.dayComOptionTwo.dataZoom = [
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
//legend样式---投料与产出
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
.codeDivStyle {
  display: inline-block;
  content: '';
  width: 10px;
  height: 10px;
  margin-right: 8px;
}
.liDivSpan {
  font-family: Source Han Sans CN;
  font-size: 13px;
}
</style>
