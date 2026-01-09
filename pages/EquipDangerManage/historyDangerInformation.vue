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
        <!--        <el-date-picker
          v-model="searchForm.dateRange"
          :start-placeholder="searchForm.beginDate"
          :end-placeholder="searchForm.endDate"
          type="daterange"
          range-separator="至"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="dateChange">
        </el-date-picker>-->
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
          <!--          <el-table-column
            prop="creDate"
            label="上报时间"
            show-overflow-tooltip
            sortable
            width="160">
          </el-table-column>-->
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
          <!--          <el-table-column
            prop="statusName"
            label="隐患单处理状态"
            width="110">
          </el-table-column>-->
          <el-table-column
            prop="sourceType"
            label="采集方式"
            width="90"
          >
            <template v-slot="scope">
              {{ scope.row.sourceType=='A'?'人工':scope.row.sourceType=='B'?'自动':'' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="expectTime"
            label="计划何时处理"
            show-tooltip-when-overflow
            width="180"
          >
            <template slot-scope="scope">
              <!--              <el-form-item
                v-if="scope.row.isEditable"
                :prop="'EquipDangers.'+scope.$index+'.expectTime'"
                :rules="[{ required: true, message: '请填写内容', trigger: ['blur','change'] }]">
                <el-date-picker
                  :disabled="scope.row.isDisable"
                  v-model="scope.row.expectTime"
                  type="datetime"
                  style="width: 168px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择时间">
                </el-date-picker>
              </el-form-item>-->
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
                {{ scope.row.isEditable?'确认':'修改' }}
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
                {{ scope.row.transFal==1?'已转故障':'转故障' }}
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

    <!--    变更对话框-->
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
    <!--    隐患详情-->
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
      <!--      <el-row
        :gutter="40"
        style="margin-top: 20px;margin-left: 3px">
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">车间</div>
          <div style="margin-top: 8px">{{ dialogData.workDeptName }}</div>
        </el-col>
        <el-col :span="12">
          <div style="font-weight: 400;font-size: 18px;color: #303133;">专业</div>
          <div style="margin-top: 8px">{{ dialogData.majDelayName }}</div>
        </el-col>
      </el-row>-->
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
            {{ dialogData.sourceType=='A'?'人工':dialogData.sourceType=='B'?'自动':'' }}
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
            {{ dialogData.isFinish==='Y'?'是':'否' }}
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
import {
  addDangerHandleRecord,
  batchDeleteDangerInfoList,
  batchUpdateDangerInfoList,
  findAllByTableId,
  findAllDangerHandleRecord,
  findAllDangerInfoList,
  queryWorkDeptInfo,
  Turn_To_Hidden_Dangers,
  updatePlanDate
} from '@/lib/EquipPrecisManage/RiskManageApi'
import { post } from '@/lib/Util'
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
        updDetail: [
          { required: true, message: '请填写变更原因', trigger: 'blur' }
        ]
      },
      loading: false,
      userNo: this.$store.getters['user/getUserNo'],
      userInfo: this.$store.getters['user/getUserInfo'] || {},
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
        dateRange: [],
        beginDate: getMonthFirstDay(), //开始日期
        endDate: getMonthLastDay(), //结束日期
        dangerDesc: '', //关键字
        isSubmit: '', //是否已提交 Y 已提交 N 未提交
        isAplay: '', //是否已申报 Y 已申报 N 未申报
        //隐患处理状态 A:新建 B:车间已提交分厂 C:分厂已提交事业部 D:已申报事业部
        //技术员角色:查询A,可修改
        //车间主任角色:查询A，可提交分厂
        //分厂领导角色:查询B，可提交事业部
        hndlStus: '', //隐患处理状态 A:新建 B:车间已提交分厂 C:分厂已提交事业部 D:已申报事业部
        hndlStusName: '',
        status: '', //隐患处理状态
        statusName: '',
        isDelay: '', //是否超时
        isDelayName: '',
        isAuto: '', //采集方式手动自动
        isAutoName: '',
        sourceType: '',
        userNo: '',
        pageIndex: 1,
        pageSize: 16
      }, //列表外层查询表单
      //产线
      factoryList: this.$store.getters['factory/getFactoryList'] || [],
      newFactoryList: this.$store.getters['factory/getNewFactoryList'] || [],
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
      newWorkDeptList2: [],
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
      // 隐患单处理状态
      statusList: [
        {
          id: 'A',
          name: '未处理'
        },
        // {
        //   id: 'D',
        //   name: '处理中'
        // },
        {
          id: 'E',
          name: '已处理'
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
      EquipDangers: [],
      total: 0,
      selectChangeList: [],
      dangerDesc: '', // 隐患情况说明
      emergencyResponse: '', //应急预案
      hndlType: '', //处置方法
      workContentList: [], //处置过程跟踪
      equipDangersHeader: [
        // { header: 'ID', key: 'id', width: 10, style: { numFmt: '@' } },
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
          col: 10,
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
          col: 11,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '隐患级别',
            error: '隐患级别选择错误'
          }
        },
        {
          col: 13,
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
          col: 14,
          dataValidation: {
            type: 'decimal',
            allowBlank: true,
            formulae: [0],
            operator: 'greaterThanOrEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '造成产线停机时间',
            error: '造成产线停机时间输入错误'
          }
        },
        {
          col: 15,
          dataValidation: {
            type: 'list',
            allowBlank: true,
            formulae: [],
            operator: 'notEqual',
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: '是否完成',
            error: '是否完成选择错误'
          }
        }
      ], //隐患列表导出数据验证
      majDelayListHeader: [], //专业类型
      fangerTypeListHeader: [], // 隐患类型
      fangerGradeListHeader: [], // 隐患级别
      factoryListHeader:
        this.$store.getters['factory/getFactoryListHeader'] || [], //产线
      factoryGradeListHeader: [], //产线类别
      isFinishListHeader: [], //是否完成
      allSelected: false, //全选
      isIndeterminate: false, //不确定状态
      dialogVisible: false,
      isShowFactory: true,
      isShowBusi: true,
      roleList: this.$store.getters['user/getUserRole'] || [],
      dialogData: {}
    }
  },
  watch: {
    EquipDangers: {
      handler: function(val, oldVal) {
        console.log(val, oldVal)
        let allChecked = true
        //全不选
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
      // 深度观察监听
      deep: true
    }
  },
  created() {
    console.log('this.userNo', this.userInfo.userNo)
    console.log('userInfo', this.userInfo)
    console.log('factoryList', this.factoryList)
    console.log('roleList', this.roleList)
    this.initBtn()
    Promise.all([this.initParams()]).then(() => {
      this.query()
    })
    //查询
    this.findSelect()
    this.findMajDelayList()
    this.initHeader()
  },
  methods: {
    //转故障
    async TurnHiddenDangers(row) {
      console.log({ EquipDangers: [row] })
      let res = await post(Turn_To_Hidden_Dangers, { EquipDangers: [row] })
      // console.log('转故障', res)
      if (res.success) {
        let formData = {
          falNo: '',
          factoryName: '',
          factoryNo: '',
          respDept: '',
          respDeptNo: '',
          majDelay: '',
          majDelayName: '',
          area: '',
          areaNo: '',
          eqName: '',
          eqNo: '',
          falBegDateTime: '',
          falEndDateTime: '',
          isStop: '',
          falDesc: '',
          falDon: '',
          reasonLess: '',
          rsonName: '',
          rsonNo: '',
          reportTimeout: '',
          isDeclDanger: 'N',
          repairFal: '',
          planDate: '',
          finishDate: '',
          manageTec: '',
          creUserNo: '',
          resPerson: ''
        }
        Object.keys(formData).forEach(item => {
          formData[item] = res.data.equipFailure[item]
            ? res.data.equipFailure[item]
            : ''
        })
        // console.log('数据', formData)
        this.$router.push({
          path: '/EquipDangerManage/InformatmManage/historyFaultInfo',
          query: {
            formData: formData
          }
        })
      }
    },

    handleCloseModify() {
      this.dialogVisibleModify = false
    },
    dialogVisibleCancelModify() {
      this.dialogVisibleModify = false
      this.formInlineModify = {
        expectTime: '',
        updDetail: ''
      }
    },
    clickDialogVisibleModify(formInlineModify) {
      this.$refs[formInlineModify].validate(valid => {
        if (valid) {
          // this.addSaveModify()...this.updateExceptTime
          this.updateExceptTime.updDetail = this.formInlineModify.updDetail
          let obj = {
            dangerNo: this.dangerNoPram,
            expectTime: this.expectTimePram,
            scheduleTime: this.scheduleTimePram,
            userNo: this.userInfo.userNo,
            userName: this.userInfo.userName,
            reason: this.formInlineModify.updDetail
          }
          console.log('obj', obj)
          this.changeTimeConfirm(obj)
          console.log('验证通过')
          this.dialogVisibleModify = false
        } else {
          console.log('失败')
          return false
        }
      })
    },
    async changeTimeConfirm(obj) {
      const res = await post(updatePlanDate, obj)
      console.log(res)
      if (res.success) {
        this.$message.success('变更成功！')
        this.query()
      } else {
        this.$message.error('变更失败！')
      }
    },
    initBtn() {
      let list = this.$store.getters['menu/getPageButtonPower']
      console.log('btn列表', list)
      list.forEach(item => {
        if (item.name === '上报分厂') {
          this.isShowFactory = true
        }
        if (item.name === '上报事业部') {
          this.isShowBusi = true
        }
      })
      console.log('roleList', this.roleList)
      //车间，分厂的人查看非自己,技术员查询车间的
      /*const rl = this.roleList.find(item => {
        return (
          item.roleName === '设备隐患管理员' ||
          item.roleName === '设备隐患车间' ||
          item.roleName === '设备隐患厂级' ||
          item.roleName === '设备隐患技术'
        )
      })
      console.log('rl', rl)
      if (rl) {
        this.searchForm.isSelf = 0
      } else {
        this.searchForm.isSelf = 1
      }*/
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
            this.searchForm.hndlStus = 'E'
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
              await this.queryWorkDept(this.searchForm.factoryCode, '1')
            }
            // this.searchForm.factoryNo = this.$route.query.factoryNo
            // this.searchForm.factoryName = this.$route.query.factoryName
            // //更新车间
            // this.queryWorkDept(this.searchForm.factoryCode, '1')
          }
        }
        if (this.$route.query.fangerGrade) {
          this.searchForm.fangerGrade = this.$route.query.fangerGrade
        }
        if (this.$route.query.workDeptNo) {
          this.searchForm.workDeptNo = this.$route.query.workDeptNo
          this.searchForm.workDeptName = this.$route.query.workDeptName
        }
      } else {
        //路由跳转时忽略用户参数
        await this.initData()
      }
    },
    async initData() {
      const rl1 = this.roleList.find(item => {
        return (
          item.roleName === '设备隐患车间' ||
          item.roleName === '设备隐患技术' ||
          item.roleName === '设备隐患点检'
        )
      })
      if (rl1) {
        // hndlStus: '', //隐患处理状态 A:新建 B:车间已提交分厂 C:分厂已提交事业部 D:已申报事业部
        this.searchForm.hndlStus = 'A'
        this.searchForm.hndlStusName = '新建'
      }
      const rl2 = this.roleList.find(item => {
        return item.roleName === '设备隐患厂级'
      })
      if (rl2) {
        this.searchForm.hndlStus = 'B'
        this.searchForm.hndlStusName = '已上报分厂'
      }
      const rl3 = this.roleList.find(item => {
        return (
          item.roleName === '设备隐患管理员' || item.name === '设备隐患事业部'
        )
      })
      if (rl3) {
        this.searchForm.hndlStus = 'C'
        this.searchForm.hndlStusName = '已上报事业部'
      }

      //车间，技术，点检角色 状态未新增
      //厂级为已上报分厂
      //管理员为已上报事业部
      const fl = this.factoryList.find(
        item => item.orgCode === this.userInfo.factoryCode
      )
      if (fl) {
        this.searchForm.factoryNo = fl.id
        this.searchForm.factoryName = fl.name
        this.searchForm.factoryCode = fl.orgCode
        await this.queryWorkDept(this.searchForm.factoryCode, '3')
      }
      // this.searchForm.workDeptNo = this.userInfo.workDeptNo
      // this.searchForm.workDeptName = this.userInfo.workDeptName
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
      // //专业类型
      // let newStr = ''
      // this.majDelayList.forEach(item => {
      //   newStr += item.name + ','
      // })
      // this.majDelayListHeader = [
      //   '"' + newStr.substring(0, newStr.length - 1) + '"'
      // ]
      // //隐患类型
      // let newStr2 = ''
      // this.fangerTypeList.forEach(item => {
      //   newStr2 += item.name + ','
      // })
      // this.fangerTypeListHeader = [
      //   '"' + newStr2.substring(0, newStr2.length - 1) + '"'
      // ]
      //隐患级别
      let newStr5 = ''
      this.fangerGradeList.forEach(item => {
        newStr5 += item.name + ','
      })
      this.fangerGradeListHeader = [
        '"' + newStr5.substring(0, newStr5.length - 1) + '"'
      ]
      //是否完成
      let newStr6 = ''
      this.yesOrNotList.forEach(item => {
        newStr6 += item.name + ','
      })
      this.isFinishListHeader = [
        '"' + newStr6.substring(0, newStr6.length - 1) + '"'
      ]
    },
    dbClick(row, column, event) {
      // this.dangerDesc = row.dangerDesc
      // this.emergencyResponse = row.emergencyResponse
      // this.hndlType = row.hndlType
      // // {"dangerNo":"隐患编号"}
      // let obj = {
      //   dangerNo: row.dangerNo
      // }
      // this.queryHandleRecord(obj)
      console.log('row', row)

      this.dialogData = row
      this.dialogVisible = true
    },
    handleAllSelectedChange(val) {
      if (val) {
        this.EquipDangers.forEach(item => {
          item.checked = true
        })
      } else {
        this.EquipDangers.forEach(item => {
          item.checked = false
        })
      }
    },
    handleSelectedChange(val) {
      console.log(val)
      console.log(this.EquipDangers)
    },
    getRowKey(row) {
      return row.id
    },
    changeExpectTime(val) {
      console.log('111', moment(val).format('YYYY-MM-DD HH:mm:ss'))
      this.updateExceptTime.expectTime = moment(val).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.scheduleTimePram = moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    changeTime(row) {
      console.log('变更', row)
      this.updateExceptTime = row
      if (row.expectTime.length === 10) {
        this.currentFormat = 'yyyy-MM-dd 00:00:00'
        this.currentValueFormat = 'yyyy-MM-dd 00:00:00'
      } else {
        this.currentFormat = 'yyyy-MM-dd HH:mm:ss'
        this.currentValueFormat = 'yyyy-MM-dd HH:mm:ss'
      }
      this.formInlineModify.expectTime = new Date(row.expectTime)
      this.expectTimePram = row.expectTime
      this.dangerNoPram = row.dangerNo
      this.dialogVisibleModify = true
    },
    lookDetails(row) {
      console.log('查看详情', row)
      //变更时间-变更履历
      this.tableData = row.resumeList
      // // dangerDesc: '', // 隐患情况说明
      // //   emergencyResponse: '', //应急预案
      // //   hndlType: '', //处置方法
      // //   workContentList: [], //处置过程跟踪
      // this.dangerDesc = row.dangerDesc
      // this.emergencyResponse = row.emergencyResponse
      // this.hndlType = row.hndlType
      // // {"dangerNo":"隐患编号"}
      // let obj = {
      //   dangerNo: row.dangerNo
      // }
      // this.queryHandleRecord(obj)
      this.dialogData = row
      this.dialogVisible = true
    },
    handleClose: done => {
      done()
    },
    //产线
    selectFactory(value) {
      const fl = this.newFactoryList.find(item => item.id === value)
      if (fl) {
        this.searchForm.factoryName = fl.name
        this.queryWorkDept(fl.orgCode, '1')
      }
      this.searchForm.workDeptNo = ''
      this.searchForm.workDeptName = ''
      // this.updateWorkDept(value, '1')
    },
    //车间
    selectWorkDept(value) {
      const wdl = this.newWorkDeptList.find(item => item.id === value)
      if (wdl) {
        this.searchForm.workDeptName = wdl.name
      }
    },
    //类型
    selectFangerType(value) {
      const ftl = this.fangerTypeList.find(item => item.id === value)
      if (ftl) {
        this.searchForm.fangerTypeName = ftl.name
      }
    },
    //级别
    selectFangerGrade(value) {
      const fgl = this.fangerGradeList.find(item => item.id === value)
      if (fgl) {
        this.searchForm.fangerGradeName = fgl.name
      }
    },
    //状态
    selectHndlStus(value) {
      const hsl = this.hndlStusList.find(item => item.id === value)
      if (hsl) {
        this.searchForm.hndlStusName = hsl.name
      }
    },
    //状态
    selectStatus(value) {
      const sl = this.statusList.find(item => item.id === value)
      if (sl) {
        this.searchForm.statusName = sl.name
      }
    },
    //是否超时
    selectIsDelay(value) {
      const dl = this.delayList.find(item => item.id === value)
      if (dl) {
        this.searchForm.isDelayName = dl.name
      }
    },
    //采集方式
    selectIsAuto(value) {
      const al = this.autoList.find(item => item.id === value)
      if (al) {
        this.searchForm.isAutoName = al.name
      }
    },
    updateWorkDept(factoryNo, type) {
      //切换车间数据
      let tempList = []
      switch (factoryNo) {
        case '32': //中厚板卷厂
          tempList = [
            {
              id: '6',
              name: '机修车间'
            },
            {
              id: '7',
              name: '电修车间'
            },
            {
              id: '9',
              name: '精整车间'
            }
          ]
          break
        case '38': //宽厚板厂
          tempList = [
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
            }
          ]
          break
        case '66': //中板厂
          tempList = [
            {
              id: '6',
              name: '机修车间'
            },
            {
              id: '7',
              name: '电修车间'
            },
            {
              id: '9',
              name: '精整车间'
            },
            {
              id: '10',
              name: '产品车间'
            }
          ]
          break
        case '73': //第一炼钢厂
          tempList = [
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
          ]
          break
        case '84': //金石材料厂
          tempList = [
            {
              id: '13',
              name: '渣处理车间'
            },
            {
              id: '14',
              name: '石灰车间'
            }
          ]
          break
        case '87': //金润智能制造厂
          tempList = [
            {
              id: '11',
              name: '机加工车间'
            },
            {
              id: '12',
              name: '后道工序车间'
            }
          ]
          break
      }
      if (type === '1') {
        this.newWorkDeptList = []
        this.newWorkDeptList.push(...tempList)
        console.log(this.newWorkDeptList)
      } else if (type === '2') {
        this.newWorkDeptList2 = []
        this.newWorkDeptList2.push(...tempList)
      }
    },
    //产线
    selectFactory2(row) {
      const fl = this.factoryList.find(item => item.id === row.factoryNo)
      if (fl) {
        row.factoryName = fl.name
        this.queryWorkDept(fl.orgCode, '2')
      }
      row.workDeptNo = ''
      row.workDeptName = ''
      // this.updateWorkDept(row.factoryNo, '2')
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
    selectWorkDept2(row) {
      console.log('车间', row)
      const wdl = this.newWorkDeptList2.find(item => item.id === row.workDeptNo)
      if (wdl) {
        row.workDeptName = wdl.name
      }
    },
    //类型
    selectFangerType2(row) {
      const ftl = this.fangerTypeList.find(item => item.id === row.fangerType)
      if (ftl) {
        row.fangerTypeName = ftl.name
      }
    },
    //级别
    selectFangerGrade2(row) {
      const fgl = this.fangerGradeList.find(item => item.id === row.fangerGrade)
      if (fgl) {
        row.fangerGradeName = fgl.name
      }
    },
    //专业
    selectMajDelay(row) {
      const mdl = this.majDelayList.find(item => item.id === row.majDelay)
      if (mdl) row.majDelayName = mdl.name
    },
    //选择是否完成
    selectIsFinish(row) {
      console.log(row)
      row.disableHandleType = row.isFinish !== 'Y'
      for (let i = 0; i < this.yesOrNotList.length; i++) {
        if (this.yesOrNotList[i].id === row.isFinish) {
          row.isFinishName = this.yesOrNotList[i].name
        }
      }
    },
    dateChange(params) {
      console.log(params)
      this.searchForm.beginDate = params[0]
      this.searchForm.endDate = params[1]
    },
    /*----分页-----*/
    pageSizeChange(val) {
      this.searchForm.pageSize = val
      this.query()
    },
    currentPageChange(val) {
      this.searchForm.pageIndex = val
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.query()
    },
    //点击选中数据
    handleSelectChange(selection) {
      this.selectChangeList = selection
      console.log(selection)
    },
    //选择产线
    selectTableFactory(row) {
      for (let i = 0; i < this.factoryList.length; i++) {
        if (this.factoryList[i].id === row.factoryNo) {
          row.factoryName = this.factoryList[i].name
        }
      }
    },
    //选择产线级别
    selectTableFactoryGrade(row) {
      for (let i = 0; i < this.factoryGradeList.length; i++) {
        if (this.factoryGradeList[i].id === row.factoryGrade) {
          row.factoryGradeName = this.factoryGradeList[i].name
        }
      }
    },
    //下载Excel
    /*downloadExcel() {
      this.equipDangersDataValidation[0].dataValidation.formulae = this.factoryListHeader
      this.equipDangersDataValidation[1].dataValidation.formulae = this.factoryGradeListHeader
      this.equipDangersDataValidation[2].dataValidation.formulae = this.majDelayListHeader
      this.equipDangersDataValidation[4].dataValidation.formulae = this.fangerTypeListHeader
      this.equipDangersDataValidation[5].dataValidation.formulae = this.fangerGradeListHeader
      this.equipDangersDataValidation[8].dataValidation.formulae = this.isFinishListHeader
      if (this.selectChangeList.length > 0) {
        import('@/utils/excelJsUtil').then(excel => {
          excel.export_to_excel(
            '历史隐患信息模板',
            '历史隐患信息表',
            this.equipDangersHeader,
            this.selectChangeList,
            this.equipDangersDataValidation
          )
        })
      } else {
        import('@/utils/excelJsUtil').then(excel => {
          excel.export_to_excel(
            '历史隐患信息模板',
            '历史隐患信息表',
            this.equipDangersHeader,
            this.EquipDangers,
            this.equipDangersDataValidation
          )
        })
      }
    },*/
    clickQuery() {
      this.loading = true
      this.searchForm.pageIndex = 1
      this.query()
    },
    //车间上报分厂
    clickReport() {
      let list = []
      if (this.selectChangeList.length > 0) {
        list = this.selectChangeList
      } else {
        list = this.EquipDangers
      }
      console.log(list)
      let isForbidden = false
      list.forEach(item => {
        if (item.hndlStus !== 'A') {
          isForbidden = true
        }
      })
      if (isForbidden) {
        this.$message.warning('存在非新建状态的数据,无法提交！')
        return
      }
      // list.forEach(item => {
      //   item.hndlStus = 'B'
      // })
      let obj = {
        EquipDangers: list,
        action: 'submit',
        userNo: this.userNo
      }
      this.batchUpdate(obj)
    },
    //分厂上报事业部
    clickApproval() {
      let list = []
      if (this.selectChangeList.length > 0) {
        list = this.selectChangeList
      } else {
        list = this.EquipDangers
      }
      console.log(list)
      let isForbidden = false
      list.forEach(item => {
        if (item.hndlStus !== 'B') {
          isForbidden = true
        }
      })
      if (isForbidden) {
        this.$message.warning('存在非上报分厂状态的数据,无法提交！')
        return
      }
      // list.forEach(item => {
      //   item.hndlStus = 'C'
      // })
      let obj = {
        EquipDangers: list,
        action: 'submit_T',
        userNo: this.userNo
      }
      this.batchUpdate(obj)
    },
    //修改-新增处置过程
    clickUpdate(row) {
      if (row.hndlStus === 'A') {
        if (row.isEditable) {
          //可编辑-->不可编辑
          row.isEditable = false
          //可编辑-->修改接口
          // 修改人员
          row.updUserNo = this.userNo
          let obj = {
            EquipDangers: [row],
            action: 'update',
            userNo: this.userNo
          }
          this.batchUpdate(obj)
        } else {
          //不可编辑-->可编辑
          row.isEditable = true
        }
      } else {
        this.$message.warning('非新增状态不可修改')
      }
    },
    //取消修改
    clickCancel(row) {
      row.isEditable = false
    },
    //退回
    clickBack(row) {
      if (row.hndlStus === 'B') {
        //车间退回调用删除
        this.clickDelete(row)
      } else if (row.hndlStus === 'C') {
        //事业部退回调用修改
        let obj = {
          EquipDangers: [row],
          action: 'back',
          userNo: this.userNo
        }
        this.batchUpdate(obj)
      } else {
        this.$message.error(`状态为:${row.hndlStus},无法操作!`)
      }
    },
    //删除
    clickDelete(row) {
      //TODO 删除人员 权限管控
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let obj = {
            EquipDangers: [row.dangerNo],
            userNo: this.userNo
          }
          this.batchDelete(obj)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    /*----------接口--------------*/
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
        tempList.forEach(item => {})
        if (type === '1' || type === '3') {
          this.newWorkDeptList = []
          this.newWorkDeptList.push(...tempList)
          if (type === '3') {
            const nwdl = this.newWorkDeptList.find(
              item => item.id === this.userInfo.workDeptNo
            )
            if (nwdl) {
              this.searchForm.workDeptNo = nwdl.id
              this.searchForm.workDeptName = nwdl.name
            }
          }
        } else if (type === '2') {
          this.newWorkDeptList2 = []
          this.newWorkDeptList2.push(...tempList)
        }
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
      // //产线
      // const { data: res } = await post(findAllByTableId, {
      //   tableId: 'FACTORY',
      //   col: '3',
      //   data: '3'
      // })
      // this.factoryList = []
      // res.forEach(item => {
      //   this.factoryList.push({
      //     id: item.oneCol,
      //     name: item.twoCol,
      //     orgCode: item.sixCol
      //   })
      //   this.newFactoryList.push({
      //     id: item.oneCol,
      //     name: item.twoCol,
      //     orgCode: item.sixCol
      //   })
      // })
      // this.newFactoryList.push({
      //   id: '3',
      //   name: '事业部',
      //   orgCode: ''
      // })
      // let newStr3 = ''
      // this.factoryList.forEach(item => {
      //   newStr3 += item.name + ','
      // })
      // this.factoryListHeader = [
      //   '"' + newStr3.substring(0, newStr3.length - 1) + '"'
      // ]
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
    //查询数据
    async query() {
      console.log('this.searchForm.isSelf', this.searchForm.isSelf)
      if (this.searchForm.isSelf === 1) {
        this.searchForm.userNo = this.userInfo.userNo
        console.log('this.userNo', this.userInfo.userNo)
      } else {
        this.searchForm.userNo = ''
      }
      //TODO 根据权限查询
      //隐患处理状态 A:新建 B:车间已提交分厂 C:分厂已提交事业部 D:已申报事业部
      //技术员角色:查询A,可修改
      //车间主任角色:查询A，可提交分厂
      //分厂领导角色:查询B，可提交事业部
      const res = await post(findAllDangerInfoList, this.searchForm)
      console.log('res1', res)
      this.tableList = []
      this.total = 0
      if (res.success) {
        res.data.tlist.forEach(item => {
          //产线
          const fl = this.factoryList.find(cell => cell.id === item.factoryNo)
          if (fl) item.factoryName = fl.name
          //产线类别
          const fg = this.factoryGradeList.find(
            cell => cell.id === item.factoryGrade
          )
          if (fg) item.factoryGradeName = fg.name
          //专业
          const mdl = this.majDelayList.find(cell => cell.id === item.majDelay)
          if (mdl) item.majDelayName = mdl.name
          // //车间
          // const wdl = this.workDeptList.find(
          //   cell => cell.id === item.workDeptNo
          // )
          // if (wdl) item.workDeptName = wdl.name
          if (item.workDeptNo === '2') {
            item.workDeptName = '转炉车间'
          } else if (item.workDeptNo === '11') {
            item.workDeptName = '机加工车间'
          } else if (item.workDeptNo === '12') {
            item.workDeptName = '后道工序车间'
          }
          //隐患类型
          const ftl = this.fangerTypeList.find(
            cell => cell.id === item.fangerType
          )
          if (ftl) item.fangerTypeName = ftl.name
          //隐患级别
          const fgl = this.fangerGradeList.find(
            cell => cell.id === item.factoryGrade
          )
          if (fgl) item.fangerGradeName = fgl.name
          //是否完成
          if (item.handles && item.handles.length > 0) {
            const yonl = this.yesOrNotList.find(
              cell => cell.id === item.handles[item.handles.length - 1].isFinish
            )
            if (yonl) {
              item.isFinishName = yonl.name
              item.isFinish = yonl.id
            } else {
              item.isFinishName = this.yesOrNotList[1].name
              item.isFinish = this.yesOrNotList[1].id
            }
            let index = item.handles.length - 1
            item.workContent =
              // item.handles[index].creUserNo + '\n'
              item.handles[index].workContent + '\n'
            item.handles[index].creDate + ' '
            item.handles[index].creDateTime
            //处置方法
            item.hndlType = item.handles[index].hndlType
          } else {
            item.isFinishName = this.yesOrNotList[1].name
            item.isFinish = this.yesOrNotList[1].id
            item.workContent = ''
            item.hndlType = ''
          }
          //expectTime: "1970-01-01T00:00:43.426+00:00"
          if (item.expectTime && item.expectTime.length > 19) {
            item.expectTime = item.expectTime
              .substring(0, 19)
              .replace(/T/g, ' ')
          }
          //判断颜色
          //未处理颜色判断
          if (item.handles.length === 0) {
            if (
              dateToNowH(item.expectTime.substring(0, 10) + ' 23:59:59') < 0
            ) {
              item.color = 'red'
            } else if (
              dateToNowH(item.expectTime.substring(0, 10) + ' 23:59:59') < 24
            ) {
              item.color = 'yellow'
            } else {
              item.color = 'normal'
            }
          } else {
            //已处理颜色判断
            const length = item.handles.length
            const isFinishItem = item.handles.find(
              info => info.isFinish === 'Y'
            )
            //已处理且已完成 完成时间与期望时间对比
            if (isFinishItem) {
              //处理完成时间>期望时间，超时红色 2022-01-11 23:59:59
              if (
                dateCompare(
                  isFinishItem.creDateTime,
                  item.expectTime.substring(0, 10) + ' 23:59:59'
                )
              ) {
                item.color = 'red'
              } else {
                item.color = 'normal'
              }
            } else {
              //已处理但未完成 计划处理时间与期望时间对比
              if (
                dateToNowH(item.expectTime.substring(0, 10) + ' 23:59:59') < 0
              ) {
                item.color = 'red'
              } else if (
                dateToNowH(item.expectTime.substring(0, 10) + ' 23:59:59') < 24
              ) {
                item.color = 'yellow'
              } else {
                item.color = 'normal'
              }
            }
          }
          //判断状态
          const hsl = this.hndlStusList.find(cell => cell.id === item.hndlStus)
          if (hsl) item.hndlStusName = hsl.name
          //判断隐患单处理状态
          const sl = this.statusList.find(cell => cell.id === item.status)
          if (sl) item.statusName = sl.name
          item.checked = false
          //设置不可编辑
          item.isDisable = true
          item.isEditable = false
          item.disableHandleType = item.isFinish !== 'Y'
        })
        this.EquipDangers = res.data.tlist
        this.total = res.data.total
        this.loading = false
        console.log('this.EquipDangers', this.EquipDangers)
      }
    },
    //批量修改
    async batchUpdate(obj) {
      const res = await post(batchUpdateDangerInfoList, obj)
      console.log(res)
      if (res.success) {
        this.$message.success('操作成功！')
        this.query()
      } else {
        this.$message.error('操作失败！')
      }
    },
    //批量删除
    async batchDelete(obj) {
      const res = await post(batchDeleteDangerInfoList, obj)
      console.log(res)
      if (res.success) {
        this.$message.success('删除成功！')
        this.query()
      } else {
        this.$message.error('删除失败！' + res.success)
      }
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
    tableRowClassName({ row }) {
      const now = new Date()
      const planDate = new Date(row.expectTime)
      const isOverdue = now > planDate
      const isNotCompleted = row.isFinish === 'N'
      // console.log('aaaa', isOverdue)
      // console.log('bbbb', isOverdue && isNotCompleted)
      if (isOverdue && isNotCompleted) {
        return 'warning-row'
      }
      return ''
    },
    //新增处置过程
    async createHandleRecord(obj) {
      const res = await post(addDangerHandleRecord, obj)
      console.log(res)
      if (res.success) {
        this.query()
      }
    },
    rowStyle({ row, rowIndex }) {
      // console.log('高亮', row)
      let styleGrey = {
        'background-color': '#ffffcc'
      }
      if (row.resumeList !== null) {
        return styleGrey
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.warning-row {
  background-color: #e58080;
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
.headStyle {
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #606266;
  display: inline-block;
}
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 30px;
}
</style>
