import { path, pathMes } from '@/lib/system'
// const path = 'ddm'

/*-----------------------------------------特种设备台账-------------------------------*/
/*------------------热处理烧嘴维护台账----------------*/
//新增
export const htBurnerBatchAdd = path + '/ddm/htBurnerStandingBook/batchAdd.ddm'
//查询
export const htBurnerFindAll = path + '/ddm/htBurnerStandingBook/findAll.ddm'
//删除
export const htBurnerDelete = path + '/ddm/htBurnerStandingBook/batchDelete.ddm'
//编辑
export const htBurnerUpdate = path + '/ddm/htBurnerStandingBook/batchUpdate.ddm'
//导出
export const htBurnerDownLoadHcStandingBook =
  path + '/ddm/htBurnerStandingBook/downLoadHtBurnerStandingBook.ddm'
//导入
export const htBurnerUploadHcStandingBook =
  path + '/ddm/htBurnerStandingBook/uploadHtBurnerStandingBook.ddm'
/*------------------热处理辐射管更换台账----------------*/
//新增
export const htRadiantTubeStandingBookBatchAdd =
  path + '/ddm/htRadiantTubeStandingBook/batchAdd.ddm'
//查询
export const htRadiantTubeStandingBookFindAll =
  path + '/ddm/htRadiantTubeStandingBook/findAll.ddm'
//删除
export const htRadiantTubeStandingBookBatchDelete =
  path + '/ddm/htRadiantTubeStandingBook/batchDelete.ddm'
//编辑
export const htRadiantTubeStandingBookBatchUpdate =
  path + '/ddm/htRadiantTubeStandingBook/batchUpdate.ddm'
//导出
export const htRadiantTubeStandingBookDownLoadHcStandingBook =
  path + '/ddm/htRadiantTubeStandingBook/downLoadHtRadiantTubeStandingBook.ddm'
//导入
export const htRadiantTubeStandingBookUploadHcStandingBook =
  path + '/ddm/htRadiantTubeStandingBook/uploadHtRadiantTubeStandingBook.ddm'
//附件上传
export const htRadiantTubeStandingBookUploadFile =
  path + '/ddm/htRadiantTubeStandingBook/uploadFile.ddm'
//查找附件
export const findByRelativedIdAndType =
  path + '/ddm/njaFileController/findByRelativedIdAndType.ddm'
/*------------------热处理炉辊更换台账----------------*/
//新增
export const htFurnaceRollerStandingBookBatchAdd =
  path + '/ddm/htFurnaceRollerStandingBook/batchAdd.ddm'
//查询
export const htFurnaceRollerStandingBookFindAll =
  path + '/ddm/htFurnaceRollerStandingBook/findAll.ddm'
//删除
export const htFurnaceRollerStandingBookBatchDelete =
  path + '/ddm/htFurnaceRollerStandingBook/batchDelete.ddm'
//编辑
export const htFurnaceRollerStandingBookBatchUpdate =
  path + '/ddm/htFurnaceRollerStandingBook/batchUpdate.ddm'
//导出
export const htFurnaceRollerStandingBookDownLoadHcStandingBook =
  path + '/ddm/htFurnaceRollerStandingBook/downLoadHtFurnaceStandingBook.ddm'
//导入
export const htFurnaceRollerStandingBookUploadHcStandingBook =
  path + '/ddm/htFurnaceRollerStandingBook/uploadHtFurnaceStandingBook.ddm'
//附件上传
export const htFurnaceRollerStandingBookUploadFile =
  path + '/ddm/htFurnaceRollerStandingBook/uploadFile.ddm'
/*------------------工业炉台账----------------*/
//新增
export const StandingBookBatchAdd =
  path + '/ddm/ifStandingBookController/batchAdd.ddm'
//查询
export const StandingBookFindAll =
  path + '/ddm/ifStandingBookController/findAll.ddm'
//删除
export const StandingBookBatchDelete =
  path + '/ddm/ifStandingBookController/batchDelete.ddm'
//编辑
export const StandingBookBatchUpdate =
  path + '/ddm/ifStandingBookController/batchUpdate.ddm'
//导出
export const StandingBookDownLoadHcStandingBook =
  path + '/ddm/ifStandingBookController/downLoadHcStandingBook.ddm'
//导入
export const StandingBookUploadHcStandingBook =
  path + '/ddm/ifStandingBookController/uploadHcStandingBook.ddm'
//附件上传
export const StandingBookUploadFile =
  path + '/ddm/ifStandingBookController/uploadFile.ddm'
/*------------------台账统计表----------------*/
//查询表sheet1
export const findList = path + '/ddm/hcStandingBookController/findList.ddm'
//sheet2
export const findDetail = path + '/ddm/hcStandingBookController/findDetail.ddm'
/*------------------行车台账----------------*/
//查询行车台账信息
export const findAll = path + '/ddm/hcStandingBookController/findAll.ddm'
//新增
export const batchAdd = path + '/ddm/hcStandingBookController/batchAdd.ddm'
//删除
export const batchDelete =
  path + '/ddm/hcStandingBookController/batchDelete.ddm'
//编辑
export const batchUpdate =
  path + '/ddm/hcStandingBookController/batchUpdate.ddm'
//导出
export const downLoadHcStandingBook =
  path + '/ddm/hcStandingBookController/downLoadHcStandingBook.ddm'
//导入
export const uploadHcStandingBook =
  path + '/ddm/hcStandingBookController/uploadHcStandingBook.ddm'
//附件上传
export const uploadFile = path + '/ddm/njaFileController/uploadFile.ddm'
//查找附件
export const findByRelativedId =
  path + '/ddm/njaFileController/findByRelativedId.ddm'
//下载附件
export const downloadFile = path + '/ddm/njaFileController/downloadFile.ddm'
//删除附件
export const deleteFile = path + '/ddm/njaFileController/deleteFile.ddm'
//下载模板
export const downloadTemplateExcelBank = path + '/ddm/行车台账导入模板.xls'
//预览
export const njaFileControllerFile =
  path + '/ddm/njaFileController/preViewFile.ddm'

/*------------------锅炉及压力容器设备台账----------------*/
//新增
export const addLinesDatas =
  path + '/ddm/glrqStandingBookController/batchAdd.ddm'
//查询
export const queryData = path + '/ddm/glrqStandingBookController/findAll.ddm'
//删除
export const deleteDatas =
  path + '/ddm/glrqStandingBookController/batchDelete.ddm'
//修改
export const updateDatas =
  path + '/ddm/glrqStandingBookController/batchUpdate.ddm'
//导出
export const downLoadGlrqStandingBook =
  path + '/ddm/glrqStandingBookController/downLoadGlrqStandingBook.ddm'
//导入
export const uploadGlrqStandingBook =
  path + '/ddm/glrqStandingBookController/uploadGlrqStandingBook.ddm'
//下载模板
export const glrqDownloadTemplateExcelBank =
  path + '/ddm/锅炉及压力容器导入模板.xlsx'

/*------------------压力管道----------------*/
//新增
export const ForcePipeStandingBookBatchAdd =
  path + '/ddm/ForcePipeStandingBook/batchAdd.ddm'
//查询
export const ForcePipeStandingBookFindAll =
  path + '/ddm/ForcePipeStandingBook/findAll.ddm'
//删除
export const ForcePipeStandingBookBatchDelete =
  path + '/ddm/ForcePipeStandingBook/batchDelete.ddm'
//修改
export const ForcePipeStandingBookBatchUpdate =
  path + '/ddm/ForcePipeStandingBook/batchUpdate.ddm'
//导出
export const ForcePipeStandingBookDown =
  path + '/ddm/ForcePipeStandingBook/downForcePipeStandingBook.ddm'
//导入
export const ForcePipeStandingBookUpload =
  path + '/ddm/ForcePipeStandingBook/uploadForcePipeStandingBook.ddm'

/*------------------管理人员汇总表----------------*/
//新增
export const peopleBatchAdd =
  path + '/ddm/peopleStandingBookController/batchAdd.ddm'
//查询
export const peopleFindAll =
  path + '/ddm/peopleStandingBookController/findAll.ddm'
//删除
export const peopleBatchDelete =
  path + '/ddm/peopleStandingBookController/batchDelete.ddm'
//修改
export const peopleBatchUpdate =
  path + '/ddm/peopleStandingBookController/batchUpdate.ddm'
//导出
export const peopleDownLoadPeopleStandingBook =
  path + '/ddm/peopleStandingBookController/downLoadPeopleStandingBook.ddm'
//导入
export const peopleUploadPeopleStandingBook =
  path + '/ddm/peopleStandingBookController/uploadPeopleStandingBook.ddm'
//下载模板
export const peopleDownloadTemplateExcelBank =
  path + '/ddm/特种设备管理人员导入模板.xlsx'

/*------------------环保设施台账----------------*/
//新增
export const hbssBatchAdd =
  path + '/ddm/hbssStandingBookController/batchAdd.ddm'
//查询
export const hbssFindAll = path + '/ddm/hbssStandingBookController/findAll.ddm'
//删除
export const hbssBatchDelete =
  path + '/ddm/hbssStandingBookController/batchDelete.ddm'
//修改
export const hbssBatchUpdate =
  path + '/ddm/hbssStandingBookController/batchUpdate.ddm'
//导出
export const hbssDownLoadPeopleStandingBook =
  path + '/ddm/hbssStandingBookController/downLoadHbssStandingBook.ddm'
//导入
export const hbssUploadPeopleStandingBook =
  path + '/ddm/hbssStandingBookController/uploadHbssStandingBook.ddm'
//下载模板
export const hbssDownloadTemplateExcelBank =
  path + '/ddm/环保设施台账导入模板.xlsx'

/*------------------废气设施台账----------------*/
//新增
export const fqssBatchAdd =
  path + '/ddm/fqssStandingBookController/batchAdd.ddm'
//查询
export const fqssFindAll = path + '/ddm/fqssStandingBookController/findAll.ddm'
//删除
export const fqssBatchDelete =
  path + '/ddm/fqssStandingBookController/batchDelete.ddm'
//修改
export const fqssBatchUpdate =
  path + '/ddm/fqssStandingBookController/batchUpdate.ddm'
//导出
export const fqssDownLoadPeopleStandingBook =
  path + '/ddm/fqssStandingBookController/downLoadFqssStandingBook.ddm'
//导入
export const fqssUploadPeopleStandingBook =
  path + '/ddm/fqssStandingBookController/uploadFqssStandingBook.ddm'
//下载模板
export const fqssDownloadTemplateExcelBank =
  path + '/ddm/废弃设施台账导入模板.xlsx'

/*------------------煤气排水器台账----------------*/
//新增
export const mqBatchAdd = path + '/ddm/mqStandingBookController/batchAdd.ddm'
//查询
export const mqFindAll = path + '/ddm/mqStandingBookController/findAll.ddm'
//删除
export const mqBatchDelete =
  path + '/ddm/mqStandingBookController/batchDelete.ddm'
//修改
export const mqBatchUpdate =
  path + '/ddm/mqStandingBookController/batchUpdate.ddm'
//导出
export const mqDownLoadPeopleStandingBook =
  path + '/ddm/mqStandingBookController/downLoadMqStandingBook.ddm'
//导入
export const mqUploadPeopleStandingBook =
  path + '/ddm/mqStandingBookController/uploadMqStandingBook.ddm'
//下载模板
export const mqDownloadTemplateExcelBank =
  path + '/ddm/煤气排水器台账导入模板.xlsx'

/*------------------管道膨胀节台账----------------*/
//接口同煤气排水，区别于一个传参类型tzType：A 煤气排水器 B 煤气管道膨胀节
//下载模板
export const mqTwoDownloadTemplateExcelBank =
  path + '/ddm/煤气管道膨胀节台账导入模板.xlsx'

/*------------------生活污水处理设施台账----------------*/
//新增
export const wsssBatchAdd =
  path + '/ddm/wsssStandingBookController/batchAdd.ddm'
//查询
export const wsssFindAll = path + '/ddm/wsssStandingBookController/findAll.ddm'
//删除
export const wsssBatchDelete =
  path + '/ddm/wsssStandingBookController/batchDelete.ddm'
//修改
export const wsssBatchUpdate =
  path + '/ddm/wsssStandingBookController/batchUpdate.ddm'
//导出
export const wsssDownLoadPeopleStandingBook =
  path + '/ddm/wsssStandingBookController/downLoadWsssStandingBook.ddm'
//导入
export const wsssUploadPeopleStandingBook =
  path + '/ddm/wsssStandingBookController/uploadWsssStandingBook.ddm'
//下载模板
export const wsssDownloadTemplateExcelBank =
  path + '/ddm/污水处理设施台账导入模板.xlsx'

/*------------------电梯台账----------------*/
//新增
export const dtBatchAdd = path + '/ddm/dtStandingBookController/batchAdd.ddm'
//查询
export const dtFindAll = path + '/ddm/dtStandingBookController/findAll.ddm'
//删除
export const dtBatchDelete =
  path + '/ddm/dtStandingBookController/batchDelete.ddm'
//修改
export const dtBatchUpdate =
  path + '/ddm/dtStandingBookController/batchUpdate.ddm'
//导出
export const dtDownLoadPeopleStandingBook =
  path + '/ddm/dtStandingBookController/downLoadDtStandingBook.ddm'
//导入
export const dtUploadPeopleStandingBook =
  path + '/ddm/dtStandingBookController/uploadDtStandingBook.ddm'
//下载模板
export const dtDownloadTemplateExcelBank = path + '/ddm/电梯台账导入模板.xlsx'

/*------------------叉车台账----------------*/
//新增
export const ccBatchAdd = path + '/ddm/ccStandingBookController/batchAdd.ddm'
//查询
export const ccFindAll = path + '/ddm/ccStandingBookController/findAll.ddm'
//删除
export const ccBatchDelete =
  path + '/ddm/ccStandingBookController/batchDelete.ddm'
//修改
export const ccBatchUpdate =
  path + '/ddm/ccStandingBookController/batchUpdate.ddm'
//导出
export const ccDownLoadPeopleStandingBook =
  path + '/ddm/ccStandingBookController/downLoadCcStandingBook.ddm'
//导入
export const ccUploadPeopleStandingBook =
  path + '/ddm/ccStandingBookController/uploadCcStandingBook.ddm'
//下载模板
export const ccDownloadTemplateExcelBank = path + '/ddm/叉车台账导入模板.xlsx'
/*------------------起重机械台账清单----------------*/
//停时统计详情
export const specialEquipment =
  path + '/ddm/iempInterfaceController/specialEquipment.ddm'

/*------------------传动设备台账----------------*/
//查询台账信息
export const driveStandingFindAll =
  path + '/ddm/driveStandingBookController/findAll.ddm'
//导入
export const uploadDriveStandingBook =
  path + '/ddm/driveStandingBookController/uploadDriveStandingBook.ddm'
//提交新增
export const driveBatchAdd =
  path + '/ddm/driveStandingBookController/batchAdd.ddm'
//删除
export const driveBatchDelete =
  path + '/ddm/driveStandingBookController/batchDelete.ddm'
//编辑
export const driveBatchUpdate =
  path + '/ddm/driveStandingBookController/batchUpdate.ddm'
//导出
export const driveDownLoadHcStandingBook =
  path + '/ddm/driveStandingBookController/downLoadDriveStandingBook.ddm'

/*------------------计量设备台账----------------*/
export const mesApiQuery = pathMes + '/mesApi/MeteringEquipmentForB2Query'
export const MeteringEquipmentForB2Query =
  path + '/ddm/jltzFileController/MeteringEquipmentForB2Query.ddm'
//附件上传
export const jltzFileControllerUploadFile =
  path + '/ddm/jltzFileController/uploadFile.ddm'
//查找附件
export const jltzFileControllerRelativedId =
  path + '/ddm/jltzFileController/findByRelativedId.ddm'
//下载附件
export const jltzFileControllerDownloadFile =
  path + '/ddm/jltzFileController/downloadFile.ddm'
//删除附件
export const jltzFileControllerDeleteFile =
  path + '/ddm/jltzFileController/deleteFile.ddm'
//预览
export const jltzFileControllerFile =
  path + '/ddm/jltzFileController/preViewFile.ddm'
//更新行记录点名
export const updateScore = path + '/ddm/jltzFileController/updateScore.ddm'

/*------------------信息化台账管理----------------*/
//会议资料管理-查询
export const findPage = path + '/dsm/meetingMaterialsController/findPage.dsm'
export const findPage2 = path + '/dsm/documentMaterialsController/findPage.dsm'
//会议资料管理-新增
export const batchAddOrUpdate =
  path + '/dsm/meetingMaterialsController/batchAddOrUpdate.dsm'
export const batchAddOrUpdate2 =
  path + '/dsm/documentMaterialsController/batchAddOrUpdate.dsm'
//会议资料管理-附件删除
export const deleteFileConference =
  path + '/dsm/meetingMaterialsController/deleteFile.dsm'
export const deleteFileConference2 =
  path + '/dsm/documentMaterialsController/deleteFile.dsm'
//会议资料管理-表数据删除
export const deleteConference =
  path + '/dsm/meetingMaterialsController/delete.dsm'
export const deleteConference2 =
  path + '/dsm/documentMaterialsController/delete.dsm'
//会议资料管理-附件上传
export const uploadFileConference =
  path + '/dsm/meetingMaterialsController/uploadFile.dsm'
export const uploadFileConference2 =
  path + '/dsm/documentMaterialsController/uploadFile.dsm'
//会议资料管理-下载附件
export const downloadFileConference =
  path + '/dsm/meetingMaterialsController/preViewFile.dsm'
export const downloadFileConference2 =
  path + '/dsm/documentMaterialsController/preViewFile.dsm'
export const downloadFileConference3 =
  path + '/dsm/contractMaterialsController/preViewFile.dsm'
//标签
export const documentTagController =
  path + '/dsm/documentTagController/findAll.dsm'
export const addOrUpdateTag =
  path + '/dsm//documentTagController/addOrUpdate.dsm'
export const deleteTag = path + '/dsm//documentTagController/delete.dsm'
//合同报支台账
export const contractMaterialsController =
  path + '/dsm/contractMaterialsController/findPage.dsm'
export const contractMaterbatchAddOrUpdate =
  path + '/dsm/contractMaterialsController/batchAddOrUpdate.dsm'
export const contractMaterdelete =
  path + '/dsm/contractMaterialsController/delete.dsm'
export const contractMateruploadFile =
  path + '/dsm/contractMaterialsController/uploadFile.dsm'
//新建或修改授权用户
export const contractAddOrUpdate =
  path + '/dsm/documentUserController/addOrUpdate.dsm'
