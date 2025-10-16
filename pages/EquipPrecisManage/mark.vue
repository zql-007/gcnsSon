<template>
  <div>
    <!--    表单区域-->
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
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
    </el-dialog>
  </div>
</template>

<script>
// import { get, post } from '@/lib/Util'
import moment from 'moment'
import tasilyEcharts from '@/components/TasilyEcharts'
// import {
//   iomPrecisionManagementController_findMyMeasure,
//   iomPrecisionManagementController_findAllMeasurer,
//   findHistoryByStandardID
// } from '@/lib/ApiURL01'
export default {
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
        ],
        dataZoom: []
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
    // 注释原接口调用
    // this.findProductionLineArea()
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
      // 注释接口调用，使用假数据
      // post(findHistoryByStandardID, {
      //   standardID: this.standardID
      // }).then(res => {
      //   ...
      // })

      // 生成假的历史数据
      const mockData = []
      for (let i = 0; i < 5; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        mockData.push({
          ...row,
          id: row.id + i,
          measureTime: moment(date).format('YYYY-MM-DD HH:mm:ss'),
          totalScore: row.totalScore + (Math.random() * 10 - 5),
          measureValue: (
            row.measureValue *
            (1 + (Math.random() * 0.2 - 0.1))
          ).toFixed(2)
        })
      }

      const xData = mockData.map(item => item.measureTime)
      const yData = mockData.map(item => item.totalScore)

      this.dialogTableData = mockData
      this.lineOption.xAxis[0].data = xData
      this.lineOption.series[0].data = yData
    },
    /*关闭历史弹窗*/
    handleClose() {
      this.dialogVisible = false
    },
    //下拉框获取数据（已注释接口调用）
    async findProductionLineArea() {
      let data = []
      // 注释接口调用
      // let resB = await post(
      //   iomPrecisionManagementController_findAllMeasurer,
      //   {}
      // )
      // this.measurerList = resB.data

      // 假数据
      this.measurerList = [
        { MEASURER: '张三' },
        { MEASURER: '李四' },
        { MEASURER: '王五' }
      ]
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
      console.log(val, '333')
      this.loading = true
      this.pageIndex = val
      this.form.pageIndex = val

      // 注释接口调用
      // post(iomPrecisionManagementController_findMyMeasure, this.form)
      //   .then(res => {
      //     ...
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

      // 生成假数据
      setTimeout(() => {
        const mockData = []
        const totalCount = 58 // 总数据量
        this.total = totalCount

        const startIndex = (val - 1) * this.pageSize
        const endIndex = Math.min(startIndex + this.pageSize, totalCount)

        for (let i = startIndex; i < endIndex; i++) {
          const cycleUnit = ['0', '1', '2', '3', '4', '5', '6'][
            Math.floor(Math.random() * 7)
          ]
          let cycleText = ''
          let checkCycleText = ''

          switch (cycleUnit) {
            case '0':
              cycleText = '无'
              break
            case '1':
              cycleText = '班'
              break
            case '2':
              cycleText = '日'
              break
            case '3':
              cycleText = '周'
              break
            case '4':
              cycleText = '月'
              break
            case '5':
              cycleText = '年'
              break
            case '6':
              cycleText = '其他'
              break
          }

          if (cycleText !== '其他') {
            const cycleNum = Math.floor(Math.random() * 10) + 1
            checkCycleText = `1次/${cycleNum}${cycleText}`
          } else {
            checkCycleText = '其他'
          }

          const date = new Date()
          date.setDate(date.getDate() - Math.floor(Math.random() * 30))

          mockData.push({
            id: i + 1,
            standardID: 'STD' + (i + 1000),
            itemName: `精度标准${i + 1}`,
            dutyDepartmentName: `车间${(i % 3) + 1}`,
            productionLineAreaName: `区域${(i % 5) + 1}`,
            deviceName: `设备${(i % 4) + 1}`,
            measureType: Math.random() > 0.5 ? '日常测量' : '定期测量',
            measureValue: (Math.random() * 100).toFixed(2),
            checkCycle: checkCycleText,
            cycleUnit: cycleText,
            totalScore: Math.floor(Math.random() * 50) + 50,
            measureTime: moment(date).format('YYYY-MM-DD HH:mm:ss'),
            measurer: ['张三', '李四', '王五', '赵六'][
              Math.floor(Math.random() * 4)
            ],
            standardValue: (Math.random() * 50 + 50).toFixed(2),
            standardValuePos: (Math.random() * 30 + 100).toFixed(2),
            standardValueNeg: (Math.random() * 30).toFixed(2)
          })
        }

        this.tableData = mockData
        this.loading = false
      }, 500) // 模拟网络延迟
    },
    //每页显示多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.form.pageSize = val
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
      // 注释实际导出接口，保留交互效果
      this.$message.success('导出功能已触发（模拟）')
    },
    handleSelectionChange() {}
  }
}
</script>

<style lang="less" scoped>
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
/deep/.el-dialog {
  padding: 0;
}
</style>
