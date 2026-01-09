<template>
  <div class="contentBox">
    <el-form
      :inline="true"
      :model="form"
      class="el-form-header"
    >
      <el-form-item>
        <el-button
          icon="el-icon-circle-plus-outline"
          @click="addLineData"
        >
          新增
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :multiple="false"
          :before-upload="importExcel"
          :file-list="eqDangersFileList"
          class="upload-demo"
          action=""
          accept=".xls,.xlsx"
        >
          <el-button
            icon="el-icon-upload2"
          >
            导入
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-download"
          @click="downloadExcel"
        >
          下载模板
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click="submitAdd"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>

    <el-card
      style="height: 750px"
      class="CardTable"
    >
      <el-form :model="formInline">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="formInline.EquipDangers"
          max-height="700px"
          lazy
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="TableWidth"
          row-key="id"
        >
          <el-table-column
            prop="checked"
            fixed
            align="center"
            label=""
            width=""
          >
            <template
              slot="header"
            >
              <el-checkbox
                v-model="allSelected"
                :indeterminate="isIndeterminate"
                @change="handleAllSelectedChange"
              ></el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @change="handleSelectedChange"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="factoryNo"
            label="产线"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.factoryNo'"
                :rules="[{ required: true, message: '请选择产线', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.factoryNo"
                  :disabled="userInfo.factoryNo.length!==0"
                  placeholder="请选择"
                  clearable
                  @change="selectFactory(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in factoryList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="workDeptNo"
            label="车间"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.workDeptNo'"
                :rules="[{ required: true, message: '请选择车间', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.workDeptNo"
                  :disabled="userInfo.workDeptNo.length!==0"
                  placeholder="请选择"
                  clearable
                  @change="selectWorkDept(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in newWorkDeptList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="majDelay"
            label="专业"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.majDelay'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.majDelay"
                  placeholder="请选择"
                  clearable
                  @change="selectMajDelay(scope.row)"
                >
                  <el-option
                    v-for="item in majDelayList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="obsStarTime"
            label="发现时间"
            width="180"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.obsStarTime'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-date-picker
                  v-model="scope.row.obsStarTime"
                  type="datetime"
                  style="width: 168px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="areaNo"
            label="隐患区域"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.areaNo'"
                :rules="[{ required: true, message: '请选择隐患区域', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.areaNo"
                  :disabled="userInfo.areaNo.length!==0"
                  placeholder="请选择"
                  clearable
                  @change="selectAreaDept(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in newAreaDeptList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="equipNo"
            label="设备名称"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.equipNo'"
                :rules="[{ required: true, message: '请选择隐患区域', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.equipNo"
                  :disabled="userInfo.equipNo.length!==0"
                  placeholder="请选择"
                  clearable
                  @change="selectEquipNoDept(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in newEquipNotList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="dangerDesc"
            label="隐患情况说明"
            width="260"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.dangerDesc'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.dangerDesc"
                  type="textarea"
                  autosize
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="fangerType"
            label="隐患类型"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.fangerType'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.fangerType"
                  placeholder="请选择"
                  clearable
                  @change="selectFangerType(scope.row)"
                >
                  <el-option
                    v-for="item in fangerTypeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span
                      v-if="item.id==='D'"
                      style="float: right; color: #8492a6; font-size: 13px"
                    >非计划</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="emergencyResponse"
            label="应急预案"
            width="240"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.emergencyResponse'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.emergencyResponse"
                  type="textarea"
                  autosize
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="expectTime"
            label="计划何时处理"
            width="180"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.expectTime'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-date-picker
                  v-model="scope.row.expectTime"
                  type="date"
                  style="width: 168px"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="'可能造成产线停机时间\n（小时）'"
            prop="falMintue"
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'EquipDangers.'+scope.$index+'.falMintue'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.falMintue"
                  type="number"
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align=""
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteLine(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import { date2ymdhs2, getFormatDate_XLSX } from '@/utils/dateUtil'
import {
  batchAdd,
  dictionaryContoller_findAllByTableId,
  downloadTemplateExcel,
  findAllByTableId,
  findAreaByWorkshop,
  queryWorkDeptInfo,
  uploadFile
} from '@/lib/EquipPrecisManage/RiskManageApi'

export default {
  // layout: 'test',
  name: 'riskManagement-riskInformationFill',
  data() {
    return {
      areaPram: '',
      userNo: this.$store.getters['user/getUserNo'],
      userInfo: this.$store.getters['user/getUserInfo'],
      userRole: this.$store.getters['user/getUserRole'],
      //多选框
      doubleSelectList: [],
      form: {},
      //form表单层
      formInline: {
        //表格数据
        EquipDangers: []
      },
      //产线
      factoryList: this.$store.getters['factory/getFactoryList'] || [],
      //产线类别
      factoryGradeList: [
        {
          id: 'A',
          name: '主要产线'
        },
        {
          id: 'B',
          name: '重要产线'
        },
        {
          id: 'C',
          name: '辅助产线'
        }
      ],
      //专业类型
      majDelayList: [
        {
          id: 'A',
          name: '自控'
        },
        {
          id: 'B',
          name: '仪表'
        },
        {
          id: 'E',
          name: '电气'
        },
        {
          id: 'L',
          name: '液压润滑'
        },
        {
          id: 'M',
          name: '机械'
        },
        {
          id: 'O',
          name: '其他'
        }
      ],
      // 隐患类型
      fangerTypeList: [
        {
          id: 'A',
          name: '安全'
        },
        {
          id: 'B',
          name: '环保'
        },
        {
          id: 'C',
          name: '质量'
        },
        {
          id: 'D',
          name: '生产'
        },
        {
          id: 'E',
          name: '减产'
        }
      ],
      // 隐患级别
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
      newWorkDeptList: [],
      newAreaDeptList: [],
      newEquipNotList: [],
      //删除接口参数
      deleteParam: {
        EquipDanger: {
          dangerNo: '', //编码参数
          factoryNo: '',
          factoryGrade: '',
          // area: '',
          areaNo: '',
          equipNo: '',
          fangerType: '',
          majDelay: '',
          fangerGrade: '',
          dangerDesc: '',
          sourceType: '',
          workDeptNo: '',
          eqNo: '',
          partsNo: '',
          parts2No: '',
          eqNoAll: '',
          dangerApper: '',
          expectTime: '',
          url: '',
          obsStarTime: '',
          obsEndTime: '',
          applyDeptNo: '',
          applyUser: '',
          phoneNo: '',
          applyTime: '',
          submitDate: '',
          submitTime: '',
          hndlStus: '',
          hndlType: '',
          hndlCfmUser: '',
          hndlCfmTime: '',
          jobTaskNo: '',
          remark: '',
          creUserNo: '',
          creDate: '',
          creDateTime: '',
          updUserNo: '',
          updDate: '',
          updDateTime: '',
          returnReason: '',
          returnDate: '',
          returnTime: '',
          returnUserNo: '',
          markTimes: '',
          emergencyResponse: '',
          isStop: '',
          falMintue: '',
          flowWorkId: '',
          isFal: '',
          falNo: ''
        }
      },
      //删除行数据，自定义唯一标识
      deleteIndex: 0,
      eqDangersFileList: [], //新增文件列表
      equipDangersHeader: [
        // { header: 'ID', key: 'id', width: 10, style: { numFmt: '@' } },
        {
          header: '隐患单编号',
          key: 'dangerNo',
          width: 20,
          style: { numFmt: '@' }
        },
        { header: '产线', key: 'factoryNo', width: 10, style: { numFmt: '' } },
        {
          header: '产线类别',
          key: 'factoryGrade',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '车间',
          key: 'workDeptNo',
          width: 10,
          style: { numFmt: '' }
        },
        { header: '专业', key: 'majDelay', width: 10, style: { numFmt: '' } },
        {
          header: '发现时间',
          key: 'obsStarTime',
          width: 20,
          style: { numFmt: 'YYYY-MM-DD HH:mm:ss' }
        },
        {
          header: '隐患区域',
          key: 'areaNo',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '设备名称',
          key: 'equipNo',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '隐患情况说明',
          key: 'dangerDesc',
          width: 30,
          style: { numFmt: '@' }
        },
        {
          header: '隐患类型',
          key: 'fangerType',
          width: 10,
          style: { numFmt: '' }
        },
        // {
        //   header: '隐患级别',
        //   key: 'fangerGrade',
        //   width: 10,
        //   style: { numFmt: '' }
        // },
        {
          header: '应急预案',
          key: 'emergencyResponse',
          width: 20,
          style: { numFmt: '@' }
        },
        {
          header: '计划何时处理',
          key: 'expectTime',
          width: 20,
          style: { numFmt: 'YYYY-MM-DD' }
        },
        {
          header: '可能造成产线停机时间(小时)',
          key: 'falMintue',
          width: 30,
          style: { numFmt: '' }
        }
      ],
      equipDangersDataValidation: [
        {
          col: 2,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '产线',
            error: '产线选择错误'
          }
        },
        {
          col: 3,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '产线类别',
            error: '产线类别选择错误'
          }
        },
        {
          col: 4,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '车间',
            error: '车间选择错误'
          }
        },
        {
          col: 5,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '专业',
            error: '专业选择错误'
          }
        },
        {
          col: 6,
          dataValidation: {
            type: 'date',
            operator: 'between',
            showErrorMessage: true,
            allowBlank: true,
            dateFormats: ['DD/MM/YYYY[H]HH:mm:ss'],
            formulae: [new Date(1900, 0, 1), new Date(2050, 11, 31)]
          }
        },
        {
          col: 9,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '隐患类型',
            error: '隐患类型选择错误'
          }
        },
        {
          col: 12,
          dataValidation: {
            type: 'date',
            operator: 'between',
            showErrorMessage: true,
            allowBlank: true,
            showInputMessage: true,
            prompTitle: '时间',
            promp: '时间格式:YYYY-MM-DD HH:mm:ss',
            dateFormats: ['DD/MM/YYYY[H]HH:mm:ss'],
            formulae: [new Date(1900, 0, 1), new Date(2050, 11, 31)]
          }
        },
        {
          col: 13,
          dataValidation: {
            type: 'decimal',
            allowBlank: true,
            formulae: [0],
            operator: 'greaterThanOrEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '可能造成产线停机时间',
            error: '可能造成产线停机时间输入错误'
          }
        }
      ],
      majDelayListHeader: [], //专业类型
      fangerTypeListHeader: [], // 隐患类型
      fangerGradeListHeader: [], // 隐患级别
      factoryListHeader:
        this.$store.getters['factory/getFactoryListHeader'] || [], //产线
      factoryGradeListHeader: [], //产线类别
      workDeptListHeader: [], //车间
      allSelected: false, //全选
      isIndeterminate: false, //不确定状态
      loading: false
    }
  },
  watch: {
    formInline: {
      handler: function(val, oldVal) {
        let allChecked = true
        this.doubleSelectList = []
        val.EquipDangers.forEach(item => {
          if (item.checked) {
            this.isIndeterminate = true
            this.doubleSelectList.push(item)
          } else {
            allChecked = false
          }
        })
        this.allSelected = allChecked
        if (allChecked) {
          this.isIndeterminate = false
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    //初始有一条填报数据
    this.addLineData()
    this.initData()
    this.findSelect()
    this.findMajDelayList()
    this.initHeader()
  },
  methods: {
    //新增
    addLineData() {
      this.deleteIndex++
      this.formInline.EquipDangers.push({
        deleteIndex: this.deleteIndex,
        checked: true,
        factoryNo: this.userInfo.factoryNo, //产线
        factoryCode: this.userInfo.factoryCode,
        factoryName: this.userInfo.factoryName,
        factoryGrade: '', //产线类别
        factoryGradeName: '',
        majDelay: '', //专业
        majDelayName: '',
        obsStarTime: '', //开始时间
        dangerDesc: '', //隐患描述
        fangerType: '', //隐患类型
        emergencyResponse: '', //
        expectTime: '', //预计完成时间
        falMintue: '', //耗时总分钟
        /*-------*/
        fangerGrade: '', //隐患级别
        sourceType: '',
        workDeptNo: this.userInfo.workDeptNo, //车间
        workDeptName: this.userInfo.workDeptName,
        areaNo: this.userInfo.areaNo, //区域
        area: this.userInfo.area,
        equipNo: this.userInfo.equipNo, //设备名称
        equipName: this.userInfo.equipName,
        eqNo: '',
        partsNo: '',
        parts2No: '',
        eqNoAll: '',
        dangerApper: '',
        url: '',
        obsEndTime: '',
        applyDeptNo: '',
        applyUser: '',
        phoneNo: '',
        applyTime: '',
        submitDate: '',
        submitTime: '',
        hndlStus: '',
        hndlType: '',
        hndlCfmUser: '',
        hndlCfmTime: '',
        jobTaskNo: '',
        remark: '',
        creUserNo: '',
        creDate: '',
        creDateTime: '',
        updUserNo: '',
        updDate: '',
        updDateTime: '',
        returnReason: '',
        returnDate: '',
        returnTime: '',
        returnUserNo: '',
        markTimes: '',
        isStop: '',
        flowWorkId: '',
        isFal: '',
        falNo: ''
      })
    },

    initData() {
      if (this.userInfo.factoryCode.length !== 0) {
        this.queryWorkDept(this.userInfo.factoryCode)
        this.queryAreaDept(this.userInfo.factoryNo, this.userInfo.factoryCode)
        this.queryEquipNoDept(this.userInfo.equipNo)
      }
    },
    initHeader() {
      //产线类别
      let newStr4 = ''
      this.factoryGradeList.forEach(item => {
        newStr4 += item.name + ','
      })
      this.factoryGradeListHeader = [
        '"' + newStr4.substring(0, newStr4.length - 1) + '"'
      ]
      //隐患级别
      let newStr5 = ''
      this.fangerGradeList.forEach(item => {
        newStr5 += item.name + ','
      })
      this.fangerGradeListHeader = [
        '"' + newStr5.substring(0, newStr5.length - 1) + '"'
      ]
      //车间
      let newStr6 = ''
      this.workDeptList.forEach(item => {
        newStr6 += item.name + ','
      })
      this.workDeptListHeader = [
        '"' + newStr6.substring(0, newStr6.length - 1) + '"'
      ]
    },
    handleAllSelectedChange(val) {
      if (val) {
        this.formInline.EquipDangers.forEach(item => {
          item.checked = true
        })
      } else {
        this.formInline.EquipDangers.forEach(item => {
          item.checked = false
        })
      }
    },
    handleSelectedChange(val) {
      //console.log(this.formInline.EquipDangers)
    },
    //产线
    selectFactory(row) {
      //console.log('产线row：', row)
      for (let i = 0; i < this.factoryList.length; i++) {
        if (this.factoryList[i].id === row.factoryNo) {
          row.factoryName = this.factoryList[i].name
          row.factoryCode = this.factoryList[i].orgCode
        }
      }
      row.workDeptNo = ''
      row.workDeptName = ''
      row.areaNo = ''
      row.area = ''
      //切换车间数据
      this.queryWorkDept(row.factoryCode)
      //切换区域数据
      this.queryAreaDept(row.factoryNo, row.factoryCode)
    },
    //产线类别
    selectFactoryGrade(row) {
      for (let i = 0; i < this.factoryGradeList.length; i++) {
        if (this.factoryGradeList[i].id === row.factoryGrade) {
          row.factoryGradeName = this.factoryGradeList[i].name
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
    },
    //车间
    selectWorkDept(row) {
      //console.log('车间row：', row)
      for (let i = 0; i < this.newWorkDeptList.length; i++) {
        if (this.newWorkDeptList[i].id === row.workDeptNo) {
          row.workDeptName = this.newWorkDeptList[i].name
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
      if (
        row.factoryNo != null &&
        row.factoryNo !== '' &&
        row.workDeptNo != null &&
        row.workDeptNo !== ''
      ) {
        this.queryAreaDept(row.factoryNo, row.workDeptNo)
      }
    },
    //隐患区域
    selectAreaDept(row) {
      console.log(row)
      //console.log('this.newAreaDeptList：', this.newAreaDeptList)
      for (let i = 0; i < this.newAreaDeptList.length; i++) {
        if (this.newAreaDeptList[i].id === row.areaNo) {
          row.area = this.newAreaDeptList[i].name
          row.areaNo = this.newAreaDeptList[i].id
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
      row.equipNo = ''
      row.equipName = ''
      //切换设备名称
      if (row.areaNo != null && row.areaNo !== '') {
        this.queryEquipNoDept(row.areaNo)
      }
    },
    //设备名称
    selectEquipNoDept(row) {
      for (let i = 0; i < this.newEquipNotList.length; i++) {
        if (this.newEquipNotList[i].id === row.equipNo) {
          row.equipName = this.newEquipNotList[i].name
          // row.equipNo = this.newEquipNotList[i].id
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
    },
    //专业
    selectMajDelay(row) {
      for (let i = 0; i < this.majDelayList.length; i++) {
        if (this.majDelayList[i].id === row.majDelay) {
          row.majDelayName = this.majDelayList[i].name
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
    },
    //隐患类型
    selectFangerType(row) {
      for (let i = 0; i < this.fangerTypeList.length; i++) {
        if (this.fangerTypeList[i].id === row.fangerType) {
          row.fangerTypeName = this.fangerTypeList[i].name
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
    },
    //隐患类型
    selectFangerGrade(row) {
      for (let i = 0; i < this.fangerGradeList.length; i++) {
        if (this.fangerGradeList[i].id === row.fangerType) {
          row.fangerGradeName = this.fangerGradeList[i].name
          // this.$set(row, 'budgetTypeName', this.costCategories[i].label)
        }
      }
    },
    //下载Excel
    downloadExcel() {
      this.downloadFile()
    },
    //导入Excel
    importExcel(file) {
      this.uploadFile(file)
    },
    //生成bgt数据
    generateBgtData(header, results) {
      const c =
        this.equipDangersHeader.length === header.length &&
        this.equipDangersHeader.filter(t => !header.includes(t.header))
      if (!c) {
        this.$message.error('导入表格与模板表格不匹配！')
        this.loading = false
        return
      }

      let newArray = []
      results.forEach(item => {
        this.deleteIndex++
        let newItem = {}
        this.equipDangersHeader.forEach(t => {
          newItem[t.key] = item[t.header]
          switch (t.key) {
            case 'factoryNo': //产线
              this.factoryList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['factoryNo'] = ou.id
                }
              })
              break
            case 'factoryGrade': //产线类别
              this.factoryGradeList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['factoryGrade'] = ou.id
                }
              })
              break
            case 'workDeptNo': //车间
              this.workDeptList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['workDeptNo'] = ou.id
                }
              })
              break
            case 'majDelay': //专业类型
              this.majDelayList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['majDelay'] = ou.id
                }
              })
              break
            case 'fangerType': //隐患类型
              this.fangerTypeList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['fangerType'] = ou.id
                }
              })
              break
            case 'fangerGrade': //隐患级别
              this.fangerGradeList.forEach(ou => {
                if (ou.name === item[t.header]) {
                  newItem['fangerGrade'] = ou.id
                }
              })
              break
            case 'obsStarTime': //发现时间
              if (typeof item[t.header] === 'number') {
                newItem['obsStarTime'] = date2ymdhs2(
                  getFormatDate_XLSX(item[t.header])
                )
              }
              break
            case 'expectTime': //计划何时处理
              if (typeof item[t.header] === 'number') {
                newItem['expectTime'] = date2ymdhs2(
                  getFormatDate_XLSX(item[t.header])
                )
              }
              break
          }
        })
        newItem.id = this.deleteIndex
        newArray.push(newItem)
      })
      this.formInline.EquipDangers.push(...newArray)
      this.loading = false
    },

    /*------------------接口-------*/
    //下载模板
    downloadFile() {
      get(downloadTemplateExcel).then(res => {
        let data = res
        if (!data) {
          return
        }
        var url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        let myDate = new Date()

        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '板材事业部设备隐患导入模板.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //下载完成移除元素
        window.URL.revokeObjectURL(url) //释放掉blob对象
      })
    },
    //查询车间
    async queryWorkDept(orgCode) {
      const res = await post(queryWorkDeptInfo, { orgCode: orgCode })
      if (res.success) {
        let tempList = []
        res.data.forEach(item => {
          tempList.push({
            id: item.orgCode,
            name: item.orgAllName
          })
        })
        this.newWorkDeptList = []
        this.newWorkDeptList.push(...tempList)
      }
    },
    //查询区域
    async queryAreaDept(factoryCode, orgCode) {
      let param = {
        factoryNo: factoryCode,
        orgCode: orgCode
      }
      //console.log('param：', param)
      const res = await post(findAreaByWorkshop, param)
      if (res.success) {
        let tempList = []
        res.data.forEach(item => {
          tempList.push({
            id: item.THREE_COL,
            name: item.FOUR_COL
          })
        })
        this.newAreaDeptList = []
        this.newAreaDeptList.push(...tempList)
      }
    },
    //查询设备名称
    async queryEquipNoDept(orgCode) {
      //console.log('设备名称orgCode：', orgCode)
      const res = await post(dictionaryContoller_findAllByTableId, {
        tableId: 'EQUIP_INFO',
        col: 3,
        data: orgCode
      })
      if (res.success) {
        let tempList = []
        res.data.forEach(item => {
          tempList.push({
            id: item.fiveCol,
            name: item.sixCol
          })
        })
        this.newEquipNotList = []
        this.newEquipNotList.push(...tempList)
      }
    },
    //专业类别
    async findMajDelayList() {
      const { data: res } = await post(findAllByTableId, {
        tableId: 'FAULTSPECI'
      })
      this.majDelayList = []
      res.forEach(item => {
        this.majDelayList.push({
          id: item.oneCol,
          name: item.twoCol
        })
      })
      //专业类型
      let newStr = ''
      this.majDelayList.forEach(item => {
        newStr += item.name + ','
      })
      this.majDelayListHeader = [
        '"' + newStr.substring(0, newStr.length - 1) + '"'
      ]
    },
    //下拉框获取数据
    async findSelect() {
      //隐患类型
      const { data: res2 } = await post(findAllByTableId, {
        tableId: 'FANGERTYPE'
      })
      this.fangerTypeList = []
      res2.forEach(item => {
        this.fangerTypeList.push({
          id: item.oneCol,
          name: item.twoCol
        })
      })
      let newStr4 = ''
      this.fangerTypeList.forEach(item => {
        newStr4 += item.name + ','
      })
      this.fangerTypeListHeader = [
        '"' + newStr4.substring(0, newStr4.length - 1) + '"'
      ]
    },
    //导入文件
    async uploadFile(file) {
      let formData = new FormData()
      formData.append('file', file)
      formData.append('userNo', this.userNo)
      post(uploadFile, formData)
        .then(res => {
          if (res.success === true) {
            this.$message.success('导入成功！')
          } else {
            this.$message.error('导入失败！' + res.message)
          }
        })
        .catch(err => {
          this.$message.error('导入失败！' + err)
          console.log(err)
        })
    },
    //提交
    submitAdd() {
      //TODO 产线，产线类别，车间最后根据而工号查询生产
      let list = []
      if (this.doubleSelectList.length !== 0) {
        list = this.doubleSelectList
      } else {
        list = this.formInline.EquipDangers
      }
      //console.log('submitAdd:', list)
      let isForbidden = false
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.factoryNo.length === 0) {
          this.$message.warning(`第${i + 1}条数据产线未选择！`)
          isForbidden = true
          break
        }
        if (item.workDeptNo.length === 0) {
          this.$message.warning(`第${i + 1}条数据车间未选择！`)
          isForbidden = true
          break
        }
        if (item.majDelay.length === 0) {
          this.$message.warning(`第${i + 1}条数据专业未选择！`)
          isForbidden = true
          break
        }
        if (item.obsStarTime.length === 0) {
          this.$message.warning(`第${i + 1}条数据发现时间未选择！`)
          isForbidden = true
          break
        }
        if (item.areaNo.length === 0) {
          this.$message.warning(`第${i + 1}条数据隐患区域未选择！`)
          isForbidden = true
          break
        }
        if (item.equipNo.length === 0) {
          this.$message.warning(`第${i + 1}条数据设备名称未选择！`)
          isForbidden = true
          break
        }
        if (item.dangerDesc.length === 0) {
          this.$message.warning(`第${i + 1}条数隐患情况说明未输入！`)
          isForbidden = true
          break
        }
        if (item.fangerType.length === 0) {
          this.$message.warning(`第${i + 1}条数据隐患类型未选择！`)
          isForbidden = true
          break
        }
        // if (item.fangerGrade.length === 0) {
        //   this.$message.warning(`第${i + 1}条数据隐患级别未选择！`)
        //   isForbidden = true
        //   break
        // }
        if (item.emergencyResponse.length === 0) {
          this.$message.warning(`第${i + 1}条数据应急预案未输入！`)
          isForbidden = true
          break
        }
        if (item.expectTime.length === 0) {
          this.$message.warning(`第${i + 1}条数据计划何时处理未选择！`)
          isForbidden = true
          break
        }
        if (item.falMintue.length === 0) {
          this.$message.warning(`第${i + 1}条数据可能造成停机小时未输入！`)
          isForbidden = true
          break
        }
        if (
          new Date(item.obsStarTime).getTime() >
          new Date(item.expectTime + ' 23:59:59').getTime()
        ) {
          this.$message.warning(`第${i + 1}条数据发现时间大于处理时间！`)
          isForbidden = true
          break
        }
        if (new Date(item.obsStarTime).getTime() > new Date().getTime()) {
          this.$message.warning(`第${i + 1}条数据发现时间大于当前时间！`)
          isForbidden = true
          break
        }
      }
      if (isForbidden) return
      let timeoutIndexList = []
      //上报时间大于处理时间expectTime
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (
          new Date().getTime() >
          new Date(item.expectTime + ' 23:59:59').getTime()
        ) {
          // this.$message.warning(`第${i + 1}条数据发现时间大于处理时间！`)
          timeoutIndexList.push(i)
        }
      }
      if (timeoutIndexList.length !== 0) {
        let str = ''
        timeoutIndexList.forEach(item => (str += item + 1 + ','))
        this.$notify.warning({
          title: '上报时间大于计划处理时间',
          message:
            '存在上报时间大于计划处理时间的数据索引：' +
            str +
            ' 请及时更新处理状态是否完成！',
          duration: 2000
        })
      }
      list.forEach(item => {
        item.hndlStus = 'A'
        item.status = 'A'
        item.creUserNo = this.userNo
      })
      let obj = {
        EquipDangers: list,
        userNo: this.userNo
      }
      post(batchAdd, obj)
        .then(res => {
          if (res.success === true) {
            this.$message.success('新增成功！')
            this.doubleSelectList.forEach(item => {
              this.formInline.EquipDangers.forEach((ed, index) => {
                if (ed.deleteIndex === item.deleteIndex) {
                  this.formInline.EquipDangers.splice(index, 1)
                }
              })
            })
            this.doubleSelectList = []
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('新增失败！' + err)
          console.log(err)
        })
    },
    //删除
    deleteLine(val) {
      this.formInline.EquipDangers.splice(val, 1)
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  .el-form-header {
    display: flex;
    justify-content: flex-end;
    /deep/.el-form-item:nth-child(1) .el-button,
    /deep/.el-form-item:nth-child(2) .el-button,
    /deep/.el-form-item:nth-child(3) .el-button {
      background-color: #63c7bb;
      color: white;
    }
  }
}
/deep/.TableWidth .el-form-item__content {
  line-height: 33px;
  height: 33px;
}
/deep/.TableWidth .el-input__icon {
  line-height: 33px;
  height: 33px;
}
/deep/.TableWidth .el-input__inner {
  height: 33px;
  line-height: 33px;
}

.CardTable {
  margin-top: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
}
//隐患事项
.TableWidth {
  width: 98%;
  position: relative;
  margin-left: 15px;
  margin-top: 14px;
}
//表头换行，需结合这个样式才有效果
/deep/.el-table th > .cell {
  padding-left: 5px;
  padding-right: 5px;
  white-space: pre;
}
/deep/.el-table .el-table__fixed {
  height: auto !important;
  bottom: 11px !important;
  &::before {
    background-color: transparent;
  }
}
/deep/.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/deep/.el-scrollbar__wrap::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
</style>
