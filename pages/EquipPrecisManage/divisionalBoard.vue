<template>
  <div
    class="contentBox">
    <!-- 表单区域 -->
    <div style="display: flex;justify-content: space-between">
      <el-date-picker
        v-model="form.time1"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM"
        value-format="yyyy-MM"
        @change="changeTime"
      >
      </el-date-picker>
      <el-radio-group
        v-model="form.frequency"
        @change="frequencyChange"
      >
        <el-radio-button label="产线"></el-radio-button>
        <el-radio-button label="车间"></el-radio-button>
      </el-radio-group>
    </div>

    <!----------------------------    产线-------------->
    <div
      v-loading="productLoading"
      v-if="showProduct"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
      style="height: 100%"
    >
      <el-row
        v-if="showProduct"
        style="margin-top: 20px"
      >
        <el-card
          v-for="(item ,ind) in productionList"
          :key="ind"
          :class="item.name === productionList[0].name ? 'CardTable' : 'CardTable1'"
        >
          <el-row>
            <div style="height: 28px">
              <span class="headStyle">{{ item.name }}</span>
            </div>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">合格率趋势图</span>
              </div>
              <tasily-echarts
                v-if="showProduct"
                :tooltip="item.lineOptionPassRateProduct.tooltip"
                :grid="item.lineOptionPassRateProduct.grid"
                :legend="item.lineOptionPassRateProduct.legend"
                :x-axis="item.lineOptionPassRateProduct.xAxis"
                :y-axis="item.lineOptionPassRateProduct.yAxis"
                :series="item.lineOptionPassRateProduct.series"
                :data-zoom="item.lineOptionPassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">当月合格率排名</span>
              </div>
              <tasily-echarts
                v-if="showProduct"
                :tooltip="item.lineOptionDevicePassRateProduct.tooltip"
                :grid="item.lineOptionDevicePassRateProduct.grid"
                :legend="item.lineOptionDevicePassRateProduct.legend"
                :x-axis="item.lineOptionDevicePassRateProduct.xAxis"
                :y-axis="item.lineOptionDevicePassRateProduct.yAxis"
                :series="item.lineOptionDevicePassRateProduct.series"
                :data-zoom="item.lineOptionDevicePassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">不合格排名</span>
              </div>
              <tasily-echarts
                v-if="showProduct"
                :tooltip="item.lineOptionDeviceNonPassRateProduct.tooltip"
                :grid="item.lineOptionDeviceNonPassRateProduct.grid"
                :legend="item.lineOptionDeviceNonPassRateProduct.legend"
                :x-axis="item.lineOptionDeviceNonPassRateProduct.xAxis"
                :y-axis="item.lineOptionDeviceNonPassRateProduct.yAxis"
                :series="item.lineOptionDeviceNonPassRateProduct.series"
                :data-zoom="item.lineOptionDeviceNonPassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">当月漏项统计排名</span>
              </div>
              <tasily-echarts
                v-if="showProduct"
                :tooltip="item.lineOptionDeviceForgottenProduct.tooltip"
                :grid="item.lineOptionDeviceForgottenProduct.grid"
                :legend="item.lineOptionDeviceForgottenProduct.legend"
                :x-axis="item.lineOptionDeviceForgottenProduct.xAxis"
                :y-axis="item.lineOptionDeviceForgottenProduct.yAxis"
                :series="item.lineOptionDeviceForgottenProduct.series"
                :data-zoom="item.lineOptionDeviceForgottenProduct.dataZoom"
                :_height="'250px'"
                @chart-click-data="clickEcharts"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>

    <!----------------------------    车间-------------->
    <div
      v-loading="workshopLoading"
      v-if="workshopProduct"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
      style="height: 100%"
    >
      <el-row
        v-if="workshopProduct"
        style="margin-top: 20px"
      >
        <el-card
          v-for="(item ,ind) in workshopList"
          :key="ind"
          :class="item.name === workshopList[0].name ? 'CardTable' : 'CardTable1'"
        >
          <el-row>
            <div style="height: 28px">
              <span class="headStyle">{{ item.name }}</span>
            </div>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">合格率趋势图</span>
              </div>
              <tasily-echarts
                v-if="workshopProduct"
                :tooltip="item.lineOptionPassRateProduct.tooltip"
                :grid="item.lineOptionPassRateProduct.grid"
                :legend="item.lineOptionPassRateProduct.legend"
                :x-axis="item.lineOptionPassRateProduct.xAxis"
                :y-axis="item.lineOptionPassRateProduct.yAxis"
                :series="item.lineOptionPassRateProduct.series"
                :data-zoom="item.lineOptionPassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">当月合格率排名</span>
              </div>
              <tasily-echarts
                v-if="workshopProduct"
                :tooltip="item.lineOptionDevicePassRateProduct.tooltip"
                :grid="item.lineOptionDevicePassRateProduct.grid"
                :legend="item.lineOptionDevicePassRateProduct.legend"
                :x-axis="item.lineOptionDevicePassRateProduct.xAxis"
                :y-axis="item.lineOptionDevicePassRateProduct.yAxis"
                :series="item.lineOptionDevicePassRateProduct.series"
                :data-zoom="item.lineOptionDevicePassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">不合格排名</span>
              </div>
              <tasily-echarts
                v-if="workshopProduct"
                :tooltip="item.lineOptionDeviceNonPassRateProduct.tooltip"
                :grid="item.lineOptionDeviceNonPassRateProduct.grid"
                :legend="item.lineOptionDeviceNonPassRateProduct.legend"
                :x-axis="item.lineOptionDeviceNonPassRateProduct.xAxis"
                :y-axis="item.lineOptionDeviceNonPassRateProduct.yAxis"
                :series="item.lineOptionDeviceNonPassRateProduct.series"
                :data-zoom="item.lineOptionDeviceNonPassRateProduct.dataZoom"
                :_height="'250px'"
              />
            </el-col>
            <el-col :span="6">
              <div style="height: 28px">
                <div class="diamond"></div>
                <span class="headStyleMin">当月漏项统计排名</span>
              </div>
              <tasily-echarts
                v-if="workshopProduct"
                :tooltip="item.lineOptionDeviceForgottenProduct.tooltip"
                :grid="item.lineOptionDeviceForgottenProduct.grid"
                :legend="item.lineOptionDeviceForgottenProduct.legend"
                :x-axis="item.lineOptionDeviceForgottenProduct.xAxis"
                :y-axis="item.lineOptionDeviceForgottenProduct.yAxis"
                :series="item.lineOptionDeviceForgottenProduct.series"
                :data-zoom="item.lineOptionDeviceForgottenProduct.dataZoom"
                :_height="'250px'"
                @chart-click-data="clickEcharts"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
// 注释接口相关引入
/*import {
  getDeviceInfoByProductionLinID,
  getInfoByUnitType,
  getAllProductionLineDatas
} from '@/lib/ApiDivisionBoard'
import {
  getProductionLineInfo,
  iomPrecisionManagementController_trendAnalysis
} from '@/lib/ApiURL01'*/
import tasilyEcharts from '@/components/TasilyEcharts'
import echarts from 'echarts'
import moment from 'moment'
import {
  date2ym,
  date3ym,
  date4ym,
  getMonthDay,
  getMonthDaySixBefore,
  getMonthDayBefore
} from '@/utils/dateUtil'
// 注释接口请求工具
// import { post } from '@/lib/Util'

export default {
  layout: 'test',
  name: 'EquipPrecisManage-divisionalBoard',
  components: {
    tasilyEcharts
  },
  data() {
    return {
      // 产线相关状态
      showProduct: true,
      productLoading: false,
      // 车间相关状态
      workshopProduct: false,
      workshopLoading: false,
      // 表单数据
      form: {
        productionLineID: 'line-1',
        time1: [getMonthDaySixBefore(), getMonthDay()],
        frequency: '产线'
      },
      showProductBusiness: false,

      // 产线模拟数据
      productionList: [
        {
          name: 'GCNS热轧厂',
          // 合格率趋势图配置
          lineOptionPassRateProduct: {
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'cross' }
            },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月']
            },
            yAxis: { type: 'value', min: 80, max: 100 },
            series: [
              {
                name: '合格率',
                type: 'line',
                data: [92, 95, 93, 96, 94, 97],
                smooth: true,
                color: '#5db362',
                areaStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(102, 214, 115, 0.4)' // 绿色起点（透明度40%）
                        },
                        {
                          offset: 1,
                          color: 'rgba(102, 214, 115, 0)' // 绿色终点（完全透明）
                        }
                      ],
                      global: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          },
          // 当月合格率排名
          lineOptionDevicePassRateProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['设备A', '设备B', '设备C', '设备D']
            },
            yAxis: { type: 'value', min: 85, max: 100 },
            series: [
              {
                name: '合格率',
                type: 'bar',
                data: [98, 95, 92, 90],
                color: '#5db362'
              }
            ]
          },
          // 自动采集不合格排名
          lineOptionDeviceNonPassRateProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['设备D', '设备C', '设备B', '设备A']
            },
            yAxis: { type: 'value' },
            series: [
              {
                name: '不合格数',
                type: 'bar',
                data: [12, 8, 5, 3],
                color: '#f45549'
              }
            ]
          },
          // 当月漏项统计排名
          lineOptionDeviceForgottenProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['设备C', '设备D', '设备A', '设备B']
            },
            yAxis: { type: 'value' },
            series: [
              {
                name: '漏项数',
                type: 'bar',
                data: [6, 4, 2, 1],
                color: '#ff9800'
              }
            ]
          }
        }
      ],

      // 车间模拟数据
      workshopList: [
        {
          name: '**车间',
          lineOptionPassRateProduct: {
            tooltip: { trigger: 'axis' },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月']
            },
            yAxis: { type: 'value', min: 85, max: 100 },
            series: [
              {
                name: '合格率',
                type: 'line',
                data: [90, 92, 94, 93, 95, 96],
                smooth: true,
                color: '#5db362',
                areaStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(102, 214, 115, 0.4)' // 绿色起点（透明度40%）
                        },
                        {
                          offset: 1,
                          color: 'rgba(102, 214, 115, 0)' // 绿色终点（完全透明）
                        }
                      ],
                      global: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          },
          lineOptionDevicePassRateProduct: {
            tooltip: { trigger: 'axis' },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位A', '工位B', '工位C'] },
            yAxis: { type: 'value', min: 85, max: 100 },
            series: [
              {
                name: '合格率',
                type: 'bar',
                data: [97, 94, 92],
                color: '#5db362'
              }
            ]
          },
          lineOptionDeviceNonPassRateProduct: {
            tooltip: { trigger: 'axis' },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位C', '工位B', '工位A'] },
            yAxis: { type: 'value' },
            series: [
              {
                name: '不合格数',
                type: 'bar',
                data: [9, 6, 3],
                color: '#f45549'
              }
            ]
          },
          lineOptionDeviceForgottenProduct: {
            tooltip: { trigger: 'axis' },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位B', '工位C', '工位A'] },
            yAxis: { type: 'value' },
            series: [
              { name: '漏项数', type: 'bar', data: [4, 3, 1], color: '#ff9800' }
            ]
          }
        },
        {
          name: '**车间2',
          lineOptionPassRateProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月']
            },
            yAxis: { type: 'value', min: 85, max: 100 },
            series: [
              {
                name: '合格率',
                type: 'line',
                data: [89, 91, 90, 93, 92, 94],
                smooth: true,
                color: '#5db362',
                areaStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(102, 214, 115, 0.4)' // 绿色起点（透明度40%）
                        },
                        {
                          offset: 1,
                          color: 'rgba(102, 214, 115, 0)' // 绿色终点（完全透明）
                        }
                      ],
                      global: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          },
          lineOptionDevicePassRateProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位D', '工位E'] },
            yAxis: { type: 'value', min: 85, max: 100 },
            series: [
              { name: '合格率', type: 'bar', data: [95, 93], color: '#19BE6B' }
            ]
          },
          lineOptionDeviceNonPassRateProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位E', '工位D'] },
            yAxis: { type: 'value' },
            series: [
              { name: '不合格数', type: 'bar', data: [8, 5], color: '#f45549' }
            ]
          },
          lineOptionDeviceForgottenProduct: {
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            grid: {
              top: '15%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: { type: 'category', data: ['工位D', '工位E'] },
            yAxis: { type: 'value' },
            series: [
              { name: '漏项数', type: 'bar', data: [3, 2], color: '#ff9800' }
            ]
          }
        }
      ]
    }
  },
  mounted() {
    // 初始化默认显示产线数据
    this.frequencyChange('产线')
  },
  methods: {
    // 产线ID变更事件
    changeProductId() {
      // 注释接口调用
      /* this.loadProductionData() */
    },
    // 时间范围变更事件
    changeTime() {
      // 注释接口调用
      /* this.refreshData() */
    },
    // 频率切换（产线/车间）
    frequencyChange(val) {
      this.showProduct = val === '产线'
      this.workshopProduct = val === '车间'
      // 注释接口调用
      /* if (val === '产线') {
        this.loadProductionData()
      } else if (val === '车间') {
        this.loadWorkshopData()
      } */
    },
    // 图表点击事件
    clickEcharts(data) {
      console.log('图表点击数据：', data)
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  height: 100vh; /* 使用视口高度 */
  //height: 100%;
  width: 100%;
  padding: 16px 24px 24px 24px;
  box-sizing: border-box; /* 确保padding包含在高度内 */
  //overflow-x: auto;
  //overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f6;
}
/deep/.el-date-editor .el-range__icon {
  margin-left: 1px;
  font-size: 14px;
  color: #b0bfb1;
  line-height: 32px;
  //background-color: #ffffff;
}
/deep/.el-date-editor .el-range__close-icon {
  font-size: 14px;
  //color: #dae0f2;
  width: 36px;
  display: inline-block;
  line-height: 32px;
  //background-color: #ffffff;
}
/deep/.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  width: 15%;
  //background-color: #ffffff;
}
/deep/.el-date-editor
  .el-range-editor
  .el-input__inner
  .el-date-editor--monthrange {
  //background-color: #ffffff;
  padding: 0;
}
/deep/.el-input__icon .el-range__icon .el-icon-date {
  //background-color: #ffffff;
}
/deep/.el-range-editor.el-input__inner {
  align-items: center;
  padding: 2px 1px;
}
.CardTable {
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
  .headStyle {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #606266;
    text-align: center;
  }
  .headStyleMin {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #606266;
    text-align: center;
  }
  .formInput {
    float: right;
    height: 28px;
    margin-right: 50px;
  }
}
.CardTable1 {
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
  margin-top: 20px;
  .headStyle {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #606266;
    text-align: center;
  }
  .headStyleMin {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #606266;
    text-align: center;
  }
  .formInput {
    float: right;
    height: 28px;
    margin-right: 50px;
  }
}
#lineOption5 {
  width: 100%;
  height: 250px;
  margin-top: 10px;
}
/*echarts小黑方块*/
.diamond {
  display: inline-block;
  background: #606266;
  width: 8px;
  height: 16px;
  position: relative;
  left: 2px;
  top: 3px;
}
.drawer-left {
  display: flex;
  justify-content: center;
}
//时间组件背景色统一变灰
/deep/.el-date-editor .el-range-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: 0;
  display: inline-block;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 39%;
  text-align: center;
  font-size: 14px;
  color: #2e382e;
  background-color: #f5f5fa;
}
</style>
