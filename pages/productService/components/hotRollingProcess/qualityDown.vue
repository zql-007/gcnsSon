<template>
  <div class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <span class="spanHead">质量降级</span>
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
                @click="clickTabCurrent"><span
                  class="spanStyle">查询</span></el-tag>
            </div>
          </div>
          <!--          产品降级与一次合格率-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">产品降级与一次合格率</span></div>
                    </div>
                    <div>
                      <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                        <ul>
                          <li
                            v-for="(item, index) in finishLegendStyleList"
                            :key="index + '007'"
                            :class="{ 'legend-disabled':!seriesVisibility[item.name] }"
                            class="legend-item"
                            @click="toggleSeries(item.name)">
                            <div
                              :style="{
                                background: item.color,
                                borderColor: item.color
                              }"
                              :class="[item.color === '#ff9800' ? 'liDivStyle' : 'lineStyle']"
                              class="legend-icon">
                            </div>
                            <span
                              class="legend-label">{{ item.name }}</span>
                          </li>
                        </ul>
                      </div>
                      <div style="height: 320px;">
                        <nercar-echarts
                          ref="chartOne"
                          :legend="prodstatOption.legend"
                          :tooltip="prodstatOption.tooltip"
                          :grid="prodstatOption.grid"
                          :x-axis="prodstatOption.xAxis"
                          :y-axis="prodstatOption.yAxis"
                          :series="prodstatOption.series"
                          :data-zoom="prodstatOption.dataZoom"
                          :_height="'320px'"
                          @chart-click-data="clickChartYieldMonth"
                        />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <div><span
                        class="spanHeadTwo"
                        style="color: #ffffff">.</span></div>
                    </div>
                    <div>
                      <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                        <ul>
                          <li
                            v-for="(item, index) in dayLegendStyleList"
                            :key="index + '007'"
                            :class="{ 'legend-disabled':!seriesDayVisibility[item.name] }"
                            class="legend-item"
                            @click="toggleSeriesDay(item.name)">
                            <div
                              :style="{
                                background: item.color,
                                borderColor: item.color
                              }"
                              :class="[item.color === '#ff9800' ? 'liDivStyle' : 'lineStyle']"
                              class="legend-icon">
                            </div>
                            <span
                              class="legend-label">{{ item.name }}</span>
                          </li>
                        </ul>
                      </div>
                      <div style="height: 320px;">
                        <nercar-echarts
                          ref="chartOne"
                          :legend="prodDayOption.legend"
                          :tooltip="prodDayOption.tooltip"
                          :grid="prodDayOption.grid"
                          :x-axis="prodDayOption.xAxis"
                          :y-axis="prodDayOption.yAxis"
                          :series="prodDayOption.series"
                          :data-zoom="prodDayOption.dataZoom"
                          :_height="'320px'"
                        />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <!--          产品缺陷降级卷数1-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <!-- <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">产品缺陷降级卷数/月</span></div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        :legend="powerConsumptStatisticsOption.legend"
                        :tooltip="powerConsumptStatisticsOption.tooltip"
                        :grid="powerConsumptStatisticsOption.grid"
                        :x-axis="powerConsumptStatisticsOption.xAxis"
                        :y-axis="powerConsumptStatisticsOption.yAxis"
                        :series="powerConsumptStatisticsOption.series"
                        :data-zoom="powerConsumptStatisticsOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickProductDownEhart"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;align-items: center"><span
                        class="spanHeadTwo">产品缺陷降级代码分布</span></div>
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
                      <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                        <ul>
                          <li
                            v-for="(item, index) in codeLegendStyleTwoList"
                            :key="index + '007'">
                            <div
                              :style="{ backgroundColor: item.color }"
                              class="codeDivStyle">
                            </div>
                            <span class="liDivSpan">{{ item.name }}</span>
                          </li>
                        </ul>
                      </div>
                      <div style="height: 310px;">
                        <nercar-echarts
                          :legend="materialOccupOption.legend"
                          :grid="materialOccupOption.grid"
                          :series="materialOccupOption.series"
                          :_height="'310px'"
                        />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card> -->
              <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">产品缺陷降级卷数/月</span></div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        :legend="powerConsumptStatisticsOption.legend"
                        :tooltip="powerConsumptStatisticsOption.tooltip"
                        :grid="powerConsumptStatisticsOption.grid"
                        :x-axis="powerConsumptStatisticsOption.xAxis"
                        :y-axis="powerConsumptStatisticsOption.yAxis"
                        :series="powerConsumptStatisticsOption.series"
                        :data-zoom="powerConsumptStatisticsOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickProductDownEhart"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;align-items: center"><span
                        class="spanHeadTwo">产品缺陷降级代码分布</span></div>
                    </div>
                    <div>
                      <div
                        :style="{height: flag ? 'auto' : '47px'}"
                        class="monthProdDown">
                        <i
                          v-show="materialOccupOptionTest.series[0].data.length > 24"
                          :class="[flag ? 'el-icon-caret-top' : 'el-icon-caret-bottom', 'monthProdDown-btn']"
                          @click="handleShowLengend"></i>
                        <div
                          v-for="(item, index) in materialOccupOptionTest.series[0].data"
                          :key="index + 'a'"
                          style="margin-right: 4px; width: 50px">
                          <div
                            :style="{ backgroundColor: item.itemStyle.color }"
                            class="codeDivStyle">
                          </div>
                          <span class="liDivSpan">{{ item.name }}</span>
                        </div>
                      </div>
                      <div style="height: 300px;">
                        <nercar-echarts
                          :grid="materialOccupOptionTest.grid"
                          :series="materialOccupOptionTest.series"
                          :_height="'300px'"
                        />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <!--          产品缺陷降级卷数2-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">产品缺陷降级卷数/日</span></div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        :legend="twoConsumptStatisticsOption.legend"
                        :tooltip="twoConsumptStatisticsOption.tooltip"
                        :grid="twoConsumptStatisticsOption.grid"
                        :x-axis="twoConsumptStatisticsOption.xAxis"
                        :y-axis="twoConsumptStatisticsOption.yAxis"
                        :series="twoConsumptStatisticsOption.series"
                        :data-zoom="twoConsumptStatisticsOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickProductDownEhartOfDay"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;align-items: center"><span
                        class="spanHeadTwo">产品缺陷降级代码分布</span></div>
                    </div>
                    <div>
                      <div class="monthProdDown">
                        <div
                          v-for="(item, index) in materialTwoOption.series[0].data"
                          :key="index + 'b'"
                          style="margin-right: 4px; width: 50px">
                          <div
                            :style="{ backgroundColor: item.itemStyle.color }"
                            class="codeDivStyle">
                          </div>
                          <span class="liDivSpan">{{ item.name }}</span>
                        </div>
                      </div>
                      <div style="height: 310px;">
                        <nercar-echarts
                          :legend="materialTwoOption.legend"
                          :grid="materialTwoOption.grid"
                          :series="materialTwoOption.series"
                          :_height="'310px'"
                        />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <!--          热轧质量降级炼钢追溯-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div>
                      <div><span class="spanHeadTwo">热轧质量降级炼钢追溯</span></div>
                      <div style="padding-left: 18px;padding-top: 10px">
                        <span class="red-subtitle">炼钢缺陷导致热轧降级比例</span>
                      </div>
                    </div>
                    <div style="height: 350px;">
                      <nercar-echarts
                        :tooltip="rzQualityOption.tooltip"
                        :legend="rzQualityOption.legend"
                        :grid="rzQualityOption.grid"
                        :x-axis="rzQualityOption.xAxis"
                        :y-axis="rzQualityOption.yAxis"
                        :series="rzQualityOption.series"
                        :data-zoom="rzQualityOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickEhartBar"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div><span
                        class="spanHeadTwo"
                        style="color: #ffffff">.</span></div>
                      <div style="display: flex;justify-content: flex-end">
                        <div>
                          <span class="selectSpan">类型</span>
                          <el-select
                            v-model="form.value"
                            class="custom-select"
                            placeholder="请选择"
                            @change="changeOptionValue">
                            <el-option
                              v-for="item in typeOptions"
                              :key="item.code"
                              :label="item.text"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                    <div style="height: 360px;margin-top: 5px">
                      <el-card
                        style="height: 380px;"
                        class="custom-shadow">
                        <div style="margin-bottom: 10px;font-size: 15px;"><span>板坯热轧生产详情</span></div>
                        <el-tabs
                          v-model="activeName"
                          type="card"
                          @tab-click="getRzDayQuality">
                          <el-tab-pane
                            label="SMI"
                            name="SMI">
                            <nercar-echarts
                              v-if="activeName === 'SMI'"
                              :legend="SMIOption.legend"
                              :tooltip="SMIOption.tooltip"
                              :grid="SMIOption.grid"
                              :x-axis="SMIOption.xAxis"
                              :y-axis="SMIOption.yAxis"
                              :series="SMIOption.series"
                              :data-zoom="SMIOption.dataZoom"
                              :_height="'290px'"
                            />
                          </el-tab-pane>
                          <el-tab-pane
                            label="GCNS"
                            name="GCNS">
                            <nercar-echarts
                              v-if="activeName === 'GCNS'"
                              :legend="GCNSOption.legend"
                              :tooltip="GCNSOption.tooltip"
                              :grid="GCNSOption.grid"
                              :x-axis="GCNSOption.xAxis"
                              :y-axis="GCNSOption.yAxis"
                              :series="GCNSOption.series"
                              :data-zoom="GCNSOption.dataZoom"
                              :_height="'290px'"
                            />
                          </el-tab-pane>
                          <el-tab-pane
                            label="ITSS"
                            name="ITSS">
                            <nercar-echarts
                              v-if="activeName === 'ITSS'"
                              :legend="ITSSOption.legend"
                              :tooltip="ITSSOption.tooltip"
                              :grid="ITSSOption.grid"
                              :x-axis="ITSSOption.xAxis"
                              :y-axis="ITSSOption.yAxis"
                              :series="ITSSOption.series"
                              :data-zoom="ITSSOption.dataZoom"
                              :_height="'290px'"
                            />
                          </el-tab-pane>
                          <el-tab-pane
                            label="QFF"
                            name="QFF">
                            <nercar-echarts
                              v-if="activeName === 'QFF'"
                              :legend="QFFOption.legend"
                              :tooltip="QFFOption.tooltip"
                              :grid="QFFOption.grid"
                              :x-axis="QFFOption.xAxis"
                              :y-axis="QFFOption.yAxis"
                              :series="QFFOption.series"
                              :data-zoom="QFFOption.dataZoom"
                              :_height="'290px'"
                            />
                          </el-tab-pane>
                        </el-tabs>
                      </el-card>
                    </div>
                  </el-col>
                </el-row>
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
  date2ym,
  getLastOneYearMonth,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import { getLgAodHotByTime } from '@/lib/productDataApply/steelmakingProcess'
import { getStoreOfProd } from '@/lib/productDataApply/backWashingProcess'
import {
  getDowngradeSteelTrace,
  getFirstPassYield,
  getProductDowngradeCode,
  getProductDowngradeCount
} from '@/lib/productDataApply/hotRollingProcess'
import { mapState } from 'vuex'

export default {
  name: 'qualityDown',
  components: { echartsScrollBar2, NercarEcharts },
  data() {
    return {
      flag: false,
      xDataAvgDown: null,
      downgradedWeightList: null,
      firstPassRateList: null,
      avgDownWeightList: null,
      avgDownWeightNum: null,
      xDataAvgDownDay: null,
      downgradedWeightDayList: null,
      firstPassRateDayList: null,
      avgDownWeightDayList: null,
      avgDownWeightDayNum: null,
      SMIOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
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
          },
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
          top: '1%',
          data: [
            {
              name: '生产数',
              icon: ''
            }, // 设置为线形
            { name: '降级率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '13%',
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
            name: '单位：块',
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
            name: '生产数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '降级率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      GCNSOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
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
          },
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
          top: '1%',
          data: [
            {
              name: '生产数',
              icon: ''
            }, // 设置为线形
            { name: '降级率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '13%',
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
            name: '单位：块',
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
            name: '生产数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '降级率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      ITSSOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
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
          },
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
          top: '1%',
          data: [
            {
              name: '生产数',
              icon: ''
            }, // 设置为线形
            { name: '降级率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '13%',
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
            name: '单位：块',
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
            name: '生产数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '降级率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      QFFOption: {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              let unit = params[i].seriesType === 'bar' ? '' : '%'
              let color = params[i].seriesType === 'bar' ? '#5DB362' : '#FF9800'
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
          },
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
          top: '1%',
          data: [
            {
              name: '生产数',
              icon: ''
            }, // 设置为线形
            { name: '降级率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '13%',
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
            name: '单位：块',
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
            name: '生产数',
            type: 'bar',
            barWidth: '70%',
            data: [],
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '降级率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#FF9800'
            }
          }
        ],
        dataZoom: []
      },
      form: {
        value: 'S03',
        staid: 'SMI'
      },
      typeOptions: null,
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
      activeName: 'SMI',
      selectData: {
        materialValue: '1',
        finishlValue: '2'
      },
      codeTwoLegendStyleList: [
        {
          name: 'D03',
          color: '#5db362'
        },
        {
          name: 'D21',
          color: '#ff9800'
        },
        {
          name: 'D38',
          color: '#55c6d4'
        },
        {
          name: 'F16-1',
          color: '#ffda35'
        },
        {
          name: 'F16-2',
          color: '#3391ff'
        },
        {
          name: 'F18',
          color: '#a146b0'
        },
        {
          name: 'R01',
          color: '#264478'
        },
        {
          name: 'R01-1',
          color: '#f45549'
        },
        {
          name: 'R01-2',
          color: '#636363'
        },
        {
          name: 'R01-3',
          color: '#997300'
        }
      ],
      codeTwoBottomLegendStyleList: [
        {
          name: 'R02',
          color: '#264478'
        },
        {
          name: 'R03',
          color: '#43682b'
        },
        {
          name: 'R03-1',
          color: '#7cafdd'
        },
        {
          name: 'R03-2',
          color: '#f1975a'
        },
        {
          name: 'R03-3',
          color: '#b7b7b7'
        },
        {
          name: 'R04',
          color: '#ffcd33'
        },
        {
          name: 'R05',
          color: '#698ed0'
        },
        {
          name: 'R06',
          color: '#8cc168'
        },
        {
          name: 'R09',
          color: '#327dc2'
        },
        {
          name: 'R10',
          color: '#d26012'
        }
      ],
      codeLegendStyleList: [
        {
          name: 'S03-2',
          color: '#5db362'
        },
        {
          name: 'S04',
          color: '#ff9800'
        },
        {
          name: 'R52',
          color: '#55c6d4'
        },
        {
          name: 'S03-1',
          color: '#ffda35'
        },
        {
          name: 'S04-2',
          color: '#3391ff'
        },
        {
          name: 'F16-2',
          color: '#a146b0'
        },
        {
          name: 'D03',
          color: '#264478'
        },
        {
          name: '其他',
          color: '#f45549'
        },
        {
          name: 'F16-1',
          color: '#636363'
        },
        {
          name: 'R20-2',
          color: '#997300'
        }
      ],
      codeLegendStyleTwoList: [
        {
          name: 'R09',
          color: '#264478'
        },
        {
          name: 'R18',
          color: '#43682b'
        },
        {
          name: 'R20-4',
          color: '#7cafdd'
        },
        {
          name: 'R01-2',
          color: '#f1975a'
        },
        {
          name: 'R13-1',
          color: '#b7b7b7'
        },
        {
          name: 'R33',
          color: '#ffcd33'
        },
        {
          name: 'S11',
          color: '#698ed0'
        },
        {
          name: 'R03-2',
          color: '#8cc168'
        },
        {
          name: 'R11',
          color: '#327dc2'
        },
        {
          name: 'R13-2',
          color: '#d26012'
        }
      ],
      materialOccupOption: {
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
            left: 0,
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
              gapWidth: 0.5 // 设置节点内部子节点之间的间隔
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
      materialTwoOption: {
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
            left: 0,
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
              gapWidth: 0.5 // 设置节点内部子节点之间的间隔
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
      tapButActCurrent: false,
      aodHotByTimeDataSon: null,
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      seriesVisibility: {
        '降级量/t': true,
        一次合格率: true,
        月均降级量: true
      },
      seriesDayVisibility: {
        '降级量/t': true,
        一次合格率: true,
        日均降级量: true
      },
      finishLegendStyleList: [
        {
          name: '降级量/t',
          color: '#ff9800'
        },
        {
          name: '一次合格率',
          color: '#a146b0'
        },
        {
          name: '月均降级量',
          color: '#f45549'
        }
      ],
      echartsMonthData: null,
      clickYieldMonthFlag: false,
      echartsProductDownData: null,
      clickProductDownMonthFlag: false,
      prodstatOption: {
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
              let unit =
                params[i].seriesName === '降级量/t'
                  ? ''
                  : params[i].seriesName === '一次合格率'
                    ? '%'
                    : params[i].seriesName === '月均降级量'
                      ? ''
                      : ''
              /*let color =
                params[i].seriesName === '降级量/t'
                  ? '#5DB362'
                  : params[i].seriesName === '一次合格率'
                    ? '#a146b0'
                    : params[i].seriesName === '月均降级量'
                      ? '#f45549'
                      : ''*/
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
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
          show: false,
          itemWidth: 22, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            {
              name: '降级量/t',
              icon: 'rect', // 使用矩形图标
              itemStyle: {
                color: '#5DB362' // 设置与柱状图默认颜色一致
              }
            },
            {
              name: '一次合格率',
              icon: 'line',
              itemStyle: {
                color: '#a146b0' // 设置与折线图颜色一致
              }
            },
            {
              name: '月均降级量',
              icon: 'line',
              itemStyle: {
                color: '#f45549' // 设置与折线图颜色一致
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
            name: '',
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '单位：t',
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
            name: '降级量/t',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: '70%',
            data: [],
            itemStyle: {
              // color: '#5DB362'
              color: function(params) {
                // 根据数值大小返回不同颜色
                if (params.value > params.data.avgDownLine) return '#ff9800'
                else return '#5DB362'
              }
            }
          },
          {
            name: '一次合格率',
            type: 'line',
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            data: [],
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            itemStyle: {
              color: '#a146b0'
            }
          },
          {
            name: '月均降级量',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#f45549'
            },
            label: {
              show: false,
              position: 'top',
              formatter: '{c}.0'
            },
            markPoint: {
              label: {
                show: true,
                color: 'red',
                fontSize: 12, // 增加字体大小设置，确保可见
                position: 'right' // 设置文字位置
              },
              data: [
                {
                  name: '月均降级量',
                  xAxis: '12',
                  yAxis: 4,
                  symbolSize: 1, //去掉图标识，只展示文字
                  label: {
                    show: true,
                    color: 'red',
                    fontSize: 12, // 增加字体大小设置，确保可见
                    position: 'top', // 设置文字位置
                    formatter: '4'
                  }
                }
              ]
            }
          }
        ],
        dataZoom: []
      },
      dayLegendStyleList: [
        {
          name: '降级量/t',
          color: '#ff9800'
        },
        {
          name: '一次合格率',
          color: '#a146b0'
        },
        {
          name: '日均降级量',
          color: '#f45549'
        }
      ],
      prodDayOption: {
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
              let unit =
                params[i].seriesName === '降级量/t'
                  ? ''
                  : params[i].seriesName === '一次合格率'
                    ? '%'
                    : params[i].seriesName === '日均降级量'
                      ? ''
                      : ''
              let dot =
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
                params[i].color +
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
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '单位：t',
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
            name: '降级量/t',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: '70%',
            data: [],
            itemStyle: {
              // color: '#5DB362'
              color: function(params) {
                // 根据数值大小返回不同颜色
                if (params.value > params.data.avgDownLine) return '#ff9800'
                else return '#5DB362'
              }
            }
          },
          {
            name: '一次合格率',
            type: 'line',
            // smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            // yAxisIndex: 1,
            data: [],
            label: {
              show: false, // 显示转折点数值
              position: 'top', // 数值显示在转折点上方
              color: 'black',
              formatter: function(params) {
                return params.value + '%'
              }
            },
            itemStyle: {
              color: '#a146b0'
            }
          },
          {
            name: '日均降级量',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              color: '#f45549'
            },
            label: {
              show: false,
              position: 'top',
              formatter: '{c}.0'
            },
            markPoint: {
              label: {
                show: true,
                color: 'red',
                fontSize: 12, // 增加字体大小设置，确保可见
                position: 'right' // 设置文字位置
              },
              data: [
                {
                  name: '月均降级量',
                  xAxis: '12',
                  yAxis: 4,
                  symbolSize: 1, //去掉图标识，只展示文字
                  label: {
                    show: true,
                    color: 'red',
                    fontSize: 12, // 增加字体大小设置，确保可见
                    position: 'top', // 设置文字位置
                    formatter: '4'
                  }
                }
              ]
            }
          }
        ],
        dataZoom: []
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
      twoConsumptStatisticsOption: {
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
          data: ['卷数'],
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
            // axisLabel: { interval: 0 } //横坐标显示不全
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：卷',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
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
          {
            name: '卷数',
            type: 'bar',
            barWidth: 24,
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              color: '#333333'
            },
            itemStyle: {
              color: '#5DB362'
            },
            data: []
          }
        ],
        dataZoom: []
      },
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
          data: ['卷数'],
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 12 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            }*/
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：卷',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
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
          {
            name: '卷数',
            type: 'bar',
            barWidth: '60%',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
              color: '#333333'
            },
            itemStyle: {
              color: '#5DB362'
            },
            data: []
          }
        ],
        dataZoom: []
      },
      rzQualityOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(53, 160, 52, 0.15)' // 设置柱状图背景阴影颜色
            }
          },
          formatter: function(params) {
            let result = params[0].name + '<br>'
            for (let i = 0; i < params.length; i++) {
              // 为所有数据添加百分比单位（根据实际需求可调整判断条件）
              let unit = '%'
              let color = params[i].color || '#5DB362' // 使用系列自身颜色或默认色
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
            type: 'value',
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
        series: null,
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
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['订单完成率', '规格完成率'],
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
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
            name: '',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '订单完成率',
            type: 'bar',
            data: [12, 22, 33, 44, 55, 23, 67, 78, 86, 23],
            barWidth: 13,
            itemStyle: {
              color: '#5DB362'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          },
          {
            name: '规格完成率',
            type: 'bar',
            data: [33, 44, 22, 67, 87, 45, 32, 46, 55, 33],
            barWidth: 13,
            itemStyle: {
              color: '#FF9800'
            },
            barCategoryGap: '40%',
            barGap: '20%'
          }
        ],
        dataZoom: []
      },
      materialOccupOptionTest: {
        grid: [
          {
            containLabel: true
          }
        ],
        series: [
          {
            type: 'treemap',
            roam: false,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            breadcrumb: { show: false }, //去掉矩形树图下方root黑色标签
            data: [
              {
                name: 'node',
                value: 0,
                itemStyle: {
                  color: '#5db362'
                }
              }
            ]
          }
        ]
      },
      colorList: [
        '#5DB362',
        '#458148',
        '#264A28',
        '#FF9800',
        '#C17300',
        '#663D00',
        '#55C6D4',
        '#3F96A1',
        '#FFD000',
        '#CDA800',
        '#F45549',
        '#C23D33',
        '#3391FF',
        '#216CC4',
        '#FF34B5',
        '#BF2888',
        '#A146B0',
        '#732381',
        '#264478',
        '#334D79',
        '#B9B9B9',
        '#2B6168',
        '#7E6700',
        '#8D2F28',
        '#52175B',
        '#192E52',
        '#144279',
        '#791655',
        '#797979',
        '#252525'
      ],
      noTime: ''
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  mounted() {
    this.typeOptions = this.dataDictionary['rz-defectType']

    this.getFirstPassYieldMonth()
    this.getFirstPassYieldDay()

    this.getProcRhythmTime()
    this.getFinishProductAll(this.times.endDate)
    this.getRzQuality()

    this.getProductDowngradeCountMonth()
    this.getProductDowngradeCountDay()
  },
  methods: {
    changeOptionValue() {
      this.getRzQuality()
    },
    //质量降级-总查询
    clickTabCurrent() {
      this.clickYieldMonthFlag = false
      this.clickProductDownMonthFlag = false
      this.getFirstPassYieldMonth()
      this.getFirstPassYieldDay()
      this.getProductDowngradeCountMonth()
      this.getFinishProductAll(this.times.endDate)
      this.getProductDowngradeCountDay()

      this.getRzQuality()

      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //产品降级与一次合格率(月)
    async getFirstPassYieldMonth() {
      const res = await post(getFirstPassYield, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res.success) {
        this.xDataAvgDown = []
        this.downgradedWeightList = []
        this.firstPassRateList = []
        this.avgDownWeightList = []
        this.avgDownWeightNum = res.data.avgDownWeight
        res.data.data.forEach(item => {
          this.xDataAvgDown.push(item.accDate)
          this.downgradedWeightList.push({
            value: item.downgradedWeight,
            avgDownLine: this.avgDownWeightNum
          })
          this.firstPassRateList.push(item.firstPassRate)
          this.avgDownWeightList.push(this.avgDownWeightNum)
        })
        this.prodstatOption.xAxis[0].data = this.xDataAvgDown
        this.prodstatOption.series[0].data = this.downgradedWeightList
        this.prodstatOption.series[1].data = this.firstPassRateList
        this.prodstatOption.series[2].data = this.avgDownWeightList
        this.prodstatOption.series[2].markPoint.data[0].xAxis = this.xDataAvgDown[
          this.xDataAvgDown.length - 1
        ]
        this.prodstatOption.series[2].markPoint.data[0].yAxis = this.avgDownWeightNum
        this.prodstatOption.series[2].markPoint.data[0].label.formatter = this.avgDownWeightNum.toString()
        this.prodstatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: (12 / this.xDataAvgDown.length) * 100 // 初始显示前 12 条数据
          }
        ]
      }
    },
    async clickChartYieldMonth(data) {
      this.echartsMonthData = data
      this.clickYieldMonthFlag = true
      await this.getFirstPassYieldDay()
    },
    //产品降级与一次合格率(日)
    async getFirstPassYieldDay() {
      const res = await post(getFirstPassYield, {
        date: this.clickYieldMonthFlag
          ? this.echartsMonthData.data.name
          : this.times.endDate,
        type: 'day'
      })
      if (res.success) {
        this.xDataAvgDownDay = []
        this.downgradedWeightDayList = []
        this.firstPassRateDayList = []
        this.avgDownWeightDayList = []
        this.avgDownWeightDayNum = res.data.avgDownWeight
        res.data.data.forEach(item => {
          this.xDataAvgDownDay.push(item.accDate)
          this.downgradedWeightDayList.push({
            value: item.downgradedWeight,
            avgDownLine: this.avgDownWeightDayNum
          })
          this.firstPassRateDayList.push(item.firstPassRate)
          this.avgDownWeightDayList.push(this.avgDownWeightDayNum)
        })
        this.prodDayOption.xAxis[0].data = this.xDataAvgDownDay
        this.prodDayOption.series[0].data = this.downgradedWeightDayList
        this.prodDayOption.series[1].data = this.firstPassRateDayList
        this.prodDayOption.series[2].data = this.avgDownWeightDayList
        this.prodDayOption.series[2].markPoint.data[0].xAxis = this.xDataAvgDownDay[
          this.xDataAvgDownDay.length - 1
        ]
        this.prodDayOption.series[2].markPoint.data[0].yAxis = this.avgDownWeightDayNum
        this.prodDayOption.series[2].markPoint.data[0].label.formatter = this.avgDownWeightDayNum.toString()

        this.prodDayOption.dataZoom = [
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
            end: (31 / this.xDataAvgDownDay.length) * 100
          }
        ]
      }
    },
    toggleSeries(name) {
      let isShowLegend = !this.seriesVisibility[name]
      this.seriesVisibility[name] = isShowLegend

      //降级量/t
      if (name === '降级量/t' && isShowLegend === false) {
        this.prodstatOption.series[0].data = []
      }
      if (name === '降级量/t' && isShowLegend === true) {
        this.prodstatOption.series[0].data = this.downgradedWeightList
      }
      //一次合格率
      if (name === '一次合格率' && isShowLegend === false) {
        this.prodstatOption.series[1].data = []
      }
      if (name === '一次合格率' && isShowLegend === true) {
        this.prodstatOption.series[1].data = this.firstPassRateList
      }
      //月均降级量
      if (name === '月均降级量' && isShowLegend === false) {
        this.prodstatOption.series[2].data = []
        this.prodstatOption.series[2].markPoint.data[0].xAxis = ''
        this.prodstatOption.series[2].markPoint.data[0].yAxis = null
        this.prodstatOption.series[2].markPoint.data[0].label.formatter = ''
      }
      if (name === '月均降级量' && isShowLegend === true) {
        this.prodstatOption.series[2].data = this.avgDownWeightList
        this.prodstatOption.series[2].markPoint.data[0].xAxis = this.xDataAvgDown[
          this.xDataAvgDown.length - 1
        ]
        this.prodstatOption.series[2].markPoint.data[0].yAxis = this.avgDownWeightNum
        this.prodstatOption.series[2].markPoint.data[0].label.formatter = this.avgDownWeightNum.toString()
      }
    },
    toggleSeriesDay(name) {
      let isShowLegend = !this.seriesDayVisibility[name]
      this.seriesDayVisibility[name] = isShowLegend

      //降级量/t
      if (name === '降级量/t' && isShowLegend === false) {
        this.prodDayOption.series[0].data = []
      }
      if (name === '降级量/t' && isShowLegend === true) {
        this.prodDayOption.series[0].data = this.downgradedWeightDayList
      }
      //一次合格率
      if (name === '一次合格率' && isShowLegend === false) {
        this.prodDayOption.series[1].data = []
      }
      if (name === '一次合格率' && isShowLegend === true) {
        this.prodDayOption.series[1].data = this.firstPassRateDayList
      }
      //日均降级量
      if (name === '日均降级量' && isShowLegend === false) {
        this.prodDayOption.series[2].data = []
        this.prodDayOption.series[2].markPoint.data[0].xAxis = ''
        this.prodDayOption.series[2].markPoint.data[0].yAxis = null
        this.prodDayOption.series[2].markPoint.data[0].label.formatter = ''
      }
      if (name === '日均降级量' && isShowLegend === true) {
        this.prodDayOption.series[2].data = this.avgDownWeightDayList
        this.prodDayOption.series[2].markPoint.data[0].xAxis = this.xDataAvgDownDay[
          this.xDataAvgDownDay.length - 1
        ]
        this.prodDayOption.series[2].markPoint.data[0].yAxis = this.avgDownWeightDayNum
        this.prodDayOption.series[2].markPoint.data[0].label.formatter = this.avgDownWeightDayNum.toString()
      }
    },

    async getProcRhythmTime() {
      const res = await post(getLgAodHotByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
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
        const colors = [
          '#5db362',
          '#ff9800',
          '#55c6d4',
          '#ffda35',
          '#3391ff',
          '#a146b0',
          '#264478',
          '#f45549'
        ]
        const series = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'].map(
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

    //产品缺陷降级卷数（月）
    async getProductDowngradeCountMonth() {
      const res = await post(getProductDowngradeCount, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.productDowngradeCount.forEach(item => {
          xData.push(item.accDate)
          yData.push(item.downCount)
        })
        xData.push('总计')
        yData.push(res.data.totalDowngradeCount)
        this.powerConsumptStatisticsOption.xAxis[0].data = xData
        this.powerConsumptStatisticsOption.series[1].data = yData
        let arr = JSON.parse(JSON.stringify(yData))
        let referToData = this.transformArray(arr)
        referToData.splice(1, 1)
        this.powerConsumptStatisticsOption.series[0].data = referToData.reverse()

        this.powerConsumptStatisticsOption.dataZoom = [
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
            end: (13 / xData.length) * 100
          }
        ]
      }
    },
    transformArray(arr1) {
      let arr2 = [0]
      for (let i = arr1.length - 1; i >= 0; i--) {
        if (i === arr1.length - 1) {
          // 处理最后一个元素（原数组的最后一个）
          arr2.push(arr1[i])
        } else {
          arr2.push(arr2[arr2.length - 1] - arr1[i])
        }
      }
      return arr2
    },
    async clickProductDownEhart(data) {
      if (data && data.data.name == '总计') {
        return
      }
      this.echartsProductDownData = data
      this.clickProductDownMonthFlag = true
      await this.getProductDowngradeCountDay()
      this.getFinishProductAll(data.data.name)
    },
    clickProductDownEhartOfDay(data) {
      if (data && data.data.name == '总计') {
        return
      }
      this.getFinisTwohProductAll(data.data.name)
    },
    // 产品缺陷降级代码分布(月)
    async getFinishProductAll(time) {
      const res = await post(getProductDowngradeCode, {
        startDate: time,
        endDate: time,
        type: 'month'
      })
      if (res.success && res.data.length > 0) {
        // let mergedArray = this.codeLegendStyleList.concat(
        //   this.codeLegendStyleTwoList
        // )
        // //matchingData.downCount
        // const treemapData = mergedArray.map(item => {
        //   const matchingData = res.data.find(
        //     data => data.mainCode === item.name
        //   )
        //   return {
        //     name: 'root',
        //     children: [
        //       {
        //         name: item.name,
        //         itemStyle: {
        //           color: item.color
        //         },
        //         children: matchingData
        //           ? [
        //               {
        //                 name: item.name,
        //                 children: [
        //                   {
        //                     name: item.name,
        //                     value: matchingData.downCount
        //                   }
        //                 ]
        //               }
        //             ]
        //           : []
        //       }
        //     ]
        //   }
        // })
        // this.materialOccupOption.series[0].data = treemapData

        let materiaData = []
        for (let i = 0; i < res.data.length; i++) {
          materiaData.push({
            name: res.data[i].mainCode,
            value: res.data[i].downCount,
            itemStyle: {
              color:
                i > this.colorList.length
                  ? this.colorList[this.colorList.length - 1]
                  : this.colorList[i]
            }
          })
        }

        this.materialOccupOptionTest.series[0].data = materiaData
      } else {
        // this.materialOccupOption.series[0].data = []
        this.materialOccupOptionTest.series[0].data = []
      }
    },

    //产品缺陷降级卷数（日）
    async getProductDowngradeCountDay() {
      const res = await post(getProductDowngradeCount, {
        date: this.clickProductDownMonthFlag
          ? this.echartsProductDownData.data.name
          : this.times.endDate,
        type: 'day'
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.productDowngradeCount.forEach(item => {
          xData.push(item.accDate)
          yData.push(item.downCount)
        })
        xData.push('总计')
        yData.push(res.data.totalDowngradeCount)
        this.twoConsumptStatisticsOption.xAxis[0].data = xData
        this.twoConsumptStatisticsOption.series[1].data = yData
        let arr = JSON.parse(JSON.stringify(yData))
        let referToData = this.transformArray(arr)
        referToData.splice(1, 1)
        this.twoConsumptStatisticsOption.series[0].data = referToData.reverse()

        this.twoConsumptStatisticsOption.dataZoom = [
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
            end: (5 / xData.length) * 100
          }
        ]
        this.getFinisTwohProductAll(xData[xData.length - 2])
      }
    },
    // 产品缺陷降级代码分布(日)
    async getFinisTwohProductAll(time) {
      const res = await post(getProductDowngradeCode, {
        date: time,
        type: 'day'
      })
      if (res.success && res.data.length > 0) {
        // let mergedArray = this.codeTwoLegendStyleList.concat(
        //   this.codeTwoBottomLegendStyleList
        // )
        // //matchingData.downCount
        // const treemapData = mergedArray.map(item => {
        //   const matchingData = res.data.find(
        //     data => data.mainCode === item.name
        //   )
        //   return {
        //     name: 'root',
        //     children: [
        //       {
        //         name: item.name,
        //         itemStyle: {
        //           color: item.color
        //         },
        //         children: matchingData
        //           ? [
        //               {
        //                 name: item.name,
        //                 children: [
        //                   {
        //                     name: item.name,
        //                     value: matchingData.downCount
        //                   }
        //                 ]
        //               }
        //             ]
        //           : []
        //       }
        //     ]
        //   }
        // })
        // this.materialTwoOption.series[0].data = treemapData
        let materiaData = []
        for (let i = 0; i < res.data.length; i++) {
          materiaData.push({
            name: res.data[i].mainCode,
            value: res.data[i].downCount,
            itemStyle: {
              color:
                i > this.colorList.length
                  ? this.colorList[this.colorList.length - 1]
                  : this.colorList[i]
            }
          })
        }

        this.materialTwoOption.series[0].data = materiaData
      } else {
        this.materialTwoOption.series[0].data = []
      }
    },
    //热轧质量降级炼钢追溯(月)
    async getRzQuality() {
      const res = await post(getDowngradeSteelTrace, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month'
      })
      if (res.success) {
        this.aodHotByTimeDataSon = res.data
        let xData = []
        let SMIList = []
        let GCNCList = []
        let ITSStList = []
        let QFFtList = []
        this.aodHotByTimeDataSon.forEach(item => {
          xData.push(item.accDate)
          if (this.form.value === 'S03') {
            SMIList.push(Number(item.smiThreeDegradeRate))
            GCNCList.push(Number(item.gcnsThreeDegradeRate))
            ITSStList.push(Number(item.itssThreeDegradeRate))
            QFFtList.push(Number(item.qffThreeDegradeRate))
          }
          if (this.form.value === 'S04') {
            SMIList.push(Number(item.smiFourDegradeRate))
            GCNCList.push(Number(item.gcnsFourDegradeRate))
            ITSStList.push(Number(item.itssFourDegradeRate))
            QFFtList.push(Number(item.qffFourDegradeRate))
          }
        })
        let rawData = [SMIList, GCNCList, ITSStList, QFFtList]

        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
        // ------------start计算每个柱子在整个维度中的比例,低于5%进行隐藏
        const seriesDataHide = []
        let legendData2 = [
          {
            name: 'SMI',
            color: '#5db362'
          },
          {
            name: 'GCNS',
            color: '#ff9800'
          },
          {
            name: 'ITSS',
            color: '#55c6d4'
          },
          {
            name: 'QFF',
            color: '#ffda35'
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

        const colors = ['#5db362', '#ff9800', '#55c6d4', '#ffda35']
        const series = ['SMI', 'GCNS', 'ITSS', 'QFF'].map((name, sid) => {
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
        })
        this.rzQualityOption.xAxis[0].data = xData
        this.rzQualityOption.series = seriesDataHide

        this.rzQualityOption.dataZoom = [
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
            end: (12 / xData.length) * 100
          }
        ]
        this.noTime = xData[xData.length - 1]
        this.getRzDayQuality()
      }
    },
    clickEhartBar(data) {
      this.noTime = data.data.name
      this.getRzDayQuality()
    },
    //热轧质量降级炼钢追溯(日)
    async getRzDayQuality() {
      const res = await post(getDowngradeSteelTrace, {
        date: this.noTime,
        staid: this.activeName,
        type: 'day'
      })
      if (res.success) {
        let xData = []
        let totalCountList = []
        let degradeRateList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          if (this.form.value === 'S03') {
            totalCountList.push(item.totalCount)
            degradeRateList.push(item.threeDegradeRate)
          }
          if (this.form.value === 'S04') {
            totalCountList.push(item.totalCount)
            degradeRateList.push(item.fourDegradeRate)
          }
        })

        if (this.activeName === 'SMI') {
          this.SMIOption.xAxis[0].data = xData
          this.SMIOption.series[0].data = totalCountList
          this.SMIOption.series[1].data = degradeRateList
          this.SMIOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              // start: 0,
              height: 20, //滑块高度设置
              bottom: 10, //缩放条显示在底部
              // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
              start: 0,
              // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
              // end: 100 //100%
              end: (31 / xData.length) * 100
            }
          ]
        } else if (this.activeName === 'GCNS') {
          this.GCNSOption.xAxis[0].data = xData
          this.GCNSOption.series[0].data = totalCountList
          this.GCNSOption.series[1].data = degradeRateList
          this.GCNSOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              // start: 0,
              height: 20, //滑块高度设置
              bottom: 10, //缩放条显示在底部
              // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
              start: 0,
              // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
              // end: 100 //100%
              end: (31 / xData.length) * 100
            }
          ]
        } else if (this.activeName === 'ITSS') {
          this.ITSSOption.xAxis[0].data = xData
          this.ITSSOption.series[0].data = totalCountList
          this.ITSSOption.series[1].data = degradeRateList
          this.ITSSOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              // start: 0,
              height: 20, //滑块高度设置
              bottom: 10, //缩放条显示在底部
              // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
              start: 0,
              // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
              // end: 100 //100%
              end: (31 / xData.length) * 100
            }
          ]
        } else if (this.activeName === 'QFF') {
          this.QFFOption.xAxis[0].data = xData
          this.QFFOption.series[0].data = totalCountList
          this.QFFOption.series[1].data = degradeRateList
          this.QFFOption.dataZoom = [
            {
              type: 'slider',
              xAxisIndex: 0,
              // start: 0,
              height: 20, //滑块高度设置
              bottom: 10, //缩放条显示在底部
              // start: Math.max(0, ((xData.length - 12) / xData.length) * 100),
              start: 0,
              // end: (13 / xData.length) * 100 // 初始显示前 13 条数据
              // end: 100 //100%
              end: (31 / xData.length) * 100
            }
          ]
        }
      }
    },
    handleShowLengend() {
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  margin-top: 16px;
  margin-bottom: 16px;
}
.red-subtitle {
  font-size: 15px;
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
  width: 100%;
}
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
//产品降级与一次合格率:legend样式---start
ul {
  list-style-type: none;
  display: flex;
  padding: 0;
}

li {
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.liDivStyle {
  display: inline-block;
  content: '';
  width: 22px;
  height: 10px;
  margin-right: 8px;
}
.lineStyle {
  display: inline-block;
  content: '';
  width: 22px;
  height: 2px;
  margin-right: 8px;
}
.legend-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.legend-label {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
}
.legend-disabled {
  opacity: 0.5;
  //cursor: not-allowed;
  cursor: pointer;
}
//产品降级与一次合格率:legend样式----end

/*-------------产品缺陷降级代码分布-----------*/
.codeDivStyle {
  display: inline-block;
  content: '';
  width: 8px;
  height: 8px;
}
/*-------------el-tab-pane标签页切换样式-----------*/
/* 设置未激活标签的背景色 ebf6ec*/
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  background-color: #ebf6ec; /* 非活动标签背景色 */
  //color: #666; /* 非活动标签文字颜色 */
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  //line-height: 100%;
  vertical-align: middle;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #fff; /* 活动标签背景色 */
  color: #5db362; /* 活动标签文字颜色 */
  font-weight: 700;
  font-size: 14px;
  //line-height: 100%;
  vertical-align: middle;
}
//阴影
/* 清除默认样式 */
.custom-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
.liDivSpan {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 12px;
  width: 35px;
}

.monthProdDown {
  display: flex;
  align-items: flex-start;
  margin: 4px 0px;
  flex-wrap: wrap;
  position: relative;
}
.monthProdDown-btn {
  position: absolute;
  right: -5px;
  top: 0px;
  padding: 1px;
  border-radius: 1%;
  font-size: 14px;
  background: #35a034;
  color: #ffffff;
  cursor: pointer;
}
</style>
