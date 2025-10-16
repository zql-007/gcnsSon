<template>
  <div
    class="contentBox">
    <el-row
      :gutter="20">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <div style="display: flex;justify-content: space-between">
            <div><span class="spanHead">库存占用</span></div>
            <div>
              <span class="datePickerLable">开始时间</span>
              <el-date-picker
                v-model="times.startDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px;margin-right: 16px"
                placeholder="选择日期">
              </el-date-picker>
              <span class="datePickerLable">结束时间</span>
              <el-date-picker
                v-model="times.endDate"
                type="month"
                value-format="yyyy-MM"
                style="width: 140px"
                placeholder="选择日期">
              </el-date-picker>
              <el-tag
                :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                type="success"
                @click="clickTabCurrent"><span
                  class="spanStyle">查询</span></el-tag>
            </div>
          </div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <el-row :gutter="45">
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;align-items: center">
                        <div><span class="spanHeadTwo">原料板坯库存占用</span></div>
                      </div>
                    </div>
                    <div>
                      <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                        <ul>
                          <li
                            v-for="(item, index) in legendStyleList"
                            :key="index + '007'">
                            <div
                              :style="{ backgroundColor: item.color }"
                              class="liDivStyle">
                            </div>
                            <span class="liDivSpan">{{ item.name }}</span>
                          </li>
                        </ul>
                      </div>
                      <div style="height: 320px;">
                        <nercar-echarts
                          :legend="materialOccupOption.legend"
                          :grid="materialOccupOption.grid"
                          :series="materialOccupOption.series"
                          :_height="'320px'"
                        />
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;align-items: center">
                        <div><span class="spanHeadTwo">黑皮成品库存占用</span></div>
                      </div>
                    </div>
                    <div>
                      <div style="display: flex;justify-content: center;align-items: center;padding-top: 10px">
                        <ul>
                          <li
                            v-for="(item, index) in finishLegendStyleList"
                            :key="index + '007'">
                            <div
                              :style="{ backgroundColor: item.color }"
                              class="liDivStyle">
                            </div>
                            <span class="liDivSpan">{{ item.name }}</span>
                          </li>
                        </ul>
                      </div>
                      <div style="height: 320px;">
                        <nercar-echarts
                          :legend="finishOccupOption.legend"
                          :grid="finishOccupOption.grid"
                          :series="finishOccupOption.series"
                          :_height="'320px'"
                        />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  date2ym,
  getLastMonthDate,
  getLastOneYearMonth,
  getNowDay
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'
import {
  getStoreOfInit,
  getStoreOfProd
} from '@/lib/productDataApply/backWashingProcess'
import { mapState } from 'vuex'
import {
  getFinishedProductStock,
  getRawMaterialStock
} from '@/lib/productDataApply/hotRollingProcess'

export default {
  name: 'inventoryOccupancy',
  components: { NercarEcharts },
  props: {},
  data() {
    return {
      legendStyleList: [
        {
          name: 'Day≤7',
          color: '#ffda35'
        },
        {
          name: '7＜Day≤30',
          color: '#55c6d4'
        },
        {
          name: '30＜Day≤180',
          color: '#ff9800'
        },
        {
          name: '180＜Day',
          color: '#5db362'
        }
      ],
      finishLegendStyleList: [
        {
          name: 'Day≤7',
          color: '#55c6d4'
        },
        {
          name: '7＜Day≤30',
          color: '#ff9800'
        },
        {
          name: '30＜Day≤180',
          color: '#5db362'
        },
        {
          name: '180＜Day',
          color: '#ffda35'
        }
      ],
      selectData: {
        materialValue: '1',
        finishlValue: '2'
      },
      options: [],
      finishOption: [],
      times: {
        startDate: getLastOneYearMonth(date2ym(new Date())),
        endDate: date2ym(new Date())
      },
      tapButActCurrent: false,
      materialOccupOption: {
        legend: {
          data: ['绿色区域', '天蓝色区域', '橙色区域', '黄色区域'],
          orient: 'horizontal',
          left: 'center',
          top: '1%',
          selectedMode: true,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 12
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            // top: '4%',
            containLabel: true
          }
        ],
        series: [
          {
            type: 'treemap',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            leafDepth: null,
            roam: false,
            breadcrumb: { show: false }, //去掉矩形树图下方root黑色标签
            nodeClick: false, //节点点击无反应
            data: null,
            // 其他配置...
            visualMap: {
              show: false
            },
            // upperLabel: false,
            upperLabel: {
              show: false
            },
            label: {
              show: true
            },
            itemStyle: {
              borderColor: '#fff',
              // borderWidth: 1 // 设置边框宽度，增加节点之间的间隔
              gapWidth: 2 // 设置节点内部子节点之间的间隔
            },
            levels: [
              {
                depth: 1,
                itemStyle: {
                  borderWidth: 2
                },
                upperLabel: {
                  show: false
                },
                label: {
                  show: false // 隐藏该层级的标签
                }
              },
              {
                depth: 2,
                itemStyle: {
                  borderWidth: 1
                },
                upperLabel: {
                  show: false
                }
              }
            ]
            // silent: true // 禁止矩形树图的所有交互
          }
        ]
      },
      finishOccupOption: {
        legend: {
          data: ['绿色区域', '天蓝色区域', '橙色区域', '黄色区域'],
          orient: 'horizontal',
          left: 'center',
          top: '1%',
          selectedMode: true,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 12
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            // top: '4%',
            containLabel: true
          }
        ],
        series: [
          {
            type: 'treemap',
            left: 0, //left、right、top、bottom几个值为0用于矩形树图占据整个容器
            right: 0,
            top: 0,
            bottom: 0,
            leafDepth: null,
            roam: false,
            breadcrumb: { show: false }, //去掉矩形树图下方root黑色标签
            nodeClick: false, //节点点击无反应
            data: null,
            // 其他配置...
            visualMap: {
              show: false
            },
            // upperLabel: false,
            upperLabel: {
              show: false
            },
            label: {
              show: true
            },
            itemStyle: {
              borderColor: '#fff',
              // borderWidth: 1 // 设置边框宽度，增加节点之间的间隔
              gapWidth: 2 // 设置节点内部子节点之间的间隔
            },
            levels: [
              {
                depth: 1,
                itemStyle: {
                  borderWidth: 2
                },
                upperLabel: {
                  show: false
                },
                label: {
                  show: false // 隐藏该层级的标签
                }
              },
              {
                depth: 2,
                itemStyle: {
                  borderWidth: 1
                },
                upperLabel: {
                  show: false
                }
              }
            ]
            // silent: true // 禁止矩形树图的所有交互
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  watch: {},
  mounted() {
    this.getStoreOfInitData()
    this.getFinishProductAll()
    this.options = this.dataDictionary['tx-rawInvType']
    this.finishOption = this.dataDictionary['tx-FGInvOccType']
  },
  methods: {
    clickTabCurrent() {
      this.getStoreOfInitData()
      this.getFinishProductAll()

      this.tapButActCurrent = true
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    //原料板坯库存占用
    async getStoreOfInitData() {
      const res = await post(getRawMaterialStock, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success && res.data.length > 0) {
        //从接口获取每个库存维度的数据
        let dayLess3 = []
        let day3Medi7 = []
        let day7Medi15 = []
        let dayBig15 = []
        res.data.forEach(item => {
          switch (item['storeHours']) {
            case 'Day≤7':
              dayLess3.push({
                name: item.steelGrade,
                value: item.totalCount
              })
              break
            case '7＜Day≤30':
              day3Medi7.push({
                name: item.steelGrade,
                value: item.totalCount
              })
              break
            case '30＜Day≤180':
              day7Medi15.push({
                name: item.steelGrade,
                value: item.totalCount
              })
              break
            case '180＜Day':
              dayBig15.push({
                name: item.steelGrade,
                value: item.totalCount
              })
              break
          }
        })
        // 矩形树图的数据
        let data = {
          name: 'root',
          children: [
            {
              name: '黄色区域',
              itemStyle: {
                color: '#ffda35'
              },
              children: [
                {
                  name: 'Day≤7',
                  children: dayLess3
                }
              ]
            },
            {
              name: '天蓝色区域',
              itemStyle: {
                color: '#55c6d4'
              },
              children: [
                {
                  name: '7＜Day≤30',
                  children: day3Medi7
                }
              ]
            },
            {
              name: '橙色区域',
              itemStyle: {
                color: '#ff9800'
              },
              children: [
                {
                  name: '30＜Day≤180',
                  children: day7Medi15
                }
              ]
            },
            {
              name: '绿色区域',
              itemStyle: {
                color: '#5db362'
              },
              // children: dayBig15,
              children: [
                {
                  name: '180＜Day',
                  children: dayBig15
                }
              ]
            }
          ]
        }
        this.materialOccupOption.series[0].data = [data]
      } else {
        this.materialOccupOption.series[0].data = []
      }
    },
    //黑皮成品库存占用
    async getFinishProductAll() {
      const res = await post(getFinishedProductStock, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success && res.data.length > 0) {
        //从接口获取每个库存维度的数据
        let dayLess3 = []
        let day3Medi7 = []
        let day7Medi15 = []
        let dayBig15 = []
        res.data.forEach(item => {
          switch (item['storeHours']) {
            case 'Day≤7':
              dayLess3.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '7＜Day≤30':
              day3Medi7.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '30＜Day≤180':
              day7Medi15.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
            case '180＜Day':
              if (!item.thick) item.thick = item.steelGrade
              dayBig15.push({
                name: item.thickness,
                value: item.totalCount
              })
              break
          }
        })
        // 矩形树图的数据
        let data = {
          name: 'root',
          children: [
            {
              name: '天蓝色区域',
              itemStyle: {
                color: '#55c6d4'
              },
              children: [
                {
                  name: 'Day≤7',
                  children: dayLess3
                }
              ]
            },
            {
              name: '橙色区域',
              itemStyle: {
                color: '#ff9800'
              },
              children: [
                {
                  name: '7＜Day≤30',
                  children: day3Medi7
                }
              ]
            },
            {
              name: '绿色区域',
              itemStyle: {
                color: '#5db362'
              },
              children: [
                {
                  name: '30＜Day≤180',
                  children: day7Medi15
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#ffda35'
              },
              // children: dayBig15
              children: [
                {
                  name: '180＜Day',
                  children: dayBig15
                }
              ]
            }
          ]
        }
        this.finishOccupOption.series[0].data = [data]
      } else {
        this.finishOccupOption.series[0].data = []
      }
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  margin-top: 16px;
}
.CardTable {
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  .spanHead {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 28px;
  }
  .spanHeadTwo {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 28px;
  }
}
.datePickerLable {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
.tagStyle {
  background-color: #ebf6ec;
  cursor: pointer;
  margin-left: 24px;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActive {
  background-color: #35a034;
  margin-left: 24px;
  .spanStyle {
    color: #ffffff;
  }
}
//时间组件样式
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  //border: 1px solid #d5ddd5;
  box-sizing: border-box;
  color: #2e382e;
  display: inline-block;
  font-size: inherit;
  height: 31px;
  width: 150px;
  line-height: 28px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 30px;
}
/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #d5ddd5;
}
//进度条
.progress-bar-container {
  width: 90px; /* 可按需调整进度条容器宽度 */
  height: 18px; /* 可按需调整进度条容器高度 */
  background-color: #e0ebe1; /* 浅灰色背景 */
  border-radius: 5px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
  margin-left: 1px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #c8e6c9, #4caf50); /* 绿色进度条颜色 */
  display: flex;
  align-items: center;
  justify-content: right;
  color: black;
  border-radius: 5px;
  font-size: 20px; /* 可按需调整文字大小 */
  transition: width 0.5s ease; /* 过渡效果，让进度条变化更平滑 */
}

.progress-value {
  text-align: center;
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
//--进度条后文字
.spanHeadMin {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  margin-left: 8px;
  text-align: center;
}
//切换按钮
.tagStyleSwitch {
  background-color: #ebf6ec;
  cursor: pointer;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
ul {
  list-style-type: none;
  display: flex;
  padding: 0;
}

li {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.liDivStyle {
  display: inline-block;
  content: '';
  width: 12px;
  height: 12px;
  margin-right: 8px;
}
.liDivSpan {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
}
</style>
