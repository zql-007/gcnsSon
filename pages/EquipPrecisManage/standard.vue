<template>
  <div class="contentBox">
    <!--    form表单-->
    <el-form
      :inline="true"
      :model="form"
    >
      <el-form-item label="标准名称">
        <el-input
          v-model="form.itemName"
          clearable
          style="width: 122px"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="责任部门">
        <el-select
          v-model="form.dutyDepartmentId"
          style="width: 130px"
          clearable
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
          style="width: 138px"
          clearable
          @change="selectDevice"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="tableTextPage(1)"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="addDisabled"
          type="primary"
          class="addText"
          icon="el-icon-circle-plus-outline"
          @click="addTo"
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
            :disabled="importDisabled"
            type="primary"
            icon="el-icon-download"
          >
            导入
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-upload2"
          type="primary"
          @click="useExport()"
        >
          导出
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="downloadTemplate()"
        >
          下载模板
        </el-button>
      </el-form-item>
    </el-form>
    <el-card style="margin-top: 16px">
      <!--    table表格-->
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableList"
        :height="'calc(100vh - 295px)'"
        :row-key="getRowKey"
        border
        style="width: 100%;"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
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
          :filters="productionLineFilterList"
          :filter-multiple="false"
          :column-key="'productionLine'"
          align="center"
          label="产线"
          show-overflow-tooltip
          prop="productionLineName"
          width="120"
        >
        </el-table-column>
        <el-table-column
          :filters="areaFilterList"
          :filter-multiple="false"
          :column-key="'areaFilter'"
          align="center"
          label="所属区域"
          show-overflow-tooltip
          prop="productionLineAreaName"
          width="120"
        >
        </el-table-column>
        <el-table-column
          :filters="deviceFilterList"
          :filter-multiple="false"
          :column-key="'deviceFilter'"
          align="center"
          prop="deviceName"
          show-overflow-tooltip
          label="设备名称"
          width="160"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="itemName"
          label="项目"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="standardValue"
          show-overflow-tooltip
          label="标准值"
          width="120"
        />
        <el-table-column
          align="center"
          prop="standardValuePos"
          show-overflow-tooltip
          label="上限"
          width="120"
        />
        <el-table-column
          align="center"
          prop="standardValueNeg"
          show-overflow-tooltip
          label="下限"
          width="120"
        />
        <el-table-column
          align="center"
          prop="standardUnitName"
          show-overflow-tooltip
          label="单位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          :filters="measureTypeFilterList"
          :filter-multiple="false"
          :column-key="'measureTypeFilter'"
          align="center"
          prop="measureType"
          label="测量手段"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="checkCycle"
          label="测量周期"
          show-overflow-tooltip
          width="120"
        >
        </el-table-column>
        <el-table-column
          :filters="departMentFilterList"
          :filter-multiple="false"
          :column-key="'departMentFilter'"
          align="center"
          prop="dutyDepartmentName"
          show-overflow-tooltip
          label="责任部门"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="personLiableID"
          show-overflow-tooltip
          label="工号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          :filters="dutyPersonFilterList"
          :filter-multiple="false"
          :column-key="'dutyPerson'"
          align="center"
          prop="personLiableName"
          show-overflow-tooltip
          label="责任人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          prop=""
          label="操作"
          width="270"
        >
          <template slot-scope="scope">
            <el-button
              :disabled="checkDisabled"
              size="mini"
              type="primary"
              class="buttonTable"
              @click="lookTo(scope.row)"
            >
              查看
            </el-button>
            <el-button
              :disabled="modifyDisabled"
              size="mini"
              type="primary"
              class="buttonTable"
              @click="modifyTo(scope.row)"
            >
              修改
            </el-button>
            <el-button
              :disabled="deleteDisabled"
              size="mini"
              type="danger"
              class="buttonTable"
              @click="deleteDataRow(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页-->
      <div style="display: flex;justify-content: space-between">
        <!--        <div style="margin-top: 20px">
          <span style="color: #ff2855">注：</span>生产厂需要调整设备精度标准在南钢OA发起通用流程报设备处审批。
        </div>-->
        <el-pagination
          :total="total"
          :pager-count="5"
          :page-size="pageSize"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30, 200, 1000]"
          background
          class="foot"
          align="right"
          layout="total,prev, pager, next,sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!--    新增对话框-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="新增信息"
      width="40%"
    >
      <span>标准信息</span>
      <hr>
      <!--      标准信息form表单-->
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item
          label="产线"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineId"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="selectProduction"
          >
            <el-option
              v-for="item in productionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="区域"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineAreaId"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="selectProductionArea"
            @clear="findAllDevice"
          >
            <el-option
              v-for="item in productionAreaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.deviceName"
            clearable
            filterable
            allow-create
            default-first-option
            style="width: 215px"
            placeholder="请选择"
            @change="selectDevice"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.itemName"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="标准值"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValue"
            :disabled="disableStandardValue"
            placeholder="请输入"
            style="width: 125px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.standardUnitId"
            :disabled="disableStandardUnitId"
            clearable
            placeholder="单位"
            style="width: 91px;float: left"
            @change="selectUnit"
          >
            <el-option
              v-for="item in utilList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标准值类型"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.standardType"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="changeStandardType"
          >
            <el-option
              v-for="item in standardTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上下限"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValuePos"
            :disabled="disabledPos"
            placeholder="请输入"
            style="width: 99px"
          ></el-input>
          <span>-</span>
          <el-input
            v-model="formInline.standard.standardValueNeg"
            :disabled="disabledNeg"
            placeholder="请输入"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item
          label="失效值"
          style="margin-top: 15px">
          <el-input
            v-model="formInline.standard.standardValueDisable"
            placeholder="请输入"
            style="width: 215px"></el-input>
        </el-form-item>-->
        <el-form-item
          label="测量手段"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.measureType"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="周期"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.checkCycle"
            placeholder="请输入"
            style="width: 135px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.cycleUnit"
            clearable
            placeholder="单位"
            style="width: 80px;float: left;"
          >
            <el-option
              v-for="item in circleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任部门"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.dutyDepartmentId"
            clearable
            placeholder="请选择"
            style="width: 214px"
            @change="selectDuty"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任人"
          style="margin-top: 15px"
        >
          <!--          <el-select
            v-model="formInline.standard.personLiableName"
            clearable
            filterable
            placeholder="请选择"
            style="width: 214px"
            @change="selectDutyMan">
            <el-option
              v-for="item in departmentManList"
              :key="item.id"
              :label="item.userName"
              :value="item.userNo"></el-option>
          </el-select>-->
          <user-select1
            v-model="formInline.standard.personLiableName"
            @on-change="changeCharterUser"
          />
        </el-form-item>
      </el-form>
      <!--      新增对话框取消、确定底部按钮-->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveDate"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--    查看对话框-->
    <el-dialog
      :visible.sync="dialogVisibleLook"
      :before-close="handleCloseLook"
      title="查看信息"
      width="40%"
    >
      <span>标准信息</span>
      <hr>
      <!--      标准信息form表单-->
      <el-form
        :inline="true"
        :disabled="lookToDisable"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item
          label="产线"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineId"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="selectProduction"
          >
            <el-option
              v-for="item in productionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="区域"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineAreaId"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="selectProductionArea"
            @clear="findAllDevice"
          >
            <el-option
              v-for="item in productionAreaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.deviceName"
            clearable
            filterable
            allow-create
            default-first-option
            style="width: 215px"
            placeholder="请选择"
            @change="selectDevice"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.itemName"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="标准值"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValue"
            :disabled="disableStandardValue"
            placeholder="请输入"
            style="width: 125px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.standardUnitId"
            :disabled="disableStandardUnitId"
            clearable
            placeholder="单位"
            style="width: 91px;float: left"
            @change="selectUnit"
          >
            <el-option
              v-for="item in utilList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标准值类型"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.standardType"
            clearable
            placeholder="请选择"
            style="width: 215px"
            @change="changeStandardType"
          >
            <el-option
              v-for="item in standardTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上下限"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValuePos"
            :disabled="disabledPos"
            placeholder="请输入"
            style="width: 99px"
          ></el-input>
          <span>-</span>
          <el-input
            v-model="formInline.standard.standardValueNeg"
            :disabled="disabledNeg"
            placeholder="请输入"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item
          label="失效值"
          style="margin-top: 15px">
          <el-input
            v-model="formInline.standard.standardValueDisable"
            placeholder="请输入"
            style="width: 215px"></el-input>
        </el-form-item>-->
        <el-form-item
          label="测量手段"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.measureType"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="周期"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.checkCycle"
            placeholder="请输入"
            style="width: 135px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.cycleUnit"
            clearable
            placeholder="单位"
            style="width: 80px;float: left;"
          >
            <el-option
              v-for="item in circleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任部门"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.dutyDepartmentId"
            clearable
            placeholder="请选择"
            style="width: 214px"
            @change="selectDuty"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任人"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.personLiableName"
            clearable
            placeholder="请选择"
            style="width: 214px"
          >
          </el-select>
        </el-form-item>
        <el-form-item
          label="工号"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.personLiableID"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
      </el-form>
      <!--      查看对话框取消、确定底部按钮-->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleLook = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisibleLook = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--    修改对话框-->
    <el-dialog
      :visible.sync="dialogVisibleModify"
      :before-close="handleCloseModify"
      title="修改信息"
      width="40%"
    >
      <span>标准信息</span>
      <hr>
      <!--      标准信息form表单-->
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item
          label="产线"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineId"
            placeholder="请选择"
            clearable
            style="width: 215px"
            @change="selectProduction"
          >
            <el-option
              v-for="item in productionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="区域"
          style="margin-top: 20px"
        >
          <el-select
            v-model="formInline.standard.productionLineAreaId"
            placeholder="请选择"
            clearable
            style="width: 215px"
            @change="selectProductionArea"
            @clear="findAllDevice"
          >
            <el-option
              v-for="item in productionAreaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.deviceName"
            filterable
            allow-create
            default-first-option
            style="width: 215px"
            placeholder="请选择"
            clearable
            @change="selectDevice"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.itemName"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="标准值"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValue"
            :disabled="disableStandardValue"
            placeholder="请输入"
            style="width: 125px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.standardUnitId"
            :disabled="disableStandardUnitId"
            placeholder="单位"
            clearable
            style="width: 91px;float: left"
            @change="selectUnit"
          >
            <el-option
              v-for="item in utilList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标准值类型"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.standardType"
            placeholder="请选择"
            clearable
            style="width: 215px"
            @change="changeStandardType"
          >
            <el-option
              v-for="item in standardTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上下限"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.standardValuePos"
            :disabled="disabledPos"
            placeholder="请输入"
            style="width: 99px"
          ></el-input>
          <span>-</span>
          <el-input
            v-model="formInline.standard.standardValueNeg"
            :disabled="disabledNeg"
            placeholder="请输入"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item
          label="失效值"
          style="margin-top: 15px">
          <el-input
            v-model="formInline.standard.standardValueDisable"
            placeholder="请输入"
            style="width: 215px"></el-input>
        </el-form-item>-->
        <el-form-item
          label="测量手段"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.measureType"
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="周期"
          style="display: inline-block;margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.checkCycle"
            placeholder="请输入"
            style="width: 135px;float: left"
          ></el-input>
          <el-select
            v-model="formInline.standard.cycleUnit"
            placeholder="单位"
            clearable
            style="width: 80px;float: left;"
          >
            <el-option
              v-for="item in circleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任部门"
          style="margin-top: 15px"
        >
          <el-select
            v-model="formInline.standard.dutyDepartmentId"
            placeholder="请选择"
            clearable
            style="width: 214px"
            @change="selectDuty"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="责任人"
          style="margin-top: 15px"
        >
          <user-select1
            v-model="formInline.standard.personLiableName"
            @on-change="changeCharterUser"
          />
        </el-form-item>
        <el-form-item
          label="工号"
          style="margin-top: 15px"
        >
          <el-input
            v-model="formInline.standard.personLiableID"
            disabled
            placeholder="请输入"
            style="width: 215px"
          ></el-input>
        </el-form-item>
      </el-form>
      <!--      修改对话框取消、确定底部按钮-->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleModify = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveDateModify"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--    单行删除对话框-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="提示"
      width="30%"
      center
    >
      <span>是否删除此条数据?</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteDataRow1"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--    批量删除对话框-->
    <el-dialog
      :visible.sync="deleteUserFormVisible"
      title="提示"
      width="30%"
    >
      <span>批量删除后不可恢复,是否继续?</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="deleteUserFormVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="deleteDataAll"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import {
  getProductionLineAreaInfo,
  getBusinessUnitInfo,
  getProductionLineInfo,
  getDutyDepartmentInfo,
  getDeviceInfo,
  getMeasureTypeInfo,
  doUpdate,
  doDelete,
  getStandardUtilInfo,
  getStandardInfo,
  doSave,
  findAllStanders,
  findAreaByLineID,
  findDeviceByAreaID,
  exportData,
  findPersonLiableNameList,
  importExcel,
  findDeviceByDepartID,
  userFindAllUser,
  getPersonSearchVoList,
  getProductionLineSearchVoList,
  getProductionLineAreaSearchVoList,
  getMeasureTypeSearchVoList,
  getDutyDepartmentSearchVoList,
  getDeviceSearchVoList
} from '@/lib/EquipPrecisManage/ApiURL01'
import UserSelect1 from '@/components/business/userSelect1'
import { resourceListNoPage } from '~/lib/system'
export default {
  layout: 'test',
  name: 'EquipPrecisManage-standard',
  components: {
    UserSelect1
  },
  data() {
    return {
      dutyPersonFilterList: [], //责任人
      productionLineFilterList: [], //产线
      areaFilterList: [], //区域
      measureTypeFilterList: [], //测量方式
      departMentFilterList: [], //车间(责任部门
      deviceFilterList: [], //设备
      /*----------------------------*/
      userNameId: '', //用于存放‘016452|马洪浩|15895851362’数据格式
      loading: false,
      checkDisabled: true,
      modifyDisabled: true,
      deleteDisabled: true,
      addDisabled: false,
      importDisabled: false,
      userNo: this.$store.getters['user/getUserNo'],
      eqDangersFileList: [],
      labelPosition: 'right',
      lookToDisable: false, //查看操作表单只读不能修改（禁用
      dialogVisible: false, //弹出新增对话框是否显示
      dialogVisibleLook: false, //弹出查看对话框是否显示
      dialogVisibleModify: false, //弹出修改对话框是否显示
      centerDialogVisible: false, //删除
      disableStandardValue: false, //标准值
      disableStandardUnitId: false, //标准值单位
      disabledPos: false, //上限
      disabledNeg: false, //下限
      //评价信息左右边界下拉框选项
      options: [
        {
          id: '1',
          name: '是'
        },
        {
          id: '0',
          name: '否'
        }
      ],
      //弹出对话框
      formInline: {
        standard: {
          productionLineId: '',
          productionLineName: '',
          productionLineAreaId: '', //区域
          productionLineAreaName: '',
          deviceId: '',
          deviceName: '',
          itemName: '', //项目
          standardValue: '', //标准值
          // item_unit: '', //标准值单位
          standardUnitName: '', //标准值单位名称
          standardUnitId: '', //标准值单位id
          standardValuePos: '', //标准上限
          standardValueNeg: '', //标准下限
          measureType: '',
          checkCycle: '',
          cycleUnit: '', //周期单位
          standardType: '', //标准值类型
          standardValueDisable: '', //失效值
          dutyDepartmentId: '',
          dutyDepartmentName: '',
          createTime: '',
          creator: '',
          updateTime: '',
          updater: '',
          status: 0,
          personLiableName: '',
          personLiableID: ''
        },
        scoreList: []
      },
      productionList: [], //产线
      productionAreaList: [], //区域
      departmentList: [], //责任部门
      deviceList: [], //设备
      tableList: [], //标准维护table表格
      //测量方式
      measureTypeList: [],
      //标准维护下拉框
      form: {
        itemName: '',
        productionLineId: '',
        productionLineAreaId: '', //区域
        measureTypeId: '', //测量方式
        dutyDepartmentId: '', //责任部门
        deviceId: '', //设备
        pageIndex: '',
        pageSize: '',
        status: 0,
        liablePersonName: '' //责任人
      },
      utilList: [], //标准值单位
      //周期单位
      circleList: [
        { id: 0, name: '无' },
        { id: 1, name: '班' },
        { id: 2, name: '日' },
        { id: 3, name: '周' },
        { id: 4, name: '月' },
        { id: 5, name: '年' } /*,
        { id: 6, name: '其他' }*/
      ],
      //标准值类型
      standardTypeList: [{ id: 0, name: '数值' }, { id: 1, name: '判断' }],
      pageSize: 20,
      pageIndex: 1,
      total: 0,
      deleteData: {}, //table单行删除
      multipleSelection: [], //使用selection-change监听选项变化，然后将选中参数val值赋值给multipleSelection数组
      deleteUserFormVisible: false, //删除多选项删除时弹出的对话框
      //table批量删除
      deleteAll: {
        standardList: []
      },
      departmentManList: []
    }
  },
  created() {
    this.findStandardSelect() //标准维护下拉框数据
    this.tableText() //标准维护table表格
    this.findAllData()
    console.log('this.userNo', this.userNo)
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    //获取责任人
    filterChkEmpNameList() {
      post(getPersonSearchVoList, {}).then(res => {
        if (res.success) {
          this.dutyPersonFilterList = res.data
        }
      })
    },
    //获取产线
    findProductionLineList() {
      post(getProductionLineSearchVoList, {}).then(res => {
        if (res.success) {
          this.productionLineFilterList = res.data
        }
      })
    },
    //获取区域
    findAreaList() {
      post(getProductionLineAreaSearchVoList, {}).then(res => {
        if (res.success) {
          this.areaFilterList = res.data
        }
      })
    },
    //获取测量方式
    findMeasureTypeList() {
      post(getMeasureTypeSearchVoList, {}).then(res => {
        if (res.success) {
          this.measureTypeFilterList = res.data
        }
      })
    },
    //获取责任部门
    findDepartMentList() {
      post(getDutyDepartmentSearchVoList, {}).then(res => {
        if (res.success) {
          this.departMentFilterList = res.data
        }
      })
    },
    //获取设备
    findDeviceList() {
      post(getDeviceSearchVoList, {}).then(res => {
        if (res.success) {
          this.deviceFilterList = res.data
        }
      })
    },
    filterChange(obj) {
      const keys = Object.keys(obj)
      const values = Object.values(obj)
      let useDeptKeys = keys[0]
      let useDeptNum = values[0][0]
      console.log('Keys', useDeptKeys)
      console.log('value', useDeptNum)
      if (useDeptKeys === 'dutyPerson') {
        this.form.liablePersonName = useDeptNum
      } else if (useDeptKeys === 'productionLine') {
        this.form.productionLineId = useDeptNum
      } else if (useDeptKeys === 'areaFilter') {
        this.form.productionLineAreaId = useDeptNum
      } else if (useDeptKeys === 'measureTypeFilter') {
        this.form.measureTypeId = useDeptNum
      } else if (useDeptKeys === 'departMentFilter') {
        this.form.dutyDepartmentId = useDeptNum
      } else if (useDeptKeys === 'deviceFilter') {
        this.form.deviceId = useDeptNum
      }
      this.pageIndex = 1
      this.pageSize = 20
      this.tableText()
    },
    //查询所有用户信息
    async findAllData() {
      post(userFindAllUser, {
        userNo: '011222'
      }).then(res => {
        this.departmentManList = res.data
      })
    },
    //查询菜单
    async getMenuList() {
      const res = await post(resourceListNoPage, {
        userNo: this.userNo,
        serviceName: 'iom'
      })
      if (res.success) {
        console.log('res菜单:', res)
        const menu = res.data.filter(item => item.type === 'menu')
        const button = res.data.filter(item => item.type === 'button')
        console.log('menu', menu)
        console.log('button', button)
        for (let i = 0; i < button.length; i++) {
          if (button[i].code === 'check') {
            this.checkDisabled = false
          }
          if (button[i].code === 'Modify') {
            this.modifyDisabled = false
          }
          if (button[i].code === 'delete') {
            this.deleteDisabled = false
          }
          if (button[i].code === 'add') {
            this.addDisabled = false
          }
          if (button[i].code === 'import') {
            this.importDisabled = false
          }
        }
        // let menuList = getTreeMenuData(menu, '')
        // let menuList = generateUserTree(menu)
        // this.menuData = menuList
        // console.log('list', this.menuData)
        // 缓存菜单、按钮权限数据
        this.$store.commit('menu/setAllMenus', menu)
        // this.$store.commit('menu/setUserTreeMenuList', menuList)
        // this.$store.commit('menu/setPageButtonPower', getPageButtonData(button))
      }
    },
    //导出
    useExport() {
      var url =
        'http://172.25.63.72:9100/iomPrecisionStandardController/exportData.iom'
      var urlfix =
        '?productionLineId=' +
        this.form.productionLineId +
        '&dutyDepartmentId=' +
        this.form.dutyDepartmentId +
        '&deviceId=' +
        this.form.deviceId
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
    },
    //下载模板
    async downloadTemplate(file) {
      // serverHost
      var url =
        'http://172.25.63.72:9100/iomPrecisionStandardController/downloadTemplate.iom'

      // localhost
      // var url =
      //   'http://172.26.17.38:9100/iomPrecisionStandardController/downloadTemplate.iom'
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '标准导出' + '.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象
    },

    //----------导入----------
    importExcel(file) {
      this.uploadFile(file)
    },
    //导入文件
    async uploadFile(file) {
      let formData = new FormData()
      formData.append('file', file)
      formData.append('userNo', this.userNo)
      post(importExcel, formData)
        .then(res => {
          if (res.success === true) {
            this.$message.success('导入成功！')
            this.tableText()
          } else {
            this.$message.error('导入失败！' + res.message)
          }
        })
        .catch(err => {
          this.$message.error('导入失败！' + err)
          console.log(err)
        })
    },

    //标准值类型为1，禁用标准值、上下限
    changeStandardType() {
      if (this.formInline.standard.standardType == '1') {
        this.disableStandardValue = true
        this.disableStandardUnitId = true
        this.disabledPos = true
        this.disabledNeg = true
      } else {
        this.disableStandardValue = false
        this.disableStandardUnitId = false
        this.disabledPos = false
        this.disabledNeg = false
      }
    },
    // 保存表格数据被选后分页跳选仍能保存
    getRowKey(row) {
      return row.id
    },
    //table批量删除
    handleSelectionChange(val) {
      console.log('勾选val:', val)
      this.multipleSelection = val
    },
    deleteDataAll() {
      this.deleteUserFormVisible = true
      this.deleteAll.standardList = [] //保障每次多选后的数据push时为空，不然数据会叠加
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.deleteAll.standardList.push({
          id: this.multipleSelection[i].id,
          status: 2
        })
      }
      post(doDelete, this.deleteAll).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      this.tableText()
      this.deleteUserFormVisible = false
    },
    //table单行删除
    deleteDataRow(val) {
      // this.centerDialogVisible = true
      this.deleteData = val
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post(doDelete, { status: 2, id: this.deleteData.id }).then(res => {
            if (res.success) {
              this.$message.success('删除成功！')
              this.tableText()
            } else {
              this.$message.error('删除失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteDataRow1() {
      post(doDelete, { status: 2, id: this.deleteData.id })
        .then(res => {
          if (res.success === true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableText()
          }
          this.centerDialogVisible = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    //弹出框产线传name
    async selectProduction(value) {
      //产线、区域数据联动
      const { data: respA } = await post(findAreaByLineID, { lineID: value })
      this.productionAreaList = respA
      //向后台传产线下拉数据name
      this.productionList.forEach(item => {
        if (item.id === value) {
          this.formInline.standard.productionLineName = item.name
        }
      })
    },
    //弹出框区域传name
    async selectProductionArea(value) {
      //区域、设备下拉数据联动
      const { data: respA } = await post(findDeviceByAreaID, { areaID: value })
      this.deviceList = respA
      //向后台传区域下拉数据name
      this.productionAreaList.forEach(item => {
        if (item.id === value) {
          this.formInline.standard.productionLineAreaName = item.name
        }
      })
    },
    //弹出框设备传name
    selectDevice(value) {
      let idArray = []
      this.deviceList.forEach(item => {
        if (item.id === value) {
          idArray.push(item.id)
          this.formInline.standard.deviceName = item.name
        }
      })
      //新增自定义设备
      if (idArray.indexOf(value) === -1 && value !== '') {
        this.formInline.standard.deviceName = value
        this.formInline.standard.deviceId = 'createNew'
      }
    },
    //弹出框责任部门传name
    selectDuty(value) {
      this.departmentList.forEach(item => {
        if (item.id === value) {
          this.formInline.standard.dutyDepartmentName = item.name
        }
      })
    },
    changeCharterUser(value) {
      console.log('责任人value:', value)
      this.userNameId = value
      // let num1 = []
      let num1 = value.split('|')
      console.log('num1[1]', num1[1])
      this.formInline.standard.personLiableName = num1[1]
      if (num1[0].indexOf(',') !== -1) {
        let arr = num1[0].split(',')
        console.log('arr', arr)
        this.formInline.standard.personLiableID = arr[1]
      } else {
        this.formInline.standard.personLiableID = num1[0]
      }
    },
    //弹出框标准值单位传name
    selectUnit(value) {
      this.utilList.forEach(item => {
        if (item.id === value) {
          this.formInline.standard.standardUnitName = item.name
        }
      })
    },
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.tableText()
    },
    //监听pageIndex改变的事件
    handleCurrentChange(newPage) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.pageIndex = newPage
      this.tableText()
    },
    //新增、查看、修改按钮
    async addTo() {
      //标准值单位
      const { data: res } = await post(getStandardUtilInfo, {})
      this.utilList = res //标准值单位
      //实现打开弹出对话框之前数据清零
      this.formInline.standard = {
        productionLineId: '', //产线
        productionLineName: '',
        productionLineAreaId: '', //区域
        productionLineAreaName: '',
        deviceId: '', //设备
        deviceName: '',
        itemName: '', //项目
        standardValue: '', //标准值
        // item_unit: '', //标准值单位
        standardUnitName: '', //标准值单位名称
        standardUnitId: '', //标准值单位id
        standardValuePos: '', //标准上限
        standardValueNeg: '', //标准下限
        measureType: '',
        checkCycle: '',
        cycleUnit: '', //周期单位
        standardType: '', //标准值类型
        standardValueDisable: '', //失效值
        dutyDepartmentId: '', //责任部门
        dutyDepartmentName: '',
        createTime: '',
        creator: '',
        updateTime: '',
        updater: '',
        status: 0
      }
      this.dialogVisible = true
    },
    async lookTo(val) {
      //查看操作禁用不能修改
      this.lookToDisable = true
      //标准值单位
      const { data: res } = await post(getStandardUtilInfo, {})
      this.utilList = res //utilList标准值单位
      this.formInline.standard = val
      this.dialogVisibleLook = true
    },
    async modifyTo(val) {
      //标准值单位
      const { data: res } = await post(getStandardUtilInfo, {})
      this.utilList = res
      const { data: upData } = await post(getStandardInfo, {
        standardID: val.id
      })
      this.formInline.standard = JSON.parse(upData)
      this.dialogVisibleModify = true
    },
    // 新增页面确定保存
    async saveDate() {
      // 将后台规定为Number类型的字段由string转为number
      this.formInline.standard.standardValuePos = Number(
        this.formInline.standard.standardValuePos
      )
      this.formInline.standard.standardValueNeg = Number(
        this.formInline.standard.standardValueNeg
      )
      this.formInline.standard.standardValue = Number(
        this.formInline.standard.standardValue
      )
      this.formInline.standard.cycleUnit = Number(
        this.formInline.standard.cycleUnit
      )
      this.formInline.standard.standardValueDisable = Number(
        this.formInline.standard.standardValueDisable
      )
      if (this.formInline.standard.standardType == '1') {
        this.formInline.standard.standardValue = ''
        this.formInline.standard.standardUnitName = ''
        this.formInline.standard.standardValuePos = ''
        this.formInline.standard.standardValueNeg = ''
      }
      const res = await post(doSave, this.formInline)
      this.dialogVisible = false
      this.tableText()
      if (res != null && res.success === true) {
        this.tableText()
      } else {
        return
      }
    },
    //修改页面确定保存
    async saveDateModify() {
      const res = await post(doUpdate, this.formInline)
      this.dialogVisibleModify = false
      if (res.success === true) {
        this.tableText()
      } else {
        return
      }
    },
    //标准维护下拉框获取数据
    async findStandardSelect() {
      // 产线
      const { data: resp } = await post(getProductionLineInfo, {})
      this.productionList = resp
      // 区域
      const { data: respA } = await post(getProductionLineAreaInfo, {})
      this.productionAreaList = respA
      // 责任部门
      const { data: resD } = await post(getDutyDepartmentInfo, {})
      this.departmentList = resD
      // 设备
      const { data: resDc } = await post(getDeviceInfo, {})
      this.deviceList = resDc

      const { data: mtList } = await post(getMeasureTypeInfo, {})
      this.measureTypeList = mtList
    },

    // form表单产线-区域、区域-设备联动
    async findAreaByLineID(value) {
      const { data: respA } = await post(findAreaByLineID, { lineID: value })
      this.productionAreaList = respA
      //产线-责任部门联动
      const { data: respB } = await post(getDutyDepartmentInfo, {
        productionLineID: value
      })
      this.departmentList = respB
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
    //顶部表单根据责任部门查询-联动-设备
    async findDeviceByDepartID(value) {
      const { data: respA } = await post(findDeviceByDepartID, {
        departID: value
      })
      this.deviceList = respA
    },

    tableTextPage(val) {
      this.pageIndex = val
      this.tableText()
    },

    //表格获取数据
    async tableText() {
      // this.loading = true
      this.form.pageIndex = this.pageIndex
      this.form.pageSize = this.pageSize
      const { data: res } = await post(findAllStanders, this.form)
      if (res.tlist != null) {
        for (let i = 0; i < res.tlist.length; i++) {
          res.tlist[i].cycleUnit =
            res.tlist[i].cycleUnit == '0'
              ? '无'
              : res.tlist[i].cycleUnit == '1'
                ? '班'
                : res.tlist[i].cycleUnit == '2'
                  ? '日'
                  : res.tlist[i].cycleUnit == '3'
                    ? '周'
                    : res.tlist[i].cycleUnit == '4'
                      ? '月'
                      : res.tlist[i].cycleUnit == '5'
                        ? '年'
                        : res.tlist[i].cycleUnit == '6'
                          ? '其他'
                          : ' '
        }
        for (let i = 0; i < res.tlist.length; i++) {
          if (res.tlist[i].cycleUnit != '其他') {
            res.tlist[i].checkCycle =
              '1次/' + res.tlist[i].checkCycle + res.tlist[i].cycleUnit
          } else {
            res.tlist[i].checkCycle = res.tlist[i].cycleUnit
          }
        }
        this.tableList = res.tlist
        this.total = res.total
        this.filterChkEmpNameList()
        this.findProductionLineList()
        this.findAreaList()
        this.findMeasureTypeList()
        this.findDepartMentList()
        this.findDeviceList()
        this.loading = false
      } else {
        this.$message('未请求到数据!')
        this.loading = false
      }
    },
    //对话框点击增加按钮表格增加一行数据
    addRow() {
      let objScore = {
        left_border: '',
        left_border_include: '',
        measure_value: '',
        right_border_include: '',
        right_border: '',
        weight: '',
        createTime: '',
        creator: '',
        updateTime: '',
        updater: ''
      }
      this.formInline.scoreList.push(objScore)
    },
    //对话框点击增加按钮表格删除一行数据
    // deleteRow() {
    //   this.formInline.scoreList.splice(-1, 1)
    // },
    //新增按钮关闭弹出弹窗
    handleClose(done) {
      this.$confirm('退出后新增项目信息将不会保存，是否确认退出！')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //查看
    handleCloseLook: done => {
      done()
    },
    //删除
    handleCloseModify: done => {
      done()
    }
  }
}
</script>

<style lang="less">
.el-table-filter {
  height: 300px;
  overflow: auto;
}
</style>
<style scoped lang="less">
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
/*验证*/
.el-form-item__content:after,
.el-form-item__content:before {
  display: table;
  content: '';
}
.el-form-item__content:after {
  clear: both;
}
.el-form-item__content:after,
.el-form-item__content:before {
  display: table;
  content: '';
}
.el-form-item__content {
  position: relative;
}
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
/*table表格*/
/*.table_scroll {*/
/*  margin-left: 25px;*/
/*}*/
/*form表单新增按钮*/
.addText {
  /*margin-left: 10px;*/
}
/*分页组件*/
.foot {
  margin-top: 20px;
  margin-bottom: 5px;
}
/*操作下三个按钮*/
//.buttonTable {
//  height: 24px;
//  width: 46px;
//  padding: 6px 10px;
//  margin-left: 5px;
//}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
/*新增子页面增加、删除按钮*/
.buttonAdd {
  width: 30px;
}
.buttonDel {
  width: 30px;
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
/deep/.el-dialog {
  height: 60%;
}
/deep/.input-border .el-popover__reference {
  width: 214px;
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
</style>
