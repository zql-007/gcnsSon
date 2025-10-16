<template>
  <div class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <span class="spanHead">精轧工作辊换辊</span>
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
              <span
                class="datePickerLable"
                style="margin-left: 15px">机架号</span>
              <el-select
                v-model="form.value"
                class="custom-select"
                clearable
                placeholder="请选择"
                @change="changeOptionValue">
                <el-option
                  v-for="item in mileageOptions"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-tag
                :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabCurrent"><span
                  class="spanStyle">查询</span></el-tag>
            </div>
          </div>
          <!--          换辊次数-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div style="height: 31px">
                  <div><span class="spanHeadTwo">换辊次数</span></div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div style="height: 350px;padding-top: 20px">
                      <nercar-echarts
                        ref="changeCountRef"
                        :tooltip="changeCountOption.tooltip"
                        :legend="changeCountOption.legend"
                        :grid="changeCountOption.grid"
                        :x-axis="changeCountOption.xAxis"
                        :y-axis="changeCountOption.yAxis"
                        :series="changeCountOption.series"
                        :data-zoom="changeCountOption.dataZoom"
                        :_height="'330px'"
                        @chart-click-data="clickFrameAll"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <!-- <div style="display: flex;justify-content: flex-end">
                      <div>
                        <span class="selectSpan">机架号</span>
                        <el-select
                          v-model="form.value"
                          class="custom-select"
                          clearable
                          placeholder="请选择"
                          @change="changeOptionValue">
                          <el-option
                            v-for="item in mileageOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                      <el-tag
                        :class="[tapButActReplace===false?'tagStyle':'tagStyleActive']"
                        type="success"
                        @click="clickTabReplace"><span
                          class="spanStyle">查询</span></el-tag>
                    </div> -->
                    <div style="height: 350px;padding-top: 20px">
                      <nercar-echarts
                        ref="changeCountDayRef"
                        :tooltip="changeCountDayOption.tooltip"
                        :legend="changeCountDayOption.legend"
                        :grid="changeCountDayOption.grid"
                        :x-axis="changeCountDayOption.xAxis"
                        :y-axis="changeCountDayOption.yAxis"
                        :series="changeCountDayOption.series"
                        :data-zoom="changeCountDayOption.dataZoom"
                        :_height="'330px'"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <!--          轧制吨位-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div style="height: 31px">
                  <div><span class="spanHeadTwo">轧制吨位</span></div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div style="height: 350px;">
                      <nercar-echarts
                        ref="rollSizeRef"
                        :legend="rollSizeOption.legend"
                        :tooltip="rollSizeOption.tooltip"
                        :grid="rollSizeOption.grid"
                        :x-axis="rollSizeOption.xAxis"
                        :y-axis="rollSizeOption.yAxis"
                        :series="rollSizeOption.series"
                        :data-zoom="rollSizeOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickRollTonChart"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <!-- <div style="display: flex;justify-content: flex-end">
                      <div>
                        <span class="selectSpan">机架号</span>
                        <el-select
                          v-model="form.rackValue"
                          class="custom-select"
                          clearable
                          placeholder="请选择">
                          <el-option
                            v-for="item in mileageOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                      <el-tag
                        :class="[tapRackReplace===false?'tagStyle':'tagStyleActive']"
                        type="success"
                        @click="clickTabRacDunkReplace"><span
                          class="spanStyle">查询</span></el-tag>
                    </div> -->
                    <div style="height: 350px;">
                      <nercar-echarts
                        ref="rollSizeDayRef"
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
          <!--          轧制里程-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div style="height: 31px">
                  <div><span class="spanHeadTwo">轧制里程</span></div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div style="height: 350px;padding-top: 20px">
                      <nercar-echarts
                        ref="distanceRef"
                        :tooltip="rollDistanceOption.tooltip"
                        :legend="rollDistanceOption.legend"
                        :grid="rollDistanceOption.grid"
                        :x-axis="rollDistanceOption.xAxis"
                        :y-axis="rollDistanceOption.yAxis"
                        :series="rollDistanceOption.series"
                        :data-zoom="rollDistanceOption.dataZoom"
                        :_height="'330px'"
                        @chart-click-data="clickDistanceEcharts"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <!-- <div style="display: flex;justify-content: flex-end">
                      <div>
                        <span class="selectSpan">机架号</span>
                        <el-select
                          v-model="form.mileageValue"
                          class="custom-select"
                          clearable
                          placeholder="请选择"
                          @change="changeMileageValue">
                          <el-option
                            v-for="item in mileageOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                      <el-tag
                        :class="[tapMileageReplace===false?'tagStyle':'tagStyleActive']"
                        type="success"
                        @click="clickTabRackReplace"><span
                          class="spanStyle">查询</span></el-tag>
                    </div> -->
                    <div style="height: 350px;padding-top: 20px">
                      <nercar-echarts
                        ref="distanceDayRef"
                        :tooltip="rollDistanceDayOption.tooltip"
                        :legend="rollDistanceDayOption.legend"
                        :grid="rollDistanceDayOption.grid"
                        :x-axis="rollDistanceDayOption.xAxis"
                        :y-axis="rollDistanceDayOption.yAxis"
                        :series="rollDistanceDayOption.series"
                        :data-zoom="rollDistanceDayOption.dataZoom"
                        :_height="'330px'"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <!--          换辊周期-->
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div style="height: 31px">
                  <div><span class="spanHeadTwo">换辊周期</span></div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div style="height: 350px;">
                      <nercar-echarts
                        ref="rollCycleMonRef"
                        :legend="rollCycleOption.legend"
                        :tooltip="rollCycleOption.tooltip"
                        :grid="rollCycleOption.grid"
                        :x-axis="rollCycleOption.xAxis"
                        :y-axis="rollCycleOption.yAxis"
                        :series="rollCycleOption.series"
                        :data-zoom="rollCycleOption.dataZoom"
                        :_height="'350px'"
                        @chart-click-data="clickMinutesChart"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <!-- <div style="display: flex;justify-content: flex-end">
                      <div>
                        <span class="selectSpan">机架号</span>
                        <el-select
                          v-model="form.cycleValue"
                          class="custom-select"
                          clearable
                          placeholder="请选择">
                          <el-option
                            v-for="item in mileageOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                      <el-tag
                        :class="[tapCycleReplace===false?'tagStyle':'tagStyleActive']"
                        type="success"
                        @click="clickTabCycleReplace"><span
                          class="spanStyle">查询</span></el-tag>
                    </div> -->
                    <div style="height: 350px;">
                      <nercar-echarts
                        ref="cycleDayRef"
                        :tooltip="cycleOptionTwo.tooltip"
                        :legend="cycleOptionTwo.legend"
                        :grid="cycleOptionTwo.grid"
                        :x-axis="cycleOptionTwo.xAxis"
                        :y-axis="cycleOptionTwo.yAxis"
                        :series="cycleOptionTwo.series"
                        :data-zoom="cycleOptionTwo.dataZoom"
                        :_height="'350px'"
                      />
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
import { mapState } from 'vuex'
import {
  getRollChangeCount,
  getRollChangeCycleTime,
  getRollingLength,
  getRollingTonnage
} from '@/lib/productDataApply/hotRollingProcess'

export default {
  name: 'rollWorkReplace',
  components: { echartsScrollBar2, NercarEcharts },
  data() {
    return {
      echartsData: null,
      clickFrameAllFlag: false,
      distanceEchartsData: null,
      clickDistanceFlag: false,
      tonnageEchartsData: null,
      clickTonnageFlag: false,
      rollFrameList: null,
      clickMinutesFlag: false,
      minutesEchartsData: null,
      rollFrameAllList: null,
      aodHotByTimeDataSon: null,
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      tapButActCurrent: false,
      tapButActReplace: false,
      tapRackReplace: false,
      tapCycleReplace: false,
      tapMileageReplace: false,
      changeCountOption: {
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
            name: '单位：次',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
        dataZoom: []
      },
      changeCountDayOption: {
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
            name: '单位：次',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
        dataZoom: []
      },
      rollDistanceOption: {
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
            name: '单位：km',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
        dataZoom: []
      },
      rollDistanceDayOption: {
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
            name: '单位：km',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
        dataZoom: []
      },
      rollCycleOption: {
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
            name: '单位：min',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
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
            name: '单位：t',
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
        series: null,
        dataZoom: []
      },
      cycleOptionTwo: {
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
            name: '单位：min',
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
            /*axisLabel: {
              // show: true, // 确保坐标轴标签可见
              fontSize: 10 // 根据需要调整字体大小
              // interval: 0 // 设置为0以显示所有坐标点
            },*/
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null,
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
            name: '单位：t',
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
        series: null,
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
      form: {
        value: '1',
        rackValue: '1',
        mileageValue: '1',
        cycleValue: '1'
      },
      mileageOptions: [],
      seriesMonthData: '1',
      seriesMonthDistanceData: null,
      colors: [
        '#5db362',
        '#ff9800',
        '#55c6d4',
        '#ffda35',
        '#3391ff',
        '#a146b0',
        '#264478',
        '#f45549'
      ]
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  mounted() {
    this.rollFrameAllList = this.dataDictionary['rz-rollFrameAll']
    this.mileageOptions = [...this.rollFrameAllList]

    this.getRollChangeCountData()
    this.getRollChangeDayData()
    this.getRollingLengthData()
    this.getRollingLengthDayData()
    this.getRollingTonnageData()
    this.getRollingTonnageDayData()
    this.getRollChangeCycleTimeData()
    this.getRollChangeCycleTimeDayData()
  },
  methods: {
    //精轧工作辊换辊-总查询
    clickTabCurrent() {
      this.clickFrameAllFlag = false
      this.getRollChangeCountData()
      this.getRollChangeDayData()
      this.clickDistanceFlag = false
      this.getRollingLengthData()
      this.getRollingLengthDayData()

      this.clickTonnageFlag = false
      this.getRollingTonnageData()
      this.getRollingTonnageDayData()

      this.clickMinutesFlag = false
      this.getRollChangeCycleTimeData()
      this.getRollChangeCycleTimeDayData()

      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //轧制里程-机架号查询
    clickTabRackReplace() {
      this.clickDistanceFlag = false
      this.getRollingLengthData()
      this.getRollingLengthDayData()

      this.tapMileageReplace = true
      setTimeout(() => {
        this.tapMileageReplace = false
      }, 1000)
    },
    //换辊周期-机架号查询
    clickTabCycleReplace() {
      this.clickMinutesFlag = false
      this.getRollChangeCycleTimeData()
      this.getRollChangeCycleTimeDayData()

      this.tapCycleReplace = true
      setTimeout(() => {
        this.tapCycleReplace = false
      }, 1000)
    },
    changeMileageValue(val) {
      this.seriesMonthDistanceData = val
    },
    changeOptionValue(val) {
      this.seriesMonthData = val
    },
    //轧制吨位-查询
    clickTabRacDunkReplace() {
      this.clickTonnageFlag = false
      this.getRollingTonnageData()
      this.getRollingTonnageDayData()

      this.tapRackReplace = true
      setTimeout(() => {
        this.tapRackReplace = false
      }, 1000)
    },

    /*-----------换辊次数------------*/
    //换辊次数-机架号查询
    clickTabReplace() {
      this.clickFrameAllFlag = false
      this.getRollChangeCountData()
      this.getRollChangeDayData()

      this.tapButActReplace = true
      setTimeout(() => {
        this.tapButActReplace = false
      }, 1000)
    },
    //type = month
    async getRollChangeCountData() {
      const res = await post(getRollChangeCount, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month',
        // rollFrameCode: this.form.value
        rollFrameCode: '1'
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        res.data.F1.forEach(item => {
          listF1.push(item.rollChangeCount)
          xData.push(item.downTime)
        })
        res.data.F2.forEach(item => {
          listF2.push(item.rollChangeCount)
        })
        res.data.F3.forEach(item => {
          listF3.push(item.rollChangeCount)
        })
        res.data.F4.forEach(item => {
          listF4.push(item.rollChangeCount)
        })
        res.data.F5.forEach(item => {
          listF5.push(item.rollChangeCount)
        })
        res.data.F6.forEach(item => {
          listF6.push(item.rollChangeCount)
        })
        res.data.F7.forEach(item => {
          listF7.push(item.rollChangeCount)
        })
        res.data.F8.forEach(item => {
          listF8.push(item.rollChangeCount)
        })
        let rawData = [
          listF1,
          listF2,
          listF3,
          listF4,
          listF5,
          listF6,
          listF7,
          listF8
        ]
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
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
        this.changeCountOption.xAxis[0].data = []
        this.changeCountOption.series = []

        let seriesList = null
        let indexJj = null
        let series = []
        let rightAndWro = !this.seriesMonthData || this.seriesMonthData === '1'
        if (rightAndWro) {
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          seriesList = [this.seriesMonthData]
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          this.removeExcept(rawData, indexJj)
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'line',
              triggerLineEvent: true,
              smooth: true, // 开启平滑曲线
              //自定义每节柱状图颜色
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              data: rawData[sid]
            }
          })
        }
        this.changeCountOption.xAxis[0].data = xData
        this.changeCountOption.series = series
        this.changeCountOption.dataZoom = [
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
        //重新初始化echarts组件
        this.$refs.changeCountRef.reInitChart()
      }
    },
    //删除数组除给定下标以外的元素
    removeExcept(arr, index) {
      // 检查索引是否有效
      if (index < 0 || index >= arr.length) {
        arr.length = 0 // 索引无效时清空数组
        return arr
      }

      // 保存指定位置的元素
      const temp = arr[index]
      // 清空数组
      arr.length = 0
      // 恢复保存的元素
      arr.push(temp)

      return arr
    },
    async clickFrameAll(data) {
      this.echartsData = data
      this.clickFrameAllFlag = true
      await this.getRollChangeDayData()
    },
    //type = day
    async getRollChangeDayData() {
      const res = await post(getRollChangeCount, {
        date: this.clickFrameAllFlag
          ? this.echartsData.data.name
          : this.times.endDate,
        type: 'day',
        // rollFrameCode: this.form.value
        rollFrameCode: '1'
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        res.data.F1.forEach(item => {
          listF1.push(item.rollChangeCount)
          xData.push(item.downTime)
        })
        res.data.F2.forEach(item => {
          listF2.push(item.rollChangeCount)
        })
        res.data.F3.forEach(item => {
          listF3.push(item.rollChangeCount)
        })
        res.data.F4.forEach(item => {
          listF4.push(item.rollChangeCount)
        })
        res.data.F5.forEach(item => {
          listF5.push(item.rollChangeCount)
        })
        res.data.F6.forEach(item => {
          listF6.push(item.rollChangeCount)
        })
        res.data.F7.forEach(item => {
          listF7.push(item.rollChangeCount)
        })
        res.data.F8.forEach(item => {
          listF8.push(item.rollChangeCount)
        })
        let rawData = [
          listF1,
          listF2,
          listF3,
          listF4,
          listF5,
          listF6,
          listF7,
          listF8
        ]
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
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
        this.changeCountDayOption.xAxis[0].data = []
        this.changeCountDayOption.series = []

        let seriesList = null
        let indexJj = null
        let series = []
        let rightAndWro = !this.seriesMonthData || this.seriesMonthData === '1'
        if (rightAndWro) {
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          seriesList = [this.seriesMonthData]
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          this.removeExcept(rawData, indexJj)
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'line',
              triggerLineEvent: true,
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              smooth: true, // 开启平滑曲线
              symbol: 'none', // 去掉转折点的圆点
              data: rawData[sid]
            }
          })
        }
        this.changeCountDayOption.xAxis[0].data = xData
        this.changeCountDayOption.series = series
        this.changeCountDayOption.dataZoom = [
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
            end: (31 / xData.length) * 100
          }
        ]
        //重新初始化echarts组件
        this.$refs.changeCountDayRef.reInitChart()
      }
    },

    /*-----------轧制里程------------*/
    //type = month
    async getRollingLengthData() {
      const res = await post(getRollingLength, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month',
        // rollFrameCode: this.form.value
        rollFrameCode: '1'
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        res.data.F1.forEach(item => {
          listF1.push(item.avgRollDistance)
          xData.push(item.downTime)
        })
        res.data.F2.forEach(item => {
          listF2.push(item.avgRollDistance)
        })
        res.data.F3.forEach(item => {
          listF3.push(item.avgRollDistance)
        })
        res.data.F4.forEach(item => {
          listF4.push(item.avgRollDistance)
        })
        res.data.F5.forEach(item => {
          listF5.push(item.avgRollDistance)
        })
        res.data.F6.forEach(item => {
          listF6.push(item.avgRollDistance)
        })
        res.data.F7.forEach(item => {
          listF7.push(item.avgRollDistance)
        })
        res.data.F8.forEach(item => {
          listF8.push(item.avgRollDistance)
        })
        let rawData = [
          listF1,
          listF2,
          listF3,
          listF4,
          listF5,
          listF6,
          listF7,
          listF8
        ]
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
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
        this.rollDistanceOption.xAxis[0].data = []
        this.rollDistanceOption.series = []

        let seriesList = null
        let indexJj = null
        let series = []
        // let rightAndWro =
        //   !this.seriesMonthDistanceData || this.seriesMonthDistanceData === '1'
        let rightAndWro = !this.seriesMonthData || this.seriesMonthData === '1'
        if (rightAndWro) {
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          seriesList = [this.seriesMonthData]
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          this.removeExcept(rawData, indexJj)
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'line',
              itemStyle: {
                color: rightAndWro ? colors[sid] : colors[indexJj]
              },
              smooth: true, // 开启平滑曲线
              data: rawData[sid]
            }
          })
        }
        this.rollDistanceOption.xAxis[0].data = xData
        this.rollDistanceOption.series = series
        this.rollDistanceOption.dataZoom = [
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
        //重新初始化echarts组件
        this.$refs.distanceRef.reInitChart()
      }
    },
    async clickDistanceEcharts(data) {
      this.distanceEchartsData = data
      this.clickDistanceFlag = true
      await this.getRollingLengthDayData()
    },
    //type = day
    async getRollingLengthDayData() {
      const res = await post(getRollingLength, {
        date: this.clickDistanceFlag
          ? this.distanceEchartsData.data.name
          : this.times.endDate,
        type: 'day',
        // rollFrameCode: this.form.value
        rollFrameCode: '1'
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        res.data.F1.forEach(item => {
          listF1.push(item.avgRollDistance)
          xData.push(item.downTime)
        })
        res.data.F2.forEach(item => {
          listF2.push(item.avgRollDistance)
        })
        res.data.F3.forEach(item => {
          listF3.push(item.avgRollDistance)
        })
        res.data.F4.forEach(item => {
          listF4.push(item.avgRollDistance)
        })
        res.data.F5.forEach(item => {
          listF5.push(item.avgRollDistance)
        })
        res.data.F6.forEach(item => {
          listF6.push(item.avgRollDistance)
        })
        res.data.F7.forEach(item => {
          listF7.push(item.avgRollDistance)
        })
        res.data.F8.forEach(item => {
          listF8.push(item.avgRollDistance)
        })
        let rawData = [
          listF1,
          listF2,
          listF3,
          listF4,
          listF5,
          listF6,
          listF7,
          listF8
        ]
        //将二维数组里的字符串数值全部转为Number类型
        rawData = rawData.map(subArr => subArr.map(item => Number(item)))
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
        this.rollDistanceDayOption.xAxis[0].data = []
        this.rollDistanceDayOption.series = []

        let seriesList = null
        let indexJj = null
        let series = []
        // let rightAndWro =
        //   !this.seriesMonthDistanceData || this.seriesMonthDistanceData === '1'
        let rightAndWro = !this.seriesMonthData || this.seriesMonthData === '1'
        if (rightAndWro) {
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
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
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              smooth: true, // 开启平滑曲线
              symbol: 'none',
              data: rawData[sid]
            }
          })
        } else {
          seriesList = [this.seriesMonthData]
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1

          this.removeExcept(rawData, indexJj)
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'line',
              triggerLineEvent: true,
              //自定义每节柱状图颜色
              itemStyle: {
                color: colors[indexJj]
              },
              smooth: true, // 开启平滑曲线
              symbol: 'none',
              data: rawData[sid]
            }
          })
        }

        this.rollDistanceDayOption.xAxis[0].data = xData
        this.rollDistanceDayOption.series = series
        this.rollDistanceDayOption.dataZoom = [
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
            end: (31 / xData.length) * 100
          }
        ]
        //重新初始化echarts组件
        this.$refs.distanceDayRef.reInitChart()
      }
    },

    /*-----------轧制吨位------------*/
    //type = month
    async getRollingTonnageData() {
      if (!this.seriesMonthData) {
        return
      }
      const res = await post(getRollingTonnage, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month',
        rollFrameCode: this.seriesMonthData
      })
      this.rollSizeOption.xAxis[0].data = []
      this.rollSizeOption.series = []
      console.log('日志===', res)
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []

        let rawData = []
        let seriesList = null
        let indexJj = null
        let series = []

        // this.form.rackValue
        if (this.seriesMonthData === '1') {
          res.data.F1.forEach(item => {
            listF1.push(item.avgRollTonnage)
            xData.push(item.downTime)
          })
          res.data.F2.forEach(item => {
            listF2.push(item.avgRollTonnage)
          })
          res.data.F3.forEach(item => {
            listF3.push(item.avgRollTonnage)
          })
          res.data.F4.forEach(item => {
            listF4.push(item.avgRollTonnage)
          })
          res.data.F5.forEach(item => {
            listF5.push(item.avgRollTonnage)
          })
          res.data.F6.forEach(item => {
            listF6.push(item.avgRollTonnage)
          })
          res.data.F7.forEach(item => {
            listF7.push(item.avgRollTonnage)
          })
          res.data.F8.forEach(item => {
            listF8.push(item.avgRollTonnage)
          })
          rawData = [
            listF1,
            listF2,
            listF3,
            listF4,
            listF5,
            listF6,
            listF7,
            listF8
          ]
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[sid]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          rawData = res.data[this.seriesMonthData].map(
            item => item.avgRollTonnage
          )
          xData = res.data[this.seriesMonthData].map(item => item.downTime)
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          series = [
            {
              name: this.seriesMonthData,
              type: 'line',
              triggerLineEvent: true,
              smooth: true, // 开启平滑曲线
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[indexJj]
              },
              data: rawData
            }
          ]
        }
        this.rollSizeOption.xAxis[0].data = xData
        this.rollSizeOption.series = series
        this.rollSizeOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            start: 0,
            end: (12 / xData.length) * 100
          }
        ]
        this.$refs.rollSizeRef.reInitChart()
      }
    },
    async clickRollTonChart(data) {
      this.tonnageEchartsData = data
      this.clickTonnageFlag = true
      await this.getRollingTonnageDayData()
    },
    //type = day
    async getRollingTonnageDayData() {
      if (!this.seriesMonthData) {
        return
      }
      const res = await post(getRollingTonnage, {
        date: this.clickTonnageFlag
          ? this.tonnageEchartsData.data.name
          : this.times.endDate,
        type: 'day',
        rollFrameCode: this.seriesMonthData
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        let rawData = []
        let seriesList = null
        let indexJj = null
        let series = []

        if (this.seriesMonthData === '1') {
          res.data.F1.forEach(item => {
            listF1.push(item.avgRollTonnage)
            xData.push(item.downTime)
          })
          res.data.F2.forEach(item => {
            listF2.push(item.avgRollTonnage)
          })
          res.data.F3.forEach(item => {
            listF3.push(item.avgRollTonnage)
          })
          res.data.F4.forEach(item => {
            listF4.push(item.avgRollTonnage)
          })
          res.data.F5.forEach(item => {
            listF5.push(item.avgRollTonnage)
          })
          res.data.F6.forEach(item => {
            listF6.push(item.avgRollTonnage)
          })
          res.data.F7.forEach(item => {
            listF7.push(item.avgRollTonnage)
          })
          res.data.F8.forEach(item => {
            listF8.push(item.avgRollTonnage)
          })
          rawData = [
            listF1,
            listF2,
            listF3,
            listF4,
            listF5,
            listF6,
            listF7,
            listF8
          ]
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[sid]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          rawData = res.data[this.seriesMonthData].map(
            item => item.avgRollTonnage
          )
          xData = res.data[this.seriesMonthData].map(item => item.downTime)
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          series = [
            {
              name: this.seriesMonthData,
              type: 'line',
              triggerLineEvent: true,
              smooth: true, // 开启平滑曲线
              symbol: 'none',
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[indexJj]
              },
              data: rawData
            }
          ]
        }
        this.chemicComOptionTwo.xAxis[0].data = xData
        this.chemicComOptionTwo.series = series
        this.chemicComOptionTwo.dataZoom = [
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
            end: (31 / xData.length) * 100
          }
        ]

        this.$refs.rollSizeDayRef.reInitChart()
      }
    },

    /*-----------换辊周期------------*/
    //type = month
    async getRollChangeCycleTimeData() {
      if (!this.seriesMonthData) {
        return
      }
      const res = await post(getRollChangeCycleTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        type: 'month',
        rollFrameCode: this.seriesMonthData
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []

        let rawData = []
        let seriesList = null
        let indexJj = null
        let series = []

        if (this.seriesMonthData === '1') {
          res.data.F1.forEach(item => {
            listF1.push(item.avgCycleMinutes)
            xData.push(item.downTime)
          })
          res.data.F2.forEach(item => {
            listF2.push(item.avgCycleMinutes)
          })
          res.data.F3.forEach(item => {
            listF3.push(item.avgCycleMinutes)
          })
          res.data.F4.forEach(item => {
            listF4.push(item.avgCycleMinutes)
          })
          res.data.F5.forEach(item => {
            listF5.push(item.avgCycleMinutes)
          })
          res.data.F6.forEach(item => {
            listF6.push(item.avgCycleMinutes)
          })
          res.data.F7.forEach(item => {
            listF7.push(item.avgCycleMinutes)
          })
          res.data.F8.forEach(item => {
            listF8.push(item.avgCycleMinutes)
          })
          rawData = [
            listF1,
            listF2,
            listF3,
            listF4,
            listF5,
            listF6,
            listF7,
            listF8
          ]
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
            return {
              name,
              type: 'bar',
              stack: 'total',
              barWidth: '60%',
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[sid]
              },
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              data: rawData[sid]
            }
          })
        } else {
          rawData = res.data[this.seriesMonthData].map(
            item => item.avgCycleMinutes
          )
          xData = res.data[this.seriesMonthData].map(item => item.downTime)
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          series = [
            {
              name: this.seriesMonthData,
              type: 'line',
              triggerLineEvent: true,
              smooth: true, // 开启平滑曲线
              itemStyle: {
                color: this.colors[indexJj]
              },
              data: rawData
            }
          ]
        }
        this.rollCycleOption.xAxis[0].data = xData
        this.rollCycleOption.series = series
        this.rollCycleOption.dataZoom = [
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
        this.$refs.rollCycleMonRef.reInitChart()
      }
    },
    async clickMinutesChart(data) {
      this.minutesEchartsData = data
      this.clickMinutesFlag = true

      await this.getRollChangeCycleTimeDayData()
    },
    //type = day
    async getRollChangeCycleTimeDayData() {
      const res = await post(getRollChangeCycleTime, {
        date: this.clickMinutesFlag
          ? this.minutesEchartsData.data.name
          : this.times.endDate,
        type: 'day',
        rollFrameCode: this.seriesMonthData
      })
      if (res.success) {
        let xData = []
        let listF1 = []
        let listF2 = []
        let listF3 = []
        let listF4 = []
        let listF5 = []
        let listF6 = []
        let listF7 = []
        let listF8 = []
        let rawData = []
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
        let seriesList = null
        let indexJj = null
        let series = []
        if (this.seriesMonthData == 1) {
          res.data.F1.forEach(item => {
            listF1.push(item.avgCycleMinutes)
            xData.push(item.downTime)
          })
          res.data.F2.forEach(item => {
            listF2.push(item.avgCycleMinutes)
          })
          res.data.F3.forEach(item => {
            listF3.push(item.avgCycleMinutes)
          })
          res.data.F4.forEach(item => {
            listF4.push(item.avgCycleMinutes)
          })
          res.data.F5.forEach(item => {
            listF5.push(item.avgCycleMinutes)
          })
          res.data.F6.forEach(item => {
            listF6.push(item.avgCycleMinutes)
          })
          res.data.F7.forEach(item => {
            listF7.push(item.avgCycleMinutes)
          })
          res.data.F8.forEach(item => {
            listF8.push(item.avgCycleMinutes)
          })
          rawData = [
            listF1,
            listF2,
            listF3,
            listF4,
            listF5,
            listF6,
            listF7,
            listF8
          ]
          //将二维数组里的字符串数值全部转为Number类型
          rawData = rawData.map(subArr => subArr.map(item => Number(item)))
          seriesList = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']
          series = seriesList.map((name, sid) => {
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
                show: false,
                position: 'inside',
                textStyle: {
                  color: '#ffffff' // 设置图内文字为黑色
                }
              },
              smooth: true, // 开启平滑曲线
              symbol: 'none',
              data: rawData[sid]
            }
          })
        } else {
          rawData = res.data[this.seriesMonthData].map(
            item => item.avgCycleMinutes
          )
          xData = res.data[this.seriesMonthData].map(item => item.downTime)
          indexJj = Number(this.seriesMonthData.slice(-1)) - 1
          series = [
            {
              name: this.seriesMonthData,
              type: 'line',
              triggerLineEvent: true,
              smooth: true, // 开启平滑曲线
              symbol: 'none',
              //自定义每节柱状图颜色
              itemStyle: {
                color: this.colors[indexJj]
              },
              data: rawData
            }
          ]
        }
        this.cycleOptionTwo.xAxis[0].data = xData
        this.cycleOptionTwo.series = series
        this.cycleOptionTwo.dataZoom = [
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
            end: (31 / xData.length) * 100
          }
        ]

        this.$refs.cycleDayRef.reInitChart()
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
