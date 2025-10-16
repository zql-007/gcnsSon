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
            <div><span class="spanHead">热退酸洗</span></div>
            <div style="display: flex">
              <div style="margin-right: 10px">
                <el-tag
                  :class="[flagOfEleDayPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabElePro('day')"><span class="spanStyleSwitch">日</span></el-tag>
                <el-tag
                  :class="[flagOfEleMonthPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabElePro('month')"><span class="spanStyleSwitch">月</span></el-tag>
                <el-tag
                  :class="[flagOfEleYearPro ?'tagStyleActiveSwitch':'tagStyleSwitch']"
                  type="success"
                  @click="clickTabElePro('quarter')"><span class="spanStyleSwitch">季度</span></el-tag>
              </div>
              <div>
                <span class="datePickerLable">开始时间</span>
                <el-date-picker
                  v-model="times.startDate"
                  :picker-options="pickerOptions"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 140px;margin-right: 16px"
                  placeholder="选择日期"
                  @change="handleStartDateChange">
                </el-date-picker>
                <span class="datePickerLable">结束时间</span>
                <el-date-picker
                  v-model="times.endDate"
                  :picker-options="pickerOptions"
                  type="month"
                  value-format="yyyy-MM"
                  style="width: 140px"
                  placeholder="选择日期"
                  @change="handleEndDateChange">
                </el-date-picker>
                <el-tag
                  :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                  type="success"
                  @click="clickTabCurrent"><span
                    class="spanStyle">查询</span></el-tag>
              </div>
            </div>
          </div>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;align-items: center">
                  <div><span class="spanHeadTwo">实时监控</span></div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    popper-class="atooltip"
                    content="当前产线实际生产状态，不受查询时间影响。"
                    placement="top">
                    <img
                      :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                      style="width: 16px;height: 16px;margin-left: 8px"
                      alt="实时监控">
                  </el-tooltip>
                </div>
                <div style="height: 350px;padding-top: 10px">
                  <el-row :gutter="8">
                    <el-col :span="6">
                      <div :class="realTimeMonitor[0].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="realTimeMonitor[0].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">1#产线</span>
                        </div>
                        <div :class="realTimeMonitor[0].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <!--                            实时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor[0].prod }}
                                <span style="font-size: 16px">t</span>
                              </span>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">实时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            机时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[0].ratio }}
                                  <span style="font-size: 16px">t/h</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">机时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            成材率-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[0].yield }}
                                  <span style="font-size: 16px">%</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">成材率</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div :class="realTimeMonitor[1].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="realTimeMonitor[1].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">2#产线</span>
                        </div>
                        <div :class="realTimeMonitor[1].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <!--                            实时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor[1].prod }}
                                <span style="font-size: 16px">t</span>
                              </span>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">实时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            机时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[1].ratio }}
                                  <span style="font-size: 16px">t/h</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">机时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            成材率-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[1].yield }}
                                  <span style="font-size: 16px">%</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">成材率</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div :class="realTimeMonitor[2].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="realTimeMonitor[2].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">3#产线</span>
                        </div>
                        <div :class="realTimeMonitor[2].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <!--                            实时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor[2].prod }}
                                <span style="font-size: 16px">t</span>
                              </span>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">实时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            机时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[2].ratio }}
                                  <span style="font-size: 16px">t/h</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">机时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            成材率-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[2].yield }}
                                  <span style="font-size: 16px">%</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">成材率</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div :class="realTimeMonitor[3].greenGreyFlag===true ? 'outerDiv' : 'outerDivGrey'">
                        <div :class="realTimeMonitor[3].greenGreyFlag===true ? 'headTitle' : 'headTitleGrey'">
                          <span class="headTitleText">4#产线</span>
                        </div>
                        <div :class="realTimeMonitor[3].greenGreyFlag===true ? 'outPutDiv' : 'outPutDivGrey'">
                          <!--                            实时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <span class="outPutCountStyle">
                                {{ realTimeMonitor[3].prod }}
                                <span style="font-size: 16px">t</span>
                              </span>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">实时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            机时产量-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[3].ratio }}
                                  <span style="font-size: 16px">t/h</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">机时产量</span>
                            </div>
                          </div>
                          <div class="outPutDivLineBottom">
                            <div class="lineBottom">
                            </div>
                          </div>
                          <!--                            成材率-->
                          <div class="outPutDivLine">
                            <div class="outPutDivLineOut">
                              <div>
                                <span class="outPutCountStyle">
                                  {{ realTimeMonitor[3].yield }}
                                  <span style="font-size: 16px">%</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="outPutDivLineFont">
                            <div>
                              <span class="fontSpan">成材率</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex">
                    <div><span class="spanHeadTwo">产量统计</span></div>
                    <div style="padding-top: 6px;padding-left: 5px">
                      <img
                        :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                        alt="产量统计">
                    </div>
                  </div>
                  <div style="display: flex">
                    <div>
                      <span class="selectSpan">产线选择</span>
                      <el-select
                        v-model="selectInspectData.OutputStatlValue"
                        popper-class="custom-select-dropdown"
                        placeholder="请选择"
                        @change="changeOutputStat">
                        <el-option
                          v-for="item in tableInspectOptions"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="stats-container">
                  <div class="stats-item">
                    <span class="stats-label">全体员工人均产量</span>
                    <span class="stats-value"><span class="numValue">{{ outputStatList.allEmpAvg }}</span> <span class="unitValue">t/人</span></span>
                  </div>
                  <div class="stats-item">
                    <span class="stats-label">中国员工</span>
                    <span class="stats-value"><span class="numValue">{{ outputStatList.chineseEmpAvg }}</span> <span class="unitValue">t/人</span></span>
                  </div>
                  <div class="stats-item">
                    <span class="stats-label">印尼员工</span>
                    <span class="stats-value"><span class="numValue">{{ outputStatList.indEmpAvg }}</span> <span class="unitValue">t/人</span></span>
                  </div>
                </div>
                <div style="height: 286px;padding-top: 20px">
                  <nercar-echarts
                    :legend="avgRollThickOption.legend"
                    :tooltip="avgRollThickOption.tooltip"
                    :grid="avgRollThickOption.grid"
                    :x-axis="avgRollThickOption.xAxis"
                    :y-axis="avgRollThickOption.yAxis"
                    :series="avgRollThickOption.series"
                    :data-zoom="avgRollThickOption.dataZoom"
                    :_height="'270px'"
                    @chart-click-data="clickEchartFirstRate"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div><span class="spanHeadTwo">效率统计</span></div>
                  <div>
                    <span class="selectSpan">选择</span>
                    <el-select
                      v-model="selectInspectData.EffStatValue"
                      popper-class="custom-select-dropdown"
                      placeholder="请选择"
                      @change="changeEffStat">
                      <el-option
                        v-for="item in effStatOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="effStatOption.legend"
                    :tooltip="effStatOption.tooltip"
                    :grid="effStatOption.grid"
                    :x-axis="effStatOption.xAxis"
                    :y-axis="effStatOption.yAxis"
                    :series="effStatOption.series"
                    :data-zoom="effStatOption.dataZoom"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex">
                    <div><span class="spanHeadTwo">停时统计</span></div>
                    <div style="padding-top: 6px;padding-left: 5px">
                      <img
                        :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                        alt="产量统计">
                    </div>
                  </div>
                  <div>
                    <span class="selectSpan">产线选择</span>
                    <el-select
                      v-model="selectInspectData.StopValue"
                      popper-class="custom-select-dropdown"
                      placeholder="请选择"
                      @change="changeStopSta">
                      <el-option
                        v-for="item in tableInspectOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="outputStatOption.legend"
                    :tooltip="outputStatOption.tooltip"
                    :grid="outputStatOption.grid"
                    :x-axis="outputStatOption.xAxis"
                    :y-axis="outputStatOption.yAxis"
                    :series="outputStatOption.series"
                    :data-zoom="outputStatOption.dataZoom"
                    :_height="'330px'"
                    @chart-click-data="clickEchart"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex">
                  <div><span class="spanHeadTwo">质量情况</span></div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="quaSitOption.legend"
                    :tooltip="quaSitOption.tooltip"
                    :grid="quaSitOption.grid"
                    :x-axis="quaSitOption.xAxis"
                    :y-axis="quaSitOption.yAxis"
                    :series="quaSitOption.series"
                    :data-zoom="quaSitOption.dataZoom"
                    :_height="'330px'"
                  />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex">
                    <div><span class="spanHeadTwo">重点工艺合格率</span></div>
                    <div style="padding-top: 6px;padding-left: 5px">
                      <img
                        :src="require('@/assets/images/coldRollingProcess/drillDown.svg')"
                        alt="产量统计">
                    </div>
                  </div>
                  <div style="display: flex">
                    <div>
                      <span class="selectSpan">工艺参数</span>
                      <el-select
                        v-model="proParamData.materialValue"
                        popper-class="custom-select-dropdown"
                        placeholder="请选择"
                        @change="changeProParam">
                        <el-option
                          v-for="item in proParamOptions"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div style="height: 350px;padding-top: 20px">
                  <nercar-echarts
                    :legend="rollRateOption.legend"
                    :tooltip="rollRateOption.tooltip"
                    :grid="rollRateOption.grid"
                    :x-axis="rollRateOption.xAxis"
                    :y-axis="rollRateOption.yAxis"
                    :series="rollRateOption.series"
                    :data-zoom="rollRateOption.dataZoom"
                    :_height="'330px'"
                    @chart-click-data="clickEchartPassRate"
                  />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div>
                  <div style="display: flex;justify-content: space-between">
                    <div><span class="spanHeadTwo">表检复判不合格主缺陷</span></div>
                    <div>
                      <span class="selectSpan">产线选择</span>
                      <el-select
                        v-model="selectInspectData.materialValue"
                        popper-class="custom-select-dropdown"
                        placeholder="请选择"
                        @change="changeInspectData">
                        <el-option
                          v-for="item in tableInspectOptions"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div style="height: 350px;padding-top: 20px">
                    <el-row :gutter="10">
                      <el-col :span="9">
                        <div style="height: 350px;display: flex;justify-content: flex-end;align-items: flex-start;width: 100%;position: relative">
                          <div
                            id="mainCircular"></div>
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div style="padding-top: 25px">
                          <table id="dataTable">
                            <thead>
                              <tr>
                                <th class="headTh">编号</th>
                                <th class="headTh">名称</th>
                                <th class="headTh">占比</th>
                                <th class="headTh">数量</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in tableInspectFor"
                                :key="item.code"
                                class="raw-material">
                                <td>
                                  <div style="display: flex;align-items: center;height: 35px;margin-left: 10px">
                                    <span
                                      :style="{ backgroundColor: item.color }"
                                      class="icon"></span><span class="textTheam">{{ item.code }}</span>
                                  </div>
                                </td>
                                <td class="textTdName">{{ item.name }}</td>
                                <td class="textTd">{{ item.ratio }}%</td>
                                <td class="textTd">{{ item.unqualified }}卷</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                class="CardTable">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex;align-items: center">
                    <div><span class="spanHeadTwo">表检复判不合格主缺陷工序分布</span></div>
                  </div>
                  <div>
                    <span class="selectSpan">产线选择</span>
                    <el-select
                      v-model="selectDataUnqua.exaJudgUnqua"
                      popper-class="custom-select-dropdown"
                      placeholder="请选择"
                      @change="changeMteriaType">
                      <el-option
                        v-for="item in optionsType"
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
                        :key="index + '007'"
                        class="liStyle">
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
          </el-row>
          <el-row
            :gutter="16"
            style="margin-top: 16px">
            <el-col :span="24">
              <el-card
                class="CardTable">
                <div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div style="display: flex;align-items: center">
                        <span class="spanHeadTwo">吨钢消耗</span>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          popper-class="atooltip"
                          content="数据展示为查询时间段内吨钢消耗"
                          placement="top">
                          <img
                            :src="require('@/assets/images/coldProductImages/smallGreenQuest.svg')"
                            style="width: 16px;height: 16px;margin-left: 8px"
                            alt="吨钢消耗">
                        </el-tooltip>
                      </div>
                      <div class="container">
                        <!--                        <div
                          class="image-container"
                          style="display: flex;justify-content: center;margin-top: 30px">
                          <img
                            :src="require('@/assets/images/backWashProImages/tonSteelConsump.svg')"
                            alt="钢材图片">
                        </div>-->
                        <div class="data-container">
                          <div :class="[menuCollapse ? 'data-item top-leftMenuCollapse' : 'data-item top-left']">
                            <!-- 新增外层容器控制宽度和对齐 -->
                            <div class="value-wrapper">
                              <span class="data-valueOne">{{ consumpTonSteelValue.ele }}</span>
                              <span class="data-valueOneUnit">kW·h/t</span>
                            </div>
                            <span class="data-labelLeft">电耗</span>
                          </div>
                          <div :class="[menuCollapse ? 'data-item top-rightMenuCollapse' : 'data-item top-right']">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.hf }}</span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-label">55%氢氟酸</span>
                          </div>
                          <div class="data-item middle-left">
                            <div class="value-wrapper">
                              <span class="data-valueThree">{{ consumpTonSteelValue.lg }} </span>
                              <span class="data-valueOneUnit">Nm³/t</span>
                            </div>
                            <span class="data-labelLeftThree">退火炉气耗</span>
                          </div>
                          <div class="data-item middle-right">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.sa }} </span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelLeftFive">98%硫酸</span>
                          </div>
                          <div class="data-item bottom-left">
                            <div class="value-wrapper">
                              <span class="data-valueLeftFive">{{ consumpTonSteelValue.newWater }} </span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-labelLeftFive">新水消耗</span>
                          </div>
                          <div class="data-item bottom-right">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.na }} </span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelSix">58%硝酸</span>
                          </div>
                          <div class="data-item SteamConsump">
                            <div class="value-wrapper">
                              <span class="data-valueLeftFive">{{ consumpTonSteelValue.zq }} </span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-labelLeftFive">蒸汽消耗</span>
                          </div>
                          <div class="data-item ARPUrea">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.ns }} </span>
                              <span class="data-valueOneUnit">g/t</span>
                            </div>
                            <span class="data-labelLeft">ARP尿素</span>
                          </div>
                          <div class="data-item bottom-leftEnd">
                            <div class="value-wrapper">
                              <span class="data-valueLeft">{{ consumpTonSteelValue.ca }} </span>
                              <span class="data-valueOneUnit">m³/t</span>
                            </div>
                            <span class="data-labelEnd">压缩空气</span>
                          </div>
                          <div class="data-item bottom-rightEnd">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.s110 }} </span>
                              <span class="data-valueOneUnit">kg/t</span>
                            </div>
                            <span class="data-labelEnding">钢丸</span>
                          </div>
                          <div class="data-item Lime">
                            <div class="value-wrapper">
                              <span class="data-value">{{ consumpTonSteelValue.sh }} </span>
                              <span class="data-valueOneUnit">g/t</span>
                            </div>
                            <span class="data-labelEnding">石灰</span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="display: flex;justify-content: space-between">
                        <div></div>
                      </div>
                      <div style="height: 350px;margin-top: 20px">
                        <nercar-echarts
                          :legend="consumpTonSteelOption.legend"
                          :tooltip="consumpTonSteelOption.tooltip"
                          :grid="consumpTonSteelOption.grid"
                          :x-axis="consumpTonSteelOption.xAxis"
                          :y-axis="consumpTonSteelOption.yAxis"
                          :series="consumpTonSteelOption.series"
                          :data-zoom="consumpTonSteelOption.dataZoom"
                          :_height="'350px'"
                        />
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="停时详情">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFlag"
            :legend="stopDownStatisticOption.legend"
            :tooltip="stopDownStatisticOption.tooltip"
            :grid="stopDownStatisticOption.grid"
            :x-axis="stopDownStatisticOption.xAxis"
            :y-axis="stopDownStatisticOption.yAxis"
            :series="stopDownStatisticOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisibleFirstRate"
      title="钢种统计">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFirstRateFlag"
            :legend="firstRateOption.legend"
            :tooltip="firstRateOption.tooltip"
            :grid="firstRateOption.grid"
            :x-axis="firstRateOption.xAxis"
            :y-axis="firstRateOption.yAxis"
            :series="firstRateOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisiblePassRate"
      title="工艺不合格数量统计">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsPassRateFlag"
            :legend="passRateOption.legend"
            :tooltip="passRateOption.tooltip"
            :grid="passRateOption.grid"
            :x-axis="passRateOption.xAxis"
            :y-axis="passRateOption.yAxis"
            :series="passRateOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisibleFishPro"
      title="返洗降级卷数">
      <el-card
        class="CardTable">
        <div style="height: 350px">
          <nercar-echarts
            v-if="showEchartsFishProFlag"
            :legend="fishProOption.legend"
            :tooltip="fishProOption.tooltip"
            :grid="fishProOption.grid"
            :x-axis="fishProOption.xAxis"
            :y-axis="fishProOption.yAxis"
            :series="fishProOption.series"
            :_height="'330px'"
          />
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import NercarEcharts from '@/components/NercarEcharts.vue'
import {
  getHalfYearAgoDate,
  getLastMonthDate,
  getNowDay,
  getPreviousDate,
  getPreviousMonthDate
} from '@/utils/dateUtil'
import * as echarts from 'echarts'
import { mapState } from 'vuex'
import {
  getRollStopType,
  getTxAvgEnergyByTime,
  getTxAvgEnergyOfEleByTime,
  getTxAvgEnergyTonEleByTime,
  getTxImportantProcessByTime,
  getTxProdByTime,
  getTxProdOfDay,
  getTxProdPassRatioByTime,
  getTxStopMinByTime,
  getTxThreeEnergyByTime,
  getTxUnQualifiedByTime,
  getTxDowntimeDetailWeb,
  getProdStatsDrillDown,
  getProcessDefectCount,
  getFinishedProductFirstGradeRateDetail,
  getTxSourceStove,
  getAvgProdOfPeople,
  getQualityStatus,
  getRecheckMainDefectStats,
  getOEEOfTime
} from '@/lib/productDataApply/backWashingProcess'
import { post } from '@/lib/Util'
import {
  getLzDownTimeDetail,
  getPicklingProdStatisticsDetail
} from '@/lib/productDataApply/coldRollingProcess'

export default {
  name: 'heatAnnealAcidWash',
  components: { NercarEcharts },
  props: {},
  data() {
    return {
      showEchartsFlag: false,
      dialogTableVisible: false,
      stopDownStatisticOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          // 新增formatter配置，在数值后添加min单位
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }min</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // data: ['折算重量', '实际重量'],
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：min',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#',
            type: 'bar',
            data: [1, 2, 3, 4],
            barWidth: 13,
            itemStyle: {
              color: '#5db362'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '2#',
            type: 'bar',
            data: [4, 3, 2, 1],
            barWidth: 13,
            itemStyle: {
              color: '#ff9800'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '3#',
            type: 'bar',
            data: [6, 7, 8, 9],
            barWidth: 13,
            itemStyle: {
              color: '#55c6d4'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '4#',
            type: 'bar',
            data: [7, 6, 5, 4],
            barWidth: 13,
            itemStyle: {
              color: '#9B5DB3'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          }
        ],
        dataZoom: []
      },
      firstRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          // 新增formatter配置，在数值后添加min单位
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }t</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // data: ['折算重量', '实际重量'],
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#产线',
            type: 'bar',
            data: [1, 2, 3, 4],
            barWidth: 13,
            itemStyle: {
              color: '#5db362'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '2#产线',
            type: 'bar',
            data: [4, 3, 2, 1],
            barWidth: 13,
            itemStyle: {
              color: '#ff9800'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '3#产线',
            type: 'bar',
            data: [6, 7, 8, 9],
            barWidth: 13,
            itemStyle: {
              color: '#55c6d4'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '4#产线',
            type: 'bar',
            data: [7, 6, 5, 4],
            barWidth: 13,
            itemStyle: {
              color: '#9B5DB3'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          }
        ],
        dataZoom: []
      },
      dialogTableVisibleFirstRate: false,
      showEchartsFirstRateFlag: false,
      dialogTableVisiblePassRate: false,
      dialogTableVisibleFishPro: false,
      showEchartsPassRateFlag: false,
      showEchartsFishProFlag: false,
      fishProOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = '卷'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          selectedMode: false,
          itemWidth: 15, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
          /*data: [
            { name: '冶炼', icon: '' }, // 设置为线形
            { name: '等待', icon: '' },
            { name: '停时', icon: '' }
            // { name: '作业率', icon: '', show: false }
          ]*/
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '单位：卷',
            min: 0,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            scrollBar: {
              show: true, // 显示滚动条
              height: 10, // 滚动条高度
              width: 10, // 滚动条宽度
              left: '90%' // 滚动条位置
              // 其他滚动条样式和交互配置
            },
            axisPointer: {
              type: 'shadow'
            },
            data: [],
            // data: ['青丰板坯', '三期方坯', '三期板坯', '二期板坯', '一期板坯'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '反洗卷数',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '降级卷数',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            data: [],
            itemStyle: {
              color: '#ff9800'
            }
          }
        ],
        dataZoom: [
          /* {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }*/
        ]
      },
      passRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = '卷'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          show: false,
          selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '冶炼', icon: '' }, // 设置为线形
            { name: '等待', icon: '' },
            { name: '停时', icon: '' }
            // { name: '作业率', icon: '', show: false }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '7%',
            bottom: '3%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '单位：卷',
            min: 0,
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        yAxis: [
          {
            type: 'category',
            scrollBar: {
              show: true, // 显示滚动条
              height: 10, // 滚动条高度
              width: 10, // 滚动条宽度
              left: '90%' // 滚动条位置
              // 其他滚动条样式和交互配置
            },
            data: [],
            // data: ['青丰板坯', '三期方坯', '三期板坯', '二期板坯', '一期板坯'],
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            stack: 'total',
            barWidth: 20,
            label: {
              show: false,
              textStyle: {
                color: '#000' // 设置图内文字为黑色
              }
            },
            data: [],
            itemStyle: {
              color: '#5db362'
            }
          }
        ],
        dataZoom: [
          /* {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20, //滑块高度设置
            start: Math.max(0, ((21 - 6) / 21) * 100),
            zoomOnMouseWheel: true, // 禁止鼠标滚轮缩放
            moveOnMouseWheel: true, // 允许鼠标滚轮移动
            moveOnMouseMove: true, // 允许鼠标拖动移动
            end: 100 // 初始显示前 20% 的数据
          }*/
        ]
      },

      pickerOptions: {
        disabledDate(time) {
          // 获取当前月份的最后一天
          const endOfCurrentMonth = new Date()
          endOfCurrentMonth.setMonth(endOfCurrentMonth.getMonth() + 1)
          endOfCurrentMonth.setDate(0)

          // 禁用当前月份之后的日期
          return time > endOfCurrentMonth
        }
      },
      appSurfaceDefect: null,
      realTimeMonitor: [
        {
          greenGreyFlag: true,
          productMonitor: '1#产线',
          prod: '0.00', //实时产量
          ratio: '0.00', //机时产量
          yield: '0.00' //成材率
        },
        {
          greenGreyFlag: true,
          productMonitor: '2#产线',
          prod: '0.00', //实时产量
          ratio: '0.00', //机时产量
          yield: '0.00' //成材率
        },
        {
          greenGreyFlag: true,
          productMonitor: '3#产线',
          prod: '0.00', //实时产量
          ratio: '0.00', //机时产量
          yield: '0.00' //成材率
        },
        {
          greenGreyFlag: true,
          productMonitor: '4#产线',
          prod: '0.00', //实时产量
          ratio: '0.00', //机时产量
          yield: '0.00' //成材率
        }
      ],
      tableInspectFor: null,
      tableInspectOptions: null,
      proParamOptions: [
        {
          code: '1',
          text: '板温合格率'
        },
        {
          code: '2',
          text: '酸温合格率'
        },
        {
          code: '3',
          text: '酸浓度合格率'
        }
      ],
      firstRateOptions: null,
      options: [
        {
          code: '111',
          text: '111'
        },
        {
          code: '222',
          text: '222'
        }
      ],
      //表检复判不合格主缺陷工序分布
      selectDataUnqua: {
        materialValueType: '2',
        materialValueMark: '1',
        finishlValueType: '2',
        finishlValueMark: '1',
        exaJudgUnqua: '99'
      },
      optionsType: [],
      legendStyleList: [
        {
          name: '炼钢缺陷',
          color: '#5db362'
        },
        {
          name: '板坯缺陷',
          color: '#ff9800'
        },
        {
          name: '热轧缺陷',
          color: '#55c6d4'
        },
        {
          name: '退洗缺陷',
          color: '#9B5DB3'
        },
        {
          name: '分条缺陷',
          color: '#3391FF'
        },
        {
          name: '物流缺陷',
          color: '#F45549'
        }
      ],
      materialOccupOption: {
        // 1. 新增 tooltip 配置（关键）
        tooltip: {
          trigger: 'item', // 触发方式：点击/hover 节点触发
          formatter: params => {
            // params 是当前 hover 节点的完整数据，包含父级、值、名称等
            const { data, treePathInfo } = params

            // 1、关键：判断是否为叶子节点（无children的节点），非叶子节点(白色间隙)不显示tooltip
            if (data.children) {
              return ''
            }
            // 2. 从叶子节点数据中提取目标字段（构造树图时已传入这些字段）
            const defectName = data.name || '未知缺陷' // 缺陷名称（如“热轧缺陷”）
            const ratio = data.value ? Number(data.value).toFixed(2) : '0.00' // 占比（保留1位小数）
            const unqualifiedCount = data.unqualified || 0 // 不合格数量（单位：卷）

            // 3. 按示例图格式拼接Tooltip内容（缺陷名称+占比+数量）
            return `
      <div style="padding: 6px 10px; font-size: 12px; line-height: 1.6;">
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>${defectName}</strong></div>
        <div>占比 <strong>${ratio}%</strong></div>
        <div>数量 <strong>${unqualifiedCount}卷</strong></div>
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
              show: false
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
      //效率统计
      effStatOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = '%'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#产线', icon: '' }, // 设置为线形
            { name: '2#产线', icon: '' },
            { name: '3#产线', icon: '' },
            { name: '4#产线', icon: '' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [20, 21, 22, 23, 24, 25, 26],
            axisTick: {
              show: false
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#产线',
            type: 'bar',
            barWidth: 13,
            data: [20, 21, 22, 23, 24, 25, 26],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#35A034'
            }
          },
          {
            name: '2#产线',
            type: 'bar',
            barWidth: 13,
            data: [11, 33, 66, 55, 33, 77, 22],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '3#产线',
            type: 'bar',
            barWidth: 13,
            data: [40, 51, 62, 73, 44, 85, 36],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#55C6D4'
            }
          },
          {
            name: '4#产线',
            type: 'bar',
            barWidth: 13,
            data: [40, 99, 22, 44, 22, 12, 67],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#9B5DB3'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 76, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      //质量情况
      quaSitOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = '%'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          data: [
            { name: '初判一级品率', icon: 'line' }, // 设置为线形
            { name: '复判一级品率', icon: 'line' },
            { name: '复判返洗率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [20, 21, 22, 23, 24, 25, 26],
            axisTick: {
              show: false
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '初判一级品率',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#35A034'
            }
          },
          {
            name: '复判一级品率',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#FF9800'
            }
          },
          {
            name: '复判返洗率',
            type: 'line',
            data: [],
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#55C6D4'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 76, // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      outputStatList: {
        allEmpAvg: null,
        chineseEmpAvg: null,
        indEmpAvg: null
      },
      selectInspectData: {
        OutputStatlValue: '99',
        EffStatValue: '1',
        StopValue: '99',
        materialValue: '99'
      },
      effStatOptions: null,
      selectFirstRateData: {
        materialValue: '99'
      },
      avgEnergyOptions: null,
      avgEnergyData: {
        materialValue: '99'
      },
      proParamData: {
        materialValue: '1'
      },
      changeProParamValue: '1',
      selectData: {
        materialValue: '1'
      },
      greenGreyFlag: false,
      times: {
        startDate: getHalfYearAgoDate(),
        endDate: getPreviousDate()
      },
      //停时统计
      flagOfEleDay: true,
      flagOfEleMonth: false,
      flagOfEleYear: false,
      dateTypePra: 'day',
      //效率统计
      dateTypeEffStat: 'day',
      //产量统计
      flagOfEleDayPro: true,
      flagOfEleMonthPro: false,
      flagOfEleYearPro: false,
      dateTypePraPro: 'day',
      //重点工艺合格率
      flagOfEleDayKeyPro: true,
      flagOfEleMonthKeyPro: false,
      flagOfEleYearKeyPro: false,
      dateTypePraKeyPro: 'day',
      //成品一级品率
      flagOfEleDayFirstPro: true,
      flagOfEleMonthFirstPro: false,
      flagOfEleYearFirstPro: false,
      dateTypePraFirstPro: 'day',
      //吨钢能耗(气)---吨钢能耗(电)
      flagOfEleDaySteelPro: true,
      flagOfEleMonthSteelPro: false,
      flagOfEleYearSteelPro: false,
      dateTypePraSteelPro: 'day',
      //质量情况
      dateTypeQuality: 'day',
      tapButActCurrent: false,
      outputStatOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          // 新增formatter配置，在数值后添加min单位
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }min</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // data: ['折算重量', '实际重量'],
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10 // 设置图例标记的高度
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：min',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#',
            type: 'bar',
            data: [1, 2, 3, 4],
            barWidth: 13,
            itemStyle: {
              color: '#5db362'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '2#',
            type: 'bar',
            data: [4, 3, 2, 1],
            barWidth: 13,
            itemStyle: {
              color: '#ff9800'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '3#',
            type: 'bar',
            data: [6, 7, 8, 9],
            barWidth: 13,
            itemStyle: {
              color: '#55c6d4'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          },
          {
            name: '4#',
            type: 'bar',
            data: [7, 6, 5, 4],
            barWidth: 13,
            itemStyle: {
              color: '#9B5DB3'
            }
            // barCategoryGap: '40%',
            // barGap: '20%'
          }
        ],
        dataZoom: []
      },
      avgRollThickOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          },
          // 区分不同数据添加对应单位并加粗
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              const unit = item.seriesName === '白皮出库成材率' ? '%' : 't'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          // selectedMode: false,
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          // borderRadius: 3 // 设置图例标记的圆角半径
          data: [
            { name: '1#产线', icon: '' },
            { name: '2#产线', icon: '' },
            { name: '3#产线', icon: '' },
            { name: '4#产线', icon: '' },
            { name: '白皮出库成材率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 x 轴线
          },
          {
            type: 'value',
            name: '',
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            // axisLabel: { interval: 0 }, //横坐标显示不全
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#产线',
            type: 'bar',
            stack: 'total',
            barWidth: 13,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#5db362'
            },
            label: {
              show: false
            },
            data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
          },
          {
            name: '2#产线',
            type: 'bar',
            stack: 'total',
            barWidth: 13,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#ff9800'
            },
            label: {
              show: false
            },
            data: [2, 3, 4, 5, 6, 2, 3, 4, 5, 6]
          },
          {
            name: '3#产线',
            type: 'bar',
            stack: 'total',
            barWidth: 13,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#55c6d4'
            },
            label: {
              show: false
            },
            data: [7, 8, 9, 3, 4, 7, 8, 9, 3, 4]
          },
          {
            name: '4#产线',
            type: 'bar',
            stack: 'total',
            barWidth: 13,
            //自定义每节柱状图颜色
            itemStyle: {
              color: '#9B5DB3'
            },
            label: {
              show: false
            },
            data: [2, 3, 4, 6, 7, 2, 3, 4, 6, 7]
          },
          {
            name: '白皮出库成材率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [1, 2, 3, 4, 3, 5, 6, 2],
            itemStyle: {
              color: '#3391FF'
            }
          }
        ],
        dataZoom: []
      },
      rollRateOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }%</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#', icon: '' }, // 设置为线形line
            { name: '2#', icon: '' },
            { name: '3#', icon: '' },
            { name: '4#', icon: '' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              formatter: '{value}%',
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '1#',
            type: 'bar',
            data: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            barWidth: 13,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '2#',
            type: 'bar',
            data: [30, 21, 52, 23, 64, 85, 36, 27, 28, 29, 30, 31],
            barWidth: 13,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#ed7d31'
            }
          },
          {
            name: '3#',
            type: 'bar',
            data: [40, 51, 62, 73, 44, 85, 36, 51, 62, 73, 44, 85],
            barWidth: 13,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#55c6d4'
            }
          },
          {
            name: '4#',
            type: 'bar',
            data: [33, 44, 55, 66, 32, 44, 12, 55, 66, 32, 44, 12],
            barWidth: 13,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#9B5DB3'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      outputStatOption1: {
        tooltip: {
          trigger: 'axis',
          // 条件判断单位的formatter配置
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit = item.seriesName === '一级品率' ? '%' : '卷'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          },
          axisPointer: {
            type: 'cross'
            /*  crossStyle: {
              color: '#999'
            }*/
          }
        },
        legend: {
          // data: ['重量', '作业率']
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '反洗卷数', icon: '' },
            { name: '降级卷数', icon: '' },
            { name: '一级品率', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：卷',
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '',
            // interval: 50,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '反洗卷数',
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            data: [1, 2, 12, 33, 4, 12, 7],
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '降级卷数',
            type: 'bar',
            stack: 'total',
            barWidth: 12,
            data: [33, 4, 13, 32, 12, 22, 8],
            itemStyle: {
              color: '#ff9800'
            }
          },
          {
            name: '一级品率',
            type: 'line',
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            yAxisIndex: 1,
            data: [1, 2, 3, 4, 3, 5, 6, 2],
            itemStyle: {
              color: '#a146b0'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      },
      consumpTonSteelValue: {
        ca: '0.00',
        ele: '0.00',
        hf: '0.00',
        lg: '0.00', //退火炉气耗
        na: '0.00',
        newWater: '0.00',
        s110: '0.00',
        sa: '0.00',
        zq: '0.00',
        sh: '0.00',
        ns: '0.00'
      },
      consumpTonSteelOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>'
            params.forEach(item => {
              // 判断系列名称，设置不同单位
              const unit =
                item.seriesName === '退火炉吨钢气耗' ? 'Nm³/t' : 'kW·h/t'
              result += `${item.marker}${item.seriesName}: <strong>${
                item.value
              }${unit}</strong><br/>`
            })
            return result
          }
        },
        legend: {
          top: '1%',
          data: [
            { name: '吨钢电耗', icon: 'line' }, // 设置为线形
            { name: '退火炉吨钢气耗', icon: 'line' }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '12%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false, // 是否显示轴线，true 为显示，false 为隐藏，默认一般为显示，可按需设置
              lineStyle: {
                // color: '#ababab' // x轴坐标显示背景阴影颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：kW·h/t',
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLabel: {
              show: true // 确保 y 轴维度值显示
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          },
          {
            type: 'value',
            name: '单位：Nm³/t',
            // interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false // 隐藏Y轴的刻度线
            },
            axisLine: { show: false } //只隐藏 Y 轴线
          }
        ],
        series: [
          {
            name: '吨钢电耗',
            type: 'line',
            data: [1, 2, 3, 4, 5, 6, 7],
            smooth: true, // 开启平滑曲线
            // yAxisIndex: 1, //另建一个Y轴维度
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#5db362'
            }
          },
          {
            name: '退火炉吨钢气耗',
            type: 'line',
            data: [11, 22, 33, 44, 55, 66, 77],
            yAxisIndex: 1,
            smooth: true, // 开启平滑曲线
            symbol: 'none', // 去掉转折点的圆点
            itemStyle: {
              color: '#ff9800'
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            // start: Math.max(0, ((xData.length - 6) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0 //缩放条显示在底部
            // end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('menu', ['dataDictionary', 'menuCollapse'])
  },
  watch: {
    dialogTableVisible(newVal, oldVal) {
      // 普通函数，this 指向组件实例
      this.showEchartsFlag = newVal // 简化赋值逻辑
    },
    dialogTableVisibleFirstRate(newVal, oldVal) {
      this.showEchartsFirstRateFlag = newVal
    },
    dialogTableVisiblePassRate(newVal, oldVal) {
      this.showEchartsPassRateFlag = newVal
    },
    dialogTableVisibleFishPro(newVal, oldVal) {
      this.showEchartsFishProFlag = newVal
    }
  },
  mounted() {
    this.getTxProdByTimeData()
    this.getAvgProdOfPeopleData()
    this.getTxStopMinByTimeData()
    this.getOEEOfTimeData()
    this.getTxUnQualifiedByTimeData()
    this.getTxProdOfDayData()
    this.getRollStopDataType()
    this.getTxImportantProcessByTimeData()
    this.getQualityStatusData()
    this.getTxProdPassRatioByTimeData()
    this.getTxAvgEnergyByTimeData()
    this.getTxThreeEnergyByTimeData()
    this.getTxAvgEnergyOfEleByTimeData()
    this.getTxAvgEnergyTonEleByTimeData()

    this.getStoreOfInitData()
    this.tableInspectOptions = this.dataDictionary['rtsx-productionLine']
    //去重
    const codeSet2 = new Set()
    this.tableInspectOptions = this.tableInspectOptions.filter(item => {
      if (!codeSet2.has(item.code)) {
        codeSet2.add(item.code)
        return true
      }
      return false
    })
    this.firstRateOptions = this.dataDictionary['rtsx-productionLine']
    //去重
    const codeSet3 = new Set()
    this.firstRateOptions = this.firstRateOptions.filter(item => {
      if (!codeSet3.has(item.code)) {
        codeSet3.add(item.code)
        return true
      }
      return false
    })
    this.avgEnergyOptions = this.dataDictionary['rtsx-productionLine']
    this.appSurfaceDefect = this.dataDictionary['tx-appSurfaceDefect']

    this.optionsType = this.dataDictionary['rtsx-productionLine']
    //去重
    const codeSet4 = new Set()
    this.optionsType = this.optionsType.filter(item => {
      if (!codeSet4.has(item.code)) {
        codeSet4.add(item.code)
        return true
      }
      return false
    })

    //效率统计
    this.effStatOptions = this.dataDictionary['tx-efficiencyStatType']
  },
  activated() {
    //定时器十分钟刷新停机状态
    this.timerId = setInterval(async () => {
      try {
        await this.getRollStopDataType()
      } catch (error) {
        console.error('异步方法调用出错:', error)
      }
    }, 600000)
  },
  deactivated() {
    //切换页面后销毁定时器
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  },
  methods: {
    //效率统计
    changeEffStat() {
      this.getOEEOfTimeData()
    },
    async getOEEOfTimeData() {
      const res = await post(getOEEOfTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypeEffStat,
        type: this.selectInspectData.EffStatValue
      })
      if (res.success) {
        let result = this.getLineRatiosAndTimes(res.data)

        let xData = result['1#产线'].times
        this.effStatOption.xAxis[0].data = xData

        if (this.selectInspectData.EffStatValue === '1') {
          this.effStatOption.series[0].data = result['1#产线'].oees
          this.effStatOption.series[1].data = result['2#产线'].oees
          this.effStatOption.series[2].data = result['3#产线'].oees
          this.effStatOption.series[3].data = result['4#产线'].oees
        } else if (
          this.selectInspectData.EffStatValue === '2' ||
          this.selectInspectData.EffStatValue === '3'
        ) {
          this.effStatOption.series[0].data = result['1#产线'].ratios
          this.effStatOption.series[1].data = result['2#产线'].ratios
          this.effStatOption.series[2].data = result['3#产线'].ratios
          this.effStatOption.series[3].data = result['4#产线'].ratios
        } else {
          this.effStatOption.series[0].data = result['1#产线'].passRatios
          this.effStatOption.series[1].data = result['2#产线'].passRatios
          this.effStatOption.series[2].data = result['3#产线'].passRatios
          this.effStatOption.series[3].data = result['4#产线'].passRatios
        }
        this.effStatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 5) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    // 处理数据的函数：为每个产线创建效率值数组和对应的时间数组
    getLineRatiosAndTimes(data) {
      // 创建结果对象，每个产线包含时间数组和效率值数组
      const result = {}

      // 遍历原始数据
      data.forEach(item => {
        const { prodTime, proLine, ratio, oee, passRatio } = item
        // 格式化产线名称
        const lineName = `${proLine}#产线`

        // 如果该产线在结果中不存在，则初始化
        if (!result[lineName]) {
          result[lineName] = {
            times: [], // 存储时间的数组
            ratios: [], // 时间利用率&性能利用率
            oees: [], //设备综合效率
            passRatios: [] //质量指数
          }
        }

        // 将时间和效率值分别添加到对应数组
        result[lineName].times.push(prodTime)
        result[lineName].ratios.push(ratio)
        result[lineName].oees.push(oee)
        result[lineName].passRatios.push(passRatio)
      })

      // 对每个产线的数组按日期排序，确保时间和效率值对应
      Object.keys(result).forEach(lineName => {
        // 创建包含索引的数组，用于排序后保持对应关系
        const indexedData = result[lineName].times.map((time, index) => ({
          time,
          ratio: result[lineName].ratios[index],
          oee: result[lineName].oees[index],
          passRatio: result[lineName].passRatios[index],
          index
        }))

        // 按时间排序
        indexedData.sort((a, b) => new Date(a.time) - new Date(b.time))

        // 重新构建排序后的数组
        result[lineName].times = indexedData.map(item => item.time)
        result[lineName].ratios = indexedData.map(item => item.ratio)
        result[lineName].oees = indexedData.map(item => item.oee)
        result[lineName].passRatios = indexedData.map(item => item.passRatio)
      })

      return result
    },
    /* -----------------------下钻功能--------------------------*/
    //停时统计
    clickEchart(val) {
      this.dialogTableVisible = true

      this.getStopDownData(val.data.name)
    },
    async getStopDownData(machineTime) {
      const res = await post(getTxDowntimeDetailWeb, {
        dateType: this.dateTypePra,
        accDate: machineTime
      })
      if (res.success) {
        let xData = []
        let prodLine1 = []
        let prodLine2 = []
        let prodLine3 = []
        let prodLine4 = []
        res.data.forEach(item => {
          xData.push(item.downtimeTypeDictText)
          prodLine1.push(item.prodLine1)
          prodLine2.push(item.prodLine2)
          prodLine3.push(item.prodLine3)
          prodLine4.push(item.prodLine4)
        })
        this.stopDownStatisticOption.xAxis[0].data = xData
        this.stopDownStatisticOption.series[0].data = prodLine1
        this.stopDownStatisticOption.series[1].data = prodLine2
        this.stopDownStatisticOption.series[2].data = prodLine3
        this.stopDownStatisticOption.series[3].data = prodLine4
        this.stopDownStatisticOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 7) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //产量统计
    clickEchartFirstRate(val) {
      this.dialogTableVisibleFirstRate = true

      this.getFirstRateData(val.data.name)
    },
    async getFirstRateData(accountDate) {
      const res = await post(getProdStatsDrillDown, {
        dateType: this.dateTypePraPro,
        prodTime: accountDate
      })
      if (res.success) {
        let xData = []
        let prodLine1 = []
        let prodLine2 = []
        let prodLine3 = []
        let prodLine4 = []
        res.data.forEach(item => {
          xData.push(item.stlgrd)
          prodLine1.push(Number(item.prodLine1).toFixed(2))
          prodLine2.push(Number(item.prodLine2).toFixed(2))
          prodLine3.push(Number(item.prodLine3).toFixed(2))
          prodLine4.push(Number(item.prodLine4).toFixed(2))
        })
        this.firstRateOption.xAxis[0].data = xData
        this.firstRateOption.series[0].data = prodLine1
        this.firstRateOption.series[1].data = prodLine2
        this.firstRateOption.series[2].data = prodLine3
        this.firstRateOption.series[3].data = prodLine4
        this.firstRateOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 14) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //重点工艺合格率passRateOption
    clickEchartPassRate(val) {
      this.dialogTableVisiblePassRate = true

      this.getPassRateData(val.data.name)
    },
    async getPassRateData(accountDate) {
      const res = await post(getProcessDefectCount, {
        dateType: this.dateTypePraKeyPro,
        accDate: accountDate
      })
      if (res.success) {
        const resultData = this.getLineAndValueArrays(res)

        this.passRateOption.yAxis[0].data = []
        this.passRateOption.series[0].data = []

        switch (this.changeProParamValue) {
          case '1':
            this.passRateOption.series[0].data = resultData.temp.values
            this.passRateOption.yAxis[0].data = resultData.temp.lines
            break
          case '2':
            this.passRateOption.series[0].data = resultData.sTemp.values
            this.passRateOption.yAxis[0].data = resultData.sTemp.lines
            break
          case '3':
            this.passRateOption.series[0].data = resultData.density.values
            this.passRateOption.yAxis[0].data = resultData.density.lines
            break
        }
      }
    },
    // 处理数据的函数 - 分别获取产线数组和对应值数组
    getLineAndValueArrays(data) {
      // 获取数据中的第一个对象
      const item = data.data[0]
      if (!item) return null

      // 定义需要处理的三组字段
      const fieldGroups = [
        {
          key: 'density',
          names: [
            'proLineDensityTemp1',
            'proLineDensityTemp2',
            'proLineDensityTemp3',
            'proLineDensityTemp4'
          ]
        },
        {
          key: 'sTemp',
          names: [
            'proLineSTemp1',
            'proLineSTemp2',
            'proLineSTemp3',
            'proLineSTemp4'
          ]
        },
        {
          key: 'temp',
          names: [
            'proLineTemp1',
            'proLineTemp2',
            'proLineTemp3',
            'proLineTemp4'
          ]
        }
      ]

      const results = {}

      // 处理每组字段
      fieldGroups.forEach(group => {
        // 提取字段值并保留原始编号
        const valuesWithIndex = group.names.map(fieldName => {
          // 提取字段名的最后一个字符作为产线编号
          const index = fieldName.slice(-1)
          return {
            index: index,
            value: item[fieldName],
            lineName: `${index}#产线`
          }
        })

        // 按值从大到小排序
        const sorted = valuesWithIndex.sort((a, b) => a.value - b.value)

        // 分别提取排序后的产线名称数组和对应的值数组
        results[group.key] = {
          lines: sorted.map(item => item.lineName),
          values: sorted.map(item => item.value)
        }
      })

      return results
    },
    //成品一级品率
    clickEchartFishPro(val) {
      this.dialogTableVisibleFishPro = true

      this.getFishProData(val.data.name)
    },
    async getFishProData(accountDate) {
      const res = await post(getFinishedProductFirstGradeRateDetail, {
        dateType: this.dateTypePraFirstPro,
        accDate: accountDate
      })
      if (res.success) {
        let result = this.processAndSortData(res.data)

        let xData = []
        let backList = []
        let lowerList = []
        result.forEach(item => {
          xData.push(item.proLine + '#退洗')
          backList.push(item.backxi)
          lowerList.push(item.lower)
        })

        this.fishProOption.yAxis[0].data = xData
        this.fishProOption.series[0].data = backList
        this.fishProOption.series[1].data = lowerList
      }
    },
    // 处理数据：计算每个对象的backxi和lower的和，并按和从大到小排序
    processAndSortData(inputData) {
      // 复制数据以避免修改原始数据
      const items = [...inputData]

      // 为每个对象添加sum属性，即backxi和lower的和
      const itemsWithSum = items.map(item => ({
        ...item,
        sum: item.backxi + item.lower
      }))

      // 按sum属性从大到小排序，上到下(倒序
      const resultData = itemsWithSum.sort((a, b) => a.sum - b.sum)

      return resultData
    },
    /* -----------------------统一处理时间--------------------------*/
    handleStartDateChange() {
      if (this.times.startDate) {
        this.times.startDate = this.formatStartDate(this.times.startDate)
      }
    },
    handleEndDateChange() {
      if (this.times.endDate) {
        this.times.endDate = this.formatEndDate(this.times.endDate)
      }
    },
    // 处理开始时间：选择月份时精确到当月第一天
    formatStartDate(monthStr) {
      if (!monthStr) return null
      // 拼接当月第一天
      return `${monthStr}-01`
    },
    // 处理结束时间：选择月份时精确到当月最后一天，若为当前月则精确到前一天
    formatEndDate(monthStr) {
      if (!monthStr) return null

      const year = parseInt(monthStr.split('-')[0])
      const month = parseInt(monthStr.split('-')[1])

      // 获取当月最后一天
      const lastDay = new Date(year, month, 0).getDate()
      const lastDayStr = `${monthStr}-${lastDay}`

      // 判断是否为当前月
      const today = new Date()
      const currentMonthStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`

      if (monthStr === currentMonthStr) {
        // 是当前月，返回昨天
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        return `${yesterday.getFullYear()}-${String(
          yesterday.getMonth() + 1
        ).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
      } else {
        // 非当前月，返回当月最后一天
        return lastDayStr
      }
    },
    /* -------------------------------------------------*/
    //表检复判不合格主缺陷工序分布
    changeMteriaType(val) {
      this.selectDataUnqua.exaJudgUnqua = val
      this.getStoreOfInitData()
    },
    async getStoreOfInitData() {
      const res = await post(getRecheckMainDefectStats, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        proLine: this.selectDataUnqua.exaJudgUnqua
      })
      if (res.success && res.data.length > 0) {
        let legendList = []
        res.data.forEach(item => {
          legendList.push(item.procName)
        })
        // 过滤
        this.legendStyleList = this.legendStyleList.filter(legend =>
          legendList.includes(legend.name)
        )
        // 1. 保存完整接口数据到实例变量（关键：供 tooltip 匹配牌号）
        this.materialFullData = res.data

        let lend = []
        res.data.forEach(item => {
          lend.push(item.procName)
        })
        lend = [...new Set(lend)]
        //从接口获取每个库存维度的数据
        let steelDefect = [] // 炼钢缺陷
        let slabDefect = [] // 板坯缺陷
        let hotDefect = [] // 热轧缺陷
        let washDefect = [] // 退洗缺陷
        let splitDefect = [] // 分条缺陷
        let flowDefect = [] // 物流缺陷
        res.data.forEach(item => {
          switch (item['procName']) {
            case '炼钢缺陷':
              steelDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
              })
              break
            case '板坯缺陷':
              slabDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
              })
              break
            case '热轧缺陷':
              hotDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
              })
              break
            case '退洗缺陷':
              washDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
              })
              break
            case '分条缺陷':
              splitDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
              })
              break
            case '物流缺陷':
              flowDefect.push({
                name: item.procName,
                value: item.ratio,
                unqualified: item.unqualified
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
                  name: '炼钢缺陷',
                  children: steelDefect
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
                  name: '板坯缺陷',
                  children: slabDefect
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
                  name: '热轧缺陷',
                  children: hotDefect
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#9B5DB3'
              },
              // children: washDefect,
              children: [
                {
                  name: '退洗缺陷',
                  children: washDefect
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#3391FF'
              },
              // children: washDefect,
              children: [
                {
                  name: '分条缺陷',
                  children: splitDefect
                }
              ]
            },
            {
              name: '黄色区域',
              itemStyle: {
                color: '#F45549'
              },
              children: [
                {
                  name: '物流缺陷',
                  children: flowDefect
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
    changeInspectData(val) {
      this.selectInspectData.materialValue = val
      this.getTxUnQualifiedByTimeData()
    },
    changeProParam(val) {
      this.changeProParamValue = val
      this.getTxImportantProcessByTimeData()
    },
    changeFirstRate(val) {
      this.selectFirstRateData.materialValue = val
      this.getTxProdPassRatioByTimeData()
    },
    changeAvgEnergy(val) {
      this.avgEnergyData.materialValue = val
      this.getTxAvgEnergyByTimeData()
      this.getTxThreeEnergyByTimeData()
      this.getTxAvgEnergyOfEleByTimeData()
    },
    clickTabCurrent() {
      this.tapButActCurrent = true
      this.getTxProdByTimeData()
      this.getTxStopMinByTimeData()
      this.getOEEOfTimeData()
      this.getTxUnQualifiedByTimeData()
      this.getTxProdOfDayData()
      this.getRollStopDataType()
      this.getTxImportantProcessByTimeData()
      this.getQualityStatusData()
      this.getTxProdPassRatioByTimeData()
      this.getTxAvgEnergyByTimeData()
      this.getTxThreeEnergyByTimeData()
      this.getTxAvgEnergyOfEleByTimeData()
      this.getTxAvgEnergyTonEleByTimeData()

      this.getAvgProdOfPeopleData()
      setTimeout(() => {
        this.tapButActCurrent = false
      }, 1000)
    },
    /*------------------热退酸洗------------------*/
    //日、月、季度（总开关
    clickTabElePro(params) {
      //缓存闪屏清空
      this.effStatOption.xAxis[0].data = []
      this.quaSitOption.xAxis[0].data = []

      if (params === 'day') {
        //产量统计
        this.flagOfEleDayPro = true
        this.flagOfEleMonthPro = false
        this.flagOfEleYearPro = false
        //停时统计
        this.flagOfEleDay = true
        this.flagOfEleMonth = false
        this.flagOfEleYear = false
        //重点工艺合格率
        this.flagOfEleDayKeyPro = true
        this.flagOfEleMonthKeyPro = false
        this.flagOfEleYearKeyPro = false
        //吨钢消耗曲线
        this.flagOfEleDaySteelPro = true
        this.flagOfEleMonthSteelPro = false
        this.flagOfEleYearSteelPro = false
        this.consumpTonSteelOption.series[0].type = 'line'
        this.consumpTonSteelOption.series[1].type = 'line'
        this.consumpTonSteelOption.legend = {
          top: '1%',
          data: [
            { name: '吨钢电耗', icon: 'line' }, // 设置为线形
            { name: '退火炉吨钢气耗', icon: 'line' }
          ]
        }
        //质量情况
        this.quaSitOption.series[0].type = 'line'
        this.quaSitOption.series[1].type = 'line'
        this.quaSitOption.series[2].type = 'line'
        this.quaSitOption.legend = {
          top: '1%',
          data: [
            { name: '初判一级品率', icon: 'line' }, // 设置为线形
            { name: '复判一级品率', icon: 'line' },
            { name: '复判返洗率', icon: 'line' }
          ]
        }
        //效率统计
        /*this.effStatOption.series[0].type = 'line'
        this.effStatOption.series[1].type = 'line'
        this.effStatOption.series[2].type = 'line'
        this.effStatOption.series[3].type = 'line'
        this.effStatOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#产线', icon: 'line' }, // 设置为线形
            { name: '2#产线', icon: 'line' },
            { name: '3#产线', icon: 'line' },
            { name: '4#产线', icon: 'line' }
          ]
        }*/
      } else if (params === 'month') {
        //产量统计
        this.flagOfEleDayPro = false
        this.flagOfEleMonthPro = true
        this.flagOfEleYearPro = false
        //停时统计
        this.flagOfEleDay = false
        this.flagOfEleMonth = true
        this.flagOfEleYear = false
        //重点工艺合格率
        this.flagOfEleDayKeyPro = false
        this.flagOfEleMonthKeyPro = true
        this.flagOfEleYearKeyPro = false
        //吨钢消耗曲线
        this.flagOfEleDaySteelPro = false
        this.flagOfEleMonthSteelPro = true
        this.flagOfEleYearSteelPro = false
        this.consumpTonSteelOption.series[0].type = 'line'
        this.consumpTonSteelOption.series[1].type = 'line'
        this.consumpTonSteelOption.legend = {
          top: '1%',
          data: [
            { name: '吨钢电耗', icon: 'line' }, // 设置为线形
            { name: '退火炉吨钢气耗', icon: 'line' }
          ]
        }
        //质量情况
        this.quaSitOption.series[0].type = 'line'
        this.quaSitOption.series[1].type = 'line'
        this.quaSitOption.series[2].type = 'line'
        this.quaSitOption.legend = {
          top: '1%',
          data: [
            { name: '初判一级品率', icon: 'line' }, // 设置为线形
            { name: '复判一级品率', icon: 'line' },
            { name: '复判返洗率', icon: 'line' }
          ]
        }
        //效率统计
        /*this.effStatOption.series[0].type = 'line'
        this.effStatOption.series[1].type = 'line'
        this.effStatOption.series[2].type = 'line'
        this.effStatOption.series[3].type = 'line'
        this.effStatOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#产线', icon: 'line' }, // 设置为线形
            { name: '2#产线', icon: 'line' },
            { name: '3#产线', icon: 'line' },
            { name: '4#产线', icon: 'line' }
          ]
        }*/
      } else if (params === 'quarter') {
        //产量统计
        this.flagOfEleDayPro = false
        this.flagOfEleMonthPro = false
        this.flagOfEleYearPro = true
        //停时统计
        this.flagOfEleDay = false
        this.flagOfEleMonth = false
        this.flagOfEleYear = true
        //重点工艺合格率
        this.flagOfEleDayKeyPro = false
        this.flagOfEleMonthKeyPro = false
        this.flagOfEleYearKeyPro = true
        //吨钢消耗曲线
        this.flagOfEleDaySteelPro = false
        this.flagOfEleMonthSteelPro = false
        this.flagOfEleYearSteelPro = true
        this.consumpTonSteelOption.series[0].type = 'bar'
        this.consumpTonSteelOption.series[1].type = 'bar'
        this.consumpTonSteelOption.series[0].barWidth = 13
        this.consumpTonSteelOption.series[1].barWidth = 13
        this.consumpTonSteelOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '吨钢电耗', icon: '' }, // 设置为线形
            { name: '退火炉吨钢气耗', icon: '' }
          ]
        }
        //质量情况
        this.quaSitOption.series[0].type = 'bar'
        this.quaSitOption.series[1].type = 'bar'
        this.quaSitOption.series[2].type = 'bar'
        this.quaSitOption.series[0].barWidth = 13
        this.quaSitOption.series[1].barWidth = 13
        this.quaSitOption.series[2].barWidth = 13
        this.quaSitOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '初判一级品率', icon: '' }, // 设置为线形
            { name: '复判一级品率', icon: '' },
            { name: '复判返洗率', icon: '' }
          ]
        }
        //效率统计
        this.effStatOption.series[0].type = 'bar'
        this.effStatOption.series[1].type = 'bar'
        this.effStatOption.series[2].type = 'bar'
        this.effStatOption.series[3].type = 'bar'
        this.effStatOption.series[0].barWidth = 13
        this.effStatOption.series[1].barWidth = 13
        this.effStatOption.series[2].barWidth = 13
        this.effStatOption.series[3].barWidth = 13
        this.effStatOption.legend = {
          top: '1%',
          itemWidth: 20, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          data: [
            { name: '1#产线', icon: '' }, // 设置为线形
            { name: '2#产线', icon: '' },
            { name: '3#产线', icon: '' },
            { name: '4#产线', icon: '' }
          ]
        }
      }
      this.dateTypePraPro = params //产量统计
      this.getTxProdByTimeData()

      this.dateTypePra = params //停时统计
      this.getTxStopMinByTimeData()

      this.dateTypeEffStat = params //效率统计
      this.getOEEOfTimeData()

      this.dateTypePraKeyPro = params //重点工艺合格率
      this.getTxImportantProcessByTimeData()

      this.dateTypePraSteelPro = params //吨钢消耗曲线
      this.getTxAvgEnergyOfEleByTimeData()
      this.getTxAvgEnergyTonEleByTimeData()

      this.dateTypeQuality = params //质量情况
      this.getQualityStatusData()
    },
    //产量统计
    changeOutputStat(val) {
      this.selectInspectData.OutputStatlValue = val
      this.getTxProdByTimeData()
    },
    async getTxProdByTimeData() {
      const res = await post(getTxProdByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraPro,
        proline: this.selectInspectData.OutputStatlValue
      })
      if (res.success) {
        let xData = []
        let prodLine1 = []
        let prodLine2 = []
        let prodLine3 = []
        let prodLine4 = []
        let ratioList = []
        res.data.forEach(item => {
          xData.push(item.prodTime)
          prodLine1.push(Number(item.prodLine1).toFixed(2))
          prodLine2.push(Number(item.prodLine2).toFixed(2))
          prodLine3.push(Number(item.prodLine3).toFixed(2))
          prodLine4.push(Number(item.prodLine4).toFixed(2))
          ratioList.push(Number(item.ratio).toFixed(2))
        })
        this.avgRollThickOption.xAxis[0].data = xData
        this.avgRollThickOption.series[0].data = prodLine1
        this.avgRollThickOption.series[1].data = prodLine2
        this.avgRollThickOption.series[2].data = prodLine3
        this.avgRollThickOption.series[3].data = prodLine4
        this.avgRollThickOption.series[4].data = ratioList
        this.avgRollThickOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 14) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //各人均产量统计(产量统计)
    async getAvgProdOfPeopleData() {
      const res = await post(getAvgProdOfPeople, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        this.outputStatList.allEmpAvg = res.data[0].avgWgtOfAll
        this.outputStatList.chineseEmpAvg = res.data[0].avgWgtOfCN
        this.outputStatList.indEmpAvg = res.data[0].avgWgtOfYin
      }
    },
    //停时统计
    changeStopSta(val) {
      this.getTxStopMinByTimeData(val)
    },
    async getTxStopMinByTimeData(val) {
      const res = await post(getTxStopMinByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePra
      })
      if (res.success) {
        let xData = []
        let prodLine1 = []
        let prodLine2 = []
        let prodLine3 = []
        let prodLine4 = []
        res.data.forEach(item => {
          xData.push(item.prodTime)
          if (val === '1') {
            prodLine1.push(item.prodLine1)
          } else if (val === '2') {
            prodLine2.push(item.prodLine2)
          } else if (val === '3') {
            prodLine3.push(item.prodLine3)
          } else if (val === '4') {
            prodLine4.push(item.prodLine4)
          } else {
            prodLine1.push(item.prodLine1)
            prodLine2.push(item.prodLine2)
            prodLine3.push(item.prodLine3)
            prodLine4.push(item.prodLine4)
          }
        })
        this.outputStatOption.xAxis[0].data = xData
        this.outputStatOption.series[0].data = prodLine1
        this.outputStatOption.series[1].data = prodLine2
        this.outputStatOption.series[2].data = prodLine3
        this.outputStatOption.series[3].data = prodLine4
        this.outputStatOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 7) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //表检不合格主缺陷
    async getTxUnQualifiedByTimeData() {
      const res = await post(getTxUnQualifiedByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        proLine: this.selectInspectData.materialValue
      })
      if (res.success && res.data !== undefined) {
        let colorList = [
          '#5db362',
          '#ff9800',
          '#55c6d4',
          '#9B5DB3',
          '#264478',
          '#68aeff'
        ]
        res.data.forEach((item, index) => {
          item.color = colorList[index]
        })
        this.tableInspectFor = res.data
        this.tableInspectFor.forEach((item, index) => {
          this.appSurfaceDefect.forEach(val => {
            if (item.code === val.code) {
              this.tableInspectFor[index].name = val.text
            }
            if (item.code === '其他') {
              this.tableInspectFor[index].name = '其他'
            }
          })
        })
        //扇形图
        this.getInitEcharts(this.tableInspectFor)
      } else {
        this.tableInspectFor = []
        this.$message.error('表检不合格主缺陷: 未查到数据！')
      }
    },
    getInitEcharts(data) {
      //扇形总卷数
      let totalJuan = null
      // 原始数据
      let originalData = []
      data.forEach(item => {
        originalData.push({
          value: item.unqualified,
          name: item.code,
          itemStyle: { color: item.color }
        })
        totalJuan += item.unqualified
      })
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('mainCircular'))
      window.addEventListener('resize', function() {
        myChart.resize()
      })
      // 配置项
      let option = {
        title: {
          text: `{number|${totalJuan}}{unit|卷}`,
          subtext: '表检不合格卷数',
          left: 'center',
          top: '42%',
          textStyle: {
            // fontSize: 24,
            // fontWeight: 'bold'
            rich: {
              // 数字样式
              number: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              // "卷"字样式
              unit: {
                fontSize: 12, // 缩小"卷"字的字体
                fontWeight: 'bold',
                padding: [0, 0, 0, 2] // 与数字保持间距
              }
            }
          },
          subtextStyle: {
            fontSize: 14,
            fontFamily: 'Source Han Sans CN',
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'item',
          // 自定义formatter函数，添加颜色标注
          formatter: function(params) {
            // params包含当前数据项的信息，包括颜色
            return `
          <div>
            <span>${params.seriesName}</span><br/>
            <!-- 颜色块 + 名称 + 数值 -->
            <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background-color:${
              params.color
            };margin-right:6px;"></span>
            <span>${params.name}: <strong>${params.value}卷</strong></span>
          </div>
        `
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
          data: ['绿色部分', '蓝色部分', '其他部分'] // 根据实际数据标签调整
        },
        /* grid: [
          {
            left: '20%',
            containLabel: true
          }
        ],*/
        series: [
          {
            name: '表检不合格卷数',
            type: 'pie',
            radius: ['65%', '100%'],
            roseType: 'radius', // 设置玫瑰图模式，半径随数据变化
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false, //取消圆圈内文字展示
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              borderWidth: 1, // 设置边框宽度，形成间隙效果
              borderColor: 'white' // 边框颜色，可根据背景色调整
            },
            data: originalData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    //实时监控
    async getTxProdOfDayData() {
      const res = await post(getTxProdOfDay, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        this.realTimeMonitor.forEach((item, index) => {
          res.data.forEach(val => {
            if (item.productMonitor === val.prolineDictText) {
              this.realTimeMonitor[index].prod = Number(val.prod).toFixed(2)
              this.realTimeMonitor[index].ratio = Number(val.ratio).toFixed(2)
              this.realTimeMonitor[index].yield = Number(val.yield).toFixed(2)
            }
          })
        })
      }
    },
    //退洗-实时监控-停机检测
    async getRollStopDataType() {
      const res = await post(getRollStopType, {})
      if (res.success) {
        res.data.map(item => {
          item.is_recent == '1'
            ? (item.is_recent = true)
            : (item.is_recent = false)
        })
        this.realTimeMonitor.forEach((item, index) => {
          res.data.forEach(val => {
            if (item.productMonitor.slice(0, 1) === val.proLine) {
              this.realTimeMonitor[index].greenGreyFlag = val.is_recent
            }
          })
        })
      }
    },
    //质量情况
    async getQualityStatusData() {
      const res = await post(getQualityStatus, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypeQuality
      })
      if (res.success) {
        let xData = []
        let firstPassRatio = []
        let recheckPassRatio = []
        let recheckRewashRatio = []
        res.data.forEach(item => {
          xData.push(item.prodTime)
          firstPassRatio.push(item.firstPassRatio)
          recheckPassRatio.push(item.recheckPassRatio)
          recheckRewashRatio.push(item.recheckRewashRatio)
        })
        this.quaSitOption.xAxis[0].data = xData
        this.quaSitOption.series[0].data = firstPassRatio
        this.quaSitOption.series[1].data = recheckPassRatio
        this.quaSitOption.series[2].data = recheckRewashRatio

        this.quaSitOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //重点工艺合格率
    async getTxImportantProcessByTimeData() {
      const res = await post(getTxImportantProcessByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraKeyPro
      })
      if (res.success) {
        //板温合格率
        let proLineTemp1 = []
        let proLineTemp2 = []
        let proLineTemp3 = []
        let proLineTemp4 = []
        let xData = []
        res.data.forEach(item => {
          //1#
          proLineTemp1.push(Number(item.proLineTemp1).toFixed(2))
          //2#
          proLineTemp2.push(Number(item.proLineTemp2).toFixed(2))
          //3#
          proLineTemp3.push(Number(item.proLineTemp3).toFixed(2))
          //4#
          proLineTemp4.push(Number(item.proLineTemp4).toFixed(2))
          //x轴
          xData.push(item.accDate)
        })
        //酸温合格率
        let proLineSTemp1 = []
        let proLineSTemp2 = []
        let proLineSTemp3 = []
        let proLineSTemp4 = []
        res.data.forEach(item => {
          //1#
          proLineSTemp1.push(item.proLineSTemp1)
          //2#
          proLineSTemp2.push(item.proLineSTemp2)
          //3#
          proLineSTemp3.push(item.proLineSTemp3)
          //4#
          proLineSTemp4.push(item.proLineSTemp4)
        })
        //酸浓度合格率
        let proLineDensityTemp1 = []
        let proLineDensityTemp2 = []
        let proLineDensityTemp3 = []
        let proLineDensityTemp4 = []
        res.data.forEach(item => {
          //1#
          proLineDensityTemp1.push(item.proLineDensityTemp1)
          //2#
          proLineDensityTemp2.push(item.proLineDensityTemp2)
          //3#
          proLineDensityTemp3.push(item.proLineDensityTemp3)
          //4#
          proLineDensityTemp4.push(item.proLineDensityTemp4)
        })
        this.rollRateOption.xAxis[0].data = []
        this.rollRateOption.xAxis[0].data = xData
        switch (this.changeProParamValue) {
          case '1':
            this.rollRateOption.series[0].data = proLineTemp1
            this.rollRateOption.series[1].data = proLineTemp2
            this.rollRateOption.series[2].data = proLineTemp3
            this.rollRateOption.series[3].data = proLineTemp4
            break
          case '2':
            this.rollRateOption.series[0].data = proLineSTemp1
            this.rollRateOption.series[1].data = proLineSTemp2
            this.rollRateOption.series[2].data = proLineSTemp3
            this.rollRateOption.series[3].data = proLineSTemp4
            break
          case '3':
            this.rollRateOption.series[0].data = proLineDensityTemp1
            this.rollRateOption.series[1].data = proLineDensityTemp2
            this.rollRateOption.series[2].data = proLineDensityTemp3
            this.rollRateOption.series[3].data = proLineDensityTemp4
            break
        }
        this.rollRateOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 7) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //成品一级率
    clickTabEleFirstPro(params) {
      if (params === 'day') {
        this.flagOfEleDayFirstPro = true
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = false
      } else if (params === 'month') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = true
        this.flagOfEleYearFirstPro = false
      } else if (params === 'quarter') {
        this.flagOfEleDayFirstPro = false
        this.flagOfEleMonthFirstPro = false
        this.flagOfEleYearFirstPro = true
      }
      this.dateTypePraFirstPro = params
      this.getTxProdPassRatioByTimeData()
    },
    async getTxProdPassRatioByTimeData() {
      const res = await post(getTxProdPassRatioByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        proLine: this.selectFirstRateData.materialValue,
        dateType: this.dateTypePraFirstPro
      })
      if (res.success) {
        let xData = []
        let backList = []
        let lowerList = []
        let passRatioList = []
        res.data.forEach(item => {
          xData.push(item.prodTime)
          backList.push(item.backxi)
          lowerList.push(item.lower)
          passRatioList.push(item.passRatio)
        })
        this.outputStatOption1.xAxis[0].data = xData
        this.outputStatOption1.series[0].data = backList
        this.outputStatOption1.series[1].data = lowerList
        this.outputStatOption1.series[2].data = passRatioList
        this.outputStatOption1.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 20) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //吨钢消耗
    async getTxAvgEnergyByTimeData() {
      const res = await post(getTxAvgEnergyByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        proLine: this.avgEnergyData.materialValue
      })
      if (res.success) {
        // this.consumpTonSteelValue.ca = Number(res.data[0].ca).toFixed(2)
        // this.consumpTonSteelValue.ele = Number(res.data[0].ele).toFixed(2)
        this.consumpTonSteelValue.hf = Number(res.data[0].hf).toFixed(2)
        this.consumpTonSteelValue.lg = Number(res.data[0].lg).toFixed(2)
        this.consumpTonSteelValue.na = Number(res.data[0].na).toFixed(2)
        // this.consumpTonSteelValue.newWater = Number(
        //   res.data[0].newWater
        // ).toFixed(2)
        this.consumpTonSteelValue.s110 = Number(res.data[0].s110).toFixed(2)
        this.consumpTonSteelValue.sa = Number(res.data[0].sa).toFixed(2)
      }
    },
    //吨钢消耗：电、空气、新水消耗
    async getTxThreeEnergyByTimeData() {
      const res = await post(getTxThreeEnergyByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate
      })
      if (res.success) {
        this.consumpTonSteelValue.ca = Number(res.data[0].ca).toFixed(2)
        this.consumpTonSteelValue.ele = Number(res.data[0].ele).toFixed(2)
        this.consumpTonSteelValue.newWater = Number(
          res.data[0].newWater
        ).toFixed(2)

        //新加：蒸汽消耗、ARP尿素、石灰
        this.consumpTonSteelValue.zq = Number(res.data[0].zq).toFixed(2)
        this.consumpTonSteelValue.sh = Number(res.data[0].sh).toFixed(2)
        this.consumpTonSteelValue.ns = Number(res.data[0].ns).toFixed(2)
      }
    },
    //吨钢消耗(气)
    async getTxAvgEnergyOfEleByTimeData() {
      const res = await post(getTxAvgEnergyOfEleByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        proLine: this.avgEnergyData.materialValue,
        dateType: this.dateTypePraSteelPro
      })
      if (res.success) {
        let xData = []
        let eleList = []
        let lgList = []
        res.data.forEach(item => {
          xData.push(item.accDate)
          eleList.push(item.ele)
          lgList.push(Number(item.lg).toFixed(2))
        })
        this.consumpTonSteelOption.xAxis[0].data = xData
        // this.consumpTonSteelOption.series[0].data = eleList
        this.consumpTonSteelOption.series[1].data = lgList
        this.consumpTonSteelOption.dataZoom = [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: Math.max(0, ((xData.length - 30) / xData.length) * 100), // 计算起始位置, //0
            height: 20, //滑块高度设置
            bottom: 0, //缩放条显示在底部
            end: 100 // 初始显示前 5 条数据(5 / xData.length) * 100
          }
        ]
      }
    },
    //吨钢消耗(电)
    async getTxAvgEnergyTonEleByTimeData() {
      const res = await post(getTxAvgEnergyTonEleByTime, {
        startDate: this.times.startDate,
        endDate: this.times.endDate,
        dateType: this.dateTypePraSteelPro
      })
      if (res.success) {
        let eleList = []
        res.data.forEach(item => {
          eleList.push(Number(item.ele).toFixed(2))
        })
        this.consumpTonSteelOption.series[0].data = eleList
      }
    }
  }
}
</script>

<style>
/* 整体 tooltip 样式 */
.atooltip {
  background: #e0ebe1 !important;
  color: black !important; /* 设置 tooltip 文字颜色为黑色 */
}

/* 顶部放置的 tooltip 箭头样式 */
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow,
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::before {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
}

.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow {
  bottom: -8px; /* 调整箭头位置 */
  margin-left: -8px;
  border-width: 8px 8px 0 8px;
  border-top-color: #e0ebe1;
  z-index: 1;
}

.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::before {
  content: '';
  bottom: 1px;
  margin-left: -8px;
  border-width: 8px 8px 0 8px;
  border-top-color: #e0ebe1;
}

/* 去除原有的伪元素样式 */
.atooltip.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
  content: none;
}
</style>

<style scoped lang="less">
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
/deep/.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 31px;
}
.datePickerLable {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
}
.tagStyle {
  padding: 0 8px 0 8px;
  background-color: #ebf6ec;
  cursor: pointer;
  margin-left: 24px;
  .spanStyle {
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #000000;
  }
}
.tagStyleActive {
  padding: 0 8px 0 8px;
  background-color: #35a034;
  margin-left: 24px;
  .spanStyle {
    color: #ffffff;
  }
}
//--
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
/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #d5ddd5;
}
.selectSpan {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
}
//--------图表格
#mainCircular {
  //background-color: #8bc2ee;
  width: 100%;
  height: 300px;
  position: absolute;
  left: 5%;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
td {
  border-bottom: 1px solid #ccc;
  text-align: left;
}
.headTh {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
}
.textTd {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}
.textTdName {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  padding-left: 5px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}
.textTheam {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
  //line-height: 100%;
}
/* 新增表头背景颜色样式 */
th {
  background-color: #e0ebe1;
}
/* 新增偶数行背景颜色样式 */
tbody tr:nth-child(even) {
  background-color: #f5faf5;
}
.icon {
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 3px;
  margin-right: 5px;
  padding-top: 5px;
}
/*-----------------------热退酸洗----------------*/
//实时监控-绿色
.outerDiv {
  height: 320px;
  border: 1px solid #35a03b;
  border-radius: 5px;
  overflow: hidden;
  .headTitle {
    background-color: #35a03b;
    height: 45px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .headTitleText {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: floralwhite;
      vertical-align: middle;
    }
  }
  .outPutDiv {
    height: calc(100% - 45px);
    background-color: #f0faf0;
    //调整--start
    .outPutDivLine {
      background-color: #f0faf0;
      height: 50px;
      margin-left: 13px;
      display: flex;
      align-items: flex-end;
      .outPutDivLineOut {
        padding-right: 5px;
        .outPutCountStyle {
          font-family: Source Han Sans CN;
          font-weight: 700;
          font-size: 32px;
        }
      }
    }
    .outPutDivLineFont {
      height: 40px;
      margin-left: 13px;
      display: flex;
      align-items: flex-start;
      .fontSpan {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
    }
    .outPutDivLineBottom {
      height: 2px;
      .lineBottom {
        border-bottom: 1px solid #b5b5b5;
        width: 70%;
        margin-left: 13px;
      }
    }
    //调整--end
    .outPutDivNoLine {
      height: calc((100% - 2px) / 3);
      width: 77%;
      margin-left: 13px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
//实时监控-灰色
.outerDivGrey {
  height: 320px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  overflow: hidden;
  .headTitleGrey {
    background-color: #b5b5b5;
    height: 45px;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .headTitleText {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: floralwhite;
      vertical-align: middle;
    }
  }
  .outPutDivGrey {
    height: calc(100% - 45px);
    background-color: #f2f2f2;
    //调整--start
    .outPutDivLine {
      background-color: #f2f2f2;
      height: 50px;
      margin-left: 13px;
      display: flex;
      align-items: flex-end;
      .outPutDivLineOut {
        padding-right: 5px;
        .outPutCountStyle {
          font-family: Source Han Sans CN;
          font-weight: 700;
          font-size: 32px;
        }
      }
    }
    .outPutDivLineFont {
      height: 40px;
      margin-left: 13px;
      display: flex;
      align-items: flex-start;
      .fontSpan {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
    }
    .outPutDivLineBottom {
      height: 2px;
      .lineBottom {
        border-bottom: 1px solid #b5b5b5;
        width: 70%;
        margin-left: 13px;
      }
    }
    //调整--end
    .outPutDivNoLine {
      height: calc((100% - 2px) / 3);
      width: 77%;
      margin-left: 13px;
      display: flex;
      align-items: center;
      .outPutDivLineOut {
        margin-bottom: 10px;
        .realTimeOutput {
          position: relative;
          .realTimeOutputSpan {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
//--------------吨钢消耗样式start
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  //position: relative;
  width: 100%;
  //background-color: #7186a9;
  //background-image: url('@/assets/images/backWashProImages/tonSteelConsump.svg');
  //background-size: auto;
  //background-repeat: no-repeat;
  //background-position: center;
  max-width: 800px;
  height: 350px;
  margin-top: 20px;
  //display: flex;
  //justify-content: center;
  //align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.data-container {
  position: relative;
  background-image: url('@/assets/images/backWashProImages/tonSteelConsumpNew.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
}

.data-item {
  display: flex;
  text-align: left !important; /* 强制左对齐，覆盖原有对齐方式 */
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.data-value {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-label {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelFourth {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueOne {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueThree {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueLeft {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-valueLeftFive {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeft {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeftThree {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelLeftFive {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelSix {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelEnd {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
.data-labelEnding {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}

/* 数值+单位的外层容器：固定宽度+左对齐 */
.value-wrapper {
  display: inline-block; /* 确保宽度生效 */
  width: 140px; /* 根据实际数值最长长度调整（预留足够空间） */
  text-align: left; /* 强制左对齐 */
  padding-right: 10px; /* 与标签保持间距 */
}

.top-left {
  position: absolute;
  left: 8%;
  top: -4%;
}
.top-leftMenuCollapse {
  position: absolute;
  left: 8%;
  top: -6%;
}

.top-right {
  position: absolute;
  right: 1%;
  top: -7%;
}
.top-rightMenuCollapse {
  position: absolute;
  right: 1%;
  top: -9%;
}
.middle-left {
  position: absolute;
  left: 8%;
  top: 18%;
}

.middle-right {
  position: absolute;
  right: 1%;
  top: 11%;
}

.bottom-left {
  position: absolute;
  left: 8%;
  bottom: 50%;
}

.SteamConsump {
  position: absolute;
  left: 8%;
  bottom: 28%;
}

.ARPUrea {
  position: absolute;
  right: 1%;
  bottom: 42%;
}

.bottom-right {
  position: absolute;
  right: 1%;
  bottom: 60%;
}

.bottom-leftEnd {
  position: absolute;
  left: 8%;
  bottom: 7%;
}

.bottom-rightEnd {
  position: absolute;
  right: 1%;
  bottom: 24%;
}

.Lime {
  position: absolute;
  right: 1%;
  bottom: 6%;
}
.data-valueOneUnit {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
}
/* 局部样式：只影响添加了 custom-select-dropdown 类的下拉框 */
.custom-select-dropdown .el-select-dropdown__item {
  padding-left: 18px !important;
}
//----------------切换按钮---------------
//停时统计
.tagStyleSwitch {
  background-color: #ebf6ec;
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #000000;
  }
}
.tagStyleActiveSwitch {
  background-color: #35a034;
  width: 50px;
  text-align: center;
  margin-left: 3px;
  .spanStyleSwitch {
    color: #ffffff;
  }
}
/* 消除dialog内部卡片的默认margin/padding导致的间隙 */
::v-deep .el-dialog__body {
  padding: 0 !important; /* 移除对话框内容区默认内边距 */
  margin: 0 !important;
}

/* 确保卡片与对话框边缘无缝衔接 */
::v-deep .el-dialog .CardTable {
  border-radius: 0 !important; /* 可选：如需去除卡片圆角与对话框的间隙 */
  margin: 0 !important;
  border: none !important; /* 如卡片有边框可移除 */
}

/* 调整对话框样式 - 增加圆角并消除默认间隙 */
::v-deep .el-dialog {
  padding: 0 !important;
  border-radius: 8px !important; /* 设置四个角为圆角，数值可根据需要调整 */
  overflow: hidden; /* 防止内部内容溢出圆角范围 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; /* 添加阴影效果 */
}

/* 如需调整对话框头部和底部的圆角适配 */
::v-deep .el-dialog__header {
  border-radius: 8px 8px 0 0 !important; /* 仅顶部两角圆角 */
}

::v-deep .el-dialog__footer {
  border-radius: 0 0 8px 8px !important; /* 仅底部两角圆角 */
}
//使用图标路径引入
::v-deep .el-dialog__headerbtn .el-dialog__close {
  /* 移除默认图标 */
  font-size: 0 !important;

  /* 增大按钮容器尺寸（为图标提供更大空间） */
  width: 25px; /* 调大宽度 */
  height: 25px; /* 调大高度 */

  /* 控制图标大小：值越大图标越大（可超过100%） */
  background-size: 9px; /* 直接指定图标像素尺寸 */
  /* 或使用百分比：background-size: 80%; */

  /* 保持圆形边框（如果需要） */
  //border: 2px solid #e0e0e0;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 背景图方式引入图标 */
  //background: url('../../../../assets/images/coldRollingProcess/close.svg')
  //  no-repeat center;
  background: url('../../../../assets/images/coldRollingProcess/close.svg')
    no-repeat center;
  background-size: contain;
}
/*-----------------------新增-----------------------*/
/* 父容器：水平分布子元素 */
.stats-container {
  margin-top: 11px;
  display: flex;
  justify-content: center; /* 水平方向居中 */
  align-items: center; /* 垂直方向居中 */
  width: 100%; /* 占满父容器宽度 */
  border-top: 1px solid #ccc; /* 顶部边框 */
  border-bottom: 1px solid #ccc; /* 底部边框 */
}

/* 子项：平分宽度 + 边框分隔 */
.stats-item {
  display: flex;
  flex-direction: row; /* 关键：改为水平排列（默认就是row，也可以省略） */
  justify-content: center; /* 内部元素水平居中 */
  align-items: center; /* 内部元素垂直居中（对齐基线） */
  white-space: nowrap; /* 防止文本换行 */
  flex: 1; /* 三个子项平分父容器宽度 */
  padding: 10px;
  box-sizing: border-box; /* 避免 padding 撑大盒子 */
  border-right: 1px solid #ccc; /* 右侧边框（分隔子项） */
}

/* 去掉最后一个子项的右侧边框 */
.stats-item:last-child {
  border-right: none;
}

/* 标签样式：换行 + 间距 */
.stats-label {
  display: block;
  margin-bottom: 5px;
  margin-right: 5px;
}
/* 数值样式：加粗突出 */
.stats-value {
  font-weight: bold;
  margin-bottom: 5px;
}
.numValue {
  font-size: 20px; /* 增大字体 */
  font-weight: bold; /* 加粗字体 */
  color: #333;
}

ul {
  list-style-type: none;
  display: flex;
  padding: 0;
}

.liStyle {
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
