<template>
  <div class="contentBox">
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <el-form-item label="责任部门">
        <el-select
          v-model="form.dutyDepartmentId"
          clearable
          style="width: 140px"
          placeholder="请选择"
          @change="findDeviceByDepartID"
          @clear="clearDutyDepartmentId"
        >
          <el-option
            v-for="(item, index) in departmentList"
            :key="item.id + index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备">
        <el-select
          v-model="form.deviceId"
          style="width: 140px"
          clearable
          @clear="claerDeviceId"
        >
          <el-option
            v-for="(item, index) in deviceList"
            :key="item.id + index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监测项目">
        <el-input
          v-model="form.standardName"
          clearable
          style="width: 140px"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="合格情况">
        <el-select
          v-model="form.isPass"
          clearable
          style="width: 104px"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in isPassList"
            :key="item.id + index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测量人">
        <el-input
          v-model="form.measurer"
          clearable
          style="width: 140px"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="检测时间">
        <el-date-picker
          v-model="form.measureTime"
          type="datetimerange"
          align="right"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="选择日期"
          @change="setMeasureTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click=" findAll()"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-upload2"
          type="primary"
          @click="useExport()"
        >
          导出
        </el-button>
      </el-form-item>
      <el-form-item
        style="float: right"
      >
        <div><span style="color: #ff2855">注：</span>不合格-淡红色，重复测量-淡黄色</div>
      </el-form-item>
    </el-form>

    <el-card style="margin-top: 56px">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        :height="'calc(100vh - 320px)'"
        :fit="true"
        :row-key="getRowKey"
        :cell-style="changeRed"
        border
        style="width: 100%;"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChangeOther"
        @filter-change="filterChange"
      >
        <!-- <el-table-column
          for
          align="center"
          type="selection"
          width="55">
        </el-table-column>-->
        <el-table-column
          :reserve-selection="true"
          align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          fixed
          align="center"
          type="index"
          label="序号"
          width="50"
        >
          <template slot-scope="scope">
            <span>{{ comsys.tableRowIndex(scope.$index, pageIndex, pageSize) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productionLineName"
          label="单位"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productionLineAreaName"
          label="所属区域"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="dutyDepartmentName"
          label="责任部门"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceName"
          label="设备名称"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="itemName"
          label="控制项目"
          show-overflow-tooltip
          width="220"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="standardValue"
          label="标准值"
          show-overflow-tooltip
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="standardValueNeg"
          label="下公差"
          show-overflow-tooltip
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="standardValuePos"
          label="上公差"
          show-overflow-tooltip
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sunitName"
          label="计量单位"
          show-overflow-tooltip
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="measureType"
          label="测量手段"
          show-overflow-tooltip
          width="160"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="measureTime"
          label="测量时间"
          show-overflow-tooltip
          width="190"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="checkCycle"
          label="检查周期"
          show-overflow-tooltip
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="measureValue"
          label="实测值"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isPass"
          label="是否合格"
          show-overflow-tooltip
          width="110"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isPass">
              {{
                scope.row.isPass==='1'?'合格':scope.row.isPass==='0'?'不合格':''
              }}
            </div>
            <div v-else>
              {{ scope.row.isPass }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="cycleStartTime"
          label="本周期起始时间"
          show-overflow-tooltip
          width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="cycleEndTime"
          label="本周期结束时间"
          show-overflow-tooltip
          width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="personLiableName"
          label="责任人"
          show-overflow-tooltip
          width=""
        >
        </el-table-column>
        <el-table-column
          :filters="[{text: '是', value: '1'}, {text: '否', value: '0'}]"
          :filter-method="filterPlt"
          :filter-multiple="false"
          :column-key="'statsName'"
          align="center"
          prop="isBeyond"
          label="超期标识"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          type="remark"
          label="备注"
          width=""
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          prop=""
          show-overflow-tooltip
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="tendencyClick(scope.row)"
            >
              趋势
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="againEnter(scope.row)"
            >
              再次录入
            </el-button>
            <!--            <el-button
              size="mini"
              type="primary"
              @click="showHistory(scope.row)">历史记录</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!--    分页区域-->
      <el-pagination
        :total="total"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 200, 1000]"
        background
        align="right"
        class="foot"
        layout="total,prev, pager, next,sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--趋势图表弹窗-->
    <el-dialog
      :visible.sync="dialogVisibleAlarm"
      width="70%"
      title="历史数据"
      class="dialogClose"
      @close="getFormTimeEcharts"
    >
      <!--  报警趋势图-->
      <el-table
        ref="multipleTable1"
        :data="tableData1"
        :header-cell-style="{background:'#e2edf8'}"
        :fit="true"
        :row-key="getRowKey1"
        :cell-style="changeRed1"
        height="300px"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChangeOther1"
        @filter-change="filterChange1"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        >
          <template slot-scope="scope">
            <span>{{ comsys.tableRowIndex(scope.$index, pageIndex1, pageSize1) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,ind) in tableHeadInfo1"
          :key="ind"
          :prop="item.key"
          :label="item.parent"
          :width="item.width"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="item.key == 'isPass'">
              {{
                scope.row.isPass==='1'?'合格':scope.row.isPass==='0'?'不合格':''
              }}
            </div>
            <div v-else>
              {{ scope.row[item.key] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          type="remark"
          label="备注"
          width=""
        >
        </el-table-column>
      </el-table>

      <tasily-echarts
        :tooltip="lineOptionHis.tooltip"
        :grid="lineOptionHis.grid"
        :legend="lineOptionHis.legend"
        :x-axis="lineOptionHis.xAxis"
        :y-axis="lineOptionHis.yAxis"
        :series="lineOptionHis.series"
        :data-zoom="lineOptionHis.dataZoom"
        :_height="'305px'"
      />
    </el-dialog>
    <!--历史记录弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="历史记录"
      width="90%"
    >
      <!--      <tasily-echarts
        :tooltip="lineOptionHistory.tooltip"
        :grid="lineOptionHistory.grid"
        :legend="lineOptionHistory.legend"
        :x-axis="lineOptionHistory.xAxis"
        :y-axis="lineOptionHistory.yAxis"
        :series="lineOptionHistory.series"
        :data-zoom="lineOptionHistory.dataZoom"
        :_height="'305px'"/>-->
      <el-table
        ref="multipleTable"
        :data="dialogTableData"
        :height="'calc(100vh - 500px)'"
        :header-row-style="{height:'48px'}"
        :row-style="{height:'48px'}"
        tooltip-effect="dark"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          v-for="(item,ind) in tableHeadInfoHistory"
          :key="ind"
          :prop="item.key"
          :label="item.parent"
          :width="item.width"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--再次录入弹窗-->
    <el-dialog
      :visible.sync="dialogVisibleAgain"
      :before-close="handleCloseAgain"
      title="再次录入"
      width="40%"
    >
      <div style="height: 200px">
        <el-form
          :inline="true"
          :label-position="labelPosition"
          label-width="100px"
        >
          <el-form-item
            label="实测值"
          >
            <el-input
              v-model="formInlineAgain.measureValue"
              placeholder="请输入"
              style="width: 215px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标准值"
          >
            <el-input
              v-model="formInlineAgain.standardValue"
              placeholder="请输入"
              style="width: 215px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remark"
            style="margin-top: 20px"
          >
            <el-input
              v-model="formInlineAgain.remark"
              type="textarea"
              style="width: 545px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="margin-top: 20px;float: right"
          >
            <el-button @click="dialogVisibleAgain = false">
              取消
            </el-button>
            <el-button
              type="primary"
              @click="againConfirm"
            >
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { get, post } from '@/lib/Util'
import { date2md } from '@/utils/dateUtil'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
import {
  getBusinessUnitInfo,
  getProductionLineInfo,
  getProductionLineAreaInfo,
  getDutyDepartmentInfo,
  getDeviceInfo,
  findAreaByLineID,
  findDeviceByAreaID,
  findManagementItem,
  getMeasureTypeInfo,
  findDeviceByDepartID,
  iomPrecisionManagementController_trendAnalysis,
  exportCustomMItemData,
  exportCustomMItemData1,
  exportCustomMItemDataWithLine,
  findHistoryByStandardID,
  addNewItem,
  getProductionLineByDevice
} from '@/lib/EquipPrecisManage/ApiURL01'
import axios from 'axios'
export default {
  // layout: 'test',
  name: 'EquipPrecisManage-dataQuery',
  components: {
    tasilyEcharts
  },
  data() {
    return {
      userNo: this.$store.getters['user/getUserNo'] || '',
      userName: this.$store.getters['user/getUserName'] || '',
      /*---------历史记录---------*/
      dialogVisible: false,
      standardID: '', //历史记录传参参数
      lineOptionHistory: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          data: ['检修', '换辊', '设备故障', '生产故障', '轧机工作时间']
        },
        grid: [
          {
            show: false,
            top: '2%',
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#6d7882'
              }
            },
            splitLine: { show: false },
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8]
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
            type: 'line',
            data: [12, 16, 18, 10, 23, 33, 18, 12],
            smooth: true
          }
          /*{
            name: '换辊',
            type: 'line',
            data: [5, 6, 7, 8]
          },
          {
            name: '设备故障',
            type: 'line',
            data: [9, 10, 11, 12]
          },
          {
            name: '生产故障',
            type: 'line',
            data: [13, 14, 15, 16]
          },
          {
            name: '轧机工作时间',
            type: 'line',
            data: [17, 18, 19, 20]
          }*/
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
      },
      tableHeadInfoHistory: [
        {
          key: 'itemName',
          parent: '标准名称',
          width: ''
        },
        {
          key: 'businessName',
          parent: '事业部名称',
          width: ''
        },
        {
          key: 'dutyDepartmentName',
          parent: '车间',
          width: ''
        },
        {
          key: 'productionLineName',
          parent: '产线',
          width: ''
        },
        {
          key: 'productionLineAreaName',
          parent: '区域',
          width: ''
        },
        {
          key: 'deviceName',
          parent: '设备名称',
          width: ''
        },
        {
          key: 'measureType',
          parent: '测量类型',
          width: ''
        },
        //measureValue
        {
          key: 'measureValue',
          parent: '测量数值',
          width: ''
        },
        {
          key: 'checkCycle',
          parent: '测量周期',
          width: ''
        },
        {
          key: 'cycleUnit',
          parent: '测量周期单位',
          width: '70'
        },
        {
          key: 'totalScore',
          parent: '得分',
          width: ''
        },
        {
          key: 'measureTime',
          parent: '测量时间',
          width: ''
        },
        {
          key: 'measurer',
          parent: '测量人',
          width: ''
        },
        {
          key: 'standardValue',
          parent: '精度标准值',
          width: ''
        },
        {
          key: 'standardValuePos',
          parent: '精度标准上限',
          width: '70'
        },
        {
          key: 'standardValueNeg',
          parent: '精度标准下限',
          width: '70'
        }
      ],
      dialogTableData: [],
      /*---------再次录入---------*/
      dialogVisibleAgain: false,
      labelPosition: 'right',
      formInlineAgain: {
        measureValue: '',
        standardValue: '',
        remark: '',
        id: '',
        measurer: ''
      },
      /*---------其他---------*/
      params: {
        selectIDs: []
      },
      selectIDs: [], //按行导出传参
      isPassList: [{ id: '0', name: '不合格' }, { id: '1', name: '合格' }],
      newListArr: [],
      //趋势图表弹窗
      dialogVisibleAlarm: false,
      dialogDataAalarm: '',
      /*b趋势图表弹窗--时间*/
      formTrend: {
        time: ['', ''],
        standardId: ''
      },
      minData: '',
      maxData: '',
      lineOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          data: ['检修', '换辊', '设备故障', '生产故障', '轧机工作时间']
        },
        grid: [
          {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#6d7882'
              }
            },
            splitLine: { show: false },
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: '',
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
            type: 'line',
            data: [],
            smooth: true,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [
                {
                  yAxis: ''
                },
                {
                  yAxis: ''
                },
                {
                  yAxis: ''
                }
              ]
            }
          }
          /*{
            name: '换辊',
            type: 'line',
            data: [5, 6, 7, 8]
          },
          {
            name: '设备故障',
            type: 'line',
            data: [9, 10, 11, 12]
          },
          {
            name: '生产故障',
            type: 'line',
            data: [13, 14, 15, 16]
          },
          {
            name: '轧机工作时间',
            type: 'line',
            data: [17, 18, 19, 20]
          }*/
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            zoomOnMouseWheel: true
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
            zoomOnMouseWheel: true
          }
          /*  {
            type: 'inside',
            orient: 'vertical',
            zoomOnMouseWheel: true
          }*/
        ]
      },
      loading: false,
      time: ['', ''],
      form: {
        standardName: '',
        businessUnitId: '',
        productionLineId: '',
        measureTypeId: '',
        dutyDepartmentId: '',
        deviceId: '',
        pageSize: '',
        pageIndex: '',
        measureTime: ['', ''],
        isBeyond: '',
        /*新加*/
        isPass: '',
        personLiableName: '',
        measurer: '',
        personLiableID: '', //传空值

        productionLineAreaId: ''
      },
      tableData: [],
      businessList: [], //事业部
      productionList: [], //产线
      productionAreaList: [], //测量方式
      departmentList: [], //责任部门
      deviceList: [], //项目
      productionLineAreaIdList: [], //区域
      pageSize: 20,
      pageIndex: 1,
      total: 0,

      /*      pagination: {
        align: 'right',
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: 0
      } //分页查询*/
      selectCheckbox: [], //自定义导出接口参数names
      selectCheckboxCodes: [], //自定义导出接口参数codes
      nameCheckBox: '',
      codeCheckBox: '',
      /*弹窗历史数据*/
      loading1: false,
      pageSize1: 20,
      pageIndex1: 1,
      total1: 0,
      tableData1: [],
      tableHeadInfo1: [
        {
          key: 'productionLineName',
          parent: '单位',
          width: '120',
          checked: false
        },
        {
          key: 'productionLineAreaName',
          parent: '所属区域',
          width: '120',
          checked: false
        },
        {
          key: 'dutyDepartmentName',
          parent: '责任部门',
          width: '120px',
          checked: false
        },
        {
          key: 'deviceName',
          parent: '设备名称',
          width: '180',
          checked: false
        },
        {
          key: 'itemName',
          parent: '控制项目',
          width: '230',
          checked: false
        },
        {
          key: 'standardValue',
          parent: '标准值',
          width: '170',
          checked: false
        },
        {
          key: 'standardValueNeg',
          parent: '下公差',
          width: '110',
          checked: false
        },
        {
          key: 'standardValuePos',
          parent: '上公差',
          width: '110',
          checked: false
        },
        {
          key: 'sunitName',
          parent: '计量单位',
          width: '110',
          checked: false
        },
        {
          key: 'measureType',
          parent: '测量手段',
          width: '130',
          checked: false
        },
        {
          key: 'checkCycle',
          parent: '检查周期',
          width: '100',
          checked: false
        },
        {
          key: 'measureValue',
          parent: '实测值',
          width: '100',
          checked: false
        },
        {
          key: 'measureTime',
          parent: '测量时间',
          width: '190',
          checked: false
        },
        {
          key: 'measurer',
          parent: '测量人',
          width: '140',
          checked: false
        },
        {
          key: 'isPass',
          parent: '是否合格',
          width: '',
          checked: false
        }
      ],

      //新添加历史数据趋势
      lineOptionHis: {
        tooltip: {
          trigger: 'axis',
          // formatter(params) {
          //   let str = ''
          //   str += `<div>${params[0].name}</div>`
          //   for (let i = 0; i < params.length; i += 1) {
          //     str += `${params[i].marker} <span>${
          //       params[i].seriesName
          //     }</span> : <span>${params[i].data + '%'}</br>`
          //   }
          //   return str
          // },
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          data: []
        },
        grid: [
          {
            show: true,
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#6d7882'
              }
            },
            splitLine: {
              show: true,
              lineStyle: { color: '#d4d7da' }
            },
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            alignTicks: true,
            splitNumber: 5,
            // min: 0,
            // max: 10,
            name: '标准值',
            // axisLabel: { formatter: '{value}%' },
            axisLine: {
              show: false
            },
            splitLine: { lineStyle: { color: '#d4d7da' } }
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true,
            data: [],
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#FF9800', //改变折线点的颜色
                lineStyle: {
                  color: '#FF9800', //改变折线颜色
                  width: 3
                }
              }
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            // disabled: true,
            filterMode: 'none',
            start: 0,
            end: 100,
            height: 20,
            bottom: 0
          },
          {
            show: false,
            start: 0,
            end: 0,
            height: 20,
            bottom: 0
          }
        ]
      }
    }
  },
  watch: {
    // dialogVisibleAgain()
    dialogVisibleAgain(newData, oldData) {
      console.log('newData', newData)
      if (newData === false) {
        this.formInlineAgain = {
          measureValue: '',
          standardValue: '',
          remark: '',
          id: '',
          measurer: ''
        }
      }
    },
    deep: true
  },
  created() {
    this.findProductionLineArea()
  },
  mounted() {
    /* this.findAll()*/
  },
  methods: {
    /*根据合格与否改变行颜色*/
    changeRed({ row }) {
      if (row.isPass == '0') {
        return {
          backgroundColor: '#fef0f0'
          // 这个return的就是样式 可以是color 也可以是backgroundColor
        }
      }
      if (row.isRepeatItem == '1') {
        return {
          backgroundColor: '#FFFFCC'
        }
      }
    },
    /*再次录入*/
    againEnter(row) {
      console.log('再次录入row', row)
      this.dialogVisibleAgain = true
      this.formInlineAgain.id = row.id
      this.formInlineAgain.measurer = this.userName + '-' + this.userNo
    },
    againConfirm() {
      post(addNewItem, this.formInlineAgain).then(res => {
        if (res.success) {
          this.$message.success('录入成功！')
          this.dialogVisibleAgain = false
          this.formInlineAgain = {
            measureValue: '',
            standardValue: '',
            remark: '',
            id: '',
            measurer: ''
          }
        } else {
          this.$message.error('录入失败！')
          this.dialogVisibleAgain = true
        }
      })
    },
    /*历史记录*/
    showHistory(row) {
      this.dialogVisible = true
      console.log('历史记录row:', row)

      this.standardID = row.standardID
      post(findHistoryByStandardID, {
        standardID: this.standardID
      }).then(res => {
        if (res && res.success) {
          let xData = []
          let yData = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].measureTime) {
              res.data[i].measureTime = moment(res.data[i].measureTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
            xData.push(res.data[i].measureTime)
            yData.push(res.data[i].totalScore)
          }
          this.dialogTableData = res.data
          this.lineOptionHistory.xAxis[0].data = xData
          this.lineOptionHistory.series[0].data = yData
          // this.paginationDia.total = res.data.totalElements
        } else {
          this.$message.error('未查询到历史数据！')
          this.dialogTableData = []
          this.lineOptionHistory.xAxis[0].data = []
          this.lineOptionHistory.series[0].data = []
        }
      })
    },
    /*关闭历史弹窗*/
    handleClose() {
      this.dialogVisible = false
    },
    handleCloseAgain() {
      this.dialogVisibleAgain = false
      this.formInlineAgain = {
        measureValue: '',
        standardValue: '',
        remark: '',
        id: '',
        measurer: ''
      }
    },
    //趋势图表弹窗:render-header="renderHeader"
    async tendencyClick(val) {
      this.dialogVisibleAlarm = true
      this.dialogDataAalarm = val
      console.log('val-this.dialogDataAalarm：', val)
      await this.findTrend(val.standardValue)
    },
    //报警趋势图搜索
    async findTrend(standardValue) {
      let standardValue1 = Number(standardValue)
      console.log(standardValue1, 'standardValue1')
      let startTime = ''
      let endTime = ''
      if (this.formTrend.time == null) {
        startTime = moment(this.formTrend.time[0]).format('YYYY-MM-DD HH:mm:ss')
        endTime = moment(this.formTrend.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.lineOption.legend.data = []
      this.formTrend.standardId = this.dialogDataAalarm.standardID
      post(iomPrecisionManagementController_trendAnalysis, {
        pageSize: 10,
        pageIndex: 1,
        standardId: this.formTrend.standardId, //标准
        startTime: startTime,
        endTime: endTime
      }).then(res => {
        if (res.success === true) {
          let createTimeList1 = []
          if (res.data.createTimeList !== null) {
            res.data.createTimeList.forEach(item => {
              createTimeList1.push(moment(item).format('YYYY-MM-DD HH:mm:ss'))
            })
            console.log('createTimeList1', createTimeList1)
          }
          this.lineOption.xAxis[0].data = createTimeList1
          this.lineOption.series[0].data = res.data.valueList
          /*this.lineOption.series[0].data = res.data.scoreList*/
          this.lineOption.series[0].markLine.data[0].yAxis = standardValue1
          this.lineOption.series[0].markLine.data[1].yAxis =
            res.data.standardValueNeg != null
              ? Number(res.data.standardValueNeg)
              : ''

          this.lineOption.yAxis[0].min =
            res.data.standardValueNeg != null
              ? Number(res.data.standardValueNeg) + -2
              : -2
          this.lineOption.series[0].markLine.data[2].yAxis =
            res.data.standardValuePos != null
              ? Number(res.data.standardValuePos)
              : ''
          console.log(
            res.data.standardValueNeg,
            ' res.data.standardValueNeg ',
            '  res.data.standardValuePos',
            res.data.standardValuePos,
            this.lineOption.series[0].markLine,
            '图'
          )

          /*弹窗表格*/

          for (let i = 0; i < res.data.historyList.length; i++) {
            if (res.data.historyList[i].cycleEndTime != null) {
              res.data.historyList[i].cycleEndTime = moment(
                res.data.historyList[i].cycleEndTime
              ).format('YYYY-MM-DD')
            } else {
              res.data.historyList[i].cycleEndTime = ''
            }
            if (res.data.historyList[i].cycleStartTime != null) {
              res.data.historyList[i].cycleStartTime = moment(
                res.data.historyList[i].cycleStartTime
              ).format('YYYY-MM-DD')
            } else {
              res.data.historyList[i].cycleStartTime = ''
            }

            if (res.data.historyList[i].measureTime != null) {
              res.data.historyList[i].measureTime = moment(
                res.data.historyList[i].measureTime
              ).format('YYYY-MM-DD HH:mm:ss')
            } else {
              res.data.tlist[i].measureTime == ''
            }
            //超期标识
            res.data.historyList[i].isBeyond =
              res.data.historyList[i].isBeyond == 0
                ? '否'
                : res.data.historyList[i].isBeyond == 1
                  ? '是'
                  : ''
            //完成标记
            res.data.historyList[i].isFinish =
              res.data.historyList[i].isFinish == 0
                ? '否'
                : res.data.historyList[i].isFinish == 1
                  ? '是'
                  : ''
          }

          //console.log('数据', res)
          let xAxis = []
          let yAxis = []
          res.data.historyList.forEach((item, index) => {
            item.uuid = item.no
            xAxis.unshift(item.measureTime)
            yAxis.unshift(item.measureValue)
          })
          this.tableData1 = res.data.historyList

          this.lineOptionHis.series[0].data = yAxis
          this.lineOptionHis.xAxis[0].data = xAxis
        }
      })
    },
    echarts() {
      var myChart = echarts.init(document.getElementById('score'), 'light')
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { color: '#fff' },
            crossStyle: { color: '#6d7882' }
          }
        },
        legend: {
          data: []
        },
        grid: [
          {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#6d7882'
              }
            },
            splitLine: { show: false },
            boundaryGap: false,
            data: []
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
            type: 'line',
            data: [],
            smooth: true,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [
                {
                  yAxis: ''
                },
                {
                  yAxis: ''
                },
                {
                  yAxis: ''
                }
              ]
            }
          }
          /*{
            name: '换辊',
            type: 'line',
            data: [5, 6, 7, 8]
          },
          {
            name: '设备故障',
            type: 'line',
            data: [9, 10, 11, 12]
          },
          {
            name: '生产故障',
            type: 'line',
            data: [13, 14, 15, 16]
          },
          {
            name: '轧机工作时间',
            type: 'line',
            data: [17, 18, 19, 20]
          }*/
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
      }
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    //关闭弹窗趋势图表
    getFormTimeEcharts() {
      this.$set(this.formTrend.time, 0, '')
      this.$set(this.formTrend.time, 1, '')
    },
    // 保存表格数据被选后分页跳选仍能保存
    getRowKey(row) {
      return row.id
    },
    filterPlt(value, row) {
      // console.log('表头筛选value：', value)
      // console.log('row', row)
      return true
      // return row.score === value
    },
    //超期标识-表头筛选
    filterChange(obj) {
      const keys = Object.keys(obj)
      const values = Object.values(obj)
      let useDeptKeys = keys[0]
      let useDeptNum = values[0][0]
      console.log('useDeptKeys', useDeptKeys)
      console.log('useDeptNum', useDeptNum)
      if (useDeptKeys === 'statsName' && useDeptNum === '1') {
        this.form.isBeyond = useDeptNum
      } else if (useDeptKeys === 'statsName' && useDeptNum === '0') {
        this.form.isBeyond = useDeptNum = useDeptNum
      } else if (useDeptKeys === 'statsName' && useDeptNum === undefined) {
        useDeptNum = ''
        this.form.isBeyond = useDeptNum
      }
      this.pageIndex = 1
      this.pageSize = 20
      this.findAll()
    },
    handleSelectionChangeOther(val) {
      console.log('val-select:', val)
      if (val.length > 0) {
        val.forEach(item => {
          this.selectIDs.push(item.uuid)
        })
      } else {
        this.selectIDs = []
      }
      let selectIDsEnd = []
      /*selectIDsEnd = this.selectIDs.filter((item, index) => {
        return this.selectIDs.indexOf(item) === index
      })*/
      selectIDsEnd = [...new Set(this.selectIDs)]
      console.log('selectIDsEnd', selectIDsEnd)
      this.newListArr = selectIDsEnd
    },
    //导出
    useExport() {
      /*var url =
        'http://172.25.63.72:9100/iomPrecisionManagementController/exportMItemData.iom'
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '标准导出' + '.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象*/
      /*if (this.selectCheckbox.length > 0) {
        this.downloadFile()
      } else {
        this.downloadFileTwo()
      }*/
      this.params.selectIDs = []
      this.downloadFile()
      // this.downloadFileTwo()
    },
    //自定义导出post方法
    downloadFile() {
      let selectIDs = []
      selectIDs = JSON.parse(JSON.stringify(this.newListArr))
      /*post(exportCustomMItemDataWithLine, {
        selectIDs
      }).then(res => {
        let data = res
        if (!data) {
          return
        }
        const url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        let myDate = new Date()

        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '数据查询导出' + date2md(myDate) + '.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //下载完成移除元素
        window.URL.revokeObjectURL(url) //释放掉blob对象
      })*/
      this.params.selectIDs = selectIDs
      axios({
        method: 'post',
        url: exportCustomMItemDataWithLine,
        data: this.params,
        responseType: 'blob'
      }).then(res => {
        if (!res) {
          return
        }
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        const fileName = res.headers['content-disposition'].split('=')[1]
        let url = ''
        let isBlob = false
        const errMsg = '下载出错，文件数据无法识别!'
        let data = blob
        if (data instanceof Blob) {
          isBlob = true
          url = window.URL.createObjectURL(data)
        } else if (typeof data == 'string') {
          // base64编码
          url = data
        } else {
          this.$message.error(errMsg)
          return
        }

        if ('download' in document.createElement('a')) {
          // 非IE下载
          const tmpLink = document.createElement('a')
          tmpLink.download = fileName || ''
          tmpLink.style.display = 'none'
          tmpLink.href = url
          document.body.appendChild(tmpLink)
          tmpLink.click()
          window.URL.revokeObjectURL(tmpLink.href)
          document.body.removeChild(tmpLink)
        } else {
          // IE10+下载
          if (isBlob) {
            window.navigator.msSaveBlob(data, fileName)
          } else {
            console.log(errMsg)
            return
          }
        }
      })
      this.selectCheckbox = []
      this.$refs.multipleTable.clearSelection()
      this.selectIDs = []
      this.params.selectIDs = []
    },
    //自定义导出get方法
    downloadFileTwo() {
      let names = this.selectCheckbox.join()
      console.log('names', names)
      let codes = this.selectCheckboxCodes.join()
      console.log('codes', codes)
      var url =
        'http://172.25.63.72:9100/iomPrecisionManagementController/exportCustomMItemData1.iom'
      var urlfix = '?names=' + names + '&codes=' + codes
      url = url + urlfix
      // debugger
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '标准导出' + '.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象
      this.selectCheckbox = []
      this.selectCheckboxCodes = []
    },
    setMeasureTime() {
      /* if (this.time == null) {
        this.form.measureTime = ['', '']
      } else {
        this.form.measureTime = this.time
      }*/
    },
    clearMeasureTime() {
      /*if (this.time == null) {
        this.form.measureTime = ['', '']
      } else {
        this.form.measureTime = this.time
      }*/
      this.form.measureTime = ['', '']
    },

    /*清空区域*/
    claerProductionLineAreaId() {
      this.form.productionLineAreaId = ''
    },
    /*清空设备*/
    claerDeviceId() {
      this.form.deviceId = ''
    },

    /*清空责任部门*/
    clearDutyDepartmentId() {
      this.form.dutyDepartmentId = ''
      this.claerDeviceId()
      this.getclearDutyDepartmentIdtoDevice()
    },
    //清空责任部门后，如果产线字段存在，产线联动设备
    async getclearDutyDepartmentIdtoDevice() {
      if (this.form.productionLineId != '') {
        let res = await post(getProductionLineByDevice, {
          productionLineID: this.form.productionLineId
        })
        if (res.success) {
          this.deviceList = res.data
        }
      }
    },
    //搜索
    findAll() {
      // this.loading = true
      this.form.pageIndex = this.pageIndex
      this.form.pageSize = this.pageSize
      //传给后台的时间参数
      /* if (this.form.measureTime != '') {
        this.form.measureTime = moment(this.time).format('YYYY-MM-DD')
      }*/
      if (this.form.measureTime == null) {
        this.form.measureTime = ['', '']
      }
      console.log(this.form.measureTime, 'this.form.measureTime')
      post(findManagementItem, this.form)
        .then(res => {
          if (res.success === true) {
            for (let i = 0; i < res.data.tlist.length; i++) {
              res.data.tlist[i].cycleEndTime = moment(
                res.data.tlist[i].cycleEndTime
              ).format('YYYY-MM-DD')
              res.data.tlist[i].cycleStartTime = moment(
                res.data.tlist[i].cycleStartTime
              ).format('YYYY-MM-DD')

              if (res.data.tlist[i].measureTime != null) {
                /*res.data.tlist[i].measureTime = moment(
                  res.data.tlist[i].measureTime
                ).format('YYYY-MM-DD')*/
              } else {
                res.data.tlist[i].measureTime == ''
              }
              //超期标识
              res.data.tlist[i].isBeyond =
                res.data.tlist[i].isBeyond == 0
                  ? '否'
                  : res.data.tlist[i].isBeyond == 1
                    ? '是'
                    : ''
              //完成标记
              res.data.tlist[i].isFinish =
                res.data.tlist[i].isFinish == 0
                  ? '否'
                  : res.data.tlist[i].isFinish == 1
                    ? '是'
                    : ''
            }
            res.data.tlist.forEach((item, index) => {
              item.uuid = item.no
            })
            for (let i = 0; i < res.data.tlist.length; i++) {
              switch (res.data.tlist[i].cycleUnit) {
                case '0':
                  res.data.tlist[i].cycleUnit = '无'
                  break
                case '1':
                  res.data.tlist[i].cycleUnit = '班'
                  break
                case '2':
                  res.data.tlist[i].cycleUnit = '日'
                  break
                case '3':
                  res.data.tlist[i].cycleUnit = '周'
                  break
                case '4':
                  res.data.tlist[i].cycleUnit = '月'
                  break
                case '5':
                  res.data.tlist[i].cycleUnit = '年'
                  break
                default:
                  res.data.tlist[i].cycleUnit = '其他'
              }
              if (res.data.tlist[i].cycleUnit != '其他') {
                res.data.tlist[i].checkCycle =
                  '1次/' +
                  res.data.tlist[i].checkCycle +
                  res.data.tlist[i].cycleUnit
              } else if (res.data.tlist[i].cycleUnit == '其他') {
                res.data.tlist[i].checkCycle = res.data.tlist[i].cycleUnit
              }
            }
            this.tableData = res.data.tlist
            console.log('this.tableData', this.tableData)
            this.total = res.data.total
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //下拉框获取数据
    async findProductionLineArea() {
      //事业部
      let resB = await post(getBusinessUnitInfo, {})
      this.businessList = resB.data
      //产线
      let resP = await post(getProductionLineInfo, {})
      this.productionList = resP.data
      console.log(resP.data, 'resP.data产线')

      //测量方式
      let res = await post(getMeasureTypeInfo, {})
      this.productionAreaList = res.data
      // 责任部门
      let resD = await post(getDutyDepartmentInfo, {})
      this.departmentList = resD.data
      // 设备
      let resDc = await post(getDeviceInfo, {})
      this.deviceList = resDc.data
      this.findAll()
    },
    // 产线-测量方式、测量方式-设备联动
    async findAreaByLineID(value) {
      //产线联动设备
      let res = await post(getProductionLineByDevice, {
        productionLineID: value
      })
      if (res.success) {
        this.deviceList = res.data
      }

      /*产线-区域联动*/
      const { data: respA } = await post(findAreaByLineID, { lineID: value })

      this.productionLineAreaIdList = respA
      this.form.productionLineAreaId = ''
      /*   console.log(
        respA,
        this.productionLineAreaIdList,
        'respA 产线-测量方式、测量方式-设备联动'
      )*/
      //产线-责任部门联动
      const { data: respB } = await post(getDutyDepartmentInfo, {
        productionLineID: value
      })
      this.departmentList = respB
      this.form.dutyDepartmentId = ''
      this.form.deviceId = ''

      console.log(respA, respB)
    },
    //顶部表单根据责任部门查询-联动-设备
    async findDeviceByDepartID(value) {
      console.log('责任部门：', value)
      // this.standersParam.dutyDepartmentId = value
      // const { data: respB } = await post(
      //   findAllStandersWithNoPage,
      //   this.standersParam
      // )
      // this.standardList = respB
      const { data: respA } = await post(findDeviceByDepartID, {
        departID: value
      })
      console.log('责任部门：qingkong 返回', respA)
      this.deviceList = respA
    },
    async findDeviceByAreaID(value) {
      const { data: respA } = await post(findDeviceByAreaID, { areaID: value })
      this.deviceList = respA
    },
    //测量方式清楚选项后，设备下拉框数据显示全部的
    async findAllDevice() {
      // 设备
      let resDc = await post(getDeviceInfo, {})
      this.deviceList = resDc.data
    },
    //console.log(`每页 ${val} 条`)
    handleSizeChange(val) {
      this.pageSize = val
      this.form.pageSize = val
      this.findAll(1)
    },
    //console.log(`当前页: ${val}`)
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.pageIndex = val
      this.form.pageIndex = val
      this.findAll(val)
    },
    /*------------------弹窗---------------------*/
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.form.pageSize1 = val
      this.findAll1(1)
    },
    //console.log(`当前页: ${val}`)
    handleCurrentChange1(val) {
      this.$nextTick(() => {
        this.$refs.multipleTable1.bodyWrapper.scrollTop = 0
      })
      this.pageIndex1 = val
      this.form.pageIndex1 = val
      this.findAll1(val)
    },
    // 保存表格数据被选后分页跳选仍能保存
    getRowKey1(row) {
      return row.id
    },
    changeRed1({ row }) {
      if (row.isPass == '0') {
        return {
          backgroundColor: '#fef0f0'
          // 这个return的就是样式 可以是color 也可以是backgroundColor
        }
      }
    },
    //超期标识-表头筛选
    filterChange1(obj) {
      const keys = Object.keys(obj)
      const values = Object.values(obj)
      let useDeptKeys = keys[0]
      let useDeptNum = values[0][0]
      console.log('useDeptKeys', useDeptKeys)
      console.log('useDeptNum', useDeptNum)
      if (useDeptKeys === 'statsName' && useDeptNum === '1') {
        this.form.isBeyond = useDeptNum
        this.findAll()
      } else if (useDeptKeys === 'statsName' && useDeptNum === '0') {
        this.form.isBeyond = useDeptNum = useDeptNum
        this.findAll()
      } else if (useDeptKeys === 'statsName' && useDeptNum === undefined) {
        useDeptNum = ''
        this.form.isBeyond = useDeptNum
        this.findAll()
      }
    },
    handleSelectionChangeOther1(val) {
      console.log('val-select:', val)
      if (val.length > 0) {
        val.forEach(item => {
          this.selectIDs.push(item.uuid)
        })
      } else {
        this.selectIDs = []
      }
      let selectIDsEnd = []
      /*selectIDsEnd = this.selectIDs.filter((item, index) => {
        return this.selectIDs.indexOf(item) === index
      })*/
      selectIDsEnd = [...new Set(this.selectIDs)]
      console.log('selectIDsEnd', selectIDsEnd)
      this.newListArr = selectIDsEnd
    },
    findAll1() {
      this.loading1 = true
      /*  this.form.pageIndex = this.pageIndex1
      this.form.pageSize = this.pageSize1

      if (this.form.measureTime == null) {
        this.form.measureTime = ['', '']
      }*/

      post(findManagementItem, this.form)
        .then(res => {
          /*  if (res.success === true) {
            for (let i = 0; i < res.data.tlist.length; i++) {
              res.data.tlist[i].cycleEndTime = moment(
                res.data.tlist[i].cycleEndTime
              ).format('YYYY-MM-DD')
              res.data.tlist[i].cycleStartTime = moment(
                res.data.tlist[i].cycleStartTime
              ).format('YYYY-MM-DD')

              if (res.data.tlist[i].measureTime != null) {
                res.data.tlist[i].measureTime = moment(
                  res.data.tlist[i].measureTime
                ).format('YYYY-MM-DD')
              } else {
                res.data.tlist[i].measureTime == ''
              }
              //超期标识
              res.data.tlist[i].isBeyond =
                res.data.tlist[i].isBeyond == 0
                  ? '否'
                  : res.data.tlist[i].isBeyond == 1
                    ? '是'
                    : ''
              //完成标记
              res.data.tlist[i].isFinish =
                res.data.tlist[i].isFinish == 0
                  ? '否'
                  : res.data.tlist[i].isFinish == 1
                    ? '是'
                    : ''
            }
            res.data.tlist.forEach((item, index) => {
              item.uuid = item.no
            })
            this.tableData = res.data.tlist
            console.log('this.tableData', this.tableData)
            this.total = res.data.total
            this.loading1 = false
          }*/
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.contentBox {
  height: 100%;
  width: 100%;
  //padding: 16px 24px 24px 24px;
  overflow-x: auto;
  overflow-y: auto;
}
/deep/.el-form.el-form--inline {
  height: 36px;
}
/deep/.el-input__inner {
  height: 36px;
}
/deep/.el-select__caret.el-input__icon.el-icon-arrow-up {
  height: 40px;
}
.foot {
  margin-top: 20px;
  margin-bottom: 10px;
}
/*-----表格高度调整----*/
/deep/.el-table__row {
  height: 48px;
}
/deep/ tr {
  height: 48px;
}
/deep/.el-card__body {
  padding: 24px;
}
/deep/.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
  margin: 0;
  text-align: center;
  line-height: 28px;
  font-size: 14px;
  width: 5%;
  color: #3a3f63;
}
</style>
