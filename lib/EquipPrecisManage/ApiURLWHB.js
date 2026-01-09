import { path, pathMv } from '@/lib/system'
/*通用接口*/
/*区域级设备级实时数据*/
export const realTimeDataController_getRealTimeData =
  path + '/dsm/realTimeDataController/getRealTimeData.dsm'
/*分部设备实时数据接口*/
export const realTimeDataController_getDesDeviceData =
  path + '/dsm/realTimeDataController/getDesDeviceData.dsm'

/*设备树 图片上传*/
export const minio_upload = path + '/dsm/minio/upload.dsm'
/*设备树 图片查看*/
export const minio_findPicByCode = path + '/dsm/minio/findPicByCode.dsm'
/*通用设备页面 预警明细*/
export const alarmAboutController_getCurrentLevelAlarmInfo =
  path + '/dsm/alarmAboutController/getCurrentLevelAlarmInfo.dsm'
/*总览 预警明细导出*/
export const alarmAboutController_getCurrentLevelAlarmInfoAll =
  path + '/dsm/alarmAboutController/getCurrentLevelAlarmEventInfo.dsm'
/*通用设备页面 预警明细导出*/
export const commonController_alarmInfoBatchImport =
  path + '/dsm/commonController/alarmInfoBatchImport.dsm'
/*通用设备页面 实时数据接口*/
export const realTimeDataController_getRealTimeDataDetail =
  path + '/dsm/realTimeDataController/getRealTimeDataDetail.dsm'
// /*通用设备页面 实时参数曲线图趋势图*/
// export const realTimeDataController_getRealTimeDataTrend =
//   path + '/dsm/realTimeDataController/getRealTimeDataTrend.dsm'
/*通用设备页面 分部设备备状态查询*/
export const commonController_coreDeviceStatus =
  path + '/dsm/commonController/coreDeviceStatus.dsm'
/*通用设备页面 分部设备备状态查询 所有*/
export const commonController_getPartCodeByDeviceCode =
  path + '/dsm/commonController/getPartCodeByDeviceCode.dsm'
/*根据编码查询设备信息及所有父级信息*/
export const commonController_getParentCodeByChildCode =
  path + '/dsm/commonController/getParentCodeByChildCode.dsm'

/*报警阈值配置 查询列表接口*/
export const commonController_selectPointAndLimit =
  path + '/dsm/commonController/selectPointAndLimit.dsm'
/*加热炉区*/

//加热炉区总览 图片上数据
export const devicePointController_getAreaDataInfo =
  path + '/hfm/hfmPointController/getAreaDataInfo.hfm'
// export const devicePointController_getAreaDataInfo =
//   'dsm/realTimeDataController/getAreaDataInfo.dsm'
//加热炉区总览-加热炉 图片上数据
// export const devicePointController_getDevicePartInfo =
//   'hfm/hfmPointController/getDevicePartInfo.hfm'
export const devicePointController_getDevicePartInfo =
  path + '/dsm/realTimeDataController/getDevicePartInfo.dsm'
//加热炉区总览-热工设备总览
export const devicePointController_getPartviewInfo =
  path + '/dsm/realTimeDataController/getPartOverviewInfo.dsm'
//加热炉设备部件实时数据详情
export const hfmPointController_getPartOverviewDetailInfo =
  path + '/dsm/realTimeDataController/getPartOverviewDetailInfo.dsm'
//宽板总览 查询值班人员
export const alarmAboutController_dutyUserInfo =
  path + '/hfm/alarmAboutController/dutyUserInfo.hfm'

/*宽厚板厂picture 方框数据，轧区总览方框数据*/
export const dsm_deviceTestingController_getAreaAndFactoryInfo =
  /* 'dsm/realTimeDataController/getAreaAndFactoryInfo.dsm'*/
  path + '/dsm/realTimeDataController/getFactoryDataInfo.dsm' //场级区域级别 //picture上方框数据
export const dsm_deviceTestingController_getDevicePartInfo =
  path + '/dsm/realTimeDataController/getDevicePartInfo.dsm' //设备级别 //picture上方框数据
export const dsm_realTimeDataController_getAreaDataInfo =
  path + '/dsm/realTimeDataController/getAreaDataInfo.dsm' //区域级别 //picture上方框数据

/*所有总览预警明细 */
// export const deviceTestingController_getCurrentLevelAlarmInfo =
//   'dsm/alarmAboutController/getCurrentLevelAlarmInfo.dsm' //预警明细
export const deviceTestingController_getCurrentLevelAlarmInfo =
  path + '/hfm/alarmAboutController/getCurrentLevelAlarmInfo.hfm' //预警明细

/*区域选择 --下拉框 */
export const deviceTestingController_deviceTree =
  path + '/dsm/commonController/deviceTree.dsm' //区域选择 --下拉框
/*根据区域和专业查询设备和零部件 选择 --下拉框 */
export const deviceTestingController_getPartLevelByTreeAndType =
  path + '/dsm/commonController/getPartLevelByTreeAndType.dsm'
/*专业选择 --下拉框 */
export const deviceTestingController_getProfessType =
  path + '/dsm/commonController/getProfessType.dsm'
/*picture 上数据--监测点数作业率 */
export const deviceTestingController_getMainInfo =
  path + '/dsm/commonController/getMainInfo.dsm' //监测点数作业率

// /*健康度评价 */
export const deviceTestingController_getHealthScore =
  path + '/dsm/alarmAboutController/getHealthScore.dsm' //健康度评价

// /*健康度趋势图 */
export const deviceTestingController_getHealthTrend =
  path + '/hfm/alarmAboutController/getHealthTrend.hfm' //健康度趋势图//

// 预警处理情况 */
export const deviceTestingController_getAlarmHandleCase =
  path + '/dsm/alarmAboutController/getAlarmHandleCase.dsm' //预警处理情况

// 在线监测 */
export const alarmAboutController_getAlarmNums =
  path + '/dsm/alarmAboutController/getAlarmNums.dsm' //在线监测

// 在线监测每个区域状态 */
export const dsm_sseController_areaStatus_0 =
  path + '/dsm/sseController/areaStatus/0' //在线监测

// 时间分布 */
export const commonController_getTimeDistributed =
  path + '/dsm/commonController/getTimeDistributed.dsm' //时间分布
// 时间分布new */
export const commonController_findDelayNumAndHourToBC =
  path + '/dsm/commonController/findDelayNumAndHourToBC.dsm' //时间分布
export const commonController_findDataNumtoBC =
  path + '/dsm/commonController/findDataNumtoBC.dsm' //时间分布
export const commonController_findDataNumtoBk =
  path + '/dsm/commonController/findDelayRecordForBk.dsm' //时间分布(中板厂、中厚板卷厂)

/*零部件总览--电机状态总览/水气设备总览/液压缸总览*/
export const realTimeDataController_getPartviewInfo =
  path + '/dsm/realTimeDataController/getPartOverviewInfo.dsm' //零部件总览--电机状态总览/水气设备总览/液压缸总览

// /*电机总览-数字评价-实时参数*/
// /*水汽类设备页面*/
export const realTimeDataController_getSinglePartInfo =
  path + '/dsm/realTimeDataController/getSinglePartInfo.dsm' //水汽类设备页面--中间坯数据//

// /*水汽类-数字评价---趋势曲线  电机-趋势分析-电流曲线图*/
export const realTimeDataController_getRealTimeDataTrend =
  path + '/dsm/realTimeDataController/getRealTimeDataTrend.dsm' //水汽类设备页面--趋势曲线，电机-趋势分析-电流曲线图

// /*电机总览-数字评价-铭牌数据*/
export const commonController_getPlateInfo =
  path + '/dsm/commonController/getPlateInfo.dsm'
// /*电机总览-数字评价-铭牌数据 【新】*/
export const equipmentInspectionController_equipmentNameplateInfo =
  path + '/hfm/equipmentInspectionController/equipmentNameplateInfo.hfm'

// /*电机总览-数字评价-备件编号*/
export const commonController_getSpareInfo =
  path + '/dsm/commonController/getSpareInfo.dsm'
// /*电机总览-数字评价-备件编号 【新】*/
export const equipmentInspectionController_equipmentNumberInfo =
  path + '/hfm/equipmentInspectionController/equipmentNumberInfo.hfm'

// /*电机总览-服役信息-设备信息查询接口*/
export const equipmentInspectionController_equipmentInfo =
  path + '/hfm/equipmentInspectionController/equipmentInfo.hfm'
// /*电机总览-服役信息-设备故障信息查询接口*/
export const equipmentInspectionController_equipmentFaultInfo =
  path + '/hfm/equipmentInspectionController/equipmentFaultInfo.hfm'
// /*电机总览-服役信息-设备检修信息查询接口*/
export const equipmentInspectionController_equipmentRepairInfo =
  path + '/hfm/equipmentInspectionController/equipmentRepairInfo.hfm'
// /*电机总览-服役信息-设备维保信息查询接口*/
export const equipmentInspectionController_equipmentMaintenanceInfo =
  path + '/hfm/equipmentInspectionController/equipmentMaintenanceInfo.hfm'

// /*液压站-液压设备状态*/
export const realTimeDataController_getDevicesStatus =
  path + '/dsm/realTimeDataController/getDevicesStatus.dsm' //液压站-液压设备状态//

// /*轧区液压缸-最值*/
/*实时获取某个iot点位一段时间的平均值、最大值、最小值*/
/*电机--趋势分析--最值*/
export const realTimeDataController_getStatisticsInfo =
  path + '/dsm/realTimeDataController/getStatisticsInfo.dsm' //轧区液压缸-最值，实时获取某个iot点位一段时间的平均值、最大值、最小值// /*轧区液压缸-最值*/
/*电机-算法模型-电机效率曲线图*/
export const commonController_getModelResultByPartCode =
  path + '/dsm/commonController/getModelResultByPartCode.dsm'
/*电机-算法模型-曲线规则曲线图*/
export const commonController_getRuleCurveData =
  path + '/dsm/commonController/getRuleCurveData.dsm'
/*趋势分析-查询pdfurl*/
export const commonController_equipMentAnalysisPdf =
  path + '/dsm/commonController/equipMentAnalysisPdf.dsm'
/*电机-故障诊断*/
// export const alarmAboutController_errorDiagnose =
//   'dsm/alarmAboutController/errorDiagnose.dsm' //电机-故障诊断
export const alarmAboutController_errorDiagnose =
  path + '/hfm/alarmAboutController/errorDiagnose.hfm' //电机-故障诊断
// /*电机-趋势分析*/
export const commonController_getTrendPoints =
  path + '/dsm/commonController/getTrendPoints.dsm' //电机-趋势分析-曲线图
// 电机-趋势分析-点检记录 */
export const equipmentInspectionController_checkRecordInfo =
  path + '/hfm/equipmentInspectionController/checkRecordInfo.hfm' //在线监测
//阈值配置页面查询所有数据
export const commonController_findAllAlarmConfig =
  path + '/dsm/commonController/findAllAlarmConfig.dsm'
//根据部件查询部件下所有点位信息
export const commonController_findPointsBYPart =
  path + '/dsm/commonController/findPointsBYPart.dsm'
//保存单个阈值配置对象接口
export const commonController_saveSingleAlarmLimitInfo =
  path + '/dsm/commonController/saveSingleAlarmLimitInfo.dsm'
//删除单个阈值配置对象接口
export const commonController_deleteAlarmConfig =
  path + '/dsm/commonController/deleteAlarmConfig.dsm'

//报警阈值配置 表格模板导出
export const commonController_downloadTemplate =
  path + '/dsm/commonController/downloadTemplate.dsm'
//报警阈值配置 表格数据下载
export const commonController_alarmThBatchImport =
  path + '/dsm/commonController/alarmThBatchImport.dsm'
//报警阈值配置 表格导入
export const commonController_fileUpload =
  path + '/dsm/commonController/fileUpload.dsm'
//设备树配置 设备树查询
export const commonController_getDeviceTree =
  path + '/dsm/commonController/getDeviceTree.dsm'
//设备树配置 设备树查询【新】
export const commonController_getDeviceTreeNew =
  path + '/dsm/commonController/getDeviceTreeNew.dsm'
//设备树设备新增修改【新】
export const commonController_updateDeviceTree =
  path + '/dsm/commonController/updateDeviceTree.dsm'
//设备树设备删除【新】
export const commonController_deleteTreeNode =
  path + '/dsm/commonController/deleteTreeNode.dsm'
//设备树菜单新增
export const commonController_addMenu =
  path + '/dsm/commonController/addMenu.dsm'
//设备树菜单删除
export const commonController_deleteMenu =
  path + '/dsm/commonController/deleteMenu.dsm'

//设备树配置 根据设备查询已绑定点位
export const commonController_findPoints =
  path + '/dsm/commonController/findPoints.dsm'
//设备树配置 添加、修改已绑定点位
export const commonController_addPoint =
  path + '/dsm/commonController/addPoint.dsm'
//设备树配置 删除已绑定点位
export const commonController_deletePointInfo =
  path + '/dsm/commonController/deletePointInfo.dsm'
//设备树配置 查询点位阈值配置
export const commonController_getAlarmConfigByPointId =
  path + '/dsm/commonController/getAlarmConfigByPointId.dsm'
//设备树配置 添加、修改设备
export const commonController_addDevice =
  path + '/dsm/commonController/addDevice.dsm'
//设备树配置 删除设备
export const commonController_deleteDeviceById =
  path + '/dsm/commonController/deleteDeviceById.dsm'
//设备树配置 添加、修改部件
export const commonController_addPart =
  path + '/dsm/commonController/addPart.dsm'
//设备树配置 删除部件
export const commonController_deletePartById =
  path + '/dsm/commonController/deletePartById.dsm'
//趋势分析 表格数据下载
export const commonController_equipMentAnalysisDoc =
  path + '/dsm/commonController/equipMentAnalysisDoc.dsm'

//设备树配置 根据设备查询已绑定算法模型
export const commonController_findAlgorithm =
  path + '/dsm/commonController/findAlgorithm.dsm'
//设备树配置 添加、修改已绑定算法模型
export const commonController_addAlgorithm =
  path + '/dsm/commonController/addAlgorithm.dsm'
//设备树配置 删除已绑定算法模型
export const commonController_deleteAlgorithmInfo =
  path + '/dsm/commonController/deleteAlgorithmInfo.dsm'
//设备点检-扭矩查询
export const spotCheckController_getTorqueOverRunInfo =
  path + '/hfm/spotCheckController/getTorqueOverRunInfo.hfm'
//设备点检-扭矩详情查询
export const spotCheckController_getTorqueOverRunDetail =
  path + '/hfm/spotCheckController/getTorqueOverRunDetail.hfm'
//设备点检-扭矩导出
export const spotCheckController_exportTorqueOverRunInfo =
  path + '/hfm/spotCheckController/exportTorqueOverRunInfo.hfm'
//设备点检-水箱标定查询
export const spotCheckController_getWaterTankCalibrationInfo =
  path + '/hfm/spotCheckController/getWaterTankCalibrationInfo.hfm'
//设备点检-水箱标定导出
export const spotCheckController_exportWaterTankCalibrationInfo =
  path + '/hfm/spotCheckController/exportWaterTankCalibrationInfo.hfm'
//设备点检-水箱查询
export const spotCheckController_getWaterTankInfo1 =
  path + '/hfm/spotCheckController/getWaterTankInfo1.hfm'
//设备点检-水箱导出
export const spotCheckController_exportWaterTankInfo1 =
  path + '/hfm/spotCheckController/exportWaterTankInfo1.hfm'
//设备点检-水箱查询
export const spotCheckController_getWaterTankInfo2 =
  path + '/hfm/spotCheckController/getWaterTankInfo2.hfm'
//设备点检-水箱导出
export const spotCheckController_exportWaterTankInfo2 =
  path + '/hfm/spotCheckController/exportWaterTankInfo2.hfm'
//健康度配置-查询
export const alarmAboutController_getHealthConfig =
  path + '/hfm/alarmAboutController/getHealthConfig.hfm'
//设备子集健康度查询
export const alarmAboutController_queryChildHealthConfig =
  path + '/hfm/alarmAboutController/queryChildHealthConfig.hfm'
//设备子集健康度趋势查询
export const alarmAboutController_getChildHealthTrend =
  path + '/hfm/alarmAboutController/getChildHealthTrend.hfm'
//健康度配置-新增修改
export const alarmAboutController_saveHealthConfig =
  path + '/hfm/alarmAboutController/saveHealthConfig.hfm'
//健康度配置-删除
export const alarmAboutController_deleteHealthConfig =
  path + '/hfm/alarmAboutController/deleteHealthConfig.hfm'
//健康度配置-查询健康度
export const alarmAboutController_calculateHealthConfig =
  path + '/hfm/alarmAboutController/calculateHealthConfig.hfm'
//健康度查询【新】
export const alarmAboutController_queryHealthConfig =
  path + '/hfm/alarmAboutController/queryHealthConfig.hfm'
//报警明细-查询 单条
export const commonController_getAlarmInfoById =
  path + '/dsm/commonController/getAlarmInfoById.dsm'
//报警明细-查询规则 单条
export const commonController_getAlarmRuleInfoById =
  path + '/dsm/commonController/getAlarmRuleInfoById.dsm'
//报警明细-处理
export const alarmAboutController_alarmHandle =
  path + '/hfm/alarmAboutController/alarmHandle.hfm'
//报警明细-审批
export const alarmAboutController_alarmApprove =
  path + '/hfm/alarmAboutController/alarmApprove.hfm'
//报警管理
export const alarmAboutController_alarmManagement =
  path + '/dsm/alarmAboutController/alarmManagement.dsm'
//工艺精度评价报警查询
export const iomPdpaAlarmInfo_findAll =
  path + '/iom/IomPdpaAlarmInfo/findAll.iom'
//根据编码查询子集设备
export const commonController_getDeviceChildTree =
  path + '/dsm/commonController/getDeviceChildTree.dsm'
//备件更换查询
export const sparePartController_querySparePartChangeInfo =
  path + '/hfm/sparePartController/querySparePartChangeInfo.hfm'
//分布设备 算法结果
export const commonController_getPythonAlgorithmResult =
  path + '/dsm/commonController/getPythonAlgorithmResult.dsm'
//备件更换 新增 修改
export const sparePartController_saveSparePartChangeInfo =
  path + '/hfm/sparePartController/saveSparePartChangeInfo.hfm'
//备件更换记录查询
export const sparePartController_querySparePartChangeRecord =
  path + '/hfm/sparePartController/querySparePartChangeRecord.hfm'
//备件删除记录（虽然叫info但其实是记录
export const sparePartController_deleteSparePartChangeInfo =
  path + '/hfm/sparePartController/deleteSparePartChangeInfo.hfm'
//备件更换记录 新增 修改
export const sparePartController_saveSparePartChangeRecord =
  path + '/hfm/sparePartController/saveSparePartChangeRecord.hfm'

//通用设备页面 包机人查询
export const commonController_getDeviceInfoByCode =
  path + '/dsm/commonController/getDeviceInfoByCode.dsm'
//报警规则列表查询接口
export const idm_ruleEngine_findByCondition =
  path + '/idm/ruleEngine/findByCondition.idm'
//删除报警规则接口
export const idm_ruleEngine_delById = path + '/idm/ruleEngine/delById.idm'
//专业总览接口
export const hfmPointController_getPartOverviewInfo =
  path + '/hfm/hfmPointController/getPartOverviewInfo.hfm'
//厂级、区域总览页面右上角区域、设备状态
export const alarmAboutController_areaStatus =
  path + '/dsm/alarmAboutController/areaStatus.dsm'

//模型查询接口
export const commonController_modelList =
  path + '/dsm/commonController/modelList.dsm'
//模型新增修改接口
export const commonController_modelDeviceRelationSaveOrUpdate =
  path + '/dsm/commonController/modelDeviceRelationSaveOrUpdate.dsm'
//模型删除接口
export const commonController_modelDeviceRelationDelete =
  path + '/dsm/commonController/modelDeviceRelationDelete.dsm'
//设备已关联模型查询接口
export const commonController_modelDeviceRelationList =
  path + '/dsm/commonController/modelDeviceRelationList.dsm'
//设备逻辑报警规则模型查询
export const commonController_alarmConfigParaList =
  path + '/dsm/commonController/alarmConfigParaList.dsm'
//设备逻辑报警规则查询
export const commonController_combineAlarmConfigList =
  path + '/dsm/commonController/combineAlarmConfigList.dsm'
//设备逻辑报警规则新增 修改
export const commonController_combineAlarmConfigSave =
  path + '/dsm/commonController/combineAlarmConfigSave.dsm'
//设备逻辑报警规则删除
export const commonController_combineAlarmConfigDelete =
  path + '/dsm/commonController/combineAlarmConfigDelete.dsm'
//设备曲线规则模型查询
export const commonController_ruleCurveModelList =
  path + '/dsm/commonController/ruleCurveModelList.dsm'
//设备曲线规则查询
export const commonController_combineRuleCurveList =
  path + '/dsm/commonController/combineRuleCurveList.dsm'
//设备曲线规则新增 修改
export const commonController_combineRuleCurveSave =
  path + '/dsm/commonController/combineRuleCurveSave.dsm'
//设备曲线规则删除
export const commonController_combineRuleCurveDelete =
  path + '/dsm/commonController/combineRuleCurveDelete.dsm'

//--------sse----------------------
//查询宽板总览图片上表格数据
export const sseController_factory = path + '/dsm/sseController/factory'
export const sseController_getFactory =
  path + '/dsm/sseController/getFactory.dsm'

//查询用户
export const user_findAllUser = path + '/res/user/findAllUser'
//设备包机人配置 报警推送人员配置 新增/修改
export const commonController_alarmPushRoleSave =
  path + '/dsm/commonController/alarmPushRoleSave.dsm'
//设备包机人配置 报警推送人员配置 删除
export const commonController_alarmPushRoleDelete =
  path + '/dsm/commonController/alarmPushRoleDelete.dsm'
//设备包机人配置 报警推送人员配置查询接口
export const commonController_alarmPushRoleList =
  path + '/dsm/commonController/alarmPushRoleList.dsm'

//报警信息按角色推送
export const commonController_setMessageToRolesDuBan =
  path + '/dsm/commonController/setMessageToRolesDuBan.dsm'

//备用设备 查询
export const standbyDeviceController_getStandbyDeviceInfo =
  path + '/hfm/standbyDeviceController/getStandbyDeviceInfo.hfm'
//备用设备 新增
export const standbyDeviceController_insertStandbyDeviceInfo =
  path + '/hfm/standbyDeviceController/insertStandbyDeviceInfo.hfm'
//备用设备 修改
export const standbyDeviceController_updateStandbyDevice =
  path + '/hfm/standbyDeviceController/updateStandbyDevice.hfm'
//备用设备 删除
export const standbyDeviceController_deleteStandbyDevice =
  path + '/hfm/standbyDeviceController/deleteStandbyDevice.hfm'
//备用设备  查询单个设备历史上线下线时间
export const standbyDeviceController_getStandbyDeviceHistoricalTimeInfo =
  path + '/hfm/standbyDeviceController/getStandbyDeviceHistoricalTimeInfo.hfm'
//备用设备  删除单个设备历史上线下线时间
export const standbyDeviceController_deleteStandbyDeviceHistoricalTimeInfo =
  path +
  '/hfm/standbyDeviceController/deleteStandbyDeviceHistoricalTimeInfo.hfm'
//设备报警状态判断
export const alarmAboutController_judgeDeviceState =
  path + '/dsm/alarmAboutController/judgeDeviceState.dsm'
//烧嘴异常
export const BurnerMonitor_getBurnerMonitorInfo =
  path + '/hfm/BurnerMonitor/getBurnerMonitorInfo.hfm'
//烧嘴完整率
export const BurnerMonitor_getBurnerAvailability =
  path + '/hfm/BurnerMonitor/getBurnerAvailability.hfm'
//烧嘴故障平均数
export const BurnerMonitor_getMonthBurnerDataCount =
  path + '/hfm/BurnerMonitor/getMonthBurnerDataCount.hfm'
//烧嘴导出
export const commonController_burnerMonitorInfoImport =
  path + '/dsm/commonController/burnerMonitorInfoImport.dsm'
//烧嘴表格导入
export const BurnerMonitor_importPoint = path + '/hfm/BurnerMonitor/importPoint'
//查询振动监测报警
export const VBTAlertInfo_findAlertListWithOuterCode =
  pathMv + '/VBTAlertInfo/findAlertListWithOuterCode.vbt'
//查询急停按钮状态
// export const EmergencyStoreKit_getStandbyDeviceInfo =
//   path + '/hfm/EmergencyStoreKit/getStandbyDeviceInfo.hfm'
export const EmergencyStoreKit_getStandbyDeviceInfo =
  'api/dsm/generalController/listEmoInfo.dsm'
//在线履历
export const equipMechanicalFrequencyController_findOnlineResumeInquiry =
  path + '/ddm/equipMechanicalFrequencyController/findOnlineResumeInquiry.ddm'
export const equipMechanicalFrequencyController_findOnlineResumeInquiryTwo =
  path +
  '/ddm/equipMechanicalFrequencyController/findOnlineResumeInquiryTwo.ddm'
//备用设备
export const millUpdateHis_getHisList =
  path + '/hfm/millUpdateHis/getHisList.hfm'
//根据规则id查询规则曲线
export const commonController_getRuleCurveDataByIds =
  path + '/dsm/commonController/getRuleCurveDataByIds.dsm'
//根据规则id查询算法模型曲线
export const commonController_getModelResultDataByIds =
  path + '/dsm/commonController/getModelResultDataByIds.dsm'

//查询智慧桌面角色
export const findAllRole = '/api/res/role/findAllRole'
//角色配置 新增/修改
export const commonController_roleSave =
  path + '/dsm/commonController/roleSave.dsm'
//角色配置 删除
export const commonController_roleDelete =
  path + '/dsm/commonController/roleDelete.dsm'
//角色配置 查询接口
export const commonController_roleList =
  path + '/dsm/commonController/roleList.dsm'

//液压/润滑 查询液压润滑站状态
export const alarmAboutController_getHydraulicLubricationState =
  path + '/dsm/alarmAboutController/getHydraulicLubricationState.dsm'
//液压/润滑 查询液压润滑站报警数量
export const alarmAboutController_getHydraulicLubricationAlarmInfo =
  path + '/dsm/alarmAboutController/getHydraulicLubricationAlarmInfo.dsm'
//液压/润滑 隐患明细
export const findDangerInfo =
  path + '/ddm/equipDangerController/findDangerInfo.ddm'
//水系统监测 查询
export const realTimeDataController_getWaterSystemRealTimeData =
  path + '/dsm/realTimeDataController/getWaterSystemRealTimeData.dsm'
//汽化水质检测报表
export const getVaporizedWaterQualityInfo =
  path + '/dsm/waterQuality/getVaporizedWaterQualityInfo.dsm'
//汽化水质检测标准
export const getVaporizedWaterStandard =
  path + '/dsm/waterQuality/getVaporizedWaterStandard.dsm'
//水质监测 设备树查询 新
export const waterQuality_getWaterQualityTree =
  path + '/dsm/waterQuality/getWaterQualityTree.dsm'
//水质监测 查询 新
export const waterQuality_getWaterQualityInfoNew =
  path + '/dsm/waterQuality/getWaterQualityInfoNew.dsm'
//水质监测 标准维护 保存 新
export const waterQuality_saveWaterQualityMonitor =
  path + '/dsm/waterQuality/saveWaterQualityMonitor.dsm'
//水质监测 标准维护 删除 新
export const waterQuality_deleteWaterQualityMonitor =
  path + '/dsm/waterQuality/deleteWaterQualityMonitor.dsm'

//水质监测 查询
export const waterQuality_getWaterQualityInfo =
  path + '/dsm/waterQuality/getWaterQualityInfo.dsm'
//水质监测 图片上传
export const waterQuality_addPicture = path + '/dsm/waterQuality/addPicture.dsm'
//水质监测 图片查询
export const waterQuality_getPictureInfo =
  path + '/dsm/waterQuality/getPictureInfo.dsm'
//水质监测 图片删除
export const waterQuality_deletePicture =
  path + '/dsm/waterQuality/deletePicture.dsm'
//水质监测 数据录入
export const waterQuality_addWaterQualityValue =
  path + '/dsm/waterQuality/addWaterQualityValue.dsm'
//水质监测 查询历史趋势
export const waterQuality_getWaterQualityValueHistory =
  path + '/dsm/waterQuality/getWaterQualityValueHistory.dsm'

//机器人监测 机器人分布 查询
export const alarmAboutController_getRobotDistribution =
  path + '/dsm/alarmAboutController/getRobotDistribution.dsm'
//机器人监测 报警明细 查询
export const alarmAboutController_getRobotDistributionAlarmInfo =
  path + '/dsm/alarmAboutController/getRobotDistributionAlarmInfo.dsm'
//机器人监测 报警处理情况 查询
export const alarmAboutController_getRobotDistributionAlarmHandleCase =
  path + '/dsm/alarmAboutController/getRobotDistributionAlarmHandleCase.dsm'
//机器人监测 机器人列表 查询
export const alarmAboutController_getRobotDistributionList =
  path + '/dsm/alarmAboutController/getRobotDistributionList.dsm'
//设备精度 根据设备名称查询
export const iomPrecisionManagementController_findManagementItemListByDeviceName =
  path +
  '/iom/iomPrecisionManagementController/findManagementItemListByDeviceName.iom'
// 模型检测 查询接口
export const commonController_getPythonAlgorithmResultTrend =
  path + '/dsm/commonController/getPythonAlgorithmResultTrend.dsm'
// 模型检测 报警明细查询接口
export const commonController_getPythonAlgorithmResultAlarmInfo =
  path + '/dsm/commonController/getPythonAlgorithmResultAlarmInfo.dsm'

// -------------------主传扭矩详情接口-----------
export const findAllTorqueInfo = path + '/iom/IomData/findAllTorqueInfo.iom'

//加热炉烧嘴异常监测
export const FurnaceMonitor_getBurnerMonitorInfo =
  path + '/hfm/FurnaceMonitor/getBurnerMonitorInfo.hfm'

export const FurnaceMonitor_getMonthBurnerDataCount =
  path + '/hfm/FurnaceMonitor/getMonthBurnerDataCount.hfm'

//加热炉烧嘴异常监测
export const FurnaceMonitor_getLeaveData =
  path + '/hfm/FurnaceMonitor/getLeaveData.hfm'

//轧机伺服阀数据
export const rollingMillServoValvesData =
  path +
  '/dsm/equipStateAnalysisstandardDataController/getEquipStateAnalysisstandardData.dsm'
//轧机伺服阀修改
export const rollingMillServoValvesRevise =
  path +
  '/dsm/equipStateAnalysisstandardDataController/saveEquipStateAnalysisstandardData.dsm'
//轧机伺服阀修改
export const rollingMillServoValvesCurve =
  path +
  '/dsm/equipStateAnalysisstandardDataController/getEquipStateAnalysisstandardCurve.dsm'

//自动切换统计
//中包车切换状态
export const toggleState = path + '/iom/LiquidControlModeDairy/findNow.iom'
//中包车切换状态记录
export const switchesNum = path + '/iom/LiquidControlModeDairy/findTime.iom'
//中包车切换状态
export const timePeriodCurve =
  path + '/iom/LiquidControlModeDairy/findCurve.iom'
