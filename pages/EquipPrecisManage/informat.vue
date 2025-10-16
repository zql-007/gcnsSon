<template>
  <div
    class="contentBox"
    style="overflow-y: auto;"
  >
    <!--    form表单-->
    <el-row style="height: 36px">
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
      >
        <el-form-item label="检查项名称">
          <el-input
            v-model="form.itemName"
            clearable
            style="width: 150px"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="测量方式">
          <el-select
            v-model="form.measureTypeId"
            style="width: 175px"
            clearable
            @change="findDeviceByAreaID"
            @clear="findAllDevice"
          >
            <el-option
              v-for="item in measureTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任部门">
          <el-select
            v-model="form.dutyDepartmentId"
            clearable
            style="width: 118px"
            placeholder="请选择"
            @change="findDeviceByDepartID"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备">
          <el-select
            v-model="form.deviceId"
            clearable
            style="width: 160px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查周期">
          <el-select
            v-model="form.cycleUnit"
            clearable
            style="width: 100px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in circleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任人">
          <el-select
            v-model="formLable.personLiableID"
            multiple
            placeholder="责任人"
            style="width: 130px"
          >
            <el-option
              v-for="item in dutyPeopleList"
              :key="item.PERSON_LIABLE_NAME+'ren'"
              :label="item.PERSON_LIABLE_NAME"
              :value="item.PERSON_LIABLE_NAME"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="findAll"
          >
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="toggleSelection"
          >
            全部提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="margin-top: 15px">
      <div style="float: right"><span style="color: #ff2855">注：</span>临期-淡红色，正常-白色，下周期-淡绿色</div>
    </el-row>
    <el-card style="margin-top: 16px">
      <!--    table表格-->
      <el-form
        ref="tableDataFrom"
        :model="tableDataFrom"
      >
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableDataFrom.tableData"
          :row-style="rowStyle"
          :height="'calc(100vh - 340px)'"
          :row-key="getRowKey"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            :reserve-selection="true"
            type="selection"
            width="55"
          >
          </el-table-column>
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
            label="单位"
            show-overflow-tooltip
            prop="productionLineName"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="所属区域"
            show-overflow-tooltip
            prop="productionLineAreaName"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="责任部门"
            show-overflow-tooltip
            prop="dutyDepartmentName"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="设备名称"
            show-overflow-tooltip
            prop="deviceName"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="控制项目"
            show-overflow-tooltip
            prop="itemName"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            prop="standardValue"
            label=" 标准值"
          >
            <template slot-scope="scope">
              <el-input
                v-if="!editDisabled"
                v-model="scope.row.standardValue"
                :disabled="editDisabled"
                type="text"
              >
              </el-input>
              <div v-else>
                {{ scope.row.standardValue }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下公差"
            show-overflow-tooltip
            prop="standardValueNeg"
            width="150"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.standardValueNeg }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="上公差"
            show-overflow-tooltip
            prop="standardValuePos"
            width="150"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.standardValuePos }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="计量单位"
            show-overflow-tooltip
            prop="sunitName"
            width="80"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="测量手段"
            show-overflow-tooltip
            prop="measureType"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="检查周期"
            show-overflow-tooltip
            prop="checkCycle"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="测量值"
            width="150"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.' + scope.$index + '.measureValue'"
              >
                <el-input
                  v-model="scope.row.measureValue"
                  :controls="false"
                  type="number"
                  clearable
                  placeholder="请输入数值"
                  @change="blurInput(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="本周期起始时间"
            prop="cycleStartTime"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="本周期结束时间"
            prop="cycleEndTime"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            :filters="level"
            :filter-method="filterTag"
            align="center"
            label="责任人"
            prop="personLiableName"
            width=""
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            prop=""
            show-overflow-tooltip
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="submit(scope.row)"
              >
                提交
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-pagination
        :total="form.total"
        :pager-count="5"
        :page-size="form.pageSize"
        :current-page="form.pageIndex"
        :page-sizes="[10, 20, 30, 200, 1000]"
        background
        class="foot"
        align="right"
        layout="total,prev, pager, next,sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--趋势图表弹窗-->
    <el-dialog
      :visible.sync="dialogVisibleAlarm"
      width="60%"
      class="dialogClose"
      @close="getFormTimeEcharts"
    >
      <div>
        <el-card>
          <div>
            <el-row>
              <h4 style="display: inline-block;width: 120px">
                趋势图表
              </h4>
              <el-form
                :inline="true"
                :model="formTrend"
                style="float: right;"
              >
                <el-form-item>
                  <el-date-picker
                    v-model="formTrend.time"
                    :clearable="false"
                    type="datetimerange"
                    align="right"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="findTrend()"
                  >
                    搜索
                  </el-button>
                </el-form-item>
              </el-form>
            </el-row>
          </div>
          <tasily-echarts
            :tooltip="lineOption.tooltip"
            :grid="lineOption.grid"
            :legend="lineOption.legend"
            :x-axis="lineOption.xAxis"
            :y-axis="lineOption.yAxis"
            :series="lineOption.series"
            :data-zoom="lineOption.dataZoom"
            :_height="'350px'"
          />
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { get, post } from '@/lib/Util'
// import UserSelect2 from '@/components/business/userSelect2'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
// import {
//   getBusinessUnitInfo,
//   getProductionLineInfo,
//   getProductionLineAreaInfo,
//   getDutyDepartmentInfo,
//   getMeasureTypeInfo,
//   findManagementItemList,
//   findManagementItem,
//   findAllStanders,
//   iomPrecisionManagementController_doUpdateMItem,
//   getDeviceInfo,
//   findAreaByLineID,
//   findDeviceByAreaID,
//   iomPrecisionManagementController_doBatchSaveMItem,
//   findDeviceByDepartID,
//   iomPrecisionManagementController_trendAnalysis
// } from '@/lib/ApiURL01'
export default {
  name: 'EquipPrecisManage-informat',
  components: {
    tasilyEcharts
    // UserSelect2
  },
  data() {
    return {
      formLable: {
        personLiableID: []
      },
      dutyPeopleList: [
        { PERSON_LIABLE_NAME: '张三' },
        { PERSON_LIABLE_NAME: '李四' },
        { PERSON_LIABLE_NAME: '王五' },
        { PERSON_LIABLE_NAME: '赵六' }
      ], //责任人
      userNameId: '', //用于存放‘016452|马洪浩|15895851362’数据格式
      //单项提交参数
      subOB: {
        id: '',
        measureValue: '',
        standardValue: '',
        measurer: '',
        isPass: 1
      },
      checkStandardUp: '', //校验规则最大值
      checkStandardDown: '', //校验规则最小值
      loading: false,
      dialogDataAalarm: '',
      userNo: this.$store.getters['user/getUserNo'],
      userInfo: this.$store.getters['user/getUserInfo'] || {},
      level: [],
      form: {
        itemName: '',
        // 移除事业部和产线相关字段
        measureTypeId: '',
        dutyDepartmentId: '',
        deviceId: '',
        cycleUnit: '',
        pageSize: 20,
        pageIndex: 1,
        status: 0,
        isFinish: 0,
        personLiableName: '',
        total: 0
      },
      formInline: {
        user: '',
        region: ''
      },
      businessList: [], //事业部
      productionList: [], //产线
      productionAreaList: [], //区域
      departmentList: [], //责任部门
      //测量方式
      measureTypeList: [],
      //检查周期
      circleList: [
        { id: 0, name: '无' },
        { id: 1, name: '班' },
        { id: 2, name: '日' },
        { id: 3, name: '周' },
        { id: 4, name: '月' },
        { id: 5, name: '年' },
        { id: 6, name: '其他' }
      ],
      tableDataFrom: {
        tableData: [] //表格显示的数据
      },
      tableHeadInfo: [
        {
          key: 'productionLineName',
          parent: '单位',
          width: '120px'
        },
        {
          key: 'productionLineAreaName',
          parent: ' 所属区域',
          width: '120px'
        },

        {
          key: 'dutyDepartmentName',
          parent: '责任部门',
          width: '120px'
        },

        {
          key: 'deviceName',
          parent: ' 设备名称',
          width: '150px'
        },

        {
          key: 'itemName',
          parent: '控制项目',
          width: '160px'
        },

        {
          key: 'standardValue',
          parent: ' 标准值',
          width: '120px'
        },
        {
          key: 'standardValueNeg',
          parent: '下公差',
          width: '80px'
        },
        {
          key: 'standardValuePos',
          parent: '上公差',
          width: '80px'
        },
        {
          key: 'sunitName',
          parent: '计量单位',
          width: '80px'
        },
        {
          key: 'measureType',
          parent: '测量手段',
          width: '150px'
        },

        {
          key: 'checkCycle',
          parent: '检查周期',
          width: '100px'
        }
      ],
      submitContent: [
        {
          measurer: '',
          measure_value: '',
          date: ''
        }
      ],
      multipleSelection: [], //存储多选数据的条数
      deleteData: [],
      editDisabled: false,
      deviceList: [],
      doBatch: { mList: [] }, //存储全部提交传的参数
      pageSize: 20,
      pageIndex: 1,
      total: 0,
      //趋势图表弹窗
      dialogVisibleAlarm: false,
      /*b趋势图表弹窗--时间*/
      formTrend: {
        time: ['', ''],
        standardId: ''
      },
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
          data: ['测量值趋势']
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
            smooth: true
          }
        ],
        dataZoom: []
      }
    }
  },
  created() {
    // 使用假数据初始化下拉列表
    this.initFakeData()
  },
  mounted() {
    this.findAll()
  },
  methods: {
    // 初始化假数据
    initFakeData() {
      // 责任部门假数据
      this.departmentList = [
        { id: 1, name: '设备部' },
        { id: 2, name: '生产部' },
        { id: 3, name: '质检部' },
        { id: 4, name: '技术部' }
      ]

      // 测量方式假数据
      this.measureTypeList = [
        { id: 1, name: '人工测量' },
        { id: 2, name: '自动采集' },
        { id: 3, name: '红外检测' },
        { id: 4, name: '激光测量' }
      ]

      // 设备假数据
      this.deviceList = [
        { id: 1, name: '轧机A' },
        { id: 2, name: '轧机B' },
        { id: 3, name: '切割机A' },
        { id: 4, name: '切割机B' },
        { id: 5, name: '成型机' }
      ]

      // 区域假数据
      this.productionAreaList = [
        { id: 1, name: '热轧区' },
        { id: 2, name: '冷轧区' },
        { id: 3, name: '成型区' },
        { id: 4, name: '检验区' }
      ]
    },

    handleRowClick(row, column, event) {
      /*if (this.isNumeric(row.standardValue)) {
        this.editDisabled = true
      } else {
        this.editDisabled = false
      }*/
    },
    changeCharterUser(value) {
      console.log('责任人value:', value)
      this.userNameId = value
      let num1 = value.split('|')
      console.log('num1[1]', num1[1])
      this.form.personLiableName = num1[1]
    },
    //趋势图表弹窗
    async tendencyClick(val) {
      this.dialogVisibleAlarm = true
      this.dialogDataAalarm = val
      console.log('val-this.dialogDataAalarm：', val)
      await this.findTrend()
    },
    //报警趋势图搜索
    async findTrend() {
      // 模拟接口返回的假数据
      const mockData = {
        success: true,
        data: {
          createTimeList: [
            '2023-10-01 08:00:00',
            '2023-10-02 08:00:00',
            '2023-10-03 08:00:00',
            '2023-10-04 08:00:00',
            '2023-10-05 08:00:00',
            '2023-10-06 08:00:00',
            '2023-10-07 08:00:00'
          ],
          scoreList: [12.5, 13.2, 12.8, 13.5, 13.1, 12.9, 13.3]
        }
      }

      let createTimeList1 = []
      if (mockData.data.createTimeList !== null) {
        mockData.data.createTimeList.forEach(item => {
          createTimeList1.push(moment(item).format('YYYY-MM-DD HH:mm:ss'))
        })
      }
      this.lineOption.xAxis[0].data = createTimeList1
      this.lineOption.series[0].data = mockData.data.scoreList
    },
    //关闭弹窗趋势图表
    getFormTimeEcharts() {
      this.$set(this.formTrend.time, 0, '')
      this.$set(this.formTrend.time, 1, '')
    },
    blurInput(row) {},
    //搜索
    findAll() {
      this.form.pageIndex = 1
      this.findAllNew()
    },
    async findAllNew() {
      // 生成表格假数据
      const mockTableData = []
      const totalCount = 50 // 总数据量
      this.form.total = totalCount

      // 计算当前页数据
      const startIndex = (this.form.pageIndex - 1) * this.form.pageSize
      const endIndex = Math.min(startIndex + this.form.pageSize, totalCount)

      for (let i = startIndex; i < endIndex; i++) {
        // 随机生成数据
        const isAdvent = Math.random() > 0.7 ? '1' : '0' // 30%概率临期
        const cycleUnit = Math.floor(Math.random() * 6) + 1
        let cycleText = ''
        switch (cycleUnit) {
          case 1:
            cycleText = '班'
            break
          case 2:
            cycleText = '日'
            break
          case 3:
            cycleText = '周'
            break
          case 4:
            cycleText = '月'
            break
          case 5:
            cycleText = '年'
            break
          default:
            cycleText = '其他'
        }

        mockTableData.push({
          id: i + 1,
          productionLineName: `生产线${Math.floor(Math.random() * 3) + 1}`,
          productionLineAreaName: this.productionAreaList[
            Math.floor(Math.random() * this.productionAreaList.length)
          ].name,
          dutyDepartmentName: this.departmentList[
            Math.floor(Math.random() * this.departmentList.length)
          ].name,
          deviceName: this.deviceList[
            Math.floor(Math.random() * this.deviceList.length)
          ].name,
          itemName: `控制项目${i + 1}`,
          standardValue: (Math.random() * 100).toFixed(2),
          standardValueNeg: (Math.random() * 5).toFixed(2),
          standardValuePos: (Math.random() * 5).toFixed(2),
          sunitName: 'mm',
          measureType: this.measureTypeList[
            Math.floor(Math.random() * this.measureTypeList.length)
          ].name,
          checkCycle: `1次/${Math.floor(Math.random() * 30) + 1}${cycleText}`,
          cycleUnit: cycleUnit,
          measureValue: '',
          cycleStartTime: moment()
            .subtract(Math.floor(Math.random() * 7), 'days')
            .format('YYYY-MM-DD'),
          cycleEndTime: moment()
            .add(Math.floor(Math.random() * 7), 'days')
            .format('YYYY-MM-DD'),
          personLiableName: `责任人${Math.floor(Math.random() * 10) + 1}`,
          measurer: this.userInfo.userName
            ? `${this.userInfo.userName}-${this.userInfo.userNo}`
            : '测试人员-001',
          isAdvent: isAdvent
        })
      }

      this.tableDataFrom.tableData = mockTableData

      // 处理责任人筛选数据
      const levelData = [
        ...new Set(
          mockTableData.map(item => ({
            text: item.personLiableName,
            value: item.personLiableName
          }))
        )
      ]
      this.level = levelData
    },
    filterTag(value, row) {
      return row.personLiableName === value
    },
    // 保存表格数据被选后分页跳选仍能保存
    getRowKey(row) {
      return row.id
    },
    //修改表格底色
    rowStyle({ row, rowIndex }) {
      let styleRed = {
        'background-color': '#fef0f0'
      }
      let styleGreen = {
        'background-color': '#CCFFCC'
      }
      const newDate = moment(new Date().getTime()).format('YYYY-MM-DD')
      const startTime = row.cycleStartTime
      const endTime = row.cycleEndTime

      if (row.isAdvent == '1') {
        return styleRed
      } else if (newDate < startTime || newDate > endTime) {
        return styleGreen
      } else {
        return {}
      }
    },
    // 产线-区域、区域-设备联动（使用假数据）
    async findAreaByLineID(value) {
      // 模拟接口返回，使用假数据
      this.productionAreaList = [
        { id: 1, name: '区域A' },
        { id: 2, name: '区域B' },
        { id: 3, name: '区域C' }
      ]

      this.departmentList = [
        { id: 1, name: '责任部门A' },
        { id: 2, name: '责任部门B' }
      ]
    },
    //顶部表单根据责任部门查询-联动-设备（使用假数据）
    async findDeviceByDepartID(value) {
      // 模拟接口返回，使用假数据
      this.deviceList = [
        { id: 1, name: '设备A' },
        { id: 2, name: '设备B' },
        { id: 3, name: '设备C' }
      ]
    },
    async findDeviceByAreaID(value) {
      // 模拟接口返回，使用假数据
      this.deviceList = [
        { id: 4, name: '区域设备1' },
        { id: 5, name: '区域设备2' }
      ]
    },
    //区域清楚选项后，设备下拉框数据显示全部的（使用假数据）
    async findAllDevice() {
      // 模拟接口返回，使用假数据
      this.deviceList = [
        { id: 1, name: '轧机A' },
        { id: 2, name: '轧机B' },
        { id: 3, name: '切割机A' },
        { id: 4, name: '切割机B' },
        { id: 5, name: '成型机' }
      ]
    },
    //多选项选中的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('数据录入this.multipleSelection', this.multipleSelection)
    },

    //公差范围转化
    getToleranceVal(formula, Tol, num) {
      let returnVal = null
      let val = Number(Tol)
      if (formula.indexOf('t') != -1) {
        let formulaEX = null
        if (formula.indexOf('%') != -1) {
          formulaEX = Number(formula.split('×')[1].split('%')[0]) / 100
        } else {
          formulaEX = Number(formula.split('×')[1].split(')')[0])
        }
        if (num == 0) {
          returnVal = val - val * formulaEX
        } else {
          returnVal = val + val * formulaEX
        }
      } else {
        if (num == 0) {
          returnVal = val - Number(Math.abs(formula))
        } else {
          returnVal = val + Number(Math.abs(formula))
        }
      }
      return returnVal
    },

    //单行提交
    submit(val) {
      if (!val.measureValue) {
        this.$message.warning('请输入测量值!')
        return
      }

      let bottomVal = this.getToleranceVal(
        val.standardValueNeg,
        val.standardValue,
        0
      )
      let topValue = this.getToleranceVal(
        val.standardValuePos,
        val.standardValue,
        1
      )

      if (
        Number(val.measureValue) >= bottomVal &&
        Number(val.measureValue) <= topValue
      ) {
        this.toSubmit(val)
      } else {
        this.$confirm('测量值不在公差范围内, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.toSubmit(val)
          })
          .catch(() => {})
      }
    },
    toSubmit(val) {
      this.subOB.id = val.id
      this.subOB.measureValue = val.measureValue
      this.subOB.standardValue = val.standardValue
      this.subOB.measurer = val.measurer
      this.submitOnly()
    },
    //单项提交接口（模拟）
    submitOnly() {
      this.loading = true
      // 模拟接口延迟
      setTimeout(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        this.findAllNew()
      }, 500)
    },
    //选中全部提交
    toggleSelection() {
      this.doBatch.mList = []

      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选数据!'
        })
      } else {
        let hasError = false
        this.multipleSelection.forEach(item => {
          if (!item.measureValue) {
            hasError = true
          }
        })

        if (hasError) {
          this.$message({
            type: 'warning',
            message: '请将测量值填写完整!'
          })
          return
        }

        this.multipleSelection.forEach(item => {
          this.doBatch.mList.push({
            id: item.id,
            measureValue: item.measureValue,
            standardValue: item.standardValue,
            measurer: item.measurer,
            standardValueNeg: item.standardValueNeg,
            standardValuePos: item.standardValuePos
          })
        })

        this.$confirm('确定提交选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            this.postData()
            this.$refs.multipleTable.clearSelection()
          })
          .catch(() => {})
      }
    },
    // 批量提交（模拟）
    postData() {
      this.loading = true
      // 模拟接口延迟
      setTimeout(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '批量提交成功!'
        })
        this.findAllNew()
      }, 800)
    },

    handleSizeChange(val) {
      this.form.pageSize = val
      this.findAllNew()
    },
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.form.pageIndex = val
      this.findAllNew()
    },
    isNumber(val) {
      return !(typeof val === 'number' || Number(val) + 1 > 0)
    },
    isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type='number'] {
  -moz-appearance: textfield !important;
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
/*分页组件*/
.foot {
  margin-top: 20px;
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
/deep/ input[disabled],
input:disabled,
input.disabled {
  -webkit-text-fill-color: #3a3f63; /*disabled里面字的颜色*/
  background: #f5f7fa;
  -webkit-opacity: 1;
  opacity: 1;
  cursor: not-allowed;
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  background-color: #f5f7fa;
  border-color: #e6e9f4;
  color: #3a3f63;
  cursor: not-allowed;
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
</style>
