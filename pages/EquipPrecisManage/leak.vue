<template>
  <div
    class="contentBox">
    <!--    form表单-->
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline">
      <el-form-item label="责任部门">
        <el-select
          v-model="form.dutyDepartmentId"
          clearable
          style="width: 140px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in departmentList"
            :key="item.id+'责任'"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="责任人">
        <el-select
          v-model="form.personLiableID"
          multiple
          placeholder="责任人"
          style="width: 250px"
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
    <!--    漏评评分项-->
    <el-card style="margin-top: 16px">
      <div
        slot="header"
        class="clearfix"
      >
        <span>漏评评分项</span>
      </div>
      <el-form
        ref="tableDataFrom"
        :model="tableDataFrom"
        :rules="tableRules"
      >
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableDataFrom.tableData"
          :height="'calc(100vh - 330px)'"
          border
          style="width: 100%;"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            type="selection"
            width=""
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="no"
            fixed
            label="序号"
            width="50"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            prop="productionLineName"
            show-overflow-tooltip
            label="单位"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="110"
            prop="productionLineAreaName"
            show-overflow-tooltip
            label="所属区域"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="110"
            prop="dutyDepartmentName"
            show-overflow-tooltip
            label="责任部门"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="130"
            prop="deviceName"
            show-overflow-tooltip
            label="设备名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="160"
            prop="itemName"
            show-overflow-tooltip
            label=" 控制项目"
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
              <div v-if="scope.row.isStandard == '1'">
                {{ scope.row.standardValue }}
              </div>
              <div v-else>
                <el-input
                  v-model="scope.row.standardValue"
                  type="number"
                  clearable
                  placeholder="请输入数值"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="145"
            prop="standardValueNeg"
            show-overflow-tooltip
            label="下公差"
          >
            <template slot-scope="scope">
              {{ scope.row.standardValueNeg }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="145"
            prop="standardValuePos"
            show-overflow-tooltip
            label="上公差"
          >
            <template slot-scope="scope">
              {{ scope.row.standardValuePos }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="sunitName"
            width=""
            label="计量单位"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="measureType"
            width="120"
            label="测量手段"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="checkCycle"
            width="110"
            label="检查周期"
          >
          </el-table-column>
          <el-table-column
            label="测量值"
            align="center"
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
            label="责任人"
            align="center"
            prop="personLiableName"
            width="145"
          >
          </el-table-column>
          <el-table-column
            label="本周期结束时间"
            align="center"
            prop="cycleEndTime"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            label="本周期起始时间"
            align="center"
            prop="cycleStartTime"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            label="说明"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.' + scope.$index + '.remark'"
              >
                <el-input
                  v-model="scope.row.remark"
                  :controls="false"
                  type="text"
                  clearable
                  placeholder="请输入说明"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            show-overflow-tooltip
            width=""
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                class="buttontable"
                @click="submit(scope.row)"
              >
                提交
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-pagination
        :total="total"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 200,1000]"
        background
        class="foot"
        align="right"
        layout="total, prev, pager, next, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { get, post } from '@/lib/Util'
import moment from 'moment'
// import {
//   getBusinessUnitInfo,
//   getProductionLineInfo,
//   getProductionLineAreaInfo,
//   getMeasureTypeInfo,
//   getDutyDepartmentInfo,
//   findAreaByLineID,
//   iomPrecisionManagementController_doBatchSaveMItem,
//   iomPrecisionManagementController_forgetItemCheck,
//   iomPrecisionManagementController_updateForgetMItem,
//   iomPrecisionManagementController_findPersonLiableList,
//   iomPrecisionManagementController_doBatchSaveForgetItem
// } from '@/lib/ApiURL01'
export default {
  // layout: 'test',
  name: 'EquipPrecisManage-leak',
  data() {
    return {
      loading: false,
      doBatch: { mList: [] }, //存储全部提交传的参数
      userNo: this.$store.getters['user/getUserNo'] || 'USER001',
      userInfo: this.$store.getters['user/getUserInfo'] || {
        userName: '测试用户',
        userNo: 'TEST001'
      },
      checkList: ['选中且禁用', '复选框 A'],
      tableDataFrom: {
        tableData: [] //表格显示的数据
      },
      tableRules: {
        measureValue: []
      },
      form: {
        businessUnitId: '',
        productionLineId: '',
        productionLineAreaId: '',
        dutyDepartmentId: '',
        deviceId: '',
        personLiableID: [],
        pageIndex: 1,
        pageSize: 20
      },
      dutyPeopleList: [], //责任人
      businessList: [], //事业部
      productionList: [], //产线
      productionAreaList: [], //测量方式
      departmentList: [], //责任部门
      deviceList: [], //项目
      pageSize: 20,
      pageIndex: 1,
      total: 0,
      multipleSelection: [],
      //漏项管理提交参数
      leakForm: {
        id: '',
        measureValue: '',
        standardValue: '',
        measurer: '',
        remark: '',
        isPass: 1
      }
    }
  },
  created() {
    // 初始化假数据
    this.initFakeData()
    this.findAll()
  },
  mounted() {},
  methods: {
    // 初始化假数据
    initFakeData() {
      // 责任部门假数据
      this.departmentList = [
        { id: 'dept1', name: '生产部' },
        { id: 'dept2', name: '质检部' },
        { id: 'dept3', name: '设备部' },
        { id: 'dept4', name: '技术部' }
      ]

      // 责任人假数据
      this.dutyPeopleList = [
        { PERSON_LIABLE_NAME: '张三' },
        { PERSON_LIABLE_NAME: '李四' },
        { PERSON_LIABLE_NAME: '王五' },
        { PERSON_LIABLE_NAME: '赵六' }
      ]

      // 测量方式假数据
      this.productionAreaList = [
        { id: 'area1', name: '热轧区' },
        { id: 'area2', name: '冷轧区' },
        { id: 'area3', name: '成型区' }
      ]
    },

    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.form.pageSize = newSize
      this.findAll()
    },
    //监听pageIndex改变的事件
    handleCurrentChange(newPage) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.form.pageIndex = newPage
      this.findAll()
    },
    //下拉框获取数据 (原接口调用已注释)
    async findProductionLineArea() {
      /*
      //事业部
      let resB = await post(getBusinessUnitInfo, {})
      this.businessList = resB.data
      //产线
      let resP = await post(getProductionLineInfo, {})
      this.productionList = resP.data
      //测量方式
      let res = await post(getMeasureTypeInfo, {})
      this.productionAreaList = res.data
      //责任人
      let resH = await post(
        iomPrecisionManagementController_findPersonLiableList,
        {}
      )
      this.dutyPeopleList = resH.data
      // 责任部门
      let resD = await post(getDutyDepartmentInfo, {})
      this.departmentList = resD.data
      */
      this.findAll()
    },
    // 产线-测量方式联动 (原接口调用已注释)
    async findAreaByLineID(value) {
      /*
      const { data: respA } = await post(findAreaByLineID, { lineID: value })
      this.productionAreaList = respA
      //产线-责任部门联动
      const { data: respB } = await post(getDutyDepartmentInfo, {
        productionLineID: value
      })
      this.departmentList = respB
      */
    },
    findAll() {
      this.loading = true

      // 模拟接口延迟
      setTimeout(() => {
        // 生成假表格数据
        const fakeData = []
        const pageIndex = this.form.pageIndex
        const pageSize = this.form.pageSize
        const total = 50 // 总数据量

        // 根据当前页码生成对应数据
        for (
          let i = (pageIndex - 1) * pageSize;
          i < pageIndex * pageSize && i < total;
          i++
        ) {
          // 随机获取责任部门
          const dept = this.departmentList[
            Math.floor(Math.random() * this.departmentList.length)
          ]

          fakeData.push({
            id: `item${i + 1}`,
            no: i + 1,
            productionLineName: '板材车间',
            productionLineAreaName: this.productionAreaList[
              Math.floor(Math.random() * this.productionAreaList.length)
            ].name,
            dutyDepartmentName: dept.name,
            dutyDepartmentId: dept.id,
            deviceName: `${i + 1}#加热炉`,
            itemName: `温度控制${(i % 3) + 1}`,
            standardValue: (100 + Math.random() * 50).toFixed(2),
            isStandard: '1',
            standardValueNeg: (Math.random() * 5).toFixed(2),
            standardValuePos: (Math.random() * 5).toFixed(2),
            sunitName: '℃',
            measureType: Math.random() > 0.5 ? '自动' : '手动',
            checkCycle: Math.random() > 0.5 ? '1次/班' : '1次/日',
            measureValue: null,
            personLiableName: this.dutyPeopleList[
              Math.floor(Math.random() * this.dutyPeopleList.length)
            ].PERSON_LIABLE_NAME,
            cycleStartTime: moment()
              .subtract(7, 'days')
              .format('YYYY-MM-DD'),
            cycleEndTime: moment().format('YYYY-MM-DD'),
            remark: ''
          })
        }

        this.tableDataFrom.tableData = fakeData
        this.total = total
        this.loading = false
      }, 500)
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

    //提交按钮
    submit(val) {
      if (
        val.standardValue != '' &&
        val.standardValue != null &&
        !isNaN(val.standardValue) &&
        val.measureValue != '' &&
        val.measureValue != null &&
        !isNaN(val.measureValue)
      ) {
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
      } else {
        this.$message.warning('请填写数值类型标准值或测量值!')
      }
    },
    toSubmit(val) {
      this.leakForm.id = val.id
      this.leakForm.measureValue = val.measureValue
      this.leakForm.standardValue = val.standardValue
      this.leakForm.measurer =
        this.userInfo.userName + '-' + this.userInfo.userNo
      this.leakForm.remark = val.remark
      this.submitOnly()
    },
    //单项提交
    submitOnly() {
      this.loading = true
      // 模拟接口提交
      setTimeout(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        this.findAll()
      }, 500)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('多选this.multipleSelection', this.multipleSelection)
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
        let subObItem
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (
            this.multipleSelection[i].measureValue == null ||
            this.multipleSelection[i].standardValue == null ||
            isNaN(this.multipleSelection[i].standardValue)
          ) {
            this.$message({
              type: 'warning',
              message: '请填将测量值和标准值填写完整!'
            })
            return
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
            Number(subObItem.standardValue) - Number(subObItem.standardValueNeg)
          const topValue =
            Number(subObItem.standardValue) + Number(subObItem.standardValuePos)

          if (
            !(
              Number(subObItem.measureValue) >= bottomValue &&
              Number(subObItem.measureValue) <= topValue
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
                console.log('取消提交')
              })
            return
          }
        }
        this.postData()
        this.$refs.multipleTable.clearSelection()
      }
    },
    postData() {
      // 模拟批量提交接口
      setTimeout(() => {
        this.$message({
          type: 'success',
          message: '批量提交成功!'
        })
        this.findAll()
      }, 500)
    },
    changeTime() {
      // this.findAll()
    },
    blurInput(row) {}
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
.el-form-item {
  margin-right: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-left: 42px;
  margin-top: 25px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 96%;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 21px;
}
.buttonTable {
  height: 24px;
  width: 46px;
  padding: 6px 10px;
  margin-left: 5px;
}
.box-card2 {
  width: 96%;
  margin-right: 20px;
  margin-left: 20px;
  height: 550px;
}
.foot {
  margin-top: 20px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
//修改输入框上下箭头
/deep/ input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type='number'] {
  -moz-appearance: textfield !important;
}
/*-----表格高度调整----*/
/deep/.el-table__row {
  height: 48px;
}
/deep/ tr {
  height: 48px;
}
/deep/.el-card__header {
  line-height: 6px;
}
/deep/.el-card__body {
  padding: 0px 24px 24px 24px;
}
</style>
