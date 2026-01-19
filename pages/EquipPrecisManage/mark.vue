<template>
  <div class="contentBox">
    <!--    表单区域-->
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <!-- <el-form-item label="测量人">
        <el-select
          v-model="form.measurer"
          clearable
          style="width: 138px"
          placeholder="测量人">
          <el-option
            v-for="item in measurerList"
            :key="item.MEASURER"
            :label="item.MEASURER"
            :value="item.MEASURER">
          </el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="测量时间">
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          @clear="clearMeasureTime"
          @change="setMeasureTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click=" findAll(1)"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="useExport()"
        >
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-card style="margin-top: 16px">
      <!--    表格区域-->
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        :height="'calc(100vh - 290px)'"
        :header-cell-style="{background:'#e0f6e3'}"
        :fit="true"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
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
          v-for="(item,ind) in tableHeadInfo"
          :key="ind"
          :prop="item.key"
          :label="item.parent"
          :width="item.width"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width=""
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              style="margin:0;width: 60px;font-size: 14px"
              @click="showThisConfig(scope.row)"
            >
              历史记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--    分页区域-->
      <el-pagination
        :total="total"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        background
        align="right"
        class="foot"
        layout="total,prev, pager, next,sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--历史记录弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="历史记录"
      width="90%"
    >
      <tasily-echarts
        :tooltip="lineOption.tooltip"
        :grid="lineOption.grid"
        :legend="lineOption.legend"
        :x-axis="lineOption.xAxis"
        :y-axis="lineOption.yAxis"
        :series="lineOption.series"
        :data-zoom="lineOption.dataZoom"
        :_height="'305px'"
      />
      <el-table
        ref="multipleTable"
        :data="dialogTableData"
        :height="'calc(100vh - 500px)'"
        :header-row-style="{height:'48px'}"
        :row-style="{height:'48px'}"
        tooltip-effect="dark"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          v-for="(item,ind) in tableHeadInfo"
          :key="ind"
          :prop="item.key"
          :label="item.parent"
          :width="item.width"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
      </el-table>
      <!--   <el-pagination
        :page-size="paginationDia.pageSize"
        :total="paginationDia.total"
        :align="paginationDia.align"
        :current-page="paginationDia.currentPage"
        :page-sizes="paginationDia.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeDia"
        @current-change="handleCurrentChangeDia"
      />-->
      <!-- <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
import {
  iomPrecisionManagementController_findMyMeasure,
  iomPrecisionManagementController_findAllMeasurer,
  findHistoryByStandardID
} from '@/lib/EquipPrecisManage/ApiURL01'
export default {
  layout: 'test',
  name: 'EquipPrecisManage-mark',
  components: {
    tasilyEcharts
  },
  data() {
    return {
      /*--------历史记录-------*/
      dialogVisible: false,
      standardID: '', //历史记录传参参数
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
            top: '2%',
            left: '3%',
            right: '4%',
            bottom: '5%',
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
            data: [1, 2, 3, 4, 5, 6, 7, 8]
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
            data: [12, 16, 18, 10, 23, 33, 18, 12],
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
      },
      dialogTableData: [],
      /*--------其他-------*/
      loading: false,
      measurerList: [],
      time: '', //前端测量时间显示的时间
      form: {
        measurer: '',
        measureTime: '', //传给后台的时间参数
        pageIndex: 1,
        pageSize: 20
      },
      pageSize: 20,
      pageIndex: 1,
      total: 0,
      /*      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: 0
      }, //分页查询*/
      tableHeadInfo: [
        {
          key: 'itemName',
          parent: '标准名称',
          width: ''
        },
        {
          key: 'dutyDepartmentName',
          parent: '车间',
          width: ''
        },
        {
          key: 'productionLineAreaName',
          parent: '区域',
          width: ''
        },
        {
          key: 'deviceName',
          parent: '设备名称',
          width: ''
        },
        {
          key: 'measureType',
          parent: '测量类型',
          width: ''
        },
        //measureValue
        {
          key: 'measureValue',
          parent: '测量数值',
          width: ''
        },
        {
          key: 'checkCycle',
          parent: '测量周期',
          width: ''
        },
        {
          key: 'cycleUnit',
          parent: '测量周期单位',
          width: '70'
        },
        {
          key: 'totalScore',
          parent: '得分',
          width: ''
        },
        {
          key: 'measureTime',
          parent: '测量时间',
          width: ''
        },
        {
          key: 'measurer',
          parent: '测量人',
          width: ''
        },
        {
          key: 'standardValue',
          parent: '精度标准值',
          width: ''
        },
        {
          key: 'standardValuePos',
          parent: '精度标准上限',
          width: '70'
        },
        {
          key: 'standardValueNeg',
          parent: '精度标准下限',
          width: '70'
        }
      ],

      tableData: []
    }
  },
  created() {
    /* this.findProductionLineArea()*/
  },
  mounted() {
    this.findAll(1)
  },
  methods: {
    /*历史记录*/
    showThisConfig(row) {
      this.dialogVisible = true
      console.log('历史记录row:', row)

      this.standardID = row.standardID
      post(findHistoryByStandardID, {
        standardID: this.standardID
      }).then(res => {
        if (res && res.success) {
          let xData = []
          let yData = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].measureTime) {
              res.data[i].measureTime = moment(res.data[i].measureTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }
            xData.push(res.data[i].measureTime)
            yData.push(res.data[i].totalScore)
          }
          this.dialogTableData = res.data
          this.lineOption.xAxis[0].data = xData
          this.lineOption.series[0].data = yData
          // this.paginationDia.total = res.data.totalElements
        } else {
          this.$message.error('未查询到历史数据！')
          this.dialogTableData = []
          this.lineOption.xAxis[0].data = []
          this.lineOption.series[0].data = []
        }
      })
    },
    /*关闭历史弹窗*/
    handleClose() {
      this.dialogVisible = false
    },
    //下拉框获取数据
    async findProductionLineArea() {
      let data = []
      //测量人
      let resB = await post(
        iomPrecisionManagementController_findAllMeasurer,
        {}
      )
      this.measurerList = resB.data
      this.findAll()
    },

    setMeasureTime() {
      if (this.time == null) {
        this.form.measureTime = ''
      } else {
        this.form.measureTime = this.time
      }
    },
    clearMeasureTime() {
      if (this.time == null) {
        this.form.measureTime = ''
      } else {
        this.form.measureTime = this.time
      }
    },

    findAll(val) {
      // this.loading = true
      this.pageIndex = val
      this.form.pageIndex = val
      //传给后台的时间参数
      if (this.form.measureTime != '') {
        this.form.measureTime = moment(this.time).format('YYYY-MM-DD')
      }

      post(iomPrecisionManagementController_findMyMeasure, this.form)
        .then(res => {
          if (res.success === true) {
            for (let i = 0; i < res.data.tlist.length; i++) {
              res.data.tlist[i].measureTime = moment(
                res.data.tlist[i].measureTime
              ).format('YYYY-MM-DD HH:mm:ss')
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
                              ? '其他'
                              : ' '
              if (res.data.tlist[i].cycleUnit != '其他') {
                res.data.tlist[i].checkCycle =
                  '1次/' +
                  res.data.tlist[i].checkCycle +
                  res.data.tlist[i].cycleUnit
              } else if (res.data.tlist[i].cycleUnit == '其他') {
                res.data.tlist[i].checkCycle = res.data.tlist[i].cycleUnit
              }
            }
            this.tableData = res.data.tlist
            this.total = res.data.total
            this.loading = false
            console.log(res, 'res')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //每页显示多少条
    handleSizeChange(val) {
      this.pageSize = val //分页组件的
      this.form.pageSize = val //点击搜索传给后台的参数
      this.findAll(1)
    },
    //当前所在第几页
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
      this.pageIndex = val
      this.form.pageIndex = val
      this.findAll(val)
    },
    //导出
    useExport() {
      var url =
        'http://172.25.63.72:9100/iomPrecisionManagementController/exportMyMItemData.iom'
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '标准导出' + '.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象
    },
    handleSelectionChange() {}
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
</style>
