<template>
  <div class="contentBox">
    <el-form
      :inline="true"
      :model="searchForm"
      size="small"
    >
      <el-form-item label="产线">
        <el-select
          v-model="searchForm.factoryNo"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectFactory"
        >
          <el-option
            v-for="item in factoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车间">
        <el-select
          v-model="searchForm.workDeptNo"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectWorkDept"
        >
          <el-option
            v-for="item in newWorkDeptList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="searchForm.fangerType"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectFangerType"
        >
          <el-option
            v-for="item in fangerTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别">
        <el-select
          v-model="searchForm.fangerGrade"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectFangerGrade"
        >
          <el-option
            v-for="item in fangerGradeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上报节点">
        <el-select
          v-model="searchForm.hndlStus"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectHndlStus"
        >
          <el-option
            v-for="item in hndlStusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select
          v-model="searchForm.status"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectStatus"
        >
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超时">
        <el-select
          v-model="searchForm.isDelay"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectIsDelay"
        >
          <el-option
            v-for="item in delayList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集方式">
        <el-select
          v-model="searchForm.sourceType"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectIsAuto"
        >
          <el-option
            v-for="item in autoList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="searchForm.beginDate"
          type="date"
          style="width: 180px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"
        >
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.endDate"
          type="date"
          style="width: 180px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="searchForm.dangerDesc"
          style="width: 180px"
          clearable
          placeholder="请输入情况说明关键字"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="仅查自己">
        <el-radio-group v-model="searchForm.isSelf">
          <el-radio :label="1">
            是
          </el-radio>
          <el-radio :label="0">
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="clickQuery"
        >
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-download"
          @click="downloadExcel"
        >
          导出
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-download"
          @click="downloadExcelDetail"
        >
          导出详情
        </el-button>
      </el-form-item>
    </el-form>

    <el-card class="CardTable">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableList"
        :height="'calc(100vh - 350px)'"
        :row-key="getRowKey"
        :cell-class-name="setCellClassName"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        class="TableWidth"
        border
        @row-dblclick="dbClick"
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
        >
          <template slot-scope="scope">
            <span>{{ comsys.tableRowIndex(scope.$index, searchForm.pageIndex, searchForm.pageSize) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="产线"
          fixed
          show-overflow-tooltip
          prop="factoryName"
          width="90"
        >
        </el-table-column>
        <el-table-column
          label="产线类别"
          fixed
          show-overflow-tooltip
          prop="factoryGradeName"
          width="90"
        >
        </el-table-column>
        <el-table-column
          label="车间"
          fixed
          show-overflow-tooltip
          prop="workDeptName"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="majDelayName"
          show-overflow-tooltip
          label="专业"
          fixed
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="obsStarTime"
          label="发现时间"
          fixed
          show-overflow-tooltip
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="area"
          label="隐患区域"
          fixed
          width="140"
        />
        <el-table-column
          prop="dangerDesc"
          width="260"
          label="隐患情况说明"
        />
        <el-table-column
          prop="fangerTypeName"
          label="隐患类型"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="hndlStusName"
          label="上报节点"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="sourceType"
          label="采集方式"
          width="90"
        >
          <template slot-scope="scope">
            {{ scope.row.sourceType=='A'?'人工':scope.row.sourceType=='B'?'自动':'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="expectTime"
          label="计划处理时间"
          sortable
          show-overflow-tooltip
          width="140"
        >
          <template slot-scope="scope">
            <el-tooltip
              :disabled="scope.row.color === 'red' ? false : scope.row.color === 'yellow' ? false : true"
              :content="scope.row.color === 'red' ? '红色：超期' : scope.row.color === 'yellow' ? '橙色：临期': false"
              class="item"
              effect="dark"
              placement="top"
            >
              <span
                :class="scope.row.color === 'red' ? 'textStyleRed' : scope.row.color === 'yellow' ? 'textStyleYellow':''"
              >
                {{ scope.row.expectTime }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="fangerGrade"
          label="隐患级别"
          sortable
          width="110"
        >
          <template slot-scope="scope">
            <span
              v-show="scope.row.fangerGrade === 'A'"
              slot="reference"
            >
              <i
                class="dotClass"
                style="background-color: #61A4E4"
              ></i> 一般
            </span>
            <span
              v-show="scope.row.fangerGrade === 'B'"
              slot="reference"
            >
              <i
                class="dotClass"
                style="background-color: #FFA958"
              ></i> 较大
            </span>
            <span
              v-show="scope.row.fangerGrade === 'C'"
              slot="reference"
            >
              <i
                class="dotClass"
                style="background-color: #F56C6C"
              ></i> 重大
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="emergencyResponse"
          label="应急预案"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="workContent"
          label="处置过程跟踪"
          width="180"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.workContent"
              :disabled="scope.row.isDisable"
              placeholder="请填写"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="isFinish"
          label="是否完成"
          sortable
          width="110"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.isFinish"
              :disabled="scope.row.isDisable"
              clearable
              @change="selectIsFinish(scope.row)"
            >
              <el-option
                v-for="item in yesOrNotList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="hndlType"
          label="处置方法"
          width="180"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.hndlType"
              :disabled="scope.row.isDisable||scope.row.disableHandleType"
              placeholder="请填写"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="creUserNo"
          label="上报人"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.creUserNo }} {{ scope.row.creUserName }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isFinish!=='Y'||!scope.row.isDisable"
              size="mini"
              type="text"
              @click="clickUpdate(scope.row)"
            >
              {{ scope.row.isDisable ? '处理' : '修改' }}
            </el-button>
            <el-button
              v-show="!scope.row.isDisable"
              size="mini"
              type="text"
              @click="clickCancel(scope.row)"
            >
              取消
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="lookDetails(scope.row)"
            >
              查看详情
            </el-button>
            <el-button
              v-command="'/EquipDangerManage/InformatmManage/historyRiskInformation/delete'"
              size="mini"
              type="text"
              @click="clickDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchForm.pageIndex"
        :page-sizes="[16, 50, 100, 1000]"
        :page-size="searchForm.pageSize"
        :total="total"
        class="pagPath"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="隐患详情"
      width="40%"
    >
      <div style="border:1px solid #CCC;width: 100%"></div>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            产线
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.factoryName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            产线类别
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.factoryGradeName }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            车间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.workDeptName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            专业
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.majDelayName }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            发现时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.obsStarTime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            上报时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.creDate }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患区域
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.area }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患情况说明
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.dangerDesc }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患类型
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.fangerTypeName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患状态
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.hndlStusName }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患单处理状态
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.statusName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            采集方式
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.sourceType=='A'?'人工':dialogData.sourceType=='B'?'自动':'' }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            计划处理时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.expectTime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患级别
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.fangerGradeName }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            应急预案
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.emergencyResponse }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            上报人
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.creUserNo }} {{ dialogData.creUserName }}
          </div>
        </el-col>
      </el-row>
      <div style="margin-top: 25px;margin-left: 20px">
        <span
          style="font-weight: 400;font-size: 18px;color: #303133;margin-top: 20px"
        >处置过程</span>
      </div>
      <el-row>
        <el-steps
          :active="dialogData.handles&&dialogData.handles.length"
          style="margin-top: 5px;margin-left: 20px"
        >
          <el-step
            v-for="item in dialogData.handles"
            :key="item.id"
            :title="item.creDateTime"
            :description="item.creUserNo+'-'+item.creUserName+' '+' '+item.workContent"
          ></el-step>
        </el-steps>
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
            {{ dialogData.hndlType }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            是否完成
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.isFinish==='Y'?'是':'否' }}
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 注释掉接口导入，避免引用错误
// import {
//   addDangerHandleRecord,
//   batchDeleteDangerInfoList,
//   batchUpdateDangerInfoList,
//   downloadExcel,
//   downloadExcelDetail,
//   findAllByTableId,
//   findAllDangerHandleRecord,
//   findAllDangerInfoList,
//   hiddenDangerUpdate,
//   queryWorkDeptInfo
// } from '@/lib/RiskManageApi'
// import { post } from '@/lib/Util'
import {
  date2md,
  dateCompare,
  dateToNowH,
  getMonthFirstDay,
  getMonthLastDay
} from '@/utils/dateUtil'

export default {
  // layout: 'test',
  name: 'HistoryRiskInformation',
  data() {
    return {
      loading: false,
      userNo: 'testUser001', // 假数据：用户编号
      userInfo: { name: '测试用户', dept: '技术部' }, // 假数据：用户信息
      searchForm: {
        isSelf: 0,
        factoryCode: '',
        factoryNo: '', //产线
        factoryName: '',
        workDeptNo: '', //车间
        workDeptName: '',
        fangerType: '', //类型
        fangerTypeName: '',
        fangerGrade: '', //级别
        fangerGradeName: '',
        dateRange: '',
        beginDate: getMonthFirstDay(), //开始日期
        endDate: getMonthLastDay(), //结束日期
        dangerDesc: '', //关键字
        isSubmit: '', //是否已提交 Y 已提交 N 未提交
        isAplay: 'Y', //是否已申报 Y 已申报 N 未申报
        hndlStus: '', //隐患处理状态 A 新建 B 已提交 C 已申报 D 处理中 E 已完成
        hndlStusName: '',
        status: '', //隐患处理状态
        statusName: '',
        isDelay: '', //是否超时
        isDelayName: '',
        isAuto: '', //采集方式手动自动
        isAutoName: '',
        sourceType: '',
        pageIndex: 1,
        pageSize: 16
      }, //列表外层查询表单
      //产线 - 假数据
      factoryList: [
        { id: 'F1', name: '冷轧产线', orgCode: 'F001' },
        { id: 'F2', name: '热轧产线', orgCode: 'F002' },
        { id: 'F3', name: '镀锌产线', orgCode: 'F003' }
      ],
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
        }
      ],
      newWorkDeptList: [],
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
      //是否已提交
      isSubmitList: [
        {
          id: 'Y',
          name: '已提交'
        },
        {
          id: 'N',
          name: '未提交'
        }
      ],
      //是否已申报
      isApplyList: [
        {
          id: 'Y',
          name: '已申报'
        },
        {
          id: 'N',
          name: '未申报'
        }
      ],
      // 隐患处理状态
      hndlStusList: [
        {
          id: 'A',
          name: '新建'
        },
        {
          id: 'B',
          name: '已上报分厂'
        },
        {
          id: 'C',
          name: '已上报事业部'
        },
        {
          id: 'D',
          name: '已申报'
        },
        {
          id: 'E',
          name: '已完成'
        }
      ],
      // 超时
      delayList: [
        {
          id: 'Y',
          name: '是'
        },
        {
          id: 'N',
          name: '否'
        }
      ],
      // 隐患单处理状态
      statusList: [
        {
          id: 'A',
          name: '未处理'
        },
        {
          id: 'E',
          name: '已处理'
        }
      ],
      // 手动自动
      autoList: [
        {
          id: 'A',
          name: '人工'
        },
        {
          id: 'B',
          name: '自动'
        }
      ],
      //是否完成
      yesOrNotList: [
        {
          id: 'Y',
          name: '是'
        },
        {
          id: 'N',
          name: '否'
        }
      ],
      tableList: [], // 表格数据将由假数据填充
      total: 0, // 总条数将由假数据填充
      selectChangeList: [],
      dangerDesc: '', // 隐患情况说明
      emergencyResponse: '', //应急预案
      hndlType: '', //处置方法
      workContentList: [], //处置过程跟踪
      equipDangersHeader: [
        {
          header: '隐患单编号',
          key: 'dangerNo',
          width: 20,
          style: { numFmt: '@' }
        },
        {
          header: '产线',
          key: 'factoryName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '产线类别',
          key: 'factoryGradeName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '车间',
          key: 'workDeptName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '专业',
          key: 'majDelayName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '发现时间',
          key: 'obsStarTime',
          width: 20,
          style: { numFmt: 'YYYY-MM-DD HH:mm:ss' }
        },
        {
          header: '上报时间',
          key: 'creDate',
          width: 20,
          style: { numFmt: 'YYYY-MM-DD HH:mm:ss' }
        },
        { header: '隐患区域', key: 'area', width: 10, style: { numFmt: '@' } },
        {
          header: '隐患情况说明',
          key: 'dangerDesc',
          width: 30,
          style: { numFmt: '@' }
        },
        {
          header: '隐患类型',
          key: 'fangerTypeName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '隐患级别',
          key: 'fangerGradeName',
          width: 10,
          style: { numFmt: '' }
        },
        {
          header: '隐患状态',
          key: 'hndlStusName',
          width: 10,
          style: { numFmt: '' }
        },
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
          style: { numFmt: 'YYYY-MM-DD HH:mm:ss' }
        },
        {
          header: '造成产线停机时间(小时)',
          key: 'falMintue',
          width: 30,
          style: { numFmt: '' }
        },
        {
          header: '是否完成',
          key: 'isFinishName',
          width: 20,
          style: { numFmt: '' }
        },
        {
          header: '处置方法',
          key: 'hndlType',
          width: 20,
          style: { numFmt: '@' }
        }
      ], //隐患列表导出Header
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
        }
      ], //隐患列表导出数据验证
      majDelayListHeader: [], //专业类型
      fangerTypeListHeader: [], // 隐患类型
      fangerGradeListHeader: [], // 隐患级别
      factoryListHeader: [
        { id: 'F1', name: '冷轧产线' },
        { id: 'F2', name: '热轧产线' }
      ], //产线假数据
      factoryGradeListHeader: [], //产线类别
      isFinishListHeader: [], //是否完成
      isShowFactory: false,
      isShowBusi: false,
      allSelected: false, //全选
      isIndeterminate: false, //不确定状态
      dialogVisible: false,
      roleList: ['admin', 'operator'], // 假数据：用户角色
      dialogData: {}
    }
  },
  watch: {
    tableList: {
      handler: function(val, oldVal) {
        let allChecked = true
        let allNotChecked = true
        this.selectChangeList = []
        val.forEach(item => {
          if (item.checked) {
            allNotChecked = false
            this.isIndeterminate = true
            this.selectChangeList.push(item)
          } else {
            allChecked = false
          }
        })
        this.allSelected = allChecked
        if (allChecked) {
          this.isIndeterminate = false
        }
      },
      deep: true
    }
  },
  created() {
    console.log('this.userNo', this.userNo)
    console.log('userInfo', this.userInfo)
    console.log('factoryList', this.factoryList)
    console.log('roleList', this.roleList)

    // 注释接口调用，使用假数据初始化
    Promise.all([this.initParams()]).then(() => {
      this.loadFakeTableData() // 加载假表格数据
    })
    this.findSelect()
    this.findMajDelayList()
    this.initHeader()
  },
  methods: {
    // 生成假表格数据
    loadFakeTableData() {
      this.loading = true
      // 模拟网络请求延迟
      setTimeout(() => {
        this.tableList = [
          {
            id: 'D001',
            checked: false,
            factoryName: '冷轧产线',
            factoryGradeName: '主要产线',
            workDeptName: '原料车间',
            majDelayName: '电气',
            obsStarTime: '2023-10-01 08:30:00',
            area: '原料区A段',
            dangerDesc: '传送带异响，可能存在轴承磨损',
            fangerTypeName: '生产',
            hndlStusName: '已上报分厂',
            sourceType: 'A',
            expectTime: '2023-10-05 16:00:00',
            color: 'yellow',
            fangerGrade: 'B',
            emergencyResponse: '立即停机检查，更换备用传送带',
            workContent: '已安排维修人员到场',
            isFinish: 'N',
            isDisable: false,
            disableHandleType: false,
            hndlType: '更换轴承',
            creUserNo: 'U001',
            creUserName: '张三'
          },
          {
            id: 'D002',
            checked: false,
            factoryName: '热轧产线',
            factoryGradeName: '重要产线',
            workDeptName: '精炼车间',
            majDelayName: '机械',
            obsStarTime: '2023-10-02 10:15:00',
            area: '精炼炉区域',
            dangerDesc: '炉温传感器读数异常',
            fangerTypeName: '质量',
            hndlStusName: '已完成',
            sourceType: 'B',
            expectTime: '2023-10-03 12:00:00',
            color: '',
            fangerGrade: 'A',
            emergencyResponse: '校准传感器，必要时更换',
            workContent: '已校准传感器，读数恢复正常',
            isFinish: 'Y',
            isDisable: true,
            disableHandleType: true,
            hndlType: '传感器校准',
            creUserNo: 'U002',
            creUserName: '李四'
          },
          {
            id: 'D003',
            checked: false,
            factoryName: '镀锌产线',
            factoryGradeName: '辅助产线',
            workDeptName: '运行车间',
            majDelayName: '液压润滑',
            obsStarTime: '2023-10-03 14:20:00',
            area: '镀锌槽区域',
            dangerDesc: '液压管路轻微泄漏',
            fangerTypeName: '安全',
            hndlStusName: '已上报事业部',
            sourceType: 'A',
            expectTime: '2023-10-02 09:00:00',
            color: 'red',
            fangerGrade: 'C',
            emergencyResponse: '立即停机，更换密封件',
            workContent: '等待备件到达',
            isFinish: 'N',
            isDisable: false,
            disableHandleType: false,
            hndlType: '更换密封件及相关管路',
            creUserNo: 'U003',
            creUserName: '王五'
          }
        ]
        this.total = 24 // 假数据总条数
        this.loading = false
      }, 500)
    },

    //解析路由参数
    async initParams() {
      if (this.$route.query.type) {
        switch (this.$route.query.type) {
          case 'NOMAL': //一般隐患
            this.searchForm.fangerGrade = 'A'
            this.searchForm.fangerGradeName = '一般隐患'
            this.searchForm.status = 'A'
            break
          case 'BIGGER': //较大隐患
            this.searchForm.fangerGrade = 'B'
            this.searchForm.fangerGradeName = '较大隐患'
            this.searchForm.status = 'A'
            break
          case 'MAJOR': //重大隐患
            this.searchForm.fangerGrade = 'C'
            this.searchForm.fangerGradeName = '重大隐患'
            this.searchForm.status = 'A'
            break
          case 'TOTAL': //合计
            this.searchForm.fangerGrade = ''
            this.searchForm.fangerGradeName = ''
            this.searchForm.status = 'A'
            break
          case 'DEAL': //已处理
            this.searchForm.status = 'E'
            break
          case 'NOTDEAL': //未处理
            this.searchForm.status = 'A'
            break
        }
        if (this.$route.query.factoryNo) {
          if (this.$route.query.factoryNo !== '3') {
            const fl = this.factoryList.find(
              item => item.id === this.$route.query.factoryNo
            )
            if (fl) {
              this.searchForm.factoryNo = fl.id
              this.searchForm.factoryName = fl.name
              this.searchForm.factoryCode = fl.orgCode
              // 注释接口调用，使用假数据
              // await this.queryWorkDept(this.searchForm.factoryCode, '1')
              this.newWorkDeptList = this.workDeptList.filter(
                item => item.id <= 3
              )
            }
          }
        }
        if (this.$route.query.fangerGrade) {
          this.searchForm.fangerGrade = this.$route.query.fangerGrade
        }
      }
    },

    // 生成假的详情数据
    getFakeDetailData(row) {
      return {
        ...row,
        creDate: '2023-10-01 09:15:00',
        statusName: row.isFinish === 'Y' ? '已处理' : '未处理',
        fangerGradeName:
          row.fangerGrade === 'A'
            ? '一般隐患'
            : row.fangerGrade === 'B'
              ? '较大隐患'
              : '重大隐患',
        handles: [
          {
            id: 'H001',
            creDateTime: '2023-10-01 09:30:00',
            creUserNo: row.creUserNo,
            creUserName: row.creUserName,
            workContent: '发现隐患并上报'
          },
          {
            id: 'H002',
            creDateTime: '2023-10-01 10:15:00',
            creUserNo: 'U004',
            creUserName: '赵六',
            workContent: '收到上报，安排处理'
          }
        ]
      }
    },

    // 以下为原有方法，接口调用部分已注释，添加必要的假数据处理

    findSelect() {
      // 注释接口调用
      // post('/api/xxx', {}).then(res => {
      //   // 处理逻辑
      // })

      // 假数据处理
      this.newWorkDeptList = this.workDeptList
    },

    findMajDelayList() {
      // 假数据处理，直接使用已有数据
      this.majDelayListHeader = this.majDelayList.map(item => item.name)
    },

    initHeader() {
      // 假数据初始化
      this.fangerTypeListHeader = this.fangerTypeList.map(item => item.name)
      this.fangerGradeListHeader = this.fangerGradeList.map(item => item.name)
      this.isFinishListHeader = this.yesOrNotList.map(item => item.name)
    },

    query() {
      // 注释接口调用
      // this.loading = true;
      // findAllDangerInfoList(this.searchForm).then(res => {
      //   this.tableList = res.data.list;
      //   this.total = res.data.total;
      //   this.loading = false;
      // }).catch(err => {
      //   this.loading = false;
      // });

      // 使用假数据
      this.loadFakeTableData()
    },

    clickQuery() {
      this.searchForm.pageIndex = 1
      this.query()
    },

    pageSizeChange(val) {
      this.searchForm.pageSize = val
      this.searchForm.pageIndex = 1
      this.query()
    },

    currentPageChange(val) {
      this.searchForm.pageIndex = val
      this.query()
    },

    selectFactory(val) {
      const factory = this.factoryList.find(item => item.id === val)
      if (factory) {
        this.searchForm.factoryName = factory.name
        this.searchForm.factoryCode = factory.orgCode
      } else {
        this.searchForm.factoryName = ''
        this.searchForm.factoryCode = ''
      }

      // 注释接口调用
      // this.queryWorkDept(this.searchForm.factoryCode, '1').then(() => {
      //   this.searchForm.workDeptNo = '';
      // });

      // 假数据处理
      this.newWorkDeptList = this.workDeptList
    },

    selectWorkDept(val) {
      const dept = this.newWorkDeptList.find(item => item.id === val)
      this.searchForm.workDeptName = dept ? dept.name : ''
    },

    selectFangerType(val) {
      const type = this.fangerTypeList.find(item => item.id === val)
      this.searchForm.fangerTypeName = type ? type.name : ''
    },

    selectFangerGrade(val) {
      const grade = this.fangerGradeList.find(item => item.id === val)
      this.searchForm.fangerGradeName = grade ? grade.name : ''
    },

    selectHndlStus(val) {
      const status = this.hndlStusList.find(item => item.id === val)
      this.searchForm.hndlStusName = status ? status.name : ''
    },

    selectStatus(val) {
      const status = this.statusList.find(item => item.id === val)
      this.searchForm.statusName = status ? status.name : ''
    },

    selectIsDelay(val) {
      const delay = this.delayList.find(item => item.id === val)
      this.searchForm.isDelayName = delay ? delay.name : ''
    },

    selectIsAuto(val) {
      const auto = this.autoList.find(item => item.id === val)
      this.searchForm.isAutoName = auto ? auto.name : ''
    },

    handleAllSelectedChange(val) {
      this.tableList.forEach(item => {
        item.checked = val
      })
    },

    handleSelectedChange() {
      // 由watch监听处理
    },

    lookDetails(row) {
      // 注释接口调用
      // findAllDangerHandleRecord(row.id).then(res => {
      //   this.dialogData = { ...row, handles: res.data };
      //   this.dialogVisible = true;
      // });

      // 使用假数据
      this.dialogData = this.getFakeDetailData(row)
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    },

    dbClick(row) {
      this.lookDetails(row)
    },

    clickUpdate(row) {
      // 模拟修改操作
      row.isDisable = !row.isDisable
    },

    clickCancel(row) {
      // 模拟取消操作
      row.isDisable = true
    },

    clickDelete(row) {
      // 模拟删除操作
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableList = this.tableList.filter(item => item.id !== row.id)
          this.total--
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    selectIsFinish(row) {
      // 模拟选择是否完成
      console.log('选择是否完成:', row.isFinish)
    },

    downloadExcel() {
      // 注释接口调用
      // downloadExcel(this.searchForm).then(res => {
      //   // 处理下载逻辑
      // });

      // 模拟下载提示
      this.$message({
        type: 'info',
        message: '导出功能已触发（模拟）'
      })
    },

    downloadExcelDetail() {
      // 注释接口调用
      // downloadExcelDetail(this.searchForm).then(res => {
      //   // 处理下载逻辑
      // });

      // 模拟下载提示
      this.$message({
        type: 'info',
        message: '导出详情功能已触发（模拟）'
      })
    },

    getRowKey(row) {
      return row.id
    },

    setCellClassName({ row, column, rowIndex, columnIndex }) {
      // 保持原有样式逻辑
      return ''
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  padding: 15px;
}

//表格外层卡片样式
.CardTable {
  margin-top: 16px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
}

//表格样式
.TableWidth {
  width: 98%;
  position: relative;
  margin-left: 15px;
  margin-top: 14px;
}

//分页
.pagPath {
  margin-top: 14px;
  margin-left: 15px;
  margin-bottom: 7px;
}

//隐患级别颜色圆点
.dotClass {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px; //这个用于圆点居中
}

//序号1
.num1 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #303133;
  text-align: center;
  margin-left: 20px;
  margin-top: 5px;
}

.el-step {
  white-space: pre;
}

.textStyleNormal {
  color: grey;
}

.textStyleYellow {
  color: #ffa958;
}

.textStyleRed {
  color: #f56c6c;
}

/deep/ .el-table .status_green {
  background: #90ee90;
}
/deep/ .el-table__body-wrapper {
  z-index: 2;
}
/deep/.el-table .el-table__fixed {
  height: auto !important;
  bottom: 11px !important;
  &::before {
    background-color: transparent;
  }
}
/deep/.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/deep/.el-scrollbar__wrap::-webkit-scrollbar {
  width: 10px;
  height: 10px;
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
