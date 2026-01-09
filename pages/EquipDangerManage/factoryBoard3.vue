<template>
  <div class="contentBox">
    <el-card class="CardTable">
      <div style="margin-left: 20px">
        <span class="headStyle">{{ factoryName }}隐患跟踪统计表</span>
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
          <!--          <el-table-column
            :render-header="columnClick"
            prop="NOTDEAL"
            align="center"
            label="未处理"
            width="">
            <template slot-scope="scope">
              <div
                :class="[scope.row.NOTDEAL !== '' ? 'textStyle':'textStyleLast']"
                @click="departClick(scope.row,'NOTDEAL')">{{ scope.row.NOTDEAL }}</div>
            </template>
          </el-table-column>-->
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
              :_height="'357px'"
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
              :_height="'310px'"
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
          style="min-height: 370px; margin-bottom: 24px;"
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
                <div
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
                </div>
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
                :_height="'200px'"
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
          style="height: 370px"
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
import {
  findAllByTableId,
  findAllDangerHandleRecord,
  findAllDangerInfoList,
  queryAllDangerInfoByFactory,
  queryAllDangerProportionInfoByFactory,
  queryAllDangerSourceInfoByFactory,
  queryNotDealDangerInfoByFactory,
  queryWorkDeptInfo
} from '@/lib/EquipPrecisManage/RiskManageApi'
import { post } from '@/lib/Util'
import {
  getYearFirstDay,
  getYearLastDay,
  getNowDay,
  getMonthFirstDay,
  getLastFirstMonth,
  getYearFirstDayLast
} from '@/utils/dateUtil'
export default {
  // layout: 'test',
  name: 'FactoryBoard3',
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
      tableList: [
        {
          id: '5',
          FACTORYNAME: '',
          FACTORYNO: '', //生产厂
          WORKDEPTNO: '5', //车间
          WORKDEPTNAME: '总计',
          NOMAL: 0, //一般隐患
          BIGGER: 0, //较大隐患
          MAJOR: 0, //重大隐患
          TOTAL: 0, //总计
          DEAL: 0, //已处理
          NOTDEAL: 0 //未处理
        }
      ],
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
              /* lineStyle: {
                  color: 'red'
                }*/
            },
            splitLine: { lineStyle: { color: '#d4d7da' } }
          }
        ],
        series: [
          {
            name: '一般隐患',
            type: 'bar',
            barGap: 0.22,
            barWidth: 10,
            data: [8, 7, 2, 3, 0, 0, 4],
            color: '#61A4E4',
            //柱状图显示上方数字
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
            barWidth: 10,
            data: [9, 3, 6, 5, 0, 0, 6],
            color: '#FFA958',
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
            barWidth: 10,
            barGap: 0.22,
            data: [4, 7, 2, 2, 0, 0, 5],
            color: '#F56C6C',
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
        dataZoom: [
          /*  {
            show: true,
            realtime: true,
            start: 0,
            end: 10,
            zoomOnMouseWheel: false
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 10,
            zoomOnMouseWheel: false
          }*/
        ]
      }, //目前未处理隐患柱状图（车间）
      lineOption2: {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:\n{c}条\n{d}%' //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          //左上角饼状图显示按钮
          show: false
        },
        // color: ['#61A4E4', '#FFA958'], //自定义饼图颜色
        series: [
          {
            type: 'pie',
            radius: '90%',
            //设置白色间隙
            itemStyle: {
              borderWidth: 2,
              borderColor: '#fff'
            },
            //文字显示在饼状图内
            label: {
              formatter: '{b}\n{c}条',
              position: 'inside'
            },
            color: ['#61a4e4', '#FFA958'],
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
      }, //自动、人工数据采集比例
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
            //x轴字体倾斜
            // axisLabel: {
            //   rotate: 35
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
              /* lineStyle: {
                  color: 'red'
                }*/
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
            data: [
              {
                value: 6,
                itemStyle: {
                  color: '#FFA958'
                }
              },
              {
                value: 7,
                itemStyle: {
                  color: '#FFA958'
                }
              },
              8,
              7
              /*{
                value: 4,
                itemStyle: {
                  color: '#F56C6C'
                }
              }*/
            ],
            color: '#61A4E4',
            //柱状图显示上方数字
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
        dataZoom: [
          /*  {
            show: true,
            realtime: true,
            start: 0,
            end: 10,
            zoomOnMouseWheel: false
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 10,
            zoomOnMouseWheel: false
          }*/
        ]
      }, //绩效分评价
      /*--------各生产车间故障次数/隐患构成-----------*/
      lineOption4: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          show: false //右上角按钮显示
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '40%',
            style: {
              text: '机修车间',
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
            data: [{ value: 10, name: '隐患' }, { value: 6, name: '故障' }]
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
          show: false //右上角按钮显示
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '63%',
            style: {
              text: '电气车间',
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
            center: ['50%', '65%'], //移动环形图，圆心坐标（div中的%比例）
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
            data: [{ value: 10, name: '隐患' }, { value: 6, name: '故障' }]
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
          show: false //右上角按钮显示
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '40%',
            style: {
              text: '精整车间',
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
            data: [{ value: 10, name: '隐患' }, { value: 6, name: '故障' }]
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
          show: true, //右上角按钮显示
          selectedMode: false //是否允许点击
        },
        graphic: [
          {
            type: 'text',
            left: '40%',
            top: '63%',
            style: {
              text: '产品车间',
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
            data: [{ value: 10, name: '隐患' }, { value: 6, name: '故障' }]
          }
        ]
      },
      tableDataRisk: [], //隐患事项
      total: 0,
      //隐患级别列表
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
      factoryList: this.$store.getters['factory/getFactoryList'] || [], //产线
      //车间列表
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
      dangerAndFailureList: [], //隐患故障分布图
      dangerAndFailureOptionList: [], //隐患故障分布图
      faultDangerType: '3', //隐患故障图例类型
      workContentList: [], //处置过程跟踪
      dangerDesc: '', // 隐患情况说明
      emergencyResponse: '', //应急预案
      hndlType: '', //处置方法
      dialogVisible: false,
      testN: ''
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
              //设置白色间隙
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff'
              },
              //文字显示在饼状图内
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
              //设置白色间隙
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff'
              },
              //文字显示在饼状图内
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
  methods: {
    setCheckTime(val) {
      this.formTime.beginDate = val[0]
      this.formTime.endDate = val[1]
      this.queryAll()
      this.queryNotDeal()
      this.queryDangerInfo()
      this.queryAllDangerSource()
      this.queryAllDangerProportion()
    },
    initData() {
      // this.$set(this.checkTime, 0, this.formTime.beginDate)
      // this.$set(this.checkTime, 1, this.formTime.endDate)
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
      this.factoryName = this.$route.query.factoryName
      this.factoryNo = this.$route.query.factoryNo
      this.formTime.factoryNo = this.$route.query.factoryNo
      this.dangerSearchForm.factoryNo = this.$route.query.factoryNo
      this.factoryList.forEach(item => {
        if (item.name === this.factoryName) {
          this.formTime.factoryNo = item.id
          this.formTime.factoryCode = item.orgCode
          this.dangerSearchForm.factoryNo = item.id
          // switch (this.factoryName) {
          //   case '第一炼钢厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '原料车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '连铸车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '精炼车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '运行车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '转炉车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          //   case '中厚板卷厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '机修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '精整车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '电修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          //   case '宽厚板厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '机修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '精整车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '电修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '热处理车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          //   case '中板厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '机修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '精整车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '产品车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '电修车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          //   case '金石材料厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '渣处理车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '石灰车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          //   case '金润智能制造厂':
          //     this.tableList = [
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '机加工车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       },
          //       {
          //         FACTORYNO: item.factoryNo, //生产厂
          //         FACTORYCODE: item.FACTORYCODE,
          //         FACTORYNAME: item.factoryName,
          //         WORKDEPTNO: '', //车间
          //         WORKDEPTNAME: '后道工序车间',
          //         NOMAL: 0, //一般隐患
          //         BIGGER: 0, //较大隐患
          //         MAJOR: 0, //重大隐患
          //         TOTAL: 0, //总计
          //         DEAL: 0, //已处理
          //         NOTDEAL: 0 //未处理
          //       }
          //     ]
          //     break
          // }
        }
      })
      Promise.all([this.queryWorkDept(this.formTime.factoryCode, '1')]).then(
        () => {
          this.queryAll()
          this.queryNotDeal()
          this.queryDangerInfo()
          this.queryAllDangerSource()
          this.queryAllDangerProportion()
        }
      )

      // Promise.all([this.findSelect()]).then(() => {
      //   this.queryAll()
      //   this.queryNotDeal()
      //   this.queryDangerInfo()
      //   this.queryAllDangerSource()
      //   this.queryAllDangerProportion()
      // })
    },
    /*----分页-----*/
    pageSizeChange(val) {
      this.dangerSearchForm.pageSize = val
      this.queryDangerInfo()
    },
    currentPageChange(val) {
      this.dangerSearchForm.pageIndex = val
      this.queryDangerInfo()
    },
    handleClose: done => {
      done()
    },
    columnClick(h, { column, $index }) {
      return h('el-button', {
        props: {
          size: 'mini',
          type: 'text'
        },
        on: {
          click: _ => {
            this.projectTypeClick(column.property)
          }
        },
        domProps: {
          innerHTML: column.label
        }
      })
    },
    //表头跳转
    projectTypeClick(val) {
      this.$router.push({
        name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
        query: {
          type: val,
          beginDate: this.formTime.beginDate,
          endDate: this.formTime.endDate
        }
      })
    },
    //车间跳转
    departClick(value, type) {
      this.$router.push({
        name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
        query: {
          factoryNo: this.factoryNo,
          factoryName: this.factoryName,
          workDeptNo: value.WORKDEPTNO,
          workDeptName: value.WORKDEPTNAME,
          type: type,
          beginDate: this.formTime.beginDate,
          endDate: this.formTime.endDate
        }
      })
    },
    //隐患列表点击查看详情
    clickDetail(row) {
      console.log(row)
      this.dangerDesc = row.dangerDesc
      this.emergencyResponse = row.emergencyResponse
      this.hndlType = row.hndlType
      // {"dangerNo":"隐患编号"}
      let obj = {
        dangerNo: row.dangerNo
      }
      this.queryHandleRecord(obj)
      this.dialogVisible = true
    },
    //目前未处理隐患柱状图
    clickEchartsBusiness(params) {
      console.log('params', params)
      let workDeptNo = ''
      let workDeptName = ''
      // let factoryNo = ''
      let fangerGrade = ''
      // const fl = this.factoryList.find(item => item.name === params.data.name)
      // if (fl) factoryNo = fl.id
      const fgl = this.fangerGradeList.find(
        item => item.name === params.data.seriesName
      )
      if (fgl) fangerGrade = fgl.id
      const nwdl = this.newWorkDeptList.find(
        item => item.name === params.data.name
      )
      if (nwdl) {
        workDeptNo = nwdl.id
        workDeptName = nwdl.name
      }
      console.log(nwdl)
      if (params.data.name !== '') {
        this.$router.push({
          name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
          query: {
            type: 'NOTDEAL',
            factoryNo: this.factoryNo,
            factoryName: this.factoryName,
            workDeptNo: workDeptNo,
            workDeptName: workDeptName,
            fangerGrade: fangerGrade,
            beginDate: this.formTime.beginDate,
            endDate: this.formTime.endDate
          }
        })
      }
    },
    //自动、人工数据
    clickEchartsAuto(params) {
      console.log('params', params)
      if (params.data.name !== '') {
        this.$router.push({
          name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
          query: {
            type: 'NO',
            beginDate: this.formTime.beginDate,
            endDate: this.formTime.endDate
          }
        })
      }
    },
    //绩效分评价
    clickEchartsScore(val) {
      if (val.data.name !== '') {
        this.$router.push({
          name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
          query: {
            type: 'NO',
            beginDate: this.formTime.beginDate,
            endDate: this.formTime.endDate
          }
        })
      }
    },
    //点击故障隐患图例
    clickFaultAndDanger(type) {
      if (type === '1') {
        //故障1
        if (this.faultDangerType === '0') {
          //全不选->选故障
          this.faultDangerType = '1'
        } else if (this.faultDangerType === '1') {
          //仅故障->全不选
          this.faultDangerType = '0'
        } else if (this.faultDangerType === '2') {
          //仅隐患->全选
          this.faultDangerType = '3'
        } else if (this.faultDangerType === '3') {
          //全选->仅隐患
          this.faultDangerType = '2'
        }
      } else if (type === '2') {
        //隐患2
        if (this.faultDangerType === '0') {
          //全不选->选隐患
          this.faultDangerType = '2'
        } else if (this.faultDangerType === '1') {
          //仅故障->全选
          this.faultDangerType = '3'
        } else if (this.faultDangerType === '2') {
          //仅隐患->全不选
          this.faultDangerType = '0'
        } else if (this.faultDangerType === '3') {
          //全选->仅故障
          this.faultDangerType = '1'
        }
      }
    },
    //隐患构成
    clickEchartsRisk(params) {
      console.log('故障隐患', params)
      if (params.data.name === '故障') {
        this.$router.push({
          name: 'EquipDangerManage-InformatmManage-historyFaultInformation',
          query: {
            type: 'NO',
            beginDate: this.formTime.beginDate,
            endDate: this.formTime.endDate
            // factoryNo: this.summaryForm.factoryNo
          }
        })
      } else if (params.data.name === '隐患') {
        let workDeptName =
          params.echart._model.option.graphic[0].elements[0].style.text
        let workDeptNo = ''
        const nwdl = this.newWorkDeptList.find(
          item => item.name === workDeptName
        )
        if (nwdl) {
          workDeptNo = nwdl.id
          workDeptName = nwdl.name
        }
        this.$router.push({
          name: 'EquipDangerManage-InformatmManage-historyRiskInformation',
          query: {
            type: 'NO',
            factoryNo: this.factoryNo,
            factoryName: this.factoryName,
            workDeptNo: workDeptNo,
            workDeptName: workDeptName,
            beginDate: this.formTime.beginDate,
            endDate: this.formTime.endDate
          }
        })
      }
    },
    //监听点击图例事件
    clickLegendSelectChanged(val) {
      this.dangerAndFailureOptionList.forEach(item => {
        item.legend = {
          selected: val.data.selected
        }
      })
    },
    //车间
    selectWorkDept(value) {
      const wdl = this.newWorkDeptList2.find(item => item.id === value)
      if (wdl) {
        this.workDeptForm.workDeptName = wdl.name
      }
    },
    /*----------接口-----------*/
    //查询车间
    async queryWorkDept(orgCode, type) {
      const res = await post(queryWorkDeptInfo, { orgCode: orgCode })
      if (res.success) {
        let tempList = []
        res.data.forEach(item => {
          tempList.push({
            id: item.orgCode,
            name: item.orgAllName
          })
        })
        if (type === '1' || type === '3') {
          this.newWorkDeptList = []
          this.newWorkDeptList.push(...tempList)
          this.newWorkDeptList2 = this.newWorkDeptList
          this.newWorkDeptList2.unshift({
            id: '',
            name: '车间'
          })
          if (type === '3') {
            const nwdl = this.newWorkDeptList.find(
              item => item.id === this.userInfo.workDeptNo
            )
            if (nwdl) {
              this.formTime.workDeptNo = nwdl.id
              this.formTime.workDeptName = nwdl.name
            }
          }
          this.newWorkDeptList.forEach(item => {
            const tl = this.tableList.find(
              cell => cell.WORKDEPTNAME === item.name
            )
            if (tl) {
              tl.WORKDEPTNO = item.id
            }
          })
        }
      }
    },
    //下拉框获取数据
    async findSelect() {
      // 查询单位数据
      const { data: res } = await post(findAllByTableId, {
        tableId: 'FACTORY',
        col: '3',
        data: '3'
      })
      this.factoryList = []
      res.forEach(item => {
        this.factoryList.push({
          id: item.oneCol,
          name: item.twoCol
        })
      })
      this.factoryList.forEach(item => {
        if (item.name === this.factoryName) {
          this.formTime.factoryNo = item.id
          this.dangerSearchForm.factoryNo = item.id
        }
      })
    },
    //查询处置过程
    async queryHandleRecord(obj) {
      const res = await post(findAllDangerHandleRecord, obj)
      console.log(res)
      if (res.success) {
        //处置过程跟踪
        this.workContentList = res.data
      }
    },
    //查询隐患跟踪统计表
    async queryAll() {
      const res = await post(queryAllDangerInfoByFactory, this.formTime)
      console.log(res)
      if (res.success) {
        let totalNormal = 0
        let totalBigger = 0
        let totalMajor = 0
        let totalDeal = 0
        let totalNotDeal = 0
        let totalTotal = 0
        // this.tableList.forEach(item => {
        //   const info = res.data.find(
        //     cell => cell.WORKDEPTNO === item.WORKDEPTNO
        //   )
        //   if (info) {
        //     item.NOMAL = info.NOMAL === null ? 0 : info.NOMAL
        //     item.BIGGER = info.BIGGER === null ? 0 : info.BIGGER
        //     item.MAJOR = info.MAJOR === null ? 0 : info.MAJOR
        //     item.DEAL = info.DEAL === null ? 0 : info.DEAL
        //     item.NOTDEAL = info.NOTDEAL === null ? 0 : info.NOTDEAL
        //     item.TOTAL = info.TOTAL === null ? 0 : info.TOTAL
        //     totalNormal += parseInt(item.NOMAL)
        //     totalBigger += parseInt(item.BIGGER)
        //     totalMajor += parseInt(item.MAJOR)
        //     totalDeal += parseInt(item.DEAL)
        //     totalNotDeal += parseInt(item.NOTDEAL)
        //     totalTotal += parseInt(item.TOTAL)
        //   }
        // })
        res.data.forEach((item, index) => {
          if (item.NOMAL === null) item.NOMAL = 0
          if (item.BIGGER === null) item.BIGGER = 0
          if (item.MAJOR === null) item.MAJOR = 0
          if (item.DEAL === null) item.DEAL = 0
          if (item.NOTDEAL === null) item.NOTDEAL = 0
          if (item.TOTAL === null) item.TOTAL = 0
          totalNormal += parseInt(item.NOMAL)
          totalBigger += parseInt(item.BIGGER)
          totalMajor += parseInt(item.MAJOR)
          totalDeal += parseInt(item.DEAL)
          totalNotDeal += parseInt(item.NOTDEAL)
          totalTotal += parseInt(item.TOTAL)
          //判断车间名称
          const fl = this.newWorkDeptList.find(
            cell => cell.id === item.WORKDEPTNO
          )
          if (fl) {
            item.WORKDEPTNAME = fl.name
          } else {
            if (item.WORKDEPTNO === '2') {
              item.WORKDEPTNAME = '转炉车间'
            } else if (item.WORKDEPTNO === '11') {
              item.WORKDEPTNAME = '机加工车间'
            } else if (item.WORKDEPTNO === '12') {
              item.WORKDEPTNAME = '后道工序车间'
            } else {
              item.WORKDEPTNAME = item.WORKDEPTNO
            }
          }
          item.id = index
          item.FACTORYNAME = this.factoryName
          item.FACTORYNO = this.factoryNo
          // const tl = this.tableList.find(
          //   cell => cell.WORKDEPTNO === item.WORKDEPTNO
          // )
          // if (tl) {
          //   tl.NOMAL = item.NOMAL
          //   tl.BIGGER = item.BIGGER
          //   tl.MAJOR = item.MAJOR
          //   tl.DEAL = item.DEAL
          //   tl.NOTDEAL = item.NOTDEAL
          //   tl.TOTAL = item.TOTAL
          // }
        })
        this.tableList = res.data
        this.tableList.push({
          id: '99',
          FACTORYNAME: '生产厂',
          FACTORYNO: '3', //生产厂
          WORKDEPTNO: '', //车间
          WORKDEPTNAME: '合计',
          NOMAL: totalNormal, //一般隐患
          BIGGER: totalBigger, //较大隐患
          MAJOR: totalMajor, //重大隐患
          TOTAL: totalTotal, //总计
          DEAL: totalDeal, //已处理
          NOTDEAL: totalNotDeal //未处理
        })
      }
    },
    //查询未处理隐患数据
    async queryNotDeal() {
      const res = await post(queryNotDealDangerInfoByFactory, this.formTime)
      console.log(res)
      if (res.success) {
        let noDealList = []
        let totalNormal = 0
        let totalBigger = 0
        let totalMajor = 0
        console.log('newWorkList', this.newWorkDeptList)
        res.data.forEach(item => {
          item.NOMAL = item.NOMAL === null ? 0 : item.NOMAL
          item.BIGGER = item.BIGGER === null ? 0 : item.BIGGER
          item.MAJOR = item.MAJOR === null ? 0 : item.MAJOR
          totalNormal += parseInt(item.NOMAL)
          totalBigger += parseInt(item.BIGGER)
          totalMajor += parseInt(item.MAJOR)
          const fl = this.newWorkDeptList.find(
            cell => cell.id === item.WORKDEPTNO
          )
          if (fl) {
            item.WORKDEPTNAME = fl.name
            item.WORKDEPTNO = fl.id
          } else {
            //TODO 仅用于车间组织结构没有转炉车间、机加工车间、后道工序车间，临时处理
            if (item.WORKDEPTNO === '2') {
              item.WORKDEPTNAME = '转炉车间'
            } else if (item.WORKDEPTNO === '11') {
              item.WORKDEPTNAME = '机加工车间'
            } else if (item.WORKDEPTNO === '12') {
              item.WORKDEPTNAME = '后道工序车间'
            } else {
              item.WORKDEPTNAME = item.WORKDEPTNO
            }
          }
        })
        noDealList = res.data
        // // 目前未处理隐患数据-生产厂
        let xAxisData = []
        let seriesDataNormal = []
        let seriesDataBigger = []
        let seriesDataMajor = []
        noDealList.forEach(item => {
          xAxisData.push(item.WORKDEPTNAME)
          seriesDataNormal.push(item.NOMAL)
          seriesDataBigger.push(item.BIGGER)
          seriesDataMajor.push(item.MAJOR)
        })
        let xAxis1 = [
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
            data: xAxisData
          }
        ]
        let series1 = [
          {
            name: '一般隐患',
            type: 'bar',
            barGap: 0.22,
            barWidth: 13,
            data: seriesDataNormal,
            color: '#61A4E4',
            //柱状图显示上方数字
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
            barWidth: 13,
            data: seriesDataBigger,
            color: '#FFA958',
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
            barWidth: 13,
            barGap: 0.22,
            data: seriesDataMajor,
            color: '#F56C6C',
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
        ]
        this.lineOption1.xAxis = xAxis1
        this.lineOption1.series = series1
        console.log(this.lineOption1)
      }
    },
    // 查询故障/隐患构成分布
    async queryAllDangerSource() {
      const res = await post(queryAllDangerSourceInfoByFactory, this.formTime)
      console.log(res)
      this.dangerAndFailureList = []
      if (res.success) {
        let totalDANGERNUM = 0
        let totalFAILURENUM = 0
        res.data.forEach(item => {
          item.WORKDEPTNO = item.WORK_DEPT_NO
          item.DANGERNUM = item.DANGERNUM === null ? 0 : item.DANGERNUM
          item.FAILURENUM = item.FAILURENUM === null ? 0 : item.FAILURENUM
          let totalPer = item.DANGERNUM + item.FAILURENUM
          item.DANGERNUMPer =
            totalPer === 0 ? 0 : ((item.DANGERNUM * 100) / totalPer).toFixed(2)
          item.FAILURENUMPer =
            totalPer === 0 ? 0 : ((item.FAILURENUM * 100) / totalPer).toFixed(2)
          totalDANGERNUM += parseInt(item.DANGERNUM)
          totalFAILURENUM += parseInt(item.FAILURENUM)
          const fl = this.factoryList.find(cell => cell.id === item.FACTORY_NO)
          if (fl) {
            item.FACTORYNAME = fl.name
            item.FACTORYNO = fl.id
          }
          const wdl = this.newWorkDeptList.find(
            cell => cell.id === item.WORK_DEPT_NO
          )
          if (wdl) {
            item.WORKDEPTNAME = wdl.name
            item.WORKDEPTNO = wdl.id
          } else {
            //TODO 仅用于车间组织结构没有转炉车间、机加工车间、后道工序车间，临时处理
            if (item.WORK_DEPT_NO === '2') {
              item.WORKDEPTNAME = '转炉车间'
            } else if (item.WORK_DEPT_NO === '11') {
              item.WORKDEPTNAME = '机加工车间'
            } else if (item.WORK_DEPT_NO === '12') {
              item.WORKDEPTNAME = '后道工序车间'
            } else {
              item.WORKDEPTNAME = item.WORK_DEPT_NO
            }
          }
        })
        this.dangerAndFailureList = res.data
        // this.dangerAndFailureList.push({
        //   id: '7',
        //   WORKDEPTNAME: '合计',
        //   WORKDEPTNO: '3', //生产厂
        //   DANGERNUM: totalDANGERNUM, //隐患
        //   FAILURENUM: totalFAILURENUM //故障
        // })

        this.dangerAndFailureOptionList = []
        this.dangerAndFailureList.forEach((item, index) => {
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}:\n{c}条\n{d}%' //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
            },
            legend: {
              top: '5%',
              left: 'right',
              show: false
            },
            graphic: [
              {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                  text: item.WORKDEPTNAME,
                  textAlign: 'center',
                  fill: '#000000',
                  width: 30,
                  height: 30,
                  fontSize: 12,
                  fontFamily: 'Microsoft YaHei'
                }
              }
            ],
            series: [
              {
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                labelLine: {
                  length: 10,
                  length2: 5
                },
                label: {
                  show: false,
                  formatter: '{a|{b}}{abg|}\n{hr|}\n  {b|{c}条}  {per|{d}%}  ',
                  backgroundColor: '#F6F8FC',
                  borderColor: '#8C8D8E',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#6E7079',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#8C8D8E',
                      width: '100%',
                      borderWidth: 1,
                      height: 0
                    },
                    b: {
                      color: '#4C5058',
                      fontSize: 14,
                      fontWeight: 'bold',
                      lineHeight: 33
                    },
                    per: {
                      color: '#fff',
                      backgroundColor: '#4C5058',
                      padding: [3, 4],
                      borderRadius: 4
                    }
                  }
                },
                emphasis: {
                  label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                color: ['#61A4E4', '#FFA958'],
                data: [
                  {
                    value: item.DANGERNUM,
                    name: '隐患',
                    color: '#61A4E4',
                    per: item.DANGERNUMPer
                  },
                  {
                    value: item.FAILURENUM,
                    name: '故障',
                    color: '#FFA958',
                    per: item.FAILURENUMPer
                  }
                ]
              }
            ]
          }
          // if (
          //   this.dangerAndFailureList.length < 4 &&
          //   index === this.dangerAndFailureList.length - 1
          // ) {
          //   option.legend.show = true
          // } else if (index === 3) {
          //   option.legend.show = true
          // }
          this.dangerAndFailureOptionList.push(option)
        })
      }
    },
    // 查询自动、人工采集比例占比
    async queryAllDangerProportion() {
      const res = await post(
        queryAllDangerProportionInfoByFactory,
        this.formTime
      )
      console.log(res)
      if (res.success) {
        this.manualAndAutoList = []
        let totalARTIFICIALNUM = 0
        let totalSYSTEMNUM = 0
        res.data.forEach(item => {
          if (item.ARTIFICIALNUM === null) item.ARTIFICIALNUM = 0
          if (item.SYSTEMNUM === null) item.SYSTEMNUM = 0
          totalARTIFICIALNUM += parseInt(item.ARTIFICIALNUM)
          totalSYSTEMNUM += parseInt(item.SYSTEMNUM)
          const nwdl = this.newWorkDeptList.find(
            cell => cell.id === item.WORK_DEPT_NO
          )
          if (nwdl) {
            item.workDeptNo = nwdl.id
            item.workDeptName = nwdl.name
          }
        })
        this.manualAndAutoList = res.data
        this.manualAndAutoList.push({
          ARTIFICIALNUM: totalARTIFICIALNUM,
          SYSTEMNUM: totalSYSTEMNUM,
          WORK_DEPT_NO: '',
          workDeptNo: '',
          workDeptName: '车间'
        })
        let SYSTEMNUM = res.data.length > 0 ? res.data[0].SYSTEMNUM : 0
        let ARTIFICIALNUM = res.data.length > 0 ? res.data[0].ARTIFICIALNUM : 0
        this.lineOption2.series = [
          {
            type: 'pie',
            radius: '90%',
            //设置白色间隙
            itemStyle: {
              borderWidth: 2,
              borderColor: '#fff'
            },
            //文字显示在饼状图内
            label: {
              formatter: '{b}\n{c}条\n{d}%',
              position: 'inside'
            },
            data: [
              { value: totalSYSTEMNUM, name: '自动采集' },
              { value: totalARTIFICIALNUM, name: '人工采集' }
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
    //查询隐患明细
    async queryDangerInfo() {
      this.dangerSearchForm.beginDate = this.formTime.beginDate
      this.dangerSearchForm.endDate = this.formTime.endDate
      const res = await post(findAllDangerInfoList, this.dangerSearchForm)
      if (res.success) {
        res.data.tlist.forEach(item => {
          //产线
          const fl = this.factoryList.find(cell => cell.id === item.factoryNo)
          if (fl) item.factoryName = fl.name
        })
        this.tableDataRisk = res.data.tlist
        this.total = res.data.total
      }
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
  color: #409eff !important;
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
</style>
