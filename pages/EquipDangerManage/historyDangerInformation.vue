<template>
  <div class="contentBox">
    <el-form
      :inline="true"
      :model="searchForm"
      size="small"
    >
      <el-form-item
        label="产线"
      >
        <el-select
          v-model="searchForm.factoryNo"
          clearable
          style="width: 138px"
          placeholder="请选择"
          @change="selectFactory"
        >
          <el-option
            v-for="item in newFactoryList"
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
          style="width: 140px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"
        >
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.endDate"
          type="date"
          style="width: 140px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="display: none"
        label=""
      >
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
      <el-form-item v-if="isShowFactory">
        <el-button
          type="primary"
          icon="el-icon-thumb"
          @click="clickReport"
        >
          上报分厂
        </el-button>
      </el-form-item>
      <!--      <el-form-item v-if="isShowBusi">
        <el-button
          type="primary"
          icon="el-icon-thumb"
          @click="clickApproval"
        >
          上报事业部
        </el-button>
      </el-form-item>-->
    </el-form>

    <el-card class="CardTable">
      <el-form :model="$data">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="EquipDangers"
          :height="'calc(100vh - 350px)'"
          :row-key="getRowKey"
          :row-class-name="tableRowClassName"
          :cell-style="rowStyle"
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
            prop="factoryNo"
            label="产线"
            show-tooltip-when-overflow
            width="90"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.factoryNo'"
                :rules="[{ required: true, message: '请选择产线', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.factoryNo"
                  :disabled="scope.row.transFal==1?true:false"
                  placeholder="请选择"
                  clearable
                  @change="selectFactory2(scope.row)"
                >
                  <el-option
                    v-for="item in factoryList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{ scope.row.factoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="factoryGrade"
            label="产线类别"
            show-tooltip-when-overflow
            width="90"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.factoryGrade'"
                :rules="[{ required: true, message: '请选择产线类别', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.factoryGrade"
                  :disabled="scope.row.transFal==1?true:false"
                  placeholder="请选择"
                  clearable
                  @change="selectFactoryGrade(scope.row)"
                >
                  <el-option
                    v-for="item in factoryGradeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{ scope.row.factoryGradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="workDeptNo"
            label="车间"
            show-tooltip-when-overflow
            width="90"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.workDeptNo'"
                :rules="[{ required: true, message: '请选择车间', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.workDeptNo"
                  :disabled="scope.row.transFal==1?true:false"
                  placeholder="请选择"
                  clearable
                  @change="selectWorkDept2(scope.row)"
                >
                  <el-option
                    v-for="item in newWorkDeptList2"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{ scope.row.workDeptName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="majDelay"
            label="专业"
            show-tooltip-when-overflow
            width="90"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.majDelay'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.majDelay"
                  :disabled="scope.row.transFal==1?true:false"
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
              <span v-else>{{ scope.row.majDelayName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="obsStarTime"
            label="发现时间"
            show-tooltip-when-overflow
            width="160"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.obsStarTime'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-date-picker
                  v-model="scope.row.obsStarTime"
                  :disabled="scope.row.transFal==1?true:false"
                  type="datetime"
                  style="width: 168px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>
              <span v-else>{{ scope.row.obsStarTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="area"
            label="隐患区域"
            show-tooltip-when-overflow
            width="140"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.area'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.area"
                  :disabled="scope.row.transFal==1?true:false"
                  type="textarea"
                  autosize
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.area }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dangerDesc"
            label="隐患情况说明"
            width="260"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.dangerDesc'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.dangerDesc"
                  :disabled="scope.row.transFal==1?true:false"
                  type="textarea"
                  autosize
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.dangerDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fangerType"
            label="隐患类型"
            show-tooltip-when-overflow
            width="90"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.fangerType'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-select
                  v-model="scope.row.fangerType"
                  :disabled="scope.row.transFal==1?true:false"
                  placeholder="请选择"
                  clearable
                  @change="selectFangerType2(scope.row)"
                >
                  <el-option
                    v-for="item in fangerTypeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{ scope.row.fangerTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hndlStusName"
            label="上报节点"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="fangerGrade"
            label="隐患级别"
            show-tooltip-when-overflow
            width="100"
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
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
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
              <span v-else>{{ scope.row.emergencyResponse }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sourceType"
            label="采集方式"
            width="90"
          >
            <template v-slot="scope">
              {{ scope.row.sourceType == 'A' ? '人工' : scope.row.sourceType == 'B' ? '自动' : '' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="expectTime"
            label="计划何时处理"
            show-tooltip-when-overflow
            width="180"
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
                >{{ scope.row.expectTime }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            :label="'可能造成产线停机时间(小时)'"
            show-tooltip-when-overflow
            prop="falMintue"
            width="110"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.falMintue'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]"
              >
                <el-input
                  v-model="scope.row.falMintue"
                  placeholder="请填写"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.falMintue }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="workContent"
            label="处置过程跟踪"
            show-tooltip-when-overflow
            width="180"
          >
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEditable"
                v-model="scope.row.workContent"
                :disabled="scope.row.isDisable"
                placeholder="请填写"
              ></el-input>
              <span v-else>{{ scope.row.workContent }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isFinish"
            label="是否完成"
            show-tooltip-when-overflow
            sortable
            width="110"
          >
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.isEditable"
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
              <span v-else>{{ scope.row.isFinishName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hndlType"
            label="处置方法"
            show-tooltip-when-overflow
            width="180"
          >
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEditable"
                v-model="scope.row.hndlType"
                :disabled="scope.row.isDisable||scope.row.disableHandleType"
                placeholder="请填写"
              ></el-input>
              <span v-else>{{ scope.row.hndlType }}</span>
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
            label="操作"
            prop=""
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="clickUpdate(scope.row)"
              >
                {{ scope.row.isEditable ? '确认' : '修改' }}
              </el-button>
              <el-button
                v-show="scope.row.isEditable"
                size="mini"
                type="text"
                @click="clickCancel(scope.row)"
              >
                取消
              </el-button>
              <el-button
                v-if="scope.row.hndlStus==='B'||scope.row.hndlStus==='C'"
                size="mini"
                type="text"
                @click="clickBack(scope.row)"
              >
                退回
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="lookDetails(scope.row)"
              >
                查看详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="changeTime(scope.row)"
              >
                变更时间
              </el-button>
              <el-button
                v-command="'/EquipDangerManage/InformatmManage/historyDangerInformation/delete'"
                v-if="scope.row.hndlStus==='A'&&scope.row.isFinish!=='Y'"
                size="mini"
                type="text"
                @click="clickDelete(scope.row)"
              >
                删除
              </el-button>
              <el-button
                :disabled="scope.row.transFal==1?true:false"
                size="mini"
                type="text"
                style="color: orange"
                @click="TurnHiddenDangers(scope.row)"
              >
                {{ scope.row.transFal == 1 ? '已转故障' : '转故障' }}
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
      </el-form>
    </el-card>

    <!-- 变更对话框 -->
    <el-dialog
      :visible.sync="dialogVisibleModify"
      :close-on-click-modal="false"
      :before-close="handleCloseModify"
      title="变更"
      width="30%"
    >
      <el-form
        ref="formInlineModify"
        :inline="false"
        :rules="rulesModify"
        :label-position="labelPositionModify"
        :model="formInlineModify"
      >
        <el-form-item
          label-width="120px"
          prop="expectTime"
          label="计划何时处理"
          style="margin-top: 25px"
        >
          <el-date-picker
            v-model="formInlineModify.expectTime"
            type="datetime"
            placeholder="选择日期"
            @change="changeExpectTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label-width="120px"
          prop="updDetail"
          label="变更原因"
          style="margin-top: 25px"
        >
          <el-input
            v-model="formInlineModify.updDetail"
            :rows="2"
            type="textarea"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleCancelModify()">取 消</el-button>
        <el-button
          type="primary"
          @click="clickDialogVisibleModify('formInlineModify')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 隐患详情 -->
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
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            产线
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.factoryName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            产线类别
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.factoryGradeName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            车间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.workDeptName }}
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            发现时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.obsStarTime }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            上报时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.creDate }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患区域
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.area }}
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患类型
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.fangerTypeName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患状态
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.hndlStusName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患单处理状态
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.statusName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            采集方式
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.sourceType == 'A' ? '人工' : dialogData.sourceType == 'B' ? '自动' : '' }}
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px"
      >
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            计划处理时间
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.expectTime }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            隐患级别
          </div>
          <div
            v-if="dialogData.fangerGrade==='A'"
            style="margin-top: 8px;color: #61A4E4"
          >
            一般隐患
          </div>
          <div
            v-else-if="dialogData.fangerGrade==='B'"
            style="margin-top: 8px;color: #FFA958"
          >
            较大隐患
          </div>
          <div
            v-else-if="dialogData.fangerGrade==='C'"
            style="margin-top: 8px;color: #F56C6C"
          >
            重大隐患
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            应急预案
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.emergencyResponse }}
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            处置方法
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.hndlType }}
          </div>
        </el-col>
        <el-col :span="6">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">
            是否完成
          </div>
          <div style="margin-top: 8px">
            {{ dialogData.isFinish === 'Y' ? '是' : '否' }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="headStyle">变更履历</span>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px"
        >
          <el-table
            :data="tableData"
            :height="'calc(100vh - 745px)'"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="expectTime"
              show-overflow-tooltip
              align="center"
              label="原计划时间"
            >
            </el-table-column>
            <el-table-column
              prop="scheduleTime"
              show-overflow-tooltip
              align="center"
              label="变更时间"
            >
            </el-table-column>
            <el-table-column
              prop="userNo"
              show-overflow-tooltip
              align="center"
              label="变更人员编号"
            >
            </el-table-column>
            <el-table-column
              prop="userName"
              show-overflow-tooltip
              align="center"
              label="变更人员"
            >
            </el-table-column>
            <el-table-column
              prop="reason"
              show-overflow-tooltip
              align="center"
              label="变更原因"
            >
            </el-table-column>
            <el-table-column
              prop="submitDate"
              show-overflow-tooltip
              align="center"
              label="变更日期"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 注释掉接口导入，避免接口调用错误
// import {
//   addDangerHandleRecord,
//   batchDeleteDangerInfoList,
//   batchUpdateDangerInfoList,
//   findAllByTableId,
//   findAllDangerHandleRecord,
//   findAllDangerInfoList,
//   queryWorkDeptInfo,
//   Turn_To_Hidden_Dangers,
//   updatePlanDate
// } from '@/lib/RiskManageApi'
// import { post } from '@/lib/Util'
import {
  dateCompare,
  dateToNowH,
  getMonthFirstDay,
  getMonthLastDay
} from '@/utils/dateUtil'
import moment from 'moment'

export default {
  // layout: 'test',
  name: 'HistoryDangerInformation',
  data() {
    return {
      dangerNoPram: null,
      expectTimePram: null,
      scheduleTimePram: null,
      tableData: [],
      currentFormat: 'yyyy-MM-dd HH:mm:ss',
      currentValueFormat: 'yyyy-MM-dd HH:mm:ss',
      formInlineModify: {
        expectTime: '',
        updDetail: ''
      },
      dialogVisibleModify: false,
      updateExceptTime: null,
      labelPositionModify: 'right',
      rulesModify: {
        expectTime: [
          { required: true, message: '请选择计划处理时间', trigger: 'change' }
        ],
        updDetail: [
          { required: true, message: '请填写变更原因', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogData: {},
      comsys: {
        tableRowIndex: (index, pageIndex, pageSize) => {
          return (pageIndex - 1) * pageSize + index + 1
        }
      },
      searchForm: {
        pageIndex: 1,
        pageSize: 16,
        factoryNo: '',
        workDeptNo: '',
        fangerType: '',
        fangerGrade: '',
        hndlStus: '',
        status: '',
        isDelay: '',
        sourceType: '',
        beginDate: '',
        endDate: '',
        dangerDesc: '',
        isSelf: 0
      },
      // 假数据：产线列表
      newFactoryList: [
        { id: 'F001', name: '产线一' },
        { id: 'F002', name: '产线二' },
        { id: 'F003', name: '产线三' }
      ],
      // 假数据：车间列表
      newWorkDeptList: [
        { id: 'W001', name: '车间一' },
        { id: 'W002', name: '车间二' }
      ],
      // 假数据：隐患类型列表
      fangerTypeList: [
        { id: 'T001', name: '设备故障' },
        { id: 'T002', name: '操作不当' },
        { id: 'T003', name: '环境因素' }
      ],
      // 假数据：隐患级别列表
      fangerGradeList: [
        { id: 'A', name: '一般' },
        { id: 'B', name: '较大' },
        { id: 'C', name: '重大' }
      ],
      // 假数据：上报节点列表
      hndlStusList: [
        { id: 'A', name: '初始' },
        { id: 'B', name: '分厂' },
        { id: 'C', name: '事业部' }
      ],
      // 假数据：处理状态列表
      statusList: [
        { id: '0', name: '未处理' },
        { id: '1', name: '处理中' },
        { id: '2', name: '已处理' }
      ],
      // 假数据：超时列表
      delayList: [{ id: '0', name: '未超时' }, { id: '1', name: '已超时' }],
      // 假数据：采集方式列表
      autoList: [{ id: 'A', name: '人工' }, { id: 'B', name: '自动' }],
      // 假数据：产线列表（表格内使用）
      factoryList: [
        { id: 'F001', name: '产线一' },
        { id: 'F002', name: '产线二' },
        { id: 'F003', name: '产线三' }
      ],
      // 假数据：产线类别列表
      factoryGradeList: [
        { id: 'G001', name: '一类' },
        { id: 'G002', name: '二类' }
      ],
      // 假数据：车间列表（表格内使用）
      newWorkDeptList2: [
        { id: 'W001', name: '车间一' },
        { id: 'W002', name: '车间二' }
      ],
      // 假数据：专业列表
      majDelayList: [
        { id: 'M001', name: '机械' },
        { id: 'M002', name: '电气' },
        { id: 'M003', name: '自动化' }
      ],
      // 假数据：是否列表
      yesOrNotList: [{ id: 'Y', name: '是' }, { id: 'N', name: '否' }],
      // 表格数据
      EquipDangers: [],
      total: 0,
      loading: false,
      allSelected: false,
      isIndeterminate: false,
      isShowFactory: true,
      isShowBusi: true
    }
  },
  created() {
    // 初始化时加载假数据
    this.loadMockData()
  },
  methods: {
    // 加载假数据
    loadMockData() {
      this.loading = true
      // 模拟接口请求延迟
      setTimeout(() => {
        // 生成假的表格数据
        this.EquipDangers = Array.from({ length: 16 }, (_, i) => {
          const id = i + 1
          const grade = ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
          const now = new Date()
          const pastDate = new Date(
            now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
          )
          const futureDate = new Date(
            now.getTime() + Math.random() * 15 * 24 * 60 * 60 * 1000
          )
          console.log('futureDate', futureDate)

          // 随机设置颜色（超期/临期/正常）
          let color = ''
          const random = Math.random()
          if (random < 0.3) color = 'red'
          else if (random < 0.6) color = 'yellow'

          return {
            id: `D${id.toString().padStart(3, '0')}`,
            checked: false,
            isEditable: false,
            transFal: Math.random() > 0.7 ? 1 : 0,
            factoryNo: `F00${Math.floor(Math.random() * 3) + 1}`,
            factoryName: `产线${Math.floor(Math.random() * 3) + 1}`,
            factoryGrade: `G00${Math.floor(Math.random() * 2) + 1}`,
            factoryGradeName: `产线类别${Math.floor(Math.random() * 2) + 1}`,
            workDeptNo: `W00${Math.floor(Math.random() * 2) + 1}`,
            workDeptName: `车间${Math.floor(Math.random() * 2) + 1}`,
            majDelay: `M00${Math.floor(Math.random() * 3) + 1}`,
            majDelayName: ['机械', '电气', '自动化'][
              Math.floor(Math.random() * 3)
            ],
            obsStarTime: this.convertTimeFormat(pastDate),
            creDate: this.convertTimeFormat(pastDate),
            area: `区域${Math.floor(Math.random() * 10) + 1}`,
            dangerDesc: `隐患情况说明${id}：设备运行异常，需要及时处理`,
            fangerType: `T00${Math.floor(Math.random() * 3) + 1}`,
            fangerTypeName: ['设备故障', '操作不当', '环境因素'][
              Math.floor(Math.random() * 3)
            ],
            hndlStus: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
            hndlStusName: ['初始', '分厂', '事业部'][
              Math.floor(Math.random() * 3)
            ],
            fangerGrade: grade,
            emergencyResponse: `应急预案${id}：立即停机检查，排除故障后再启动`,
            sourceType: Math.random() > 0.5 ? 'A' : 'B',
            expectTime: this.convertTimeFormat(futureDate),
            color: color,
            falMintue: Math.floor(Math.random() * 10) + 1,
            workContent: `处理中：正在进行设备检查${id}`,
            isFinish: Math.random() > 0.5 ? 'Y' : 'N',
            isFinishName: Math.random() > 0.5 ? '是' : '否',
            hndlType: `处理方法${id}：更换损坏部件`,
            isDisable: Math.random() > 0.7,
            disableHandleType: Math.random() > 0.8,
            creUserNo: `U${id.toString().padStart(3, '0')}`,
            creUserName: `用户${id}`
          }
        })

        // 设置总条数
        this.total = 50
        this.loading = false
      }, 500)
    },

    // 格式化日期
    formatDate(date) {
      return moment(date).format('yyyy-MM-dd HH:mm:ss')
    },
    convertTimeFormat(gmtTimeString) {
      // 创建Date对象
      const date = new Date(gmtTimeString)

      // 获取各个时间部分
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      // 拼接成目标格式
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },

    // 选择产线
    selectFactory() {
      // 模拟接口调用，实际使用假数据
      console.log('选择产线', this.searchForm.factoryNo)
    },

    // 选择车间
    selectWorkDept() {
      console.log('选择车间', this.searchForm.workDeptNo)
    },

    // 选择隐患类型
    selectFangerType() {
      console.log('选择隐患类型', this.searchForm.fangerType)
    },

    // 选择隐患级别
    selectFangerGrade() {
      console.log('选择隐患级别', this.searchForm.fangerGrade)
    },

    // 选择上报节点
    selectHndlStus() {
      console.log('选择上报节点', this.searchForm.hndlStus)
    },

    // 选择处理状态
    selectStatus() {
      console.log('选择处理状态', this.searchForm.status)
    },

    // 选择超时状态
    selectIsDelay() {
      console.log('选择超时状态', this.searchForm.isDelay)
    },

    // 选择采集方式
    selectIsAuto() {
      console.log('选择采集方式', this.searchForm.sourceType)
    },

    // 日期变更
    dateChange() {
      console.log(
        '日期变更',
        this.searchForm.beginDate,
        this.searchForm.endDate
      )
    },

    // 查询
    clickQuery() {
      // 模拟查询接口调用，使用假数据
      this.loading = true
      setTimeout(() => {
        this.loadMockData()
        this.loading = false
      }, 500)
    },

    // 上报分厂
    clickReport() {
      this.$message.success('上报分厂操作（模拟）')
    },

    // 上报事业部
    clickApproval() {
      this.$message.success('上报事业部操作（模拟）')
    },

    // 获取行键
    getRowKey(row) {
      return row.id
    },

    // 表格行样式
    tableRowClassName({ row, rowIndex }) {
      return ''
    },

    // 单元格样式
    rowStyle({ row, column, rowIndex, columnIndex }) {
      return {}
    },

    // 双击行
    dbClick(row) {
      console.log('双击行', row)
    },

    // 全选变更
    handleAllSelectedChange(val) {
      this.EquipDangers.forEach(row => {
        row.checked = val
      })
      this.isIndeterminate = false
    },

    // 单选变更
    handleSelectedChange() {
      const checkedCount = this.EquipDangers.filter(row => row.checked).length
      this.allSelected = checkedCount === this.EquipDangers.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.EquipDangers.length
    },

    // 选择产线（表格内）
    selectFactory2(row) {
      console.log('表格内选择产线', row)
    },

    // 选择产线类别
    selectFactoryGrade(row) {
      console.log('选择产线类别', row)
    },

    // 选择车间（表格内）
    selectWorkDept2(row) {
      console.log('表格内选择车间', row)
    },

    // 选择专业
    selectMajDelay(row) {
      console.log('选择专业', row)
    },

    // 选择隐患类型（表格内）
    selectFangerType2(row) {
      console.log('表格内选择隐患类型', row)
    },

    // 选择是否完成
    selectIsFinish(row) {
      console.log('选择是否完成', row)
    },

    // 点击修改/确认
    clickUpdate(row) {
      if (row.isEditable) {
        // 确认修改
        row.isEditable = false
        this.$message.success('修改已确认（模拟）')
      } else {
        // 进入编辑状态
        row.isEditable = true
      }
    },

    // 取消修改
    clickCancel(row) {
      row.isEditable = false
      this.$message.info('已取消修改')
    },

    // 退回
    clickBack(row) {
      this.$confirm('确定要退回这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('退回成功（模拟）')
        })
        .catch(() => {
          this.$message.info('已取消退回')
        })
    },

    // 查看详情
    lookDetails(row) {
      // 模拟获取详情接口，使用假数据
      this.dialogData = {
        ...row,
        handles: [
          {
            id: 'H001',
            creDateTime: this.formatDate(new Date()),
            creUserNo: row.creUserNo,
            creUserName: row.creUserName,
            workContent: '初步检查，确认隐患存在'
          },
          {
            id: 'H002',
            creDateTime: this.formatDate(new Date(Date.now() - 3600000)),
            creUserNo: 'U002',
            creUserName: '处理员',
            workContent: '正在制定处理方案'
          }
        ]
      }
      this.dialogVisible = true

      // 模拟获取变更履历
      this.tableData = [
        {
          expectTime: this.formatDate(new Date(Date.now() - 86400000 * 2)),
          scheduleTime: this.formatDate(new Date(Date.now() - 86400000)),
          userNo: 'U003',
          userName: '管理员',
          reason: '设备采购延迟',
          submitDate: this.formatDate(new Date(Date.now() - 86400000))
        }
      ]
    },

    // 变更时间
    changeTime(row) {
      console.log('row', row)
      this.dangerNoPram = row.id
      this.expectTimePram = row.expectTime
      this.formInlineModify.expectTime = row.expectTime
      this.formInlineModify.updDetail = ''
      this.dialogVisibleModify = true
    },

    // 删除
    clickDelete(row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
        .then(() => {
          // 模拟删除接口
          this.EquipDangers = this.EquipDangers.filter(
            item => item.id !== row.id
          )
          this.total--
          this.$message.success('删除成功（模拟）')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 转故障
    TurnHiddenDangers(row) {
      if (row.transFal === 1) {
        this.$message.info('已转故障，不可重复操作')
        return
      }

      this.$confirm('确定要转为故障吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          // 模拟转故障接口
          row.transFal = 1
          this.$message.success('已转为故障（模拟）')
        })
        .catch(() => {
          this.$message.info('已取消转故障')
        })
    },

    // 页码大小变更
    pageSizeChange(val) {
      this.searchForm.pageSize = val
      this.searchForm.pageIndex = 1
      this.clickQuery()
    },

    // 当前页码变更
    currentPageChange(val) {
      this.searchForm.pageIndex = val
      this.clickQuery()
    },

    // 关闭变更对话框
    handleCloseModify() {
      this.dialogVisibleModify = false
    },

    // 取消变更
    dialogVisibleCancelModify() {
      this.dialogVisibleModify = false
    },

    // 确认变更
    clickDialogVisibleModify(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 模拟变更时间接口
          this.EquipDangers.forEach(row => {
            if (row.id === this.dangerNoPram) {
              row.expectTime = this.formInlineModify.expectTime
            }
          })
          this.dialogVisibleModify = false
          this.$message.success('变更成功（模拟）')
        } else {
          return false
        }
      })
    },

    // 变更预期时间
    changeExpectTime(val) {
      // console.log('val', val)
      // this.updateExceptTime.expectTime = this.convertTimeFormat(val)
      // console.log('变更预期时间', this.formInlineModify.expectTime)
    },

    // 关闭详情对话框
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  padding: 0;
}
/* 分页选中项样式修改 */
::v-deep .el-pager li.active {
  color: #35a03b !important; /* 绿色文字 */
  //border-color: #42b983 !important; /* 绿色边框 */
}
//变更时间组件样式
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 30px;
}
.contentBox {
  padding: 15px;
}

.CardTable {
  margin-top: 15px;
}

.pagPath {
  text-align: right;
  margin-top: 15px;
}

.dotClass {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.textStyleRed {
  color: #f56c6c;
  font-weight: bold;
}

.textStyleYellow {
  color: #ffa958;
  font-weight: bold;
}

.headStyle {
  font-weight: 400;
  font-size: 18px;
  color: #303133;
}
</style>
