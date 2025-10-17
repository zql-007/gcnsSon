<template>
  <div
    class="contentBox">
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
            <el-popconfirm
              title="是否确认删除？"
            >
              <el-button
                slot="reference"
                :disabled="deleteDisabled"
                size="mini"
                type="danger"
                style="margin-left: 8px"
                class="buttonTable"
                @click="deleteDataRow(scope.row)"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页-->
      <div style="display: flex;justify-content: space-between">
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
      <div style="margin-bottom: 10px"><span>标准信息</span></div>
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
      class="dialogClass"
      title="查看信息"
      width="40%"
    >
      <div style="margin-bottom: 10px"><span>标准信息</span></div>
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
      class="dialogClass"
      title="修改信息"
      width="40%"
    >
      <div style="margin-bottom: 10px"><span>标准信息</span></div>
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
        <el-form-item
          label="责任人"
          style="margin-top: 15px"
        >
          <user-select1
            v-model="formInline.standard.personLiableName"
            @on-change="changeCharterUser"
          />
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
    <!--    <el-dialog
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
    </el-dialog>-->
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
// import { get, post } from '@/lib/Util'
// import {
//   getProductionLineAreaInfo,
//   getBusinessUnitInfo,
//   getProductionLineInfo,
//   getDutyDepartmentInfo,
//   getDeviceInfo,
//   getMeasureTypeInfo,
//   doUpdate,
//   doDelete,
//   getStandardUtilInfo,
//   getStandardInfo,
//   doSave,
//   findAllStanders,
//   findAreaByLineID,
//   findDeviceByAreaID,
//   exportData,
//   findPersonLiableNameList,
//   importExcel,
//   findDeviceByDepartID,
//   userFindAllUser,
//   getPersonSearchVoList,
//   getProductionLineSearchVoList,
//   getProductionLineAreaSearchVoList,
//   getMeasureTypeSearchVoList,
//   getDutyDepartmentSearchVoList,
//   getDeviceSearchVoList
// } from '@/lib/ApiURL01'
// import UserSelect1 from '@/components/business/userSelect1'
// import { queryWorkDeptInfo } from '@/lib/RiskManageApi'
// import { resourceListNoPage } from '~/lib/system'
// import { deleteFile } from '@/lib/EquipmentLedger'
export default {
  // layout: 'test',
  name: 'EquipPrecisManage-standard',
  components: {
    // UserSelect1
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
      checkDisabled: false,
      modifyDisabled: false,
      deleteDisabled: false,
      addDisabled: false,
      importDisabled: false,
      userNo: 'testUser', // 模拟用户编号
      eqDangersFileList: [],
      labelPosition: 'right',
      lookToDisable: true, //查看操作表单只读不能修改（禁用
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
      businessList: [], //事业部
      productionList: [
        { id: '1', name: '产线A' },
        { id: '2', name: '产线B' },
        { id: '3', name: '产线C' }
      ], //产线 - 假数据
      productionAreaList: [
        { id: '1', name: '区域1' },
        { id: '2', name: '区域2' },
        { id: '3', name: '区域3' }
      ], //区域 - 假数据
      departmentList: [
        { id: '1', name: '生产部' },
        { id: '2', name: '设备部' },
        { id: '3', name: '质检部' }
      ], //责任部门 - 假数据
      deviceList: [
        { id: '1', name: '设备A' },
        { id: '2', name: '设备B' },
        { id: '3', name: '设备C' }
      ], //设备 - 假数据
      tableList: [
        {
          id: '1',
          productionLineName: '产线A',
          productionLineAreaName: '区域1',
          deviceName: '设备A',
          itemName: '精度检测',
          standardValue: '0.01',
          standardValuePos: '0.02',
          standardValueNeg: '-0.02',
          standardUnitName: 'mm',
          measureType: '激光测量',
          checkCycle: '1',
          dutyDepartmentName: '质检部',
          personLiableID: '1001',
          personLiableName: '张三'
        },
        {
          id: '2',
          productionLineName: '产线B',
          productionLineAreaName: '区域2',
          deviceName: '设备B',
          itemName: '压力测试',
          standardValue: '100',
          standardValuePos: '110',
          standardValueNeg: '90',
          standardUnitName: 'MPa',
          measureType: '压力传感器',
          checkCycle: '2',
          dutyDepartmentName: '生产部',
          personLiableID: '1002',
          personLiableName: '李四'
        },
        {
          id: '1',
          productionLineName: '产线A',
          productionLineAreaName: '区域1',
          deviceName: '设备A',
          itemName: '精度检测',
          standardValue: '0.01',
          standardValuePos: '0.02',
          standardValueNeg: '-0.02',
          standardUnitName: 'mm',
          measureType: '激光测量',
          checkCycle: '1',
          dutyDepartmentName: '质检部',
          personLiableID: '1001',
          personLiableName: '张三'
        },
        {
          id: '2',
          productionLineName: '产线B',
          productionLineAreaName: '区域2',
          deviceName: '设备B',
          itemName: '压力测试',
          standardValue: '100',
          standardValuePos: '110',
          standardValueNeg: '90',
          standardUnitName: 'MPa',
          measureType: '压力传感器',
          checkCycle: '2',
          dutyDepartmentName: '生产部',
          personLiableID: '1002',
          personLiableName: '李四'
        },
        {
          id: '1',
          productionLineName: '产线A',
          productionLineAreaName: '区域1',
          deviceName: '设备A',
          itemName: '精度检测',
          standardValue: '0.01',
          standardValuePos: '0.02',
          standardValueNeg: '-0.02',
          standardUnitName: 'mm',
          measureType: '激光测量',
          checkCycle: '1',
          dutyDepartmentName: '质检部',
          personLiableID: '1001',
          personLiableName: '张三'
        },
        {
          id: '2',
          productionLineName: '产线B',
          productionLineAreaName: '区域2',
          deviceName: '设备B',
          itemName: '压力测试',
          standardValue: '100',
          standardValuePos: '110',
          standardValueNeg: '90',
          standardUnitName: 'MPa',
          measureType: '压力传感器',
          checkCycle: '2',
          dutyDepartmentName: '生产部',
          personLiableID: '1002',
          personLiableName: '李四'
        }
      ], //标准维护table表格 - 假数据
      //测量方式
      measureTypeList: [
        { id: '1', name: '激光测量' },
        { id: '2', name: '人工检测' },
        { id: '3', name: '传感器监测' }
      ],
      //标准维护下拉框
      form: {
        itemName: '',
        businessUnitId: '',
        productionLineId: '',
        productionLineAreaId: '', //区域
        measureTypeId: '', //测量方式
        dutyDepartmentId: '', //责任部门
        deviceId: '', //设备
        pageIndex: 1,
        pageSize: 10,
        status: 0,
        liablePersonName: '' //责任人
      },
      utilList: [
        { id: '1', name: 'mm' },
        { id: '2', name: 'MPa' },
        { id: '3', name: '℃' }
      ], //标准值单位 - 假数据
      //周期单位
      circleList: [
        { id: '1', name: '天' },
        { id: '2', name: '周' },
        { id: '3', name: '月' }
      ],
      standardTypeList: [
        { id: '1', name: '绝对值' },
        { id: '2', name: '范围值' }
      ], //标准值类型 - 假数据
      total: 2, // 总条数 - 假数据
      pageIndex: 1,
      pageSize: 10,
      multipleSelection: [], //批量选择
      currentRow: {} //当前行数据
    }
  },
  created() {
    // 初始化假数据
    this.init假数据()
  },
  methods: {
    init假数据() {
      // 初始化过滤器数据
      this.productionLineFilterList = this.productionList.map(item => ({
        text: item.name,
        value: item.name
      }))
      this.areaFilterList = this.productionAreaList.map(item => ({
        text: item.name,
        value: item.name
      }))
      this.deviceFilterList = this.deviceList.map(item => ({
        text: item.name,
        value: item.name
      }))
      this.departMentFilterList = this.departmentList.map(item => ({
        text: item.name,
        value: item.name
      }))
      this.measureTypeFilterList = this.measureTypeList.map(item => ({
        text: item.name,
        value: item.name
      }))
      this.dutyPersonFilterList = [
        { text: '张三', value: '张三' },
        { text: '李四', value: '李四' }
      ]
    },
    getRowKey(row) {
      return row.id
    },
    tableTextPage(page) {
      this.pageIndex = page
      // 模拟搜索
      const filterText = this.form.itemName
      const filterDevice = this.form.deviceId
      const filterDept = this.form.dutyDepartmentId

      // 过滤逻辑
      let filteredList = [...this.tableList]

      if (filterText) {
        filteredList = filteredList.filter(item =>
          item.itemName.includes(filterText)
        )
      }

      if (filterDevice) {
        const device = this.deviceList.find(d => d.id === filterDevice)
        if (device) {
          filteredList = filteredList.filter(
            item => item.deviceName === device.name
          )
        }
      }

      if (filterDept) {
        const dept = this.departmentList.find(d => d.id === filterDept)
        if (dept) {
          filteredList = filteredList.filter(
            item => item.dutyDepartmentName === dept.name
          )
        }
      }

      this.tableList = filteredList
      this.total = filteredList.length
    },
    addTo() {
      // 重置表单
      this.formInline.standard = {
        productionLineId: '',
        productionLineName: '',
        productionLineAreaId: '',
        productionLineAreaName: '',
        deviceId: '',
        deviceName: '',
        itemName: '',
        standardValue: '',
        standardUnitName: '',
        standardUnitId: '',
        standardValuePos: '',
        standardValueNeg: '',
        measureType: '',
        checkCycle: '',
        cycleUnit: '',
        standardType: '',
        dutyDepartmentId: '',
        dutyDepartmentName: '',
        personLiableName: '',
        personLiableID: ''
      }
      this.dialogVisible = true
    },
    lookTo(row) {
      this.formInline.standard = { ...row }
      this.dialogVisibleLook = true
    },
    modifyTo(row) {
      this.formInline.standard = { ...row }
      this.dialogVisibleModify = true
    },
    deleteDataRow(row) {
      this.currentRow = row
      this.centerDialogVisible = true
    },
    deleteDataRow1() {
      // 模拟删除
      this.tableList = this.tableList.filter(
        item => item.id !== this.currentRow.id
      )
      this.total = this.tableList.length
      this.centerDialogVisible = false
      this.$message.success('删除成功')
    },
    saveDate() {
      // 模拟保存
      const newItem = {
        ...this.formInline.standard,
        id: Date.now().toString(),
        productionLineName:
          this.productionList.find(
            p => p.id === this.formInline.standard.productionLineId
          )?.name || '',
        productionLineAreaName:
          this.productionAreaList.find(
            a => a.id === this.formInline.standard.productionLineAreaId
          )?.name || '',
        deviceName:
          this.deviceList.find(
            d => d.id === this.formInline.standard.deviceName
          )?.name || '',
        dutyDepartmentName:
          this.departmentList.find(
            d => d.id === this.formInline.standard.dutyDepartmentId
          )?.name || ''
      }
      this.tableList.unshift(newItem)
      this.total = this.tableList.length
      this.dialogVisible = false
      this.$message.success('新增成功')
    },
    saveDateModify() {
      // 模拟修改
      const index = this.tableList.findIndex(
        item => item.id === this.formInline.standard.id
      )
      if (index !== -1) {
        this.tableList[index] = {
          ...this.formInline.standard,
          productionLineName:
            this.productionList.find(
              p => p.id === this.formInline.standard.productionLineId
            )?.name || '',
          productionLineAreaName:
            this.productionAreaList.find(
              a => a.id === this.formInline.standard.productionLineAreaId
            )?.name || '',
          deviceName:
            this.deviceList.find(
              d => d.id === this.formInline.standard.deviceName
            )?.name || '',
          dutyDepartmentName:
            this.departmentList.find(
              d => d.id === this.formInline.standard.dutyDepartmentId
            )?.name || ''
        }
      }
      this.dialogVisibleModify = false
      this.$message.success('修改成功')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.tableTextPage(1)
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.tableTextPage(val)
    },
    filterChange(filters) {
      // 模拟过滤
      console.log('过滤条件:', filters)
    },
    findDeviceByDepartID() {
      // 模拟根据部门找设备
      console.log('部门ID:', this.form.dutyDepartmentId)
    },
    selectDevice() {
      // 模拟选择设备
      console.log('设备ID:', this.formInline.standard.deviceName)
    },
    selectProduction() {
      // 模拟选择产线
      console.log('产线ID:', this.formInline.standard.productionLineId)
    },
    selectProductionArea() {
      // 模拟选择区域
      console.log('区域ID:', this.formInline.standard.productionLineAreaId)
    },
    findAllDevice() {
      // 模拟查询所有设备
      console.log('查询所有设备')
    },
    selectUnit() {
      // 模拟选择单位
      console.log('单位ID:', this.formInline.standard.standardUnitId)
    },
    changeStandardType() {
      // 模拟改变标准值类型
      console.log('标准值类型:', this.formInline.standard.standardType)
    },
    selectDuty() {
      // 模拟选择责任部门
      console.log('责任部门ID:', this.formInline.standard.dutyDepartmentId)
    },
    changeCharterUser(user) {
      // 模拟选择责任人
      console.log('责任人:', user)
      this.formInline.standard.personLiableID =
        'EMP' + Math.floor(Math.random() * 1000)
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleCloseLook() {
      this.dialogVisibleLook = false
    },
    handleCloseModify() {
      this.dialogVisibleModify = false
    },
    useExport() {
      // 模拟导出
      this.$message.success('导出成功')
    },
    downloadTemplate() {
      // 模拟下载模板
      this.$message.success('模板下载成功')
    },
    importExcel(file) {
      // 模拟导入
      this.$message.success('导入成功')
      return false
    },
    deleteDataAll() {
      // 模拟批量删除
      const ids = this.multipleSelection.map(item => item.id)
      this.tableList = this.tableList.filter(item => !ids.includes(item.id))
      this.total = this.tableList.length
      this.deleteUserFormVisible = false
      this.$message.success('批量删除成功')
    }
  }
}
</script>

<style lang="less">
.contentBox {
  padding: 15px;
}
.el-table-filter {
  height: 300px;
  overflow: auto;
}
</style>
<style scoped lang="less">
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
//class="dialogClass"
/deep/.el-dialog {
  height: 60%;
  padding: 0;
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
