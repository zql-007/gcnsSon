import { path, pathMes, pathMo, pathMv } from '@/lib/system'
/*-------------------------------------南钢接口-------------------------------------------*/
export const getProductionLineAreaInfo =
  path + 'iom/iomPrecisionStandardController/getProductionLineAreaInfo.iom' //区域

export const getBusinessUnitInfo =
  path + 'iom/iomPrecisionStandardController/getBusinessUnitInfo.iom' // 事业部

export const getProductionLineInfo =
  path + 'iom/iomPrecisionStandardController/getProductionLineInfo.iom' //  产线
export const getProductionLineByDevice =
  path + 'iom/iomPrecisionStandardController/findDeviceByProductionLineID.iom' //  产线

export const getDutyDepartmentInfo =
  path + 'iom/iomPrecisionStandardController/getDutyDepartmentInfo.iom' // 责任部门

export const getDeviceInfo =
  path + 'iom/iomPrecisionStandardController/getDeviceInfo.iom' // 设备

//数据查询页面接口
export const exportCustomMItemDataWithLine =
  path +
  'iom/iomPrecisionManagementController/exportCustomMItemDataWithLine.iom' //按行导出

export const findManagementItemList =
  path + 'iom/iomPrecisionManagementController/findManagementItemList.iom'

export const findManagementItem =
  path + 'iom/iomPrecisionManagementController/findManagementItem.iom' // 数据查询接口

export const findAreaByLineID =
  path + 'iom/iomPrecisionStandardController/findAreaByLineID.iom' //根据产线查询区域

export const findDeviceByAreaID =
  path + 'iom/iomPrecisionStandardController/findDeviceByAreaID.iom' //根据区域查询设备

export const exportCustomMItemData =
  path + 'iom/iomPrecisionManagementController/exportCustomMItemData.iom' //自定义导出post接口

export const exportCustomMItemData1 =
  path + 'iom/iomPrecisionManagementController/exportCustomMItemData1.iom' //自定义导出get接口
//标准维护页面接口
export const findAllStanders =
  path + 'iom/iomPrecisionStandardController/findAllStanders.iom' // 标准维护数据查询接口，table表格获取数据
export const getStandardInfo =
  path + 'iom/iomPrecisionStandardController/getStandardInfo.iom' // 标准维护数据查询接口，table表格获取数据
export const getStandardUtilInfo =
  path + 'iom/iomPrecisionStandardController/getStandardUtilInfo.iom' // 标准维护标准值的单位
export const doUpdate = path + 'iom/iomPrecisionStandardController/doUpdate.iom' // 标准维护根据ID查询标准信息,status状态wei2删除单行数据
export const doDelete = path + 'iom/iomPrecisionStandardController/doDelete.iom' // 标准维护根据ID查询标准信息,status状态wei2删除单行数据
export const doSave = path + 'iom/iomPrecisionStandardController/doSave.iom' // 新增页面确定保存
export const exportData =
  path + 'iom/iomPrecisionStandardController/exportData.iom' //导出
export const importExcel =
  path + 'iom/iomPrecisionStandardController/importExcel.iom' //导入

//--------------------数据录入----------------------
export const iomPrecisionManagementController_doUpdateMItem =
  path + 'iom/iomPrecisionManagementController/doUpdateMItem.iom' //保存提交

export const iomPrecisionManagementController_doBatchSaveMItem =
  path + 'iom/iomPrecisionManagementController/doBatchSaveMItem.iom' //多条保存提交
//  趋势分析
export const iomPrecisionManagementController_trendAnalysis =
  path + 'iom/iomPrecisionManagementController/trendAnalysis.iom'

//打分页面
export const iomPrecisionManagementController_findMyMeasure =
  path + 'iom/iomPrecisionManagementController/findMyMeasure.iom'
export const iomPrecisionManagementController_findAllMeasurer =
  path + 'iom/iomPrecisionManagementController/findAllMeasurer.iom'
export const findHistoryByStandardID =
  path + 'iom/iomPrecisionManagementController/findHistoryByStandardID.iom' //根据标准ID查询历史记录

//漏项管理
export const iomPrecisionManagementController_forgetItemCheck =
  path + 'iom/iomPrecisionManagementController/forgetItemCheck.iom'
export const iomPrecisionManagementController_updateForgetMItem =
  path + 'iom/iomPrecisionManagementController/updateForgetMItem.iom' //保存提交
export const iomPrecisionManagementController_doBatchSaveForgetItem =
  path + 'iom/iomPrecisionManagementController/doBatchSaveForgetItem.iom' //多条保存提交
export const iomPrecisionManagementController_findPersonLiableList =
  path + 'iom/iomPrecisionManagementController/findPersonLiableList.iom' //查询责任人

// 测量方式
export const getMeasureTypeInfo =
  path + 'iom/iomPrecisionStandardController/getMeasureTypeInfo.iom'
// 再次录入
export const addNewItem =
  path + 'iom/iomPrecisionManagementController/addNewItem.iom'

//--------------------------------------------------------------------------------------------------------
//辅助点检

export const IomDevicePointController_getRealTimePointInfo =
  path + 'apm/devicePointController/getRealTimePointInfo.iom' //加热炉点检信息-表格

export const IomDevicePointController_getAlarmNumMain =
  path + 'apm/devicePointController/getAlarmNumMain.iom' //辅助点检总览-图片点击

export const IomDevicePointController_getAlarmTotalNumAndPointNum =
  path + 'apm/devicePointController/getAlarmTotalNumAndPointNum.iom' //辅助点检总览-加热炉区点检数量-今日报警

export const IomDevicePointController_getAlarmInfoByTimeAndAreaId =
  path + 'apm/devicePointController/getAlarmInfoByTimeAndAreaId.iom' //加热炉点检信息-报警信息

export const IomDevicePointController_getAlarmInfoBacktracking =
  path + 'apm/devicePointController/getAlarmInfoBacktracking.iom' //加热炉点检信息-双击获取曲线

export const IomDevicePointController_getAlarmTrendByAreaIdAndTime =
  path + 'apm/devicePointController/getAlarmTrendByAreaIdAndTime.iom' //加热炉点检信息-报警趋势图

export const IomDevicePointController_getPointValuesBetween =
  path + 'apm/devicePointController/getPointValuesBetween.iom' //加热炉点检信息-报警趋势图
export const IomDevicePointController_exprotExcel =
  path + 'apm/devicePointController/exprotExcel' //加热炉点检信息-导出

export const IomDevicePointController_getRealDataTemplate =
  path + 'apm/devicePointController/getRealDataTemplate.iom' //加热炉点检信息-表格固定左侧三列

export const devicePointController_selectDangerInfo =
  path + 'apm/devicePointController/selectDangerInfo.iom' //隐患上报

export const devicePointController_selectDictionaryInfo =
  path + 'apm/devicePointController/selectDictionaryInfo.iom' //隐患上报--专业类型-产线-隐患

export const devicePointController_saveDangerInfo =
  path + 'apm/devicePointController/saveDangerInfo.iom' //隐患上报--发送

export const devicePointController_getDangerHistoryPushInfoByTime =
  path + 'apm/devicePointController/getDangerHistoryPushInfoByTime.iom' //隐患上报--历史发送数据

export const devicePointController_exportDangerData =
  path + 'apm/devicePointController/exportDangerData.iom' //隐患上报--导出

/*----------------------------标准维护-----------------------------*/
export const findDeviceByDepartID =
  path + 'iom/iomPrecisionStandardController/findDeviceByDepartID.iom' //根据车间查询设备
export const findAllStandersWithNoPage =
  path + 'iom/iomPrecisionStandardController/findAllStandersWithNoPage.iom' //根据车间查询设备
export const getPersonSearchVoList =
  path + 'iom/iomPrecisionStandardController/getPersonSearchVoList.iom' //获取责任人
export const getProductionLineSearchVoList =
  path + 'iom/iomPrecisionStandardController/getProductionLineSearchVoList.iom' //获取产线
export const getProductionLineAreaSearchVoList =
  path +
  'iom/iomPrecisionStandardController/getProductionLineAreaSearchVoList.iom' //获取区域
export const getMeasureTypeSearchVoList =
  path + 'iom/iomPrecisionStandardController/getMeasureTypeSearchVoList.iom' //获取测量方式
export const getDutyDepartmentSearchVoList =
  path + 'iom/iomPrecisionStandardController/getDutyDepartmentSearchVoList.iom' //获取车间
export const getDeviceSearchVoList =
  path + 'iom/iomPrecisionStandardController/getDeviceSearchVoList.iom' //获取设备

/*----------------------------精度首页接口-----------------------------*/
export const precisionFirstPage =
  path + 'iom/iomPrecisionStandardController/precisionFirstPage.iom'
/*----------------------------责任人用户接口-----------------------------*/
export const userFindAllUser = path + 'res/user/findUserInSameOrgAndRole'
/*----------------------------查询标准中已有责任人人员信息-----------------------------*/
//标准维护
export const findPersonLiableNameList =
  path + 'iom/iomPrecisionStandardController/findPersonLiableNameList.iom'
//数据录入
export const findLiablePersonByNameOrNo =
  path + 'iom/iomPrecisionStandardController/findLiablePersonByNameOrNo.iom'
