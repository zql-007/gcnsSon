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
            <div><span class="spanHead">库存统计</span></div>
          </div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex;align-items: center">
                    <div><span class="spanHeadTwo">原料库存占用</span></div>
                  </div>
                  <div>
                    <span class="selectSpan">规格</span>
                    <el-select
                      v-model="selectData.materialValueType"
                      placeholder="请选择"
                      @change="changeMteriaType">
                      <el-option
                        v-for="item in optionsType"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                    <span class="selectSpan">牌号</span>
                    <el-select
                      v-model="selectData.materialValueMark"
                      placeholder="请选择"
                      @change="changeMteria">
                      <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
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
                      :tooltip="materialOccupOption.tooltip"
                      :grid="materialOccupOption.grid"
                      :series="materialOccupOption.series"
                      :_height="'320px'"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex;align-items: center">
                    <div><span class="spanHeadTwo">成品库存占用</span></div>
                  </div>
                  <div>
                    <span class="selectSpan">规格</span>
                    <el-select
                      v-model="selectData.finishlValueType"
                      placeholder="请选择"
                      @change="changeFinishType">
                      <el-option
                        v-for="item in finishOptionType"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                    <span class="selectSpan">牌号</span>
                    <el-select
                      v-model="selectData.finishlValueMark"
                      placeholder="请选择"
                      @change="changeFinishMark">
                      <el-option
                        v-for="item in finishOptionMark"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
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
                      :tooltip="finishOccupOption.tooltip"
                      :grid="finishOccupOption.grid"
                      :series="finishOccupOption.series"
                      :_height="'320px'"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getLzProdDay,
  getLzProdDefectByTime,
  getLzProdOfJingByTime,
  getLzProdStopHoursOfDayTime,
  getLzRoll,
  getProdStore,
  getResourceStore,
  getStoreOfInit,
  getStoreOfProd
} from '@/lib/productDataApply/coldRollingProcess'
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  getLastMonthDate,
  getNowDay,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import { post } from '@/lib/Util'

export default {
  name: 'coldInventStatistic',
  components: { NercarEcharts },
  props: {
    specificatAllSon: {
      type: Array,
      default() {
        return []
      }
    },
    specificatAllTypeSon: {
      type: Array,
      default() {
        return []
      }
    },
    finishProductAllTypeSon: {
      type: Array,
      default() {
        return []
      }
    },
    finishProductAllSon: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 新增：用于存储接口返回的完整原料库存数据（供 tooltip 匹配牌号）
      materialFullData: [],
      finishFullData: [],
      legendStyleList: [
        {
          name: 'Day≤3',
          color: '#5db362'
        },
        {
          name: '3＜Day≤7',
          color: '#ff9800'
        },
        {
          name: '7＜Day≤15',
          color: '#55c6d4'
        },
        {
          name: '15＜Day',
          color: '#9B5DB3'
        }
      ],
      finishLegendStyleList: [
        {
          name: 'Day≤30',
          color: '#5db362'
        },
        {
          name: '30＜Day≤90',
          color: '#ff9800'
        },
        {
          name: '90＜Day≤180',
          color: '#55c6d4'
        },
        {
          name: '180＜Day',
          color: '#9B5DB3'
        }
      ],
      selectData: {
        materialValueType: '2',
        materialValueMark: '1',
        finishlValueType: '2', //规格
        finishlValueMark: '1' //牌号
      },
      options: [],
      optionsType: [],
      finishOptionType: [],
      finishOptionMark: [],
      times: {
        startDate: getPreviousMonthDate(),
        endDate: getPreviousDate()
      },
      tapButActCurrent: false,
      materialOccupOption: {
        // 1. 新增 tooltip 配置（关键）
        tooltip: {
          trigger: 'item', // 触发方式：点击/hover 节点触发
          formatter: params => {
            // params 是当前 hover 节点的完整数据，包含父级、值、名称等
            const { data, treePathInfo } = params

            // 关键：判断是否为叶子节点（无children的节点），非叶子节点(白色间隙)不显示tooltip
            if (data.children) {
              return ''
            }

            // 2. 从 treePathInfo 中获取「时长」（父级节点的名称，如“90＜Day≤180”）
            // treePathInfo 是节点的层级路径，[1]是root，[2]是颜色区域，[3]是时长，[4]是当前规格节点
            const timeRange = treePathInfo[3]?.name || '' // 时长：如“90＜Day≤180”

            // 3. 获取当前节点的「规格」和「数量」
            const spec = data.name || '' // 规格：如“4＜h≤5”
            const count = data.value || 0 // 数量：如50

            // 4. 从接口返回的完整数据中匹配「牌号」（steelGrade）
            // （需确保 getStoreOfInitData 中已保存完整接口数据到实例变量）
            const fullData = this.materialFullData || [] // 存储接口返回的完整原料库存数据
            // 根据“时长”和“规格”匹配对应的牌号
            const matchItem = fullData.find(
              item => item.storeHours === timeRange && item.thick === spec
            )
            const steelGrade = matchItem?.steelGrade || '未知牌号' // 牌号：如304

            // 5. 拼接自定义 Tooltip 文本（格式：时长+牌号+规格+数量）
            return `
            <div style="padding: 6px 10px; font-size: 12px;">
              <div>时长 <strong>${timeRange}</strong></div>
    <div>牌号 <strong>${steelGrade}</strong></div>
    <div>规格 <strong>${spec}</strong></div>
    <div>数量 <strong>${count}</strong></div>
            </div>
          `
          }
        },
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
              show: false,
              color: '#000000' // 设置文字颜色为黑色
            },
            itemStyle: {
              borderColor: '#fff',
              // borderWidth: 1 // 设置边框宽度，增加节点之间的间隔
              gapWidth: 2 // 设置节点内部子节点之间的间隔
            },
            levels: [
              {
                depth: 1,
                upperLabel: {
                  show: false
                },
                label: {
                  show: false // 隐藏该层级的标签
                }
              },
              {
                depth: 2,
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
        // 1. 新增 tooltip 配置（关键）
        tooltip: {
          trigger: 'item', // 触发方式：点击/hover 节点触发
          formatter: params => {
            // params 是当前 hover 节点的完整数据，包含父级、值、名称等
            const { data, treePathInfo } = params

            // 关键：判断是否为叶子节点（无children的节点），非叶子节点(白色间隙)不显示tooltip
            if (data.children) {
              return ''
            }

            // 2. 从 treePathInfo 中获取「时长」（父级节点的名称，如“90＜Day≤180”）
            // treePathInfo 是节点的层级路径，[1]是root，[2]是颜色区域，[3]是时长，[4]是当前规格节点
            const timeRange = treePathInfo[3]?.name || '' // 时长：如“90＜Day≤180”

            // 3. 获取当前节点的「规格」和「数量」
            const spec = data.name || '' // 规格：如“4＜h≤5”
            const count = data.value || 0 // 数量：如50

            // 4. 从接口返回的完整数据中匹配「牌号」（steelGrade）
            // （需确保 getStoreOfInitData 中已保存完整接口数据到实例变量）
            const fullData = this.finishFullData || [] // 存储接口返回的完整原料库存数据
            // 根据“时长”和“规格”匹配对应的牌号
            const matchItem = fullData.find(
              item => item.storeHours === timeRange && item.thick === spec
            )
            const steelGrade = matchItem?.steelGrade || '未知牌号' // 牌号：如304

            // 5. 拼接自定义 Tooltip 文本（格式：时长+牌号+规格+数量）
            return `
            <div style="padding: 6px 10px; font-size: 12px;">
              <div>时长 <strong>${timeRange}</strong></div>
    <div>牌号 <strong>${steelGrade}</strong></div>
    <div>规格 <strong>${spec}</strong></div>
    <div>数量 <strong>${count}</strong></div>
            </div>
          `
          }
        },
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
              show: false,
              color: '#000000' // 设置文字颜色为黑色
            },
            itemStyle: {
              borderColor: '#fff',
              // borderWidth: 1 // 设置边框宽度，增加节点之间的间隔
              gapWidth: 2 // 设置节点内部子节点之间的间隔
            },
            levels: [
              {
                depth: 1,
                upperLabel: {
                  show: false
                },
                label: {
                  show: false // 隐藏该层级的标签
                }
              },
              {
                depth: 2,
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
  watch: {
    specificatAllSon: {
      handler: 'getSpecificatAll',
      deep: true
    },
    specificatAllTypeSon: {
      handler: 'getSpecificatAll',
      deep: true
    },
    finishProductAllTypeSon: {
      handler: 'getFinishProductAllSon',
      deep: true
    },
    finishProductAllSon: {
      handler: 'getFinishProductAllSon',
      deep: true
    }
  },
  mounted() {
    this.getLzProdOfJingByTimeData()
    this.getStoreOfInitData()
    this.getFinishProductAll()
  },
  methods: {
    getSpecificatAll() {
      this.options = [...this.specificatAllSon]
      this.optionsType = [...this.specificatAllTypeSon]
    },
    getFinishProductAllSon() {
      this.finishOptionMark = [...this.finishProductAllSon]
      this.finishOptionType = [...this.finishProductAllTypeSon]
    },
    //原料库存占用(测试
    async getLzProdOfJingByTimeData() {
      // 矩形树图的数据
      let data = {
        name: 'root',
        children: [
          {
            name: '绿色区域',
            itemStyle: {
              color: '#5db362'
            },
            children: [
              {
                name: 'Day≤30',
                children: [
                  {
                    name: 'h≤4',
                    value: 1
                  },
                  {
                    name: '7<h',
                    value: 1
                  },
                  {
                    name: '6<h',
                    value: 1
                  }
                ]
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
                name: '30<Day≤90',
                children: [
                  {
                    name: 'h≤4',
                    value: 3
                  },
                  {
                    name: '5<h≤6',
                    value: 2
                  },
                  {
                    name: '4<h≤5',
                    value: 2
                  },
                  {
                    name: '6<h≤7',
                    value: 2
                  },
                  {
                    name: '7<h',
                    value: 1
                  }
                ]
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
                name: '90<Day≤180',
                children: [
                  {
                    name: 'h≤4',
                    value: 2
                  },
                  {
                    name: '4<h≤5',
                    value: 1
                  },
                  {
                    name: '5<h≤6',
                    value: 2
                  },
                  {
                    name: '6<h≤7',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            name: '黄色区域',
            itemStyle: {
              color: '#9B5DB3'
            },
            children: [
              {
                name: '180<Day',
                children: [
                  {
                    name: 'h≤4',
                    value: 4
                  },
                  {
                    name: '4<h≤5',
                    value: 1
                  },
                  {
                    name: '5<h≤6',
                    value: 1
                  }
                ]
              }
            ]
          }
        ]
      }
      // this.materialOccupOption.series[0].data = [data]
    },
    changeMteria(val) {
      this.selectData.materialValueMark = val
      this.getStoreOfInitData()
    },
    changeMteriaType(val) {
      this.selectData.materialValueType = val
      this.getStoreOfInitData()
    },
    changeFinishMark(val) {
      this.selectData.finishlValueMark = val
      this.getFinishProductAll()
    },
    changeFinishType(val) {
      this.selectData.finishlValueType = val
      this.getFinishProductAll()
    },
    //原料库存
    async getStoreOfInitData() {
      const res = await post(getResourceStore, {
        thick: this.selectData.materialValueType,
        steelGrade: this.selectData.materialValueMark
      })
      if (res.success) {
        // 1. 保存完整接口数据到实例变量（关键：供 tooltip 匹配牌号）
        this.materialFullData = res.data

        let lend = []
        res.data.forEach(item => {
          lend.push(item.storeHours)
        })
        lend = [...new Set(lend)]
        //从接口获取每个库存维度的数据
        let dayLess3 = []
        let day3Medi7 = []
        let day7Medi15 = []
        let dayBig15 = []
        res.data.forEach(item => {
          switch (item['storeHours']) {
            case 'Day≤3':
              if (!item.thick) item.thick = item.steelGrade
              dayLess3.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '3＜Day≤7':
              if (!item.thick) item.thick = item.steelGrade
              day3Medi7.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '7＜Day≤15':
              if (!item.thick) item.thick = item.steelGrade
              day7Medi15.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '15＜Day':
              if (!item.thick) item.thick = item.steelGrade
              dayBig15.push({
                name: item.thick,
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
              name: '绿色区域',
              itemStyle: {
                color: '#5db362'
              },
              children: [
                {
                  name: 'Day≤3',
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
                  name: '3＜Day≤7',
                  children: day3Medi7
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
                  name: '7＜Day≤15',
                  children: day7Medi15
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#9B5DB3'
              },
              children: [{ name: '15＜Day', children: dayBig15 }]
            }
          ]
        }
        this.materialOccupOption.series[0].data = [data]
      }
    },
    //成品库存占用
    async getFinishProductAll() {
      const res = await post(getProdStore, {
        thick: this.selectData.finishlValueType,
        steelGrade: this.selectData.finishlValueMark
      })
      if (res.success) {
        // 1. 保存完整接口数据到实例变量（关键：供 tooltip 匹配牌号）
        this.finishFullData = res.data

        let lend = []
        res.data.forEach(item => {
          lend.push(item.storeHours)
        })
        lend = [...new Set(lend)]
        //从接口获取每个库存维度的数据
        let dayLess3 = []
        let day3Medi7 = []
        let day7Medi15 = []
        let dayBig15 = []
        res.data.forEach(item => {
          switch (item['storeHours']) {
            case 'Day≤30':
              if (!item.thick) item.thick = item.steelGrade
              dayLess3.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '30＜Day≤90':
              if (!item.thick) item.thick = item.steelGrade
              day3Medi7.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '90＜Day≤180':
              if (!item.thick) item.thick = item.steelGrade
              day7Medi15.push({
                name: item.thick,
                value: item.totalCount
              })
              break
            case '180＜Day':
              if (!item.thick) item.thick = item.steelGrade
              dayBig15.push({
                name: item.thick,
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
              name: '绿色区域',
              itemStyle: {
                color: '#5db362'
              },
              children: [
                {
                  name: 'Day≤30',
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
                  name: '30＜Day≤90',
                  children: day3Medi7
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
                  name: '90＜Day≤180',
                  children: day7Medi15
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#9B5DB3'
              },
              children: dayBig15
            }
          ]
        }
        this.finishOccupOption.series[0].data = [data]
      }
    }
  }
}
</script>

<style scoped lang="less">
.contentBox {
  margin-top: 16px;
  margin-bottom: 16px;
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
  height: 28px;
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
  line-height: 31px;
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
