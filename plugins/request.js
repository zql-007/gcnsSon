import { getExportData } from '@/lib/EquipPrecisManage/ApiURL02'
import {
  DOWNLOADIMG,
  DOWNLOADIMG_DSM,
  EXPORSERVICEHISTORY,
  EXPORTALARMRECORDING,
  EXPORTALERT,
  getExportDataDownload,
  selectWord
} from '@/lib/EquipPrecisManage/ApiURL03'
import {
  commonController_alarmInfoBatchImport,
  commonController_alarmThBatchImport,
  commonController_burnerMonitorInfoImport,
  commonController_downloadTemplate,
  commonController_equipMentAnalysisDoc,
  spotCheckController_exportTorqueOverRunInfo,
  spotCheckController_exportWaterTankCalibrationInfo,
  spotCheckController_exportWaterTankInfo1,
  spotCheckController_exportWaterTankInfo2
} from '@/lib/EquipPrecisManage/ApiURLWHB'
import {
  checkYearScheduleDownCheckSchedule,
  downCheckSchedule,
  downCheckScheduleOne,
  downLoadEquipCheckStandingBook,
  downloadExcel,
  downloadExcelDetail,
  downloadExcelFailure,
  downloadTemplateExcel,
  downloadTemplateExcelBank33,
  equipInspectTrackDownLoadExcel
} from '@/lib/EquipPrecisManage/RiskManageApi'
import {
  ccDownLoadPeopleStandingBook,
  ccDownloadTemplateExcelBank,
  downloadFile,
  downLoadGlrqStandingBook,
  downLoadHcStandingBook,
  downloadTemplateExcelBank,
  driveDownLoadHcStandingBook,
  dtDownLoadPeopleStandingBook,
  dtDownloadTemplateExcelBank,
  ForcePipeStandingBookDown,
  fqssDownLoadPeopleStandingBook,
  fqssDownloadTemplateExcelBank,
  glrqDownloadTemplateExcelBank,
  hbssDownLoadPeopleStandingBook,
  hbssDownloadTemplateExcelBank,
  htBurnerDownLoadHcStandingBook,
  htFurnaceRollerStandingBookDownLoadHcStandingBook,
  htRadiantTubeStandingBookDownLoadHcStandingBook,
  peopleDownLoadPeopleStandingBook,
  peopleDownloadTemplateExcelBank,
  StandingBookDownLoadHcStandingBook
} from '@/lib/EquipPrecisManage/EquipmentLedger'
import { devicePointController_exportDangerData } from '@/lib/EquipPrecisManage/ApiURL01'

export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (config.url == getExportData) {
      config['responseType'] = 'blob'
    }
    if (config.url == selectWord) {
      config['responseType'] = 'blob'
    }
    if (config.url == devicePointController_exportDangerData) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadExcel) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadTemplateExcel) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadExcelFailure) {
      config['responseType'] = 'blob'
    }
    if (config.url == downCheckSchedule) {
      config['responseType'] = 'blob'
    }
    if (config.url == downCheckScheduleOne) {
      config['responseType'] = 'blob'
    }
    if (config.url == checkYearScheduleDownCheckSchedule) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadExcelDetail) {
      config['responseType'] = 'blob'
    }
    if (config.url == equipInspectTrackDownLoadExcel) {
      config['responseType'] = 'blob'
    }
    if (config.url == downLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == downLoadEquipCheckStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadFile) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == downLoadGlrqStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == peopleDownLoadPeopleStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == peopleDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == glrqDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == downloadTemplateExcelBank33) {
      config['responseType'] = 'blob'
    }
    if (config.url == hbssDownLoadPeopleStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == hbssDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == fqssDownLoadPeopleStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == fqssDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == dtDownLoadPeopleStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == dtDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url == driveDownLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == StandingBookDownLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == htBurnerDownLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == htRadiantTubeStandingBookDownLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == htFurnaceRollerStandingBookDownLoadHcStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == ccDownLoadPeopleStandingBook) {
      config['responseType'] = 'blob'
    }
    if (config.url == ForcePipeStandingBookDown) {
      config['responseType'] = 'blob'
    }
    if (config.url == ccDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }
    if (config.url === commonController_downloadTemplate) {
      config['responseType'] = 'blob'
    }
    if (config.url === commonController_alarmThBatchImport) {
      config['responseType'] = 'blob'
    }
    if (config.url === commonController_equipMentAnalysisDoc) {
      config['responseType'] = 'blob'
    }
    if (config.url.indexOf('/test/equipMentAnalysisTemplate') !== -1) {
      config['responseType'] = 'blob'
    }
    if (config.url === commonController_alarmInfoBatchImport) {
      config['responseType'] = 'blob'
    }
    if (config.url === spotCheckController_exportTorqueOverRunInfo) {
      config['responseType'] = 'blob'
    }
    if (config.url === spotCheckController_exportWaterTankCalibrationInfo) {
      config['responseType'] = 'blob'
    }
    if (config.url === spotCheckController_exportWaterTankInfo1) {
      config['responseType'] = 'blob'
    }
    if (config.url === spotCheckController_exportWaterTankInfo2) {
      config['responseType'] = 'blob'
    }
    if (config.url === EXPORTALERT) {
      config['responseType'] = 'blob'
    }
    if (config.url === DOWNLOADIMG) {
      config['responseType'] = 'blob'
    }
    if (config.url === DOWNLOADIMG_DSM) {
      config['responseType'] = 'blob'
    }
    if (config.url === EXPORTALARMRECORDING) {
      config['responseType'] = 'blob'
    }
    if (config.url === EXPORSERVICEHISTORY) {
      config['responseType'] = 'blob'
    }
    if (config.url === getExportDataDownload) {
      config['responseType'] = 'blob'
    }
    if (config.url === commonController_burnerMonitorInfoImport) {
      config['responseType'] = 'blob'
    }

    if (config.url.indexOf('/picapi/') !== -1) {
      config['responseType'] = 'blob'
    }
  })
}
