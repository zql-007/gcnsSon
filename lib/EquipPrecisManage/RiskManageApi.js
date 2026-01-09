const path = 'ddm'
const path2 = 'res'
const path3 = '/api/'
const path4 = 'res/'

//设备隐患管理-信息管理-历史隐患信息，处理完成后调智能桌面接口
export const hiddenDangerUpdate = path4 + 'HiddenDanger/update'
/*-------------隐患信息填报-------------*/
export const batchAdd = path3 + path + '/equipDangerController/batchAdd.ddm' //设备隐患批量新增
export const deleteOne = path3 + path + '/equipDangerController/deleteOne.ddm' //设备隐患删除
export const uploadFile =
  path3 + path + '/equipDangerController/uploadEquipDanger.ddm' //导入隐患文件信息

/*隐患跟踪统计表数据-事业部级别*/
export const queryAllDangerInfo =
  path3 + path + '/equipDangerController/dangerTrackingStatistics.ddm'
/*隐患未处理数据-事业部级别*/
export const queryNotDealDangerInfo =
  path3 + path + '/equipDangerController/unprocessedDangerStatistics.ddm'
/*隐患故障分布数据-事业部级别*/
export const queryAllDangerSourceInfo =
  path3 + path + '/equipDangerController/dangerAndFailure.ddm'
/*隐患自动手动占比数据-事业部级别*/
export const queryAllDangerProportionInfo =
  path3 + path + '/equipDangerController/dangerSourceStatistics.ddm'

/*隐患跟踪统计表数据-厂级别*/
export const queryAllDangerInfoByFactory =
  path3 + path + '/equipDangerController/dangerTrackingStatisticsFactory.ddm'
/*隐患未处理数据-厂级别*/
export const queryNotDealDangerInfoByFactory =
  path3 + path + '/equipDangerController/unprocessedDangerStatisticsFactory.ddm'
/*隐患故障分布数据-厂级别*/
export const queryAllDangerSourceInfoByFactory =
  path3 + path + '/equipDangerController/dangerAndFailureFactory.ddm'
/*隐患自动手动占比数据-厂级别*/
export const queryAllDangerProportionInfoByFactory =
  path3 + path + '/equipDangerController/dangerSourceStatisticsFactory.ddm'
/*查询设备隐患信息*/
// export const findAllDangerInfoList = '/equipDangerController/findAll.ddm'
export const findAllDangerInfoList =
  path3 + path + '/equipDangerController/findAllWithHandle.ddm'
/*批量修改设备隐患信息*/
export const batchUpdateDangerInfoList =
  path3 + path + '/equipDangerController/batchUpdate.ddm'
/*历史隐患信息-变更时间接口*/
export const updatePlanDate =
  path3 + path + '/equipDangerController/updatePlanDate.ddm'
/*批量删除设备隐患信息*/
export const batchDeleteDangerInfoList =
  path3 + path + '/equipDangerController/batchDelete.ddm'
/*新增隐患处置过程记录*/
export const addDangerHandleRecord =
  path3 + path + '/eqDangerHandleController/addOne.ddm'
/*根据隐患查询处置过程记录*/
export const findAllDangerHandleRecord =
  path3 + path + '/eqDangerHandleController/findAllByDangerNo.ddm'

/*查询故障信息*/
export const findAllFailureInfoList =
  path3 + path + '/equipFailureController/findAll.ddm'
/*批量修改故障信息*/
export const batchUpdateFailureInfoList =
  path3 + path + '/equipFailureController/batchUpdate.ddm'
/*同步ERP故障数据*/
export const synEquipFailureInfo =
  path3 + path + '/equipFailureController/synEquipFailure.ddm'
/*事业部故障跟踪统计表*/
export const queryFailureListInfo =
  path3 + path + '/equipFailureController/getAllFailureStatisticData.ddm'
/*故障专业比例*/
export const queryFailureDajDelayInfo =
  path3 + path + '/equipFailureController/getFailureMajDelayStatistic.ddm'
/*月度故障趋势图*/
export const queryFailureByMonth =
  path3 + path + '/equipFailureController/getFactoryFailureByMonth.ddm'
/*事业部月度故障趋势图*/
export const queryBusinessFailureByMonth =
  path3 + path + '/equipFailureController/getBusinessFailureByMonth.ddm'
/*各生产厂24小时内故障*/
export const query24HourFailure =
  path3 + path + '/equipFailureController/get24HourFailure.ddm'
/*故障-导出Excel*/
export const downloadExcelFailure =
  path3 + path + '/equipFailureController/downLoadDanger.ddm'
/*故障-详情导出Excel*/
export const downloadExcelDetail =
  path3 + path + '/equipDangerController/downLoadDangerDet.ddm'

//**非计划检修**//
//导入
export const uploadEquipFailureIn =
  path3 + path + '/equipFailureInController/uploadEquipFailureIn.ddm'
//下载模板
export const downloadTemplateExcelBank33 =
  '/api' + '/ddm/非计划检修故障导入模板.xlsx'
//批量新增内部故障信息
export const batchInsert =
  path3 + path + '/equipFailureInController/batchInsert.ddm'
//批量修改内部故障信息
export const equipFailureInControllerBatchUpdate =
  path3 + path + '/equipFailureInController/batchUpdate.ddm'
//批量删除内部故障信息
export const equipFailureInControllerBatchDelete =
  path3 + path + '/equipFailureInController/batchDelete.ddm'
//表1数据
export const SETNOPLANDATA =
  path3 + path + '/equnschStopStdController/findAll.ddm'
//获取产线列表
export const LINEDATA =
  path3 + path + '/dictionaryContoller/findAllByTableId.ddm'

//新增数据
export const NEWNOPLANDATA =
  path3 + path + '/equnschStopStdController/saveAll.ddm'

//删除
export const DELETES =
  path3 + path + '/equnschStopStdController/deleteBatch.ddm'

//表2数据
export const SETNOPLANDATA2 =
  path3 + path + '/equnschStopStdController/stopStdReport.ddm'

/*数据字典*/
export const findAllByTableId =
  path3 + path + '/dictionaryContoller/findAllByTableId.ddm'

/*查询车间*/
export const queryWorkDeptInfo =
  path3 + path + '/dictionaryContoller/getAllWorkDeptByOrgCode.ddm'
/*查询车间-修改版*/
export const getAllWorkDeptByOrgCode2 =
  path3 + path + '/dictionaryContoller/getAllWorkDeptByOrgCode2.ddm'
/*查询区域*/
export const findAllAreaByFactory =
  path3 + path + '/dictionaryContoller/findAllAreaByFactory.ddm'

/*查询区域*/
export const findAreaByWorkshop =
  path3 + path + '/dictionaryContoller/findAreaByWorkshop.ddm'
/*查询设备名称*/
export const dictionaryContoller_findAllByTableId =
  path3 + path + '/dictionaryContoller/findAllByTableId.ddm'
/*非计划检修时 - 查询*/
export const queryUnRepairInfo =
  path3 + path + '/equnschStopStdController/findAll.ddm'
/*非计划检修时 - 修改*/
export const updateUnRepairInfo =
  path3 + path + '/equnschStopStdController/saveAll.ddm'

/*绩效打分 - 修改*/
export const updatePerformanceScore =
  path3 + path + '/DangerAndTrouble/updateScore.ddm'
/*绩效评级 - 生产厂查询*/
export const queryFactoryScore = path3 + path + '/Rating/productfactory.ddm'
/*绩效评级 - 车间查询*/
export const queryFactoryWorkDeptScore = path3 + path + '/Rating/workdept.ddm'
/*绩效规则 - 规则设置*/
export const settingPerformanceRule =
  path3 + path + '/Performance/updateSetting.ddm'
/*绩效规则 - 规则查询*/
export const queryPerformanceRule =
  path3 + path + '/Performance/selectAllData.ddm'
/*绩效打分 - 查询分数*/
export const queryPerformanceScoreByWorkDept =
  path3 + path + '/Rating/factoryandworkdept.ddm'

//下载导出excel
export const downloadExcel =
  path3 + path + '/equipDangerController/downLoadDanger.ddm'
//下载模板excel
export const downloadTemplateExcel = path3 + path + '/隐患导入模板.xlsx'
// 资源列表无分页
export const resourceListNoPage =
  path3 + path2 + '/resource/findAllResourceNoPage'
// 根据userNo查询用户信息
export const queryUserInfoByUserNo = path3 + path2 + '/user/findOneUserByUserNo'
// 根据用户编号查询用户和组织详细信息
export const queryUserAndOrgByUserNo =
  path3 + path2 + '/user/findUserAndOrgByUserNo'
// 根据用户查询角色
export const queryUserRoleInfo = path3 + path2 + '/role/findRoleByUserID'

//设备隐患->产线停时控制情况
export const stopInfo =
  path3 + path + '/equipDangerController/dangerStopReport.ddm'

//维修费用-按年度查询
export const ExpenseYearController_findAll =
  path3 + path + '/ExpenseYearController/findAll.ddm'
//维修费用-年度保存
export const ExpenseYearController_saveAll =
  path3 + path + '/ExpenseYearController/saveAll.ddm'
//维修费用-按月度查询
export const expenseMonthController_findAll =
  path3 + path + '/expenseMonthController/findAll.ddm'
//维修费用-月度保存
export const expenseMonthController_saveAll =
  path3 + path + '/expenseMonthController/saveAll.ddm'
//维修费用月度跟踪统计表
export const expenseStatisController_mainCostTrackStatic =
  path3 + path + '/expenseStatisController/mainCostTrackStatic.ddm'
//维修费用月报
export const expenseStatisController_monthlyMaintenanceCostReport =
  path3 + path + '/expenseStatisController/monthlyMaintenanceCostReport.ddm'

/*-------------设备检查跟踪-------------*/
//根据条件查询
export const equipInspectTrack_findAll =
  path3 + path + '/equipInspectTrack/findAll.ddm'

//新增
export const equipInspectTrack_insert =
  path3 + path + '/equipInspectTrack/insert.ddm'

//新增前获取id,chkFile(检查附件id号),feedbackFile(反馈附件id号)
export const equipInspectTrack_preInsert =
  path3 + path + '/equipInspectTrack/preInsert.ddm'

//删除
export const equipInspectTrack_delete =
  path3 + path + '/equipInspectTrack/delete.ddm'

//修改----处理
export const equipInspectTrack_update =
  path3 + path + '/equipInspectTrack/update.ddm'

//导出
export const equipInspectTrackDownLoadExcel =
  path3 + path + '/equipInspectTrack/downLoadExcel.ddm'

//获取所有反馈人
export const getFeedBackEmp =
  path3 + path + '/equipInspectTrack/getFeedBackEmp.ddm'

//获取所有检查人
export const getChkEmp = path3 + path + '/equipInspectTrack/getChkEmp.ddm'
//获取检查人单位名称
export const getChkManDept =
  path3 + path + '/equipInspectTrack/getChkManDept.ddm'
//获取检查人车间名称
export const getChkManWorkshop =
  path3 + path + '/equipInspectTrack/getChkManWorkshop.ddm'

//分类接口
export const findAllByTableCategoryId =
  path3 + path + '/dictionaryContoller/findAllByTableId.ddm'

/*-------------设备隐患管理-故障看板-------------*/
//非计划检修、频次进行弹窗接口
export const findAllFaultKanban =
  path3 + path + '/equnschStopStdController/findAllFaultKanban.ddm'

/*-------------设备检查看板-------------*/
//设备检查汇总表
export const equipCheckCollect =
  path3 + path + '/equipInspectTrack/equipCheckCollect.ddm'
//设备检查问题处置情况分析
export const equipCheckDealCollect =
  path3 + path + '/equipInspectTrack/equipCheckDealCollect.ddm'
//问题专业分布
export const equipCheckDistribution =
  path3 + path + '/equipInspectTrack/equipCheckDistribution.ddm'
//检查问题类型分布
export const equipCheckCateType =
  path3 + path + '/equipInspectTrack/equipCheckCateType.ddm'
//设备检查数量排行
/*----厂级-----*/
export const equipCheckQuantity =
  path3 + path + '/equipInspectTrack/equipCheckQuantity.ddm'
export const equipCheckQuantity2 =
  path3 + path + '/equipInspectTrack/equipCheckQuantity2.ddm'
/*----车间级-----*/
export const equipCheckQuantityDetail =
  path3 + path + '/equipInspectTrack/equipCheckQuantityDetail.ddm'
export const equipCheckQuantityDetail2 =
  path3 + path + '/equipInspectTrack/equipCheckQuantityDetail2.ddm'

/*-------------设备检查计划-------------*/
//新增
export const equipCheckBatchAdd =
  path3 + path + '/equipCheckController/batchAdd.ddm'
//查询
export const equipCheckFindAll =
  path3 + path + '/equipCheckController/findAll.ddm'
//修改
export const downLoadEquipCheckBatchUpdate =
  path3 + path + '/equipCheckController/batchUpdate.ddm'
//批量删除
export const equipCheckBatchDelete =
  path3 + path + '/equipCheckController/batchDelete.ddm'
//导出
export const downLoadEquipCheckStandingBook =
  path3 + path + '/equipCheckController/downLoadEquipCheckStandingBook.ddm'
//导入
export const uploadEquipCheckStandingBook =
  path3 + path + '/equipCheckController/uploadEquipCheckStandingBook.ddm'
//查询检查人
export const getUserNameList =
  path3 + path + '/equipCheckController/getUserNameList.ddm'
//检查标准上传文件
export const uploadSchedule =
  path3 + path + '/equipCheckController/uploadSchedule.ddm'
//检查标准查询
export const findAllSchedule =
  path3 + path + '/equipCheckController/findAllSchedule.ddm'
//检查标准删除
export const deleteFirst =
  path3 + path + '/equipCheckController/deleteFirst.ddm'

/*-------------检修计划排程(月修计划录入)-------------*/
//新建
export const checkScheduleBatchAdd =
  path3 + path + '/checkScheduleContoller/batchAdd.ddm'
//查询表
export const checkScheduleFindAll =
  path3 + path + '/checkScheduleContoller/findAll.ddm'
//变更
export const checkScheduleBatchUpdate =
  path3 + path + '/checkScheduleContoller/batchUpdate.ddm'
//删除
export const checkScheduleBatchDelete =
  path3 + path + '/checkScheduleContoller/batchDelete.ddm'
//轧线时间过滤
export const filterTime =
  path3 + path + '/checkScheduleContoller/filterTime.ddm'
//导出
export const downCheckSchedule =
  path3 + path + '/checkScheduleContoller/downCheckSchedule.ddm'
//导出1
export const downCheckScheduleOne =
  path3 + path + '/checkScheduleContoller/downCheckSchedule1.ddm'
//上传同步到IEMP
export const downCheckScheduleOneUpload =
  path3 + path + '/checkScheduleContoller/upload.ddm'
//上传同步到IEMP(勾选方式)
export const downCheckScheduleOneUpload2 =
  path3 + path + '/checkScheduleContoller/upload2.ddm'

/*-------------检修计划排程(年修计划录入)-------------*/
//新建
export const checkYearScheduleBatchAdd =
  path3 + path + '/checkYearScheduleContoller/batchAdd.ddm'
//查询表
export const checkYearScheduleFindAll =
  path3 + path + '/checkYearScheduleContoller/findAll.ddm'
//变更
export const checkYearScheduleBatchUpdate =
  path3 + path + '/checkYearScheduleContoller/batchUpdate.ddm'
//删除
export const checkYearScheduleBatchDelete =
  path3 + path + '/checkYearScheduleContoller/batchDelete.ddm'
//导出
export const checkYearScheduleDownCheckSchedule =
  path3 + path + '/checkYearScheduleContoller/downCheckYearSchedule.ddm'

//隐患转故障
export const Turn_To_Hidden_Dangers =
  path3 + path + '/equipDangerController/transDangerToFailureDate.ddm'

//故障信息填报
//新增行提交
export const setBatchAddEquipFailure =
  path3 + path + '/equipFailureController/batchAddEquipFailure.ddm'

//故障信息
//获取所有数据
export const findInfoAll = path3 + path + '/equipFailureController/findAll.ddm'
//删除
export const delFaultInfo =
  path3 + path + '/equipFailureController/batchDelete.ddm'
//删除
export const updateFaultInfo =
  path3 + path + '/equipFailureController/equipFailureUpdate.ddm'

//整改措施table
export const CM_Data =
  path3 + path + '/equipFailureRefController/findAllEquipFailureRefList.ddm'
//新增整改措施
export const Add_CM_Data =
  path3 + path + '/equipFailureRefController/insertEquipFailureRef.ddm'

//新增修改整改措施
export const ReviseAndAdd_CM_Data =
  path3 + path + '/equipFailureRefController/batchInsertAndUpdate.ddm'

//新增整改措施
export const Revise_CM_Data =
  path3 + path + '/equipFailureRefController/updateEquipFailureRef.ddm'
//删除整改措施
export const Del_CM_Data =
  path3 + path + '/equipFailureRefController/deleteEquipFailureRef.ddm'
//上传图片
export const Upload_img = path3 + path + '/jltzFileController/uploadFile.ddm'
//接收图片
export const Rec_img =
  path3 + path + '/jltzFileController/findByRelativedId.ddm'
//删除图片
export const Del_img = path3 + path + '/jltzFileController/deleteFile.ddm'
//删除图片
export const Export_CopyData =
  path3 + path + '/equipFailureController/exportFailureAndRefNew.ddm'

//单独的整改措施页面
//数据接口
export const CorrectiveMeasures_Data =
  path3 +
  path +
  '/equipFailureRefController/findAllEquipFailureRefListJoinFailure.ddm'

//故障停时考核线
//查询
export const Assessment_Line_Data =
  path3 + path + '/equipFailureStdlineController/findAllStdLine.ddm'

//修改
export const Revise_AL_Data =
  path3 + path + '/equipFailureStdlineController/updateStdLine.ddm'

//故障措施未关闭情况
export const FM_NotClosed =
  path3 + path + '/equipFailureRefController/findEquipFailureRefUnClose.ddm'
