<template>
  <div>
    <cold-product-overview
      :id="productOverviewId"
      :prod-day-data-son="prodDayData"
      :stop-page-statistic-data-son="stopPageStatisticData"
      :grade-one-rate-data-son="gradeOneRateData"
      :power-consumpt-statis-data-son="powerConsumptStatisData"
      :check-project-data-son="checkProjectData"
      :prod-one-grade-data-son="prodOneGradeData"
      :product-overview-all-son="productOverviewAll"
      @changeMateriaEmit="changeMateriaEmit"
      @changeDateType="changeDateTypePra"
      @stopPageTimes="getStopPageTimeList">
    </cold-product-overview>
    <cold-order :id="coldOrderId"></cold-order>
    <cold-preparat-process
      :id="aodProcessId">
    </cold-preparat-process>
    <cold-roll-process
      :id="refiningProcessId"
      :avg-roll-thick-data-son="avgRollThickData"
      :roll-preparat-data-son="rollProductStaData"
      :roll-product-count-data-son="rollProductCountData"
      :avg-elec-of-steel-data-son="avgElecOfSteelData"
      :roll-month-stat-ratio-son="rollMonthStatRatio"
      :roll-month-stat-total-son="rollMonthStatTotal"
      :roll-month-stat-weight-son="rollMonthStatWeight"
      @threeShow="threeShowFa"
      @threeShowRate="threeShowRateFa"
      @threeShowThick="threeShowThickFa"
      @threeShowEle="threeShowEleFa"
      @rollProcessTimesTwo="getRollProcessTimesTotal">
    </cold-roll-process>
    <cold-pickl-process
      :id="continuousCastiProcessId"
      :pick-process-data-son="pickProcessData"
      :avg-speed-and-thick-data-son="avgSpeedAndThickData"
      :avg-pick-energy-data-son="avgPickEnergyData"
      :avg-pick-energy-data-gas-ele-son="avgPickEnergyDataGasEle"
      :cold-stop-down-data-son="coldStopDownData"
      :pick-speed-data-list-son="pickSpeedDataList"
      :pick-month-stat-ratio-son="pickMonthStatRatio"
      :pick-month-stat-total-son="pickMonthStatTotal"
      :pick-month-stat-weight-son="pickMonthStatWeight"
      @threeShowOutput="threeShowOutputSon"
      @threeShowDailyAv="threeShowDailyAvSon"
      @threeShowStop="threeShowStopSon"
      @threeShowSpeed="threeShowSpeedSon"
      @threeShowGasEle="threeShowGasEleSon"
      @pickProcessTimes="getPickProcessTimesTotal">
    </cold-pickl-process>
    <cold-jing-process
      :jin-month-stat-ratio-son="jinMonthStatRatio"
      :jin-month-stat-total-son="jinMonthStatTotal"
      :jin-month-stat-weight-son="jinMonthStatWeight"
      :id="statisticalAnalysisId">
    </cold-jing-process>
    <cold-grinder-roll-process
      :one-ratio-son="oneRatio"
      :one-wgt-son="oneWgt"
      :total-one-son="totalOne"
      :three-ratio-son="threeRatio"
      :three-wgt-son="threeWgt"
      :total-three-son="totalThree"
      :id="statisticalAnalysisId6">
    </cold-grinder-roll-process>
    <cold-invent-statistic
      :id="statisticalAnalysisId7"
      :finish-product-all-son="finishProductAll"
      :finish-product-all-type-son="finishProductAllType"
      :specificat-all-son="specificatAll"
      :specificat-all-type-son="specificatAllType">
    </cold-invent-statistic>
    <right-position-naviga
      :right-position-naviga-name="rightPositionNavigaName">
    </right-position-naviga>
  </div>
</template>

<script>
import coldInventStatistic from '@/pages/productService/components/coldRollingProcess/coldInventStatistic.vue'
import coldGrinderRollProcess from '@/pages/productService/components/coldRollingProcess/coldGrinderRollProcess.vue'
import coldPicklProcess from '@/pages/productService/components/coldRollingProcess/coldPicklProcess.vue'
import coldPreparatProcess from '@/pages/productService/components/coldRollingProcess/coldPreparatProcess.vue'
import coldProductOverview from '@/pages/productService/components/coldRollingProcess/coldProductOverview.vue'
import { mapState } from 'vuex'
import { post } from '@/lib/Util'
import {
  getLzStopHoursByTime,
  getLzProdDefectByTime,
  getLzProcessPowerByTime,
  getLzCheckProjectByTime,
  getAvgMillThick,
  getLzProdDay,
  getProdOfPrepareByTime,
  getLzProdStopHoursOfDayTime,
  getLzProdOfRollByTime,
  getAvgElecOfSteel,
  getPickPordOfDay,
  getAvgSpeedAndThick,
  getAvgPickEnergy,
  getPickSpeed,
  getDicInfo,
  getProdOneGrade,
  getLzRollByMonth,
  getAvgPickEnergyOfTime
} from '@/lib/productDataApply/coldRollingProcess'
import ColdRollProcess from '@/pages/productService/components/coldRollingProcess/coldRollProcess.vue'
import ColdPreparatProcess from '@/pages/productService/components/coldRollingProcess/coldPreparatProcess.vue'
import ColdPicklProcess from '@/pages/productService/components/coldRollingProcess/coldPicklProcess.vue'
import ColdJingProcess from '@/pages/productService/components/coldRollingProcess/coldJingProcess.vue'
import rightPositionNaviga from '@/components/rightPositionNaviga/rightPositionNaviga.vue'
import coldOrder from '@/pages/productService/components/coldRollingProcess/coldOrder.vue'
export default {
  layout: 'menuLayout',
  name: 'productService-steelmakingProcess',
  components: {
    rightPositionNaviga,
    ColdJingProcess,
    ColdPicklProcess,
    ColdPreparatProcess,
    ColdRollProcess,
    coldProductOverview,
    coldPreparatProcess,
    coldPicklProcess,
    coldGrinderRollProcess,
    coldInventStatistic,
    coldOrder
  },
  data() {
    return {
      rollMonthStatWeight: null,
      rollMonthStatRatio: null,
      rollMonthStatTotal: null,
      pickMonthStatWeight: null,
      pickMonthStatRatio: null,
      pickMonthStatTotal: null,
      jinMonthStatWeight: null,
      jinMonthStatRatio: null,
      jinMonthStatTotal: null,
      oneWgt: null,
      oneRatio: null,
      totalOne: null,
      threeWgt: null,
      threeRatio: null,
      totalThree: null,
      productOverviewId: 'section1',
      coldOrderId: 'section2',
      aodProcessId: 'section3',
      refiningProcessId: 'section4',
      continuousCastiProcessId: 'section5',
      statisticalAnalysisId: 'section6',
      statisticalAnalysisId6: 'section7',
      statisticalAnalysisId7: 'section8',
      rightPositionNavigaName: [
        {
          id: 'section1',
          name: '产线总览'
        },
        {
          id: 'section2',
          name: '订单信息'
        },
        {
          id: 'section3',
          name: '准备工序'
        },
        {
          id: 'section4',
          name: '轧制工序'
        },
        {
          id: 'section5',
          name: '酸洗工序'
        },
        {
          id: 'section6',
          name: '精整工序'
        },
        {
          id: 'section7',
          name: '磨辊工序'
        },
        {
          id: 'section8',
          name: '库存统计'
        } /*,
        {
          id: 'section8',
          name: '分析评价'
        }*/
      ],
      steelGradePram: '1',
      //数据字典
      specificatAll: null, //原料库存占用（牌号
      specificatAllType: null, //原料库存占用（规格
      finishProductAllType: null, //成品库存占用（规格
      finishProductAll: null, //成品库存占用（牌号
      productOverviewAll: null, //各工序缺陷降级分析
      //停时统计
      stopPageStatisticData: null,
      //成品一级品率
      dateTypePraSFirstPro: 'day',
      prodOneGradeData: null,
      //成品缺陷统计
      gradeOneRateData: null,
      //各工序电耗统计
      powerConsumptStatisData: null,
      //性能检验
      checkProjectData: null,
      //轧机平均厚度
      avgRollThickData: null,
      dateTypePraKeyThick: 'day',
      //当日产量
      prodDayData: null,
      //冷轧工序-轧机作业率
      rollProductStaData: null,
      dateTypePraKeyRate: 'day',
      //冷轧工序-产量统计
      rollProductCountData: null,
      dateTypePraKeyPro: 'day',
      //冷轧工序-吨钢消耗
      avgElecOfSteelData: null,
      dateTypePraKeyEle: 'day',
      //酸洗工序-产量统计
      pickProcessData: null,
      dateTypePraKeyOutput: 'day',
      //酸洗工序-日平均厚度/速度
      avgSpeedAndThickData: null,
      dateTypePraKeyDailyAv: 'day',
      //酸洗工序-停时降速
      coldStopDownData: null,
      dateTypePraKeyStop: 'day',
      //酸洗工序-吨钢消耗
      avgPickEnergyData: null,
      //酸洗工序-吨钢气、电耗
      avgPickEnergyDataGasEle: null,
      dateTypePraKeyGasEle: 'day',
      //酸洗工序-工艺速度
      pickSpeedDataList: null,
      dateTypePraKeySpeed: 'day',
      timeList: null,
      rollProcessTimeList: null,
      rollPreparatTimeList: null,
      pickProcessTimesList: null
    }
  },
  computed: {
    ...mapState('menu', ['showHeader', 'pageOpenedList', 'menuCollapse'])
  },
  mounted() {
    this.getDicInfoData()
    this.getMonthStatRatio()
  },
  methods: {
    changeMateriaEmit(data) {
      this.steelGradePram = data
      this.getLzProdDefectByTimeData()
    },
    //-----------冷轧-轧制工序、酸洗工序、精整工序、磨辊工序各生产、产量月统计比例
    async getMonthStatRatio() {
      const res = await post(getLzRollByMonth)
      if (res.success) {
        //轧制
        this.rollMonthStatWeight = res.data.rollOutWegt
        this.rollMonthStatRatio = res.data.rollRatio
        this.rollMonthStatTotal = res.data.totalRoll
        //酸洗
        this.pickMonthStatWeight = res.data.pickOutWegt
        this.pickMonthStatRatio = res.data.pickRatio
        this.pickMonthStatTotal = res.data.totalPick
        //精整
        this.jinMonthStatWeight = res.data.jingOutWegt
        this.jinMonthStatRatio = res.data.jingRatio
        this.jinMonthStatTotal = res.data.totalFt
        //磨辊
        this.oneWgt = res.data.oneWgt
        this.oneRatio = res.data.oneRatio
        this.totalOne = res.data.totalOne
        this.threeWgt = res.data.threeWgt
        this.threeRatio = res.data.threeRatio
        this.totalThree = res.data.totalThree
      }
    },
    //-----------数据字典
    async getDicInfoData() {
      const res = await post(getDicInfo, {
        codeList: [
          'lz-rawInvType',
          'lz-FGInvOccType',
          'lz-steel',
          'lz-rawMaterialType',
          'lz-FinishGoodType'
        ]
      })
      if (res.success) {
        //冷轧-原料库存占用类型(牌号)
        this.specificatAll = res.data['lz-rawInvType']
        //冷轧-原料库存占用类型(规格)
        this.specificatAllType = res.data['lz-rawMaterialType']
        //冷轧-成品库存占用(牌号)
        this.finishProductAll = res.data['lz-FGInvOccType']
        //冷轧-成品库存占用(规格)
        this.finishProductAllType = res.data['lz-FinishGoodType']
        //各工序缺陷降级分析
        this.productOverviewAll = res.data['lz-steel']
      }
    },
    //-----------产线总览time
    getStopPageTimeList(data) {
      this.timeList = JSON.parse(JSON.stringify(data))
      if (this.timeList) {
        this.getStopPageStatistic()
        this.getLzProdDefectByTimeData()
        this.getPowerConsumptStatisData()
        this.getCheckProjectData()
        this.getLzProdDayData()
        this.getProdOneGradeData()
      }
    },
    //-----------轧制工序time
    getRollProcessTimesTotal(data) {
      this.rollProcessTimeList = JSON.parse(JSON.stringify(data))
      if (this.rollProcessTimeList) {
        this.getProdOfPrepareData()
        this.getAvgRollThickData()
        this.getLzProdOfRollByTimeData()
        this.getAvgElecOfSteelData()
      }
    },
    //-----------酸洗工序time
    getPickProcessTimesTotal(data) {
      this.pickProcessTimesList = JSON.parse(JSON.stringify(data))
      if (this.pickProcessTimesList) {
        this.getPickPordOfDayData()
        this.getAvgSpeedAndThickData()
        this.getStopDownData()
        this.getAvgPickEnergyData()
        this.getAvgPickEnergyOfTimeData()
        this.getPickSpeedData()
      }
    },
    //当日产量&待产统计
    async getLzProdDayData() {
      const res = await post(getLzProdDay, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate
      })
      if (res.success) {
        this.prodDayData = res.data
      }
    },
    //停时统计
    async getStopPageStatistic() {
      const res = await post(getLzStopHoursByTime, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate
      })
      if (res.success) {
        this.stopPageStatisticData = res.data
      }
    },
    //成品一级品率
    changeDateTypePra(data) {
      this.dateTypePraSFirstPro = data
      this.getProdOneGradeData()
    },
    async getProdOneGradeData() {
      const res = await post(getProdOneGrade, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate,
        dateType: this.dateTypePraSFirstPro
      })
      if (res.success) {
        this.prodOneGradeData = res.data
      }
    },
    //成品缺陷统计
    async getLzProdDefectByTimeData() {
      const res = await post(getLzProdDefectByTime, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate,
        steelGrade: this.steelGradePram
      })
      if (res.success) {
        this.gradeOneRateData = res.data
      }
    },
    //各工序电耗统计
    async getPowerConsumptStatisData() {
      const res = await post(getLzProcessPowerByTime, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate
      })
      if (res.success) {
        this.powerConsumptStatisData = res.data
      }
    },
    //性能检验
    async getCheckProjectData() {
      const res = await post(getLzCheckProjectByTime, {
        startDate: this.timeList.startDate,
        endDate: this.timeList.endDate
      })
      if (res.success) {
        this.checkProjectData = res.data
      }
    },
    //轧机平均厚度
    threeShowThickFa(data) {
      this.dateTypePraKeyThick = data
      this.getAvgRollThickData()
    },
    async getAvgRollThickData() {
      const res = await post(getAvgMillThick, {
        startDate: this.rollProcessTimeList.startDate,
        endDate: this.rollProcessTimeList.endDate,
        dateType: this.dateTypePraKeyThick
      })
      if (res.success) {
        const arrObject = []
        for (let i = 0; i < res.data.unitCode.length; i++) {
          arrObject.push({
            xDataTime: res.data.x[i],
            yDataValue: res.data.y[i],
            unitCode: res.data.unitCode[i],
            avgValue: res.data.avgValue[i]
          })
        }
        let oneRoll = []
        let twoRoll = []
        let threeRoll = []
        let xDataTime = []
        let avgValue = []
        arrObject.forEach(item => {
          if (item.unitCode === 'Crew-02') {
            oneRoll.push(item.yDataValue)
            xDataTime.push(item.xDataTime)
            avgValue.push(item.avgValue)
          }
          if (item.unitCode === 'Crew-03') {
            twoRoll.push(item.yDataValue)
          }
          if (item.unitCode === 'Crew-04') {
            threeRoll.push(item.yDataValue)
          }
        })
        const resultObject = {
          oneRoll: oneRoll,
          twoRoll: twoRoll,
          threeRoll: threeRoll,
          xDataTime: xDataTime,
          avgValue: avgValue
        }
        this.avgRollThickData = resultObject
      }
    },
    //轧制工序-轧机作业率
    threeShowRateFa(data) {
      this.dateTypePraKeyRate = data
      this.getProdOfPrepareData()
    },
    async getProdOfPrepareData() {
      const res = await post(getLzProdStopHoursOfDayTime, {
        startDate: this.rollProcessTimeList.startDate,
        endDate: this.rollProcessTimeList.endDate,
        machineCode: '11,12,13,or',
        dateType: this.dateTypePraKeyRate
      })
      if (res.success) {
        this.rollProductStaData = res.data
      }
    },
    //轧制工序-产量统计
    threeShowFa(data) {
      this.dateTypePraKeyPro = data
      this.getLzProdOfRollByTimeData()
    },
    async getLzProdOfRollByTimeData() {
      const res = await post(getLzProdOfRollByTime, {
        startDate: this.rollProcessTimeList.startDate,
        endDate: this.rollProcessTimeList.endDate,
        dateType: this.dateTypePraKeyPro
      })
      if (res.success) {
        this.rollProductCountData = res.data
      }
    },
    //轧制工序-吨钢消耗
    threeShowEleFa(data) {
      this.dateTypePraKeyEle = data
      this.getAvgElecOfSteelData()
    },
    async getAvgElecOfSteelData() {
      const res = await post(getAvgElecOfSteel, {
        startDate: this.rollProcessTimeList.startDate,
        endDate: this.rollProcessTimeList.endDate,
        dateType: this.dateTypePraKeyEle
      })
      if (res.success) {
        this.avgElecOfSteelData = res.data
      }
    },
    //酸洗工序-产量统计
    threeShowOutputSon(data) {
      this.dateTypePraKeyOutput = data
      this.getPickPordOfDayData()
    },
    async getPickPordOfDayData() {
      const res = await post(getPickPordOfDay, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        dateType: this.dateTypePraKeyOutput
      })
      if (res.success) {
        this.pickProcessData = res.data
      }
    },
    //酸洗工序-日平均厚度/速度
    threeShowDailyAvSon(data) {
      this.dateTypePraKeyDailyAv = data
      this.getAvgSpeedAndThickData()
    },
    async getAvgSpeedAndThickData() {
      const res = await post(getAvgSpeedAndThick, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        dateType: this.dateTypePraKeyDailyAv
      })
      if (res.success) {
        this.avgSpeedAndThickData = res.data
      }
    },
    //酸洗工序-停时降速
    threeShowStopSon(data) {
      this.dateTypePraKeyStop = data
      this.getStopDownData()
    },
    async getStopDownData() {
      const res = await post(getLzProdStopHoursOfDayTime, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        machineCode: '21,SXJS,or',
        dateType: this.dateTypePraKeyStop
      })
      if (res.success) {
        this.coldStopDownData = res.data
      }
    },
    //酸洗工序-吨钢消耗
    async getAvgPickEnergyData() {
      const res = await post(getAvgPickEnergy, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        dateType: this.dateTypePraKeyGasEle
      })
      if (res.success) {
        this.avgPickEnergyData = res.data
      }
    },
    //酸洗工序-吨钢气、电耗
    threeShowGasEleSon(data) {
      this.dateTypePraKeyGasEle = data
      this.getAvgPickEnergyOfTimeData()
    },
    async getAvgPickEnergyOfTimeData() {
      const res = await post(getAvgPickEnergyOfTime, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        dateType: this.dateTypePraKeyGasEle
      })
      if (res.success) {
        this.avgPickEnergyDataGasEle = res.data
      }
    },
    //酸洗工序-工艺速度
    threeShowSpeedSon(data) {
      this.dateTypePraKeySpeed = data
      this.getPickSpeedData()
    },
    async getPickSpeedData() {
      const res = await post(getPickSpeed, {
        startDate: this.pickProcessTimesList.startDate,
        endDate: this.pickProcessTimesList.endDate,
        dateType: this.dateTypePraKeySpeed
      })
      if (res.success) {
        this.pickSpeedDataList = res.data
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
