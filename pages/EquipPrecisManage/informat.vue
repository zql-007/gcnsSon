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
        <el-form-item
          label="责任人"
        >
          <user-select2
            v-model="form.personLiableName"
            @on-change="changeCharterUser"
          />
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
        <el-form-item
          style="float: right"
        >
          <div><span style="color: #ff2855">注：</span>临期-淡红色，正常-白色，下周期-淡绿色</div>
        </el-form-item>
      </el-form>
    </el-row>
    <el-card style="margin-top: 55px">
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
            show-overflow-tooltip
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
                <!--                <el-input-number
                  v-model="scope.row.measureValue"
                  :controls="false"
                  size="small"
                  placeholder="请输入数值"
                  @change="blurInput(scope.row)">
                </el-input-number>-->
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
            <!--<template slot-scope="scope">
                <el-input
                  v-model="scope.row.measurer"
                  placeholder="请输入检查人员"/>
              </template>-->
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
              <!--<el-button
                size="mini"
                type="primary"
                @click="tendencyClick(scope.row)">趋势</el-button>-->
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
      <!--  报警趋势图-->
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
import { get, post } from '@/lib/Util'
import UserSelect2 from '@/components/business/userSelect2'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
import {
  getBusinessUnitInfo,
  getProductionLineInfo,
  getProductionLineAreaInfo,
  getDutyDepartmentInfo,
  getMeasureTypeInfo,
  findManagementItemList,
  findManagementItem,
  findAllStanders,
  iomPrecisionManagementController_doUpdateMItem,
  getDeviceInfo,
  findAreaByLineID,
  findDeviceByAreaID,
  iomPrecisionManagementController_doBatchSaveMItem,
  findDeviceByDepartID,
  iomPrecisionManagementController_trendAnalysis
} from '@/lib/EquipPrecisManage/ApiURL01'
export default {
  layout: 'test',
  name: 'EquipPrecisManage-informat',
  components: {
    tasilyEcharts,
    UserSelect2
  },
  data() {
    return {
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
        businessUnitId: '',
        productionLineId: '',
        productionLineAreaId: '',
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
      }
    }
  },
  created() {
    // console.log('this.userNo', this.userInfo.userNo)
    // console.log('userInfo', this.userInfo)
    this.findProductionLineArea()
  },
  mounted() {
    this.findAll()
  },
  methods: {
    handleRowClick(row, column, event) {
      if (this.isNumeric(row.standardValue)) {
        this.editDisabled = true
      } else {
        this.editDisabled = false
      }
      // 可以在这里跳转、弹窗等操作
    },
    changeCharterUser(value) {
      console.log('责任人value:', value)
      this.userNameId = value
      // let num1 = []
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
      let startTime = ''
      let endTime = ''
      if (this.formTrend.time != null) {
        startTime = moment(this.formTrend.time[0]).format('YYYY-MM-DD HH:mm:ss')
        endTime = moment(this.formTrend.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.lineOption.legend.data = []
      this.formTrend.standardId = this.dialogDataAalarm.standardId
      post(iomPrecisionManagementController_trendAnalysis, {
        // businessUnitId: this.form.businessUnitId,
        // productionLineId: this.form.productionLineId, //产线
        // productionLineAreaId: this.form.productionLineAreaId,
        // dutyDepartmentId: this.form.dutyDepartmentId, //责任部门
        // deviceId: this.form.deviceId, //设备
        pageSize: 10,
        pageIndex: 1,
        standardId: this.formTrend.standardId, //标准
        startTime: this.formTrend.time[0],
        endTime: this.formTrend.time[1]
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
          this.lineOption.series[0].data = res.data.scoreList
        }
      })
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
      // this.loading = true
      //分页组件显示的当前页参数pageIndex
      // this.pageIndex = val
      //调接口传给后台的参数pageIndex
      const res = await post(findManagementItemList, this.form)
      if (res.success) {
        let data = res.data
        // this.loading = false
        let levelData = []
        if (data.tlist.length > 0) {
          for (let i = 0; i < data.tlist.length; i++) {
            /*责任人筛选*/
            levelData.push({
              text: data.tlist[i].personLiableName,
              value: data.tlist[i].personLiableName
            })

            //时间处理
            data.tlist[i].cycleEndTime = moment(
              data.tlist[i].cycleEndTime
            ).format('YYYY-MM-DD')
            data.tlist[i].cycleStartTime = moment(
              data.tlist[i].cycleStartTime
            ).format('YYYY-MM-DD')
            //周期处理
            /*        data.tlist[i].cycleUnit =
            data.tlist[i].cycleUnit == '0'
              ? '无'
              : data.tlist[i].cycleUnit == '1'
                ? '班'
                : data.tlist[i].cycleUnit == '2'
                  ? '日'
                  : data.tlist[i].cycleUnit == '3'
                    ? '周'
                    : data.tlist[i].cycleUnit == '4'
                      ? '月'
                      : data.tlist[i].cycleUnit == '5'
                        ? '年'
                        : data.tlist[i].cycleUnit == '6'
                          ? '其他'
                          : ' '*/
            switch (data.tlist[i].cycleUnit) {
              case '0':
                data.tlist[i].cycleUnit = '无'
                break
              case '1':
                data.tlist[i].cycleUnit = '班'
                break
              case '2':
                data.tlist[i].cycleUnit = '日'
                break
              case '3':
                data.tlist[i].cycleUnit = '周'
                break
              case '4':
                data.tlist[i].cycleUnit = '月'
                break
              case '5':
                data.tlist[i].cycleUnit = '年'
                break
              default:
                data.tlist[i].cycleUnit = '其他'
            }
            if (data.tlist[i].cycleUnit != '其他') {
              data.tlist[i].checkCycle =
                '1次/' + data.tlist[i].checkCycle + data.tlist[i].cycleUnit
            } else if (data.tlist[i].cycleUnit == '其他') {
              data.tlist[i].checkCycle = data.tlist[i].cycleUnit
            }
            //检查人员
            data.tlist[i].measurer =
              this.userInfo.userName + '-' + this.userInfo.userNo
            // data.tlist[i].measureValue = data.tlist[i].measureValue || ''
            //对为空null的上下公差进行判断
            if (data.tlist[i].standardValueNeg !== null) {
              data.tlist[i].checkStandardDown =
                Number(data.tlist[i].standardValue) +
                Number(data.tlist[i].standardValueNeg * 2)
            } else {
              this.checkStandardDown = ''
            }
            if (data.tlist[i].standardValuePos !== null) {
              data.tlist[i].checkStandardUp =
                Number(data.tlist[i].standardValue) +
                Number(data.tlist[i].standardValuePos * 2)
            } else {
              this.checkStandardUp = ''
            }
          }
          this.tableDataFrom.tableData = data.tlist
          console.log('data.tlist', Number(data.tlist[14].standardValue) + 1)
          this.tableDataFrom.tableData.forEach((item, index) => {
            if (isNaN(item.standardValueNeg)) {
              this.$set(
                this.tableDataFrom.tableData[index],
                'standardValueNegMark',
                1
              )
            }
            if (isNaN(item.standardValuePos))
              this.$set(
                this.tableDataFrom.tableData[index],
                'standardValuePosMark',
                1
              )
          })
          this.form.total = data.total
          console.log('table数据', this.tableDataFrom.tableData)
        } else {
          this.tableDataFrom.tableData = data.tlist
          this.form.total = data.total
        }
        this.level = levelData.filter((item, index, arr) => {
          if (arr.findIndex(item1 => item1.text === item.text) === index) {
            return item
          }
        })
        /*  console.log(this.level, 'this.level')*/
      } else {
        // this.loading = false
        this.tableDataFrom.tableData = res.data.tlist
        this.form.total = res.data.total
        this.$message.warning('当前时间区间内数据录入项均已完成')
      }
    },
    filterTag(value, row) {
      console.log(value, row.tag, 'value---------------')
      return row.personLiableName === value
    },
    // 保存表格数据被选后分页跳选仍能保存
    getRowKey(row) {
      return row.id
    },
    //修改表格底色
    rowStyle({ row, rowIndex }) {
      // console.log('rwo值得吗:', row)
      let styleRed = {
        'background-color': '#fef0f0'
      }
      let styleGreen = {
        'background-color': '#CCFFCC'
      }
      const newDate = moment(new Date().getTime()).format('YYYY-MM-DD')
      const startTime = row.cycleStartTime
      const endTime = row.cycleEndTime
      console.log('newDate', typeof newDate)
      if (row.isAdvent == '1') {
        return styleRed
      } else if (newDate < startTime || newDate > endTime) {
        return styleGreen
      } else {
        return {}
      }
    },
    //下拉框获取数据
    async findProductionLineArea() {
      //事业部
      let resB = await post(getBusinessUnitInfo, {})
      this.businessList = resB.data
      //产线
      let resP = await post(getProductionLineInfo, {})
      this.productionList = resP.data

      //区域
      let res = await post(getProductionLineAreaInfo, {})
      this.productionAreaList = res.data
      // 责任部门
      let resD = await post(getDutyDepartmentInfo, {})
      this.departmentList = resD.data
      // 设备
      let resDc = await post(getDeviceInfo, {})
      this.deviceList = resDc.data

      const { data: mtList } = await post(getMeasureTypeInfo, {})
      this.measureTypeList = mtList
    },
    // 产线-区域、区域-设备联动
    async findAreaByLineID(value) {
      const { data: respA } = await post(findAreaByLineID, { lineID: value })
      this.productionAreaList = respA
      //产线-责任部门联动
      const { data: respB } = await post(getDutyDepartmentInfo, {
        productionLineID: value
      })
      this.departmentList = respB
    },
    //顶部表单根据责任部门查询-联动-设备
    async findDeviceByDepartID(value) {
      // console.log('责任部门：', value)
      // this.standersParam.dutyDepartmentId = value
      // const { data: respB } = await post(
      //   findAllStandersWithNoPage,
      //   this.standersParam
      // )
      // this.standardList = respB
      const { data: respA } = await post(findDeviceByDepartID, {
        departID: value
      })
      this.deviceList = respA
    },
    async findDeviceByAreaID(value) {
      const { data: respA } = await post(findDeviceByAreaID, { areaID: value })
      this.deviceList = respA
    },
    //区域清楚选项后，设备下拉框数据显示全部的
    async findAllDevice() {
      // 设备
      const { data: resDc } = await post(getDeviceInfo, {})
      this.deviceList = resDc
    },
    //多选项选中的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('数据录入this.multipleSelection', this.multipleSelection)
    },

    //公差范围转化
    getToleranceVal(formula, Tol, num) {
      console.log('formula', formula)
      console.log('Tol', Tol)
      console.log('num', num)
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
        console.log('formulaEX11', formulaEX)
      } else {
        // returnVal = val + Number(formula)
        if (num == 0) {
          returnVal = val - Number(Math.abs(formula))
        } else {
          returnVal = val + Number(Math.abs(formula))
        }
        console.log('returnVal22', returnVal)
      }
      return returnVal
    },

    //单行提交
    submit(val) {
      // if (
      //   val.standardValue != '' &&
      //   val.standardValue != null &&
      //   val.measureValue != '' &&
      //   val.measureValue != null
      // ) {
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
      console.log('bottomVal', bottomVal)
      console.log('topValue', topValue)
      if (
        Number(val.measureValue) >= bottomVal &&
        Number(val.measureValue) <= topValue
      ) {
        this.toSubmit(val)
      } else {
        //this.$message.warning('测量值不在公差范围内，请重新输入!')
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
      // } else {
      //   this.$message.warning('请填写数值类型标准值或测量值!')
      // }
    },
    toSubmit(val) {
      this.subOB.id = val.id
      this.subOB.measureValue = val.measureValue
      this.subOB.standardValue = val.standardValue
      this.subOB.measurer = val.measurer
      //console.log(this.subOB)
      this.submitOnly()
    },
    //单项提交接口
    submitOnly() {
      // this.loading = true
      post(iomPrecisionManagementController_doUpdateMItem, this.subOB).then(
        res => {
          this.loading = false
          if (res.success == true) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            this.form.pageIndex = 1
            this.findAllNew()
          } else {
            this.$message({
              type: 'info',
              message: '提交失败!'
            })
          }
        }
      )
    },
    //选中全部提交
    toggleSelection() {
      this.doBatch.mList = [] //每次push多选的数据时保障数组为空，不然数据会叠加

      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选数据!'
        })
      } else {
        let subObItem
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (
            this.multipleSelection[i].measureValue == null ||
            this.multipleSelection[i].measurer == null ||
            this.multipleSelection[i].standardValue == null ||
            isNaN(this.multipleSelection[i].standardValue)
          ) {
            this.$message({
              type: 'warning',
              message: '请填将测量值和标准值填写完整!'
            })
            return //用于终止以下的代码逻辑,将数据填写好才能进行下一步代码
          }
          subObItem = {}
          subObItem.id = this.multipleSelection[i].id
          subObItem.measureValue = this.multipleSelection[i].measureValue
          subObItem.standardValue = this.multipleSelection[i].standardValue
          subObItem.measurer = this.multipleSelection[i].measurer
          subObItem.standardValueNeg = this.multipleSelection[
            i
          ].standardValueNeg
          subObItem.standardValuePos = this.multipleSelection[
            i
          ].standardValuePos
          this.doBatch.mList.push(subObItem)
          const bottomValue =
            Number(subObItem.standardValue) + Number(subObItem.measureValue)
          const topValue =
            Number(subObItem.standardValue) + Number(subObItem.measureValue)
          if (
            !(
              bottomValue < subObItem.measureValue &&
              topValue > subObItem.measureValue
            )
          ) {
            this.$confirm('测量值不在校验规则内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.postData()
                this.$refs.multipleTable.clearSelection()
              })
              .catch(() => {
                console.log('失败')
              })
          }
        }
      }
    },
    postData() {
      post(
        iomPrecisionManagementController_doBatchSaveMItem,
        this.doBatch
      ).then(res => {
        if (res.success == true) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.form.pageIndex = 1
          this.findAllNew()
        } else {
          this.$message({
            type: 'error',
            message: '提交失败!'
          })
        }
      })
    },

    handleSizeChange(val) {
      this.form.pageSize = val
      this.findAllNew()
    },
    //console.log(`当前页: ${val}`)
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
      // 检查是否为数字（包括数字字符串如 "0.3"）
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
