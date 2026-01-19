<template>
  <div
    class="contentBox"
  >
    <!--    form表单-->
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

      <!--      <el-form-item label="检测时间">
        <el-date-picker
          v-model="form.measureTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 150px"
          placeholder="选择日期"
          @change="changeTime">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click=" findAll"
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
      <!--<el-form-item>
        <el-button
          icon="el-icon-upload2"
          type="primary">导出</el-button>
      </el-form-item>-->
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
              <!-- <div v-if="scope.row.standardValueNegMark == '1'">
                <el-input
                  v-model="scope.row.standardValueNeg"
                  clearable
                  placeholder="请输入数值"></el-input>
              </div>
              <div v-else> -->
              {{ scope.row.standardValueNeg }}
              <!-- </div> -->
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
              <!-- <div v-if="scope.row.standardValuePosMark == '1'">
                <el-input
                  v-model="scope.row.standardValuePos"
                  clearable
                  placeholder="请输入数值"></el-input>
              </div>
              <div v-else> -->
              {{ scope.row.standardValuePos }}
              <!-- </div> -->
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
              <!--              <el-input
                v-model="scope.row.measureValue"
                clearable
                type="number"
                placeholder="请输入数值"/>-->
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
              <!--              <el-input
                v-model="scope.row.measureValue"
                clearable
                type="number"
                placeholder="请输入数值"/>-->
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
import { get, post } from '@/lib/Util'
import moment from 'moment'
import {
  getBusinessUnitInfo,
  getProductionLineInfo,
  getProductionLineAreaInfo,
  getMeasureTypeInfo,
  getDutyDepartmentInfo,
  findAreaByLineID,
  iomPrecisionManagementController_doBatchSaveMItem,
  iomPrecisionManagementController_forgetItemCheck,
  iomPrecisionManagementController_updateForgetMItem,
  iomPrecisionManagementController_findPersonLiableList,
  iomPrecisionManagementController_doBatchSaveForgetItem
} from '@/lib/EquipPrecisManage/ApiURL01'
export default {
  layout: 'test',
  name: 'EquipPrecisManage-leak',
  data() {
    return {
      loading: false,
      doBatch: { mList: [] }, //存储全部提交传的参数
      userNo: this.$store.getters['user/getUserNo'],
      userInfo: this.$store.getters['user/getUserInfo'] || {},
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
        // measureTime: '',
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
    this.findProductionLineArea()
    this.findAll()
  },
  mounted() {},
  methods: {
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize, 'newSize')
      // this.pageSize = newSize
      this.form.pageSize = newSize
      this.findAll()
    },
    //监听pageIndex改变的事件
    handleCurrentChange(newPage) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      // this.pageIndex = newPage
      this.form.pageIndex = newPage
      this.findAll()
    },
    //下拉框获取数据
    async findProductionLineArea() {
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
      this.findAll()
    },
    // 产线-测量方式联动
    async findAreaByLineID(value) {
      const { data: respA } = await post(findAreaByLineID, { lineID: value })
      this.productionAreaList = respA
      //产线-责任部门联动
      const { data: respB } = await post(getDutyDepartmentInfo, {
        productionLineID: value
      })
      this.departmentList = respB
    },
    findAll() {
      this.loading = false
      // this.pageIndex = val
      if (this.form.measureTime === null) {
        this.form.measureTime = ''
      }
      post(iomPrecisionManagementController_forgetItemCheck, this.form).then(
        res => {
          if (res.success) {
            for (let i = 0; i < res.data.tlist.length; i++) {
              res.data.tlist[i].cycleStartTime = moment(
                res.data.tlist[i].cycleStartTime
              ).format('YYYY-MM-DD')
              res.data.tlist[i].cycleEndTime = moment(
                res.data.tlist[i].cycleEndTime
              ).format('YYYY-MM-DD')
              res.data.tlist[i].cycleUnit =
                res.data.tlist[i].cycleUnit == '0'
                  ? '无'
                  : res.data.tlist[i].cycleUnit == '1'
                    ? '班'
                    : res.data.tlist[i].cycleUnit == '2'
                      ? '日'
                      : res.data.tlist[i].cycleUnit == '3'
                        ? '周'
                        : res.data.tlist[i].cycleUnit == '4'
                          ? '月'
                          : res.data.tlist[i].cycleUnit == '5'
                            ? '年'
                            : res.data.tlist[i].cycleUnit == '6'
                              ? '装配'
                              : ' '
              if (res.data.tlist[i].cycleUnit != '装配') {
                res.data.tlist[i].checkCycle =
                  '1次/' +
                  res.data.tlist[i].checkCycle +
                  res.data.tlist[i].cycleUnit
              } else if (res.data.tlist[i].cycleUnit == '装配') {
                res.data.tlist[i].checkCycle = res.data.tlist[i].cycleUnit
              }
              //检查人员
              // res.data.tlist[i].MEASURER =
              //   this.userInfo.userName + '-' + this.userInfo.userNo
            }
            this.tableDataFrom.tableData = res.data.tlist
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
            this.total = res.data.total
            this.loading = false
          } else {
            this.tableDataFrom.tableData = []
            this.total = 0
            this.loading = false
            this.$message.warning('未查到数据!')
          }
        }
      )
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
        // returnVal = val + Number(formula)
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
        //console.log(typeof bottomVal, topValue)
        //console.log(typeof val.measureValue)

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
      } else {
        this.$message.warning('请填写数值类型标准值或测量值!')
      }
    },
    toSubmit(val) {
      this.leakForm.id = val.id
      this.leakForm.measureValue = val.measureValue
      this.leakForm.standardValue = val.standardValue
      // this.leakForm.measurer = val.measurer
      this.leakForm.measurer =
        this.userInfo.userName + '-' + this.userInfo.userNo
      this.leakForm.remark = val.remark
      //console.log(this.leakForm)
      this.submitOnly()
    },
    //单项提交
    submitOnly() {
      this.loading = false
      post(
        iomPrecisionManagementController_updateForgetMItem,
        this.leakForm
      ).then(res => {
        this.loading = false
        if (res.success == true) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.findAll()
        } else {
          this.$message({
            type: 'info',
            message: '提交失败!'
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('多选this.multipleSelection', this.multipleSelection)
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
          console.log('bottomValue', bottomValue)
          console.log('topValue', topValue)
          if (
            !(
              bottomValue < subObItem.measureValue &&
              topValue > subObItem.measureValue
            )
          ) {
            console.log('33')
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
        iomPrecisionManagementController_doBatchSaveForgetItem,
        this.doBatch
      ).then(res => {
        if (res.success == true) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.findAll()
        } else {
          this.$message({
            type: 'error',
            message: '提交失败!'
          })
        }
      })
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
//表单
//.demo-form-inline {
//  margin-left: 30px;
//  margin-top: 15px;
//}
.buttonLeftMark {
  margin-left: 25px;
}
.buttonRightMark {
  margin-left: 20px;
}
.el-form-item {
  margin-right: 20px;
}
//责任人
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
//测评评分项
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
