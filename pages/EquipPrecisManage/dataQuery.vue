<template>
  <div
    class="contentBox">
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <!-- 移除事业部和产线选择框 -->

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
          style="width: 350px"
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
      <el-table
        ref="multipleTable1"
        :data="tableData1"
        :header-cell-style="{background:'#e0f6e3'}"
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

      <div style="margin-top: 15px">
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
      </div>
    </el-dialog>
    <!--历史记录弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="历史记录"
      width="90%"
    >
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
// import * as echarts from 'echarts'
// import { get, post } from '@/lib/Util'
// import { date2md } from '@/utils/dateUtil'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
// import {
//   getBusinessUnitInfo,
//   getProductionLineInfo,
//   getProductionLineAreaInfo,
//   getDutyDepartmentInfo,
//   getDeviceInfo,
//   findAreaByLineID,
//   findDeviceByAreaID,
//   findManagementItem,
//   getMeasureTypeInfo,
//   findDeviceByDepartID,
//   iomPrecisionManagementController_trendAnalysis,
//   exportCustomMItemData,
//   exportCustomMItemData1,
//   exportCustomMItemDataWithLine,
//   findHistoryByStandardID,
//   addNewItem,
//   getProductionLineByDevice
// } from '@/lib/ApiURL01'
// import axios from 'axios'
export default {
  // layout: 'test',
  name: 'EquipPrecisManage-dataQuery',
  components: {
    tasilyEcharts
  },
  data() {
    return {
      userNo: this.$store.getters['user/getUserNo'] || 'user123',
      userName: this.$store.getters['user/getUserName'] || '测试用户',
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
        ],
        dataZoom: []
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
            name: '标准值',
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
      },
      // 模拟系统工具对象
      comsys: {
        tableRowIndex: (index, pageIndex, pageSize) => {
          return (pageIndex - 1) * pageSize + index + 1
        }
      }
    }
  },
  watch: {
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
    // 生成模拟数据
    this.generateMockData()
  },
  mounted() {
    // 初始化表格数据
    this.findAll()
  },
  methods: {
    // 生成模拟数据
    generateMockData() {
      // 模拟责任部门数据
      this.departmentList = [
        { id: '1', name: '维修部' },
        { id: '2', name: '生产部' },
        { id: '3', name: '质检部' },
        { id: '4', name: '设备部' }
      ]

      // 模拟设备数据
      this.deviceList = [
        { id: '1', name: '轧机A1' },
        { id: '2', name: '轧机A2' },
        { id: '3', name: '磨床B1' },
        { id: '4', name: '车床C1' },
        { id: '5', name: '铣床D1' }
      ]
    },

    // 生成表格模拟数据
    generateTableData() {
      const data = []
      const departments = ['维修部', '生产部', '质检部', '设备部']
      const devices = ['轧机A1', '轧机A2', '磨床B1', '车床C1', '铣床D1']
      const items = [
        '厚度检测',
        '平行度检测',
        '垂直度检测',
        '硬度检测',
        '表面粗糙度'
      ]
      const measureTypes = ['人工测量', '自动检测', '激光测量', '超声波检测']
      const units = ['mm', '°', 'μm', 'N']

      for (let i = 0; i < this.pageSize; i++) {
        const id = (this.pageIndex - 1) * this.pageSize + i + 1
        const isPass = Math.random() > 0.3 ? '1' : '0'
        const isRepeat = Math.random() > 0.8 ? '1' : '0'
        const standardValue = (Math.random() * 100).toFixed(2)
        const measureValue = (
          parseFloat(standardValue) +
          (Math.random() * 10 - 5)
        ).toFixed(2)

        data.push({
          id: id.toString(),
          productionLineName: '板材车间',
          productionLineAreaName: `区域${Math.floor(Math.random() * 4) + 1}`,
          dutyDepartmentName:
            departments[Math.floor(Math.random() * departments.length)],
          deviceName: devices[Math.floor(Math.random() * devices.length)],
          itemName: items[Math.floor(Math.random() * items.length)],
          standardValue: standardValue,
          standardValueNeg: (parseFloat(standardValue) - 5).toFixed(2),
          standardValuePos: (parseFloat(standardValue) + 5).toFixed(2),
          sunitName: units[Math.floor(Math.random() * units.length)],
          measureType:
            measureTypes[Math.floor(Math.random() * measureTypes.length)],
          measureTime: moment()
            .subtract(Math.floor(Math.random() * 30), 'days')
            .format('YYYY-MM-DD HH:mm:ss'),
          checkCycle: `${Math.floor(Math.random() * 30) + 1}天`,
          measureValue: measureValue,
          isPass: isPass,
          cycleStartTime: moment()
            .subtract(30, 'days')
            .format('YYYY-MM-DD'),
          cycleEndTime: moment().format('YYYY-MM-DD'),
          personLiableName: `责任人${Math.floor(Math.random() * 10) + 1}`,
          isBeyond: Math.random() > 0.9 ? '1' : '0',
          remark: Math.random() > 0.7 ? '正常' : '',
          isRepeatItem: isRepeat,
          standardID: `STD${id}`
        })
      }

      return data
    },

    /*根据合格与否改变行颜色*/
    changeRed({ row }) {
      if (row.isPass == '0') {
        return {
          backgroundColor: '#fef0f0'
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
      this.formInlineAgain.standardValue = row.standardValue
      this.formInlineAgain.measurer = this.userName + '-' + this.userNo
    },
    againConfirm() {
      // 模拟提交成功
      this.$message.success('录入成功！')
      this.dialogVisibleAgain = false
      this.formInlineAgain = {
        measureValue: '',
        standardValue: '',
        remark: '',
        id: '',
        measurer: ''
      }
    },
    /*历史记录*/
    showHistory(row) {
      this.dialogVisible = true
      console.log('历史记录row:', row)

      this.standardID = row.standardID
      // 生成模拟历史数据
      this.dialogTableData = this.generateHistoryData(row)
    },
    /*生成历史记录模拟数据*/
    generateHistoryData(row) {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          ...row,
          id: `${row.id}_${i}`,
          measureTime: moment()
            .subtract(i + 1, 'weeks')
            .format('YYYY-MM-DD HH:mm:ss'),
          measureValue: (
            parseFloat(row.standardValue) +
            (Math.random() * 10 - 5)
          ).toFixed(2),
          isPass: Math.random() > 0.3 ? '1' : '0',
          totalScore: Math.floor(Math.random() * 20) + 80
        })
      }
      return data
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
    //趋势图表弹窗
    async tendencyClick(val) {
      this.dialogVisibleAlarm = true
      this.dialogDataAalarm = val
      console.log('val-this.dialogDataAalarm：', val)
      this.generateTrendData(val)
    },
    // 生成趋势图模拟数据
    generateTrendData(val) {
      const days = 30
      const xData = []
      const yData = []
      const tableData = []

      // 生成X轴和Y轴数据
      for (let i = days; i >= 0; i--) {
        const date = moment()
          .subtract(i, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
        xData.push(date)
        const value = (
          parseFloat(val.standardValue) +
          (Math.random() * 10 - 5)
        ).toFixed(2)
        yData.push(parseFloat(value))

        tableData.push({
          ...val,
          measureTime: date,
          measureValue: value,
          isPass:
            parseFloat(value) >= parseFloat(val.standardValueNeg) &&
            parseFloat(value) <= parseFloat(val.standardValuePos)
              ? '1'
              : '0'
        })
      }

      // 更新表格数据
      this.tableData1 = tableData

      // 更新图表数据
      this.lineOptionHis.xAxis[0].data = xData
      this.lineOptionHis.series[0].data = yData
      this.lineOptionHis.series[0].name = val.itemName
      this.lineOptionHis.legend.data = [val.itemName]
      this.lineOptionHis.yAxis[0].min = Math.min(...yData) - 2
      this.lineOptionHis.yAxis[0].max = Math.max(...yData) + 2
    },
    // 搜索
    findAll() {
      this.loading = true
      // 模拟API请求延迟
      setTimeout(() => {
        this.tableData = this.generateTableData()
        this.total = 200 // 模拟总数据量
        this.loading = false
      }, 500)
    },
    // 导出
    useExport() {
      this.$message.info('导出功能已触发')
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.findAll()
    },
    // 页码改变
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    // 清空责任部门
    clearDutyDepartmentId() {
      this.form.dutyDepartmentId = ''
      this.deviceList = this.generateMockData().deviceList
    },
    // 清空设备ID
    claerDeviceId() {
      this.form.deviceId = ''
    },
    // 根据部门查找设备
    findDeviceByDepartID(val) {
      // 模拟根据部门筛选设备
      const allDevices = [
        { id: '1', name: '轧机A1' },
        { id: '2', name: '轧机A2' },
        { id: '3', name: '磨床B1' },
        { id: '4', name: '车床C1' },
        { id: '5', name: '铣床D1' },
        { id: '6', name: '钻床E1' },
        { id: '7', name: '刨床F1' }
      ]

      // 根据不同部门ID返回不同的设备列表
      if (val === '1') {
        // 维修部
        this.deviceList = allDevices.filter(d => ['1', '2', '3'].includes(d.id))
      } else if (val === '2') {
        // 生产部
        this.deviceList = allDevices.filter(d => ['4', '5', '6'].includes(d.id))
      } else if (val === '3') {
        // 质检部
        this.deviceList = allDevices.filter(d => ['1', '3', '5'].includes(d.id))
      } else {
        // 设备部
        this.deviceList = allDevices
      }
    },
    // 设置测量时间
    setMeasureTime(val) {
      console.log('测量时间改变:', val)
    },
    // 趋势图关闭时回调
    getFormTimeEcharts() {
      console.log('趋势图弹窗关闭')
    },
    // 选择改变
    handleSelectionChangeOther(val) {
      console.log('选择改变:', val)
      this.selectIDs = val.map(item => item.id)
    },
    handleSelectionChangeOther1(val) {
      console.log('趋势表格选择改变:', val)
    },
    // 过滤改变
    filterChange(filters) {
      console.log('过滤改变:', filters)
    },
    filterChange1(filters) {
      console.log('趋势表格过滤改变:', filters)
    },
    // 超期标识过滤
    filterPlt(value, row) {
      return row.isBeyond === value
    },
    // 行键
    getRowKey(row) {
      return row.id
    },
    getRowKey1(row) {
      return row.id
    },
    // 查找区域（模拟）
    findProductionLineArea() {
      // 注释掉原接口调用，使用模拟数据
      console.log('查找区域数据（模拟）')
    }
  }
}
</script>

<style lang="less" scoped>
.contentBox {
  padding: 15px;
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
/deep/.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
  margin: 0;
  text-align: center;
  line-height: 28px;
  font-size: 14px;
  width: 8%;
  color: #3a3f63;
}
</style>
