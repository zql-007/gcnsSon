<template>
  <div>
    <product-overview
      :lg-avg-energy-data-son="lgAvgEnergyData"
      :id="productOverviewId"
      :echarts-show="echartsShow"
      :weight-data-list="weightDataList"
      :prod-by-hour-time-list="prodByHourTimeList"
      :inventory-statistics="inventoryStatistics"
      :rhythm-production="rhythmProduction"
      :menu-collapse="menuCollapse">
    </product-overview>
    <aod-process
      :target-by-time-data-son="targetByTimeData"
      :aod-xb-stoves-by-time-data-son="aodXbStovesByTimeData"
      :aod-xb-time-by-time-data-son="aodXbTimeByTimeData"
      :aod-time-by-time-data-son="aodTimeByTimeData"
      :lg-aod-box-by-time-data-son="lgAodBoxByTimeData"
      :aod-hot-by-time-data-son="aodHotByTimeData"
      :aod-prod-by-time-data-son="aodProdByTimeData"
      :id="aodProcessId"
      @emitOptionValue="emitOptionValueFath"
      @clickTimeQuery="clickTimeQuery">
    </aod-process>
    <refining-process
      :id="refiningProcessId">
    </refining-process>
    <continuous-casti-process
      :lg-cc-judge-by-type-and-time-data-son="lgCcJudgeByTypeAndTimeData"
      :lg-cc-judge-by-time-data-son="lgCcJudgeByTimeData"
      :lgcc-one-by-time-data-son="lgccOneByTimeData"
      :lgcc-chem-by-time-data-son="lgccChemByTimeData"
      :lg-cc-open-by-time-data-son="lgCcOpenByTimeData"
      :lg-cc-smelt-by-time-data-son="lgCcSmeltByTimeData"
      :id="continuousCastiProcessId"
      @steelChangeParent="steelChangeParentPram"
      @useChangeParent="useChangeParentPram"
      @clickContinuous="clickContinuousTime">
    </continuous-casti-process>
    <statistical-analysis
      :id="statisticalAnalysisId">
    </statistical-analysis>
    <right-position-naviga
      :right-position-naviga-name="rightPositionNavigaName">
    </right-position-naviga>
  </div>
</template>

<script>
import rightPositionNaviga from '@/components/rightPositionNaviga/rightPositionNaviga.vue'
import productOverview from '@/pages/productService/components/steelmakingProcess/productOverview.vue'
import aodProcess from '@/pages/productService/components/steelmakingProcess/AOD_Process.vue'
import {
  getAodTimeByTime,
  getAodXbStovesByTime,
  getAodXbTimeByTime,
  getLgAodBoxByTime,
  getLgAodHotByTime,
  getLgAodProdByTime,
  getLgAvgEnergy,
  getLgccChemByTime,
  getLgCcJudgeByTime,
  getLgCcJudgeByTypeAndTime,
  getLgccOneByTime,
  getLgCcOpenByTime,
  getLgccOutPut,
  getLgCcSmeltByTime,
  getLgProdByHourTime,
  getLgProdRhythm,
  getLgrkInto,
  getTargetByTime
} from '@/lib/productDataApply/steelmakingProcess'
import { post, get } from '@/lib/Util'
import RefiningProcess from '@/pages/productService/components/steelmakingProcess/refiningProcess.vue'
import ContinuousCastiProcess from '@/pages/productService/components/steelmakingProcess/continuousCastiProcess.vue'
import StatisticalAnalysis from '@/pages/productService/components/steelmakingProcess/statisticalAnalysis.vue'
import { mapState } from 'vuex'

export default {
  layout: 'menuLayout',
  name: 'productService-steelmakingProcess',
  components: {
    StatisticalAnalysis,
    ContinuousCastiProcess,
    RefiningProcess,
    productOverview,
    aodProcess,
    rightPositionNaviga
  },
  data() {
    return {
      //板坯、方坯
      weightDataList: null,
      //库存统计
      inventoryStatistics: null,
      //生产节奏
      rhythmProduction: null,
      //机时产量
      prodByHourTimeList: null,
      //吨钢消耗
      lgAvgEnergyData: null,
      //AOD钢水产量
      aodProdByTimeData: null,
      aodProdByTimeList: null,
      //AOD母液铁水单耗
      aodHotByTimeData: null,
      //AOD冶炼时长
      lgAodBoxByTimeData: null,
      //AOD时间分布
      aodTimeByTimeData: null,
      //AOD洗包统计(时长)
      aodXbTimeByTimeData: null,
      //AOD洗包统计(次数)
      aodXbStovesByTimeData: null,
      //AOD机时产量
      targetByTimeData: null,
      //连铸时间分布(作业率)
      lgCcSmeltByTimeData: null,
      lgCcSmeltByTimeList: null,
      //连铸钢包自开率
      lgCcOpenByTimeData: null,
      //300系化学成分内控合格率
      lgccChemByTimeData: null,
      //钢坯一级品率
      lgccOneByTimeData: null,
      //钢坯改判信息统计
      lgCcJudgeByTimeData: null,
      //桑基图
      lgCcJudgeByTypeAndTimeData: null,
      steelType: 'steel',
      productOverviewId: 'section1',
      aodProcessId: 'section2',
      refiningProcessId: 'section3',
      continuousCastiProcessId: 'section4',
      statisticalAnalysisId: 'section5',
      rightPositionNavigaName: [
        {
          id: 'section1',
          name: '产线总览'
        },
        {
          id: 'section2',
          name: 'AOD工序'
        },
        {
          id: 'section3',
          name: '精炼工序'
        },
        {
          id: 'section4',
          name: '连铸工序'
        },
        {
          id: 'section5',
          name: '统计分析'
        }
      ],
      echartsShow: false,
      steelGradeParam: '304'
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse'])
  },
  mounted() {
    this.getWeightData()
    this.getLgrkIntoData()
    this.getLgProdRhythmData()
    this.getLgProdByHourTimeFun()
    this.getLgAvgEnergyData()
  },
  activated() {
    this.echartsShow = true
    /*this.timerId = setInterval(async () => {
      try {
        await this.getWeightData()
        await this.getLgrkIntoData()
        await this.getLgProdRhythmData()
        await this.getLgProdByHourTimeFun()
      } catch (error) {
        console.error('异步方法调用出错:', error)
      }
    }, 5000)*/
  },
  deactivated() {
    this.echartsShow = false
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  },
  methods: {
    /*--------------------------------产线总览---------------------------*/
    //板坯、方坯
    async getWeightData() {
      const weightData = await post(getLgccOutPut, {})
      if (weightData.success) {
        this.weightDataList = weightData.data
      }
    },
    //库存统计
    async getLgrkIntoData() {
      try {
        const dataRes = await post(getLgrkInto, {})
        if (dataRes.success) {
          this.inventoryStatistics = dataRes.data
        } else {
          console.log('接口返回错误信息:', dataRes.message)
        }
      } catch (error) {
        console.error('调用接口出错:', error)
      }
      /*getLgrkIntoData 方法被定义为 async 函数，在这个函数内部使用 await 关键字调用 post 函数。await 会暂停函数的执行，
      直到 post 函数返回的 Promise 被 resolve 或 reject。如果 Promise 被 resolve，
      则将结果赋值给 dataRes 变量；如果 Promise 被 reject，则会抛出异常，被 catch 块捕获并处理*/
    },
    //生产节奏
    async getLgProdRhythmData() {
      const dataRes = await post(getLgProdRhythm, {})
      if (dataRes.success) {
        dataRes.data.forEach(item => {
          if (item.aodTime === null) {
            item.aodTime = 0
          }
          if (item.aodTranshipment === null) {
            item.aodTranshipment = 0
          }
          if (item.ccTime === null) {
            item.ccTime = 0
          }
          if (item.ifTime === null) {
            item.ifTime = 0
          }
          if (item.ifTranshipment === null) {
            item.ifTranshipment = 0
          }
        })
        this.rhythmProduction = dataRes.data
      }
    },
    //时机产量
    async getLgProdByHourTimeFun() {
      const res = await post(getLgProdByHourTime)
      if (res.success) {
        this.prodByHourTimeList = res.data
      }
    },
    //吨钢消耗
    async getLgAvgEnergyData() {
      const res = await post(getLgAvgEnergy)
      if (res.success) {
        this.lgAvgEnergyData = res.data
      }
    },
    /*--------------------------------AOD工序---------------------------*/
    clickTimeQuery(data) {
      this.aodProdByTimeList = JSON.parse(JSON.stringify(data))
      if (this.aodProdByTimeList) {
        this.getLgAodProdByTimeData()
        this.getLgAodHotByTimeData()
        this.getLgAodBoxByTimeData()
        this.getAodTimeByTimeData()
        this.getAodXbTimeByTimeData()
        this.getAodXbStovesByTimeData()
        this.getTargetByTimeData()
      }
    },
    emitOptionValueFath(data) {
      this.steelGradeParam = data
      this.getLgAodBoxByTimeData()
    },
    //AOD钢水产量
    async getLgAodProdByTimeData() {
      const res = await post(getLgAodProdByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.aodProdByTimeData = res.data
      }
    },
    //AOD母液铁水单耗
    async getLgAodHotByTimeData() {
      const res = await post(getLgAodHotByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.aodHotByTimeData = res.data
      }
    },
    //AOD冶炼时长
    async getLgAodBoxByTimeData() {
      const res = await post(getLgAodBoxByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate,
        steelGrade: this.steelGradeParam
      })
      if (res.success) {
        this.lgAodBoxByTimeData = res.data
      }
    },
    //AOD时间分布
    async getAodTimeByTimeData() {
      const res = await post(getAodTimeByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.aodTimeByTimeData = res.data
      }
    },
    //AOD洗包统计（时长）
    async getAodXbTimeByTimeData() {
      const res = await post(getAodXbTimeByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.aodXbTimeByTimeData = res.data
      }
    },
    //AOD洗包统计（次数）
    async getAodXbStovesByTimeData() {
      const res = await post(getAodXbStovesByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.aodXbStovesByTimeData = res.data
      }
    },
    //AOD机时产量
    async getTargetByTimeData() {
      const res = await post(getTargetByTime, {
        startDate: this.aodProdByTimeList.startDate,
        endDate: this.aodProdByTimeList.endDate
      })
      if (res.success) {
        this.targetByTimeData = res.data
      }
    },
    /*--------------------------------连铸工序---------------------------*/
    clickContinuousTime(data) {
      this.lgCcSmeltByTimeList = JSON.parse(JSON.stringify(data))
      if (this.lgCcSmeltByTimeList) {
        this.getLgCcSmeltByTimeData()
        this.getLgCcOpenByTimeData()
        this.getLgccChemByTimeData()
        this.getLgccOneByTimeData()
        this.getLgCcJudgeByTimeData()
        this.getLgCcJudgeByTypeAndTimeData()
      }
    },
    //连铸时间分布(作业率)
    async getLgCcSmeltByTimeData() {
      const res = await post(getLgCcSmeltByTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate
      })
      if (res.success) {
        this.lgCcSmeltByTimeData = res.data
      }
    },
    //连铸钢包自开率
    async getLgCcOpenByTimeData() {
      const res = await post(getLgCcOpenByTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate
      })
      if (res.success) {
        this.lgCcOpenByTimeData = res.data
      }
    },
    //300系化学成分内控合格率
    async getLgccChemByTimeData() {
      const res = await post(getLgccChemByTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate
      })
      if (res.success) {
        this.lgccChemByTimeData = res.data
      }
    },
    //钢坯一级品率
    async getLgccOneByTimeData() {
      const res = await post(getLgccOneByTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate
      })
      if (res.success) {
        this.lgccOneByTimeData = res.data
      }
    },
    //钢坯改判信息统计
    async getLgCcJudgeByTimeData() {
      const res = await post(getLgCcJudgeByTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate
      })
      if (res.success) {
        this.lgCcJudgeByTimeData = res.data
      }
    },
    steelChangeParentPram(data) {
      this.steelType = data
      this.getLgCcJudgeByTypeAndTimeData()
    },
    useChangeParentPram(data) {
      this.steelType = data
      this.getLgCcJudgeByTypeAndTimeData()
    },
    //钢坯改判信息流向图
    async getLgCcJudgeByTypeAndTimeData() {
      const res = await post(getLgCcJudgeByTypeAndTime, {
        startDate: this.lgCcSmeltByTimeList.startDate,
        endDate: this.lgCcSmeltByTimeList.endDate,
        type: this.steelType
      })
      if (res.success) {
        this.lgCcJudgeByTypeAndTimeData = res.data
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
