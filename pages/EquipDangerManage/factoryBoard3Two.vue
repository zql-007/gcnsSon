<template>
  <div
    class="contentBox">
    <el-card class="CardTable">
      <div style="margin-left: 20px">
        <span class="headStyle">{{ factoryName }}隐患跟踪统计表11</span>
        <el-form
          :inline="true"
          :model="formTime"
          class="formInputTime"
        >
          <el-date-picker
            v-model="checkTime"
            type="daterange"
            align="right"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="选择日期"
            @change="setCheckTime"
          >
          </el-date-picker>
        </el-form>
      </div>
      <div style="margin: 20px">
        <el-table
          ref="multipleTable"
          :data="tableList"
          tooltip-effect="dark"
        >
          <el-table-column
            label="车间"
            align="center"
            prop="WORKDEPTNAME"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.WORKDEPTNAME !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row, 'WORKDEPTNAME')"
              >
                {{ scope.row.WORKDEPTNAME }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="columnClick"
            label="一般隐患(未处理)"
            align="center"
            prop="NOMAL"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.NOMAL !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'NOMAL')"
              >
                {{ scope.row.NOMAL }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="columnClick"
            prop="BIGGER"
            align="center"
            label="较大隐患(未处理)"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.BIGGER !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'BIGGER')"
              >
                {{ scope.row.BIGGER }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="columnClick"
            prop="MAJOR"
            align="center"
            label="重大隐患(未处理)"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.MAJOR !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'MAJOR')"
              >
                {{ scope.row.MAJOR }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="columnClick"
            prop="TOTAL"
            align="center"
            label="合计(未处理)"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.TOTAL !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'TOTAL')"
              >
                {{ scope.row.TOTAL }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="columnClick"
            prop="DEAL"
            align="center"
            label="已处理"
            width=""
          >
            <template slot-scope="scope">
              <div
                :class="[scope.row.DEAL !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'DEAL')"
              >
                {{ scope.row.DEAL }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-row
      :gutter="20"
      style="margin-top: 20px"
    >
      <el-col :span="16">
        <el-card
          style="height: 434px;"
          class="CardTable"
        >
          <div style="margin-left: 20px">
            <span class="headStyle">目前未处理隐患柱状图（车间）</span>
          </div>
          <div>
            <tasily-echarts
              :tooltip="lineOption1.tooltip"
              :grid="lineOption1.grid"
              :legend="lineOption1.legend"
              :x-axis="lineOption1.xAxis"
              :y-axis="lineOption1.yAxis"
              :series="lineOption1.series"
              :data-zoom="lineOption1.dataZoom"
              :_height="'372px'"
              @chart-click-data="clickEchartsBusiness"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          style="height: 434px;"
          class="CardTable"
        >
          <el-row :gutter="20">
            <el-col :span="15">
              <div style="margin-top: 20px;margin-left: 20px;display: inline-block">
                <span class="headStyle">
                  自动、人工数据采集比例
                </span>
              </div>
            </el-col>
            <el-col :span="9">
              <el-form
                :inline="true"
                :model="workDeptForm"
                class="formInput"
              >
                <el-form-item>
                  <el-select
                    v-model="workDeptForm.workDeptNo"
                    style="width: 110px"
                    clearable
                    @change="selectWorkDept"
                  >
                    <el-option
                      v-for="item in newWorkDeptList2"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div>
            <tasily-echarts
              :title="lineOption2.title"
              :tooltip="lineOption2.tooltip"
              :legend="lineOption2.legend"
              :color="lineOption2.color"
              :series="lineOption2.series"
              :_height="'352px'"
              @chart-click-data="clickEchartsAuto"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top: 20px"
    >
      <el-col :span="12">
        <el-card
          style="min-height: 340px; margin-bottom: 24px;"
          class="CardTable"
        >
          <div style="margin-left: 20px; margin-bottom: 20px;">
            <el-row>
              <el-col :span="24">
                <span class="headStyle">各生产车间故障次数/隐患构成</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="7"
                :offset="17"
                align="right"
              >
                <!--                <div
                  style="display: inline-block; margin-left: 12px;"
                  @click="clickFaultAndDanger('2')"
                >
                  <div style="display: flex;justify-content: center;align-items: center">
                    <div
                      :class="(faultDangerType==='2'||faultDangerType==='3')?'fault_and_danger_danger_active':'fault_and_danger_not_active'"
                      style="width: 25px;height: 14px;border-radius: 3px"
                    ></div>
                    <span style="font-weight: 400;font-size: 12px; margin-left: 4px;">隐患</span>
                  </div>
                </div>
                <div style="display: inline-block; margin-left: 12px;">
                  <div
                    style="display: flex;justify-content: center;align-items: center"
                    @click="clickFaultAndDanger('1')"
                  >
                    <div
                      :class="(faultDangerType==='1'||faultDangerType==='3')?'fault_and_danger_fault_active':'fault_and_danger_not_active'"
                      style="width: 25px;height: 14px;border-radius: 3px"
                    ></div>
                    <span style="font-weight: 400;font-size: 12px; margin-left: 4px;">故障</span>
                  </div>
                </div>-->
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="2">
            <el-col
              v-for="item in dangerAndFailureOptionList"
              :key="'dangerAndFailureOption'+item.graphic[0].style.text"
              :span="6"
            >
              <tasily-echarts
                :tooltip="item.tooltip"
                :legend="item.legend"
                :graphic="item.graphic"
                :series="item.series"
                :_height="'226px'"
                @chart-click-data="clickEchartsRisk"
                @chart-legendselectchanged="clickLegendSelectChanged"
              />
              <div
                v-for="item in item.series[0].data"
                :key="item.name"
                style="margin-left: 40px;"
              >
                <div style="display: flex;align-items: center">
                  <div
                    :style="'background-color:'+item.color"
                    style="width: 20px;height: 12px;border-radius: 5px"
                  ></div>
                  <span style="font-weight: 400;font-size: 12px; margin-left: 4px;">{{ item.name }}:</span>
                  <span style="font-weight: 400;font-size: 12px; margin-left: 4px;">{{ item.value }}条</span>
                  <span style="font-weight: 400;font-size: 12px; margin-left: 4px;">{{ item.per }}%</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          style="height: 340px"
          class="CardTable"
        >
          <div style="margin-left: 20px; margin-bottom: 24px;">
            <span class="headStyle">隐患事项</span>
          </div>
          <el-table
            :data="tableDataRisk"
            height="280"
            max-height="205"
            class="TableWidth"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
            >
            </el-table-column>
            <el-table-column
              prop="obsStarTime"
              show-overflow-tooltip
              label="发现时间"
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="area"
              show-overflow-tooltip
              label="部位"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="dangerDesc"
              label="隐患情况说明"
              show-overflow-tooltip
              width=""
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
              align=""
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="clickDetail(scope.row)"
                >
                  查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="dangerSearchForm.pageIndex"
            :page-size="dangerSearchForm.pageSize"
            :page-sizes="[4, 8, 12, 16]"
            :total="total"
            class="pagPath"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="pageSizeChange"
            @current-change="currentPageChange"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="隐患详情"
      width="40%"
    >
      <div style="border:1px solid #CCC;width: 100%"></div>
      <div style="margin-top: 25px;margin-left: 20px">
        <span
          style="font-weight: 400;font-size: 18px;color: #303133;margin-top: 20px"
        >处置过程</span>
      </div>
      <el-row>
        <el-steps
          :active="workContentList.length"
          style="margin-top: 5px;margin-left: 20px"
        >
          <el-step
            v-for="item in workContentList"
            :key="item.id"
            :title="item.creDate + ' ' + item.creDateTime"
            :description="item.creUserNo+' '+item.workContent"
          ></el-step>
        </el-steps>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患情况说明
          </div>
          <div style="margin-top: 8px">
            {{ dangerDesc }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            应急预案
          </div>
          <div style="margin-top: 8px">
            {{ emergencyResponse }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px;margin-bottom: 30px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            处置方法
          </div>
          <div style="margin-top: 8px">
            {{ hndlType }}
          </div>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import tasilyEcharts from '@/components/TasilyEcharts'
import moment from 'moment'
// 注释掉接口引入，避免接口调用错误
// import {
//   findAllByTableId,
//   findAllDangerHandleRecord,
//   findAllDangerInfoList,
//   queryAllDangerInfoByFactory,
//   queryAllDangerProportionInfoByFactory,
//   queryAllDangerSourceInfoByFactory,
//   queryNotDealDangerInfoByFactory,
//   queryWorkDeptInfo
// } from '@/lib/RiskManageApi'
// import { post } from '@/lib/Util'
import {
  getYearFirstDay,
  getYearLastDay,
  getNowDay,
  getMonthFirstDay,
  getLastFirstMonth,
  getYearFirstDayLast
} from '@/utils/dateUtil'
export default {
  layout: 'test',
  name: 'FactoryBoard3Two',
  components: {
    tasilyEcharts
  },
  data() {
    return {
      checkTime: [],
      formTime: {
        factoryNo: '', //厂编号
        factoryCode: '',
        beginDate: getYearFirstDayLast(),
        endDate: getNowDay()
      },
      factoryNo: '', //分厂编号
      factoryName: '', //分厂名称
      searchForm: {
        factoryNo: '', //厂编号
        factoryCode: '',
        beginDate: getYearFirstDay(),
        endDate: getYearLastDay()
      },
      dangerSearchForm: {
        factoryNo: '', //产线
        workDeptNo: '', //车间
        fangerType: '', //类型
        fangerGrade: '', //级别 B\C
        beginDate: getYearFirstDay(), //开始日期
        endDate: getYearLastDay(), //结束日期
        isSubmit: '',
        isAplay: '',
        hndlStus: '', //隐患处理状态 A 新建 B 已提交 C 已申报 D 处理中 E 已完成
        pageIndex: 1,
        pageSize: 4
      },
      form: {
        businessUnitId: '',
        projectName: ''
      },
      workDeptForm: {
        workDeptNo: '',
        workDeptName: '车间',
        beginDate: getYearFirstDay(),
        endDate: getYearLastDay()
      },
      newWorkDeptList: [],
      newWorkDeptList2: [],
      // 表格假数据
      tableList: [
        {
          id: '1',
          FACTORYNAME: '',
          FACTORYNO: '',
          WORKDEPTNO: '1',
          WORKDEPTNAME: '原料车间',
          NOMAL: 5, //一般隐患
          BIGGER: 2, //较大隐患
          MAJOR: 1, //重大隐患
          TOTAL: 8, //总计
          DEAL: 10, //已处理
          NOTDEAL: 8 //未处理
        },
        {
          id: '2',
          FACTORYNAME: '',
          FACTORYNO: '',
          WORKDEPTNO: '2',
          WORKDEPTNAME: '转炉车间',
          NOMAL: 3,
          BIGGER: 1,
          MAJOR: 0,
          TOTAL: 4,
          DEAL: 7,
          NOTDEAL: 4
        },
        {
          id: '3',
          FACTORYNAME: '',
          FACTORYNO: '',
          WORKDEPTNO: '3',
          WORKDEPTNAME: '精炼车间',
          NOMAL: 6,
          BIGGER: 3,
          MAJOR: 1,
          TOTAL: 10,
          DEAL: 12,
          NOTDEAL: 10
        },
        {
          id: '4',
          FACTORYNAME: '',
          FACTORYNO: '',
          WORKDEPTNO: '4',
          WORKDEPTNAME: '连铸车间',
          NOMAL: 4,
          BIGGER: 2,
          MAJOR: 0,
          TOTAL: 6,
          DEAL: 9,
          NOTDEAL: 6
        },
        {
          id: '5',
          FACTORYNAME: '',
          FACTORYNO: '',
          WORKDEPTNO: '5',
          WORKDEPTNAME: '总计',
          NOMAL: 18,
          BIGGER: 8,
          MAJOR: 2,
          TOTAL: 28,
          DEAL: 38,
          NOTDEAL: 28
        }
      ],
      // 未处理隐患柱状图配置（假数据）
      lineOption1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          right: '3%',
          data: ['一般隐患', '较大隐患', '重大隐患'],
          textStyle: { fontSize: 12 }
        },
        grid: [
          {
            show: true,
            top: '16%',
            left: '3%',
            right: '3%',
            bottom: '4%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            // axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false }, //只隐藏 Y 轴线
            data: ['原料车间', '转炉车间', '精炼车间', '连铸车间']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: { lineStyle: { color: '#d4d7da' } }
          }
        ],
        series: [
          {
            name: '一般隐患',
            type: 'bar',
            barGap: 0.22,
            barWidth: 14,
            data: [5, 3, 6, 4],
            color: '#3391ff',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#606266'
                }
              }
            }
          },
          {
            name: '较大隐患',
            type: 'bar',
            barGap: 0.22,
            barWidth: 14,
            data: [2, 1, 3, 2],
            color: '#ff9800',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#606266'
                }
              }
            }
          },
          {
            name: '重大隐患',
            type: 'bar',
            barWidth: 14,
            barGap: 0.22,
            data: [1, 0, 1, 0],
            color: '#f45549',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#606266'
                }
              }
            }
          }
        ],
        dataZoom: []
      },
      // 自动、人工数据采集比例（假数据）
      lineOption2: {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:\n{c}条\n{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false
        },
        series: [
          {
            type: 'pie',
            radius: '90%',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#fff'
            },
            label: {
              formatter: '{b}\n{c}条',
              position: 'inside'
            },
            color: ['#3391ff', '#ff9800'],
            data: [
              { value: 600, name: '自动采集' },
              { value: 400, name: '人工采集' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      lineOption3: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          right: '3%',
          data: ['一般隐患', '较大隐患', '重大隐患'],
          textStyle: { fontSize: 12 },
          show: false
        },
        grid: [
          {
            show: true,
            top: '16%',
            left: '3%',
            right: '3%',
            bottom: '4%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#d4d7da'
              }
            },
            splitLine: {
              show: true,
              lineStyle: { color: '#d4d7da' }
            },
            data: ['机修车间', '电气车间', '精整车间', '产品车间']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: { lineStyle: { color: '#d4d7da' } }
          }
        ],
        series: [
          {
            name: '一般隐患',
            type: 'bar',
            barGap: 0.22,
            barWidth: 16,
            data: [6, 7, 8, 7],
            color: '#61A4E4',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#606266'
                }
              }
            }
          }
        ],
        dataZoom: []
      },
      // 各生产车间故障次数/隐患构成（假数据）
      lineOption4: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '40%',
            style: {
              text: '原料车间',
              textAlign: 'center',
              fill: '#AEAEB7',
              width: 30,
              height: 30,
              fontSize: 10,
              color: '#606266',
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '42%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 8, name: '隐患', color: '#FFA958' },
              { value: 5, name: '故障', color: '#61A4E4' }
            ]
          }
        ]
      },
      lineOption5: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '63%',
            style: {
              text: '转炉车间',
              textAlign: 'center',
              fill: '#AEAEB7',
              width: 30,
              height: 30,
              fontSize: 10,
              color: '#606266',
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 4, name: '隐患', color: '#FFA958' },
              { value: 3, name: '故障', color: '#61A4E4' }
            ]
          }
        ]
      },
      lineOption6: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '40%',
            style: {
              text: '精炼车间',
              textAlign: 'center',
              fill: '#AEAEB7',
              width: 30,
              height: 30,
              fontSize: 10,
              color: '#606266',
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '42%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 10, name: '隐患', color: '#FFA958' },
              { value: 6, name: '故障', color: '#61A4E4' }
            ]
          }
        ]
      },
      lineOption7: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          right: '5%',
          show: true,
          selectedMode: false
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '63%',
            style: {
              text: '连铸车间',
              textAlign: 'center',
              fill: '#AEAEB7',
              width: 30,
              height: 30,
              fontSize: 10,
              color: '#606266',
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 6, name: '隐患', color: '#FFA958' },
              { value: 4, name: '故障', color: '#61A4E4' }
            ]
          }
        ]
      },
      // 隐患事项表格假数据
      tableDataRisk: [
        {
          id: '1',
          obsStarTime: '2023-10-01 08:30:00',
          area: '传送带A区',
          dangerDesc: '传送带运行时有异响，可能存在轴承磨损问题'
        },
        {
          id: '2',
          obsStarTime: '2023-10-02 14:15:00',
          area: '熔炉B组',
          dangerDesc: '熔炉温度传感器显示异常，需校准'
        },
        {
          id: '3',
          obsStarTime: '2023-10-03 10:45:00',
          area: '冷却系统',
          dangerDesc: '冷却水管路存在轻微泄漏'
        },
        {
          id: '4',
          obsStarTime: '2023-10-04 16:20:00',
          area: '控制系统',
          dangerDesc: '操作台部分按钮反应迟缓'
        }
      ],
      total: 12, // 假数据总数
      fangerGradeList: [
        {
          id: 'A',
          name: '一般隐患'
        },
        {
          id: 'B',
          name: '较大隐患'
        },
        {
          id: 'C',
          name: '重大隐患'
        }
      ],
      factoryList: this.$store.getters['factory/getFactoryList'] || [],
      workDeptList: [
        {
          id: '1',
          name: '原料车间'
        },
        {
          id: '2',
          name: '转炉车间'
        },
        {
          id: '3',
          name: '精炼车间'
        },
        {
          id: '4',
          name: '连铸车间'
        },
        {
          id: '5',
          name: '运行车间'
        },
        {
          id: '6',
          name: '机修车间'
        },
        {
          id: '7',
          name: '电修车间'
        },
        {
          id: '8',
          name: '热处理车间'
        },
        {
          id: '9',
          name: '精整车间'
        },
        {
          id: '10',
          name: '产品车间'
        },
        {
          id: '11',
          name: '机加工车间'
        },
        {
          id: '12',
          name: '后道工序车间'
        },
        {
          id: '13',
          name: '渣处理车间'
        },
        {
          id: '14',
          name: '石灰车间'
        }
      ],
      dangerAndFailureList: [],
      // 隐患故障分布图数据
      dangerAndFailureOptionList: [
        {
          tooltip: { trigger: 'item' },
          legend: { selected: { 隐患: true, 故障: true }, show: false },
          graphic: [
            {
              type: 'text',
              left: '40%',
              top: '40%',
              style: {
                text: '原料车间',
                textAlign: 'center',
                fill: '#AEAEB7',
                width: 30,
                height: 30,
                fontSize: 10,
                color: '#606266',
                fontFamily: 'Microsoft YaHei'
              }
            }
          ],
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '42%'],
              color: ['#3391ff', '#ff9800'],
              labelLine: {
                show: false
              },
              data: [
                { value: 8, name: '隐患', color: '#ff9800', per: 61.5 },
                { value: 5, name: '故障', color: '#3391ff', per: 38.5 }
              ]
            }
          ]
        },
        {
          tooltip: { trigger: 'item' },
          legend: { selected: { 隐患: true, 故障: true }, show: false },
          graphic: [
            {
              type: 'text',
              left: '40%',
              top: '63%',
              style: {
                text: '转炉车间',
                textAlign: 'center',
                fill: '#AEAEB7',
                width: 30,
                height: 30,
                fontSize: 10,
                color: '#606266',
                fontFamily: 'Microsoft YaHei'
              }
            }
          ],
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '65%'],
              color: ['#3391ff', '#ff9800'],
              labelLine: {
                show: false
              },
              data: [
                { value: 4, name: '隐患', color: '#ff9800', per: 57.1 },
                { value: 3, name: '故障', color: '#3391ff', per: 42.9 }
              ]
            }
          ]
        },
        {
          tooltip: { trigger: 'item' },
          legend: { selected: { 隐患: true, 故障: true }, show: false },
          graphic: [
            {
              type: 'text',
              left: '40%',
              top: '40%',
              style: {
                text: '精炼车间',
                textAlign: 'center',
                fill: '#AEAEB7',
                width: 30,
                height: 30,
                fontSize: 10,
                color: '#606266',
                fontFamily: 'Microsoft YaHei'
              }
            }
          ],
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '42%'],
              color: ['#3391ff', '#ff9800'],
              labelLine: {
                show: false
              },
              data: [
                { value: 10, name: '隐患', color: '#ff9800', per: 62.5 },
                { value: 6, name: '故障', color: '#3391ff', per: 37.5 }
              ]
            }
          ]
        },
        {
          tooltip: { trigger: 'item' },
          legend: { selected: { 隐患: true, 故障: true }, show: false },
          graphic: [
            {
              type: 'text',
              left: '40%',
              top: '63%',
              style: {
                text: '连铸车间',
                textAlign: 'center',
                fill: '#AEAEB7',
                width: 30,
                height: 30,
                fontSize: 10,
                color: '#606266',
                fontFamily: 'Microsoft YaHei'
              }
            }
          ],
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '65%'],
              color: ['#3391ff', '#ff9800'],
              labelLine: {
                show: false
              },
              data: [
                { value: 6, name: '隐患', color: '#ff9800', per: 60 },
                { value: 4, name: '故障', color: '#3391ff', per: 40 }
              ]
            }
          ]
        }
      ],
      faultDangerType: '3',
      // 处置过程假数据
      workContentList: [
        {
          id: '1',
          creDate: '2023-10-01',
          creDateTime: '09:00',
          creUserNo: '张三',
          workContent: '发现隐患并上报'
        },
        {
          id: '2',
          creDate: '2023-10-01',
          creDateTime: '10:30',
          creUserNo: '李四',
          workContent: '安排维修人员处理'
        },
        {
          id: '3',
          creDate: '2023-10-01',
          creDateTime: '14:20',
          creUserNo: '王五',
          workContent: '已完成维修，设备正常运行'
        }
      ],
      dangerDesc:
        '传送带运行时有异响，经检查发现是轴承磨损导致，需要更换新轴承。',
      emergencyResponse:
        '1. 立即降低传送带运行速度；2. 安排维修人员准备备件；3. 停机维修前做好安全防护措施。',
      hndlType:
        '1. 更换磨损轴承；2. 对传送带进行全面检查；3. 加注润滑剂；4. 测试运行确认正常。',
      dialogVisible: false,
      testN: '',
      // 新增：自动/人工采集数据列表（假数据）
      manualAndAutoList: [
        { workDeptNo: '1', SYSTEMNUM: 520, ARTIFICIALNUM: 380 },
        { workDeptNo: '2', SYSTEMNUM: 480, ARTIFICIALNUM: 320 },
        { workDeptNo: '3', SYSTEMNUM: 650, ARTIFICIALNUM: 450 },
        { workDeptNo: '4', SYSTEMNUM: 420, ARTIFICIALNUM: 280 }
      ]
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.factoryNo !== from.query.factoryNo) {
        this.initData()
      }
    },
    faultDangerType(newValue) {
      switch (newValue) {
        case '0':
          this.dangerAndFailureOptionList.forEach(item => {
            item.legend = { selected: { 隐患: false, 故障: false } }
          })
          break
        case '1':
          this.dangerAndFailureOptionList.forEach(item => {
            item.legend = { selected: { 隐患: false, 故障: true } }
          })
          break
        case '2':
          this.dangerAndFailureOptionList.forEach(item => {
            item.legend = { selected: { 故障: false, 隐患: true } }
          })
          break
        case '3':
          this.dangerAndFailureOptionList.forEach(item => {
            item.legend = { selected: { 隐患: true, 故障: true } }
          })
          break
      }
    },
    workDeptForm: {
      handler: function() {
        const maal = this.manualAndAutoList.find(
          item => item.workDeptNo === this.workDeptForm.workDeptNo
        )
        if (maal) {
          this.lineOption2.series = [
            {
              type: 'pie',
              radius: '90%',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff'
              },
              label: {
                formatter: '{b}\n{c}条\n{d}%',
                position: 'inside'
              },
              data: [
                { value: maal.SYSTEMNUM, name: '自动采集' },
                { value: maal.ARTIFICIALNUM, name: '人工采集' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        } else {
          this.lineOption2.series = [
            {
              type: 'pie',
              radius: '90%',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff'
              },
              label: {
                formatter: '{b}\n{c}条\n{d}%',
                position: 'inside'
              },
              data: [
                { value: 0, name: '自动采集' },
                { value: 0, name: '人工采集' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    setCheckTime(val) {
      this.formTime.beginDate = val[0]
      this.formTime.endDate = val[1]
      // 注释接口调用，使用假数据刷新
      // this.queryAll()
      // this.queryNotDeal()
      // this.queryDangerInfo()
      // this.queryAllDangerSource()
      // this.queryAllDangerProportion()

      // 模拟数据刷新效果
      console.log('日期范围已变更', val)
    },
    initData() {
      let today = moment(new Date().getTime())
        .format('YYYY-MM-DD')
        .split('-')
      let year = today[0]
      let month = Number(today[1]) - 1
      if (month < 1) {
        month = 12
        year = Number(year) - 1
      }
      if (month < 10) {
        month = '0' + month.toString()
      }
      this.checkTime[0] = year.toString() + '-' + month.toString() + '-' + '26'
      if (Number(today[2]) > 25) {
        this.checkTime[1] = today[0] + '-' + today[1] + '-' + '25'
      } else {
        this.checkTime[1] = moment(new Date().getTime()).format('YYYY-MM-DD')
      }
      this.formTime.beginDate = this.checkTime[0]
      this.formTime.endDate = this.checkTime[1]
      this.factoryName = this.$route.query.factoryName || '示范工厂' // 默认工厂名称
      this.factoryNo = this.$route.query.factoryNo || 'F001' // 默认工厂编号
      this.formTime.factoryNo = this.factoryNo
      this.dangerSearchForm.factoryNo = this.factoryNo

      // 初始化车间列表数据
      this.newWorkDeptList2 = this.workDeptList.map(item => ({
        id: item.id,
        name: item.name
      }))

      // 注释掉接口调用相关代码
      // this.factoryList.forEach(item => {
      //   if (item.name === this.factoryName) {
      //     this.formTime.factoryNo = item.id
      //     this.formTime.factoryCode = item.orgCode
      //     this.dangerSearchForm.factoryNo = item.id
      //   }
      // })

      // 模拟接口调用后的初始化操作
      console.log('页面初始化完成，使用假数据展示')
    },
    // 以下为原有方法保留，不涉及接口调用
    departClick(row, type) {
      console.log('点击了表格数据', row, type)
    },
    columnClick(h, { column, $index }) {
      return h(
        'span',
        {
          style: { cursor: 'pointer' },
          on: {
            click: () => {
              console.log('点击了表头', column, $index)
            }
          }
        },
        column.label
      )
    },
    clickEchartsBusiness(params) {
      console.log('点击了隐患柱状图', params)
    },
    selectWorkDept(val) {
      console.log('选择了车间', val)
    },
    clickEchartsAuto(params) {
      console.log('点击了采集比例图', params)
    },
    clickFaultAndDanger(type) {
      this.faultDangerType = type
    },
    clickEchartsRisk(params) {
      console.log('点击了隐患故障分布图', params)
    },
    clickLegendSelectChanged(params) {
      console.log('图例选择变化', params)
    },
    clickDetail(row) {
      this.dialogVisible = true
      console.log('查看隐患详情', row)
    },
    pageSizeChange(val) {
      this.dangerSearchForm.pageSize = val
      console.log('每页条数变更为', val)
    },
    currentPageChange(val) {
      this.dangerSearchForm.pageIndex = val
      console.log('当前页码变更为', val)
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
//时间组件样式
/deep/.el-form.el-form--inline {
  height: 28px;
}
/deep/.el-input__inner {
  height: 28px;
}
/deep/.el-select__caret.el-input__icon.el-icon-arrow-up {
  height: 40px;
}
/deep/.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 283px;
}
//时间 至——
/deep/.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
  text-align: center;
  line-height: 20px;
  margin-top: 6px;
  font-size: 14px;
  width: 9%;
  color: #3a3f63;
}
//时间钟表
/deep/.el-date-editor .el-range__icon {
  font-size: 14px;
  margin-left: -5px;
  color: #dae0f2;
  float: left;
  line-height: 29px;
}
/deep/.el-range-editor.el-input__inner {
  display: inline-flex;
  align-items: center;
  padding: 0px 10px;
}
.CardTable {
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
  .formInputTime {
    float: right;
    height: 28px;
    margin-right: 50px;
  }
}
.headStyle {
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #606266;
}
//下划线
.textStyle {
  text-decoration: underline;
  cursor: pointer;
  color: #5db362 !important;
}
.textStyleLast {
  color: #606266;
}
//自动、人工数据采集比例----车间
.formInput {
  margin-top: 10px;
  margin-left: 20px;
}
//隐患事项
.TableWidth {
  width: 96%;
  position: relative;
  margin-left: 15px;
  margin-top: 24px;
}
//分页
.pagPath {
  margin-top: 14px;
  margin-left: 15px;
  margin-bottom: 7px;
}
//故障激活状态图例
.fault_and_danger_fault_active {
  background-color: #ffa958;
}
//隐患激活状态图例
.fault_and_danger_danger_active {
  background-color: #61a4e4;
}
//未激活状态图例
.fault_and_danger_not_active {
  background-color: #ccd0d9;
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
/deep/.el-dialog {
  padding: 0;
}
/* 分页选中项样式修改 */
::v-deep .el-pager li.active {
  color: #35a03b !important; /* 绿色文字 */
  //border-color: #42b983 !important; /* 绿色边框 */
}
</style>
