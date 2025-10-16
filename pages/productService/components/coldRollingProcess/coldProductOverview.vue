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
            <div><span class="spanHead">产线总览</span></div>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                :picker-options="pickerOptions"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期"
                @change="handleStartDateChange">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                :picker-options="pickerOptions"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px"
                placeholder="选择日期"
                @change="handleEndDateChange">
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
                <div style="height: 377px">
                  <div>
                    <div><span class="spanHeadTwo">当日产量</span></div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.realWegt }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">准备机组</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.rollWegt }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">轧制机组</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.pickWegt }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">酸洗机组</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItemEnd">
                        <span class="statValue">{{ currentProdData.jingWegt }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">精整机组</span>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 20px">
                    <div><span class="spanHeadTwo">待产统计</span></div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.toRoll }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">待轧制</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.toAcidPick }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">待酸洗</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItem">
                        <span class="statValue">{{ currentProdData.toFinish }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">待精整</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="statItemEnd">
                        <span class="statValue">{{ currentProdData.toPackage }}<span style="font-size: 12px;margin-left: 5px">吨</span></span>
                        <span class="statText">待打包</span>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 20px">
                    <div><span class="spanHeadTwo">工序状态</span></div>
                    <el-row :gutter="5">
                      <el-col :span="6">
                        <div
                          :style="{
                            backgroundColor: processStatus.prepareUnit ? '#3aa240' : '#bfbfbf',
                            height: '90px',
                            borderRadius: '10px 0 0 10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }">
                          <span :style="{color: processStatus.prepareUnit ? '#ffffff' : '#0D0D0D'}">准备机组</span>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          :style="{
                            backgroundColor: processStatus.roll1 ? '#3aa240' : '#bfbfbf',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }"><span :style="{color: processStatus.roll1 ? '#ffffff' : '#0D0D0D'}">1#轧机</span></div>
                        <div
                          :style="{
                            backgroundColor: processStatus.roll2 ? '#3aa240' : '#bfbfbf',
                            height: '29px',
                            marginTop: '2px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }"><span :style="{color: processStatus.roll2 ? '#ffffff' : '#0D0D0D'}">2#轧机</span></div>
                        <div
                          :style="{
                            backgroundColor: processStatus.roll3 ? '#3aa240' : '#bfbfbf',
                            height: '29px',
                            marginTop: '2px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }"><span :style="{color: processStatus.roll3 ? '#ffffff' : '#0D0D0D'}">3#轧机</span></div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          :style="{
                            backgroundColor: processStatus.picklingUnit ? '#3aa240' : '#bfbfbf',
                            height: '90px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }">
                          <span :style="{color: processStatus.picklingUnit ? '#ffffff' : '#0D0D0D'}">退洗机组</span>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          :style="{
                            backgroundColor: processStatus.splitCoil ? '#3aa240' : '#bfbfbf',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '0 10px 0 0'
                        }"><span :style="{color: processStatus.splitCoil ? '#ffffff' : '#0D0D0D'}">分卷机组</span></div>
                        <div
                          :style="{
                            backgroundColor: processStatus.slitting1 ? '#3aa240' : '#bfbfbf',
                            height: '29px',
                            marginTop: '2px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }"><span :style="{color: processStatus.slitting1 ? '#ffffff' : '#0D0D0D'}">1#分条机组</span></div>
                        <div
                          :style="{
                            backgroundColor: processStatus.slitting2 ? '#3aa240' : '#bfbfbf',
                            height: '29px',
                            marginTop: '2px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '0 0 10px 0'
                        }"><span :style="{color: processStatus.slitting2 ? '#ffffff' : '#0D0D0D'}">2#分条机组</span></div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <div
                          style="border-right: 1px solid #bfbfbf;border-left:1px solid #bfbfbf;height: 32px;position: relative"
                          class="roundedDiv">
                          <span class="roundedSpan">准备工序</span>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          style="border-right: 1px solid #bfbfbf;height: 32px"
                          class="roundedDiv">
                          <span class="roundedSpan">轧制工序</span>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          style="border-right: 1px solid #bfbfbf;height: 32px"
                          class="roundedDiv">
                          <span class="roundedSpan">酸洗工序</span>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          style="border-right: 1px solid #bfbfbf;height: 32px"
                          class="roundedDiv">
                          <span class="roundedSpan">精整工序</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex">
                  <div><span class="spanHeadTwo">停时统计</span></div>
                  <div style="padding-top: 6px;padding-left: 5px">
                    <img
                      :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                      alt="产量统计">
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="stopPageStatisticOption.legend"
                    :tooltip="stopPageStatisticOption.tooltip"
                    :grid="stopPageStatisticOption.grid"
                    :x-axis="stopPageStatisticOption.xAxis"
                    :y-axis="stopPageStatisticOption.yAxis"
                    :series="stopPageStatisticOption.series"
                    :_height="'330px'"
                    @chart-click-data="clickEchart"
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
                  <div style="display: flex;justify-content: space-between">
                    <div style="display: flex">
                      <div><span class="spanHeadTwo">成品一级品率</span></div>
                      <div style="padding-top: 6px;padding-left: 5px">
                        <img
                          :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                          alt="产量统计">
                      </div>
                    </div>
                    <div>
                      <div>
                        <el-tag
                          :class="[flagOfEleDayFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                        <el-tag
                          :class="[flagOfEleMonthFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                        <el-tag
                          :class="[flagOfEleYearFirstPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                          type="success"
                          @click="clickTabEleFirstPro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
                      </div>
                    </div>
                  </div>
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
                      @chart-click-data="clickEchartFirstRate"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div>
                    <div><span class="spanHeadTwo">各工序电耗统计</span></div>
                  </div>
                  <div style="height: 350px;padding-top: 20px">
                    <nercar-echarts
                      :legend="powerConsumptStatisticsOption.legend"
                      :tooltip="powerConsumptStatisticsOption.tooltip"
                      :grid="powerConsumptStatisticsOption.grid"
                      :x-axis="powerConsumptStatisticsOption.xAxis"
                      :y-axis="powerConsumptStatisticsOption.yAxis"
                      :series="powerConsumptStatisticsOption.series"
                      :data-zoom="powerConsumptStatisticsOption.dataZoom"
                      :_height="'330px'"
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
                  <div style="display: flex;align-items: center">
                    <div><span class="spanHeadTwo">性能检验</span></div>
                    <!--                    <el-tooltip
                      class="item"
                      effect="dark"
                      popper-class="atooltip"
                      content="近12个月性能检验总计"
                      placement="top">
                      <img
                        :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                        style="width: 16px;height: 16px;margin-left: 8px"
                        alt="性能检验">
                    </el-tooltip>-->
                    <div><span class="spanHeadMin">检验样本总数</span></div>
                    <div><span class="spanHeadMinNum">{{ performanceTest.value }}份</span></div>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <div style="padding-top: 10px"><span class="spanHeadTwo">检验项目合格率</span></div>
                      <div style="height: 310px;padding-top: 20px">
                        <nercar-echarts
                          :legend="performanceTestOption.legend"
                          :tooltip="performanceTestOption.tooltip"
                          :grid="performanceTestOption.grid"
                          :x-axis="performanceTestOption.xAxis"
                          :y-axis="performanceTestOption.yAxis"
                          :series="performanceTestOption.series"
                          :_height="'300px'"
                        />
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="padding-top: 10px;margin-left: 7px"><span class="spanHeadTwo">检验项目不合格统计</span></div>
                      <div style="height: 312px;padding-top: 20px">
                        <nercar-echarts
                          :legend="noPerformanceTestOption.legend"
                          :tooltip="noPerformanceTestOption.tooltip"
                          :grid="noPerformanceTestOption.grid"
                          :x-axis="noPerformanceTestOption.xAxis"
                          :y-axis="noPerformanceTestOption.yAxis"
                          :series="noPerformanceTestOption.series"
                          :_height="'300px'"
                        />
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div><span class="spanHeadTwo">各工序缺陷降级分析</span></div>
                    <div>
                      <span class="selectSpan">牌号选择</span>
                      <el-select
                        v-model="selectData.materialValue"
                        placeholder="请选择"
                        @change="changeMateria">
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
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <div style="height: 350px;display: flex;justify-content: center;align-items: center;width: 100%;position: relative">
                          <div
                            id="mainCircular2"></div>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div style="padding-top: 45px">
                          <table id="dataTable">
                            <thead>
                              <tr>
                                <th
                                  style="text-align: center"
                                  class="headTh">名称</th>
                                <th
                                  class="headTh"
                                  style="text-align: right">占比</th>
                                <th
                                  class="headTh"
                                  style="text-align: right">重量</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="raw-material">
                                <td><span class="icon"></span> <span class="textTheam">原料入库</span></td>
                                <td class="textTd">{{ fromTable.raw_material_ratio }}%</td>
                                <td class="textTd">{{ fromTable.rawMaterialWegt }}t</td>
                              </tr>
                              <tr class="preparation">
                                <td><span class="icon"></span> <span class="textTheam">准备段</span></td>
                                <td class="textTd">{{ fromTable.preparation_ratio }}%</td>
                                <td class="textTd">{{ fromTable.preparationWegt }}t</td>
                              </tr>
                              <tr class="rolling">
                                <td><span class="icon"></span> <span class="textTheam">轧制段</span></td>
                                <td class="textTd">{{ fromTable.rolling_ratio }}%</td>
                                <td class="textTd">{{ fromTable.rollWegt }}t</td>
                              </tr>
                              <tr class="pickling">
                                <td><span class="icon"></span> <span class="textTheam">酸洗段</span></td>
                                <td class="textTd">{{ fromTable.pick_ratio }}%</td>
                                <td class="textTd">{{ fromTable.pickWegt }}t</td>
                              </tr>
                              <tr class="finishing">
                                <td><span class="icon"></span> <span class="textTheam">精整段</span></td>
                                <td class="textTd">{{ fromTable.jing_ratio }}%</td>
                                <td class="textTd">{{ fromTable.jingWegt }}t</td>
                              </tr>
                              <!--                              <tr class="finishing">
                                <td><span class="icon"></span> 物流段</td>
                                <td>2.5%</td>
                                <td>15.22t</td>
                              </tr>
                              <tr class="finishing">
                                <td><span class="icon"></span> 一级品段</td>
                                <td>2.5%</td>
                                <td>15.22t</td>
                              </tr>-->
                            </tbody>
                          </table>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="停时详情">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFlag"
            :legend="stopDownStatisticOption.legend"
            :tooltip="stopDownStatisticOption.tooltip"
            :grid="stopDownStatisticOption.grid"
            :x-axis="stopDownStatisticOption.xAxis"
            :y-axis="stopDownStatisticOption.yAxis"
            :series="stopDownStatisticOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisibleFirstRate"
      title="各牌号一级品率">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFirstRateFlag"
            :legend="firstRateOption.legend"
            :tooltip="firstRateOption.tooltip"
            :grid="firstRateOption.grid"
            :x-axis="firstRateOption.xAxis"
            :y-axis="firstRateOption.yAxis"
            :series="firstRateOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import * as echarts from 'echarts'
import {
  getNowDay,
  getLastMonthDate,
  formatDate,
  getPreviousDate,
  getPreviousMonthDate,
  getHalfYearAgoDate
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import {
  getFinishedFirstGradeRateDetail,
  getLzDownTimeDetail,
  getLzRollStopType,
  getLzStopHoursByTime
} from '@/lib/productDataApply/coldRollingProcess'
export default {
  layout: 'menuLayout',
  name: 'productService-productOverview',
  components: {
    NercarEcharts
  },
  props: {
    stopPageStatisticDataSon: {
      type: Object,
      default: function() {
        return {}
      }
    },
    gradeOneRateDataSon: {
      type: Object,
      default: function() {
        return {}
      }
    },
    powerConsumptStatisDataSon: {
      type: Array,
      default: function() {
        return []
      }
    },
    checkProjectDataSon: {
      type: Object,
      default: function() {
        return {}
      }
    },
    prodDayDataSon: {
      type: Object,
      default: function() {
        return {}
      }
    },
    prodOneGradeDataSon: {
      type: Array,
      default: function() {
        return []
      }
    },
    productOverviewAllSon: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      showEchartsFlag: false,
      dialogTableVisible: false,
      dialogTableVisibleFirstRate: false,
      showEchartsFirstRateFlag: false,
      firstRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = '%'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false,
          selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '冶炼', icon: '' }, // 设置为线形
            { name: '等待', icon: '' },
            { name: '停时', icon: '' }
            // { name: '作业率', icon: '', show: false }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '单位：%',
            min: 0,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            scrollBar: {
              show: true, // 显示滚动条
              height: 10, // 滚动条高度
              width: 10, // 滚动条宽度
              left: '90%' // 滚动条位置
              // 其他滚动条样式和交互配置
            },
            data: [],
            // data: ['青丰板坯', '三期方坯', '三期板坯', '二期板坯', '一期板坯'],
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
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [],
            itemStyle: {
              color: '#5db362'
            }
          }
        ],
        dataZoom: [
          /* {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }*/
        ]
      },
      lzRollStopTypeData: null,
      // 工序状态数据（1为运行-绿色，0为停机-灰色）
      processStatus: {
        prepareUnit: 1, // 准备机组
        roll1: 1, // 1#轧机
        roll2: 1, // 2#轧机
        roll3: 0, // 3#轧机
        picklingUnit: 1, // 退洗机组
        splitCoil: 1, // 分卷机组
        slitting1: 0, // 1#分条机组
        slitting2: 1 // 2#分条机组
      },
      selectData: {
        materialValue: '全部钢种'
      },
      options: [],
      currentProdData: {
        realWegt: null,
        pickWegt: null,
        jingWegt: null,
        rollWegt: null,
        toRoll: null,
        toAcidPick: null,
        toFinish: null,
        toPackage: null
      },
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getPreviousDate()
      },
      pickerOptions: {
        disabledDate(time) {
          // 获取当前月份的最后一天
          const endOfCurrentMonth = new Date()
          endOfCurrentMonth.setMonth(endOfCurrentMonth.getMonth() + 1)
          endOfCurrentMonth.setDate(0)

          // 禁用当前月份之后的日期
          return time > endOfCurrentMonth
        }
      },
      tapButActCurrent: false,
      stopDownStatisticOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 'min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false,
          // selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          // borderRadius: 3 // 设置图例标记的圆角半径
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
            name: '单位：min',
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
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            stack: 'total',
            barWidth: 28,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5db362'
            },
            label: {
              show: false
            },
            data: []
          }
        ]
      },
      stopPageStatisticOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = 'min'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          // borderRadius: 3 // 设置图例标记的圆角半径
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
            name: '单位：min',
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
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: null
      },
      flagOfEleDayFirstPro: true,
      flagOfEleMonthFirstPro: false,
      flagOfEleYearFirstPro: false,
      dateTypePraFirstPro: 'day',
      gradeOneRateOption: {
        tooltip: {
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
              const unit = item.seriesName === '一级品率' ? '%' : 't'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // data: ['301', '304', '304L', '316L', '321', '一级品率']
          data: [
            { name: '301', icon: '' },
            { name: '304', icon: '' },
            { name: '304L', icon: '' },
            { name: '316L', icon: '' },
            { name: '321', icon: '' },
            { name: '一级品率', icon: 'line' } // 设置为线形
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
            name: '单位：t',
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
        series: [],
        dataZoom: []
      },
      fromTable: {
        //原料入库
        raw_material_ratio: null,
        rawMaterialWegt: null,
        //准备段
        preparation_ratio: null,
        preparationWegt: null,
        //轧制段
        rolling_ratio: null,
        rollWegt: null,
        //酸洗段
        pick_ratio: null,
        pickWegt: null,
        //精整段
        jing_ratio: null,
        jingWegt: null,
        //物流
        wu_ratio: null,
        wuWegt: null,
        //一级品率
        grade_ratio: null,
        gradeOneWegt: null
      },
      powerConsumptStatisticsOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let tar
            if (params[1] && params[1].value !== '-') {
              tar = params[1]
            } else {
              tar = params[2]
            }
            return (
              tar &&
              tar.name +
                '<br/>' +
                tar.seriesName +
                ' : <strong>' +
                tar.value +
                'kW·h</strong>'
            )
          }
        },
        legend: {
          data: ['电耗'],
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
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: { interval: 0 } //横坐标显示不全
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：kW·h',
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
            name: '电耗',
            type: 'bar',
            barWidth: 28,
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
        ]
      },
      performanceTestOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let tar
            if (params[0] && params[0].value !== '-') {
              tar = params[0]
            } else {
              tar = params[1]
            }
            return (
              tar &&
              tar.name +
                '<br/>' +
                tar.seriesName +
                ' : <strong>' +
                Number(tar.value).toFixed(2) +
                '%</strong>'
            )
          }
        },
        legend: {
          show: false
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            top: '6%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            min: null,
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        yAxis: [
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
            name: '合格率',
            type: 'bar',
            stack: 'total',
            // 设置柱状图的宽度，这里固定为 20px
            barWidth: 20,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5DB362'
            }
          }
        ]
      },
      noPerformanceTestOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          // 关键：开启HTML解析
          useHTML: true,
          // 使用style属性确保加粗效果
          formatter: function(params) {
            let result = `<div style="font-weight: normal;">${
              params[0].name
            }</div>`
            const unit = '%'
            params.forEach(item => {
              // 使用内联样式确保加粗生效
              result += `<div>${
                item.seriesName
              }: <span style="font-weight: bold;">${
                item.value
              }${unit}</span></div>`
            })
            return result
          }
        },
        legend: {
          data: ['304', '304L', '316L', '321'],
          selectedMode: false,
          top: '-2%',
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 15, // 设置图例标记的高度
          borderRadius: 3 // 设置图例标记的圆角半径
        },
        grid: [
          {
            left: '4%',
            right: '8%',
            bottom: '3%',
            top: '6%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        yAxis: [
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
            name: '304',
            type: 'bar',
            stack: 'total',
            // 设置柱状图的宽度，这里固定为 20px
            barWidth: 20,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            // 自定义每节柱状图颜色
            itemStyle: {
              color: '#5DB362'
            }
          },
          {
            name: '304L',
            type: 'bar',
            stack: 'total',
            // 设置柱状图的宽度，这里固定为 20px
            barWidth: 20,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            // 自定义每节柱状图颜色
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '316L',
            type: 'bar',
            stack: 'total',
            // 设置柱状图的宽度，这里固定为 20px
            barWidth: 20,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            // 自定义每节柱状图颜色
            itemStyle: {
              color: '#F45549'
            }
          },
          {
            name: '321',
            type: 'bar',
            stack: 'total',
            // 设置柱状图的宽度，这里固定为 20px
            barWidth: 20,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            // 自定义每节柱状图颜色
            itemStyle: {
              color: '#55C6D4'
            }
          }
        ]
      },
      performanceTest: {
        value: null
      }
    }
  },
  watch: {
    dialogTableVisible(newVal, oldVal) {
      // 普通函数，this 指向组件实例
      this.showEchartsFlag = newVal // 简化赋值逻辑
    },
    dialogTableVisibleFirstRate(newVal, oldVal) {
      this.showEchartsFirstRateFlag = newVal
    },
    stopPageStatisticDataSon: {
      handler: 'getStopPageData',
      deep: true
    },
    gradeOneRateDataSon: {
      handler: 'getGradeOneRateData',
      deep: true
    },
    powerConsumptStatisDataSon: {
      handler: 'getPowerConsumpData',
      deep: true
    },
    checkProjectDataSon(newValue) {
      // handler: 'getPerformanceTestData',
      // deep: true
      if (newValue) {
        this.getPerformanceTestData()
      }
    },
    prodDayDataSon: {
      handler: 'getProdDayDataSon',
      deep: true
    },
    prodOneGradeDataSon: {
      handler: 'getProdOneGradeDataSon',
      deep: true
    },
    productOverviewAllSon: {
      handler: 'getProductOverviewAllSon',
      deep: true
    }
  },
  mounted() {
    this.$emit('stopPageTimes', this.times)
    this.fetchProcessStatus()
  },
  activated() {
    //定时器十分钟刷新停机状态
    this.timerId = setInterval(async () => {
      try {
        await this.fetchProcessStatus()
      } catch (error) {
        console.error('异步方法调用出错:', error)
      }
    }, 600000)
  },
  deactivated() {
    //切换页面后销毁定时器
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  },
  methods: {
    /* -----------------------下钻功能--------------------------*/
    //停时统计
    clickEchart(val) {
      this.dialogTableVisible = true

      this.getStopDownData(val.data.data.machineCode)
    },
    async getStopDownData(machineCode) {
      const res = await post(getLzDownTimeDetail, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        machineCode: machineCode
      })
      if (res.success) {
        let xData = []
        let yData = []
        res.data.map(item => {
          xData.push(item.stopTypeDictText)
          yData.push(item.stopHours)
        })
        this.stopDownStatisticOption.xAxis[0].data = xData
        this.stopDownStatisticOption.series[0].data = yData
      }
    },
    //成品一级品率
    clickEchartFirstRate(val) {
      this.dialogTableVisibleFirstRate = true

      this.getFirstRateData(val.data.name)
    },
    async getFirstRateData(accountDate) {
      const res = await post(getFinishedFirstGradeRateDetail, {
        dateType: this.dateTypePraFirstPro,
        accountDate: accountDate
      })
      if (res.success) {
        let minValue = null

        //p排序，从小到大
        // 1. 对数据按ratio从小到大排序
        const sortedData = [...res.data].sort((a, b) => a.ratio - b.ratio)
        // 2. 提取排序后的ratio数组
        const ratioArray = sortedData.map(item => item.ratio)
        // 3. 提取对应的steelGradeDictText数组
        const steelGradeArray = sortedData.map(item => item.steelGradeDictText)

        minValue = Math.min(...ratioArray)
        this.firstRateOption.xAxis[0].min = (minValue * 0.9).toFixed(0)
        this.firstRateOption.yAxis[0].data = steelGradeArray
        this.firstRateOption.series[0].data = ratioArray
      }
    },
    /* -----------------------统一处理时间--------------------------*/
    handleStartDateChange() {
      if (this.times.startDate) {
        this.times.startDate = this.formatStartDate(this.times.startDate)
      }
    },
    handleEndDateChange() {
      if (this.times.endDate) {
        this.times.endDate = this.formatEndDate(this.times.endDate)
      }
    },
    // 处理开始时间：选择月份时精确到当月第一天
    formatStartDate(monthStr) {
      if (!monthStr) return null
      // 拼接当月第一天
      return `${monthStr}-01`
    },
    // 处理结束时间：选择月份时精确到当月最后一天，若为当前月则精确到前一天
    formatEndDate(monthStr) {
      if (!monthStr) return null

      const year = parseInt(monthStr.split('-')[0])
      const month = parseInt(monthStr.split('-')[1])

      // 获取当月最后一天
      const lastDay = new Date(year, month, 0).getDate()
      const lastDayStr = `${monthStr}-${lastDay}`

      // 判断是否为当前月
      const today = new Date()
      const currentMonthStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`

      if (monthStr === currentMonthStr) {
        // 是当前月，返回昨天
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        return `${yesterday.getFullYear()}-${String(
          yesterday.getMonth() + 1
        ).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
      } else {
        // 非当前月，返回当月最后一天
        return lastDayStr
      }
    },
    /* -------------------------------------------------*/
    // 从接口获取工序状态数据
    async fetchProcessStatus() {
      const res = await post(getLzRollStopType, {})
      if (res.success) {
        this.lzRollStopTypeData = res.data

        // 定义中文到英文的映射关系
        const chineseToEnglishMap = {
          准备机组: 'prepareUnit',
          '1#轧机': 'roll1',
          '2#轧机': 'roll2',
          '3#轧机': 'roll3',
          酸洗: 'picklingUnit',
          分卷: 'splitCoil',
          '1#分条': 'slitting1',
          '2#分条': 'slitting2'
        }
        this.processStatus = this.assignDataToProcessStatus(
          this.lzRollStopTypeData,
          this.processStatus,
          chineseToEnglishMap
        )
      }
    },
    // 将data中的值赋值给processStatus对应的属性
    assignDataToProcessStatus(data, processStatus, mapping) {
      // 遍历data中的所有中文键
      Object.keys(data).forEach(chineseKey => {
        // 找到对应的英文键
        const englishKey = mapping[chineseKey]
        // 如果存在对应的英文键，则赋值
        if (englishKey && processStatus.hasOwnProperty(englishKey)) {
          processStatus[englishKey] = data[chineseKey]
        }
      })
      return processStatus
    },
    changeMateria(val) {
      this.$emit('changeMateriaEmit', val)
    },
    //数据字典-各工序缺陷降级分析
    getProductOverviewAllSon() {
      this.options = [...this.productOverviewAllSon]
    },
    clickTabCurrent() {
      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
      this.$emit('stopPageTimes', this.times)
    },
    //---------------------------当日产量
    getProdDayDataSon() {
      this.currentProdData.jingWegt = this.prodDayDataSon.jingWegt
      this.currentProdData.rollWegt = this.prodDayDataSon.rollWegt
      this.currentProdData.realWegt = this.prodDayDataSon.realWegt
      this.currentProdData.pickWegt = this.prodDayDataSon.pickWegt
      //待产统计
      this.prodDayDataSon.waitProd.forEach(prod => {
        prod.totalWeight = Number(prod.totalWeight).toFixed(2)
        switch (prod.process) {
          case '待轧制':
            this.currentProdData.toRoll = prod.totalWeight
            break
          case '待酸洗':
            this.currentProdData.toAcidPick = prod.totalWeight
            break
          case '待精整':
            this.currentProdData.toFinish = prod.totalWeight
            break
          case '待打包':
            this.currentProdData.toPackage = prod.totalWeight
            break
        }
      })
    },
    //---------------------------停时统计
    getStopPageData() {
      if (!this.stopPageStatisticDataSon.notStopHours) return
      /*const xData = this.getNameUnion(
        this.stopPageStatisticDataSon.notStopHours,
        this.stopPageStatisticDataSon.stopHours
      )*/
      const xData = [
        '准备机组',
        '1#轧机',
        '2#轧机',
        '3#轧机',
        '酸洗',
        '分卷',
        '1#分条',
        '2#分条'
      ]
      const yData = this.getValueArrays(
        xData,
        this.stopPageStatisticDataSon.notStopHours,
        this.stopPageStatisticDataSon.stopHours
      )
      const colors = ['#FF9800', '#5DB362', '#55c6d4']
      const seriesData = [yData.stopHoursYData, yData.notStopHoursYData]
      const seriesName = ['计划停时', '非计划停时']
      const series = seriesData.map((name, index) => {
        return {
          name: seriesName[index],
          type: 'bar',
          stack: 'total',
          barWidth: 28,
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[index]
          },
          label: {
            show: false
          },
          data: seriesData[index]
        }
      })
      this.stopPageStatisticOption.series = series
      this.stopPageStatisticOption.xAxis[0].data = xData
    },
    //获取X轴坐标
    getNameUnion(notStopHours, stopHours) {
      const namesSet = new Set()
      // 遍历 notStopHours 数组，将 name 属性添加到集合中
      notStopHours.forEach(item => {
        namesSet.add(item.name)
      })
      // 遍历 stopHours 数组，将 name 属性添加到集合中
      stopHours.forEach(item => {
        namesSet.add(item.name)
      })
      // 将集合转换为数组
      return Array.from(namesSet)
    },
    //获取Y轴坐标
    getValueArrays(xData, notStopHours, stopHours) {
      const notStopHoursYData = []
      const stopHoursYData = []

      xData.forEach(name => {
        // 查找 notStopHours 中对应 name 的对象
        const notStopItem = notStopHours.find(item => item.name === name)
        // 若找到则取其 value，否则赋值为 0
        notStopHoursYData.push(
          notStopItem
            ? {
                value: notStopItem.value,
                machineCode: notStopItem.code
              }
            : {}
        )

        // 查找 stopHours 中对应 name 的对象
        const stopItem = stopHours.find(item => item.name === name)
        // 若找到则取其 value，否则赋值为 0
        stopHoursYData.push(
          stopItem
            ? {
                value: stopItem.value,
                machineCode: stopItem.code
              }
            : {}
        )
      })

      return {
        notStopHoursYData,
        stopHoursYData
      }
    },
    //----------------------------成品一级品率&各工序缺陷降级分析
    getGradeOneRateData() {
      //各工序缺陷降级分析
      this.fromTable.raw_material_ratio = this.gradeOneRateDataSon.raw_material_ratio
      this.fromTable.rawMaterialWegt = this.gradeOneRateDataSon.raw_material_weight.toFixed(
        2
      )
      this.fromTable.preparation_ratio = this.gradeOneRateDataSon.preparation_ratio
      this.fromTable.preparationWegt = this.gradeOneRateDataSon.preparation_weight.toFixed(
        2
      )
      this.fromTable.rolling_ratio = this.gradeOneRateDataSon.rolling_ratio
      this.fromTable.rollWegt = this.gradeOneRateDataSon.rolling_weight.toFixed(
        2
      )
      this.fromTable.pick_ratio = this.gradeOneRateDataSon.pick_ratio
      this.fromTable.pickWegt = this.gradeOneRateDataSon.pick_weight.toFixed(2)
      this.fromTable.jing_ratio = this.gradeOneRateDataSon.jing_ratio
      this.fromTable.jingWegt = this.gradeOneRateDataSon.jing_weight.toFixed(2)
      this.getDefectDegradationAnalysisEcharts(this.fromTable)
    },
    //-------------新------------成品一级品率
    //成品一级率
    clickTabEleFirstPro(params) {
      if (params === 'day') {
        this.flagOfEleDayFirstPro = true
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = false
      } else if (params === 'month') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = true
        this.flagOfEleYearFirstPro = false
      } else if (params === 'quarter') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = true
      }
      this.dateTypePraFirstPro = params
      this.$emit('changeDateType', this.dateTypePraFirstPro)
      // this.getProdOneGradeDataSon()
    },
    getProdOneGradeDataSon() {
      let xData = this.prodOneGradeDataSon.map(item => {
        return item.accountDate
      })
      let yDataRatio = []
      let yDataWegt304 = []
      let yDataWegt304l = []
      let yDataWegt301 = []
      let yDataWegt316 = []
      let yDataWegt316L = []
      let yDataWegt321 = []
      this.prodOneGradeDataSon.forEach(item => {
        yDataRatio.push(Number(item.ratio).toFixed(2))
        yDataWegt304.push(Number(item.wegt304).toFixed(2))
        yDataWegt304l.push(Number(item.wegt304l).toFixed(2))
        yDataWegt301.push(Number(item.wegt301).toFixed(2))
        yDataWegt316.push(Number(item.wegt316).toFixed(2))
        yDataWegt316L.push(Number(item.wegt316L).toFixed(2))
        yDataWegt321.push(Number(item.wegt321).toFixed(2))
      })
      const colors = ['#3391FF', '#5DB362', '#FF9800', '#F45549', '#55C6D4']
      const seriesData = [
        yDataWegt301,
        yDataWegt304,
        yDataWegt304l,
        yDataWegt316L,
        yDataWegt321
      ]
      const seriesName = ['301', '304', '304L', '316L', '321']
      let series = seriesData.map((name, index) => {
        return {
          name: seriesName[index],
          type: 'bar',
          stack: 'total',
          barWidth: 28,
          //自定义每节柱状图颜色
          itemStyle: {
            color: colors[index]
          },
          label: {
            show: false
          },
          data: seriesData[index]
        }
      })
      series.push({
        name: '一级品率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true, // 开启平滑曲线
        symbol: 'none', // 去掉转折点的圆点
        data: yDataRatio,
        itemStyle: {
          color: '#A146B0'
        }
      })
      this.gradeOneRateOption.xAxis[0].data = xData
      this.gradeOneRateOption.series = series
      this.gradeOneRateOption.dataZoom = [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: Math.max(0, ((xData.length - 7) / xData.length) * 100), // 计算起始位置, //0
          height: 20, //滑块高度设置
          bottom: 0, //缩放条显示在底部
          end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
        }
      ]
    },
    //----------------------------各工序缺陷降级分析
    getDefectDegradationAnalysisEcharts(data) {
      // 原始数据
      let originalData = [
        {
          value: data.rawMaterialWegt,
          name: '原料入库',
          itemStyle: { color: '#5db362' }
        },
        {
          value: data.preparationWegt,
          name: '准备段',
          itemStyle: { color: '#ff9800' }
        },
        {
          value: data.rollWegt,
          name: '轧制段',
          itemStyle: { color: '#55c6d4' }
        },
        {
          value: data.pickWegt,
          name: '酸洗段',
          itemStyle: { color: '#9B5DB3' }
        },
        {
          value: data.jingWegt,
          name: '精整段',
          itemStyle: { color: '#264478' }
        }
      ]
      let totalWegt = originalData
        .reduce((a, b) => a + Number(b.value), 0)
        .toFixed(2)
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('mainCircular2'))
      // 配置项
      let option = {
        title: {
          text: totalWegt + 't',
          subtext: '缺陷降级重量',
          left: 'center',
          top: '45%',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold'
          },
          subtextStyle: {
            fontSize: 14,
            fontFamily: 'Source Han Sans CN',
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'item',
          // 自定义formatter函数，添加颜色标注
          formatter: function(params) {
            // params包含当前数据项的信息，包括颜色
            return `
          <div>
            <span>${params.seriesName}</span><br/>
            <!-- 颜色块 + 名称 + 数值 -->
            <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background-color:${
              params.color
            };margin-right:6px;"></span>
            <span>${params.name}: <strong>${params.value}t</strong></span>
          </div>
        `
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
          data: ['绿色部分', '蓝色部分', '其他部分'] // 根据实际数据标签调整
        },
        series: [
          {
            name: '缺陷降级重量分布',
            type: 'pie',
            radius: ['60%', '90%'],
            roseType: 'radius', // 设置玫瑰图模式，半径随数据变化
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false, //取消圆圈内文字展示
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              borderWidth: 1, // 设置边框宽度，形成间隙效果
              borderColor: 'white' // 边框颜色，可根据背景色调整
            },
            data: originalData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    //----------------------------各工序电耗统计
    getPowerConsumpData() {
      const xData = []
      const yData = []
      let totalData = null
      this.powerConsumptStatisDataSon.forEach(item => {
        xData.push(item.unitDictText)
        yData.push(item.totalElec)
      })
      totalData = this.powerConsumptStatisDataSon.reduce((pre, n) => {
        return (pre = pre + n.totalElec)
      }, 0)
      // console.log('totalData', totalData)
      xData.unshift('用电总计')
      yData.unshift(totalData)
      this.powerConsumptStatisticsOption.xAxis[0].data = xData
      this.powerConsumptStatisticsOption.series[1].data = yData
      let arr = JSON.parse(JSON.stringify(yData))
      let referToData = this.transformArray(arr)
      referToData.splice(1, 1)
      this.powerConsumptStatisticsOption.series[0].data = referToData
    },
    transformArray(arr1) {
      let arr2 = [0]
      for (let i = 0; i < arr1.length; i++) {
        if (i === 0) {
          arr2.push(arr1[i])
        } else {
          arr2.push(arr2[arr2.length - 1] - arr1[i])
        }
      }
      return arr2
    },
    //----------------------------性能检验
    getPerformanceTestData() {
      if (!this.checkProjectDataSon.pass) return
      //总数
      this.performanceTest.value = this.checkProjectDataSon.total
      //合格
      let passRatioYData = []
      let passRatioSeries = []
      this.checkProjectDataSon.pass.forEach(item => {
        passRatioYData.push(item.projectDictText)
        passRatioSeries.push(item.passRatio)
      })
      //自定义最低刻度线，增加视觉对比
      let minValue = Math.min(...passRatioSeries)
      if (minValue > 95) {
        this.performanceTestOption.xAxis[0].min = 95
      } else {
        this.performanceTestOption.xAxis[0].min = minValue - 3
      }
      this.performanceTestOption.yAxis[0].data = []
      this.performanceTestOption.series[0].data = []
      this.performanceTestOption.yAxis[0].data = passRatioYData
      this.performanceTestOption.series[0].data = passRatioSeries
      let sortPssRatioYData = JSON.parse(JSON.stringify(passRatioYData))
      //不合格
      const dataMap = {}
      // 先收集所有需要展示的category
      const allCategories = [...sortPssRatioYData]

      // 过滤数据
      this.checkProjectDataSon.notPass = this.checkProjectDataSon.notPass.filter(
        item => ['304', '304L', '316L', '321'].includes(item.steelGrade)
      )
      // 统计数据
      this.checkProjectDataSon.notPass.forEach(item => {
        const { projectDictText, steelGrade, counts } = item
        /*如果项目不存在（!dataMap[projectDictText]）
        则为该项目创建一个初始对象，包含四个钢级（304、304L、316L、321）
        初始值都设为 0*/
        if (!dataMap[projectDictText]) {
          dataMap[projectDictText] = {
            '304': 0,
            '304L': 0,
            '316L': 0,
            '321': 0
          }
        }
        dataMap[projectDictText][steelGrade] += counts
      })

      // 使用所有category
      const sortedCategories = allCategories

      // 构建系列数据
      const seriesData = [
        {
          name: '304',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          itemStyle: {
            color: '#5DB362'
          },
          data: sortedCategories.map(category => {
            const categoryData = dataMap[category] || {
              '304': 0,
              '304L': 0,
              '316L': 0,
              '321': 0
            }
            const total = Object.values(categoryData).reduce(
              (sum, val) => sum + val,
              0
            )

            if (total === 0) {
              return {
                value: 100,
                itemStyle: { color: '#E6E6E6' },
                tooltip: { show: false }
              }
            }

            return Math.floor((categoryData['304'] / total) * 100 * 100) / 100
          })
        },
        {
          name: '304L',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          itemStyle: {
            color: '#FF9800'
          },
          data: sortedCategories.map(category => {
            const categoryData = dataMap[category] || {
              '304': 0,
              '304L': 0,
              '316L': 0,
              '321': 0
            }
            const total = Object.values(categoryData).reduce(
              (sum, val) => sum + val,
              0
            )

            if (total === 0) {
              return {
                value: 0,
                tooltip: { show: false }
              }
            }

            return Math.floor((categoryData['304L'] / total) * 100 * 100) / 100
          })
        },
        {
          name: '316L',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          itemStyle: {
            color: '#F45549'
          },
          data: sortedCategories.map(category => {
            const categoryData = dataMap[category] || {
              '304': 0,
              '304L': 0,
              '316L': 0,
              '321': 0
            }
            const total = Object.values(categoryData).reduce(
              (sum, val) => sum + val,
              0
            )

            if (total === 0) {
              return {
                value: 0,
                tooltip: { show: false }
              }
            }

            return Math.floor((categoryData['316L'] / total) * 100 * 100) / 100
          })
        },
        {
          name: '321',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          itemStyle: {
            color: '#55C6D4'
          },
          data: sortedCategories.map(category => {
            const categoryData = dataMap[category] || {
              '304': 0,
              '304L': 0,
              '316L': 0,
              '321': 0
            }
            const total = Object.values(categoryData).reduce(
              (sum, val) => sum + val,
              0
            )

            if (total === 0) {
              return {
                value: 0,
                tooltip: { show: false }
              }
            }

            return Math.floor((categoryData['321'] / total) * 100 * 100) / 100
          })
        }
      ]
      this.noPerformanceTestOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            /*shadowStyle: {
              color: '#a5a5a5', // 鼠标移入时的背景阴影颜色
              opacity: 0.5,
              blur: 5
            },*/
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
          /*formatter: function(params) {
            if (params[0].color === '#E6E6E6') {
              params[0].value = '0'
              let result = `${params[0].name}<br/>`
              params.forEach(item => {
                result += `${item.seriesName}: ${item.value}%<br/>`
              })
              return result
            }
            let result = `${params[0].name}<br/>`
            params.forEach(item => {
              result += `${item.seriesName}: ${item.value}%<br/>`
            })
            return result
          }*/
        },
        grid: [
          {
            left: '4%',
            right: '8%',
            bottom: '3%',
            top: '6%',
            containLabel: true
          }
        ],
        legend: {
          data: ['304', '304L', '316L', '321'],
          top: '-2%',
          selectedMode: false,
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 15, // 设置图例标记的高度
          borderRadius: 3 // 设置图例标记的圆角半径
        },
        xAxis: [
          {
            type: 'value',
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: { show: false } //只隐藏 x 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: sortedCategories,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: false // 确保 y 轴标签显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: seriesData
      }
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
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 28px;
  }
}
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 31px;
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
//--
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
/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #d5ddd5;
}
#mainCircular2 {
  width: 100%;
  height: 270px;
  //background-color: #8bc2ee;
  position: absolute;
  top: 5%;
}
//图表格
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  //text-align: left;
}
.headTh {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
}
.textTd {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
}
.textTheam {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
/* 新增表头背景颜色样式 */
th {
  background-color: #e0ebe1;
}
/* 新增偶数行背景颜色样式 */
tbody tr:nth-child(even) {
  background-color: #f5faf5;
}
.icon {
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 3px;
  margin-right: 5px;
  margin-left: 30px;
  padding-top: 5px;
}

.raw-material .icon {
  background-color: #5db362;
}

.preparation .icon {
  background-color: #ff9800;
}

.rolling .icon {
  background-color: #55c6d4;
}

.pickling .icon {
  background-color: #9b5db3;
}

.finishing .icon {
  background-color: #264478;
}
.spanHeadMin {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  //line-height: 100%;
  text-align: right;
  vertical-align: middle;
  margin-left: 24px;
  color: #000000;
}
.spanHeadMinNum {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  vertical-align: middle;
  margin-left: 8px;
}
//产线总览-当日产量
.statItem {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  .statValue {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 20px;
    line-height: 44px;
    letter-spacing: 0px;
  }
  .statText {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    letter-spacing: 0px;
  }
}
.statItemEnd {
  display: flex;
  flex-direction: column;
  .statValue {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 20px;
    line-height: 44px;
    letter-spacing: 0px;
  }
  .statText {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    letter-spacing: 0px;
  }
}
.roundedDiv::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border-top: 1.5px dashed #bfbfbf;
  transform: translateY(-50%);
}
.roundedDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  .roundedSpan {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    z-index: 1;
  }
}
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
//----------------切换按钮---------------
.tagStyleSwitch {
  background-color: #ebf6ec;
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
/* 消除dialog内部卡片的默认margin/padding导致的间隙 */
::v-deep .el-dialog__body {
  padding: 0 !important; /* 移除对话框内容区默认内边距 */
  margin: 0 !important;
}

/* 确保卡片与对话框边缘无缝衔接 */
::v-deep .el-dialog .CardTable {
  border-radius: 0 !important; /* 可选：如需去除卡片圆角与对话框的间隙 */
  margin: 0 !important;
  border: none !important; /* 如卡片有边框可移除 */
}

/* 调整对话框样式 - 增加圆角并消除默认间隙 */
::v-deep .el-dialog {
  padding: 0 !important;
  border-radius: 8px !important; /* 设置四个角为圆角，数值可根据需要调整 */
  overflow: hidden; /* 防止内部内容溢出圆角范围 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; /* 添加阴影效果 */
}

/* 如需调整对话框头部和底部的圆角适配 */
::v-deep .el-dialog__header {
  border-radius: 8px 8px 0 0 !important; /* 仅顶部两角圆角 */
}

::v-deep .el-dialog__footer {
  border-radius: 0 0 8px 8px !important; /* 仅底部两角圆角 */
}
//使用图标路径引入
::v-deep .el-dialog__headerbtn .el-dialog__close {
  /* 移除默认图标 */
  font-size: 0 !important;

  /* 增大按钮容器尺寸（为图标提供更大空间） */
  width: 25px; /* 调大宽度 */
  height: 25px; /* 调大高度 */

  /* 控制图标大小：值越大图标越大（可超过100%） */
  background-size: 9px; /* 直接指定图标像素尺寸 */
  /* 或使用百分比：background-size: 80%; */

  /* 保持圆形边框（如果需要） */
  //border: 2px solid #e0e0e0;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 背景图方式引入图标 */
  background: url('../../../../assets/images/coldRollingProcess/close.svg')
    no-repeat center;
  background-size: contain;
}
/*-------------取消x-----------*/
/* 隐藏默认关闭图标并设置按钮基础样式（带圆圈） */
/*::v-deep .el-dialog__headerbtn .el-dialog__close {
  font-size: 0 !important; !* 隐藏原有图标 *!
  width: 28px; !* 按钮宽高（包含圆圈） *!
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000; !* 圆圈边框 *!
  border-radius: 50% !important; !* 圆形效果 *!
  transition: all 0.2s; !* 过渡动画 *!
}

!* 使用新图标（X图标） *!
::v-deep .el-dialog__headerbtn .el-dialog__close::before {
  content: '\f00d'; !* Font Awesome的times-circle图标代码 *!
  font-family: 'FontAwesome' !important;
  font-size: 19px !important; !* 图标大小（小于按钮尺寸） *!
  color: #000000; !* 图标默认颜色 *!
  !* 多种方式组合使线条更细 *!
  font-weight: 100 !important; !* 尝试最小字重 *!
  transform: scale(0.9); !* 整体缩小图标（关键补充） *!
}
::v-deep .el-dialog__close::before {
  font-weight: 100 !important;
}

!* 鼠标悬停效果（同时改变圆圈和图标颜色） *!
::v-deep .el-dialog__headerbtn:hover .el-dialog__close {
  border-color: #ff4d4f; !* 圆圈边框变色 *!
}

::v-deep .el-dialog__headerbtn:hover .el-dialog__close::before {
  color: #ff4d4f; !* 图标变色 *!
}*/
</style>
